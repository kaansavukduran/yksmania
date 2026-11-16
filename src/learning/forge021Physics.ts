import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";

const in021 = (n: number, lo: number, hi: number) => Number.isFinite(n) && n >= lo && n <= hi;
const z021 = (n: number) => Object.is(n, -0) ? 0 : n;
export type Point021 = { x: number; y: number };
export type Body021 = "disk" | "hoop" | "sphere";

/** Prescribed constant CM velocity and angular velocity, not a frictional slip evolution. +omega is counterclockwise. */
export function rolling021(mass: number, radius: number, velocity: number, omega: number, body: Body021, time: number, initialDegrees: number) {
  if (!in021(mass, .1, 100) || !in021(radius, .05, 5) || !in021(velocity, -10, 10) || !in021(omega, -200, 200) || !["disk", "hoop", "sphere"].includes(body) || !in021(time, 0, 10) || !in021(initialDegrees, 0, 360)) throw new RangeError("ROLLING021_SCOPE");
  const coefficient = body === "disk" ? .5 : body === "sphere" ? .4 : 1;
  const inertia = coefficient * mass * radius * radius, theta = initialDegrees * Math.PI / 180 + omega * time;
  const relative = { x: radius * Math.cos(theta), y: radius * Math.sin(theta) };
  const spin = { x: -omega * relative.y, y: omega * relative.x };
  const point = { x: velocity * time + relative.x, y: radius + relative.y };
  const ground = { x: z021(velocity + spin.x), y: z021(spin.y) };
  const contactSpeed = z021(velocity + omega * radius);
  const translationEnergy = mass * velocity * velocity / 2, rotationEnergy = inertia * omega * omega / 2;
  return { mass, radius, velocity, omega, body, time, theta, coefficient, inertia, relative, point, centre: { x: velocity * time, y: radius }, spin, ground, speed: Math.hypot(ground.x, ground.y), contactSpeed,
    noSlip: Math.abs(contactSpeed) <= 8 * Number.EPSILON * Math.max(Math.abs(velocity), Math.abs(omega * radius)),
    translationEnergy, rotationEnergy, energy: translationEnergy + rotationEnergy };
}

/** Two-dimensional particle about a fixed origin in an inertial frame; no circular-path assumption. */
export function particleAngular021(mass: number, position: Point021, velocity: Point021) {
  if (!in021(mass, .1, 100) || !position || !velocity || ![position.x, position.y, velocity.x, velocity.y].every(v => in021(v, -100, 100))) throw new RangeError("PARTICLE_ANGULAR021_SCOPE");
  const momentum = { x: mass * velocity.x, y: mass * velocity.y };
  const angular = z021(position.x * momentum.y - position.y * momentum.x), speed = Math.hypot(velocity.x, velocity.y);
  return { momentum, angular, perpendicularDistance: speed === 0 ? null : Math.abs(angular) / (mass * speed) };
}

/** Fixed symmetry axis, two identical point masses and a core of fixed I. Angular impulse is total external torque integral. */
export function angular021(coreInertia: number, mass: number, initialRadius: number, finalRadius: number, initialOmega: number, angularImpulse: number, phaseDegrees: number) {
  if (!in021(coreInertia, .1, 20) || !in021(mass, .1, 5) || !in021(initialRadius, .1, 3) || !in021(finalRadius, .1, 3) || !in021(initialOmega, -10, 10) || !in021(angularImpulse, -20, 20) || !in021(phaseDegrees, 0, 360)) throw new RangeError("ANGULAR021_SCOPE");
  const initialInertia = coreInertia + 2 * mass * initialRadius ** 2, finalInertia = coreInertia + 2 * mass * finalRadius ** 2;
  const initialL = initialInertia * initialOmega, finalL = initialL + angularImpulse, finalOmega = finalL / finalInertia;
  const initialEnergy = initialInertia * initialOmega ** 2 / 2, finalEnergy = finalInertia * finalOmega ** 2 / 2, theta = phaseDegrees * Math.PI / 180;
  const points = [{ x: finalRadius * Math.cos(theta), y: finalRadius * Math.sin(theta) }, { x: -finalRadius * Math.cos(theta), y: -finalRadius * Math.sin(theta) }];
  const velocities = points.map(p => ({ x: -finalOmega * p.y, y: finalOmega * p.x }));
  return { coreInertia, mass, initialRadius, finalRadius, initialOmega, angularImpulse, phaseDegrees, initialInertia, finalInertia, initialL, finalL: z021(finalL), finalOmega: z021(finalOmega), initialEnergy, finalEnergy, netWork: finalEnergy - initialEnergy, points, velocities };
}

export const G021 = 6.67e-11;
/** Homogeneous spherical body, no rotation. r is distance from centre; field is negative along the outward radial x axis. */
export function gravity021(planetMass: number, planetRadius: number, distance: number, probeMass: number) {
  if (!in021(planetMass, 1e20, 1e28) || !in021(planetRadius, 1e4, 1e9) || !in021(distance, 0, 1e11) || !in021(probeMass, .1, 1e6)) throw new RangeError("GRAVITY021_SCOPE");
  const mu = G021 * planetMass, inside = distance < planetRadius, surfaceGravity = mu / planetRadius ** 2;
  const interiorGradient = mu / planetRadius / planetRadius / planetRadius;
  const field = distance === 0 ? 0 : inside ? -interiorGradient * distance : -mu / distance ** 2;
  const potential = inside ? -mu / (2 * planetRadius) * (3 - (distance / planetRadius) ** 2) : -mu / distance;
  const radialRatio = distance / planetRadius;
  const enclosedMass = inside ? planetMass * radialRatio * radialRatio * radialRatio : planetMass;
  const force = inside ? -(probeMass * interiorGradient) * distance : probeMass * field;
  const circularSpeed = inside ? null : Math.sqrt(mu / distance), escapeSpeed = inside ? null : Math.sqrt(2 * mu / distance);
  const period = inside ? null : 2 * Math.PI * distance / Math.sqrt(mu / distance);
  return { planetMass, planetRadius, distance, probeMass, mu, inside, surfaceGravity, field: z021(field), force: z021(force), reaction: z021(-force), potential, potentialEnergy: probeMass * potential, enclosedMass, circularSpeed, escapeSpeed, period };
}

const TAU021 = 2 * Math.PI;
/** Monotone safeguarded Kepler solve, with unwrapped mean anomaly, 0 <= e <= .85. */
function eccentric021(mean: number, eccentricity: number) {
  const cycles = Math.floor(mean / TAU021), reduced = mean - cycles * TAU021;
  if (reduced === 0) return cycles * TAU021;
  if (reduced < .001) {
    // Relative small-anomaly solve: a fixed absolute bisection floor would erase tiny legal times.
    let E = reduced / (1 - eccentricity);
    for (let i = 0; i < 12; i++) {
      const residual = (1 - eccentricity) * E + eccentricity * (E - Math.sin(E)) - reduced;
      const next = E - residual / (1 - eccentricity * Math.cos(E));
      if (next === E) break;
      E = next;
    }
    return E + cycles * TAU021;
  }
  let low = 0, high = TAU021;
  for (let i = 0; i < 62; i++) { const mid = (low + high) / 2; if (mid - eccentricity * Math.sin(mid) < reduced) low = mid; else high = mid; }
  return (low + high) / 2 + cycles * TAU021;
}
/** Two-body test-particle ellipse, focus at origin; a metres, mu m^3/s^2. Fraction is elapsed time / period from periapsis. */
export function kepler021(semimajor: number, eccentricity: number, mu: number, fraction: number, window: number) {
  if (!in021(semimajor, 1e3, 1e12) || !in021(eccentricity, 0, .85) || !in021(mu, 1e4, 1e30) || !in021(fraction, 0, 1) || !in021(window, .01, .25)) throw new RangeError("KEPLER021_SCOPE");
  const a = semimajor, b = a * Math.sqrt(1 - eccentricity * eccentricity), n = Math.sqrt(mu / a) / a, period = TAU021 / n;
  const at = (mean: number) => {
    const E = eccentric021(mean, eccentricity), phase = E - Math.floor(E / TAU021) * TAU021, cos = Math.cos(phase), sin = Math.sin(phase), factor = 1 - eccentricity * cos;
    const position = { x: a * (cos - eccentricity), y: b * sin }, velocity = { x: -a * n * sin / factor, y: b * n * cos / factor };
    const radius = a * factor, acceleration = { x: -mu / radius ** 2 * position.x / radius, y: -mu / radius ** 2 * position.y / radius };
    return { E, position, velocity, radius, acceleration, speed: Math.hypot(velocity.x, velocity.y) };
  };
  const mean = fraction * TAU021, state = at(mean), area = Math.PI * a * b, angularSpecific = Math.sqrt(mu * a * (1 - eccentricity ** 2));
  const sector = (start: number) => Array.from({ length: 49 }, (_, i) => at(start + window * TAU021 * i / 48).position);
  return { semimajor: a, eccentricity, mu, fraction, window, b, period, time: fraction * period, mean, ...state, periapsis: a * (1 - eccentricity), apoapsis: a * (1 + eccentricity), specificEnergy: -mu / (2 * a), angularSpecific, areaRate: angularSpecific / 2, totalArea: area, sweptArea: window * area, windowTime: window * period,
    sectorA: sector(mean), sectorB: sector(mean + Math.PI), orbit: Array.from({ length: 129 }, (_, i) => { const E = TAU021 * i / 128; return { x: a * (Math.cos(E) - eccentricity), y: b * Math.sin(E) }; }) };
}

const packs021 = [
  {
    "id": "donerek-oteleme-hareketi",
    "topic": "detail-386",
    "title": "Dönerek öteleme hareketi",
    "minutes": 40,
    "objectives": [
      "Öteleme ile dönme hızlarını ayırt et",
      "Üst, alt ve yan noktaları karşılaştır",
      "Toplam kinetik enerji iki terim içerir"
    ],
    "sections": [
      {
        "title": "Bir cismin hareketini iki parçaya ayır",
        "paragraphs": [
          "Bisiklet tekerinin merkezi yol boyunca ilerlerken jant üzerindeki boya lekesi de merkezin çevresinde döner. Düzlemsel katı cisim hareketini, kütle merkezinin ötelenmesi ile merkezin çevresindeki dönmenin toplamı olarak inceleyebiliriz. Bu iki parçanın aynı anda bulunması, ikisinin hızını veya enerjisini aynı nicelik yapmaz.",
          "Önce yere bağlı eylemsiz gözlemciyi ve cismin kütle merkezini seç. Saf ötelenmede cismin yönelimi değişmez; bütün noktaların aynı andaki hız vektörü aynıdır. Öteleme yolunun mutlaka doğru olması gerekmez. Bir noktanın izlediği yol ile o andaki hızını ayrı sorular olarak düşün."
        ]
      },
      {
        "title": "Öteleme ile dönme hızlarını ayırt et",
        "paragraphs": [
          "Merkez çevresinde açısal hız ω ile dönen katı cisimde tüm noktaların açısal hızı aynıdır. Bir noktanın merkeze göre çizgisel sürati |ω|ρ olur; ρ bu noktanın dönme eksenine dik uzaklığıdır. Merkezde ρ sıfır, jantta teker yarıçapı R kadardır. Eşit açısal hız, eşit çizgisel hız demek değildir.",
          "Dönme hızının yönü yarıçapa diktir. Yalnız büyüklükleri toplayarak jant hızını bulamazsın; aynı büyüklükte iki vektör karşıt yöndeyse birbirini yok eder. Merkezin öteleme hızı ise cismin her noktasına eklenen ortak vektördür. Bu ortak parça janttaki tüm noktalar için aynı kalır."
        ]
      },
      {
        "title": "Gerçek nokta hızını vektörle kur",
        "paragraphs": [
          "Düzlemsel harekette v_nokta = v_merkez + ω × r bağıntısını kullan. x sağa, y yukarı ve +z sayfadan dışarı seçilirse pozitif ω saat yönünün tersidir. r = (x_r; y_r) için dönme hızı (−ω y_r; ω x_r) olur. Bu ifade üst, alt ve yan noktaların yönünü aynı kuralla verir.",
          "Örneğin merkez sağa 2 m/s gidiyor, R = 0,4 m ve ω = −5 rad/s ise üst noktada dönme katkısı sağa 2 m/s olur. Yere göre üst hız sağa 4 m/s, alt hız sıfırdır. Sağ yan noktada hız (2; −2) m/s olup sürat 2√2 m/s çıkar; 2 + 2 = 4 işlemi bu dik vektörler için yanlıştır."
        ]
      },
      {
        "title": "Kaymadan yuvarlanma bir temas koşuludur",
        "paragraphs": [
          "Duran bir zemin üzerinde kaymadan yuvarlanan tekerin temas noktasının yere göre anlık hızı sıfırdır. Sağa giden teker saat yönünde döner; seçtiğimiz işaretlerle v_merkez + ωR = 0, büyüklüklerle v = |ω|R olur. Zemin hareket ediyorsa sıfır yerine zeminin temas hızı kullanılmalıdır.",
          "Bu bağıntı her dönen cisim için otomatik geçerli değildir. Patinaj yapan otomobil, kilitlenmiş teker veya yerde kayarken dönen disk için temas hızını ayrıca hesapla. Modelde v ve ω bağımsız seçildiğinde çizilen hareket, bu hızların dışarıdan korunduğu bir kinematik durumdur; gerçek sürtünmenin sonraki evrimini çözmüş sayılmaz."
        ]
      },
      {
        "title": "Üst, alt ve yan noktaları karşılaştır",
        "paragraphs": [
          "Kaymadan sağa yuvarlanan tekerde üst noktanın sürati 2 v, merkezin sürati v ve alt temas noktasının sürati sıfırdır. Sağ ve sol uçlarda öteleme ile dönme hızları birbirine dik olduğu için sürat √2 v olur. Sıfır hız, janttaki o madde noktasının her zaman yerde durduğu anlamına gelmez; sonraki anda başka bir nokta zemine gelir.",
          "Temas anındaki sıfır hızdan sıfır ivme sonucu da çıkmaz. Sabit süratle yuvarlanan tekerin alt noktasının merkeze yönelen ivmesi o anda yukarıdır. Anlık temas noktası hız bakımından bir dönme merkezi gibi kullanılabilir; fakat onu sürekli sabit bir menteşe gibi kabul edip bütün ivme ve tork denklemlerini koşulsuz taşımamalısın."
        ]
      },
      {
        "title": "Bir tur, merkez yolu ve boya izinin yolu",
        "paragraphs": [
          "Kaymadan yuvarlanan teker bir tur döndüğünde merkezi 2πR ilerler. Merkezin yer değiştirmesi yatayda bu değerdir; açısal yer değiştirme büyüklüğü 2π radyandır. n tur için merkez yolu n·2πR olur. Birim dönüşümünde çapı yarıçap yerine veya dereceyi radyan yerine koymamaya dikkat et.",
          "Janttaki boya lekesinin merkeze göre bir turda aldığı yol 2πR iken yere göre çizdiği eğri sikloiddir. Bu iki gözlem çerçevesindeki yolları karıştırma. Boya lekesi bir tur sonunda aynı göreli konuma dönse de teker merkezi ilerlediğinden yere göre aynı konumda değildir. Merkez yolu ile lekenin gerçek eğri boyunca aldığı yol eşit olmak zorunda değildir."
        ]
      },
      {
        "title": "Eylemsizlik momenti eksene bağlıdır",
        "paragraphs": [
          "Bir eksene göre kütle eylemsizlik momenti I = Σm_i ρ_i² olur. Uzaklık eksene dik ölçülür; birimi kg·m² ve bu eksen için skaler değeri sıfırdan küçüktür denemez. Kütleyi eksenden uzaklaştırmak, aynı kütleyle I değerini artırır. Aynı cisim farklı eksenlere göre farklı I taşır.",
          "Merkezden geçen simetri ekseni için ince halka mR², düzgün dolu disk veya silindir mR²/2, düzgün dolu küre 2 mR²/5 değerindedir. Formülün ekseni ve cismin dolu/boş oluşu açıklanmalıdır. Yapı mühendisliğindeki alan atalet momenti farklı bir niceliktir; m⁴ birimi taşıyan alan momentini kg·m² ile karıştırma."
        ]
      },
      {
        "title": "Dönme enerjisini parçacıklardan çıkar",
        "paragraphs": [
          "Merkez çevresinde her parçacığın kinetik enerjisi m_i(ωρ_i)²/2 olur. Hepsini toplarsan K_dönme = I_merkez ω²/2 elde edilir. Bu enerji açısal hızın işaretine bağlı değildir; saat yönünü değiştirmek aynı I ve aynı süratle enerjiyi negatif yapmaz.",
          "Sabit bir eksen çevresinde yalnız dönen cisim için bu tek terim yeterlidir. Aynı geometrinin yarıçapını büyütürken kütle mi, özkütle mi, açısal hız mı sabit tutuluyor sorusunu önce cevapla. Özkütlesi ve şekli sabit kürelerde m ∝ R³ ve I ∝ R⁵ olur; yalnız mR² içindeki R değişmiş gibi davranmak yanlış oran verir."
        ]
      },
      {
        "title": "Toplam kinetik enerji iki terim içerir",
        "paragraphs": [
          "Genel düzlemsel hareket için K = m v_merkez²/2 + I_merkez ω²/2 kullanılır. Öteleme teriminde merkezin yere göre hızı, dönme teriminde merkezden geçen ilgili eksenin momenti bulunur. Toplamı yazdıktan sonra gerçekten kayma yoksa |ω| = v/R yerine koyabilirsin.",
          "I_merkez = k mR² ise kaymadan yuvarlanmada K = (1+k)mv²/2 çıkar. Aynı kütle ve merkez süratinde halka, diske göre daha fazla dönme enerjisi taşır. Bu, aynı yükseklikten bırakılan her cismin aynı sürate ulaşacağını göstermez; o deneyde enerji sabit, son sürat değişkendir."
        ]
      },
      {
        "title": "Eğik düzlemde enerjiyi hareketle bağla",
        "paragraphs": [
          "Başlangıçta durgun cisim, direnç ve enerji kaybı olmadan h kadar alçalırken kaymadan yuvarlansın. mgh = (1+k)mv²/2 verir; v = √[2 gh/(1+k)]. Aynı h ve aynı geometrik k için kütle ile yarıçap bu son süratten sadeleşir. Düzgün dolu küre k=0,4, disk k=0,5, halka k=1 olduğundan bu koşullarda küre daha büyük sürate ulaşır.",
          "Kaymadan yuvarlanmanın gerçekleşebilmesi için yeterli statik sürtünme bulunmalıdır. İdeal sabit zeminde temas noktasının hızı sıfır olduğu için statik sürtünme bu temas üzerinden iş yapmaz; yine de tork sağlayıp dönmeyi başlatabilir. Kayma, esneme veya yuvarlanma direnci varsa enerji hesabına uygun ek terim gerekir."
        ]
      },
      {
        "title": "Sürtünmenin yönünü peşinen ezberleme",
        "paragraphs": [
          "Serbestçe eğik düzlemden aşağı yuvarlanan cisimde statik sürtünme tipik olarak eğim yukarıdır ve dönmeyi artıran torku sağlar. Motorla sürülen tekerde zemin sürtünmesi ileri olabilir. Frenleme, itmenin uygulama noktası ve tekerin serbest/çekişli oluşu değiştiğinde yön de değişebilir.",
          "Önce temas noktasının sürtünmesiz durumdaki kayma eğilimini bul; statik sürtünme bu göreli kaymayı engellemeye çalışır. Statik sürtünme her zaman μ_sN değildir, yalnız |f_s| ≤ μ_sN koşuluna uyar. Vektör hız toplamını bilmek tek başına bütün kuvvetleri belirlemek için yeterli değildir."
        ]
      },
      {
        "title": "Aynı çubukta iki farklı eksen",
        "paragraphs": [
          "Düzgün, ince ve uzunluğu L olan çubuk için orta noktasından geçen, çubuğa dik eksende I=mL²/12 olur. Aynı çubuğun ucundan geçen ve bu eksene paralel eksende I=mL²/3 olur. Eksen değiştiğinde kütle ile boy sabit kalsa bile kütlelerin eksene dik uzaklıkları değişir.",
          "Uç eksen momenti orta ekseninkinin dört katıdır. Örneğin m=3 kg ve L=2 m çubuk için orta eksende I=1 kg·m², uç eksende I=4 kg·m² bulunur. Her iki durumda aynı açısal sürat verilirse uç eksendeki dönme enerjisi dört kat olur; aynı enerji verilirse açısal süratler farklıdır."
        ]
      },
      {
        "title": "Bir çözümü üç ayrı denetimden geçir",
        "paragraphs": [
          "Önce çerçeve ve işareti yaz; sonra kayma koşulunu denetle; en son istenen niceliğin hız, sürat, yol, enerji veya moment olduğunu ayır. Süratte birim m/s, açısal hızda rad/s, momentte kg·m², enerjide joule beklenir. Dönme enerjisinde açısal hızı karesiz bırakmak bu birim denetiminde yakalanır.",
          "Etkileşimde tekerin boyalı noktasını değiştir ve hız oklarını karşılaştır. Sıfır ok sıfır hız demektir; gizlenmiş bir hareket veya tamamlanmış öğrenme kaydı değildir. Seçtiğin bir durumu kendi cümlenle açıklayıp sonra özgün sorularda bağımsız çözüm yap; modelle oynamak kendiliğinden ustalık veya XP üretmez."
        ]
      }
    ],
    "examples": [
      {
        "title": "Tekerin dört hızı",
        "prompt": "R = 0,4 m teker duran zeminde kaymadan sağa v = 2 m/s gidiyor. ω işaretini ve üst, alt, sağ uç süratlerini bul.",
        "strategy": "Önce temas koşulunu, sonra yönlü hız toplamını kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "+x sağa ve pozitif dönme saat yönünün tersidir. v + ωR = 0 verir: ω = −2/0,4 = −5 rad/s."
          },
          {
            "label": "2. adım",
            "explanation": "Üstte dönme katkısı sağa 2 m/s, altta sola 2 m/s olur. Ortak sağa 2 m/s ile toplamlar üstte 4, altta 0 m/s çıkar."
          },
          {
            "label": "3. adım",
            "explanation": "Sağ uçta dönme katkısı aşağı 2 m/s olduğundan hız (2; −2) m/s, sürat √(2²+2²) = 2√2 m/s bulunur."
          }
        ],
        "answer": "ω = −5 rad/s; üst 4, alt 0, sağ uç 2√2 m/s.",
        "check": "Üst ve altın ortalama hız vektörü merkezin hızını verir.",
        "pitfall": "Yan uçta dik hız büyüklüklerini aritmetik toplama."
      },
      {
        "title": "Diskin enerji bütçesi",
        "prompt": "m = 2 kg, R = 0,5 m düzgün dolu disk kaymadan v = 3 m/s ile ilerliyor. Merkez ekseni I = mR²/2. Toplam kinetik enerji nedir?",
        "strategy": "Merkez ötelemesi ile merkez çevresi dönmesini ayrı hesapla.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Kayma olmadığı için |ω| = v/R = 6 rad/s. I = 2×0,5²/2 = 0,25 kg·m²."
          },
          {
            "label": "2. adım",
            "explanation": "Öteleme enerjisi 2×3²/2 = 9 J; dönme enerjisi 0,25×6²/2 = 4,5 J."
          },
          {
            "label": "3. adım",
            "explanation": "Toplam K = 9 + 4,5 = 13,5 J. Aynı sonuç k=1/2 için 3 mv²/4 bağıntısından çıkar."
          }
        ],
        "answer": "13,5 J.",
        "check": "Dönme enerjisi ötelemenin yarısıdır; toplam tek terimden büyük olmalı.",
        "pitfall": "I=mR² halka formülünü dolu diske uygulama."
      },
      {
        "title": "Küre rampadan iner",
        "prompt": "Düzgün dolu küre durgun hâlden h = 1,4 m alçalıyor. g = 10 m/s²; kayma yok, direnç ve enerji kaybı yok. I = 2 mR²/5. Son merkez sürati?",
        "strategy": "Potansiyel enerji iki kinetik terime bölünür.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "I = k mR² için k = 2/5; |ω| = v/R olduğundan toplam K = 7 mv²/10."
          },
          {
            "label": "2. adım",
            "explanation": "m×10×1,4 = 7 mv²/10 yaz. Kütleyi sadeleştirince 14 = 0,7 v²."
          },
          {
            "label": "3. adım",
            "explanation": "v² = 20 ve v = √20 = 2√5 m/s olur. Kökün pozitifini sürat için al."
          }
        ],
        "answer": "2√5 m/s.",
        "check": "Salt kayıp olmadan kayan noktasal cisim √28 m/s olurdu; dönme için enerji ayrıldığı için bu değer daha küçüktür.",
        "pitfall": "Kaymadan yuvarlanmayı sürtünmesiz kaymayla aynı sanma."
      },
      {
        "title": "Parçacıkların momentini topla",
        "prompt": "Sabit eksene dik uzaklıkları 0,2 m ve 0,3 m olan noktasal kütleler 1 kg ve 2 kg. Bağ çubuklarının kütlesi ihmal. I ve ω = 4 rad/s için dönme enerjisi?",
        "strategy": "Her kütlenin eksene dik uzaklığını ayrı karele.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "I = 1×0,2² + 2×0,3² = 0,04 + 0,18 = 0,22 kg·m²."
          },
          {
            "label": "2. adım",
            "explanation": "K = Iω²/2 = 0,22×16/2 = 1,76 J."
          },
          {
            "label": "3. adım",
            "explanation": "Aynı iki kütle farklı yarıçapa taşınırsa I yeniden hesaplanır; toplam kütle tek başına yeterli değildir."
          }
        ],
        "answer": "I = 0,22 kg·m²; K = 1,76 J.",
        "check": "Her I terimi pozitiftir; karşı taraflara yerleştirmek momentleri birbirinden çıkarmaz.",
        "pitfall": "Uzaklıkları toplayıp tek bir ortalama yarıçapı kareleme."
      }
    ],
    "recall": [
      {
        "prompt": "Kaymadan sağa yuvarlanan tekerin alt noktasının yere göre hızı neden sıfırdır?",
        "answer": "Merkezin sağa öteleme hızı ile temas noktasının merkeze göre sola dönme hızı eşit büyüklükte ve zıt yönlüdür."
      },
      {
        "prompt": "Saf dönmede bütün noktaların çizgisel sürati aynı mıdır?",
        "answer": "Hayır. Açısal hız ortaktır; çizgisel sürat eksene dik uzaklıkla |ω|ρ oranında değişir."
      },
      {
        "prompt": "Kütle momenti hangi uzaklıkla hesaplanır?",
        "answer": "Seçilen dönme eksenine dik uzaklığın karesiyle; I = Σm_iρ_i²."
      },
      {
        "prompt": "Kaymadan yuvarlanmada enerji neden yalnız mv²/2 değildir?",
        "answer": "Merkez ötelenirken cisim merkez çevresinde de döner; toplam enerji mv_CM²/2 + I_CMω²/2 olur."
      }
    ],
    "items": [
      {
        "prompt": "Duran zeminde kaymadan sağa 3 m/s ilerleyen tekerin en üst noktasının yere göre sürati kaç m/s olur?",
        "hint": "Üstte öteleme ve dönme hızları aynı yöndedir.",
        "explanation": "Kaymadan yuvarlanmada jantın merkeze göre sürati 3 m/s. Üst noktada iki sağa hız toplanır: 3+3 = 6 m/s.",
        "options": [
          "0",
          "3",
          "6",
          "3√2",
          "9"
        ],
        "answer": 2
      },
      {
        "prompt": "R = 0,5 m tekerin merkezi sağa 4 m/s gidiyor. +ω saat yönünün tersidir ve ω = −6 rad/s. Duran zemine değen alt noktanın yere göre hızı nedir?",
        "hint": "Alt noktada dönme katkısı ωR yönlüdür.",
        "explanation": "Alt hız v+ωR = 4−6×0,5 = +1 m/s. Temas kaydığı için v=|ω|R koşulu sağlanmaz.",
        "options": [
          "Sıfır",
          "Sola 1 m/s",
          "Sağa 7 m/s",
          "Sola 7 m/s",
          "Sağa 1 m/s"
        ],
        "answer": 4
      },
      {
        "prompt": "m = 4 kg, R = 0,5 m düzgün dolu diskin merkez simetri eksenine göre I = mR²/2. ω = 2 rad/s ile yalnız dönüyorsa kinetik enerjisi kaç J olur?",
        "hint": "I değerini bulduktan sonra Iω²/2 uygula.",
        "explanation": "I=4×0,25/2=0,5 kg·m²; K=0,5×4/2=1 J.",
        "options": [
          "1",
          "0,5",
          "2",
          "4",
          "8"
        ],
        "answer": 0
      },
      {
        "prompt": "Kütleleri eşit ince halka ve düzgün dolu disk, duran zeminde kaymadan aynı merkez süratiyle ilerliyor. Merkez eksenleri için I_halka=mR², I_disk=mR²/2. Toplam K_halka/K_disk kaçtır?",
        "hint": "Toplam enerjilere öteleme terimini de ekle.",
        "explanation": "Halka K=mv², disk K=3 mv²/4. Oran 4/3 olur; yalnız dönme enerjilerinin oranı 2’dir.",
        "options": [
          "1/2",
          "2/3",
          "1",
          "4/3",
          "2"
        ],
        "answer": 3
      },
      {
        "prompt": "R = 0,3 m teker duran düz zeminde kaymadan 10 tam tur atıyor. Merkezin aldığı yol kaç metredir?",
        "hint": "Merkez bir turda 2πR ilerler.",
        "explanation": "s=10×2π×0,3=6π m. Çapı yeniden 2 ile çarpmamalısın.",
        "options": [
          "0,6π",
          "6π",
          "3π",
          "10π",
          "20π"
        ],
        "answer": 1
      },
      {
        "prompt": "Kaymadan sağa v süratiyle ilerleyen tekerin en sağ jant noktasının yere göre sürati nedir?",
        "hint": "Öteleme sağa, sağ uçtaki dönme katkısı aşağıdır.",
        "explanation": "Dik ve eşit iki vektörün büyüklüğü √(v²+v²)=√2 v olur.",
        "options": [
          "0",
          "√2 v",
          "v",
          "2 v",
          "3 v"
        ],
        "answer": 1
      },
      {
        "prompt": "Aynı düzgün dolu maddeyle yapılmış R ve 2 R yarıçaplı iki küre, merkezlerinden geçen eksenlerde eşit açısal süratle dönüyor. I=2 mR²/5. Büyük kürenin dönme enerjisi küçüğün kaç katıdır?",
        "hint": "Özkütle aynı olduğundan kütle yarıçapın küpüyle artar.",
        "explanation": "Kütle 8 kat, R² 4 kat olur; I ve sabit ω için K 32 kat artar.",
        "options": [
          "2",
          "4",
          "8",
          "32",
          "16"
        ],
        "answer": 3
      },
      {
        "prompt": "Düzgün dolu disk durgun hâlden h kadar alçalırken kaymadan yuvarlanıyor. I=mR²/2; direnç ve enerji kaybı yok. Son merkez süratinin karesi nedir?",
        "hint": "mgh hem ötelemeye hem dönmeye dönüşür.",
        "explanation": "mgh=mv²/2+mv²/4=3 mv²/4 verir; v²=4 gh/3.",
        "options": [
          "4 gh/3",
          "gh",
          "2 gh",
          "gh/2",
          "3 gh/2"
        ],
        "answer": 0
      },
      {
        "prompt": "Düz yolda sabit süratle kaymadan yuvarlanan tekerin yere değen madde noktası için temas anında hangisi doğrudur?",
        "hint": "Anlık hız ile hızın değişim hızını ayır.",
        "explanation": "Alt noktanın hız katkıları birbirini yok eder; fakat merkeze yönelik dönme ivmesi yukarıdır. Aynı nokta sonraki anda yerden ayrılır.",
        "options": [
          "Hem hız hem ivme zorunlu sıfırdır.",
          "Hızı teker merkezinin iki katıdır.",
          "Bu madde noktası sürekli yerde kalır.",
          "Dönme enerjisi o anda sıfırlanır.",
          "Hızı sıfır olabilirken ivmesi sıfır değildir."
        ],
        "answer": 4
      },
      {
        "prompt": "Kütlesiz çubuk üzerindeki 2 kg ve 1 kg noktasal kütlelerin bir eksene dik uzaklıkları 0,3 m ve 0,4 m. Bu eksene göre toplam kütle eylemsizlik momenti kaç kg·m² olur?",
        "hint": "I=Σmρ²; momentler aynı eksen için toplanır.",
        "explanation": "I=2×0,3²+1×0,4²=0,18+0,16=0,34 kg·m².",
        "options": [
          "0,25",
          "0,7",
          "0,34",
          "0,5",
          "0,48"
        ],
        "answer": 2
      }
    ],
    "source": "MEBİ AYT Fizik, Öteleme ve Dönme / Eylemsizlik Momenti (PDF 156–162); OGM 12 Fizik 004 konu özeti ve Dersler Cepte 12 Fizik 2. sayı PDF 11–12 karşılaştırılarak yazılmış özgün anlatım, çözümler ve sorular. Şekiller uygulamanın hesap modelleridir."
  },
  {
    "id": "acisal-momentum",
    "topic": "detail-387",
    "title": "Açısal momentum",
    "minutes": 40,
    "objectives": [
      "Tam tanım konum ile momentumun çapraz çarpımıdır",
      "Dış tork açısal momentumu değiştirir",
      "Açısal ivme ve teğetsel ivme"
    ],
    "sections": [
      {
        "title": "Çizgisel hareketten yeni bir niceliğe",
        "paragraphs": [
          "Bir top doğrusal yol boyunca giderken çizgisel momentumu p=mv olur. Seçtiğin sabit bir O noktasına göre ayrıca açısal momentumu bulunabilir. Cismin O etrafında gerçekten bir çember çizmesi gerekmez; yolun O’ya göre yanından geçmesi bile sıfır olmayan açısal momentum verebilir.",
          "Bu yüzden önce hangi noktaya veya eksene göre konuştuğunu söyle. Aynı doğrusal hareket, yol üzerindeki bir noktaya göre sıfır; yol dışında bir noktaya göre sıfır olmayan açısal momentum taşıyabilir. Yalnız cismin dönüyor görünmesine bakarak karar verme."
        ]
      },
      {
        "title": "Tam tanım konum ile momentumun çapraz çarpımıdır",
        "paragraphs": [
          "Bir parçacığın O’ya göre açısal momentumu L = r × p olur. r, O’dan parçacığa uzanır. Büyüklük L = r p sin θ = m v d’dir; θ, r ile p arasındaki açı ve d, O’nun hareket doğrusuna dik uzaklığıdır. mvr kısa biçimi yalnız r ile v dikse geçerlidir.",
          "x–y düzleminde L_z = x p_y − y p_x yazılır. m=3 kg, r=(2;1) m ve v=(1;4) m/s için p=(3;12), L_z=2×12−1×3=21 kg·m²/s olur. Bu bileşen hesabı şeklin eğik çizilmesinden etkilenmez ve yönü de verir."
        ]
      },
      {
        "title": "Sağ el yönü ve birimler",
        "paragraphs": [
          "Sağ elin parmaklarını r’den p’ye küçük açı yönünde kıvırdığında başparmak L yönünü gösterir. Sayfada x sağa, y yukarıysa saat yönünün tersi +z, yani okuyucuya doğrudur. Saat yönü −z olur. Nokta dışarıyı, çarpı içeri yönünü gösterebilir; bunlar yukarı ve aşağı okları değildir.",
          "Açısal momentum birimi kg·m²/s, aynı zamanda N·m·s veya J·s biçiminde yazılır. Torkun N·m birimiyle tek fark bir zaman çarpanı gibi görünse de bunlar farklı fiziksel niceliklerdir. Pozitif/negatif işaret bir büyüklüğün negatif olması değil, seçilen eksendeki bileşen yönüdür."
        ]
      },
      {
        "title": "Sabit eksenli katı cisimde L=Iω",
        "paragraphs": [
          "Bir simetri veya asal eksen çevresinde dönen katı cismin o eksendeki açısal momentumu L = Iω olur. Noktasal parçaların katkıları toplanır; I = Σmρ². Burada I ilgili eksene göre momenttir. Bu lise modelinin dışında, genel üç boyutlu katı cisim hareketinde L ve ω her zaman paralel olmak zorunda değildir.",
          "Aynı ω ile dönen daha büyük I, daha büyük |L| taşır. Aynı L ile şekil değiştiren sistemde ise I küçülünce |ω| büyür. Soruda hangi niceliğin sabit tutulduğunu yazmadan bu iki ilişkiyi tek bir sloganla açıklamaya çalışma."
        ]
      },
      {
        "title": "Dış tork açısal momentumu değiştirir",
        "paragraphs": [
          "Sabit bir eylemsiz O noktasına göre sistemin net dış torku dL/dt’ye eşittir. Sonlu zaman aralığında ΔL = ∫τ_dış dt olur. Tork sabitse ΔL = τΔt kullanılır. Tork–zaman grafiğinin işaretli alanı açısal itme verir; negatif alan seçilen pozitif L bileşenini azaltabilir.",
          "τ = r × F ve düzlemde τ_z = xF_y−yF_x kullan. Kuvvetin uygulama noktasını atlama; dik kuvvet kolu d kullanıldığında büyüklük Fd olur. r vektörü ile dik kuvvet kolunu aynı şey sanıp bir kez daha sinüs çarpanı ekleme."
        ]
      },
      {
        "title": "Net dış tork sıfırsa toplam L korunur",
        "paragraphs": [
          "Sistem ve sabit referans noktası uygun seçilmişken net dış tork sıfırsa toplam açısal momentumun hem yönü hem büyüklüğü değişmez. Tek bir parçanın L değeri değişebilir; iç etkileşimler sistem içinde aktarım yapar. Korunan, seçilen sistemin toplamıdır.",
          "Net dış kuvvetin sıfır olması şart değildir. Merkeze yönelen çekim kuvveti sıfır olmayan ivme verebilir ama aynı merkez O’ya göre r ile paralel olduğundan torku sıfırdır. Bu nedenle bir gezegenin yörüngesel L değeri ideal merkezî kuvvette korunurken çizgisel momentum vektörü değişir."
        ]
      },
      {
        "title": "Kollar kapanınca hız neden artar",
        "paragraphs": [
          "Dönen sporcu kollarını içeri çektiğinde kütle eksene yaklaşır, I azalır. Dış tork ihmal edilirse I_ilkω_ilk = I_sonω_son. Örneğin I 9’dan 3 kg·m²’ye inerken ilk ω 2 rad/s ise L 18 kg·m²/s sabit kalır ve son ω 6 rad/s olur.",
          "Bu, açısal momentum üretmek değildir. K= L²/(2 I) olduğundan aynı L ile I küçülürken dönme kinetik enerjisi artar; artış kasların yaptığı işten gelir. Etkileşimdeki merkez gövdenin momenti de toplam I içindedir; yalnız eldeki iki ağırlığı sayıp gövdeyi unutma."
        ]
      },
      {
        "title": "Enerji korunumu ile momentum korunumu ayrı sınanır",
        "paragraphs": [
          "Sürtünmesiz aynı eksendeki iki disk birbirine bağlanıp ortak ω ile dönmeye başlayabilir. Net dış tork yoksa toplam L korunur. Buna karşılık iç sürtünme dönme kinetik enerjisinin bir bölümünü ısıya çevirebilir. Açısal momentum korunuyor diye esnek çarpışma veya sabit mekanik enerji ilan etme.",
          "Tersine sabit I’lı bir disk dış motorla hızlandırılırsa hem L hem K değişir. Dış torkun açısal itmesi ΔL’yi, yaptığı iş ∫τdθ ise ΔK’yi verir. Zamanla açı aynı değişken olmadığından τΔt ile τΔθ’yı karıştırmamalısın."
        ]
      },
      {
        "title": "Açısal ivme ve teğetsel ivme",
        "paragraphs": [
          "Sabit I için τ_net=Iα ve α=dω/dt olur. Merkezden sabit ρ uzaklıktaki noktanın teğetsel ivmesi a_t=αρ’dir; merkeze yönelen normal ivme ω²ρ ayrıca bulunur. Bu iki bileşen dik olduğundan toplam ivme büyüklüğü genel olarak aritmetik toplamları değildir.",
          "I değişiyorsa τ=Iα ifadesi tek başına genel denklem değildir. L=Iω türevi τ=Iα+(dI/dt)ω verir. İçeri çekilen ağırlık örneğinde dış tork sıfırken ω değişebilmesi bu ek terimle uyumludur. Model iki son durumu karşılaştırır; şekil değişiminin ayrıntılı zamanını varsaymaz."
        ]
      },
      {
        "title": "Gezegen örneğinde dönüş ile dolanımı ayır",
        "paragraphs": [
          "Gezegenin yıldız çevresindeki yörüngesel açısal momentumu, merkezden gezegene uzanan r ve yörünge hızıyla hesaplanır. Dünya’nın kendi ekseni etrafındaki dönme momenti farklı bir niceliktir. Yıldıza yaklaşan gezegen için mr² değişimi, gezegenin kendi katı cisim dönme momentinin değişmesi demek değildir.",
          "Eliptik yörüngede genel korunan bağıntı m r v_teğet veya m r² dθ/dt biçimindedir. mrv bütün süratle ancak hız yarıçapa dik olduğunda kullanılabilir; en yakın ve en uzak noktalarda bu koşul sağlanır. Diğer noktalarda sin θ çarpanını unutmak yanlış oran verir."
        ]
      },
      {
        "title": "Topaç yön değiştirirken ne korunur",
        "paragraphs": [
          "Hızlı dönen topaç, temas noktası çevresinde ağırlığın torkuyla yön değiştirebilir. Bu, her koşulda dış torkun sıfır olduğu veya L vektörünün sabit kaldığı anlamına gelmez. Yön değiştiren bir L için dL/dt sıfır değildir; uygun yaklaşık kararlı presesyonda büyüklük yaklaşık sabit kalabilir.",
          "Kaynaklardaki topaç ve jiroskop örneklerini, dönmenin cisme dış etkilerden tam bağışıklık kazandırması gibi yorumlama. Sürtünme, yatış açısı, başlangıç hareketi ve dönme sürati önemlidir. Bu ünitenin nicel modeli sabit simetri eksenini kullanır; üç boyutlu topaç hareketini sahte bir düzlemsel döngüyle temsil etmez."
        ]
      },
      {
        "title": "Korunum sorusunda sistem sınırını yaz",
        "paragraphs": [
          "Çözümde önce O referansını ve pozitif dönme yönünü çiz; hangi parçaların sistem içinde olduğunu listele. Sonra bu sistemin O’ya göre net dış torkuna bak. Korunum şartını sağlıyorsa işaretli L toplamlarını eşitle; sağlamıyorsa dış açısal itmeyi ekle.",
          "Sonucun enerji bakımından anlamını ayrıca sorgula. I azalırken |ω| artması L’nin artışı değildir; L sıfırken simetrik iki parçanın iç hareketleri bile toplamı sıfır tutabilir. Modelde gerekçeni toplam I ve dış tork üzerinden kur; yalnız hızlı görünen animasyona bakarak karar verme."
        ]
      }
    ],
    "examples": [
      {
        "title": "Doğrusal cismin açısal momentumu",
        "prompt": "O sabit eylemsiz noktasına göre m=3 kg parçacık r=(2;1) m konumunda ve v=(1;4) m/s hızında. L_z nedir?",
        "strategy": "r×p çapraz çarpımının z bileşenini kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "p=mv=(3;12) kg·m/s."
          },
          {
            "label": "2. adım",
            "explanation": "L_z=xp_y−yp_x=2×12−1×3=21 kg·m²/s."
          },
          {
            "label": "3. adım",
            "explanation": "Pozitif işaret +z, yani sayfadan dışarı yönü verir; dairesel yörünge bilgisine ihtiyaç yoktur."
          }
        ],
        "answer": "L_z = +21 kg·m²/s.",
        "check": "r ile v dik değildir; mvr kısa biçimi kullanılamaz.",
        "pitfall": "Türkçe ondalık virgülle vektör bileşenlerini karıştırmamak için çiftlerde noktalı virgül kullan."
      },
      {
        "title": "İki ağırlık içeri gelir",
        "prompt": "Sabit eksenli düzenekte merkez gövde I=1 kg·m², iki noktasal ağırlığın her biri 1 kg. İlk yarıçap 2 m, son 1 m ve ilk ω=2 rad/s. Net dış tork yok. Son ω ve enerji değişimi?",
        "strategy": "Gövde ve iki kütleyi sistem içinde tut.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "I_i=1+2×1×2²=9; I_s=1+2×1×1²=3 kg·m²."
          },
          {
            "label": "2. adım",
            "explanation": "L=9×2=18 kg·m²/s korunur; ω_s=18/3=6 rad/s."
          },
          {
            "label": "3. adım",
            "explanation": "K_i=9×2²/2=18 J; K_s=3×6²/2=54 J. Net 36 J artış, şekil değiştiren iç mekanizmanın işinden gelir."
          }
        ],
        "answer": "ω_s = 6 rad/s; ΔK = +36 J.",
        "check": "I üçte bire inerken ω üç katına çıkar; L aynı kalır.",
        "pitfall": "Enerji artışını yoktan üretim veya L artışı diye yorumlama."
      },
      {
        "title": "Dış torkun işaretli etkisi",
        "prompt": "Sabit O ekseninde ilk L_z=+10 kg·m²/s. Sisteme 2 s boyunca sabit τ_z=−3 N·m etki ediyor. Son L_z nedir?",
        "strategy": "Tork–zaman alanını ilk L’ye ekle.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "ΔL_z=τ_zΔt=−3×2=−6 N·m·s."
          },
          {
            "label": "2. adım",
            "explanation": "L_s=L_i+ΔL=10−6=+4 kg·m²/s."
          },
          {
            "label": "3. adım",
            "explanation": "L hâlâ pozitif olduğundan dönme yönü tersine dönmemiş; yalnız bu bileşen azalmıştır."
          }
        ],
        "answer": "+4 kg·m²/s.",
        "check": "Tork daha uzun sürerse L sıfırı geçebilir; 2 s içinde geçmez.",
        "pitfall": "Negatif tork var diye son L’yi otomatik negatif yazma."
      },
      {
        "title": "İki disk ortak döner",
        "prompt": "Aynı sabit eksende I_A=2 ve I_B=6 kg·m² iki disk var. A başlangıçta +4 rad/s, B durgun. Dış tork yok; sürtünmeyle bağlanıp ortak hıza geliyorlar. Son ω ve K?",
        "strategy": "Önce L toplamını koru, ardından enerji kaybını hesapla.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk L=2×4+6×0=8 kg·m²/s; son I=8 kg·m²."
          },
          {
            "label": "2. adım",
            "explanation": "ω_s=8/8=+1 rad/s. K_i=2×4²/2=16 J."
          },
          {
            "label": "3. adım",
            "explanation": "K_s=8×1²/2=4 J. 12 J dönme enerjisi iç enerjiye dönüşür; toplam L korunur."
          }
        ],
        "answer": "ω_s = +1 rad/s; K_s = 4 J; 12 J iç enerji artışı.",
        "check": "Son hız başlangıçtaki iki hız arasında olmalı.",
        "pitfall": "Ortak dönüşe geçişte kinetik enerjiyi korumaya zorlayıp açısal momentumla çelişme."
      }
    ],
    "recall": [
      {
        "prompt": "Bir cisim düz çizgide giderken açısal momentumu olabilir mi?",
        "answer": "Evet. Seçilen sabit nokta hareket doğrusu dışında ise L=mvd sıfır olmayabilir."
      },
      {
        "prompt": "Dış tork sıfır ve I azalıyorsa hangi nicelik kesin korunur?",
        "answer": "Uygun sabit referans ve sistem için toplam açısal momentum; dönme enerjisi korunmak zorunda değildir."
      },
      {
        "prompt": "Elipste her noktada L=mrv kullanılır mı?",
        "answer": "Hayır. Genel olarak L=mrv sinθ=mrv_teğet; mrv yalnız hız ile yarıçap dikken geçerlidir."
      },
      {
        "prompt": "Sabit I için tork ile açısal ivme ilişkisi nedir?",
        "answer": "τ_net=Iα. I değişirse genel denklem d(Iω)/dt kullanılmalıdır."
      }
    ],
    "items": [
      {
        "prompt": "Sabit O’ya göre r=(3;0) m konumunda m=2 kg parçacık v=(0;4) m/s hızında. +z sayfadan dışarıysa L_z kaç kg·m²/s olur?",
        "hint": "Önce p=mv, sonra xp_y−yp_x.",
        "explanation": "p_y=8 kg·m/s; L_z=3×8=+24 kg·m²/s.",
        "options": [
          "−24",
          "+12",
          "+24",
          "0",
          "+8"
        ],
        "answer": 2
      },
      {
        "prompt": "m=2 kg cisim yatay doğru boyunca sağa 5 m/s sabit hızla gidiyor. Sabit O noktası bu doğrunun 3 m altında. O’ya göre L_z hangi değerdedir? +x sağa, +y yukarı.",
        "hint": "O’dan cisme y bileşeni +3 m; momentum yalnız +x yönünde.",
        "explanation": "L_z=xp_y−yp_x=0−3×(2×5)=−30 kg·m²/s. Düz hareket L’yi sıfıra zorlamaz.",
        "options": [
          "+30 kg·m²/s",
          "0",
          "−10 kg·m²/s",
          "+15 kg·m²/s",
          "−30 kg·m²/s"
        ],
        "answer": 4
      },
      {
        "prompt": "Net dış torkun ihmal edildiği sabit eksenli bir sporcunun I değeri 6’dan 2 kg·m²’ye inerken ilk açısal hızı +3 rad/s. Son açısal hız nedir?",
        "hint": "I_iω_i=I_sω_s.",
        "explanation": "L=6×3=18; ω_s=18/2=+9 rad/s.",
        "options": [
          "+9 rad/s",
          "+1 rad/s",
          "+3 rad/s",
          "+6 rad/s",
          "−9 rad/s"
        ],
        "answer": 0
      },
      {
        "prompt": "Sabit O ekseninde L_z=+8 kg·m²/s. 4 s boyunca sabit τ_z=−3 N·m uygulanıyor. Son L_z nedir?",
        "hint": "İşaretli tork–zaman alanı −12’dir.",
        "explanation": "L_s=8−3×4=−4 kg·m²/s; bu kez sıfır geçilerek yön tersine dönmüştür.",
        "options": [
          "+4 kg·m²/s",
          "+20 kg·m²/s",
          "−12 kg·m²/s",
          "−4 kg·m²/s",
          "0"
        ],
        "answer": 3
      },
      {
        "prompt": "Bir parçacığa yalnız sabit O merkezine yönelen çekim kuvveti etki ediyor. O’ya göre hangisi kesin doğrudur?",
        "hint": "Merkezî kuvvetin O’ya göre torkunu düşün.",
        "explanation": "r ile F paralel/ters paralel olduğundan r×F=0. Bu L’yi korur; elipste sürat ve K değişebilir.",
        "options": [
          "Çizgisel momentum vektörü korunur.",
          "Açısal momentum korunur.",
          "Sürat her yörüngede sabittir.",
          "Net kuvvet sıfırdır.",
          "Kinetik enerji her noktada aynıdır."
        ],
        "answer": 1
      },
      {
        "prompt": "Sabit simetri eksenli sistemde net dış tork yok. İlk ve son durumda bütün parçalar ortak ω ile dönüyor; radyal hızlar sıfır. I değeri 4 katına çıkarken sıfır olmayan toplam L korunuyor. Dönme kinetik enerjisinin son/ilk oranı nedir?",
        "hint": "Sabit L için K=L²/(2 I).",
        "explanation": "K, I ile ters orantılıdır; I 4 kat olunca K dörtte bire iner. Şekil değişiminde enerji aktarımı ayrıca gerçekleşir.",
        "options": [
          "1/16",
          "1/4",
          "1/2",
          "1",
          "4"
        ],
        "answer": 1
      },
      {
        "prompt": "Sabit simetri ekseninde I=0,5 kg·m² disk başlangıçta ω=−4 rad/s ile dönüyor. τ_net=+2 N·m sabit ve I değişmiyor. 1 s sonrasındaki ω nedir?",
        "hint": "α=τ/I=+4 rad/s².",
        "explanation": "ω_s=−4+4×1=0 rad/s. Pozitif tork ilk negatif dönüşü yavaşlatır.",
        "options": [
          "−8 rad/s",
          "−2 rad/s",
          "+2 rad/s",
          "0 rad/s",
          "+4 rad/s"
        ],
        "answer": 3
      },
      {
        "prompt": "Aynı sabit eksende I_A=1 ve I_B=3 kg·m² diskler sırasıyla +8 ve 0 rad/s ile başlıyor. Dış tork olmadan bağlanıp ortak dönüyorlar. Ortak ω nedir?",
        "hint": "İlk toplam L’yi toplam son I’ye böl.",
        "explanation": "L_i=1×8=8; I_s=4; ω_s=8/4=+2 rad/s.",
        "options": [
          "+2 rad/s",
          "+4 rad/s",
          "+6 rad/s",
          "+8 rad/s",
          "−2 rad/s"
        ],
        "answer": 0
      },
      {
        "prompt": "Bir parçacık için r ile p vektörleri arasındaki açı 30°. |r|=2 m, |p|=10 kg·m/s. Açısal momentum büyüklüğü nedir?",
        "hint": "Çapraz çarpımın büyüklüğünde sinθ bulunur.",
        "explanation": "L=rp sin 30°=2×10×0,5=10 kg·m²/s.",
        "options": [
          "0",
          "5 kg·m²/s",
          "20 kg·m²/s",
          "20√3 kg·m²/s",
          "10 kg·m²/s"
        ],
        "answer": 4
      },
      {
        "prompt": "Sabit bir eksene göre toplam L sabitken iç motor iki ağırlığı eksene yaklaştırıp I’yi azaltıyor. Dönme kinetik enerjisi artıyorsa bu artışın açıklaması nedir?",
        "hint": "K=L²/(2 I) ve enerji kaynağını birlikte düşün.",
        "explanation": "Sabit L’de I azalması K’yi artırır. Motorun iç enerji kaynağı iş yapar; sistemin toplam enerjisi ile yalnız dönme K’si farklıdır.",
        "options": [
          "Açısal momentum yoktan üretilir.",
          "Dış tork zorunlu sıfırdan farklıdır.",
          "İç motor iş yaparak enerji aktarır; L korunumu K’yi sabitlemez.",
          "I azalınca enerji negatifleşir.",
          "K artışı enerji korunumu ilkesini çürütür."
        ],
        "answer": 2
      }
    ],
    "source": "MEBİ AYT Fizik Açısal Momentum (PDF 163–167), OGM 12 Fizik 005 ve Dersler Cepte 12 Fizik 2. sayı PDF 12–14 kullanılarak hazırlanmış özgün öğretim. Genel r×p ile sabit eksen Iω koşulları ayrılmıştır; sorular resmî sınav kopyası değildir."
  },
  {
    "id": "newton-genel-cekim-yasasi",
    "topic": "detail-388",
    "title": "Newton genel çekim yasası",
    "minutes": 40,
    "objectives": [
      "Hangi cismi nokta gibi ele alabiliriz",
      "Çekim alanı birim kütleye kuvvettir",
      "İşin işareti ve yakın yüzey yaklaşımı"
    ],
    "sections": [
      {
        "title": "Kütleler birbirini çeker",
        "paragraphs": [
          "Bir elmanın düşmesi ile Ay’ın yörüngede kalması, Newton modelinde aynı kütle çekim etkileşimiyle açıklanır. İki noktasal kütle arasındaki kuvvet her iki cismi birbirine doğru çeker. Büyüklük F=Gm₁m₂/r²; r iki nokta arasındaki uzaklık, G yaklaşık 6,67×10⁻¹¹ N·m²/kg² olan evrensel sabittir.",
          "Bu kuvvet yalnız büyük gök cisimleri arasında bulunmaz; masayla kitap veya iki küçük kütle arasında da vardır. Küçük oluşu günlük deneyde başka kuvvetlerin yanında fark edilmesini zorlaştırır. Evrensel çekim denirken her problemde yerin g değerini 10 almak yerine ilgili kütle ve merkez uzaklığını kullanırız."
        ]
      },
      {
        "title": "Hangi cismi nokta gibi ele alabiliriz",
        "paragraphs": [
          "Küresel simetrili bir cismin dışındaki çekim, toplam kütle merkezde toplanmış gibi hesaplanabilir. Bu koşul sağlandığında gezegenin yarıçapı R ve yüzeyden yükseklik h için r=R+h olur. İki dış küre için uzaklık, yüzeyler arasındaki boşluk değil merkezler arası uzaklıktır.",
          "Küresel olmayan yakın bir kütle dağılımında yalnız merkezleri bilmek genel olarak yeterli değildir; parçaların vektörel katkılarını toplamak gerekir. Homojen kürenin iç noktasında ise tüm kütleyi merkeze yığılmış gibi kullanmak yanlış ve merkezde sahte sonsuzluk üretir. İç ve dış modellerin koşulunu baştan ayır."
        ]
      },
      {
        "title": "Ters kare ilişkisini oranla oku",
        "paragraphs": [
          "Kütleler sabitken uzaklık iki katına çıkarsa kuvvet dörtte bire, üç katına çıkarsa dokuzda bire iner. Bir kütle iki katına çıkarsa kuvvet iki katına çıkar. Birden çok değişiklikte oranı F_s/F_i=(m₁s/m₁i)(m₂s/m₂i)(r_i/r_s)² biçiminde kur.",
          "Kuvvet–uzaklık eğrisi dış bölgede 1/r² yasasına uyar; bu bir doğru veya parabol değildir. Aynı eksen aralıklarını seçip çok uzaktaki kuvvetin küçüldüğünü gözle. Sonlu bir dış uzaklıkta ideal Newton kuvveti tam sıfır olmaz; sonsuzda sıfıra yaklaşır. Elektrostatik kuvvet de uzun menzillidir, sonsuz menzil çekime özgü değildir."
        ]
      },
      {
        "title": "Etki ve tepki farklı cisimlerdedir",
        "paragraphs": [
          "Birinci kütlenin ikinciye uyguladığı F₁₂ ile ikincinin birinciye uyguladığı F₂₁ aynı anda eşit büyüklükte ve zıt yönlüdür. İki vektör aynı cisme etki etmediği için tek cismin net kuvvet hesabında birbirini götürmez. Büyük gezegen küçük uyduyu ne kadar çekerse uydu da gezegeni o büyüklükte çeker.",
          "İvmeler ise F/m olduğundan kütleler farklıysa genellikle eşit değildir. İki cisimli sistem kütle merkezi çevresinde hareket eder. Çok büyük merkezî kütle ve çok küçük uydu yaklaşımında gezegeni sabit kabul etmek işe yarar; kuvvet eşitliğini bozmuş olmayız, yalnız gezegenin çok küçük hareketini ihmal ederiz."
        ]
      },
      {
        "title": "Çekim alanı birim kütleye kuvvettir",
        "paragraphs": [
          "Bir konumdaki çekim alanı g=F/m olarak tanımlanır. Küresel cismin dışında büyüklük GM/r² ve yön merkezedir. Alanın birimi N/kg ile m/s² eşdeğerdir. İdeal serbest düşmede başka kuvvet yoksa bu alan aynı zamanda cismin ivmesini verir.",
          "Aynı konuma 1 kg veya 5 kg deney kütlesi koymak, büyük merkezî cismin alanını değiştirmediğimiz test yaklaşımında g’yi değiştirmez. Kuvvet ise deney kütlesiyle büyür. Kütle, ağırlık, çekim alanı ve tartının gösterdiği destek kuvveti dört ayrı kavramdır; serbest düşen tartı sıfır gösterebilirken çekim alanı sıfır değildir."
        ]
      },
      {
        "title": "Yüzeyden yükseğe çıkarken uzaklığı doğru kur",
        "paragraphs": [
          "Yüzeydeki çekim alanı g₀=GM/R² ise h yüksekliğinde g_h/g₀=R²/(R+h)² olur. h=R seçilirse merkez uzaklığı 2 R ve alan g₀/4 çıkar. Yüzeyin hemen üstünde küçük h/R için g az değişir; yakın-yüzey sabit g modeli bu sınıra dayanır.",
          "Dünya üzerinde ölçülen etkin ağırlık dönme, enlem, yükseklik ve yerel kütle dağılımından da etkilenebilir. Bu ünitenin küre modeli dönmeyen ideal cisimdir. Gerçek Dünya’nın her yerinde tam aynı g bulunduğunu veya grafik değerlerinin gerçek yeraltı ölçümü olduğunu iddia etmiyoruz."
        ]
      },
      {
        "title": "Homojen kürenin içinde yalnız iç kütle etkili olur",
        "paragraphs": [
          "Küresel simetrili bir kabuğun içindeki çekim katkıları birbirini götürür. Özkütlesi sabit bir kürede r<R için içeride kalan kütle M_i=M(r/R)³ olur. Dolayısıyla alan büyüklüğü GM_i/r²=GM r/R³; yüzeydeki çekim alanı cinsinden g=g₀r/R’dir.",
          "Merkezde simetriden alan sıfır, yüzeyde g₀ ve dışarıda g₀(R/r)² bulunur. İç ve dış değerler yüzeyde birleşir. İçeride g’nin doğrusal değişmesi yalnız homojen dağılıma aittir; gerçek Dünya katmanlı olduğundan buradaki çizgi doğrudan gerçek Dünya grafiği diye sunulamaz."
        ]
      },
      {
        "title": "Potansiyel enerji sıfırı bir seçimdir",
        "paragraphs": [
          "Dış bölgede sonsuz uzaklıkta U=0 seçilirse iki kütlenin potansiyel enerjisi U=−GMm/r olur. Negatif U, potansiyel enerjinin sonsuzdaki referanstan küçük olduğunu anlatır. Bağlı yörüngeyi U tek başına değil toplam mekanik enerji E belirler; kaçan cismin de sonlu uzaklıkta U değeri negatif olabilir. U’nun eksili olması kuvvetin büyüklüğünün negatif olduğunu veya enerjinin anlamsız olduğunu göstermez.",
          "Cisim uzaklaştığında U, negatiften sıfıra doğru artar. Birim kütle başına potansiyel φ=U/m=−GM/r olup J/kg birimi taşır. Homojen kürenin içinde φ=−GM[3−(r/R)²]/(2 R) olur; merkezde alan sıfır olmasına rağmen potansiyel sıfır değildir. Alan ile potansiyeli ayrı göster."
        ]
      },
      {
        "title": "İşin işareti ve yakın yüzey yaklaşımı",
        "paragraphs": [
          "Kütleyi yavaşça r₁’den r₂>r₁ konumuna taşırken yalnız çekim ve dış taşıma kuvveti varsa ΔK yaklaşık sıfırdır. Dış iş ΔU=GMm(1/r₁−1/r₂)>0, çekimin işi bunun negatifidir. Kuvvet–uzaklık eğrisinin integrali sonlu bir kurtarma işi verir; üst sınır sonsuza uzarken birikmiş iş sıfıra gitmez.",
          "h≪R iken yüzeyden h yukarı için ΔU yaklaşık m g₀ h olur. Büyük yüksekliklerde g sabit alınamaz; tam 1/r biçimini kullan. Başlangıç ve son kinetik enerji değişiyorsa dış işi yalnız ΔU’ya eşitlemek yerine ΔK+ΔU bilançosunu yaz."
        ]
      },
      {
        "title": "Dairesel uyduda çekim gerekli net kuvvettir",
        "paragraphs": [
          "Yalnız kütle çekiminin etkisindeki dairesel uydu için GMm/r²=mv²/r olur. Buradan v=√(GM/r) ve T=2π√(r³/GM) çıkar. Uydu kütlesi bu büyük merkezî kütle yaklaşımında sadeleşir. Çekimin yanına ikinci bir gerçek merkezcil kuvvet ekleme; çekim zaten radyal net kuvvettir.",
          "Dairesel yörüngede kuvvet hız vektörüne dik olduğundan çekim güç aktarmaz ve sürat sabittir; hızın yönü yine değişir. Eliptik yörüngede kuvvet her noktada hıza dik değildir ve sürat değişir. Dairesel v formülünü elipsin her anındaki r’ye koşulsuz uygulamak yanlıştır."
        ]
      },
      {
        "title": "Dairesel yörüngenin enerji bütçesi",
        "paragraphs": [
          "Dairesel hızdan K=GMm/(2 r), U=−GMm/r ve toplam E=−GMm/(2 r) elde edilir. U negatif, K pozitif ve |U|=2 K’dır. Toplam enerjinin negatif olması bağlı yörüngeyle uyumludur; bu ifade enerjiyi sıfır seçtiğimiz sonsuz referansına bağlıdır.",
          "Pozitif bağlanma enerjisi, bağlı yörüngeden enerjiyi sıfıra yükseltmek için gereken en küçük ek enerjidir: −E=GMm/(2 r). Bazı özetlerde negatif toplam mekanik enerji de bağlanma enerjisi adıyla geçebilir. Soruda hangi işaretli nicelik istendiğini açıkça belirt; burada ek enerji daima pozitif olarak tanımlanır."
        ]
      },
      {
        "title": "Kurtulma süratinde başlangıç durumu önemlidir",
        "paragraphs": [
          "Dış r konumunda yalnız çekim etkisiyle sonsuza gidip orada sıfır sürate yaklaşan cisim için ilk toplam enerji sıfırdır. mv_k²/2−GMm/r=0 verir: v_k=√(2 GM/r). Dairesel hızın √2 katıdır. Bu ideal enerji eşiği atmosferi, çarpışmayı ve başka gök cisimlerini dışarıda bırakır.",
          "Başlangıçta r’de durgun cismi kurtarmak için gerekli enerji GMm/r; zaten dairesel yörüngedeki cisme gereken en küçük ek enerji GMm/(2 r)’dir. Bunları aynı başlangıç deneyi gibi kullanma. Yön seçimi de önemlidir: içeriye fırlatılan cisim enerjisi yeterli olsa bile gezegene çarpabilir; kaçışın çarpışmasız dış yola açık olması gerekir."
        ]
      },
      {
        "title": "Uydu sabit görünürken nasıl hareket eder",
        "paragraphs": [
          "Yer yüzeyindeki sabit bir noktadan gökyüzünde sabit görünen ideal haberleşme uydusu Dünya’nın dönmesiyle eş açısal hızla aynı yönde dolanır. Bunun için dairesel, ekvator düzlemindeki ve dönüş yönüyle aynı yönlü yörünge gerekir. Yalnız periyodu bir gün olan her yörünge yer sabit değildir.",
          "Uydu motoru sürekli iterek yerçekimini yok etmez; uygun yörüngede serbest düşme hareketi yapar. Gerçek yörünge düzeltmeleri ve atmosfer sürüklemesi ayrı etkilerdir. Uydular haberleşme yanında hava ve çevre gözlemi, yer ölçümü ve navigasyonda kullanılır; her görev aynı yörünge koşulunu gerektirmez. Mevcut ülke uydu sayısı zamanla değiştiğinden eski kaynaklardaki sayıları değişmez fizik bilgisi gibi ezberletmek yerine yörünge koşulunu öğren."
        ]
      },
      {
        "title": "Grafik, birim ve sınır denetimi",
        "paragraphs": [
          "Modelde yarıçap ve uzaklık ayrı denetimlerdir: r=0 merkez, r=R yüzey, r=2 R yüzeyden bir yarıçap yüksekliktir. İç eğri doğrusal yükselir; dış eğri ters kare azalır. Kuvvet oku içeri bakarken tepki diğer cisim üzerinde dışarı yönelir. Potansiyelin sürekliliği ile alanın sıfır olduğu noktaları ayrı denetle.",
          "Çözüme başlamadan r’nin merkezden ölçüldüğünü, küresel simetriyi, dönme/atmosfer ihmalini ve merkezî kütle yaklaşımını yaz. Sonra F birimini N, g’yi N/kg, U’yu J ve periyodu saniye kontrol et. Formül ezberinden önce hangi fiziksel durumun hangi bağıntıyı gerektirdiğini açıklayabilmek amaçtır."
        ]
      }
    ],
    "examples": [
      {
        "title": "Çekim kuvvetini SI ile hesapla",
        "prompt": "Küresel simetrili bir gezegenin dışındaki r=2×10⁷ m konumunda M=6×10²⁴ kg, test kütlesi m=2 kg. G=6,67×10⁻¹¹ N·m²/kg². Kuvvet büyüklüğü?",
        "strategy": "Önce r karesini ve onluk üsleri ayrı kur.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "r²=(2×10⁷)²=4×10¹⁴ m²."
          },
          {
            "label": "2. adım",
            "explanation": "F=6,67×10⁻¹¹×6×10²⁴×2/(4×10¹⁴)=2,001 N."
          },
          {
            "label": "3. adım",
            "explanation": "Kuvvetin yönü gezegen merkezine doğrudur. Aynı konumda g=F/m=1,0005 N/kg."
          }
        ],
        "answer": "F=2,001 N; g=1,0005 N/kg.",
        "check": "Kuvveti 2 kg’a bölünce alan çıkar; ikinci bir merkezcil kuvvet eklenmez.",
        "pitfall": "Yalnız 10⁷yi kareleyip baştaki 2’yi karelemeyi unutma."
      },
      {
        "title": "Kürenin içi ve dışı",
        "prompt": "Homojen, dönmeyen kürenin yüzey çekim alanı g₀=12 N/kg. Merkezden R/2 ve 2 R uzaklıklarında alan büyüklükleri?",
        "strategy": "İçeride doğrusal, dışarıda ters kare modeli seç.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "R/2 iç noktadır: g_i=g₀r/R=12×1/2=6 N/kg."
          },
          {
            "label": "2. adım",
            "explanation": "2 R dış noktadır: g_d=g₀(R/r)²=12/4=3 N/kg."
          },
          {
            "label": "3. adım",
            "explanation": "Alanlar merkez yönlüdür; merkezde 0, yüzeyde 12 N/kg olarak sürekli birleşir."
          }
        ],
        "answer": "İçte 6 N/kg, dışta 3 N/kg.",
        "check": "İç noktanın alanı bu homojen modelde yüzeyinkinden küçük olmalı.",
        "pitfall": "İçeriye de bütün M ile GM/r² uygulayıp alanı büyütme."
      },
      {
        "title": "İdeal dairesel uydu",
        "prompt": "GM=4×10¹⁴ m³/s² olan küresel gezegenin dışındaki r=10⁷ m dairesel yörüngede küçük uydu var. v ve T nedir?",
        "strategy": "Çekimi radyal net kuvvete eşitle; periyodu çevre/süratle bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "v²=GM/r=4×10⁷ m²/s²; v=2000√10 m/s."
          },
          {
            "label": "2. adım",
            "explanation": "T=2πr/v=10000π/√10 s; eşdeğer biçimi 2π√(2,5×10⁶) s."
          },
          {
            "label": "3. adım",
            "explanation": "Yaklaşık v=6325 m/s ve T=9935 s bulunur. Bu sayılar verilen ideal gezegen içindir."
          }
        ],
        "answer": "v=2000√10 m/s; T=10000π/√10 s.",
        "check": "T²/r³=4π²/(GM) sabitini sağlar.",
        "pitfall": "r’yi yüzeyden yükseklik sanma; verilen r merkez uzaklığıdır."
      },
      {
        "title": "Yörüngeden kurtulmak için ek enerji",
        "prompt": "GM=4×10¹⁴ m³/s² gezegenin dışında r=10⁷ m dairesel yörüngede m=1000 kg uydu var. Sonsuzda sıfır sürate ulaşacak çarpışmasız kaçış için en küçük ek mekanik enerji?",
        "strategy": "Önce mevcut toplam enerjiyi bul; hedef enerjiyi 0 seç.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "K=GMm/(2 r)=2×10¹⁰ J; U=−GMm/r=−4×10¹⁰ J."
          },
          {
            "label": "2. adım",
            "explanation": "İlk toplam E=K+U=−2×10¹⁰ J. Sonsuzda sıfır süratle E_s=0."
          },
          {
            "label": "3. adım",
            "explanation": "ΔE=0−(−2×10¹⁰)=+2×10¹⁰ J. Başlangıçta aynı konumda durgun olsaydı gereken enerji iki kat olurdu."
          }
        ],
        "answer": "En küçük ek enerji 2×10¹⁰ J.",
        "check": "Bağlı toplam enerji negatif; onu sıfıra çıkaran enerji pozitiftir.",
        "pitfall": "Zaten bulunan dairesel kinetik enerjiyi yok sayıp kurtarma enerjisini iki kat hesaplama."
      }
    ],
    "recall": [
      {
        "prompt": "Yüzeyden R kadar yükselmek neden g’yi dörtte bire indirir?",
        "answer": "Merkez uzaklığı R’den 2 R’ye çıkar; dış çekim GM/r² ile değişir."
      },
      {
        "prompt": "Homojen küre merkezinde alan sıfırken potansiyel de sıfır mıdır?",
        "answer": "Hayır. Sonsuzda sıfır referansıyla merkez potansiyeli −3 GM/(2 R) olur; alan bir potansiyel farkı/eğimiyle ilgilidir."
      },
      {
        "prompt": "Büyük gezegen küçük uyduya daha büyük karşılıklı kuvvet mi uygular?",
        "answer": "Hayır. Kuvvetler eşit ve zıt; ivmeler farklı kütlelerden dolayı farklı olabilir."
      },
      {
        "prompt": "Dairesel yörüngeden kurtarma ek enerjisi hangi işaretle tanımlandı?",
        "answer": "Pozitif −E=GMm/(2 r); negatif olan yörüngenin toplam mekanik enerjisidir."
      }
    ],
    "items": [
      {
        "prompt": "İki noktasal kütlenin çekim kuvveti F. Bir kütle 2 katına, aralarındaki uzaklık 3 katına çıkarılırken diğer kütle sabit. Yeni kuvvet nedir?",
        "hint": "Kütle doğrusal, uzaklık karesel etkilidir.",
        "explanation": "F_s/F_i=2/3²=2/9.",
        "options": [
          "F/9",
          "2 F/3",
          "2 F/9",
          "3 F/2",
          "18 F"
        ],
        "answer": 2
      },
      {
        "prompt": "İki noktasal cismin her biri 10⁶ kg ve aralarındaki uzaklık 10 m. G=6,67×10⁻¹¹ N·m²/kg² verilirse karşılıklı çekim kuvvetinin büyüklüğü kaç N olur?",
        "hint": "m₁m₂=10¹², r²=100.",
        "explanation": "F=6,67×10⁻¹¹×10¹²/100=0,667 N. Her iki kuvvet bu büyüklüktedir.",
        "options": [
          "0,0667",
          "6,67",
          "66,7",
          "0,00667",
          "0,667"
        ],
        "answer": 4
      },
      {
        "prompt": "Dönmeyen küresel gezegenin yüzeydeki çekim alanı g₀. Yüzeyden gezegen yarıçapı kadar yükselince çekim alanı nedir?",
        "hint": "Yeni merkez uzaklığı 2 R’dir.",
        "explanation": "g=GM/(2 R)²=g₀/4.",
        "options": [
          "g₀/4",
          "g₀/2",
          "g₀",
          "2 g₀",
          "0"
        ],
        "answer": 0
      },
      {
        "prompt": "Homojen kürenin yüzeydeki çekim alanı g₀. Merkezden R/3 ve 3 R uzaklıklarındaki alan büyüklükleri oranı g(R/3)/g(3 R) nedir?",
        "hint": "İçte g₀r/R, dışta g₀(R/r)².",
        "explanation": "İçte g₀/3, dışta g₀/9; oran 3 olur.",
        "options": [
          "1/3",
          "1",
          "9",
          "3",
          "27"
        ],
        "answer": 3
      },
      {
        "prompt": "Küresel iki gezegenden B’nin kütlesi A’nın 2 katı, yarıçapı 2 katı. Dönme ihmal. Yüzey çekim alanı g_B/g_A nedir?",
        "hint": "Yüzeyde g=GM/R².",
        "explanation": "Oran 2/(2²)=1/2.",
        "options": [
          "1/4",
          "1/2",
          "1",
          "2",
          "4"
        ],
        "answer": 1
      },
      {
        "prompt": "Aynı dış konumda 1 kg cisme 8 N çekim kuvveti etki ediyor. Test yaklaşımında aynı yere 4 kg cisim konursa kuvvet ve çekim ivmesi ne olur?",
        "hint": "Alan deney kütlesinden bağımsızdır; kuvvet mg.",
        "explanation": "g=8/1=8 m/s², F=4×8=32 N.",
        "options": [
          "8 N ve 2 m/s²",
          "32 N ve 8 m/s²",
          "32 N ve 32 m/s²",
          "2 N ve 8 m/s²",
          "8 N ve 8 m/s²"
        ],
        "answer": 1
      },
      {
        "prompt": "Yalnız çekim etkisindeki küçük uydu aynı küresel gezegen çevresinde r ve 4 r yarıçaplı iki ayrı dairesel yörüngede düşünülsün. Uzak yörüngenin sürati yakın yörüngenin kaç katıdır?",
        "hint": "Dairesel hız √(GM/r).",
        "explanation": "Yarıçap 4 kat olunca sürat 1/√4=1/2 olur. Bu iki ayrı dairesel yörünge karşılaştırmasıdır.",
        "options": [
          "1/4",
          "1/8",
          "2",
          "1/2",
          "4"
        ],
        "answer": 3
      },
      {
        "prompt": "İdeal dairesel yörüngede uydu kinetik enerjisi 100 J. Sonsuzda potansiyel 0 seçilmiş. Toplam mekanik enerji ve bu yörüngeden çarpışmasız kaçış için en küçük ek enerji nedir?",
        "hint": "Dairesel yörüngede U=−2 K ve E=−K.",
        "explanation": "U=−200 J, E=100−200=−100 J; enerjiyi 0’a yükseltmek için +100 J gerekir.",
        "options": [
          "−100 J ve +100 J",
          "+100 J ve 0",
          "−200 J ve +200 J",
          "0 ve +100 J",
          "−100 J ve +200 J"
        ],
        "answer": 0
      },
      {
        "prompt": "Dönmeyen homojen kürenin tam merkezindeki bir test kütlesi için hangisi doğrudur? Sonsuzda potansiyel 0 seçilmiştir.",
        "hint": "Simetri net alanı sıfırlar; potansiyel katkıları skaler toplanır.",
        "explanation": "Homojen küre merkezinde g=0 ve φ=−3 GM/(2 R)<0. Potansiyel ile alan aynı nicelik değildir.",
        "options": [
          "Alan sonsuz, potansiyel sıfırdır.",
          "Alan ve potansiyel ikisi de sıfırdır.",
          "Alan dışarı yönlüdür.",
          "Potansiyel deney kütlesi arttıkça pozitifleşir.",
          "Çekim alanı sıfır, potansiyel negatiftir."
        ],
        "answer": 4
      },
      {
        "prompt": "Dünya’ya göre gökyüzünde sabit görünen ideal bir uydu için aşağıdakilerden hangisi yeterli yörünge koşullarını birlikte verir?",
        "hint": "Sabit görünmek için konumun Dünya ile aynı dönüşü izlemesi gerekir.",
        "explanation": "Periyot eşitliği tek başına yeterli değildir. Ekvator düzlemi, dairesellik ve aynı yön/açısal hız birlikte yer sabit koşulunu sağlar.",
        "options": [
          "Herhangi bir düzlemde 24 s periyot.",
          "Dünya’ya göre durgun, yerçekimi sıfır konum.",
          "Dairesel ekvator yörüngesi; Dünya ile aynı yönde ve aynı açısal hız.",
          "Kutup düzleminde herhangi bir dairesel yörünge.",
          "Dünya’nın ters yönünde eşit süratli her yörünge."
        ],
        "answer": 2
      }
    ],
    "source": "MEBİ AYT Fizik Kütle Çekim Kuvveti (PDF 168–173), Dersler Cepte 12 Fizik 3. sayı PDF 10–12 ve OGM 12 Fizik 007 kapsamı kullanılarak hazırlanmış özgün öğretim. Homojen küre, büyük merkezî kütle, dairesel yörünge ve enerji referansı koşulları açıkça ayrılmıştır."
  },
  {
    "id": "kepler-yasalari",
    "topic": "detail-389",
    "title": "Kepler yasaları",
    "minutes": 40,
    "objectives": [
      "Birinci yasa: merkezde değil odakta",
      "Alan hızını açısal momentumla açıkla",
      "Elipste zamanı düzgün açıyla taklit etme"
    ],
    "sections": [
      {
        "title": "Gözlemlerden yörünge yasalarına",
        "paragraphs": [
          "Gezegen hareketini anlamak için önce uzun süreli ve hassas gökyüzü gözlemleri gerekir. Tycho Brahe’nin gözlem verilerini inceleyen Johannes Kepler, gezegenlerin hareketini üç yasayla tanımladı. İlk iki yasa 1609, üçüncü yasa 1619’da yayımlandı. Bunlar gözlemsel düzenliliklerdir; Newton’un 1687’deki kuvvet kuramından önce gelir.",
          "Newton’un evrensel çekim yasası daha sonra bu düzenliliklerin mekanik açıklamasını sağladı. Kepler’in yasaları Newton kuvvetinden tarihsel olarak türettiğini söylemek yanlıştır. Gözlem, matematiksel betimleme ve nedensel kuram birbirini tamamlar; aynı şey değildir."
        ]
      },
      {
        "title": "Birinci yasa: merkezde değil odakta",
        "paragraphs": [
          "İdeal iki cisimli bağlı yörünge elipstir; büyük merkezî yıldız yaklaşımında yıldız elipsin bir odağında bulunur. Elipsin merkezini, odaklarını ve gezegenin yıldızdan uzaklığını ayrı işaretle. Çember, iki odağın birleştiği e=0 özel elipsidir.",
          "Elipsin büyük yarı ekseni a, küçük yarı ekseni b ve dış merkezliği e olsun. Odak–merkez uzaklığı ae, b=a√(1−e²), en yakın uzaklık r_p=a(1−e), en uzak uzaklık r_a=a(1+e) olur. Yıldız iki odakta birden bulunmaz; ikinci odak fiziksel olarak ikinci bir yıldız gerektirmez."
        ]
      },
      {
        "title": "Yarı ekseni yakın ve uzak noktadan bul",
        "paragraphs": [
          "En yakın ve en uzak uzaklığın toplamı 2 a, farkı 2 ae olur. Böylece a=(r_p+r_a)/2 ve e=(r_a−r_p)/(r_a+r_p) bulunur. a, sorularda ortalama yarıçap diye de adlandırılabilir; burada bu terim yalnız iki uç uzaklığın aritmetik ortalamasıdır.",
          "Bu a değeri, gezegenin zamana göre ortalama uzaklığı olmak zorunda değildir. Gezegen uzakta daha uzun süre geçirir; zaman ortalaması farklı ağırlıklar içerir. Bir grafikteki geometrik orta noktayı veya herhangi bir anlık r’yi periyot yasasındaki a yerine koyma."
        ]
      },
      {
        "title": "İkinci yasa eşit zamanda eşit alan söyler",
        "paragraphs": [
          "Yıldızdan gezegene çizilen yarıçap vektörü eşit zaman aralıklarında eşit alanlar tarar. Tarayan şey gezegenin izinin altındaki dikdörtgen değil, yıldız odağı ile yörünge yayı arasındaki sektördür. Bu nedenle odağın doğru yerde çizilmesi fiziksel sonucu etkiler.",
          "Eşit alanlar aynı yay uzunluğu veya aynı merkez açısı anlamına gelmez. Yıldıza yakınken yarıçap kısa olduğundan aynı alanı kısa sürede taramak için daha uzun bir yörünge yayı alınır; gezegen daha süratlidir. Çember özel hâlinde uzaklık sabit olduğundan eşit süreler eşit yay ve açılara da karşılık gelir."
        ]
      },
      {
        "title": "Alan hızını açısal momentumla açıkla",
        "paragraphs": [
          "Kısa zamanda taranan alan dA = |r×v|dt/2 olur. Merkezî çekimin yıldız odağına göre torku sıfırdır; dolayısıyla h=|r×v|=L/m korunur ve dA/dt=h/2 sabit kalır. Bu, alanlar yasasının Newton mekaniğiyle açıklamasıdır.",
          "Genel bağıntı r v_teğet sabittir. Hız ile yarıçap her yerde dik olmadığından r·sürat çarpımı her noktada sabit değildir. En yakın ve en uzak uçlarda radyal hız sıfır olduğundan r_pv_p=r_av_a kullanılabilir. Aynı kısa formülü elipsin gelişigüzel iki noktasına taşımamalısın."
        ]
      },
      {
        "title": "Süratin değişmesini iş ve enerjiyle izle",
        "paragraphs": [
          "Yıldızın çekimi daima yıldıza doğrudur. Yaklaşma sırasında kuvvetin hız yönünde bileşeni vardır; çekim pozitif iş yapar ve sürat artar. Uzaklaşırken iş negatiftir ve sürat azalır. En yakın/en uzak noktalarda o an kuvvet ile hız diktir; sürat o noktada bir uç değerdedir.",
          "Bu nedenle eliptik yörüngenin sürati sabit değildir. İdeal vis-viva bağıntısı v²=μ(2/r−1/a), μ=GM ile her noktadaki sürati verir. Kinetik ve potansiyel enerji değişirken toplam özgül enerji ε=−μ/(2 a) sabittir. Yalnız aynı a’ya sahip yörüngelerin toplam özgül enerjileri eşittir."
        ]
      },
      {
        "title": "Üçüncü yasa aynı merkezî kütlede karşılaştırır",
        "paragraphs": [
          "Büyük merkezî kütle yaklaşımında T²/a³=4π²/(GM) olur. Aynı yıldız çevresindeki küçük gezegenler veya aynı gezegen çevresindeki küçük uydular bu sabiti paylaşır. İki farklı merkezî yıldızın kütlesi farklıysa aynı sabiti kullanamayız.",
          "İki yörünge için T₂/T₁=(a₂/a₁)^(3/2) yazılır. a dört katına çıkarsa periyot sekiz katına çıkar. Birimleri aynı seçmeden oran kurma; kilometre ile metre veya gün ile yıl değerlerini karıştırmak fizik yasasını bozmaz ama hesabı bozar. Genel iki cisimli bağıntıda GM yerine G(M+m) bulunur."
        ]
      },
      {
        "title": "Eşit süreli alanı toplam elipsten bul",
        "paragraphs": [
          "Bir tam turda yarıçap vektörü elipsin tüm πab alanını tarar. Sabit alan hızı nedeniyle Δt sürede taranan alan A=πab·Δt/T olur. Yörüngenin neresinden başlandığı bu alanı değiştirmez; fakat sektörün açısı ve yayı değişebilir.",
          "Örneğin toplam alan 80 alan birimi ve periyot 20 zaman birimiyse 3 zaman biriminde 12 alan birimi taranır. Bu hesapta eşit açılı dilimler çizmek yerine eşit süre koşulunu uygula. Uygulamadaki sektörler yalnız dekoratif eş büyüklükte dilimler değildir; aynı Kepler zaman denkleminden üretilir."
        ]
      },
      {
        "title": "Elipste zamanı düzgün açıyla taklit etme",
        "paragraphs": [
          "Gezegenin gerçek açısı eşit zamanlarda eşit artmaz. Hesap modelinde ortalama anomali M=2πt/T düzgün artar; dış merkez anomali E, M=E−e sinE denklemiyle bulunur. Odağa göre konum x=a(cosE−e), y=b sinE olur. Bu eşitlikler hem elipsi hem zamanlamayı belirler.",
          "M ile E ve yıldızdan ölçülen gerçek açıyı aynı sanma. Çemberde üçü aynılaşır; dış merkezlik büyüdükçe ayrılırlar. Modelin zaman sürgüsünü eşit aralıklarla ilerlet ve yakın bölgede gezegenin daha çok yer değiştirdiğini gözle. Bu bir sayısal öğretim modeli olup gerçek bir gezegenin güncel konumunu iddia etmez."
        ]
      },
      {
        "title": "Kuvvet, hız ve yörünge çizgisini ayrı oku",
        "paragraphs": [
          "Yörüngeye teğet hız oku ile yıldız odağına yönelen çekim ivmesi oku farklı niceliklerdir. Elipsin merkezine doğru ivme çizmek odağı yanlış yere taşır. Konum vektörü yıldızdan gezegene, kuvvet ise bunun tersine bakar; yörüngeyi izleyen bir kuvvet oku doğru olmaz.",
          "Modelde uzunluk, sürat ve ivme oklarının ölçekleri ayrı ve açık verilir; farklı birimleri sırf aynı uzunlukta göründüler diye eşitleme. İki eşit zaman sektörü karşıt yörünge bölgelerinden alınır; aynı alan değerleri HTML sonucunda sayısal olarak da sunulur. Hareketi kendin adımlarsın; otomatik döngü öğrenme puanı oluşturmaz."
        ]
      },
      {
        "title": "Yer merkezinden elipse uzanan modeller",
        "paragraphs": [
          "Batlamyus, Yer merkezli gök modelini sistemleştirdi; gökte görülen hareketleri Dünya çevresindeki daireli düzeneklerle betimledi. Kopernik daha sonra Güneş merkezli gezegen sistemini dairesel hareketlerle kurdu. Merkezin değiştirilmesi ile yörüngenin elips olduğunun bulunması aynı tarihsel adım değildir.",
          "Brahe’nin hassas konum verileri, dairesel modelin kimi gezegen gözlemleriyle uyumsuzluğunu sınamaya imkân verdi. Kepler bu veri çizgisinde elips, eşit alan ve periyot yasalarına ulaştı; Newton daha sonra merkezî çekim açıklamasını geliştirdi. Gözlemle daha iyi uyuşan modeli seçmek, önceki her fikrin aynı anda ve tek ölçümle ortadan kalktığını söylemek değildir."
        ]
      },
      {
        "title": "Gökyüzü bilgisinin tarihsel emeği",
        "paragraphs": [
          "Uluğ Bey’in Semerkant gözlemevindeki çalışmalar ve yıldız kataloğu hassas konum bilgisinin gelişimine katkı verdi. Ali Kuşçu matematik ve astronomi çalışmalarını Semerkant geleneğinden İstanbul’a taşıdı. Galileo teleskopla Ay yüzeyi, Güneş lekeleri ve Jüpiter uyduları gibi gözlemleri geliştirerek gök modelinin sınanmasına katkı sağladı.",
          "Galileo’yu teleskobun ilk mucidi ilan etmek yerine onu geliştiren ve astronomiye uygulayan önemli gözlemcilerden biri olarak anlatmak gerekir. Tarihsel modelleri de tek gözlemle bütün evrenin ispatı gibi sunma. Bu bölüm kişilerin kaynakta belirtilen somut katkılarını, fizik yasasının varsayımlarıyla karıştırmadan bağlama yerleştirir."
        ]
      },
      {
        "title": "Yasaların geçerlilik sınırını çözümde belirt",
        "paragraphs": [
          "Kepler modelinde merkezî, ters kare çekim; bağlı yörünge; ihmal edilebilir direnç ve başka cisim etkisi varsayılır. Çok güçlü kütle çekim, belirgin diğer gezegen etkileri veya itki gibi koşullarda küçük sapmalar veya farklı hareketler görülebilir. Lise düzeyindeki bu model doğru koşullarda son derece yararlıdır.",
          "Soruyu çözerken önce aynı merkez mi, verilen uzaklık a mı r mi, hız uç noktada mı ve zaman aralıkları eşit mi diye sırayla kontrol et. Hesaptan sonra e=0 sınırında çember sonucuna, büyüyen a ile artan periyoda ve pozitif alan değerlerine bak. Böylece ezberlenmiş oran yerine neden doğru olduğunu bildiğin bir çözüm kurarsın."
        ]
      }
    ],
    "examples": [
      {
        "title": "İki uç uzaklıktan elips",
        "prompt": "İdeal yörüngede yıldızdan en yakın uzaklık 2 u, en uzak uzaklık 6 u. u sabit bir uzunluk birimi. Büyük yarı eksen ve dış merkezlik?",
        "strategy": "Uç uzaklıkların toplamını ve farkını kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "a=(r_p+r_a)/2=(2 u+6 u)/2=4 u."
          },
          {
            "label": "2. adım",
            "explanation": "e=(r_a−r_p)/(r_a+r_p)=(6−2)/(6+2)=1/2."
          },
          {
            "label": "3. adım",
            "explanation": "Odak–merkez uzaklığı ae=2 u, küçük yarı eksen b=a√(1−e²)=2√3 u olur."
          }
        ],
        "answer": "a=4 u; e=0,5; b=2√3 u.",
        "check": "r_p=a(1−e)=2 u, r_a=a(1+e)=6 u ile geri kontrol edilir.",
        "pitfall": "a’yı elipsin tam büyük eksen uzunluğu 8 u ile karıştırma."
      },
      {
        "title": "Periyot karşılaştırması",
        "prompt": "Aynı büyük yıldız çevresindeki iki küçük gezegenin yarı büyük eksenleri a ve 4 a. İç yörünge periyodu 3 yıl. Dış yörünge periyodu?",
        "strategy": "Üçüncü yasa aynı merkezî kütle için oranlanır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "T_dış/T_iç=(4 a/a)^(3/2)=4√4=8."
          },
          {
            "label": "2. adım",
            "explanation": "T_dış=8×3=24 yıl."
          },
          {
            "label": "3. adım",
            "explanation": "Dış merkezlikler farklı olsa da aynı a bağıntısı ve aynı merkezî kütle yaklaşımıyla bu oran geçerlidir."
          }
        ],
        "answer": "24 yıl.",
        "check": "Daha uzaktaki yörüngenin periyodu daha uzun olmalı.",
        "pitfall": "Periyodu yarı eksenle doğrusal artırıp 12 yıl bulma."
      },
      {
        "title": "Yakın ve uzak uçtaki sürat",
        "prompt": "Aynı elipste r_p=2×10⁷ m, r_a=6×10⁷ m. En yakın noktadaki sürat 12 km/s. En uzak noktadaki sürat?",
        "strategy": "İki uçta hız radyal doğrultuya diktir; açısal momentumu koru.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Uç noktalarda r_pv_p=r_av_a."
          },
          {
            "label": "2. adım",
            "explanation": "v_a=(2×10⁷)/(6×10⁷)×12=4 km/s."
          },
          {
            "label": "3. adım",
            "explanation": "Oran hesabında iki uzaklık aynı birimde, iki hız da aynı birimde kalır. Ortadaki bir noktaya aynı rv bağıntısı koşulsuz uygulanamaz."
          }
        ],
        "answer": "4 km/s.",
        "check": "Uzak uçta sürat daha küçük; 3 kat uzaklıkta bu uç çiftinde 3 kat küçüktür.",
        "pitfall": "Genel noktada hızın teğetsel bileşeni yerine bütün sürati kullanma."
      },
      {
        "title": "Aynı zamanda taranan gerçek alan",
        "prompt": "İdeal elipsin yarı eksenleri a=4 u, b=2√3 u. Periyot 8π s. Herhangi bir başlangıçtan 2π s sürede taranan alan nedir?",
        "strategy": "Sabit alan hızını toplam elips alanından çıkar.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "A_toplam=πab=8π√3 u²."
          },
          {
            "label": "2. adım",
            "explanation": "Δt/T=(2π)/(8π)=1/4."
          },
          {
            "label": "3. adım",
            "explanation": "A_tarama=A_toplam/4=2π√3 u². Aynı süreyi yörüngenin öbür ucunda başlatsan alan değişmez."
          }
        ],
        "answer": "2π√3 u².",
        "check": "Pozitif süre periyodun dörtte biri; alan da toplamın dörtte biridir.",
        "pitfall": "Eşit alanı eşit merkez açısı olarak çizme; odak merkezde değildir."
      }
    ],
    "recall": [
      {
        "prompt": "Elipste yıldız hangi noktadadır?",
        "answer": "Büyük merkezî kütle yaklaşımında odaklardan birinde; elipsin merkezinde olmak zorunda değildir."
      },
      {
        "prompt": "Eşit zamanda eşit alan neyi eşitlemez?",
        "answer": "Genel elipste yay uzunluğunu, gerçek açıyı veya sürati eşitlemez; çember özel durumdur."
      },
      {
        "prompt": "T²/a³ sabiti ne zaman iki cisim için aynıdır?",
        "answer": "Aynı baskın merkezî kütle çevresindeki küçük yörünge cisimleri için; farklı merkezî kütlelerde genel olarak değişir."
      },
      {
        "prompt": "r_pv_p=r_av_a neden iki uçta kullanılabilir?",
        "answer": "Uçlarda radyal hız sıfırdır ve hız yarıçapa diktir; genel L=mrvsinθ bu noktalarda mrv olur."
      }
    ],
    "items": [
      {
        "prompt": "İdeal Kepler elipsinde büyük merkezî yıldızın konumu için hangisi doğrudur?",
        "hint": "Birinci yasa odağı tanımlar.",
        "explanation": "Yıldız odaklardan birindedir. Çember özel hâlinde iki odak merkezde birleşir.",
        "options": [
          "Her zaman elipsin merkezindedir.",
          "İki odakta aynı anda bulunur.",
          "Elipsin odaklarından birindedir.",
          "Gezegenin her anki hız ucundadır.",
          "Elipsin dışında olmak zorundadır."
        ],
        "answer": 2
      },
      {
        "prompt": "Bir elipste yıldıza en yakın uzaklık 3 u, en uzak uzaklık 9 u. Büyük yarı eksen a ve dış merkezlik e nedir?",
        "hint": "a toplamın yarısı; e farkın toplama oranıdır.",
        "explanation": "a=(3+9)/2=6 u; e=(9−3)/(9+3)=1/2.",
        "options": [
          "a=12 u; e=1/2",
          "a=6 u; e=1/3",
          "a=3 u; e=2",
          "a=9 u; e=0",
          "a=6 u; e=1/2"
        ],
        "answer": 4
      },
      {
        "prompt": "Aynı büyük yıldız çevresinde küçük iki gezegenin yarı büyük eksen oranı a₂/a₁=9. Periyot oranı T₂/T₁ nedir?",
        "hint": "Periyot yarı eksenin 3/2 kuvvetiyle orantılıdır.",
        "explanation": "9^(3/2)=9×3=27.",
        "options": [
          "27",
          "3",
          "9",
          "18",
          "81"
        ],
        "answer": 0
      },
      {
        "prompt": "Bir gezegen aynı elipste eşit süreli iki aralıkta yıldız yarıçap vektörüyle A₁ ve A₂ alanlarını tarıyor. Biri yıldıza yakın, öteki uzakta. Hangisi kesin doğrudur?",
        "hint": "İkinci yasa alanı süreyle bağlar.",
        "explanation": "Eşit süreler eşit alan verir; genel elipste yay ve açılar eşit olmak zorunda değildir.",
        "options": [
          "İki yay uzunluğu da eşittir.",
          "İki gerçek açı da eşittir.",
          "İki aralıkta sürat sabittir.",
          "A₁=A₂.",
          "Uzak aralıktaki alan daha büyüktür."
        ],
        "answer": 3
      },
      {
        "prompt": "Bir gezegenin aynı elipste en yakın uzaklığı 2 u, en uzak uzaklığı 5 u. Yakın uçta sürat 10 v ise uzak uçta sürat nedir?",
        "hint": "İki uçta r_pv_p=r_av_a.",
        "explanation": "v_a=(2/5)×10 v=4 v.",
        "options": [
          "2 v",
          "4 v",
          "5 v",
          "10 v",
          "25 v"
        ],
        "answer": 1
      },
      {
        "prompt": "İdeal elipsin toplam alanı 120 u², periyodu 30 s. Herhangi bir başlangıçtan 5 s sürede yıldız yarıçap vektörü kaç u² alan tarar?",
        "hint": "Alan/süre oranı sabittir.",
        "explanation": "A=120×5/30=20 u². Başlangıç yeri sonucu değiştirmez.",
        "options": [
          "4",
          "20",
          "12",
          "24",
          "60"
        ],
        "answer": 1
      },
      {
        "prompt": "İki ayrı yıldızın kütleleri M ve 4 M. Her birinin çevresinde aynı a yarı büyük eksenli çok küçük bir gezegen var. T_(4 M)/T_M nedir?",
        "hint": "T=2π√(a³/GM); aynı a’da T∝1/√M.",
        "explanation": "Merkezî kütle 4 katına çıkınca periyot yarıya iner. Farklı yıldızlarda T²/a³ sabiti eşit alınamaz.",
        "options": [
          "1/4",
          "1",
          "2",
          "1/2",
          "4"
        ],
        "answer": 3
      },
      {
        "prompt": "İdeal eliptik yörüngede, gezegen yıldızdan uzaklaşırken çekim kuvvetinin yaptığı anlık işin işareti ve süratin değişimi nedir?",
        "hint": "Uzaklaşma hız bileşeni dışarı, çekim içeri yönlüdür.",
        "explanation": "F·v<0 olduğundan çekim kinetik enerjiyi azaltır. Yalnız uç noktalarda anlık radyal hız sıfırdır.",
        "options": [
          "İş negatiftir; sürat azalır.",
          "İş pozitiftir; sürat artar.",
          "İş sıfırdır; sürat her yerde sabittir.",
          "İş negatiftir; sürat artar.",
          "İş pozitiftir; sürat azalır."
        ],
        "answer": 0
      },
      {
        "prompt": "Bir elipste e=0 yapılırken yarı büyük eksen a sabit tutuluyor. Hangisi doğrudur?",
        "hint": "e=0 için b=a ve iki odak birleşir.",
        "explanation": "Çember Kepler elipsinin özel hâlidir; alan ve periyot yasaları geçerliliğini korur.",
        "options": [
          "Yarı eksen sıfırlanır.",
          "Periyot zorunlu sıfıra iner.",
          "Yıldız iki ayrı odakta kalır.",
          "Alanlar yasası geçersizleşir.",
          "Yörünge çember olur; yıldız merkezde ve sürat sabit olur."
        ],
        "answer": 4
      },
      {
        "prompt": "Kepler yasalarının gelişimi için hangi ifade tarihsel olarak doğrudur?",
        "hint": "Kepler 1609/1619, Newton 1687 kronolojisini düşün.",
        "explanation": "Kepler Brahe’nin gözlem verileriyle yasaları betimledi; Newton daha sonra bunları merkezî çekimle açıkladı. Gözlem ve mekanik açıklama ayrıdır.",
        "options": [
          "Kepler yasalarını 1687’de Newton’dan öğrendi.",
          "Galileo teleskobu ilk kez icat ederek üç yasayı yazdı.",
          "Kepler gözlemsel yasaları Newton’un evrensel çekim açıklamasından önce ortaya koydu.",
          "Uluğ Bey Newton’un çekim sabitini ölçtü.",
          "Yasalar gökyüzü gözlemi kullanılmadan kuruldu."
        ],
        "answer": 2
      }
    ],
    "source": "MEBİ AYT Fizik Kepler Kanunları (PDF 174–176), Dersler Cepte 12 Fizik 3. sayı PDF 13–14 ve OGM 12 Fizik 007 konu özeti karşılaştırılarak yazılmış özgün anlatım ve sorular. Yarı büyük eksen ile zaman ortalaması, gözlemsel tarih ile Newton açıklaması ayrılmıştır."
  }
];

export const forge021PhysicsTopics: Record<string, string> = Object.fromEntries(packs021.map(p => [p.id, p.topic]));
export const forge021PhysicsGuides: LessonGuide[] = packs021.map(p => ({ id: p.id, minutes: p.minutes, objectives: p.objectives, sections: p.sections, examples: p.examples, recall: p.recall, source: p.source }));
export const forge021PhysicsLessons: Lesson[] = packs021.map(p => ({ id: p.id, subjectId: "ayt-fizik", title: txt(p.title), minutes: p.minutes, objectives: p.objectives.map(txt), body: p.sections.map(s => ({ title: txt(s.title), text: txt(s.paragraphs.join("\n\n")) })), source: txt(p.source), tags: [p.topic, "Özgün öğretim soruları"], questions: p.items.map((q, i) => ({ id: `f021-${p.id}-${i + 1}`, prompt: txt(q.prompt), options: q.options.map(txt), answer: q.answer, hint: txt(q.hint), explanation: txt(q.explanation), skill: p.id })) }));
