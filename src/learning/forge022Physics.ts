import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";

const within022 = (n: number, lo: number, hi: number) => Number.isFinite(n) && n >= lo && n <= hi;
const TAU022 = 2 * Math.PI;
const z022 = (n: number) => Object.is(n, -0) ? 0 : n;
export type SpringConnection022 = "single" | "series" | "parallel";
function phase022(cycles: number) {
  const phase = (cycles % 1) * TAU022;
  const quarter = (cycles % 1) * 4;
  if (Number.isInteger(quarter)) return { cos: [1, 0, -1, 0][quarter], sin: [0, 1, 0, -1][quarter] };
  return { cos: Math.cos(phase), sin: Math.sin(phase) };
}
/** Ideal massless Hooke springs; x is measured from equilibrium. SI units; time is selected as t/T. */
export function harmonic022(mass: number, firstK: number, secondK: number, connection: SpringConnection022, amplitude: number, cycles: number) {
  if (!within022(mass, .1, 20) || !within022(firstK, 1, 1000) || !within022(secondK, 1, 1000) || !["single", "series", "parallel"].includes(connection) || !within022(amplitude, 0, 1) || !within022(cycles, 0, 2)) throw new RangeError("HARMONIC022_SCOPE");
  const stiffness = connection === "single" ? firstK : connection === "parallel" ? firstK + secondK : firstK * secondK / (firstK + secondK);
  const omega = Math.sqrt(stiffness / mass), period = TAU022 / omega, phase = phase022(cycles);
  const position = z022(amplitude * phase.cos), velocity = z022(-amplitude * omega * phase.sin), acceleration = z022(-omega * omega * position);
  const force = z022(-stiffness * position), potential = stiffness * position * position / 2, kinetic = mass * velocity * velocity / 2;
  return { mass, firstK, secondK, connection, amplitude, cycles, stiffness, omega, period, frequency: 1 / period, time: cycles * period, position, velocity, speed: Math.abs(velocity), acceleration, force, kinetic, potential, energy: stiffness * amplitude * amplitude / 2, oscillating: amplitude > 0, maximumSpeed: omega * amplitude, maximumAcceleration: omega * omega * amplitude };
}
/** Small-angle point pendulum, not the exact large-amplitude elliptic-integral period. */
export function pendulumPeriod022(length: number, gravity: number) {
  if (!within022(length, .05, 20) || !within022(gravity, .1, 30)) throw new RangeError("PENDULUM022_SCOPE");
  const period = TAU022 * Math.sqrt(length / gravity);
  return { period, frequency: 1 / period, omega: Math.sqrt(gravity / length) };
}
function sinc022(z: number) {
  if (Math.abs(z) < 1e-4) return 1 - z * z / 6 + z ** 4 / 120;
  return Math.sin(z) / z;
}
/** Uniform scalar aperture, far-field normalized elevation envelope. cm and Hz; ignores obliquity, dispersion and edge losses. */
export function diffraction022(wavelength: number, width: number, angleDegrees: number, frequency: number) {
  if (!within022(wavelength, .2, 20) || !within022(width, .2, 40) || !within022(angleDegrees, -90, 90) || !within022(frequency, .2, 10)) throw new RangeError("DIFFRACTION022_SCOPE");
  const at = (angle: number) => {
    const beta = Math.PI * (width / wavelength) * Math.sin(angle * Math.PI / 180), signedAmplitude = sinc022(beta);
    return { angle, beta, signedAmplitude, relativeAmplitude: Math.abs(signedAmplitude), relativeEnergy: signedAmplitude * signedAmplitude };
  };
  return { wavelength, width, frequency, speed: wavelength * frequency, ratio: wavelength / width, angleDegrees, ...at(angleDegrees), firstMinimum: wavelength <= width ? Math.asin(wavelength / width) * 180 / Math.PI : null, envelope: Array.from({ length: 181 }, (_, i) => at(i - 90)) };
}
export type Point022 = { x: number; y: number };
/** Constant local amplitudes at the probe; geometric spreading/viscosity ignored. Coherent monochromatic sources at (+/-d/2,0), lengths cm. */
export function interference022(wavelength: number, separation: number, firstAmplitude: number, secondAmplitude: number, phaseDegrees: number, probeX: number, probeY: number, cycles: number) {
  if (!within022(wavelength, 1, 10) || !within022(separation, 2, 20) || !within022(firstAmplitude, 0, 5) || !within022(secondAmplitude, 0, 5) || !within022(phaseDegrees, 0, 360) || !within022(probeX, -25, 25) || !within022(probeY, 0, 30) || !within022(cycles, 0, 2)) throw new RangeError("INTERFERENCE022_SCOPE");
  const first = { x: -separation / 2, y: 0 }, second = { x: separation / 2, y: 0 };
  const firstDistance = Math.hypot(probeX - first.x, probeY), secondDistance = Math.hypot(probeX - second.x, probeY);
  if (Math.min(firstDistance, secondDistance) < .1) throw new RangeError("INTERFERENCE022_SOURCE_CORE");
  const pathDifference = secondDistance - firstDistance, phaseTurns = phaseDegrees / 360 - pathDifference / wavelength, delta = TAU022 * phaseTurns;
  const cosine = Math.cos(delta), sine = Math.sin(delta), firstPhase = TAU022 * (cycles - firstDistance / wavelength);
  const firstHeight = firstAmplitude * Math.cos(firstPhase), secondHeight = secondAmplitude * Math.cos(firstPhase + delta);
  const amplitude = Math.hypot(firstAmplitude + secondAmplitude * cosine, secondAmplitude * sine);
  const both = firstAmplitude > 0 && secondAmplitude > 0;
  // Classify exact integer/half-integer turns; an arbitrary epsilon would erase real small amplitudes near a node.
  const minimum = both && Number.isInteger(phaseTurns - .5), maximum = both && Number.isInteger(phaseTurns);
  const kind = !both ? (firstAmplitude + secondAmplitude === 0 ? "quiet" : "single") : minimum ? (firstAmplitude === secondAmplitude ? "node" : "minimum") : maximum ? "antinode" : "partial";
  const curves: { kind: "node" | "antinode"; pathDifference: number; points: Point022[] }[] = [];
  for (let n = -22; n <= 22; n++) for (const kind of ["node", "antinode"] as const) {
    const q = wavelength * (phaseDegrees / 360 - n - (kind === "node" ? .5 : 0));
    if (Math.abs(q) >= separation) continue; // |q|=d are degenerate exterior rays, deliberately outside this plotted set.
    const a = Math.abs(q) / 2, b = Math.sqrt((separation / 2) ** 2 - a * a);
    curves.push({ kind, pathDifference: q, points: Array.from({ length: 31 }, (_, i) => { const y = i; return { x: q === 0 ? 0 : -Math.sign(q) * a * Math.sqrt(1 + (y / b) ** 2), y }; }) });
  }
  return { wavelength, separation, firstAmplitude, secondAmplitude, phaseDegrees, probe: { x: probeX, y: probeY }, cycles, first, second, firstDistance, secondDistance, pathDifference, phaseDifference: delta, firstHeight, secondHeight, height: kind === "node" ? 0 : firstHeight + secondHeight, amplitude: minimum ? Math.abs(firstAmplitude - secondAmplitude) : maximum ? firstAmplitude + secondAmplitude : amplitude, minimumAmplitude: Math.abs(firstAmplitude - secondAmplitude), maximumAmplitude: firstAmplitude + secondAmplitude, kind, curves, equalAmplitudes: firstAmplitude === secondAmplitude && firstAmplitude > 0 };
}
const packs022 = [
  {
    "id": "basit-harmonik-hareket",
    "topic": "detail-390",
    "title": "Basit harmonik hareket",
    "minutes": 65,
    "objectives": [
      "İşaretli konum, hız ve ivmeyi birlikte yorumla",
      "Yay ve küçük açılı sarkaç periyotlarını karşılaştır",
      "Enerjiden sürati ve özel geçiş sürelerini bul"
    ],
    "sections": [
      {
        "title": "Tekrarlanan hareketten fizik yasasına",
        "paragraphs": [
          "Bir salıncağın gidip gelmesi, metronom veya bir yay ucundaki kütle titreşime örnektir. Aynı durumun aynı hareket yönüyle yinelenmesi periyodu tanımlar. Ancak her periyodik hareket basit harmonik değildir: basit harmonik hareket için dengeye göre ivme a=−ω²x biçiminde olmalı; ω sabit ve pozitiftir.",
          "Sürtünmesiz, doğrusal Hooke yayı bu koşulu sağlar: F_net=−kx ve Newton yasasından a=−(k/m)x. Eksi işareti kuvvetin dengeye yöneldiğini söyler. Büyük açılı sarkaç, sönümlü salınım veya kare dalga biçimindeki bir hareketi yalnız yinelendiği için bu modelle özdeş tutma."
        ]
      },
      {
        "title": "Denge noktası durma noktası değildir",
        "paragraphs": [
          "Yatay ideal yayda denge, net yatay kuvvetin sıfır olduğu konumdur. Cisim buradan geçerken ivme sıfır fakat hızı genellikle en büyüktür. Cisim dengeye gelip kalmak zorunda değildir; Newton yasası kuvveti hıza değil hızın değişimine bağlar.",
          "Düşey yayda denge uzaması mg/k olur; bu noktada yayın kuvveti ağırlığı dengeler. x koordinatını bu yeni dengeden ölçersen net kuvvet yine −kx olur. Yayın doğal boyundan ölçülen uzama ile dengeye göre uzanım aynı nicelik değildir."
        ]
      },
      {
        "title": "Uzanım işaretlidir, genlik bir büyüklüktür",
        "paragraphs": [
          "x eksenini denge O noktasından sağa pozitif seç. Uzanım x, konumun bu eksendeki işaretli bileşenidir; −A ile +A arasında değişir. Genlik A ise en büyük |x| değeridir, negatif olmaz ve SI birimi metredir. Uçlar arasındaki toplam mesafe 2 A olur.",
          "Örneğin uçlar −6 cm ve +6 cm ise A=6 cm, tam salınımda alınan yol 4 A=24 cm olur. Bir periyotta yer değiştirme sıfırdır. Genliği 12 cm sanmak uçlar arasındaki açıklığı, 24 cm sanmak tam çevrim yolunu genlikle karıştırmaktır."
        ]
      },
      {
        "title": "Periyot, frekans ve açısal frekans",
        "paragraphs": [
          "Periyot T bir tam çevrimin süresi, frekans f saniyedeki çevrim sayısıdır: f=1/T ve ω=2πf=2π/T. T saniye, f Hz, ω rad/s ile ifade edilir. ω birim zamandaki faz değişimini verir; cismin doğrusal hızını ifade etmez.",
          "Aynı konumdan aynı yönde iki ardışık geçiş T kadar ayrılır. Denge noktasından karşıt yönlü iki geçiş arası T/2, bir uçtan karşı uca süre T/2 olur. İlk gözlenen sıfır geçişini veya ilk tepeye ulaşma süresini koşulsuz periyot diye alma."
        ]
      },
      {
        "title": "Çembersel hareketin izdüşümü",
        "paragraphs": [
          "Yarıçapı A olan bir çemberde sabit ω ile dönen noktanın x eksenindeki izdüşümü x=A cos(ωt+φ) hareketini yapar. Çemberde faz eşit zamanlarda eşit açı ilerler; izdüşüm ise eşit zamanlarda eşit yol almaz. Bu ilişki gerçek bir yay kütlesinin çember çizdiği anlamına gelmez.",
          "φ başlangıç fazıdır; başlangıçtaki konumu ve hareket yönünü birlikte belirler. φ=0 seçersek t=0 anında cisim +A ucundadır ve sola gitmeye başlar. Başlangıcı denge ve sağa hız olarak seçersek sinüs biçimi kullanılır. İki grafik arasındaki faz farkını fiziksel bir çelişki sanma."
        ]
      },
      {
        "title": "Konum, hız ve ivmenin ortak saati",
        "paragraphs": [
          "Bu anlatımda x=A cos(ωt), v=−Aω sin(ωt), a=−Aω² cos(ωt) başlangıcını kullanıyoruz. t=0, T/4, T/2, 3 T/4, T anlarında konum sırasıyla +A, 0, −A, 0, +A olur. Hızın işareti hangi yöne gidildiğini söyler.",
          "Aynı zamanlarda hız 0, −Aω, 0, +Aω, 0; ivme −Aω², 0, +Aω², 0, −Aω² olur. Konum ile ivme ters fazlıdır. Kuvvet ile ivme aynı yönlüdür; hız ile kuvvet bazen aynı, bazen zıt yönlü olur. Bu yüzden kuvveti her an hıza zıt çizme."
        ]
      },
      {
        "title": "Konuma bakarak hızın büyüklüğünü bul",
        "paragraphs": [
          "v²=ω²(A²−x²), dolayısıyla sürat |v|=ω√(A²−x²) olur. Denge noktasında sürat Aω, uçlarda sıfırdır. Aynı x konumundan iki farklı yönde geçilebileceği için yalnız x ve A verilmesi hızın işaretini belirlemez.",
          "Sürat uzanıma ters orantılı değildir: |v|=C/|x| gibi bir yasa yoktur. Örneğin |x|=A/2 için sürat √3 Aω/2, |x|=0 için sonlu Aω olur. Grafik v–x düzleminde kapalı elips oluşturur; sürat–|x| eğrisi doğru değildir."
        ]
      },
      {
        "title": "İvme ve geri çağırıcı kuvvet grafikleri",
        "paragraphs": [
          "a–x grafiği orijinden geçen, eğimi −ω² olan bir doğrudur; F_net–x eğimi −k olur. x pozitifse ivme ve kuvvet negatif, x negatifse ikisi pozitif olur. En büyük büyüklükler a_maks=ω²A ve F_maks=kA değerleridir.",
          "Dengeye yaklaşırken kuvvetin büyüklüğü azalmasına rağmen cisim hızlanabilir: kuvvet ile hız aynı yöndedir. Dengeden uzaklaşırken kuvvet büyürken sürat azalır: kuvvet ile hız ters yönlüdür. Hızlanmayı kuvvetin büyüklüğünün artmasıyla eş anlamlı görme."
        ]
      },
      {
        "title": "Eşit yollar neden eşit sürmez?",
        "paragraphs": [
          "Bir uçtan dengeye varış T/4 sürer. +A ucundan ilk kez +A/2 konumuna varışta cos(ωt)=1/2 olur; faz π/3 ve süre T/6 çıkar. +A/2’den dengeye kalan süre T/12’dir. Aynı uzunluktaki bu iki yol farklı süratlerle alınır.",
          "Dengeden dışarı hareket için sıralama ters okunur: ilk A/2 yol T/12, sonraki A/2 yol T/6 sürer. Önce başlangıç konumunu ve yönünü belirt, sonra ilk geçişi seç. Bir çevrimde aynı konuma yeniden gelindiği için ters trigonometrik değer tek başına her geçiş zamanını vermez."
        ]
      },
      {
        "title": "Enerji iki biçim arasında akar",
        "paragraphs": [
          "Yatay ideal yayda potansiyel enerji U=kx²/2 ve kinetik enerji K=mv²/2 olur. Toplam E=kA²/2 sabittir. Dengeye yaklaşırken U azalır, K artar; uçta K=0 ve U=E, dengede U=0 ve K=E olur. Potansiyel sıfırını dengeye göre seçtik.",
          "Düşey yayda bu U, yerçekimi ile yayın birlikte oluşturduğu etkin potansiyelin dengeye göre değişimidir. Yalnız doğal boya göre yay enerjisini kullanıp yerçekimini atlama. Modelde A iki katına çıkarsa E dört katına çıkar; T ise ideal doğrusal koşullarda aynı kalır."
        ]
      },
      {
        "title": "Yay periyodunu hangi değişken belirler?",
        "paragraphs": [
          "T=2π√(m/k) bağıntısı kütlesiz ideal yay, sabit m, doğrusal yay sabiti ve ihmal edilen sönüm için geçerlidir. m dört katına çıkarsa T iki katına; k dört katına çıkarsa T yarıya iner. Frekans bunların ters oranıyla değişir.",
          "Genlik değiştirmek bu koşullarda T’yi değiştirmez; maksimum hız ve enerji değişir. Yerçekimi düşey yayın denge konumunu değiştirir, doğal salınım periyodunu değiştirmez. Gerçek yayın kütlesi, doğrusal olmayan uzaması veya büyük sönüm devreye girerse bu basit formülün varsayımları yeniden incelenir."
        ]
      },
      {
        "title": "Seri yaylarda uzamalar toplanır",
        "paragraphs": [
          "Kütlesiz iki yayı uç uca seri bağlayıp aynı doğrultuda gerdiğimizde ortak kuvvet F için toplam uzama F/k₁+F/k₂ olur. Bu yüzden 1/k_eş=1/k₁+1/k₂; iki yay için k_eş=k₁k₂/(k₁+k₂) elde edilir. Seri sistem tek tek yaylardan daha yumuşaktır.",
          "Bu sistemin ucundaki tek m kütlesi için T=2π√(m/k_eş) kullanılır. Ara bağlantıların ek kütlesi varsa birden fazla titreşim modu doğabilir; bu tek kütleli model yetmez. Formülü uygulamadan önce gerçekten aynı kuvveti taşıyan uç uca yaylar olduğunu kontrol et."
        ]
      },
      {
        "title": "Paralel yaylar kuvveti paylaşır",
        "paragraphs": [
          "Aynı kütleye bağlı iki yay aynı x miktarında uzuyorsa geri çağırıcı kuvvetler toplanır: F=−(k₁+k₂)x. Dolayısıyla k_eş=k₁+k₂ olur. Kütlenin iki yanındaki sabit duvarlara bağlı yaylar da küçük yatay hareket boyunca iki geri çağırıcı katkı üretir.",
          "Aynı iki eşit yay için seri k/2, paralel 2 k verir; aynı m ile periyotlar oranı T_seri/T_paralel=2 olur. Yalnız çizimde yan yana görünmelerine göre karar verme: hangi yayların aynı uzamayı, hangilerinin aynı kuvveti paylaştığını incele."
        ]
      },
      {
        "title": "Yay kesmek yay sabitini değiştirir",
        "paragraphs": [
          "Aynı malzeme ve kesitteki düzgün bir yayın yay sabiti boyuyla ters orantılıdır. Uzunluğun yarısı olan parça yaklaşık 2 k yay sabitine sahiptir. Bu sonuç yayın geometrisi ve doğrusal esnekliği aynı kaldığında kullanılır; farklı malzeme veya kalınlık için yalnız boy oranı yetmez.",
          "Başlangıç yayı iki eşit parçaya kesip parçaları paralel bağlarsan eşdeğer sabit 2 k+2 k=4 k olur. Aynı m kütlesinin periyodu yarıya iner. Kesilmiş her parçayı eski k ile almak hem bağlantıyı hem malzeme değişimini aynı işlem sanma hatasıdır."
        ]
      },
      {
        "title": "Basit sarkaçta hangi kuvvet geri çağırır?",
        "paragraphs": [
          "Basit sarkaç, kütlesiz ve uzamayan L ipinin ucundaki noktasal kütleyle modellenir. Ağırlığın yörüngeye teğet bileşeni −mg sinθ dengeye yönelir. İp gerilmesi ideal dairesel yola diktir ve teğetsel geri çağırıcı kuvvet değildir.",
          "En alt noktada teğetsel ivme sıfır olabilir ama cisim hareketliyse radyal ivme v²/L vardır; T_ip−mg=mv²/L olur. Yay modelindeki “dengede net kuvvet sıfır” cümlesini sarkacın bütün vektörel kuvvetlerine aynen taşıma. Alt noktada yalnız teğetsel net kuvvet sıfırdır."
        ]
      },
      {
        "title": "Küçük açı yaklaşımının gerçek anlamı",
        "paragraphs": [
          "θ radyanla küçükken sinθ≈θ olur. Yay uzunluğu s=Lθ için a_teğet≈−(g/L)s elde edilir; böylece T≈2π√(L/g). Bu bir yaklaşımdır: 5° veya 10° evrensel keskin fizik sınırı değildir, istenen doğrulukla ilgili küçük açı örnekleridir.",
          "Büyük genlikte ideal sarkacın periyodu genlikle artar; küçük açı formülünü koşulsuz kullanma. Bu yaklaşımda kütle ve küçük başlangıç açısı T’yi değiştirmez. L dört katına çıkarsa T iki katına; g dört katına çıkarsa T yarıya iner. g=0 için sıradan asılı sarkaç geri çağırması yoktur."
        ]
      },
      {
        "title": "Saatler, titreşim ve rezonans",
        "paragraphs": [
          "Sarkaçlı saatte etkin L ve g zaman ölçüsünü etkiler; g artınca küçük açılı sarkaç daha kısa sürede salınır. Kütle değişimini doğrudan saat hızına bağlamak ideal formüle uymaz. Denge konumunu değiştiren bir dış etkiyle periyodu değiştiren bir dış etkiyi ayrı düşün.",
          "Gerçek salınımda sürtünme enerjiyi azaltır ve genlik söner. Sürekli dış etkiyle zorlanan sistemde sürücü frekansı doğal frekansa yakınsa rezonansla büyük yanıt oluşabilir; sönüm ve doğrusal olmayan etkiler bunu sınırlar. Binalar, araç süspansiyonu ve ölçüm aygıtları bu yüzden yalnız tek ideal yaydan ibaret değildir."
        ]
      },
      {
        "title": "Bir soruya başlarken dört kontrol",
        "paragraphs": [
          "Önce denge referansını ve pozitif yönü yaz; sonra başlangıçtaki konum ile hızı belirle. Verilenin periyot mu, ilk geçiş süresi mi olduğunu ayır. Kuvvet–konum verisinden k, ivme–konum verisinden ω², konum–zaman grafiğinden A ve T bulunabilir.",
          "Sonuç kontrolünde uçta hızın sıfır, dengede ivmenin sıfır ve toplam enerjinin sabit olmasını sına. A=0 seçilirse cisim denge noktasında kalır; sistemin doğal periyodu tanımlı olsa da görünür bir salınım gerçekleşmez. Etkileşimli modelde süre geçirmek öğrenme veya doğru soru kanıtı oluşturmaz."
        ]
      }
    ],
    "examples": [
      {
        "title": "Bir anda dört nicelik",
        "prompt": "İdeal yatay yayda m=2 kg, k=50 N/m, A=0,20 m. Cisim +A ucundan bırakılıyor. İlk kez x=+0,12 m konumuna sola giderken v, a, F ve toplam enerji nedir?",
        "strategy": "Önce ω’yi ve sürati bul; hareket yönüyle hızın işaretini seç.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "ω=√(50/2)=5 rad/s. |v|=5√(0,20²−0,12²)=0,80 m/s; sola gittiği için v=−0,80 m/s."
          },
          {
            "label": "Adım 2",
            "explanation": "a=−25×0,12=−3 m/s² ve F=−50×0,12=−6 N."
          },
          {
            "label": "Adım 3",
            "explanation": "E=50×0,20²/2=1 J. K=2×0,80²/2=0,64 J, U=50×0,12²/2=0,36 J."
          }
        ],
        "answer": "v=−0,80 m/s; a=−3 m/s²; F=−6 N; E=1 J.",
        "check": "K+U=0,64+0,36=1 J; kuvvet ile hız burada aynı yönde.",
        "pitfall": "Sürati negatif yazma; negatif olan seçili eksendeki hız bileşenidir."
      },
      {
        "title": "Eşit yol, farklı zaman",
        "prompt": "Bir cisim +A ucundan bırakılıyor ve periyodu 12 s. İlk kez +A/2’ye varış süresi ve bundan sonra dengeye varmak için geçen ek süre nedir?",
        "strategy": "A cos(ωt) fazını ilk gidiş kolunda kullan.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "+A→+A/2 için cosφ=1/2, φ=π/3; geçen süre T/6=2 s."
          },
          {
            "label": "Adım 2",
            "explanation": "+A→0 için φ=π/2, geçen toplam süre T/4=3 s."
          },
          {
            "label": "Adım 3",
            "explanation": "+A/2→0 aralığı 3−2=1 s; aynı A/2 yolu daha yüksek süratle alınır."
          }
        ],
        "answer": "İlk parça 2 s, ikinci parça 1 s.",
        "check": "İkisi toplam T/4=3 s eder.",
        "pitfall": "İki yol eşit diye zamanı 1,5 s ve 1,5 s paylaşma."
      },
      {
        "title": "Seri ile paraleli karşılaştır",
        "prompt": "k₁=k₂=40 N/m olan kütlesiz yaylar önce seri, sonra paralel bağlanıyor. Aynı m=2 kg kütle için iki periyodu ve oranı bul.",
        "strategy": "Önce bağlantının eşdeğer k değerini bul.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Seride k_eş=40×40/80=20 N/m; T_s=2π√(2/20)=2π/√10 s."
          },
          {
            "label": "Adım 2",
            "explanation": "Paralelde k_eş=80 N/m; T_p=2π√(2/80)=π/√10 s."
          },
          {
            "label": "Adım 3",
            "explanation": "T_s/T_p=2. Aynı kütle için daha yumuşak sistem daha yavaş salınır."
          }
        ],
        "answer": "T_s=2π/√10 s; T_p=π/√10 s; oran 2.",
        "check": "T_s/T_p=√(80/20)=2 kısa yolu aynı sonucu verir.",
        "pitfall": "Seride kuvvet, paralelde uzama eşitliği kullanılır."
      },
      {
        "title": "Düşey yayın yeni dengesi",
        "prompt": "m=1 kg cisim k=100 N/m düşey ideal yaya asılıyor. g=10 m/s². Sonra dengeye göre 4 cm genlikle salındırılıyor. Denge uzaması ve doğal periyot nedir?",
        "strategy": "Doğal boy uzamasıyla denge etrafındaki uzanımı ayır.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Dengede kΔℓ=mg, Δℓ=10/100=0,10 m."
          },
          {
            "label": "Adım 2",
            "explanation": "Dengeden ölçülen x için F_net=−100 x, ω=10 rad/s."
          },
          {
            "label": "Adım 3",
            "explanation": "T=2π/10=π/5 s; 4 cm genlik bu doğrusal periyodu değiştirmez."
          }
        ],
        "answer": "Denge uzaması 10 cm; T=π/5 s.",
        "check": "Maksimum sürat Aω=0,04×10=0,40 m/s.",
        "pitfall": "0,10 m denge uzamasını salınım genliği sanma."
      },
      {
        "title": "Sarkaç oranı",
        "prompt": "Aynı küçük açılı ideal sarkacın L=1 m, g=10 m/s² koşulundan L=4 m, g=5 m/s² koşuluna geçildiğini düşün. T₂/T₁ nedir?",
        "strategy": "T∝√(L/g) oranını kur.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "İlk L/g=1/10, son L/g=4/5."
          },
          {
            "label": "Adım 2",
            "explanation": "Oran √[(4/5)/(1/10)]=√8=2√2."
          },
          {
            "label": "Adım 3",
            "explanation": "Kütle ve küçük genlikler bu formülde bulunmaz; ikisi de aynı ideal yaklaşımda kalmalıdır."
          }
        ],
        "answer": "T₂/T₁=2√2.",
        "check": "L artışı ve g azalışı ikisi de periyodu artırır.",
        "pitfall": "g yarıya indiğinde T’yi iki katına çıkarmak yerine √2 ile çarp."
      },
      {
        "title": "Yarı enerji konumu",
        "prompt": "k=200 N/m, A=0,10 m ideal yayda kinetik ve potansiyel enerjiler eşit. Olası x değerleri ve her enerji nedir?",
        "strategy": "U=E/2 koşulunu yaz.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "E=200×0,10²/2=1 J. K=U olduğundan her biri 0,50 J."
          },
          {
            "label": "Adım 2",
            "explanation": "kx²/2=kA²/4, buradan x²=A²/2."
          },
          {
            "label": "Adım 3",
            "explanation": "x=±0,10/√2 m=±5√2 cm. Konum tek başına hız yönünü seçmez."
          }
        ],
        "answer": "x=±5√2 cm; K=U=0,50 J.",
        "check": "Her iki konum da −10 cm ile +10 cm arasındadır.",
        "pitfall": "Enerjilerin eşitliğini x=A/2 ile karıştırma."
      }
    ],
    "recall": [
      {
        "prompt": "Dengede kuvvet sıfırsa hız neden sıfır olmak zorunda değil?",
        "answer": "Net kuvvet ivmeyi belirler. A>0 ideal salınımda denge geçişinde hız büyüklüğü en büyük, ivme sıfırdır."
      },
      {
        "prompt": "x verildiğinde v’nin işareti belirli mi?",
        "answer": "Hayır. |v|=ω√(A²−x²) sürati verir; hangi geçiş kolunda olunduğu ayrıca gerekir."
      },
      {
        "prompt": "Bir uçtan dengeye ve ilk A/2’ye süreler nedir?",
        "answer": "Uçtan dengeye T/4; uçtan ilk A/2’ye T/6; kalan A/2 yol T/12 sürer."
      },
      {
        "prompt": "Yay ile küçük açılı sarkacın periyotlarını ayır.",
        "answer": "Yay T=2π√(m/k), sarkaç T≈2π√(L/g). İlki ideal doğrusal, ikincisi ayrıca küçük açı koşulundadır."
      }
    ],
    "items": [
      {
        "prompt": "İdeal yatay yayda m=1 kg ve k=25 N/m. Cisim x=+0,08 m konumundayken ivmesi kaç m/s² olur?",
        "options": [
          "0",
          "−0,32",
          "+2",
          "−2",
          "+0,32"
        ],
        "answer": 3,
        "hint": "a=−(k/m)x.",
        "explanation": "a=−25×0,08=−2 m/s²; dengeye yani negatif yöne yönelir.",
        "guidance": {
          "knowledge": [
            "İdeal yayda geri çağırıcı ivme dengeye yönelir ve uzanımla doğru orantılıdır."
          ],
          "strategy": "Önce k/m oranını bul, sonra verilen pozitif uzanımın yönünü kullan.",
          "steps": [
            "Verilen değerlerle k/m = 25/1 = 25 s⁻² olur.",
            "x = +0,08 m için a = −25 × 0,08 = −2 m/s² hesaplanır.",
            "Cisim dengenin pozitif tarafındadır; negatif ivme dengeye yönelir."
          ],
          "optionReasons": [
            "Sıfır ivme bu yayda x = 0 konumuna aittir; verilen uzanım sıfır değildir.",
            "Yön dengeye uygun olsa da 25 × 0,08 çarpımı 0,32 değil 2 verir.",
            "Büyüklük 2 doğrudur; pozitif yön geri çağırıcı ivmenin yönünü ters çevirir.",
            "Doğru. Hem 2 m/s² büyüklüğü hem negatif yön verilen konuma uygundur.",
            "Hem büyüklük yanlış hesaplanmış hem ivme pozitif uzanıma doğru çevrilmiştir."
          ],
          "commonError": "Eksi işaretini süratin negatif olması gibi okuma; burada işaret ivmenin yönüdür.",
          "check": "Aynı yayda x = −0,08 m olsaydı ivme +2 m/s² olurdu; konum ve ivme ters işaretlidir."
        }
      },
      {
        "prompt": "İdeal yay salınımında A=10 cm, ω=4 rad/s. Cisim x=6 cm konumundan geçerken sürati kaç cm/s olur?",
        "options": [
          "16",
          "64",
          "32",
          "40",
          "24"
        ],
        "answer": 2,
        "hint": "|v|=ω√(A²−x²).",
        "explanation": "|v|=4√(100−36)=4×8=32 cm/s. Yön sorulmadığı için pozitif büyüklük verilir.",
        "guidance": {
          "knowledge": [
            "Sönümsüz yayda enerji korunumu süratin uzanıma bağlı olmasını sağlar."
          ],
          "strategy": "Genlik ve uzanımı aynı cm biriminde kullan; karelerin farkından sonra karekök al.",
          "steps": [
            "A² − x² = 10² − 6² = 100 − 36 = 64 cm² bulunur.",
            "Karekök 8 cm; ω = 4 rad/s ile sürat 4 × 8 = 32 cm/s olur.",
            "Bu konumda gidiş veya dönüş mümkündür; sorulan sürat iki yönde de aynı pozitif büyüklüktür."
          ],
          "optionReasons": [
            "4 × (10 − 6) = 16 işlemi karelerin farkını uzunlukların farkıyla karıştırır.",
            "64, A² − x² değeridir ve birimi cm²’dir; süratin kendisi değildir.",
            "Doğru. 4√64 = 32 cm/s elde edilir.",
            "40 cm/s, denge konumundaki en büyük sürat Aω’dır; x = 6 cm’de daha küçüktür.",
            "24, ωx çarpımıdır; bu konumda gereken kök √(A² − x²) = 8 cm’dir."
          ],
          "commonError": "ωx ifadesini her konumdaki sürat sanma; hız ve konum farklı fazdadır.",
          "check": "32 cm/s, en büyük sürat 40 cm/s’den küçüktür; uçlara yaklaştıkça sürat azalır."
        }
      },
      {
        "prompt": "Bir cisim +A ucundan durgun bırakılıyor. Basit harmonik hareket periyodu 24 s. İlk kez +A/2 konumuna kaç saniyede varır?",
        "options": [
          "4",
          "6",
          "12",
          "3",
          "2"
        ],
        "answer": 0,
        "hint": "cos(2πt/T)=1/2 için ilk pozitif faz π/3.",
        "explanation": "İlk uçtan yarı uzanıma süre T/6=24/6=4 s olur.",
        "guidance": {
          "knowledge": [
            "Uçtan durgun başlayan basit harmonik harekette x/A = cos(2πt/T) kullanılır."
          ],
          "strategy": "İlk varış için kosinüsün 1’den 1/2’ye indiği en küçük pozitif fazı seç.",
          "steps": [
            "Hedef x/A = +1/2 olduğundan ilk faz 2πt/T = π/3 olur.",
            "Buradan t/T = 1/6 çıkar; 24 s periyotta t = 24/6 = 4 s bulunur.",
            "Bir sonraki aynı konum ziyaretini değil, bırakıldıktan sonraki ilk geçişi seçtik."
          ],
          "optionReasons": [
            "Doğru. İlk +A/2 geçişi T/6 = 4 s’de olur.",
            "6 s = T/4 anında cisim +A/2’de değil denge konumundadır.",
            "12 s = T/2 anında cisim karşı uç −A’dadır.",
            "3 s = T/8 anında konum A cos(π/4) = A/√2’dir; A/2 değildir.",
            "2 s = T/12 anında konum A cos(π/6) = √3A/2’dir; henüz A/2’ye inmemiştir."
          ],
          "commonError": "Eşit konum aralıklarının eşit sürede geçildiğini varsayma; sürat yol boyunca değişir.",
          "check": "Bulduğun 4 s, uçtan dengeye varış süresi 6 s’den kısadır; hedef dengeye gelmeden önce karşılaşılır."
        }
      },
      {
        "prompt": "Doğrusal ideal yayda k sabitken kütle 4 m, genlik 2 A yapılıyor. Başlangıç durumuna göre periyot ve toplam enerji nasıl değişir?",
        "options": [
          "İkisi de 2 katına çıkar.",
          "Periyot 4 katına, enerji 2 katına çıkar.",
          "Periyot 2 katına, enerji 4 katına çıkar.",
          "Periyot aynı, enerji 4 katına çıkar.",
          "İkisi de aynı kalır."
        ],
        "answer": 2,
        "hint": "T∝√m; E=kA²/2.",
        "explanation": "Kütle periyodu √4=2 ile, genlik enerjiyi 2²=4 ile çarpar. Enerji bu verilen genlikte kütleden bağımsızdır.",
        "guidance": {
          "knowledge": [
            "İdeal doğrusal yayda periyot kütlenin kareköküne, toplam enerji genliğin karesine bağlıdır."
          ],
          "strategy": "Kütle ve genlik değişimlerini birbirinden bağımsız iki oran olarak hesapla.",
          "steps": [
            "k sabit ve m → 4m olduğundan T_yeni/T_eski = √4 = 2 olur.",
            "A → 2A olduğundan E_yeni/E_eski = (2A)²/A² = 4 olur.",
            "Verilen genlik için E = kA²/2’de m yoktur; kütle çarpanını enerjiye yeniden uygulama."
          ],
          "optionReasons": [
            "Periyot çarpanı 2 doğrudur; enerji genlikle doğrusal değil karesel artar, çarpan 4’tür.",
            "Kütlenin 4 katı periyodu 4 değil 2 kat yapar; enerji de 2 değil 4 kat olur.",
            "Doğru. İki bağımsız oran sırasıyla 2 ve 4’tür.",
            "Enerji çarpanı 4 doğrudur; m dört katına çıktığı için periyot sabit kalmaz.",
            "Hem kütle hem genlik değişmiştir; bu ideal modelde iki nicelik de aynı kalmaz."
          ],
          "commonError": "Genliği periyot formülüne veya kütleyi sabit-genlik enerji formülüne ekleme.",
          "check": "Yeni enerjinin k(2A)²/2 olduğunu açıkça yazınca eski enerjinin dört katı olduğu görülür."
        }
      },
      {
        "prompt": "Eşit k yay sabitli iki kütlesiz yay aynı m kütlesine önce seri, sonra paralel bağlanıyor. T_seri/T_paralel kaçtır?",
        "options": [
          "1",
          "√2",
          "2",
          "1/2",
          "4"
        ],
        "answer": 2,
        "hint": "Seride k/2, paralelde 2 k.",
        "explanation": "Periyot oranı √[(2 k)/(k/2)]=√4=2 olur.",
        "guidance": {
          "knowledge": [
            "Kütlesiz eşit yaylar seride daha küçük, paralelde daha büyük eşdeğer yay sabiti oluşturur."
          ],
          "strategy": "Her bağlantının eşdeğer k değerini bulup periyodun ters karekök ilişkisini kullan.",
          "steps": [
            "İki eşit yay için k_seri = k/2 ve k_paralel = 2k bulunur.",
            "Aynı m ile T_seri/T_paralel = √(k_paralel/k_seri) = √[(2k)/(k/2)] olur.",
            "Kökün içi 4, oran 2’dir; daha yumuşak seri düzenek daha uzun periyot verir."
          ],
          "optionReasons": [
            "Eşdeğer yay sabitleri k/2 ve 2k farklı olduğundan periyotlar eşit değildir.",
            "√2, tek bir iki-kat k değişimini ele alır; iki bağlantının k oranı 4’tür.",
            "Doğru. √4 = 2, seri periyodun paralel periyoda oranıdır.",
            "1/2, istenen oranı ters çevirerek T_paralel/T_seri değerini verir.",
            "4, yay sabitlerinin oranıdır; periyot oranı için karekök gerekir."
          ],
          "commonError": "Seride ve paralelde k değerlerini bulduktan sonra oran yönünü ters çevirmeyi unutma.",
          "check": "T_seri > T_paralel olmalıdır; 1/2 gibi bir sonuç bu fiziksel kontrolü geçmez."
        }
      },
      {
        "prompt": "Küçük açılı ideal sarkaçta L sabitken g dört katına çıkarılıyor; kütle de üç katına çıkarılıyor. Yeni periyot eskisinin kaç katıdır?",
        "options": [
          "1",
          "1/2",
          "√3",
          "1/4",
          "2"
        ],
        "answer": 1,
        "hint": "T≈2π√(L/g); kütle formülde bulunmaz.",
        "explanation": "g dört katına çıkınca T yarıya iner; ideal noktasal kütlenin üç katına çıkması sonucu değiştirmez.",
        "guidance": {
          "knowledge": [
            "Küçük açılı ideal sarkaç periyodu √(L/g) ile değişir; noktasal kütleye bağlı değildir."
          ],
          "strategy": "L sabitken yalnız periyoda giren g değişimini değerlendir.",
          "steps": [
            "Yeni yerçekimi 4g olduğundan L/g oranı eski değerinin 1/4’üne iner.",
            "Periyot bu oranın kareköküyle değişir: T_yeni/T_eski = √(1/4) = 1/2.",
            "Üç kat kütle kuvveti ve eylemsizliği aynı oranda artırır; ideal küçük-açı sonucu değişmez."
          ],
          "optionReasons": [
            "Kütlenin etkisiz olması doğrudur; fakat g’nin dört kat olması periyodu değiştirir.",
            "Doğru. Yerçekimi değişimi periyodu yarıya indirir.",
            "√3, sarkacı yay gibi kütleye bağlı sayar; burada kütle periyot formülünde yoktur.",
            "1/4, L/g oranıdır; periyot için karekök alındığında 1/2 olur.",
            "Daha büyük g periyodu uzatmaz; geri çağırıcı etki güçlenir ve süre kısalır."
          ],
          "commonError": "Sarkaçtaki kütle bağımsızlığını yay salınımının kütle bağımlılığıyla karıştırma.",
          "check": "g artınca periyot azalmalı; bulunan 1/2 çarpanı bu yön kontrolüne uyar."
        }
      },
      {
        "prompt": "A>0 ile ideal yatay yayda cisim denge konumundan geçiyor. Hangi ifade doğrudur?",
        "options": [
          "Kinetik enerji sıfırdır.",
          "İvme en büyük, sürat sıfırdır.",
          "Hız ve ivme sıfırdır.",
          "İvme sıfır, sürat en büyüktür.",
          "Net kuvvetin büyüklüğü en büyüktür."
        ],
        "answer": 3,
        "hint": "F=−kx ve |v|=ω√(A²−x²) içinde x=0 koy.",
        "explanation": "x=0 için F ve a sıfırdır. Potansiyel en az, kinetik en çok ve sürat Aω olur.",
        "guidance": {
          "knowledge": [
            "İdeal yatay yayda denge, net geri çağırıcı kuvvetin sıfır olduğu konumdur; cisim burada durmak zorunda değildir."
          ],
          "strategy": "x = 0 değerini kuvvet ve enerjiye ayrı ayrı uygulayıp A > 0 bilgisini koru.",
          "steps": [
            "Dengede x = 0 olduğu için F = −kx = 0 ve a = F/m = 0 olur.",
            "Yay potansiyeli kx²/2 sıfırdır; toplam enerjinin tamamı kinetiktir.",
            "A > 0 olduğundan sürat Aω ile en büyüktür; sıfır ivme sıfır hız demek değildir."
          ],
          "optionReasons": [
            "Kinetik enerji dengede sıfır değil en büyüktür; durma uçlarda olur.",
            "En büyük ivme ve sıfır sürat uç konum özellikleridir; dengeye ait değildir.",
            "İvme sıfırdır, fakat A > 0 ile denge geçişinde hız sıfır değildir.",
            "Doğru. İvme sıfır, sürat en büyük değerindedir.",
            "Net kuvvet x = 0’da sıfırdır; en büyük büyüklük uçlarda kA’dır."
          ],
          "commonError": "Dengeyi hareketsizlikle özdeşleştirme; net kuvvet hızın kendisini değil değişimini belirler.",
          "check": "Cisim dengede durgun olsaydı A > 0 ile verilen salınım enerjisi nereye giderdi? Burada kinetik enerjiye dönüşmüştür."
        }
      },
      {
        "prompt": "Kütlesiz ideal düşey yaya asılı cisim başka bir yerde aynı kütle ve aynı yayla küçük doğrusal salınım yapıyor. g azalırsa denge uzaması ve doğal periyot nasıl değişir?",
        "options": [
          "Denge uzaması artar; periyot azalır.",
          "İkisi de artar.",
          "Denge uzaması azalır; periyot değişmez.",
          "İkisi de azalır.",
          "Denge uzaması değişmez; periyot artar."
        ],
        "answer": 2,
        "hint": "Δℓ=mg/k; T=2π√(m/k).",
        "explanation": "g denge uzamasını değiştirir ama denge etrafındaki ideal doğrusal k/m oranını değiştirmez.",
        "guidance": {
          "knowledge": [
            "İdeal düşey yayda yerçekimi dengeyi kaydırır; denge etrafındaki doğrusal yay sabitini değiştirmez."
          ],
          "strategy": "Statik uzama ve salınım süresini iki ayrı fizik ilişkisiyle karşılaştır.",
          "steps": [
            "Denge uzaması Δℓ = mg/k’dır; aynı m ve k ile g azalınca uzama azalır.",
            "Yeni dengeye göre y uzanımı için net kuvvet −ky olur; sabit ağırlık denge hesabında dengelenmiştir.",
            "Doğal periyot 2π√(m/k) ile aynı kalır; bu ideal doğrusal modelde g içermez."
          ],
          "optionReasons": [
            "g azalırken mg/k artmaz; ayrıca ideal yay periyodunun azalması gerekmez.",
            "Denge uzaması artmak yerine azalır; periyot da artmaz.",
            "Doğru. Statik uzama azalırken doğal periyot değişmez.",
            "Uzama azalır ama g, aynı m/k oranına sahip ideal yay periyodunu azaltmaz.",
            "Uzama g’ye bağlıdır ve sabit kalmaz; periyodun artması da verilen ideal modele uymaz."
          ],
          "commonError": "Sarkaçtaki g etkisini düşey yay periyoduna doğrudan taşıma.",
          "check": "Denge uzaması ile denge etrafındaki salınım genliği farklı uzunluklardır; g ilkini belirler."
        }
      },
      {
        "prompt": "k=100 N/m ve A=0,20 m olan ideal yay salınımında x=0,10 m anındaki potansiyel ve toplam enerji sırasıyla kaç joule olur?",
        "options": [
          "2 ve 0,5",
          "0,5 ve 2",
          "1 ve 4",
          "1 ve 2",
          "0,5 ve 1"
        ],
        "answer": 1,
        "hint": "U=kx²/2, E=kA²/2.",
        "explanation": "U=100×0,01/2=0,5 J, E=100×0,04/2=2 J. Kalan 1,5 J kinetiktir.",
        "guidance": {
          "knowledge": [
            "Yay potansiyeli o anki x ile, toplam salınım enerjisi uç uzanımı A ile hesaplanır."
          ],
          "strategy": "İki enerjide aynı k değerini kullan; kareye girecek uzunluğu her biri için ayrı seç.",
          "steps": [
            "x = 0,10 m için U = 100 × (0,10)²/2 = 0,5 J olur.",
            "A = 0,20 m için E = 100 × (0,20)²/2 = 2 J bulunur.",
            "Kinetik enerji E − U = 1,5 J’dir; potansiyel toplam enerjiyi aşmaz."
          ],
          "optionReasons": [
            "Bu seçenek doğru U ve E değerlerinin sırasını ters vermiştir; önce potansiyel isteniyor.",
            "Doğru. Verilen sırayla 0,5 J ve 2 J elde edilir.",
            "Her iki enerjide de 1/2 çarpanı unutulursa 1 J ve 4 J çıkar.",
            "Toplam enerji 2 J doğrudur; potansiyelde 1/2 eksik bırakıldığı için 1 J yazılmıştır.",
            "Potansiyel 0,5 J doğrudur; toplam enerji 1 değil 2 J olmalıdır."
          ],
          "commonError": "Toplam enerjiyi o anki x ile hesaplayarak kinetik enerjiyi görünmez yapma.",
          "check": "x = A/2 olduğundan U/E = (x/A)² = 1/4 olmalı; 0,5/2 oranı bunu doğrular."
        }
      },
      {
        "prompt": "Aşağıdakilerden hangisi basit harmonik hareketin doğru koşulunu verir?",
        "options": [
          "Kuvvetin her an hıza ters yönlü olması.",
          "Denge noktasında hızın zorunlu sıfır olması.",
          "Süratin her an sabit olması.",
          "Her periyodik hareket olması.",
          "Sabit pozitif ω için a=−ω²x olması."
        ],
        "answer": 4,
        "hint": "Dengeye yönelik, uzanımla doğrusal geri çağırmayı ara.",
        "explanation": "Sinüzoidal hareketi belirleyen doğrusal geri çağırıcı yasa a=−ω²x’tir. Yalnız yinelenmek yeterli değildir.",
        "guidance": {
          "knowledge": [
            "Her periyodik hareket harmonik değildir; belirleyici olan uzanıma doğrusal ve dengeye yönelik ivmedir."
          ],
          "strategy": "Adayların yön, büyüklük ve denge geçişi sonuçlarını geri çağırıcı yasayla karşılaştır.",
          "steps": [
            "Hıza her an ters kuvvet sürtünmeye benzer; dengeye geri çağırma yönünü konuma göre tanımlamaz.",
            "Harmonik cisim dengede en büyük süratle geçebilir ve uçlarda durabilir; sabit sürat veya dengede zorunlu durma gerekmez.",
            "Sabit pozitif ω için a = −ω²x, hem dengeye ters yönü hem uzanıma doğrusal büyüklüğü verir."
          ],
          "optionReasons": [
            "Hıza ters kuvvet sönümleyici olabilir; harmonik geri çağırıcı kuvvet her an hıza ters değildir.",
            "Denge geçişinde hızın sıfır olması gerekmez; A > 0 salınımda sürat burada en büyüktür.",
            "Harmonik salınımın sürati uçlarda sıfır, dengede en büyüktür; sabit değildir.",
            "Yinelenme tek başına a ∝ −x koşulunu sağlamaz; periyodik olmak daha geniş bir özelliktir.",
            "Doğru. Sabit pozitif ω ile bu yasa sinüzoidal geri çağırıcı hareketin koşuludur."
          ],
          "commonError": "Geri çağırıcıyı her zaman hareketi yavaşlatan kuvvet sanma; dengeye yaklaşırken sürat artabilir.",
          "check": "x’in işareti çevrilince a’nın işareti de çevrilmeli; x = 0’da ivme sıfır olmalıdır."
        }
      }
    ],
    "source": "MEBİ AYT Fizik PDF 177–186, OGM 12 Fizik 009–013 konu paftaları ve Dersler Cepte 12 Fizik 4. sayı PDF 10–16 karşılaştırılarak yazılmış özgün anlatım ve sorular. İşaretli hız, küçük açı yaklaşımı, denge ve radyal kuvvet koşulları ayrılmıştır."
  },
  {
    "id": "su-dalgalarinda-kirinim",
    "topic": "detail-391",
    "title": "Su dalgalarında kırınım",
    "minutes": 42,
    "objectives": [
      "Kırınımı kırılma ve yansımadan ayır",
      "Dalga boyu–açıklık oranını koşullarıyla yorumla",
      "Kaynak ve derinlik değişimlerini ayrı hesapla"
    ],
    "sections": [
      {
        "title": "Bir açıklıktan sonra dalga neden yayılır?",
        "paragraphs": [
          "Dalga leğeninde düz tepe çizgileri dar bir açıklığa geldiğinde yalnız karşıya ilerlemekle kalmaz; açıklığın yanlarına ve geometrik gölge bölgesine de yayılabilir. Engel kenarında bükülme ve açıklık ardından yayılma kırınım olarak adlandırılır. Bu, suya özgü değil dalga davranışıdır.",
          "Kırınımda yeni bir su derinliğine geçmek zorunlu değildir. Aynı ortamda yön dağılımı değişebilirken kaynak frekansı ve yerel dalga boyu aynı kalabilir. Bir dalganın daha geniş açılara yayılması, su taneciklerinin açıklıktan bütün yönlere akması demek değildir."
        ]
      },
      {
        "title": "Dalga cephesi, ışın ve su taneciği",
        "paragraphs": [
          "Aynı fazdaki noktaları birleştiren çizgi dalga cephesidir; ardışık tepe cepheleri bir dalga boyu λ kadar ayrılır. İdeal homojen ortamda yayılma doğrultusu bu cepheye diktir. Noktasal kaynak dairesel, geniş doğrusal kaynak yaklaşık düz cepheler oluşturur.",
          "Su yüzeyi dalgalarında tanecikler düşey ve yatay hareket bileşenleri gösterebilir. Enerji ve fazın ilerlemesini tek bir taneciğin kalıcı taşınmasıyla karıştırma. Yüzey hareketi derinlikle zayıflar; “alt tabakalarda hiç hissedilmez” bütün derinlik ve dalga boyları için doğru değildir."
        ]
      },
      {
        "title": "Huygens düşüncesiyle açıklığı okumak",
        "paragraphs": [
          "Dalga cephesinin açıklık içinde kalan noktalarını aynı frekansta küçük dalga katkıları üreten noktalar gibi düşün. Bu katkılar farklı yönlerde farklı yol farklarıyla birleşir. Dar açıklıktan çıkan cephenin daha eğri görünmesi bu toplu dalga davranışıyla açıklanır.",
          "Bu çizim, açıklık içindeki suyun yeni ve bağımsız enerji kaynakları olduğu anlamına gelmez; gelen dalganın aktarılması söz konusudur. Engel üzerindeki kayıp, yansıma ve gerçek sınır koşulları ayrıntıyı etkileyebilir. Öğretim çizimi görünmeyen bir enerji artışı iddia etmez."
        ]
      },
      {
        "title": "Ana oran: dalga boyu bölü açıklık",
        "paragraphs": [
          "Açıklık genişliği w ve dalga boyu λ için λ/w büyüdükçe yana yayılma daha belirgin olur. w, λ’ya yakın veya ondan küçük olduğunda geniş açılı yayılma kolay seçilir. w dalga boyundan çok büyükse ana ileri demet daralır ve kenar etkileri çoğu basit çizimde küçük görünür.",
          "Sonlu bir açıklıkta w>λ diye fiziksel kırınım tam yok olmaz. λ/w=1 bir açılıp kapanma anahtarı değildir; belirginlik ölçeğidir. Sınavdaki sade şemalarda “gözlenmiyor” ifadesi çoğu kez belirgin yana yayılmanın seçilememesini anlatır; bunu evrensel sıfır etkisine dönüştürme."
        ]
      },
      {
        "title": "Açıklığı değiştir, diğerlerini sabit tut",
        "paragraphs": [
          "Aynı kaynak ve aynı ortamda w yarıya indirilirse λ/w iki katına çıkar; yayılmanın açısal kapsamı genellikle artar. w iki katına çıkarılırsa oran yarıya iner. Bu karşılaştırma dalga boyunun ve ortamın sabit tutulduğunu gerektirir.",
          "Dar açıklığın merkezdeki mutlak genliği veya aktardığı toplam enerjiyi yalnız orandan bulamazsın. Açıklık daralınca geçen güç azalabilir; normalize edilmiş şeklin genişlemesi daha çok enerji yaratıldığı anlamına gelmez. Modelde merkez değerini 1 almak yalnız farklı desenlerin biçimini karşılaştırır."
        ]
      },
      {
        "title": "Frekans değişince dalga boyunu yeniden bul",
        "paragraphs": [
          "Doğrusal, aynı yayılma süratli dalga leğeni yaklaşımında v=λf ve λ=v/f olur. v sabitken f azalırsa λ büyür; aynı açıklıkta λ/w artar. T artması f azalmasıyla aynı işlem olduğundan belirgin kırınımı artırabilir.",
          "“Frekansı azaltınca hız azalır” sonucunu bu sabit ortam modeli için kurma. Gerçek su yüzeyi dalgaları dağılım gösterebilir; kısa kapiler dalgalar veya derin su rejimi verilirse süratin yalnız derinliğe bağlı olduğunu varsayma. Soruda v sabit verilmişse verilen modeli uygula."
        ]
      },
      {
        "title": "Derinlik değişiminin koşulu",
        "paragraphs": [
          "Sığ su, uzun yerçekimi dalgası yaklaşımında v≈√(gh) olur. Aynı kaynağın frekansı korunurken h artarsa v ve λ artar; w sabitse λ/w büyür. Sığ su koşulu h’nin dalga boyuna göre yeterince küçük olmasıdır.",
          "Kaynağın frekansı ortam sınırında kendiliğinden değişmez. Derinliği ve frekansı birlikte değiştiriyorsan önce her durumda v ve λ’yı hesapla; tek bir okla hüküm verme. v=√(gh) bağıntısını bütün okyanus dalgaları veya yüzey gerilimi baskın dalgalar için evrensel ilan etme."
        ]
      },
      {
        "title": "Kırılma ile karıştırma",
        "paragraphs": [
          "Kırılmada dalga başka yayılma süratine sahip bir bölgeye geçer. Eğik geçişte cephe yönü değişebilir; aynı kaynağın f değeri korunurken v ve λ değişir. Normal gelişte yön sapmayabilir ama sürat değişimi yine mümkündür.",
          "Kırınımda ise engel kenarı veya açıklık etkilidir; iki farklı ortam zorunlu değildir. Yansıma engelden geri dönen katkıdır. Gerçek bir limanda bu üç olay aynı sahnede bulunabilir; hangi gözlemi açıklaman istendiğine göre mekanizmayı seç."
        ]
      },
      {
        "title": "Dalga leğeni deneyini adım adım tasarla",
        "paragraphs": [
          "Önce derinliği sabit tut, aynı kaynak frekansı ve aynı genlikle dalga üret. Açıklık genişliğini değiştirip açıklıktan sonraki tepe çizgilerini kaydet. İki görüntü aynı ölçek ve aynı uzaklıkta karşılaştırılmalıdır; aksi hâlde yalnız görsel genişlik oranı yanıltır.",
          "İkinci deneyde w sabit tutulup frekans değiştirilebilir; bu kez dalga boyu da ölçülmelidir. Derinlik deneyinde tek kaynağın frekansını değiştirme. Bağımsız değişkeni tek tek değiştirmek, λ/w etkisini kaynak gücü ve su seviyesi değişiminden ayırır."
        ]
      },
      {
        "title": "Liman ve dalgakıran örneği",
        "paragraphs": [
          "Bir dalgakıranın arkasındaki geometrik gölgede su tamamen durgun olmayabilir: kenarlardan kırınan dalga katkıları bu bölgeye ulaşabilir. Açıklık ile dalga boyu arasındaki oran, liman içindeki yayılmanın anlaşılmasına yardım eder. Engel yapısı yansıma ve enerji kayıplarını da etkiler.",
          "Bu öğretim modeli bir kıyı mühendisliği güvenlik hesabı değildir. Gerçek denizde farklı dalga boyları, değişen dip geometrisi, doğrusal olmayan kırılma ve akıntı bulunur. İdeal leğen karşılaştırmasını kullanırken gerçek limandaki her dalganın aynı tek frekansta olduğunu varsayma."
        ]
      },
      {
        "title": "Etkileşimdeki eğri neyi gösteriyor?",
        "paragraphs": [
          "Ek keşifte düzgün aydınlatılmış tek açıklığın skaler uzak alan yaklaşımı kullanılır. Açıklık normaliyle θ açısında β=πw sinθ/λ ve normalize genlik |sinβ/β| olur. β=0 noktasında limit 1’dir. Enerji göstergesi bu genliğin karesidir; gerçek toplam güç değildir.",
          "Bu bağıntı su leğeninin bütün yakın alanını bire bir çözmez; açıklık boyunca eş genlik, tek frekans ve uzak alan koşulları varsayılır, eğiklik çarpanı ve kayıplar yoktur. Şekil, ana lobun λ/w ile nasıl genişlediğini sayısal olarak keşfetmek içindir. Temel sınav karşılaştırması için bu ek formülü ezberlemek gerekmez."
        ]
      },
      {
        "title": "İlk minimum ve belirginlik",
        "paragraphs": [
          "Bu ideal uzak alan zarfında ilk sıfır w sinθ=λ koşulundadır. w≥λ ise θ₁=arcsin(λ/w) bulunur. w<λ iken bu ilk sıfır ileri yarı düzlemde oluşmaz; bu, kırınım yok demek değil ana lobun çok geniş olması demektir.",
          "Örneğin w=2λ için ilk sıfır 30°, w=λ için sınır 90° olur. Ana eksende genlik her iki normalize çizimde 1’dir. Kenara yaklaşan büyük açılarda gerçek su dalgasının sınır ve yayılma ayrıntıları bu ideal skaler eğriden ayrılabilir; gösterilen sonucu kendi model koşuluyla oku."
        ]
      },
      {
        "title": "Oran sorusunu çözme sırası",
        "paragraphs": [
          "Önce bütün uzunlukları aynı birime getir. v ve f verilmişse λ=v/f hesapla; sonra λ/w oranını karşılaştır. T verilirse önce f=1/T kullanabilirsin. Yalnız çizim genişliği verilmiş ve ölçek yoksa santimetre sonucu üretme.",
          "Bir değişiklik sonrası daha belirgin yayılma isteniyorsa oranı büyüten işlemi ara. Aynı anda λ ve w aynı kat artıyorsa ideal normalize açısal desen değişmez; mutlak boyutlar ve geçen güç yine farklı olabilir. Bu ayrım ölçeksiz şemaları yorumlarken yararlıdır."
        ]
      }
    ],
    "examples": [
      {
        "title": "Açıklık oranı",
        "prompt": "Sabit sürati 24 cm/s olan doğrusal dalgada f=4 Hz. Açıklık önce 12 cm, sonra 3 cm. Dalga boyu ve iki λ/w oranı nedir?",
        "strategy": "Önce λ, sonra yalnız açıklığın etkisi.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "λ=v/f=24/4=6 cm."
          },
          {
            "label": "Adım 2",
            "explanation": "İlk oran 6/12=0,5; ikinci oran 6/3=2."
          },
          {
            "label": "Adım 3",
            "explanation": "Oran dört katına çıktı; ikinci açıklıkta yana yayılma daha belirgin beklenir."
          }
        ],
        "answer": "λ=6 cm; oranlar 0,5 ve 2.",
        "check": "v ve f değişmediği için λ iki durumda da 6 cm.",
        "pitfall": "Dar açıklıkta frekansı kendiliğinden değiştirme."
      },
      {
        "title": "Kaynak sıklığını değiştir",
        "prompt": "Aynı ortamda v=30 cm/s, w=5 cm. f önce 6 Hz, sonra 3 Hz oluyor. Oranları karşılaştır.",
        "strategy": "Sabit v için λ=v/f.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "İlk λ=30/6=5 cm, λ/w=1."
          },
          {
            "label": "Adım 2",
            "explanation": "Son λ=30/3=10 cm, λ/w=2."
          },
          {
            "label": "Adım 3",
            "explanation": "Frekans yarıya indiğinde dalga boyu ve belirginlik oranı iki katına çıktı."
          }
        ],
        "answer": "Oran 1’den 2’ye çıkar.",
        "check": "Her aşamada λf=30 cm/s.",
        "pitfall": "Frekans değişimini genlik değişimiyle eş tutma."
      },
      {
        "title": "Sığ su derinliği",
        "prompt": "Uzun dalga–sığ su yaklaşımında h₁=1 cm, h₂=4 cm; aynı kaynak ve aynı w kullanılıyor. v₂/v₁ ve (λ/w)₂/(λ/w)₁ nedir?",
        "strategy": "Her iki durumda da sığ su yaklaşımının geçerli olduğu verilidir.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "v≈√(gh), dolayısıyla v₂/v₁=√(4/1)=2."
          },
          {
            "label": "Adım 2",
            "explanation": "Aynı kaynakta f sabit, λ₂/λ₁=v₂/v₁=2."
          },
          {
            "label": "Adım 3",
            "explanation": "w sabit olduğundan λ/w oranı da 2 katına çıkar."
          }
        ],
        "answer": "Her iki oran 2.",
        "check": "h dört kat, v iki kat olur; derinlikle doğrusal orantı yoktur.",
        "pitfall": "Bu bağıntıyı sığ su koşulu olmadan evrensel kullanma."
      },
      {
        "title": "Uzak alan zarfını denetle",
        "prompt": "İdeal düzgün açıklık modelinde λ=2 cm, w=4 cm. Ana eksende ve θ=30° yönünde normalize genlik nedir?",
        "strategy": "β=πw sinθ/λ ve sinc limitini kullan.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "θ=0 için β=0 ve sinβ/β limit 1’dir."
          },
          {
            "label": "Adım 2",
            "explanation": "θ=30° için β=π×4×0,5/2=π."
          },
          {
            "label": "Adım 3",
            "explanation": "sinπ=0; ideal ilk minimum 30° yönündedir, normalize enerji de 0’dır."
          }
        ],
        "answer": "Ana eksende 1; 30° yönünde 0.",
        "check": "θ₁=arcsin(2/4)=30° aynı sonucu verir.",
        "pitfall": "Bu normalize sıfırı bütün gerçek yakın alan noktaları için mutlak sönüm sayma."
      }
    ],
    "recall": [
      {
        "prompt": "Kırınım için ortam değişimi gerekir mi?",
        "answer": "Hayır; aynı ortamda açıklık veya engel kenarı yeterlidir. Kırılmada yayılma sürati değişen bölgeye geçiş vardır."
      },
      {
        "prompt": "w>λ ise kırınım gerçekten sıfır mı?",
        "answer": "Sonlu açıklıkta tam sıfır denmez; geniş açıklıkta ana ileri demet dar ve yana yayılma daha az belirgin olabilir."
      },
      {
        "prompt": "Aynı v ve w için f azalınca ne olur?",
        "answer": "λ=v/f büyür, λ/w artar; belirgin yana yayılma artabilir."
      },
      {
        "prompt": "Normalize eğri neden toplam geçen enerji değil?",
        "answer": "Her desenin merkezi 1’e ölçeklenmiştir. Dar açıklıkta mutlak geçen güç farklı olabilir; model yalnız açısal biçimi karşılaştırır."
      }
    ],
    "items": [
      {
        "prompt": "Yayılma sürati 20 cm/s olarak sabit verilen dalga leğeninde kaynak 5 Hz ve açıklık 2 cm. λ/w kaçtır?",
        "options": [
          "1",
          "10",
          "4",
          "2",
          "0,5"
        ],
        "answer": 3,
        "hint": "λ=v/f; aynı birimi kullan.",
        "explanation": "λ=20/5=4 cm; λ/w=4/2=2. Uzunluklar aynı birimde olduğundan bu oran birimsizdir; açıklık dalga boyuna göre dardır.",
        "guidance": {
          "knowledge": [
            "Doğrusal dalga modelinde λ = v/f; λ/w aynı birimli iki uzunluğun oranıdır."
          ],
          "strategy": "Önce dalga boyunu cm cinsinden bul, sonra açıklığa böl.",
          "steps": [
            "v = 20 cm/s ve f = 5 s⁻¹ ile λ = 20/5 = 4 cm bulunur.",
            "Açıklık w = 2 cm olduğundan λ/w = 4/2 = 2 olur.",
            "cm birimleri sadeleşir; sonuç 2 cm değil birimsiz 2’dir."
          ],
          "optionReasons": [
            "1 olması için dalga boyu açıklığa eşit olmalıydı; burada 4 cm ve 2 cm farklıdır.",
            "10, v/w = 20/2 değeridir ve s⁻¹ birimi taşır; istenen λ/w değildir.",
            "4, cm cinsinden dalga boyudur; açıklığa bölme işlemi henüz yapılmamıştır.",
            "Doğru. 4 cm / 2 cm = 2 elde edilir.",
            "0,5, istenen oran yerine w/λ = 2/4 hesaplanınca çıkar."
          ],
          "commonError": "Sürati doğrudan açıklığa bölüp dalga boyu oranı sanma; önce frekansla dalga boyunu bul.",
          "check": "Dalga boyu açıklığın iki katıdır; bulunan oran 1’den büyük olmalıdır."
        }
      },
      {
        "prompt": "Aynı kaynak, aynı dalga leğeni ve aynı dalga boyu korunuyor. Açıklık genişliği yarıya indirilirse λ/w nasıl değişir?",
        "options": [
          "Dört katına çıkar.",
          "Sıfır olur.",
          "Değişmez.",
          "Yarıya iner.",
          "İki katına çıkar."
        ],
        "answer": 4,
        "hint": "Pay sabit, payda yarıya.",
        "explanation": "λ/(w/2)=2λ/w; yana yayılmanın belirginliği artabilir.",
        "guidance": {
          "knowledge": [
            "Kırınımın açısal belirginliğinde açıklığın dalga boyuna göre büyüklüğü önemlidir."
          ],
          "strategy": "Dalga boyu değişmezken paydadaki w değişimini oran olarak izle.",
          "steps": [
            "Başlangıç oranını R = λ/w diye adlandıralım; verilen kaynak ve ortam λ’yı sabit tutuyor.",
            "Yeni açıklık w/2 olduğunda R_yeni = λ/(w/2) = 2λ/w = 2R olur.",
            "Açıklık dalga boyuna göre daralmıştır; aynı dalganın yana yayılması daha belirgin olabilir."
          ],
          "optionReasons": [
            "Dört kat, paydadaki yarılanmayı yanlışlıkla karesel uygulamaktır; oran w’nin birinci kuvvetini içerir.",
            "Sonlu pozitif açıklık ve dalga boyunda λ/w sıfır olmaz.",
            "λ aynı kalsa bile w değiştiği için oran aynı kalmaz.",
            "Yarıya inen w’dir; w paydada olduğu için λ/w yarıya değil iki katına çıkar.",
            "Doğru. Yeni oran eskisinin iki katıdır."
          ],
          "commonError": "Açıklık daralınca dalga boyunun da aynı oranda küçülmesini kendiliğinden varsayma.",
          "check": "Örneğin eski λ/w = 0,4 ise yeni oran 0,8 olur; bölümdeki ters etkiyi bu basit değerlerle de kontrol edebilirsin."
        }
      },
      {
        "prompt": "Süratin sabit kaldığı doğrusal leğen modelinde w sabitken f iki katına çıkarılıyor. λ ve λ/w nasıl değişir?",
        "options": [
          "λ aynı, oran yarıya iner.",
          "İkisi de aynı kalır.",
          "İkisi de iki katına çıkar.",
          "λ yarıya iner, oran aynı kalır.",
          "İkisi de yarıya iner."
        ],
        "answer": 4,
        "hint": "λ=v/f ve w sabit.",
        "explanation": "Frekans artışı λ’yı yarıya indirir; aynı w için oran da yarıya iner.",
        "guidance": {
          "knowledge": [
            "Yayılma sürati sabitken frekans ile dalga boyu ters orantılıdır."
          ],
          "strategy": "Kaynak değişiminin önce λ’ya, ardından sabit w ile orana etkisini hesapla.",
          "steps": [
            "f → 2f ve v sabit olduğundan λ_yeni = v/(2f) = λ_eski/2 olur.",
            "w değişmediği için (λ/w)_yeni = (λ_eski/2)/w = (λ/w)_eski/2 bulunur.",
            "Hem dalga boyu hem açıklığa oranı yarıya iner; açıklık dalga boyuna göre daha geniş hâle gelir."
          ],
          "optionReasons": [
            "Sabit v’de frekans iki katına çıkarken λ aynı kalamaz; oranın yarılanması tek başına yetmez.",
            "f değiştiğinde sabit v ile λ değişir; iki nicelik de sabit kalmaz.",
            "λ frekansla doğru değil ters orantılıdır; iki katına çıkmaz.",
            "λ yarılanır ama w sabitken λ/w aynı kalamaz.",
            "Doğru. İki uzunluk oranı da dalga boyuyla birlikte yarıya iner."
          ],
          "commonError": "Kaynağın daha sık titreşmesini aynı ortamda dalganın daha hızlı yayılması diye yorumlama.",
          "check": "Yeni frekansla yeni dalga boyunu çarp: (2f)(λ/2) = fλ = v; sabit sürat korunur."
        }
      },
      {
        "prompt": "İki bölgede de uzun dalga–sığ su yaklaşımı geçerli, aynı kaynak ve açıklık korunuyor. Derinlik 9 katına çıkarsa λ/w kaç katına çıkar?",
        "options": [
          "3",
          "1",
          "1/3",
          "81",
          "9"
        ],
        "answer": 0,
        "hint": "v≈√(gh), f sabit.",
        "explanation": "Sürat√9=3 katına çıkar; λ ve λ/w de 3 kat olur.",
        "guidance": {
          "knowledge": [
            "Uzun dalga–sığ su yaklaşımında yayılma sürati derinliğin kareköküyle değişir."
          ],
          "strategy": "Kaynak frekansı ve açıklık sabitken derinlikten sürate, süratten dalga boyuna geç.",
          "steps": [
            "h_yeni = 9h olduğundan v_yeni/v_eski = √9 = 3 olur.",
            "Aynı kaynak frekansı için λ = v/f; dalga boyu da üç katına çıkar.",
            "Açıklık değişmediğinden λ/w oranının çarpanı 3’tür."
          ],
          "optionReasons": [
            "Doğru. Sığ su koşulu iki bölgede de sağlandığı için sonuç üç kattır.",
            "Aynı kaynak f’yi korur; fakat derinlik değiştiğinde bu yaklaşımda v ve λ sabit kalmaz.",
            "Derinlik artışı bu modelde sürati artırır; oran 1/3’e düşmez.",
            "81, derinlik çarpanını karesini alarak kullanır; gereken işlem √9’dur.",
            "9, derinlik oranıdır; sürat ve dalga boyu için karekök alınmalıdır."
          ],
          "commonError": "v ∝ √h ilişkisini bütün derinlik ve dalga boylarına koşulsuz yayma; kök iki bölgede de sığ su koşulunu vermiştir.",
          "check": "Frekans ve açıklık sabitken λ/w ile v aynı çarpanı taşımalı; ikisi de 3 bulunur."
        }
      },
      {
        "prompt": "Aynı derinlikte bir dalga dar açıklıktan geçip yanlara yayılıyor. Doğrudan açıklanan olay hangisidir?",
        "options": [
          "Doppler olayı",
          "Kırılma",
          "Kırınım",
          "Tam yansıma",
          "Polarizasyon"
        ],
        "answer": 2,
        "hint": "Engel kenarı ve açıklık sonraki yayılmayı düşün.",
        "explanation": "Ortam değişimi gerektirmeyen açıklık sonrası yayılma kırınımdır.",
        "guidance": {
          "knowledge": [
            "Kırınım, dalganın açıklık veya engel kenarından sonra farklı yönlere yayılmasıdır."
          ],
          "strategy": "Gözlemde ortam değişimi, hareketli kaynak veya geri dönüş yerine hangi fiziksel nedenin verildiğini ayır.",
          "steps": [
            "Suyun derinliği aynı tutulmuş; bir bölgeden başka süratli ortama geçiş verilmemiştir.",
            "Verilen belirti dar açıklıktan sonraki yana yayılmadır; dalga cephesi açıklık çevresine açılır.",
            "Bu iki bilgi kırınımı tanımlar; Doppler veya yansıma için gereken başka koşullar verilmemiştir."
          ],
          "optionReasons": [
            "Doppler için kaynak/alıcı hareketine bağlı gözlenen frekans farkı gerekir; kökte böyle bir hareket yoktur.",
            "Kırılma farklı yayılma koşullarına geçişle ilişkilidir; burada aynı derinlikte açıklık sonrası yayılma verilmiştir.",
            "Doğru. Dar açıklık sonrasında yana yayılma kırınım gözlemidir.",
            "Tam yansıma geri dönen dalgayı gerektirir; gözlenen dalga açıklığın ötesine geçmiştir.",
            "Polarizasyon titreşim doğrultularının seçilmesiyle ilgilidir; burada açıklanan özellik yayılma yönlerinin açılmasıdır."
          ],
          "commonError": "Kırılma ve kırınım sözcüklerinin benzerliğini fiziksel nedenlerinin aynı olması sanma.",
          "check": "Ortam değişmese de bir açıklık ekleyince bu gözlem oluşabilir; bu, kırınım ayrımını destekler."
        }
      },
      {
        "prompt": "Sonlu bir açıklık için hangi ifade bilimsel olarak doğrudur?",
        "options": [
          "λ<w ise bütün dalga etkileri yok olur.",
          "w dalga boyundan çok büyükken yana yayılma zayıf görünse de kırınımın kesin sıfır olduğu söylenmez.",
          "Kırınım yalnız λ=w eşitliğinde vardır.",
          "Kırınım frekansı zorunlu artırır.",
          "Dar açıklık yeni enerji üretir."
        ],
        "answer": 1,
        "hint": "Belirginlik koşulu ile fiziksel etkinin yokluğunu ayır.",
        "explanation": "λ/w sürekli değişen bir orandır; 1 değeri keskin bir fiziksel açma kapama eşiği değildir.",
        "guidance": {
          "knowledge": [
            "Kırınımın görünür belirginliği sürekli değişir; λ = w eşitliği bir açma-kapama yasası değildir."
          ],
          "strategy": "Adayların mutlak yokluk ve zorunlu yeni enerji/frekans iddialarını sonlu açıklık bilgisiyle sınırla.",
          "steps": [
            "w ≫ λ olduğunda dalga öne daha dar açılarla yayılır; yana yayılma zayıf görünebilir.",
            "Açıklık sonlu kaldığı için bu görünüm bütün kırınım katkılarının kesin sıfırlandığı anlamına gelmez.",
            "Bu nedenle zayıf belirginliği kabul edip kesin yokluk iddiası kurmayan seçenek uygundur."
          ],
          "optionReasons": [
            "λ < w olması dalganın yayılmasını veya bütün dalga etkilerini ortadan kaldırmaz.",
            "Doğru. Geniş açıklıkta zayıf görünen yayılma kesin sıfır diye nitelenmez.",
            "λ = w tek bir karşılaştırma oranıdır; olay yalnız bu eşitlikte var olmaz.",
            "Durağan bir açıklık aynı kaynak dalgasının frekansını zorunlu artırmaz.",
            "Pasif açıklık yeni enerji üretmez; gelen enerjinin yayılma ve iletim koşullarını değiştirir."
          ],
          "commonError": "Belirgin kırınım koşulunu olayın varlığı için keskin bir eşikmiş gibi ezberleme.",
          "check": "λ/w oranını 1’in iki yanına çok küçük miktarda değiştirince fiziksel sonuç ani biçimde açılıp kapanmamalıdır."
        }
      },
      {
        "prompt": "Aynı ortam ve tek frekans korunurken λ=3 cm dalgalar önce w=12 cm, sonra w=3 cm açıklıktan geçiyor. Hangi sonuç uygundur?",
        "options": [
          "İki açıklıkta λ/w aynıdır.",
          "İkinci açıklıkta yana yayılma daha belirgindir; kaynak frekansı aynıdır.",
          "İkinci açıklıkta dalga boyu zorunlu 12 cm olur.",
          "İkinci açıklık frekansı dört katına çıkarır.",
          "İlk açıklıkta mutlaka daha geniş açılı yayılır."
        ],
        "answer": 1,
        "hint": "Oranlar 3/12 ve 3/3.",
        "explanation": "λ/w ilkinde 0,25, ikincide 1; aynı kaynağın frekansı açıklıkla değişmez.",
        "guidance": {
          "knowledge": [
            "Aynı dalga boyunda daralan açıklık λ/w oranını büyütür; kaynak frekansı açıklıktan ayrı bir niceliktir."
          ],
          "strategy": "İki açıklığın oranlarını verilen 3 cm dalga boyuyla ayrı ayrı hesapla.",
          "steps": [
            "İlk açıklık için λ/w = 3/12 = 0,25 bulunur.",
            "İkinci açıklıkta λ/w = 3/3 = 1 olur; oran dört katına çıkmıştır.",
            "Aynı ortam ve tek kaynak frekansı korunduğundan değişen dalga boyu değil açıklık ve açısal yayılmadır."
          ],
          "optionReasons": [
            "0,25 ile 1 eşit değildir; iki açıklığın dalga boyuna göre genişliği farklıdır.",
            "Doğru. İkinci dar açıklıkta yayılma daha belirgindir; aynı kaynak frekansı korunur.",
            "12 cm ilk açıklığın genişliğidir; dalganın yeni dalga boyu değildir.",
            "Açıklık genişliğini değiştirmek aynı kaynağın titreşim frekansını dört katına çıkarmaz.",
            "İlk açıklık dalga boyuna göre daha geniştir; verilen karşılaştırmada daha yaygın yana açılma ikinci açıklıktadır."
          ],
          "commonError": "Açıklık genişliğini dalga boyunun kendisi gibi okuyup 3 cm bilgisini değiştirme.",
          "check": "Her iki durumda v = fλ ve λ = 3 cm korunur; oran değişimi yalnız w’den gelmiştir."
        }
      },
      {
        "prompt": "İdeal düzgün açıklığın uzak alanında ilk sıfır w sinθ=λ ile tanımlanıyor. w=2λ ise ilk sıfır normalden kaç derecededir?",
        "options": [
          "15",
          "90",
          "45",
          "60",
          "30"
        ],
        "answer": 4,
        "hint": "sinθ=λ/w.",
        "explanation": "sinθ=1/2; ileri yarı düzlemde ilk pozitif açı 30° olur.",
        "guidance": {
          "knowledge": [
            "İdeal düzgün açıklığın ilk uzak-alan sıfırı λ/w oranıyla belirlenen açıda oluşur."
          ],
          "strategy": "w = 2λ bilgisini sıfır koşuluna yerleştirip ileri yöndeki ilk açıyı seç.",
          "steps": [
            "w sinθ = λ denkleminde w yerine 2λ koyunca 2λ sinθ = λ olur.",
            "Pozitif λ sadeleşir ve sinθ = 1/2 elde edilir.",
            "Normalden ileri yarı düzlemde ilk pozitif açı 30°’dir; simetrik diğer sıfır−30° yönündedir."
          ],
          "optionReasons": [
            "sin 15°,1/2 değildir; verilen w/λ = 2 oranının ilk sıfırını sağlamaz.",
            "90° için sinθ = 1 olurdu; bu w = λ koşuludur, w = 2λ değil.",
            "45° için sinθ = √2/2’dir; gereken değer 1/2’dir.",
            "60° için sinθ = √3/2’dir; ilk sıfır denklemini sağlamaz.",
            "Doğru. sin 30° = 1/2 ile w sinθ = λ sağlanır."
          ],
          "commonError": "sinθ oranını doğrudan derece sayısı gibi kullanma; ters trigonometrik ilişkiyi kur.",
          "check": "2λ × sin 30° = 2λ × 1/2 = λ; bulunan açıyı başlangıç denkleminde yerine koy."
        }
      },
      {
        "prompt": "Normalize edilmiş kırınım eğrisinin merkezinin her açıklıkta 1 gösterilmesi neyi söyler?",
        "options": [
          "Şekiller karşılaştırma için ölçeklenmiştir; mutlak geçen güçlerin eşitliği çıkarılamaz.",
          "Dar açıklık toplam enerjiyi artırır.",
          "Yansıma fiziksel olarak imkânsızdır.",
          "Dalga frekansı 1 Hz’dir.",
          "Bütün açıklıklardan aynı güç geçtiği kanıtlanır."
        ],
        "answer": 0,
        "hint": "Normalize genlikle mutlak enerji farklı niceliklerdir.",
        "explanation": "Merkez değerine bölmek şekli ölçekler; toplam güç ve kayıplar için ek veri gerekir.",
        "guidance": {
          "knowledge": [
            "Normalize etmek bir referans değere bölerek göreli şekli gösterir; mutlak birim ve güç bilgisi ayrı kalır."
          ],
          "strategy": "Merkezdeki 1’in ölçek tanımı mı yoksa fiziksel bir güç ölçümü mü olduğunu ayır.",
          "steps": [
            "Her eğri kendi merkez değerine bölünürse merkez, başlangıç genliği farklı olsa bile 1 olur.",
            "Bu işlem açıya göre göreli dağılımı karşılaştırır; açıklıklardan geçen toplam enerji değerlerini vermez.",
            "Böylece merkezlerin eşitliği yalnız ölçeklenmiş şekillere aittir; aynı güç veya kayıpsız iletim çıkarılamaz."
          ],
          "optionReasons": [
            "Doğru. Birim merkez değeri, şekil karşılaştırması için yapılan ölçeklemedir.",
            "Normalize 1 yeni enerji üretildiğini göstermez; mutlak enerji bilgisi grafikte verilmemiştir.",
            "Merkez değerine bölmek yansıma olup olmadığına dair fiziksel bir yasak koymaz.",
            "Grafikteki 1 boyutsuz normalize değerdir;1 Hz kaynak frekansı değildir.",
            "Farklı mutlak güçler kendi merkezlerine bölününce aynı 1 değerini alabilir; güç eşitliği kanıtlanmaz."
          ],
          "commonError": "Boyutsuz normalize genliği watt veya hertz cinsinden ölçüm gibi okuma.",
          "check": "Merkez genlikleri 2 ve 5 olan iki eğri, kendi merkezlerine bölününce ikisi de 1’den başlar; ilk mutlak büyüklükler yine farklıdır."
        }
      },
      {
        "prompt": "Aynı λ/w oranını koruyarak hem λ hem açıklık genişliği 3 katına çıkarılıyor. İdeal düzgün açıklığın normalize uzak alan açısal zarfı için hangisi doğrudur?",
        "options": [
          "Frekans zorunlu 3 katına çıkar.",
          "Her yöndeki genlik sıfırlanır.",
          "Toplam geçen güç zorunlu aynı olur.",
          "Açısal şekil aynı kalır.",
          "Ana lob açısı 3 katına çıkar."
        ],
        "answer": 3,
        "hint": "β=π(w/λ)sinθ.",
        "explanation": "w/λ aynı kalınca aynı θ için β ve normalize zarf aynıdır. Mutlak güç eşitliği sonucu çıkmaz.",
        "guidance": {
          "knowledge": [
            "Düzgün açıklığın normalize açısal uzak-alan zarfı ayrı uzunluklardan değil w/λ oranından belirlenir."
          ],
          "strategy": "İki uzunluğun aynı çarpanla değişmesini faz değişkenine yerleştir.",
          "steps": [
            "Yeni açıklık 3w ve yeni dalga boyu 3λ olduğundan (3w)/(3λ) = w/λ olur.",
            "Her aynı θ için β = π(w/λ)sinθ değişmez; normalize genlik zarfı da değişmez.",
            "Bu sonuç yalnız açısal şekli karşılaştırır; mutlak geçen gücün eşitliğini iddia etmez."
          ],
          "optionReasons": [
            "Frekans için sürat ve λ ilişkisi de gerekir; bu oran koruması frekansın zorunlu üç kat olduğunu söylemez.",
            "Normalize merkez 1’dir; aynı oran bütün yönlerin genliğini sıfırlamaz.",
            "Aynı göreli şekil farklı mutlak güçlerle çizilebilir; toplam güç eşitliği çıkmaz.",
            "Doğru. w/λ ve her açıdaki β aynı olduğundan açısal şekil korunur.",
            "Ana lobun açısal genişliği aynı λ/w oranıyla belirlenir; üç katına çıkmaz."
          ],
          "commonError": "Çizimin fiziksel boyutunu büyütmekle normalize açısal genişliğin büyümesini eş tutma.",
          "check": "İlk sıfır varsa sinθ = λ/w oranı da korunur; aynı açıda kalması şekil sonucunu destekler."
        }
      }
    ],
    "source": "MEBİ AYT Fizik PDF 187–188; OGM 12 Fizik 014, Su Dalgalarında Kırınım sunusu 050 PDF 1–22, Dersler Cepte 12 Fizik 5. sayı PDF 10–11 ve Aurelia Su Dalgaları kopya kâğıdı PDF 1–8 karşılaştırılarak yazılmış özgün içerik. Kırınımın belirginliği, sığ su koşulu ve ek uzak alan modelinin sınırları ayrılmıştır."
  },
  {
    "id": "su-dalgalarinda-girisim",
    "topic": "detail-392",
    "title": "Su dalgalarında girişim",
    "minutes": 55,
    "objectives": [
      "Anlık yükseklikle titreşim genliğini ayır",
      "Yol farkı ve kaynak fazıyla katar–düğüm bul",
      "Gerçek hiperbolik çizgileri ve sınırlı sayım kurallarını yorumla"
    ],
    "sections": [
      {
        "title": "İki dalga aynı noktada buluşunca",
        "paragraphs": [
          "Küçük genlikli doğrusal dalga yaklaşımında bir noktadaki toplam yüzey yer değiştirmesi, o noktaya gelen katkıların cebirsel toplamıdır: η=η₁+η₂. Buna üst üste binme ilkesi denir. İki tepe aynı anda buluşursa daha yüksek tepe, tepe ile çukur buluşursa daha küçük yer değiştirme oluşabilir.",
          "Dalgalar birbirini kalıcı olarak yok edip ortadan kaldırmak zorunda değildir; karşılaşmadan sonra yayılmalarını sürdürürler. Girişim uzayda ve zamanda toplamı değiştirir. Enerji dağılımını değiştirirken “düğümde dalgalar öldü, bütün enerji yok oldu” yorumu yapılmaz."
        ]
      },
      {
        "title": "Kararlı desen için eş evrelilik",
        "paragraphs": [
          "İki kaynak aynı frekansta ve sabit faz farkıyla çalışıyorsa koherent, yani eş evreli kaynaklardır. Bu koşul katar ve düğüm bölgelerinin yerlerinin zamanla sabit kalmasını sağlar. Aynı anda başlamak tek başına yetmez; frekanslar farklıysa faz farkı zamanla kayar.",
          "Aynı fazlı kaynaklar eşzamanlı tepe üretir; zıt fazlı kaynakta biri tepe üretirken diğeri çukur üretir. Bu anlatımda su derinliği ve yayılma sürati homojen kabul edilir. Farklı yollar farklı ortamlardan geçiyorsa yalnız geometrik uzaklık farkı yeterli olmayabilir; faz birikimi ayrı hesaplanır."
        ]
      },
      {
        "title": "Dalga boyu yol farkını faza çevirir",
        "paragraphs": [
          "Kaynaklardan P’ye uzaklıklar r₁ ve r₂ olsun. İşaretli yol farkını Δr=r₂−r₁ seçiyoruz. Kaynak 2’nin kaynak 1’e göre fazı φ ise P’deki faz farkı δ=φ−2πΔr/λ olur. Bütün işaretler bu açık seçimle anlam kazanır.",
          "Aynı fazlı kaynakta φ=0 olduğundan yalnız |Δr| kullanarak yapıcı ve yıkıcı çizgi sırası bulunabilir. Faz farkı sıfır değilse mutlak yol farkını tek başına eski formüle koyma. Aynı nokta kaynaklar zıt fazlı yapıldığında katar yerine düğüm olabilir."
        ]
      },
      {
        "title": "Katar bir titreşim genliği yeridir",
        "paragraphs": [
          "Aynı fazlı, eşit frekanslı iki dalga P’de aynı evredeyse toplam genlik A₁+A₂ olur. Bu koşul δ=2πn, aynı fazlı kaynakta |Δr|=nλ ile gerçekleşir. Bu en büyük titreşim genlikli noktaların çizgilerine dalga katarı veya karın çizgisi denir.",
          "Bir katar noktası her an tepe değildir. Bir çevrim boyunca çift tepe, denge geçişi ve çift çukur yaşar. “P katar üstünde” bilgisi maksimum titreşim genliğini söyler; zaman fazı verilmedikçe o anda η’nın pozitif, negatif veya sıfır olduğunu tek başına söylemez."
        ]
      },
      {
        "title": "Düğüm için iki ayrı koşul",
        "paragraphs": [
          "Tam ve kalıcı sıfır titreşim için iki katkı eşit yerel genlikli ve zıt evreli olmalıdır. A₁=A₂>0 ve δ=(2 n+1)π ise η her an sıfır olur. Aynı fazlı kaynaklarda |Δr|=(n−1/2)λ, n=1,2,... düğüm çizgilerini verir.",
          "Genlikler eşit değilse aynı ters faz koşulunda minimum genlik |A₁−A₂| olur; tam düğüm oluşmaz. Aynı kaynak genliği de gerçek leğende farklı yayılma kayıpları nedeniyle her noktada eşit yerel genlik garantilemez. Lise ideal deseninde yayılma azalması ihmal edilip eşit yerel genlik koşulu açık alınır."
        ]
      },
      {
        "title": "Tek bir sıfır anı düğüm kanıtı değildir",
        "paragraphs": [
          "Bir noktanın fotoğrafta denge seviyesinde görünmesi o noktanın düğüm olduğunu ispatlamaz. Her sinüzoidal katar noktası da çevrimde iki kez denge seviyesinden geçer. Düğüm, bütün zamanlarda sıfır toplam titreşim koşuludur.",
          "Örneğin eşit fazlı iki katkı aynı anda sıfırdan geçiyorsa toplam yükseklik o an sıfır ama toplam genlik 2 A olabilir. Genlik, tüm çevrimde ulaşılabilen en büyük |η| değeridir. Modelde zaman düğmesini değiştirip genlik ile anlık yükseklik satırlarını ayrı izle."
        ]
      },
      {
        "title": "Merkez doğrusu nereden gelir?",
        "paragraphs": [
          "İki kaynak arasındaki doğru parçasının orta dikmesi üzerindeki her nokta iki kaynağa eşit uzaklıktadır: Δr=0. Aynı fazlı kaynaklar için bu çizgi merkezî, sıfırıncı katarı oluşturur. Bu yalnız aradaki tek orta nokta değil bütün orta dikmedir.",
          "Kaynaklar zıt fazlı ve eşit yerel genlikliyse aynı orta dikme düğüm olur. Genlikler farklıysa burada minimum ama sıfır olmayan salınım olabilir. Dolayısıyla “merkez her koşulda katardır” ifadesinin kaynak fazı koşulu eksiktir."
        ]
      },
      {
        "title": "Gerçek girişim çizgileri hiperboldür",
        "paragraphs": [
          "Bir noktadan iki odağa uzaklıkların farkı sabitse, uygun fark değeri için geometrik yer hiperbol dalıdır. Katar ve düğüm çizgileri bu yüzden kaynakları odak alan eğriler oluşturur; Δr=0 özel durumu orta dikmedir. Çizgiler yalnız kaynakları birleştiren doğru parçasına hapsolmaz; üst ve alt yarı düzlemlere uzanır.",
          "Üçgen eşitsizliği |Δr|≤d sınırını verir; d kaynaklar arası uzaklıktır. |Δr|<d için gerçek hiperbol dalı, eşitlikte kaynakların dışına uzanan özel doğrusal ışınlar oluşabilir. Kaynak merkezinin yakınında basit dalga modeli güvenilir değildir; çizim bu çekirdekleri örnek nokta olarak kullanmaz."
        ]
      },
      {
        "title": "λ/4 aralığı nerede geçerlidir?",
        "paragraphs": [
          "Yalnız kaynakları birleştiren doğru parçasında, orta noktadan işaretli x uzaklık için Δr=−2 x olur. Aynı fazlı kaynakta ardışık katar kesişimleri λ/2, bir katarla yanındaki düğüm kesişimi λ/4 kadar ayrılır. Bu bir doğru parçası üzerindeki konum bağıntısıdır.",
          "Yukarıdaki farklı y seviyelerinde hiperbol dallarının yatay aralıkları aynı değildir. Bütün iki boyutlu desen için “her iki çizgi arası λ/4” denmez. Ölçeksiz bir çizimde evrensel cetvel gibi λ/4 uygulamadan önce noktanın kaynak doğrusu üzerinde olduğunu kontrol et."
        ]
      },
      {
        "title": "Çizgi sayısında sınırı açık belirt",
        "paragraphs": [
          "Aynı fazlı ideal kaynaklarda iç hiperbolik katarlar için pozitif nλ<d değerlerini say; merkez katarını bir kez, iki yandaki karşılıkları ikişer say. Düğüm dalları için (n−1/2)λ<d, n=1,2,... koşulunu kullan. Burada “bir çizgi” üst ve alt kolu devam eden aynı işaretli yol farkı dalıdır.",
          "Eşitlik durumundaki dış ışınları bu sayıya katmıyoruz. Sayı d/λ arttıkça basamaklı değişir; sürekli doğru orantı yasası değildir. d<λ/2 olduğunda iç düğüm bulunmaz ama dalgalar yine üst üste biner ve merkez katarı vardır; “girişim hiç yoktur” sonucu çıkmaz."
        ]
      },
      {
        "title": "Dalga boyu ile kaynak aralığını değiştir",
        "paragraphs": [
          "d sabitken λ küçülürse daha fazla tam ve buçuklu kat |Δr|<d aralığına sığabilir; çizgi sayısı artabilir. Aynı süratte kaynak frekansını artırmak λ’yı küçültür. d büyürse de daha çok çizgi mertebesine yer açılır; her küçük değişim yeni çizgi doğurmak zorunda değildir.",
          "Kaynakları orta noktalarını sabit tutarak simetrik uzaklaştırırsan merkez doğrusu aynı yerde kalır. Kaynakların birini tek başına taşırsan orta dikme de değişir. λ değiştiğinde kaynak doğrusu üzerindeki λ/4 kesişim aralıkları değişir; uzaktaki eğri aralıkları ayrıca geometriye bağlıdır."
        ]
      },
      {
        "title": "Derinlik ve kaynak fazı birlikte düşünülür",
        "paragraphs": [
          "Homojen sığ su–uzun dalga yaklaşımında daha büyük derinlik v’yi artırır. Frekans sabitse λ artar; d aynıysa gözlenen iç çizgi sayısı azalabilir. Ortamın bütün bölgeleri aynı biçimde değişmiyorsa tek bir ortak λ kullanılamayabilir.",
          "Kaynak fazını değiştirmek ise λ’yı değiştirmeden deseni kaydırabilir. φ=π için katar ve düğüm koşulları yer değiştirir. φ başka değerler aldığında desen kaynak orta dikmesine göre aynı simetriyi göstermeyebilir; genel δ hesabına dönmek en güvenilir yoldur."
        ]
      },
      {
        "title": "Toplam genliği cebirle hesapla",
        "paragraphs": [
          "İki sinüzoidal katkının genliği A_top²=A₁²+A₂²+2 A₁A₂ cosδ ile bulunur. Aynı evrede toplam A₁+A₂, ters evrede |A₁−A₂| olur. δ=π/2 için A_top=√(A₁²+A₂²) çıkar; iki genliği sırf pozitif büyüklük oldukları için her noktada doğrudan toplayamazsın.",
          "Bu genlik bağıntısı aynı frekanslı katkılar içindir. Farklı frekanslarda toplam genliği sabit tek sinüs gibi yazmak genellikle uygun değildir; zamanla değişen zarf oluşabilir. Etkileşimli keşif koherent ve aynı frekanslı durumu çözer; frekans ayrımından doğan vuru modelini çözmüş sayılmaz."
        ]
      },
      {
        "title": "Etkileşimdeki işaretli faz",
        "paragraphs": [
          "Modelde kaynak 1 solda (−d/2; 0), kaynak 2 sağda (+d/2; 0). Seçilen P=(x; y) için r₁ ve r₂ gerçek Öklid uzaklıklarıyla hesaplanır. η₁=A₁cos(2πt/T−2πr₁/λ), η₂=A₂cos(2πt/T−2πr₂/λ+φ) kullanılır.",
          "Geometrik yayılma azalması ve viskoz kayıplar ihmal edilmiştir; genlik sürgüleri P’deki yerel katkı genlikleridir. Çizgiler faz koşullarını gösterir: genlikler eşit değilken kesik çizgi tam düğüm değil minimum faz çizgisidir. Kaynak çekirdeği 0,1 cm’den yakın noktalar model dışında bırakılmıştır."
        ]
      },
      {
        "title": "Şemayı okuyup bağımsız kontrol et",
        "paragraphs": [
          "Önce noktanın her kaynağa uzaklığını bul; iki uzaklığı toplamadan farklarını al. λ ile oranlayıp tam kat, buçuklu kat veya arada bir değer olup olmadığını incele. Kaynaklar aynı fazda değilse φ bilgisini ekle ve δ’yı hesapla.",
          "Son kontrol olarak toplam genlik |A₁−A₂| ile A₁+A₂ arasında kalmalıdır. Aynı fazlı eşit kaynaklarda orta dikme üzerindeki genlik 2 A olmalı; ters fazlı eşit kaynaklarda 0 olmalıdır. Zamanı değiştirmek çizgilerin yerini değiştirmez, yalnız noktanın anlık yüksekliğini değiştirir."
        ]
      }
    ],
    "examples": [
      {
        "title": "Yol farkından sıra",
        "prompt": "Aynı fazlı, koherent ve P’de eşit genlikli iki kaynak için λ=4 cm, r₁=18 cm, r₂=24 cm. P hangi çizgidedir?",
        "strategy": "Yol farkını λ cinsinden yaz.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "|Δr|=|24−18|=6 cm."
          },
          {
            "label": "Adım 2",
            "explanation": "6/4=1,5; bu değer n−1/2 için n=2 verir."
          },
          {
            "label": "Adım 3",
            "explanation": "İkinci düğüm çizgisidir; eşit yerel genlik nedeniyle P her an denge seviyesindedir."
          }
        ],
        "answer": "P ikinci düğüm üzerindedir.",
        "check": "İkinci katarın farkı 8 cm olurdu; 6 cm değil.",
        "pitfall": "Uzaklıkları 42 cm diye toplama."
      },
      {
        "title": "Üçgenle gerçek uzaklık",
        "prompt": "Kaynaklar (−3; 0) cm ve (+3; 0) cm, P=(0; 4) cm. Aynı fazlı koherent kaynakların P’deki genlikleri 2 mm. Toplam genlik nedir?",
        "strategy": "Her iki uzaklığı Pisagor ile denetle.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "r₁=r₂=√(3²+4²)=5 cm."
          },
          {
            "label": "Adım 2",
            "explanation": "Δr=0 olduğundan aynı fazlı katkılar P’de de aynı evrededir."
          },
          {
            "label": "Adım 3",
            "explanation": "Toplam genlik 2+2=4 mm; P merkez katarı üzerindedir."
          }
        ],
        "answer": "4 mm.",
        "check": "P’de anlık yükseklik zamanla−4 mm ile+4 mm arasında değişebilir.",
        "pitfall": "r₁+r₂=10 cm değerini yol farkı sanma."
      },
      {
        "title": "İç çizgileri say",
        "prompt": "Aynı fazlı, eşit yerel genlikli ideal kaynaklarda d=10 cm, λ=4 cm. |Δr|<d koşulundaki katar ve düğüm dallarını say; dış sınır ışınlarını katma.",
        "strategy": "Tam ve buçuklu λ katlarını ayrı listele.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Katar için pozitif farklar 4 ve 8 cm; merkez dahil 1+2×2=5 dal."
          },
          {
            "label": "Adım 2",
            "explanation": "Düğüm için pozitif farklar 2 ve 6 cm; 10 cm sınırdır ve bu sayımın dışındadır."
          },
          {
            "label": "Adım 3",
            "explanation": "İki işaretli farkın her biri için karşılıklar sayılır: 2×2=4 düğüm dalı."
          }
        ],
        "answer": "5 katar,4 düğüm dalı.",
        "check": "En büyük kabul edilen mutlak fark 8 cm ve 6 cm olup 10 cm’den küçüktür.",
        "pitfall": "Eşitlikteki özel dış ışını iç hiperbol dalı sayma."
      },
      {
        "title": "Ters fazda merkez",
        "prompt": "Eş frekanslı iki kaynak φ=180° ile çalışıyor. Orta dikme üzerindeki P’ye yerel genlikler 3 mm ve 1 mm olarak ulaşıyor. Genlik nedir, tam düğüm mü?",
        "strategy": "Δr=0 ve δ=π kullan.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Orta dikmede r₁=r₂, geometrik yol farkı 0."
          },
          {
            "label": "Adım 2",
            "explanation": "Toplam genlik|3−1|=2 mm."
          },
          {
            "label": "Adım 3",
            "explanation": "Minimum faz çizgisindedir ama tam düğüm değildir; eşit genlik koşulu sağlanmaz."
          }
        ],
        "answer": "2 mm; tam düğüm değil.",
        "check": "Alt sınır|A₁−A₂| tam sağlanıyor.",
        "pitfall": "Ters faz tek başına sıfır genlik garantilemez."
      },
      {
        "title": "Kaynak doğrusu üzerindeki konum",
        "prompt": "Aynı fazlı, koherent kaynaklar x=−6 cm ve x=+6 cm’de. λ=4 cm. Kaynaklar arasındaki doğru parçasında yerel katkı genlikleri eşit ve sıfırdan büyüktür. Bu parçada ilk pozitif x düğümü ile ilk pozitif x katarı nerede?",
        "strategy": "Arada Δr=−2 x; mutlak fark 2|x|.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "İlk düğüm için |Δr|=λ/2=2 cm; x=1 cm."
          },
          {
            "label": "Adım 2",
            "explanation": "İlk merkez dışı katar için |Δr|=λ=4 cm; x=2 cm."
          },
          {
            "label": "Adım 3",
            "explanation": "Merkez 0’dan ilk düğüme 1 cm=λ/4; merkezden ilk dış katara 2 cm=λ/2."
          }
        ],
        "answer": "Düğüm x=1 cm; katar x=2 cm.",
        "check": "İki nokta da kaynakların arasındadır; bu aralık kuralı genel 2 B desene taşınmaz.",
        "pitfall": "λ/4’ü her yükseklikteki eğriler arası uzaklık sanma."
      }
    ],
    "recall": [
      {
        "prompt": "Bir noktanın o an yüksekliği 0 ise düğüm müdür?",
        "answer": "Zorunlu değil. Düğüm bütün zamanlarda sıfır toplam titreşimdir; katar da çevrimde denge seviyesinden geçer."
      },
      {
        "prompt": "Aynı fazlı kaynaklarda yol farkı koşulları?",
        "answer": "Katar |Δr|=nλ, n=0,1,...; eşit yerel genlikli düğüm |Δr|=(n−1/2)λ, n=1,2,... olur."
      },
      {
        "prompt": "λ/4 aralığının koşulu nedir?",
        "answer": "Kaynakları birleştiren doğru parçasındaki ardışık katar–düğüm kesişimleri için geçerlidir; bütün hiperbolik desende sabit değildir."
      },
      {
        "prompt": "Orta dikme ne zaman düğüm olur?",
        "answer": "İki kaynak zıt fazlı, aynı frekanslı ve o noktada eşit genlikliyse orta dikmede tam düğüm oluşur."
      }
    ],
    "items": [
      {
        "prompt": "Aynı fazlı, koherent ve P’de eşit yerel genlikli iki dalga kaynağında λ=2 cm. P’nin kaynaklara uzaklıkları 7 cm ve 10 cm. P hangi çizgidedir?",
        "options": [
          "Birinci düğüm",
          "İkinci düğüm",
          "İkinci katar",
          "Birinci katar",
          "Merkez katarı"
        ],
        "answer": 1,
        "hint": "|Δr|=3 cm=1,5λ.",
        "explanation": "Düğüm koşulu(n−1/2)λ için n=2; ikinci düğüm olur.",
        "guidance": {
          "knowledge": [
            "Aynı fazlı eş genlikli kaynaklarda yarım-tam dalga boylu yol farkları tam sönüm çizgilerini verir."
          ],
          "strategy": "İki uzaklığın farkını al ve düğüm sırasını λ/2,3λ/2 düzeniyle eşleştir.",
          "steps": [
            "Yol farkının büyüklüğü |10 − 7| = 3 cm olur.",
            "λ = 2 cm ile fark 3/2 = 1,5 dalga boyudur; bu 3λ/2’dir.",
            "İlk düğüm λ/2, ikinci düğüm 3λ/2 olduğundan P ikinci düğümdedir."
          ],
          "optionReasons": [
            "Birinci düğüm için yol farkı λ/2 = 1 cm gerekir; verilen fark 3 cm’dir.",
            "Doğru. 3 cm = 3λ/2 ikinci düğüm koşuludur.",
            "İkinci katar için 2λ = 4 cm gerekir;3 cm tam kat değildir.",
            "Birinci katar farkıλ = 2 cm’dir; verilen fark buna eşit değildir.",
            "Merkez katarında yol farkı 0 olur; burada uzaklıklar eşit değildir."
          ],
          "commonError": "1,5 dalga boyunu birinci düğüm diye adlandırma; ilk yarım dalgaλ/2’dir.",
          "check": "Koherens ve eş yerel genlik bilgisi tam düğüm yorumunu mümkün kılar; yalnız yol farkı genel durumda genliği sıfırlamaz."
        }
      },
      {
        "prompt": "Aynı fazlı koherent kaynakların bir P noktasına uzaklıkları 13 cm ve 19 cm, λ=3 cm. P’deki katkılar eşit genlikli. Hangi çizgi üzerindedir?",
        "options": [
          "İkinci düğüm",
          "Birinci katar",
          "İkinci katar",
          "Üçüncü düğüm",
          "Merkez katarı"
        ],
        "answer": 2,
        "hint": "Yol farkını dalga boyuna böl.",
        "explanation": "|19−13|/3=2 tam kat; ikinci katar çizgisidir.",
        "guidance": {
          "knowledge": [
            "Aynı fazlı koherent kaynaklarda yol farkının tam λ katı olduğu yerler katar koşulunu sağlar."
          ],
          "strategy": "Mutlak uzaklıkları değil aralarındaki farkı dalga boyu ile karşılaştır.",
          "steps": [
            "P’ye uzaklık farkı |19 − 13| = 6 cm hesaplanır.",
            "6 cm / 3 cm = 2 olduğundan katkılar iki tam çevrim farkla aynı evrede ulaşır.",
            "Sıfır fark merkez katarı, birλ fark birinci katar, ikiλ fark ikinci katardır."
          ],
          "optionReasons": [
            "İkinci düğüm farkı 3λ/2 = 4,5 cm’dir;6 cm değildir.",
            "Birinci katar için fark 3 cm olmalıydı; verilen fark iki katıdır.",
            "Doğru. Yol farkı 2λ olduğundan ikinci katar çizgisidir.",
            "Üçüncü düğüm 5λ/2 = 7,5 cm fark ister; burada 6 cm vardır.",
            "Merkez katarı için uzaklıklar eşit olmalıdır;13 cm ile 19 cm eşit değildir."
          ],
          "commonError": "13 cm veya 19 cm’nin tek başına kaçλ olduğuna bakarak katar sırası verme.",
          "check": "Δr/λ tam sayı 2’dir; aynı fazlı kaynaklar için düğüm gerektiren yarım-tam sayı değildir."
        }
      },
      {
        "prompt": "Kaynaklar(−3; 0) cm ve(+3; 0) cm’de, P=(0; 4) cm. Aynı fazlı koherent dalgaların P’deki yerel genlikleri 1,5 mm. P’nin toplam titreşim genliği kaç mm?",
        "options": [
          "3",
          "0",
          "6",
          "1,5",
          "4,5"
        ],
        "answer": 0,
        "hint": "İki uzaklık da 5 cm.",
        "explanation": "Yol farkı 0 olduğundan katkılar aynı evrede; 1,5+1,5=3 mm.",
        "guidance": {
          "knowledge": [
            "Girişimde önce yolun getirdiği faz farkı, sonra yerel genliklerin bileşkesi değerlendirilir."
          ],
          "strategy": "Simetrik koordinatlardan iki uzaklığı bul; aynı faz bilgisini bu geometrinin üzerine uygula.",
          "steps": [
            "P’nin her kaynağa uzaklığı √(3² + 4²) = 5 cm’dir; yol farkı 0 olur.",
            "Kaynaklar aynı fazlı olduğundan P’de de katkılar aynı evrededir.",
            "Her katkı 1,5 mm olduğuna göre toplam titreşim genliği 1,5 + 1,5 = 3 mm’dir."
          ],
          "optionReasons": [
            "Doğru. Eş yol ve aynı fazla iki 1,5 mm katkı 3 mm genlik verir.",
            "Sıfır toplam eş genlikte ters evre ister; burada eş yol aynı kaynak fazını korur.",
            "6 mm, iki genliğin toplamını bir kez daha ikiyle çarpar; her kaynak katkısı zaten 1,5 mm’dir.",
            "1,5 mm yalnız tek kaynağın yerel genliğidir; öteki aynı evrede katkı yapmaktadır.",
            "4,5 mm, verilen iki katkının toplamı değildir;3 × 1,5 gibi üçüncü bir katkı ekler."
          ],
          "commonError": "Geometrik kaynaklar arası uzaklığı dalga genliğiyle karıştırma; cm yolu, mm titreşim yüksekliğini ifade eder.",
          "check": "Bileşke, iki genliğin toplamından büyük olamaz; burada üst sınır 3 mm’ye ulaşılır."
        }
      },
      {
        "prompt": "Aynı frekanslı iki dalganın bir noktadaki yerel genlikleri 4 mm ve 1 mm. Tam ters evrede ulaşıyorlar. Toplam titreşim genliği kaç mm?",
        "options": [
          "0",
          "3",
          "5",
          "4",
          "1"
        ],
        "answer": 1,
        "hint": "Ters evrede genlik farkının mutlak değeri.",
        "explanation": "|4−1|=3 mm. Genlikler eşit olmadığından tam düğüm yoktur.",
        "guidance": {
          "knowledge": [
            "Tam ters evredeki iki yerel titreşimin bileşke genliği genlik farkının mutlak değeridir."
          ],
          "strategy": "Ters evrede toplamayı cebirsel fark olarak yap; tam düğüm için ayrıca eşit genlik gerekir.",
          "steps": [
            "Aynı noktada katkılar 4 mm ve 1 mm, aralarındaki faz farkıπ’dir.",
            "Bileşke genlik|4 − 1| = 3 mm bulunur.",
            "4 ile 1 eşit olmadığından küçük katkı büyüğü tümüyle söndüremez; tam düğüm oluşmaz."
          ],
          "optionReasons": [
            "Tam sönüm için ters evreye ek olarak eşit yerel genlik gerekir;4 mm ile 1 mm eşit değildir.",
            "Doğru. Ters evre bileşkesi|4 − 1| = 3 mm’dir.",
            "5 mm aynı evredeki 4 + 1 toplamıdır; kökte tam ters evre verilmiştir.",
            "4 mm, küçük kaynağın katkısını yok sayar; ters evrede 1 mm çıkarılmalıdır.",
            "1 mm yalnız küçük katkıdır; bileşke iki katkının farkıdır."
          ],
          "commonError": "Her yıkıcı girişimi sıfır genlik sanma; eşit olmayan katkılar minimumda da hareket edebilir.",
          "check": "Genlik olası|4 − 1| ile 4 + 1 aralığında olmalıdır; ters evre alt sınır 3 mm’yi verir."
        }
      },
      {
        "prompt": "Eşit genlikli koherent iki kaynak zıt fazlı çalışıyor. Kaynakların orta dikmesi üzerindeki noktalar hangi durumdadır?",
        "options": [
          "Merkez katarı",
          "Her an çift tepe",
          "Frekansı iki kat titreşim",
          "Her an çift çukur",
          "Tam düğüm"
        ],
        "answer": 4,
        "hint": "Uzaklıklar eşit, kaynak faz farkıπ.",
        "explanation": "Geometrik faz farkı 0 ama kaynak farkıπ olduğundan eşit katkılar her an birbirini sıfırlar.",
        "guidance": {
          "knowledge": [
            "Toplam faz farkında hem kaynakların başlangıç fazı hem yolların farkı bulunur."
          ],
          "strategy": "Orta dikmenin eş yolunu kullanıp kaynakların zıt fazını ayrıca koru.",
          "steps": [
            "Orta dikmedeki P iki kaynağa eşit uzaklıktadır; yolun eklediği göreli faz 0’dır.",
            "Kaynaklarınπ faz farkı eş yollarda kaybolmaz; P’deki eş katkılar yine ters evrededir.",
            "Bir katkıA cosφ iken diğeri−A cosφ olur; toplam her an 0, yani tam düğümdür."
          ],
          "optionReasons": [
            "Orta dikme yalnız aynı fazlı kaynaklarda merkez katarı olur; burada kaynak fazları zıttır.",
            "İki tepe aynı anda ulaşmaz; bir katkı tepedeyken eş katkı çukurdadır.",
            "Toplama dalgaların ortak frekansını iki katına çıkarmaz; bu noktada titreşim tamamen söner.",
            "İki çukur aynı anda oluşmaz; katkılar tam ters işaretlidir.",
            "Doğru. Eş yol, zıt faz ve eş yerel genlik birlikte kalıcı sönüm verir."
          ],
          "commonError": "Eş uzaklığın bütün kaynak faz farklarını sıfırladığını varsayma.",
          "check": "Tek bir anın yüksekliği değil bütünφ değerleri için toplamın 0 olması düğüm kanıtıdır."
        }
      },
      {
        "prompt": "Aynı fazlı ideal iki kaynak için d=9 cm ve λ=4 cm. Yalnız |Δr|<d iç hiperbolik katar dalları, merkez dahil kaç tanedir?",
        "options": [
          "7",
          "3",
          "5",
          "6",
          "4"
        ],
        "answer": 2,
        "hint": "Pozitif nλ<9 değerlerini say.",
        "explanation": "n=1 ve 2 için 4 ve 8 cm vardır. İki simetrik çift ve merkez 1+4=5 dal verir.",
        "guidance": {
          "knowledge": [
            "Aynı fazlı iki ideal kaynakta katar yol farkları 0,±λ,±2λ,… değerleridir; iç dallarda|Δr| < d koşulu uygulanır."
          ],
          "strategy": "Önce izinli pozitif yol farklarını bul, sonra simetrik iki tarafı ve merkezi say.",
          "steps": [
            "λ = 4 cm ve d = 9 cm için pozitif izinli katar farkları 4 cm ve 8 cm’dir;12 cm sınırı aşar.",
            "Her pozitif farkın−4 ve−8 olmak üzere karşı tarafta bir simetrik dalı vardır.",
            "Merkez 0 dalını bir kez ekleyince 0,±4,±8 toplam 5 dal eder."
          ],
          "optionReasons": [
            "7 dal demek±12 cm çiftini de katmak olur;12 cm < 9 cm koşulunu sağlamaz.",
            "3 dal yalnız merkez ve±4 cm çiftini sayar; izinli±8 cm çifti eksik kalır.",
            "Doğru. İki simetrik çift ve bir merkez toplam 5 daldır.",
            "6 sayısı merkez dalını da bir çift gibi sayabilir; merkez tek daldır.",
            "4, iki pozitif sıranın iki tarafını sayar ama merkez katarını dışarıda bırakır."
          ],
          "commonError": "Katar sırası sayısıyla toplam dal sayısını karıştırma; merkez ve iki simetrik taraf ayrı sayılmalıdır.",
          "check": "Merkez dahil simetrik katar sayısı bu durumda tek sayı olmalı; bulunan 5 bu kontrolü sağlar."
        }
      },
      {
        "prompt": "Aynı fazlı, koherent iki kaynakta d=9 cm, λ=4 cm. İlgili bölgede yerel katkı genlikleri eşit ve sıfırdan büyüktür. |Δr|<d iç düğüm dalları kaç tanedir?",
        "options": [
          "4",
          "3",
          "5",
          "2",
          "6"
        ],
        "answer": 0,
        "hint": "Pozitif(n−1/2)λ<9 değerleri.",
        "explanation": "2 ve 6 cm uygundur; 10 cm değildir. Her işaret için ikişer olmak üzere toplam 4 dal olur.",
        "guidance": {
          "knowledge": [
            "Aynı fazlı eş genlikli kaynakların düğümleri yarım-tam dalga boyu yol farklarında oluşur."
          ],
          "strategy": "Pozitif düğüm farklarını açıkça listele ve her biri için simetrik diğer işareti ekle.",
          "steps": [
            "λ = 4 cm ile pozitif düğüm farklarıλ/2 = 2 cm,3λ/2 = 6 cm,5λ/2 = 10 cm,… olur.",
            "|Δr| < 9 cm koşulunu 2 ve 6 sağlar;10 sağlamaz.",
            "İzinli−6,−2,+2,+6 farkları toplam 4 düğüm dalı verir; merkez 0 bunlardan biri değildir."
          ],
          "optionReasons": [
            "Doğru. İki pozitif sıra her iki tarafta bulunduğu için 4 dal vardır.",
            "3, simetrik işaret çiftlerini eksik veya merkezle karışık sayar; izinli liste dört ayrı fark içerir.",
            "5, katar sayısındaki merkez 0’ı düğümlere ekler; aynı fazlı kaynaklarda merkez düğüm değildir.",
            "2, yalnız pozitif farkları sayar; negatif taraftaki iki simetrik dalı atlar.",
            "6,±10 cm dallarını da sayar; bunlar verilen|Δr| < 9 cm bölgesinin dışındadır."
          ],
          "commonError": "Düğüm sırasını sayarken katarın 0,λ,2λ listesini kullanma; ilk değerλ/2’dir.",
          "check": "Düğüm dalları burada merkezden ikili simetriyle gelir; sayının çift olması 4 sonucunu destekler."
        }
      },
      {
        "prompt": "Aynı fazlı koherent kaynaklar x=−5 cm ve +5 cm’de. λ=4 cm. Kaynaklar arasındaki doğru parçasında yerel katkı genlikleri eşit ve sıfırdan büyüktür. Bu doğru parçasında ilk pozitif x düğümü nerede bulunur?",
        "options": [
          "x=1 cm",
          "x=4 cm",
          "x=0,5 cm",
          "x=3 cm",
          "x=2 cm"
        ],
        "answer": 0,
        "hint": "Arada |Δr|=2|x|, ilk düğüm farkı λ/2.",
        "explanation": "2 x=2 cm, x=1 cm. Bu λ/4 aralığı kaynak doğrusu üzerindedir.",
        "guidance": {
          "knowledge": [
            "Kaynakları birleştiren doğru parçasında, simetrik iki kaynak için yol farkının büyüklüğü 2|x| olur."
          ],
          "strategy": "Verilen parça üzerinde uzaklıkları x ile yaz ve ilk düğüm farkıλ/2’ye eşitle.",
          "steps": [
            "0 < x < 5 cm için uzaklıklar 5 + x ve 5 − x olduğundan fark 2x’tir.",
            "İlk düğüm farkıλ/2 = 4/2 = 2 cm’dir; dolayısıyla 2x = 2 cm olur.",
            "Buradan x = 1 cm bulunur; sonuç belirtilen kaynaklar arası doğru parçasına aittir."
          ],
          "optionReasons": [
            "Doğru. x = 1 cm’de yollar 6 cm ve 4 cm, farkλ/2 = 2 cm olur.",
            "x = 4 cm’de yol farkı 8 cm = 2λ’dır; aynı fazlı kaynaklarda katar koşuludur.",
            "x = 0,5 cm’de fark 1 cm = λ/4’tür; ilk düğüm için gereken yol farkının yarısıdır.",
            "x = 3 cm’de fark 6 cm = 3λ/2’dir; bu ilk değil ikinci pozitif düğümdür.",
            "x = 2 cm’de fark 4 cm = λ’dır; ilk pozitif katar koşuludur."
          ],
          "commonError": "Yol farkıλ/2 ile konum x’i eşitleme; bu doğru parçasında yol farkı 2x’tir.",
          "check": "Bulduğun noktadaki iki gerçek uzaklığı 6 cm ve 4 cm olarak yeniden hesaplamak,2x ilişkisini bağımsız doğrular."
        }
      },
      {
        "prompt": "İki eş frekanslı koherent dalganın aynı noktadaki genlikleri 3 mm ve 4 mm; aralarındaki faz farkı 90°. Toplam genlik kaç mm?",
        "options": [
          "3,5",
          "7",
          "25",
          "1",
          "5"
        ],
        "answer": 4,
        "hint": "A²=A₁²+A₂²+2 A₁A₂ cosδ.",
        "explanation": "cos 90°=0 olduğundan A=√(9+16)=5 mm.",
        "guidance": {
          "knowledge": [
            "Eş frekanslı titreşimlerin genlik bileşkesi faz farkına bağlıdır; genlikler her durumda aritmetik toplanmaz."
          ],
          "strategy": "90° faz farkının çapraz terimi sıfırladığını kullanıp genlik karesinden genliğe geç.",
          "steps": [
            "A² = 3² + 4² + 2 × 3 × 4 cos 90° yazılır.",
            "cos 90° = 0 olduğundan A² = 9 + 16 = 25 mm² bulunur.",
            "Pozitif genlik A = √25 = 5 mm’dir;3–4–5 dik bileşke sonucu elde edilir."
          ],
          "optionReasons": [
            "3,5 mm aritmetik ortalamadır; aynı noktadaki fazör bileşkesi ortalama alma işlemi değildir.",
            "7 mm ancak aynı evredeki 3 + 4 üst sınırıdır; burada faz farkı 90°’dir.",
            "25, genliğin karesidir ve mm² birimi taşır; genlik için karekök gerekir.",
            "1 mm tam ters evredeki|4 − 3| alt sınırıdır;90° faz farkına uymaz.",
            "Doğru. Faz farkı 90° ile bileşke 5 mm bulunur."
          ],
          "commonError": "Genliğin karesini genliğin kendisi diye verme; son karekök ve birim kontrolünü yap.",
          "check": "Bileşke 1 mm ile 7 mm arasında olmalı;5 mm bu sınırların içindedir ve ne tam yapıcı ne tam sönüm durumudur."
        }
      },
      {
        "prompt": "Bir leğen fotoğrafında P’nin toplam anlık yüksekliği 0 görülüyor. Başka faz veya zaman bilgisi verilmemiş. Hangisi kesin söylenebilir?",
        "options": [
          "P’de toplam titreşim genliği kesin 0’dır.",
          "Her iki kaynak kesin kapalıdır.",
          "P kesin düğümdür.",
          "P kesin merkez katarıdır.",
          "Tek fotoğrafla P’nin düğüm olduğu belirlenemez."
        ],
        "answer": 4,
        "hint": "Denge geçişiyle kalıcı sıfır titreşimi ayır.",
        "explanation": "Katar veya ara genlikli noktalar da çevrimde 0 yüksekliğinden geçebilir; düğüm için tüm zaman davranışı veya faz/genlik koşulu gerekir.",
        "guidance": {
          "knowledge": [
            "Anlık yükseklik bir zamandaki konumu, titreşim genliği ise zaman boyunca en büyük uzaklığı anlatır."
          ],
          "strategy": "Tek görüntünün hangi zaman bilgisini eksik bıraktığını bir karşı örnekle göster.",
          "steps": [
            "Sıfırdan büyük genlikli bir nokta A cos(ωt + φ) hareketinde dengeyi geçerken anlık yükseklik 0 olabilir.",
            "Bu yüzden bir katar veya ara genlikli nokta da tek fotoğrafta 0 yüksekliğinde görünebilir.",
            "Düğüm demek için her zaman sıfır titreşim veya eş genlikli ters evre gibi ek kanıt gerekir; mevcut bilgi bunu vermez."
          ],
          "optionReasons": [
            "Tek andaki 0 yüksekliği A = 0 demek değildir; salınan nokta denge geçişinde de 0 olur.",
            "Açık kaynakların dalgaları bazı anlarda toplam 0 verebilir; kaynakların kapalı olması zorunlu değildir.",
            "Düğüm bütün zamanlarda 0 titreşim ister; tek fotoğraf bu sürekliliği göstermez.",
            "Merkez katarı yorumu kaynakların geometrisi ve fazını gerektirir; kök bu bilgileri vermemiştir.",
            "Doğru. Anlık 0 görüntüsü tek başına kalıcı düğüm kanıtı değildir."
          ],
          "commonError": "Bir zaman örneğini bütün çevrim için doğru kabul etme; yüksekliğin 0 olmasıyla genliğin 0 olması farklıdır.",
          "check": "İkinci bir zamanda nokta sıfırdan farklı yükseklikte görülse düğüm yorumu elenirdi; ilk fotoğraf bu olasılığı dışlamaz."
        }
      }
    ],
    "source": "MEBİ AYT Fizik PDF 188–191, OGM 12 Fizik 015, Su Dalgalarında Girişim Olayı sunusu 051 PDF 1–21 ve Dersler Cepte 12 Fizik 5. sayı PDF 11–12 karşılaştırılarak yazılmış özgün anlatım ve sorular. λ/4 yalnız kaynak doğru parçasında kullanılır; eşit genlik, sabit faz, gerçek hiperbol geometrisi ve sınır ışınları ayrı açıklanır."
  }
];

export const forge022PhysicsTopics: Record<string, string> = Object.fromEntries(packs022.map(p => [p.id, p.topic]));
export const forge022PhysicsGuides: LessonGuide[] = packs022.map(p => ({ id: p.id, minutes: p.minutes, objectives: p.objectives, sections: p.sections, examples: p.examples, recall: p.recall, source: p.source }));
export const forge022PhysicsLessons: Lesson[] = packs022.map(p => ({ id: p.id, subjectId: "ayt-fizik", title: txt(p.title), minutes: p.minutes, objectives: p.objectives.map(txt), body: p.sections.map(s => ({ title: txt(s.title), text: txt(s.paragraphs.join("\n\n")) })), source: txt(p.source), tags: [p.topic, "Özgün öğretim soruları"], questions: p.items.map((q, i) => ({ id: `f022-${p.id}-${i + 1}`, prompt: txt(q.prompt), options: q.options.map(txt), answer: q.answer, hint: txt(q.hint), explanation: txt(q.explanation), guidance: q.guidance, skill: p.id })) }));
