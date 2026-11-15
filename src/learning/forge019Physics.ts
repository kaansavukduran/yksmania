import { txt, type Lesson } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

const range019 = (v: number, lo: number, hi: number) =>
  Number.isFinite(v) && v >= lo && v <= hi;
const nz019 = (v: number) => (Object.is(v, -0) ? 0 : v);
export const coulombConstant019 = 9e9;
export const epsilonZero019 = 8.85e-12;
export const muZero019 = 4 * Math.PI * 1e-7;
export type Point019 = { x: number; y: number };
export type Charge019 = Point019 & { micro: number };
const point019 = (p: Point019) =>
  p && range019(p.x, -10, 10) && range019(p.y, -10, 10);
const charge019 = (p: Charge019) => point019(p) && range019(p.micro, -10, 10);

/** Fixed source, two prescribed separations; zero energy at infinite separation. Work of E is -deltaU. */
export function pairEnergy019(
  sourceMicro: number,
  testMicro: number,
  initialR: number,
  currentR: number,
) {
  if (
    !range019(sourceMicro, -10, 10) ||
    !range019(testMicro, -10, 10) ||
    !range019(initialR, 0.05, 10) ||
    !range019(currentR, 0.05, 10)
  )
    throw new RangeError("PAIR_ENERGY019_SCOPE");
  const coefficient = coulombConstant019 * sourceMicro * testMicro * 1e-12;
  const initialU = coefficient / initialR,
    currentU = coefficient / currentR,
    deltaU = coefficient * (1 / currentR - 1 / initialR);
  return {
    sourceMicro,
    testMicro,
    initialR,
    currentR,
    coefficient,
    initialU,
    currentU,
    deltaU: nz019(deltaU),
    electricWork: nz019(-deltaU),
    externalQuasistaticWork: nz019(deltaU),
    radialForce: coefficient / currentR ** 2,
  };
}
/** Every unordered charge pair occurs exactly once; source supports are external to this fixed configuration. */
export function systemEnergy019(charges: Charge019[]) {
  if (
    !Array.isArray(charges) ||
    charges.length > 8 ||
    charges.some((q) => !charge019(q))
  )
    throw new RangeError("SYSTEM_ENERGY019_SCOPE");
  const pairs: {
    first: number;
    second: number;
    distance: number;
    energy: number;
  }[] = [];
  for (let i = 0; i < charges.length; i++)
    for (let j = i + 1; j < charges.length; j++) {
      const distance = Math.hypot(
        charges[i].x - charges[j].x,
        charges[i].y - charges[j].y,
      );
      if (distance < 0.05) throw new RangeError("SYSTEM_ENERGY019_COINCIDENT");
      pairs.push({
        first: i,
        second: j,
        distance,
        energy:
          (coulombConstant019 * charges[i].micro * charges[j].micro * 1e-12) /
          distance,
      });
    }
  return { pairs, energy: nz019(pairs.reduce((sum, p) => sum + p.energy, 0)) };
}

/** Electrostatic point sources in vacuum; the probe does not alter the source configuration. */
export function potential019(
  sources: Charge019[],
  point: Point019,
  probeMicro = 1,
) {
  if (
    !Array.isArray(sources) ||
    sources.length > 8 ||
    sources.some((q) => !charge019(q)) ||
    !point019(point) ||
    !range019(probeMicro, -10, 10)
  )
    throw new RangeError("POTENTIAL019_SCOPE");
  const contributions = sources.map((source) => {
    const dx = point.x - source.x,
      dy = point.y - source.y,
      distance = Math.hypot(dx, dy);
    if (distance < 0.05) throw new RangeError("POTENTIAL019_COINCIDENT");
    const coefficient = coulombConstant019 * source.micro * 1e-6;
    return {
      source,
      distance,
      potential: coefficient / distance,
      field: {
        x: nz019((coefficient * dx) / distance ** 3),
        y: nz019((coefficient * dy) / distance ** 3),
      },
    };
  });
  const potential = nz019(contributions.reduce((n, c) => n + c.potential, 0)),
    field = contributions.reduce(
      (v, c) => ({ x: v.x + c.field.x, y: v.y + c.field.y }),
      { x: 0, y: 0 },
    );
  return {
    sources,
    point,
    probeMicro,
    contributions,
    potential,
    field,
    fieldMagnitude: Math.hypot(field.x, field.y),
    probeEnergy: probeMicro * 1e-6 * potential,
  };
}

function positiveRoots019(a: number, b: number, c: number) {
  if (a === 0)
    return b === 0 ? [] : [-c / b].filter((t) => t > 0 && Number.isFinite(t));
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return [];
  const root = Math.sqrt(discriminant),
    q = -0.5 * (b + (b >= 0 ? root : -root));
  if (q === 0) return [];
  return [q / a, c / q].filter((t) => t > 0 && Number.isFinite(t));
}
export type PlateInput019 = {
  gap: number;
  length: number;
  voltage: number;
  mass: number;
  micro: number;
  vx: number;
  vy: number;
  gravity: number;
  progress: number;
};
/** Starts at x=0,y=0 midway between y=+-gap/2. Bottom V=voltage, top V=0. First plate/exit terminates the flight. */
export function plates019(input: PlateInput019) {
  const { gap, length, voltage, mass, micro, vx, vy, gravity, progress } =
    input;
  if (
    !range019(gap, 0.01, 1) ||
    !range019(length, 0.1, 5) ||
    !range019(voltage, -1000, 1000) ||
    !range019(mass, 0.0001, 1) ||
    !range019(micro, -10, 10) ||
    !range019(vx, 0.1, 20) ||
    !range019(vy, -20, 20) ||
    !range019(gravity, 0, 10) ||
    !range019(progress, 0, 1)
  )
    throw new RangeError("PLATES019_SCOPE");
  const field = voltage / gap,
    charge = micro * 1e-6,
    electricForce = charge * field,
    weight = mass * gravity,
    ay = electricForce / mass - gravity;
  const topTime = Math.min(
      Infinity,
      ...positiveRoots019(0.5 * ay, vy, -gap / 2),
    ),
    bottomTime = Math.min(Infinity, ...positiveRoots019(0.5 * ay, vy, gap / 2)),
    exitTime = length / vx;
  const duration = Math.min(topTime, bottomTime, exitTime),
    time = duration * progress,
    x = vx * time,
    y = vy * time + 0.5 * ay * time * time,
    velocityY = vy + ay * time;
  const kind =
    duration === exitTime
      ? duration === topTime
        ? "Üst köşe"
        : duration === bottomTime
          ? "Alt köşe"
          : "Çıkış"
      : duration === topTime
        ? "Üst levha"
        : "Alt levha";
  const initialK = (mass * (vx * vx + vy * vy)) / 2,
    kinetic = (mass * (vx * vx + velocityY * velocityY)) / 2,
    deltaV = -field * y,
    deltaU = charge * deltaV,
    electricWork = -deltaU,
    gravityWork = -weight * y;
  return {
    ...input,
    field,
    charge,
    electricForce,
    weight,
    ay,
    duration,
    time,
    x,
    y,
    velocityY,
    vx,
    kind,
    topTime: Number.isFinite(topTime) ? topTime : null,
    bottomTime: Number.isFinite(bottomTime) ? bottomTime : null,
    exitTime,
    initialPotential: voltage / 2,
    potential: voltage / 2 + deltaV,
    deltaV,
    deltaU,
    electricWork,
    gravityWork,
    initialK,
    kinetic,
    deltaK: kinetic - initialK,
  };
}

export type CapacitorControl019 =
  { kind: "connected"; voltage: number } | { kind: "isolated"; charge: number };
/** Ideal linear dielectric completely fills a parallel capacitor; fringing, leakage and breakdown are excluded. */
export function capacitor019(
  area: number,
  gap: number,
  relativePermittivity: number,
  control: CapacitorControl019,
) {
  if (
    !range019(area, 0.001, 0.04) ||
    !range019(gap, 0.001, 0.01) ||
    !range019(relativePermittivity, 1, 5) ||
    !control ||
    !["connected", "isolated"].includes(control.kind) ||
    (control.kind === "connected" && !range019(control.voltage, 0, 1000)) ||
    (control.kind === "isolated" && !range019(control.charge, 0, 0.00001))
  )
    throw new RangeError("CAPACITOR019_SCOPE");
  const capacitance = (epsilonZero019 * relativePermittivity * area) / gap;
  const voltage =
      control.kind === "connected"
        ? control.voltage
        : control.charge / capacitance,
    charge =
      control.kind === "isolated" ? control.charge : capacitance * voltage;
  return {
    area,
    gap,
    relativePermittivity,
    kind: control.kind,
    capacitance,
    voltage,
    charge,
    field: voltage / gap,
    energy: (charge * voltage) / 2,
    plateCharges: [charge, -charge],
  };
}

export type Wire019 = Point019 & { current: number };
/** Infinite straight vacuum wires parallel to +z; positive current is out of the page. */
export function wireField019(wires: Wire019[], point: Point019) {
  if (
    !Array.isArray(wires) ||
    wires.length > 8 ||
    wires.some((w) => !point019(w) || !range019(w.current, -20, 20)) ||
    !point019(point)
  )
    throw new RangeError("WIRE_FIELD019_SCOPE");
  const contributions = wires.map((wire) => {
    const dx = point.x - wire.x,
      dy = point.y - wire.y,
      r = Math.hypot(dx, dy);
    if (r < 0.01) throw new RangeError("WIRE_FIELD019_AXIS");
    const factor = (2e-7 * wire.current) / r ** 2;
    return {
      wire,
      distance: r,
      field: { x: nz019(-factor * dy), y: nz019(factor * dx) },
    };
  });
  const field = contributions.reduce(
    (v, c) => ({ x: v.x + c.field.x, y: v.y + c.field.y }),
    { x: 0, y: 0 },
  );
  return {
    wires,
    point,
    contributions,
    field,
    magnitude: Math.hypot(field.x, field.y),
  };
}
/** Centre of N identical circular arcs; radial leads contribute zero, remote closure neglected. */
export function loopField019(
  current: number,
  radius: number,
  turns: number,
  degrees = 360,
) {
  if (
    !range019(current, -20, 20) ||
    !range019(radius, 0.01, 5) ||
    !range019(turns, 1, 1000) ||
    !Number.isInteger(turns) ||
    !range019(degrees, 0, 360)
  )
    throw new RangeError("LOOP_FIELD019_SCOPE");
  return {
    current,
    radius,
    turns,
    degrees,
    fieldZ: (((muZero019 * turns * current) / (2 * radius)) * degrees) / 360,
  };
}
/** Interior axis of a long, closely wound air-core solenoid, sufficiently far from its ends. */
export function solenoidField019(
  current: number,
  turns: number,
  length: number,
) {
  if (
    !range019(current, -20, 20) ||
    !range019(turns, 1, 5000) ||
    !Number.isInteger(turns) ||
    !range019(length, 0.05, 10)
  )
    throw new RangeError("SOLENOID_FIELD019_SCOPE");
  return {
    current,
    turns,
    length,
    density: turns / length,
    field: ((muZero019 * turns) / length) * current,
  };
}

const packs = [
  {
    "id": "elektriksel-potansiyel-enerji",
    "topic": "detail-376",
    "title": "Elektriksel potansiyel enerji: yükleri yerleştirmenin bedeli",
    "minutes": 115,
    "source": "MEBİ AYT Fizik Konu Özetleri, basılı s. 105–109; OGM 11. sınıf Elektriksel Potansiyel özeti ve Dersler Cepte s. 12–14. Elektrik kuvveti işi ile dış işi ayrılmış özgün öğretim ve sorular; resmî sınav sorusu değildir.",
    "objectives": [
      "Elektriksel potansiyel enerjiyi iki yükün ortak düzeniyle ilişkilendir.",
      "İşaretli ΔU, elektrik kuvvetinin işi ve dış işi ayrı hesapla.",
      "Birden çok yükün çiftlerini ve enerjiyle sürat hesabını adım adım kur."
    ],
    "sections": [
      {
        "title": "İki yükü yerleştirmek bir enerji olayıdır",
        "paragraphs": [
          "Aynı işaretli iki yükü birbirine yaklaştırırken itmeye karşı dışarıdan iş yaparsın. Serbest bırakırsan yükler birbirinden uzaklaşıp hız kazanabilir. Yayın sıkıştırılmasında olduğu gibi, düzenleme sırasında yapılan iş sistemin daha sonra kinetiğe aktarabileceği bir enerji değişimiyle ilişkilidir. Bu enerji yalnız bir taneciğin özelliği değil yüklerin birlikte oluşturduğu konfigürasyonun özelliğidir.",
          "Kaynak yükü sabit tutulan basit modelde hareket eden yükle kaynağı birlikte düşün; desteğin kaynak üzerinde yaptığı iş, kaynak yer değiştirmediği için sıfır olabilir. Bütün yükler hareket ediyorsa toplam kinetik enerjiye hepsi katılır. Önce sistemin hangi parçalardan oluştuğunu ve hangi dış işlerin bulunduğunu adlandırmak enerji bilançosunun ilk adımıdır."
        ]
      },
      {
        "title": "Sıfırı sonsuzda seç, formülü birimle oku",
        "paragraphs": [
          "İki noktasal yük için sonsuz ayrımda U=0 seçildiğinde U=k q1 q2/r olur. r pozitif merkezler arası uzaklık, yükler işaretli coulomb, k vakum yaklaşımında 9×10⁹ N·m²/C² alınır. Sonuç joule’dür. İki mikro yük çarpımında 10⁻¹² oluştuğundan birim dönüşümü formüle girmeden yapılır.",
          "Örneğin +2 μC ile +3 μC, 0,30 m uzakta iken U=(9×10⁹)(6×10⁻¹²)/0,30=0,18 J bulunur. Aynı yüklerden birini negatif yapınca sonuç −0,18 J olur. Eksi işaret enerji yokluğu değil seçilmiş sonsuz referansına göre bağlanmış düzenin daha düşük enerji değeridir; enerji farkı fiziksel iş hesabına girer."
        ]
      },
      {
        "title": "İşaret ve uzaklık birlikte ne anlatır?",
        "paragraphs": [
          "q1q2 pozitifse U pozitiftir ve r küçüldükçe büyür. Aynı işaretli yükleri uzaklaştırmak U’yu azaltır; elektrik kuvveti bu harekette pozitif iş yapabilir. q1q2 negatifse U negatiftir; birbirini çeken yükleri yaklaştırmak enerjiyi daha negatif yapar, uzaklaştırmak ise U’yu sıfıra doğru artırır.",
          "Bu ilişkileri bir sayı doğrusu üzerinde düşün: −0,10 J, −0,20 J’den büyüktür. “Mutlak değer azaldı, enerji azaldı” diyerek negatif enerji sırasını ters çevirme. Kuvvetin çekici/itici olmasıyla U’nun işareti bu iki yük ve sonsuz sıfırı modeli içinde ilişkilidir; çoklu sistemde toplam U’nun işareti tek hedefteki bütün kuvvetleri belirlemez."
        ]
      },
      {
        "title": "İki konum arasında son eksi ilk",
        "paragraphs": [
          "Hareketin enerji değişimi ΔU=Uson−Uilk olarak bulunur. Kaynak ve yük değişmiyorsa ΔU=k q1q2(1/rson−1/rilk) yazılabilir. Aynı işaretli yüklerde 0,30 m’den 0,60 m’ye geçiş için 0,09−0,18=−0,09 J çıkar. İlk enerji ile değişimi aynı başlık altında toplamak yerine ikisini ayrı yaz.",
          "Bir yörüngenin ayrıntısı elektrostatik potansiyel enerji farkını değiştirmez; başlangıç ve son konum yeterlidir. Bunun nedeni elektrostatik kuvvetin korunumlu olmasıdır. Taşınma boyunca başka kuvvetler de iş yapabilir; yol bağımsız olan elektriksel katkı ile sürtünme gibi yol bağımlı başka katkıları birbirinden ayır."
        ]
      },
      {
        "title": "Elektrik kuvvetinin işi enerjinin ters değişimidir",
        "paragraphs": [
          "Elektrik kuvvetinin yaptığı iş We=−ΔU olur. Aynı işaretli iki yük uzaklaşırken kuvvet hareket yönündedir, We pozitif ve U azalır. Zıt işaretli yükü çekime karşı uzaklaştırırken elektrik kuvveti harekete karşıdır, We negatif ve U artar. Formüldeki eksi bu fiziksel yön karşılaştırmasını taşır.",
          "Kaynakta bazen “elektriksel iş” diye yazılan qΔV ifadesi, dışarıdan yavaş taşımada gereken işle karışabilir. Burada adları açık kullanıyoruz: elektrik kuvvetinin işi −ΔU, potansiyel enerji değişimi ΔU’dur. Formül ezberini hareket yönünde kuvvet varsa pozitif iş beklentisiyle denetleyebilirsin."
        ]
      },
      {
        "title": "Dış iş hangi koşulda ΔU’ya eşittir?",
        "paragraphs": [
          "Tanecik yavaş taşınıp ilk ve son kinetik enerjileri aynıysa ve yalnız elektrik kuvvetiyle seçili dış kuvvet iş yapıyorsa Wdış=ΔU olur. Genel iş–enerji bilançosu Wdış+We=ΔK, dolayısıyla Wdış=ΔK+ΔU’dur. Dış kuvvetin işi negatif de olabilir; örneğin kendi kendine uzaklaşmaya çalışan yükü yavaşça tutarak enerji alabilirsin.",
          "Yer çekimi veya başka kuvvetler önemseniyorsa onların işleri de eklenir. Bir yükün son konumunun bilinmesi dış işi her durumda kesinleştirmez; son sürat veya diğer enerji alışverişleri gerekebilir. Çözümlü sorularda “yavaş taşıma”, “yalnız elektriksel kuvvet” veya “başlangıçta durgun” koşulları bu yüzden açık verilir."
        ]
      },
      {
        "title": "Kuvvet eğrisiyle enerji eğrisi farklıdır",
        "paragraphs": [
          "İki sabit yükte radyal kuvvet F_r=kq1q2/r², enerji U=kq1q2/r biçimindedir. Bir aralıktaki kuvvet–konum alanı elektrik kuvvetinin işini verir; başlangıçtaki ya da sondaki tek kuvveti bütün yol uzunluğuyla çarpmak genel olarak doğru değildir. Kuvvet uzaklıkla değişir.",
          "Enerji grafiğinin eğimiyle kuvvet arasında F_r=−dU/dr bağı vardır. Türev hesabı kullanmadan da pozitif U eğrisinin uzaklaşırken aşağı indiğini ve itme kuvvetinin dışa yöneldiğini okuyabilirsin. Keşifte boyalı alan sayısal çizim yaklaşımıdır; sonuç satırı analitik enerji farkından hesaplanır ve yaklaşık alanı kesin ölçüm diye sunmaz."
        ]
      },
      {
        "title": "Üç yükte her çifti bir kez say",
        "paragraphs": [
          "Üç noktasal yükün toplam elektrostatik enerjisi U12+U13+U23 olur. Her çift için kendi işaretli yük çarpımı ve kendi uzaklığı kullanılır. Dördüncü yükte altı farklı çift vardır; sıralı i, j toplamında aynı çifti iki kez saymak toplamı yanlışlıkla iki kat yapar.",
          "Bir yükü sabit diğerlerinin yanına getirmenin enerji değişimi, yalnız o yükün diğerleriyle kurduğu yeni çiftlerin toplamıdır. Diğer iki sabit kaynak arasındaki enerji başlangıçta da sonda da varsa farkta silinir. Toplam sistem enerjisi sorusuyla sonradan getirilen yükün enerji katkısı sorusunu ayırmak hesap yükünü azaltır."
        ]
      },
      {
        "title": "Potansiyel enerjiden sürate geç",
        "paragraphs": [
          "Yalnız elektrik kuvveti iş yapıyorsa ΔK=−ΔU ve K+U sabittir. Başlangıçta durgun pozitif test yükü, sabit pozitif kaynaktan uzaklaşırken U azalır ve kazandığı kinetikten v=√(2K/m) bulunabilir. İşaretli enerji hesabının sonunda sürat karekökünün içi negatif çıkmamalıdır.",
          "Kaynağa doğru hareket eden aynı işaretli bir yük önce yavaşlayıp geri dönebilir; başlangıç kinetiği ulaşabileceği en küçük r’yi sınırlar. Zıt işaretli taneciğin çekimde hızlanması da aynı enerji bilançosuyla anlaşılır. Bu bölüm noktasal kaynakla elektrostatik, göreli olmayan modeli kullanır; kaynağa çarpışma veya çok yüksek süratte yeni fizik gerekir."
        ]
      },
      {
        "title": "Enerjiyi üç kontrolle bitir",
        "paragraphs": [
          "Çözümünü birim, yön ve enerji bilançosuyla denetle. k q1q2/r birimi J olmalı; kuvvet hareket yönündeyse elektrik işi pozitif olmalı; hesaplanan K+U değişimi varsa bunun dış işini gösterebilmelisin. Negatif U ile negatif kinetik enerjiyi karıştırma: K her zaman negatif olmayan büyüklüktür.",
          "Keşifte önce aynı yük işaretleriyle uzaklığı değiştir, sonra yalnız test yükünün işaretini çevir. U,ΔU ve We’nin hangilerinin döndüğünü önceden tahmin et. Gerekçeyi modeldeki iki konumla karşılaştırmak bir alıştırmadır; gezgini açmak veya zamanı geçirmek XP ya da bağımsız doğru cevap oluşturmaz."
        ]
      }
    ],
    "examples": [
      {
        "title": "Aynı işaretli yükleri uzaklaştır",
        "prompt": "Sabit +2 μC kaynak ile +3 μC yük, 0,30 m’den 0,60 m’ye yavaş taşınıyor. k=9×10⁹. ΔU, We ve Wdış?",
        "strategy": "Başlangıç ve son enerji, ardından iki farklı iş.",
        "steps": [
          {
            "label": "Enerjiler",
            "expression": "Uilk=0,18 J; Uson=0,09 J",
            "explanation": "Sonsuz ayrımda U = 0 seçilir."
          },
          {
            "label": "Değişim",
            "expression": "ΔU=0,09−0,18=−0,09 J",
            "explanation": "Son eksi ilk."
          },
          {
            "label": "İşler",
            "expression": "We=+0,09 J; Wdış=−0,09 J",
            "explanation": "Yavaş taşımada ΔK = 0; dış kuvvet enerji alır."
          }
        ],
        "answer": "ΔU=−0,09 J; We=+0,09 J; Wdış=−0,09 J",
        "check": "We+Wdış=0=ΔK.",
        "pitfall": "İki işin adını ayırmadan ikisine de ΔU yazmak."
      },
      {
        "title": "Zıt işaretli yükte artan enerji",
        "prompt": "Sabit +2 μC kaynak yanında −3 μC yük 0,30 m’den 0,60 m’ye yavaş götürülüyor. k=9×10⁹. Enerji ve dış iş?",
        "strategy": "Negatif enerji değerlerini sayı doğrusunda sırala.",
        "steps": [
          {
            "label": "İlk/son",
            "expression": "Uilk=−0,18 J; Uson=−0,09 J",
            "explanation": "Zıt işaretler negatif çarpım verir."
          },
          {
            "label": "Fark",
            "expression": "ΔU=−0,09−(−0,18)=+0,09 J",
            "explanation": "Daha az negatif değer daha yüksektir."
          },
          {
            "label": "Dış iş",
            "expression": "Wdış=+0,09 J; We=−0,09 J",
            "explanation": "Çekime karşı enerji verilir."
          }
        ],
        "answer": "+0,09 J artış; +0,09 J dış iş",
        "check": "Elektrik kuvveti hareketin tersine olduğundan işi negatiftir.",
        "pitfall": "Mutlak enerji küçüldü diye U azaldı demek."
      },
      {
        "title": "Üçgenin üç çiftini say",
        "prompt": "Kenar 0,20 m eşkenar üçgende yükler +1 μC, +1 μC, −1 μC. k=9×10⁹. Toplam elektrostatik enerji?",
        "strategy": "Her farklı çifti bir kez yaz.",
        "steps": [
          {
            "label": "Bir çift ölçeği",
            "expression": "kq²/r=0,045 J",
            "explanation": "Tüm kenarlar aynı uzunlukta."
          },
          {
            "label": "Üç katkı",
            "expression": "U12=+0,045; U13=−0,045; U23=−0,045 J",
            "explanation": "İki zıt, bir aynı işaret çifti."
          },
          {
            "label": "Toplam",
            "expression": "Utoplam=−0,045 J",
            "explanation": "Çiftler iki kez sayılmaz."
          }
        ],
        "answer": "−0,045 J",
        "check": "Üç yükün farklı çift sayısı 3’tür.",
        "pitfall": "Her yüke gelen katkıları toplayıp bütün çiftleri iki kez saymak."
      },
      {
        "title": "Azalan U nereye gider?",
        "prompt": "+1 μC, 0,002 kg tanecik sabit +2 μC kaynağın 0,50 m uzağında durgun bırakılıyor. Yalnız elektrik kuvveti var; k=9×10⁹. 1 m’de sürati?",
        "strategy": "Kaybolan potansiyeli kazanılan kinetiğe çevir.",
        "steps": [
          {
            "label": "Enerji farkı",
            "expression": "ΔU=0,018·(1−2)=−0,018 J",
            "explanation": "İlk r=0,50 m, son 1 m."
          },
          {
            "label": "Kinetik",
            "expression": "Kson=0,018 J",
            "explanation": "İlk kinetik 0, dış iş yok."
          },
          {
            "label": "Sürat",
            "expression": "v=√(2·0,018/0,002)=√18≈4,243 m/s",
            "explanation": "Karekökte birimler m²/s² olur."
          }
        ],
        "answer": "Yaklaşık 4,243 m/s",
        "check": "½·0,002·18=0,018 J.",
        "pitfall": "Elektrik işini negatif alıp negatif K üretmek."
      }
    ],
    "recall": [
      {
        "prompt": "Elektrik kuvvetinin işi ΔU ile nasıl bağlı?",
        "answer": "We=−ΔU."
      },
      {
        "prompt": "Wdış=ΔU hangi koşulda?",
        "answer": "ΔK = 0 ve diğer işlerin olmadığı yavaş taşımada."
      },
      {
        "prompt": "Üç yükte toplam U kaç çiftten gelir?",
        "answer": "Üç farklı çiftten:12,13,23."
      },
      {
        "prompt": "Negatif U negatif K demek mi?",
        "answer": "Hayır; U referansa bağlı, K negatif olmayan kinetiktir."
      }
    ],
    "items": [
      {
        "prompt": "Vakumda +2 μC ve +3 μC noktasal yükler 0,30 m uzakta. Sonsuz ayrımda U=0,k=9×10⁹. Sistemin potansiyel enerjisi?",
        "hint": "U=kq1q2/r.",
        "explanation": "9×10⁹·6×10⁻¹²/0,30=0,18 J. Aynı işaretli çarpım pozitiftir; kuvvetteki r² ile karıştırılmaz.",
        "options": [
          "−0,18 J",
          "+0,18 J",
          "+0,60 J",
          "+0,018 J",
          "0 J"
        ],
        "answer": 1
      },
      {
        "prompt": "Sabit kaynak ve aynı test yükü için Uilk=+0,12 J, Uson=+0,05 J. Elektrik kuvvetinin işi?",
        "hint": "We=−(Uson−Uilk).",
        "explanation": "ΔU=0,05−0,12=−0,07 J; We=+0,07 J. Azalan potansiyel elektrik işine dönüşür.",
        "options": [
          "−0,07 J",
          "+0,17 J",
          "−0,17 J",
          "0 J",
          "+0,07 J"
        ],
        "answer": 4
      },
      {
        "prompt": "Sabit +Q’dan zıt işaretli −q yükü yavaşça uzaklaştırılıyor. Başka iş yok, ilk/son K aynı. U artışı +0,20 J. Dış iş ve elektrik işi?",
        "hint": "ΔK = 0 iken işlerin toplamı 0.",
        "explanation": "Çekime karşı dış kuvvet enerji verir; Wdış=ΔU=+0,20 J. Elektrik kuvveti ters yönde−0,20 J iş yapar.",
        "options": [
          "Wdış=+0,20 J; We=−0,20 J",
          "İkisi de +0,20 J.",
          "İkisi de −0,20 J.",
          "Wdış=−0,20 J; We=+0,20 J",
          "İkisi de 0."
        ],
        "answer": 0
      },
      {
        "prompt": "Noktasal iki yükün işaretleri ve ortam aynı. Aralarındaki r uzaklığı 2r oluyor. Uson/Uilk, Uilk≠0 için?",
        "hint": "U ters birinci r kuvvetiyle değişir.",
        "explanation": "U=kq1q2/r, dolayısıyla iki kat r enerjiyi yarılar. r² kuvvet bağıntısına aittir; U oranında kullanılmaz.",
        "options": [
          "1/4",
          "2",
          "4",
          "1/2",
          "−1/2"
        ],
        "answer": 3
      },
      {
        "prompt": "Kenar 0,20 m eşkenar üçgende +1 μC, +1 μC, −1 μC yükler var. k=9×10⁹,sonsuzda U = 0. Toplam U?",
        "hint": "Üç çiftin işaretlerini yaz.",
        "explanation": "Her çiftin ölçeği 0,045 J. Bir pozitif ve iki negatif katkı toplamı −0,045 J; aynı çift tekrar sayılmaz.",
        "options": [
          "+0,045 J",
          "−0,090 J",
          "−0,045 J",
          "0 J",
          "+0,135 J"
        ],
        "answer": 2
      },
      {
        "prompt": "İki noktasal yükten oluşan sistemde U=−0,08 J’den −0,03 J’ye değişiyor. ΔU?",
        "hint": "Son eksi ilk; eksi parantezini aç.",
        "explanation": "−0,03−(−0,08)=+0,05 J. Negatif değerlerin mutlak büyüklüğü azalırken enerji artabilir.",
        "options": [
          "−0,05 J",
          "−0,11 J",
          "+0,11 J",
          "0 J",
          "+0,05 J"
        ],
        "answer": 4
      },
      {
        "prompt": "Sabit kaynak alanında taneciğe yalnız elektrik kuvveti etki ediyor. U = 0,030 J azalıyor, ilk K = 0,010 J. Son K?",
        "hint": "ΔK=−ΔU.",
        "explanation": "Elektrik işi +0,030 J; Kson=0,010+0,030=0,040 J. Azalma ifadesinin işareti enerji denkleminde korunur.",
        "options": [
          "0,020 J",
          "−0,020 J",
          "0,040 J",
          "0,010 J",
          "0,030 J"
        ],
        "answer": 2
      },
      {
        "prompt": "Elektrostatik kuvvet F(r) r ile değişiyor. Bir yükü r1’den r2’ye götürürken elektrik işini genel olarak nasıl bulursun?",
        "hint": "Sabit olmayan kuvvetin tek değeri tüm aralığı temsil etmez.",
        "explanation": "Kuvvet–konum alanı değişen kuvveti toplar. Elektrostatikte aynı iş −(Uson−Uilk) olur; FΔt ise itmedir.",
        "options": [
          "Her zaman F(r2)·(r2−r1) ile.",
          "İşaretli kuvvet–konum alanı veya−ΔU ile.",
          "Her zaman F(r1)·r2 ile.",
          "Kuvvet ile süreyi çarparak.",
          "Yalnız son potansiyel enerjiyle."
        ],
        "answer": 1
      },
      {
        "prompt": "Yavaş dış taşımada ΔK = 0,We=−0,15 J ve başka iş yok. Wdış?",
        "hint": "Wdış+We=ΔK.",
        "explanation": "Wdış−0,15=0 → Wdış=+0,15 J. Bu koşulda U da0,15 J artmıştır.",
        "options": [
          "+0,15 J",
          "−0,15 J",
          "0 J",
          "+0,30 J",
          "−0,30 J"
        ],
        "answer": 0
      },
      {
        "prompt": "Sabit +2 μC kaynağın 0,50 m uzağında +1 μC, 0,002 kg tanecik durgun. Yalnız elektrik kuvveti; k=9×10⁹. 1 m’de sürat?",
        "hint": "Kson=0,018 J ve K=mv²/2.",
        "explanation": "ΔU=−0,018 J;½·0,002·v²=0,018 → v²=18. Sürat pozitif köktür; kaynağın hareket etmediği açık verildi.",
        "options": [
          "18 m/s",
          "√9 m/s",
          "0 m/s",
          "√18 m/s",
          "−√18 m/s"
        ],
        "answer": 3
      }
    ]
  },
  {
    "id": "elektriksel-potansiyel",
    "topic": "detail-377",
    "title": "Elektriksel potansiyel: aynı noktada farklı yükler",
    "minutes": 110,
    "source": "MEBİ AYT Fizik Konu Özetleri, basılı s. 106–109; OGM Elektriksel Potansiyel özeti ve Dersler Cepte s. 13–14. Özgün öğretim ve sorular; resmî sınav sorusu değildir.",
    "objectives": [
      "Potansiyeli kaynak düzenine ait skaler değer olarak tanımla.",
      "V ile E toplamını ve sıfırlarını karşılaştır.",
      "Potansiyel farktan işaretli enerji ve elektrik işi hesabı yap."
    ],
    "sections": [
      {
        "title": "Bir noktanın enerji haritası",
        "paragraphs": [
          "Aynı sabit kaynak düzeninde, aynı noktaya farklı küçük test yükleri yerleştirildiğini düşün. Test yükünün enerji katkısı yükle orantılıdır; U/q oranı kaynak düzeni aynı kaldığında ortak bir değer verir. Bu oran elektriksel potansiyel V’dir. Birim pozitif yük başına enerjiyle tanımlanır ve SI birimi volt, yani J/C’dir.",
          "Yer çekimindeki yükseklik haritası gibi potansiyel de konumu anlatır; fakat elektrik yükü negatif olabildiğinden aynı V değişimi farklı işaretli yüklerin enerjisini ters yönde değiştirebilir. V kaynağa ve noktaya, U=qV ise ayrıca test yüküne bağlıdır. Bu ayrımı yapmak, kuvveti hesaplamak için de önce kaynak alanını bulma alışkanlığını destekler."
        ]
      },
      {
        "title": "Noktasal kaynağın potansiyeli",
        "paragraphs": [
          "Sonsuzda V=0 seçilen sabit noktasal Q kaynağı için V=kQ/r olur. Q işaretli coulomb, r pozitif metre olarak kullanılır. Pozitif kaynak pozitif, negatif kaynak negatif V verir. Aynı kaynağa eşit uzaklıktaki bütün noktalar, farklı yönlerde olsalar da aynı potansiyele sahiptir.",
          "Örneğin −2 μC kaynağın 0,50 m uzağında V=(9×10⁹)(−2×10⁻⁶)/0,50=−36000 V olur. Oraya +3 μC test yükü konursa onun katkısı U=qV=−0,108 J’dir. Volt ile joule’ü aynı cevap yerine yazma; test yükü verilmediyse o yükün enerjisi tek başına V sayısından bulunamaz."
        ]
      },
      {
        "title": "Potansiyeller skaler olarak toplanır",
        "paragraphs": [
          "Birden çok sabit kaynağın bir P noktasındaki potansiyeli V(P)=ΣkQi/ri biçimindedir. Her kaynağın yük işareti ve P’ye gerçek uzaklığı kullanılır; geometrik yön nedeniyle ek bir eksi yerleştirilmez. Alan hesabındaki vektör bileşenleri burada yoktur; toplam cebirseldir.",
          "İki eşit pozitif kaynağın orta noktasında iki pozitif V katkısı toplanır. İki eşit-zıt kaynağın orta noktasında ise potansiyeller birbirini götürür. Aynı noktalardaki alan yönleri ayrı hesaplanır. Potansiyelin skaler oluşu ile her pozitif/negatif kaynağın alanının uzaydaki yönü birbirine karıştırılmaz."
        ]
      },
      {
        "title": "Potansiyel fark son eksi ilktir",
        "paragraphs": [
          "A’dan B’ye potansiyel farkı ΔV=VB−VA diye tanımladığında bütün enerji hesaplarını aynı sıralamayla yap. Örneğin VA=100 V, VB=20 V ise ΔV=−80 V olur. VAB gibi alt indis yazımlarında kaynağın hangi sırayı tanımladığını oku; bu anlatımda her zaman açık son eksi ilk ifadesi gösterilir.",
          "Bir voltmetre de iki noktanın farkını ölçer; sıfır referansını her potansiyele aynı sabitle kaydırmak farkı değiştirmez. Elektrik devresindeki “12 V” ifadesi genellikle iki uç arasındaki gerilimdir, her ucun sonsuza göre mutlak potansiyeli değildir. Referans seçimi ile ölçülen farkın fiziksel anlamı ayrıdır."
        ]
      },
      {
        "title": "Enerji ve işin işaretlerini yükle birleştir",
        "paragraphs": [
          "Test yükünün enerji değişimi ΔU=qΔV, elektrik kuvvetinin işi We=−qΔV olur. Pozitif yük daha düşük V’ye giderken U azalır ve We pozitif olabilir. Negatif yük aynı yolda U artırır; elektrik kuvvetine karşı dışarıdan iş gerekebilir. Kısa bir işaret tablosu, yalnız yüksek/düşük kelimelerini ezberlemekten daha güvenilirdir.",
          "VA=100 V’den VB=20 V’ye −2 μC yük yavaş taşınırsa ΔU=(−2×10⁻⁶)(−80)=+160 μJ bulunur. ΔK=0 ve başka iş yoksa dış iş +160 μJ, elektrik işi −160 μJ’dir. Aynı hareketi +2 μC ile tekrarlamak iki işin işaretini de ters çevirir; kaynakların potansiyel haritası değişmez."
        ]
      },
      {
        "title": "Eş potansiyel çizgisini gerçek geometriyle gör",
        "paragraphs": [
          "Tek noktasal kaynak etrafındaki çemberler düzlemsel eş potansiyel çizgileri, küreler üç boyutlu eş potansiyel yüzeylerdir. Bir çember üzerindeki A ve B noktaları aynı r’deyse VA=VB olur. Test yükü bu eğri boyunca taşındığında elektrik kuvvetinin net işi 0’dır; kuvvetin her yerde 0 olması gerekmez.",
          "Bu durumda alan radyal, çemberin teğeti ona diktir; elektrik kuvveti teğetsel yer değiştirmeyle iş yapmaz. Eğri yolu izletmek için dış bağ veya kontrollü hareket gerekebilir; serbest taneciğin zorunlu yörüngesi eş potansiyel değildir. Keşifte dönen gözlem noktası bir konum seçicisidir, serbest yükün zaman içindeki hareketi diye gösterilmez."
        ]
      },
      {
        "title": "Alan potansiyelin en hızlı azaldığı yönü gösterir",
        "paragraphs": [
          "Düzgün ve elektrostatik bir bölgede küçük yer değiştirmede ΔV≈−E·Δr olur. Alan yönünde gidince V azalır, alana dik küçük adımda ilk mertebe değişim 0 olur. Bir boyutta E_x=−dV/dx bağı, potansiyel grafiğinin negatif eğimini alanla ilişkilendirir.",
          "Noktasal pozitif kaynakta dışa doğru r artarken V=kQ/r azalır, E dışarıdır. Negatif kaynakta dışarı gidildikçe negatif V sıfıra yükselir ve E içeri yönelir. Şekilde büyük pozitif V bulunan noktanın alan büyüklüğü her durumda daha büyük olmak zorunda değildir; alanı yerel değişimin yönü ve büyüklüğü belirler."
        ]
      },
      {
        "title": "Sıfır V ile sıfır E aynı durum değildir",
        "paragraphs": [
          "İki eşit pozitif yükün tam ortasında eşit-zıt alanlar E=0 verir, fakat potansiyel iki pozitif katkıdan V>0’dır. İki eşit-zıt yükün ortasında V=0 olurken iki alan aynı yönde toplanıp E≠0 verir. Bu iki karşılaştırma, tek bir sıfır sayısının farklı fiziksel nicelikleri temsil edemeyeceğini gösterir.",
          "V=0 noktasına test yükü konunca U=qV=0 seçilmiş referansa göre doğrudur; kuvvet qE yine sıfır olmayabilir. E=0 noktasında ise verilen noktasal test yüküne elektrik kuvveti 0 olur, ama başka konuma giderse enerji değişebilir. Referans değeri, yerel kuvvet ve komşu noktalar arasındaki değişimi ayrı tut."
        ]
      },
      {
        "title": "İletken yüzeyi neden eş potansiyeldir?",
        "paragraphs": [
          "Elektrostatik dengedeki iletkende serbest yükler artık makroskopik akış oluşturmayacak şekilde yerleşir. İletken içinde elektrik alan 0, yüzeyde teğetsel alan bileşeni 0 olmalıdır. Bu nedenle bağlı tek bir iletkenin elektrostatik potansiyeli yüzey boyunca aynıdır; yüzeye yakın dış alan dik olabilir.",
          "İletkenin şekli alanın yüzeydeki büyüklüğünü değiştirebilir; sivri bölgelerde daha güçlü alan bulunabilmesi aynı yüzey V’siyle çelişmez. Topraklanma, iletkenin seçilen Dünya referansıyla yük alışverişi yapabilmesidir; yalıtılmış iletkenle aynı deney değildir. Bu bölüm elektrostatik denge içindir, akım taşıyan her gerçek iletkene aynen genellenmez."
        ]
      },
      {
        "title": "Çözüm sırasını kaynaktan teste doğru kur",
        "paragraphs": [
          "Önce kaynakların oluşturduğu V katkılarını, sonra istenirse ΔV’yi, daha sonra test yüküyle ΔU ve We’yi bul. Aynı soruda alan istenirse onun vektörel hesabını ayrı yap. Yükü iki farklı rol için aynı sembolle kullanmak yerine kaynak Q ve test q adlarını koru.",
          "Sonucu volt/joule/newton birimleriyle tekrar oku. Aynı kaynakta yalnız q değişince V değişmemeli; aynı r’de açıyı değiştirince tek kaynak V’si aynı kalmalı; eş potansiyel yolun elektrik işi 0 çıkmalıdır. Tahmin–gerekçe kaydı puan değildir; farklı kaynak düzeni verilen bağımsız soruyu doğru kurabilmen öğrenme kanıtıdır."
        ]
      }
    ],
    "examples": [
      {
        "title": "Volt ile joule ayrı",
        "prompt": "Sabit −2 μC kaynak, 0,50 m gözlem uzaklığı; k=9×10⁹. Potansiyel ve oradaki +3 μC test yükünün enerji katkısı?",
        "strategy": "Önce kaynağın V’si, sonra qV.",
        "steps": [
          {
            "label": "Potansiyel",
            "expression": "V=(9×10⁹)(−2×10⁻⁶)/0,50=−36000 V",
            "explanation": "Q işareti korunur."
          },
          {
            "label": "Test enerjisi",
            "expression": "U=(3×10⁻⁶)(−36000)=−0,108 J",
            "explanation": "Aynı noktada q ayrıca gerekir."
          },
          {
            "label": "Birim denetimi",
            "expression": "C·(J/C)=J",
            "explanation": "Potansiyel ve enerji farklı nicelikler."
          }
        ],
        "answer": "−36000 V; −0,108 J",
        "check": "U/q tekrar−36000 V verir.",
        "pitfall": "−2 μC kaynak ile +3 μC test yükünü karıştırmak."
      },
      {
        "title": "Orta nokta, iki farklı düzen",
        "prompt": "Kaynaklar x=−1 ve +1 m’de. Önce ikisi +1 μC, sonra sağdaki −1 μC oluyor. k=9×10⁹. Orta noktada V ve E?",
        "strategy": "Aynı V hesabından bağımsız alan oklarını çiz.",
        "steps": [
          {
            "label": "İki pozitif",
            "expression": "V=9000+9000=18000 V; E=0",
            "explanation": "Alanlar eşit-zıt, potansiyeller aynı işaretli."
          },
          {
            "label": "Eşit-zıt",
            "expression": "V=9000−9000=0; E=18000 N/C sağa",
            "explanation": "Pozitiften negatife iki alan aynı yönlü."
          },
          {
            "label": "Yorum",
            "expression": "E = 0,V≠0 ve V = 0,E≠0 ayrı düzenlerdir.",
            "explanation": "Bir niceliğin sıfırını ötekine taşıma."
          }
        ],
        "answer": "İlk:18000 V, 0; ikinci:0 V, 18000 N/C sağa",
        "check": "Her tek kaynağın r = 1 m’de alan büyüklüğü 9000 N/C.",
        "pitfall": "Potansiyel toplamını vektör gibi çıkarmak."
      },
      {
        "title": "Negatif yükü düşük potansiyele taşı",
        "prompt": "VA=100 V, VB=20 V.−2 μC yük A’dan B’ye yavaş taşınıyor; başka iş yok. ΔU ve elektrik işi?",
        "strategy": "Son eksi ilk farkını işaretli q ile çarp.",
        "steps": [
          {
            "label": "Fark",
            "expression": "ΔV=20−100=−80 V",
            "explanation": "Aynı sırayı koru."
          },
          {
            "label": "Enerji",
            "expression": "ΔU=(−2×10⁻⁶)(−80)=+160 μJ",
            "explanation": "İki eksi pozitif verir."
          },
          {
            "label": "Elektrik işi",
            "expression": "We=−ΔU=−160 μJ",
            "explanation": "Yavaş dış iş ise+160 μJ olur."
          }
        ],
        "answer": "+160 μJ; −160 μJ",
        "check": "Wdış+We=0=ΔK.",
        "pitfall": "Düşük V’ye gidildi diye her yükte U azaldı demek."
      },
      {
        "title": "Çember üzerinde iş",
        "prompt": "Sabit +1 μC kaynak O’da. A=(1; 0),B=(0; 1) m; test+2 μC kaynak merkezli 1 m yarıçaplı yayda taşınıyor. k=9×10⁹. Elektrik işi ve alanın büyüklüğü?",
        "strategy": "Uzaklıkların eşitliğini V ve E’de ayrı kullan.",
        "steps": [
          {
            "label": "İki potansiyel",
            "expression": "VA=VB=9000 V",
            "explanation": "İki nokta aynı kaynak uzaklığında."
          },
          {
            "label": "İş",
            "expression": "We=−2×10⁻⁶·(9000−9000)=0 J",
            "explanation": "Potansiyel fark 0."
          },
          {
            "label": "Alan",
            "expression": "|E|=9000 N/C; yön her noktada radyal",
            "explanation": "Sıfır iş sıfır kuvvet anlamına gelmez."
          }
        ],
        "answer": "0 J; her noktada 9000 N/C",
        "check": "Alan yay teğetine diktir.",
        "pitfall": "Eş potansiyeli serbest taneciğin zorunlu yolu sanmak."
      }
    ],
    "recall": [
      {
        "prompt": "V skaler mi, vektör mü?",
        "answer": "Skaler; kaynakların katkıları işaretli toplanır."
      },
      {
        "prompt": "ΔV=VB−VA ise elektrik işi?",
        "answer": "We=−q(VB−VA)."
      },
      {
        "prompt": "V = 0 noktada alan kesin 0 mı?",
        "answer": "Hayır; eşit-zıt yüklerin orta noktası karşı örnektir."
      },
      {
        "prompt": "Tek noktasal kaynakta eş potansiyel yüzey?",
        "answer": "Kaynak merkezli aynı yarıçaplı küre."
      }
    ],
    "items": [
      {
        "prompt": "Sabit −2 μC noktasal kaynaktan 0,50 m uzakta V kaçtır? Sonsuzda V = 0,k=9×10⁹.",
        "hint": "V=kQ/r.",
        "explanation": "(9×10⁹)(−2×10⁻⁶)/0,50=−36000 V. Test yükü verilmesi kaynak potansiyeli hesabı için gerekmez.",
        "options": [
          "+36000 V",
          "−18000 V",
          "−0,108 V",
          "0 V",
          "−36000 V"
        ],
        "answer": 4
      },
      {
        "prompt": "Potansiyeli −200 V olan noktaya +3 μC test yükü yerleştiriliyor. Kaynak düzeni değişmiyor. Enerji katkısı U=qV?",
        "hint": "C ile J/C çarpımını izle.",
        "explanation": "3×10⁻⁶·(−200)=−600×10⁻⁶ J. Voltla joule aynı birim değildir.",
        "options": [
          "+600 μJ",
          "−600 μJ",
          "−600 J",
          "−200 μJ",
          "0 J"
        ],
        "answer": 1
      },
      {
        "prompt": "İki +1 μC noktasal kaynak x=−1 ve +1 m’de; k=9×10⁹. Orta noktada V ve net E?",
        "hint": "V’ler toplanır, E yönleri karşılaştırılır.",
        "explanation": "Her kaynak V=9000 V ve E=9000 N/C verir. V toplam 18000; alanlar aynı büyüklükte zıt yönlü olduğu için E = 0.",
        "options": [
          "0 V; 18000 N/C sağa",
          "0 V; 0 N/C",
          "9000 V; 9000 N/C",
          "18000 V; 0 N/C",
          "18000 V; 18000 N/C"
        ],
        "answer": 3
      },
      {
        "prompt": "+1 μC x=−1 m, −1 μC x=+1 m’de; k=9×10⁹. Orta noktada V ve E?",
        "hint": "Alanlar pozitiften negatife yönelir.",
        "explanation": "V=9000−9000=0; iki alan da sağa 9000 N/C ve net 18000 N/C. Sıfır potansiyel sıfır kuvvet kanıtı değildir.",
        "options": [
          "0 V; 18000 N/C sağa",
          "18000 V; 0 N/C",
          "0 V; 0 N/C",
          "0 V; 18000 N/C sola",
          "9000 V; 9000 N/C sağa"
        ],
        "answer": 0
      },
      {
        "prompt": "VA=80 V, VB=30 V. A’dan B’ye+2 μC taşınıyor. Elektrik kuvvetinin işi?",
        "hint": "We=−q(VB−VA).",
        "explanation": "ΔV=−50 V,ΔU=−100 μJ; We=+100 μJ. İşaretli fark açık son eksi ilk tanımıyla kurulur.",
        "options": [
          "−100 μJ",
          "+220 μJ",
          "+100 μJ",
          "−220 μJ",
          "0 J"
        ],
        "answer": 2
      },
      {
        "prompt": "VA=80 V, VB=30 V. Aynı yolda−2 μC taşınıyor. ΔU?",
        "hint": "Negatif q ile negatif ΔV’yi çarp.",
        "explanation": "ΔU=(−2 μC)(−50 V)=+100 μJ. Kaynağın V haritası test yükü negatif oldu diye tersine dönmez.",
        "options": [
          "−100 μJ",
          "+100 μJ",
          "+220 μJ",
          "−220 μJ",
          "0 J"
        ],
        "answer": 1
      },
      {
        "prompt": "Tek sabit noktasal kaynaktan eşit uzaklıkta A ve B var. Test yükü A’dan B’ye kaynak merkezli yayda taşınıyor. Elektrik işi?",
        "hint": "VA=VB.",
        "explanation": "We=−qΔV=0. Radyal elektrik kuvveti, yay teğetine diktir; kuvvetin varlığı tek başına iş yapıldığı anlamına gelmez.",
        "options": [
          "0 J",
          "Mutlaka pozitif.",
          "Mutlaka negatif.",
          "Her durumda F·yay uzunluğu.",
          "Yalnız A’da alan varsa tanımsız."
        ],
        "answer": 0
      },
      {
        "prompt": "Elektrostatik dengedeki tek bağlı iletkenin yüzeyinde A ve B noktaları için doğru ifade?",
        "hint": "Yüzey eş potansiyeldir, yerel dış E aynı olmak zorunda değil.",
        "explanation": "Yüzey boyunca teğetsel E = 0 olduğundan V sabit; geometri dış alan büyüklüğünü değiştirebilir. Bu elektrostatik denge koşuludur.",
        "options": [
          "VA mutlaka VB’den büyüktür.",
          "Alan her yüzey noktasında aynı büyüklüktedir.",
          "VA=VB; dış alan büyüklükleri farklı olabilir.",
          "Yüzeyde alan mutlaka teğettir.",
          "İletkenin şekli potansiyeli vektör yapar."
        ],
        "answer": 2
      },
      {
        "prompt": "Bir boyutta elektrostatik V(x),x arttıkça doğrusal azalıyor. E_x yönü?",
        "hint": "E_x=−dV/dx.",
        "explanation": "Negatif eğimin eksi işareti pozitiftir. Alan yüksek V’den düşük V’ye yönelir; test yükü alanın yönünü belirlemez.",
        "options": [
          "Negatif x yönü.",
          "Kesin sıfır.",
          "Sadece test yükünün işaretine bağlı.",
          "Pozitif x yönü.",
          "Alan skaler olduğu için yönsüz."
        ],
        "answer": 3
      },
      {
        "prompt": "Sabit kaynakların bütün potansiyellerine aynı+50 V referans sabiti ekleniyor. A ile B arasındaki ΔV ne olur?",
        "hint": "(VB+50)−(VA+50).",
        "explanation": "Aynı sabit farkta sadeleşir. Elektrik işi ve enerji farkı referansın bu ortak kaydırılmasından etkilenmez.",
        "options": [
          "50 V artar.",
          "100 V artar.",
          "50 V azalır.",
          "Her zaman sıfırlanır.",
          "Değişmez."
        ],
        "answer": 4
      }
    ]
  },
  {
    "id": "duzgun-alan-paralel-levhalar",
    "topic": "detail-378",
    "title": "Düzgün elektrik alan: levhadan yörüngeye",
    "minutes": 125,
    "source": "MEBİ AYT Fizik Konu Özetleri, basılı s. 110–112; OGM Yüklü, İletken ve Paralel Levhalar Arasında Oluşan Elektrik Alan özeti; Dersler Cepte s. 15–16. Özgün öğretim ve sorular; resmî sınav sorusu değildir.",
    "objectives": [
      "Paralel levhada E, gerilim ve uzaklık ilişkisini kur.",
      "Gerçek elektrik kuvveti ile ağırlığı toplayıp ivmeyi bul.",
      "Dik ilk hızda yörüngeyi ilk levha teması veya çıkışa kadar hesapla."
    ],
    "sections": [
      {
        "title": "İki levha bir alan bölgesi kurar",
        "paragraphs": [
          "Geniş iki paralel iletken levhayı zıt yüklediğinde, aralarındaki orta bölgede alan yaklaşık aynı yön ve büyüklüktedir. Pozitif levhadan negatif levhaya yönelir. Çizimde birbirine paralel ve eşit aralıklı oklar bu düzgün alanı temsil eder; her ok ayrı bir tanecik veya sürekli akan madde değildir.",
          "Levha boyutları aralığa göre büyük ve gözlem kenarlardan uzaktaysa bu yaklaşım iyi çalışır. Sonlu levhanın kenarında alan çizgileri dışarı bükülebilir. Önce bu orta bölgeyi kullanarak temel hesabı kurar, kenar bölgesini aynı kesin düzgünlükle açıklamaya çalışmayız."
        ]
      },
      {
        "title": "Gerilimle uzaklık alanı birlikte belirler",
        "paragraphs": [
          "Levhalar arasında potansiyel fark büyüklüğü V, dik aralık d ise |E|=V/d olur. Volt/metre ile newton/coulomb eşdeğerdir. Örneğin 100 V gerilim ve 0,05 m aralık 2000 V/m alan verir. Noktasal kaynaktaki kQ/r² yerine burada düzeneğe uygun bu bağı kullanırsın.",
          "V ile d aynı anda değişiyorsa oran kur: Eson/Eilk=(Vson/Vilk)(dilk/dson). Gerilim iki, aralık dört kat olursa alan yarıya iner. Aralığın santimetresini metreye çevirmek, hesaplanan sayının yüz kat hatalı çıkmasını önler. Alan yönü için ayrıca hangi levhanın daha yüksek potansiyelde olduğu belirtilmelidir."
        ]
      },
      {
        "title": "Potansiyel levhalar arasında nasıl değişir?",
        "paragraphs": [
          "Düzgün E, sabit eğimli bir potansiyel haritasına karşılık gelir. Alan yönünde s kadar ilerleyince ΔV=−E s olur. Aynı potansiyelli yüzeyler levhalara paraleldir; levhaya paralel bir konum değişiminde bu ideal bölgede ΔV = 0’dır. Potansiyel konuma göre değişirken E’nin büyüklüğü sabit kalabilir.",
          "Bu modelde alt levhanın potansiyelini V, üstü 0 alıp y’yi yukarı seçersek E_y=V/d ve V(y)=V/2−E_y y olur; y = 0 orta çizgidir. V negatif seçilirse alt daha düşük potansiyelde ve alan aşağı olur. Her kontrol durumunda işaret, yüksekten düşüğe alan kuralıyla karşılaştırılır."
        ]
      },
      {
        "title": "Alanın etkisi test yüküyle kuvvete dönüşür",
        "paragraphs": [
          "Taneciğe elektriksel kuvvet Felektrik=qE vektörüyle etki eder. Pozitif tanecik alan yönünde, negatif tanecik ters yönde kuvvet alır. Aynı alanda test yükünün büyüklüğü iki katına çıkarsa kuvvet iki kat olur; alanın kaynağı sabit tutulduğu için E değişmez.",
          "Yalnız elektrik kuvveti varsa a=qE/m olur. Aynı q ve E’de iki kat kütle yarı ivme verir. İvme taneciğin o anda gittiği yön demek değildir: başlangıç hızı başka yönde olabilir. Kaynak levhaların test taneciği nedeniyle anlamlı biçimde değişmediği küçük-test-yükü yaklaşımı kullanılır."
        ]
      },
      {
        "title": "Ağırlığı ekleyince net kuvveti çiz",
        "paragraphs": [
          "Düşey alanda yukarı artı seçip ağırlığı aşağı −mg yaz. Net düşey kuvvet qE_y−mg, ivme a_y=qE_y/m−g olur. Elektrik kuvveti yukarı ve ağırlıkla eşitse ivme 0; elektrik daha büyükse yukarı, küçükse aşağıdır. Negatif q için elektrik kuvvetinin yönü yeniden değerlendirilir.",
          "Denge kuvvetlerin yok olduğu anlamına gelmez. Yukarı 0,06 N elektrik kuvveti ve aşağı 0,06 N ağırlık birlikte net 0 verebilir; tanecik durgun bırakıldıysa kalır, başlangıç hızı varsa aynı bölgede sabit hızla gidebilir. Üçüncü bir ip veya temas varsa o kuvvet de şemaya eklenir."
        ]
      },
      {
        "title": "İlk hız yokken doğrusal hareket",
        "paragraphs": [
          "Düzgün sabit alan ve sabit diğer kuvvetlerde ivme sabittir. Tanecik ilk hızsız bırakılırsa y=y0+½a_y t²,vy=a_y t olur. Alanı veya yük işaretini değiştirmek ivmeyi değiştirir; hareketi her seçimde baştan tanımlanan bir deney olarak hesaplarız.",
          "Model yalnız taneciğin alan içinde kaldığı zamana kadar geçerlidir. Bir levhaya ulaştığında yeni bir çarpışma veya yük aktarımı modeli gerekir. İlk temas zamanında y tam levha sınırına gelmeli; eğriyi metalin içinden geçirip aynı serbest uçuşu sürdürmek fiziksel bir devam değildir."
        ]
      },
      {
        "title": "Alana dik ilk hızda iki hareket birlikte",
        "paragraphs": [
          "Alan düşey, ilk hız yatay vx ise yatay ivme 0 koşulunda x=vx t olur. Düşeyde y=vy0 t+½a_y t²,vy=vy0+a_y t geçerlidir. Zaman bu iki hareketin ortak parametresidir; x için başka, y için başka bir uçuş süresi seçilmez.",
          "vx sıfır değilse y(x) parabol olabilir; a_y=0 olduğunda düz çizgiye iner. Elektrik kuvveti üstte diye hızın her anda yalnız yukarı olması gerekmez. Seçili andaki hız oku yatay ve düşey bileşenlerin toplamını, kuvvet oku ise ivme yönünü gösterir; iki okun görevleri ayrıdır."
        ]
      },
      {
        "title": "İlk fiziksel olay hangisi?",
        "paragraphs": [
          "Sınırlı levha uzunluğunda tanecik yatay çıkışa ulaşmadan üst veya alt levhaya çarpabilir. Önce x=L için çıkış süresi, sonra y=±d/2 için pozitif temas kökleri bulunur; en küçük gelecek zaman seçilir. Temas ile çıkış aynı anda olursa köşe olayıdır.",
          "Bu sıra özellikle büyük q/m veya düşük yatay hızda önemlidir. Sadece L/vx süresini kullanmak levhayı önceden geçen bir yörünge üretebilir. Keşifte zaman kontrolü ilk olayda biter; grafik ve HTML aynı olayı adlandırır. Negatif veya hayalî zaman kökü gelecekteki temas sayılmaz."
        ]
      },
      {
        "title": "İşi kuvvetten veya potansiyelden doğrula",
        "paragraphs": [
          "Sabit düşey E’de elektrik işi We=qE_y Δy, aynı zamanda −qΔV olur. Bu iki yol aynı sayıyı vermelidir. Ağırlık da varsa Wg=−mgΔy eklenir ve ΔK=We+Wg bulunur. Gerçek yörünge eğri olsa da elektriksel iş başlangıç ve son potansiyellerle hesaplanabilir.",
          "Örneğin tanecik yukarı doğru elektrik kuvvetiyle 0,20 m yükselirken aşağı ağırlık negatif iş yapabilir. Kinetik artış, elektrik işinin tek başına tamamına eşit olmayabilir. Model enerji paneli her iki katkıyı ve başlangıç/son K’yi birlikte göstererek eksik kuvvet varsayımını görünür kılar."
        ]
      },
      {
        "title": "Üreteç bağlı deneyde ne sabittir?",
        "paragraphs": [
          "İdeal gerilim kaynağına bağlı paralel levhada V sabit tutulur. Aralık d artırılırsa E=V/d azalır. Sabit levha alanı ve ortamda sığa da azalacağı için levhalardaki Q değişebilir; bağlı üreteç yük alışverişi yapar. “Levha yükü her durumda aynı” demeden önce bağlantıya bak.",
          "Üreteçten ayrılmış ve kaçak akımı ihmal edilmiş zıt levhalarda Q sabit kalabilir. İdeal geniş levha modelinde E≈Q/(εA) aralıkla değişmezken V=E d değişir. Bir sonraki sığaç ünitesi bu iki deneyi aynı başlangıçtan karşılaştırır; iki farklı sabiti tek denklemde aynı anda varsaymayız."
        ]
      },
      {
        "title": "Küçük bir taneciğin model koşulları",
        "paragraphs": [
          "Bu anlatım elektrostatik, sabit kaynak, sabit kütle ve göreli olmayan hız yaklaşımıyla çalışır. qE, m ve g verileri açık sayısal öğretim verileridir; model gerçek bir cihazın ölçülmüş alanı veya güvenli tasarım belgesi değildir. Kenar etkileri veya ortamla çarpışmalar önemliyse yörünge değişir.",
          "Taneciğin yükü 0 seçildiğinde elektrik kuvveti 0 olur fakat yer çekimi açıksa düşey ivme−g kalır. Elektrik alanın sıfırlanması da diğer kuvvetleri silmez. Aynı anda hangi kuvvetin neden yok olduğunu açıklamak, iki etkiyi yanlışlıkla beraber kapatmaktan daha iyi bir deney okuması sağlar."
        ]
      },
      {
        "title": "Tahmin et, iki kanıtı birleştir",
        "paragraphs": [
          "Önce kuvvet oklarından sapmanın yönünü tahmin et; sonra zaman ve konum formülleriyle sayısal büyüklüğü bul. Birim, ilk olay ve enerji bilançosu üç kontrol olsun. Hesap sonunda taneciğin levha sınırını aşmadığını ve aynı süreyi x ile y’de kullandığını doğrula.",
          "Keşif için zaman sürgüsü bir seçicidir; otomatik puan veya konu tamamlama üretmez. Modelin gösterdiği hareketi izlemekten sonra farklı q, m, V, d verilen bağımsız soruda aynı zinciri kurmaya geç. Akıcı öğrenme, formülün hangi fiziksel nedenden geldiğini açıklayabildiğinde güçlenir."
        ]
      }
    ],
    "examples": [
      {
        "title": "Gerilimden ivmeye",
        "prompt": "Paralel levhada 100 V gerilim ve 0,05 m aralık var. Alan yukarı; +3 μC, 0,002 kg tanecik durgun. Ağırlık yok. Alan, kuvvet ve ivme?",
        "strategy": "E ardından qE ardından F/m.",
        "steps": [
          {
            "label": "Alan",
            "expression": "E=100/0,05=2000 N/C",
            "explanation": "Kenar etkileri ihmal."
          },
          {
            "label": "Kuvvet",
            "expression": "Fy=3×10⁻⁶·2000=0,006 N",
            "explanation": "Pozitif yükte yukarı."
          },
          {
            "label": "İvme",
            "expression": "ay=0,006/0,002=3 m/s²",
            "explanation": "Yalnız elektrik kuvveti var."
          }
        ],
        "answer": "2000 N/C; 0,006 N; 3 m/s² yukarı",
        "check": "m a=qE tekrar sağlanır.",
        "pitfall": "Gerilimi doğrudan kuvvet sanmak."
      },
      {
        "title": "Konumdan potansiyele",
        "prompt": "Düzgün alan +y yönünde 5000 N/C.−2 μC yük 0,010 m yukarı taşınıyor. ΔV,ΔU ve We?",
        "strategy": "İşaretli alan-projeksiyonunu kullan.",
        "steps": [
          {
            "label": "Potansiyel",
            "expression": "ΔV=−5000·0,010=−50 V",
            "explanation": "Alan yönünde V azalır."
          },
          {
            "label": "Enerji",
            "expression": "ΔU=(−2×10⁻⁶)(−50)=+100 μJ",
            "explanation": "Negatif yükte enerji artar."
          },
          {
            "label": "İş",
            "expression": "We=−100 μJ",
            "explanation": "Elektrik kuvveti aşağı, yer değiştirme yukarı."
          }
        ],
        "answer": "−50 V; +100 μJ; −100 μJ",
        "check": "qEΔy=−0,01·0,010=−0,0001 J.",
        "pitfall": "ΔV’ye yükün işaretini ayrıca katmak."
      },
      {
        "title": "Gerçek iki kuvvet, sıfır ivme",
        "prompt": "Alt pozitif üst negatif levhada 600 V ve 0,030 m aralık var. +3 μC, 0,006 kg tanecik, g=10. Başka kuvvet yok. Net ivme?",
        "strategy": "Elektrik ve ağırlık yönlerini önce çiz.",
        "steps": [
          {
            "label": "Alan",
            "expression": "E=600/0,030=20000 N/C yukarı",
            "explanation": "Yüksek V’den düşüğe."
          },
          {
            "label": "Kuvvetler",
            "expression": "Fe=0,060 N yukarı; mg=0,060 N aşağı",
            "explanation": "İki ayrı gerçek kuvvet."
          },
          {
            "label": "Bileşke",
            "expression": "Fnet=0; ay=0",
            "explanation": "İlk hız varsa sabit kalabilir."
          }
        ],
        "answer": "0 m/s²",
        "check": "0,006·0=0,060−0,060 N.",
        "pitfall": "İvme 0’dan bütün kuvvetler 0 sonucunu çıkarmak."
      },
      {
        "title": "Parabol çıkıştan önce levhaya değer mi?",
        "prompt": "0,40 m uzunlukta levhalar arası 0,50 m. E yukarı 5000 N/C; +2 μC, 0,001 kg tanecik orta çizgiden yatay 2 m/s giriyor. vy0=0,ağırlık yok. Çıkıştaki y ve vy; önce temas var mı?",
        "strategy": "Çıkış ve temas zamanlarını ayrı hesapla.",
        "steps": [
          {
            "label": "İvme ve çıkış",
            "expression": "ay=10 m/s²; Tçıkış=0,40/2=0,20 s",
            "explanation": "Yatay hız sabit."
          },
          {
            "label": "Düşey",
            "expression": "y=½·10·0,20²=0,20 m; vy=2 m/s",
            "explanation": "Orta çizgiden yukarı."
          },
          {
            "label": "İlk olay",
            "expression": "Tüst=√(2·0,25/10)≈0,224 s>0,20",
            "explanation": "Önce yatay çıkış; üst sınıra kadar ulaşmamış."
          }
        ],
        "answer": "y=0,20 m; vy=2 m/s; önce çıkış",
        "check": "We=0,01·0,20=0,002 J=½·0,001·2² düşey K artışı.",
        "pitfall": "Yarım aralık 0,25 m yerine 0,50 m’yi üst sınır almak."
      }
    ],
    "recall": [
      {
        "prompt": "Düzgün levha alanının büyüklüğü?",
        "answer": "E=V/d; kenarlardan uzak ideal bölgede."
      },
      {
        "prompt": "Yukarı E ve ağırlıkta düşey ivme?",
        "answer": "ay=qEy/m−g."
      },
      {
        "prompt": "Yörünge nerede durdurulur?",
        "answer": "İlk üst/alt levha teması veya yatay çıkış olayında."
      },
      {
        "prompt": "Elektrik işinin iki eşdeğer hesabı?",
        "answer": "We=qE·Δr=−qΔV."
      }
    ],
    "items": [
      {
        "prompt": "Kenar etkileri ihmal edilen paralel levhada 600 V gerilim ve 0,030 m aralık var. Alan büyüklüğü?",
        "hint": "E=V/d.",
        "explanation": "600/0,030=20000 V/m=N/C. Metreye çevrilmiş aralık paydada kullanılır.",
        "options": [
          "20 N/C",
          "18000 N/C",
          "20000 N/C",
          "600 N/C",
          "2000 N/C"
        ],
        "answer": 2
      },
      {
        "prompt": "Düzgün elektrik alan +y yönünde 3000 N/C. −2 μC noktasal taneciğe elektrik kuvveti?",
        "hint": "Fy=qEy.",
        "explanation": "−2×10⁻⁶·3000=−0,006 N. Negatif yük alan yönüne ters kuvvet alır.",
        "options": [
          "−0,006 N y yönünde",
          "+0,006 N y yönünde",
          "−6000 N y yönünde",
          "0 N",
          "+0,0015 N y yönünde"
        ],
        "answer": 0
      },
      {
        "prompt": "Düzgün alanda taneciğe net elektrik kuvveti 0,012 N. Kütlesi 0,003 kg, diğer kuvvetler yok. İvme büyüklüğü?",
        "hint": "a=Fnet/m.",
        "explanation": "0,012/0,003=4 m/s². Yüksek gerilim sayısını doğrudan ivme yerine yazmak doğru değildir.",
        "options": [
          "0,25 m/s²",
          "36 m/s²",
          "0,036 m/s²",
          "12 m/s²",
          "4 m/s²"
        ],
        "answer": 4
      },
      {
        "prompt": "Üst levha 0 V, alt levha+100 V; aralık 0,10 m. Orta bölgede alan yönü?",
        "hint": "Alan yüksek V’den düşük V’ye.",
        "explanation": "Alt levha daha yüksek potansiyelde olduğundan alan alttan üste, yukarıdır. Test yükü yalnız kuvvetin yönünü etkiler.",
        "options": [
          "Aşağı.",
          "Yukarı.",
          "Sağa.",
          "Sola.",
          "Yükün işaretine göre alan döner."
        ],
        "answer": 1
      },
      {
        "prompt": "Yukarı yönlü düzgün E=10000 N/C, +2 μC, 0,002 kg tanecik, g=10. Başka kuvvet yok. Düşey ivme?",
        "hint": "Fe=mg koşulunu denetle.",
        "explanation": "Fe=0,020 N yukarı, mg=0,020 N aşağı; net 0 ve ivme 0. Başlangıç hızı verilmedikçe durgunluk ayrıca çıkarılamaz.",
        "options": [
          "+10 m/s²",
          "−10 m/s²",
          "+20 m/s²",
          "0 m/s²",
          "−20 m/s²"
        ],
        "answer": 3
      },
      {
        "prompt": "Ağırlıksız modelde alan düşey, ilk hız yatay 2 m/s. Levha uzunluğu 0,40 m; çıkışa kadar levha teması yok. Yatay çıkış süresi?",
        "hint": "Yatay ivme 0; T=L/vx.",
        "explanation": "0,40/2=0,20 s. Düşey ivme bu ideal modelde yatay süreyi değiştirmez; temas olmadığı kökte verildi.",
        "options": [
          "0,80 s",
          "2 s",
          "0,10 s",
          "0,40 s",
          "0,20 s"
        ],
        "answer": 4
      },
      {
        "prompt": "Tanecik orta çizgiden yatay giriyor. Aralık 0,50 m, vy0=0,ay=10 m/s². Üst levhaya ulaşana kadar yatay çıkış yok; kenar etkileri ihmal. Üst levhaya ilk ulaşma süresi?",
        "hint": "Üst sınır y=+0,25 m.",
        "explanation": "0,25=½·10t²→t²=0,05. Merkezden üst levhaya uzaklık toplam aralığın yarısıdır.",
        "options": [
          "√0,10 s",
          "0,05 s",
          "0,50 s",
          "√0,05 s",
          "5 s"
        ],
        "answer": 3
      },
      {
        "prompt": "Düzgün E+x yönünde 4000 N/C. Test yükü+3 μC, alan boyunca+0,020 m ilerliyor. Elektrik işi?",
        "hint": "We=qEΔx.",
        "explanation": "3×10⁻⁶·4000·0,020=240×10⁻⁶ J. Kuvvet hareket yönünde olduğu için iş pozitiftir.",
        "options": [
          "+240 μJ",
          "−240 μJ",
          "+80 μJ",
          "+0,24 J",
          "0 J"
        ],
        "answer": 0
      },
      {
        "prompt": "İdeal gerilim kaynağına bağlı geniş paralel levhalarda V sabit. Aralık d’den 2d’ye çıkarılıyor. Eson/Eilk?",
        "hint": "Bağlı deneyde E=V/d.",
        "explanation": "V aynı, d iki kat; E yarıya iner. İzoleQ sabit deneyi farklı koşuldur ve burada varsayılmaz.",
        "options": [
          "2",
          "1",
          "1/2",
          "1/4",
          "4"
        ],
        "answer": 2
      },
      {
        "prompt": "Tanecik için hesaplanan yatay çıkış 0,40 s, üst levhaya ilk temas 0,20 s. Serbest uçuş modeli hangi zamana kadar geçerli?",
        "hint": "İlk fiziksel olay en küçük gelecek zamandır.",
        "explanation": "Levha teması önce olduğundan 0,20 s’de serbest uçuş biter. Temastan sonra yeni bir çarpışma/yük aktarımı modeli gereklidir.",
        "options": [
          "0,40 s; metalin içinden devam eder.",
          "0,20 s; üst levhaya kadar.",
          "0,60 s; iki süre toplanır.",
          "0,10 s; iki süre bölünür.",
          "Hiçbir zaman kullanılamaz."
        ],
        "answer": 1
      }
    ]
  },
  {
    "id": "sigaclar-kondansatorler",
    "topic": "detail-379",
    "title": "Sığaçlar: yükü ayır, enerjiyi sakla",
    "minutes": 125,
    "source": "MEBİ AYT Fizik Konu Özetleri, basılı s. 113–115; OGM Sığa özeti ve Sığa ders anlatım sunusu; Dersler Cepte s. 17–19. Özgün açıklamalar, enerji türetimi ve sorular; resmî sınav sorusu değildir.",
    "objectives": [
      "Sığayı Q/V oranı ve gerçek levha geometrisiyle tanımla.",
      "Üretece bağlı V sabit ve ayrılmış Q sabit deneylerini ayır.",
      "Depolanan enerjiyi ve şarj/deşarj devresini açıklayıp hesapla."
    ],
    "sections": [
      {
        "title": "İki levhada yük ayrılması",
        "paragraphs": [
          "Bir sığaç, iki iletken ve aralarındaki yalıtkan ortamdan oluşan düzenektir. Üretece bağlanınca teller üzerinden elektron aktarımı bir levhada fazlalık, ötekinde eksiklik oluşturur. Eşit-zıt levha yükleri için her levhadaki büyüklük Q’dur; iki levhanın toplam net yükü 0 olabilirken sistem yüklü ve enerjili olabilir.",
          "İdeal yalıtkan aralıktan sürekli iletken akımı geçmez. Kaynak yükü dış devre yoluyla ayırır ve levhalar arasında elektrik alan kurulur. Bu fiziksel işleyiş, şemadaki iki paralel çizginin neyi temsil ettiğini anlatır; şekil yalnız bir pil simgesi değildir. Gerçek sığaçlar düzlemsel, silindirik veya küresel yapılarda olabilir."
        ]
      },
      {
        "title": "Sığa oran olarak ölçülür",
        "paragraphs": [
          "Doğrusal ideal sığaçta C=Q/|V|,dolayısıyla Q=C|V| olur. C’nin birimi farad, F=Coulomb/Volt’tur. Aynı geometride iki kat gerilim iki kat yük ayırır; oran C aynı kalır. Sığa, sadece o anda depolanmış yük miktarının başka adı değildir.",
          "Gerilim ve yük ikisi 0 iken C’yi fiziksel yapıdan belirleyebiliriz; 0/0 sayısal oranı almak gerekmez. Gerilim arttıkça C’nin sabitliği kullanılan doğrusal malzeme ve sabit geometri modeline aittir. Bir parçanın üzerinde yazan azami gerilim, kaçak veya malzeme doğrusal olmayan davranışı ayrı özelliklerdir."
        ]
      },
      {
        "title": "Faradın küçük birimlerini oku",
        "paragraphs": [
          "Günlük sığaçlarda mikrofarad, nanofarad ve pikofarad sık kullanılır:1 μF=10⁻⁶ F, 1 nF=10⁻⁹ F, 1 pF=10⁻¹² F. 3 μF ile 2 nF’yi toplarken aynı öneke dönüştürmeden sayıları birleştirme. Q=C V hesabında voltla farad kullanmak coulomb verir.",
          "Örneğin 2 μF sığaç 10 V’a bağlanınca Q=20 μC olur. Birim önekleri aynı kaldığı için mikrofarad·volt=mikrocoulomb kısa yolu kullanılabilir; enerji hesabında V² çarpıldığında sonuç mikrojoule olur. Hangi büyüklüğün karesinin alındığını açık yazmak on kat/yüz kat karışıklığını önler."
        ]
      },
      {
        "title": "Geometri sığayı nasıl belirler?",
        "paragraphs": [
          "Kenar etkileri ihmal edilen tam doldurulmuş paralel levha sığacında C=εA/d olur. A tek levhanın karşılıklı örtüşen alanı, d dik aralık,ε=ε0εr ortamın permitivitesidir. Alan büyürse daha fazla yük aynı gerilimde ayrılabilir; aralık büyürse aynı Q daha büyük potansiyel farkı oluşturduğundan C azalır.",
          "Bu bağı birimle denetle:farad/metre·metrekare/metre=farad. İki levha olduğu için A’yı otomatik 2A yapma; formüldeki A karşılıklı örtüşen tek alanı temsil eder. Levhaların yalnız bir bölümü örtüşüyorsa etkin alan buna göre seçilir; tam dolduran tek ortam varsayımı değişirse yeni geometri modeli gerekir."
        ]
      },
      {
        "title": "Dielektrik alanın cevabını değiştirir",
        "paragraphs": [
          "Levhalar arasına uygun yalıtkan konduğunda moleküler kutuplanma oluşur. Tam dolduran doğrusal dielektrikte εr>1 ise aynı geometri için C,εr katına çıkar. Dielektrik, metalik bir kısa devre oluşturmak yerine yükler arasındaki elektriksel etkileşimi kutuplanma yoluyla değiştirir.",
          "C artınca Q veya V’nin nasıl değiştiği bağlantıya bağlıdır. Üreteç V’yi sabit tutuyorsa daha fazla serbest yük taşınabilir. Sığaç ayrılmış ve yük kaçağı yoksa aynı Q daha düşük V ile taşınır. Aynı malzemeyi yerleştirmek iki deneyde farklı sonuç verdiğinde çelişki yoktur; korunan nicelik farklıdır."
        ]
      },
      {
        "title": "Üretece bağlı deneyde V korunur",
        "paragraphs": [
          "İdeal sabit gerilim üretecine bağlı sığaçta V kontrol edilir, Q=C V sonucu olarak değişir. A iki kat olursa C ve Q iki kat; d iki kat olursa C ve Q yarı olur. Kaynakla yük alışverişi yapılabildiği için başlangıç Q’sunu zorla sabit tutamazsın.",
          "Elektrik alan E=V/d olduğundan d değişimi bağlı deneyde alanı değiştirir. Tam dolduran εr artışında aynı V ve d için ideal E aynı kalırken Q artabilir. “Dielektrik girince alan her durumda azalır” sözü, bu bağlı durumu izole deneyle karıştırır. Önce üretecin bağlı olup olmadığını devre üzerinde göster."
        ]
      },
      {
        "title": "Üreteçten ayrılınca Q korunabilir",
        "paragraphs": [
          "Sığaç yüklendikten sonra bağlantı kesilir ve kaçak ihmal edilirse her levhanın serbest yük büyüklüğü Q korunur. Yeni C’de gerilim V=Q/C olur. Tam dolduran dielektrikle C üç kat olursa V üçte bire iner; d iki katına çıkarılırsa C yarı, V iki kat olur.",
          "Bu deneyde alan E=Q/(εA) ile yorumlanabilir. Aynı A ve ε ile yalnız d artışı E’yi değiştirmez, gerilim ise E d kadar artar. Geometrinin değiştirilmesi mekanik iş gerektirebilir; başlangıçta üreteçten ayrılmış olması enerjinin her durumda sabit kaldığı anlamına gelmez."
        ]
      },
      {
        "title": "Enerji neden yarım QV’dir?",
        "paragraphs": [
          "Sığaç yüklenirken gerilim 0’dan son V’ye artar. Küçük dq yükünü eklemek için V(q)dq=q dq/C kadar iş gerekir. Q–V grafiğinde bu iş üçgen alanıdır:U=½Q V. Aynı sonuç U=½C V² ve U=Q²/(2C) biçimlerinde yazılır; bu enerji elektrik alanında depolanır.",
          "Bütün Q’nun son V’ye karşı en baştan taşındığını sanıp U=QV yazmak enerjiyi iki kat yapar. Kaynağın ideal sabit V’de yaptığı toplam iş ile sığaçta kalan enerji de ayrı hesaplar olabilir; devrede direnç, ışınım veya mekanik enerji aktarımı bulunabilir. Başlangıç/son bilançosunda bu kanalları adlandır."
        ]
      },
      {
        "title": "Bağlı ve izole enerji değişimleri",
        "paragraphs": [
          "V sabitken U=C V²/2 olduğundan C artışı sığaç enerjisini artırır; üreteç iş yapıp yük sağlar. Q sabitken U=Q²/(2C),dolayısıyla C artışı enerjiyi azaltır. Dielektriğin içeri çekilmesi gibi mekanik enerji alışverişleri bu farkın bir parçasını açıklayabilir.",
          "Enerjinin azalmasını otomatik olarak hepsi ısı oldu diye adlandırma; mekanik iş veya başka aktarım verisi gerekir. Bir sınav sorusu yalnız Q ve V’yi istiyorsa önce bunları korunan nicelikle bul; ileri enerji bilançosunu ayrıca kur. Her değişimde C, Q, V, U için küçük tablo tutmak aynı sabiti yanlış iki kez kullanmayı önler."
        ]
      },
      {
        "title": "Şarj, ayırma ve deşarjın devresi",
        "paragraphs": [
          "Kaynakla kapalı yol kurulduğunda ideal sığaç yüklenir; basit doğru akım devresinde uzun süre sonunda akım 0’a yaklaşır. Üreteç yolu açılınca yük levhalarda kalabilir. Yüklü sığaç bir direnç veya lambalı kapalı yola bağlanınca depoladığı enerjiyi aktarır ve yük farkı azalır.",
          "Lamba geçici yanabilir, sonra gerilim farkı azaldıkça söner. Gerçek parlaklık-zaman eğrisi devre elemanlarının özelliklerini gerektirir; sadece C verilerek kesin yanma süresi bulunamaz. Bir sığacı her an sabit gerilimli kimyasal pil gibi göstermek doğru değildir; deşarj olurken kendi V’si değişir."
        ]
      },
      {
        "title": "Kullanım amacını enerjiyle bağla",
        "paragraphs": [
          "Fotoğraf flaşı veya ani güç gerektiren devreler kısa sürede enerji aktarabilen sığaçlardan yararlanabilir. Pil kimyasal süreçlerde saklanan enerjiyi, sığaç elektrik alan enerjisini kullanır. Enerji yoğunluğu ile güç yoğunluğu farklı özelliklerdir; çok enerji saklamakla onu çok hızlı vermek aynı başarı ölçütü değildir.",
          "Gerçek sığacın dayanım gerilimi ve yalıtkan delinmesi önemlidir. C tek başına azami Q’yu belirlemez; uygun çalışma gerilimi de gerekir. Bu öğretim modelinde kaçak, delinme ve malzeme doğrusal olmayan davranışı hesaplanmıyor; belirli bir cihazın güvenli kullanım verisi üretildiği söylenmez."
        ]
      },
      {
        "title": "Bir değişkeni değiştir, deneyi açık tut",
        "paragraphs": [
          "Önce bağlı sığaçta A, d veya εr’den yalnız birini değiştirip C ve Q’yu tahmin et. Sonra aynı başlangıç yükünü koruyarak üreteçten ayır ve geometriyi tekrar değiştir. Aynı düğmeye basılmış gibi görünse de bu iki bağlantı durumu farklı fiziksel deneydir; durum paneli hangisinin seçili olduğunu açık yazar.",
          "Sonuçları Q=C V ve enerji bağıntısıyla geri denetle. Levhalardaki işaretler eşit-zıt, modelin toplam net yükü 0 olabilir; bu Q = 0 demek değildir. Keşif kaydı ayrı saklanır, puan üretmez. Öğrenme kanıtı, bağımsız sorudaki bağlantı koşulunu doğru seçip yeni Q veya V’yi açıklayabilmendir."
        ]
      }
    ],
    "examples": [
      {
        "title": "Alan ve aralıktan sığaya",
        "prompt": "Vakum permitivitesi 8,85×10⁻¹² F/m. Paralel levhaların örtüşen alanı 0,020 m²,aralık 0,001 m; kenar etkileri yok. 100 V’da C, Q, U?",
        "strategy": "Geometri, CV ve½CV² sırasını izle.",
        "steps": [
          {
            "label": "Sığa",
            "expression": "C=8,85×10⁻¹²·0,020/0,001=177 pF",
            "explanation": "A tek örtüşen levha alanıdır."
          },
          {
            "label": "Yük",
            "expression": "Q=177 pF·100 V=17,7 nC",
            "explanation": "Her levhada bu büyüklük var."
          },
          {
            "label": "Enerji",
            "expression": "U=½·177×10⁻¹²·100²=0,885 μJ",
            "explanation": "İki levhanın toplam alan enerjisi."
          }
        ],
        "answer": "177 pF; 17,7 nC; 0,885 μJ",
        "check": "½QV aynı 0,885 μJ verir.",
        "pitfall": "Alanı iki levha var diye iki kat kullanmak."
      },
      {
        "title": "Bağlı sığaçta dielektrik",
        "prompt": "2 μF sığaç ideal 10 V kaynağa bağlı. Geometri aynı, tam dolduran εr=3 dielektrik yerleştiriliyor. Son C, Q, U?",
        "strategy": "Bağlı kaynak V’yi korur.",
        "steps": [
          {
            "label": "Sığa",
            "expression": "Cson=3·2=6 μF",
            "explanation": "Tam doldurma ve doğrusal ortam."
          },
          {
            "label": "Yük",
            "expression": "Qson=6·10=60 μC",
            "explanation": "Kaynak ek 40 μC yük sağlar."
          },
          {
            "label": "Enerji",
            "expression": "Uson=½·6·10²=300 μJ",
            "explanation": "İlk 100 μJ’den artar."
          }
        ],
        "answer": "6 μF; 60 μC; 300 μJ",
        "check": "Qson/Cson=10 V.",
        "pitfall": "Q’yu bağlı deneyde zorla 20 μC bırakmak."
      },
      {
        "title": "Aynı sığaç önce ayrılırsa",
        "prompt": "2 μF sığaç 10 V’da yüklendikten sonra üreteçten ayrılıyor. Kaçak yok. Tam εr=3 dielektrik giriyor. Son Q, V, U?",
        "strategy": "Önce korunan yükü kaydet.",
        "steps": [
          {
            "label": "İlk yük",
            "expression": "Q=2·10=20 μC; Cson=6 μF",
            "explanation": "Bağlantı kesildikten sonra Q korunur."
          },
          {
            "label": "Gerilim",
            "expression": "Vson=20/6=10/3 V",
            "explanation": "Yeni C’ye aynı Q bölünür."
          },
          {
            "label": "Enerji",
            "expression": "Uson=Q²/(2C)=100/3 μJ",
            "explanation": "İlk 100 μJ’nin üçte biri."
          }
        ],
        "answer": "20 μC; 10/3 V; 100/3 μJ",
        "check": "CsonVson=20 μC geri gelir.",
        "pitfall": "Üreteçten ayrılan durumda V’yi 10 V sabit tutmak."
      },
      {
        "title": "Aralığı iki kat yapan iki deney",
        "prompt": "Başlangıç C=2 μF, V=20 V. d iki katına çıkarılıyor, A ve ε aynı. Bir deneyde ideal üreteç bağlı, ötekinde önce ayrılmış. Son Q, V, U?",
        "strategy": "Önce C değişimi, sonra her deneyin sabiti.",
        "steps": [
          {
            "label": "Yeni sığa",
            "expression": "Cson=1 μF; ilk Q=40 μC, U=400 μJ",
            "explanation": "A/d bağı aralığı iki katken C’yi yarılar."
          },
          {
            "label": "Bağlı",
            "expression": "V=20 V; Q=20 μC; U=200 μJ",
            "explanation": "Kaynak gerilimi sabit tutar."
          },
          {
            "label": "İzole",
            "expression": "Q=40 μC; V=40 V; U=800 μJ",
            "explanation": "Aralığı açan dış mekanik iş enerji verebilir."
          }
        ],
        "answer": "Bağlı:20 μC, 20 V, 200 μJ; izole:40 μC, 40 V, 800 μJ",
        "check": "Her iki dalda Q=CV ve U=QV/2.",
        "pitfall": "Aynı anda hem Q hem V sabit demek."
      }
    ],
    "recall": [
      {
        "prompt": "Sığa ve yük arasındaki bağ?",
        "answer": "Q=C|V|; C geometri ve ortamın özelliğidir."
      },
      {
        "prompt": "Üretece bağlı geometri değişiminde hangi nicelik sabit?",
        "answer": "İdeal kaynak gerilimi V."
      },
      {
        "prompt": "Üreteçten ayrılmış, kaçağı olmayan sığaçta?",
        "answer": "Levha serbest yükü Q korunur."
      },
      {
        "prompt": "Depolanan enerji üç eşdeğer biçimde?",
        "answer": "U=QV/2=CV²/2=Q²/(2C)."
      }
    ],
    "items": [
      {
        "prompt": "İdeal 2 μF sığaç 10 V gerilimde. Her levhadaki yük büyüklüğü?",
        "hint": "Q=CV.",
        "explanation": "2 μF·10 V=20 μC. Levhalar +Q ve −Q olduğundan toplam net 0 olması yük büyüklüğünü 0 yapmaz.",
        "options": [
          "20 μC",
          "5 μC",
          "20 C",
          "0,2 μC",
          "10 μC"
        ],
        "answer": 0
      },
      {
        "prompt": "Paralel levhada A ve ε sabit, d iki katına çıkarılıyor. Cson/Cilk?",
        "hint": "C=εA/d.",
        "explanation": "Aralık iki katken sığa yarı olur. Bu geometrik oran, üretecin bağlı veya ayrı oluşundan bağımsızdır.",
        "options": [
          "2",
          "1",
          "1/4",
          "1/2",
          "4"
        ],
        "answer": 3
      },
      {
        "prompt": "İdeal sabit 20 V kaynağa bağlı sığacın C’si 3 μF’den 6 μF’ye çıkıyor. Son Q?",
        "hint": "Bağlı kaynağın V’si sabit.",
        "explanation": "Qson=6·20=120 μC. Başlangıç 60 μC korunmak zorunda değildir; kaynak yük alışverişi sağlar.",
        "options": [
          "60 μC",
          "120 μC",
          "30 μC",
          "240 μC",
          "10 μC"
        ],
        "answer": 1
      },
      {
        "prompt": "Yalıtılmış sığacın Q=20 μC yükü korunuyor. C, 2 μF’den 6 μF’ye çıkıyor. Son V?",
        "hint": "V=Q/C.",
        "explanation": "20/6=10/3 V. Üreteç ayrılmış olduğundan başlangıç 10 V sabit tutulmaz.",
        "options": [
          "10 V",
          "30 V",
          "60 V",
          "0 V",
          "10/3 V"
        ],
        "answer": 4
      },
      {
        "prompt": "İdeal 2 μF sığaç 10 V’da. Depolanan enerji?",
        "hint": "U=½CV².",
        "explanation": "½·2×10⁻⁶·10²=100×10⁻⁶ J. U=QV yazmak yükleme boyunca gerilimin arttığını yok sayıp iki kat sonuç verir.",
        "options": [
          "200 μJ",
          "20 μJ",
          "100 μJ",
          "10 J",
          "100 J"
        ],
        "answer": 2
      },
      {
        "prompt": "Paralel sığaçta alan A iki, permitivite ε üç kat oluyor; d aynı. Cson/Cilk?",
        "hint": "C’de ε ve A doğrusal çarpılır.",
        "explanation": "Cson/Cilk=3·2=6. Gerilim bu geometrik oranı belirleyen nicelik değildir.",
        "options": [
          "3/2",
          "2/3",
          "1/6",
          "6",
          "3"
        ],
        "answer": 3
      },
      {
        "prompt": "Kaçağı olmayan izole sığaçta Q sabit, C iki kat. Uson/Uilk?",
        "hint": "U=Q²/(2C).",
        "explanation": "Aynı Q için C iki katken enerji yarıya iner. Bu değişimin mekanik/başka enerji kanalı ayrıca incelenir; enerji yok olmuş sayılmaz.",
        "options": [
          "2",
          "4",
          "1/2",
          "1/4",
          "1"
        ],
        "answer": 2
      },
      {
        "prompt": "İdeal gerilim kaynağına bağlı sığaçta V sabit, C iki kat. Uson/Uilk?",
        "hint": "U=CV²/2.",
        "explanation": "V sabitken U, C ile doğru orantılıdır ve iki kat olur. İzoleQ sabit deneyinin tersidir.",
        "options": [
          "1/2",
          "2",
          "4",
          "1/4",
          "1"
        ],
        "answer": 1
      },
      {
        "prompt": "Paralel sığacın iki levhasında +Q ve −Q var. Toplam net yük 0. Hangi yorum doğrudur?",
        "hint": "Yük ayrılması ile net toplamı ayır.",
        "explanation": "Eşit-zıt yükler arada alan ve gerilim kurabilir. Q levha başına büyüklüktür; toplamın 0 olması ayrılmış yüklerin etkisini silmez.",
        "options": [
          "Her levhada yük 0’dır.",
          "C mutlaka 0’dır.",
          "V mutlaka 0’dır.",
          "Sığaç yalnız kimyasal enerji üretir.",
          "Alan ve depolanan enerji sıfır olmak zorunda değildir."
        ],
        "answer": 4
      },
      {
        "prompt": "Bir sığaç yüklendikten sonra ideal üreteçten ayrılıyor ve lambalı kapalı yola bağlanıyor. Gerçek devre özellikleri verilmemiş. Güvenli genel yorum?",
        "hint": "Sığaç deşarj olur; kesin süre devre verisi ister.",
        "explanation": "Sığaç depoladığı alan enerjisini devreye aktarabilir. Gerilim ve akım zamanla değişebilir; yalnız C’den kesin yanma süresi çıkarılamaz.",
        "options": [
          "Depolanan enerji aktarılırken gerilim azalabilir; lamba geçici yanabilir.",
          "Sığaç sonsuza kadar sabit gerilim verir.",
          "Kesin 5 dakika yanar.",
          "Yalıtkan sürekli metalik kısa devredir.",
          "Akımın hiç oluşması mümkün değildir."
        ],
        "answer": 0
      }
    ]
  },
  {
    "id": "manyetik-alan-ayt",
    "topic": "detail-380",
    "title": "Manyetik alan: akımın çevresindeki yön haritası",
    "minutes": 130,
    "source": "MEBİ AYT Fizik Konu Özetleri, basılı s. 116–119; OGM Manyetizma ve Elektromanyetik İndüklenme özeti; Dersler Cepte manyetik alan s. 10–12. Uzun bobin formülü doğru L paydasıyla kurulmuş özgün öğretim ve sorular; resmî sınav sorusu değildir.",
    "objectives": [
      "Akım geometrisinden manyetik alanın yönünü ve tesla birimini açıkla.",
      "Uzun tel, halka merkezi, yay ve uzun bobin bağıntılarını doğru yerde kullan.",
      "Birden çok alanı vektörel toplayıp sıfır akım ve simetriyi denetle."
    ],
    "sections": [
      {
        "title": "Pusula, akım ve yeni bir alan",
        "paragraphs": [
          "Akım geçen telin yanındaki pusula ibresinin yön değiştirmesi, telin çevresinde manyetik etki bulunduğunu gösterir. Akımı ters çevirdiğinde sapma yönü de değişebilir. Elektrik akımı hareket eden yüklerle ilişkilidir; akım geometrisi çevredeki manyetik alanın geometrisini belirler.",
          "Pusula ibresinin kuzey ucu yerel bileşke manyetik alan yönüne yönelme eğilimindedir. Dünya alanı ve başka kaynaklar da katkı verebilir; tek tel modeli kullanılırken bu diğer alanlar ihmal edilir. Burada alan B ile gösterilen vektörel büyüklüktür, SI birimi tesla’dır. Kaynağı değiştirerek bir noktadaki B’nin nasıl değiştiğini araştırırız."
        ]
      },
      {
        "title": "Sayfa düzlemini ve yön simgelerini seç",
        "paragraphs": [
          "Sayfada +x sağ, +y yukarı, +z okuyucuya doğru seçersek ⊙ sayfadan dışarı,⊗ sayfanın içine yönü anlatır. Pozitif z yönlü tel akımı, okuyucuya gelen akımdır. Bu işaretleri tanımlamadan yalnız daire/çarpı çizmek üç boyutlu yön sorusunu belirsiz bırakır.",
          "Bütün vektörler sayfa düzleminde olmak zorunda değildir. Sayfaya dik telin çevresinde B sayfa içinde dolaşır; halka sayfa üzerinde yatıyorsa merkezindeki B sayfaya diktir. Aynı⊙ simgesi bir çizimde akımı, başkasında alanı gösterebilir; yanındaki I veya B etiketi hangi nicelik olduğunu belirtmelidir."
        ]
      },
      {
        "title": "Düz tel çevresindeki alan sağ elle bulunur",
        "paragraphs": [
          "Uzun düz teli sağ elin başparmağı akım yönünü gösterecek biçimde kavra; dört parmağın dolanma yönü alan çizgilerinin yönüdür. Çizgiler tel ekseni merkezli çemberlerdir ve bir noktadaki B bu çembere teğettir. Alan radyal dışarı doğru değildir.",
          "Sayfadan dışarı +z akımında sağdaki noktada B yukarı, soldaki noktada aşağıdır; çember dolaşımı saatin tersidir. Akımı−z’ye çevirince bütün bu yönler ters döner. Şekli döndürdüğünde de aynı sağ el kuralı geçerlidir; “telin sağı her zaman içeri” gibi gözlem düzleminden kopmuş ezber kullanılmaz."
        ]
      },
      {
        "title": "Düz telin büyüklüğü ters birinci uzaklıktır",
        "paragraphs": [
          "Vakumda sonsuz uzun tel yaklaşımında B=μ0|I|/(2πr)=2K|I|/r olur; K=10⁻⁷ T·m/A,μ0=4π×10⁻⁷ T·m/A’dır. r tele dik uzaklıktır. Akım iki kat olursa B iki kat, r iki kat olursa B yarı olur. Elektrik alanın noktasal kaynaktaki ters kare bağı burada geçmez.",
          "Örneğin 5 A akımdan 0,10 m uzakta B=2×10⁻⁷·5/0,10=10 μT bulunur. r = 0 tel ekseninde bu ideal ince tel modeli tekildir; gerçek telin yarıçapı ve iç akım dağılımı gerekir. Çözümlü örneklerde gözlem noktası telin dışındadır ve uzun tel yaklaşımının kullanıldığı açık verilir."
        ]
      },
      {
        "title": "Alanları aynı noktada vektörel topla",
        "paragraphs": [
          "Bir gözlem noktasında her telin oluşturduğu B ayrı hesaplanır, yönü sağ elle bulunur ve bileşenleri toplanır. İki akım aynı yönde olsa da aralarındaki orta noktada alanlar zıt olabilir. Akımlar zıt yöndeyse orta noktadaki katkılar aynı yönde toplanabilir.",
          "Kuralı akım işaretlerini cebirsel toplayarak değil, her telden noktaya doğru gerçek konumla uygula. Eşit uzaklıkta eşit akımların alan büyüklükleri eşittir; farklı uzaklıkta aynı I eşit B demek değildir. Düzlemde birbirine dik iki B için büyüklük Pisagorla bulunabilir; genel açıda bileşen toplamı gerekir."
        ]
      },
      {
        "title": "Tel için iki boyutlu yön formülü",
        "paragraphs": [
          "+z yönlü tel (x0; y0) noktasındaysa gözlem noktasına fark Δx,Δy için B=(μ0I/(2πr²))(−Δy;Δx) yazılır. Büyüklüğün 1/r oluşu ile bileşen formülündeki r² çelişmez; paydaki konum farkı bir r daha taşır. İşaretli I akımın dışarı/içeri yönünü içerir.",
          "Örneğin telin sağında Δy=0,Δx>0 olduğunda pozitif I için By>0 çıkar. Üstünde Δx = 0,Δy>0 ise Bx<0’dır. Bu iki sınır sağ el kuralını bağımsız doğrular. Gezgindeki oklar bu hesaplanan bileşenlerden çizilir; yalnız sabit yönlü süs okları değildir."
        ]
      },
      {
        "title": "Halka merkezinde alan eksen boyuncadır",
        "paragraphs": [
          "Yarıçapı R olan tam dairesel telden I akımı geçerse merkezindeki alan büyüklüğü B=μ0|I|/(2R)=2πK|I|/R olur. Alan halka düzlemine diktir. Sağ elin dört parmağını akımın dolaşım yönünde kıvırdığında başparmak merkezdeki B yönünü verir.",
          "Sayfa üzerindeki halkada akım saatin tersine dolaşıyorsa merkez B+z, dışarıdır. N eş merkezli, aynı yarıçaplı ve birbirine çok yakın sarımın ideal katkıları aynı yöndeyse büyüklük N kat olur. Bu formül halkanın her noktasındaki alanı vermez; yalnız merkez için kullanılır."
        ]
      },
      {
        "title": "Yay açısı katkının kesrini belirler",
        "paragraphs": [
          "Tam halkanın yalnız α derecelik yayı için merkez katkısı tam halka alanının α/360’ı olur. Radyan cinsinden B=μ0Iα/(4πR) yazılabilir; iki açı birimini aynı formülde karıştırma. Bir yarım çember tam halkanın yarısı, çeyrek çember dörtte biri kadar merkez katkısı verir.",
          "Bu, belirtilen yay parçasının katkısıdır; akımı taşıyan devrenin diğer tel parçalarının alanı ayrıca bulunabilir. Merkeze göre radyal düz parçalar uygun dış gözlemde çapraz çarpım nedeniyle katkı vermeyebilir; uzak kapanış yolunun ihmal edildiği koşul açık olmalıdır. Gezginde yay seçilince gösterilen sonucun yalnız yay katkısı olduğu yazılır."
        ]
      },
      {
        "title": "Bobinde sarım yoğunluğu alanı güçlendirir",
        "paragraphs": [
          "Uzun, ince, sık sarımlı hava çekirdekli bobinin uçlardan uzak iç ekseninde B≈μ0(N/L)I olur. N toplam sarım sayısı, L sarılı uzunluktur; N/L metre başına sarım yoğunluğudur. Aynı N ve I’de L iki kat olursa sarımlar seyrelir ve iç alan yaklaşık yarıya iner.",
          "Bobin yarıçapı bu uzun-bobin merkez formülünün paydasındaki L’nin yerine geçmez. Tek halkanın merkezindeki 1/R bağıyla bobinin N/L bağını ayrı geometri olarak öğren. Gerçek kısa bobinde uç etkileri ve yarıçap önemlidir; uzun-bobin yaklaşımı bu ayrıntıları çözmüş gibi sunulmaz."
        ]
      },
      {
        "title": "Bobinin yönü ve mıknatıs benzerliği",
        "paragraphs": [
          "Sağ elin dört parmağı sarım akım yönünü izlerken başparmak bobin içindeki alan yönünü verir. Bobin bir elektromıknatıs gibi N ve S uç davranışı gösterebilir. Dışarıdaki alan N’den S’ye, içeride S’den N’ye tamamlanır; manyetik alan çizgileri kapalı yapılar oluşturur.",
          "Akım tersine çevrilince bobinin kutupları ve iç alan yönü ters döner. Akım 0 ise bu ideal hava çekirdekli akım modelinin alanı 0 olur. Kalıcı mıknatıslanma veya ferromanyetik çekirdeğin histerezisi ayrı malzeme davranışlarıdır; bu basit formülden akım kesilince gerçek her çekirdeğin tamamen etkisizleştiği sonucu çıkarılmaz."
        ]
      },
      {
        "title": "Aynı sembol farklı geometride farklı yol ister",
        "paragraphs": [
          "Uzun telde B∝I/r, halka merkezinde B∝NI/R, uzun bobinde B∝NI/L olur. Hepsi akımla orantılı olsa da uzaklık veya uzunluk farklı fiziksel boyutlardır. Önce tel mi, halka mı, bobin mi çizildiğini belirleyip gözlem noktasını adlandırmak doğru formülü seçtirir.",
          "Burada manyetik alanın kaynağını ve bileşkesini öğreniyoruz. Akım taşıyan tele manyetik kuvvet, yüklü taneciğin manyetik alanda hareketi ve indüksiyon ayrı sonraki konulardır. Bir B haritası çizmek taneciğin bu çizgi boyunca hareket edeceğini söylemez; alan çizgisini yörüngeyle özdeşleştirme."
        ]
      },
      {
        "title": "Hesabı yön, birim ve sınırla denetle",
        "paragraphs": [
          "T·m/A çarpı A/m tesla vermelidir. Akımın işareti ters dönünce aynı geometride bütün B vektörleri ters dönmeli; iki eşit akımın orta noktasındaki simetrik iptal korunmalıdır. Halka akımı 0 veya yay açısı 0 olursa seçili katkı 0 olur; tam 360° yay tam halka sonucuna dönmelidir.",
          "Önce bir noktada alanın yönünü tahmin et, sonra modelin vektör bileşenleriyle karşılaştır. Yön kadar büyüklük oranını da açıklamayı dene. Keşif seçimi ve gerekçe ayrı saklanır; bağımsız doğru cevap veya XP üretmez. Öğrenme, başka geometri verilince kaynağı ve gözlem noktasını doğru seçerek devam eder."
        ]
      }
    ],
    "examples": [
      {
        "title": "Uzun telin yakınında",
        "prompt": "Vakumda sonsuz uzun tel yaklaşımı, I=5 A. Nokta tele dik 0,10 m uzakta. K=10⁻⁷ T·m/A. Alan büyüklüğü?",
        "strategy": "Düz tel bağıntısı ve SI uzaklığı.",
        "steps": [
          {
            "label": "Bağıntı",
            "expression": "B=2KI/r",
            "explanation": "Nokta telin dışında."
          },
          {
            "label": "Hesap",
            "expression": "B=2×10⁻⁷·5/0,10=10⁻⁵ T",
            "explanation": "Metre kullanıldı."
          },
          {
            "label": "Birim",
            "expression": "10⁻⁵ T=10 μT",
            "explanation": "Mikro öneki 10⁻⁶’dır."
          }
        ],
        "answer": "10 μT",
        "check": "r iki kat olsaydı 5 μT.",
        "pitfall": "Noktasal elektrik alan gibi r² kullanmak."
      },
      {
        "title": "Orta noktada akımı ters çevir",
        "prompt": "Sayfaya dik iki uzun tel x=±0,10 m’de. Her biri 5 A. Önce ikisi dışarı, sonra sağdaki içeri. Orta noktada alan?",
        "strategy": "Her telin katkısını sağ elle yönlendir.",
        "steps": [
          {
            "label": "Tek katkı",
            "expression": "B0=2×10⁻⁷·5/0,10=10 μT",
            "explanation": "Uzaklıklar eşit."
          },
          {
            "label": "Aynı akım",
            "expression": "Soldan+y, sağdan−y → Bnet 0",
            "explanation": "Eşit ve zıt katkılar."
          },
          {
            "label": "Sağ ters",
            "expression": "İki katkı da+y → Bnet 20 μT",
            "explanation": "Büyüklükler bu kez toplanır."
          }
        ],
        "answer": "İlk 0; sonra 20 μT yukarı",
        "check": "Her telin akım büyüklüğü değişmedi; yalnız sağdaki yön döndü.",
        "pitfall": "İki akımı aynı işaret diye alanları otomatik toplamak."
      },
      {
        "title": "Dört sarımlı halka",
        "prompt": "Vakumda yarıçap 0,10 m, dört eş ve yakın sarım, her birinde 3 A. Merkez alanı? μ0=4π×10⁻⁷.",
        "strategy": "Tek halka sonucunu sarım sayısıyla çarp.",
        "steps": [
          {
            "label": "Tek halka",
            "expression": "B1=μ0·3/(2·0,10)=6π μT",
            "explanation": "Gözlem tam merkezde."
          },
          {
            "label": "Dört sarım",
            "expression": "B=4B1=24π μT",
            "explanation": "Katkılar aynı yönlü."
          },
          {
            "label": "Yaklaşık",
            "expression": "B≈75,398 μT",
            "explanation": "Yön sağ elin başparmağıyla bulunur."
          }
        ],
        "answer": "24π μT",
        "check": "N iki kat olsa B iki kat olur.",
        "pitfall": "Uzun telin 2KI/r formülünde sarım çarpanını unutmak."
      },
      {
        "title": "Uzun bobinin yoğunluğu",
        "prompt": "500 sarım, 0,50 m sarılı uzunluk, 2 A akım; uzun hava çekirdekli bobinin uçlardan uzak iç bölgesi. μ0=4π×10⁻⁷. B?",
        "strategy": "Önce N/L sonra μ0 n I.",
        "steps": [
          {
            "label": "Yoğunluk",
            "expression": "n=500/0,50=1000 m⁻¹",
            "explanation": "L sarılı uzunluktur."
          },
          {
            "label": "Alan",
            "expression": "B=4π×10⁻⁷·1000·2=8π×10⁻⁴ T",
            "explanation": "Uzun-bobin yaklaşımı."
          },
          {
            "label": "Dönüşüm",
            "expression": "B≈2,513 mT",
            "explanation": "1 mT=10⁻³ T."
          }
        ],
        "answer": "8π×10⁻⁴ T≈2,513 mT",
        "check": "Aynı N, I ile L = 1 m olursa alan yarı.",
        "pitfall": "Paydaya bobin yarıçapı koymak."
      }
    ],
    "recall": [
      {
        "prompt": "Uzun telde B uzaklıkla nasıl değişir?",
        "answer": "1/r; ters kare değil."
      },
      {
        "prompt": "Sayfadan dışarı +z akımda telin sağındaki B?",
        "answer": "+y, yukarı."
      },
      {
        "prompt": "Halka merkezinde N tur için alan büyüklüğü?",
        "answer": "μ0N|I|/(2R)."
      },
      {
        "prompt": "Uzun bobinde paydadaki uzunluk?",
        "answer": "L, sarılı bobin uzunluğu; yarıçap değil."
      }
    ],
    "items": [
      {
        "prompt": "Sonsuz uzun tel yaklaşımında vakumda I=5 A, r=0,10 m, K=10⁻⁷ T·m/A. B büyüklüğü?",
        "hint": "B=2KI/r.",
        "explanation": "2×10⁻⁷·5/0,10=10⁻⁵ T=10 μT. r tele dik uzaklıktır.",
        "options": [
          "5 μT",
          "100 μT",
          "1 μT",
          "10 μT",
          "0,1 μT"
        ],
        "answer": 3
      },
      {
        "prompt": "Aynı uzun telin akımı sabit. Gözlem uzaklığı r’den 3r’ye çıkıyor. Bson/Bilk?",
        "hint": "Uzun tel bağı 1/r.",
        "explanation": "Manyetik alan büyüklüğü üç kat uzaklıkta üçte bire iner. 1/r² başka geometriye ait bağıntıdır.",
        "options": [
          "1/9",
          "3",
          "1/3",
          "9",
          "1"
        ],
        "answer": 2
      },
      {
        "prompt": "Tel sayfaya dik, +z yönünde okuyucuya akım taşıyor. Telin sağındaki noktada B yönü?",
        "hint": "Başparmak dışarı; parmaklar saatin tersine.",
        "explanation": "+z akım için alan sayfada saatin tersine dolaşır. Sağdaki teğet yukarıdır; alan radyal değildir.",
        "options": [
          "Yukarı, +y.",
          "Aşağı, −y.",
          "Sağa, +x.",
          "Sola, −x.",
          "Sayfanın içine, −z."
        ],
        "answer": 0
      },
      {
        "prompt": "İki eşit uzun tel x=±0,10 m’de; sayfadan dışarı eşit 5 A akım. Başka alan yok. Orta noktada B?",
        "hint": "İki sağ el yönünü ayrı çiz.",
        "explanation": "Sol tel orta noktada yukarı, sağ tel aşağı eşit katkı verir. Vektör toplam 0 olur.",
        "options": [
          "20 μT yukarı",
          "10 μT yukarı",
          "20 μT aşağı",
          "10 μT sağa",
          "0 T"
        ],
        "answer": 4
      },
      {
        "prompt": "İki uzun tel x=±0,10 m’de. Solda +z yönünde 5 A, sağda −z yönünde 5 A. K=10⁻⁷. Orta noktada B?",
        "hint": "Her katkı 10 μT, ikisi de+y.",
        "explanation": "Sol+z telin sağında alan +y; sağ−z telin solunda yine+y. Toplam 20 μT olur.",
        "options": [
          "0 T",
          "20 μT yukarı",
          "10 μT yukarı",
          "20 μT aşağı",
          "10 μT sağa"
        ],
        "answer": 1
      },
      {
        "prompt": "Tam dairesel telin merkez alanı B0. Aynı R ve I ile yalnız 90° yay katkısı soruluyor; diğer parçaların katkısı ihmal. Sonuç?",
        "hint": "Yay açısı 360°’nin dörtte biri.",
        "explanation": "Merkezde verilen yay katkısı tam halkanın α/360 oranıdır. Bu, diğer devre parçalarının alanının otomatik 0 olduğu genellemesi değildir.",
        "options": [
          "B0/2",
          "B0",
          "B0/4",
          "4B0",
          "0"
        ],
        "answer": 2
      },
      {
        "prompt": "Halka merkezinde tek tur B0 üretiyor. Aynı R ve I’de dört eş, aynı yönlü ve çok yakın sarım için B?",
        "hint": "Merkez katkıları aynı yönde toplanır.",
        "explanation": "Her tur aynı B0 verdiğinden N = 4 için 4B0. Merkez ve yakın-eş-sarım koşulları kökte verildi.",
        "options": [
          "B0/4",
          "2B0",
          "B0",
          "16B0",
          "4B0"
        ],
        "answer": 4
      },
      {
        "prompt": "Uzun hava bobininde N, I sabitken sarılı uzunluk L’den 2L’ye çıkıyor. Uçlardan uzak iç Bson/Bilk?",
        "hint": "B≈μ0NI/L.",
        "explanation": "Sarım yoğunluğu yarıya iner, alan da yarı olur. Tek halka yarıçap bağıntısıyla karıştırılmaz.",
        "options": [
          "2",
          "1",
          "1/4",
          "1/2",
          "4"
        ],
        "answer": 3
      },
      {
        "prompt": "N=500,I=2 A, L=0,50 m uzun hava bobini;μ0=4π×10⁻⁷. İç merkez alanı?",
        "hint": "N/L=1000 m⁻¹.",
        "explanation": "4π×10⁻⁷·1000·2=8π×10⁻⁴ T. Payda bobin uzunluğudur.",
        "options": [
          "4π×10⁻⁴ T",
          "8π×10⁻⁴ T",
          "8π×10⁻⁷ T",
          "2π×10⁻³ T",
          "8π T"
        ],
        "answer": 1
      },
      {
        "prompt": "Geometrisi aynı hava bobininde akım I’den−I’ye çevriliyor. Bu ideal akım alanı için ne olur?",
        "hint": "B akımla işaretli doğrusal orantılıdır.",
        "explanation": "Akım dolaşımı ters dönünce sağ el başparmağı da ters yön gösterir. Hava çekirdekli ideal modelde büyüklük değişmez.",
        "options": [
          "B aynı büyüklükte ters yöne döner.",
          "B büyüklüğü iki kat olur.",
          "B yönü aynı kalır.",
          "B mutlaka 0 olur.",
          "Bobin uzunluğu negatif olur."
        ],
        "answer": 0
      }
    ]
  }
];
const extra = {
  "id": "elektrik-alan-ileri",
  "topic": "detail-375",
  "title": "Elektrik alan: ileri soru seti",
  "minutes": 30,
  "source": "MEBİ AYT Fizik Konu Özetleri, basılı s. 103–104 ve 111; OGM Elektriksel Kuvvet ve Elektrik Alan ile Paralel Levhalar özetlerinin gerçek şekilleri; Dersler Cepte s. 11–16. Mevcut rehberi koruyarak eklenen özgün ileri açıklamalar ve çözümler; eski tek-kaynak modeli değiştirilmez.",
  "objectives": [
    "Mevcut elektrik alan öğretimini yeni bağımsız problemlerle uygula."
  ],
  "sections": [],
  "examples": [],
  "recall": [],
  "items": [
    {
      "prompt": "Gözlem O=(0; 0) m. Kaynak+2 μC(−1; 0),+1 μC(0; −1) m’de; k=9×10⁹. Net E bileşenleri?",
      "hint": "Soldaki kaynak sağa, alttaki yukarı alan verir.",
      "explanation": "Büyüklükler 18000 ve 9000 N/C; doğrultular dik. Bileşenler (18000; 9000), net büyüklük 9000√5 N/C olur.",
      "options": [
        "(9000; 18000) N/C",
        "(18000; 9000) N/C",
        "(−18000; −9000) N/C",
        "(27000; 0) N/C",
        "(0; 27000) N/C"
      ],
      "answer": 1
    },
    {
      "prompt": "Bir noktada E=(18000; 9000) N/C.−2 μC noktasal test yüküne elektrik kuvveti?",
      "hint": "F=qE, her bileşen aynı q ile çarpılır.",
      "explanation": "−2×10⁻⁶ çarpanı iki bileşeni de ters çevirir. Alanın kendisi test yükünün işareti değişti diye dönmez.",
      "options": [
        "(+0,036; +0,018) N",
        "(−0,018; −0,036) N",
        "(0; 0) N",
        "(−0,036; −0,018) N",
        "(−36000; −18000) N"
      ],
      "answer": 3
    },
    {
      "prompt": "+4 μC x = 0,+1 μC x = 3 m’de. İki kaynak arasındaki sıfır alan noktası?",
      "hint": "4/x²=1/(3−x)²,0<x<3.",
      "explanation": "2(3−x)=x →x = 2 m. Daha küçük kaynağa daha yakınken iki alan büyüklüğü eşitlenir.",
      "options": [
        "x = 1 m",
        "x = 1,5 m",
        "x = 0 m",
        "x = 3 m",
        "x = 2 m"
      ],
      "answer": 4
    },
    {
      "prompt": "+4 μC x = 0,−1 μC x = 3 m’de. Eksendeki sonlu sıfır alan noktası?",
      "hint": "Arada yönler aynı; sağ dış bölgeyi çöz.",
      "explanation": "x>3 için 4/x²=1/(x−3)² →2(x−3)=x →x = 6 m. Sol dışta bu kök bölgeyi sağlamaz.",
      "options": [
        "x = 6 m",
        "x = 2 m",
        "x = 1,5 m",
        "x = −6 m",
        "x = 3 m"
      ],
      "answer": 0
    },
    {
      "prompt": "Aynı noktasal sabit kaynak ve aynı nokta, homojen doğrusal ortamın εr değeri 2 katına çıkıyor. Eson/Eilk?",
      "hint": "Noktasal kaynak alanında k=k0/εr.",
      "explanation": "Aynı serbest yük ve geometri için E ters permitiviteyle ölçeklenir. Sadece yalıtkanlık direnci bilgisi bu oranı vermez;εr koşulu açık verildi.",
      "options": [
        "2",
        "1",
        "1/2",
        "1/4",
        "4"
      ],
      "answer": 2
    },
    {
      "prompt": "Geniş iki paralel levha üreteçten ayrılmış, serbest Q korunuyor. A ve ε aynı, d iki kat oluyor; kenar etkisi yok. E nasıl değişir?",
      "hint": "E=Q/(εA).",
      "explanation": "İzoleQ, A,ε aynı olduğundan E aynı; V=Ed iki kat olabilir. BağlıV sabit deneyinin E=V/d karşılaştırması burada uygulanmaz.",
      "options": [
        "İki kat olur.",
        "Yarıya iner.",
        "Dörtte bire iner.",
        "Aynı kalır.",
        "Sıfır olur."
      ],
      "answer": 3
    },
    {
      "prompt": "Elektrostatik dengedeki iletken malzemenin içindeki serbest yükler için makroskopik E?",
      "hint": "Denge serbest yüklerin sürekli sürüklenmemesini gerektirir.",
      "explanation": "Elektrostatik iletkenin iç malzemesinde E = 0’dır. Akım taşıyan gerçek iletken veya içinde ayrı kaynak olan oyuk aynı koşul değildir.",
      "options": [
        "0 N/C",
        "Her noktada pozitif.",
        "Her noktada sonsuz.",
        "Yalnız test yükünün kütlesine bağlı.",
        "Yüzeydeki gerilime eşit bir newton."
      ],
      "answer": 0
    },
    {
      "prompt": "Yüklü taneciğin ilk hızı sağa, elektrik kuvveti yukarı. Diğer kuvvet yok. İlk anda doğru yorum?",
      "hint": "Kuvvet hızın kendisini değil değişimini belirler.",
      "explanation": "a=F/m yukarıdır. İlk yatay hız bileşeni korunurken düşey bileşen gelişir; hareket bileşenlerle birlikte incelenir.",
      "options": [
        "Hız anında yalnız yukarıdır.",
        "İvme sağadır.",
        "İvme yukarı; hız hemen yalnız yukarıya dönüşmez.",
        "Alan çizgisi mutlaka taneciğin yoludur.",
        "Elektrik kuvveti hareket edemez."
      ],
      "answer": 2
    },
    {
      "prompt": "−2 μC, 0,001 kg taneciğin düşey kuvvet dengesi isteniyor. g=10,başka kuvvet yok; yukarı artı. Ey?",
      "hint": "qEy=mg=0,010 N.",
      "explanation": "Ey=0,010/(−2×10⁻⁶)=−5000 N/C, aşağı. Negatif yükte bu alan yukarı elektrik kuvveti verir.",
      "options": [
        "+5000 N/C",
        "−5000 N/C",
        "−10000 N/C",
        "+10000 N/C",
        "0 N/C"
      ],
      "answer": 1
    },
    {
      "prompt": "Sabit kaynakların P noktasında E=(3000; 0) N/C alanı var. Noktasal test yükü+1 nC’den 0’a değiştiriliyor. Hangisi doğrudur?",
      "hint": "Alanı kaynak, kuvveti ayrıca q belirler.",
      "explanation": "F=qE’de q = 0 kuvveti sıfırlar; kaynak düzeni değişmediyse alan 3000 N/C kalır. Gerçek sonlu nötr cismin kutuplanması bu noktasal test modelinin dışındadır.",
      "options": [
        "E = 0,kuvvet aynı olur.",
        "E iki kat olur.",
        "E testin kütlesiyle ters orantılı olur.",
        "Nötr noktasal test mutlaka 0,003 N alır.",
        "Kaynak E aynı kalır; testin elektrik kuvveti 0 olur."
      ],
      "answer": 4
    }
  ]
};
const extension = {
  "id": "elektrik-alan",
  "source": "MEBİ AYT Fizik Konu Özetleri, basılı s. 103–104 ve 111; OGM Elektriksel Kuvvet ve Elektrik Alan ile Paralel Levhalar özetlerinin gerçek şekilleri; Dersler Cepte s. 11–16. Mevcut rehberi koruyarak eklenen özgün ileri açıklamalar ve çözümler; eski tek-kaynak modeli değiştirilmez.",
  "sections": [
    {
      "title": "Deneme yükü gerçek bir coulomb olmak zorunda değildir",
      "paragraphs": [
        "Alanı birim pozitif yük başına kuvvet diye tanımlamak, noktaya gerçekten+1 C gibi çok büyük bir yük konduğu anlamına gelmez. Çok küçük q0 için Felektrik/q0 oranı düşünülür; deneme yükü kaynak dağılımını belirgin değiştirmemelidir. Bu oran kaynağın oluşturduğu yerel E’yi tanımlar.",
        "Örneğin aynı noktada+1 nC için 3 μN, +2 nC için 6 μN ölçülüyorsa iki oran da3000 N/C verir. Negatif deneme yükünde kuvvet ters döner ama yönlü F/q oranı aynı E olur. Yüksüz bir taneciğe kuvvet 0 çıktığında 0/0 bölümüyle alan ölçülmez; alanı kaynak düzeninden veya farklı küçük test yükünden belirleriz."
      ]
    },
    {
      "title": "Bir noktadaki tam iki boyutlu bileşen hesabı",
      "paragraphs": [
        "Kaynak Qi, ri konumunda ve gözlem r’deyse Ei=kQi(r−ri)/|r−ri|³ yazılabilir. Uzaklığın karesi büyüklüğe, bir r daha birim yön vektörüne aittir. Birden çok kaynakta önce Ex ve Ey katkıları ayrı toplanır; net büyüklük en son alınır.",
        "Orijinde gözlem için (−1; 0) m’de +2 μC kaynak sağa 18000 N/C, (0; −1) m’de +1 μC kaynak yukarı 9000 N/C verir. Net (18000; 9000), büyüklük 9000√5 N/C olur. Bu geometride bütün yükler pozitif olsa da katkılar farklı doğrultudadır; iki skaler büyüklüğün 27000 toplamı net büyüklük değildir."
      ]
    },
    {
      "title": "Eşit olmayan aynı işaretli kaynakta sıfır nokta",
      "paragraphs": [
        "Aynı doğru üzerindeki +4 μC x = 0 ve +1 μC x = 3 m kaynaklarının arasında alanlar zıttır. 4/x²=1/(3−x)² büyüklük eşitliği, 0<x<3 bölgesiyle birlikte çözülür. Pozitif uzaklıklarla 2/x=1/(3−x),dolayısıyla x = 2 m bulunur.",
        "Nokta küçük kaynağa 1 m, büyük kaynağa 2 m uzaktadır. Daha büyük kaynak daha uzakta olduğu için iki büyüklük eşitlenir. Kaynakların dışındaki bölgelerde aynı işaretli iki alan aynı yönde olduğundan bu iki-kaynak ekseni için başka sıfır aranmaz. Çözümü hem bölge yönü hem sayısal büyüklükle doğrulamak gerekir."
      ]
    },
    {
      "title": "Eşit olmayan zıt kaynakta dış bölgeyi sınamak",
      "paragraphs": [
        "+4 μC x = 0 ve −1 μC x = 3 m’de olsun. Aralarında iki alan aynı sağa yönlüdür, sıfır olamaz. Sağ dış bölgede x>3 için pozitif kaynağın alanı sağa, negatifin alanı sola olur; 4/x²=1/(x−3)² denklemi 2(x−3)=x ve x = 6 m verir.",
        "Sol dış bölge x<0’da aynı büyüklük eşitliğinin geçerli kökü bulunmaz; hesaptan çıkan x=6 o bölgeyi sağlamaz. Kareli bir denklemden gelen her sayıyı fiziksel nokta saymak yerine bölgeyi geri denetle. İki zıt kaynağın büyüklükleri eşit olsaydı bu eksende sonlu sıfır nokta da bulunmazdı."
      ]
    },
    {
      "title": "İletkenin içindeki yük hareketi neyi öğretir?",
      "paragraphs": [
        "Elektrostatik dengedeki iletken malzemenin içinde makroskopik E olsaydı serbest yükler hareket ederdi. Dengeye ulaşmış durumda iç alan 0 olur ve yükler uygun yüzey dağılımına yerleşir. Bu sonuç iletkenin iç malzemesine aittir; her yalıtkanın veya akım taşıyan her iletkenin içi için aynı biçimde söylenmez.",
        "Boş ve elektrostatik dengedeki kapalı iletken oyuk, uygun koşullarda dış statik alana karşı perdeleme sağlayabilir. Oyuğa ayrıca iç kaynak konursa oyuğun alanı yeniden incelenir. Temel fikir “metal alanı büyülü biçimde yok eder” değil, serbest yüzey yüklerinin dış etkiyi dengeleyen dağılımı kurmasıdır."
      ]
    },
    {
      "title": "Paralel levhada yüzey yüküne yeni bir bağ",
      "paragraphs": [
        "Geniş paralel levhada C=εA/d ve Q=C V birlikte kullanılırsa E=V/d=Q/(εA) elde edilir. Bu, iki levhalı düzenin kenarlardan uzak düzgün alanıdır. Aynı serbest Q ve örtüşen A ile ortam ε değişince E’nin nasıl değiştiği görülebilir.",
        "Aynı A ve ε’de levhalar üreteçten ayrılmışken yalnız d değiştirilirse Q sabit kalabilir ve bu ideal E aynı kalır. Üreteç bağlı V sabitken ise Q yeniden ayarlanır, E=V/d değişir. Bir kaynak veya devre koşulunu sözle seçmek, iki farklı formülün çeliştiği izlenimini ortadan kaldırır."
      ]
    },
    {
      "title": "Alan-kuvvet ivme zincirini negatif yükle tamamla",
      "paragraphs": [
        "Düşey alanı işaretli Ey, yukarıyı artı seç. Elektrik kuvveti qEy, ağırlık−mg olduğundan ay=qEy/m−g olur. Negatif yükte yukarı elektrik kuvveti elde etmek için alan aşağı yönlü olabilir. Yük işaretini ve alan yönünü iki ayrı bilgi olarak işlemek çift eksi hatasını önler.",
        "−2 μC, 0,001 kg tanecikte Ey=−5000 N/C ve g=10 ise qEy=+0,010 N, mg=0,010 N olur. Net kuvvet ve ivme 0; durgunluk veya sabit hız ilk koşula bağlıdır. Aynı alanda yükü +2 μC yapmak elektrik kuvvetini aşağı çevirip net aşağı 0,020 N verir; alan haritası değişmez."
      ]
    },
    {
      "title": "Alan haritasını yerel ölçümlerle geri kur",
      "paragraphs": [
        "Bir çizimde yalnız birkaç ok bulunması, arada alan olmadığı anlamına gelmez; oklar seçili noktaların temsilidir. Her noktada yön ve büyüklük kaynaktan hesaplanabilir. Bir alan çizgisinin teğeti yönü verir, çizgi yoğunluğu ise aynı çizim kuralı içinde göreli büyüklüğü anlatır; çizginin kendisi fiziksel tel veya tanecik yolu değildir.",
        "Bu ek açıklamalar eski tek-kaynak keşfinin sayısal kapsamını büyütmüş sayılmaz; çoklu kaynak ve levha örnekleri burada kendi tam verileriyle çözülür. Eski sorular ve kayıtlar korunur, ileri soru seti ayrıdır. Öğrenme sırası kaynak→gözlem noktası→E→test kuvveti→gerekirse hareket olarak devam eder."
      ]
    }
  ],
  "examples": [
    {
      "title": "Bileşenleri topla, testi sonra ekle",
      "prompt": "Orijindeki noktaya, (−1; 0) m’de +2 μC ve (0; −1) m’de +1 μC kaynak etki ediyor. k=9×10⁹. Net E ve oradaki −2 μC’ye kuvvet?",
      "strategy": "Her kaynak vektörünü ayrı hesapla.",
      "steps": [
        {
          "label": "Katkılar",
          "expression": "E1=(18000; 0),E2=(0; 9000) N/C",
          "explanation": "Kaynaklar gözlemin solunda ve altında."
        },
        {
          "label": "Toplam",
          "expression": "E=(18000; 9000),|E|=9000√5 N/C",
          "explanation": "Dik bileşenler Pisagorla birleştirilir."
        },
        {
          "label": "Kuvvet",
          "expression": "F=−2×10⁻⁶E=(−0,036; −0,018) N",
          "explanation": "Negatif test yükü bütün bileşenleri ters çevirir."
        }
      ],
      "answer": "E(18000; 9000) N/C; F(−0,036; −0,018) N",
      "check": "F/q tekrar aynı E’yi verir.",
      "pitfall": "Alan büyüklüklerini doğrudan 27000 N/C toplamak."
    },
    {
      "title": "İki pozitif kaynakta sıfır",
      "prompt": "+4 μC x = 0,+1 μC x = 3 m’de. İki kaynak arasındaki sıfır E noktasını bul.",
      "strategy": "Önce karşı yönlerin bulunduğu bölgeyi seç.",
      "steps": [
        {
          "label": "Bölge",
          "expression": "0<x<3; alanlar zıt",
          "explanation": "Aynı işaretli kaynakların arasında."
        },
        {
          "label": "Eşitlik",
          "expression": "4/x²=1/(3−x)² →2(3−x)=x",
          "explanation": "Uzaklıklar pozitif."
        },
        {
          "label": "Sonuç",
          "expression": "x=2 m",
          "explanation": "4/4=1/1 büyüklük eşitliği."
        }
      ],
      "answer": "x = 2 m",
      "check": "Küçük kaynağa 1 m, büyüğe 2 m uzakta.",
      "pitfall": "Konumların basit ortalaması 1,5 m almak."
    },
    {
      "title": "Zıt kaynakta dış sıfır",
      "prompt": "+4 μC x = 0,−1 μC x = 3 m’de. Eksende net E = 0 nerede?",
      "strategy": "Arada aynı yönü eleyip dış bölgeyi çöz.",
      "steps": [
        {
          "label": "Aralık",
          "expression": "0<x<3 alanlar sağa, iptal yok",
          "explanation": "Yön denetimi yapılır."
        },
        {
          "label": "Sağ dış",
          "expression": "x>3 için 4/x²=1/(x−3)²",
          "explanation": "İki alan burada zıt."
        },
        {
          "label": "Kök",
          "expression": "2(x−3)=x →x=6 m",
          "explanation": "Sol dış bölge bu kökü sağlamaz."
        }
      ],
      "answer": "x = 6 m",
      "check": "Uzaklıklar 6 ve 3 m; 4/36=1/9.",
      "pitfall": "Aradaki bir kökü yalnız kareli denklemle kabul etmek."
    },
    {
      "title": "Negatif taneciği dengede tut",
      "prompt": "−2 μC, 0,001 kg tanecik için düzgün düşey alan var. g=10; başka kuvvet yok. Dengeyi sağlayan Ey? Yukarı artı.",
      "strategy": "İstenen elektrik kuvvetini ağırlığa zıt kur.",
      "steps": [
        {
          "label": "Ağırlık",
          "expression": "mg=0,010 N aşağı",
          "explanation": "Elektrik kuvveti yukarı +0,010 olmalı."
        },
        {
          "label": "Alan",
          "expression": "qEy=0,010 →Ey=0,010/(−2×10⁻⁶)=−5000 N/C",
          "explanation": "Alan aşağıdır."
        },
        {
          "label": "Kontrol",
          "expression": "qEy−mg=0,010−0,010=0",
          "explanation": "İvme 0 olur."
        }
      ],
      "answer": "Ey=−5000 N/C, aşağı",
      "check": "Negatif q aşağı alanda yukarı kuvvet alır.",
      "pitfall": "Alanı kuvvetle aynı yönde seçmek."
    }
  ],
  "recall": [
    {
      "prompt": "Eşit olmayan aynı işaretli iki kaynakta sıfır nokta nereye yakın?",
      "answer": "Arada, küçük büyüklüklü yüke daha yakın."
    },
    {
      "prompt": "Zıt eşit olmayan kaynaklarda arada E = 0 olur mu?",
      "answer": "Hayır; arada alanlar aynı yöndedir, uygun sıfır dış bölgededir."
    },
    {
      "prompt": "Durgun denge için negatif q’da alan kuvvetle aynı mı?",
      "answer": "Hayır; q<0 elektrik kuvveti alanın tersidir."
    },
    {
      "prompt": "Paralel levhada izole Q için E bağı?",
      "answer": "E=Q/(εA),kenar etkileri ihmal edildiğinde."
    }
  ]
};

export const forge019PhysicsTopics: Record<string,string> = Object.fromEntries([...packs,extra].map(p=>[p.id,p.topic]));
export const forge019PhysicsGuides:LessonGuide[]=packs.map(p=>({id:p.id,minutes:p.minutes,objectives:p.objectives,sections:p.sections,examples:p.examples,recall:p.recall,source:p.source}));
export const forge019PhysicsGuideExtensions:{id:string;sections:GuideSection[];examples:WorkedExample[];recall:{prompt:string;answer:string}[];source:string}[]=[extension];
export const forge019PhysicsLessons:Lesson[]=[...packs,extra].map(p=>({
 id:p.id,subjectId:"ayt-fizik",title:txt(p.title),minutes:p.minutes,objectives:p.objectives.map(txt),body:p.sections.map(s=>({title:txt(s.title),text:txt(s.paragraphs.join("\n\n"))})),source:txt(p.source),tags:[p.topic,"Özgün öğretim soruları",...(p.id===extra.id?["soru-seti"]:[])],
 questions:p.items.map((q,i)=>({id:`f019-${p.id}-${i+1}`,prompt:txt(q.prompt),options:q.options.map(txt),answer:q.answer,hint:txt(q.hint),explanation:txt(q.explanation),skill:p.id})),
}));
