import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";
const within020=(v:number,lo:number,hi:number)=>Number.isFinite(v)&&v>=lo&&v<=hi;
const zero020=(v:number)=>Object.is(v,-0)?0:v;
export type Vector020={x:number;y:number;z:number};
const vector020=(v:Vector020)=>v&&within020(v.x,-1e5,1e5)&&within020(v.y,-1e5,1e5)&&within020(v.z,-1e5,1e5);
/** q in coulombs; velocities in m/s and magnetic field in tesla. */
export function lorentz020(charge:number,velocity:Vector020,field:Vector020){
 if(!within020(charge,-1,1)||!vector020(velocity)||!vector020(field))throw new RangeError("LORENTZ020_SCOPE");
 const force={x:zero020(charge*(velocity.y*field.z-velocity.z*field.y)),y:zero020(charge*(velocity.z*field.x-velocity.x*field.z)),z:zero020(charge*(velocity.x*field.y-velocity.y*field.x))};
 return{force,magnitude:Math.hypot(force.x,force.y,force.z),power:force.x*velocity.x+force.y*velocity.y+force.z*velocity.z};
}
/** Exact nonrelativistic point-charge motion from (0,0), in spatially uniform constant Bz only. No other force. */
export function magneticMotion020(mass:number,micro:number,bz:number,vx:number,vy:number,time:number){
 if(!within020(mass,1e-6,1)||!within020(micro,-10,10)||!within020(bz,-2,2)||!within020(vx,-20,20)||!within020(vy,-20,20)||!within020(time,0,10))throw new RangeError("MAGNETIC_MOTION020_SCOPE");
 const q=micro*1e-6,omega=q*bz/mass;
 if((micro!==0&&q===0)||(q!==0&&bz!==0&&omega===0))throw new RangeError("MAGNETIC_MOTION020_PRECISION");
 const theta=omega*time,sinc=Math.abs(theta)<1e-5?1-theta*theta/6+theta**4/120:Math.sin(theta)/theta;
 const side=Math.abs(theta)<1e-5?theta/2-theta**3/24+theta**5/720:2*Math.sin(theta/2)**2/theta;
 const x=time*(vx*sinc+vy*side),y=time*(vy*sinc-vx*side),velocity={x:vx*Math.cos(theta)+vy*Math.sin(theta),y:vy*Math.cos(theta)-vx*Math.sin(theta)};
 const force=lorentz020(q,{...velocity,z:0},{x:0,y:0,z:bz}).force,speed=Math.hypot(vx,vy);
 const radius=omega===0?null:speed/Math.abs(omega),period=omega===0||speed===0?null:2*Math.PI/Math.abs(omega),centre=omega===0?null:{x:vy/omega,y:-vx/omega};
 if([omega,theta,x,y,velocity.x,velocity.y,force.x,force.y,speed,...(radius===null?[]:[radius]),...(period===null?[]:[period]),...(centre===null?[]:[centre.x,centre.y])].some(n=>!Number.isFinite(n)))throw new RangeError("MAGNETIC_MOTION020_PRECISION");
 return{mass,micro,bz,time,omega,theta,x:zero020(x),y:zero020(y),velocity,force,speed,kinetic:mass*speed*speed/2,radius,period,centre};
}
/** Upward rod, horizontal rails and Bz. Positive loop traversal is counterclockwise seen from +z. Quasistatic, negligible self-inductance. Rod and rails have negligible ohmic drop; resistance is the load. */
export function inductionRod020(bz:number,length:number,position:number,velocity:number,resistance:number,closed:boolean){
 if(!within020(bz,-2,2)||!within020(length,.1,1)||!within020(position,.1,2)||!within020(velocity,-5,5)||!within020(resistance,1,20)||typeof closed!=="boolean")throw new RangeError("INDUCTION_ROD020_SCOPE");
 const flux=bz*length*position,fluxRate=bz*length*velocity,emf=-fluxRate,current=closed?emf/resistance:0,magneticForce=current*length*bz,externalForce=-magneticForce,heatPower=current*current*resistance,externalPower=externalForce*velocity;
 return{bz,length,position,velocity,resistance,closed,flux:zero020(flux),fluxRate:zero020(fluxRate),emf:zero020(emf),topMinusBottom:zero020(emf),current:zero020(current),magneticForce:zero020(magneticForce),externalForce:zero020(externalForce),heatPower:zero020(heatPower),externalPower:zero020(externalPower)};
}
/** Sinusoidal steady state, series R-L-C; C=null means no capacitor. R>0 excludes ideal singular resonance. */
export function seriesRlc020(rmsVoltage:number,resistance:number,omega:number,inductance:number,capacitance:number|null,phaseDegrees:number){
 if(!within020(rmsVoltage,0,300)||!within020(resistance,1,300)||!within020(omega,1,1000)||!within020(inductance,0,2)||(capacitance!==null&&!within020(capacitance,1e-6,.01))||!within020(phaseDegrees,0,360))throw new RangeError("RLC020_SCOPE");
 const xl=omega*inductance,xc=capacitance===null?0:1/(omega*capacitance),reactance=xl-xc,impedance=Math.hypot(resistance,reactance),phase=Math.atan2(reactance,resistance),rmsCurrent=rmsVoltage/impedance,theta=phaseDegrees*Math.PI/180;
 const voltage=Math.SQRT2*rmsVoltage*Math.sin(theta),current=Math.SQRT2*rmsCurrent*Math.sin(theta-phase);
 return{rmsVoltage,resistance,omega,inductance,capacitance,phaseDegrees,xl,xc,reactance,impedance,phase,rmsCurrent,frequency:omega/(2*Math.PI),period:2*Math.PI/omega,voltage,current,instantPower:voltage*current,realPower:rmsCurrent*rmsCurrent*resistance,powerFactor:resistance/impedance,vr:rmsCurrent*resistance,vl:rmsCurrent*xl,vc:rmsCurrent*xc,resonantOmega:inductance>0&&capacitance!==null?1/Math.sqrt(inductance*capacitance):null};
}
/** Lossless transformer feeding one pure resistance. RMS quantities; AC steady state, ideal common flux. DC transients/primary short are outside this model. */
export function transformer020(primaryVoltage:number,primaryTurns:number,secondaryTurns:number,load:number,alternating:boolean){
 if(!within020(primaryVoltage,1,300)||!Number.isInteger(primaryTurns)||!within020(primaryTurns,1,2000)||!Number.isInteger(secondaryTurns)||!within020(secondaryTurns,1,2000)||!within020(load,1,1e5)||typeof alternating!=="boolean")throw new RangeError("TRANSFORMER020_SCOPE");
 const ratio=secondaryTurns/primaryTurns;
 if(!alternating)return{alternating,ratio,secondaryVoltage:null,secondaryCurrent:null,primaryCurrent:null,inputPower:null,outputPower:null};
 const secondaryVoltage=primaryVoltage*ratio,secondaryCurrent=secondaryVoltage/load,outputPower=secondaryVoltage*secondaryCurrent,primaryCurrent=outputPower/primaryVoltage;
 return{alternating,ratio,secondaryVoltage,secondaryCurrent,primaryCurrent,inputPower:outputPower,outputPower};
}
/** Candidate horizontal circular path sustained only by static friction. If infeasible, no actual circular continuation is claimed. */
export function circular020(radius:number,mass:number,speed:number,mu:number,gravity:number,degrees:number,direction:1|-1=1){
 if(!within020(radius,.5,20)||!within020(mass,.1,20)||!within020(speed,0,30)||!within020(mu,0,2)||!within020(gravity,.1,20)||!within020(degrees,0,360)||![1,-1].includes(direction))throw new RangeError("CIRCULAR020_SCOPE");
 const theta=direction*degrees*Math.PI/180,omega=direction*speed/radius,acceleration=speed*speed/radius,required=mass*acceleration,maximumFriction=mu*mass*gravity,maximumSpeed=Math.sqrt(mu*gravity*radius),feasible=speed<=maximumSpeed;
 const position={x:radius*Math.cos(theta),y:radius*Math.sin(theta)},velocity={x:-direction*speed*Math.sin(theta),y:direction*speed*Math.cos(theta)},accelerationVector={x:-acceleration*Math.cos(theta),y:-acceleration*Math.sin(theta)},requiredForce={x:mass*accelerationVector.x,y:mass*accelerationVector.y};
 return{radius,mass,speed,mu,gravity,degrees,direction,theta,omega,acceleration,required,maximumFriction,feasible,position,velocity,accelerationVector,requiredForce,actualFriction:feasible?requiredForce:null,maximumSpeed,period:speed>0&&feasible?2*Math.PI*radius/speed:null,selectedTime:speed>0&&feasible?(degrees*Math.PI/180)/Math.abs(omega):null,kinetic:mass*speed*speed/2};
}
const packs020 = [
  {
    "id": "manyetik-kuvvet",
    "topic": "detail-381",
    "title": "Manyetik kuvvet: yön, yörünge ve enerji",
    "minutes": 120,
    "objectives": [
      "Akım ve yük için manyetik kuvvetin yönünü gerçek vektörlerle kur.",
      "Dairesel yörüngede sürat, yarıçap ve dönme süresini ayır.",
      "Elektrik işi, manyetik iş ve çerçeve torkunun koşullarını açıkla."
    ],
    "source": "MEBİ AYT Fizik PDF 122–125 (basılı 120–123); OGM Dersler Cepte Manyetizma PDF 13–16 ve 029/030 fizik özetlerinin gerçek şekilleri temel alınmıştır. Metin, örnekler ve sorular özgün öğretim içeriğidir; resmî sınav sorusu değildir.",
    "sections": [
      {
        "title": "Bir tel neden yerinden oynar?",
        "paragraphs": [
          "Bir mıknatısın alanında bulunan telden akım geçirildiğinde telin bir yana itildiği gözlenebilir. Akımın yönünü veya mıknatısın kutuplarını ters çevirmek itmenin yönünü değiştirir. İkisini birlikte ters çevirmek ilk kuvvet yönünü geri getirir; bu deney alan, akım ve kuvvetin yönlü ilişkisini gösterir.",
          "Tel içindeki hareketli yüklerin alanla etkileşimi telin bütününe kuvvet aktarabilir. Akımı pozitif yüklerin hareket yönüyle tanımlarız; metallerde elektronların sürüklenmesi buna zıttır. Elektron hızını telin yönü diye kullanıp sağ el sonucunu ikinci kez ters çevirmek yerine önce hangi yönün tanımlandığını belirle."
        ]
      },
      {
        "title": "Düz telin alan içinde kalan boyu",
        "paragraphs": [
          "Düzgün alan içindeki doğru tel için F büyüklüğü B I L sin α olur. α, akım yönü ile B arasındaki açıdır; L yalnız alan içinde bulunan doğru tel parçasının uzunluğudur. B tesla, I amper ve L metre alınırsa kuvvet newton çıkar. Telin alan dışındaki toplam uzunluğunu buraya koyma.",
          "Örneğin B = 0,5 T, I = 4 A, L = 0,3 m ve α = 30° iken F = 0,5 × 4 × 0,3 × 0,5 = 0,30 N bulunur. Paralel veya ters paralel telde sin α sıfırdır. Akım varlığı tek başına sıfır olmayan manyetik kuvvet garantisi değildir; dik tel aynı büyüklüklerle en büyük kuvveti alır."
        ]
      },
      {
        "title": "Sağ elin anlattığını bileşenle denetle",
        "paragraphs": [
          "Yönlü tel bağıntısı F = I L × B biçimindedir; L vektörü akım yönüne bakar. Sağ el üçlüsü pozitif x, y ve z eksenlerinde x × y = z sırasını verir. Sayfa düzlemi x–y seçildiğinde +z okuyucuya doğru nokta, −z içeri doğru çarpıyla gösterilir.",
          "Örneğin akım +x, alan +z ise x × z = −y olduğu için tel aşağı itilir. Akımı ters çevirmek kuvveti yukarı yapar. Bir şekle bakarken sayfanın dışı ile yukarıyı aynı yön sanma; üç boyutun işaretlerini kısa bir eksen anahtarıyla yaz."
        ]
      },
      {
        "title": "İki paralel telin birbirine uyguladığı kuvvet",
        "paragraphs": [
          "Uzun ve paralel iki telin her biri ötekinin alanında kalır. Aynı yönlü akımlar birbirini çeker, zıt yönlü akımlar birbirini iter. Bunun nedeni her telin oluşturduğu dolaşan B yönünün diğer teldeki I L ile çapraz çarpımıdır; yalnız akım işaretlerini skaler biçimde toplamak yön hesabı değildir.",
          "Hava/vakum yaklaşımında ortak L boyu için F/L = μ₀ |I₁I₂|/(2πd) olur. Akımlar eşit olmasa da karşılıklı kuvvetler eşit büyüklükte ve zıt yöndedir. Eşit kuvvet, farklı kütleli serbest tellerin eşit ivmeli olacağı anlamına gelmez; ivmede F/m kullanılır."
        ]
      },
      {
        "title": "Çerçevede net kuvvet sıfırken tork olabilir",
        "paragraphs": [
          "Düzgün B alanındaki kapalı akım çerçevesinin karşı kenarlarına eşit ve zıt kuvvetler etki edebilir. Net kuvvet sıfır olsa da farklı etki doğruları bir kuvvet çifti oluşturur. Böylece çerçeve ötelenmeden dönme eğilimi gösterir; motorun temel fizik bağı budur.",
          "N sarımlı düzlemsel çerçevede tork büyüklüğü N I A B sin θ olur; θ, çerçevenin alan normali ile B arasındaki açıdır. Normal B ile paralelken tork sıfır, dikken en büyüktür. Akım veya komütasyon verilmeden tek sabit çerçevenin her durumda sürekli aynı yönde döneceğini ileri sürme."
        ]
      },
      {
        "title": "Tek yüke etki eden manyetik kuvvet",
        "paragraphs": [
          "Noktasal yüklü tanecik için F = q v × B yazılır. Büyüklük |q| v B sin α; α hız ile alan arasındaki açıdır. Pozitif yük için sağ el yönü, negatif yük için bunun tersi kullanılır. q = 0, v = 0 veya paralel hız–alan koşullarında manyetik kuvvet sıfır olabilir.",
          "Kuvvet sıfır değilken hem v hem B vektörüne diktir; fakat v ile B birbirine dik olmak zorunda değildir. Örneğin alan doğrultusunda da hız bileşeni taşıyan tanecikte yalnız dik bileşen kuvvete katkı verir. Bu ayrım, eğik girişte çember yerine helis görülmesini açıklar."
        ]
      },
      {
        "title": "Manyetik kuvvet neden sürati tek başına değiştirmez?",
        "paragraphs": [
          "Anlık güç F · v ile bulunur. Saf manyetik Lorentz kuvveti hıza dik olduğundan bu çarpım sıfırdır; manyetik kuvvet noktasal taneciğin kinetik enerjisini değiştirmez. Hızın yönü değişebilirken büyüklüğü sabit kalır; hız ve sürat aynı cümlede karıştırılmamalıdır.",
          "Bu sonuç yalnız manyetik katkıyadır. Elektrik alanı, sürtünme veya yer çekimi ayrıca iş yapıyorsa toplam kinetik enerji değişebilir. Akım taşıyan motor telinin mekanik iş yapması da çelişki değildir: devredeki elektrik kaynağı ve yükleri taşıyan iletken bütün enerji bilançosuna katılır."
        ]
      },
      {
        "title": "Dik girişte çemberin yarıçapını kur",
        "paragraphs": [
          "Sabit düzgün B alanında, başka kuvvet yokken ve v alana dikken manyetik kuvvet radyal net kuvveti sağlar. |q| v B = m v²/r eşitliğinden r = m v/(|q|B) çıkar. Büyüklük hesabında negatif yarıçap yoktur; yükün işareti dönüş yönünü belirler.",
          "Varsayımsal m = 1 mg, q = 2 μC, B = 0,5 T ve v = 4 m/s noktasal tanecikte r = 4 m olur. Bunlar gerçek bir elektronun kütle/yük değerleri değildir; verilen ideal modelin sayılarıdır. Alan bölgesi sınırlıysa tanecik tam tur atmadan çıkabilir; tam çember ancak alanda kalma koşuluyla geçerlidir."
        ]
      },
      {
        "title": "Dönme süresinde sürat neden sadeleşir?",
        "paragraphs": [
          "Dik girişte T = 2πr/v ifadesine yarıçap yerleştirilince T = 2πm/(|q|B) bulunur. Bu klasik, relativistik olmayan modelde aynı m, q ve B için sürat arttığında yarıçap artar ama tam turun süresi değişmez. Açısal süratin büyüklüğü |q|B/m olur.",
          "Önceki sayılarla açısal sürat 1 rad/s, periyot 2π saniyedir. q veya B sıfır olduğunda dairesel dönme yoktur; bu özel periyot formülünü sıfıra bölerek ekrana sonsuz bir tur gibi verme. Durgun tanecik için de gözlenen bir dolanma söz konusu değildir."
        ]
      },
      {
        "title": "Eğik girişte dik ve paralel hızları ayır",
        "paragraphs": [
          "Hızın B doğrultusundaki bileşeni saf sabit manyetik kuvvetten etkilenmez. Alana dik bileşen dönerek çembersel kesit, paralel bileşen sabit ilerleyerek eksen boyunca yol oluşturur. İkisi birlikte helis yörüngesidir; helisin adımı v∥T ile bulunur.",
          "Yarıçap hesabında toplam sürat yerine v⊥ kullanılır. Tam paralel girişte v⊥ = 0 olduğundan helisin çapı sıfıra iner ve hareket doğru olur. Uygulamadaki düzlem modeli Bz ve v_z = 0 seçer; üç boyutlu helisi iki boyutlu bir spiral diye çizmez."
        ]
      },
      {
        "title": "Elektrik ve manyetik alan birlikteyse",
        "paragraphs": [
          "Genel kuvvet q(E + v × B) olur. Bir hız seçicide belirli yönde E ve manyetik katkı eşit-zıt kurulursa tanecik sapmadan geçebilir. Dik düzenekte büyüklük koşulu |q|E = |q|vB olduğundan seçilen sürat E/B olur; yön koşulu ayrıca sağlanır.",
          "Örneğin v +x, B +z ise pozitif yükün manyetik kuvveti −y yönündedir; E +y seçilerek dengelenebilir. Negatif yükte iki kuvvet birlikte ters döndüğünden aynı sürat yine dengelenebilir. E alanının tek başına her durumda hız doğrultusunda veya iş yapan yönde olduğu sonucu çıkarılmaz."
        ]
      },
      {
        "title": "Yörüngeyi ve kanıtı birlikte oku",
        "paragraphs": [
          "Modelde başlangıç konumu orijin, alan Bz, yalnız başlangıç x–y hızı ve zaman seçilir. Konum, hız ve kuvvet aynı analitik çözümden çıkar; hız oku yola teğet, manyetik kuvvet oka diktir. Yük veya alan işareti değişince eğrilik döner, enerji göstergesi aynı başlangıç süratinde korunur.",
          "Önce sapmanın yönünü tahmin et, sonra çapraz çarpımı ve F · v = 0 sonucunu denetle. Sonraki bağımsız kartta farklı yön veya başka kuvvet verilince yeni koşulları kur. Modeli açmak ya da zaman çubuğunu sürüklemek tek başına doğru cevap ve konu tamamlanması sayılmaz."
        ]
      }
    ],
    "examples": [
      {
        "title": "Alan içindeki tel parçası",
        "prompt": "Düz telin 0,30 m bölümü 0,50 T düzgün alan içindedir. Akım 4 A, tel-akım yönü ile B açısı 30°; sin 30° = 0,5. Kuvvet büyüklüğü?",
        "strategy": "Önce alan içindeki boyu, sonra dik bileşeni kullan.",
        "steps": [
          {
            "label": "Veriler",
            "explanation": "B = 0,50 T, I = 4 A, L = 0,30 m."
          },
          {
            "label": "Açı",
            "explanation": "sin 30° = 0,5; F = B I L sin α."
          },
          {
            "label": "Hesap",
            "explanation": "F = 0,50 × 4 × 0,30 × 0,5 = 0,30 N."
          }
        ],
        "answer": "0,30 N",
        "check": "Dik yerleşimde 0,60 N olacaktı; sonuç bunun yarısı.",
        "pitfall": "Toplam tel boyunu veya cos 30° değerini kullanmak."
      },
      {
        "title": "Kuvvetin bileşenleri",
        "prompt": "q = +2 μC, v = (3; 4; 0) m/s ve B = (0; 0; 0,5) T. Başka kuvvet yok. F ve anlık manyetik güç?",
        "strategy": "v × B işlemini bileşenle yap.",
        "steps": [
          {
            "label": "Çarpım",
            "explanation": "v × B = (4 × 0,5; −3 × 0,5; 0) = (2; −1,5; 0)."
          },
          {
            "label": "Yük",
            "explanation": "F = (4; −3; 0) μN; büyüklük 5 μN."
          },
          {
            "label": "Güç",
            "explanation": "F · v = 4 × 3 − 3 × 4 = 0 μW."
          }
        ],
        "answer": "F = (4; −3; 0) μN; güç 0",
        "check": "F büyüklüğü |q|vB = 2 × 5 × 0,5 = 5 μN.",
        "pitfall": "Negatif bileşeni negatif kuvvet büyüklüğü sanmak."
      },
      {
        "title": "Klasik dairenin ölçeği",
        "prompt": "Varsayımsal noktasal tanecik m = 1 mg, q = +2 μC, B = 0,5 T alanına dik 4 m/s süratle giriyor. Düzgün alan sınırsız, başka kuvvet yok. r ve T?",
        "strategy": "Kütleyi kg, yükü C yap.",
        "steps": [
          {
            "label": "SI",
            "explanation": "m = 10⁻⁶ kg, q = 2 × 10⁻⁶ C."
          },
          {
            "label": "Yarıçap",
            "explanation": "r = m v/(|q|B) = 4 m."
          },
          {
            "label": "Periyot",
            "explanation": "T = 2πr/v = 2π s; sürat sabit."
          }
        ],
        "answer": "r = 4 m; T = 2π s",
        "check": "|q|B/m = 1 rad/s aynı periyodu verir.",
        "pitfall": "Taneciği gerçek elektron diye adlandırmak veya yarıçapta v² bırakmak."
      },
      {
        "title": "Torkta yüzeyin normali",
        "prompt": "N = 20 yakın sarımlı düz çerçevede I = 0,50 A, A = 0,040 m², B = 0,20 T. Alan normali ile B açısı 30°; sin 30° = 0,5. Tork büyüklüğü?",
        "strategy": "Açının düzlemle değil normalle verildiğini denetle.",
        "steps": [
          {
            "label": "Üst ölçek",
            "explanation": "N I A B = 20 × 0,50 × 0,040 × 0,20 = 0,080 N·m."
          },
          {
            "label": "Açı",
            "explanation": "τ = N I A B sin θ."
          },
          {
            "label": "Sonuç",
            "explanation": "τ = 0,080 × 0,5 = 0,040 N·m."
          }
        ],
        "answer": "0,040 N·m",
        "check": "θ = 0 olsaydı tork sıfırdı.",
        "pitfall": "Her açıda en büyük N I A B değerini yazmak."
      }
    ],
    "recall": [
      {
        "prompt": "Aynı yönlü iki paralel akım?",
        "answer": "Uygun uzun tel modelinde birbirini çeker; zıt akımlar iter."
      },
      {
        "prompt": "Saf manyetik güç?",
        "answer": "q(v × B) · v = 0; tek başına sürat değişmez."
      },
      {
        "prompt": "Helis yarıçapındaki sürat?",
        "answer": "B’ye dik hız bileşeni; paralel bileşen eksen boyunca ilerler."
      },
      {
        "prompt": "Çerçeve torkundaki açı?",
        "answer": "Alan normali ile B arasındaki açı; büyüklük N I A B sin θ."
      }
    ],
    "items": [
      {
        "prompt": "Düz telin alan içindeki boyu 0,40 m, akım 3 A ve düzgün B = 0,50 T. Tel alana dik. Manyetik kuvvet büyüklüğü?",
        "hint": "Dik durumda sin α = 1.",
        "explanation": "F = B I L = 0,50 × 3 × 0,40 = 0,60 N. Alan dışındaki tel parçası hesaba katılmadı.",
        "options": [
          "0,15 N",
          "1,50 N",
          "0,60 N",
          "6 N",
          "0 N"
        ],
        "answer": 2
      },
      {
        "prompt": "Akım yönü +x, düzgün manyetik alan +z yönünde. Sağ elli x–y–z eksenlerinde tel kuvvetinin yönü?",
        "hint": "x × z işlemini kur.",
        "explanation": "F = I L × B için x × z = −y. Akımın yönü konvansiyonel pozitif yük yönüdür; elektron yönüyle ikinci kez terslenmez.",
        "options": [
          "−y",
          "+y",
          "+z",
          "−z",
          "+x"
        ],
        "answer": 0
      },
      {
        "prompt": "Birbirine paralel, çok uzun iki telde akımlar aynı yönde; büyüklükler 2 A ve 5 A. Başka alan yok. Etkileşim nasıl olur?",
        "hint": "Her telin alanı ötekinin akımıyla çarpılır.",
        "explanation": "İki kuvvet de μ₀I₁I₂L/(2πd) büyüklüğündedir, yönleri zıttır. Aynı yönlü akım için çekim olur; farklı akımlar etki-tepki eşitliğini bozmaz.",
        "options": [
          "İterler; 5 A olanın kuvveti daha büyük",
          "Çekerler; kuvvet oranı 2/5",
          "Birbirlerine hiç kuvvet uygulamazlar",
          "Akım eşit olmadığından yön belirlenemez",
          "Çekerler; karşılıklı kuvvet büyüklükleri eşittir"
        ],
        "answer": 4
      },
      {
        "prompt": "q = −3 μC tanecik +x yönünde 4 m/s hızla, +z yönünde 2 T düzgün alanda hareket ediyor. Manyetik kuvvet?",
        "hint": "Önce pozitif yükte v × B, sonra q işareti.",
        "explanation": "v × B −y yönündedir. Negatif q bunu +y yapar; |F| = 3 × 4 × 2 = 24 μN. Büyüklükte eksi yük kullanılmaz.",
        "options": [
          "−y yönünde 24 μN",
          "+y yönünde 24 μN",
          "+y yönünde 6 μN",
          "+x yönünde 24 μN",
          "0 N"
        ],
        "answer": 1
      },
      {
        "prompt": "Noktasal yüklü tanecik yalnız sabit manyetik kuvvet altında hareket ediyor; elektrik, yer çekimi ve sürtünme yok. Hangi büyüklük mutlaka korunur?",
        "hint": "Anlık F · v değerini düşün.",
        "explanation": "Manyetik kuvvet hıza diktir; güç sıfırdır. Kinetik enerji ve sürat korunur, hız vektörünün yönü değişebilir.",
        "options": [
          "Hız vektörünün yönü",
          "Konum vektörü",
          "Her durumda x hız bileşeni",
          "Kinetik enerji",
          "Net kuvvetin yönü"
        ],
        "answer": 3
      },
      {
        "prompt": "Klasik modelde q ≠ 0 tanecik düzgün B’ye dik girip alan içinde tam tur atıyor. Aynı m, q, B ile ilk sürat iki kat olursa r ve T nasıl değişir?",
        "hint": "r = mv/(|q|B), T = 2πm/(|q|B).",
        "explanation": "Yarıçap süratle doğrusal artar. Çevre ile sürat birlikte iki kat olduğundan turun süresi değişmez; relativistik olmayan model kökte belirtilmiştir.",
        "options": [
          "r dört kat, T iki kat",
          "r aynı, T iki kat",
          "r yarı, T yarı",
          "r iki kat, T iki kat",
          "r iki kat, T aynı"
        ],
        "answer": 4
      },
      {
        "prompt": "Yükü sıfır olmayan hareketli tanecik düzgün manyetik alana tam paralel giriyor. Başka kuvvet yok. Hareketi?",
        "hint": "v × B = 0.",
        "explanation": "Paralel veya ters paralel v ve B için çapraz çarpım sıfırdır; başlangıç hızı değişmeden doğru hareket sürer. Yüklü ve hareketli olmak tek başına sapma gerektirmez.",
        "options": [
          "Zorunlu çember",
          "Sürati sürekli artan doğru",
          "Sabit hızla doğru boyunca",
          "Sürati sürekli azalan helis",
          "Başlangıçtan bağımsız durgunluk"
        ],
        "answer": 2
      },
      {
        "prompt": "N = 10, I = 2 A, A = 0,020 m², B = 0,50 T çerçevenin normali B’ye paralel. Manyetik tork büyüklüğü?",
        "hint": "τ = N I A B sin θ; θ = 0.",
        "explanation": "Normal–alan açısı sıfır olduğundan sin θ = 0 ve tork sıfırdır. 0,20 N·m yalnız maksimum tork ölçeğidir; her yerleşimde oluşmaz.",
        "options": [
          "0,20 N·m",
          "0 N·m",
          "2 N·m",
          "0,02 N·m",
          "10 N·m"
        ],
        "answer": 1
      },
      {
        "prompt": "Düzgün B alanına eğik giren taneciğin v⊥ = 6 m/s ve v∥ = 8 m/s bileşenleri var. Yalnız manyetik kuvvet etkiliyor. Helis yarıçapında hangi sürat kullanılır?",
        "hint": "Dönmeyi alanın dik bileşeni yapar.",
        "explanation": "r = m v⊥/(|q|B). Paralel 8 m/s bileşen helisin eksen boyunca adımını belirler; toplam sürat 10 m/s olsa da yarıçap formülüne o girmez.",
        "options": [
          "6 m/s",
          "8 m/s",
          "10 m/s",
          "14 m/s",
          "2 m/s"
        ],
        "answer": 0
      },
      {
        "prompt": "v +x yönünde 5 m/s, B +z yönünde 2 T. Noktasal q ≠ 0 yükün sapmadan geçmesi için yalnız ek E alanı seçilecek. E ne olmalı?",
        "hint": "E + v × B = 0.",
        "explanation": "v × B −y yönünde 10 N/C eşdeğerindedir; E +y yönünde 10 N/C seçilince toplam sıfır olur. q işareti iki katkıyı birlikte çarptığından şartı değiştirmez.",
        "options": [
          "−y yönünde 10 N/C",
          "+x yönünde 10 N/C",
          "+y yönünde 2,5 N/C",
          "+y yönünde 10 N/C",
          "E = 0"
        ],
        "answer": 3
      }
    ]
  },
  {
    "id": "elektromanyetik-induksiyon",
    "topic": "detail-382",
    "title": "Elektromanyetik indüksiyon: değişen akıdan akıma",
    "minutes": 125,
    "objectives": [
      "Manyetik akının normal açısını ve işaretini belirle.",
      "Faraday ve Lenz yasalarıyla emk ile akımı ayrı kur.",
      "Hareketli çubukta mekanik iş ile direnç ısısını denetle."
    ],
    "source": "MEBİ AYT Fizik PDF 126–131 (basılı 124–129); OGM Manyetizma Dersler Cepte PDF 16–19 ve 031/032 fizik özetlerinin gerçek şekilleri. Özgün açıklamalar ve sorular; resmî sınav sorusu değildir.",
    "sections": [
      {
        "title": "Sabit mıknatıs değil, değişen akı belirleyicidir",
        "paragraphs": [
          "Bir mıknatısı kapalı iletken halkaya yaklaştırıp uzaklaştırırken devrede kısa süreli akım gözlenebilir. Aynı mıknatıs ve halka birbirine göre sabit kalırsa yalnız bir manyetik alanın bulunması sürekli akım oluşturmaz. Hareketin anlamı halkanın yüzeyinden geçen akının değişmesidir.",
          "Akıyı B alanı, yüzey büyüklüğü ve yüzeyin yönü birlikte belirler. Bu üç nicelikten birini değiştirmek akıyı değiştirebilir; fakat değişimlerin etkileri birbirini de dengeleyebilir. Soruda yalnız “hareket ediyor” denmesi emk için yeterli değildir; ilgili kapalı yol ve alan dağılımı da incelenir."
        ]
      },
      {
        "title": "Bir yüzeye önce normal yönü seç",
        "paragraphs": [
          "Düzgün B ve düz yüzey için Φ = B A cos θ yazılır. θ, B ile yüzeye dik alan normali arasındaki açıdır; yüzey düzlemiyle yapılan açı değildir. A metre kare, B tesla alınırsa akı weber çıkar: 1 Wb = 1 T·m².",
          "Normal yönünü ters seçersen aynı fiziksel yüzey için akının işareti değişir; buna bağlı pozitif dolanım yönü de sağ el kuralıyla değişir. θ = 0 için Φ = +BA, 90° için 0, 180° için −BA olur. Sıfır akı, işaretli akının en küçük değeri değil, büyüklüğünün sıfır olduğu durumdur."
        ]
      },
      {
        "title": "Alan çizgilerini gerçek tane sayısı sanma",
        "paragraphs": [
          "Çizgilerin yüzeyi ne kadar dik kestiği akının görsel sezgisini verir. Yüzey alana dikken daha büyük, kenardan bakıldığında daha küçük dik kesit görünür. Çizimler sayılabilir fiziksel teller değildir; seçilen çizgi sıklığı alanın büyüklüğünü temsil eder.",
          "Alan düzgün değilse yüzeyi küçük parçalara ayırıp B’nin normal bileşeniyle katkıları toplamak gerekir; BA cos θ tek bir sabit alan/yüzey örneğidir. Uygulamadaki ray modeli Bz ve x–y yüzeyi seçer; burada normal +z ve Φ = B L x olduğu için bütün birim ve işaretler açıktır."
        ]
      },
      {
        "title": "Son eksi ilk, sonra zaman aralığı",
        "paragraphs": [
          "Akı farkı ΔΦ = Φson − Φilk olur. Tek sarımda ortalama emk εortalama = −ΔΦ/Δt, eş akıyı bağlayan N sarımda −NΔΦ/Δt olur. Volt birimi Wb/s ile aynı boyuttadır. Emk adında kuvvet geçmesine rağmen newton cinsinden mekanik kuvvet değildir.",
          "Bu oran belirli aralığın ortalamasıdır; akı eğrisi doğrusal değilse her andaki değer aynı olmayabilir. Anlık emk −N dΦ/dt ile bulunur. Grafikte emk eğimi değil akı–zaman eğimi kullanılır; sabit fakat sıfır olmayan akının eğimi yine sıfırdır."
        ]
      },
      {
        "title": "Emk ile kapalı devre akımını ayır",
        "paragraphs": [
          "Hareket eden açık bir telin uçlarında yük ayrılması ve uçlar arası gerilim oluşabilir. Yalıtılmış uçlarda yük birikimi dengeye gelince sürekli bir devre akımı sürmez. Bir emk değerinin bulunması, dirençli kapalı yolun da bulunduğu anlamına gelmez.",
          "Basit kapalı ve öz-indüktansı ihmal edilen devrede I = ε/R kullanılabilir. R toplam devre direncidir; ray ve temas direnci ihmal diye verilmişse yalnız yük direnci alınır. Bobin etkisi önemliyse akımın zamana bağlı cevabı ayrıca hesaplanır; ani her değişimde koşulsuz ε/R yazılmaz."
        ]
      },
      {
        "title": "Lenz yasası alanı değil değişimi karşılar",
        "paragraphs": [
          "İndüklenen akımın oluşturduğu alan, onu doğuran akı değişimine karşı yöndedir. +z akısı artıyorsa tepki alanı −z; +z akısı azalıyorsa tepki alanı +z yönündedir. Bu nedenle “indüksiyon alanı her zaman dış alana zıttır” cümlesi yanlıştır.",
          "+z yönünde normal seçilmiş halkaya +z tarafından bakarken saatin tersi akım +z alanı verir. Buna göre artan +z dış akısı saat yönlü akım gerektirir. Önce artan/azalan işaretli akıyı, sonra gerekli tepki alanını, en son el kuralıyla akım yönünü bulmak üç ayrı adımdır."
        ]
      },
      {
        "title": "Yaklaşan ve uzaklaşan mıknatıs",
        "paragraphs": [
          "Halkanın karşısına bir mıknatısın N kutbu yaklaştırıldığında yakın yüzde N kutbu oluşacak akım, yaklaşmanın akı artışına karşı koyabilir. Aynı N kutbu uzaklaşırken yakın yüz S olacak akım uzaklaşmayı desteklemek yerine azalan akıyı sürdürmeye çalışır.",
          "Kutupları çizmek, gözlemcinin hangi yüzden baktığını unutmamalıdır. Aynı dolaşım bir yüzden saat yönü, ötekinden saat tersi görünür. Mıknatıs halkadan geçip öteki tarafa geldiğinde de gerçek alan yönü ve akı değişimi baştan değerlendirilir; yalnız hız okunu ezberlemek yeterli değildir."
        ]
      },
      {
        "title": "Raylar üzerinde kayan çubuğun polaritesi",
        "paragraphs": [
          "x–y düzlemindeki raylarda yukarı yönlü L boyunda çubuk +x yönünde v ile çekilsin; B = +Bz sayfadan dışarı olsun. Pozitif taşıyıcı için v × B aşağı yönlüdür; alt uç daha yüksek, üst uç daha düşük potansiyele geçer. Üst eksi alt gerilim −B L v olur.",
          "Çubuk ve rayların direncini ihmal edip R direncini yalnız yükte alalım. Devreye +z yüzünden bakarken pozitif dolanımı saatin tersi seçersek akı B L x ve emk −B L v’dir. Negatif emk saat yönlü akım anlamına gelir; akım çubuğun üzerinde aşağı akar. Alanın veya hareketin yönü ters çevrilince polarite de yeni çapraz çarpıma göre tersine döner."
        ]
      },
      {
        "title": "Çubuğu çekmek neden dış iş gerektirir?",
        "paragraphs": [
          "Kapalı devrede akım taşıyan hareketli çubuğa manyetik kuvvet de etki eder. Yukarıyı çubuk için pozitif akım yönü alırsak Fx = I L B olur; önceki koşulda I negatif ve kuvvet hareketin tersine doğrudur. Sabit sürati koruyan dış kuvvet bunun tersini uygulamalıdır.",
          "Bu basit modelde dış güç Fdış v = B²L²v²/R = I²R olur. Dirençte açığa çıkan ısı mekanik kaynaktan gelir; mıknatıs bedelsiz enerji deposu gibi tükenmeden güç üretmez. Açık devrede bu sürekli akım ve direnç ısısı yoktur; uç gerilimi yine bulunabilir."
        ]
      },
      {
        "title": "Bir halkayı alan bölgesinden geçir",
        "paragraphs": [
          "Düzgün alanın sınırına giren dikdörtgen halkada alan içinde kalan yüzey artar; emk ve akım oluşabilir. Halka bütünüyle aynı düzgün alanda aynı yönle ötelenirken akı değişmeyebilir; karşı kenarların emk katkıları net dolanımda birbirini götürebilir.",
          "Çıkış sırasında alan içindeki yüzey azalınca akım girişe göre ters döner. Bu üç bölgeyi karşılaştırmak, “B içinde hareket eden her halka akım taşır” hatasını düzeltir. Alan düzgün değilse veya halka dönüyorsa koşullar değişir; net akı farkı yeniden kurulmalıdır."
        ]
      },
      {
        "title": "Dönen çubukta hız her noktada farklıdır",
        "paragraphs": [
          "Düzgün B’ye dik düzlemde bir ucundan ω ile dönen doğru çubuğun eksene r uzaklıktaki noktası ωr süratine sahiptir. Bu yüzden bütün çubuğa uç süratini aynıymış gibi uygulamak emk’yi iki kat hatalı verebilir. Merkez ile L ucu arasındaki büyüklük ε = BωL²/2 olur.",
          "Daha genel iki yarıçap arasındaki fark Bω(r₂² − r₁²)/2 ile bulunur. Eksenin iki yanında uzanan bir telde uçların polariteleri ve farkları ayrıca incelenmelidir. Noktalar eşit aralıklıysa eksenden emk uzaklığın karesiyle artar; bu örnek akımın otomatik kapalı yoldan aktığı anlamına gelmez."
        ]
      },
      {
        "title": "Bobin kendi akım değişimine karşı da emk oluşturur",
        "paragraphs": [
          "Bobinin akımı değiştiğinde kendi sardığı akı da değişir. Sabit indüktanslı doğrusal modelde εöz = −L dI/dt bağıntısı kullanılır. Akım artışında artışı azaltan, azalışında akımı aynı yönde sürdürmeye çalışan bir emk katkısı doğar.",
          "Bu “tepki” ayrı bir telde bağımsız ikinci akım yaratıldığı anlamına gelmez; devrenin tek toplam akımını belirleyen denkleme bir gerilim katkısı eklenir. Bobinin manyetik enerji ölçeği L I²/2’dir. Anahtarı aniden açma gibi geçicilerde gerçek gerilim ve parazit koşulları gerekir; sade model bu olayı ayrıntısız sonsuz sayılarla oynatmaz."
        ]
      },
      {
        "title": "Motor ile jeneratörün enerji yollarını bağla",
        "paragraphs": [
          "Motor elektrik kaynağından alınan enerjiyi mekanik işe dönüştürebilir; jeneratörde dışarıdan verilen mekanik iş indüksiyon yoluyla elektrik devresine aktarılır. İkisi aynı manyetik alan–akım etkileşiminin farklı enerji yönleridir. Enerji hesabına kaynak, hareketli parça ve direnç birlikte katılır.",
          "Sürekli bir dış güç olmadan yük altında aynı elektrik çıkışını sonsuza kadar koruyan şema çizilmez. Hareket yavaşlıyorsa kinetik enerji, sabit tutuluyorsa dış kaynağın işi, manyetik enerji değişiyorsa bobin katkısı hesaba girer. Emk’nin sayı işaretiyle enerji üretme/tüketme yönü de bu bilanço içinde anlam kazanır."
        ]
      },
      {
        "title": "Değişkeni birer birer değiştirip kanıtla",
        "paragraphs": [
          "Model çubuğun konumunu, hızını, alanın yönünü ve açık/kapalı devreyi ayrı seçtirir. Konum akının o anki değerini değiştirir; aynı B, L ve v korunurken emk’nin konumdan bağımsız kalması akı büyüklüğü ile değişim hızının farkını gösterir.",
          "Önce akımın yönünü tahmin et, sonra −dΦ/dt ve çubuk üzerindeki I L × B sonucunu karşılaştır. Dış güç ile direnç ısısının eşitliğini son birim kontrolüyle doğrula. Çizgiler gerçek koordinat ve aynı işaret sözleşmesiyle üretilir; keşfi kaydetmek puan üretmez."
        ]
      }
    ],
    "examples": [
      {
        "title": "Sabit süratle çekilen ray çubuğu",
        "prompt": "L = 0,40 m çubuk x–y raylarında +x yönünde 3 m/s ile çekiliyor. Bz = +0,50 T, kapalı devre R = 2 Ω. Çubuk ve ray direnci ile öz-indüktans ihmal; R yük direncidir. |ε|, |I| ve dış güç?",
        "strategy": "Akı değişiminden akıma, sonra enerjiye git.",
        "steps": [
          {
            "label": "Emk",
            "explanation": "|ε| = B L v = 0,50 × 0,40 × 3 = 0,60 V."
          },
          {
            "label": "Akım",
            "explanation": "|I| = |ε|/R = 0,30 A; +z yüzünden bakınca saat yönünde."
          },
          {
            "label": "Enerji",
            "explanation": "Fdrag = |I| L B = 0,060 N; dış güç = 0,060 × 3 = 0,180 W = I²R."
          }
        ],
        "answer": "0,60 V; 0,30 A; 0,180 W",
        "check": "Üst eksi alt gerilim −0,60 V; drag −x yönünde.",
        "pitfall": "Akı büyüklüğünü emk diye vermek veya mıknatısı enerji kaynağı saymak."
      },
      {
        "title": "Sabit yüzey, doğrusal artan alan",
        "prompt": "N = 50 eş sarımın her birinin A = 0,020 m² alan normali +z. Bz, 0,30 s içinde +0,10 T’den +0,40 T’ye doğrusal artıyor. Pozitif dolanım +z’den bakınca saatin tersi. Ortalama emk?",
        "strategy": "Normal ve dolanım sözleşmesini koru.",
        "steps": [
          {
            "label": "Akı farkı",
            "explanation": "ΔΦ = A ΔB = 0,020 × 0,30 = 0,0060 Wb/sarım."
          },
          {
            "label": "Zaman",
            "explanation": "ΔΦ/Δt = 0,0060/0,30 = 0,020 V/sarım."
          },
          {
            "label": "Sarım",
            "explanation": "ε = −50 × 0,020 = −1,0 V; doğrusal değişimde bu aralıkta anlık değer de aynıdır."
          }
        ],
        "answer": "−1,0 V",
        "check": "Negatif dolaşım, artan +z akıya karşı −z tepki alanıyla tutarlıdır.",
        "pitfall": "Sarım sayısını akı farkına iki kez çarpmak."
      },
      {
        "title": "Çubuğun ucunun süratini her yere koyma",
        "prompt": "0,50 m doğru çubuk bir ucundan 10 rad/s ile, 0,40 T düzgün alana dik düzlemde dönüyor. Merkez ile dış uç arasındaki emk büyüklüğü?",
        "strategy": "Doğrusal değişen hızın ortalamasını veya integrali kullan.",
        "steps": [
          {
            "label": "Uç sürati",
            "explanation": "vuc = ωL = 10 × 0,50 = 5 m/s."
          },
          {
            "label": "Ortalama",
            "explanation": "İç uçta hız sıfır; doğru çubuk boyunca ortalama sürat vuc/2 = 2,5 m/s."
          },
          {
            "label": "Emk",
            "explanation": "|ε| = B L vuc/2 = 0,40 × 0,50 × 2,5 = 0,50 V."
          }
        ],
        "answer": "0,50 V",
        "check": "BωL²/2 = 0,40 × 10 × 0,25/2 aynı sonucu verir.",
        "pitfall": "B L vuc ifadesini doğrudan kullanıp 1,0 V bulmak."
      },
      {
        "title": "Öz-indüksiyonun işareti",
        "prompt": "Sabit L = 0,20 H bobinde, seçili pozitif yöndeki akım 0,10 s içinde 1 A’den 4 A’ye doğrusal artıyor. Aynı pozitif dolaşım için öz-indüksiyon emk’si?",
        "strategy": "Önce akım eğimini kur.",
        "steps": [
          {
            "label": "Fark",
            "explanation": "ΔI = 4 − 1 = +3 A."
          },
          {
            "label": "Eğim",
            "explanation": "dI/dt = 3/0,10 = 30 A/s."
          },
          {
            "label": "Emk",
            "explanation": "εöz = −L dI/dt = −0,20 × 30 = −6,0 V."
          }
        ],
        "answer": "−6,0 V",
        "check": "Akımın artışına karşı yönde bir emk katkısıdır.",
        "pitfall": "L birimini ohm sanmak veya toplam akıma bağımsız ikinci akım eklemek."
      }
    ],
    "recall": [
      {
        "prompt": "Akıdaki açı nereye göre?",
        "answer": "B ile yüzey normali; yüzey düzlemiyle açı değildir."
      },
      {
        "prompt": "Sabit, sıfır olmayan akı emk oluşturur mu?",
        "answer": "Hayır; Faraday emk’si akının değişim hızına bağlıdır."
      },
      {
        "prompt": "Açık telde emk ve akım?",
        "answer": "Uç gerilimi olabilir; kapalı yol yoksa kalıcı devre akımı gerekmez."
      },
      {
        "prompt": "Lenz alanın kendisine mi karşı?",
        "answer": "Akı değişimine karşı; azalan dış akıyı destekleyen tepki alanı olabilir."
      }
    ],
    "items": [
      {
        "prompt": "Düzgün B = 0,40 T ve A = 0,50 m² yüzeyde, alan normali ile B açısı 60°. cos 60° = 0,5. İşaretli manyetik akı?",
        "hint": "Φ = B A cos θ.",
        "explanation": "0,40 × 0,50 × 0,5 = 0,10 Wb. Açı normalden ölçülmüştür; sinüs kullanmak bu öncüle uymaz.",
        "options": [
          "+0,20 Wb",
          "+0,10 Wb",
          "+0,40 Wb",
          "−0,10 Wb",
          "0 Wb"
        ],
        "answer": 1
      },
      {
        "prompt": "Tek sarımın +z normaline göre akısı 0,20 s içinde +0,10 Wb’den +0,40 Wb’ye değişiyor. +z’den bakınca pozitif dolanım saatin tersi. Ortalama emk?",
        "hint": "−ΔΦ/Δt.",
        "explanation": "εort = −(0,40 − 0,10)/0,20 = −1,5 V. Negatif işaret tanımlı dolaşıma göredir; emk birimi newton değildir.",
        "options": [
          "+1,5 V",
          "−0,06 V",
          "+0,50 V",
          "−1,5 V",
          "0 V"
        ],
        "answer": 3
      },
      {
        "prompt": "Kapalı dirençli halkadan geçen +z akısı zamanla azalıyor. +z tarafından bakan gözlemci için, basit Lenz modelinde indüksiyon akımı yönü?",
        "hint": "Azalan +z akıyı destekleyen alan gerekir.",
        "explanation": "Tepki alanı +z olur; sağ elin parmakları +z yüzünden bakınca saatin tersi dolaşır. Lenz dış alanı değil değişimi karşılar.",
        "options": [
          "Saatin tersi",
          "Saat yönü",
          "Her durumda sıfır",
          "Daima çemberin merkezine doğru",
          "Yalnız iletkenin rengine bağlı"
        ],
        "answer": 0
      },
      {
        "prompt": "L = 0,50 m açık çubuk +x yönünde 2 m/s hareket ediyor. B = +1 T, +z yönünde; çubuk +y doğrultusunda. Diğer devre bağlantısı yok. Kararlı yük ayrımı sonrası hangi yorum uygundur?",
        "hint": "v × B −y yönündedir.",
        "explanation": "Pozitif yükler aşağı yönlenir; üst daha düşük potansiyelde olur. B L v = 1 V büyüklük oluşturur; açık uçlar sürekli devre akımı gerektirmez.",
        "options": [
          "Gerilim varsa sürekli akım mutlaka 1 A olur",
          "Emk kesin sıfırdır; açık devrede yük ayrılmaz",
          "Alt eksi üst gerilim −1 V’dir",
          "Açık çubukta sonsuz akım vardır",
          "Üst eksi alt gerilim −1 V olabilir; sürekli kapalı devre akımı yoktur"
        ],
        "answer": 4
      },
      {
        "prompt": "Raylar üzerinde L = 0,40 m çubuk, Bz = +0,50 T alanında +x yönünde 3 m/s çekiliyor. Toplam R = 2 Ω kapalı devre, öz-indüktans ihmal. Akım büyüklüğü?",
        "hint": "|ε| = B L v; I = |ε|/R.",
        "explanation": "Emk 0,60 V; 0,60/2 = 0,30 A. Alan ve rayın geometrisi sabittir; direnç toplam devre direncidir.",
        "options": [
          "0,60 A",
          "1,20 A",
          "0,30 A",
          "0,15 A",
          "3 A"
        ],
        "answer": 2
      },
      {
        "prompt": "Sabit süratle çekilen ray çubuğunda |ε| = 4 V, R = 2 Ω. Başka kayıp, ray direnci ve öz-indüktans ihmal; dış kuvvet sürati sabit tutuyor. Gerekli mekanik güç?",
        "hint": "Fdışv = ε²/R.",
        "explanation": "Mekanik güç, dirençteki I²R = (4/2)² × 2 = 8 W ısısına gider. Bu, süratin sabit tutulduğu ve başka enerji katkısı olmadığı koşulun bilançosudur.",
        "options": [
          "2 W",
          "4 W",
          "16 W",
          "8 W",
          "0 W"
        ],
        "answer": 3
      },
      {
        "prompt": "Düzgün alan içinde kapalı halka, alan ve yüzey yönü değişmeden bütünüyle aynı düzgün bölgede sabit hızla öteleniyor. Halka öz-indüktansı ihmal, ilk akım sıfır. Net akı değişimi ve indüksiyon akımı?",
        "hint": "A, B ve normal açısı sabit.",
        "explanation": "Φ = B A cos θ aynı kalır; net Faraday emk’si sıfırdır. Tek kenarın hareketli olması, bütün kapalı yolun net emk’siyle aynı şey değildir.",
        "options": [
          "Akı sabit ama zorunlu artan akım",
          "İkisi de sıfır",
          "Akı değişimi B A kadar; akım sonsuz",
          "Her kenarın emk’si aynı yönde toplanır",
          "Yalnız v ≠ 0 olduğu için akım kesin sıfırdan farklı"
        ],
        "answer": 1
      },
      {
        "prompt": "L boylu doğru çubuk bir ucundan sabit ω ile, düzgün B’ye dik düzlemde dönüyor. Uçlar arası emk büyüklüğü ε. Aynı B ve ω ile uzunluk 2L olursa?",
        "hint": "ε = BωL²/2.",
        "explanation": "Dış uç sürati de uzunlukla artar; hem boy hem hız etkisiyle emk L²’ye bağlıdır. İki kat uzunluk dört kat emk verir.",
        "options": [
          "2ε",
          "ε/2",
          "ε",
          "8ε",
          "4ε"
        ],
        "answer": 4
      },
      {
        "prompt": "Sabit L = 0,50 H bobinde seçili yöndeki akım, 0,20 s içinde 4 A’den 2 A’ye doğrusal azalıyor. Aynı pozitif dolaşımda öz-indüksiyon emk’si?",
        "hint": "−L ΔI/Δt; ΔI negatiftir.",
        "explanation": "Eğim (2−4)/0,20 = −10 A/s; emk −0,50 × (−10) = +5 V. Azalışı engelleyecek yönde akımı destekler.",
        "options": [
          "−5 V",
          "+1 V",
          "+5 V",
          "−1 V",
          "0 V"
        ],
        "answer": 2
      },
      {
        "prompt": "N sarımlı çerçevede her sarımın akısı Φ = B A cos(ωt). B, A ve ω sabit, öz-indüksiyon ihmal. Akı büyüklüğünün en büyük olduğu anda indüksiyon emk büyüklüğü?",
        "hint": "ε = −N dΦ/dt.",
        "explanation": "Emk N B A ω sin(ωt) olur. Akı ±BA ile ekstremumdayken sinüs sıfırdır; büyük akı, büyük akı değişim hızı demek değildir.",
        "options": [
          "0 V",
          "N B A ω",
          "B A",
          "N B A",
          "Sürekli sonsuz"
        ],
        "answer": 0
      }
    ]
  },
  {
    "id": "alternatif-akim",
    "topic": "detail-383",
    "title": "Alternatif akım: dalga, faz ve gerçek güç",
    "minutes": 130,
    "objectives": [
      "Sinüzoidal işaretin tepe, ortalama ve etkin değerini ayır.",
      "Direnç, bobin ve sığacın gerilim-akım faz ilişkisini kur.",
      "Seri RLC devresinde empedans, güç ve rezonansı koşullarıyla hesapla."
    ],
    "source": "MEBİ AYT Fizik PDF 132–136 (basılı 130–134) ve OGM Dersler Cepte Alternatif Akım–Transformatör PDF 10–11 gerçek anlatım ve devreleri temel alınmıştır. Koşullu sinüzoidal seri modeller, örnekler ve sorular özgündür; resmî sınav sorusu değildir.",
    "sections": [
      {
        "title": "Yönü değişen akımı dalga olarak gör",
        "paragraphs": [
          "Alternatif akım belirli aralıklarla yön değiştirir; bu ünitede en yaygın sinüzoidal örneğini inceleriz. Doğru akım tek yöndedir; zamanla şiddeti değişen tek yönlü bir işaret de doğru akım olabilir. Sabit şiddetli doğru akım bunun özel bir kararlı hâlidir.",
          "Bir pil ile ideal sabit gerilim kaynağı doğru akım örneği sağlayabilir; dönen bir mıknatıs–bobin düzeneği ise uygun bağlantıyla alternatif gerilim oluşturabilir. “Dinamo” adı günlük kullanımda farklı aygıtlara verildiğinden yalnız adına bakarak her bisiklet üretecinin doğru akım verdiğini varsayma."
        ]
      },
      {
        "title": "Alternatörün dalgası değişen akıdan doğar",
        "paragraphs": [
          "Düzgün alanda sabit açısal süratle dönen N sarımlı bir çerçevede akı bağlantısı N B A cos(ωt) olabilir. Faraday türevi emk’yi N B A ω sin(ωt) yapar; yüzeyin yönü döndükçe gerilim işaret değiştirir. Mekanik dönme enerjisi elektrik devresine aktarılır.",
          "Akının en büyük olduğu konumda emk sıfır, akının sıfırdan en hızlı geçtiği konumda emk büyüklüğü en büyüktür. Aynı grafikte akı ile gerilim arasında bu çeyrek periyot ilişkisini izle. Sabit B varlığı tek başına kaynak değildir; burada değişen yüzey normali ve dış mekanik iş vardır."
        ]
      },
      {
        "title": "Periyot, frekans ve açısal frekans",
        "paragraphs": [
          "Sinüzoidal kaynak v(t) = Vtepe sin(ωt) biçiminde yazılabilir. T bir tam tekrarın süresi, f = 1/T saniyedeki tekrar sayısıdır. Açısal frekans ω = 2πf birim olarak rad/s, f ise Hz taşır; sayısal değerleri aynı değildir.",
          "Örneğin f = 50 Hz için T = 0,020 s ve ω = 100π rad/s olur. Gerilim işareti yarım periyotta tersine döner; tam aynı duruma dönüş bir tam T ister. Pozitif maksimum bir periyotta bir kez, mutlak gerilimin maksimumu iki kez görülür."
        ]
      },
      {
        "title": "Etkin değer aynı ısıl etkiyi karşılaştırır",
        "paragraphs": [
          "Bir dirençte ortalama güç i²R’ye bağlıdır. Zamanla değişen akımın karesinin ortalamasının kareköküne etkin, yani RMS değer denir. Aynı dirençte aynı sürede aynı ısıyı üreten sabit akım büyüklüğü bu değerdir; imzalı akım ortalamasıyla karıştırılmaz.",
          "Sinüs için Ietkin = Itepe/√2 ve Vetkin = Vtepe/√2 olur. Bu √2 kuralı her dalga biçimine koşulsuz uygulanmaz; genel tanım kare-ortalama-kareköktür. Uygun AC ölçüm modundaki gerçek RMS ölçer bu değeri gösterebilir; her ölçerin her dalga biçiminde aynı doğruluğu verdiği varsayılmaz."
        ]
      },
      {
        "title": "Dirençte akım ve gerilim aynı fazdadır",
        "paragraphs": [
          "İdeal ohmik dirençte vR(t) = R i(t) olduğundan işaretler ve sıfır geçişleri birlikte olur. Sinüzoidal kararlı rejimde Vetkin = Ietkin R ve ortalama P = Ietkin²R kullanılabilir. Direnç enerjiyi ısıya çevirir; bu ortalama güç negatife gitmez.",
          "Anlık vR i = R i² de sıfır veya pozitiftir. Gerilim ile akımın imzalı ortalamaları sıfır olsa bile kareleri sıfır değildir; bu yüzden AC ile ısıtma mümkündür. İdeal R değerinin burada frekanstan bağımsız kabul edilmesi, gerçek her iletkenin çok yüksek frekansta aynı kaldığı iddiası değildir."
        ]
      },
      {
        "title": "Bobin akımın değişimine karşı gerilim ister",
        "paragraphs": [
          "Sabit L indüktanslı ideal bobinde vL = L di/dt ilişkisi vardır. Akım en hızlı değişirken bobin gerilimi büyük, akım ekstremumdayken türev sıfır olabilir. Sinüzoidal durumda ideal bobinin gerilimi akımından 90° öndedir; akım gerilimin gerisinde kalır.",
          "İndüktif reaktans XL = ωL = 2πfL, ohm birimindedir. Frekans yükseldikçe aynı L için büyür. İdeal bobin bir periyotta net enerji tüketmez; LI²/2 ile depoladığı enerjiyi geri verir. Gerçek sargının ohmik direnci ısı kaybı doğurabilir ve ayrıca modele eklenir."
        ]
      },
      {
        "title": "Sığaçta akım gerilimin değişimiyle bağlanır",
        "paragraphs": [
          "İdeal sığaçta q = CvC ve i = C dvC/dt olur. Sinüzoidal vC en büyükken akım sıfırdır; vC sıfırdan en hızlı geçerken akım büyüklüğü en büyüktür. Akım sığaç geriliminden 90° öndedir; bunu yalnız “doluyken akım artar” sözüyle açıklamak doğru değildir.",
          "Kapasitif reaktans XC = 1/(ωC) olur; f veya C artınca azalır. Dielektrikten metaldeki gibi serbest yüklerin sürekli geçmesi gerekmez; levhalarda yük değişimi ve alanın enerji alışverişi vardır. İdeal sığaç için periyot ortalama gerçek güç sıfır, anlık güç sıfır olmayan artı/eksi değerler alabilir."
        ]
      },
      {
        "title": "Seri devrede akım ortak, gerilimler yönlü toplanır",
        "paragraphs": [
          "Seri R, L ve C elemanlarından aynı akım geçer. Direnç gerilimi akımla aynı fazda, bobin gerilimi 90° önde ve sığaç gerilimi 90° geridedir. Bu nedenle etkin gerilim büyüklüklerini sıradan skaler toplam gibi V = VR + VL + VC yazmak genelde yanlıştır.",
          "Akım referansına göre yatay VR = IR, düşey VL − VC = I(XL − XC) bileşenleri kurulur. Kaynak gerilimi bu iki bileşenin bileşkesidir. Seri toplamın büyüklüğü √(VR² + (VL − VC)²) olur; fazör diyagramı bu geometrik işlemi görünür yapar."
        ]
      },
      {
        "title": "Empedansın büyüklüğü ve fazı birlikte gerekir",
        "paragraphs": [
          "Seri devrede Z = √(R² + (XL − XC)²) ve Ietkin = Vetkin/Z bulunur. Z ohm birimindedir; reaktanslar sırf pozitif direnç gibi toplanmaz. R’nin sıfırdan büyük olduğu modelimiz, ideal kayıpsız rezonansın tekil sonsuz akım durumunu dışarıda tutar.",
          "φ = atan((XL − XC)/R) kaynak geriliminin ortak akıma göre fazıdır. XL > XC ise gerilim önde, akım geridedir; XC > XL ise akım öne geçer. Pozitif/negatif faz, zaman ekseninde aynı sıfır geçişlerinin hangisinin önce olduğunu okuyarak denetlenebilir."
        ]
      },
      {
        "title": "Görünür güç ile gerçek gücü ayır",
        "paragraphs": [
          "Seri sinüzoidal devrede ortalama gerçek güç P = Vetkin Ietkin cos φ = Ietkin²R olur. Vetkin Ietkin çarpımı görünür güç ölçeğidir; cos φ güç faktörüdür. Reaktif elemanların enerji geri alışverişi yüzünden aynı V ve I çarpımının tümü ortalama ısı olmayabilir.",
          "Anlık p(t) = v(t)i(t) bazı zamanlarda negatif olabilir; bu anlarda depolanan enerji kaynağa geri dönebilir. Bir tam periyodun ortalaması R > 0 ve kaynak varlığında pozitiftir. Anlık negatif güç, periyot boyunca yoktan enerji üretildiği anlamına gelmez."
        ]
      },
      {
        "title": "Rezonans hangi devrede akımı büyütür?",
        "paragraphs": [
          "Sabit Vetkin kaynakla beslenen seri RLC devresinde XL = XC olduğunda reaktif bileşenler birbirini götürür. Z = R en küçük değer, Ietkin = Vetkin/R en büyük değer olur. Rezonans açısal frekansı ω₀ = 1/√(LC) ve f₀ = ω₀/(2π) ile bulunur.",
          "Bu hâlde kaynak gerilimi ile ortak akım aynı fazdadır, fakat bobin ve sığacın kendi gerilimleri sıfır olmak zorunda değildir. Büyük ve zıt fazlı olabilirler. Seri devrenin I maksimumu kuralını farklı paralel devrelere, değişen kaynak genliğine veya gerçek kayıp sınırı olmayan sonsuz performansa genişletme."
        ]
      },
      {
        "title": "Frekans değişimini bir deney gibi kontrol et",
        "paragraphs": [
          "Aynı kaynak etkin gerilimi ve elemanlar korunarak frekans artırılırsa XL artar, XC azalır. Net reaktansın işareti ve büyüklüğü buna göre değişir; rezonansa yaklaşırken akım artabilir, rezonansı geçince tekrar azalabilir. “Frekans büyüdü, akım her zaman büyür” sonucu doğru değildir.",
          "Bobin ve sığaçlar filtre, frekans seçimi ve enerji aktarımı devrelerinde bu farklı cevaplarıyla kullanılır. Gerçek elemanların akım/gerilim sınırı, kayıp ve frekans aralığı vardır. Öğretim modeli ideal parametrelerle koşullu hesap yapar; gerçek bir aygıtın sınırlarını yalnız bu formüllerden icat etmez."
        ]
      },
      {
        "title": "DC bağlantısında geçici hâl ile son hâl",
        "paragraphs": [
          "Bir R–C devresinde DC kaynağa bağlanan sığaç ilk anda yüklenme akımı taşıyabilir; uygun kararlı son durumda ideal sığaç üzerinden akım sıfıra iner. R–L devresinde akım artışı bobin etkisiyle gecikebilir; son akım toplam ohmik dirençle belirlenir.",
          "Bu geçiciler ile sürekli sinüzoidal kararlı durum farklı problemlerdir. DC kaynağı sıfır frekans diye ideal rezonans formülüne gelişigüzel yerleştirme. Akü şarjında veya elektronik devrede AC kaynak varsa uygun doğrultma ve kontrol katları gerekebilir; yalnız devre adından bağlantı ayrıntıları çıkarılmaz."
        ]
      },
      {
        "title": "Dalga, fazör ve sayıyı aynı anda karşılaştır",
        "paragraphs": [
          "Modelde kaynak fazı seçilirken v(t) ve i(t) aynı an için hesaplanır. Ayrı fazörde akım referans alınır, VR ile VL − VC dik bileşenleri çizilir. Dalga dikey eksenleri farklı birim taşıdığı için her eğrinin kendi ölçeği ve sayısal değeri gösterilir.",
          "Önce devrenin indüktif, kapasitif veya rezonans durumunu tahmin et. Sonra XL, XC, φ ve ortalama güç üzerinden gerekçeni sınayabilirsin. Aynı saniyede akım ve gerilimin birlikte yükselmesi tek başına aynı fazı kanıtlamaz; bütün periyot ve sıfır geçişleri gözlenir."
        ]
      }
    ],
    "examples": [
      {
        "title": "Tepe geriliminden ısıl güce",
        "prompt": "Sinüzoidal kaynağın tepe gerilimi 120√2 V. Yalnız R = 30 Ω ideal ohmik direnç bağlı. Etkin akım ve ortalama güç?",
        "strategy": "Önce sinüsün RMS dönüşümünü yap.",
        "steps": [
          {
            "label": "Etkin gerilim",
            "explanation": "Vetkin = 120√2/√2 = 120 V."
          },
          {
            "label": "Akım",
            "explanation": "Ietkin = 120/30 = 4 A."
          },
          {
            "label": "Güç",
            "explanation": "P = Ietkin²R = 16 × 30 = 480 W."
          }
        ],
        "answer": "4 A; 480 W",
        "check": "Vetkin Ietkin = 120 × 4 aynı 480 W değeridir; faz sıfır.",
        "pitfall": "Tepe akımı ile etkin gerilimi karıştırıp √2 fazla güç bulmak."
      },
      {
        "title": "Rezonansta sıfır olmayan eleman gerilimleri",
        "prompt": "Seri devrede ω = 100 rad/s, L = 0,40 H, C = 250 μF, R = 30 Ω, sinüzoidal Vetkin = 60 V. Kararlı rejimde I ve VR, VL, VC?",
        "strategy": "Önce iki reaktansı karşılaştır.",
        "steps": [
          {
            "label": "Reaktans",
            "explanation": "XL = 100 × 0,40 = 40 Ω; XC = 1/(100 × 250 × 10⁻⁶) = 40 Ω."
          },
          {
            "label": "Akım",
            "explanation": "Z = R = 30 Ω; Ietkin = 60/30 = 2 A."
          },
          {
            "label": "Gerilimler",
            "explanation": "VR = 60 V, VL = 80 V, VC = 80 V; iki reaktif fazör birbirini götürür."
          }
        ],
        "answer": "I = 2 A; VR = 60, VL = VC = 80 V",
        "check": "Kaynak 60 V; 60 + 80 + 80 diye skaler toplam yapılmaz.",
        "pitfall": "Rezonansta L ve C gerilimlerini sıfır sanmak."
      },
      {
        "title": "Net reaktansın işareti",
        "prompt": "Seri RLC: ω = 100 rad/s, L = 0,50 H, C = 250 μF, R = 30 Ω ve Vetkin = 100 V. Kararlı rejimde Z, I ve faz türü?",
        "strategy": "L ve C farkını R ile dik topla.",
        "steps": [
          {
            "label": "Fark",
            "explanation": "XL = 50 Ω, XC = 40 Ω; Xnet = +10 Ω."
          },
          {
            "label": "Empedans",
            "explanation": "Z = √(30² + 10²) = 10√10 Ω."
          },
          {
            "label": "Akım ve faz",
            "explanation": "Ietkin = 100/(10√10) = √10 A; tan φ = 1/3, akım kaynak geriliminin gerisinde."
          }
        ],
        "answer": "Z = 10√10 Ω; I = √10 A; indüktif",
        "check": "P = I²R = 10 × 30 = 300 W.",
        "pitfall": "XL ile XC değerlerini toplayıp 90 Ω reaktans yazmak."
      },
      {
        "title": "İdeal sığacın güç yorumu",
        "prompt": "Yalnız ideal C = 100 μF, sinüzoidal ω = 200 rad/s ve Vetkin = 50 V kaynağa bağlı. Kararlı rejimde akım ve ortalama gerçek güç?",
        "strategy": "Reaktans ile fazı ayrı kullan.",
        "steps": [
          {
            "label": "Reaktans",
            "explanation": "XC = 1/(200 × 100 × 10⁻⁶) = 50 Ω."
          },
          {
            "label": "Akım",
            "explanation": "Ietkin = 50/50 = 1 A; akım gerilimden 90° öndedir."
          },
          {
            "label": "Güç",
            "explanation": "cos 90° = 0; bir periyot ortalama P = 0 W, enerji alanla kaynak arasında gidip gelir."
          }
        ],
        "answer": "1 A; ortalama 0 W",
        "check": "Anlık p(t) artı/eksi olabilir; sürekli sıfır olmak zorunda değildir.",
        "pitfall": "Vetkin Ietkin = 50 değerini koşulsuz 50 W ısı saymak."
      }
    ],
    "recall": [
      {
        "prompt": "Sinüzoidal RMS bağı?",
        "answer": "Tepe/√2; imzalı ortalama sıfır olması RMS’nin sıfır olduğu anlamına gelmez."
      },
      {
        "prompt": "İdeal sığaçta akımın fazı?",
        "answer": "i = C dv/dt; akım gerilimden 90° öndedir."
      },
      {
        "prompt": "Seri devrede Z?",
        "answer": "√(R² + (XL − XC)²); reaktif gerilimler fazörle toplanır."
      },
      {
        "prompt": "Rezonansta bobin gerilimi sıfır mı?",
        "answer": "Zorunlu değil; L ve C gerilimleri eşit-zıt olup kaynak toplamında götürebilir."
      }
    ],
    "items": [
      {
        "prompt": "Sinüzoidal gerilim v(t) = 120√2 sin(ωt) V. Kaynağın etkin gerilimi kaç volttur?",
        "hint": "Sinüste RMS = tepe/√2.",
        "explanation": "Tepe katsayısı 120√2 olduğundan etkin değer 120 V olur. İmzalı bir periyot ortalaması sıfırdır; sorulan RMS farklıdır.",
        "options": [
          "120√2 V",
          "60 V",
          "240 V",
          "0 V",
          "120 V"
        ],
        "answer": 4
      },
      {
        "prompt": "Sıfır ortalamalı saf sinüzoidal akımda bir tam periyot içinde pozitif maksimum ve |i| maksimumu kaç kez görülür?",
        "hint": "Negatif tepe, mutlak büyüklükte de maksimumdur.",
        "explanation": "Pozitif tepe bir, negatif tepe bir kez olur. |i| iki tepede de aynı en büyük değere ulaşır; pozitif maksimum iki kez olmaz.",
        "options": [
          "Sırasıyla 2 ve 2",
          "Sırasıyla 1 ve 2",
          "Sırasıyla 1 ve 1",
          "Sırasıyla 2 ve 1",
          "İkisi de 0"
        ],
        "answer": 1
      },
      {
        "prompt": "Sinüzoidal bir kaynak f = 50 Hz. Periyot T ve açısal frekans ω sırasıyla?",
        "hint": "T = 1/f, ω = 2πf.",
        "explanation": "1/50 = 0,020 s ve 2π × 50 = 100π rad/s bulunur. Hz ile rad/s aynı sayısal birim değildir.",
        "options": [
          "50 s ve 100π rad/s",
          "0,020 s ve 50 rad/s",
          "0,040 s ve 50π rad/s",
          "0,020 s ve 100π rad/s",
          "2 s ve 100 rad/s"
        ],
        "answer": 3
      },
      {
        "prompt": "Sinüzoidal kararlı seri R–L devresinde R = 30 Ω, XL = 40 Ω ve Vetkin = 100 V. Ietkin ve ortalama gerçek güç?",
        "hint": "Z = √(30² + 40²).",
        "explanation": "Z = 50 Ω, I = 2 A. Gerçek güç I²R = 4 × 30 = 120 W; V I = 200 VA görünür güçtür.",
        "options": [
          "2 A ve 120 W",
          "2 A ve 200 W",
          "100/70 A ve 120 W",
          "4 A ve 480 W",
          "0 A ve 0 W"
        ],
        "answer": 0
      },
      {
        "prompt": "Sabit L = 0,40 H ideal bobinde sinüzoidal açısal frekans ω = 100 rad/s. İndüktif reaktans?",
        "hint": "XL = ωL.",
        "explanation": "100 × 0,40 = 40 Ω. İndüktans henry birimlidir; frekanstan bağımsız ohmik direnç gibi alınmaz.",
        "options": [
          "0,004 Ω",
          "250 Ω",
          "40 Ω",
          "4 Ω",
          "0 Ω"
        ],
        "answer": 2
      },
      {
        "prompt": "İdeal C = 100 μF sığaçta sinüzoidal ω = 200 rad/s. Kapasitif reaktans?",
        "hint": "μF değerini farada çevir.",
        "explanation": "XC = 1/(200 × 100 × 10⁻⁶) = 50 Ω. C arttığında bu reaktans azalır; ωC çarpımının tersi alınır.",
        "options": [
          "2 Ω",
          "50 Ω",
          "500 Ω",
          "0,020 Ω",
          "200 Ω"
        ],
        "answer": 1
      },
      {
        "prompt": "Sinüzoidal seri R–L devresinde etkin VR = 60 V ve VL = 80 V. İdeal bobin, ohmik R ve ortak akım verilmiştir. Kaynak etkin gerilimi?",
        "hint": "VR ve VL birbirine dik fazörlerdir.",
        "explanation": "√(60² + 80²) = 100 V. Etkin büyüklükler fazı yok sayılarak 140 V diye toplanmaz.",
        "options": [
          "140 V",
          "20 V",
          "4.800 V",
          "70 V",
          "100 V"
        ],
        "answer": 4
      },
      {
        "prompt": "Sinüzoidal sabit Vetkin = 100 V kaynağa bağlı seri devrede R = 20 Ω, L = 0,50 H, C = 200 μF. ω = 100 rad/s kararlı rejimde akım?",
        "hint": "XL ile XC değerlerini karşılaştır.",
        "explanation": "XL = 50 Ω ve XC = 50 Ω; seri rezonans Z = R = 20 Ω verir. Ietkin = 100/20 = 5 A. R sıfır olmadığı için sonuç sonludur.",
        "options": [
          "1 A",
          "2,5 A",
          "5 A",
          "10 A",
          "0 A"
        ],
        "answer": 2
      },
      {
        "prompt": "Yalnız ideal sığaç sinüzoidal kaynağa bağlı ve kararlı rejimde. Akım ile sığaç geriliminin faz ilişkisi?",
        "hint": "i = C dvC/dt.",
        "explanation": "Sinüsün türevi kosinüstür; akım gerilimden çeyrek periyot öndedir. Gerilim ekstremumunda türev sıfırdır, dolayısıyla akım da sıfırdır.",
        "options": [
          "Akım gerilimden 90° öndedir",
          "Akım gerilimden 90° geridedir",
          "Daima aynı fazdadır",
          "Akım fazı tanımsızdır, çünkü daima sıfırdır",
          "Gerilim maksimumunda akım da maksimumdur"
        ],
        "answer": 0
      },
      {
        "prompt": "Yalnız ideal bobin sinüzoidal kaynağa bağlı; sargı direnci yok, kararlı rejim. Bir tam periyot ortalama gerçek güç için uygun yorum?",
        "hint": "Gerilim-akım faz farkı 90°.",
        "explanation": "Portalama = Vetkin Ietkin cos 90° = 0. Manyetik alanda depolanan enerji geri verilir; ideal bobinin ortalama ısı üretmemesi anlık güç ve akımın yokluğu değildir.",
        "options": [
          "Sıfır olduğu için hiçbir anda akım geçmez",
          "Vetkin Ietkin kadar pozitif ısıdır",
          "Enerji her periyotta yok olur",
          "Sıfırdır; anlık enerji alıp geri verebilir",
          "Her anda zorunlu negatif güçtür"
        ],
        "answer": 3
      }
    ]
  },
  {
    "id": "transformatorler",
    "topic": "detail-384",
    "title": "Transformatör: sarım oranından güç bilançosuna",
    "minutes": 105,
    "objectives": [
      "Ortak değişen akının iki sargıyı nasıl bağladığını açıkla.",
      "İdeal trafoda etkin gerilim, akım ve yükü birlikte hesapla.",
      "Verim, iletim kaybı ve doğru akım sınırını ayrı değerlendir."
    ],
    "source": "MEBİ AYT Fizik PDF 137–138 (basılı 135–136) ve OGM Dersler Cepte Alternatif Akım–Transformatör PDF 12 gerçek sargı ve iki-trafo şekilleri temel alınmıştır. Özgün öğretim, örnek ve sorular; resmî sınav sorusu değildir.",
    "sections": [
      {
        "title": "Birbirine değmeyen sargılar enerji aktarır",
        "paragraphs": [
          "Transformatörde giriş sargısı primer, çıkış sargısı sekonder adını alır. İki sargı elektriksel olarak birbirinden yalıtılmış olabilir, fakat aynı değişen manyetik akının büyük kısmını bağlayacak çekirdek düzeni bulunur. İletken telin bir sargıdan ötekine doğrudan devam etmesi gerekmez.",
          "Primerdeki AC, çekirdek akısını değiştirir; sekonderde Faraday yasasıyla emk oluşur. Enerji elektrik kaynağından alan aracılığıyla çıkış yüküne aktarılır. Çekirdeği bedelsiz enerji üreten bir pil veya sargıları mekanik dişli gibi düşünmek yerine ortak akı bağlantısını izle."
        ]
      },
      {
        "title": "Aynı akı değişimi, sarım başına aynı emk",
        "paragraphs": [
          "İdeal ortak akı modelinde εP = −NP dΦ/dt ve εS = −NS dΦ/dt olur. Aynı akı türevi oranlandığında emk büyüklükleri sarım sayıları oranına eşit çıkar. Kayıpsız ve sargı gerilim düşümleri ihmal edilmiş sinüzoidal rejimde etkin uç gerilimleri için VS/VP = NS/NP kullanılabilir.",
          "Gerilimlerin işaretli faz ilişkisi sarım yönleri ve uç işaretleriyle ilgilidir; yalnız sarım sayısı büyüklükleri bu yönü belirlemez. Burada oran soruları etkin büyüklüklerle yazılır. Kaynak frekansı sargı sayısı oranıyla çarpılmaz; uygun trafoda giriş ve çıkışın temel frekansı aynıdır."
        ]
      },
      {
        "title": "Yükseltici ve alçaltıcı hangi niceliğe göre?",
        "paragraphs": [
          "NS > NP ise çıkış etkin gerilimi daha büyüktür ve trafo gerilim yükselticidir. NS < NP ise gerilim alçaltıcıdır. NS = NP gerilim oranını bir yapar; uygun ayrı sargılı düzen elektriksel yalıtım amacıyla da kullanılabilir.",
          "Örneğin NP = 400 ve NS = 100 için oran 1/4’tür; 120 V giriş, ideal 30 V çıkış verir. Burada daha az çıkış gerilimi, girişten daha az enerji aktarımı zorunluluğu değildir. Akım ve güç için yük ile ideal/kayıplı model ayrıca bilinmelidir."
        ]
      },
      {
        "title": "İdeal güç, akımların ters oranını verir",
        "paragraphs": [
          "Kayıpsız, uygun kararlı ve dirençli yük koşulunda giriş aktif gücü çıkışa eşittir: VP IP = VS IS. Gerilim oranıyla birlikte IS/IP = NP/NS çıkar. Gerilim yükselten trafo aynı güç için akımı düşürür; gerilim ve akımı aynı anda aynı çarpanla büyüten kayıpsız aygıt değildir.",
          "Bu denklem yük altında güç aktarımını anlatır. Sekonderde aynı direnç korunup sarım oranı artırılırsa çıkış gerilimi, yük akımı ve çekilen güç artabilir; primerden gereken akım da değişir. “Akım ters orantılı” kuralı hangi iki sargının aynı anda karşılaştırıldığını belirtir; değişen yük deneyini eski güçle sabitlemez."
        ]
      },
      {
        "title": "Yük direncinden bütün akımlara git",
        "paragraphs": [
          "Sekonder uçlarında yalnız RY direnç varsa IS = VS/RY ve Pçıkış = VS²/RY bulunur. İdeal giriş akımı sonra IP = Pçıkış/VP ile hesaplanır. Bu sıra, çıkış akımını yalnız sarım sayısından bağımsız bir sayı sanmayı önler.",
          "NP = 400, NS = 100, VP = 120 V ve RY = 30 Ω örneğinde VS = 30 V, IS = 1 A, güç 30 W ve IP = 0,25 A olur. Aynı yükle NS iki kat yapılırsa VS iki, güç dört katına çıkabilir; bu ek enerji giriş kaynağından alınır."
        ]
      },
      {
        "title": "Gerçek trafonun verimi bir güç oranıdır",
        "paragraphs": [
          "Gerçek sargılarda ısınma, çekirdekte histerezis ve girdap akımı gibi kayıplar olabilir. Verim η = Pçıkış/Pgiriş ile tanımlanır. Pozitif giriş gücünde uygun pasif aygıt için 0 ≤ η ≤ 1 olur; çıkış gücü sıfırsa η = 0 olabilir. İdeal yüklü modelde η = 1, kayıplı ve pozitif çıkışlı modelde 0 < η < 1 olur. Kayıp güç Pgiriş − Pçıkış’tır.",
          "Örneğin 500 W girişten 400 W çıkış alınırsa verim %80 ve kayıp 100 W olur. Verim bilindi diye bütün gerilim düşümlerinin tek bir sayı ile sarım oranına uygulanacağı sonucu çıkmaz; gerçek eşdeğer devre daha çok veri isteyebilir. İdeal sarım oranı ile kayıplı güç bilançosunun varsayımlarını ayrı tut."
        ]
      },
      {
        "title": "Doğru akımda kararlı ve geçici durum",
        "paragraphs": [
          "Sabit DC son durumda sabit manyetik akı varsa dΦ/dt sıfırdır; bu ortak akıdan sürekli sekonder emk’si oluşmaz. Kaynağı açma veya kapama sırasında akı değişebileceğinden kısa bir geçici etki mümkündür. “DC ile hiçbir anda hiçbir etki olmaz” yorumu fazla geneldir.",
          "Primerin gerçek DC akımı sargı direnci, çekirdek ve geçici koşullara bağlıdır; ideal AC gerilim oranından türetilmez. Modelde DC seçimi AC hesap panelini kapatır ve bu rejim sınırını söyler. Sonuç boşluğunu sıfır primer akımı veya sonsuz akım gibi sahte bir hesapla doldurmaz."
        ]
      },
      {
        "title": "Boşta gerilim ile yükte güç aynı şey değildir",
        "paragraphs": [
          "İdeal magnetizasyon akımı ihmal edilen trafoda açık sekonderde akım yokken uç gerilimi oranı yine tanımlanabilir. Yük akımı sıfır olduğundan çıkış aktif gücü de sıfırdır. Gerçek trafoda çekirdeği mıknatıslayan ve kayıpları karşılayan küçük bir giriş akımı bulunabilir.",
          "Bu nedenle ölçülen boşta giriş akımını her durumda sıfır sanma. Ayrıca çıkış geriliminin varlığından yükte otomatik belirli güç aktığı sonucu çıkmaz. Öğretim yük modelinde seçili sonlu RY verilir; boşta özel hâl ayrı açıklanır."
        ]
      },
      {
        "title": "İletimde yüksek gerilim kaybı neden azaltır?",
        "paragraphs": [
          "Güç faktörü bir olan ve belirli P = V I gücü taşınan basit hat hesabında V artırılınca gereken I azalır. Hattın toplam ohmik direnci Rhat ise ısıl kayıp I²Rhat olur. Gerilimi iki katına çıkarıp aynı P’yi korumak akımı yarıya ve bu kaybı dörtte bire indirebilir.",
          "Sonuç güç ve hat koşulu sabitlenmiş kıyas içindir; her şebekede yalnız gerilim düğmesine basılarak aynı oranlar elde edilmez. İletim, yalıtım, dönüştürücü ve yük koşulları birlikte tasarlanır. AC trafonun gerilim değiştirme kolaylığı tarihsel olarak yararlıdır; bu, modern yüksek gerilim DC iletiminin hiç avantajı olmadığı iddiası değildir."
        ]
      },
      {
        "title": "Ardışık iki trafonun oranlarını çarp",
        "paragraphs": [
          "İki ayrı ideal trafo uygun AC ile ardışık bağlanmışsa ikinci giriş birinci çıkıştır. Son gerilim büyüklüğü ilk giriş ile her kademenin NS/NP oranının çarpımıdır. Her aşamada aynı frekansta uygun rejim ve yük uyumu varsayılır.",
          "Örneğin önce 3 kat yükseltip sonra 1/6’ya düşürmek toplamda 1/2 oran verir. Sarım sayılarını farklı çekirdekler arasında doğrudan karşılaştırmak yerine her çekirdeğin kendi oranını yaz. Verimler verilmişse toplam verim de uygun güç akışında çarpılır; iki %80 verim %160 değil %64 olur."
        ]
      },
      {
        "title": "Sarım, çekirdek ve frekansın gerçek sınırları",
        "paragraphs": [
          "İdeal model ortak akının tamamını iki sargının bağladığını ve bakır/çekirdek kayıplarının sıfır olduğunu varsayar. Gerçekte kaçak akı, sargı düşümü, ısınma ve çekirdek doyumu performansı etkileyebilir. Seçili sinüzoidal frekans ve gerilim aralığı aygıtın tasarım koşuludur.",
          "Bir trafoyu farklı frekansta aynı gerilimle kullanmanın akı ve kayıpları değiştirebileceğini bilmek, sarım oranının tek başına her şeyi garanti etmediğini gösterir. Uygulama bir devre kurma veya cihaz güvenliği onayı vermez; kayıpsız teorik ilişkiyi açık sayılarla öğretir."
        ]
      },
      {
        "title": "Oranla birlikte enerji kanıtını denetle",
        "paragraphs": [
          "Modelde giriş gerilimi, iki sarım sayısı ve direnç yükü ayrı seçilir. Primer ile sekonder telleri birbirine değmeden çizilir; çekirdek bağını tel bağlantısı gibi yanlış çizgilerle göstermez. Gerilim, yük akımı, giriş akımı ve güç tek aynı hesap zincirinden çıkar.",
          "Önce yükseltici veya alçaltıcı olduğunu tahmin et; sonra VS/VP ve VP IP = VS IS eşitliklerini birlikte denetle. Bir oranı doğru kurup gücü iki kat yaratıyorsan hesap tamamlanmamıştır. Model keşfi ayrı saklanır, doğru cevap veya bitmiş konu kaydı üretmez."
        ]
      }
    ],
    "examples": [
      {
        "title": "Alçaltıcı ve direnç yükü",
        "prompt": "İdeal AC trafoda NP = 400, NS = 100, VP = 120 V etkin. Sekonderde yalnız 30 Ω direnç var. VS, IS, IP ve güç?",
        "strategy": "Sarım oranını, sonra yükü kullan.",
        "steps": [
          {
            "label": "Gerilim",
            "explanation": "VS = 120 × 100/400 = 30 V."
          },
          {
            "label": "Yük",
            "explanation": "IS = 30/30 = 1 A; Pçıkış = 30 W."
          },
          {
            "label": "Giriş",
            "explanation": "İdeal Pgiriş = 30 W; IP = 30/120 = 0,25 A."
          }
        ],
        "answer": "30 V; 1 A; 0,25 A; 30 W",
        "check": "Gerilim dörtte bire, aynı anda akımlar oranı çıkış/giriş dört olur.",
        "pitfall": "İdeal giriş akımını çıkışın aynısı yazıp güç yaratmak."
      },
      {
        "title": "Yükseltici aynı gücü paylaşır",
        "prompt": "İdeal AC trafoda NP = 200, NS = 1000, VP = 20 V etkin; yük 100 Ω saf direnç. VS ve iki akım?",
        "strategy": "Yükselen gerilimin yük gücünü de hesapla.",
        "steps": [
          {
            "label": "Oran",
            "explanation": "NS/NP = 5; VS = 100 V."
          },
          {
            "label": "Çıkış",
            "explanation": "IS = 100/100 = 1 A; Pçıkış = 100 W."
          },
          {
            "label": "Giriş",
            "explanation": "IP = 100/20 = 5 A; iki sargının gücü 100 W."
          }
        ],
        "answer": "VS = 100 V; IS = 1 A; IP = 5 A",
        "check": "IS/IP = 1/5 = NP/NS.",
        "pitfall": "Çıkış gerilimi yükseldi diye çıkış akımını da 5 A yapmak."
      },
      {
        "title": "Verim ile kaybı ayrı bul",
        "prompt": "Gerçek bir trafonun ölçülen giriş aktif gücü 500 W, çıkış aktif gücü 400 W. Başka enerji depolanması yok, kararlı rejim. Verim ve kayıp güç?",
        "strategy": "Alınan gücü verilen güce böl.",
        "steps": [
          {
            "label": "Oran",
            "explanation": "η = Pçıkış/Pgiriş = 400/500 = 0,80."
          },
          {
            "label": "Yüzde",
            "explanation": "0,80 × 100 = %80."
          },
          {
            "label": "Kayıp",
            "explanation": "Pkayıp = 500 − 400 = 100 W."
          }
        ],
        "answer": "%80; 100 W",
        "check": "400 W çıkış + 100 W kayıp = 500 W giriş.",
        "pitfall": "Verimi giriş/çıkış yazıp %125 bulmak."
      },
      {
        "title": "Aynı hat gücünde iki gerilim",
        "prompt": "İki ayrı kuramsal hat koşulunda P = V I = 10.000 W ve güç faktörü 1 veriliyor. Toplam Rhat = 2 Ω aynı. V = 1.000 V ve 2.000 V için I²R kayıpları?",
        "strategy": "Her koşulun akımını kendi gerilimiyle bul.",
        "steps": [
          {
            "label": "İlk",
            "explanation": "I₁ = 10.000/1.000 = 10 A; kayıp 10² × 2 = 200 W."
          },
          {
            "label": "İkinci",
            "explanation": "I₂ = 10.000/2.000 = 5 A; kayıp 5² × 2 = 50 W."
          },
          {
            "label": "Oran",
            "explanation": "Gerilim iki kat, akım yarı ve kayıp dörtte bir."
          }
        ],
        "answer": "200 W ve 50 W",
        "check": "Karşılaştırmada verilen güç ve hat direnci korunmuştur.",
        "pitfall": "P = V I sabit koşulunu bırakıp iki akımı aynı almak."
      }
    ],
    "recall": [
      {
        "prompt": "Trafo sargıları neden temas etmeden çalışır?",
        "answer": "Aynı değişen akıyı bağlarlar; indüksiyon elektriksel tel devamı gerektirmez."
      },
      {
        "prompt": "İdeal gerilim oranı?",
        "answer": "VS/VP = NS/NP; uygun AC ortak akı ve ihmal edilen kayıplar."
      },
      {
        "prompt": "İdeal akım oranı hangi bilanço?",
        "answer": "Dirençli yüklü rejimde VP IP = VS IS; güç kayıpsız aktarılır."
      },
      {
        "prompt": "Sabit DC son durumda sekonder?",
        "answer": "Sabit ortak akıdan sürekli emk oluşmaz; açma/kapama geçicisi ayrı."
      }
    ],
    "items": [
      {
        "prompt": "İdeal AC trafoda NP = 500, NS = 100 ve VP = 200 V etkin. Sekonder etkin gerilimi?",
        "hint": "VS/VP = NS/NP.",
        "explanation": "VS = 200 × 100/500 = 40 V. Sekonder sarımı daha az olduğu için gerilim alçalır.",
        "options": [
          "40 V",
          "1.000 V",
          "100 V",
          "400 V",
          "0 V"
        ],
        "answer": 0
      },
      {
        "prompt": "İdeal, direnç yükü altında trafoda VP = 100 V, VS = 20 V ve IS = 3 A etkin. Primer etkin akımı?",
        "hint": "Giriş ve çıkış aktif gücü eşit.",
        "explanation": "Pçıkış = 20 × 3 = 60 W; IP = 60/100 = 0,60 A. İdeal iki sargı aynı gücü aktarır; akımlar aynı olmak zorunda değildir.",
        "options": [
          "15 A",
          "3 A",
          "1,5 A",
          "0,06 A",
          "0,60 A"
        ],
        "answer": 4
      },
      {
        "prompt": "Aynı ortak değişen akıyı bağlayan ideal trafoda NS = 3NP. Hangi etkin büyüklük oranı uygundur?",
        "hint": "Faraday emk’si sarımla çarpılır.",
        "explanation": "Gerilim oranı NS/NP = 3 olur. Yüklü ideal güç bilançosunda IS = IP/3; frekans ve güç sarım oranıyla aynı yönde büyümez.",
        "options": [
          "VS = VP/3",
          "IS = 3IP her yükte aynı anda",
          "VS = 3VP",
          "Çıkış temel frekansı 3 kat",
          "Çıkış gücü girişin 3 katı"
        ],
        "answer": 2
      },
      {
        "prompt": "Gerçek trafoda giriş aktif gücü 250 W, çıkış aktif gücü 200 W. Kararlı rejimde verim?",
        "hint": "η = çıkış/giriş.",
        "explanation": "200/250 = 0,80; yüzde olarak %80. Aradaki 50 W kayıptır; giriş/çıkış oranı verim değildir.",
        "options": [
          "%125",
          "%50",
          "%20",
          "%80",
          "%100"
        ],
        "answer": 3
      },
      {
        "prompt": "Primer ve sekonder sargıları ayrı yalıtılmış ideal AC trafoda enerji aktarımını en iyi hangi bağ açıklar?",
        "hint": "Sekonder emk’si −NS dΦ/dt.",
        "explanation": "Ortak akı zamanla değiştiğinde sargıda emk oluşur. Doğrudan metal bağlantı gerektirmez; enerji primer kaynağından alınır.",
        "options": [
          "Primer elektronlarının zorunlu sekondere atlaması",
          "İki sargıyı bağlayan değişen manyetik akı",
          "Çekirdeğin yoktan elektrik enerjisi üretmesi",
          "İki sarım arasında mekanik dişli teması",
          "Sabit akının her anda Faraday emk’si üretmesi"
        ],
        "answer": 1
      },
      {
        "prompt": "Trafo çekirdeğindeki ortak akı, DC geçicileri bittikten sonra sabit kabul ediliyor. Bu sabit akıdan sekonderde indüklenen sürekli emk?",
        "hint": "dΦ/dt = 0.",
        "explanation": "Faraday emk’si değişim hızına bağlıdır. Sabit akı sürekli sekonder emk’si üretmez; primerin gerçek DC akımı bu soruda hesaplanmış değildir.",
        "options": [
          "Sarım oranı kadar artan sabit emk",
          "Sonsuz volt",
          "0 V",
          "Mutlaka primer pil geriliminin aynısı",
          "Her saniye iki kat olan emk"
        ],
        "answer": 2
      },
      {
        "prompt": "Saf direnç yükü 20 Ω olan ideal AC trafonun etkin çıkış gerilimi 60 V, giriş gerilimi 120 V. IP ve çıkış gücü?",
        "hint": "Önce IS = VS/R.",
        "explanation": "IS = 60/20 = 3 A; Pçıkış = 180 W. Kayıpsız primer IP = 180/120 = 1,5 A verir.",
        "options": [
          "1,5 A ve 180 W",
          "3 A ve 360 W",
          "0,75 A ve 90 W",
          "6 A ve 180 W",
          "1,5 A ve 90 W"
        ],
        "answer": 0
      },
      {
        "prompt": "P = V I gücü ve toplam hat direnci sabit, güç faktörü 1. Hat gerilimi 2 katına çıkarılıyor. I²R kaybı yeni/eski oranı?",
        "hint": "Akım yarıya iner, karesi dörtte bire.",
        "explanation": "Aynı P için I = P/V; iki kat gerilim I’yi yarıya düşürür. Aynı hat direncinde kayıp (I/2)²R olduğundan oran 1/4 olur.",
        "options": [
          "1/2",
          "1/4",
          "2",
          "4",
          "1"
        ],
        "answer": 1
      },
      {
        "prompt": "Uygun AC rejimindeki ardışık iki ideal trafonun gerilim oranları 3 ve 1/6. İlk giriş 120 V etkin. Son çıkış?",
        "hint": "Her kademenin oranını çarp.",
        "explanation": "Toplam oran 3 × 1/6 = 1/2; 120 × 1/2 = 60 V. Ayrı çekirdeklerin sarımlarını tek oranmış gibi rastgele eşleştirme.",
        "options": [
          "240 V",
          "20 V",
          "360 V",
          "60 V",
          "720 V"
        ],
        "answer": 3
      },
      {
        "prompt": "İdeal trafoda sekonder açık; mıknatıslama akımı ve tüm kayıplar bu özel modelde ihmal ediliyor. Uygun AC ortak akı var. Hangi yorum uygundur?",
        "hint": "Gerilim ve kapalı devre yük akımı farklıdır.",
        "explanation": "İdeal açık sekonder gerilimi indüksiyonla oluşabilir, fakat çıkıştan akım çekilmez. Gerçek boşta mıknatıslama/kayıp akımı özel modelde ihmal edilmiş; bütün gerçek aygıtlara genellenmemiştir.",
        "options": [
          "Sekonder açıksa gerilim de mutlaka sıfırdır",
          "Açık yükte sonlu akım ve bedelsiz güç zorunludur",
          "Açık devrede sarım sayısı yok olur",
          "Gerçek bütün trafoların boşta primer akımı kesin sıfırdır",
          "Sekonder uç gerilimi olabilir; yük akımı ve çıkış gücü sıfırdır"
        ],
        "answer": 4
      }
    ]
  },
  {
    "id": "cembersel-hareket",
    "topic": "detail-385",
    "title": "Çembersel hareket: teğet hız, içe ivme ve kuvvet sınırı",
    "minutes": 140,
    "objectives": [
      "Periyot, frekans, radyan ve çizgisel hızı aynı hareketten hesapla.",
      "Hız ve radyal ivme vektörlerini gerçek konumda ayır.",
      "İp, statik sürtünme, eğimli yol ve silindir koşullarını kuvvet bilançosuyla kur."
    ],
    "source": "MEBİ AYT Fizik PDF 139–155 (basılı 137–153), OGM Dersler Cepte Düzgün Çembersel Hareket PDF 10–14 ve 12. sınıf 001 özeti gerçek anlatım/şekilleri temel alınmıştır. Özgün örnekler ve sorular koşullu ideal modellerdir; resmî sınav sorusu değildir.",
    "sections": [
      {
        "title": "Düzgün olan yön değil sürattir",
        "paragraphs": [
          "Bir cismin sabit merkezden aynı uzaklıkta daire boyunca hareket etmesi çembersel harekettir. Sürat her anda aynıysa hareket düzgün çemberseldir; hız vektörü ise sürekli yön değiştirdiği için sabit değildir. Sabit sürat, sıfır ivme anlamına gelmez.",
          "Dönen bir disk üzerindeki işaret veya yatay ip ucundaki cisim bu düşünceyi görünür yapar. Sabit yarıçap tek başına sabit sürat garantisi değildir; hızlanarak dönen cisim de çember izleyebilir. Önce yörüngenin biçimini, sonra hızın büyüklüğünü ve yönünü ayrı tanımla."
        ]
      },
      {
        "title": "Bir tam turdan periyot ve frekansa",
        "paragraphs": [
          "Periyot T bir tam dönüşün süresidir ve saniye birimindedir. Frekans f, saniyedeki tam dönüş sayısıdır; Hz veya s⁻¹ ile verilir. Düzenli tekrarda T f = 1 olur. Dakikada devir sayısı verilmişse Hz için 60’a bölünür.",
          "Örneğin dakikada 120 tur, 2 Hz ve T = 0,50 s demektir. Yelkovanın periyodu 3600 s, akrebin 12 saattir; bunlar kendi dönüş örnekleridir. Bir turdaki başlangıç ve bitişi iki ayrı dönüş diye sayıp frekansı bir fazla hesaplama."
        ]
      },
      {
        "title": "Radyanla yay uzunluğunu birbirine bağla",
        "paragraphs": [
          "Radyan cinsinden θ açısına karşılık gelen yay uzunluğu s = rθ olur. Tam tur 2π rad, yarım tur π rad ve 90° çeyrek tur π/2 rad’dır. Dereceyle verilen 90 sayısını doğrudan rθ bağıntısına koymak uzunluğu hatalı büyütür.",
          "Yay uzunluğu alınan yoldur; iki konum arasındaki düz kiriş yer değiştirme büyüklüğüdür. Tam turda yol 2πr iken yer değiştirme sıfırdır. Bu nedenle tam tur ortalama hız sıfır olabilirken ortalama sürat sıfır değildir."
        ]
      },
      {
        "title": "Çizgisel sürat ve açısal sürat",
        "paragraphs": [
          "Düzgün harekette v = 2πr/T = 2πrf olur. Açısal sürat |ω| = 2π/T = 2πf ve v = |ω|r ile bağlanır. v metre/saniye, ω rad/s birimindedir. Birim zamanda açısal değişim ile birim zamanda alınan yol farklı büyüklüklerdir.",
          "Aynı rijit diskteki noktalar aynı ω ve T ile döner, fakat merkeze uzak nokta daha çok yol alır ve daha büyük v taşır. Tersine kaymadan temas eden farklı yarıçaplı kasnakların temas süratleri eşit olabilirken açısal süratleri farklıdır; hangi kısıtın verildiğini seç."
        ]
      },
      {
        "title": "Hız oku daireye teğet çizilir",
        "paragraphs": [
          "Konum vektörü merkezden cisme yönelir. Sabit yarıçapta hız vektörü bu vektöre diktir ve o noktada daireye teğettir. Saatin tersine dönmede sağ uçtaki hız yukarı, üst noktadaki hız sola yönelir; aynı “yukarı” oku bütün daire boyunca kopyalanamaz.",
          "Açısal hız vektörü dönme düzlemine diktir; sağ el parmakları dönme yönünü izlerken baş yönü ω eksenini verir. Sayfada saatin tersi dönüş +z, saat yönü −z olarak gösterilebilir. Yarıçap yönü ile açısal hız yönünü aynı okla temsil etme."
        ]
      },
      {
        "title": "İvme içe bakar, büyüklüğü sabit olabilir",
        "paragraphs": [
          "Kısa sürede hız yönü değiştiğinde Δv sıfır olmaz. Anlık sınırda merkezcil ivme büyüklüğü a = v²/r = ω²r elde edilir; vektörü merkeze doğrudur. Büyüklüğü sabit kalan ivmenin yönü döner, dolayısıyla ivme vektörü sabit değildir.",
          "Sonlu iki anın Δv/Δt oranı ortalama ivmedir; geniş bir tur aralığı için doğrudan her noktadaki v²/r vektörüyle eşitlenmez. Özellikle tam turda Δv sıfır, ortalama ivme sıfırdır; buna rağmen bütün ara anlarda içe ivme vardır."
        ]
      },
      {
        "title": "Merkezcil yeni bir üçüncü kuvvet değildir",
        "paragraphs": [
          "Newton yasasıyla radyal net kuvvet m v²/r olur. Bu ihtiyaç gerilme, sürtünme, normal, kütle çekim veya başka gerçek kuvvetlerin uygun bileşenleriyle sağlanabilir. Serbest cisim çiziminde gerçek kuvvetleri çizip sonra bunlara bir de bağımsız “merkezcil kuvvet” eklemek aynı etkiyi iki kez sayar.",
          "Düzgün yatay çemberde net kuvvet hıza dik olduğundan kinetik enerji değişmez. Sürat de değişiyorsa net kuvvetin teğetsel bileşeni bulunabilir; radyal m v²/r kuralı sürer fakat tüm net kuvvet yalnız radyal değildir. “Net kuvvet = merkezcil” cümlesinin düzgün hareket koşulunu koru."
        ]
      },
      {
        "title": "Yatay ipte ağırlık ve normal ayrı dengelenir",
        "paragraphs": [
          "Sürtünmesiz yatay zeminde merkeze bağlı ipin gerilmesi yatay içe kuvvet sağlayabilir. Düşeyde ivme yoksa N = mg ve yatayda T = mv²/r olur. Ağırlık ve normal sıfır değildir; eşit-zıt olduklarından düşey toplam sıfırdır.",
          "İp kopunca yatayda başka kuvvet yoksa cisim o andaki teğet hız doğrultusunda gider. Merkezden dışarı doğru ani yeni bir gerçek itme gerekmez. Kopma anındaki konumu bilmeden teğetin yönünü yalnız sayfanın sağı diye belirleyemezsin."
        ]
      },
      {
        "title": "Statik sürtünme gereken kadar, en fazla sınıra kadar",
        "paragraphs": [
          "Yatay kaymayan bir cismi dairede tutan tek yatay kuvvet statik sürtünmeyse gereken değer mv²/r’dir. Bunun sağlayabileceği en büyük büyüklük μsN = μs mg olur. Koşul mv²/r ≤ μs mg; her anda eşitlik değil, eşitsizliktir.",
          "Böylece verilen ideal yatay modelde v ≤ √(μsgr) bulunur; kütle sadeleşir. Daha yavaş harekette sürtünme mutlaka en büyük μsN değerinde değildir. Gereken değer sınırı aşarsa bu modelde seçili çember sürdürülemez; cisim otomatik başka kusursuz çembere yerleşmiş gibi çizilmez."
        ]
      },
      {
        "title": "Aynı ipte iki cismin gerilmelerini ayır",
        "paragraphs": [
          "Sürtünmesiz yatay düzlemde merkezden farklı r₁, r₂ uzaklıklarda aynı ω ile dönen iki cisim, aynı ip üzerinde ardışık bağlanmış olabilir. Dış cismin yalnız içe T₂ gerilmesi varsa T₂ = m₂ω²r₂ olur. İç cisimde ise içe T₁ ile dışa T₂ birlikte bulunur.",
          "İç cismin radyal denklemi T₁ − T₂ = m₁ω²r₁’dir; T₁ = ω²(m₁r₁ + m₂r₂) çıkar. İki farklı ip parçasının gerilmesini tek sembole eşitlemek bu düzende doğru değildir. Aynı açısal hız, iki cismin aynı çizgisel süratte olduğu anlamına da gelmez."
        ]
      },
      {
        "title": "Konik sarkaçta gerilmenin iki işi vardır",
        "paragraphs": [
          "L boyunda ip düşeyle α açısı yaparak sabit yükseklikte dönen cisimde yarıçap r = L sin α olur. Gerilmenin düşey bileşeni T cos α = mg ile yüksekliği korur; yatay bileşeni T sin α = mv²/r ile içe ivme sağlar. Gerilmenin tamamını hem mg hem merkezcil kuvvet diye iki kez eşitleme.",
          "İki denklem bölünürse tan α = v²/(rg) elde edilir. Örneğin L = 2 m, sin α = 0,6 ve cos α = 0,8 ise r = 1,2 m, T = 1,25mg ve g = 10 için v² = 9 m²/s² olur. Yarıçap ipin tam boyu değildir."
        ]
      },
      {
        "title": "Düşey çemberde yer çekimi sürati değiştirebilir",
        "paragraphs": [
          "Yalnız ip ve yer çekimiyle düşey düzlemde dönen cisim genel olarak sabit süratli değildir; aşağı inerken potansiyel kinetiğe dönüşebilir. Alt noktada radyal denklem Talt − mg = mvalt²/r, üst noktada Tüst + mg = mvüst²/r olur. Her noktada kendi süratini kullan.",
          "Yan noktada ağırlık radyal doğrultuya dik olduğundan radyal toplam yalnız gerilme olabilir; fakat ağırlığın teğetsel etkisi toplam net kuvvetten silinmez. Düşeyde sabit sürat özellikle isteniyorsa yer çekiminin teğetsel katkısını dengeleyen ek sürücü belirtilmelidir. Pasif ipte üstte gevşememe için vüst² ≥ gr gerekir."
        ]
      },
      {
        "title": "Eğimli virajda normalin yatay bileşeni",
        "paragraphs": [
          "Sürtünme ihmal edilen ve yataya θ açıyla eğimli yol modelinde N cos θ = mg, N sin θ = mv²/r olur. Buradan v² = gr tan θ çıkar. Burada içe etkiyi sağlayan kuvvet normalin yatay bileşenidir; ayrı bir merkezcil ok eklenmez.",
          "Bu sürtünmesiz ideal model verilen r ve θ için belirli bir sürat ister; bu değerden küçük bütün süratler otomatik uygun değildir. Sürtünme varsa farklı bir aralık mümkün olabilir ve yönü yeni koşula göre bulunur. Çözüm önce gerçek normal yönünü ve düşey dengeyi çizmekle başlar."
        ]
      },
      {
        "title": "Dönen silindirde sınır bir alt sürattir",
        "paragraphs": [
          "İç duvara temas ederek yatay çemberde dönen cisimde normal N = mv²/r içe ivmeyi sağlar. Düşeyde aşağı mg ile yukarı statik sürtünme dengelenmelidir. Gereken sürtünme mg ve en büyük sürtünme μsN olduğundan mg ≤ μs mv²/r gerekir.",
          "μs > 0 için v ≥ √(gr/μs) bulunur; bu maksimum değil minimum sürat koşuludur. Hız arttıkça uygun ideal modelde duvar normali büyür ve ağırlığı tutabilecek sürtünme sınırı artar. Gerçek sürtünme kuvveti düşey dengede yine mg’dir; her anda μsN olduğu söylenmez."
        ]
      },
      {
        "title": "Hangi referans sistemindesin?",
        "paragraphs": [
          "Yerle yaklaşık eylemsiz kabul edilen çerçevede daireyi sürdüren net kuvvet içedir; serbest cisim çizimine gerçek bir dışa temas kuvveti eklenmez. Dönen araçla birlikte seçilen ivmeli çerçevede ise Newton denklemi uygun yapay eylemsizlik terimleriyle yazılabilir.",
          "Bu yüzden “merkezkaç hiçbir hesapta yoktur” ile “yer çerçevesinde gerçek bir ek kuvvettir” iki ayrı hatadır. Önce gözlemciyi ve eksenleri adlandır. Bizim etkileşimde merkez sabit, x–y üst görünüm ve yer çerçevesi kullanılır; düşey N ve mg dengesi HTML açıklamada ayrı verilir."
        ]
      },
      {
        "title": "Mümkün yörünge ile gereken kuvveti birlikte sınayalım",
        "paragraphs": [
          "Modelde yarıçap, sürat, kütle, μs ve konum açısı ayrı seçilir. Hız oku gerçek teğet yönünde, gereken ivme içe yönünde ve sayısal kuvvet aynı bileşenlerden çıkar. Talep sürtünme sınırını aşarsa çizgi olası bir yol gibi kesikli kalır; kusursuz dairesel hareket animasyonu başarı diye oynatılmaz.",
          "Önce sürati iki kat yapınca gereken kuvvetin dört kat olacağını tahmin et; sonra mv²/r ile μs mg’yi kıyasla. Mümkün durumda konum açısının seçtiği süre T ile tutarlıdır. Bu gösterim yalnız verilen ideal koşulları sınar; keşif kaydı puan veya bitmiş konu kaydı değildir."
        ]
      }
    ],
    "examples": [
      {
        "title": "Bir turdan ivmeye",
        "prompt": "Yarıçapı 4 m dairesel pistte düzgün hareketin periyodu 4 s. Bu özgün hesapta π = 3 alınacak. Sürat ve merkezcil ivme?",
        "strategy": "Önce çevre ve tur süresini kullan.",
        "steps": [
          {
            "label": "Yol",
            "explanation": "Bir tur 2πr = 2 × 3 × 4 = 24 m."
          },
          {
            "label": "Sürat",
            "explanation": "v = 24/4 = 6 m/s."
          },
          {
            "label": "İvme",
            "explanation": "a = v²/r = 36/4 = 9 m/s²; yön merkeze."
          }
        ],
        "answer": "6 m/s; 9 m/s²",
        "check": "ω = 2π/T = 1,5 rad/s ve ω²r = 9 aynı sonucu verir.",
        "pitfall": "Tam tur yer değiştirmesi sıfır diye anlık ivmeyi de sıfır sanmak."
      },
      {
        "title": "Statik sürtünmenin tam sınırı",
        "prompt": "Yatay modelde m = 2 kg, r = 5 m, v = 5 m/s, μs = 0,50 ve g = 10 m/s². Düşey N = mg, tek yatay kuvvet statik sürtünme. Daire mümkün mü?",
        "strategy": "Gereken kuvveti en büyük olası değerle kıyasla.",
        "steps": [
          {
            "label": "Gereken",
            "explanation": "Fgereken = mv²/r = 2 × 25/5 = 10 N."
          },
          {
            "label": "Sınır",
            "explanation": "N = 20 N; Fsmax = μsN = 10 N."
          },
          {
            "label": "Karar",
            "explanation": "Gereken sınırı aşmıyor, tam sınırda; v yükselirse aynı çember sürdürülemez."
          }
        ],
        "answer": "Tam sınırda mümkün; 10 N içe sürtünme",
        "check": "vmax = √(0,50 × 10 × 5) = 5 m/s.",
        "pitfall": "Statik sürtünmeyi her daha düşük süratte de 10 N almak."
      },
      {
        "title": "Konik sarkaçta yarıçapı bul",
        "prompt": "L = 2 m ip düşeyle α açısıyla, sabit yükseklikte dönüyor. sin α = 0,6, cos α = 0,8 ve g = 10 m/s². Sürat ve T/mg oranı?",
        "strategy": "Düşey ve yatay gerilmeyi ayrı kur.",
        "steps": [
          {
            "label": "Geometri",
            "explanation": "r = L sin α = 2 × 0,6 = 1,2 m."
          },
          {
            "label": "Düşey",
            "explanation": "T cos α = mg; T/mg = 1/0,8 = 1,25."
          },
          {
            "label": "Yatay",
            "explanation": "v² = rg tan α = 1,2 × 10 × 0,6/0,8 = 9; v = 3 m/s."
          }
        ],
        "answer": "v = 3 m/s; T/mg = 1,25",
        "check": "T sin α/m = 1,25 × 10 × 0,6 = 7,5 m/s²; v²/r = 7,5.",
        "pitfall": "r yerine ipin tam 2 m boyunu yazmak."
      },
      {
        "title": "Silindirde minimum sürati ayırt et",
        "prompt": "Dönen silindirin iç duvarına temas eden cismin yarıçapı 2 m; μs = 0,50, g = 10 m/s². Hava direnci yok; cisim düşeyde kaymadan dönmek istiyor. Gerekli en küçük sürat?",
        "strategy": "Duvar normali ile düşey sürtünmenin rollerini ayır.",
        "steps": [
          {
            "label": "Radyal",
            "explanation": "N = mv²/r."
          },
          {
            "label": "Düşey koşul",
            "explanation": "Gereken mg ≤ μsN = μs mv²/r."
          },
          {
            "label": "Sınır",
            "explanation": "v² ≥ gr/μs = 40; vmin = √40 ≈ 6,32 m/s."
          }
        ],
        "answer": "vmin = √40 m/s",
        "check": "Bu değerden küçük süratte maksimum sürtünme ağırlığa yetmez.",
        "pitfall": "Bu alt sınırı maksimum sürat diye adlandırmak."
      }
    ],
    "recall": [
      {
        "prompt": "Tam turda ortalama hız ve anlık sürat?",
        "answer": "Yer değiştirme sıfır; ortalama hız sıfır olabilir, anlık sürat korunur."
      },
      {
        "prompt": "Merkezcil kuvvet yeni bir kuvvet mi?",
        "answer": "Hayır; gerçek kuvvetlerin radyal net bileşeninin adıdır."
      },
      {
        "prompt": "Statik sürtünme her zaman μsN mi?",
        "answer": "Hayır; gereken kadar ve en fazla μsN. Sınırda eşitlik olur."
      },
      {
        "prompt": "Dönen silindirde √(gr/μs)?",
        "answer": "Uygun ideal kaymama koşulunun minimum süratidir, maksimum değil."
      }
    ],
    "items": [
      {
        "prompt": "Düzgün çembersel hareketin frekansı 2 Hz. Bir tam turun süresi?",
        "hint": "T f = 1.",
        "explanation": "T = 1/2 = 0,50 s. Frekans saniyedeki tur sayısıdır; süreyle aynı sayı değildir.",
        "options": [
          "2 s",
          "4 s",
          "0,25 s",
          "0,50 s",
          "1 s"
        ],
        "answer": 3
      },
      {
        "prompt": "Yarıçap 3 m ve açı π/2 rad. Başlangıçtan bu açıya kadar daire yayı boyunca alınan yol?",
        "hint": "s = rθ; açı zaten radyan.",
        "explanation": "s = 3 × π/2 = 3π/2 m. 3√2 m iki nokta arasındaki kiriş uzunluğudur, yay boyunca yol değildir.",
        "options": [
          "3/2 m",
          "6π m",
          "3π/2 m",
          "3√2 m",
          "0 m"
        ],
        "answer": 2
      },
      {
        "prompt": "Sabit eksende dönen rijit diskte A noktası merkezden r, B noktası 2r uzakta. ω sabit ve sıfır değil. vB/vA ile periyot oranı TB/TA?",
        "hint": "Aynı disk aynı ω ile döner.",
        "explanation": "v = |ω|r olduğundan sürat oranı 2’dir. Aynı açısal hız nedeniyle iki noktanın tur süresi aynıdır; periyot oranı 1 olur.",
        "options": [
          "1 ve 2",
          "2 ve 1",
          "2 ve 2",
          "1/2 ve 1",
          "4 ve 2"
        ],
        "answer": 1
      },
      {
        "prompt": "Yer çerçevesinde düzgün çembersel hareket yapan cismin yarıçapı 2 m, sürati 4 m/s. Anlık ivme büyüklüğü ve yönü?",
        "hint": "a = v²/r.",
        "explanation": "4²/2 = 8 m/s². Sürat sabitken hızın yönü değişir; ivme teğet değil radyal içe yönelir.",
        "options": [
          "0 m/s², yönsüz",
          "2 m/s², teğet",
          "8 m/s², dışarı",
          "4 m/s², hıza paralel",
          "8 m/s², merkeze"
        ],
        "answer": 4
      },
      {
        "prompt": "Üstten bakılan x–y çemberinde cisim saatin tersine dönüyor. Sağ uç konumu (r; 0), r > 0. Hız ve merkezcil ivme yönleri?",
        "hint": "Hız teğet; ivme merkeze.",
        "explanation": "Sağ uçta saatin tersi teğet yukarıdır (+y); merkez solda olduğundan ivme −x yönündedir. İki ok farklı doğrultudadır.",
        "options": [
          "Hız +y, ivme −x",
          "Hız +x, ivme +y",
          "Hız −y, ivme +x",
          "Hız +y, ivme +x",
          "Hız −x, ivme −y"
        ],
        "answer": 0
      },
      {
        "prompt": "Yatay daireyi yalnız statik sürtünme sağlıyor. μs = 0,40, r = 10 m ve g = 10 m/s². Düşey N = mg. Modelin en büyük kaymama sürati?",
        "hint": "mv²/r ≤ μsmg.",
        "explanation": "vmax² = μsgr = 0,40 × 10 × 10 = 40. Kütle sadeleşir; sonuç √40 m/s olur. Gerçek sürtünme sınırın altında gereken değerdir.",
        "options": [
          "40 m/s",
          "√40 m/s",
          "√10 m/s",
          "4 m/s",
          "10 m/s"
        ],
        "answer": 1
      },
      {
        "prompt": "Sürtünmesiz yatay zeminde ip ucunda daire çizen cismin ipi kopuyor. Kopma sonrasında yatayda başka kuvvet yok. İlk devam yönü?",
        "hint": "Yatay net kuvvet kalkar, mevcut hız korunur.",
        "explanation": "İp gerilmesi kalkınca dışa yeni bir itme gerekmez; cisim o andaki teğet hızla doğru hareket eder. Teğetin yönü kopma konumuna bağlıdır.",
        "options": [
          "Merkezden dışarı radyal",
          "Merkeze doğru radyal",
          "Kopmadan önceki merkezcil ivme yönü",
          "O andaki hızın teğet doğrultusu",
          "Her konumda zorunlu sayfanın sağı"
        ],
        "answer": 3
      },
      {
        "prompt": "L = 5 m konik sarkaçta ip düşeyle α açısı yapıyor; sin α = 0,6, cos α = 0,8. Sabit yükseklikte düzgün dönüş ve g = 10 m/s². Yörünge yarıçapı?",
        "hint": "r = L sin α.",
        "explanation": "r = 5 × 0,6 = 3 m. Düşey iz düşüm 4 m’dir; yarıçap ip boyu veya düşey iz düşüm değildir.",
        "options": [
          "3 m",
          "5 m",
          "4 m",
          "8 m",
          "5/0,6 m"
        ],
        "answer": 0
      },
      {
        "prompt": "Yalnız ip ve yer çekimi altında düşey çemberin en üst noktasında m = 2 kg cisim v = 5 m/s ile geçiyor. r = 1 m, g = 10 m/s²; ip gergin. O andaki gerilme büyüklüğü?",
        "hint": "Üstte mg ve T birlikte içe.",
        "explanation": "T + mg = mv²/r; T = 2 × 25 − 20 = 30 N. Alt noktadaki T − mg denklemi burada kullanılmaz; sürat bu noktaya ait verilmiştir.",
        "options": [
          "50 N",
          "70 N",
          "20 N",
          "0 N",
          "30 N"
        ],
        "answer": 4
      },
      {
        "prompt": "Dönen silindir iç duvarında düşeyde kaymadan kalmak isteniyor. r = 2 m, μs = 0,50, g = 10 m/s². N = mv²/r ve tek düşey destek statik sürtünme. Hangi sürat koşulu doğru?",
        "hint": "mg ≤ μsN.",
        "explanation": "mg ≤ μs mv²/r eşitsizliğinden v² ≥ gr/μs = 40 çıkar. Bu alt sınırdır; sürat arttıkça normal ve sağlayabilecek en büyük sürtünme artar.",
        "options": [
          "v ≤ √40 m/s",
          "v = 0 her zaman yeter",
          "v ≥ √40 m/s",
          "v ≥ √10 m/s",
          "Kütle iki kat olursa eşik sürat iki kat"
        ],
        "answer": 2
      }
    ]
  }
];
export const forge020PhysicsTopics:Record<string,string>=Object.fromEntries(packs020.map(p=>[p.id,p.topic]));
export const forge020PhysicsGuides:LessonGuide[]=packs020.map(p=>({id:p.id,minutes:p.minutes,objectives:p.objectives,sections:p.sections,examples:p.examples,recall:p.recall,source:p.source}));
export const forge020PhysicsLessons:Lesson[]=packs020.map(p=>({id:p.id,subjectId:"ayt-fizik",title:txt(p.title),minutes:p.minutes,objectives:p.objectives.map(txt),body:p.sections.map(s=>({title:txt(s.title),text:txt(s.paragraphs.join("\n\n"))})),source:txt(p.source),tags:[p.topic,"Özgün öğretim soruları"],questions:p.items.map((q,i)=>({id:`f020-${p.id}-${i+1}`,prompt:txt(q.prompt),options:q.options.map(txt),answer:q.answer,hint:txt(q.hint),explanation:txt(q.explanation),skill:p.id}))}));
