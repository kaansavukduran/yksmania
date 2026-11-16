import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";
import type { QuestionGuidance } from "../domain/questionHelpModel";

export type Point022 = { x: number; y: number };
const input022 = (n: number, limit = 1e6) => {
  if (!Number.isFinite(n) || Math.abs(n) > limit || (n !== 0 && Math.abs(n) < 1e-8)) throw new RangeError("MATH022_INPUT_SCOPE");
  return Object.is(n, -0) ? 0 : n;
};
const finite022 = (n: number) => {
  if (!Number.isFinite(n)) throw new RangeError("MATH022_PRECISION");
  return Object.is(n, -0) ? 0 : n;
};
function quadraticCore022(a: number, b: number, c: number) {
  if (a === 0) return { kind: b ? "linear" as const : c ? "none" as const : "all" as const, delta: null, roots: b ? [finite022(-c / b)] : [], complex: [] as Point022[], vertex: null, sum: null, product: null };
  const delta = finite022(b * b - 4 * a * c), h = -b / (2 * a), k = finite022(c - b * b / (4 * a));
  let roots: number[] = [], complex: Point022[] = [];
  if (delta === 0) roots = [finite022(h)];
  if (delta > 0) {
    // The q form avoids subtracting nearly equal numbers. A zero c is kept exact.
    const q = -.5 * (b + (b >= 0 ? 1 : -1) * Math.sqrt(delta));
    roots = [finite022(q / a), finite022(c / q)].sort((x, y) => x - y);
  }
  if (delta < 0) { const im = Math.sqrt(-delta) / (2 * Math.abs(a)); complex = [{x: h, y: im}, {x: h, y: -im}]; }
  return { kind: "quadratic" as const, delta, roots, complex, vertex: {x: finite022(h), y: k}, sum: finite022(-b / a), product: finite022(c / a) };
}
export function quadratic022(a: number,b:number,c:number){[a,b,c].forEach(n=>input022(n));return quadraticCore022(a,b,c);}
export function polynomialValue022(a: number, b: number, c: number, x: number) {
  [a,b,c,x].forEach(n => input022(n)); return finite022((a*x+b)*x+c);
}
export type ComplexOperation022 = "add" | "subtract" | "multiply" | "divide" | "conjugate" | "power";
export function complex022(z: Point022, w: Point022, operation: ComplexOperation022, exponent = 2) {
  [z.x,z.y,w.x,w.y].forEach(n => input022(n,100));
  if (!Number.isInteger(exponent) || Math.abs(exponent)>8 || !["add","subtract","multiply","divide","conjugate","power"].includes(operation)) throw new RangeError("MATH022_COMPLEX_SCOPE");
  const mul = (p: Point022,q: Point022): Point022 => ({x:finite022(p.x*q.x-p.y*q.y),y:finite022(p.x*q.y+p.y*q.x)});
  let result: Point022 | null = null;
  if(operation==="add") result={x:z.x+w.x,y:z.y+w.y};
  if(operation==="subtract") result={x:z.x-w.x,y:z.y-w.y};
  if(operation==="multiply") result=mul(z,w);
  if(operation==="conjugate") result={x:z.x,y:-z.y};
  if(operation==="divide") { const d=w.x*w.x+w.y*w.y; if(d) result={x:(z.x*w.x+z.y*w.y)/d,y:(z.y*w.x-z.x*w.y)/d}; }
  if(operation==="power") {
    // z^0=1 is used for nonzero z; 0^0 is deliberately not assigned a value.
    if(z.x!==0 || z.y!==0 || exponent>0) {
      result={x:1,y:0}; for(let i=0;i<Math.abs(exponent);i++) result=mul(result,z);
      if(exponent<0) { const d=result.x*result.x+result.y*result.y; result={x:result.x/d,y:-result.y/d}; }
    }
  }
  if(result) result={x:finite022(result.x),y:finite022(result.y)};
  return {result, modulus: Math.hypot(z.x,z.y), otherModulus: Math.hypot(w.x,w.y), resultModulus: result?Math.hypot(result.x,result.y):null, argument: z.x||z.y?Math.atan2(z.y,z.x):null};
}
export type Relation022 = "gt" | "ge" | "lt" | "le";
export type Factor022 = {root:number; multiplicity:number; denominator?:boolean};
export type Interval022 = {lo:number;hi:number;leftClosed:boolean;rightClosed:boolean};
export function signChart022(factors: Factor022[], leading: number, relation: Relation022, lower: number|null = null, upper: number|null = null) {
  input022(leading,100); if(!leading || factors.length>6 || !["gt","ge","lt","le"].includes(relation)) throw new RangeError("MATH022_SIGN_SCOPE");
  for(const f of factors) { input022(f.root,20); if(!Number.isInteger(f.multiplicity)||f.multiplicity<1||f.multiplicity>4||typeof(f.denominator??false)!=="boolean")throw new RangeError("MATH022_SIGN_FACTOR"); }
  if(lower!==null)input022(lower,20);if(upper!==null)input022(upper,20);
  const cuts=[...new Set([...factors.map(f=>f.root),...(lower===null?[]:[lower]),...(upper===null?[]:[upper])])].sort((a,b)=>a-b);
  const valueSign=(x:number):number|null=>{
    if(factors.some(f=>f.denominator&&x===f.root))return null;
    let sign=Math.sign(leading);for(const f of factors){if(x===f.root)return 0;if(x<f.root&&f.multiplicity%2)sign=-sign;}return sign;
  };
  const accepts=(x:number,sign:number|null)=>sign!==null&&(lower===null||x>=lower)&&(upper===null||x<=upper)&&(relation==="gt"?sign>0:relation==="ge"?sign>=0:relation==="lt"?sign<0:sign<=0);
  const points=cuts.map(x=>({x,sign:valueSign(x),included:accepts(x,valueSign(x)),numerator:factors.filter(f=>f.root===x&&!f.denominator).reduce((n,f)=>n+f.multiplicity,0),denominator:factors.filter(f=>f.root===x&&f.denominator).reduce((n,f)=>n+f.multiplicity,0)}));
  const edges=[-Infinity,...cuts,Infinity];
  const regions=edges.slice(0,-1).map((lo,i)=>{const hi=edges[i+1];let sign=Math.sign(leading);for(const f of factors)if(f.root>=hi&&f.multiplicity%2)sign=-sign;const within=(lower===null||lo>=lower)&&(upper===null||hi<=upper),correct=relation==="gt"||relation==="ge"?sign>0:sign<0;return{lo,hi,sign,included:within&&correct};});
  const atoms:Interval022[]=[];regions.forEach((r,i)=>{if(r.included)atoms.push({lo:r.lo,hi:r.hi,leftClosed:false,rightClosed:false});if(points[i]?.included)atoms.push({lo:points[i].x,hi:points[i].x,leftClosed:true,rightClosed:true});});
  const solution:Interval022[]=[];for(const atom of atoms){const last=solution.at(-1);if(last&&last.hi===atom.lo&&(last.rightClosed||atom.leftClosed)){last.hi=atom.hi;last.rightClosed=atom.rightClosed;}else solution.push({...atom});}
  return {cuts,points,regions,solution};
}
export function parabola022(a:number,b:number,c:number,slope:number,intercept:number,left:number,right:number) {
  [a,b,c,slope,intercept].forEach(n=>input022(n));[left,right].forEach(n=>input022(n,100));
  if(!a||left>right)throw new RangeError("MATH022_PARABOLA_SCOPE");
  const base=quadraticCore022(a,b,c),intersection=quadraticCore022(a,b-slope,c-intercept),vertex=base.vertex!;
  const value=(x:number)=>finite022((a*x+b)*x+c);
  const candidates=[{x:left,y:value(left)},{x:right,y:value(right)},...(vertex.x>=left&&vertex.x<=right?[vertex]:[])];
  const minimum=candidates.reduce((p,q)=>q.y<p.y?q:p),maximum=candidates.reduce((p,q)=>q.y>p.y?q:p);
  // A line parallel to y=mx+n and tangent to the parabola has x=(m-b)/(2a).
  const nearestX=(slope-b)/(2*a),nearestY=value(nearestX),tangentIntercept=nearestY-slope*nearestX;
  return {vertex,roots:base.roots,delta:base.delta,intersections:intersection.roots.map(x=>({x,y:value(x)})),intersectionDelta:intersection.delta,minimum,maximum,axis:vertex.x,tangent:{x:nearestX,y:nearestY,intercept:tangentIntercept},distance:intersection.roots.length?0:Math.abs(tangentIntercept-intercept)/Math.hypot(slope,1)};
}
const trigRaw022=(degrees:number)=>{
  const signed=degrees%360,quarter=Math.round(signed/90),remainder=signed-quarter*90,index=(quarter%4+4)%4;
  let reduced=signed;if(reduced<0)reduced+=360;
  // Evaluate the small signed remainder, rather than subtracting nearly 2π in trig functions.
  const rad=remainder/180*Math.PI,c=Math.cos(rad),s=Math.sin(rad);
  const x=remainder===0?[1,0,-1,0][index]:[c,-s,-c,s][index],y=remainder===0?[0,1,0,-1][index]:[s,c,-s,-c][index];
  return {degrees:reduced,radians:degrees/180*Math.PI,x,y,tan:x===0?null:y/x,cot:y===0?null:x/y,sec:x===0?null:1/x,csc:y===0?null:1/y};
};
export function trig022(degrees:number){input022(degrees,36000);return trigRaw022(degrees);}
export type TrigFunction022 = "sin"|"cos"|"tan"|"cot";
export function wave022(kind:TrigFunction022,amplitude:number,frequency:number,phase:number,offset:number,x:number){
  if(!["sin","cos","tan","cot"].includes(kind))throw new RangeError("MATH022_WAVE_KIND");
  input022(amplitude,5);input022(frequency,8);input022(phase,1080);input022(offset,10);input022(x,7200);
  if(!amplitude)throw new RangeError("MATH022_WAVE_AMPLITUDE");
  const argument=finite022(frequency*x+phase),t=trigRaw022(argument),v=kind==="sin"?t.y:kind==="cos"?t.x:t[kind],period=frequency?(kind==="sin"||kind==="cos"?360:180)/Math.abs(frequency):null;
  const value=v===null?null:finite022(amplitude*v+offset),range=frequency===0?(value===null?null:[value,value]):kind==="sin"||kind==="cos"?[offset-Math.abs(amplitude),offset+Math.abs(amplitude)]:null;
  return{argument,value,period,range,branch:kind==="tan"?Math.floor((argument+90)/180):kind==="cot"?Math.floor(argument/180):0};
}
export function triangle022(b:number,c:number,angle:number){
  [b,c].forEach(n=>input022(n,20));input022(angle,180);if(b<=0||c<=0||angle<=0||angle>=180)throw new RangeError("MATH022_TRIANGLE_SCOPE");
  const A=angle/180*Math.PI,t=trigRaw022(angle),s=t.y,co=t.x,a=Math.hypot(b*co-c,b*s),B=Math.atan2(b*s,c-b*co),C=Math.atan2(c*s,b-c*co);
  return {a,b,c,A,B,C,area:b*c*s/2,circumradius:a/(2*s),points:[{x:0,y:0},{x:c,y:0},{x:b*co,y:b*s}]};
}
export function trigRoots022(kind:TrigFunction022,target:number){
  input022(target,100);if(!["sin","cos","tan","cot"].includes(kind))throw new RangeError("MATH022_TRIG_KIND");
  if((kind==="sin"||kind==="cos")&&Math.abs(target)>1)return[];
  const principal=kind==="sin"?Math.asin(target)*180/Math.PI:kind==="cos"?Math.acos(target)*180/Math.PI:kind==="tan"?Math.atan(target)*180/Math.PI:Math.atan2(1,target)*180/Math.PI;
  const normalize=(n:number)=>{const r=n%360;return Object.is(r,-0)?0:r<0?r+360:r;};
  const roots=kind==="sin"?[principal,180-principal]:kind==="cos"?[principal,-principal]:[principal,principal+180];
  return [...new Set(roots.map(normalize))].sort((a,b)=>a-b);
}

type Card022={prompt:string;correct:string;distractors:string[];hint:string;explanation:string};
type Pack022=LessonGuide&{topic:string;title:string;questions:Card022[]};
const packs022: Pack022[] = [
  {
    "id": "ayt-ikinci-dereceden-denklemler",
    "topic": "detail-465",
    "title": "İkinci dereceden denklemler: kökten katsayıya",
    "minutes": 100,
    "objectives": [
      "Denklemi eşdeğer biçime getir; dereceyi ve tanım koşulunu denetle.",
      "Kökleri farklı yöntemlerle bul ve kök–katsayı ilişkilerini gerekçelendir.",
      "Parametre, kök dönüşümü ve iki denklemin ortak çözümünü adım adım kur."
    ],
    "sections": [
      {
        "title": "Önce denklem türünü gerçekten belirle",
        "paragraphs": [
          "a, b, c gerçek ve a≠0 iken ax²+bx+c=0 ikinci dereceden bir bilinmeyenli denklemdir. En büyük kuvvetin iki görünmesi tek başına yetmez: terimler düzenlendikten sonra x² katsayısı sıfır olmamalı, x değişkeni paydada veya kök içinde bulunmamalıdır. 3x²+x=2x²+5 düzenlenince x²+x−5=0 olur.",
          "Parametre varsa önce hangi değerin dereceyi düşürdüğünü ayır. (m−1)x²+2x−3=0, m=1 için birinci derecedendir ve x=3/2 verir. İkinci derece formülünde a yerine sıfır yazmak bu özel durumu çözmez; yalnız sıfıra bölme üretir."
        ]
      },
      {
        "title": "Eşdeğer adımlarla çözüm kümesini koru",
        "paragraphs": [
          "İki tarafa aynı ifadeyi eklemek veya sıfır olmayan sabitle çarpmak çözümü korur. Değişken içeren bir ifadeye bölmeden önce o ifadenin sıfır olduğu durumu ayrıca incele. x²=3x denkleminde x’e bölüp yalnız x=3 bulmak, x=0 çözümünü kaybettirir. Bunun yerine x(x−3)=0 yaz.",
          "Paydalı bir denklemin paydalarını yok etmeden önce yasak değerleri kaydet. (x²−4)/(x−2)=0 için x≠2; payın sıfırları −2 ve 2 arasından yalnız −2 kalır. Bulduğun adayları ilk denklemde denetlemek, sadeleştirme sırasında genişleyen bir kümeyi tekrar daraltır."
        ]
      },
      {
        "title": "Sıfır çarpımını gerekçesiyle kullan",
        "paragraphs": [
          "Gerçek veya karmaşık sayılarda iki sayının çarpımı sıfırsa çarpanlardan en az biri sıfırdır. 2x²−7x+3=(2x−1)(x−3) olduğundan kökler 1/2 ve 3’tür. Orta terimi de açarak kontrol et: −6x−x=−7x. Çarpan tahmini bu çapraz toplamı sağlamalıdır.",
          "Çarpım sıfır değilse her çarpanı ayrı ayrı o sayıya eşitleyemezsin. (x−1)(x+2)=6 önce açılıp x²+x−8=0 yapılabilir. Sağ tarafı sıfıra getirmen, sıfır çarpımı kuralını kullanabileceğin doğru yapıyı oluşturur."
        ]
      },
      {
        "title": "Tam kareye tamamlama neden çalışır",
        "paragraphs": [
          "x²+6x+2=0 denkleminde x²+6x=(x+3)²−9 yazılır. Böylece (x+3)²=7 ve x=−3±√7 elde edilir. Her iki işareti almak gerekir; karesi 7 olan iki gerçek sayı √7 ve−√7’dir. Sağ taraf negatif olursa gerçek sayılarda çözüm bulunmaz.",
          "a≠0 için önce a’ya böl: x²+(b/a)x+c/a=0. (x+b/(2a))²=(b²−4ac)/(4a²) bulunur. Bu işlem hem kök formülünü hem tepe noktasını üretir; farklı görünen iki konu aynı kare tamamlama adımından doğar."
        ]
      },
      {
        "title": "Diskriminant kök sayısını belirler",
        "paragraphs": [
          "Δ=b²−4ac denklemin diskriminantıdır. Δ>0 iki farklı gerçek kök, Δ=0 tek farklı gerçek değer ve cebirsel olarak iki katlı kök, Δ<0 gerçek çözüm yok demektir. Çözüm kümesi tekrar eden aynı sayıyı iki kez içermez: (x−2)²=0 için küme {2} olur.",
          "Bu sınıflama gerçek katsayılı ve a≠0 bir ikinci derece denklem içindir. Δ<0 ifadesi bütün sayı sistemlerinde çözümsüzlük anlamına gelmez; karmaşık sayılarda eşlenik iki kök vardır. Sorunun çözümü hangi kümede istediğini baştan belirt."
        ]
      },
      {
        "title": "Kök formülünü bütün paya uygula",
        "paragraphs": [
          "Gerçek kökler x=(−b±√Δ)/(2a) ile bulunur. Payda, −b’ye de köklü terime de uygulanır. 2x²+3x−2=0 için Δ=25, kökler (−3+5)/4=1/2 ve(−3−5)/4=−2 olur. Eksi b yazarken b negatifse işaretin değiştiğini özellikle izle.",
          "Kökler çok farklı büyüklükteyse bilgisayar hesabında yakın sayıları çıkarma hassasiyet kaybettirebilir. Etkileşimli model bu nedenle eşdeğer kararlı bir hesap kullanır; öğretimde formülü ve çarpım kontrolünü birlikte görürsün. Ekrandaki yuvarlatılmış değer, kesin köklü cevabın yerine geçmez."
        ]
      },
      {
        "title": "Kökler toplamı ve çarpımı nereden gelir",
        "paragraphs": [
          "Kökler α ve β ise a(x−α)(x−β)=a[x²−(α+β)x+αβ] olur. Katsayıları ax²+bx+c ile karşılaştırınca S=α+β=−b/a, P=αβ=c/a bulunur. Toplamdaki eksi işareti açılımdan gelir; ezberlenen işaretin gerekçesi budur.",
          "Bu eşitlikler karmaşık köklerde de geçerlidir. Ancak gerçek köklerin pozitifliği, aralığı veya sıralaması sorulursa gerçeklik koşulunu ayrıca denetlemelisin. Katsayılardan S ve P bulabilmek, köklerin gerçek olduğunu tek başına garanti etmez."
        ]
      },
      {
        "title": "Kökleri tek tek bulmadan simetrik ifadeleri hesapla",
        "paragraphs": [
          "α²+β²=S²−2P, (α−β)²=S²−4P ve α³+β³=S³−3PS olur. Örneğin S=5, P=3 için kareler toplamı 25−6=19’dur. Bu yöntem kök formülündeki köklü sayıları hesaplayıp sonra yeniden toplama yükünü azaltır.",
          "P≠0 ise 1/α+1/β=S/P ve α/β+β/α=(S²−2P)/P bulunur. Paydalı hedefin tanımını kontrol et; c=0 durumunda en az bir kök sıfır olabilir ve bu ifadeler tanımsızlaşır. Bir formülün kullanılabildiği yer, kendi paydasının sıfır olmadığı yerdir."
        ]
      },
      {
        "title": "Kök farkı ve köklerin sırası",
        "paragraphs": [
          "İki gerçek kök için |α−β|=√Δ/|a| olur. Mutlak değerde |a| gerekir; negatif a ile negatif bir uzaklık bulunamaz. Δ=0 iken fark sıfırdır. Δ>0 olduğunda kökleri küçükten büyüğe sıralamak istersen formüldeki ± işaretine, a’nın işaretini düşünmeden ad veremezsin.",
          "Köklerin sayısal değerleri verilmeden de bu uzaklık hesaplanabilir. 2x²−8x+3=0 için Δ=40, fark √40/2=√10’dur. Uzaklığı kareleyip S²−4P ile denetleyebilirsin; iki yöntem aynı sonucu vermelidir."
        ]
      },
      {
        "title": "Kökleri verilen denklemi yeniden kur",
        "paragraphs": [
          "Toplamı S, çarpımı P olan köklerin monik denklemi x²−Sx+P=0’dır. Kökler −2 ve 5 ise S=3, P=−10, denklem x²−3x−10=0 olur. Baş katsayı belirtilmiyorsa bunun sıfır olmayan sabit katları da aynı çözüm kümesini verir.",
          "Kökleri değiştirince önce yeni toplam ve çarpımı bul. α ve β yerine α+t, β+t için yeni toplam S+2t, yeni çarpım P+tS+t² olur. Yeni bilinmeyeni eski kökten ayırmak adına y=α+t yazabilir; x yerine y−t koyarak da aynı denklemi doğrulayabilirsin."
        ]
      },
      {
        "title": "Ters ve kat kökler için tanım koşulu koy",
        "paragraphs": [
          "αβ≠0 ise 1/α ve 1/β köklerinin toplamı S/P, çarpımı 1/P olur. Monik denklem y²−(S/P)y+1/P=0, paydalar kaldırılınca Py²−Sy+1=0 biçimini alır. Sıfır bir kökün tersini alıp yeni bir kök varmış gibi yazamazsın.",
          "kα ve kβ kökleri için toplam kS, çarpım k²P’dir. k=0 durumunda iki değer de 0’a çöker; elde edilen y²=0 aynı tek farklı kökü gösterir. Buna karşılık kökleri ölçekleyen yerine koyma yöntemi y/k kullanılıyorsa k=0 ayrı ele alınmalıdır."
        ]
      },
      {
        "title": "Köklerin işaretini katsayılardan oku",
        "paragraphs": [
          "Gerçek köklerde P<0 ise kökler zıt işaretlidir. P>0 ve S>0 ikisi pozitif, P>0 ve S<0 ikisi negatiftir. P=0 en az bir kökün sıfır olduğunu gösterir; bu durumda ikisi de kesin pozitif veya negatif denemez.",
          "Aynı işaretli kök şartına Δ≥0 koşulunu ekle. Örneğin x²−2x+5 için S=2, P=5 pozitiftir ama Δ<0 olduğundan iki pozitif gerçek kök yoktur. Farklı iki pozitif gerçek kök isteniyorsa Δ>0, S>0, P>0 birlikte sağlanmalıdır."
        ]
      },
      {
        "title": "Parametreyi koşulların kesişimiyle bul",
        "paragraphs": [
          "Bir denklem ailesinde önce a≠0, sonra istenen kök sayısı için Δ, sonra işaret veya aralık koşulları yazılır. x²−4x+m=0 için farklı iki gerçek kök m<4, iki pozitif farklı kök ayrıca m>0 demektir; sonuç 0<m<4’tür.",
          "Uçlarda ne olduğunu kontrol et: m=0 köklerden birini 0 yapar, m=4 iki kökü birleştirir. Bu uç testleri açık aralığın neden gerektiğini gösterir. Bir koşuldan bulduğun değerleri diğerine otomatik taşımadan ortak bölgeyi al."
        ]
      },
      {
        "title": "Değişken değiştirirken yeni kümenin sınırını tut",
        "paragraphs": [
          "x⁴−5x²+4=0 için t=x²≥0 alırsan t²−5t+4=0 elde edilir. t=1 ve 4 için x=±1,±2 bulunur. Dördüncü derece başlangıç denkleminin dört kökü olabilir; ikinci derece sınırı yalnız t denklemi içindir.",
          "t=x² ile bulunan negatif t gerçek x üretmez. t=x+1/x kullanılırsa x≠0 ve gerçek x için |t|≥2 gibi ek koşullar vardır. Yerine koymanın işlem kolaylığına karşılık, yeni değişkenin hangi değerleri alabileceğini bir kenara yaz."
        ]
      },
      {
        "title": "Karekök içeren denklemde adayları geri denetle",
        "paragraphs": [
          "√(x+4)=x−2 için sağ tarafın da negatif olmaması gerekir: x≥2. Kare alınca x+4=x²−4x+4, yani x(x−5)=0 çıkar; aday 0 ve 5’ten yalnız 5 ilk denklemi sağlar. Kare alma, iki tarafın işaretini unuttuğu için fazla aday üretebilir.",
          "Tanım kümesi ile işaret şartını işlem başında ayırmak çözümü hızlandırır. Denklemin iki tarafını karesini almak tek yönlü bir çıkarımdır; adayların ilk eşitlikte doğrulanmasıyla eşdeğer çözüm tamamlanır. Gerçek kök ile cebirsel aday aynı şey değildir."
        ]
      },
      {
        "title": "Bir metin problemini denkleme dönüştür",
        "paragraphs": [
          "Kenarları x ve x+3 metre olan dikdörtgenin alanı 40 m² ise x(x+3)=40, x²+3x−40=0 olur. Kökler 5 ve−8’dir; uzunluk koşulu x>0 olduğundan yalnız 5 m kabul edilir. Cebirsel çözümün fiziksel anlamını birim ve aralık seçer.",
          "İlk bilinmeyenin neyi ölçtüğünü yaz, sonra ilişkileri aynı birime getir. Zaman, adet veya uzunluk negatif olamaz diye kestirme bir kontrol yapılabilir; ama ekonomik kâr veya koordinat gibi nicelikler negatif olabileceği için bağlama göre karar ver. Modelin kabul ettiği kökü problem de kabul etmeyebilir."
        ]
      },
      {
        "title": "İki bilinmeyenli sistemi bir değişkene indir",
        "paragraphs": [
          "Bir doğru ve ikinci derece bağıntı birlikte verildiğinde yerine koyma veya yok etme kullanılır. y=x+1 ve x²+y²=13 için x²+(x+1)²=13, x²+x−6=0 elde edilir. x=2, −3; karşılık gelen y=3, −2 olur. Çözüm kümesi sayılar değil sıralı ikililerdir.",
          "Her ikiliyi iki başlangıç denkleminde de denetle. İki ikinci derece bağıntıdan oluşan sistem her zaman tek bir ikinci derece denkleme indirgenmeyebilir; dört kesişim gibi daha fazla nokta mümkündür. Grafikte görülen yaklaşık kesişim hesabın yerine değil, sonucunun yanına konur."
        ]
      },
      {
        "title": "Son kontrolü katsayı ve yerine koymayla yap",
        "paragraphs": [
          "Kökleri bulduktan sonra S=−b/a ve P=c/a denetimini uygula. Köklerin tek tek ilk denklemi sağlaması, yanlış kök sırasından veya işaret taşımadan gelen hataları yakalar. Tekrarlı kökü çözüm kümesinde bir kez, çarpan gösteriminde iki katlı olarak yaz.",
          "Etkileşimli modelde a’yı 0 yaparak derece kaybını, c’yi değiştirerek Δ’nın işaretini ve gerçek eksen kesimlerini karşılaştır. Kendi tahminini sayısal kanıtla açıkla. Bu keşif bir alıştırmadır; modeli oynatmak otomatik konu tamamlama, doğru cevap veya XP kaydı oluşturmaz."
        ]
      }
    ],
    "examples": [
      {
        "title": "Derece düşen aile",
        "prompt": "(m−2)x²+3x−6=0 denkleminde m=2 için çözüm nedir?",
        "strategy": "Önce baş katsayıyı değerlendir.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "m−2=0 olduğundan x² terimi kaybolur; denklem ikinci derece değildir."
          },
          {
            "label": "2. adım",
            "explanation": "3x−6=0 eşitliğini çöz: 3x=6, x=2."
          },
          {
            "label": "3. adım",
            "explanation": "İlk denklemde m=2, x=2 yaz: 0+6−6=0."
          }
        ],
        "answer": "Çözüm kümesi {2}.",
        "check": "İkinci derece formülünün paydası 0’a dönmez; o formüle hiç başvurulmaz.",
        "pitfall": "Parametre özel değerinde Δ ve 2a formülünü zorlamamak gerekir."
      },
      {
        "title": "Tam kare ile kök",
        "prompt": "2x²+8x+1=0 denklemini gerçek sayılarda çöz.",
        "strategy": "İkiye böl ve tam kareye tamamla.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "x²+4x+1/2=0, yani x²+4x=−1/2."
          },
          {
            "label": "2. adım",
            "explanation": "(x+2)²=4−1/2=7/2 olduğundan x+2=±√14/2."
          },
          {
            "label": "3. adım",
            "explanation": "x=−2±√14/2; toplam−4 ve çarpım 4−14/4=1/2 olur."
          }
        ],
        "answer": "{−2−√14/2, −2+√14/2}.",
        "check": "−b/a=−4 ve c/a=1/2 ile uyuşur.",
        "pitfall": "Karekökten yalnız pozitif işareti seçme."
      },
      {
        "title": "Kökler hesaplanmadan oran",
        "prompt": "x²−5x+3=0 denkleminin kökleri α, β. α/β+β/α nedir?",
        "strategy": "Paydayı ve simetrik kareler toplamını kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "S=α+β=5 ve P=αβ=3; P≠0 olduğundan oran tanımlı."
          },
          {
            "label": "2. adım",
            "explanation": "α²+β²=S²−2P=25−6=19."
          },
          {
            "label": "3. adım",
            "explanation": "α/β+β/α=(α²+β²)/(αβ)=19/3."
          }
        ],
        "answer": "19/3.",
        "check": "Kökleri tek tek bulmak gerekmez.",
        "pitfall": "Kareler toplamını S² sanma."
      },
      {
        "title": "Kökleri iki birim kaydır",
        "prompt": "x²−3x−2=0 denkleminin kökleri α, β. α+2 ve β+2 köklü monik denklem nedir?",
        "strategy": "Yeni toplam ve çarpımı kur.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Eski S=3, P=−2. Yeni toplam 3+4=7."
          },
          {
            "label": "2. adım",
            "explanation": "Yeni çarpım P+2S+4=−2+6+4=8."
          },
          {
            "label": "3. adım",
            "explanation": "Yeni monik denklem y²−7y+8=0; eski denklemde x=y−2 yazınca da aynısı çıkar."
          }
        ],
        "answer": "y²−7y+8=0.",
        "check": "Sabit terimi yeni köklerin çarpımıdır.",
        "pitfall": "Yalnız x katsayısını değiştirmek yeterli değildir."
      },
      {
        "title": "Pozitif farklı kök şartı",
        "prompt": "x²−6x+m=0 iki farklı pozitif gerçek köke sahip olsun. m hangi aralıktadır?",
        "strategy": "Gerçeklik, toplam ve çarpımı birlikte kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Δ=36−4m>0 olduğundan m<9."
          },
          {
            "label": "2. adım",
            "explanation": "S=6>0 zaten sağlanır; pozitif kökler için P=m>0 gerekir."
          },
          {
            "label": "3. adım",
            "explanation": "Koşulların kesişimi 0<m<9; m=0 sıfır kök, m=9 çift kök verir."
          }
        ],
        "answer": "m∈(0,9).",
        "check": "İki sınır da istenen farklı-pozitif koşulunu bozuyor.",
        "pitfall": "Δ koşulunu tek başına yeterli sayma."
      },
      {
        "title": "Yeni değişkenin kümesi",
        "prompt": "x⁴+x²−6=0 denkleminin gerçek çözüm kümesini bul.",
        "strategy": "t=x²≥0 dönüşümü yap.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "t²+t−6=(t+3)(t−2)=0 olduğundan t=−3 veya 2."
          },
          {
            "label": "2. adım",
            "explanation": "t=x²≥0 olduğu için t=−3 elenir; x²=2 kalır."
          },
          {
            "label": "3. adım",
            "explanation": "x=±√2 değerleri ilk denklemde 4+2−6=0 verir."
          }
        ],
        "answer": "{−√2, √2}.",
        "check": "t kökleri ile x köklerinin sayısı farklıdır.",
        "pitfall": "Negatif t değerinden gerçek karekök üretme."
      },
      {
        "title": "Doğru ile çember sistemi",
        "prompt": "y=x−1 ve x²+y²=25 sistemini çöz.",
        "strategy": "Doğru denklemini ikinci bağıntıya yerleştir.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "x²+(x−1)²=25 ⇒2x²−2x−24=0 ⇒x²−x−12=0."
          },
          {
            "label": "2. adım",
            "explanation": "(x−4)(x+3)=0, x=4 veya−3. y=x−1 ile y=3 veya−4."
          },
          {
            "label": "3. adım",
            "explanation": "(4,3) için 16+9=25; (−3, −4) için 9+16=25 ve her ikisi doğruyu sağlar."
          }
        ],
        "answer": "{(4; 3), (−3; −4)}.",
        "check": "Çözüm bir x listesi değil iki sıralı ikilidir.",
        "pitfall": "x’leri bulup y’leri yazmayı atlama."
      }
    ],
    "recall": [
      {
        "prompt": "a=0 olduğunda hangi adım önce gelir?",
        "answer": "Denklem yeniden sınıflanır; b≠0 ise doğrusal, b=0 ise c’ye göre tüm gerçekler veya boş kümedir."
      },
      {
        "prompt": "Δ=0 durumunda çözüm kümesi kaç farklı eleman taşır?",
        "answer": "Bir; cebirsel kökün iki katlı olması kümede tekrar yazılmasını gerektirmez."
      },
      {
        "prompt": "Köklerden denklem kurarken sabit terim nedir?",
        "answer": "Monik denklemde köklerin çarpımı; x²−Sx+P=0."
      },
      {
        "prompt": "İki pozitif farklı gerçek kökün koşulları?",
        "answer": "a≠0, Δ>0, −b/a>0 ve c/a>0."
      },
      {
        "prompt": "Ters kök dönüşümünde hangi koşul unutulmaz?",
        "answer": "αβ≠0; sıfırın çarpmaya göre tersi yoktur."
      },
      {
        "prompt": "Bir kare alma adımından sonra neden geri kontrol gerekir?",
        "answer": "Kare alma işareti kaybedip başlangıçta çözüm olmayan adaylar üretebilir."
      }
    ],
    "questions": [
      {
        "prompt": "(m−3)x²+4x−8=0 denkleminde m=3 alınırsa gerçek çözüm kümesi nedir?",
        "correct": "{2}",
        "distractors": [
          "{−2}",
          "{−2,2}",
          "∅",
          "ℝ"
        ],
        "hint": "Önce x² katsayısını değerlendir.",
        "explanation": "m=3 için denklem 4x−8=0 olur; doğrusal çözüm x=2’dir. Δ formülünü a=0 durumuna uygulamayız."
      },
      {
        "prompt": "2x²−5x−3=0 denkleminin gerçek çözüm kümesi nedir?",
        "correct": "{−1/2,3}",
        "distractors": [
          "{1/2, −3}",
          "{−1,3}",
          "{−3,1/2}",
          "{−1/2, −3}"
        ],
        "hint": "Çarpanlar (2x+1) ve(x−3) olabilir.",
        "explanation": "(2x+1)(x−3)=2x²−5x−3. Çarpanları sıfıra eşitleyince −1/2 ve 3 bulunur; toplam 5/2 ve çarpım−3/2 ile denetlenir."
      },
      {
        "prompt": "x²+4x+7=0 denkleminin gerçek sayılar kümesinde kaç farklı kökü vardır?",
        "correct": "0",
        "distractors": [
          "1",
          "2",
          "3",
          "Sonsuz"
        ],
        "hint": "Önce Δ=b²−4ac=16−28 değerinin işaretini bul.",
        "explanation": "Δ=−12<0 olduğundan gerçek kök yoktur. Karmaşık köklerin bulunması gerçek kök sayısını değiştirmez."
      },
      {
        "prompt": "3x²−12x+12=0 denkleminin gerçek çözüm kümesi hangisidir?",
        "correct": "{2}",
        "distractors": [
          "{−2,2}",
          "{4}",
          "∅",
          "{−2}"
        ],
        "hint": "Ortak 3 çarpanından sonra tam kareyi gör.",
        "explanation": "Denklem 3(x−2)²=0 olur. x=2 iki katlı köktür; çözüm kümesinde yalnız bir kez yer alır."
      },
      {
        "prompt": "x²−7x+4=0 denkleminin kökleri α ve β ise α²+β² kaçtır?",
        "correct": "41",
        "distractors": [
          "49",
          "45",
          "53",
          "33"
        ],
        "hint": "S²−2P kullan.",
        "explanation": "S=7 ve P=4 olduğundan kareler toplamı 49−8=41’dir. Kökleri ayrı ayrı çözmek gerekmez."
      },
      {
        "prompt": "2x²−3x−1=0 denkleminin kökleri α ve β. 1/α+1/β nedir?",
        "correct": "−3",
        "distractors": [
          "3",
          "−3/2",
          "3/2",
          "−2"
        ],
        "hint": "S/P ve P≠0 koşulunu kullan.",
        "explanation": "S=3/2 ve P=−1/2 sıfır değildir. Tersler toplamı(3/2)/(−1/2)=−3 olur."
      },
      {
        "prompt": "2x²−8x+3=0 denkleminin iki gerçek kökü arasındaki uzaklık nedir?",
        "correct": "√10",
        "distractors": [
          "2√10",
          "2√5",
          "5",
          "√5"
        ],
        "hint": "√Δ/|a| kullan.",
        "explanation": "Δ=64−24=40. Uzaklık√40/2=√10’dur; uzaklık negatif olamaz."
      },
      {
        "prompt": "Kökleri −3 ve 4 olan, baş katsayısı 1 monik ikinci derece denklem hangisidir?",
        "correct": "x²−x−12=0",
        "distractors": [
          "x²+x−12=0",
          "x²−x+12=0",
          "x²−7x−12=0",
          "x²+x+12=0"
        ],
        "hint": "Toplam 1, çarpım−12.",
        "explanation": "x²−Sx+P biçiminde S=1, P=−12 yazılır. (x+3)(x−4) açılımı da x²−x−12 verir."
      },
      {
        "prompt": "x²−4x+1=0 denkleminin kökleri α ve β. α+1, β+1 köklü monik denklem nedir?",
        "correct": "y²−6y+6=0",
        "distractors": [
          "y²−5y+2=0",
          "y²−6y+1=0",
          "y²−2y−2=0",
          "y²+6y+6=0"
        ],
        "hint": "Yeni çarpım P+S+1’dir.",
        "explanation": "Eski S=4, P=1. Yeni S=6, yeni P=1+4+1=6 olduğundan y²−6y+6=0 elde edilir."
      },
      {
        "prompt": "x²−4x+m=0 denkleminin iki farklı pozitif gerçek kökü olması için m hangi aralıktadır?",
        "correct": "(0,4)",
        "distractors": [
          "(−∞,4)",
          "[0,4]",
          "(4,∞)",
          "(−∞,0)"
        ],
        "hint": "Δ>0, S>0, P>0 koşullarını kesiştir.",
        "explanation": "Δ=16−4m>0 ⇒m<4. Toplam 4 pozitiftir; çarpım m>0 olmalıdır. Kesişim 0<m<4’tür."
      },
      {
        "prompt": "x⁴−3x²−4=0 denkleminin gerçek çözüm kümesi nedir?",
        "correct": "{−2,2}",
        "distractors": [
          "{−1,1, −2,2}",
          "{4, −1}",
          "{−4,4}",
          "∅"
        ],
        "hint": "t=x²≥0 dönüşümünde negatif t’yi ele.",
        "explanation": "t²−3t−4=(t−4)(t+1)=0. t=−1 gerçek x üretmez; t=4 için x=±2 bulunur."
      },
      {
        "prompt": "√(x+4)=x−2 denkleminin gerçek çözüm kümesi nedir?",
        "correct": "{5}",
        "distractors": [
          "{0,5}",
          "{0}",
          "{−5}",
          "∅"
        ],
        "hint": "Sağ tarafın da negatif olmaması gerekir.",
        "explanation": "x≥2 şartıyla kare alırsak x+4=x²−4x+4, x(x−5)=0 çıkar. 0 şartı bozarken 5 başlangıç denklemini sağlar."
      },
      {
        "prompt": "x+y=5 ve xy=6 sisteminin sıralı ikili çözüm kümesi nedir?",
        "correct": "{(2; 3),(3; 2)}",
        "distractors": [
          "{(1; 4),(4; 1)}",
          "{(−2; −3),(−3; −2)}",
          "{(2; 2),(3; 3)}",
          "{(0; 5),(5; 0)}"
        ],
        "hint": "x ve y, t²−5t+6=0 denkleminin kökleridir.",
        "explanation": "Toplam 5 ve çarpım 6 kökleri 2 ve 3 yapar. Her iki sıralama sistemi sağlar; (2; 3) ve(3; 2) farklı sıralı ikililerdir."
      },
      {
        "prompt": "Kenarları x ve x+2 metre, alanı 35 m² olan dikdörtgende kısa kenar kaç metredir?",
        "correct": "5",
        "distractors": [
          "−7",
          "7",
          "3",
          "√35"
        ],
        "hint": "Uzunluk koşulu x>0’dır.",
        "explanation": "x(x+2)=35 ⇒(x−5)(x+7)=0. Cebirsel kök−7 uzunluk olamaz; kısa kenar 5 m olur."
      }
    ],
    "source": "MEBİ TYT Matematik ikinci derece denklem, diskriminant ve kök–katsayı sayfaları; OGM AYT Video Ders Notu İkinci Dereceden Denklemler–Karmaşık Sayılar ve MEBİ AYT denklem sistemleri karşılaştırılarak yazılmış özgün anlatım, örnek ve öğretim soruları."
  },
  {
    "id": "ayt-karmasik-sayilar",
    "topic": "detail-466",
    "title": "Karmaşık sayılar: cebir ve düzlem birlikte",
    "minutes": 90,
    "objectives": [
      "a+bi gösterimini ve sanal birimin kuvvetlerini işlemlerde kullan.",
      "Eşlenik, modül ve aritmetiği aynı düzlemde ilişkilendir.",
      "Gerçek katsayılı denklemlerin karmaşık köklerini kur ve koşullarını denetle."
    ],
    "sections": [
      {
        "title": "Yeni sayı kümesine neden ihtiyaç var",
        "paragraphs": [
          "x²+1=0 gerçek sayılarda çözülemez; bir gerçek sayının karesi negatif olamaz. i²=−1 sağlayan sanal birimi tanımlayıp a+bi biçimindeki sayıları oluşturduğumuzda bu denklem i ve−i köklerini alır. Karmaşık sayılar gerçeklerin yerine geçmez, onları genişleten bir kümedir.",
          "a ve b gerçektir; C={a+bi:a, b∈R}. b=0 seçildiğinde her gerçek sayı a+0i olarak bu kümede bulunur. Karmaşık sözcüğü zor veya yaklaşık demek değildir; iki gerçek bileşenli kesin bir sayı gösterimidir."
        ]
      },
      {
        "title": "Gerçek ve sanal kısım birer gerçek sayıdır",
        "paragraphs": [
          "z=a+bi için Re(z)=a ve Im(z)=b olur. Örneğin z=−2+5i sayısının sanal kısmı 5’tir, 5i değildir. Sayıyı standart biçime getirmeden görünen katsayıya karar verme: 3−i(2−i)=2−2i olduğundan gerçek kısım 2 olur.",
          "İki karmaşık sayı ancak gerçek kısımları ve sanal kısımları ayrı ayrı eşitse eşittir. a+bi=c+di ⇒a=c, b=d. Bu yöntem parametreli eşitliği iki gerçek denkleme dönüştürür; bir bileşeni eşitleyip diğerini bırakmak yeterli değildir."
        ]
      },
      {
        "title": "Gerçeklik ve salt sanallık koşullarını ayır",
        "paragraphs": [
          "a+bi gerçektir ancak b=0 olduğunda. Salt sanal sayı denirken çoğunlukla a=0, b≠0 olan bi sayıları kastedilir; 0’ın bu sınıfa katılıp katılmadığı kaynakların adlandırmasına göre değişebilir. Burada salt sanal terimini sıfırdan farklı bi için kullanıyoruz.",
          "(t−2)+(t²−9)i gerçek olsun istenirse t²−9=0, t=±3 bulunur. Aynı ifade salt sanal olsun istenirse t=2 ve sanal katsayı−5≠0 kontrol edilir. Gerçek kısım ile sanal kısım koşulları farklı hedeflere hizmet eder."
        ]
      },
      {
        "title": "i kuvvetleri dört adımda döner",
        "paragraphs": [
          "i⁰=1, i¹=i, i²=−1, i³=−i ve i⁴=1 olur. Pozitif tam sayı kuvvetinde üssü 4’e bölüp kalanı kullanabilirsin: i³⁰=i²=−1. Negatif kuvvette de aynı periyodiklik sürer; i⁻¹=1/i=−i, i⁻²=−1’dir.",
          "Bölme kalanı 0,1,2,3 aralığında alınır. −7=4(−2)+1 olduğundan i⁻⁷=i olur. iⁿ için taban sıfır olmadığı için bütün tam sayı üsler tanımlıdır. Genel bir karmaşık sayının 0’ıncı kuvveti anlatılırken 0⁰ ayrıca atanmış bir değer olarak kullanılmaz."
        ]
      },
      {
        "title": "Toplama ve çıkarma bileşen bileşendir",
        "paragraphs": [
          "(a+bi)+(c+di)=(a+c)+(b+d)i olur. Çıkarmada ikinci parantezin tamamının işareti değişir. (2−3i)−(−1+4i)=3−7i örneğinde hem−1 hem 4i çıkarılmıştır; yalnız gerçek kısımda eksi dağıtmak yanlıştır.",
          "Düzlemde a yatay, b düşey koordinattır. Toplam, iki konum vektörünün uç uca eklenmesiyle bulunur. Bu geometrik temsil gerçek ve sanal eksenlerin aynı ölçekle çizilmesini gerektirir; sayının büyüklüğü yalnız yatay koordinatı değildir."
        ]
      },
      {
        "title": "Çarpımda i² terimini hemen düzenle",
        "paragraphs": [
          "Dağılma ile(a+bi)(c+di)=ac+adi+bci+bdi²=(ac−bd)+(ad+bc)i bulunur. (1+2i)(3−i)=5+5i’dir. Gerçek terimler yalnız ac değildir; i²=−1 ile gelen−bd katkısı da gerçektir.",
          "Çarpma düzlemde yön ve uzunluğu birlikte değiştirebilir. Özellikle i ile çarpma(a, b)→(−b, a) biçiminde 90° saat yönünün tersine dönmedir. −1 ile çarpma 180° döndürür. Bu yorum sıfırın yönünü varmış gibi tanımlamaz; sıfır yine sıfıra gider."
        ]
      },
      {
        "title": "Eşlenik gerçek eksenine yansıtır",
        "paragraphs": [
          "z=a+bi sayısının eşleniği z̄=a−bi’dir. Gerçek kısım korunur, sanal kısmın işareti değişir. Düzlemde(a, b) noktası(a, −b)’ye yansır. Eşleniğin eşleniği başlangıç sayısıdır; z=z̄ ancak b=0, yani z gerçek olduğunda olur.",
          "z+z̄=2a ve z−z̄=2bi bağıntıları Re(z)=(z+z̄)/2, Im(z)=(z−z̄)/(2i) verir. İkinci bağıntıda paydaki sayı 2bi, onu 2i’ye böldüğünde kalan gerçek katsayı b’dir. Yansımanın uzunluğu koruması ilerideki modül hesabıyla da tutarlıdır."
        ]
      },
      {
        "title": "Eşlenik çarpımı kareler toplamıdır",
        "paragraphs": [
          "zz̄=(a+bi)(a−bi)=a²+b² olur. Orta sanal terimler birbirini götürür; sonuç gerçek ve negatife düşmeyen bir sayıdır. (3−4i)(3+4i)=25 örneğinde iki kare farkı biçimi vardır ama (4i)²=−16 olduğu için sonuç 9+16’dır.",
          "Toplam, çarpım ve tanımlı bölümün eşleniği, eşlenikleriyle aynı işlemi yaparak bulunur. Örneğin z+w eşleniği z̄+w̄’dir. Bu kurallar geniş bir çarpımı açmadan sanal parçaların iptal olup olmadığını görmeyi sağlar; bölmede sıfır bölen yine yasaktır."
        ]
      },
      {
        "title": "Bölmeyi sıfır olmayan eşlenikle gerçeğe taşı",
        "paragraphs": [
          "z/w için w=c+di≠0 olmalıdır. Pay ve paydayı c−di ile çarparsın; payda c²+d²>0 olur. Sonuç[(ac+bd)+(bc−ad)i]/(c²+d²) biçimindedir. (2+i)/(1−i)=(1+3i)/2 örneğinde eşlenik 1+i seçilir.",
          "Bu işlem paydanın değerini sıfırlamaz, onu gerçek bir sayıya dönüştürür. w=0 ise c=d=0 ve aynı yöntemin paydası da 0’dır; tanımsızlığı kaldırmaz. 0/w, w≠0 iken 0’dır ama w/0 veya 0/0 için bir karmaşık sayı atanmaz."
        ]
      },
      {
        "title": "Modül düzlemde uzaklıktır",
        "paragraphs": [
          "|z|=√(a²+b²), z noktasının orijine uzaklığıdır. |3−4i|=5’tir. Modül negatif olmaz; yalnız z=0 için 0’dır. |z−w| iki sayının noktaları arasındaki uzaklığı verir. Örneğin 1+i ile 4+5i arasındaki uzaklık√(3²+4²)=5’tir.",
          "|z̄|=|z|, |zw|=|z||w| ve w≠0 ise |z/w|=|z|/|w| olur. Genelde |z+w|, |z|+|w|’ye eşit değildir; eşitlik aynı yönlü vektörler gibi özel durumlarda sağlanır. Bu modül bilgisi, cebirin neden doğru olduğunu görmeye yarayan tamamlayıcı geometrik açıklamadır."
        ]
      },
      {
        "title": "Modül ve eşlenikle bir sayıyı yeniden bul",
        "paragraphs": [
          "Re(z)=2 ve|z|=√13 ise 4+b²=13, b=±3 olur; iki sayı 2±3i mümkündür. Ek olarak Im(z)>0 verilirse yalnız 2+3i kalır. Bir uzaklık bilgisi, noktayı tek başına her zaman belirlemez.",
          "z+z̄ ve zz̄ birlikte verilirse önce gerçek kısmı sonra sanal kısmın karesini bulabilirsin. İşaret için ek koşul gerekebilir. Uygulamadaki düzlemde iki simetrik noktayı karşılaştır; eşit modülleri, eşit sayı oldukları anlamına gelmez."
        ]
      },
      {
        "title": "Negatif gerçek karekökünü dikkatle yaz",
        "paragraphs": [
          "r>0 için √(−r)=i√r, asal karekök seçimini ifade eder. Buna karşılık x²=−r denkleminin iki kökü±i√r’dir. Tek bir kök sembolünün değeriyle bir denklemin bütün köklerini ayır. √(−9)=3i seçilirken x²=−9 için 3i ve−3i gerekir.",
          "Gerçek sayılarda kullanılan √u√v=√(uv) kuralı negatif radikantlara koşulsuz taşınmaz. √(−1)√(−1)=i²=−1 iken √[(-1)(-1)]=1’dir. Karmaşık kareköklerde dal seçimi nedeniyle bu eşitlik genel bir işlem kuralı değildir."
        ]
      },
      {
        "title": "Δ negatifse karmaşık iki kökü kur",
        "paragraphs": [
          "Gerçek katsayılı ax²+bx+c=0 için Δ<0 olduğunda kökler−b/(2a)±i√(−Δ)/(2a) biçimindedir; küme aynı olduğundan sanal parçanın büyüklüğü√(−Δ)/(2|a|) ile de yazılabilir. x²+2x+5=0 için−1±2i bulunur.",
          "Köklerin toplamı−2, çarpımı(−1)²+2²=5 çıkar; Vieta hâlâ çalışır. Gerçek eksende kesişim yokken karmaşık düzlemde iki sayı bulunması bir çelişki değildir. Polinomun grafiği gerçek x ve gerçek y’yi, kök kümesi ise seçilen sayı kümesini anlatır."
        ]
      },
      {
        "title": "Eşlenik kök kuralının varsayımlarını koru",
        "paragraphs": [
          "Gerçek katsayılı bir polinomda a+bi, b≠0, kökse a−bi de köktür. İkinci derece ve gerçek katsayı durumunda bunlar iki kökü tamamlar. Bu kural, karmaşık katsayılı bütün denklemler için aynı biçimde geçerli değildir.",
          "Örneğin x²−(1+i)x+i=0 denkleminin kökleri 1 vei’dir; −i kök olmak zorunda değildir. Ayrıca bir gerçek kökün eşleniği kendisidir diye diğer gerçek kökün de ona eşit olması gerekmez. x²−3x+2 kökleri 1 ve 2 olan açık bir karşı örnektir."
        ]
      },
      {
        "title": "Karmaşık köklerden gerçek denklem üret",
        "paragraphs": [
          "Kökler a±bi ise toplam 2a, çarpım a²+b² olur. Monik denklem x²−2ax+(a²+b²)=0’dır. 2±3i için x²−4x+13=0 elde edilir; diskriminant−36 ile karmaşık kökler geri bulunur.",
          "Kökleri kaydırma ve ölçekleme, gerçek köklerdeki toplam/çarpım yöntemiyle yapılır. a±bi’ye gerçek t eklendiğinde eşleniklik korunur. Yeni denklem yazarken değişkenin adını ayır ve yeni sabit terimi yalnız eski sabit terime t ekleyerek bulmaya çalışma."
        ]
      },
      {
        "title": "Cebirle şekli karşılıklı denetle",
        "paragraphs": [
          "Toplamın konumu, eşlenik simetrisi, çarpımın yönü ve bölmenin modülü aynı işlemin farklı kanıtlarıdır. Modelde bir bileşeni değiştirip önce sonucun hangi bölgede olacağını tahmin et; sonra hesap ve gerçek nokta koordinatlarını karşılaştır. Büyüklük ile sayı arasındaki farkı kendi cümlenle söyle.",
          "Karmaşık sayılarda gerçekteki büyüktür-küçüktür sıralamasını aynı cebir kurallarıyla tanımlamayız. |z|>|w| bir uzaklık karşılaştırmasıdır, z>w yazmanın genel gerekçesi değildir. Modeldeki etkileşim kanıttır; otomatik puan, konu bitirme veya XP üretmez."
        ]
      }
    ],
    "examples": [
      {
        "title": "Bileşenleri eşitle",
        "prompt": "(2t−1)+(u+3)i=5−2i ise t ve u nedir?",
        "strategy": "Gerçek ve sanal kısımları ayrı eşitle.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "2t−1=5 olduğundan 2t=6 ve t=3."
          },
          {
            "label": "2. adım",
            "explanation": "u+3=−2 olduğundan u=−5."
          },
          {
            "label": "3. adım",
            "explanation": "Yerine yaz: (6−1)+(−5+3)i=5−2i."
          }
        ],
        "answer": "t=3, u=−5.",
        "check": "Her iki gerçek koşul birlikte sağlanır.",
        "pitfall": "Sanal katsayıyı −2i’ye değil −2’ye eşitle."
      },
      {
        "title": "Negatif i kuvveti",
        "prompt": "i⁻¹⁰+i²³ değerini bul. i²=−1.",
        "strategy": "Üsleri 4’e göre kalana indir.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "−10=4(−3)+2, dolayısıyla i⁻¹⁰=i²=−1."
          },
          {
            "label": "2. adım",
            "explanation": "23=4·5+3, dolayısıyla i²³=i³=−i."
          },
          {
            "label": "3. adım",
            "explanation": "Toplam−1−i olur."
          }
        ],
        "answer": "−1−i.",
        "check": "i⁻²=−1 ile de ilk terim kontrol edilebilir.",
        "pitfall": "Negatif üs değerini sıfır veya−i¹⁰ sanma."
      },
      {
        "title": "Çarpımın iki parçası",
        "prompt": "(2−i)(−1+3i) işlemini yap.",
        "strategy": "Dağılma ardından i²=−1 kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Çarpımı−2+6i+i−3i² olarak aç."
          },
          {
            "label": "2. adım",
            "explanation": "−3i²=+3 ve 6i+i=7i olur."
          },
          {
            "label": "3. adım",
            "explanation": "Gerçek parçaları topla: −2+3=1, sonuç 1+7i."
          }
        ],
        "answer": "1+7i.",
        "check": "Modül karesi 50; çarpan modüllerinin kareleri 5·10=50.",
        "pitfall": "i² terimini sanal terim olarak bırakma."
      },
      {
        "title": "Bölmede eşlenik",
        "prompt": "(3+2i)/(1−2i) değerini a+bi biçiminde yaz.",
        "strategy": "Pay ve paydayı 1+2i ile çarp.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Pay(3+2i)(1+2i)=3+6i+2i+4i²=−1+8i."
          },
          {
            "label": "2. adım",
            "explanation": "Payda(1−2i)(1+2i)=1+4=5."
          },
          {
            "label": "3. adım",
            "explanation": "Sonuç−1/5+(8/5)i. Paydanın sıfır olmadığı kontrol edilir."
          }
        ],
        "answer": "−1/5+(8/5)i.",
        "check": "Sonucu 1−2i ile çarparsan 3+2i elde edilir.",
        "pitfall": "Yalnız paydayı eşlenikle çarpma; pay da çarpılır."
      },
      {
        "title": "Eşlenik ve modül birlikte",
        "prompt": "z+z̄=6, |z|=5 ve Im(z)<0. z nedir?",
        "strategy": "Önce gerçek kısmı, sonra sanal kısmın büyüklüğünü bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "z=a+bi için 2a=6, a=3."
          },
          {
            "label": "2. adım",
            "explanation": "a²+b²=25 ⇒9+b²=25 ⇒b=±4."
          },
          {
            "label": "3. adım",
            "explanation": "Im(z)<0 olduğundan b=−4, z=3−4i."
          }
        ],
        "answer": "3−4i.",
        "check": "Modülü 5, eşleniğiyle toplamı 6’dır.",
        "pitfall": "Sanal işaretini modül tek başına belirlemez."
      },
      {
        "title": "Karmaşık kökleri geri kur",
        "prompt": "x²−6x+13=0 denklemini C’de çöz ve kökler toplam/çarpımını doğrula.",
        "strategy": "Tam kare veya Δ ile sanal parçayı ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "(x−3)²+4=0 ⇒(x−3)²=−4."
          },
          {
            "label": "2. adım",
            "explanation": "x−3=±2i olduğundan kökler 3±2i."
          },
          {
            "label": "3. adım",
            "explanation": "Toplam 6, çarpım(3+2i)(3−2i)=9+4=13."
          }
        ],
        "answer": "{3−2i,3+2i}.",
        "check": "Δ=36−52=−16; kök formülü de 3±2i verir.",
        "pitfall": "Gerçek çözüm yok sonucunu C’de de boş küme sanma."
      }
    ],
    "recall": [
      {
        "prompt": "Im(4−7i) nedir?",
        "answer": "−7; sanal kısım gerçek bir katsayıdır."
      },
      {
        "prompt": "Karmaşık sayılar ne zaman eşittir?",
        "answer": "Gerçek kısımları ve sanal kısımları ayrı ayrı eşit olduğunda."
      },
      {
        "prompt": "z̄=z koşulu ne söyler?",
        "answer": "z gerçektir; sanal kısmı 0’dır."
      },
      {
        "prompt": "zz̄ ile modül arasındaki ilişki?",
        "answer": "zz̄=|z|²=a²+b²."
      },
      {
        "prompt": "Eşlenik kök kuralının koşulu nedir?",
        "answer": "Gerçek katsayılı polinom ve gerçek olmayan kök; ikinci derece için eşlenik çift iki kökü verir."
      },
      {
        "prompt": "√(−r) ile x²=−r çözümleri aynı liste midir?",
        "answer": "Hayır. r>0 için asal karekök i√r; denklemin kökleri±i√r’dir."
      }
    ],
    "questions": [
      {
        "prompt": "z=4−7i ise Im(z) nedir?",
        "correct": "−7",
        "distractors": [
          "−7i",
          "4",
          "7",
          "4−7i"
        ],
        "hint": "Sanal kısım, i’nin gerçek katsayısıdır.",
        "explanation": "Standart z=a+bi biçiminde b=−7 olduğundan Im(z)=−7. −7i sanal terimdir."
      },
      {
        "prompt": "(2t+1)+(u−2)i=7+5i eşitliğinde t+u nedir?",
        "correct": "10",
        "distractors": [
          "8",
          "9",
          "11",
          "12"
        ],
        "hint": "İki bileşeni ayrı eşitle.",
        "explanation": "2t+1=7 ⇒t=3; u−2=5 ⇒u=7. İki bileşen koşulu birlikte sağlanır; istenen t+u=10 olur."
      },
      {
        "prompt": "i²=−1 olmak üzere i⁻⁷ değeri nedir?",
        "correct": "i",
        "distractors": [
          "−i",
          "1",
          "−1",
          "0"
        ],
        "hint": "−7=4(−2)+1.",
        "explanation": "i’nin kuvvetleri 4 dönemlidir. Negatif üs için de kalanı 1 alırız; i⁻⁷=i olur."
      },
      {
        "prompt": "(1+2i)(3−i) işleminin sonucu nedir?",
        "correct": "5+5i",
        "distractors": [
          "1+5i",
          "5−5i",
          "1−5i",
          "3+6i"
        ],
        "hint": "i²=−1 terimini gerçek parçaya ekle.",
        "explanation": "3−i+6i−2i²=3+5i+2=5+5i. Dört dağılma terimi gerekir."
      },
      {
        "prompt": "z=−2+3i sayısının eşleniği nedir?",
        "correct": "−2−3i",
        "distractors": [
          "2−3i",
          "2+3i",
          "−3+2i",
          "−2+3i"
        ],
        "hint": "Yalnız sanal kısmın işaretini değiştir.",
        "explanation": "Eşlenik gerçek eksenine yansımadır: gerçek kısım−2 kalır, sanal katsayı 3’ten−3’e döner."
      },
      {
        "prompt": "(2+i)/(1−i) ifadesinin standart biçimi nedir?",
        "correct": "1/2+(3/2)i",
        "distractors": [
          "3/2+(1/2)i",
          "1−i",
          "1/2−(3/2)i",
          "2+3i"
        ],
        "hint": "Pay ve paydayı 1+i ile çarp.",
        "explanation": "Pay(2+i)(1+i)=1+3i, payda 2 olur. Sonuç 1/2+(3/2)i; bölen sıfır değildir."
      },
      {
        "prompt": "z=3−4i ise zz̄ kaçtır?",
        "correct": "25",
        "distractors": [
          "5",
          "−7",
          "7",
          "−25"
        ],
        "hint": "Eşlenik çarpımı a²+b²’dir.",
        "explanation": "(3−4i)(3+4i)=9−16i²=25. Sanal çapraz terimler iptal olur; kalan sayı aynı zamanda |z|² değeridir."
      },
      {
        "prompt": "z+z̄=4, |z|=√13 ve Im(z)>0 ise z nedir?",
        "correct": "2+3i",
        "distractors": [
          "2−3i",
          "4+√13 i",
          "3+2i",
          "−2+3i"
        ],
        "hint": "2Re(z)=4; sonra modül karesini kullan.",
        "explanation": "Gerçek kısım 2. 4+b²=13 ⇒b=±3; Im(z)>0 koşulu b=3 seçer."
      },
      {
        "prompt": "x²+4x+13=0 denkleminin karmaşık çözüm kümesi nedir?",
        "correct": "{−2−3i, −2+3i}",
        "distractors": [
          "{2−3i,2+3i}",
          "{−2−√13, −2+√13}",
          "{−4−3i, −4+3i}",
          "∅"
        ],
        "hint": "(x+2)²=−9 yaz.",
        "explanation": "Tam kare(x+2)²+9=0 verir. Kökler−2±3i, toplam−4 ve çarpım 13’tür."
      },
      {
        "prompt": "Gerçek katsayılı, baş katsayısı 1 ikinci derece denklemin bir kökü 1−2i. Denklem hangisidir?",
        "correct": "x²−2x+5=0",
        "distractors": [
          "x²+2x+5=0",
          "x²−2x−3=0",
          "x²−x+2=0",
          "x²−2x+3=0"
        ],
        "hint": "Diğer kök 1+2i’dir.",
        "explanation": "Gerçek katsayı ve gerçek olmayan kök eşlenik çifti zorlar. Toplam 2, çarpım 1+4=5; monik denklem x²−2x+5=0."
      },
      {
        "prompt": "√(−1)=i asal karekök seçimiyle √(−1)·√(−1) değeri nedir?",
        "correct": "−1",
        "distractors": [
          "1",
          "i",
          "−i",
          "Tanımsız"
        ],
        "hint": "Çarpım i·i’dir.",
        "explanation": "i²=−1. Negatif radikantlarda gerçek karekök çarpım kuralını kullanıp√1=1 yazmak geçerli değildir."
      },
      {
        "prompt": "z=0 için aşağıdakilerden hangisi bu ünitedeki işlem tanımlarında tanımsızdır?",
        "correct": "1/z",
        "distractors": [
          "z+1",
          "z·i",
          "z̄",
          "|z|"
        ],
        "hint": "Bölende 0 olamaz.",
        "explanation": "0’ın çarpmaya göre tersi yoktur. Diğer işlemler sırasıyla 1,0,0 ve 0 verir; karmaşık sayılara geçmek sıfıra bölmeyi tanımlamaz."
      }
    ],
    "source": "MEBİ TYT Matematik Karmaşık Sayılar ve OGM AYT İkinci Dereceden Denklemler–Karmaşık Sayılar notları temelinde özgün öğretim. Eşlenik/modül ve düzlem işlemleri kavramları açıklayan tamamlayıcı gösterimlerdir; özgün sorular resmî sınav sorusu değildir."
  },
  {
    "id": "ayt-esitsizlikler",
    "topic": "detail-467",
    "title": "Eşitsizlikler: işaret, aralık ve ortak koşul",
    "minutes": 100,
    "objectives": [
      "Kritik noktaları ve tanım dışı değerleri ayırarak işaret çizelgesi kur.",
      "Çift katlı kökü ve sadeleşen paydayı doğru işle.",
      "Sistem, mutlak değer ve karekök koşullarını aralıklarla birleştir."
    ],
    "sections": [
      {
        "title": "Çözüm bir aralık veya aralıklar birleşimidir",
        "paragraphs": [
          "Bir eşitsizliği doğru yapan bütün gerçek x değerleri çözüm kümesini oluşturur. x>2 için(2,∞), x≥2 için[2,∞) yazılır. Yuvarlak uç alınmadığını, köşeli uç alındığını gösterir. Sonsuz bir sayı olmadığı için sonsuz uçlara köşeli ayraç konmaz.",
          "Birleşim veya anlamındadır; iki bölgeden en az biri yeterlidir. Kesişim ve anlamındadır; bütün koşullar birlikte gerekir. x<−1 veya x≥3, (−∞, −1)∪[3,∞); x>−1 ve x≤3 ise(−1,3] olur. Önce mantıksal bağlacı sonra aralığı seç."
        ]
      },
      {
        "title": "Eşdeğer düzenlemelerde işareti kontrol et",
        "paragraphs": [
          "İki tarafa aynı ifadeyi eklemek yönü değiştirmez; pozitif sabitle çarpmak da korur. Negatif sabitle çarpmak veya bölmek yönü ters çevirir. −2x<6 ⇒x>−3 örneğinde yönün dönmesi, sayı doğrusunda sıralamanın tersine çevrilmesidir.",
          "İşareti bilinmeyen x−1 gibi ifadeyle koşulsuz çarpma. 1/(x−1)>0 için sağ tarafa çarpıp 1>0 demek, x<1 durumundaki negatif paydayı ve x=1 tanımsızlığını unutur. Payda işareti değişebiliyorsa işaret çizelgesi bu dalları açıkça tutar."
        ]
      },
      {
        "title": "Her şeyi bir tarafa toplayıp sıfırla karşılaştır",
        "paragraphs": [
          "f(x)>g(x) eşitsizliğini f(x)−g(x)>0 biçimine getir. Böylece iki ayrı büyüklüğü sezgisel karşılaştırmak yerine tek bir ifadenin işaretini incelersin. x²>3x+4 ⇒x²−3x−4=(x−4)(x+1)>0 olur.",
          "Rasyonel ifadelerde ortak paydaya geçerken tanım dışı değerleri baştan yaz. (x+1)/(x−2)>2 ⇒(5−x)/(x−2)>0, x≠2. İki tarafı bilinmeyen işaretli payda ile çarpmadan farkı tek kesir yapmak, çözümü güvenle işaret incelemesine taşır."
        ]
      },
      {
        "title": "Kritik noktaları küçükten büyüğe yerleştir",
        "paragraphs": [
          "Çarpımı veya bölümü sıfır yapan pay kökleri ile ifadeyi tanımsız yapan payda kökleri sayı doğrusunu aralıklara ayırır. Her aralığın içinde hiçbir çarpanın işareti değişmediği için ifadenin işareti sabittir. (x+2)(x−3) için sınırlar−2 ve 3’tür.",
          "Aralık içinden bir deneme sayısı seçebilir veya en sağdan katsayı işaretiyle başlayabilirsin. (x+2)(x−3) en sağda pozitiftir, ortada negatif, en solda pozitiftir. Kök noktasının kendisi ise aralık işaretinden ayrı bir kontrol ister; orada ifade sıfır olabilir."
        ]
      },
      {
        "title": "Tek ve çift katlı kök davranışları farklıdır",
        "paragraphs": [
          "(x−r) tek kuvvetli olduğunda r’den geçerken işareti değişir. Çift kuvvetli olduğunda iki tarafta aynı işaret kalır; (x−r)² negatif olamaz. (x−1)²(x+2) ifadesinde−2’de işaret değişir,1’de değişmez.",
          "Çift kökün işaret değiştirmemesi, o noktayı çözüme her zaman almak demek değildir. > veya< gibi sıkı eşitsizlikte payın 0 olduğu nokta alınmaz; ≥ veya≤ durumunda tanımlıysa alınabilir. İşaret değişimini ve uç noktaya dahil olmayı iki ayrı satırda düşün."
        ]
      },
      {
        "title": "Payda kökü her zaman açık kalır",
        "paragraphs": [
          "Payda sıfır olduğunda kesrin değeri yoktur. (x−2)/(x−2)≥0 ifadesi x≠2 koşuluyla 1≥0’dır; çözüm R\\{2} olur. Sadeleştirme cebirsel değeri izinli noktalarda korur, yasak noktaya yeni bir değer atamaz.",
          "Pay ve paydada aynı kök varsa çizelgede payda yasağı önceliklidir. Sayı doğrusunda 2’de açık nokta ve iki tarafta çözüm çizgisi kullan. Bu bir deliktir; kapalı nokta veya sıfır değer göstermek tanım kümesini yanlış genişletir."
        ]
      },
      {
        "title": "İkinci derece ifadenin üç Δ durumunu bağla",
        "paragraphs": [
          "a≠0 ve Δ>0 ise sıralı kökler r₁<r₂ arasındaki işaret a’nın tersidir; dışarılarda a ile aynıdır. Δ=0 ise a(x−r)², r dışında a işaretini taşır ve r’de 0 olur. Δ<0 ise gerçek sıfır yoktur; bütün gerçeklerde a’nın işareti geçerlidir.",
          "Bu kurallar grafikte kol yönü ve eksen kesimleriyle de anlaşılır. −x²−1 her yerde negatiftir; x²+1 her yerde pozitiftir. Tek bir x denemesi Δ<0 bilgisi olmadan bütün gerçekleri kanıtlamaz; sınıflama kök bulunmadığını da kullanır."
        ]
      },
      {
        "title": "Bütün gerçeklerde sıkı veya zayıf işaret",
        "paragraphs": [
          "ax²+bx+c>0 eşitsizliğinin her gerçek x için doğru olması, a>0 ve Δ<0 gerektirir. Her x için<0 olması ise a<0 ve Δ<0 gerektirir. a=0 ikinci derece kapsamından çıkar ve doğrusal/sabit ifade ayrıca incelenir.",
          "Her x için≥0 istenirse a>0, Δ≤0; her x için≤0 istenirse a<0, Δ≤0 olur. Eşitlik sınırında grafik eksene dokunabilir. Kaynakta negatiflik için de a>0 yazılan bir satırı tekrarlamak yerine −x²−1 karşı örneğiyle doğru işareti denetle."
        ]
      },
      {
        "title": "Çarpım ve bölümde sağ uç işaretini kur",
        "paragraphs": [
          "Çarpanlara ayrılmış bir rasyonel ifadenin yeterince sağında her(x−r) pozitiftir; baştaki sıfır olmayan katsayının işareti kalır. Sola giderken tek toplam çokluklu kritik noktada işaret döner, çift toplam çoklukta korunur. Payda çarpanının işaret değiştirmesi de bölümün işaretini değiştirir.",
          "Payın ve paydanın kökleri aynı yerdeyse toplam çokluk işaret geçişini, payda çokluğu ise tanımsızlığı belirler. (x−1)²/(x−1) cebirsel olarak x−1’e benzer işaret taşır ama 1’e değer atanmaz. Çizelgenin delik bilgisi bu yüzden sadeleşmeden önceki ifadeden gelir."
        ]
      },
      {
        "title": "Kesişimde bütün eşitsizlikler birlikte doğrudur",
        "paragraphs": [
          "Bir sistemde her koşulun çözümünü ayrı bulup kesişim alabilirsin. x²−x−6≤0 için[−2,3], x−1>0 için(1,∞) bulunur; ortak çözüm(1,3] olur. Sınır 1 ilk koşulu sağlasa bile ikinciyi sağlamadığı için alınmaz.",
          "Ortak işaret çizelgesi de aynı işlemi yapar. Bütün kritik noktaları tek sayı doğrusunda sıralayıp her aralık için iki satırı kontrol et. Son satıra yalnız istenen işaretlerin ikisi de doğru olduğu aralıkları taşı. Koşulların birleşimini almak sistem çözümü değildir."
        ]
      },
      {
        "title": "Birleşim ile çelişen sistemi ayır",
        "paragraphs": [
          "x²<1 ve x>2 koşullarının ortak çözümü yoktur: (−1,1)∩(2,∞)=∅. Boş küme bir hesap hatası olmak zorunda değildir; iki isteğin aynı anda sağlanamadığını anlatır. Buna karşılık aynı iki koşul veya ile verilirse iki aralığın birleşimi alınır.",
          "Eşitlik noktalarını da sistemin bütün satırlarında denetle. x²≤0 ve x≥0 yalnız{0} verir; çözüm bazen tek bir izole noktadır. Bir grafik veya model yalnız açık aralık çizmeye programlandıysa bu özel çözümü kaçırır; bizim model noktaları ayrıca kaydeder."
        ]
      },
      {
        "title": "Kare almanın sıralama koşulunu unutma",
        "paragraphs": [
          "u vev negatif değilse u<v ile u²<v² eşdeğerdir. İşaretler serbestken bu kural geçerli değildir: −5<2 doğrudur ama 25<4 yanlıştır. Kareli bir eşitsizlik çözülürken mutlak değer veya işaret ayrımı gerekir.",
          "x²<9 doğrudan−3<x<3 verir; yalnız x<3 yazmak alt sınırı kaybettirir. (x−2)²≥4 için |x−2|≥2 ve x≤0 veya x≥4 çıkar. İki yandaki uzaklık yorumu, kareyi rastgele iptal etmeden çözümü kurar."
        ]
      },
      {
        "title": "Mutlak değeri uzaklık olarak çöz",
        "paragraphs": [
          "|x−r|<d, d>0 iken r−d<x<r+d demektir. |x−r|≥d dış bölgeyi verir: x≤r−d veya x≥r+d. d=0 olduğunda sıkı ve zayıf işaretlerin özel sonuçlarını doğrudan uzaklığın negatif olmamasından bul.",
          "|x+1|≤3 için−4≤x≤2 olur. Sağ taraf değişkense önce onun işareti önemlidir: |x−1|<x+1 için x+1>0 şartı gerekir; ardından −(x+1)<x−1<x+1 ile x>0 bulunur. Mutlak değerin içini koşulsuz kaldırma."
        ]
      },
      {
        "title": "Karekök eşitsizliğinde iki işareti birlikte taşı",
        "paragraphs": [
          "√u≤v için u≥0 vev≥0 gerekir; bu koşullarda u≤v² ile eşdeğerdir. Örneğin √(x+1)≤x−1 için x≥1 yazılır, sonra x+1≤(x−1)² ⇒x(x−3)≥0 elde edilir; kesişim x≥3’tür.",
          "√u>v vev<0 ise u≥0 olan her noktada eşitsizlik zaten sağlanabilir; tek kareli dönüşüm bu dalı kaybedebilir. Çözümü önce sağ tarafın işaretine göre ayır, sonra gerekli dalda karesini al. Sonuç kümesinin her bölümünü ilk ifadede örnek değerle kontrol et."
        ]
      },
      {
        "title": "Parametre ve tam sayı isteğini sona bırak",
        "paragraphs": [
          "Bir parametrenin her x’te pozitiflik sağlaması istenirse kökleri tek tek çözmeden a veΔ koşulları kurulur. x²+2x+m>0 bütün gerçeklerde doğruysa Δ=4−4m<0, m>1 olur. Eşitlik m=1 için x=−1’de sıfır verdiğinden sıkı pozitiflik bozulur.",
          "Çözümde tam sayılar istenirse önce doğru gerçek aralığı bul, sonra uçların dahil olup olmamasına göre say. −2<x≤4 için−1,0,1,2,3,4 olmak üzere 6 tam sayı vardır. Aralık uzunluğu ile tam sayı sayısı aynı büyüklük değildir."
        ]
      },
      {
        "title": "Çizelgeyi başlangıç ifadesiyle doğrula",
        "paragraphs": [
          "Her çözüm aralığından bir nokta, her dışlanan aralıktan bir nokta ve bütün kritik uçlar ayrı kontrol edilir. Payda kökleri yerine koyulmaz; doğrudan tanımsız olarak kalır. Çarpan çoklukları işaret geçişinin, ≥/≤ seçimi ise tanımlı sıfırların nedenini açıklar.",
          "Etkileşimli çizelgede bir kökü çift yap, sonra paydaya taşı ve noktanın davranışını izle. Tahminini aralık işareti ve uç koşuluyla gerekçelendir. Renk tek başına bilgi değildir; aynı çözüm açık/kapalı uçlarıyla normal metin olarak da verilir. Bu keşif otomatik puan oluşturmaz."
        ]
      }
    ],
    "examples": [
      {
        "title": "İki farklı kök",
        "prompt": "x²−x−6≤0 eşitsizliğini çöz.",
        "strategy": "Çarpanlar ve yukarı kol işaretini kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "x²−x−6=(x−3)(x+2); kritik noktalar−2 ve 3."
          },
          {
            "label": "2. adım",
            "explanation": "Baş katsayı pozitif: dış aralıklar+, kökler arası−."
          },
          {
            "label": "3. adım",
            "explanation": "≤0 hem negatif aralığı hem iki tanımlı sıfırı alır."
          }
        ],
        "answer": "[−2,3].",
        "check": "x=0 sağlar; x=4 sağlamaz; uçlar sıfır verir.",
        "pitfall": "Çözümü dış aralıkla karıştırma."
      },
      {
        "title": "Çift kök ve sıkı işaret",
        "prompt": "(x−1)²(x+2)>0 eşitsizliğini çöz.",
        "strategy": "Çift kökün işareti değiştirmediğini kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "(x−1)², x≠1 için pozitiftir; işareti x+2 belirler."
          },
          {
            "label": "2. adım",
            "explanation": "x>−2 için çarpım pozitif ama x=1’de sıfırdır."
          },
          {
            "label": "3. adım",
            "explanation": "Sıkı işaret−2 ve 1 noktalarını dışlar."
          }
        ],
        "answer": "(−2,1)∪(1,∞).",
        "check": "x=0 ve 2 sağlar; x=1 eşitlik olduğu için sağlamaz.",
        "pitfall": "Çift kökü çizelgeden tamamen silme."
      },
      {
        "title": "Sadeleşen payda deliği",
        "prompt": "(x−2)(x+1)/(x−2)≥0 eşitsizliğini çöz.",
        "strategy": "Önce x≠2, sonra sadeleştirme.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk payda nedeniyle x≠2. İzinli x’lerde ifade x+1’e eşit."
          },
          {
            "label": "2. adım",
            "explanation": "x+1≥0 ⇒x≥−1."
          },
          {
            "label": "3. adım",
            "explanation": "Bulunan aralıktan 2 çıkarılır; −1 payı sıfırladığı için dahildir."
          }
        ],
        "answer": "[−1,2)∪(2,∞).",
        "check": "2’ye sadeleştirilmiş ifadede değer vererek yasağı kaldırma.",
        "pitfall": "Deliği kapalı nokta yapmak tanım kümesini değiştirir."
      },
      {
        "title": "İki eşitsizlik sistemi",
        "prompt": "x²−4≥0 ve x²−x−6<0 sistemini çöz.",
        "strategy": "Ayrı çözümlerin kesişimini al.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk koşul x≤−2 veya x≥2 verir."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci koşul (x−3)(x+2)<0 ⇒−2<x<3 verir."
          },
          {
            "label": "3. adım",
            "explanation": "Ortak bölge 2≤x<3’tür; −2 ikinci koşulda yasaktır."
          }
        ],
        "answer": "[2,3).",
        "check": "x=2 iki koşulu da sağlar; x=3 ikinciyi sağlamaz.",
        "pitfall": "Sistem için birleşim alma."
      },
      {
        "title": "Bütün gerçeklerde negatiflik",
        "prompt": "−x²+4x+m<0 her gerçek x için doğru olsun. m nedir?",
        "strategy": "Baş katsayı negatif; Δ’nın sıkı negatifliğini kur.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "a=−1<0 zaten. Δ=4²−4(−1)m=16+4m."
          },
          {
            "label": "2. adım",
            "explanation": "Δ<0 ⇒m<−4."
          },
          {
            "label": "3. adım",
            "explanation": "Tepe değer 4+m’dir; m<−4 iken maksimum bile negatiftir."
          }
        ],
        "answer": "m<−4.",
        "check": "m=−4’te x=2 için 0 olur; sıkı negatiflik bozulur.",
        "pitfall": "Her yerde negatiflik için a>0 yazma."
      },
      {
        "title": "Mutlak değer ve değişken sağ taraf",
        "prompt": "|x−1|<x+1 eşitsizliğini çöz.",
        "strategy": "Sağ tarafın pozitifliğini ve iki yönlü sınırı uygula.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Mutlak değer≥0 olduğundan x+1>0, yani x>−1 gerekir."
          },
          {
            "label": "2. adım",
            "explanation": "−x−1<x−1<x+1. Sol eşitsizlik 2x>0, sağ eşitsizlik−1<1 olur."
          },
          {
            "label": "3. adım",
            "explanation": "x>0 önceki koşulu da sağlar."
          }
        ],
        "answer": "(0,∞).",
        "check": "x=0 için 1<1 yanlış; x=1 için 0<2 doğru.",
        "pitfall": "Sağ taraf negatifken kare alma eşdeğerliği kurma."
      },
      {
        "title": "Karekök eşitsizliği",
        "prompt": "√(x+1)≤x−1 eşitsizliğini çöz.",
        "strategy": "Tanım ve sağ işareti kare almadan önce koy.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "x+1≥0 ve x−1≥0 birlikte x≥1 verir."
          },
          {
            "label": "2. adım",
            "explanation": "Bu aralıkta kare al: x+1≤x²−2x+1 ⇒x(x−3)≥0."
          },
          {
            "label": "3. adım",
            "explanation": "Cebirsel çözüm x≤0 veya x≥3; x≥1 ile kesişim x≥3."
          }
        ],
        "answer": "[3,∞).",
        "check": "x=3 için 2≤2; x=2 için√3≤1 yanlış.",
        "pitfall": "Kareli koşuldan gelen x≤0 dalını tanım koşuluyla karıştırma."
      }
    ],
    "recall": [
      {
        "prompt": "Payda kökü ≥ durumunda alınabilir mi?",
        "answer": "Hayır; ifade o noktada tanımsızdır. Eşitlik işareti bu yasağı kaldırmaz."
      },
      {
        "prompt": "Çift katlı kökte işaret ne yapar?",
        "answer": "İki tarafta aynı kalır; fakat nokta sıfır veya tanımsız olabilir."
      },
      {
        "prompt": "Her x için ax²+bx+c<0 koşulu nedir?",
        "answer": "a<0 ve Δ<0; burada a≠0 ikinci derece varsayılır."
      },
      {
        "prompt": "Bir sistemin çözümleri nasıl birleştirilir?",
        "answer": "Bütün satırların çözüm kümeleri kesiştirilir."
      },
      {
        "prompt": "Sadeleşen payda kökü neden korunur?",
        "answer": "Sadeleştirme yalnız ilk ifadenin tanımlı olduğu değerlerde eşdeğerdir."
      },
      {
        "prompt": "Kare almadan önce hangi koşul gerekir?",
        "answer": "İki tarafın işareti kontrol edilir; kare alma sıralamayı serbest işaretlerde korumaz."
      }
    ],
    "questions": [
      {
        "prompt": "x²−5x+6<0 eşitsizliğinin çözümü nedir?",
        "correct": "(2,3)",
        "distractors": [
          "[2,3]",
          "(−∞,2)∪(3,∞)",
          "(−∞,2]∪[3,∞)",
          "∅"
        ],
        "hint": "(x−2)(x−3) işaretini incele.",
        "explanation": "Baş katsayı pozitif, iki kök arası negatiftir. Sıkı< işareti 2 ve 3’ü dışlar."
      },
      {
        "prompt": "(x−2)²≤0 eşitsizliğinin gerçek çözümü nedir?",
        "correct": "{2}",
        "distractors": [
          "∅",
          "ℝ",
          "(−∞,2]",
          "[2,∞)"
        ],
        "hint": "Kare negatif olamaz.",
        "explanation": "≤0 koşulu yalnız karesinin 0 olduğu x=2’de sağlanır. İzole nokta da geçerli çözüm kümesidir."
      },
      {
        "prompt": "(x−1)²(x+2)>0 eşitsizliğinin çözümü hangisidir?",
        "correct": "(−2,1)∪(1,∞)",
        "distractors": [
          "(−2,∞)",
          "[−2,∞)",
          "(−∞, −2)",
          "(1,∞)"
        ],
        "hint": "Çift kökte işaret değişmez; sıkı işaret sıfırı almaz.",
        "explanation": "x>−2 bölgesinde x+2 pozitif; kare 1 dışında pozitif. −2 ve 1 sıfır oldukları için dışlanır."
      },
      {
        "prompt": "(x−3)/(x−3)≥0 eşitsizliğinin çözümü nedir?",
        "correct": "ℝ\\{3}",
        "distractors": [
          "ℝ",
          "[3,∞)",
          "∅",
          "{3}"
        ],
        "hint": "Sadeleştirmeden önce x≠3.",
        "explanation": "İfade x≠3 için 1’dir ve koşulu sağlar. Başlangıçta tanımsız 3 sadeleştirmeyle geri alınamaz."
      },
      {
        "prompt": "(x+1)/(x−2)≤0 eşitsizliğinin çözümü nedir?",
        "correct": "[−1,2)",
        "distractors": [
          "(−1,2]",
          "[−1,2]",
          "(−∞, −1]∪(2,∞)",
          "(−1,2)"
        ],
        "hint": "Pay kökü−1, payda kökü 2.",
        "explanation": "Kesir iki kritik nokta arasında negatiftir. −1 sıfır verdiğinden alınır,2 payda kökü olduğu için her zaman dışlanır."
      },
      {
        "prompt": "−x²−2x−2 ifadesinin bütün gerçek x’ler için işareti nedir?",
        "correct": "Her yerde negatiftir.",
        "distractors": [
          "Her yerde pozitiftir.",
          "Yalnız x=−1’de sıfırdır.",
          "Bir aralıkta pozitif, dışında negatiftir.",
          "Her yerde sıfırdır."
        ],
        "hint": "−[(x+1)²+1] biçimini kullan.",
        "explanation": "Köşeli parantez en az 1 olduğundan eksiyle çarpılan ifade en fazla−1’dir; sıkı negatiflik bütün gerçeklerde geçerli."
      },
      {
        "prompt": "x²+2x+m>0 bütün gerçek x’ler için sağlansın. m koşulu nedir?",
        "correct": "m>1",
        "distractors": [
          "m≥1",
          "m<1",
          "m>0",
          "m≤1"
        ],
        "hint": "Tepe değeri m−1’dir.",
        "explanation": "(x+1)²+m−1 ifadesinin en küçük değeri m−1. Sıkı pozitiflik için m>1; m=1 bir sıfır üretir."
      },
      {
        "prompt": "x²−9≤0 ve x>1 sisteminin çözümü nedir?",
        "correct": "(1,3]",
        "distractors": [
          "[−3,3]",
          "[1,3]",
          "(−3,1)",
          "(1,∞)"
        ],
        "hint": "[−3,3] ile(1,∞) kesişir.",
        "explanation": "İlk koşul−3≤x≤3, ikinci 1<x. Ortak aralık(1,3] olur; 1 açık,3 kapalıdır."
      },
      {
        "prompt": "|x+2|≤3 eşitsizliğinin çözümü nedir?",
        "correct": "[−5,1]",
        "distractors": [
          "(−5,1)",
          "[−1,5]",
          "(−∞, −5]∪[1,∞)",
          "[−3,3]"
        ],
        "hint": "Mutlak değeri −3≤x+2≤3 biçimindeki iki koşula dönüştür.",
        "explanation": "İki uçtan 2 çıkarılır: −5≤x≤1. Uçlarda uzaklık 3 olduğundan dahil edilir."
      },
      {
        "prompt": "(x−2)²≥9 eşitsizliğinin çözümü nedir?",
        "correct": "(−∞, −1]∪[5,∞)",
        "distractors": [
          "[−1,5]",
          "(−1,5)",
          "(−∞,5]",
          "[−1,∞)"
        ],
        "hint": "|x−2|≥3 dış bölgedir.",
        "explanation": "x−2≤−3 veya x−2≥3, yani x≤−1 veya x≥5. Karesi 9 olan uçlar≥ koşulunu sağlar."
      },
      {
        "prompt": "√(x+1)≤x−1 eşitsizliğinin çözümü hangisidir?",
        "correct": "[3,∞)",
        "distractors": [
          "(−∞,0]∪[3,∞)",
          "[1,∞)",
          "(3,∞)",
          "[−1,0]"
        ],
        "hint": "Önce x≥1; sonra kareli koşulla kesiştir.",
        "explanation": "Tanım ve sağ taraf koşulu x≥1. Kare alınca x(x−3)≥0; bunun x≥1 ile kesişimi[3,∞) olur."
      },
      {
        "prompt": "−2<x≤4 aralığında kaç tam sayı vardır?",
        "correct": "6",
        "distractors": [
          "5",
          "7",
          "4",
          "8"
        ],
        "hint": "İlk tam sayı−1, son 4.",
        "explanation": "−1,0,1,2,3,4 olmak üzere 6 sayı vardır. −2 dışlandığı için alınmaz."
      },
      {
        "prompt": "x²<1 ve x≥2 sisteminin çözümü nedir?",
        "correct": "∅",
        "distractors": [
          "(−1,1)∪[2,∞)",
          "[2,∞)",
          "{2}",
          "(−1,2]"
        ],
        "hint": "İki koşulun kesişimini ara.",
        "explanation": "İlk koşul−1<x<1 ister. Aynı x’in en az 2 olması mümkün değildir; kesişim boştur."
      },
      {
        "prompt": "(x−1)²/(x+2)²>0 eşitsizliğinin çözümü nedir?",
        "correct": "ℝ\\{−2,1}",
        "distractors": [
          "ℝ\\{−2}",
          "ℝ\\{1}",
          "(−2,1)",
          "[−2,1]"
        ],
        "hint": "Payın sıfırını ve paydanın deliğini ayrı dışla.",
        "explanation": "x≠−2 için payda pozitif; x≠1 için pay da pozitiftir. 1’de sonuç 0 sıkı koşulu sağlamaz, −2’de ifade tanımsızdır."
      }
    ],
    "source": "MEBİ AYT Matematik ikinci derece denklem/eşitsizlik, çarpım-bölüm işaretleri ve eşitsizlik sistemleri sayfaları temelinde özgün öğretim. Kaynaktaki tüm gerçeklerde negatiflik satırının baş katsayı işareti düzeltilmiş; payda tanımı, çift kök ve koşullu kare alma açıklaştırılmıştır."
  },
  {
    "id": "ayt-parabol",
    "topic": "detail-468",
    "title": "Parabol: denklemden şekle, şekilden probleme",
    "minutes": 125,
    "objectives": [
      "Genel, tepe ve çarpan biçimleri arasında geçiş yap.",
      "Parabolü koşullarıyla yeniden kur; sınırlı aralıkta ekstremumları bul.",
      "Doğruyla kesişme, teğet ve gerçek yaşam modellerini aynı cebirle çöz."
    ],
    "sections": [
      {
        "title": "Bir ikinci derece fonksiyonun grafiğini kur",
        "paragraphs": [
          "a≠0 için f(x)=ax²+bx+c gerçek değişkenli ikinci derece fonksiyondur; (x, f(x)) noktalarının kümesi parabolü oluşturur. Her x’e tek y düşer. Denklemde y=x² görmek ile parabolün herhangi bir eğriye benzemesi aynı kanıt değildir; çizimi nokta değerleri ve denklemi birlikte belirler.",
          "Bu ünitedeki parabol y=f(x) biçimindedir; ekseni düşeydir. a=0 iken doğru veya sabit fonksiyon elde edilir, parabol denmez. Grafiğin tamamını bir doğru parçasıyla birleştirmek yerine eşit x adımlarında değerleri hesaplayıp gerçek ikinci derece değişimi gör."
        ]
      },
      {
        "title": "a kol yönünü ve dikey ölçeği belirler",
        "paragraphs": [
          "a>0 kollar yukarı, a<0 aşağı açılır. y=ax² ailesinde |a| büyüdükçe aynı x uzaklığı için |y| büyür; kollar daha dar görünür. Bu karşılaştırma aynı koordinat ölçeğinde ve aynı tepeye göre yapılır; farklı eksen ölçeği şeklin görünüşünü tek başına değiştirebilir.",
          "Genel biçimde a’yı değiştirirken b ve c sabit tutulursa tepe de yer değiştirebilir. Yalnız genişliği karşılaştırmak istiyorsan y=a(x−h)²+k biçiminde h, k sabit kalmalıdır. Böylece aynı tepe noktasından yükselişin a’ya bağlı olduğunu izole edersin."
        ]
      },
      {
        "title": "Tam kare tepe biçimini açığa çıkarır",
        "paragraphs": [
          "ax²+bx+c=a[x+b/(2a)]²+c−b²/(4a) olur. h=−b/(2a), k=c−b²/(4a)=−Δ/(4a) tanımlarsan f(x)=a(x−h)²+k yazılır. Tepe T(h, k), simetri ekseni x=h’dir.",
          "a(x−h)² terimi a>0 için en az 0, a<0 için en fazla 0’dır. Dolayısıyla tüm gerçeklerde minimum veya maksimum değer k olur. Tepeyi grafik üzerinde tahmin edip sonra formülle doğrulamak, iki ayrı ezber yerine tek bir kare özelliğine dayanır."
        ]
      },
      {
        "title": "Simetri eşit uzaklıktaki noktalardır",
        "paragraphs": [
          "f(h+d)=f(h−d)=ad²+k olur. Tepe ekseninin iki yanında aynı yatay uzaklıktaki noktaların y’leri eşittir. Bu nedenle bir yatay doğru parabole iki noktada değiyorsa bu noktaların x ortalaması h’dir.",
          "Gerçek kökler r₁, r₂ varsa h=(r₁+r₂)/2 bulunur. Ama gerçek kök olmasa da h vardır; simetri yalnız eksen kesimlerinden türetilmiş bir özellik değildir. f(x)=x²+1 hiç gerçek kök taşımazken y eksenine göre simetriktir."
        ]
      },
      {
        "title": "Eksen kesimlerini sıralı nokta olarak yaz",
        "paragraphs": [
          "y ekseni için x=0, nokta(0, c) olur. x ekseni için y=0, ax²+bx+c=0 çözülür. Δ>0 iki kesim, Δ=0 eksene teğet tek nokta, Δ<0 gerçek kesişim yoktur. Kök bir x sayısı, kesim noktası ise(x,0) ikilisidir.",
          "İki farklı gerçek kök r₁, r₂ biliniyorsa f(x)=a(x−r₁)(x−r₂) biçimi grafiği kurmayı kolaylaştırır. a’nın işareti kökler arasındaki bölgenin eksenin üstünde mi altında mı olduğunu belirler. Hiç kök bulunmaması grafiğin boş olduğu anlamına gelmez."
        ]
      },
      {
        "title": "Görüntü kümesini tepe ve tanım aralığı belirler",
        "paragraphs": [
          "Tanım kümesi R ve a>0 ise görüntü[k,∞), a<0 ise(−∞, k] olur. Uç değer tepe noktasında gerçekten alınır. Parabolün kolları sonsuza giderken sonsuzluk bir görüntü elemanı diye köşeli ayraçla yazılmaz.",
          "Tanım kümesi sınırlandırıldığında tüm parabolün aralığını kullanamazsın. f(x)=(x−2)², x∈[4,5] için görüntü[4,9]’dur; tepedeki 0, izinli bir x’te alınmaz. Önce tepe apsisinin verilen aralıkta olup olmadığını kontrol et."
        ]
      },
      {
        "title": "Artma ve azalma yönünü tepede ayır",
        "paragraphs": [
          "a>0 için fonksiyon tepeye kadar azalır, tepeden sonra artar; a<0 için önce artar sonra azalır. Bu, iki x değeri arasındaki kare uzaklıklarının karşılaştırılmasıyla açıklanabilir. Örneğin(x−3)² tepeye yaklaşırken küçülür.",
          "Aralık yazımında tepeyi her iki kapalı uçlu monoton aralığa katmak mümkündür; tek noktadaki eşitlik katı artış/azalış tanımını bozmaz. Ama tepenin iki yanını tek bir artan aralık gibi birleştiremezsin. Simetrik iki x, farklı olsalar da aynı y’yi verebilir."
        ]
      },
      {
        "title": "Sınırlı kapalı aralıkta adayları tek tek dene",
        "paragraphs": [
          "f’yi[L, U] üzerinde en büyük/en küçük yapmak için f(L), f(U) ve h bu aralıktaysa f(h) karşılaştırılır. a>0 olsa bile kapalı sınırlı aralıkta maksimum vardır ve uçlardan birinde bulunur. Tüm R’de maksimum olmaması bu sınırlı problemdeki sonucu kaldırmaz.",
          "Uç açık olduğunda en büyük değerin alınmaması mümkündür. x²,(0,2) üzerinde 0 ile 4 arasında değer alır ama bu iki değeri almaz. Bu durumda maksimum/minimum yerine üst/alt sınırdan söz etmek gerekebilir. Modelde kapalı aralık seçildiği açık yazılır; açık uç kuralları anlatımda ayrıca işlenir."
        ]
      },
      {
        "title": "Tepe ve bir noktadan denklemi bul",
        "paragraphs": [
          "T(h, k) verildiğinde f(x)=a(x−h)²+k kur. Tepeden farklı x’e sahip bir noktayı yerine yazıp a’yı bulursun. T(1, −3), A(3,5) için 5=4a−3, a=2 bulunur. Sonuç 2(x−1)²−3’tür.",
          "Verilen ek noktanın x’i h ise gerçekten tepede aynı y’yi taşıması gerekir; başka y verildiyse çelişki vardır. Tam tepe noktasının tekrar verilmesi a’yı belirlemez. Yeterli bilgi ve tutarlı bilgi aynı şey değildir; her iki denetimi ayrı yap."
        ]
      },
      {
        "title": "İki kök ve üçüncü noktadan yeniden kur",
        "paragraphs": [
          "Kökler r₁, r₂ ise f(x)=a(x−r₁)(x−r₂). Köklerden farklı x’e sahip A(u, v) yerine konunca a=v/[(u−r₁)(u−r₂)] bulunur. Örneğin kökler−1,3 ve f(0)=6 için 6=a(1)(−3), a=−2 olur.",
          "A zaten kök noktalarından biriyse yeni bağımsız bilgi getirmez. İki kök verilip baş katsayı belirtilmeden tek bir parabol seçilemez; sıfır olmayan her a farklı ölçek verir. Ayrıca üçüncü nokta gerçek parabole ait olmalı ve bulunan a sıfır olmamalıdır."
        ]
      },
      {
        "title": "Üç noktadan katsayıları denklem sistemiyle bul",
        "paragraphs": [
          "Farklı üç x değerine sahip noktaları y=ax²+bx+c içinde yazınca üç doğrusal katsayı denklemi oluşur. Bir nokta y eksenindeyse c hemen bulunur, fakat bu zorunlu değildir. Yok etme ile a, b, c’yi çöz ve sonra üç noktayı da denetle.",
          "Üç nokta aynı doğru üzerindeyse bulunan a=0 olabilir; bu bir ikinci derece parabol değildir. Aynı x’e farklı y verilirse y=f(x) şeklinde bir fonksiyon zaten kurulamaz. Aynı noktayı iki kez saymak üç bağımsız koşul sağlamaz."
        ]
      },
      {
        "title": "Bir doğruyla ortak çözüm farklı bir Δ kullanır",
        "paragraphs": [
          "f(x)=ax²+bx+c ve y=mx+n ortak noktasında ax²+(b−m)x+c−n=0 olur. Bu denklemin Δ_d=(b−m)²−4a(c−n) değeri iki kesişim, tek teğet veya kesişmeme durumunu belirler.",
          "Parabolün kendi Δ=b²−4ac değeri yalnız x eksenini kesmesini anlatır. İkisini karıştırma. x²+1 x eksenini kesmez ama y=2 doğrusu ile±1 apsislerinde kesişir; doğru değişince ortak çözümün denklemi de değişir."
        ]
      },
      {
        "title": "Kesişme noktalarında y’yi de hesapla",
        "paragraphs": [
          "Ortak çözüm denkleminin kökleri x koordinatlarıdır. Bunları doğruya veya parabole koyarak y’leri bul. İki nokta arasındaki uzaklık gerekirse yalnız kök farkını değil yatay ve düşey farkların ikisini kullan: eğimi m olan doğru üzerindeki kiriş uzunluğu |x₂−x₁|√(1+m²)’dir.",
          "Ortak noktaların orta noktasında x ortalaması h_d=−(b−m)/(2a) olur; bu, parabolün tepe apsisi−b/(2a) ile ancak m=0 gibi özel durumlarda aynıdır. Eğik kirişin orta noktasını düşey simetri ekseninde varsayma."
        ]
      },
      {
        "title": "Teğet koşulunu çift kökten üret",
        "paragraphs": [
          "Doğru parabole teğetse ortak çözümde Δ_d=0 olur. Örneğin y=x² ile y=2x+n için Δ_d=4+4n=0, n=−1; temas x=1, y=1’dir. Türev bilmeden de çift kök üzerinden bu sonuç bulunur.",
          "Parabolde x=t noktasının teğet eğimi 2at+b, teğet doğrusu y=f(t)+(2at+b)(x−t) biçimindedir. Bu, f(x)−[teğet]=a(x−t)² açılımıyla doğrulanır. Düşey doğru y=f(x) grafiği için bu sonlu eğimli teğet ailesine dahil değildir."
        ]
      },
      {
        "title": "Dış bir doğruya en yakın noktayı bul",
        "paragraphs": [
          "Parabolle kesişmeyen y=mx+n doğrusuna en yakın parabol noktası için ona paralel teğeti kur. Aynı eğim koşulu 2at+b=m ⇒t=(m−b)/(2a) verir. Bu noktadaki dik uzaklık|f(t)−mt−n|/√(m²+1)’dir.",
          "Kesişme varsa en küçük uzaklık zaten 0’dır ve ortak noktalar bunu sağlar. Düşey x=t doğrusu her zaman(t, f(t)) ile kesişir; dış bir doğru örneği olamaz. Düzlemde uzaklık yorumunun doğru olması için yatay ve düşey eksen birimleri eşit fiziksel ölçekte çizilmelidir."
        ]
      },
      {
        "title": "Koşullu dik teğet ilişkisini nedeninden çıkar",
        "paragraphs": [
          "Parabolün iki farklı gerçek kökündeki teğet eğimleri 2ar₁+b ve 2ar₂+b’dir; bu eğimler±√Δ olduğundan çarpım−Δ olur. Eşit birim ölçekli dik eksenlerde, birbirine dik ve sonlu eğimli teğetler için çarpım−1, dolayısıyla Δ=1 çıkar. Önce iki gerçek kökün varlığını ve kastedilen teğetleri belirt.",
          "Orijinden çizilen gerçek teğetlerin eğimleri için Δ_d=(b−m)²−4ac=0 yazılır; iki eğimin çarpımı b²−4ac=Δ olur. Aynı eşit birim ölçekli dik eksenlerde iki gerçek teğet birbirine dikse bu kez Δ=−1’dir. Bu iki özel durumu yerini belirtmeden aynı ezber cümlesine dönüştürme."
        ]
      },
      {
        "title": "Öteleme ve yansımayı nokta üzerinden kontrol et",
        "paragraphs": [
          "f(x−h)+k grafiği h sağa, k yukarı taşır. −f(x) x eksenine, f(−x) y eksenine yansıtır. Dikey katsayı λ bütün y koordinatlarını λ ile çarpar; |λ|>1 dikey uzaklığı artırır. Kaynaktaki ters bir genişleme cümlesini nokta hesabı düzeltebilir.",
          "Bir parabolün tepe biçimini kullanarak bu dönüşümler hızlı izlenir. (x−2)²+1 iki sağa ve bir yukarı taşınmış x²’dir; negatif katsayı aşağı açılışı ayrıca getirir. Sadece grafik görünüşü değil, bilinen bir noktanın nereye gittiği de denklemi denetler."
        ]
      },
      {
        "title": "Fiziksel modelde tanım aralığını belirle",
        "paragraphs": [
          "Yükseklik h(t)=−5t²+20t+1 metre olarak verilirse t saniye ve t≥0’dır. Tepe t=2’de 21 m; yere iniş h=0’ın negatif olmayan kökünde olur. Negatif zaman kökü cebirsel olarak bulunabilse de verilen atışın geleceğini anlatmaz.",
          "Köprü kablosunun her gerçek şekli zorunlu parabol değildir; parabol idealize bir model olarak koşullarıyla verilir. Kâr veya alan problemlerinde de fiyat/uzunluk/adet sınırları fonksiyonun kullanılacağı aralığı belirler. Önce modelin nerede geçerli olduğunu kur."
        ]
      },
      {
        "title": "Alan veya kazancı kare tamamlayarak eniyile",
        "paragraphs": [
          "Çevresi 24 m olan dikdörtgende kenarlar x ve 12−x ise A=x(12−x)=−(x−6)²+36, 0<x<12 olur. En büyük alan 36 m², x=6’da alınır. Kolların aşağı açılması en büyük değeri, fiziksel aralık tepenin gerçekten erişilebilirliğini gösterir.",
          "Bir maliyet/kazanç fonksiyonunda bulunmuş tepe mümkün adet sınırının dışındaysa onu doğrudan seçemezsin. Tam sayı üretim adedi istenirse tepeye komşu izinli tam sayıları ve uçları denetle. Sürekli değişkenin optimumu her ayrık problemde aynen kullanılmaz."
        ]
      },
      {
        "title": "Denklem, kesim, tepe ve aralığı çapraz denetle",
        "paragraphs": [
          "Genel biçim eksen kesimini, tepe biçimi ekstremumu, çarpan biçimi gerçek kökleri açık gösterir. Bir biçimden diğerine geçip geri açarak kontrol et. Aynı eğri için bulunan tepe ekseni, kökler varsa onların ortalamasıyla da uyuşmalıdır.",
          "Modelde katsayıları, doğruyu ve kapalı tanım aralığını ayrı değiştir. Kesişim sayısını ve en büyük/en küçük değeri önceden tahmin et; sonra aynı hesaplardan türetilen HTML ve grafiği karşılaştır. Sadece resme bakıp eksen ölçeğinden eğim veya uzaklık uydurma; bu keşif puanlı cevap sayılmaz."
        ]
      }
    ],
    "examples": [
      {
        "title": "Üç biçimi aynı eğride gör",
        "prompt": "f(x)=2x²−8x+3 için tepeyi, görüntüyü ve gerçek kökleri bul.",
        "strategy": "Tam kare ve Δ’yı birlikte kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "f=2(x−2)²−5; tepe(2, −5), simetri x=2."
          },
          {
            "label": "2. adım",
            "explanation": "a>0 ve tanım R olduğundan görüntü[−5,∞)."
          },
          {
            "label": "3. adım",
            "explanation": "Δ=64−24=40; kökler(8±√40)/4=2±√10/2."
          }
        ],
        "answer": "T(2; −5), görüntü[−5,∞), kökler 2±√10/2.",
        "check": "Köklerin ortalaması 2, çarpımı 3/2.",
        "pitfall": "Tepe ordinatını yalnız c=3 sanma."
      },
      {
        "title": "Kapalı aralıkta maksimum",
        "prompt": "f(x)=x²−4x+1, x∈[−1,4]. Minimum ve maksimum nedir?",
        "strategy": "Uçlar ve içerideki tepeyi karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "h=2 aralıkta, f(2)=−3."
          },
          {
            "label": "2. adım",
            "explanation": "f(−1)=6 ve f(4)=1."
          },
          {
            "label": "3. adım",
            "explanation": "Aday−3,6,1 karşılaştırılır; minimum−3, maksimum 6."
          }
        ],
        "answer": "Minimum−3, maksimum 6.",
        "check": "Yukarı açılı parabol de sınırlı aralıkta maksimum taşır.",
        "pitfall": "Maksimumu tepeye atama."
      },
      {
        "title": "Tepe ve nokta",
        "prompt": "Tepe T(−1,2), A(1,10) parabol üzerinde. Denklem nedir?",
        "strategy": "a(x+1)²+2 kur.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "10=a(1+1)²+2 ⇒4a=8."
          },
          {
            "label": "2. adım",
            "explanation": "a=2, f=2(x+1)²+2."
          },
          {
            "label": "3. adım",
            "explanation": "Açınca 2x²+4x+4; f(−1)=2, f(1)=10 doğrulanır."
          }
        ],
        "answer": "f(x)=2x²+4x+4.",
        "check": "a≠0; verilen iki bağımsız koşul yeterli.",
        "pitfall": "Tepe apsisinin işaretini parantezde ters kullanmayı unutma."
      },
      {
        "title": "Kökler ve nokta",
        "prompt": "Kökleri−2 ve 4, y ekseni kesimi 8 olan parabole ait denklem nedir?",
        "strategy": "Çarpan biçimini kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "f=a(x+2)(x−4)."
          },
          {
            "label": "2. adım",
            "explanation": "f(0)=a·2·(−4)=8 ⇒a=−1."
          },
          {
            "label": "3. adım",
            "explanation": "f=−x²+2x+8; kökler ve(0,8) tekrar sağlanır."
          }
        ],
        "answer": "f(x)=−x²+2x+8.",
        "check": "Aşağı açılış kökler arasında pozitif değerlerle uyumlu.",
        "pitfall": "İki kökten a’yı 1 varsayma."
      },
      {
        "title": "Üç noktadan parabol",
        "prompt": "(0,1),(1,0),(2,3) noktalarından geçen ikinci derece fonksiyonu bul.",
        "strategy": "Üç katsayı denklemi kur.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "x=0 için c=1. x=1 için a+b+1=0, yani a+b=−1."
          },
          {
            "label": "2. adım",
            "explanation": "x=2 için 4a+2b+1=3 ⇒2a+b=1. İlkinden çıkarınca a=2, b=−3."
          },
          {
            "label": "3. adım",
            "explanation": "f=2x²−3x+1; üç nokta yerine koyularak denetlenir."
          }
        ],
        "answer": "f(x)=2x²−3x+1.",
        "check": "a=2≠0 olduğu için gerçekten parabol.",
        "pitfall": "Üç nokta var diye katsayıların tutarlılığını kontrolsüz varsayma."
      },
      {
        "title": "Eğik kiriş ve orta nokta",
        "prompt": "y=x² parabolü ile y=x+2 doğrusunun ortak noktalarını ve aralarındaki uzaklığı bul.",
        "strategy": "Ortak çözüm, ardından iki koordinat farkı.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "x²=x+2 ⇒(x−2)(x+1)=0; x=2, −1."
          },
          {
            "label": "2. adım",
            "explanation": "Noktalar(2,4) ve(−1,1); orta nokta(1/2,5/2)."
          },
          {
            "label": "3. adım",
            "explanation": "Δx=3,Δy=3; uzaklık√(9+9)=3√2."
          }
        ],
        "answer": "Ortak noktalar(−1; 1),(2; 4); uzunluk 3√2.",
        "check": "Kiriş orta apsisi 1/2, parabol tepe apsisi 0 değildir.",
        "pitfall": "Kiriş uzunluğunu yalnız kök farkı 3 sanma."
      },
      {
        "title": "Teğet doğruyu bul",
        "prompt": "y=x²−2x+3 ile y=2x+n teğet olsun. n ve temas noktası?",
        "strategy": "Ortak denklemin Δ’sını sıfır yap.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "x²−4x+3−n=0 için Δ_d=16−4(3−n)=4+4n."
          },
          {
            "label": "2. adım",
            "explanation": "Δ_d=0 ⇒n=−1. Ortak denklem(x−2)²=0."
          },
          {
            "label": "3. adım",
            "explanation": "x=2, y=2·2−1=3; temas(2,3)."
          }
        ],
        "answer": "n=−1, temas(2; 3).",
        "check": "f(2)=3; teğet eğimi 2a·2+b=2.",
        "pitfall": "Parabolün kendi Δ’sını 0 yapma."
      },
      {
        "title": "Dış doğruya en kısa uzaklık",
        "prompt": "y=x² ile y=2x−3 arasındaki en kısa uzaklığı bul. Eksen birimleri eşittir.",
        "strategy": "Dış doğruya paralel teğetin temas noktasını kur.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Ortak denklem x²−2x+3=0, Δ=−8; kesişim yok."
          },
          {
            "label": "2. adım",
            "explanation": "Teğet eğimi 2x=2 ⇒x=1, y=1. Paralel teğet y=2x−1."
          },
          {
            "label": "3. adım",
            "explanation": "Noktadan verilen doğruya uzaklık|2·1−1−3|/√5=2/√5."
          }
        ],
        "answer": "2/√5 birim; en yakın parabol noktası(1; 1).",
        "check": "Teğet ile dış doğru arasındaki paralel uzaklık da 2/√5.",
        "pitfall": "Düşey fark 2’yi dik uzaklık sanma."
      },
      {
        "title": "Fiziksel alanın en büyük değeri",
        "prompt": "Çevresi 28 m olan dikdörtgenin en büyük alanı nedir? Kenarlar pozitiftir.",
        "strategy": "Bir kenar x, diğeri 14−x olsun.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "2(x+y)=28 ⇒y=14−x, 0<x<14."
          },
          {
            "label": "2. adım",
            "explanation": "A=x(14−x)=−(x−7)²+49."
          },
          {
            "label": "3. adım",
            "explanation": "Kare 0 olduğunda x=7, y=7 izinli; en büyük alan 49 m²."
          }
        ],
        "answer": "49 m².",
        "check": "28 m çevre ve 7×7 alan birlikte doğrulanır.",
        "pitfall": "Çevreyi alanla aynı birimde yazma."
      }
    ],
    "recall": [
      {
        "prompt": "a=0 olduğunda grafiğe parabol denir mi?",
        "answer": "Hayır; doğru veya sabit fonksiyon kalır."
      },
      {
        "prompt": "Tepe biçimi ve tepe koordinatları nedir?",
        "answer": "f=a(x−h)²+k, T(h, k); h=−b/(2a), k=f(h)."
      },
      {
        "prompt": "Sınırlı kapalı aralıkta hangi noktalar adaydır?",
        "answer": "İki uç ve içerideyse tepe; değerleri karşılaştırılır."
      },
      {
        "prompt": "Doğruyla kesişimde hangi Δ kullanılır?",
        "answer": "ax²+(b−m)x+c−n=0 ortak çözüm denkleminin Δ’sı."
      },
      {
        "prompt": "İki kök tek parabolü belirler mi?",
        "answer": "Baş katsayı veya bağımsız üçüncü nokta olmadan belirlemez."
      },
      {
        "prompt": "Teğet temasında neden çift kök oluşur?",
        "answer": "Parabol ile doğru farkı a(x−t)² biçimindedir; tek farklı temas apsisi vardır."
      },
      {
        "prompt": "Dış doğruya en yakın noktanın teğeti nasıldır?",
        "answer": "Verilen sonlu eğimli doğruya paraleldir; kesişim varsa minimum uzaklık 0’dır."
      },
      {
        "prompt": "Parabole köklerinde çizilen dik teğetlerde Δ nedir?",
        "answer": "Eşit birim ölçekli dik eksenler, iki gerçek kök ve sonlu teğetler koşuluyla Δ=1; orijinden dik teğet durumunda farklı olarak Δ=−1."
      }
    ],
    "questions": [
      {
        "prompt": "f(x)=x²−6x+5 parabolünün tepe noktası nedir?",
        "correct": "(3; −4)",
        "distractors": [
          "(−3; −4)",
          "(3; 5)",
          "(6; 5)",
          "(−3; 4)"
        ],
        "hint": "h=−b/(2a), ardından f(h).",
        "explanation": "h=3 ve f(3)=9−18+5=−4. Simetri ekseni x=3’tür."
      },
      {
        "prompt": "f(x)=−2(x+1)²+7, tanım kümesi R. Görüntü kümesi nedir?",
        "correct": "(−∞,7]",
        "distractors": [
          "[7,∞)",
          "(−∞,7)",
          "[−1,7]",
          "ℝ"
        ],
        "hint": "Kare 0 veya pozitif, katsayı negatiftir.",
        "explanation": "−2(x+1)²≤0; en büyük değer 7, x=−1’de alınır. Aşağıya sınırsız olduğundan görüntü(−∞,7]."
      },
      {
        "prompt": "Tepe T(2, −1) ve f(3)=2 bilgileriyle f(x) nedir?",
        "correct": "3(x−2)²−1",
        "distractors": [
          "(x−2)²+2",
          "−3(x−2)²−1",
          "3(x+2)²−1",
          "2(x−2)²−1"
        ],
        "hint": "a(3−2)²−1=2.",
        "explanation": "a=3. Tepe biçimindeki h=2 ve k=−1 korunur; doğru fonksiyon 3(x−2)²−1."
      },
      {
        "prompt": "Kökleri−1 ve 2 olan parabolde f(0)=4. Baş katsayı a kaçtır?",
        "correct": "−2",
        "distractors": [
          "2",
          "4",
          "−4",
          "1"
        ],
        "hint": "f=a(x+1)(x−2).",
        "explanation": "f(0)=−2a=4 ⇒a=−2. Köklerden baş katsayıyı otomatik 1 seçemeyiz."
      },
      {
        "prompt": "f(x)=x²−4x+1 fonksiyonunun [−1,4] üzerindeki en büyük değeri nedir?",
        "correct": "6",
        "distractors": [
          "−3",
          "1",
          "4",
          "9"
        ],
        "hint": "Uçlarla tepeyi karşılaştır.",
        "explanation": "Tepe x=2’de−3; f(−1)=6, f(4)=1. En büyük değer 6’dır."
      },
      {
        "prompt": "y=x² ve y=3x−2 ortak noktalarının apsisleri nedir?",
        "correct": "1 ve 2",
        "distractors": [
          "−1 ve−2",
          "0 ve 3",
          "−1 ve 2",
          "1 ve 3"
        ],
        "hint": "İki y ifadesini eşitleyip x²−3x+2=0 ortak denklemini çöz.",
        "explanation": "(x−1)(x−2)=0. Noktalar(1,1) ve(2,4); istenen apsisler 1 ve 2."
      },
      {
        "prompt": "y=x² ile y=2x+n teğet olacaksa n kaçtır?",
        "correct": "−1",
        "distractors": [
          "1",
          "0",
          "2",
          "−2"
        ],
        "hint": "x²−2x−n=0 için Δ=0.",
        "explanation": "Ortak çözümün diskriminantı Δ_d=4+4n olur. Teğet için bu değer0 olmalı: n=−1. Temas apsisi1, noktası(1,1)’dir."
      },
      {
        "prompt": "f(x)=2x²+3 için y ekseni kesim noktası nedir?",
        "correct": "(0; 3)",
        "distractors": [
          "(3; 0)",
          "(0; 2)",
          "(2; 3)",
          "(0; 0)"
        ],
        "hint": "y ekseninde x=0.",
        "explanation": "f(0)=3 olduğundan nokta(0,3). c katsayısı y kesiminin ordinatıdır."
      },
      {
        "prompt": "Aynı eksen ölçeğinde ve aynı tepede y=x² ile y=4x² karşılaştırılıyor. Hangisi doğrudur?",
        "correct": "y=4x² daha dardır.",
        "distractors": [
          "y=4x² daha geniştir.",
          "İkisinin kol yönü farklıdır.",
          "Tepe noktaları farklıdır.",
          "İki grafik aynıdır."
        ],
        "hint": "Aynı x≠0 için y uzaklığı 4 kat.",
        "explanation": "Pozitif katsayılar yukarı açılır, tepe ortaktır. |a| büyüdüğü için aynı yükseklikte yatay uzaklık küçülür; grafik daha dardır."
      },
      {
        "prompt": "(0,1),(1,0),(2,3) noktalarından geçen parabol hangisidir?",
        "correct": "y=2x²−3x+1",
        "distractors": [
          "y=x²−2x+1",
          "y=−2x²+3x+1",
          "y=2x²+3x+1",
          "y=x²−x+1"
        ],
        "hint": "c=1; a+b=−1 ve 2a+b=1.",
        "explanation": "İki katsayı denkleminin farkından a=2, b=−3 çıkar. Üç nokta da y=2x²−3x+1’i sağlar."
      },
      {
        "prompt": "y=x² ve y=x+2 ortak noktaları arasındaki uzaklık kaçtır?",
        "correct": "3√2",
        "distractors": [
          "3",
          "√10",
          "5",
          "6"
        ],
        "hint": "Ortak noktalar(−1,1),(2,4).",
        "explanation": "Yatay ve düşey farkların ikisi 3’tür; uzaklık√(3²+3²)=3√2. Yalnız apsis farkı yeterli değildir."
      },
      {
        "prompt": "Eşit fiziksel eksen ölçeğinde y=x² ile y=2x−3 arasındaki en küçük uzaklık nedir?",
        "correct": "2/√5",
        "distractors": [
          "2",
          "1/√5",
          "√5",
          "0"
        ],
        "hint": "Önce kesişim yokluğunu, sonra paralel teğeti incele.",
        "explanation": "Δ=−8 ile kesişim yok. Paralel teğet noktası(1,1); verilen doğruya dik uzaklık|2−1−3|/√5=2/√5."
      },
      {
        "prompt": "Gerçek köklerinde çizilen iki teğeti birbirine dik olan y=ax²+bx+c parabolünde Δ=b²−4ac nedir? a≠0, eksenler diktir ve birim ölçekleri eşittir.",
        "correct": "1",
        "distractors": [
          "−1",
          "0",
          "4",
          "a²"
        ],
        "hint": "Köklerde teğet eğimleri±√Δ.",
        "explanation": "Eğimler çarpımı−Δ’dır. Sonlu dik doğrularda çarpım−1 olduğundan Δ=1 çıkar; bu soru orijinden çizilen teğetleri sormaz."
      },
      {
        "prompt": "Yerden yüksekliği h(t)=−t²+6t+2 metre olan modelde t≥0 saniye. Erişilen en büyük yükseklik nedir?",
        "correct": "11 m",
        "distractors": [
          "9 m",
          "6 m",
          "2 m",
          "12 m"
        ],
        "hint": "Tepe zamanı t=3.",
        "explanation": "h=−(t−3)²+11. t=3 izinli pozitif zaman olduğundan en büyük yükseklik 11 metredir."
      },
      {
        "prompt": "f(x)=(x−2)² fonksiyonunun [4,5] üzerindeki görüntü kümesi nedir?",
        "correct": "[4,9]",
        "distractors": [
          "[0,9]",
          "[0,∞)",
          "[2,3]",
          "(4,9)"
        ],
        "hint": "Tepe x=2 tanım aralığının dışındadır.",
        "explanation": "Fonksiyon[4,5]’te artar; uç değerleri f(4)=4, f(5)=9 alınır. Görüntü[4,9]."
      },
      {
        "prompt": "Bir parabolün yalnız iki farklı gerçek kökü verilmiştir; baş katsayı ve başka nokta verilmemiştir. Hangisi doğrudur?",
        "correct": "Aynı köklere sahip farklı paraboller mümkündür.",
        "distractors": [
          "Denklem zorunlu moniktir.",
          "Tepe ordinatı zorunlu 0’dır.",
          "Baş katsayı zorunlu pozitiftir.",
          "İki kök mutlaka aynı sayıdır."
        ],
        "hint": "a(x−r₁)(x−r₂) içinde a serbest kalır.",
        "explanation": "Her sıfır olmayan a aynı kökleri korur ama grafik ölçeği ve tepe ordinatı değişir. İki farklı kök tek başına ölçeği belirlemez."
      }
    ],
    "source": "MEBİ AYT Matematik ikinci derece fonksiyon grafiği, tepe/görüntü, parabolü yeniden yazma, doğruyla durumlar ve modelleme sayfaları; OGM AYT Parabol video notları temelinde özgün anlatım ve öğretim soruları. Eksen birimleri, sınırlı tanım kümesi ve teğet koşulları açık belirtilmiştir."
  },
  {
    "id": "ayt-trigonometri",
    "topic": "detail-469",
    "title": "Trigonometri: çember, dalga ve denklem",
    "minutes": 210,
    "objectives": [
      "Açı biriminden birim çembere geç; altı fonksiyonun işaret ve tanımını kur.",
      "Grafik, periyot, ters fonksiyon ve özdeşlikleri gerekçeleriyle kullan.",
      "Üçgen, toplam-fark ve trigonometrik denklem yöntemlerini doğru koşullarla uygula."
    ],
    "sections": [
      {
        "title": "Yönlü açı başlangıçtan bitişe harekettir",
        "paragraphs": [
          "Başlangıç ışınından bitiş ışınına saat yönünün tersine dönüş pozitif, saat yönüne dönüş negatiftir. Aynı bitiş ışınına birden fazla turla ulaşabilirsin. 30°,390° ve−330° aynı ışını gösterir ama yönlü dönme miktarları aynı değildir.",
          "İlk adımda hangi eksenden ve hangi yönde ölçtüğünü söyle. Analitik trigonometrinin standart açısı pozitif x ekseninden ölçülür. Bir üçgenin iç açısı ise 0 ile 180° arasındadır; çok turlu yönlü açıyı üçgen içine aynen koyamazsın."
        ]
      },
      {
        "title": "Derece, dakika ve saniyeyi gerçekten dönüştür",
        "paragraphs": [
          "Bir tam tur 360°,1°=60′ ve 1′=60″ olduğundan 1°=3600″ olur. 2°15′30″ toplam 2·3600+15·60+30=8130 açı saniyesidir. Buradaki dakika/saniye zaman değil açı alt birimidir.",
          "Ters dönüşümde önce 3600’e bölerek dereceyi, kalanı 60’a bölerek dakikayı bul. Ondalık dereceyle dakika karışmaz: 1,5°=1°30′ olur,1°5′ değildir. İşlem sırasında hangi biçimin kullanıldığını birim işaretiyle açık tut."
        ]
      },
      {
        "title": "Radyan yay ile yarıçapın oranıdır",
        "paragraphs": [
          "Radyan cinsinden θ=s/r; yarıçap uzunluğundaki yayı gören açı 1 radyandır. Tam çemberde s=2πr olduğundan tam tur 2π radyan,180° iseπ radyandır. Dereceden radyana D·π/180, radyandan dereceye R·180/π kullanılır.",
          "Yay uzunluğu s=rθ ve daire dilimi alanı r²θ/2 bağıntılarında θ radyan olmalıdır. 60° doğrudan bu formüle 60 diye yazılmaz; π/3 kullanılır. Geometrik yay uzunluğu negatif olmaz; negatif yönlü açı verilirse kastedilen yay için açı büyüklüğü veya açık bir yönlü yay tanımı gerekir."
        ]
      },
      {
        "title": "Esas ölçüde sıfırı dışlama",
        "paragraphs": [
          "Açıya tam tur katları eklemek bitiş ışınını değiştirmez. Derecede esas ölçü[0,360°), radyanda[0,2π) aralığındaki temsilcidir. 720°’nin esas ölçüsü 0’dır; 0’ın dışlanması tam turları temsil edemez.",
          "−450°+2·360°=270° örneğinde negatif açıyı yalnız işaretsiz 450 yapmak doğru değildir. Bölme kalanı daima seçilen aralığa getirilir. Aynı esas ölçü sinüs/kosinüs değerlerinin aynı olmasını sağlar; fakat tanjantın dönemi yarım tur olduğundan onun tekrarı daha sıktır."
        ]
      },
      {
        "title": "Dik üçgen oranlarını tam çembere bağla",
        "paragraphs": [
          "Dar açıya göre sin=karşı/hipotenüs, cos=komşu/hipotenüs, tan=karşı/komşu, cot=komşu/karşıdır. Komşu denilen kenar hipotenüs değildir. Bir üçgende açı değişince karşı ve komşu yer değişir; hipotenüs dik açının karşısında sabit kalır.",
          "Benzer dik üçgenlerde bu oranlar değişmediği için açıya ait fonksiyon tanımlanabilir. Dar açıların pozitif kenar uzunluklarını, bütün bölgelerdeki işaretli koordinatlarla karıştırma. İkinci bölgede kosinüs negatif olur; geometrik uzunluğun kendisi negatif değildir."
        ]
      },
      {
        "title": "Özel açıları üçgenlerden üret",
        "paragraphs": [
          "Eşkenar üçgenin yarısı 30°–60°–90° oranlarını 1,√3,2 verir. Karenin köşegeni 45°–45°–90° oranlarını 1,1,√2 verir. Buradan sin 30=1/2, cos 30=√3/2, sin 45=cos 45=√2/2, sin 60=√3/2, cos 60=1/2 elde edilir.",
          "Tanjantı sin/cos oranından çıkar: tan 30=√3/3, tan 45=1, tan 60=√3. Birim çemberde 0° noktası(1,0),90° noktası(0,1)’dir; sin 0=0, cos 0=1, sin 90=1, cos 90=0. Bu son açıların tanımını sıfıra bölme koşuluyla birlikte kontrol et."
        ]
      },
      {
        "title": "Birim çember koordinatları sinüs ve kosinüstür",
        "paragraphs": [
          "Merkezi O(0,0), yarıçapı 1 olan çember x²+y²=1’i sağlar. Pozitif x ekseninden θ açılı ışının çemberi kestiği P noktası(cosθ, sinθ)’dır. Yatay izdüşüm kosinüsü, düşey izdüşüm sinüsü verir; ikisi aynı açının ayrı koordinatlarıdır.",
          "Bundan cos²θ+sin²θ=1 ve−1≤sinθ, cosθ≤1 çıkar. Herhangi bir gerçek açı için bu değerler tanımlıdır. Çemberin bir bölümünü dar üçgen gibi çizmek yalnız ilk bölgeyi anlatır; model diğer bölgelerde işaretli koordinatları korur."
        ]
      },
      {
        "title": "Tanjant ve kotanjantta yasak açıları kaydet",
        "paragraphs": [
          "tanθ=sinθ/cosθ, cosθ≠0; cotθ=cosθ/sinθ, sinθ≠0 koşuluyla tanımlıdır. Tanjant π/2+kπ’de, kotanjant kπ’de tanımsızdır. Diğer açılarda her iki fonksiyon gerçek değerler alır; görüntü kümeleri R’dir.",
          "tanθ·cotθ=1 ancak ikisi de tanımlıysa kullanılır; θ=0’da cot tanımsız, θ=π/2’de tan tanımsızdır. Işının x=1 ve y=1 doğrularına uzantısıyla bu işaretli değerleri görürsün. Uzunluk yerine koordinat kullanılması negatif bölgeleri de açıklar."
        ]
      },
      {
        "title": "Sekant ve kosekant ters oranlardır",
        "paragraphs": [
          "secθ=1/cosθ, cscθ=1/sinθ olur. Sekantın yasak açıları tanjantla, kosekantınkiler kotanjantla aynıdır. Her iki görüntü kümesi(−∞, −1]∪[1,∞)’dir; mutlak değerleri 1’den küçük olamaz.",
          "cos²+sin²=1 eşitliğini cos² ile bölersen 1+tan²=sec², sin² ile bölersen 1+cot²=csc² elde edilir. Bölme yapılan terim sıfırsa o eşitliğin bu yazımı kullanılamaz. Ters oran ile ters fonksiyon farklıdır; sec, arccos değildir."
        ]
      },
      {
        "title": "Bölge işaretlerini x ve y’den oku",
        "paragraphs": [
          "İlk bölgede sin, cos, tan, cot pozitiftir. İkinci bölgede sin pozitif, cos negatif; tan ve cot negatiftir. Üçüncüde sin ve cos negatif ama oranları pozitif; dördüncüde cos pozitif, sin negatif ve oranlar negatiftir.",
          "Bu tabloyu bağımsız bir ezber yerine P(cos, sin) noktasının koordinatlarıyla üret. Eksen üzerindeki değerler dört açık bölgenin içine sokulmaz; bir oran sıfır veya tanımsız olabilir. İşareti bilmek, kareli özdeşlikten gelen± seçimini doğru yapar."
        ]
      },
      {
        "title": "Referans açı ve isim değişimini gerekçelendir",
        "paragraphs": [
          "π±α ve 2π±α için sinüs/kosinüs kendi adıyla kalır; işaret bitiş noktasının bölgesinden gelir. π/2±α ve 3π/2±α için sin ilecos, tan ilecot yer değiştirir. Örneğin cos(π−α)=−cosα, sin(3π/2+α)=−cosα.",
          "Önce açının hangi bölgede olduğunu ve değerin işaretini belirle, sonra referans açıyı yaz. İsim değişti diye işaretin hep pozitif kalacağını varsayma. Modelde aynı açıyı çeyrek tur artırarak koordinatların nasıl yer değiştirdiğini takip edebilirsin."
        ]
      },
      {
        "title": "Teklik, çiftlik ve tam tur tekrarları",
        "paragraphs": [
          "cos(−θ)=cosθ, sin(−θ)=−sinθ; tan ve cot da tanımlı oldukları simetrik açılarda tektir. cos(θ+2kπ)=cosθ, sin(θ+2kπ)=sinθ. tan(θ+kπ)=tanθ ve cot için de aynı yarım tur tekrarı vardır.",
          "Bu kimlikler negatif veya çok büyük açıyı azaltır. cos(−300°)=cos 300°=1/2; sin(−300°)=−sin 300°=√3/2 olur. İşaretli açı ile negatif fonksiyon değeri aynı kavram değildir; negatif bir açının sinüsü pozitif de olabilir."
        ]
      },
      {
        "title": "Sıralama yalnız uygun aralıkta güvenlidir",
        "paragraphs": [
          "0<α<β<π/2 için sinα<sinβ, cosα>cosβ, tanα<tanβ ve cot α>cotβ olur. Birim çemberde ilk bölgede yükselen y ve azalan x bu düzeni gösterir. Bu aralığı yazmadan bütün gerçek açılara sıralama kuralı koyamazsın.",
          "Örneğin sin 100°>sin 150°; açı büyürken sinüs burada azalır. Tanjantı da bir kutuptan geçirerek tek artan parça gibi karşılaştırma. Önce esas ölçü/bölgeyi bul, aynı monoton aralıkta mısın denetle, sonra büyüklüğü karşılaştır."
        ]
      },
      {
        "title": "Temel özdeşliği bilinmeyen bileşen için kullan",
        "paragraphs": [
          "sin²θ+cos²θ=1 ile sinθ=3/5 verilirse cos²θ=16/25, cosθ=±4/5 bulunur. Bölge bilgisi ikinci bölge diyorsa cosθ=−4/5 seçilir. Kareli bağıntı işareti saklar; değer tek başına açı bölgesini belirlemez.",
          "sin²θ, (sinθ)² demektir; sin(θ²) değildir. (sinθ+cosθ)²=1+2sinθcosθ, sinθ+cosθ=1 değildir. Parantez açılımını yapıp yalnız bilinen özdeşlikleri değiştir; toplamın karesindeki çapraz terim kaybolmaz."
        ]
      },
      {
        "title": "Sadeleştirirken ilk tanım kümesini koru",
        "paragraphs": [
          "(1−cos²θ)/sinθ, sinθ≠0 için sinθ’ye eşittir. Sadeleşmiş sinθ bütün gerçeklerde tanımlı olsa da ilk kesrin yasak kπ noktaları geri alınmaz. Aynı durum denklemlerde her iki tarafı sin veya cos’a bölerek kök kaybetme riskini açıklar.",
          "Önce paydaları ve kareköklerin koşullarını yaz; sonra ortak çarpanı sadeleştir. sinθcosθ=sinθ eşitliğinde sinθ’ye doğrudan bölmek sinθ=0 çözümlerini kaybettirir. Doğru işlem sinθ(cosθ−1)=0 biçiminde bütün dalları tutar."
        ]
      },
      {
        "title": "Periyot eşit değeri değil bütün örüntüyü tekrarlar",
        "paragraphs": [
          "f(x+T)=f(x) bütün tanım noktalarında geçerliyse T>0 bir periyottur. Sinüs ve kosinüsün temel periyodu 2π, tanjant ve kotanjantınπ’dir. Tek bir noktada değerlerin eşit olması bütün fonksiyonun periyodunu kanıtlamaz.",
          "A≠0, b≠0 için A sin(bx+c)+d ve A cos(bx+c)+d temel periyodu 2π/|b|; tan/cot içinπ/|b| olur. Burada x radyandır. A veya b sıfır olduğunda fonksiyonun tanımı ayrıca incelenir; sabit fonksiyonun her pozitif sayısı dönemdir ama en küçük pozitif temel periyodu yoktur."
        ]
      },
      {
        "title": "Dalga grafiğinde dört parametreyi ayır",
        "paragraphs": [
          "A sin(bx+c)+d için |A| genlik, d orta çizgi, b yatay ölçek ve c fazı belirler. Sin/cos görüntüsü[d−|A|, d+|A|] olur. b≠0 iken yatay kayma−c/b’dir; c’nin işaretini tek başına kayma yönü sayma.",
          "Örneğin 2sin(3x−π)+1 için genlik 2, orta çizgi 1, periyot 2π/3 ve sağa kaymaπ/3’tür. Ekran modeli derece birimini açık kullanırsa karşılık gelen periyot 360°/|b| olur. Bir grafiğin x birimi değişirken sayısal dönem de değişir; fiziksel örüntü aynı kalır."
        ]
      },
      {
        "title": "Tanjant grafiği kutupta birleşmez",
        "paragraphs": [
          "tan x her(−π/2+kπ,π/2+kπ) aralığında artar ve sınırda tanımsızdır; cot x, (kπ,(k+1)π) aralığında azalır. Tanım dışı sınırların iki yanını tek çizgiyle birleştirmek gerçekte bulunmayan bir grafik parçası çizer.",
          "Modelde bu dallar ayrılır; kutupta değer yerine tanımsız yazılır. Çok büyük bir sayı görmek kutbun değeri sonsuzdur demek değildir. Sonsuzluk gerçek bir fonksiyon çıktısı sayılmaz; sınır davranışını anlatsa da o noktada değer atamaz."
        ]
      },
      {
        "title": "Ters trigonometrik fonksiyon dal seçer",
        "paragraphs": [
          "Sinüs tüm R’de bire bir olmadığı için tersini tanımlarken[−π/2,π/2] aralığına kısıtlanır: arcsin:[−1,1]→[−π/2,π/2]. Arccos’un çıktı aralığı[0,π], arctan’ınki(−π/2,π/2)’dir. Ters fonksiyon tek bir esas açı döndürür.",
          "arcsin(sin(5π/6))=π/6’dır; 5π/6 ana çıktı aralığında değildir. sin(arcsin u)=u, |u|≤1 için geçerlidir. sin⁻¹ gösterimi ters fonksiyon olarak kullanıldığında 1/sin ile karıştırılmamalıdır; csc bu ters orandır."
        ]
      },
      {
        "title": "Kosinüs toplam ve farkını dönmeden türet",
        "paragraphs": [
          "İki birim vektörün aralarındaki açı farkından skaler çarpım cos(A−B)=cosAcosB+sinAsinB verir. B yerine−B yazarsan cos(A+B)=cosAcosB−sinAsinB elde edilir. Toplam açıda iki sinüs çarpımının önündeki eksi önemlidir.",
          "Örneğin cos 75°=cos(45°+30°)=(√6−√2)/4 olur. cos(A+B), cosA+cosB değildir. A=0 veya B=0 sınırı formülü denetler; A=B için çıkan cos 2A ifadesi iki kat açıya bağlanır."
        ]
      },
      {
        "title": "Sinüs toplam ve farkı çapraz bileşenlerdir",
        "paragraphs": [
          "sin(A+B)=sinAcosB+cosAsinB, sin(A−B)=sinAcosB−cosAsinB. Bu kurallar bir vektörün dönmesinde düşey koordinatın nasıl değiştiğiyle ilişkilidir. Toplamda iki benzer fonksiyon çarpımı değil çapraz sin-cos terimleri vardır.",
          "sin 15°=sin(45°−30°)=(√6−√2)/4 bulunur. Sinüsün tekliğini kullanarak B’nin işaretini değiştirdiğinde fark formülünün çıktığını da kontrol edebilirsin. Açı birimlerini eşitlemeden 45 ileπ/6’yı aynı toplamın ham sayıları gibi toplama."
        ]
      },
      {
        "title": "Tanjant ve kotanjant toplamlarında payda koşulu",
        "paragraphs": [
          "tan(A±B)=(tanA±tanB)/(1∓tanAtanB) koşullu bir yazımdır; tanA, tanB ve sonuç tanımlı, payda sıfırdan farklı olmalıdır. cot(A+B)=(cotAcotB−1)/(cotA+cotB), cot(A−B)=(cotAcotB+1)/(cotB−cotA) benzer koşulları taşır.",
          "Tan toplamı, sin toplamını cos toplamına bölerek türetilir. Bazı açılarda sol taraf tanımlı olduğu hâlde tanA veya tanB tanımsız olabilir; o durumda bu yazımı kullanamazsın, sin/cos toplamından ilerleyebilirsin. Bir formülün kendi paydalarını yok sayma."
        ]
      },
      {
        "title": "İki kat açıyı toplam formülünden çıkar",
        "paragraphs": [
          "Toplam kurallarında B=A seçilince sin 2A=2sinAcosA ve cos 2A=cos²A−sin²A=1−2sin²A=2cos²A−1 bulunur. Hedefte yalnız sin veya yalnız cos biliniyorsa uygun eşdeğer biçimi seçebilirsin.",
          "tan 2A=2tanA/(1−tan²A), cot 2A=(cot²A−1)/(2cotA) payda koşullarıyla kullanılır. cos²A−sin²A ile cos(A²) veya 2cosA−1 aynı şey değildir. 2A açı çarpanı, sin²A ise fonksiyon değerinin karesidir."
        ]
      },
      {
        "title": "Yarım açıda karekökün işaretini bölge seçer",
        "paragraphs": [
          "cosA=1−2sin²(A/2) ve cosA=2cos²(A/2)−1’den sin²(A/2)=(1−cosA)/2, cos²(A/2)=(1+cosA)/2 çıkar. Karekök alınca± bulunur; A/2’nin bölgesi işareti belirler. Yarım açı her zaman dar açı değildir.",
          "tan(A/2)=sinA/(1+cosA) veya(1−cosA)/sinA, yazılan payda sıfır değilse kullanılabilir. İki yazımın tanım kümeleri bire bir aynı değildir. A=π örneğinde tan(A/2) tanımsızken bazı ara ifadeler 0/0 verebilir; bunlar iptal edilecek sayılar değildir."
        ]
      },
      {
        "title": "Toplamı çarpıma, çarpımı toplama dönüştür",
        "paragraphs": [
          "Toplam-fark kurallarını ekleyip çıkarınca sinA+sinB=2sin((A+B)/2)cos((A−B)/2), sinA−sinB=2cos((A+B)/2)sin((A−B)/2) bulunur. cosA+cosB=2cos((A+B)/2)cos((A−B)/2); cosA−cosB=−2sin((A+B)/2)sin((A−B)/2) olur.",
          "Ters yönde 2sinAcosB=sin(A+B)+sin(A−B), 2cosAcosB=cos(A+B)+cos(A−B), 2sinAsinB=cos(A−B)−cos(A+B) kullanılır. Bu bağıntılar toplamı sıfır çarpımına veya çarpımı tek tek değerlendirilebilen açılara taşır; bağımsız ezber yerine iki toplam formülünden yeniden üretilebilir."
        ]
      },
      {
        "title": "Kosinüs teoremi her üçgende uzunluk kurar",
        "paragraphs": [
          "ABC üçgeninde a karşısı A, diğer kenarlar b, c ise a²=b²+c²−2bc cosA olur. İki kenar ve aralarındaki açıyla üçüncü kenarı, üç kenarla açının kosinüsünü bulabilirsin. A=90° için cosA=0 ve Pisagor bağıntısı geri gelir.",
          "Üç kenar verildiğinde önce üçgen eşitsizliğini denetle. cosA=(b²+c²−a²)/(2bc) için b, c pozitif olmalıdır. Birlikte verilmeyen kenar-açı eşleşmesini şeklin görünüşünden çıkarmak yerine isimleri açık yaz; aradaki açı b ve c’nin birleştiği köşededir."
        ]
      },
      {
        "title": "Sinüs teoremi karşı kenarla eşleşir",
        "paragraphs": [
          "a/sinA=b/sinB=c/sinC=2R, R çevrel çember yarıçapı olmak üzere her geçerli üçgende doğrudur. Eşleşme karşılıklıdır; a’yı sinB ile aynı orana rastgele koyamazsın. İki açı biliniyorsa üçüncüyüπ−A−B ile bulup ölçeği belirleyebilirsin.",
          "Sinüs teoremi tek bir açı için bazen iki aday üretir; sinB=sin(π−B). Arcsin’in verdiği dar esas açı tek üçgen olduğunun kanıtı değildir. Adaylarda açılar toplamı ve verilen kenarlarla uyumu ayrıca kontrol et."
        ]
      },
      {
        "title": "Üçgende alan iki kenar ve sinüsle bulunur",
        "paragraphs": [
          "S=bc sinA/2, b ve c aralarındaki A açısıyla verilirse geçerlidir. Aynı alan ac sinB/2 veya ab sinC/2 ile de bulunur. Bu bağıntı, bir kenarın ötekine dik bileşenini yükseklik yapmakla türetilir.",
          "A yerine 180°−A alındığında sinüs aynı olduğundan aynı iki kenarın bu iki aralığındaki alanları eşit olabilir; üçüncü kenarlar farklıdır. Alanın eşitliği üçgenlerin eşit olduğunu kanıtlamaz. Birimde uzunlukların karesi bulunduğu için alan cm² veya m² yazılır."
        ]
      },
      {
        "title": "İki kenar ve karşı açı her zaman tek üçgen vermez",
        "paragraphs": [
          "A dar, karşı kenar a ve komşu kenar b verilmişse yükseklik h=b sinA yararlıdır. a<h ise üçgen yok; a=h bir dik üçgen; h<a<b ise iki olası üçgen; a≥b ise uygun durumda tek üçgen bulunur. Önce açının dar olduğunun bu sınıflamadaki rolünü belirt.",
          "Örneğin A=30°, a=5, b=8 için h=4; 4<5<8 iki üçgen verir. sinB=b sinA/a=4/5 olduğundan B yaklaşık 53,13° veya 126,87°; her ikisinde A+B<180° sağlanır. Tek bir arcsin sonucu ikinci çözümü görünmez kılmamalıdır."
        ]
      },
      {
        "title": "Temel denklemlerde bütün tur ailelerini yaz",
        "paragraphs": [
          "|a|≤1 için sinx=a denkleminin bir çözümü θ ise x=θ+2kπ veya x=π−θ+2kπ; cosx=a için x=±θ+2kπ, k tam sayıdır. |a|>1 gerçek çözüm yoktur. a=±1’de iki aile aynı kökleri tekrarlayabilir, kümede tekrar yazılmaz.",
          "tanx=a için x=θ+kπ, cotx=a için de θ+kπ kullanılır; ilgili kutup açıları tanımda zaten dışlanır. Verilen çözüm aralığı[0,2π) gibi yarı açıksa 2π alınmaz. Model bir tam turdaki kökleri gösterir; bütün R çözümü için periyodik aileyi de söylemen gerekir."
        ]
      },
      {
        "title": "Bilinmeyenli açıda dönüşümü geri çevir",
        "paragraphs": [
          "sin(2x−π/3)=1/2 için önce u=2x−π/3 al, u=π/6+2kπ veya 5π/6+2kπ yaz. Sonra her dalda x’i çöz: x=π/4+kπ veya 7π/12+kπ. Yalnız esas açıyı bulmak bütün x çözümlerini vermez.",
          "Bir aralık istenmişse en son k tam sayılarını o aralığa göre seç. Açı denklemindeki çarpan periyodu da değiştirir. tan(f(x))=tan(g(x)) için f(x)=g(x)+kπ yazarken her iki tanjantın da tanımlı olduğunu kontrol etmeyi sürdür."
        ]
      },
      {
        "title": "Çarpanlara ayır ve kaybolan dal bırakma",
        "paragraphs": [
          "sin 2x=sinx için 2sinxcosx−sinx=sinx(2cosx−1)=0 olur. İlk dal sinx=0, ikinci dal cosx=1/2’dir. Baştan sinx’e bölmek ilk dalı kaybettirir. Aynı mantık ikinci dereceden denklemlerdeki sıfır çarpımıyla aynıdır.",
          "sin veya cos cinsinden ikinci derece bir ifade varsa t=sinx veya cosx alıp önce t polinomunu çözebilirsin. t∈[−1,1] koşulunu uyguladıktan sonra her geçerli t için açı ailelerini kur. t kök sayısı ile x kök sayısı aynı değildir."
        ]
      },
      {
        "title": "Doğrusal sin-cos denkleminin varlık koşulu",
        "paragraphs": [
          "a sinx+b cosx=c için R=√(a²+b²)>0 al; cosφ=a/R, sinφ=b/R seçilirse sol taraf R sin(x+φ) olur. Çözüm ancak |c|≤R olduğunda vardır. Fazı seçerken a, b’nin işaretleri φ’nın doğru bölgesini belirler.",
          "a=b=0 ise 0=c ayrı değerlendirilir: c=0 tüm gerçekler, c≠0 boş küme. a veya b’den biri sıfırken ona bölmek yerine tek fonksiyon denklemini çöz. Bu yöntem, katsayılardan birini zorla 1 yaparken kaybolan sıfır durumlarını da korur."
        ]
      },
      {
        "title": "Homojen denklemde bölme koşulunu önceden sına",
        "paragraphs": [
          "a sinx+b cosx=0 için a≠0 ise cosx=0 değerleri ilk ifadede±a verir ve kök olmaz; bu kontrol sonrası tanx=−b/a yazılabilir. a=0, b≠0 ise doğrudan cosx=0 çözülür. a=b=0 olduğunda bütün gerçekler geçerlidir.",
          "Kareli homojen ifadede cos² ile bölmeden önce cosx=0 adayını ilk denklemde denetle. Bir dönüşümün pratik olması, bütün açılarda koşulsuz eşdeğer olduğu anlamına gelmez. Her çözüm dalını ilk ifadede geri denetlemek kök kaybını ve fazla adayı birlikte önler."
        ]
      },
      {
        "title": "Hangi yöntemin neyi kanıtladığını söyle",
        "paragraphs": [
          "Birim çember koordinat ve işareti; grafik periyodu ve kutupları; özdeşlik cebirsel eşitliği; üçgen teoremleri uzunluk/açı verisini; denklem yöntemleri bütün çözüm kümesini kurar. Bir resimde yaklaşık aynı görünen iki değer, tam bir özdeşlik kanıtı değildir.",
          "Alt modellerde önce tahmin et, bir sayı veya koşulla gerekçe yaz, sonra aynı parametrelerden hesaplanan sonuçla karşılaştır. Derece/radyan birimini ve tanım dışı noktaları görünür tut. Model kullanımı kendi başına konu tamamlama, doğru cevap veya XP sayılmaz; bağımsız özgün sorularla çözümünü sınarsın."
        ]
      }
    ],
    "examples": [
      {
        "title": "Açı ve esas ölçü",
        "prompt": "−780° açısının esas ölçüsünü ve radyan değerini bul.",
        "strategy": "Tam tur ekle, sonra birim dönüştür.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "−780°+3·360°=300° esas ölçüdür."
          },
          {
            "label": "2. adım",
            "explanation": "Açının kendi radyan değeri−780π/180=−13π/3."
          },
          {
            "label": "3. adım",
            "explanation": "Esas ölçünün radyanı 300π/180=5π/3; bunlar 3 tam tur fark taşır."
          }
        ],
        "answer": "Esas 300°=5π/3; asıl açı−13π/3.",
        "check": "Esas ölçü[0,360°) aralığında.",
        "pitfall": "Asıl yönlü açı ile esas temsilcisinin ölçülerini aynı sayma."
      },
      {
        "title": "Radyanla yay ve alan",
        "prompt": "Yarıçapı 6 cm çemberde merkez açı 120°. Küçük yay ve dilim alanını bul.",
        "strategy": "Açıyı 2π/3 radyana çevir.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "120π/180=2π/3."
          },
          {
            "label": "2. adım",
            "explanation": "Yay s=rθ=6·2π/3=4π cm."
          },
          {
            "label": "3. adım",
            "explanation": "Dilim alanı r²θ/2=36·(2π/3)/2=12π cm²."
          }
        ],
        "answer": "Yay 4π cm, alan 12π cm².",
        "check": "Daire alanının 1/3’ü12π eder.",
        "pitfall": "Radyan formülüne 120 ham sayısını yazma."
      },
      {
        "title": "Bölge işaretiyle oran",
        "prompt": "sinθ=5/13 ve θ ikinci bölgede. cosθ ve tanθ nedir?",
        "strategy": "Kareli özdeşlikten sonra bölgeyi uygula.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "cos²θ=1−25/169=144/169."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci bölgede cos negatif: cosθ=−12/13."
          },
          {
            "label": "3. adım",
            "explanation": "tanθ=(5/13)/(−12/13)=−5/12."
          }
        ],
        "answer": "cosθ=−12/13, tanθ=−5/12.",
        "check": "İkinci bölge sin+, cos−, tan−.",
        "pitfall": "Karekökten otomatik pozitif işaret alma."
      },
      {
        "title": "Toplam-farkla tam değer",
        "prompt": "sin 75° ve cos 75° değerlerini bul.",
        "strategy": "75°=45°+30° kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "sin 75=sin 45cos 30+cos 45sin 30=(√6+√2)/4."
          },
          {
            "label": "2. adım",
            "explanation": "cos 75=cos 45cos 30−sin 45sin 30=(√6−√2)/4."
          },
          {
            "label": "3. adım",
            "explanation": "Kareleri toplamı[(8+4√3)+(8−4√3)]/16=1."
          }
        ],
        "answer": "sin 75=(√6+√2)/4; cos 75=(√6−√2)/4.",
        "check": "75° ilk bölgede iki değer de pozitif, sin daha büyük.",
        "pitfall": "Kosinüs toplamının eksi terimini artı yapma."
      },
      {
        "title": "İki ve yarım açı",
        "prompt": "θ ikinci bölgede ve cosθ=−3/5. sin 2θ ve cos(θ/2) nedir?",
        "strategy": "Önce sinθ, sonra yarım açının bölgesi.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İkinci bölgede sinθ=+4/5."
          },
          {
            "label": "2. adım",
            "explanation": "sin 2θ=2(4/5)(−3/5)=−24/25."
          },
          {
            "label": "3. adım",
            "explanation": "θ/2 ilk bölgede; cos(θ/2)=+√[(1−3/5)/2]=1/√5=√5/5."
          }
        ],
        "answer": "sin 2θ=−24/25; cos(θ/2)=√5/5.",
        "check": "θ/2 işareti ayrıca seçildi.",
        "pitfall": "cosθ negatif diye yarım açı kosinüsünü de negatif sanma."
      },
      {
        "title": "Dalga parametreleri",
        "prompt": "f(x)=−3sin(2x−π/2)+4, x radyan. Genlik, periyot ve görüntü?",
        "strategy": "Dört parametreyi birbirinden ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "|A|=3 ve orta çizgi 4."
          },
          {
            "label": "2. adım",
            "explanation": "b=2 ⇒temel periyot 2π/2=π; sağa kayma(π/2)/2=π/4."
          },
          {
            "label": "3. adım",
            "explanation": "Sinüs değer aralığı[−1,1] olduğundan çıktı 4±3, yani[1,7]."
          }
        ],
        "answer": "Genlik 3, periyotπ, görüntü[1,7], sağa kaymaπ/4.",
        "check": "Negatif genlik yönü yansıtır; genişliği 3 olarak kalır.",
        "pitfall": "Periyodu 2π veya−π yazma."
      },
      {
        "title": "Ters fonksiyon dalı",
        "prompt": "arcsin(sin(7π/6)) ve arccos(cos(7π/6)) değerlerini bul.",
        "strategy": "Önce trig değer, sonra ana çıktı aralığı.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "sin(7π/6)=−1/2; arcsin çıktısı[−π/2,π/2] içinde olmalı."
          },
          {
            "label": "2. adım",
            "explanation": "Bu aralıkta sinüsü−1/2 olan açı−π/6."
          },
          {
            "label": "3. adım",
            "explanation": "cos(7π/6)=−√3/2; arccos çıktısı[0,π] içinde 5π/6 olur."
          }
        ],
        "answer": "−π/6 ve 5π/6.",
        "check": "İki tersin seçtiği esas açı aralıkları farklıdır.",
        "pitfall": "Ters ve fonksiyon her gerçek girdide koşulsuz sadeleşmez."
      },
      {
        "title": "Kosinüs teoremiyle kenar",
        "prompt": "Üçgende b=5 cm, c=7 cm ve aralarındaki A=60°. Karşı a ve alan nedir?",
        "strategy": "Kosinüs teoremi ve iki kenarlı alan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "a²=25+49−2·5·7·(1/2)=39."
          },
          {
            "label": "2. adım",
            "explanation": "a=√39 cm pozitif uzunluktur."
          },
          {
            "label": "3. adım",
            "explanation": "S=5·7·sin 60/2=35√3/4 cm²."
          }
        ],
        "answer": "a=√39 cm; alan 35√3/4 cm².",
        "check": "2<a<12 üçgen eşitsizliğini sağlar.",
        "pitfall": "Verilen açıyı karşı değil aradaki açı olarak eşleştir."
      },
      {
        "title": "Sinüs teoremiyle ölçek",
        "prompt": "A=30°, B=45° ve a=6 cm. b ve çevrel yarıçap R nedir?",
        "strategy": "a/sinA=2R ortak oranını bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "a/sinA=6/(1/2)=12 cm=2R."
          },
          {
            "label": "2. adım",
            "explanation": "R=6 cm."
          },
          {
            "label": "3. adım",
            "explanation": "b=12sin 45=6√2 cm; üçüncü açı 105° pozitif."
          }
        ],
        "answer": "b=6√2 cm; R=6 cm.",
        "check": "Karşı kenar ve açı doğru eşleşti.",
        "pitfall": "Ortak oranı R sanma; 2R’dir."
      },
      {
        "title": "İki olası üçgeni koru",
        "prompt": "A=30°, a=5 cm, b=8 cm. Kaç üçgen mümkündür?",
        "strategy": "Sinüs teoremi ve tamamlayıcı açı adayları.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "sinB=b sinA/a=8·(1/2)/5=4/5."
          },
          {
            "label": "2. adım",
            "explanation": "B₁≈53,13°, B₂≈126,87°."
          },
          {
            "label": "3. adım",
            "explanation": "A+B₁≈83,13° ve A+B₂≈156,87°; ikisi de 180°’den küçük, C açıları pozitif."
          }
        ],
        "answer": "İki üçgen mümkündür.",
        "check": "h=b sinA=4; h<a<b koşulu iki çözümle uyuşur.",
        "pitfall": "Arcsin’in tek çıktısını tek üçgen diye sunma."
      },
      {
        "title": "Temel denklem ve aralık",
        "prompt": "sinx=−1/2, x∈[0,2π) için çözüm kümesini bul.",
        "strategy": "Referansπ/6; sinüs negatif iki bölge.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Üçüncü bölgede x=π+π/6=7π/6."
          },
          {
            "label": "2. adım",
            "explanation": "Dördüncü bölgede x=2π−π/6=11π/6."
          },
          {
            "label": "3. adım",
            "explanation": "İki değer de aralıkta ve sinüsü−1/2; başka bölge negatif değil."
          }
        ],
        "answer": "{7π/6,11π/6}.",
        "check": "R’nin tamamında her köke 2kπ eklenir.",
        "pitfall": "Yalnız−π/6 yazıp istenen aralığı ihmal etme."
      },
      {
        "title": "Çarpanla bütün dallar",
        "prompt": "sin 2x=sinx denklemini[0,2π) üzerinde çöz.",
        "strategy": "İki kat açıyı açıp ortak çarpan al.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "sinx(2cosx−1)=0."
          },
          {
            "label": "2. adım",
            "explanation": "sinx=0 ⇒x=0,π; cosx=1/2 ⇒x=π/3,5π/3."
          },
          {
            "label": "3. adım",
            "explanation": "Dört değer aralıkta; 2π sağ uç açık olduğundan alınmaz."
          }
        ],
        "answer": "{0,π/3,π,5π/3}.",
        "check": "Sinüse bölmediğimiz için 0 veπ korunur.",
        "pitfall": "İlk ortak çarpanı sıfır olamaz varsayma."
      },
      {
        "title": "Toplamı çarpıma dönüştür",
        "prompt": "sin 70°+sin 10° ifadesini çarpım biçiminde yaz.",
        "strategy": "Ortalama ve yarı farkı hesapla.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "(70+10)/2=40°, (70−10)/2=30°."
          },
          {
            "label": "2. adım",
            "explanation": "sin 70+sin 10=2sin 40cos 30."
          },
          {
            "label": "3. adım",
            "explanation": "cos 30=√3/2 ⇒sonuç√3sin 40°."
          }
        ],
        "answer": "√3sin 40°.",
        "check": "İlk toplam yaklaşık 1,1133; sonuç da aynı.",
        "pitfall": "Ortalama açıyı 80° seçme; toplamın yarısı gerekir."
      },
      {
        "title": "Doğrusal denklemin varlığı ve çözümü",
        "prompt": "sinx+√3cosx=1, x∈[0,2π). Çözümleri bul.",
        "strategy": "Sol tarafı 2sin(x+π/3) biçimine getir.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "R=√(1+3)=2 ve φ=π/3; sol taraf 2sin(x+π/3)."
          },
          {
            "label": "2. adım",
            "explanation": "sin(x+π/3)=1/2 ⇒x+π/3=π/6+2kπ veya 5π/6+2kπ."
          },
          {
            "label": "3. adım",
            "explanation": "x=−π/6+2kπ veyaπ/2+2kπ. Verilen aralıkta 11π/6 veπ/2 kalır."
          }
        ],
        "answer": "{π/2,11π/6}.",
        "check": "|1|≤2 varlık koşulu sağlandı; iki kök ilk ifadeyi sağlar.",
        "pitfall": "Faz eklenmesini x’in kendisiyle karıştırma."
      }
    ],
    "recall": [
      {
        "prompt": "Esas ölçü aralığı sıfırı içerir mi?",
        "answer": "Evet; [0,360°) veya[0,2π)."
      },
      {
        "prompt": "tanθ·cotθ=1 hangi açılarda kullanılır?",
        "answer": "Her iki oranın tanımlı olduğu, sinθ ve cos θ sıfır olmadığı açılarda."
      },
      {
        "prompt": "Sin/cos dalgasının temel periyodu?",
        "answer": "A≠0, b≠0 için 2π/|b|; x dereceyse 360°/|b|."
      },
      {
        "prompt": "arcsin’in çıktı aralığı nedir?",
        "answer": "[−π/2,π/2]; tersin tek değer seçmesini bu kısıtlama sağlar."
      },
      {
        "prompt": "Yarım açı kökünün işaretini ne seçer?",
        "answer": "Yarım açının bölgesi; yalnız başlangıç açısının işareti değil."
      },
      {
        "prompt": "a sinx+b cosx=c ne zaman çözülebilir?",
        "answer": "(a, b)≠(0,0) için|c|≤√(a²+b²); sıfır katsayılar ayrı dallanır."
      },
      {
        "prompt": "Sinüse bölmeden önce neyi kontrol etmelisin?",
        "answer": "Sinüsün 0 olduğu adayların başlangıç denklemini sağlayıp sağlamadığını."
      },
      {
        "prompt": "Sinüs teoremindeki ortak oran nedir?",
        "answer": "a/sinA=b/sinB=c/sinC=2R; R çevrel yarıçaptır."
      }
    ],
    "questions": [
      {
        "prompt": "−870° açısının[0,360°) içindeki esas ölçüsü nedir?",
        "correct": "210°",
        "distractors": [
          "150°",
          "−150°",
          "270°",
          "30°"
        ],
        "hint": "Üç tam tur ekle.",
        "explanation": "−870+1080=210. Yalnız mutlak değer almak farklı bir yönlü açı verir."
      },
      {
        "prompt": "150° kaç radyandır?",
        "correct": "5π/6",
        "distractors": [
          "3π/5",
          "5π/3",
          "π/6",
          "2π/3"
        ],
        "hint": "π/180 ile çarp.",
        "explanation": "150π/180=5π/6; derece ve radyan aynı açının iki ölçüm birimidir."
      },
      {
        "prompt": "2°10′20″ toplam kaç açı saniyesidir?",
        "correct": "7820",
        "distractors": [
          "7220",
          "8120",
          "7200",
          "6320"
        ],
        "hint": "1°=3600″,1′=60″.",
        "explanation": "2·3600+10·60+20=7820 açı saniyesi. Dakika ondalık derece değildir."
      },
      {
        "prompt": "Yarıçapı 4 cm çemberde merkez açıπ/3 radyan. Karşılık gelen küçük yay uzunluğu nedir?",
        "correct": "4π/3 cm",
        "distractors": [
          "16π/3 cm",
          "π/12 cm",
          "8π/3 cm",
          "4π cm"
        ],
        "hint": "s=rθ; açı zaten radyan.",
        "explanation": "4·π/3=4π/3 cm. Alan değil uzunluk sorulduğundan r² kullanılmaz."
      },
      {
        "prompt": "sinθ=3/5 ve θ ikinci bölgede. cosθ nedir?",
        "correct": "−4/5",
        "distractors": [
          "4/5",
          "−3/5",
          "√2/5",
          "−5/4"
        ],
        "hint": "Kareden sonra bölge işaretini seç.",
        "explanation": "cos²=1−9/25=16/25. İkinci bölgede kosinüs negatif olduğundan−4/5."
      },
      {
        "prompt": "θ=π/2 için hangi ifade tanımsızdır?",
        "correct": "tanθ",
        "distractors": [
          "sinθ",
          "cosθ",
          "cotθ",
          "cscθ"
        ],
        "hint": "cosθ=0 payda olabilir.",
        "explanation": "tanθ=sinθ/cosθ=1/0 tanımsızdır. Diğerleri 1,0,0 ve 1 olarak tanımlıdır."
      },
      {
        "prompt": "sin(7π/6) değeri nedir?",
        "correct": "−1/2",
        "distractors": [
          "1/2",
          "−√3/2",
          "√3/2",
          "−1"
        ],
        "hint": "Referansπ/6, üçüncü bölge.",
        "explanation": "Sinüs üçüncü bölgede negatiftir; değer−sin(π/6)=−1/2."
      },
      {
        "prompt": "cos(−300°) değeri nedir?",
        "correct": "1/2",
        "distractors": [
          "−1/2",
          "√3/2",
          "−√3/2",
          "0"
        ],
        "hint": "Kosinüs çifttir; 300° dördüncü bölgede.",
        "explanation": "Kosinüs çift fonksiyondur: cos(−300°)=cos 300°. Dördüncü bölgenin referansı60° olduğundan sonuç +cos 60°=1/2 olur."
      },
      {
        "prompt": "0<α<β<π/2 veriliyor. Hangisi kesin doğrudur?",
        "correct": "cosα>cosβ",
        "distractors": [
          "sinα>sinβ",
          "tanα>tanβ",
          "cotα<cotβ",
          "sinα=sinβ"
        ],
        "hint": "İlk bölgede kosinüs azalır.",
        "explanation": "Belirtilen aralıkta cos azalır, sin ve tan artar, cot azalır. Bu nedenle yalnız cosα>cosβ doğrudur."
      },
      {
        "prompt": "(1−cos²x)/sinx ifadesi sinx≠0 koşuluyla neye eşittir?",
        "correct": "sinx",
        "distractors": [
          "cosx",
          "1",
          "tanx",
          "cscx"
        ],
        "hint": "Pay sin²x olur.",
        "explanation": "sin²x/sinx=sinx; başlangıçtaki sinx≠0 koşulu sadeleşmeyle silinmez."
      },
      {
        "prompt": "f(x)=2sin(3x−π)+1, x radyan. Temel periyot nedir?",
        "correct": "2π/3",
        "distractors": [
          "2π",
          "3π",
          "π/3",
          "6π"
        ],
        "hint": "İç katsayı 3; genlik dönemi değiştirmez.",
        "explanation": "Sinüsün 2π dönemini iç çarpan 3’e böleriz:2π/3. Faz ve dikey kayma periyodu değiştirmez."
      },
      {
        "prompt": "f(x)=−3cos(2x)+4, x∈R. Görüntü kümesi hangisidir?",
        "correct": "[1,7]",
        "distractors": [
          "[−3,3]",
          "[−7, −1]",
          "[4,7]",
          "[−1,1]"
        ],
        "hint": "Orta 4, genlik 3.",
        "explanation": "cos değerleri[−1,1]; −3 ile çarpınca yine[−3,3],4 ekleyince[1,7]."
      },
      {
        "prompt": "arcsin(sin(5π/6)) değeri nedir?",
        "correct": "π/6",
        "distractors": [
          "5π/6",
          "−π/6",
          "π/3",
          "−5π/6"
        ],
        "hint": "arcsin çıktısı[−π/2,π/2] içinde olmalı.",
        "explanation": "sin 5π/6=1/2. Ana çıktı aralığında bu sinüse sahip açıπ/6’dır."
      },
      {
        "prompt": "cos 75° değeri hangisidir?",
        "correct": "(√6−√2)/4",
        "distractors": [
          "(√6+√2)/4",
          "(√3−1)/2",
          "√2/2",
          "1/4"
        ],
        "hint": "75=45+30; kosinüs toplamında eksi kullan.",
        "explanation": "cos(45°+30°)=cos 45°·cos 30°−sin 45°·sin 30°. Özel açı değerleriyle √6/4−√2/4=(√6−√2)/4 bulunur."
      },
      {
        "prompt": "tanα=1/2 ve tanβ=1/3; her iki açı dar. tan(α+β) kaçtır?",
        "correct": "1",
        "distractors": [
          "5/6",
          "1/5",
          "5/7",
          "2"
        ],
        "hint": "(tanα+tanβ)/(1−tanαtanβ).",
        "explanation": "Pay 5/6, payda 1−1/6=5/6; oran 1. Toplam açının tanjantı tanımlıdır."
      },
      {
        "prompt": "θ ikinci bölgede ve cosθ=−3/5. sin 2θ kaçtır?",
        "correct": "−24/25",
        "distractors": [
          "24/25",
          "7/25",
          "−7/25",
          "−6/5"
        ],
        "hint": "sinθ=4/5; iki kat açıyı kullan.",
        "explanation": "İkinci bölgede sinθ=+4/5 seçilir. sin 2θ=2sinθcosθ=2·(4/5)·(−3/5)=−24/25. Negatiflik ikinci açının olası bölgesiyle de tutarlıdır."
      },
      {
        "prompt": "π<θ<2π ve cosθ=−1/2. sin(θ/2) nedir?",
        "correct": "√3/2",
        "distractors": [
          "−√3/2",
          "1/2",
          "−1/2",
          "√2/2"
        ],
        "hint": "θ/2∈(π/2,π); ikinci bölgede sinüs pozitiftir.",
        "explanation": "sin²(θ/2)=(1−cosθ)/2=3/4. θ/2∈(π/2,π) olduğundan sin pozitif; √3/2."
      },
      {
        "prompt": "sin 70°+sin 10° hangi ifadeye eşittir?",
        "correct": "√3sin 40°",
        "distractors": [
          "2sin 80°",
          "√3cos 40°",
          "sin 60°",
          "2cos 30°"
        ],
        "hint": "Toplamı çarpıma dönüştür.",
        "explanation": "İki açının ortalaması40°, yarı farkı30°. Toplam formülü2sin 40°·cos 30° verir; cos 30°=√3/2 ile sonuç√3sin 40° olur."
      },
      {
        "prompt": "Bir üçgende b=3 cm, c=5 cm ve aralarındaki A=60°. a² kaç cm²’dir?",
        "correct": "19",
        "distractors": [
          "34",
          "49",
          "4",
          "15"
        ],
        "hint": "a²=b²+c²−2bc cosA.",
        "explanation": "Kosinüs teoremiyle a²=3²+5²−2·3·5·cos 60°=9+25−15=19. Verilen60° açısı iki bilinen kenarın arasındadır."
      },
      {
        "prompt": "Bir üçgende A=30° ve karşısındaki a=4 cm. Çevrel çember yarıçapı R kaç cm?",
        "correct": "4",
        "distractors": [
          "2",
          "8",
          "4√3",
          "2√3"
        ],
        "hint": "Sinüs teoreminde a/sinA=2R; ortak oranın yarısını al.",
        "explanation": "4/(1/2)=8=2R, R=4. Ortak oran yarıçapın iki katıdır."
      },
      {
        "prompt": "Bir üçgende A=30°, karşı kenar a=5, diğer verilen kenar b=8. Kaç farklı üçgen mümkündür?",
        "correct": "2",
        "distractors": [
          "0",
          "1",
          "3",
          "Sonsuz"
        ],
        "hint": "sinB=4/5; hem B hemπ−B adayını dene.",
        "explanation": "B yaklaşık 53,13° veya 126,87°. Her ikisinde 30°+B<180° olduğundan iki geçerli üçgen vardır."
      },
      {
        "prompt": "sinx=1/2 denkleminin[0,2π) içindeki çözüm kümesi nedir?",
        "correct": "{π/6,5π/6}",
        "distractors": [
          "{π/6}",
          "{π/6,7π/6}",
          "{5π/6,7π/6}",
          "{7π/6,11π/6}"
        ],
        "hint": "Sinüsün pozitif olduğu iki bölgeyi kullan.",
        "explanation": "Birinci bölgeπ/6, ikinci bölgeπ−π/6=5π/6; aralıkta iki kök bulunur."
      },
      {
        "prompt": "sin 2x=sinx denkleminin[0,2π) içinde kaç farklı çözümü vardır?",
        "correct": "4",
        "distractors": [
          "1",
          "2",
          "3",
          "5"
        ],
        "hint": "sinx(2cosx−1)=0.",
        "explanation": "İlk dal 0,π; ikinci dalπ/3,5π/3 verir. Dört farklı kök vardır; 2π açık uçtur."
      },
      {
        "prompt": "3sinx+4cosx=6 denkleminin gerçek sayılarda çözümü var mıdır?",
        "correct": "Yoktur; sol tarafın mutlak değeri en çok 5’tir.",
        "distractors": [
          "Vardır; genliği 7’dir.",
          "Yalnız x=0 çözümdür.",
          "Her gerçek x çözümdür.",
          "Yalnız x=π/2 çözümdür."
        ],
        "hint": "Genlik√(3²+4²).",
        "explanation": "Sol taraf 5sin(x+φ) biçimindedir ve[−5,5] aralığında kalır.6 bu aralığın dışında olduğundan çözüm yoktur."
      }
    ],
    "source": "MEBİ AYT Matematik Yönlü Açılar–Trigonometrik Denklemler bölümü; OGM AYT Trigonometri video notları; Aurelia Geometri tüm konular kopya kâğıdının gerçek trigonometri sayfası karşılaştırılarak yazılmış özgün anlatım ve sorular. Yarım açı ve toplam–çarpım bağıntıları toplam/iki kat açıdan türetilen açıklayıcı uzantılardır; resmî sınav sorusu kopyalanmamıştır."
  }
];

const guidance022: Record<string, QuestionGuidance> = {
  "f022-ayt-ikinci-dereceden-denklemler-1": {
    "knowledge": [
      "Baş katsayı sıfır olursa denklemin derecesi değişir."
    ],
    "strategy": "Önce m değerini ilk denklemde yerine koy.",
    "steps": [
      "m−3=3−3=0 olduğundan x² terimi kalkar; 4x−8=0 kalır.",
      "4x=8 eşitliğinden x=2; çözüm kümesi {2}."
    ],
    "optionReasons": [
      "−2 için 4x−8=−16; eşitlik sağlanmaz.",
      "−2 kök değildir; iki elemanlı küme fazladan değer içerir.",
      "Doğru: 4·2−8=0.",
      "4x−8=0 doğrusal denkleminin bir çözümü vardır.",
      "Örneğin x=0 eşitliği sağlamaz; her gerçek sayı çözüm değildir."
    ],
    "commonError": "a=0 iken ikinci derece kök formülünde sıfıra bölme.",
    "check": "İlk denklemde m=3,x=2 yazınca bütün sol taraf sıfır olmalı."
  },
  "f022-ayt-ikinci-dereceden-denklemler-2": {
    "knowledge": [
      "Sıfır çarpımında her çarpan ayrı sıfır olabilir."
    ],
    "strategy": "Orta terimi −6x+x biçiminde ayır.",
    "steps": [
      "2x²−6x+x−3=(2x+1)(x−3).",
      "2x+1=0 ⇒ x=−1/2; x−3=0 ⇒ x=3."
    ],
    "optionReasons": [
      "İki doğru kökün de işaretleri ters yazılmıştır.",
      "3 doğrudur fakat −1 için 2+5−3=4; kök değildir.",
      "İki aday da işaret hatası içerir; doğru kökler −1/2 ve 3.",
      "−1/2 sağlanır, −3 için 18+15−3=30 olur.",
      "Doğru: iki çarpanın sıfırları −1/2 ve 3."
    ],
    "commonError": "2x+1=0 eşitliğinde x=+1/2 yazma.",
    "check": "Kökler toplamı 5/2, çarpımı −3/2 ile katsayıları denetle."
  },
  "f022-ayt-ikinci-dereceden-denklemler-3": {
    "knowledge": [
      "Gerçek ikinci derece kökler için diskriminantın işareti belirleyicidir."
    ],
    "strategy": "a=1,b=4,c=7 değerlerini kullan.",
    "steps": [
      "Δ=4²−4·1·7=16−28=−12.",
      "Δ<0 olduğundan gerçek kök yoktur; farklı gerçek kök sayısı 0."
    ],
    "optionReasons": [
      "Doğru: negatif diskriminant gerçek kök vermez.",
      "Bir çift katlı gerçek kök için Δ=0 gerekirdi.",
      "İki farklı gerçek kök için Δ>0 gerekirdi.",
      "İkinci derece sıfır olmayan polinom üç farklı kök içeremez.",
      "Baş katsayısı 1 olan bu denklem özdeş sıfır değildir."
    ],
    "commonError": "Karmaşık kökleri gerçek kök sayısına ekleme.",
    "check": "x²+4x+7=(x+2)²+3≥3 olduğundan sıfır olamaz."
  },
  "f022-ayt-ikinci-dereceden-denklemler-4": {
    "knowledge": [
      "Çift katlı kök çözüm kümesinde tek eleman olarak yazılır."
    ],
    "strategy": "Önce ortak 3 katsayısını ayır.",
    "steps": [
      "3x²−12x+12=3(x²−4x+4)=3(x−2)².",
      "(x−2)²=0 yalnız x=2 verir."
    ],
    "optionReasons": [
      "−2 yazınca 3·16=48 olur; fazladan kök eklenmiştir.",
      "4 için 3(4−2)²=12; kök değildir.",
      "x=2 eşitliği sağladığı için boş küme değildir.",
      "Doğru: {2}; kökün katlılığı kümede tekrar oluşturmaz.",
      "−2 için karesel terim sıfır olmaz."
    ],
    "commonError": "İki katlı kökü iki farklı sayı gibi sayma.",
    "check": "Δ=(−12)²−4·3·12=0 ve −b/(2a)=2."
  },
  "f022-ayt-ikinci-dereceden-denklemler-5": {
    "knowledge": [
      "α²+β²=(α+β)²−2αβ."
    ],
    "strategy": "Kökleri çözmeden toplam ve çarpımı bul.",
    "steps": [
      "α+β=7, αβ=4; (α+β)²=49.",
      "α²+β²=49−2·4=41."
    ],
    "optionReasons": [
      "49 toplamın karesidir; 2αβ çıkarılmamıştır.",
      "Doğru: 49−8=41.",
      "49−4 yapılarak çarpımın iki katsayısı unutulmuştur.",
      "49+4 işlemi doğru özdeşlik değildir.",
      "49−16 işlemi çarpımın katsayısını gereğinden büyük alır."
    ],
    "commonError": "(α+β)² ifadesini α²+β² sanma.",
    "check": "41+2·4=49 geri eşitliğini kur."
  },
  "f022-ayt-ikinci-dereceden-denklemler-6": {
    "knowledge": [
      "Sıfır olmayan iki kökün tersleri toplamı (α+β)/(αβ) olur."
    ],
    "strategy": "Önce çarpımın sıfır olmadığını doğrula.",
    "steps": [
      "α+β=3/2 ve αβ=−1/2; iki kök de sıfır değildir.",
      "1/α+1/β=(3/2)/(−1/2)=−3."
    ],
    "optionReasons": [
      "Çarpımın negatif işareti kaybolmuştur.",
      "−3/2 bölme işleminde 1/2 payda etkisini atlar.",
      "Doğru: ortak paydalı toplam −3 verir.",
      "3/2 köklerin toplamıdır; tersler toplamı değildir.",
      "−2 yalnız çarpımın tersidir; toplam payı eksiktir."
    ],
    "commonError": "Kök çarpımı sıfır olsaydı tersleri tanımlı sayma.",
    "check": "(−3)·(−1/2)=3/2 ile S/P bölmesini denetle."
  },
  "f022-ayt-ikinci-dereceden-denklemler-7": {
    "knowledge": [
      "İki gerçek kökün uzaklığı √Δ/|a| olur."
    ],
    "strategy": "Diskriminantı hesapla ve baş katsayıya böl.",
    "steps": [
      "Δ=(−8)²−4·2·3=40.",
      "|α−β|=√40/2=2√10/2=√10."
    ],
    "optionReasons": [
      "√40 sadeleştirilmiş ama a=2 ile bölünmemiştir.",
      "√20 değeri doğru diskriminant bölümü değildir.",
      "Uzaklık √10 olduğundan 5 doğru değildir.",
      "√5 değerinin karesi 5; doğru kök farkının karesi Δ/a²=40/4=10 olmalıdır.",
      "Doğru: √40/2=√10."
    ],
    "commonError": "Uzaklık için negatif a işareti taşıma; mutlak değer kullan.",
    "check": "Kökler 2±√10/2; farkları √10."
  },
  "f022-ayt-ikinci-dereceden-denklemler-8": {
    "knowledge": [
      "Monik kök denklemi x²−Sx+P=0 biçimindedir."
    ],
    "strategy": "−3 ve 4 için S ile P değerlerini ayrı hesapla.",
    "steps": [
      "S=−3+4=1, P=(−3)·4=−12.",
      "x²−1x−12=0; (x+3)(x−4)=0 ile aynı."
    ],
    "optionReasons": [
      "Doğru: toplam 1 ve çarpım −12 korunmuştur.",
      "x katsayısının işareti toplamın tersine alınmamıştır.",
      "Çarpım −12 yerine +12 yazılmıştır.",
      "7, iki kökün işaretli toplamı değildir.",
      "Hem toplamın işareti hem çarpımın işareti yanlıştır."
    ],
    "commonError": "S katsayısını doğrudan +Sx olarak yazma.",
    "check": "Her iki verilen kökü polinoma koy; ikisi de sıfır vermeli."
  },
  "f022-ayt-ikinci-dereceden-denklemler-9": {
    "knowledge": [
      "Köklerin her birine t eklenirse yeni toplam S+2t, çarpım P+tS+t² olur."
    ],
    "strategy": "t=1 için iki yeni simetrik ifadeyi hesapla.",
    "steps": [
      "Eski S=4,P=1; yeni toplam (α+1)+(β+1)=6.",
      "Yeni çarpım (α+1)(β+1)=1+4+1=6; denklem y²−6y+6=0."
    ],
    "optionReasons": [
      "Toplam 5 ve çarpım 2, iki kökün birlikte birer artışını karşılamaz.",
      "Toplam doğru ama eski çarpım 1 değişmeden bırakılmıştır.",
      "Kök kaydırmanın yönü ve çarpımı hatalıdır.",
      "Doğru: yeni toplam ve çarpım 6.",
      "Monik denklemde −S katsayısı +6 yapılamaz."
    ],
    "commonError": "Sadece toplamı değiştirip çarpımı eski değerinde bırakma.",
    "check": "x=y−1 ifadesini eski denkleme koyarak y²−6y+6 elde et."
  },
  "f022-ayt-ikinci-dereceden-denklemler-10": {
    "knowledge": [
      "İki farklı pozitif gerçek kök için Δ>0,S>0,P>0 koşulları birlikte gerekir."
    ],
    "strategy": "Gerçeklik ve pozitiflik koşullarının kesişimini al.",
    "steps": [
      "Δ=16−4m>0 ⇒ m<4.",
      "Kök toplamı 4>0; çarpım m>0 ile ikisi aynı işaretli ve pozitif olur.",
      "Kesişim 0<m<4."
    ],
    "optionReasons": [
      "m<0 negatif kök çarpımı verir; iki kök aynı anda pozitif olamaz.",
      "Doğru: hem farklı gerçeklik hem pozitiflik sağlanır.",
      "m=0 bir sıfır kök, m=4 çift kök verir; uçlar alınamaz.",
      "m>4 negatif diskriminant verir.",
      "m<0 köklerin zıt işaretli olmasına yol açar."
    ],
    "commonError": "m=4 eşit köklerini iki farklı kök diye kabul etme.",
    "check": "Örneğin m=3 kökleri 1 ve 3 verir; iki uç durumu ayrıca kontrol et."
  },
  "f022-ayt-ikinci-dereceden-denklemler-11": {
    "knowledge": [
      "t=x² dönüşümünde gerçek x için t≥0 kalır."
    ],
    "strategy": "Dördüncü derece ifadeyi t üzerinden çarpanla.",
    "steps": [
      "t²−3t−4=(t−4)(t+1)=0 ⇒ t=4 veya t=−1.",
      "t=−1 gerçek kare olamaz; x²=4 ⇒ x=−2 veya 2."
    ],
    "optionReasons": [
      "x²=−1 dalından gerçek ±1 kökleri üretilemez.",
      "4 ve −1, x değil t adaylarıdır.",
      "Doğru: yalnız x²=4 gerçek kök verir.",
      "x²=4 için x=±4 değil ±2 olur.",
      "±2 kökleri bulunduğundan çözüm kümesi boş değildir."
    ],
    "commonError": "Dönüşümden çıkan t değerlerini x yerine doğrudan yazma.",
    "check": "Her iki x için 16−12−4=0."
  },
  "f022-ayt-ikinci-dereceden-denklemler-12": {
    "knowledge": [
      "Karekök eşitliğinde sağ taraf da negatif olamaz; kare alma aday üretebilir."
    ],
    "strategy": "x−2≥0 şartını kare almadan kaydet.",
    "steps": [
      "x≥2; kare alınınca x+4=(x−2)² ⇒ x(x−5)=0.",
      "Adaylar 0 ve 5; 0 koşulu bozar, 5 için √9=3=5−2."
    ],
    "optionReasons": [
      "0 karesi alınmış denklemi sağlasa da başlangıçta 2=−2 olur; elenir.",
      "0, x≥2 şartını ve ilk eşitliği sağlamaz.",
      "−5 için kökün içi −1 ve sağ taraf −7; gerçek çözüm değildir.",
      "5 başlangıçta sağlandığı için boş küme yanlıştır.",
      "Doğru: tek geçerli çözüm 5."
    ],
    "commonError": "Kare alma sonrası ilk eşitlikte geri kontrolü atlama.",
    "check": "√(5+4)=3 ve 5−2=3 değerlerini ayrı bul."
  },
  "f022-ayt-ikinci-dereceden-denklemler-13": {
    "knowledge": [
      "Toplamı S, çarpımı P olan iki sayı t²−St+P denkleminin kökleridir."
    ],
    "strategy": "Önce sayıların kendisini bul, ardından sıralamaları dene.",
    "steps": [
      "t²−5t+6=(t−2)(t−3)=0; sayılar 2 ve 3.",
      "(x,y)=(2,3) ve (3,2); her ikisinin toplamı 5, çarpımı 6."
    ],
    "optionReasons": [
      "Doğru: iki ayrı sıralı ikili sistemi sağlar.",
      "1·4=4; çarpım 6 koşulu bozulur.",
      "Negatif ikililerin toplamı −5 olur.",
      "(2,2) toplamı 4; (3,3) toplamı 6 olur.",
      "0·5=0 olduğundan çarpım koşulu sağlanmaz."
    ],
    "commonError": "Sıralı ikili sorusunda yer değiştiren iki çözümü tek sayma.",
    "check": "İki ikilide de verilen iki eşitliği ayrı ayrı kontrol et."
  },
  "f022-ayt-ikinci-dereceden-denklemler-14": {
    "knowledge": [
      "Uzunluk problemlerinde cebirsel kök ayrıca pozitif olmalıdır."
    ],
    "strategy": "Alanı kısa ve uzun kenarın çarpımıyla yaz.",
    "steps": [
      "x(x+2)=35 ⇒ x²+2x−35=(x−5)(x+7)=0.",
      "x=5 veya −7; uzunluk pozitif olduğundan kısa kenar 5 m."
    ],
    "optionReasons": [
      "−7 cebirsel köktür fakat fiziksel uzunluk olamaz.",
      "7, doğru çözümde uzun kenardır; kısa kenar 5 istenir.",
      "3·5=15 m² olur; verilen alanı sağlamaz.",
      "Doğru: 5·7=35 m².",
      "√35 ancak eş kenarlı kare için uygun olur; kenarlar iki metre farklı."
    ],
    "commonError": "Sorudaki kısa kenarı x+2 ile karıştırma.",
    "check": "Kısa 5, uzun 7; fark 2 ve alan 35."
  },
  "f022-ayt-karmasik-sayilar-1": {
    "knowledge": [
      "z=a+bi için Im(z)=b gerçek katsayıdır."
    ],
    "strategy": "4−7i ifadesini a+bi ile eşleştir.",
    "steps": [
      "Gerçek bileşen a=4, i katsayısı b=−7.",
      "Im(z)=−7; −7i ise sayının sanal terimidir."
    ],
    "optionReasons": [
      "−7i sanal terimdir; Im(z) katsayıyı verir.",
      "4 gerçek kısımdır.",
      "Doğru: i katsayısı −7.",
      "Sanal katsayının eksi işareti silinmiştir.",
      "Bütün sayı yerine yalnız katsayı soruluyor."
    ],
    "commonError": "Sanal kısmın sonuna yeniden i ekleme.",
    "check": "Re(z)+i Im(z)=4+i(−7) ile başlangıç sayısını kur."
  },
  "f022-ayt-karmasik-sayilar-2": {
    "knowledge": [
      "Karmaşık sayılar eşitse gerçek ve sanal bileşenleri ayrı eşittir."
    ],
    "strategy": "İki bileşenden iki doğrusal eşitlik kur.",
    "steps": [
      "2t+1=7 ⇒ t=3; u−2=5 ⇒ u=7.",
      "İstenen t+u=3+7=10."
    ],
    "optionReasons": [
      "t=3 doğruysa toplam 8 için u=5 gerekir; u−2=3 olur, verilen 5 değil.",
      "t=3 doğruysa toplam 9 için u=6 gerekir; u−2=4 olur.",
      "t=3 doğruysa toplam 11 için u=8 gerekir; u−2=6 olur.",
      "u=7 doğruysa toplam 12 için t=5 gerekir; 2t+1=11 olur, 7 değil.",
      "Doğru: t=3,u=7 ve toplam 10."
    ],
    "commonError": "Gerçek bileşeni sanal katsayıyla çapraz eşitleme.",
    "check": "Yerine koyunca (2·3+1)+(7−2)i=7+5i."
  },
  "f022-ayt-karmasik-sayilar-3": {
    "knowledge": [
      "i kuvvetlerinde üs her dört arttığında aynı değer tekrarlanır; i sıfır değildir."
    ],
    "strategy": "Üsse 4’ün uygun bir tam katını ekle.",
    "steps": [
      "−7+8=1; i⁸=1 olduğundan i⁻⁷=i¹.",
      "Sonuç i; eşdeğer kontrol 1/i⁷=1/(−i)=i."
    ],
    "optionReasons": [
      "Doğru: üs 4k+1 biçiminde.",
      "−i, 4k+3 biçimindeki üslerin değeridir.",
      "1 için üs 4 tam katı olmalıydı.",
      "−1 için üs 4k+2 olmalıydı.",
      "i’nin tam sayı kuvveti sıfır olamaz."
    ],
    "commonError": "Negatif üs işaretini doğrudan katsayıya eksi diye taşıma.",
    "check": "Bulduğun i ile i⁷=−i sayısını çarpınca 1 olmalı."
  },
  "f022-ayt-karmasik-sayilar-4": {
    "knowledge": [
      "Dağılma sonrasında i²=−1 uygulanır."
    ],
    "strategy": "Dört çarpımı yaz; gerçek ve sanal terimleri ayır.",
    "steps": [
      "(1+2i)(3−i)=3−i+6i−2i².",
      "−2i²=+2; gerçekler 3+2=5, sanal katsayı −1+6=5."
    ],
    "optionReasons": [
      "−2i² terimi −2 sanıldığı için gerçek kısım 1 bulunur.",
      "Sanal çapraz terimlerin işareti ters çevrilmiştir.",
      "Hem i² işareti hem sanal katsayı yanlıştır.",
      "Doğru: 5+5i.",
      "Yalnız bazı dağılma terimleri alınmış, çapraz toplam eksiktir."
    ],
    "commonError": "i² yerine +1 yazma.",
    "check": "Modül çarpımı √5·√10=√50; |5+5i| de √50."
  },
  "f022-ayt-karmasik-sayilar-5": {
    "knowledge": [
      "Eşlenik a+bi→a−bi dönüşümüdür."
    ],
    "strategy": "Yalnız i katsayısının işaretini çevir.",
    "steps": [
      "z=−2+3i için gerçek kısım −2 aynı kalır.",
      "Sanal katsayı 3→−3; eşlenik −2−3i."
    ],
    "optionReasons": [
      "2−3i sayısı −z olur; gerçek kısım da değiştirilmiştir.",
      "Doğru: yalnız sanal katsayı ters döner.",
      "Gerçek kısmın işareti değişmiş ama sanal kısım korunmuştur.",
      "Gerçek ve sanal bileşenler yer değiştirilmiştir.",
      "Bu başlangıç z sayısıdır; sanal kısmı sıfır olmadığından eşleniğine eşit değildir."
    ],
    "commonError": "Eşlenik alma ile sayının ters işaretlisini karıştırma.",
    "check": "z+z̄=−4 gerçek, z z̄=13 pozitif olmalı."
  },
  "f022-ayt-karmasik-sayilar-6": {
    "knowledge": [
      "Bölmede pay ve payda aynı sıfır olmayan eşlenikle çarpılır."
    ],
    "strategy": "1−i paydasını 1+i ile gerçelleştir.",
    "steps": [
      "Pay (2+i)(1+i)=2+3i+i²=1+3i; payda (1−i)(1+i)=2.",
      "Bölüm 1/2+(3/2)i."
    ],
    "optionReasons": [
      "Gerçek ve sanal katsayılar yer değiştirilmiştir.",
      "Bu sayı bölenin kendisidir; bölüm değildir.",
      "Doğru: payın iki bileşeni de 2’ye bölünür.",
      "Paydadaki eşlenik çarpımı veya sanal işaret yanlış kullanılmıştır.",
      "Paydanın 2 etkisi ve gerçek paydaki i² hesaba katılmamıştır."
    ],
    "commonError": "Eşlenikle yalnız paydayı çarpıp payı değiştirmeme.",
    "check": "(1/2+3i/2)(1−i)=2+i ile geri çarp."
  },
  "f022-ayt-karmasik-sayilar-7": {
    "knowledge": [
      "z z̄=a²+b²=|z|² olur."
    ],
    "strategy": "3−4i ile 3+4i çarpımında çapraz terimleri izle.",
    "steps": [
      "(3−4i)(3+4i)=9+12i−12i−16i².",
      "Sanal terimler gider; 9+16=25."
    ],
    "optionReasons": [
      "5 modüldür; burada modülün karesi sorulur.",
      "9−16 işlemi i²=−1 etkisini yanlış uygular.",
      "16−9 farkı değil karelerin toplamı gerekir.",
      "Modül karesi negatif olamaz.",
      "Doğru: 3²+(−4)²=25."
    ],
    "commonError": "Eşlenik çarpımını |z| ile karıştırıp |z|² olduğunu unutma.",
    "check": "Sonuç gerçek, negatif olmayan ve 25 olmalı."
  },
  "f022-ayt-karmasik-sayilar-8": {
    "knowledge": [
      "Eşlenik toplamı gerçek kısmın iki katı; modül karesi kareler toplamıdır."
    ],
    "strategy": "z=a+bi yaz; önce a’yı, sonra b’nin işaretini bul.",
    "steps": [
      "2a=4 ⇒ a=2; a²+b²=13 ⇒ b²=9.",
      "b=±3 adayından Im(z)>0 nedeniyle b=3 kalır; z=2+3i."
    ],
    "optionReasons": [
      "Doğru: toplam, modül ve pozitif sanal kısım birlikte sağlanır.",
      "Modül aynı olsa da Im(z)=−3 koşulu bozar.",
      "Gerçek kısım 4 olursa z+z̄=8 çıkar.",
      "3+2i modülü √13 olsa da eşlenik toplamı 6 olur.",
      "Gerçek kısım −2 için toplam −4 olur."
    ],
    "commonError": "b²=9 bulunca pozitif sanal kısım koşulunu atlama.",
    "check": "(2+3i)+(2−3i)=4 ve |2+3i|=√13."
  },
  "f022-ayt-karmasik-sayilar-9": {
    "knowledge": [
      "Negatif diskriminantta karmaşık kökler gerçek olmayan eşlenik çifttir."
    ],
    "strategy": "Tam kareye tamamlayıp i²=−1 kullan.",
    "steps": [
      "x²+4x+13=(x+2)²+9=0 ⇒ (x+2)²=−9.",
      "x+2=±3i; x=−2±3i."
    ],
    "optionReasons": [
      "Gerçek kısım −2 yerine +2 yazılmıştır.",
      "−9 karekökündeki i ve sayı değeri yanlış alınmıştır.",
      "−b/(2a) olan gerçek kısım −4 değildir.",
      "Doğru: iki karmaşık eşlenik kök −2±3i.",
      "Gerçek kök yoktur ama soru karmaşık çözüm kümesini soruyor."
    ],
    "commonError": "Gerçek kök yok sonucunu karmaşık kök yok diye genelleme.",
    "check": "Toplam −4, çarpım (−2)²+3²=13."
  },
  "f022-ayt-karmasik-sayilar-10": {
    "knowledge": [
      "Gerçek katsayılı polinomun gerçek olmayan kökü varsa eşleniği de köktür."
    ],
    "strategy": "Diğer kökü 1+2i alıp toplam–çarpım kullan.",
    "steps": [
      "Kök toplamı (1−2i)+(1+2i)=2; çarpım 1+4=5.",
      "Monik denklem x²−2x+5=0."
    ],
    "optionReasons": [
      "Kök toplamının x katsayısındaki eksi işareti ters yazılmıştır.",
      "Doğru: S=2,P=5.",
      "Kök çarpımı eşlenik çiftte −3 değil 5 olur.",
      "Toplam ve çarpım verilen eşlenik çiftle uyuşmaz.",
      "Çarpım 5 yerine 3 alınmıştır."
    ],
    "commonError": "Gerçek katsayı koşulunu kaldırarak eşlenik kök kuralı uygulama.",
    "check": "(x−1+2i)(x−1−2i)=(x−1)²+4."
  },
  "f022-ayt-karmasik-sayilar-11": {
    "knowledge": [
      "Asal √(−1)=i seçilir; negatif radikantlarda gerçek kök çarpma kuralı koşulsuz kullanılamaz."
    ],
    "strategy": "Her iki kökü önce i olarak yaz.",
    "steps": [
      "√(−1)·√(−1)=i·i=i².",
      "i²=−1."
    ],
    "optionReasons": [
      "√ab=√a√b kuralı burada geçersiz uygulanarak +1 bulunur.",
      "Tek bir karekök değeri i; iki çarpanın çarpımı değildir.",
      "Doğru: i²=−1.",
      "−i, iki i çarpımının sonucu değildir.",
      "Karmaşık sayılarda belirtilen asal kök seçimiyle işlem tanımlıdır."
    ],
    "commonError": "√((−1)(−1)) ile iki ayrı asal kökün çarpımını eşitleme.",
    "check": "i·i=−1 temel tanımıyla sonucu kontrol et."
  },
  "f022-ayt-karmasik-sayilar-12": {
    "knowledge": [
      "Sıfırın çarpmaya göre tersi yoktur; bu karmaşık sayılarda da değişmez."
    ],
    "strategy": "z yerine 0 yazıp her işlemi ayrı denetle.",
    "steps": [
      "z+1=1; z·i=0; z̄=0; |z|=0 tanımlıdır.",
      "1/z=1/0 için 0 ile çarpıldığında 1 verecek sayı bulunamaz; tanımsızdır."
    ],
    "optionReasons": [
      "0+1=1 tanımlıdır.",
      "0·i=0 tanımlıdır.",
      "0’ın eşleniği 0’dır.",
      "0’ın modülü 0’dır.",
      "Doğru: sıfıra bölme tanımsız."
    ],
    "commonError": "Karmaşık sayılara geçildi diye sıfıra bölmeyi mümkün sanma.",
    "check": "Her w için 0·w=0 olduğundan 0·w=1 çözülemez."
  },
  "f022-ayt-esitsizlikler-1": {
    "knowledge": [
      "Pozitif baş katsayılı ikinci derece polinom iki basit kökün arasında negatiftir."
    ],
    "strategy": "Çarpanlarla kritik noktaları belirle, sıkı eşitsizlikte uçları çıkar.",
    "steps": [
      "x²−5x+6=(x−2)(x−3); kritik noktalar 2 ve 3.",
      "x<2 için iki eksi çarpımı pozitif, 2<x<3 için negatif, x>3 için pozitif; çözüm (2,3)."
    ],
    "optionReasons": [
      "2 ve 3 sıfır verdiğinden sıkı < koşulunda uçlar alınmaz.",
      "Bu dış bölgelerde iki çarpanın çarpımı pozitiftir.",
      "Doğru: yalnız iki kök arası negatif.",
      "Dış aralıklar pozitif; sıfır uçlar da < koşulunu sağlamaz.",
      "Örneğin x=5/2 için ürün −1/4<0; küme boş değildir."
    ],
    "commonError": "< ile ≤ uçlarını aynı gösterme.",
    "check": "x=0,5/2,4 örnekleri sırasıyla +,−,+ işaretini doğrular."
  },
  "f022-ayt-esitsizlikler-2": {
    "knowledge": [
      "Gerçek bir sayının karesi negatif olamaz."
    ],
    "strategy": "≤0 koşulunu yalnız sıfır eşitliğine indir.",
    "steps": [
      "(x−2)²≥0 her gerçek x için geçerli.",
      "Aynı ifadenin ≤0 olması için (x−2)²=0 ⇒ x=2."
    ],
    "optionReasons": [
      "x=2 ifadenin sıfır olduğu geçerli çözümdür.",
      "x=0 için kare 4>0; bütün gerçekler çözüm değildir.",
      "x=1 gibi 2’den küçük sayılarda kare pozitif olur.",
      "x=3 gibi 2’den büyük sayılarda kare pozitif olur.",
      "Doğru: yalnız {2}."
    ],
    "commonError": "Çift katlı kökte çözümün yalnız nokta olabileceğini gözden kaçırma.",
    "check": "x=2 için 0≤0 sağlanır; başka x için kare kesin pozitiftir."
  },
  "f022-ayt-esitsizlikler-3": {
    "knowledge": [
      "Çift kuvvetli çarpan kökte sıfır olur, diğer noktalarda işareti pozitiftir."
    ],
    "strategy": "Kare çarpanı ve x+2 çarpanının etkisini ayrı oku.",
    "steps": [
      "x=1 dışında (x−1)²>0; bu yüzden işareti x+2 belirler.",
      "Pozitiflik x>−2 ister; −2 sıfır, 1 de sıfır verdiğinden ikisi çıkarılır."
    ],
    "optionReasons": [
      "Doğru: (−2,1)∪(1,∞).",
      "x=1 ürünü sıfırladığı için sıkı > koşuluyla alınamaz.",
      "−2 ve 1 sıfır noktalarıdır; bu küme ikisini de içerir.",
      "x<−2 için x+2 negatiftir; kare işareti pozitife çeviremez.",
      "(−2,1) aralığındaki örneğin x=0 çözümünü eksik bırakır."
    ],
    "commonError": "Çift katlı kökte işaret değişmiyor diye kökü sıkı eşitsizlikte dahil etme.",
    "check": "x=0 için ürün 2>0; x=1 için 0; x=2 için 4>0."
  },
  "f022-ayt-esitsizlikler-4": {
    "knowledge": [
      "Sadeleştirme başlangıçtaki payda yasağını kaldırmaz."
    ],
    "strategy": "Önce x−3≠0 yaz, sonra kesri sadeleştir.",
    "steps": [
      "x≠3 koşulunda (x−3)/(x−3)=1.",
      "1≥0 olduğundan 3 dışındaki bütün gerçekler çözüm; x=3 tanımsız."
    ],
    "optionReasons": [
      "3 sayısı başlangıç ifadesinde 0/0 verir; ℝ olamaz.",
      "3 tanımsızdır; ayrıca x<3 olan geçerli değerleri atar.",
      "Örneğin x=0 için sonuç 1≥0; boş küme değildir.",
      "Doğru: ℝ\\{3}.",
      "Alınan tek değer 3 tam da paydanın sıfır olduğu yasak noktadır."
    ],
    "commonError": "Sadeleşen x−3 çarpanından sonra x=3’ü geri ekleme.",
    "check": "x=2 ve 4 için sonuç 1; x=3 için bölme tanımsız."
  },
  "f022-ayt-esitsizlikler-5": {
    "knowledge": [
      "Kesir eşitsizliğinde pay sıfırı dahil olabilir, payda sıfırı hiçbir zaman dahil olmaz."
    ],
    "strategy": "−1 ve 2 etrafında işaret tablosu kur.",
    "steps": [
      "x<−1 için (−)/(−)=+; −1<x<2 için (+)/(−)=−; x>2 için (+)/(+)=+.",
      "x=−1 sıfırla ≤ koşulunu sağlar; x=2 tanımsız; çözüm [−1,2)."
    ],
    "optionReasons": [
      "−1 sıfır kökü eksik, 2 yasak noktası fazladan alınmıştır.",
      "Doğru: pay kökü kapalı, payda kökü açık.",
      "2’de sıfıra bölme olduğu için sağ uç kapalı olamaz.",
      "Dış bölgelerde kesrin işareti pozitiftir; yalnız −1 uçta sıfır olur.",
      "−1 sıfır verdiği için ≤ koşulunda dahil edilmelidir."
    ],
    "commonError": "Pay ve payda köklerinin uç durumunu aynı sanma.",
    "check": "x=0 için −1/2≤0; x=−1 için 0; x=2 için tanımsız."
  },
  "f022-ayt-esitsizlikler-6": {
    "knowledge": [
      "Tam kareyi eksiyle çarpmak işaret için üst sınır verir."
    ],
    "strategy": "−x²−2x−2 ifadesini tepe biçimine getir.",
    "steps": [
      "−x²−2x−2=−[(x+1)²+1].",
      "(x+1)²≥0 olduğundan ifade ≤−1<0; her yerde negatiftir."
    ],
    "optionReasons": [
      "x=−1 için bile −1<0; pozitif değildir.",
      "x=−1 için değer 0 değil −1 olur.",
      "Doğru: kareye eklenen 1 sıkı negatifliği sağlar.",
      "İfade 0’a ulaşamadığından pozitif bir aralık oluşamaz.",
      "Örneğin x=0 için −2; özdeş sıfır değildir."
    ],
    "commonError": "Δ<0 sonucunda baş katsayının negatif olduğunu unutma.",
    "check": "En büyük değer −1, x=−1’de; daha yukarı çıkamaz."
  },
  "f022-ayt-esitsizlikler-7": {
    "knowledge": [
      "Bir kare artı sabitin en küçük değeri o sabittir."
    ],
    "strategy": "Her x şartını parabolün minimumunda sına.",
    "steps": [
      "x²+2x+m=(x+1)²+(m−1).",
      "x=−1 için minimum m−1; bunun sıkı pozitif olması m>1 gerektirir."
    ],
    "optionReasons": [
      "m=1 için x=−1’de 0 oluşur; >0 sağlanmaz.",
      "m<1 minimumu negatif yapar.",
      "0<m<1 değerleri hâlâ negatif minimum verir; örneğin m=1/2.",
      "m≤1 için minimum pozitif değildir.",
      "Doğru: m−1>0 ile her x için pozitif."
    ],
    "commonError": "Sıkı pozitifliği minimumun ≥0 koşuluna indirgeme.",
    "check": "m=2 için (x+1)²+1>0; m=1 sınırını ayrıca dene."
  },
  "f022-ayt-esitsizlikler-8": {
    "knowledge": [
      "Bir eşitsizlik sisteminde aynı x bütün koşulları sağlamalıdır."
    ],
    "strategy": "Önce iki çözüm kümesini bul, sonra kesiştir.",
    "steps": [
      "x²≤9 ⇒ −3≤x≤3.",
      "Bunu x>1 ile kesiştirince 1<x≤3; çözüm (1,3]."
    ],
    "optionReasons": [
      "Doğru: 1 açık, 3 kapalı.",
      "−3≤x≤1 değerleri ikinci koşulu sağlamaz.",
      "x=1, x>1 koşulunda dışarıda kalır.",
      "Bu aralık x>1 şartının ters tarafındadır.",
      "x>3 için x²≤9 bozulur; üst sınır atlanmıştır."
    ],
    "commonError": "Sistem koşullarını birleşimle toplama.",
    "check": "x=2 ikisini sağlar; x=1 ikinciyi, x=4 ilkini sağlamaz."
  },
  "f022-ayt-esitsizlikler-9": {
    "knowledge": [
      "|u|≤a için −a≤u≤a; uçlar dahil olur."
    ],
    "strategy": "u=x+2 yazıp üçlü eşitsizlikte 2 çıkar.",
    "steps": [
      "−3≤x+2≤3.",
      "−5≤x≤1; çözüm [−5,1]."
    ],
    "optionReasons": [
      "Uçlarda mutlak değer 3 olur ve ≤ koşuluna dahildir.",
      "x+2 yerine x−2 çözülmüş; merkez yanlış kaymıştır.",
      "Bu dış bölge |x+2|≥3 için uygundur, verilen ≤ için değil.",
      "Doğru: merkez −2, yarıçap 3.",
      "−3≤x≤3 aralığı x+2 kaydırmasını yok sayar."
    ],
    "commonError": "x+2 merkezini +2 sanma; sıfır olduğu yer −2’dir.",
    "check": "|−5+2|=|1+2|=3; ortadaki x=−2 için 0."
  },
  "f022-ayt-esitsizlikler-10": {
    "knowledge": [
      "u²≥a², a≥0 için u≤−a veya u≥a olur."
    ],
    "strategy": "Önce |x−2|≥3 biçimini oku.",
    "steps": [
      "x−2≤−3 veya x−2≥3.",
      "x≤−1 veya x≥5; eşitlik mümkün olduğundan iki uç kapalı."
    ],
    "optionReasons": [
      "Bu iç aralık uzaklığın en çok 3 olması içindir; eşitsizlik yönü terstir.",
      "Doğru: merkez 2’den uzaklığı en az 3 olan dış bölgeler.",
      "Açık iç aralık hem bölgeyi hem uçları yanlış seçer.",
      "Örneğin x=2 bu kümede ama 0≥9 yanlış; ayrıca sağ dış bölgeyi eksik bırakır.",
      "x=2 çözüm değil; sol dış bölge de bu kümede eksik."
    ],
    "commonError": "Kareli eşitsizliği yalnız x−2≥3 dalıyla çözme.",
    "check": "x=−1 ve 5 için kare 9; x=2 için 0."
  },
  "f022-ayt-esitsizlikler-11": {
    "knowledge": [
      "Karekök bir sayıdan küçükse o sağ taraf negatif olamaz; kare almak bu koşulla eşdeğerdir."
    ],
    "strategy": "Önce x≥1 şartını yaz.",
    "steps": [
      "x+1≥0 ve x−1≥0 birlikte x≥1 verir.",
      "Kare alınca x+1≤(x−1)² ⇒ x(x−3)≥0 ⇒ x≤0 veya x≥3.",
      "x≥1 ile kesişim [3,∞)."
    ],
    "optionReasons": [
      "Kare alma sonrası gelen x≤0 dalı, sağ tarafın negatifliği nedeniyle elenir.",
      "1≤x<3 için kare sonrası eşitsizlik sağlanmaz.",
      "Doğru: x≥3, ilk koşullarla birlikte geçerli.",
      "x=3 için √4=2=3−1; eşitlik dahil.",
      "Bu aralıkta sağ taraf negatiftir; karekök negatif bir sayıdan küçük olamaz."
    ],
    "commonError": "Kare aldıktan sonra x≥1 koşulunu unutma.",
    "check": "x=3 eşitlik; x=4 için √5≤3; x=1 için √2≤0 yanlış."
  },
  "f022-ayt-esitsizlikler-12": {
    "knowledge": [
      "Açık sınırdaki tam sayı dışarıda, kapalı sınırdaki içeride kalır."
    ],
    "strategy": "İlk ve son geçerli tam sayıyı belirle.",
    "steps": [
      "−2 dışarıda olduğundan ilk tam sayı −1; 4 dahil olduğundan son tam sayı 4.",
      "−1,0,1,2,3,4 listesinde 6 eleman vardır."
    ],
    "optionReasons": [
      "5 sayımı sıfırı veya geçerli bir ucu eksik bırakır.",
      "7 sayımı dışarıdaki −2’yi de ekler.",
      "4 sayımı negatif/sıfır değerleri gözden kaçırır.",
      "8, izinli uçların dışında fazladan sayılar içerir.",
      "Doğru: 4−(−1)+1=6."
    ],
    "commonError": "Tam sayı aralığında uç farkına 1 eklemeyi unutma.",
    "check": "Listeyi tek tek yazarak 6 sayıyı doğrula."
  },
  "f022-ayt-esitsizlikler-13": {
    "knowledge": [
      "Aynı anda sağlanan koşullar çözüm kümelerinin kesişimidir."
    ],
    "strategy": "x²<1 koşulunu açık aralığa çevir.",
    "steps": [
      "x²<1 ⇒ −1<x<1.",
      "x≥2 ile hiçbir ortak nokta yok; çözüm ∅."
    ],
    "optionReasons": [
      "Doğru: (−1,1)∩[2,∞)=∅.",
      "Bu birleşim iki koşuldan yalnız birini sağlamayı yeterli sayar.",
      "x≥2 için x²≥4; ilk koşul sağlanmaz.",
      "x=2 için 4<1 yanlıştır.",
      "x=0 ikinciyi, x=2 ilkini sağlamaz; bu aralık ortak çözüm değildir."
    ],
    "commonError": "Ve bağlacını veya gibi okuyup birleşim alma.",
    "check": "İlk koşul x<1, ikinci x≥2 ister; çelişkiyi doğrudan gör."
  },
  "f022-ayt-esitsizlikler-14": {
    "knowledge": [
      "Bir kare kesri tanımlı ve payı sıfır değilse pozitiftir."
    ],
    "strategy": "Tanım yasağıyla sıfır noktasını ayrı çıkar.",
    "steps": [
      "x=−2 paydada sıfır yapar ve yasaktır.",
      "Diğer noktalarda payda pozitif; pay x=1 dışında pozitif, x=1’de sıfır.",
      "Sıkı > koşuluyla hem −2 hem 1 çıkarılır: ℝ\\{−2,1}."
    ],
    "optionReasons": [
      "x=1 değeri 0 verir; sıkı pozitifliği sağlamaz.",
      "−2 yasak payda kökü hâlâ bu kümede kalır.",
      "Yalnız iki kritik nokta arası değil, dış bölgelerde de kare kesri pozitiftir.",
      "Doğru: iki farklı nedenle iki nokta dışarıda.",
      "−2 tanımsız, 1 sıfırdır; ayrıca dış çözümler atlanır."
    ],
    "commonError": "Paydaki sıfır ile paydadaki tanımsızlığı birbirine karıştırma.",
    "check": "x=0 için 1/4>0, x=2 için 1/16>0; x=1 için 0."
  },
  "f022-ayt-parabol-1": {
    "knowledge": [
      "Tepe apsisi h=−b/(2a), ordinatı f(h) olur."
    ],
    "strategy": "Önce apsisi bulup fonksiyonda yerine koy.",
    "steps": [
      "a=1,b=−6 için h=6/2=3.",
      "f(3)=9−18+5=−4; tepe (3,−4)."
    ],
    "optionReasons": [
      "Apsiste −b işareti unutulmuştur; simetri ekseni −3 değildir.",
      "Apsis doğru ama 5, y ekseni kesimidir; tepe ordinatı değildir.",
      "Doğru: f(x)=(x−3)²−4.",
      "6, köklerin toplamıdır; tepe apsisi yarısıdır.",
      "Hem apsis hem ordinat işareti ters alınmıştır."
    ],
    "commonError": "Tepe ordinatını c katsayısından doğrudan alma.",
    "check": "f(2)=f(4)=−3; simetri x=3 çevresinde."
  },
  "f022-ayt-parabol-2": {
    "knowledge": [
      "Negatif katsayılı tepe biçiminde tepe değeri maksimumdur."
    ],
    "strategy": "−2 ile çarpılan karenin işaretini incele.",
    "steps": [
      "−2(x+1)²≤0; dolayısıyla f(x)≤7.",
      "x=−1 için 7 alınır; |x+1| büyürken f(x) sınırsız azalır: (−∞,7]."
    ],
    "optionReasons": [
      "Bu, yukarı açılan parabolün minimum aralığına benzer; katsayı negatiftir.",
      "7 değeri x=−1’de alındığı için sağ uç açık olamaz.",
      "−1 tepe apsisidir; görüntü kümesinin alt sınırı değildir.",
      "f(x)>7 mümkün olmadığından bütün gerçekler görüntü değildir.",
      "Doğru: maksimum dahil 7, aşağı yön sınırsız."
    ],
    "commonError": "Tanım kümesindeki x=−1 ile görüntüdeki y=7 değerini karıştırma.",
    "check": "f(−1)=7, f(0)=5; aşağıya doğru değerlerin sürmesini kareden gör."
  },
  "f022-ayt-parabol-3": {
    "knowledge": [
      "Tepe T(h,k) ise f(x)=a(x−h)²+k."
    ],
    "strategy": "Tepeyi yerleştir, verilen başka noktayla a’yı bul.",
    "steps": [
      "f(x)=a(x−2)²−1; f(3)=2 ⇒ a−1=2.",
      "a=3; f(x)=3(x−2)²−1."
    ],
    "optionReasons": [
      "Doğru: hem (2,−1) tepesi hem f(3)=2 sağlanır.",
      "Tepe ordinatı +2 yapılmış; verilen −1 korunmamıştır.",
      "a=−3 için f(3)=−4 olur.",
      "x+2 biçimi tepe apsisini −2 yapar.",
      "a=2 için f(3)=1; verilen nokta sağlanmaz."
    ],
    "commonError": "x−h içindeki işaretle tepe koordinatını ters okuma.",
    "check": "f(2)=−1 ve f(3)=2 eşitliklerini birlikte doğrula."
  },
  "f022-ayt-parabol-4": {
    "knowledge": [
      "Kökleri r₁,r₂ olan parabol f(x)=a(x−r₁)(x−r₂) biçimindedir."
    ],
    "strategy": "Köklerle çarpanları kurup f(0)=4 kullan.",
    "steps": [
      "f(x)=a(x+1)(x−2); x=0 için f(0)=−2a.",
      "−2a=4 ⇒ a=−2."
    ],
    "optionReasons": [
      "a=2 için f(0)=−4; y kesiminin işareti ters olur.",
      "4, f(0) değeridir; baş katsayı değildir.",
      "a=−4 için f(0)=8 çıkar.",
      "Doğru: −2·1·(−2)=4.",
      "Monik seçim a=1 için f(0)=−2 olur."
    ],
    "commonError": "Yalnız köklerden baş katsayıyı 1 kabul etme.",
    "check": "−2(x+1)(x−2) açılımının sabit terimi 4."
  },
  "f022-ayt-parabol-5": {
    "knowledge": [
      "Kapalı aralıkta uçlar ve içerideki tepe ekstremum adaylarıdır."
    ],
    "strategy": "Tepeyi bulup iki uç değeriyle karşılaştır.",
    "steps": [
      "Tepe x=2 içeridedir; f(2)=−3.",
      "Uçlar f(−1)=1+4+1=6, f(4)=16−16+1=1.",
      "En büyük aday 6; x=−1’de alınır."
    ],
    "optionReasons": [
      "−3 minimum tepe değeridir; maksimum soruluyor.",
      "Doğru: adaylar 6,1,−3 arasında en büyük 6.",
      "1 yalnız sağ uç değeridir; sol uç daha büyüktür.",
      "4 aralıktaki bir x değeridir; maksimum y değeri değildir.",
      "9 için aday noktalardan hiçbiri bu değeri vermez."
    ],
    "commonError": "Parabol yukarı açılıyor diye kapalı aralıkta maksimum yok sanma.",
    "check": "f(x)=(x−2)²−3; aralıkta 2’ye en uzak x=−1."
  },
  "f022-ayt-parabol-6": {
    "knowledge": [
      "Ortak grafik noktalarında iki y ifadesi eşittir."
    ],
    "strategy": "x²=3x−2 denklemini çöz.",
    "steps": [
      "x²−3x+2=(x−1)(x−2)=0.",
      "Apsisler 1 ve 2; karşılık gelen noktalar (1,1),(2,4)."
    ],
    "optionReasons": [
      "−1 ve −2 çarpanların sabitleriyle kök işaretlerini karıştırır.",
      "0 için iki y değeri 0 ve −2; 3 için 9 ve 7 olur.",
      "Doğru: 1 ve 2 iki eşit y değerini sağlar.",
      "−1 için x²=1 fakat 3x−2=−5; yalnız 2 geçerli.",
      "3 kök değildir; ikinci doğru apsis 2 eksiktir."
    ],
    "commonError": "Çarpan (x−1)=0 denkleminden x=−1 çıkarma.",
    "check": "x=1 için 1=1; x=2 için 4=4."
  },
  "f022-ayt-parabol-7": {
    "knowledge": [
      "Doğru-parabol teğetliği ortak denklemin çift kök vermesidir."
    ],
    "strategy": "Kesişim denkleminde diskriminantı sıfırla.",
    "steps": [
      "x²=2x+n ⇒ x²−2x−n=0, Δ=4+4n.",
      "Δ=0 ⇒ n=−1; denklem (x−1)²=0."
    ],
    "optionReasons": [
      "n=1 için Δ=8>0; iki kesişim olur.",
      "n=0 için x=0 ve 2; teğet değil iki kesişim.",
      "n=2 için Δ=12>0.",
      "n=−2 için Δ=−4<0; kesişim olmaz.",
      "Doğru: n=−1 ile tek çift katlı temas x=1."
    ],
    "commonError": "Parabolün kendi diskriminantı ile doğruyla farkının diskriminantını karıştırma.",
    "check": "y=x² ve y=2x−1, x=1’de y=1; fark (x−1)²."
  },
  "f022-ayt-parabol-8": {
    "knowledge": [
      "y ekseni üzerinde x koordinatı sıfırdır."
    ],
    "strategy": "Fonksiyonda yalnız x=0 yaz.",
    "steps": [
      "f(0)=2·0²+3=3.",
      "y ekseni kesim noktası (0,3)."
    ],
    "optionReasons": [
      "Doğru: x=0 ve y=3.",
      "(3,0), x ekseni üzerindedir; istenen eksen farklıdır.",
      "2 baş katsayıdır; x=0’da bu terim sıfır olur.",
      "x=2 noktası y ekseninde değildir; ayrıca f(2)=11.",
      "f(0)=3 olduğundan orijin grafik üzerinde değildir."
    ],
    "commonError": "c katsayısını apsis olarak yazma.",
    "check": "Noktayı x=0 doğrusu ve y=2x²+3 eşitliğinde dene."
  },
  "f022-ayt-parabol-9": {
    "knowledge": [
      "Aynı tepe ve ölçeklerde |a| büyüdükçe aynı y yüksekliğinde yatay uzaklık küçülür."
    ],
    "strategy": "Ortak bir y değeriyle iki grafiği karşılaştır.",
    "steps": [
      "y=4 seviyesinde x² için x=±2; 4x² için x=±1.",
      "4x² eksene daha yakın kollar verdiğinden daha dardır; iki parabol de yukarı açılır."
    ],
    "optionReasons": [
      "Aynı yükseklikte yatay uzaklık 4x² için azalır; genişlemez.",
      "İki baş katsayı da pozitif; kol yönleri aynıdır.",
      "İki grafik de (0,0) tepesine sahiptir.",
      "Doğru: örnek y=4 seviyesinde yarı yatay uzaklık görülür.",
      "Örneğin x=1’de y değerleri 1 ve 4; aynı grafik değiller."
    ],
    "commonError": "Farklı eksen ölçekleriyle görünen genişliği cebirsel a etkisi sanma.",
    "check": "x=±1 noktalarında iki grafiğin y değerlerini karşılaştır."
  },
  "f022-ayt-parabol-10": {
    "knowledge": [
      "Üç farklı apsisli noktadan parabol katsayıları için doğrusal sistem kurulur."
    ],
    "strategy": "y=ax²+bx+c içine üç noktayı koy.",
    "steps": [
      "(0,1) ⇒ c=1; (1,0) ⇒ a+b=−1.",
      "(2,3) ⇒ 4a+2b=2; ilk katsayı eşitliğinin iki katını çıkarınca 2a=4.",
      "a=2,b=−3,c=1; y=2x²−3x+1."
    ],
    "optionReasons": [
      "x=2 için 1 verir; verilen y=3 sağlanmaz.",
      "Doğru: üç noktayı da sağlayan katsayılar 2,−3,1.",
      "x=2 için −1 olur; üçüncü nokta sağlanmaz.",
      "x=1 için 6 olur; ikinci nokta sağlanmaz.",
      "x=1 için 1 olur; ikinci nokta sağlanmaz."
    ],
    "commonError": "Sadece iki noktayı sağlayan ifadeyi hemen kabul etme.",
    "check": "x=0,1,2 için sırayla 1,0,3 bul."
  },
  "f022-ayt-parabol-11": {
    "knowledge": [
      "İki nokta uzaklığı hem yatay hem düşey koordinat farkını içerir."
    ],
    "strategy": "Önce kesişim noktalarını bul.",
    "steps": [
      "x²=x+2 ⇒ (x−2)(x+1)=0; noktalar (−1,1),(2,4).",
      "Δx=3, Δy=3; uzaklık √(9+9)=3√2."
    ],
    "optionReasons": [
      "3 yalnız yatay veya düşey farkın büyüklüğüdür.",
      "√10 için farklar 3 ve 1 olurdu; burada ikisi 3.",
      "Doğru: Pisagor sonucu √18=3√2.",
      "5 için fark kareleri toplamı 25 gerekirdi; burada 18.",
      "6 yatay ve düşey farkları doğrudan toplar; Öklid uzaklığı değildir."
    ],
    "commonError": "Kesişim apsisleri farkını nokta uzaklığı diye verme.",
    "check": "(3√2)²=18 ve 3²+3²=18."
  },
  "f022-ayt-parabol-12": {
    "knowledge": [
      "Noktanın doğruya dik uzaklığı, doğru ifadesinin mutlak değeri/normal vektör uzunluğudur."
    ],
    "strategy": "Parabol noktasını (x,x²) alıp uzaklık payını tam kareye tamamla.",
    "steps": [
      "Doğru 2x−y−3=0; parabol üstünde |2x−x²−3|/√5=((x−1)²+2)/√5.",
      "Pay en küçük 2 değerini x=1’de alır; minimum uzaklık 2/√5."
    ],
    "optionReasons": [
      "2, x=1’deki düşey farktır; dik uzaklık için √5’e bölünür.",
      "Normalleştirme doğru ama minimum pay 1 değil 2.",
      "√5, bulunan minimum pay/normal oranına eşit değildir.",
      "Fark denklemi (x−1)²+2 hiçbir zaman 0 olmaz; kesişim yok.",
      "Doğru: normal vektör (2,−1) uzunluğu √5."
    ],
    "commonError": "Düşey farkı dik uzaklıkla özdeş sayma.",
    "check": "x=1 için nokta (1,1); |2−1−3|/√5=2/√5."
  },
  "f022-ayt-parabol-13": {
    "knowledge": [
      "Kök noktasındaki teğet eğimleri çarpımı −Δ; eşit dik eksenlerde dik sonlu eğimler çarpımı −1 olur."
    ],
    "strategy": "İki kökü r₁,r₂ ile gösterip eğimleri kök farkından yaz.",
    "steps": [
      "f=a(x−r₁)(x−r₂) için m₁=a(r₁−r₂), m₂=a(r₂−r₁).",
      "m₁m₂=−a²(r₁−r₂)²=−Δ; diklikte −Δ=−1 ⇒ Δ=1."
    ],
    "optionReasons": [
      "Doğru: kök teğetlerinin dikliği Δ=1 verir.",
      "Δ=−1 gerçek kök oluşumunu bile engeller.",
      "Δ=0 tek kök ve aynı teğet verir; dik iki kök teğeti olmaz.",
      "Δ=4 olursa eğim çarpımı −4 olur, −1 değil.",
      "Δ=a² demek kök farkını koşulsuz 1 almak olur; baş katsayıya bağlı genel kural değildir."
    ],
    "commonError": "Köklerdeki teğetlerle dışarıdaki bir noktadan çizilen teğetleri aynı problem sanma.",
    "check": "y=x²−x kökleri 0,1; eğimler −1,+1 ve Δ=1."
  },
  "f022-ayt-parabol-14": {
    "knowledge": [
      "Negatif karesel katsayılı zaman fonksiyonunun tepesi maksimumdur; zaman koşulu da korunur."
    ],
    "strategy": "Tam kare biçimine getir, tepe zamanını sına.",
    "steps": [
      "h(t)=−(t²−6t)+2=−(t−3)²+11.",
      "t=3≥0 izinlidir; kare sıfır olduğunda en büyük yükseklik 11 m."
    ],
    "optionReasons": [
      "9 yalnız tepe tamamlama katsayısıdır; başlangıçtaki +2 eklenmemiştir.",
      "6, t katsayısıdır; maksimum yükseklik değildir.",
      "2 başlangıç h(0) değeridir.",
      "Doğru: h(3)=−9+18+2=11.",
      "12, maksimum 11’i aşar; −(t−3)² pozitif olamaz."
    ],
    "commonError": "Tepe noktasının apsisi olan zamanı yükseklik sanma.",
    "check": "h(2)=h(4)=10; h(3)=11 daha büyük."
  },
  "f022-ayt-parabol-15": {
    "knowledge": [
      "Görüntü kümesi verilen tanım aralığının ürettiği y değerlerinden oluşur."
    ],
    "strategy": "Tepe x=2’nin verilen aralığın dışında kaldığını fark et.",
    "steps": [
      "4≤x≤5 ⇒ 2≤x−2≤3; bu aralık pozitiftir.",
      "Karesini alınca 4≤(x−2)²≤9; uçlar alınır, görüntü [4,9]."
    ],
    "optionReasons": [
      "0 tepe değeridir ama tepe x=2 tanım aralığında değildir.",
      "Doğru: f(4)=4,f(5)=9 ve arada kesintisiz artar.",
      "Bu bütün gerçek x’ler için görüntüdür; [4,5] kısıtını atlar.",
      "[2,3], x−2 aralığıdır; son kare işlemi eksiktir.",
      "Kapalı tanım aralığının iki uç değeri de elde edilir; açık yazılamaz."
    ],
    "commonError": "Tam parabolün görüntüsünü kısıtlı aralığa doğrudan taşıma.",
    "check": "x=4 ve 5 için iki kapalı uç değerini hesapla."
  },
  "f022-ayt-parabol-16": {
    "knowledge": [
      "Kökler çarpanları belirler; sıfır olmayan çarpan a ölçeğini tek başına belirlemez."
    ],
    "strategy": "Aynı köklerle iki farklı a seçerek karşıörnek kur.",
    "steps": [
      "Verilen farklı kökler r₁,r₂ olsun; f=(x−r₁)(x−r₂), g=2(x−r₁)(x−r₂).",
      "İki grafik aynı köklerde 0 olur ama kökler dışındaki y değerleri farklıdır; farklı paraboller mümkündür."
    ],
    "optionReasons": [
      "a=2 örneği aynı kökleri korur; monik olmak zorunlu değildir.",
      "İki farklı kökün ortasındaki çarpım sıfır değildir; tepe ordinatı 0 olmak zorunda değildir.",
      "Doğru: a ölçeği için başka veri gerekir.",
      "a=−1 seçimi de aynı kökleri korur; işaret zorunlu pozitif değildir.",
      "Soru iki farklı kök veriyor; aynı kök olmaları gerekmez."
    ],
    "commonError": "Köklerden çıkan çarpan biçiminin önündeki serbest katsayıyı unutma.",
    "check": "Kökler −1,1 için x²−1 ve 2x²−2 örneklerini karşılaştır."
  },
  "f022-ayt-trigonometri-1": {
    "knowledge": [
      "Aynı yönlü son kenarı veren açılar 360° tam katları kadar farklıdır."
    ],
    "strategy": "Negatif açıya esas aralığa girene kadar tam tur ekle.",
    "steps": [
      "−870°+2·360°=−150° hâlâ negatiftir.",
      "Bir tur daha ekle: −150°+360°=210°; 0≤210<360."
    ],
    "optionReasons": [
      "Mutlak değer almak yönlü son kenarı değiştirir; −150° ile +150° aynı değildir.",
      "−150° eş yönlüdür ama istenen [0,360°) aralığında değildir.",
      "Doğru: −870°+3·360°=210°.",
      "270−(−870)=1140° farkı, 360°’nin tam katı değildir; aynı son kenarı vermez.",
      "30° açısı farklı son kenar verir."
    ],
    "commonError": "Esas ölçü için yalnız açının mutlak değerini alma.",
    "check": "210−(−870)=1080=3·360."
  },
  "f022-ayt-trigonometri-2": {
    "knowledge": [
      "180°=π radyan; dönüşüm katsayısı π/180’dir."
    ],
    "strategy": "150°’yi π/180 ile çarpıp kesri sadeleştir.",
    "steps": [
      "150π/180=(15/18)π.",
      "15/18=5/6 olduğundan 5π/6 radyan."
    ],
    "optionReasons": [
      "3π/5, 108° eder; verilen 150° değildir.",
      "5π/3, 300° eder; açıyı iki katına çıkarır.",
      "π/6, 30° eder; bütünler referans açıyla karıştırılır.",
      "2π/3, 120° eder.",
      "Doğru: (5π/6)·180/π=150°."
    ],
    "commonError": "Dereceden radyana geçerken 180/π ile ters çarpma.",
    "check": "Sonuç π’ye yakın ama π’den küçük olmalı: 150°<180°."
  },
  "f022-ayt-trigonometri-3": {
    "knowledge": [
      "Bir açı derecesi 60 dakika, her dakika 60 saniyedir."
    ],
    "strategy": "Bütün birimleri açı saniyesine çevir.",
    "steps": [
      "2°=2·3600=7200″, 10′=10·60=600″.",
      "7200+600+20=7820″."
    ],
    "optionReasons": [
      "Doğru: derece, dakika ve saniye katkıları ayrı eklendi.",
      "7220, on dakikanın 600″ katkısını eksik bırakır.",
      "8120, verilen birimleri 60 tabanında doğru toplamaz.",
      "7200 yalnız 2° katkısıdır; dakika ve saniye atlanmıştır.",
      "6320, yalnız 2° karşılığı 7200″ bile olan alt sınırdan küçüktür."
    ],
    "commonError": "Açı dakikasını yüzde bir derece gibi ondalık tabanda yorumlama.",
    "check": "7820−7200=620″=10′20″."
  },
  "f022-ayt-trigonometri-4": {
    "knowledge": [
      "Yay uzunluğu s=rθ bağıntısında θ radyan olmalıdır."
    ],
    "strategy": "r=4 ve θ=π/3 değerlerini doğrudan kullan.",
    "steps": [
      "s=4·(π/3).",
      "Sonuç 4π/3 cm; istenen yay uzunluğu olduğundan birim cm."
    ],
    "optionReasons": [
      "16π/3 değeri yarıçapın karesiyle çarpmaktan gelir; uzunluk formülü değildir.",
      "π/12, açıyla yarıçapı bölerek elde edilir; uzunluk r ile artmalı.",
      "8π/3, verilen açıya fazladan iki katsayısı ekler.",
      "Doğru: çevrenin altıda biri (8π)/6=4π/3.",
      "4π, π radyanlık yarım çember yayı olur; verilen açı π/3."
    ],
    "commonError": "Yay uzunluğu ile daire dilimi alanını karıştırma.",
    "check": "π/3 tam turun altıda biri; 2πr/6 aynı sonucu verir."
  },
  "f022-ayt-trigonometri-5": {
    "knowledge": [
      "sin²θ+cos²θ=1; kareden çıkan işaret bölge bilgisiyle seçilir."
    ],
    "strategy": "Önce cos²θ, sonra ikinci bölge işaretini bul.",
    "steps": [
      "cos²θ=1−(3/5)²=16/25 ⇒ |cosθ|=4/5.",
      "İkinci bölgede x bileşeni negatif; cosθ=−4/5."
    ],
    "optionReasons": [
      "Büyüklük doğru fakat ikinci bölge işareti negatiftir.",
      "Doğru: kare bağıntısı ve bölge aynı anda sağlanır.",
      "−3/5, verilen sinüs büyüklüğünü kosinüse taşıyor; kareler toplamı 1 olmaz.",
      "√2/5 için sin²+cos²=11/25 olur.",
      "−5/4, kosinüsün [−1,1] değer aralığı dışındadır."
    ],
    "commonError": "Karekök alırken otomatik pozitif işaret seçme.",
    "check": "9/25+16/25=1; ikinci bölgede sin pozitif, cos negatif."
  },
  "f022-ayt-trigonometri-6": {
    "knowledge": [
      "Oran biçimindeki trigonometrik fonksiyonda payda sıfır olamaz."
    ],
    "strategy": "π/2 için sinüs ve kosinüsü önce yaz.",
    "steps": [
      "sin(π/2)=1, cos(π/2)=0.",
      "tanθ=1/0 tanımsız; cotθ=0/1=0 ve cscθ=1/1=1 tanımlı."
    ],
    "optionReasons": [
      "Sinüs değeri 1’dir; tanımlıdır.",
      "Kosinüs 0 değeri alabilir; sıfır değer tanımsızlık değildir.",
      "Doğru: tanjantın paydası cosθ=0.",
      "Kotanjantın paydası sinθ=1; değeri 0’dır.",
      "Kosekant 1/sinθ=1; tanımlıdır."
    ],
    "commonError": "Fonksiyonun 0 olmasını tanımsız olmasıyla karıştırma.",
    "check": "Birim çemberde üst nokta (0,1); hangi oran 0’a bölüyor?"
  },
  "f022-ayt-trigonometri-7": {
    "knowledge": [
      "7π/6=π+π/6; üçüncü bölgede sinüs negatiftir."
    ],
    "strategy": "Referans açıyı π/6 al.",
    "steps": [
      "π+π/6 üçüncü bölgede, sinüs değeri −sin(π/6) olur.",
      "sin(π/6)=1/2 ⇒ sonuç −1/2."
    ],
    "optionReasons": [
      "Büyüklük doğru fakat üçüncü bölge işareti unutulmuştur.",
      "−√3/2, kosinüsün veya başka bir referansın büyüklüğüdür.",
      "Hem bölge işareti hem referans değer yanlış.",
      "−1 alt eksen noktasının sinüsüdür; açı 3π/2 değildir.",
      "Doğru: referans 30°, işaret negatif."
    ],
    "commonError": "7π/6 açısını 7π/3 ile karıştırma.",
    "check": "Sinüs y koordinatıdır; üçüncü bölgede y<0."
  },
  "f022-ayt-trigonometri-8": {
    "knowledge": [
      "Kosinüs çift fonksiyondur ve 360° dönemlidir."
    ],
    "strategy": "−300°’ye tam tur ekleyerek 60° elde et.",
    "steps": [
      "−300°+360°=60°; aynı son kenar kosinüsü korur.",
      "cos(−300°)=cos60°=1/2."
    ],
    "optionReasons": [
      "Doğru: hem esas açı hem kosinüsün çiftliği 1/2 verir.",
      "Negatif açı işaretini kosinüsün dışına taşımak yanlıştır.",
      "√3/2, 30° kosinüsüdür; 60° değil.",
      "İşaret ve özel açı değeri birlikte yanlış.",
      "Kosinüs 90°/270° gibi düşey eksende sıfır olur; bu açı değil."
    ],
    "commonError": "cos(−x)=−cosx kuralı kullanma; kosinüs çifttir.",
    "check": "cos300°=cos60°=1/2 de aynı sonucu vermeli."
  },
  "f022-ayt-trigonometri-9": {
    "knowledge": [
      "Birinci bölgede sinüs/tanjant artar, kosinüs/kotanjant azalır."
    ],
    "strategy": "α<β sıralamasını her fonksiyonun yönüne uygula.",
    "steps": [
      "0<α<β<π/2 boyunca birim çemberin x koordinatı azalır; cosα>cosβ.",
      "Aynı aralıkta sin ve tan artar, cot azalır; diğer verilen karşılaştırmalar ters yöndedir."
    ],
    "optionReasons": [
      "Sinüs artandır; sinα<sinβ olmalı.",
      "Tanjant artandır; tanα<tanβ olmalı.",
      "Kotanjant azalandır; cotα>cotβ olmalı.",
      "Doğru: kosinüs dar açılarda azalır.",
      "Farklı dar açılarda sinüs sıkı artan olduğundan eşit olamaz."
    ],
    "commonError": "Birinci bölge monotonluk kuralını bütün gerçek açılara genelleme.",
    "check": "Örneğin α=30°,β=60° için cos30°>cos60°."
  },
  "f022-ayt-trigonometri-10": {
    "knowledge": [
      "1−cos²x=sin²x; sadeleştirmede başlangıç payda koşulu korunur."
    ],
    "strategy": "Payı sin²x olarak yaz.",
    "steps": [
      "(1−cos²x)/sinx=sin²x/sinx.",
      "sinx≠0 olduğundan bir sinx sadeleşir; sonuç sinx, aynı eski koşulla."
    ],
    "optionReasons": [
      "Paydaki 1−cos²x, cos²x değildir.",
      "Doğru: sıfır olmayan sinx çarpanı sadeleşir.",
      "Pay sin²x iken bir sinx daha kalır; sonuç 1 değil.",
      "Tanjant için cosx paydası gerekirdi.",
      "Kosekant 1/sinx; paydaki sin²x unutulamaz."
    ],
    "commonError": "Sadeleştirilmiş sonucun sinx=0 noktalarını ilk ifadeye geri ekleme.",
    "check": "x=π/6 için (1−3/4)/(1/2)=1/2=sinx."
  },
  "f022-ayt-trigonometri-11": {
    "knowledge": [
      "sin(kx+φ) temel periyodu k≠0 için 2π/|k|; dış çarpan ve düşey kayma bunu değiştirmez."
    ],
    "strategy": "İç açının bir tur ilerlemesi için gereken x artışını bul.",
    "steps": [
      "3(x+T)−π ile 3x−π arasındaki fark 3T.",
      "3T=2π ⇒ T=2π/3; en küçük pozitif tekrar budur."
    ],
    "optionReasons": [
      "2π, iç çarpanı 3 yok sayar; daha küçük pozitif tekrar vardır.",
      "3π, iç çarpanla yanlış yönde ölçekler.",
      "Doğru: 3·(2π/3)=2π.",
      "π/3 iç açıyı π ilerletir; sinüs her x için aynı kalmaz.",
      "6π, periyodun katıdır ama temel/en küçük periyot değildir."
    ],
    "commonError": "Genlik 2’yi veya +1 düşey kaymasını periyot formülüne dahil etme.",
    "check": "x=0 ile x=2π/3 fonksiyon değerlerini karşılaştır; genel 3T farkını da koru."
  },
  "f022-ayt-trigonometri-12": {
    "knowledge": [
      "A cos(kx)+D için k≠0 görüntü [D−|A|,D+|A|]."
    ],
    "strategy": "[−1,1] aralığını önce −3 ile, sonra +4 ile dönüştür.",
    "steps": [
      "−1≤cos2x≤1 ⇒ −3≤−3cos2x≤3.",
      "4 eklenince 1≤f(x)≤7; cos2x=±1 mümkün olduğundan iki uç dahil."
    ],
    "optionReasons": [
      "[−3,3], +4 düşey kaydırmadan önceki aralıktır.",
      "Düşey kaymanın işareti yanlış alınmıştır.",
      "Cos negatifken f(x)>4 olur; cos pozitifken 1’e kadar iner, alt yarı eksik.",
      "Bu yalnız kosinüsün kendi değer aralığıdır.",
      "Doğru: merkez 4, genlik büyüklüğü 3."
    ],
    "commonError": "Negatif dış katsayının genliği negatif yaptığı sonucuna varma.",
    "check": "x=0 için f=1; x=π/2 için f=7."
  },
  "f022-ayt-trigonometri-13": {
    "knowledge": [
      "arcsin çıktısı [−π/2,π/2] ana aralığında seçilir."
    ],
    "strategy": "Önce iç sinüsü hesapla; sonra ana aralıktaki açıyı bul.",
    "steps": [
      "sin(5π/6)=1/2.",
      "[−π/2,π/2] içinde sinüsü 1/2 olan açı π/6."
    ],
    "optionReasons": [
      "Doğru: çıktı ana aralıkta ve sinüsü 1/2.",
      "5π/6 aynı sinüse sahiptir ama arcsin ana aralığının dışında.",
      "−π/6 sinüsü −1/2 verir.",
      "π/3 sinüsü √3/2; iç değerle eşleşmez.",
      "−5π/6 hem ana aralığın dışında hem sinüsü negatif."
    ],
    "commonError": "arcsin(sinx)=x eşitliğini bütün gerçek x için kullanma.",
    "check": "Çıktının hem ana aralığa aitliğini hem sinüsünü denetle."
  },
  "f022-ayt-trigonometri-14": {
    "knowledge": [
      "Kosinüs toplamında çarpımlar arasında eksi bulunur."
    ],
    "strategy": "75°=45°+30° ayır.",
    "steps": [
      "cos75°=(√2/2)(√3/2)−(√2/2)(1/2).",
      "Sonuç √6/4−√2/4=(√6−√2)/4."
    ],
    "optionReasons": [
      "Artı işareti cos15° veya sin75° büyüklüğünü verir.",
      "Payda ve köklü çarpımlar özel açı açılımıyla uyuşmaz.",
      "√2/2, 45° kosinüsüdür; 75° için fazla büyük.",
      "Doğru: iki özel açı çarpımının farkı.",
      "1/4 yaklaşık 0,25 iken doğru değer yaklaşık 0,2588; eşit değildir."
    ],
    "commonError": "Kosinüs toplamını sinüs toplamındaki artı işaretiyle yazma.",
    "check": "75°<90° olduğu için sonuç küçük pozitif; yaklaşık 0,259."
  },
  "f022-ayt-trigonometri-15": {
    "knowledge": [
      "Tanjant toplamı (tanα+tanβ)/(1−tanαtanβ), payda sıfır değilken kullanılır."
    ],
    "strategy": "Payı ve paydayı ayrı hesapla.",
    "steps": [
      "Pay 1/2+1/3=5/6; payda 1−1/6=5/6≠0.",
      "Bölüm (5/6)/(5/6)=1."
    ],
    "optionReasons": [
      "5/6 yalnız paydır; paydaya bölme yapılmamıştır.",
      "Doğru: pay ve payda aynı sıfır olmayan sayı.",
      "1/5, verilen toplam ve çarpımdan doğru oranı kurmaz.",
      "5/7, paydada 1+tanαtanβ kullanılarak bulunur.",
      "2, (5/6)/(5/6) bölümüne eşit değildir."
    ],
    "commonError": "1−tanαtanβ paydasını unutma veya işaretini artı yapma.",
    "check": "İki dar açının toplamı için sonuç tan45°=1 ile uyumlu."
  },
  "f022-ayt-trigonometri-16": {
    "knowledge": [
      "sin2θ=2sinθcosθ; eksik oranın işaretini bölge belirler."
    ],
    "strategy": "İkinci bölgede sinθ’yi pozitif seç.",
    "steps": [
      "sin²θ=1−9/25=16/25 ⇒ sinθ=4/5.",
      "sin2θ=2·(4/5)·(−3/5)=−24/25."
    ],
    "optionReasons": [
      "Büyüklük doğru fakat cosθ negatifliği kaybolmuştur.",
      "7/25 = sin²θ−cos²θ = 16/25−9/25 değeridir; istenen sin2θ ise 2sinθcosθ çarpımıdır.",
      "Doğru: 2·4·(−3)/25=−24/25.",
      "Kareler farkı yerine 2sinθcosθ çarpımı gerekir.",
      "−6/5 yalnız 2cosθ; sinθ çarpanı eksik, ayrıca sinüs aralığı dışında."
    ],
    "commonError": "sinθ için negatif kökü seçip ikinci bölge koşulunu bozma.",
    "check": "|−24/25|<1 ve 9/25+16/25=1."
  },
  "f022-ayt-trigonometri-17": {
    "knowledge": [
      "sin²(θ/2)=(1−cosθ)/2; işaret yarım açının bölgesinden gelir."
    ],
    "strategy": "Verilen aralığı ikiye bölüp kökün işaretini belirle.",
    "steps": [
      "π<θ<2π ⇒ π/2<θ/2<π; yarım açıda sinüs pozitiftir.",
      "sin²(θ/2)=(1+1/2)/2=3/4; sin(θ/2)=√3/2."
    ],
    "optionReasons": [
      "Büyüklük doğru ama yarım açının ikinci bölgesindeki sinüs negatif olamaz.",
      "1/2, (1+cosθ)/2 üzerinden kosinüs büyüklüğünü verir.",
      "Hem yarım açı özdeşliği hem bölge işareti yanlış seçilmiştir.",
      "√2/2 için kare 1/2 gerekirdi; burada 3/4.",
      "Doğru: pozitif √(3/4)."
    ],
    "commonError": "θ’nın bölgesindeki işareti doğrudan θ/2’ye taşıma.",
    "check": "cosθ=−1/2 ile verilen alt yarım turda θ=4π/3; yarısı 2π/3 sinüsü √3/2."
  },
  "f022-ayt-trigonometri-18": {
    "knowledge": [
      "Sinüs toplamı 2sin(ortalama)cos(yarı fark) biçimindedir."
    ],
    "strategy": "70° ve 10° için ortalama ve yarı farkı bul.",
    "steps": [
      "(70+10)/2=40°, (70−10)/2=30°.",
      "sin70°+sin10°=2sin40°cos30°=√3sin40°."
    ],
    "optionReasons": [
      "Doğru: 2cos30°=√3 çarpanı kalır.",
      "sin70°+sin10° doğrudan 2sin80° olmaz; ortalama açı gerekir.",
      "Çarpım dönüşümünde sin40° yerine cos40° kullanılamaz.",
      "sin60° tek bir fark açısıdır; verilen toplam değil.",
      "2cos30° yanında sin40° çarpanı eksiktir."
    ],
    "commonError": "Sinüslerin toplamını toplam açının sinüsüyle eşitleme.",
    "check": "Yaklaşık 0,94+0,174=1,114; √3sin40° de yaklaşık 1,114."
  },
  "f022-ayt-trigonometri-19": {
    "knowledge": [
      "İki kenar ve aralarındaki açı için kosinüs teoremi a²=b²+c²−2bc cosA."
    ],
    "strategy": "Verilen 60°’nin 3 ile 5 kenarının arasında olduğunu kullan.",
    "steps": [
      "a²=3²+5²−2·3·5·cos60°.",
      "9+25−30·(1/2)=34−15=19 cm²."
    ],
    "optionReasons": [
      "34, kosinüs düzeltmesini atlayıp dik açı varsayar.",
      "49, 2bc cosA terimini yanlış artı işaretiyle ekler.",
      "4=(5−3)²; bu doğrusal/dejenere üçgen sınırıdır, 60° değil.",
      "Doğru: kareler toplamından 15 çıkarılır.",
      "15 yalnız çapraz kosinüs terimidir; a² değildir."
    ],
    "commonError": "Kosinüs teoreminde −2bc cosA işaretini artı yapma.",
    "check": "|5−3|<a<5+3; √19 yaklaşık 4,36 bu aralıkta."
  },
  "f022-ayt-trigonometri-20": {
    "knowledge": [
      "Sinüs teoreminde a/sinA çevrel çemberin çapı 2R’dir."
    ],
    "strategy": "Önce ortak oranı bul, yarıçap için ikiye böl.",
    "steps": [
      "a/sinA=4/(1/2)=8.",
      "2R=8 ⇒ R=4 cm."
    ],
    "optionReasons": [
      "2, ortak oranı iki kez yarıya indirmiş olur.",
      "Doğru: 4/(2sin30°)=4.",
      "8, çap 2R değeridir; yarıçap değil.",
      "4√3, sin30°=1/2 ile elde edilen orana uymaz.",
      "2√3, verilen a/sinA=8 şartını sağlamaz."
    ],
    "commonError": "a/sinA sonucunu doğrudan R diye etiketleme.",
    "check": "2R sinA=8·1/2=4=a."
  },
  "f022-ayt-trigonometri-21": {
    "knowledge": [
      "SSA durumunda aynı sinüs iki bütünler açı verebilir; her adayda açı toplamı sınanır."
    ],
    "strategy": "Sinüs teoremiyle sinB’yi bulup iki dalı kontrol et.",
    "steps": [
      "sinB=b sinA/a=8·(1/2)/5=4/5.",
      "B≈53,13° veya 180°−53,13°=126,87°; 30° ile toplamları 83,13° ve 156,87°, ikisi de 180°’den küçük.",
      "İki pozitif üçüncü açı oluşur; iki farklı üçgen mümkündür."
    ],
    "optionReasons": [
      "Her iki B adayı da açı toplamını sağladığı için sıfır üçgen değildir.",
      "Dar B adayını alıp bütünler geniş B adayını atlar.",
      "Doğru: iki aday da geçerli üçgen oluşturur.",
      "SinB=4/5, 0<B<π aralığında en çok iki B değeri verir.",
      "Verilen a,b,A bilgileri serbest sürekli bir açı ailesi bırakmaz."
    ],
    "commonError": "arcsin ile bulunan dar açıyı tek mümkün üçgen sanma.",
    "check": "C değerleri yaklaşık 96,87° ve 23,13°; ikisi de pozitif."
  },
  "f022-ayt-trigonometri-22": {
    "knowledge": [
      "Sinüs bir tam turda aynı pozitif değeri birinci ve ikinci bölgelerde alır."
    ],
    "strategy": "1/2 için referans açıyı π/6 bul.",
    "steps": [
      "Birinci bölge x=π/6, ikinci bölge x=π−π/6=5π/6.",
      "İki açı da [0,2π) içinde; diğer tur kopyaları bu aralığın dışındadır."
    ],
    "optionReasons": [
      "İkinci bölgedeki 5π/6 çözümü eksiktir.",
      "7π/6 üçüncü bölgede sinüs −1/2 verir; ikinci kök yanlıştır.",
      "5π/6 doğru ama 7π/6 yanlış; π/6 eksiktir.",
      "Her iki açı da alt yarım çemberde ve sinüs negatiftir.",
      "Doğru: {π/6,5π/6}."
    ],
    "commonError": "Sinüs için kosinüsün dördüncü bölge simetrisini kullanma.",
    "check": "Her iki kökün sinüsü 1/2; 0 ve 2π bu seviyeyi sağlamaz."
  },
  "f022-ayt-trigonometri-23": {
    "knowledge": [
      "Sıfıra bölme yapmadan çarpanlara ayırmak sinx=0 dalını korur."
    ],
    "strategy": "sin2x=2sinxcosx özdeşliğini uygula.",
    "steps": [
      "sinx(2cosx−1)=0; sinx=0 dalından 0,π gelir.",
      "cosx=1/2 dalından π/3,5π/3 gelir; dört kök farklı ve 2π açık uç dışarıdadır."
    ],
    "optionReasons": [
      "Doğru: 0,π,π/3,5π/3 olmak üzere dört kök.",
      "Yalnız tek bir özel kökü saymak diğer dalları atlar.",
      "Sinx’e bölünürse 0 ve π kaybolur; yalnız iki kosinüs kökü kalır.",
      "Üç sayımı geçerli dört kökten birini eksik bırakır.",
      "2π dahil edilirse beş olurdu; verilen aralığın sağ ucu açıktır."
    ],
    "commonError": "sinx’e bölerek sıfır sinüs köklerini kaybetme.",
    "check": "Dört açıyı ilk eşitlikte ayrı dene; açık uç 2π’yi ekleme."
  },
  "f022-ayt-trigonometri-24": {
    "knowledge": [
      "A sinx+B cosx ifadesinin genliği √(A²+B²) olur."
    ],
    "strategy": "Sol tarafın değer aralığını sağ taraftan önce belirle.",
    "steps": [
      "R=√(3²+4²)=5; 3sinx+4cosx=5sin(x+φ) yazılabilir.",
      "Sol taraf −5 ile 5 arasındadır; 6 bu aralığa ait değildir, gerçek çözüm yok."
    ],
    "optionReasons": [
      "7, katsayıları doğrudan toplamaktan gelir; sin ve cos aynı anda 1 olamaz.",
      "x=0 için sol taraf 4, 6 değil.",
      "Örneğin x=0 sağlamadığından her x çözüm olamaz.",
      "Doğru: mutlak üst sınır 5, istenen 6’ya ulaşılamaz.",
      "x=π/2 için sol taraf 3, 6 değil."
    ],
    "commonError": "Maksimumu |3|+|4| diye alıp eş zamanlı oran koşulunu unutma.",
    "check": "Cauchy: |3sinx+4cosx|≤√25·√(sin²x+cos²x)=5."
  }
};

export const forge022MathTopics:Record<string,string>=Object.fromEntries(packs022.map(p=>[p.id,p.topic]));
export const forge022MathGuides:LessonGuide[]=packs022;
export const forge022MathLessons:Lesson[]=packs022.map(p=>({id:p.id,subjectId:"ayt-matematik",title:txt(p.title),minutes:p.minutes,objectives:p.objectives.map(txt),body:p.sections.map(s=>({title:txt(s.title),text:txt(s.paragraphs.join("\n\n"))})),source:txt(p.source),tags:[p.topic,"Özgün öğretim soruları"],questions:p.questions.map((q,i)=>{const answer=[2,4,0,3,1][i%5],options=[...q.distractors];options.splice(answer,0,q.correct);return{id:`f022-${p.id}-${i+1}`,prompt:txt(q.prompt),options:options.map(txt),answer,hint:txt(q.hint),explanation:txt(q.explanation),guidance:guidance022[`f022-${p.id}-${i+1}`],skill:p.id};})}));
