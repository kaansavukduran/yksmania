import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";

const finite018 = (...values: number[]) => values.every(Number.isFinite);
const bounded018 = (n: number, lo: number, hi: number) =>
  Number.isFinite(n) && n >= lo && n <= hi;
const zero018 = (n: number) => (Object.is(n, -0) ? 0 : n);
export type Vector018 = { x: number; y: number };

/** Two constant net-force intervals, fixed positive mass, inertial laboratory frame. */
export function impulse018(
  mass: number,
  initialVelocity: number,
  forceA: number,
  durationA: number,
  forceB: number,
  durationB: number,
  time: number,
) {
  if (
    !bounded018(mass, 0.1, 100) ||
    !bounded018(initialVelocity, -100, 100) ||
    !bounded018(forceA, -1000, 1000) ||
    !bounded018(forceB, -1000, 1000) ||
    !bounded018(durationA, 0.1, 60) ||
    !bounded018(durationB, 0.1, 60) ||
    !bounded018(time, 0, durationA + durationB)
  )
    throw new RangeError("IMPULSE018_SCOPE");
  const firstTime = Math.min(time, durationA),
    secondTime = Math.max(0, time - durationA);
  const impulseA = forceA * firstTime,
    impulseB = forceB * secondTime;
  const initialMomentum = mass * initialVelocity,
    impulse = zero018(impulseA + impulseB);
  const momentum = zero018(initialMomentum + impulse),
    velocity = zero018(momentum / mass);
  const firstDisplacement =
    initialVelocity * firstTime + ((forceA / mass) * firstTime * firstTime) / 2;
  const junctionVelocity = initialVelocity + (forceA * durationA) / mass;
  const displacement = zero018(
    firstDisplacement +
      junctionVelocity * secondTime +
      ((forceB / mass) * secondTime * secondTime) / 2,
  );
  return {
    mass,
    initialVelocity,
    forceA,
    durationA,
    forceB,
    durationB,
    time,
    firstTime,
    secondTime,
    impulseA,
    impulseB,
    impulse,
    initialMomentum,
    momentum,
    velocity,
    displacement,
    selectedForce:
      time < durationA ? forceA : time < durationA + durationB ? forceB : 0,
    totalDuration: durationA + durationB,
  };
}

/** Central one-dimensional impact: body A is left of B; uA>=uB. No external impulse. */
export function collision018(
  massA: number,
  massB: number,
  velocityA: number,
  velocityB: number,
  restitution: number,
) {
  if (
    !bounded018(massA, 0.1, 100) ||
    !bounded018(massB, 0.1, 100) ||
    !bounded018(velocityA, -100, 100) ||
    !bounded018(velocityB, -100, 100) ||
    !bounded018(restitution, 0, 1) ||
    velocityA < velocityB
  )
    throw new RangeError("COLLISION018_SCOPE");
  const totalMass = massA + massB,
    initialMomentum = massA * velocityA + massB * velocityB;
  const afterA = zero018(
    (initialMomentum - massB * restitution * (velocityA - velocityB)) /
      totalMass,
  );
  const afterB = zero018(
    (initialMomentum + massA * restitution * (velocityA - velocityB)) /
      totalMass,
  );
  const initialKinetic = (massA * velocityA ** 2 + massB * velocityB ** 2) / 2;
  const finalKinetic = (massA * afterA ** 2 + massB * afterB ** 2) / 2;
  const loss =
    (((massA * massB) / totalMass) *
      (1 - restitution ** 2) *
      (velocityA - velocityB) ** 2) /
    2;
  return {
    massA,
    massB,
    velocityA,
    velocityB,
    restitution,
    afterA,
    afterB,
    initialMomentum,
    finalMomentum: massA * afterA + massB * afterB,
    initialKinetic,
    finalKinetic,
    loss,
    impulseA: massA * (afterA - velocityA),
    impulseB: massB * (afterB - velocityB),
    approaching: velocityA > velocityB,
  };
}

/** Massless knot, two taut ropes above the horizontal, downward given load W. */
export function concurrent018(
  weight: number,
  leftAngle: number,
  rightAngle: number,
) {
  if (
    !bounded018(weight, 1, 1000) ||
    !bounded018(leftAngle, 5, 85) ||
    !bounded018(rightAngle, 5, 85)
  )
    throw new RangeError("CONCURRENT018_SCOPE");
  const a = (leftAngle * Math.PI) / 180,
    b = (rightAngle * Math.PI) / 180;
  const left = (weight * Math.cos(b)) / Math.sin(a + b),
    right = (weight * Math.cos(a)) / Math.sin(a + b);
  const leftVector = { x: -left * Math.cos(a), y: left * Math.sin(a) };
  const rightVector = { x: right * Math.cos(b), y: right * Math.sin(b) };
  return {
    weight,
    leftAngle,
    rightAngle,
    left,
    right,
    leftVector,
    rightVector,
    sumX: leftVector.x + rightVector.x,
    sumY: leftVector.y + rightVector.y - weight,
    includedAngle: 180 - leftAngle - rightAngle,
  };
}

/** Cartesian coordinates: +x right, +y up; signed out-of-page moment is positive. */
export function torque018(
  point: Vector018,
  force: Vector018,
  pivot: Vector018 = { x: 0, y: 0 },
) {
  if (
    ![point, force, pivot].every((p) => p && finite018(p.x, p.y)) ||
    ![point.x, point.y, pivot.x, pivot.y].every((v) => Math.abs(v) <= 10) ||
    ![force.x, force.y].every((v) => Math.abs(v) <= 100)
  )
    throw new RangeError("TORQUE018_SCOPE");
  const rx = point.x - pivot.x,
    ry = point.y - pivot.y;
  const moment = zero018(rx * force.y - ry * force.x),
    magnitude = Math.hypot(force.x, force.y);
  // Normalize before projection: dividing twice by a subnormal force can overflow.
  const largest = Math.max(Math.abs(force.x), Math.abs(force.y));
  const scaledX = largest === 0 ? 0 : force.x / largest,
    scaledY = largest === 0 ? 0 : force.y / largest,
    scaledNorm = Math.hypot(scaledX, scaledY),
    ux = largest === 0 ? 0 : scaledX / scaledNorm,
    uy = largest === 0 ? 0 : scaledY / scaledNorm,
    projection = rx * ux + ry * uy;
  const foot =
    magnitude === 0
      ? null
      : {
          x: point.x - projection * ux,
          y: point.y - projection * uy,
        };
  return {
    point,
    force,
    pivot,
    rx,
    ry,
    moment,
    magnitude,
    arm: magnitude === 0 ? null : Math.abs(rx * uy - ry * ux),
    foot,
    sense: moment > 0 ? "Saatin tersi" : moment < 0 ? "Saat yönü" : "Sıfır",
  };
}

export type MassPoint018 = Vector018 & { mass: number };
/** Finite point masses, including zero for removed cells. Zero total mass has no centre. */
export function centre018(points: MassPoint018[]) {
  if (
    !Array.isArray(points) ||
    points.length > 64 ||
    points.some(
      (p) =>
        !p ||
        !bounded018(p.mass, 0, 100) ||
        !bounded018(p.x, -10, 10) ||
        !bounded018(p.y, -10, 10),
    )
  )
    throw new RangeError("CENTRE018_SCOPE");
  const mass = points.reduce((n, p) => n + p.mass, 0);
  const momentX = points.reduce((n, p) => n + p.mass * p.x, 0),
    momentY = points.reduce((n, p) => n + p.mass * p.y, 0);
  return {
    mass,
    momentX,
    momentY,
    centre: mass === 0 ? null : { x: momentX / mass, y: momentY / mass },
  };
}

/** Ideal fixed/single movable pulley, vertical parallel rope strands, quasistatic rise. */
export function pulley018(
  load: number,
  movingWeight: number,
  strands: number,
  height: number,
) {
  if (
    !bounded018(load, 1, 1000) ||
    !bounded018(movingWeight, 0, 100) ||
    ![1, 2].includes(strands) ||
    (strands === 1 && movingWeight !== 0) ||
    !bounded018(height, 0, 5)
  )
    throw new RangeError("PULLEY018_SCOPE");
  const totalWeight = load + movingWeight,
    effort = totalWeight / strands;
  const pull = strands * height,
    inputWork = effort * pull,
    usefulWork = load * height,
    accessoryWork = movingWeight * height;
  return {
    load,
    movingWeight,
    strands,
    height,
    totalWeight,
    effort,
    pull,
    inputWork,
    usefulWork,
    accessoryWork,
    gain: load / effort,
    loss: zero018(inputWork - usefulWork - accessoryWork),
  };
}

/** Force is parallel up a fixed ramp; upward constant-speed sliding, specified Coulomb kinetic friction. */
export function ramp018(
  weight: number,
  length: number,
  height: number,
  mu: number,
) {
  if (
    !bounded018(weight, 1, 1000) ||
    !bounded018(length, 1, 10) ||
    !bounded018(height, 0, length) ||
    !bounded018(mu, 0, 1)
  )
    throw new RangeError("RAMP018_SCOPE");
  const sin = height / length,
    cos = Math.sqrt(Math.max(0, 1 - sin * sin));
  const normal = weight * cos,
    friction = mu * normal,
    effort = weight * sin + friction;
  const inputWork = effort * length,
    usefulWork = weight * height,
    heat = friction * length;
  return {
    weight,
    length,
    height,
    mu,
    sin,
    cos,
    normal,
    friction,
    effort,
    inputWork,
    usefulWork,
    heat,
    efficiency: inputWork === 0 ? null : usefulWork / inputWork,
    gain: effort === 0 ? null : weight / effort,
  };
}

export type Charge018 = Vector018 & { microCoulomb: number };
/** Point charges in a homogeneous, linear dielectric; source charges held fixed. */
export function coulomb018(
  sources: Charge018[],
  target: Charge018,
  relativePermittivity: number,
) {
  const validCharge = (q: Charge018) =>
    q &&
    bounded018(q.x, -10, 10) &&
    bounded018(q.y, -10, 10) &&
    bounded018(q.microCoulomb, -10, 10);
  if (
    !Array.isArray(sources) ||
    sources.length > 8 ||
    sources.some((q) => !validCharge(q)) ||
    !validCharge(target) ||
    !bounded018(relativePermittivity, 1, 20)
  )
    throw new RangeError("COULOMB018_SCOPE");
  const k = 9e9 / relativePermittivity;
  const contributions = sources.map((source) => {
    const dx = target.x - source.x,
      dy = target.y - source.y,
      distance = Math.hypot(dx, dy);
    if (distance < 0.1) throw new RangeError("COULOMB018_COINCIDENT");
    const factor = (k * source.microCoulomb * 1e-6) / distance ** 3;
    const field = { x: zero018(factor * dx), y: zero018(factor * dy) };
    const force = {
      x: zero018(target.microCoulomb * 1e-6 * field.x),
      y: zero018(target.microCoulomb * 1e-6 * field.y),
    };
    return {
      source,
      distance,
      field,
      force,
      reaction: { x: zero018(-force.x), y: zero018(-force.y) },
    };
  });
  const field = contributions.reduce(
    (a, c) => ({ x: a.x + c.field.x, y: a.y + c.field.y }),
    { x: 0, y: 0 },
  );
  const force = {
    x: zero018(target.microCoulomb * 1e-6 * field.x),
    y: zero018(target.microCoulomb * 1e-6 * field.y),
  };
  return {
    sources,
    target,
    relativePermittivity,
    k,
    contributions,
    field,
    force,
    fieldMagnitude: Math.hypot(field.x, field.y),
    forceMagnitude: Math.hypot(force.x, force.y),
  };
}

const packs = [
  {
    id: "itme-momentum",
    topic: "detail-369",
    title: "İtme ve momentum: kuvvetin zaman içindeki izi",
    minutes: 120,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 70–79; OGM 11. sınıf İtme ve Çizgisel Momentum, Momentumun Korunumu I–II özetleri. Kaynaklar incelenerek yazılmış özgün öğretim ve sorular; resmî sınav sorusu değildir.",
    objectives: [
      "İşaretli kuvvet–zaman alanını momentum değişimine bağla.",
      "Sistem ve dış itme seçimiyle momentum korunumunun koşulunu kur.",
      "Esnek, kısmen esnek ve kenetlenmeli çarpışmayı kinetik enerjiyle ayır.",
    ],
    sections: [
      {
        title: "Momentumun yönünü kütle değil hız belirler",
        paragraphs: [
          "Sabit kütleli bir cismin çizgisel momentumu p=m v vektörüdür. SI birimi kg·m/s, eşdeğeri N·s olur. Aynı süratle sağa ve sola giden iki cismin momentum büyüklükleri eşit olabilir fakat vektörleri eşit değildir. Sağ yönü artı seçince sola 4 m/s giden 2 kg cismin momentumu −8 kg·m/s yazılır.",
          "Momentum ile kinetik enerji aynı nicelik değildir: K=mv²/2 skaler ve negatif olmayan bir enerjidir. Aynı momentum büyüklüğünde K=p²/(2m) olduğundan daha küçük kütle daha büyük kinetik enerji taşıyabilir. Bir soruda momentumların toplamını ararken sürat veya enerji toplamını onun yerine koyma.",
        ],
      },
      {
        title: "İtme bir kuvvetin etkisini süreyle biriktirir",
        paragraphs: [
          "Bir kuvvetin itmesi zaman integralidir; sabit kuvvet için I=F Δt kullanılır. Momentum değişimine eşit olan, cisme etki eden bütün dış kuvvetlerin net itmesidir. Yalnız vuruş kuvveti verilmişse ağırlık gibi diğer kuvvetlerin itmesinin ihmal edildiği veya ayrıca hesaba katıldığı belirtilmelidir.",
          "Kısa çarpışmada aynı Δp daha uzun sürede gerçekleşirse ortalama net kuvvetin büyüklüğü küçülür. Hava yastığı ve esnek minder bu fikre örnektir; bu, tepe kuvvetin veya bütün yaralanma risklerinin tek başına kesin hesaplandığı anlamına gelmez. Ortalama kuvvet F_ort=Δp/Δt ile bulunur, her andaki kuvvet aynı olmak zorunda değildir.",
        ],
      },
      {
        title: "Kuvvet–zaman grafiğinde alan işaretlidir",
        paragraphs: [
          "Bir boyutta F–t grafiğinin zaman ekseninin üstündeki alanı pozitif, altındaki alanı negatiftir. Dikdörtgende F Δt, üçgende taban·yükseklik/2, yamukta paralel kenarların ortalaması·süre kullanılır. Bu alan N·s birimiyle momentum değişimidir; grafiğin eğimi momentum değişimi değildir.",
          "İlk momentum p0 verilmeden yalnız toplam itmeden son momentum bulunamaz. Eşit pozitif ve negatif alanlar toplam Δp=0 verebilir; cisim ara zamanda hızlanmış, durmuş veya ters dönmüş olabilir. Son momentumun ilkine dönmesi bütün ara hareketin veya alınan yolun sıfır olduğunu göstermez.",
        ],
      },
      {
        title: "Geri sıçramada son eksi ilk",
        paragraphs: [
          "Momentum değişimi Δp=p_son−p_ilk olarak hesaplanır. Duvara doğru +6 m/s ile giden 0,5 kg top −4 m/s ile dönerse Δp=0,5(−4−6)=−5 N·s olur. Süratlerin farkını 6−4 diye almak yön değişimini kaybettirir.",
          "Pürüzsüz sabit duvara eğik esnek çarpmada teğet hız bileşeni aynı kalıp normal bileşen ters dönebilir. O zaman değişim normal doğrultudadır. Bu dar sonuç, duvarda sürtünme varsa veya duvar hareketliyse otomatik uygulanmaz. İki boyutlu farkta x ve y momentumlarını ayrı çıkar, sonra gerekirse büyüklük al.",
        ],
      },
      {
        title: "Sistemi çizmeden korunumu yazma",
        paragraphs: [
          "Bir sistemin toplam momentum değişimi dış kuvvetlerin net itmesine eşittir. İki arabanın çarpışmasında ikisini birlikte sistem seçersen aralarındaki kuvvetler içtir ve karşılıklı itmeler toplamda yok olur. Tek arabayı seçersen diğerinin kuvveti dıştır, o arabanın momentumu korunmak zorunda değildir.",
          "Yer çekimi veya zemin tepkisi var diye her bileşende korunumu reddetmek de yanlıştır. Kısa çarpışmada dış yatay itme ihmal edilebiliyorsa yatay momentum korunabilir; düşeyde zemin dış itme verebilir. “Her çarpışmada momentum korunur” cümlesi sistem, yön ve dış itme koşulu verilmeden kullanılmaz.",
        ],
      },
      {
        title: "Kenetlenme bütün esnek olmayan çarpışmalar değildir",
        paragraphs: [
          "Tamamen esnek olmayan çarpışmada iki cisim kenetlenir ve ortak v=(m1u1+m2u2)/(m1+m2) hızıyla ayrılır. Dış itmenin ihmal edildiği aynı doğrultulu modelde momentum korunur; başlangıçtaki bağıl hareketin kinetik enerjisinin bir bölümü iç enerji, ses ve şekil değişimine aktarılır.",
          "Kısmen esnek olmayan çarpışmada cisimler ayrılabilir; yapışmama tek başına esneklik kanıtı değildir. Toplam enerji korunumu ile sistemin kinetik enerji korunumu ayrı cümlelerdir. Patlamada depolanmış iç enerji kinetiğe dönüşebilir; dış itme sıfırken toplam momentum yine korunur.",
        ],
      },
      {
        title: "Esnek çarpışmanın ikinci denklemi",
        paragraphs: [
          "Merkezi bir boyutlu esnek çarpışmada hem momentum hem toplam kinetik enerji korunur. Cisim A solda, B sağda ve uA>uB ise ayrılma bağıl sürati yaklaşma bağıl süratine eşittir: vB−vA=uA−uB. Hızlar aynı seçili eylemsiz çerçevede işaretli yazılır.",
          "Eşit kütleler bu özel bir boyutlu esnek modelde hızlarını değiş tokuş eder. Farklı kütlelerde doğrudan takas yapılmaz. Keşifte 0≤e≤1 geri sıçrama katsayısı vB−vA=e(uA−uB) olarak verilir; e=1 esnek, e=0 ortak hızlı sınırdır. Denklem yaklaşmayan iki cismi kendiliğinden çarpıştırma komutu değildir.",
        ],
      },
      {
        title: "İki boyutta toplam ve özel diklik",
        paragraphs: [
          "Dış x ve y itmeleri ihmal ediliyorsa momentum iki bileşende korunur. Dik yönlerden gelen 2 kg cismin (3; 0) m/s ve 1 kg cismin (0; 4) m/s hızlarıyla kenetlendiğini düşün: toplam (6; 4) kg·m/s, ortak hız (2; 4/3) m/s olur. Hız büyüklüklerini doğrudan toplamak aynı sonucu vermez.",
          "Birisi durgun, eşit kütleli iki cismin iki boyutlu esnek çarpışmasında iki son hız da sıfır değilse son yönler 90° olabilir; bu, momentum ve enerji denklemlerinden çıkan özel sonuçtur. Her çarpışma veya her üç cisimli bilardo olayı için ezberlenecek evrensel bir diklik kuralı değildir.",
        ],
      },
      {
        title: "Patlama, geri tepme ve hareketli referans",
        paragraphs: [
          "Başlangıçta durgun ve dış itmesi ihmal edilen iki parçalı sistemde m1v1+m2v2=0 olur. Parçalar zıt yönlü, momentum büyüklükleri eşittir; kütleler eşit değilse süratleri eşit değildir. Patlama öncesi sistem hareketliyse toplamın sıfır değil ilk momentum olduğunu koru.",
          "Roket boşlukta da, attığı maddeyle karşılıklı momentum alışverişi yaparak çalışır; önceden bir hava ortamını itmesi gerekmez. “Kendi maddesel ortamını oluşturması gerekir” sözü hava gereksinimi gibi anlaşılmamalıdır. Sürekli yakıt atan roket değişken kütlelidir; buradaki sabit kütleli iki cisim çarpışma formülünü tüm uçuşa tek adım uygulama.",
        ],
      },
      {
        title: "İki farklı kanıtla çözümü denetle",
        paragraphs: [
          "Önce momentum bilançosunu, sonra çarpışmanın enerji koşulunu denetle. Tam kenetlenmede kayıp K, başlangıç bağıl süratinin karesiyle orantılıdır; ortak hareketin bütün kinetiğinin sıfıra inmesi zorunlu değildir. Ayrı cisimlerin itmeleri eşit ve zıtken hız değişimleri kütleyle ters orantılı olabilir.",
          "Etkileşimde zaman imlecini iki kuvvet aralığında ilerlet; işaretli alanla p(t) değerini karşılaştır. Ardından çarpışma katsayısını değiştirirken aynı ilk momentumu koruyup kinetik enerjinin nasıl değiştiğini tahmin et. Keşif kaydı puan veya ustalık değildir; öğrenme kanıtını bağımsız soruda koşulları seçerek üret.",
        ],
      },
    ],
    examples: [
      {
        title: "İki alan, farklı son hız",
        prompt:
          "2 kg cisim ilk anda +3 m/s ile gidiyor. Net kuvvet ilk 2 s +4 N, sonraki 1 s −6 N. Son hız ve toplam yer değiştirme?",
        strategy: "Alanları ve her aralığın başlangıç hızını ayrı kullan.",
        steps: [
          {
            label: "İtmeler",
            expression: "I=4·2−6·1=2 N·s",
            explanation: "Zaman ekseni altındaki ikinci alan negatiftir.",
          },
          {
            label: "Son hız",
            expression: "p0=6; p_son=8; v_son=4 m/s",
            explanation: "İtme son momentumun kendisi değildir.",
          },
          {
            label: "Konum",
            expression: "Δx1=3·2+½·2·2²=10 m; Δx2=7·1−½·3·1²=5,5 m",
            explanation: "Toplam 15,5 m; ikinci aralık +7 m/s ile başlar.",
          },
        ],
        answer: "+4 m/s; +15,5 m",
        check: "2(4−3)=2 N·s geri elde edilir.",
        pitfall: "Her aralığı ilk hız 3 ile başlatmak.",
      },
      {
        title: "Duvarın ortalama kuvveti",
        prompt:
          "0,20 kg top +10 m/s ile duvara gelip −5 m/s ile dönüyor. Temas 0,020 s; diğer itmeler ihmal. Ortalama kuvvet?",
        strategy: "Yönlü momentum farkını temas süresine böl.",
        steps: [
          {
            label: "İlk ve son",
            expression: "p_ilk=+2, p_son=−1 kg·m/s",
            explanation: "İki hız aynı eksende tanımlanır.",
          },
          {
            label: "Fark",
            expression: "Δp=−1−2=−3 N·s",
            explanation: "Duvar topa sola itme verir.",
          },
          {
            label: "Ortalama",
            expression: "F_ort=−3/0,020=−150 N",
            explanation: "Bu, tepe kuvveti değil zaman ortalamasıdır.",
          },
        ],
        answer: "−150 N",
        check: "150·0,020=3 N·s büyüklük denetimi.",
        pitfall: "10−5 farkını kullanmak.",
      },
      {
        title: "Kenetlenmede kalan enerji",
        prompt:
          "2 kg A +4 m/s,1 kg B −2 m/s hızlarıyla merkezi çarpışıp kenetleniyor; dış itme yok. Ortak hız ve kinetik kayıp?",
        strategy: "İşaretli momentumdan ortak hızı, sonra K bilançosunu bul.",
        steps: [
          {
            label: "Momentum",
            expression: "p=2·4+1·(−2)=6 kg·m/s",
            explanation: "Negatif hız katkısı toplamı azaltır.",
          },
          {
            label: "Ortak hız",
            expression: "v=6/(2+1)=2 m/s",
            explanation: "İki kütle ortak hareket eder.",
          },
          {
            label: "Enerji",
            expression: "K_ilk=16+2=18 J; K_son=½·3·2²=6 J; kayıp 12 J",
            explanation: "Toplam enerji yok olmaz; kinetik aktarılır.",
          },
        ],
        answer: "+2 m/s;12 J kinetik kayıp",
        check: "Kayıp=½·(2/3)·(4−(−2))²=12 J.",
        pitfall: "Bütün esnek olmayan olayları yapışma sanmak.",
      },
      {
        title: "Dik geliş, ortak hız",
        prompt:
          "Sürtünmesiz yatay düzlemde 2 kg A (3; 0) m/s,1 kg B (0; 4) m/s ile aynı noktada kenetleniyor. Ortak hız ve büyüklüğü?",
        strategy: "Her bileşende ayrı momentum koru.",
        steps: [
          {
            label: "Toplam",
            expression: "p=(6; 4) kg·m/s",
            explanation: "Birim vektör bileşenleri karışmaz.",
          },
          {
            label: "Ortak hız",
            expression: "v=(6/3; 4/3)=(2; 4/3) m/s",
            explanation: "Toplam kütle 3 kg.",
          },
          {
            label: "Büyüklük",
            expression: "|v|=√(4+16/9)=√52/3≈2,404 m/s",
            explanation: "İki süratin ortalaması değildir.",
          },
        ],
        answer: "(2;4/3) m/s; yaklaşık 2,404 m/s",
        check: "3v=(6; 4) başlangıç toplamına eşittir.",
        pitfall: "3+4=7 sonucunu momentum toplamı saymak.",
      },
    ],
    recall: [
      {
        prompt: "Δp’ye hangi itme eşittir?",
        answer: "Seçili cisim veya sistem üzerindeki dış net itme.",
      },
      {
        prompt: "Yapışmayan çarpışma kesin esnek mi?",
        answer: "Hayır; kinetik enerji kaybedip yine ayrılabilir.",
      },
      {
        prompt: "Sıfır toplam momentum bütün cisimler duruyor demek mi?",
        answer: "Hayır; zıt momentumlar birbirini götürebilir.",
      },
      {
        prompt: "F–t alanının birimi ve anlamı?",
        answer: "N·s; işaretli momentum değişimi.",
      },
    ],
    items: [
      {
        prompt: "2 kg cisim +3 m/s’den −2 m/s’ye geçiyor. Net itme kaç N·s?",
        hint: "Δp=m(v_son−v_ilk).",
        explanation:
          "2(−2−3)=−10 N·s. Yön değişimi için süratlerin farkı değil işaretli hızların farkı gerekir.",
        options: ["+10", "−2", "−10", "+2", "+6"],
        answer: 2,
      },
      {
        prompt:
          "Net kuvvet 0–2 s aralığında 0’dan 6 N’a doğrusal artıyor,2–3 s aralığında −2 N sabit. Toplam itme kaç N·s?",
        hint: "Üçgen alanından negatif dikdörtgeni çıkar.",
        explanation:
          "İlk alan½·2·6=6, ikinci alan −2·1=−2; toplam +4 N·s. Kuvvet atlaması tek bir anda ek alan üretmez.",
        options: ["+6", "+8", "−4", "+10", "+4"],
        answer: 4,
      },
      {
        prompt:
          "1 kg cisim +5 m/s ile giderken −5 N net kuvvet 2 s uygulanıyor. Aynı kuvvet tüm süre geçerli. Son hız?",
        hint: "İtme −10 N·s; p0=+5.",
        explanation:
          "p_son=5−10=−5 kg·m/s, v=−5 m/s. İlk saniyede durup sonra kuvvet yönünde geri döner; fren modelinin devamı kökte açık verildi.",
        options: ["0 m/s", "−5 m/s", "+5 m/s", "−10 m/s", "+10 m/s"],
        answer: 1,
      },
      {
        prompt:
          "0,50 kg top düz duvara +6 m/s ile gelip −6 m/s ile dönüyor. Temas 0,10 s; diğer itmeler ihmal. Ortalama kuvvet?",
        hint: "Δp=0,5(−6−6).",
        explanation:
          "Net itme −6 N·s; ortalama −6/0,10=−60 N. İlk ve son sürat eşit olsa da momentum vektörü değişir.",
        options: ["−60 N", "−30 N", "0 N", "+60 N", "−6 N"],
        answer: 0,
      },
      {
        prompt:
          "2 kg A +4 m/s,1 kg B −2 m/s ile çarpışıp kenetleniyor. Dış itme yok. Ortak hız?",
        hint: "Toplam momentum 6, toplam kütle 3.",
        explanation:
          "v=(8−2)/3=+2 m/s. Karşı yönlü hızlar işaretli toplanır; kütlesiz sürat ortalaması alınmaz.",
        options: ["+6 m/s", "0 m/s", "−2 m/s", "+2 m/s", "+3 m/s"],
        answer: 3,
      },
      {
        prompt:
          "1 kg A solda +6 m/s,2 kg B sağda durgun. Merkezi bir boyutlu esnek çarpışma, dış itme yok. Son (vA; vB)?",
        hint: "Hem momentum hem kinetik enerji korunmalı.",
        explanation:
          "−2+2·4=6 kg·m/s ve½·4+½·2·16=18 J başlangıçla aynıdır. Ayrılma farkı 4−(−2)=6 m/s yaklaşma farkına eşittir.",
        options: [
          "(+2; +2) m/s",
          "(−2; +4) m/s",
          "(0; +3) m/s",
          "(+6; 0) m/s",
          "(−4; +2) m/s",
        ],
        answer: 1,
      },
      {
        prompt:
          "Durgun 3 kg cisim iki parçaya ayrılıyor. 1 kg parça +8 m/s; patlama süresinde dış itme ihmal. 2 kg parçanın hızı?",
        hint: "İlk toplam momentum sıfırdır.",
        explanation:
          "1·8+2v=0 → v=−4 m/s. Parçaların momentumları zıt eşit, süratleri kütleler farklı olduğundan eşit değildir.",
        options: ["+4 m/s", "−8 m/s", "+8 m/s", "−4 m/s", "0 m/s"],
        answer: 3,
      },
      {
        prompt:
          "1 kg A (4; 0) m/s,1 kg B (0; 3) m/s ile kenetleniyor; dış düzlemsel itme yok. Ortak sürat?",
        hint: "Ortak hız (2;1,5) m/s.",
        explanation:
          "p=(4; 3), toplam kütle 2 → v=(2; 1,5), büyüklük √(4+2,25)=2,5 m/s. Bileşenler ayrı korunur.",
        options: ["3,5 m/s", "5 m/s", "7 m/s", "1 m/s", "2,5 m/s"],
        answer: 4,
      },
      {
        prompt:
          "Dış itmesi ihmal edilen iki cisimli merkezi çarpışmada momentum korunuyor, cisimler ayrılıyor ve son toplam kinetik enerji ilkinden daha küçük. Sınıflandırma?",
        hint: "Esnekliğin ölçütü toplam kinetik enerjidir.",
        explanation:
          "Ayrılma esneklik kanıtı değildir. Kinetik azalıp iç enerji/ses/deformasyona aktarılabilir; tamamen esnek olmayan özel ortak hızlı sınırdır.",
        options: [
          "Kesin esnek.",
          "Momentum korunamaz.",
          "Esnek olmayan, fakat kenetlenmeli olmak zorunda değil.",
          "Toplam enerji yok olmuştur.",
          "Kesin tamamen esnek olmayan.",
        ],
        answer: 2,
      },
      {
        prompt:
          "Sürtünmesiz yatay platforma düşeyden bir parça çarpıp yapışıyor. Yer platforma düşey itme uygulayabilir; yatay dış itme ihmal. Hangi korunum güvenle yazılır?",
        hint: "Dış itmenin ihmal edildiği yönü seç.",
        explanation:
          "Platform+parça sistemine yerin düşey itmesi dıştır. Yatay dış itme ihmal edildiği için o bileşen korunur; yapışma kinetik enerji korunumu sağlamaz.",
        options: [
          "Sistem yatay momentumu korunur.",
          "Sistemin düşey momentumu mutlaka korunur.",
          "Kinetik enerji mutlaka korunur.",
          "Platformun tek başına tüm momentumu korunur.",
          "Son toplam momentum mutlaka sıfırdır.",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "kesisen-kuvvetler-dengesi",
    topic: "detail-370",
    title: "Kesişen kuvvetlerin dengesi: düğümden serbest cisme",
    minutes: 100,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 85–87; OGM 11. sınıf Denge özeti ve Dersler Cepte, s. 13–14. Özgün koşullu öğretim ve sorular; resmî sınav sorusu değildir.",
    objectives: [
      "Tek cisme etki eden kuvvetleri serbest cisim şemasında ayır.",
      "Yataydan veya düşeyden verilen açıları doğru bileşenlere dönüştür.",
      "Üç kuvvetin dengesi, Lami ve gergin ip koşullarını denetle.",
    ],
    sections: [
      {
        title: "Denge durgunlukla aynı kelime değildir",
        paragraphs: [
          "Eylemsiz bir gözlemciye göre net kuvvet sıfırsa kütle merkezinin ivmesi sıfırdır. Cisim başlangıçta durgunsa durur; başlangıç hızı varsa sabit hızla gidebilir. Statik denge için ayrıca başlangıç hareketi ve rijit cisimde dönme dengesi incelenir. “Kuvvetler dengede, öyleyse cisim hiç hareket etmez” sonucu eksiktir.",
          "Bu ünitede küçük, kütlesiz bir düğümde kesişen kuvvetler ve dengede duran askı yükleri incelenir. Bütün kuvvetlerin uygulama doğruları aynı noktadan geçince o noktaya göre momentleri sıfırdır. Büyük bir levhada yalnız bileşkeyi sıfırlamak ise kuvvet çifti nedeniyle dönmeyi engellemeyebilir; sonraki tork ünitesine bu ayrımı taşı.",
        ],
      },
      {
        title: "Sistemin sınırını çiz",
        paragraphs: [
          "Bir düğümün şemasına yalnız o düğüme etki eden kuvvetleri çiz. İpler düğümü kendi doğrultularında çeker, alttaki yük veya alt ip düğümü aşağı çeker. Tavandaki destek kuvvetini, ip parçası sistemin dışında kalıyorsa düğüme ayrıca ikinci kez ekleme.",
          "Etki–tepki kuvvetleri farklı cisimlere etki eder; aynı düğümün şemasında birbirini otomatik götüren bir çift değildir. Askıdaki yükü ayrı seçersen yukarı ip gerilmesi ve aşağı ağırlık vardır. Düğümün alt ip gerilmesi ancak yükün düşey ivmesi sıfırken, ipin kütlesi ihmal koşuluyla mg’ye eşittir.",
        ],
      },
      {
        title: "İp modeli neyi varsayar?",
        paragraphs: [
          "Kütlesiz, esnemeyen ip ve sürtünmesiz ideal makara modelinde aynı kesintisiz ipin gerilme büyüklüğü aynıdır. Farklı iki ipte gerilmeler genel olarak eşit değildir. İp yalnız çeker; hesaplanan negatif gerilme, seçilen gergin ip dengesinin bu geometriyle gerçekleşmediğini gösterir.",
          "İpin uzunluklarının eşitliği tek başına bütün düzeneklerde eşit gerilme demek değildir. Aynı yükseklikte simetrik iki dayanak ve ortadaki düğüm gibi simetrik bir geometri varsa iki açı eşit olur ve denge eşit gerilme verir. Gerçek bir ipte kütle, esneme veya makara sürtünmesi önemliyse bu ideal model ayrıca değişir.",
        ],
      },
      {
        title: "Açının referansı bileşeni değiştirir",
        paragraphs: [
          "Sağa yataydan α açı yapan T kuvveti için Tx=T cosα ve Ty=T sinα yazılır. Soldaki yukarı yönlü ipte x bileşeni negatiftir. Açı düşeyden verilmişse yatay büyüklük T sinα, düşey büyüklük T cosα olur. Şekildeki açı yayını önce hangi eksene bağlandığıyla adlandır.",
          "Aynı fiziksel ipi yataydan 30° veya düşeyden 60° diye tanımlamak aynı bileşenleri vermelidir. İşaret, sinüs veya kosinüsün adından değil seçilen yön ve bölgeden gelir. Özel 37°–53° sorularında sin 37°=0,6 gibi yaklaşık değerler verilmişse kullan; bunları gerçek trigonometrik değerlerle karıştırıp keyfî yuvarlama yapma.",
        ],
      },
      {
        title: "İki denklem, iki gerilme",
        paragraphs: [
          "Sol ipin yatayla α, sağ ipin yatayla β yaptığı ve yükün W olduğu kütlesiz düğümde −TL cosα+TR cosβ=0 ve TL sinα+TR sinβ−W=0 olur. İki denklem birlikte TL=W cosβ/sin(α+β), TR=W cosα/sin(α+β) verir.",
          "Bu formüller iki ipin yukarı uzandığı, 0<α,β<90° aralığındaki gergin dengeye aittir. α+β sıfıra giderken yatay ipler sonlu W’yi sonlu gerilmeyle taşıyamaz. Gezginde bu tekil uca yaklaşım açıklanır; sıfır açıda bölme yapıp sahte bir sonlu gerilme üretilemez.",
        ],
      },
      {
        title: "Simetrik askıda açı büyürken hangi açı?",
        paragraphs: [
          "İki ip yatayla aynı θ açısını yapıyorsa 2T sinθ=W olur. Yataydan θ küçüldükçe ip daha yataylaşır, gerilme büyür. İpler arasındaki üst açı γ=180°−2θ olduğundan aynı olay γ büyüyor diye de anlatılır. Açı adını söylemeden “açı artarsa gerilme artar” ezberi ters sonuca götürebilir.",
          "θ=30° için T=W, θ=90° sınırında iki düşey ip eşit paylaşırsa T=W/2 olur. Gezgindeki asimetrik durumda bir açıyı değiştirirken diğerini sabit tuttuğun için simetrik özel formülü doğrudan kullanma. Her durumda bileşen toplamlarını tekrar denetle.",
        ],
      },
      {
        title: "Üç kuvvet üçgeni ve Lami",
        paragraphs: [
          "Aynı düzlemde, aynı noktada kesişen üç sıfır olmayan kuvvet dengedeyse uç uca vektör üçgeni kapanır. Her kuvvetin büyüklüğünün diğer iki kuvvet arasındaki açının sinüsüne oranı eşittir. Lami teoreminde paydaki kuvvetin kendi komşu küçük açısını rastgele seçmek doğru değildir.",
          "Lami, bileşen denklemlerinin başka bir ifadesidir ve üç kuvvetle sınırlıdır; dört kuvvetli düğüme doğrudan üçlü oran kurma. Kuvvetler eşdoğrultulu olduğunda sinüsler sıfır olabilir; o özel dengeyi işaretli bir boyutlu toplamla çöz. Önce kuvvet sayısı, kesişme ve açılar doğrulansın.",
        ],
      },
      {
        title: "Bileşke ve dengeleyen zıt vektörlerdir",
        paragraphs: [
          "İki kuvvetin bileşkesi R ise üçüncü dengeleyen kuvvet −R olmalıdır. Büyüklüğü eşit olması yetmez, doğrultu ve yön de gerekir. Dik 30 N sağ ve 40 N yukarı kuvvetin bileşkesi (30; 40) N, büyüklüğü 50 N; dengeleyeni (−30; −40) N olur.",
          "İki gerilmenin yatay bileşenleri birbirini götürürken düşey bileşenleri yükü taşımak için toplanır. İki ipin gerilme büyüklüklerini doğrudan W’ye eşitlemek vektör toplamını skaler toplam sanmaktır. Hangi bileşenlerin aynı, hangilerinin ters yönde olduğunu şema üzerinde göster.",
        ],
      },
      {
        title: "Sürtünme gerekiyorsa sınırı ayrıca koy",
        paragraphs: [
          "Yatay yüzeyde duran cisme dış kuvvet geliyorsa statik sürtünme denge için gereken değeri alır; büyüklüğü en çok μsN olabilir. Her dengede sürtünme tam μsN değildir. Gerekli yatay dengeleme bu eşiği aşıyorsa duran denge çözümü geçersizleşir.",
          "Aynı mantık temas tepkisine de uygulanır: normal kuvvet yüzeyi itebilir, yapışma modeli verilmeden çekemez. Duvara dayalı merdiven gibi rijit sistemde hem kuvvet hem tork koşulu gerekir. Kesişen düğüm hesabını bütün merdivenin konumunu yok sayan bir nokta hesabına dönüştürme.",
        ],
      },
      {
        title: "Sonuç üç ayrı kontrolü geçsin",
        paragraphs: [
          "Bulunan gerilmeleri x toplamına ve y toplamına geri koy. Sonlu, pozitif sonuçlar çıkıyor mu; birimler newton mu; daha yatay askı için gereken kuvvet büyüyor mu? Simetri varsa eşit gerilme, yük iki katken aynı açılarda iki kat gerilme beklenir. Bu sınırlar hesap hatasını görünür kılar.",
          "Keşifte önce yükü ve iki açıyı seç, hangi ipin daha fazla gerildiğini tahmin et. Çizimde oklar gerçek hesaplanan bileşenlere göre çizilir; ortak ok ölçeği ayrıca belirtilir. Gerekçeni kaydetmek puan değildir. Yeni bir soruda farklı açı referansını doğru seçebildiğinde bağımsız öğrenme kanıtı oluşur.",
        ],
      },
    ],
    examples: [
      {
        title: "Otuz derece simetrisi",
        prompt:
          "100 N yük iki ideal ipli simetrik düğümde duruyor. Her ip yatayla 30°; sin 30°=0,5. Her gerilme?",
        strategy: "Düşey toplamda iki eşit katkıyı yaz.",
        steps: [
          {
            label: "Simetri",
            expression: "TL=TR=T",
            explanation: "Aynı açılar ve yük ortada.",
          },
          {
            label: "Düşey",
            expression: "2T·0,5=100",
            explanation: "Yatay katkılar zıttır.",
          },
          {
            label: "Gerilme",
            expression: "T=100 N",
            explanation: "Gerilme büyüklüğü yükün yarısı olmak zorunda değil.",
          },
        ],
        answer: "Her ip 100 N",
        check: "100·0,5+100·0,5=100 N.",
        pitfall: "İki ip var diye açıyı görmeden 50 N demek.",
      },
      {
        title: "Asimetrik iki ip",
        prompt:
          "W=100 N. Sol ip yatayla 37°, sağ ip 53° yapıyor. sin 37°=0,6, cos 37°=0,8, sin 53°=0,8, cos 53°=0,6. TL ve TR?",
        strategy: "Önce yatay denklemi bir gerilme cinsinden yaz.",
        steps: [
          {
            label: "Yatay",
            expression: "0,8TL=0,6TR → TR=4TL/3",
            explanation: "Zıt yatay bileşenler dengelenir.",
          },
          {
            label: "Düşey",
            expression: "0,6TL+0,8·4TL/3=100",
            explanation: "İki düşey katkı aynı yukarı yönlü.",
          },
          {
            label: "Sonuç",
            expression: "TL=60 N, TR=80 N",
            explanation: "Daha dik sağ ip burada daha büyük gerilme taşır.",
          },
        ],
        answer: "TL=60 N; TR=80 N",
        check: "Yatay 48−48=0; düşey 36+64−100=0.",
        pitfall: "Açıların düşeyden verildiğini sanmak.",
      },
      {
        title: "Dengeleyen üçüncü kuvvet",
        prompt:
          "Bir noktaya 30 N sağa ve 40 N yukarı kuvvet etki ediyor. Denge için üçüncü kuvvetin bileşenleri ve büyüklüğü?",
        strategy: "Önce bileşkeyi sonra onun tersini kur.",
        steps: [
          {
            label: "Bileşke",
            expression: "R=(30; 40) N",
            explanation: "Dik yönler ayrı bileşenlerdir.",
          },
          {
            label: "Dengeleyen",
            expression: "F3=−R=(−30; −40) N",
            explanation: "Aynı noktada net kuvvet sıfır olur.",
          },
          {
            label: "Büyüklük",
            expression: "|F3|=√(30²+40²)=50 N",
            explanation: "Büyüklük pozitif; yön aşağı-sola.",
          },
        ],
        answer: "(−30;−40) N; 50 N",
        check: "R+F3=(0; 0).",
        pitfall: "Dengeleyeni bileşkeyle aynı yönde çizmek.",
      },
      {
        title: "Statik sınırı denetle",
        prompt:
          "Yatay yüzeyde 20 N ağırlıklı blok, yatay 4 N çekiliyor. μs=0,30 ve başka düşey kuvvet yok. Durgun denge mümkün mü, sürtünme kaç N?",
        strategy: "Önce normal ve maksimumu, sonra gerekeni hesapla.",
        steps: [
          {
            label: "Normal",
            expression: "N=20 N",
            explanation: "Düşey ivme sıfır.",
          },
          {
            label: "Eşik",
            expression: "fs,max=0,30·20=6 N",
            explanation: "Bu maksimumdur, her andaki değer değil.",
          },
          {
            label: "Gereken",
            expression: "fs=4 N karşı yönde; 4≤6",
            explanation: "Duran denge mümkündür.",
          },
        ],
        answer: "Evet; 4 N karşı yönde",
        check: "Yatay toplam 4−4=0.",
        pitfall: "Gerçek statik sürtünmeyi her zaman 6 N almak.",
      },
    ],
    recall: [
      {
        prompt: "Yatayla verilen T açısında düşey bileşen?",
        answer: "T sinθ; açı düşeyden verilmişse T cosθ.",
      },
      {
        prompt: "Dengeleyen vektör R ile nasıl ilişkilidir?",
        answer: "−R: eşit büyüklük, zıt yön.",
      },
      {
        prompt: "Lami hangi düzenekte doğrudan kullanılır?",
        answer:
          "Aynı noktada kesişen, eşdoğrultulu olmayan üç düzlemsel kuvvetin dengesi.",
      },
      {
        prompt: "Net kuvvet sıfırsa hız kesin sıfır mı?",
        answer: "Hayır; hız sabit olabilir, ivme sıfırdır.",
      },
    ],
    items: [
      {
        prompt:
          "60 N yük iki simetrik ideal iple duruyor. Her ip yatayla 30°, sin 30°=0,5. Her ipte gerilme?",
        hint: "2T sin 30°=W.",
        explanation:
          "2T·0,5=60 → T=60 N. İki ipin büyüklükleri değil düşey bileşenleri yükü dengeler.",
        options: ["30 N", "120 N", "15 N", "60 N", "90 N"],
        answer: 3,
      },
      {
        prompt:
          "80 N yük iki simetrik ideal iple duruyor. Her ip düşeyle 60°; cos 60°=0,5. Her ipte gerilme?",
        hint: "Düşeyden verildiği için cos kullan.",
        explanation:
          "2T cos 60°=80 → T=80 N. Bu geometri yatayla 30° askıyla aynıdır.",
        options: ["40 N", "80 N", "160 N", "20 N", "60 N"],
        answer: 1,
      },
      {
        prompt:
          "W=100 N; sol ip yatayla 37°, sağ ip 53°. sin 37°=0,6, cos 37°=0,8; sin 53°=0,8,cos 53°=0,6. (TL; TR)?",
        hint: "0,8TL=0,6TR ve 0,6TL+0,8TR=100.",
        explanation:
          "60 ve 80 için yatay 48−48=0, düşey 36+64=100. Başka seçenek her iki denklemi birlikte sağlamaz.",
        options: [
          "(80;60) N",
          "(50;50) N",
          "(100;100) N",
          "(75;100) N",
          "(60;80) N",
        ],
        answer: 4,
      },
      {
        prompt:
          "Bir noktaya 6 N sağa ve 8 N yukarı kuvvet geliyor. Dengeleyen üçüncü kuvvet?",
        hint: "Her bileşenin toplamı sıfırlanmalı.",
        explanation:
          "Bileşke (6; 8), dengeleyen (−6; −8) ve büyüklük √100=10 N. Yalnız büyüklüğün 10 olması yön hatasını düzeltmez.",
        options: [
          "(+6;+8) N;10 N",
          "(−6;+8) N;10 N",
          "(−6;−8) N; büyüklük 10 N",
          "(−8;−6) N;10 N",
          "(0;−14) N;14 N",
        ],
        answer: 2,
      },
      {
        prompt:
          "Simetrik iki ipte aynı W yükü sabit. İplerin yatayla açısı 60°’den 30°’ye azalıyor. Gerilme ne olur?",
        hint: "T=W/(2 sinθ).",
        explanation:
          "sinθ azalınca aynı düşey toplamı sağlamak için T artar. İpler arası üst açı bu değişimde büyür; referans açıyı belirtmek gerekir.",
        options: [
          "Artar.",
          "Azalır.",
          "Aynı kalır.",
          "Sıfır olur.",
          "Yükün işareti tersine döner.",
        ],
        answer: 0,
      },
      {
        prompt:
          "Eylemsiz çerçevede parçacığa etki eden net kuvvet sıfır ve ilk hız 3 m/s sağa. Hareket?",
        hint: "Net kuvvet sıfır ivmeyi sıfırlar.",
        explanation:
          "Newton yasası a=0 verir; ilk hız kendiliğinden yok olmaz. Denge her zaman durgunluk değildir.",
        options: [
          "Hemen durur.",
          "Sabit ivmeyle hızlanır.",
          "Sola döner.",
          "Momentumunun büyüklüğü sürekli artar.",
          "3 m/s sağa sabit hızla devam eder.",
        ],
        answer: 4,
      },
      {
        prompt:
          "Aynı noktada kesişen dört düzlemsel kuvvet var. Dengeyi genel olarak nasıl sınarsın?",
        hint: "Lami doğrudan üç kuvvet içindir.",
        explanation:
          "Dört kuvvet için bileşen toplamları genel yöntemdir. Kesişme noktasına göre her kuvvetin torku sıfır olsa da net kuvvet ayrıca sıfırlanmalıdır.",
        options: [
          "Dördünü doğrudan tek Lami üçlü oranına koyarım.",
          "Yalnız büyüklükleri toplarım.",
          "ΣFx=0 ve ΣFy=0 koşullarını kurarım.",
          "En büyük kuvveti sıfır sayarım.",
          "Her kuvvetin diğerlerine eşit olmasını isterim.",
        ],
        answer: 2,
      },
      {
        prompt:
          "Yatay yüzeyde N=50 N, μs=0,4. Bloku yatay 12 N çekiyorlar ve durgun denge mümkün. Statik sürtünmenin büyüklüğü?",
        hint: "Gerekeni 20 N üst sınırıyla karşılaştır.",
        explanation:
          "fs,max=20 N; gereken 12 N bu sınırın altında olduğundan fs=12 N olur. Maksimumla gerçek değeri karıştırma.",
        options: ["12 N", "20 N", "8 N", "50 N", "0 N"],
        answer: 0,
      },
      {
        prompt:
          "Hesapta ideal ipin gerilmesi −10 N çıkıyor. İp yalnız çekebiliyor. Doğru yorum?",
        hint: "İp itme elemanı değildir.",
        explanation:
          "Negatif gerilme seçilen geometri/kuvvet varsayımını geçersiz kılar; ip gevşeyebilir veya başka destek gerekir. Negatif sayıyı fiziksel basma kuvveti diye kullanma.",
        options: [
          "İp 10 N itiyor.",
          "Gerilmenin büyüklüğü −10 N’dur.",
          "İp kütlesi kesin negatiftir.",
          "Varsayılan gergin ip dengesinin koşulları sağlanmıyor.",
          "Denge kesin doğrudur.",
        ],
        answer: 3,
      },
      {
        prompt:
          "Bir rijit çubuğa farklı doğrularda eşit büyüklükte zıt iki kuvvet etki ediyor. Net kuvvet sıfır. Hangisi kesin değildir?",
        hint: "Kuvvet çifti dönme etkisi bırakabilir.",
        explanation:
          "Ayrı paralel doğrulardaki eşit zıt kuvvetler kuvvet çifti oluşturur. Net kuvvet sıfır olsa da moment sıfır olmayabilir; rijit cisim dengesi ayrıca tork ister.",
        options: [
          "Kuvvetlerin vektör toplamının sıfır olması.",
          "Toplam torkun da sıfır olması.",
          "Kütle merkezi ivmesinin sıfır olması.",
          "İki kuvvetin ayrı uygulama doğruları bulunması.",
          "Kuvvet çiftinin incelenmesi gereği.",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "tork-denge",
    topic: "detail-371",
    title: "Tork ve denge: kuvvetin doğrusu neden önemli?",
    minutes: 120,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 80–89; OGM 11. sınıf Tork ve Denge özetleri, Dersler Cepte s. 10–14. Özgün öğretim ve sorular; resmî sınav sorusu değildir.",
    objectives: [
      "Konum ve kuvvetten işaretli torku ve gerçek dik moment kolunu bul.",
      "Net kuvvet ile net tork koşullarını birlikte uygula.",
      "Kuvvet çifti, destek tepkisi ve temasın kopma sınırını ayır.",
    ],
    sections: [
      {
        title: "Tork seçili noktaya göredir",
        paragraphs: [
          "Kuvvetin seçili eksen veya noktaya göre döndürme etkisi τ=r×F vektörüyle anlatılır. r, seçilen noktadan kuvvetin uygulama noktasına giden konum vektörüdür; yer değiştirme değildir. Aynı kuvvetin farklı noktalara göre torku farklı olabilir. Önce hangi noktaya göre hesap yaptığını açıkça yaz.",
          "Düzlemde +x sağa, +y yukarı seçersek τz=rxFy−ryFx olur. Pozitif z sayfadan dışarı ve saatin tersi yön, negatif z sayfanın içine ve saat yönüdür. Sağ el kuralı bu işareti belirler. Şekilde artı dönme yönü farklı seçilmişse verilen işaret sözleşmesini açıkça dönüştür.",
        ],
      },
      {
        title: "Moment kolu çubuğun boyu değildir",
        paragraphs: [
          "Tork büyüklüğü |τ|=F d olup d, dönme noktasından kuvvetin etkime doğrusuna olan dik uzaklıktır. Uygulama noktasına uzaklık r ile kuvvet arasındaki açı φ ise d=r|sinφ| ve |τ|=rF|sinφ| yazılır. Yalnız kuvvet çubuğa dikken r doğrudan moment koludur.",
          "Kuvvet doğrusu dönme noktasından geçiyorsa d=0 ve o noktaya göre tork sıfırdır; kuvvetin kendisi sıfır olmak zorunda değildir. Kuvvet sıfırsa tork sıfır olur ama etkime doğrusu ve ona dik kol tek olarak tanımlanmaz. Keşifte bu durumda hayalî bir d değeri göstermek yerine tanımsız kol açıklanır.",
        ],
      },
      {
        title: "Bileşenler iki ayrı döndürme etkisi verir",
        paragraphs: [
          "Genel konumda yalnız düşey bileşen tork üretir demek doğru değildir. r=(2; 1) m ve F=(3; 4) N için düşey bileşen +8, yatay bileşen −3 N·m moment verir; toplam +5 N·m olur. Hangi bileşenin kolunun sıfır olduğuna gerçek geometri karar verir.",
          "Uygulama noktası yatay eksen üzerindeyse ry=0 olur ve o özel durumda τ=rxFy yazılır. Dikey kuvvet için de kol yatay uzaklıktır. Gezginde hem x hem y konumunu değiştirmek, ezberlenen tek çarpımın kapsamını görünür kılar; koordinatlardaki metre ve kuvvetteki newton ayrı korunur.",
        ],
      },
      {
        title: "Etki doğrusu üzerinde kaydırma",
        paragraphs: [
          "Rijit cisme etki eden tek kuvvet kendi etki doğrusu boyunca kaydırılırsa seçili noktaya göre torku değişmez. Çünkü r yerine r+λF yazıldığında ek (λF)×F sıfırdır. Kuvveti paralel başka bir doğruya taşımak ise genel olarak torku değiştirir.",
          "Bu kaydırma rijit cismin dış hareketini eşdeğerleştiren bir modeldir; esnek cisimde yerel gerilme dağılımı aynı olmak zorunda değildir. Çizimde kesik etki doğrusunu ve dik kolu birbirinden ayır. Uzun bir çubukta kuvvet uygulanan noktayı daha uzağa taşıma, kuvvet doğrusu aynı kalıyorsa otomatik tork artışı sağlamaz.",
        ],
      },
      {
        title: "Torkun birimi joule adıyla değiştirilmez",
        paragraphs: [
          "Torkun SI birimi N·m’dir. Enerjinin birimi de temel boyutlar bakımından N·m’ye eşittir fakat fiziksel tanımları farklıdır. İş, kuvvetle yer değiştirmenin skaler çarpımı; tork, konumla kuvvetin vektörel çarpımıdır. Tork sonucunu enerji gibi joule diye adlandırmak niceliğin anlamını gizler.",
          "Kapıyı açarken aynı kuvveti menteşeden uzakta ve kapıya daha dik uygulamak momenti artırır. Menteşe doğrultusunda çekmek büyük kuvvetle bile sıfır tork verebilir. Gerçek dönme ivmesini bulmak için atalet momenti ve eksen koşulları ayrıca gerekir; yalnız τ değerinden kütle ve geometri olmadan dönüş süresi çıkarılamaz.",
        ],
      },
      {
        title: "Net kuvvet ve net moment birlikte",
        paragraphs: [
          "Duran rijit cisim dengesi için ΣFx=0, ΣFy=0 ve seçilen noktaya göre Στ=0 gerekir. Yalnız bir noktadaki momenti sıfırlamak öteleme dengesini garanti etmez. Desteğe etkiyen kuvvet de seçili cismin serbest cisim şemasında bulunmalıdır.",
          "Sabit eksenli düzlemsel dönmede net tork sıfırsa açısal ivme sıfırdır; cisim başlangıçta dönüyorsa sabit açısal hızla dönmeye devam edebilir. Kaynaklardaki “tork sıfırsa dönemez” kısaltması yalnız başlangıçta durgun denge bağlamında okunmalıdır. Başlangıç koşulunu genel dinamik yasadan ayır.",
        ],
      },
      {
        title: "Kuvvet çifti sıfır bileşke, sıfır olmayan moment",
        paragraphs: [
          "Paralel iki farklı doğru üzerindeki eşit büyüklükte zıt kuvvetler bir kuvvet çifti oluşturur. Kuvvetler toplamı sıfır, aralarındaki dik uzaklık d ise toplam moment büyüklüğü Fd olur. Tek kuvvetin iki katı ile rastgele bir kol çarpılmaz; geometrinin gerçekten iki kuvvet doğrusu arasını kullan.",
          "Kuvvet çiftinin toplam momenti seçilen noktadan bağımsızdır. İki kuvvetin aynı doğru üzerinde olması ise d=0 ve sıfır çift momenti verir. Direksiyon veya kapak çevirme bu ayrımı düşünmeye yardım eder. Kuvvet çifti ile Newton etki–tepki çifti aynı terim değildir; burada iki kuvvet aynı rijit cisme uygulanır.",
        ],
      },
      {
        title: "Destek seçmek bilinmeyeni silmek değil",
        paragraphs: [
          "Bir destek noktasından moment almak o noktadan geçen bilinmeyen tepkinin momentini sıfırlar ve diğer kuvvetleri bulmayı kolaylaştırır. Sonra kuvvet toplamıyla tepki geri hesaplanır. Türdeş çubuğun ağırlığı kendi merkezine uygulanır; çubuğun ağırlığı ihmal edilmemişse onu atlama.",
          "İki tek taraflı destek üzerinde duran çubukta hesaplanan bir tepki negatif çıkarsa yüzeyin çektiği anlamına gelmez. O destekten temas kopar; yeni denge veya devrilme incelenir. Cıvata/menteşe gibi çekme de taşıyabilen bağlarla yalnız altından iten dayanakların fiziksel sınırı aynı değildir.",
        ],
      },
      {
        title: "Merdiven ve devrilmede sürtünme sınırı",
        paragraphs: [
          "Pürüzsüz duvar merdivene yatay normal, yatay zemin düşey normal ve gerekirse yatay statik sürtünme uygular. Merdivenin ağırlığı ve kişinin konumu moment denklemine ayrı girer. Hangi yüzeyin pürüzlü olduğu verilmeden bütün temaslara keyfî sürtünme ekleme.",
          "Çözümde gereken fs bulunduktan sonra fs≤μsN denetlenir. Eşitlik kayma eşiğidir; altında duran denge mümkündür. Devrilme eşiğinde ağırlık doğrusu destek bölgesinin kenarına gelebilir ve diğer destek tepkisi sıfıra iner. Kayma ve devrilme aynı olay değildir; hangisinin önce olduğu geometrik ve sürtünme verilerine bağlıdır.",
        ],
      },
      {
        title: "İki farklı yoldan aynı moment",
        paragraphs: [
          "Aynı torku hem rxFy−ryFx hem Fd ile hesaplamak güçlü bir kontroldür. F’ye dik çizilen kolun ayağı kuvvet doğrusuna düşmeli; r vektörüyle karıştırılmamalıdır. Bütün kuvvetler dengedeyse başka bir noktadan moment almak da sıfır vermelidir.",
          "Keşifte kuvveti veya konumu tek tek değiştir; saat yönü ile saatin tersi işaretini önce tahmin et. Sıfır kuvveti, sıfır kolu ve karşılıklı momentleri ayrı dene. Çizim gerçek hesaplanan nokta, bileşen ve dik ayağı kullanır; onu okumak XP değildir, bağımsız problem çözümüne hazırlıktır.",
        ],
      },
    ],
    examples: [
      {
        title: "İki bileşen, tek moment",
        prompt:
          "O=(0; 0) m, uygulama noktası A=(2; 1) m; F=(3; 4) N. O’ya göre tork ve dik kol?",
        strategy: "Önce çapraz çarpım, sonra kuvvet büyüklüğü.",
        steps: [
          {
            label: "Moment",
            expression: "τ=2·4−1·3=+5 N·m",
            explanation: "İki bileşen ters yönlü moment üretir.",
          },
          {
            label: "Kuvvet",
            expression: "|F|=√(3²+4²)=5 N",
            explanation: "Kuvvet büyüklüğü.",
          },
          {
            label: "Dik kol",
            expression: "d=|τ|/|F|=1 m",
            explanation: "Uygulama uzaklığı √5 m ile aynı değildir.",
          },
        ],
        answer: "+5 N·m;1 m",
        check: "5 N·1 m=5 N·m.",
        pitfall: "Kol olarak √5 m almak.",
      },
      {
        title: "Açı kuvvetin ne kadarını işe katar?",
        prompt:
          "Yatay 2 m çubuğun sağ ucuna yukarı-sağa 10 N kuvvet yatayla 30° yapıyor. sin 30°=0,5. Sol uca göre tork?",
        strategy: "Yalnız bu yatay konumda düşey bileşenin kolu var.",
        steps: [
          {
            label: "Düşey bileşen",
            expression: "Fy=10·0,5=5 N",
            explanation: "Yatay bileşen sol uç doğrusu üzerindedir.",
          },
          {
            label: "Moment",
            expression: "τ=2·5=+10 N·m",
            explanation: "Yukarı sağ uç saatin tersini zorlar.",
          },
          {
            label: "Dik kol",
            expression: "d=2 sin 30°=1 m;Fd=10·1=10",
            explanation: "İkinci yoldan doğrulanır.",
          },
        ],
        answer: "+10 N·m",
        check: "rxFy−ryFx=2·5−0=10.",
        pitfall: "10·2=20 sonucunu açıdan bağımsız kullanmak.",
      },
      {
        title: "İki destekli çubuk",
        prompt:
          "4 m türdeş çubuk 40 N ağırlığında; uçlarda yalnız yukarı iten A ve B destekleri var. A’dan 3 m’de 60 N aşağı yük. Tepkiler?",
        strategy: "A noktasından moment al, sonra düşey toplamı kullan.",
        steps: [
          {
            label: "Ağırlıklar",
            expression: "Çubuk ağırlığı x=2 m’de; yük x=3 m’de",
            explanation: "Türdeşlik ağırlığı ortaya yerleştirir.",
          },
          {
            label: "Moment",
            expression: "4RB−40·2−60·3=0 → RB=65 N",
            explanation: "A tepkisinin A’ya göre momenti sıfır.",
          },
          {
            label: "Toplam",
            expression: "RA+65=100 → RA=35 N",
            explanation: "İki tepki de pozitiftir; temas koşulu mümkün.",
          },
        ],
        answer: "RA=35 N; RB=65 N",
        check: "B’den moment:35·4−40·2−60·1=0.",
        pitfall: "Çubuğun 40 N ağırlığını unutmak.",
      },
      {
        title: "Kaymaya başlamadan önce",
        prompt:
          "5 m türdeş 100 N merdiven, tabanı duvardan 3 m ve üstü 4 m yüksekte. Duvar pürüzsüz, zemin pürüzlü; merdiven durgun. Gerekli minimum μs?",
        strategy: "Tabandan momentle duvar tepkisini bul.",
        steps: [
          {
            label: "Moment",
            expression: "N_duvar·4=100·1,5 → N_duvar=37,5 N",
            explanation: "Ağırlık orta noktada, yatay kol 1,5 m.",
          },
          {
            label: "Kuvvet",
            expression: "N_zemin=100 N;fs=37,5 N",
            explanation: "Duvar yatay kuvveti zemin sürtünmesi dengeler.",
          },
          {
            label: "Eşik",
            expression: "μs,min=37,5/100=0,375",
            explanation: "En az bu değer duran dengeye izin verir.",
          },
        ],
        answer: "0,375",
        check: "Taban sürtünmesinin tabana göre momenti sıfır.",
        pitfall: "Merdiven uzunluğu 5 m’yi ağırlığın dik kolu sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Moment kolu hangi uzaklık?",
        answer: "Seçili noktadan kuvvetin etkime doğrusuna dik uzaklık.",
      },
      {
        prompt: "Düzlemde işaretli tork?",
        answer: "τz=rxFy−ryFx; sağa x, yukarı y için artı saatin tersi.",
      },
      {
        prompt: "Net moment sıfırsa dönme kesin yok mu?",
        answer: "Hayır; sabit eksende açısal ivme sıfır, ilk dönme sürebilir.",
      },
      {
        prompt: "Tek taraflı destekte negatif tepki neyi gösterir?",
        answer:
          "Varsayılan temaslı dengenin geçersizliğini; yüzey kendiliğinden çekmez.",
      },
    ],
    items: [
      {
        prompt:
          "O=(0; 0) m, A=(2; 1) m. F=(3; 4) N kuvveti A noktasına uygulanıyor. +x sağ, +y yukarı. O’ya göre τz?",
        hint: "rxFy−ryFx.",
        explanation:
          "2·4−1·3=5 N·m; artı işaret saatin tersi ve sayfadan dışarı yönünü verir.",
        options: ["+5 N·m", "+11 N·m", "−5 N·m", "+8 N·m", "0 N·m"],
        answer: 0,
      },
      {
        prompt:
          "Bir kuvvetin büyüklüğü 10 N. Seçili noktadan etkime doğrusuna dik uzaklık 0,30 m. Tork büyüklüğü?",
        hint: "|τ|=F d.",
        explanation:
          "10·0,30=3 N·m. Kullanılan uzaklık özellikle dik uzaklık olarak verilmiştir.",
        options: ["30 N·m", "0,03 N·m", "10 N·m", "3 N·m", "300 N·m"],
        answer: 3,
      },
      {
        prompt:
          "Yatay 2 m çubuğun sağ ucuna 10 N kuvvet yukarı-sağa yatayla 30° uygulanıyor. sin 30°=0,5. Sol uca göre moment büyüklüğü?",
        hint: "Düşey bileşen 5 N.",
        explanation:
          "2·10·sin 30°=10 N·m. Yatay bileşenin etkime doğrusu sol uçtan geçtiği için o bileşenin momenti sıfırdır.",
        options: ["20 N·m", "5 N·m", "10 N·m", "0 N·m", "40 N·m"],
        answer: 2,
      },
      {
        prompt:
          "O=(0; 0) m; A=(3; 0) m noktasına F=(−20; 0) N uygulanıyor. O’ya göre moment?",
        hint: "Kuvvet doğrusu O’dan geçer.",
        explanation:
          "τ=3·0−0·(−20)=0. Büyük kuvvetin her durumda moment üreteceği sonucu doğru değildir.",
        options: ["−60 N·m", "+60 N·m", "−20 N·m", "+20 N·m", "0 N·m"],
        answer: 4,
      },
      {
        prompt:
          "Aynı rijit cisme iki paralel doğru üzerinde 10 N eşit-zıt kuvvet uygulanıyor. Doğrular arası dik uzaklık 2 m. Net kuvvet ve çift moment büyüklüğü?",
        hint: "Kuvvet çifti için F d kullan.",
        explanation:
          "Bileşke sıfır, moment 10·2=20 N·m olur. Bu iki kuvvet aynı cisim üzerindedir; farklı cisimli etki–tepkiyle karıştırılmaz.",
        options: [
          "20 N;0 N·m",
          "0 N; 20 N·m",
          "0 N;40 N·m",
          "10 N; 20 N·m",
          "0 N;0 N·m",
        ],
        answer: 1,
      },
      {
        prompt:
          "4 m türdeş çubuk 40 N; uçlardaki A/B destekleri yukarı. A’dan 3 m’de 60 N aşağı yük var. B tepkisi?",
        hint: "A’dan moment:4RB=40·2+60·3.",
        explanation:
          "RB=260/4=65 N; RA=100−65=35 N. Türdeş çubuğun ağırlığı da toplam momente girer.",
        options: ["35 N", "50 N", "65 N", "75 N", "100 N"],
        answer: 2,
      },
      {
        prompt:
          "Sabit eksende başlangıçta 2 rad/s ile dönen rijit cisimde net tork tüm süre sıfır; atalet momenti sabit. Sonraki hareket hakkında doğru ifade?",
        hint: "Net moment sıfır açısal ivmeyi sıfırlar.",
        explanation:
          "τ=Iα ile α=0; ilk dönme kendiliğinden silinmez. Sıfır torku sıfır açısal hızla özdeşleştirme.",
        options: [
          "Mutlaka hemen durur.",
          "Açısal ivmesi 2 rad/s² olur.",
          "Her durumda yön değiştirir.",
          "Tork sıfır olduğundan enerji negatiftir.",
          "Açısal hızı 2 rad/s kalabilir.",
        ],
        answer: 4,
      },
      {
        prompt:
          "Rijit cisme uygulanan F kuvveti kendi etkime doğrusu boyunca kaydırılıyor. F aynı. Sabit O’ya göre tork?",
        hint: "Etki doğrusunun O’ya dik uzaklığı değişmez.",
        explanation:
          "r’ye F’ye paralel eklenen kısım çapraz çarpımda sıfır verir. Bu dış rijit-cisim eşdeğerliğidir; yerel gerilmenin aynı olduğu söylenmez.",
        options: [
          "Mutlaka artar.",
          "Aynı kalır.",
          "Mutlaka azalır.",
          "Sıfır olur.",
          "Yönü kesin tersine döner.",
        ],
        answer: 1,
      },
      {
        prompt:
          "İki tek taraflı zemin desteği için duran denge hesabında RA=−5 N bulunuyor. Yapışma/cıvata yok. Doğru yorum?",
        hint: "Bu destek yalnız yukarı itebilir.",
        explanation:
          "Tek taraflı temas çekme taşımaz; negatif tepki temasın kopabileceğini ve yeni düzenek denklemlerini gerektirir. İşareti keyfî değiştirme.",
        options: [
          "A’daki temaslı denge varsayımı geçersizdir.",
          "Zemin 5 N aşağı çekiyor.",
          "Negatif normal kuvvet her zaman gerçektir.",
          "Mutlak değer alınca denge kesin düzelir.",
          "Çubuk kütlesi negatiftir.",
        ],
        answer: 0,
      },
      {
        prompt:
          "F=(0; 10) N, A=(2; 0) m ve O=(0; 0). Nokta A, aynı kuvvet doğrusunda A′=(2; 3) m’ye taşınıyor. O’ya göre yeni tork?",
        hint: "Yeni konumda 2·10−3·0 hesapla.",
        explanation:
          "Etki doğrusu x=2 olarak kaldığından τ=20 N·m değişmez. Uygulama noktasının O’ya uzaklığı artsa da dik kol 2 m kalır.",
        options: ["+50 N·m", "−20 N·m", "0 N·m", "+20 N·m", "+30 N·m"],
        answer: 3,
      },
    ],
  },
  {
    id: "kutle-agirlik-merkezi",
    topic: "detail-372",
    title: "Kütle ve ağırlık merkezi: parçaları bir bütünde dengele",
    minutes: 115,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 90–94; OGM 11. sınıf Kütle–Ağırlık Merkezi özeti ve Dersler Cepte s. 14–17. Özgün öğretim, şekil ve sorular; resmî sınav sorusu değildir.",
    objectives: [
      "Noktasal veya türdeş parçalardan kütle merkezini bileşenlerle hesapla.",
      "Tel, levha, hacim ve çıkarılan parça hesaplarının koşullarını ayır.",
      "Ağırlık merkezi, askı dengesi ve destek alanını yorumla.",
    ],
    sections: [
      {
        title: "Kütle merkezi ağırlık ölçmeden tanımlanır",
        paragraphs: [
          "Birden fazla parçadan oluşan sistemin kütle merkezi rKM=Σmi ri/Σmi ile tanımlanır. Kütleler pozitif, koordinatlar seçilen ortak eksene göre işaretlidir. Yer çekimi olmayan bir ortamda da kütle merkezi vardır; onu tanımlamak için ağırlıkların ölçülmesi gerekmez.",
          "x ve y bileşenleri ayrı ağırlıklı ortalamadır. Ortak başlangıç noktasını değiştirince sayısal koordinatlar değişir fakat fiziksel merkez aynı yerde kalır. Birimi metre olan konumu kilogramla ağırlıklandırıp toplam kilograma bölersin; kütle ile koordinatı doğrudan toplamak birim hatasıdır.",
        ],
      },
      {
        title: "İki kütlede uzaklıklar ters kütle oranında",
        paragraphs: [
          "Aynı doğru üzerindeki iki pozitif kütlenin merkezi aralarında ve büyük kütleye daha yakındır. Merkeze uzaklıklar d1 ve d2 ise m1d1=m2d2 olur. Bu ilişki moment dengesiyle veya koordinat formülünü düzenleyerek bulunur.",
          "Kütleler eşitse orta nokta bulunur; bir kütle sıfıra giderse merkez kalan kütleye yaklaşır. İki kütle birden sıfırsa payda sıfırdır ve merkez tanımlı değildir. Gezginde bütün hücreler kaldırılınca son merkezin hayaleti gerçek merkez gibi bırakılmaz; “kütle kalmadı” denir.",
        ],
      },
      {
        title: "Kütle merkeziyle ağırlık merkezi ne zaman çakışır?",
        paragraphs: [
          "Küçük bir bölgede yer çekimi alanı aynı yönlü ve aynı g büyüklüğündeyse Gi=mi g olduğundan ağırlık merkezi ve kütle merkezi çakışır. Düzgün alan bu eşitliğin koşuludur; yalnız cismin adında türdeş yazması alanın düzgünlüğünü garanti etmez.",
          "Paralel fakat büyüklüğü konumla değişen çekim için ağırlık merkezi ΣGi ri/ΣGi ile farklı yerde olabilir. Çok uzun dikey bir cismin alt kısımlarındaki g daha büyükse ağırlık merkezi kütle merkezinden biraz aşağı kayabilir. Alan yönleri de önemli ölçüde değişiyorsa tek bileşke uygulama noktası fikri ayrıca dikkat gerektirir.",
        ],
      },
      {
        title: "Türdeş şeklin geometrik merkezini koşuluyla kullan",
        paragraphs: [
          "Türdeş ince çubuğun merkezi orta nokta, türdeş dikdörtgen veya daire levhanın merkezi simetri merkezidir. Türdeş üçgen levhanın merkezi kenarortayların kesiştiği ve köşeden kenarortayın üçte ikisi kadar uzaktaki noktadır. Kütle yoğunluğu veya kalınlık değişiyorsa bu kısa yollar genel değildir.",
          "İnce tel çerçeve ile dolu levha aynı şekil çizgisine benzese de kütle dağılımları farklıdır. Tel için aynı çizgisel yoğunlukta uzunluk, levha için aynı yüzey yoğunluğunda alan, cisim için aynı hacim yoğunluğunda hacim kütleyle orantılıdır. Hangi modelin verildiğini sormadan bütün parçalara alan kullanma.",
        ],
      },
      {
        title: "Birleşik şekli küçük ve doğru parçalara ayır",
        paragraphs: [
          "Birleşik sistemde önce her parçanın kendi kütlesini ve merkezini bul, sonra bu merkezleri noktasal kütleler gibi ağırlıklandır. Aynı malzeme ve kalınlıktaki levhalarda ortak yüzey yoğunluğu sadeleşir; yalnız alanları kullanabilirsin. Farklı yoğunluk veya kalınlıkta m=ρV bağı ayrı tutulur.",
          "Parçalara ayırırken örtüşen alanı iki kez sayma. İki kareyi yan yana eklemekle üst üste bindirmek aynı kütle geometrisi değildir. Çubuklar ortak uçta birleşiyorsa sıfır boyutlu matematiksel birleşim ekstra kütle taşımaz; kalın bağlantı parçası varsa onun kütlesi ayrıca verilmelidir.",
        ],
      },
      {
        title: "Kesilen parçayı çıkar, negatif madde icat etme",
        paragraphs: [
          "Başlangıç M kütleli cismin merkezi r0, kesilip atılan m parçanın merkezi rc ise kalan merkezin denklemi rK=(M r0−m rc)/(M−m) olur. Hesapta eksi katkı, artık bulunmayan parçayı muhasebeden düşürür; fiziksel negatif kütle yaratmaz.",
          "m<M koşulu gerekir. Kalan merkez ilk merkezden, kesilen parçanın merkezinden uzağa doğru kayar; kesilen parça ilk merkezin tam üstündeyse merkez değişmeyebilir. Birden fazla parça çıkarmada hepsinin moment ve kütle katkısı ayrı çıkarılır; yalnız alanı azaltıp eski merkezi bırakmak doğru değildir.",
        ],
      },
      {
        title: "Merkez bazen cismin maddesinin dışında kalır",
        paragraphs: [
          "Daire telin kütle merkezi boş merkezinde, kıvrık bir parçanın merkezi boşlukta olabilir. Merkez sistemin bütün kütlelerini temsil eden geometrik noktadır, mutlaka fiziksel tanecik içermez. Pozitif noktasal kütlelerin merkezi yine onların oluşturduğu dışbükey bölge içinde kalır.",
          "İçbükey levhada delik veya boşluk merkez civarında olabilir; bu durum formülün bozulduğunu göstermez. Gezginde merkez işareti dolu hücrelerin dışında görünürse kalan geometrinin tümünü düşün. Kütlelerin dış sınırlarının bile dışında çıkan bir sonuç ise işaret, çıkarılan parça veya payda hatasına işaret edebilir.",
        ],
      },
      {
        title: "Askıda düşey doğru ve kararlılık",
        paragraphs: [
          "Tek ideal ipten asılan, serbestçe dönebilen cisim durgun dengeye geldiğinde ağırlık merkezinin düşey doğrusu askıdan geçer. İki farklı askıdan çizilen çekül doğrularının kesişimi ağırlık merkezini deneysel olarak bulmaya yardım eder. Bu yöntem düzgün yer çekimi ve serbest dönme varsayar.",
          "Sadece doğrultuların çakışması kararlılığın bütününü anlatmaz. Merkez askının altındaysa küçük sapmada geri döndüren moment ve kararlı denge, üstündeyse uzaklaştıran moment ve kararsız denge olabilir. Tam merkezden yataklanan ideal cisimde küçük dönmeye nötr denge mümkün olabilir; sürtünme ve bağ koşulları ayrıca etkilidir.",
        ],
      },
      {
        title: "Destek alanı ve devrilme eşiği",
        paragraphs: [
          "Durgun cismin ağırlık doğrusu destek alanının içinde kaldığında uygun temas tepkileriyle denge mümkün olabilir. Kenara geldiğinde devrilme eşiği, dışına geçtiğinde o destekler üzerinde duran denge kaybolabilir. Birden fazla temas için tepkilerin tek taraflı olma koşulu da denetlenir.",
          "Taban yarı genişliği b, kütle merkezi tabandan h yüksekte olan rijit bir cismin kaymadan yan yatırıldığı basit modelde kritik eğim tanφ=b/h ile bulunabilir. Daha alçak merkez ve daha geniş taban genellikle devrilmeye daha dayanıklıdır. Fakat kayma eşiği sürtünmeye bağlıdır; önce kayabilecek bir cisim için yalnız devrilme formülünden gerçek hareket sırası çıkmaz.",
        ],
      },
      {
        title: "Merkezin hareketi toplam dış kuvveti izler",
        paragraphs: [
          "Sabit toplam kütlede M aKM=F_dış,net olur. İç kuvvetler sistemin parçalarını hareket ettirip şekli değiştirebilir; toplam dış kuvvet sıfırken kütle merkezinin hızı değişmez. Kayıkta yürüyen kişinin kıyıya göre yer değiştirmesi bu fikirle, kayığı da sisteme dahil ederek hesaplanır.",
          "Keşifte eş kütleli hücreleri çıkarıp ekle ve merkezi hesaplamadan yönünü tahmin et. Toplam kalan kütle, x ve y momentleri ve merkez koordinatları birlikte gösterilir. Hücre seçimi keşif kaydıdır; süre geçirmek veya bütün hücreleri açmak öğrenme puanı üretmez. Yeni dağılımda doğru payda ve moment kurman bağımsız kanıttır.",
        ],
      },
    ],
    examples: [
      {
        title: "Doğruda iki kütle",
        prompt: "2 kg kütle x=0 m,3 kg kütle x=10 m. Ortak merkez?",
        strategy: "Konumları kütleyle ağırlıklandır.",
        steps: [
          {
            label: "Kütle",
            expression: "M=2+3=5 kg",
            explanation: "İki kütle de sisteme dahildir.",
          },
          {
            label: "Moment",
            expression: "Σmx=2·0+3·10=30 kg·m",
            explanation: "Ortak koordinat başlangıcı kullanılır.",
          },
          {
            label: "Merkez",
            expression: "xKM=30/5=6 m",
            explanation: "3 kg kütleye uzaklık 4 m, diğerine 6 m.",
          },
        ],
        answer: "x=6 m",
        check: "2·6=3·4 moment dengesi.",
        pitfall: "İki konumun basit ortalaması 5 m almak.",
      },
      {
        title: "İki koordinatı ayrı bul",
        prompt:
          "Noktasal kütleler 3 kg (0; 3) m, 2 kg (1; 1) m ve 1 kg (4; 1) m. Kütle merkezi?",
        strategy: "Aynı toplam kütleyi iki bileşende kullan.",
        steps: [
          {
            label: "Toplam",
            expression: "M=6 kg",
            explanation: "Tüm kütleler pozitif.",
          },
          {
            label: "x",
            expression: "xKM=(3·0+2·1+1·4)/6=1 m",
            explanation: "x momentleri toplanır.",
          },
          {
            label: "y",
            expression: "yKM=(3·3+2·1+1·1)/6=2 m",
            explanation: "y momentleri ayrı toplanır.",
          },
        ],
        answer: "(1;2) m",
        check: "Merkez verilen noktaların oluşturduğu üçgen içinde.",
        pitfall: "Koordinatları kütlelerle çarpmadan ortalamak.",
      },
      {
        title: "Köşesi kesilen levha",
        prompt:
          "Türdeş 6 m×4 m dikdörtgen levhanın sol-alt köşesi (0; 0). Sağ-üst köşeden 2 m×2 m kare kesiliyor. Kalan merkez?",
        strategy: "Aynı yüzey yoğunluğunu sadeleştir ve deliği çıkar.",
        steps: [
          {
            label: "İlk ve delik",
            expression:
              "İlk alan 24, merkezi (3; 2); delik alan 4, merkezi (5; 3)",
            explanation: "Birimler m² ve m.",
          },
          {
            label: "Moment farkı",
            expression: "x momenti 72−20=52; y momenti 48−12=36",
            explanation: "Kesilen alanın katkısı eksi.",
          },
          {
            label: "Kalan",
            expression: "Alan 20; merkez (52/20; 36/20)=(2,6;1,8) m",
            explanation: "Merkez sağ-üst delikten uzağa kayar.",
          },
        ],
        answer: "(2,6;1,8) m",
        check: "20·(2,6;1,8)+4·(5;3)=24·(3;2).",
        pitfall: "Kalan paydasını 24 bırakmak.",
      },
      {
        title: "Düzgün olmayan çekim",
        prompt:
          "İki 1 kg kütle düşey y=0 ve y=10 m’de. Alt noktada g=10, üstte g=8 m/s²; kuvvetler paralel aşağı. Kütle ve ağırlık merkezi?",
        strategy: "Kütle ile ağırlık ağırlıklandırmalarını ayrı tut.",
        steps: [
          {
            label: "Kütle merkezi",
            expression: "yKM=(1·0+1·10)/2=5 m",
            explanation: "Çekim alanı tanıma girmez.",
          },
          {
            label: "Ağırlıklar",
            expression: "G_alt=10 N, G_üst=8 N",
            explanation: "g farkı yükleri değiştirir.",
          },
          {
            label: "Ağırlık merkezi",
            expression: "yAM=(10·0+8·10)/18=40/9≈4,444 m",
            explanation: "Daha güçlü alt çekime doğru kayar.",
          },
        ],
        answer: "5 m; yaklaşık 4,444 m",
        check: "Ağırlık merkezi kütle merkezinin altında.",
        pitfall: "İki merkez her alanda aynıdır demek.",
      },
    ],
    recall: [
      {
        prompt: "Kütle merkezinin paydası nedir?",
        answer: "Sistemde gerçekten kalan toplam kütle.",
      },
      {
        prompt: "Delik hesapta nasıl temsil edilir?",
        answer: "İlk kütle ve momentten kesilen parçanın katkısını çıkararak.",
      },
      {
        prompt: "Aynı malzemeli tel ve levhada hangi oran kullanılır?",
        answer: "Tel için uzunluk, aynı kalınlık levhada alan.",
      },
      {
        prompt: "Kütle merkezi boşlukta bulunabilir mi?",
        answer: "Evet; örneğin türdeş daire telin boş merkezinde.",
      },
    ],
    items: [
      {
        prompt:
          "2 kg noktasal kütle x=0 m,3 kg noktasal kütle x=10 m. Kütle merkezi?",
        hint: "Σmx/Σm.",
        explanation:
          "(2·0+3·10)/(2+3)=6 m. Merkez daha büyük kütleye yakındır.",
        options: ["5 m", "4 m", "8 m", "10 m", "6 m"],
        answer: 4,
      },
      {
        prompt:
          "Eşit iki pozitif noktasal kütle (−2; 0) m ve (4; 6) m’de. Ortak merkez?",
        hint: "Eşit ağırlıklı bileşen ortalaması.",
        explanation:
          "x=(−2+4)/2=1, y=(0+6)/2=3 m. Her bileşen ortak eksende hesaplanır.",
        options: ["(1;3) m", "(2;3) m", "(1;6) m", "(−1;3) m", "(3;1) m"],
        answer: 0,
      },
      {
        prompt:
          "Türdeş 6 m×4 m levhanın sol-alt köşesi (0; 0). Sağ-üst köşeden 2 m×2 m kare atılıyor. Kalan x merkezi?",
        hint: "İlk alan 24 merkezi 3; delik alan 4 merkezi 5.",
        explanation:
          "x=(24·3−4·5)/(24−4)=52/20=2,6 m. Kalan kütleye karşılık gelen alan 20’dir.",
        options: ["3 m", "3,4 m", "2 m", "2,6 m", "5 m"],
        answer: 3,
      },
      {
        prompt:
          "Kütleleri eşit iki nokta y=0 ve y=10 m’de. Paralel aşağı g değerleri sırasıyla 10 ve 8 m/s². Ağırlık merkezi y kaç m?",
        hint: "Ağırlıklar 10m ve 8m ile oranlanır.",
        explanation:
          "yAM=(10·0+8·10)/(10+8)=80/18=40/9 m. Kütle merkezi ayrı olarak 5 m’dir.",
        options: ["5 m", "40/9 m", "50/9 m", "4 m", "8 m"],
        answer: 1,
      },
      {
        prompt:
          "Aynı kalınlık ve aynı çizgisel yoğunlukta iki ince tel parçasının kütle oranını hangi nicelik verir?",
        hint: "Telin kütlesi λL.",
        explanation:
          "Aynı λ için m1/m2=L1/L2. Dolu levha alanı yerine telin kendi uzunluğu kullanılır.",
        options: [
          "Çevreledikleri alan oranı.",
          "Yüksekliklerinin karesi.",
          "Uzunluk oranı.",
          "Koordinatları toplamı.",
          "Daima 1.",
        ],
        answer: 2,
      },
      {
        prompt:
          "Düzgün yer çekiminde türdeş daire telin kütle merkezi için doğru ifade?",
        hint: "Dönel simetriyi kullan.",
        explanation:
          "Kütle dağılımı tüm yönlerde simetriktir; merkez boşlukta olabilir. Kütle merkezinde mutlaka madde bulunması gerekmez.",
        options: [
          "Mutlaka tel üzerindedir.",
          "Çekim yoksa tanımlanamaz.",
          "En üst noktasındadır.",
          "Telin boş geometrik merkezindedir.",
          "En alt noktasındadır.",
        ],
        answer: 3,
      },
      {
        prompt:
          "Pozitif kütleli bütün hücreleri kaldırılan bir modelde toplam kütle 0 oluyor. Kütle merkezi?",
        hint: "PaydaΣm sıfır.",
        explanation:
          "Hiç kütle kalmadığı için Σmr/Σm oranı tanımlanamaz. Model sahte merkez göstermemelidir.",
        options: [
          "Kesin (0; 0).",
          "Tanımlı değildir.",
          "Son işaretli konum kesin merkezdir.",
          "Sonsuz kütle oluşur.",
          "Kaldırılan hücreler negatif kütle olur.",
        ],
        answer: 1,
      },
      {
        prompt:
          "Tek serbest askıdaki rijit cismin ağırlık merkezi askı noktasının tam altında. Küçük açısal sapma ve düzgün çekim için denge genellikle nasıl?",
        hint: "Sapmada potansiyel enerji artar.",
        explanation:
          "Askı altındaki merkez küçük sapmayla yükselir; ağırlık geri döndürür. Sürtünme yoksa salınım olabilir, tek başına hemen durma sonucu çıkarılmaz.",
        options: [
          "Kararsız; her sapma büyür.",
          "Her durumda açısal hız sonsuzdur.",
          "Kararlı; geri döndüren moment oluşur.",
          "Ağırlık sıfırdır.",
          "Merkez üstteymiş gibi aynı kararsızlık vardır.",
        ],
        answer: 2,
      },
      {
        prompt:
          "Düzgün g’de bir levhadan, ilk merkezinin sağında bulunan parça kesiliyor. Kalan kütle pozitif. Yeni merkezin yatay yönü?",
        hint: "Eksilen sağ momenti düşün.",
        explanation:
          "xK−x0=−m(xc−x0)/(M−m)<0. Parça ilk merkezin sağındaysa kalan merkez ondan uzağa, sola kayar.",
        options: [
          "Sağa kayar.",
          "Mutlaka aynı kalır.",
          "Kesin levhanın çok dışına çıkar.",
          "Kesilen parça negatif maddeye dönüşür.",
          "İlk merkezden sola kayar.",
        ],
        answer: 4,
      },
      {
        prompt:
          "Sabit toplam kütleli sistemde dış net kuvvet 0; parçalar iç kuvvetlerle yer değiştiriyor. Kütle merkezi hareketi?",
        hint: "M aKM=F_dış,net.",
        explanation:
          "Dış net kuvvet 0 ise merkez ivmesi 0 olur; başlangıç hızı varsa sabit sürer. İç hareketler tek tek parçaların hızlarını değiştirebilir.",
        options: [
          "Hızı değişmez.",
          "Mutlaka durur.",
          "İç kuvvet büyüdükçe ivmesi artar.",
          "Her parça aynı hızla gider.",
          "Konumu her zaman sıfırdır.",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "basit-makineler-ayt",
    topic: "detail-373",
    title: "Basit makineler: kuvvet, yol ve enerji birlikte",
    minutes: 130,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 95–100; OGM 11. sınıf Basit Makineler I–II özetleri ve Dersler Cepte s. 18–20. Özgün öğretim, modeller ve sorular; resmî sınav sorusu değildir.",
    objectives: [
      "Kuvvet kazancını yol ve iş bilançosuyla birlikte kur.",
      "Sabit/hareketli makara, kaldıraç ve eğik düzlemin koşullarını karşılaştır.",
      "Çıkrık, vida, dişli ve kayışta gerçek bağlı hareketi ve enerji kaybını ayır.",
    ],
    sections: [
      {
        title: "Makine enerji yaratmaz",
        paragraphs: [
          "Basit makine kuvvetin yönünü veya uygulandığı yol ile büyüklük arasındaki ilişkiyi değiştirerek işi kolaylaştırır. Durgunluk ya da sabit hızlı ideal işlemde dışarıdan verilen iş, kazanılan potansiyel enerjiye eşittir; sürtünme veya ek yükselen parça varsa bilanço genişler. Makine durmadan enerji üreten bir kazanç aracı değildir.",
          "Kuvvet kazancı yük/uygulanan kuvvet oranıdır ve boyutsuzdur. Kazanç 1’den büyükse daha küçük kuvvet, genellikle daha uzun yol gerekir; 1’den küçükse kuvvet kaybı karşılığında yük yolu veya hız kazancı olabilir. Yön değişimi sağlayan sabit makara kazanç 1 olsa da kullanışlıdır.",
        ],
      },
      {
        title: "İş eşitliğini hangi kuvvet hangi yolda kullanır?",
        paragraphs: [
          "İdeal düzende F s=G h bağı, kuvvetin kendi doğrultusunda yaptığı iş ile yükün düşey potansiyel artışını karşılaştırır. Kuvvet yolun tamamına paralel değilse iş için skaler çarpım gerekir. Makara veya kaldıraç hareketinde her noktanın aynı yolu aldığı varsayılmaz.",
          "Hareketli parçaların ağırlığı ihmal edilmemişse onların da potansiyeli artar. Bu ek enerji sürtünme ısısı değildir. Başlangıç ve son sürat farklıysa kinetik enerji farkı da eklenir. Ünitedeki kısa kazanç formülleri dengede veya sabit hızlı, ideal bağlantılı durumlar için açıkça kullanılır.",
        ],
      },
      {
        title: "Kaldıraçta iki dik kol",
        paragraphs: [
          "Ağırlığı ihmal edilen rijit kaldıraçta destek etrafında denge F dF=G dG verir; d değerleri kuvvet doğrularının desteğe dik uzaklıklarıdır. Desteğin arada olduğu tip kuvvetten kazandırabilir veya kaybettirebilir. Kollar eşitse ideal kuvvetler eşittir.",
          "Yük destekle kuvvet arasında ise uygun paralel kuvvetli geometride kuvvet kolu daha uzundur ve F<G olur. Kuvvet aradaysa kuvvet kolu daha kısa, F>G olur; cımbız gibi sistemlerde hassas yol kazancı yararlıdır. Çubuk ağırlığı verilmişse onun merkezindeki ağırlık momentini ayrıca ekle.",
        ],
      },
      {
        title: "Sabit makara kuvveti yönlendirir",
        paragraphs: [
          "Sürtünmesiz sabit makaradan geçen kütlesiz aynı ipin her yanında gerilme eşittir. Düşey dengedeki G yükü için T=G, serbest uçtaki kuvvet F=T olur. Yük h yükselirken ip uzamadığından serbest uç h kadar hareket eder.",
          "Makaranın kendi merkezi yükselmediği için onun ağırlığı yükü kaldıran işe eklenmez; askı veya tavana binen tepkiyi etkileyebilir. Makara ağırlığı ile hareketli yükü karıştırma. Sürtünmeli yatak, kalın ağır ip veya açılı taşıma varsa basit ideal T eşitliği ayrıca sınanır.",
        ],
      },
      {
        title: "Tek hareketli makarada gerçek taşıyıcı kollar",
        paragraphs: [
          "İdeal tek hareketli makarayı iki düşey paralel ip kolu taşıyorsa 2T=G+Gm olur; F=T. Makara Gm ağırlığıyla yükle birlikte yükselir. Yük h yükselince iki taşıyıcı kolun toplam kısalması 2h olur, serbest uçtan 2h ip çekilir.",
          "Kollar düşey veya birbirine paralel değilse yalnız ip sayıp G/2 yazmak yeterli değildir; düşey bileşenleri toplanır. Aynı ipin gerçekten hangi parçalarının hareketli bloğu taşıdığı çizilmelidir. Gezginde yalnız bir sabit ya da tek hareketli makara seçilir; gösterilmeyen karmaşık düzeneğe otomatik 2ⁿ kuralı uygulanmaz.",
        ],
      },
      {
        title: "Palanga ve ardışık makineler farklı bağlantılardır",
        paragraphs: [
          "Bir hareketli bloğu n düşey paralel eş gerilmeli ip kolu dengede veya sabit hızla taşıyorsa ideal F=(G+Gm)/n, serbest uç yolu n h olabilir. n, resimde görünen bütün ip parçaları değil bloğu yukarı taşıyan kolların sayısıdır. Serbest ucun bloğa mı tavana mı bağlı olduğu sonucu değiştirebilir.",
          "Ardışık iki hareketli makara gibi kademeli düzende önce alttaki yük ve alt makara ağırlığından bir ipin gerilmesi, sonra üst kademenin dengesi bulunur. Her düzeneği tek bloklu n formülüne veya her makarayı ikiye bölme ezberine zorlamamak gerekir. Hareket kısıtı ve kuvvet dengesi ayrı doğrulansın.",
        ],
      },
      {
        title: "Eğik düzlemde yolun karşılığı",
        paragraphs: [
          "Sürtünmesiz sabit eğik düzlemde, yük düzleme paralel kuvvetle sabit hızla yükseliyorsa F=G sinθ=G h/L olur. Normal kuvvet N=G cosθ’dır; yükü düzleme dik yönde ivmelendirme yoktur. Aynı yüksekliğe daha uzun rampayla çıkmak ideal kuvveti küçültür, yapılan işi G h olarak bırakır.",
          "Kuvvet düzleme paralel değilse N değişebilir; F=G h/L kısa bağı doğrudan geçmez. Eğimi dikey sınıra getirmek F=G verir. Tam yatay ve sürtünmesiz yolda F=0 iken yük yükselmiyorsa kuvvet kazancı veya verim diye sıfıra bölünmüş sayı üretmek yerine tanımın bu sınırını açıkla.",
        ],
      },
      {
        title: "Sürtünmeli rampanın enerji hesabı",
        paragraphs: [
          "Yukarı sabit hızlı kaymada kinetik sürtünme aşağıdır ve fk=μkN olur. Paralel çekişte F=G sinθ+μkG cosθ; giriş işi F L, yararlı potansiyel artışı G h, ısı fkL olur. Kuvvet kazancı sürtünmeyle azalabilir, hatta 1’in altına inebilir.",
          "Duran yükte statik sürtünme her zaman μsN değildir ve yönü kayma eğilimine bağlıdır. Bu bölümün kinetik formülünü durgun dengeye aynen taşıma. Gezginde rampada yukarı sabit hız modeli açık verilir; μ değişirken yalnız kuvveti değil ısı ve verimi de birlikte izle.",
        ],
      },
      {
        title: "Çıkrık: aynı tur, farklı çevre",
        paragraphs: [
          "Birbirine sabitlenmiş R kollu çevirme ve r yarıçaplı tambur aynı açısal yer değiştirmeyi yapar. İdeal moment dengesi F R=G r; bir turda kuvvet ucu 2πR yol alır, yük 2πr yükselir. Kuvvetin kola teğet uygulandığı varsayılır.",
          "Kolu büyütmek veya tamburu küçültmek aynı yük için gereken F’yi azaltır fakat daha çok el yolu gerektirir. R ve r’yi çapla karıştırma; ikisini de çap olarak tutarlı oranlamak aynı kazancı verse de çevre hesabında gerçek yarıçap gerekir. Halat kalınlığıyla etkin tambur yarıçapı değişiyorsa tek sabit r modeli sınırlıdır.",
        ],
      },
      {
        title: "Vida: bir turda adım kadar ilerler",
        paragraphs: [
          "Tek başlangıçlı ideal vidada bir tam turdaki ilerleme adım a’dır. Teğet kuvvet R kolunda bir turda 2πR yol alır; direnç P ise F·2πR=P a olur. Daha küçük adım aynı ideal direnç için daha küçük kuvvet ister fakat aynı toplam ilerleme için daha çok tur gerekir.",
          "Gerçek vida sürtünmesi ve kendinden kilitlenme bu ideal iş hesabının dışında olabilir. Çok başlangıçlı vidada bir tur ilerleme, komşu dişler arası aralıktan farklı olabilir; soruda adımın hangi anlamda verildiğini oku. Başlangıç ve bitiş dönme enerjisi aynı kabul edilmeden giriş işinin tamamını yalnız dirence eşitleme.",
        ],
      },
      {
        title: "Dişli, kayış ve eş merkezli bağlantı",
        paragraphs: [
          "Sabit eksenli dıştan temas eden dişlilerde kayma yoksa çevresel yollar eşit, tur sayıları yarıçap veya diş sayısıyla ters orantılıdır; dönüş yönleri zıttır. Araya giren basit avare dişli yönü değiştirir ama ilk-son tur oranını kendi çapıyla ayrı bir kalıcı kazanca dönüştürmez.",
          "Açık kayış bağlı kasnaklar aynı, çapraz kayış bağlılar ters yönde döner; kayma yok varsayımı gerekir. Aynı mile sabitlenmiş iki farklı yarıçaplı kasnak aynı turu yapar, çevresel yolları farklıdır. Kaynağın diş sayısı ile devir sayısını aynı n harfiyle göstermesi yerine her niceliği açık adlandır.",
        ],
      },
      {
        title: "Verim ve yararlı işin tanımı",
        paragraphs: [
          "Verim η=W_yararlı/W_giriş olur; pasif, başlangıçta depolanmış enerji boşaltmayan bir makinede 0≤η≤1 beklenir. Yüzde göstermek için 100 ile çarpılır. Hangi işin yararlı sayıldığını belirt: yalnız yükü yükseltmek ile yük ve hareketli makaranın tamamını yükseltmek aynı pay değildir.",
          "Makara ağırlığı nedeniyle yük için oran 1’den küçükken ideal düzeneğin ısı kaybı yine sıfır olabilir; aksesuarın potansiyeli de enerji taşır. Gezginde ideal makara için bu iki potansiyel ayrı, sürtünmeli rampa için ısı ayrı gösterilir. Önce tahmin edip sonra bilanço kurmak öğrenme alıştırmasıdır; kontrolü tıklamak kendi başına XP vermez.",
        ],
      },
    ],
    examples: [
      {
        title: "Kaldıraçta moment",
        prompt:
          "Ağırlıksız kaldıraçta kuvvetin dik kolu 1,2 m,120 N yükün dik kolu 0,30 m. Denge kuvveti ve kazanç?",
        strategy: "Desteğe göre momentleri eşitle.",
        steps: [
          {
            label: "Denge",
            expression: "F·1,2=120·0,30",
            explanation: "Çubuğun ağırlığı ihmal edildi.",
          },
          {
            label: "Kuvvet",
            expression: "F=36/1,2=30 N",
            explanation: "Kuvvet kolu dört kat uzun.",
          },
          {
            label: "Kazanç",
            expression: "G/F=120/30=4",
            explanation: "İdeal küçük harekette el yolu yük yolunun dört katı.",
          },
        ],
        answer: "30 N; kazanç 4",
        check: "30·1,2=120·0,30=36 N·m.",
        pitfall: "Moment kolları yerine uçlar arası toplamı almak.",
      },
      {
        title: "Makara da yükseliyor",
        prompt:
          "Tek hareketli ideal makara 80 N yük ve 20 N makara ağırlığı taşıyor. İki düşey ip kolu var. Yük 1 m sabit hızla yükseliyor. F, çekilen ip ve enerji?",
        strategy: "Toplam hareketli ağırlığı iki kola paylaştır.",
        steps: [
          {
            label: "Kuvvet",
            expression: "2F=80+20 → F=50 N",
            explanation: "Makara ağırlığı taşınan bloğa dahildir.",
          },
          {
            label: "Yol",
            expression: "s=2h=2 m",
            explanation: "İki ip kolu birer metre kısalır.",
          },
          {
            label: "Enerji",
            expression: "W_giriş=50·2=100 J; yük 80 J, makara 20 J",
            explanation: "Isı kaybı 0; yük için yararlı oran 0,80.",
          },
        ],
        answer: "50 N; 2 m;100 J=80 J+20 J",
        check: "Net enerji 100−80−20=0.",
        pitfall: "20 J aksesuar potansiyelini sürtünme ısısı saymak.",
      },
      {
        title: "Rampada kayıp nerede?",
        prompt:
          "100 N yük,5 m uzunluk ve 3 m yükseklikte rampada yukarı sabit hızla paralel çekiliyor. μk=0,25. Kuvvet, ısı ve verim?",
        strategy: "Geometri, kuvvet ve iş bilançosunu sırayla kur.",
        steps: [
          {
            label: "Geometri",
            expression: "sinθ=3/5;cosθ=4/5;N=80 N",
            explanation: "Kuvvet düzleme paralel.",
          },
          {
            label: "Kuvvet",
            expression: "fk=0,25·80=20 N;F=60+20=80 N",
            explanation: "Sürtünme yukarı harekete karşı.",
          },
          {
            label: "Bilanço",
            expression: "Wg=80·5=400 J;Wy=100·3=300 J;Q=100 J;η=0,75",
            explanation: "Giriş ile yararlı arasındaki fark ısıdır.",
          },
        ],
        answer: "80 N;100 J;%75",
        check: "300+100=400 J.",
        pitfall: "F=G h/L formülünü sürtünmeyi eklemeden kullanmak.",
      },
      {
        title: "Vidada bir tur",
        prompt:
          "Tek başlangıçlı ideal vida sabit hızla döndürülürken bir turda 0,005 m ilerliyor. Direnç 600 N, teğet kuvvet kolu 0,20 m. π=3. Kuvvet?",
        strategy: "Bir tur için giriş ve direnç işlerini eşitle.",
        steps: [
          {
            label: "Yollar",
            expression: "El yolu 2·3·0,20=1,20 m; ilerleme 0,005 m",
            explanation: "Tur sayısı iki hareket için aynıdır.",
          },
          {
            label: "İş",
            expression: "F·1,20=600·0,005=3 J",
            explanation: "Sürtünme ve enerji değişimi yok.",
          },
          {
            label: "Kuvvet",
            expression: "F=3/1,20=2,5 N",
            explanation: "Küçük kuvvet karşılığında büyük el yolu.",
          },
        ],
        answer: "2,5 N",
        check: "Kuvvet kazancı 240, yol oranı 1,20/0,005=240.",
        pitfall: "Adımı santimetre sanıp metre dönüşümünü atlamak.",
      },
    ],
    recall: [
      {
        prompt: "Kuvvet kazancı nedir?",
        answer: "Yük/uygulanan kuvvet; enerji kazancı değildir.",
      },
      {
        prompt: "İdeal sabit makara F ve yol oranı?",
        answer: "F=G, el yolu= yükün yükselmesi.",
      },
      {
        prompt:
          "Dengedeki tek hareketli makarada iki düşey paralel taşıyıcı kol varsa?",
        answer: "F=(G+Gm)/2; el yolu 2h.",
      },
      {
        prompt: "Açık ve çapraz kayışın yön farkı?",
        answer: "Kayma yoksa açık kayış aynı, çapraz kayış ters yön.",
      },
    ],
    items: [
      {
        prompt:
          "Dengedeki ideal ağırlıksız kaldıraçta 100 N yük kolu 0,20 m, kuvvet kolu 1 m. F?",
        hint: "F·1=100·0,20.",
        explanation: "F=20 N. Kuvvet kazancı 5; bu enerji kazancı değildir.",
        options: ["100 N", "20 N", "50 N", "5 N", "500 N"],
        answer: 1,
      },
      {
        prompt:
          "İdeal sabit makarada 80 N yük sabit hızla 2 m yükseliyor. F ve çekilen ip?",
        hint: "Sabit makara idealde yalnız yön değiştirir.",
        explanation:
          "F=G=80 N ve el yolu h=2 m; giriş 160 J, potansiyel 160 J.",
        options: [
          "40 N;4 m",
          "160 N;1 m",
          "80 N; 2 m",
          "40 N; 2 m",
          "80 N;4 m",
        ],
        answer: 2,
      },
      {
        prompt:
          "Dengedeki tek hareketli ideal makara iki düşey ip koluyla 80 N yük ve 20 N makara ağırlığı taşıyor. F?",
        hint: "2F bütün hareketli ağırlığı dengeler.",
        explanation:
          "2F=80+20=100 → F=50 N. Sabit makaranın aksine bu makaranın merkezi de yükselir.",
        options: ["50 N", "40 N", "100 N", "60 N", "20 N"],
        answer: 0,
      },
      {
        prompt:
          "İdeal tek hareketli makarada iki düşey paralel ip kolu var. Yük 0,50 m yükselince serbest uçtan kaç m ip çekilir?",
        hint: "İki taşıyıcı kolun kısalmasını topla.",
        explanation:
          "Her kol 0,50 m kısalır; serbest uç 1 m çeker. Yol kazancı değil kuvvet karşılığında yol kaybı vardır.",
        options: ["0,25 m", "0,50 m", "2 m", "1 m", "4 m"],
        answer: 3,
      },
      {
        prompt:
          "100 N yük,5 m uzunluk ve 3 m yükseklikte sürtünmesiz rampada paralel kuvvetle sabit hızla çıkıyor. F?",
        hint: "F=G h/L.",
        explanation:
          "100·3/5=60 N. 60·5=100·3=300 J olduğundan enerji korunur.",
        options: ["100 N", "30 N", "80 N", "20 N", "60 N"],
        answer: 4,
      },
      {
        prompt:
          "100 N yük; rampa uzunluğu 5 m, yüksekliği 3 m, μk=0,25. Yukarı sabit hız ve paralel çekiş. Kuvvet?",
        hint: "cosθ=4/5;fk=0,25·80.",
        explanation:
          "Aşağı ağırlık bileşeni 60 N, normal 80 N, sürtünme 20 N; gerekli F=80 N.",
        options: ["80 N", "60 N", "100 N", "20 N", "75 N"],
        answer: 0,
      },
      {
        prompt:
          "Bir pasif makineye 500 J iş veriliyor, seçili yükün yararlı potansiyel artışı 400 J. Verim?",
        hint: "η=Wy/Wg.",
        explanation:
          "400/500=0,80; yüzde 80. Farkın neye aktarıldığı ek enerji bilançosuyla ayrılır, otomatik yok olmuş enerji değildir.",
        options: ["%20", "%125", "%100", "%40", "%80"],
        answer: 4,
      },
      {
        prompt:
          "Sabit hızla çevrilen ideal çıkrıkta tambur yarıçapı 0,10 m, teğet kuvvet kolu 0,40 m, yük 160 N. F?",
        hint: "F R=G r.",
        explanation:
          "F=160·0,10/0,40=40 N. Kuvvet ucu bir turda yükten dört kat uzun yol alır.",
        options: ["160 N", "640 N", "80 N", "40 N", "20 N"],
        answer: 3,
      },
      {
        prompt:
          "Tek başlangıçlı ideal vida sabit hızla dönüp bir turda 0,005 m ilerliyor. Direnç 600 N, teğet kol 0,20 m, π=3. F?",
        hint: "F·2πR=P a.",
        explanation:
          "F=600·0,005/(2·3·0,20)=2,5 N. İlerleme ile el çevresi aynı uzunluk değildir.",
        options: ["5 N", "2,5 N", "15 N", "25 N", "0,5 N"],
        answer: 1,
      },
      {
        prompt:
          "Sabit eksenli, dıştan temas eden kaymasız iki dişlinin yarıçapları 10 ve 20 cm. Küçük dişli 6 tur saat yönünde dönerse büyük?",
        hint: "Tur sayısı yarıçapla ters, dış temas yönü ters.",
        explanation:
          "6·10=n·20 → n=3. Aynı milde sabit iki dişli olsaydı aynı tur olurdu; burada dış temas verildi.",
        options: [
          "12 tur aynı yönde.",
          "6 tur ters yönde.",
          "3 tur saatin tersine.",
          "3 tur aynı yönde.",
          "12 tur ters yönde.",
        ],
        answer: 2,
      },
    ],
  },
  {
    id: "elektriksel-kuvvet-ayt",
    topic: "detail-374",
    title: "Elektriksel kuvvet: işaretli yüklerden vektör toplamına",
    minutes: 120,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 101–103; OGM 11. sınıf Elektriksel Kuvvet ve Elektrik Alan özeti, Dersler Cepte s. 10. Özgün öğretim, şekiller ve sorular; resmî sınav sorusu değildir.",
    objectives: [
      "Noktasal yükler için Coulomb büyüklüğünü yönle birlikte hesapla.",
      "Bir hedef yükteki kuvvetleri aynı koordinat sisteminde topla.",
      "Sıfır net kuvvet, sıfır alan, ortam ve mekanik denge koşullarını ayır.",
    ],
    sections: [
      {
        title: "Noktasal yük modeliyle başla",
        paragraphs: [
          "Durgun iki noktasal yük arasındaki elektrostatik kuvvet büyüklüğü F=k|q1q2|/r² olur. Aynı işaretli yükler iter, zıt işaretliler çeker; kuvvet iki yükü birleştiren doğru üzerindedir. r merkezler arası metre, yükler coulomb, k vakum yaklaşımında 9×10⁹ N·m²/C² olmalıdır.",
          "Gerçek cisimleri noktasal saymak için boyutlarının uzaklığa göre küçük olması gibi koşullar gerekir. Düzgün yüklü küresel dağılımın dış alanı bazı simetrik koşullarda merkezdeki yükle eşdeğer olabilir; yakın iki iletkenin yükleri yeniden dağılıyorsa her birini sabit merkez yükü gibi görmek doğru olmayabilir.",
        ],
      },
      {
        title: "Mikro öneki ve uzaklığın karesi",
        paragraphs: [
          "1 μC=10⁻⁶ C, 1 nC=10⁻⁹ C’dur. İki mikro yük çarpımında 10⁻¹² oluşur. Santimetreyi metreye çevirdikten sonra karesini al; 30 cm=0,30 m ve karesi 0,09 m² olur. Uzaklık iki katken aynı yükler ve ortamda kuvvet dörtte bire iner.",
          "Yüklerden biri işaret değiştirirse büyüklük aynı kalabilir ama çekme/itme yönü değişir. İki yük birden işaret değiştirirse çarpımın işareti değişmez ve aynı yerleşimde karşılıklı kuvvet yönleri aynı kalır. İki yükü de iki kat yapmak kuvveti dört kat yapar; aynı anda uzaklık değişiyorsa oranlar birlikte uygulanır.",
        ],
      },
      {
        title: "Etki–tepki farklı cisimlerdedir",
        paragraphs: [
          "A’nın B’ye elektrik kuvveti, B’nin A’ya kuvvetine eşit büyüklükte ve zıt yönlüdür. Yük miktarları veya kütleleri farklı olsa da bu karşılıklı çiftin büyüklükleri eşittir. Ayrı cisimlerde oldukları için tek cismin serbest cisim şemasında birbirini götüren iki ok değildir.",
          "Kütleleri m ve 2m olan iki serbest yük eşit kuvvet büyüklüğüyle farklı ivme kazanabilir; ivme büyüklükleri ters kütle oranındadır. Yükler uzaklaştıkça kuvvet değişir; onu başlangıç değerinde sabit tutup tüm hareket boyunca sabit ivme formülü kullanmak, ayrıca yakın aralık yaklaşımı verilmeden geçersizdir.",
        ],
      },
      {
        title: "Ortamın etkisini doğru özellik belirler",
        paragraphs: [
          "Homojen, doğrusal bir dielektrikte uygun elektrostatik modelde k=1/(4πε0εr) olur. Aynı serbest yük ve geometri için εr büyüdükçe kuvvet 1/εr oranında azalır. Modelin εr değeri verilmiş malzeme parametresidir; elektriksel yalıtkanlık ya da dirençle aynı nicelik değildir.",
          "“Daha yalıtkan her maddede kuvvet daha küçüktür” sözü iletkenlik ile permitiviteyi karıştırabilir. Katmanlı ortam, iletken sınır, kutuplanma geometrisi veya frekansa bağlı dinamik varsa tek sabit εr ile her konuma aynı basit ölçek uygulanmaz. Bu gezginde ortam homojen, kaynaklar sabit ve durum elektrostatiktir.",
        ],
      },
      {
        title: "Hedef yükü seç, yalnız ona gelenleri çiz",
        paragraphs: [
          "Üç yük varsa hangi yükün net kuvveti sorulduğunu önce işaretle. Diğer her kaynak yükün hedefe uyguladığı kuvveti ayrı hesapla, yönünü çekme/itmeyle belirle, sonra bileşenleri topla. Kaynakların birbirine uyguladığı kuvvetleri hedefin toplamına ayrıca ekleme.",
          "Net kuvvet Fx=ΣFix ve Fy=ΣFiy ile bulunur; büyüklük √(Fx²+Fy²)’dir. İki büyüklüğü doğrudan toplamak yalnız aynı yönlü durumlarda uygundur. Eşit iki kuvvet dikse √2F, zıtsa 0 olur; açı ve işaret aynı sayısal büyüklükten farklı net etkiler üretir.",
        ],
      },
      {
        title: "İşaretli vektör formülü yönü korur",
        paragraphs: [
          "Kaynak ri noktasında qi, hedef r noktasında q ise hedef kuvveti Fi=k q qi(r−ri)/|r−ri|³ olur. Kaynak-hedef farkı hedefe doğru yönlüdür; q qi negatif olduğunda kuvvet kaynağa döner. Büyüklükte r², bileşen formülünde birim yön nedeniyle r³ bulunması çelişki değildir.",
          "Hedef ve kaynak aynı noktaya gelirse noktasal model tekildir; sonsuz bir oku ekrana basmak çözüm değildir. Gezginde en küçük ayrım açık sınırla korunur. Sıfır kaynak yük katkısı sıfırdır; sıfır hedef yükte kuvvet sıfır olabilirken kaynakların o konumdaki alanı varlığını sürdürebilir.",
        ],
      },
      {
        title: "Alan ile hedefe kuvveti ayır",
        paragraphs: [
          "Elektrik alan E, birim pozitif küçük test yüküne düşen kuvvettir ve birimi N/C’dur. Kaynakların oluşturduğu alan hedef yükün işaretinden bağımsız hesaplanır; hedefe kuvvet F=qE olur. Pozitif hedef alan yönünde, negatif hedef ters yönde kuvvet alır.",
          "Hedef q=0 seçildiğinde bu noktasal test modelinde F=0 olur; bundan E=0 sonucu çıkmaz. Gerçek nötr fakat sonlu bir cisim düzgün olmayan alanda kutuplanıp net çekim görebilir; bu ayrıntı, burada tek sabit noktasal net yükle modellenmiyor. Model sınırını gerçek bütün nötr maddelere genelleme.",
        ],
      },
      {
        title: "Sıfır alan nerede olabilir?",
        paragraphs: [
          "Aynı işaretli iki kaynak arasında alanlar zıt yönlüdür ve uygun noktada birbirini götürebilir. Eşit kaynakta orta nokta, farklı büyüklükte küçük yüke daha yakın bir nokta çıkar. Önce yönleri kontrol et, sonra |q1|/r1²=|q2|/r2² büyüklük denkliğini çöz.",
          "Zıt işaretli iki kaynağın arasında alanlar aynı yönde olduğundan sıfır toplam oluşmaz. Büyüklükleri farklıysa dış bölgede küçük yüke yakın tarafta bir sıfır alan noktası olabilir; eşit-zıt çift için sonlu eksen üzerinde böyle bir nokta yoktur. Karesini alarak bulunan her kökün doğru bölgede olduğunu denetle.",
        ],
      },
      {
        title: "Dengeyi alan hesabıyla bitirme",
        paragraphs: [
          "Net elektrik kuvvetinin sıfır olması bütün mekanik kuvvetlerin sıfır olduğu anlamına gelmez. Askıdaki yüke ağırlık, ip gerilmesi ve elektrik kuvveti birlikte etki edebilir. Yatay elektrik kuvveti verilen tek kürede dengede T sinθ=Fe, T cosθ=mg, dolayısıyla tanθ=Fe/(mg) olur.",
          "İki asılı kürenin aynı yükseklikte olması gibi koşullar elektrik kuvvetini yatay yapabilir. Genel geometride elektrik kuvvetinin düşey bileşeni de vardır. Hatta yatay kuvvetli karşılaştırmada açının kendisi değil tanθ kütleyle ters orantılıdır; büyük kütle daha küçük açı verebilir ama açıları doğrudan ters oranlama.",
        ],
      },
      {
        title: "Simetriyi geometriyle sınırla",
        paragraphs: [
          "İki eşit kaynak simetrik yerleştiğinde hedef simetri eksenindeyse bazı bileşenler birbirini götürür, diğerleri toplanır. Hedefi eksenden kaydırmak veya bir kaynağın işaretini çevirmek bu iptali değiştirebilir. “İki eşit yük var” ifadesi tek başına net kuvvetin sıfır olduğuna yetmez.",
          "Gezginde sol ve sağ kaynaklar sabittir, hedefin yüksekliği ile üç yükün işareti değişebilir. Her katkı ve toplam aynı kuvvet ölçeğiyle çizilir. Alan ve kuvvet sonuçları ayrı HTML değerlerle de verilir; renk tek başına kaynak kimliğinin veya yük işaretinin yerine geçmez.",
        ],
      },
      {
        title: "Kuvvet oranıyla ivme oranı farklı sorulardır",
        paragraphs: [
          "Karşılıklı elektrik kuvvet büyüklükleri eşitken a=F/m nedeniyle ivmeler farklı olabilir. İvmeler uzaklık değiştikçe birlikte azalabilir; azalan ivme, kuvvet hâlâ hız yönündeyse süratin azalmasını zorunlu kılmaz. Başlangıç durumu ve hız yönü ayrıca gerekir.",
          "Yükler sabitlenmişse elektrik kuvveti dayanakla dengelenir; cisimler mutlaka hareket etmez. Gezgindeki sabit kaynak yerleşimi de böyledir: düğmeyle kaynak konumu seçmek gerçek serbest parçacık dinamiği simülasyonu değildir. İşaretli kuvvet hesabıyla hareket yörüngesi iddiasını ayır.",
        ],
      },
      {
        title: "Sonucu birim, yön ve sınırla doğrula",
        paragraphs: [
          "Hesap sonunda N·m²/C² ile C²/m² sadeleşip newton kalmalıdır. Kaynak işareti değişince ilgili katkının yönü dönmeli, εr iki katken bütün kuvvetler yarıya inmeli, hedef yük sıfırken kuvvet sıfırlanıp alan korunmalıdır. Bu üç kontrol eksik kareyi veya yanlış eksi işaretini yakalar.",
          "Önce bir bileşenin sıfır olup olmayacağını tahmin et, sonra vektör toplamını gerekçenle karşılaştır. Farklı kaynakların aynı hedef üzerindeki kuvvetlerini toplamakla etki–tepkiyi toplamak arasındaki ayrımı açıkça söyle. Keşif, kayıt ve zaman XP sağlamaz; bağımsız yeni soruda doğru hedef, işaret ve koşul seçimi öğrenme kanıtıdır.",
        ],
      },
    ],
    examples: [
      {
        title: "Mikro yük, metre uzaklık",
        prompt:
          "Vakumda +2 μC ve −3 μC noktasal yükler 0,30 m uzakta. k=9×10⁹. Kuvvetin büyüklüğü ve türü?",
        strategy: "Önce yük ve uzaklığı SI’ye çevir.",
        steps: [
          {
            label: "Dönüşüm",
            expression: "|q1q2|=6×10⁻¹² C²; r²=0,09 m²",
            explanation: "Mikro iki kez çarpılır.",
          },
          {
            label: "Büyüklük",
            expression: "F=9×10⁹·6×10⁻¹²/0,09=0,60 N",
            explanation: "Kare yalnız uzaklığa uygulanır.",
          },
          {
            label: "Yön",
            expression: "Zıt işaretler birbirini çeker.",
            explanation: "Her yük diğerine doğru eşit büyüklükte kuvvet alır.",
          },
        ],
        answer: "0,60 N; çekme",
        check: "Aynı geometride εr=3 olsaydı 0,20 N.",
        pitfall: "30 cm’yi 30 m almak.",
      },
      {
        title: "İki dik katkı",
        prompt:
          "Hedef +1 μC (0; 0) m’de. Kaynak +1 μC (−1; 0), kaynak −1 μC (0; 1) m’de. k=9×10⁹. Hedefte net kuvvet?",
        strategy: "Her kaynağın hedef üzerindeki yönünü ayrı belirle.",
        steps: [
          {
            label: "Sol kaynak",
            expression: "F1=(+0,009;0) N",
            explanation: "Pozitif kaynak pozitif hedefi sağa iter.",
          },
          {
            label: "Üst kaynak",
            expression: "F2=(0;+0,009) N",
            explanation: "Negatif kaynak hedefi yukarı çeker.",
          },
          {
            label: "Toplam",
            expression: "F=(0,009;0,009) N;|F|=0,009√2≈0,01273 N",
            explanation: "Yön sağ-yukarı 45°.",
          },
        ],
        answer: "(0,009;0,009) N; yaklaşık 0,01273 N",
        check: "Dik katkılar büyüklükte Pisagorla toplanır.",
        pitfall: "İki büyüklüğü 0,018 N diye toplamak.",
      },
      {
        title: "Eşit olmayan kaynakta sıfır nokta",
        prompt:
          "Aynı doğru üzerinde +4 μC x=0, +1 μC x=3 m’de sabit. İki yük arasındaki sıfır alan noktası?",
        strategy: "Önce arada zıt alan yönlerini doğrula.",
        steps: [
          {
            label: "Büyüklükler",
            expression: "4/x²=1/(3−x)²;0<x<3",
            explanation: "Ortak k ve mikro çarpanı sadeleşir.",
          },
          {
            label: "Kök",
            expression: "2/x=1/(3−x) → x=2 m",
            explanation: "Pozitif uzaklıklarla karekök alındı.",
          },
          {
            label: "Kontrol",
            expression: "4/4=1/1",
            explanation: "Nokta küçük kaynağa 1 m, büyüğe 2 m uzakta.",
          },
        ],
        answer: "x=2 m",
        check: "Yönler arada zıt, büyüklükler eşit.",
        pitfall:
          "Yönleri sınamadan zıt işaretli kaynaklara aynı ara kökü uygulamak.",
      },
      {
        title: "Küreyi ip taşıyor",
        prompt:
          "Dengede duran 0,20 kg yüklü küreye yatay 1,5 N elektrik kuvveti etki ediyor. g=10 m/s². İp gerilmesi ve düşeyle açının tanjantı?",
        strategy: "Düşey ve yatay dengeyi ayrı kur.",
        steps: [
          {
            label: "Ağırlık",
            expression: "mg=2 N",
            explanation: "Elektrik kuvveti kökte yatay verildi.",
          },
          {
            label: "Gerilme",
            expression: "T=√(2²+1,5²)=2,5 N",
            explanation: "İp iki dik kuvvetin bileşkesini dengeler.",
          },
          {
            label: "Açı",
            expression: "tanθ=1,5/2=0,75",
            explanation: "Açı tanjantın ters fonksiyonuyla bulunabilir.",
          },
        ],
        answer: "2,5 N; tanθ=0,75",
        check: "sinθ=0,6,cosθ=0,8 gerilmeyle aynı bileşenleri verir.",
        pitfall: "Açının kendisini doğrudan 0,75 radyan sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Coulomb büyüklüğünde yük işaretini nasıl kullanırsın?",
        answer: "Mutlak çarpımla büyüklük, işaretlerle çekme/itme yönü.",
      },
      {
        prompt: "Kaynak sabitken hedef yük sıfırsa E de sıfır mı?",
        answer: "Hayır; F=qE sıfır olabilir, kaynak alanı kalabilir.",
      },
      {
        prompt: "Etki–tepki tek hedef toplamında birbirini götürür mü?",
        answer: "Hayır; karşılıklı kuvvetler farklı cisimlerdedir.",
      },
      {
        prompt: "Askıda yatay Fe için kütleyle ters orantılı olan?",
        answer: "tanθ=Fe/(mg); açının kendisi genel olarak değil.",
      },
    ],
    items: [
      {
        prompt:
          "Vakumda +2 μC ve −3 μC yükler 0,30 m uzakta. k=9×10⁹ N·m²/C². Kuvvet?",
        hint: "F=k|q1q2|/r².",
        explanation: "9×10⁹·6×10⁻¹²/0,09=0,60 N. Zıt işaret çekme verir.",
        options: [
          "0,60 N itme",
          "6 N çekme",
          "0,60 N çekme",
          "0,06 N çekme",
          "0,20 N itme",
        ],
        answer: 2,
      },
      {
        prompt:
          "Noktasal yükler ve ortam sabitken uzaklık r’den 3r’ye çıkarılıyor. Yeni kuvvet büyüklüğünün eskiye oranı?",
        hint: "Ters kare bağı.",
        explanation:
          "F_yeni/F_eski=r²/(3r)²=1/9. Yük işaretleri değişmediği için çekme/itme türü değişmez.",
        options: ["1/9", "1/3", "3", "9", "1"],
        answer: 0,
      },
      {
        prompt:
          "Aynı noktasal serbest yükler ve geometri, vakumdan homojen doğrusal εr=4 ortamına geçiyor. Bu modelde kuvvet oranı?",
        hint: "k ortamda k0/εr.",
        explanation:
          "F=F0/4. Bu verilen permitivite modelidir; yalnız elektriksel direnç bilgisinden bu oran çıkarılamaz.",
        options: ["4", "1/16", "1", "16", "1/4"],
        answer: 4,
      },
      {
        prompt:
          "Hedef +1 μC (0; 0); kaynak +1 μC (−1; 0), kaynak −1 μC (0; 1) m’de. k=9×10⁹. Hedefte net kuvvet bileşenleri N cinsinden?",
        hint: "Sol pozitif iter, üst negatif çeker.",
        explanation:
          "Her katkı 0,009 N. Sol kaynak sağa, üst kaynak yukarı kuvvet verir; kaynaklar arası kuvvet hedef toplamına eklenmez.",
        options: [
          "(−0,009;+0,009)",
          "(+0,009;+0,009)",
          "(+0,009;−0,009)",
          "(0;+0,018)",
          "(0;0)",
        ],
        answer: 1,
      },
      {
        prompt:
          "+4 μC x=0, +1 μC x=3 m’de. Kaynaklar sabit. Aradaki sıfır elektrik alan noktası?",
        hint: "4/x²=1/(3−x)² ve 0<x<3.",
        explanation:
          "2(3−x)=x → x=2 m. Küçük yükün alanı ancak ona daha yakın bir noktada büyük kaynağı dengeleyebilir.",
        options: ["x=1 m", "x=1,5 m", "x=0 m", "x=2 m", "x=3 m"],
        answer: 3,
      },
      {
        prompt:
          "İki zıt işaretli noktasal kaynağın tam arasında, ikisini birleştiren doğru üzerindeki bir noktada alanların yönü nasıldır?",
        hint: "Alan pozitiften dışarı, negatife doğrudur.",
        explanation:
          "Aradaki bir noktada iki yön de pozitif kaynaktan negatif kaynağa doğrudur. Sıfır nokta ararken yalnız büyüklük eşitlemek yeterli değildir.",
        options: [
          "Mutlaka zıttır ve orta noktada sıfırdır.",
          "Her iki kaynak alanı sıfırdır.",
          "Alan yönü hedefin kütlesine bağlıdır.",
          "Yalnız büyük kaynağın alanı vardır.",
          "Aynı yöndedir; arada birbirini sıfırlamaz.",
        ],
        answer: 4,
      },
      {
        prompt:
          "Birbirini etkileyen iki noktasal yükün kütleleri m ve 2m; başka kuvvet yok. Aynı andaki karşılıklı kuvvet ve ivme büyüklük oranları F1/F2 ve a1/a2?",
        hint: "Etki–tepki eşit, a=F/m.",
        explanation:
          "Kuvvetler eşit büyüklükte; küçük kütlenin ivmesi iki kat. Kuvvetin eşitliği ivmelerin eşitliğini gerektirmez.",
        options: ["2;1", "1;1", "2;2", "1;2", "1/2;2"],
        answer: 3,
      },
      {
        prompt:
          "0,20 kg küre dengede. Yatay elektrik kuvveti 1,5 N, g=10 m/s². İp gerilmesi?",
        hint: "Dik 2 N ve 1,5 N bileşenlerin bileşkesi.",
        explanation:
          "T=√(2²+1,5²)=2,5 N. Yatay ve düşey kuvvet büyüklüklerini doğrudan toplama.",
        options: ["2,5 N", "3,5 N", "2 N", "1,5 N", "0,5 N"],
        answer: 0,
      },
      {
        prompt:
          "Sabit kaynaklar hedef konumunda E=(200; 0) N/C alanı oluşturuyor. Noktasal hedefin net yükü 0 C seçiliyor. Bu modelin F ve E sonucu?",
        hint: "F=qE ile kaynağın alanını ayır.",
        explanation:
          "Sıfır hedef yük bu noktasal modelde kuvvet almaz; kaynak alanı hedef yükü sıfırlamakla yok olmaz. Sonlu nötr cismin kutuplanması ayrı modeldir.",
        options: [
          "F=0 N;E=0.",
          "F=200 N;E=0.",
          "F=0 N;E=(200; 0) N/C.",
          "F=200 N;E=(200; 0).",
          "Alan tanımsız olmak zorunda.",
        ],
        answer: 2,
      },
      {
        prompt:
          "Kaynaklar ve hedef yerleri sabit. Bütün üç yükün işareti aynı anda ters çevriliyor; ortam aynı. Hedefte net elektrik kuvveti nasıl değişir?",
        hint: "Her hedef-kaynak çarpımında iki eksi bulunur.",
        explanation:
          "Her q_hedef q_kaynak çarpımı aynı kalır; kuvvet katkıları ve toplam değişmez. Kaynak alanı tersine döner ama hedefin işareti de ters döndüğünden F aynı olur.",
        options: [
          "Kesin tersine döner.",
          "Aynı kalır.",
          "İki katına çıkar.",
          "Sıfır olur.",
          "Dört katına çıkar.",
        ],
        answer: 1,
      },
    ],
  },
];

export const forge018PhysicsTopics: Record<string, string> = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const forge018PhysicsGuides: LessonGuide[] = packs.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  source: p.source,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
}));
export const forge018PhysicsLessons: Lesson[] = packs.map((p) => ({
  id: p.id,
  subjectId: "ayt-fizik",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  source: txt(p.source),
  tags: [p.topic, "Özgün öğretim soruları"],
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: p.items.map((q, i) => ({
    id: `f018-${p.id}-${i + 1}`,
    skill: p.id,
    prompt: txt(q.prompt),
    options: q.options.map(txt),
    answer: q.answer,
    hint: txt(q.hint),
    explanation: txt(q.explanation),
  })),
}));
