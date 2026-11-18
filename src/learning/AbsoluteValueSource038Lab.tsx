import { useId } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  abs038Format, abs038SetLabel, abs038Probe, abs038Piecewise,
  abs038Properties, abs038Graph, abs038Distances, abs038Nested,
  abs038Pair, abs038Parameter, abs038OGMExample, abs038Scope,
  type Abs038Fraction, type Abs038Interval, type Abs038Operator,
} from "./absoluteValueSource038Model";
import "./absoluteValueSource038.css";

const defaults={mode:0,a:1,b:-2,k:4,op:"=",x:3,xd:1,property:false,u:3,ud:1,v:-5,vd:1,ga:1,gb:-2,sign:1,offset:-1,first:-1,second:2,target:3,center:0,inner:3,outer:1,pa:1,pb:0,pc:1,pd:-2,safeRight:true,m:1,ogm:false,scope:"product",position:0};
const f=(v:Abs038Fraction|null)=>v?abs038Format(v):"—";
const value=(v:Abs038Fraction)=>v.n/v.d;
const sym=(op:Abs038Operator)=>op==="<="?"≤":op===">="?"≥":op;
const validOp=(op:string):Abs038Operator=>op==="="||op==="<"||op==="<="||op===">"||op===">="?op:"=";
type Row={label:string;intervals:Abs038Interval[]};

/** Positions, open/closed endpoints and exact HTML labels share one set model. */
function SolutionLines({rows,trial}:{rows:Row[];trial?:Abs038Fraction}){
  const id=useId();
  const endpoints=rows.flatMap(row=>row.intervals.flatMap(s=>[s.low,s.high].filter((q):q is Abs038Fraction=>q!==null).map(value)));
  if(trial)endpoints.push(value(trial));
  const low=Math.min(-3,...endpoints),high=Math.max(3,...endpoints),pad=Math.max(1,(high-low)*.12),min=low-pad,max=high+pad;
  const x=(v:number)=>24+(v-min)/(max-min)*312;
  return <figure className="f038-lines"><svg viewBox={`0 0 360 ${rows.length*62+12}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>Sayı doğrusunda çözüm kümeleri</title>
    <desc id={`${id}-desc`}>{rows.map(row=>`${row.label}: ${abs038SetLabel(row.intervals)}`).join(". ")}. Açık nokta hariç, dolu nokta dahil. Ok o yönde sınırsız devam eder. {trial&&`Üstteki kısa dik çizgi deneme ${f(trial)}.`} Kesin uçlar şeklin altındaki metindedir.</desc>
    {rows.map((row,i)=>{const y=30+i*62;return <g key={row.label} className={`f038-color-${i%3}`}>
      <line x1="24" y1={y} x2="336" y2={y} className="f038-axis"/><line x1={x(0)} y1={y-6} x2={x(0)} y2={y+6} className="f038-axis"/>
      {row.intervals.map((s,j)=>{const l=s.low?x(value(s.low)):24,r=s.high?x(value(s.high)):336;return <g key={j}>
        <line x1={l} y1={y} x2={r} y2={y} className="f038-solution"/>
        {s.low?<circle cx={l} cy={y} r="5.5" className={s.lowClosed?"f038-closed":"f038-open"}/>:<path d={`M31 ${y-5}L24 ${y}L31 ${y+5}`} className="f038-arrow"/>}
        {s.high?<circle cx={r} cy={y} r="5.5" className={s.highClosed?"f038-closed":"f038-open"}/>:<path d={`M329 ${y-5}L336 ${y}L329 ${y+5}`} className="f038-arrow"/>}
      </g>;})}
      {trial&&<path d={`M${x(value(trial))} ${y-19}v10`} className="f038-trial"/>}
    </g>;})}
  </svg><figcaption><p>Dik kısa eksen çizgisi: 0. Açık nokta: hariç; dolu nokta: dahil. {trial&&`Üst işaret: deneme x=${f(trial)}.`}</p><dl>{rows.map((row,i)=><div className={`f038-color-${i%3}`} key={row.label}><dt>{row.label}</dt><dd>{abs038SetLabel(row.intervals)}</dd></div>)}</dl></figcaption></figure>;
}

function Movement({u,v}:{u:Abs038Fraction;v:Abs038Fraction}){
  const p=abs038Properties(u.n,u.d,v.n,v.d),values=[0,value(u),value(p.sum)],low=Math.min(-2,...values),high=Math.max(2,...values),span=high-low,x=(n:number)=>24+(n-low)/span*312;
  return <figure><svg viewBox="0 0 360 140" role="img" aria-label={`İlk hareket ${f(u)}, ikinci hareket ${f(v)}. Net konum ${f(p.sum)}, net uzaklık ${f(p.absSum)}, gidilen toplam yol ${f(p.sumOfAbs)}.`}>
    <line x1="24" y1="75" x2="336" y2="75" className="f038-axis"/>
    <line x1={x(0)} y1="40" x2={x(value(u))} y2="40" className="f038-path-a"/>
    <line x1={x(value(u))} y1="100" x2={x(value(p.sum))} y2="100" className="f038-path-b"/>
    <path d={`M${x(0)} 40V75M${x(value(u))} 40V100M${x(value(p.sum))} 75V100`} className="f038-guide"/>
    <circle cx={x(0)} cy="75" r="5" className="f038-neutral"/><circle cx={x(value(u))} cy="40" r="6" className="f038-node-a"/><circle cx={x(value(p.sum))} cy="100" r="6" className="f038-node-b"/>
  </svg><figcaption><dl><div className="f038-color-0"><dt>Üstteki düz yol</dt><dd>0 → {f(u)}; uzunluk {f(p.absU)}</dd></div><div className="f038-color-1"><dt>Alttaki kesikli yol</dt><dd>{f(u)} → {f(p.sum)}; uzunluk {f(p.absV)}</dd></div><div><dt>Başlangıçtan sona uzaklık</dt><dd>|u+v|={f(p.absSum)}</dd></div></dl></figcaption></figure>;
}

export function AbsoluteValueSource038Lab(){
  const id=useId(),{state}=useApp();
  const [saved,set]=useExploration("absolute-value-source-038",defaults);
  const n=(key:keyof typeof defaults,fallback:number,min:number,max:number)=>{const v=saved[key];return typeof v==="number"&&Number.isFinite(v)?Math.min(max,Math.max(min,Math.round(v))):fallback;};
  const mode=n("mode",0,0,7),op=validOp(saved.op),xn=n("x",3,-24,24),xd=n("xd",1,1,12);
  const range=(key:keyof typeof defaults,label:string,v:number,min:number,max:number)=><div className="f038-range"><div><label htmlFor={`${id}-${key}`}>{label}</label><output htmlFor={`${id}-${key}`}>{v}</output></div><input id={`${id}-${key}`} aria-label={label} type="range" min={min} max={max} step="1" value={v} onChange={e=>set({[key]:Number(e.target.value)})}/></div>;
  const trial=<>{range("x","Deneme x payı",xn,-24,24)}{range("xd","Deneme x paydası",xd,1,12)}</>;
  const piece=abs038Piecewise(n("a",1,-6,6),n("b",-2,-12,12),xn,xd);
  const properties=abs038Properties(n("u",3,-24,24),n("ud",1,1,12),n("v",-5,-24,24),n("vd",1,1,12));
  const probe=abs038Probe(piece.a,piece.b,op,n("k",4,-12,12),xn,xd);
  const graph=abs038Graph(n("ga",1,-6,6),n("gb",-2,-12,12),saved.sign===-1?-1:1,n("offset",-1,-8,8),xn,xd);
  const distance=abs038Distances(n("first",-1,-12,12),n("second",2,-12,12),xn,xd,n("target",3,-12,36));
  const nested=abs038Nested(n("center",0,-12,12),n("inner",3,-12,12),n("outer",1,-12,12),xn,xd);
  const pair=abs038Pair(n("pa",1,-6,6),n("pb",0,-12,12),n("pc",1,-6,6),n("pd",-2,-12,12),xn,xd,saved.safeRight===true);
  const parameter=abs038Parameter(n("m",1,-6,6),xn,xd),ogm=abs038OGMExample(xn,xd);
  const scopePreset=saved.scope==="sum"?"sum":"product",scope=abs038Scope(scopePreset,n("position",0,0,scopePreset==="sum"?4:2));
  const labels=["Uzaklık ve işaret","Denklem ve eşitsizlik","Grafiği dönüştür","İki noktaya uzaklık","İç içe mutlak değer","İki taraf ve koşul","Parametre ve örnek","Çizginin kapsamı"];
  return <section className="f038-lab" data-forge038="absolute-value" data-motion={state.settings.motion}>
    <h3>Mutlak değeri değiştirerek keşfet</h3>
    <p>Konumu, koşulu ve işlem kapsamını değiştir. Şekil ile kesin hesap aynı matematik modelinden üretilir; önemli sayılar ayrıca okunabilir metin olarak yazılır. Keşif yapmak ustalık veya XP kazandırmaz.</p>
    <div className="f038-modes" role="group" aria-label="Mutlak değer modeli">{labels.map((label,i)=><button type="button" className="secondary" key={label} aria-pressed={mode===i} onClick={()=>set({mode:i})}>{label}</button>)}</div>

    {mode===0&&<div className="f038-panel" data-mode="distance">
      <div className="f038-actions" role="group" aria-label="Uzaklık keşfi"><button className="secondary" type="button" aria-pressed={saved.property!==true} onClick={()=>set({property:false})}>İşaretten parçalı tanıma</button><button className="secondary" type="button" aria-pressed={saved.property===true} onClick={()=>set({property:true})}>Toplam, çarpım ve bölüm</button></div>
      {saved.property===true?<>
        <div className="f038-controls">{range("u","u payı",n("u",3,-24,24),-24,24)}{range("ud","u paydası",n("ud",1,1,12),1,12)}{range("v","v payı",n("v",-5,-24,24),-24,24)}{range("vd","v paydası",n("vd",1,1,12),1,12)}</div>
        <div className="f038-actions"><button className="secondary" type="button" onClick={()=>set({u:3,ud:1,v:-5,vd:1})}>Ters yön: 3 ve −5</button><button className="secondary" type="button" onClick={()=>set({u:-2,ud:1,v:-5,vd:1})}>Aynı yön: −2 ve −5</button><button className="secondary" type="button" onClick={()=>set({v:0,vd:1})}>Bölümde sıfır payda</button></div>
        <Movement u={properties.u} v={properties.v}/>
        <p data-model-result><strong>|u+v|={f(properties.absSum)} ≤ |u|+|v|={f(properties.sumOfAbs)}.</strong> {properties.triangleEquality?"Eşitlik var; sayılar aynı yönde veya en az biri sıfır.":"Eşitlik yok; ters yönlü hareketlerin bir bölümü birbirini götürüyor."}</p>
        <dl><div><dt>Çarpım</dt><dd>|uv|={f(properties.absProduct)}; |u||v|={f(properties.productOfAbs)}</dd></div><div><dt>Bölüm</dt><dd>{properties.quotient?`|u/v|=${f(properties.absQuotient)}; |u|/|v|=${f(properties.quotientOfAbs)}`:"v=0: iki bölüm de tanımsız; sıfıra bölünmez."}</dd></div><div><dt>Kare</dt><dd>u²={f(properties.square)}; |u²|={f(properties.absSquare)}. Bu değer u olmak zorunda değildir.</dd></div><div><dt>İki konumun uzaklığı</dt><dd>|u−v|={f(properties.distance)}; {properties.equalPoints?"iki konum aynı olduğu için sıfır":"konumlar farklı"}.</dd></div></dl>
      </>:<>
        <p>İncelenen ifade <strong>|({piece.a})x+({piece.b})|</strong>. Önce iç değerin işaretini bul; negatifse ifadenin tamamını ters işaretli yap.</p>
        <div className="f038-controls">{range("a","İç x katsayısı",piece.a,-6,6)}{range("b","İç sabit",piece.b,-12,12)}{trial}</div>
        <div className="f038-actions"><button className="secondary" type="button" onClick={()=>set({a:1,b:0,x:-7,xd:1})}>−7’nin uzaklığı</button><button className="secondary" type="button" onClick={()=>set({a:2,b:-4,x:1,xd:1})}>Negatif iç ifade</button><button className="secondary" type="button" onClick={()=>set({a:0,b:-3})}>Sabit iç ifade</button></div>
        <Movement u={piece.inside} v={{n:0,d:1}}/>
        <p data-model-result>x={f(piece.x)} için iç değer <strong>{f(piece.inside)}</strong>; {piece.selectedBranch==="negate"?"negatif olduğu için tamamı −1 ile çarpılır":"negatif olmadığı için aynı değer alınır"}. Sonuç <strong>{f(piece.value)}</strong>.</p>
        <p>{piece.constant?`a=0: ifade sabit ${piece.constantValue}; kırılma noktası yok.`:`Eşik x=${f(piece.threshold)}. Solunda (${piece.leftA})x+(${piece.leftB}); sağında ve eşikte (${piece.rightA})x+(${piece.rightB}). Eşikte iki yazım da 0 verir.`}</p>
      </>}
    </div>}

    {mode===1&&<div className="f038-panel" data-mode="solve">
      <p>Gerçek x için <strong>|({probe.a})x+({probe.b})| {sym(op)} {probe.k}</strong>. Önce sağ tarafın işaretini kontrol et; çizgi altındaki sayılar bütün çözüm kümesidir.</p>
      <div className="f038-controls">{range("a","İç x katsayısı",probe.a,-6,6)}{range("b","İç sabit",probe.b,-12,12)}{range("k","Sağ taraf k",probe.k,-12,12)}<fieldset className="f038-choices"><legend>İlişki</legend><div className="f038-choice-buttons">{(["=","<","<=",">",">="]as const).map(o=><button className="secondary" type="button" key={o} aria-pressed={op===o} onClick={()=>set({op:o})}>{sym(o)}</button>)}</div></fieldset>{trial}</div>
      <div className="f038-actions"><button className="secondary" type="button" onClick={()=>set({a:2,b:1,k:7,op:"=",x:3,xd:1})}>İki kök: |2x+1|=7</button><button className="secondary" type="button" onClick={()=>set({a:1,b:-5,k:0,op:"<="})}>Sıfır sağ taraf</button><button className="secondary" type="button" onClick={()=>set({a:2,b:-1,k:5,op:">="})}>İki dış bölge</button><button className="secondary" type="button" onClick={()=>set({a:1,b:-2,k:-1,op:"="})}>Negatif sağ taraf</button><button className="secondary" type="button" onClick={()=>set({a:0,b:-3,k:3,op:"="})}>Bütün gerçekler</button></div>
      {probe.a!==0&&probe.k>=0&&(op==="<"||op==="<=")&&<details className="f038-scaffold"><summary>Önce ara adımı düşün; sonra gerekçeli çözümü aç</summary><ol className="f038-steps"><li>İç aralık: {-probe.k} {sym(op)} ({probe.a})x+({probe.b}) {sym(op)} {probe.k}.</li><li>Üç taraftan ({probe.b}) çıkar: {-probe.k-probe.b} {sym(op)} ({probe.a})x {sym(op)} {probe.k-probe.b}.</li><li>{probe.a<0?"Negatif katsayıya bölünce iki yön de ters döner; küçük ucu yeniden sola yaz.":"Pozitif katsayıya bölünce iki yön de korunur."} Sonuç {probe.label}; uç kabulünü {sym(op)} ilişkisi belirler.</li></ol></details>}
      <SolutionLines rows={[{label:"Bütün uygun x değerleri",intervals:probe.intervals}]} trial={probe.x}/>
      <p data-model-result><strong>ÇK={probe.label}.</strong> Deneme x={f(probe.x)} için iç değer {f(probe.inside)}, mutlak değer {f(probe.value)}. {sym(op)} {probe.k} koşulu {probe.holds?"doğru":"yanlış"}; bu deneme çözüme {probe.member?"dahil":"dahil değil"}.</p>
      <p>{probe.a===0?"İç katsayı 0: sabit koşulun doğruluğu bütün x’ler için aynıdır; sıfıra bölünmez.":probe.k<0?"Uzaklık negatif olamaz. Sağ taraf negatifken =, <, ≤ boş; >, ≥ bütün gerçekleri verir.":`Merkez ${f(probe.center)}, yarıçap ${f(probe.radius)}. ${op==="="?"Eşitlik bu uzaklıktaki noktaları alır; sıfır yarıçapta iki aday çakışır.":op==="<"||op==="<="?"Küçüktür ilişkisi merkez çevresindeki iç bölgeyi alır.":"Büyüktür ilişkisi dış bölgeyi alır."} Eşitlik çizgisi uç kabulünü belirler.`}</p>
    </div>}

    {mode===2&&<div className="f038-panel" data-mode="graph">
      <p><strong>y=({graph.verticalSign})|({graph.a})x+({graph.b})|+({graph.offset})</strong>. İç katsayı, dış çarpan ve dış toplama sabiti ayrı işlemlerdir.</p>
      <div className="f038-controls">{range("ga","Grafikte iç x katsayısı",graph.a,-6,6)}{range("gb","Grafikte iç sabit",graph.b,-12,12)}{range("offset","Dış toplama sabiti",graph.offset,-8,8)}{trial}</div>
      <div className="f038-actions"><button className="secondary" type="button" aria-pressed={graph.verticalSign===1} onClick={()=>set({sign:1})}>Dış çarpan +1</button><button className="secondary" type="button" aria-pressed={graph.verticalSign===-1} onClick={()=>set({sign:-1})}>Dış çarpan −1</button><button className="secondary" type="button" onClick={()=>set({ga:1,gb:-2,sign:1,offset:-1})}>Tepe (2,−1)</button><button className="secondary" type="button" onClick={()=>set({ga:2,gb:-4,sign:1,offset:-1})}>Aynı tepe, iki kat eğim</button><button className="secondary" type="button" onClick={()=>set({ga:0,gb:-3,sign:1,offset:-3})}>Sabit sıfır grafiği</button></div>
      {(()=>{const roots=graph.roots.roots.map(value),xs=[-6,6,value(graph.x),...(graph.vertexX?[value(graph.vertexX)]:[]),...roots],minX=Math.floor(Math.min(...xs)-2),maxX=Math.ceil(Math.max(...xs)+2),grid=Array.from({length:(maxX-minX)*4+1},(_,i):Abs038Fraction=>({n:minX*4+i,d:4})),sampleXs=[...grid,...(graph.vertexX?[graph.vertexX]:[]),...graph.roots.roots,graph.x].sort((a,b)=>a.n*b.d-b.n*a.d).filter((q,i,all)=>i===0||q.n*all[i-1].d!==all[i-1].n*q.d),samples=sampleXs.map(q=>abs038Graph(graph.a,graph.b,graph.verticalSign,graph.offset,q.n,q.d)),ys=samples.map(p=>value(p.value)),minY=Math.min(-2,...ys,value(graph.value))-1,maxY=Math.max(2,...ys,value(graph.value))+1,px=(x:number)=>24+(x-minX)/(maxX-minX)*312,py=(y:number)=>236-(y-minY)/(maxY-minY)*212;
        return <figure className="f038-graph"><svg viewBox="0 0 360 260" role="img" aria-label={`Fonksiyon grafiği. ${graph.constant?`Sabit yükseklik ${graph.constantValue}.`:`Tepe ${f(graph.vertexX)}, ${f(graph.vertexY)}.`} Kökler ${graph.roots.label}. Seçilen nokta ${f(graph.x)}, ${f(graph.value)}. Pencere x aralığı ${minX} ile ${maxX}.`}><defs><clipPath id={`${id}-graph-clip`}><rect x="24" y="24" width="312" height="212"/></clipPath></defs><line x1="24" y1={py(0)} x2="336" y2={py(0)} className="f038-axis"/><line x1={px(0)} y1="24" x2={px(0)} y2="236" className="f038-axis"/><polyline points={samples.map(p=>`${px(value(p.x))},${py(value(p.value))}`).join(" ")} className="f038-curve" clipPath={`url(#${id}-graph-clip)`}/>{roots.map((r,i)=><circle key={i} cx={px(r)} cy={py(0)} r="5" className="f038-node-b"/>)}{graph.vertexX&&graph.vertexY&&<circle cx={px(value(graph.vertexX))} cy={py(value(graph.vertexY))} r="6" className="f038-node-a"/>}<path d={`M${px(value(graph.x))} ${py(0)}V${py(value(graph.value))}H${px(0)}`} className="f038-guide"/><circle cx={px(value(graph.x))} cy={py(value(graph.value))} r="5" className="f038-neutral"/></svg><figcaption><dl><div><dt>Eksenlerin kesişimi</dt><dd>(0, 0); yatay x, düşey y</dd></div><div className="f038-color-0"><dt>Tepe / sabit</dt><dd>{graph.constant?`Sabit y=${graph.constantValue}; V tepesi yok.`:`(${f(graph.vertexX)}, ${f(graph.vertexY)}); sol eğim ${graph.leftSlope}, sağ eğim ${graph.rightSlope}`}</dd></div><div className="f038-color-1"><dt>Kökler: y=0</dt><dd>{graph.roots.label}</dd></div><div><dt>Kılavuz çizgili deneme noktası</dt><dd>({f(graph.x)}, {f(graph.value)})</dd></div><div><dt>Görünen x penceresi</dt><dd>{minX}…{maxX}; eksenler ayrı ölçeklenir. Çizim pencere dışında da sürer.</dd></div></dl></figcaption></figure>;})()}
      <p data-model-result><strong>x={f(graph.x)} → y={f(graph.value)}.</strong> {graph.constant?"İç katsayı 0 olduğu için bütün grafik yataydır.":`Dış çarpan ${graph.verticalSign}; ${graph.verticalSign===1?"tepe en küçük":"tepe en büyük"} yüksekliktir. Dış çarpanı ters çevirmek, dış toplama sabiti ${graph.offset} değerini değiştirmez.`}</p>
    </div>}

    {mode===3&&<div className="f038-panel" data-mode="two-distances">
      <p><strong>|x−({distance.a})|+|x−({distance.b})|={distance.target}</strong>. İki noktaya ayrı uzaklıkları topla; toplam ile konum aynı şey değildir.</p>
      <div className="f038-controls">{range("first","İlk konum",distance.a,-12,12)}{range("second","İkinci konum",distance.b,-12,12)}{range("target","Toplam hedefi",distance.target,-12,36)}{trial}</div>
      <div className="f038-actions"><button className="secondary" type="button" onClick={()=>set({first:-1,second:2,target:3,x:0,xd:1})}>Arada sabit toplam</button><button className="secondary" type="button" onClick={()=>set({first:1,second:4,target:5,x:0,xd:1})}>İki dış çözüm</button><button className="secondary" type="button" onClick={()=>set({first:1,second:4,target:2})}>Minimumdan küçük hedef</button><button className="secondary" type="button" onClick={()=>set({first:2,second:2,target:0})}>İki konum aynı</button></div>
      <SolutionLines rows={[{label:"Toplamın en küçük olduğu bütün konumlar",intervals:distance.minimizers},{label:"Verilen toplam denkleminin çözümü",intervals:distance.equation}]} trial={distance.x}/>
      <p data-model-result>x={f(distance.x)} için uzaklıklar {f(distance.first)} ve {f(distance.second)}, toplam <strong>{f(distance.total)}</strong>. En küçük toplam {distance.gap}; bunu veren x kümesi {distance.minimizerLabel}. Verilen hedef için <strong>ÇK={distance.label}</strong>.</p>
      <p>Aralığın dışına çıkılan mesafe {f(distance.outsideDistance)}; toplamın minimuma eklediği miktar {f(distance.extraAboveMinimum)}=2×{f(distance.outsideDistance)}. Aradayken x’li parçalar birbirini götürür.</p>
    </div>}

    {mode===4&&<div className="f038-panel" data-mode="nested">
      <p><strong>||x−({nested.center})|−({nested.c})|={nested.r}</strong>. Önce dış çizgiyi çöz; elde edilen her iç uzaklık hedefinin negatif olup olmadığını ayrı kontrol et.</p>
      <div className="f038-controls">{range("center","İç uzaklık merkezi",nested.center,-12,12)}{range("inner","İç uzaklıktan çıkarılan sayı",nested.c,-12,12)}{range("outer","Dış hedef",nested.r,-12,12)}{trial}</div>
      <div className="f038-actions"><button className="secondary" type="button" onClick={()=>set({center:0,inner:3,outer:1})}>Dört kök</button><button className="secondary" type="button" onClick={()=>set({center:0,inner:2,outer:3})}>Negatif iç hedefi ele</button><button className="secondary" type="button" onClick={()=>set({center:0,inner:3,outer:3})}>Çakışan sıfırı tek say</button><button className="secondary" type="button" onClick={()=>set({outer:-1})}>Negatif dış hedef</button></div>
      {nested.r<0?<p>Dış uzaklık negatif olamayacağı için hiç kol açılmaz.</p>:<ol className="f038-steps">{nested.branches.map((branch,i)=><li key={i}>İç uzaklık hedefi {branch.target}: {branch.allowed?`kökler ${branch.roots.map(f).join(", ")}.`:"negatif olduğu için bu dal olanaksız."}</li>)}</ol>}
      <SolutionLines rows={[{label:"Geçerli bütün kökler; çakışanlar tek kez",intervals:nested.intervals}]} trial={nested.x}/>
      <p data-model-result><strong>ÇK={nested.label}.</strong> x={f(nested.x)} → iç uzaklık {f(nested.inner)}, dış çizginin içi {f(nested.outerInside)}, son değer {f(nested.value)}. Sonucun {nested.r} olması {nested.holds?"doğru":"yanlış"}.</p>
    </div>}

    {mode===5&&<div className="f038-panel" data-mode="pair">
      <div className="f038-actions" role="group" aria-label="Denklemin sağ tarafı"><button className="secondary" type="button" aria-pressed={pair.safeRight} onClick={()=>set({safeRight:true})}>|A|=B: işaret filtresi</button><button className="secondary" type="button" aria-pressed={!pair.safeRight} onClick={()=>set({safeRight:false})}>|A|=|B|: iki uzaklık</button></div>
      <p>A=({pair.a})x+({pair.b}), B=({pair.c})x+({pair.d}). <strong>{pair.safeRight?"|A|=B":"|A|=|B|"}</strong>; iki kol A=B veya A=−B. {pair.safeRight?"Sağda mutlak değer yok; ayrıca B≥0 korunmalıdır.":"İki taraf da uzaklıktır; ikisi de negatif değildir."}</p>
      <div className="f038-controls">{range("pa","A içindeki x katsayısı",pair.a,-6,6)}{range("pb","A içindeki sabit",pair.b,-12,12)}{range("pc","B içindeki x katsayısı",pair.c,-6,6)}{range("pd","B içindeki sabit",pair.d,-12,12)}{trial}</div>
      <div className="f038-actions"><button className="secondary" type="button" onClick={()=>set({pa:1,pb:0,pc:1,pd:-2,safeRight:true,x:1,xd:1})}>Kare alma: sahte x=1</button><button className="secondary" type="button" onClick={()=>set({pa:1,pb:-1,pc:2,pd:3,safeRight:false})}>İki farklı kök</button><button className="secondary" type="button" onClick={()=>set({pa:1,pb:0,pc:1,pd:0,safeRight:false})}>Özdeşlik</button></div>
      <SolutionLines rows={[{label:"İşaret filtresinden önce iki kolun adayları",intervals:pair.squaredCandidates},...(pair.safeRight?[{label:"Sağ taraf B≥0 koşulu",intervals:pair.rightSign}]:[]),{label:"Özgün denklemin bütün çözümleri",intervals:pair.intervals}]} trial={pair.x}/>
      <p data-model-result><strong>ÇK={pair.label}.</strong> x={f(pair.x)} → A={f(pair.A)}, B={f(pair.B)}; özgün sol taraf {f(pair.left)}, sağ taraf {f(pair.right)}. Eşitlik {pair.holds?"doğru":"yanlış"}. Kareler {pair.squaresEqual?"eşit":"eşit değil"}; bu bilgi özgün koşul denetiminin yerine geçmez.</p>
    </div>}

    {mode===6&&<div className="f038-panel" data-mode="parameter">
      <div className="f038-actions" role="group" aria-label="Koşullu örnek"><button className="secondary" type="button" aria-pressed={saved.ogm!==true} onClick={()=>set({ogm:false})}>Parametreyle kök sayısı</button><button className="secondary" type="button" aria-pressed={saved.ogm===true} onClick={()=>set({ogm:true,x:1,xd:8})}>OGM işaret örneği</button></div>
      <div className="f038-controls">{saved.ogm!==true&&range("m","Parametre m",parameter.m,-6,6)}{trial}</div>
      {saved.ogm===true?<>
        <p>x&gt;0 koşuluyla <strong>|3x|+|−2x|−|1+x|</strong>. Pozitif x için ilk uzaklık 3x, ikinci 2x, üçüncü 1+x; son çıkarma bütün üçüncü ifadeyi kapsar.</p>
        <Movement u={{n:5*Math.abs(ogm.x.n),d:ogm.x.d}} v={{n:-ogm.third.n,d:ogm.third.d}}/>
        <dl><div><dt>Birinci uzaklık</dt><dd>|3x|={f(ogm.first)}</dd></div><div><dt>İkinci uzaklık</dt><dd>|−2x|={f(ogm.second)}</dd></div><div><dt>Çıkarılan üçüncü uzaklık</dt><dd>|1+x|={f(ogm.third)}</dd></div></dl>
        <p data-model-result>x={f(ogm.x)} için özgün değer <strong>{f(ogm.value)}</strong>, 4x−1 değeri {f(ogm.derived)}. {ogm.allowed?"x>0 sağlanıyor; koşullu sadeleştirme geçerli.":"Bu x, verilen x>0 alanının dışında; tek bir eşleşme koşulu kaldırma izni vermez."}</p>
        <p>Uzaklıklar ayrı ayrı negatif değil; bunların çıkarıldığı bütün ifade negatif olabilir. Seçili OGM görüntüleyici 43/basılı 121 örneğine öğretim uyarlamasıdır; kitabın tamamı değildir.</p>
      </>:<>
        <p><strong>|x−2|=m−1</strong>. Sağ tarafın işareti kök sayısını belirler; parametrenin yalnız pozitif olması iki köke yetmez.</p>
        <div className="f038-actions"><button className="secondary" type="button" onClick={()=>set({m:0})}>m=0: hedef negatif</button><button className="secondary" type="button" onClick={()=>set({m:1})}>m=1: tek kök</button><button className="secondary" type="button" onClick={()=>set({m:3})}>m=3: iki kök</button></div>
        <SolutionLines rows={[{label:"Parametreye göre bütün kökler",intervals:parameter.intervals}]} trial={parameter.x}/>
        <p data-model-result>m={parameter.m}, sağ taraf m−1={parameter.r}; <strong>{parameter.count} farklı kök, ÇK={parameter.label}.</strong> Deneme x={f(parameter.x)} için uzaklık {f(parameter.value)}; eşitlik {parameter.holds?"doğru":"yanlış"}.</p>
      </>}
    </div>}

    {mode===7&&<div className="f038-panel" data-mode="scope">
      <div className="f038-actions" role="group" aria-label="Kapsam örneği"><button className="secondary" type="button" aria-pressed={scope.preset==="product"} onClick={()=>set({scope:"product",position:0})}>Çarpım: tek konum var mı?</button><button className="secondary" type="button" aria-pressed={scope.preset==="sum"} onClick={()=>set({scope:"sum",position:0})}>Yeni toplama aktarımı</button></div>
      <p>Hedef değer <strong>{scope.target}</strong>. Açılış çizgisi sabit; kapanış çizgisini değiştir ve çizginin kapsadığı işlemleri önce yap. Bunlar özgün öğretim karşılaştırmalarıdır; resmî soru diye puanlanmaz.</p>
      <div className="f038-actions" role="group" aria-label="Mutlak değer kapanış konumu">{scope.labels.map((label,i)=><button className="secondary" type="button" key={label} aria-pressed={scope.position===i} onClick={()=>set({position:i})}>{label}</button>)}</div>
      <figure className="f038-scope"><div className="f038-equation">{scope.expression}</div><svg viewBox="0 0 360 100" role="img" aria-label={`Seçilen kapanış ${scope.labels[scope.position]}. Sonuç ${scope.value}; hedef ${scope.target}.`}><line x1="24" y1="50" x2="336" y2="50" className="f038-axis"/>{scope.values.map((v,i)=>{const x=40+i*280/(scope.values.length-1);return <g key={i}><circle cx={x} cy="50" r={i===scope.position?12:7} className={v===scope.target?"f038-node-a":"f038-node-b"}/>{i===scope.position&&<path d={`M${x-7} 17L${x} 27L${x+7} 17`} className="f038-trial"/>}</g>;})}</svg><figcaption><ol>{scope.expressions.map((expression,i)=><li key={expression}>{expression}={scope.values[i]}; {scope.values[i]===scope.target?"hedefi sağlar":"hedefi sağlamaz"}{i===scope.position?"; şu anda seçili":""}.</li>)}</ol></figcaption></figure>
      <p data-model-result><strong>Seçilen sonuç {scope.value}; hedefi {scope.holds?"sağlıyor":"sağlamıyor"}.</strong> Hedefi sağlayan kapanış sayısı {scope.satisfyingPositions.length}: {scope.satisfyingPositions.map(i=>scope.labels[i]).join(", ")}. {scope.preset==="product"?"Bu çarpım verileri iki geçerli konum verir; tek cevap iddiası kurulamaz.":"Yeni sayılarla yalnız bir kapanış hedefi sağlar; bütün konumlar tek tek denetlendi."}</p>
    </div>}
    <p className="f038-note">Deneme aralıkları hesap güvenliği ve rahat kullanım için sınırlıdır; matematiksel kuralın bütün gerçek sayılardaki kapsamını daraltmaz. Şekiller şematik ve yeniden ölçeklenir. Seçimler yalnız keşif kaydında tutulur.</p>
  </section>;
}
