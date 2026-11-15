import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";
const finiteRange = (n: number, min: number, max: number) =>
  Number.isFinite(n) && n >= min && n <= max;
export function sarcomere017(length: number) {
  if (!finiteRange(length, 2, 3.2)) throw new RangeError("SARCOMERE_LENGTH");
  const thick = 1.6,
    thin = 1,
    iTotal = length - thick,
    h = Math.max(0, length - 2 * thin),
    overlap = thin - (length - thick) / 2;
  return {
    length,
    thick,
    thin,
    a: thick,
    iTotal,
    iHalf: iTotal / 2,
    h,
    overlap,
  };
}
export const muscleSteps017 = {
  signal: "Sinir ucundan ACh",
  calcium: "SR’den Ca salımı",
  expose: "Troponin ve açık bölge",
  stroke: "Hazır başın kuvvet vuruşu",
  detach: "ATP bağlanması ve ayrılma",
  pump: "Ca’nın SR’ye geri taşınması",
} as const;
export type MuscleStep017 = keyof typeof muscleSteps017;
/** Selective teaching conditions; this is not a continuous kinetic simulation. */
export function muscleStep017(
  step: MuscleStep017,
  calcium: boolean,
  atp: boolean,
) {
  if (!Object.hasOwn(muscleSteps017, step)) throw new RangeError("MUSCLE_STEP");
  const needsCa = step === "expose" || step === "stroke",
    needsAtp = step === "detach" || step === "pump";
  const enabled = (!needsCa || calcium) && (!needsAtp || atp);
  return {
    step,
    enabled,
    needsCa,
    needsAtp,
    evidence:
      step === "signal"
        ? "ACh presinaptik motor akson ucundan çıkar; kas uç plağı postsinaptik hedef bölgedir. Bu kart sinir ucunun kendi salım koşullarını sağlam kabul eder."
        : step === "calcium"
          ? "Kas uyarısı SR’den sarkoplazmaya Ca salımına bağlanır. Bu kart SR’nin salım basamağını sağlam kabul eder; Ca düğmesi sonraki köprü ortamının ayrı koşuludur."
          : step === "expose"
            ? calcium
              ? "İskelet kasında Ca-troponin bağlantısı tropomiyozin düzenini değiştirerek bağlanma bölgesini açmayı destekler."
              : "Verilen köprü ortamında Ca desteği kapalı; bu seçili açık-bölge adımı gösterilmiyor."
            : step === "stroke"
              ? enabled
                ? "Bu tek vuruş kartında baş önceden ATP hidroliziyle hazırdır; Ca koşulu sürerse Pi ayrılmasıyla vuruş gösterilir. Yeni serbest ATP yokluğu bu hazırlanmış başın tek vuruşunu silmez; ayrılma ve sonraki çevrim ayrı koşullardır."
                : "Hazır baş verilmiş olsa da Ca koşulu kapalı; bu kartta açık bölgeye bağlanıp vuruş gösterilmez. Yeni ATP’nin yokluğu ile Ca koşulunu birbirine karıştırma."
              : step === "detach"
                ? atp
                  ? "Yeni ATP’nin miyozine bağlanması bağlı başın aktinden ayrılmasına katkı verir; hidrolizle hazırlanma farklı adımdır."
                  : "ATP yok: bağlı başın normal ayrılması bu kartta engelli. Enerji yokluğunu kesin gevşeme sayma."
                : atp
                  ? "SERCA gibi ATP kullanan düzenekler Ca’yı SR’ye geri taşımayı destekler; gevşeme bütünüyle enerjisiz değildir."
                  : "ATP yok: verilen aktif Ca geri taşıması engelli. Ca kendiliğinden yok olmuş veya her köprü ayrılmış sayılmaz.",
  };
}
export function motorRecruitment017(units: number, unitForce: number) {
  if (
    !Number.isInteger(units) ||
    !finiteRange(units, 0, 5) ||
    !finiteRange(unitForce, 0, 4)
  )
    throw new RangeError("MOTOR_RECRUITMENT");
  return { units, force: units * unitForce, unitForce };
}
export function cubeSurface017(divisions: number) {
  if (!Number.isInteger(divisions) || !finiteRange(divisions, 1, 4))
    throw new RangeError("CHEWING_CUBE");
  const edge = 2,
    each = edge / divisions,
    fragments = divisions ** 3;
  return {
    divisions,
    each,
    fragments,
    volume: 8,
    surface: fragments * 6 * each ** 2,
    ratio: divisions,
  };
}
export const swallowingStages017 = [
  "Solunum ve ağız hazırlığı",
  "İstemli ağız evresi",
  "Faringeal koruma evresi",
  "Özofagusta peristaltik taşıma",
] as const;
export function swallowing017(
  stage: number,
  protectedAirway: boolean,
  waveSpeed: number,
  time: number,
) {
  if (
    !Number.isInteger(stage) ||
    !finiteRange(stage, 0, 3) ||
    !finiteRange(waveSpeed, 1, 5) ||
    !finiteRange(time, 0, 20)
  )
    throw new RangeError("SWALLOWING");
  const coordinated = stage !== 2 || protectedAirway,
    position = stage === 3 ? Math.min(20, waveSpeed * time) : 0,
    arrived = stage === 3 && position === 20;
  return {
    stage,
    coordinated,
    protectedAirway,
    position,
    arrived,
    airwayOpen: stage !== 2 || !protectedAirway,
    upperOpen: stage === 2 && protectedAirway,
    lowerOpen: arrived,
    evidence:
      stage === 0
        ? "Lokma ağızda hazırlanırken hava yolu açıktır; bu modelde özofagus geçişi henüz başlamadı."
        : stage === 1
          ? "Ağızdan yutağa istemli başlangıç seçildi. Sonraki koruma ve sfinkter adımları ayrıca gerekir."
          : stage === 2
            ? protectedAirway
              ? "Koruma eşgüdümü açık: nazofarinks ve larengeal korunma, üst özofagus girişinin uygun gevşemesiyle birlikte gösterilir."
              : "Koruma eşgüdümü bu deneyde engelli: başarılı özofagus geçişi gösterilmez. Bu kişisel yutma değerlendirmesi veya davranış deneyi değildir."
            : arrived
              ? "Verilen 20 cm oyuncak taşıma yolu tamamlandı; alt geçiş açılarak mideye ulaşma gösterilir. Bu gerçek herkesin anatomik boyu veya süresi değildir."
              : "Özofagusta arkadan daralma ve önden gevşeme ile kas kaynaklı dalga ilerliyor; yer çekimi tek zorunlu motor değildir.",
  };
}
export const gastricSignals017 = {
  vagus: "Vagus; sinirsel haber",
  gastrin: "Gastrin; kanla gelen haber",
  duodenum: "Duodenal geri denetim",
} as const;
export type GastricSignal017 = keyof typeof gastricSignals017;
export function gastricScene017(
  signal: GastricSignal017,
  acidicExample: boolean,
  precursor: boolean,
  mucus: boolean,
  chain: number,
  cuts: number,
) {
  if (
    !Object.hasOwn(gastricSignals017, signal) ||
    !Number.isInteger(chain) ||
    !finiteRange(chain, 8, 20) ||
    !Number.isInteger(cuts) ||
    !finiteRange(cuts, 0, chain - 1)
  )
    throw new RangeError("GASTRIC_SCENE");
  return {
    signal,
    acidicExample,
    precursor,
    mucus,
    activationExample: acidicExample && precursor,
    chain,
    cuts,
    fragments: cuts + 1,
    bondsBefore: chain - 1,
    bondsAfter: chain - 1 - cuts,
    water: cuts,
    route:
      signal === "vagus"
        ? "Sinirsel düzenleme"
        : signal === "gastrin"
          ? "Kan yoluyla düzenleme"
          : "Bağırsaktan geri denetim",
    evidence:
      signal === "vagus"
        ? "Duyusal önceleme ve vagus bağlantısı salgı-hareket yanıtını destekleyebilir; bu bir kanal içine dökülen enzim değildir."
        : signal === "gastrin"
          ? "Gastrin kana verilen habercidir; pepsinin lümendeki protein hidroliziyle aynı görev değildir."
          : "Duodenal asit ve besin girdileri mide boşalmasını geri düzenleyebilir; sekretin-asit/bikarbonat ve CCK-besin yolları ayrıdır.",
    activationEvidence: acidicExample
      ? precursor
        ? "Verilen uygun asidik örnekte pepsinojenin pepsine aktivasyonu gösterilir; gerçek hız veya pH eşiği hesaplanmaz."
        : "Asidik ortam seçili fakat bu kartta pepsinojen yok: aynı öncül aktivasyonu gösterilmez."
      : "Uygun asidik örnek kapalı: bu kart pepsinojenin aynı aktivasyonunu göstermez; bütün pH aralığının nicel enzim eğrisi değildir.",
  };
}
export function gastricFluid017(initial: number, added: number, out: number) {
  if (
    !finiteRange(initial, 0, 300) ||
    !finiteRange(added, 0, 100) ||
    !finiteRange(out, 0, initial + added)
  )
    throw new RangeError("GASTRIC_FLUID");
  return { initial, added, out, final: initial + added - out };
}

type Unit017 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: LessonGuide["recall"];
  items: [string, string, string[], string, string][];
  source: string;
};
const data: Unit017[] = [
  {
    id: "kas-doku",
    topic: "detail-304",
    title: "Kas doku: filamentten hareketin denetimine",
    minutes: 48,
    objectives: [
      "Kas türlerini hücre, örgütlenme ve denetim bakımından ayır.",
      "Sarkomer boyu değişirken sabit kalan filament ve bant uzunluklarını açıkla.",
      "Uyarı, kalsiyum, ATP ve gevşemeyi ayrı basamaklarla ilişkilendir.",
      "Tek lif yanıtını bütün kasın kuvveti ve enerji kaynaklarından ayır.",
    ],
    sections: [
      {
        title: "Hareketin yanında duruş, dolaşım ve ısı",
        paragraphs: [
          "Kas doku kimyasal enerjiyi kuvvet ve mekanik işe dönüştüren özelleşmiş hücrelerden oluşur. İskeletin hareketi kadar sindirim kanalındaki ilerleme ve kalbin pompalaması da kas etkinliğiyle ilişkilidir. Her kasılma vücudun yer değiştirmesi demek değildir: bir yükü aynı konumda tutarken de kuvvet üretilebilir. Kasların duruşa, organların desteklenmesine ve ısı oluşumuna katkısını ayrı örneklerle düşün.",
          "İskelet kası etkinliği toplardamar ve lenf akımını da destekleyebilir; kalp kasının pompa işi ise ayrı örgütlenmiştir. Kaynaklarda verilen vücut kütlesi veya ısı yüzdeleri yaş, etkinlik ve ölçüm koşuluyla değişebilir; herkesin değişmez oranları sayılmaz. Kuvvet, enerji ve güç de aynı nicelik değildir. Kas enerji yaratmaz; ATP ve besinlerden sağlanan enerjinin bir bölümünü mekanik işe, bir bölümünü ısıya dönüştürür.",
        ],
      },
      {
        title: "Organ, demet, hücre ve molekülü aynı çizgi sanma",
        paragraphs: [
          "İskelet kası kas demetlerini, demetler kas liflerini içerir; lif adı burada tek kas hücresini karşılar. Hücrenin içinde çok sayıda miyofibril, miyofibriller boyunca tekrar eden sarkomerler bulunur. Aktin ve miyozin filamentleri ise protein yapılı moleküler düzeneklerdir. Bir lif çizmekle tek aktin ipliği çizmek farklı ölçeklerdir; şemada hücre sınırını ve filamentleri ayır.",
          "Kas hücresinin zarına sarkolemma, sitoplazmasına sarkoplazma, özelleşmiş endoplazmik retikulumuna sarkoplazmik retikulum denir. SR kalsiyum depolama ve salımıyla kasılmanın düzenlenmesine katılır. Miyofibril, mitokondri veya çekirdeğin eş adı değildir. Geometrik sarkomer modelindeki birkaç çizgi bütün hücrede yalnız o kadar filament bulunduğu anlamına gelmez; çizim örgütlenmeyi açıklamak için sadeleştirilmiştir.",
        ],
      },
      {
        title: "İskelet kası: çok çekirdekli lif, farklı iş yükleri",
        paragraphs: [
          "İskelet kası lifleri embriyonik gelişimde hücrelerin birleşmesiyle oluşan uzun, çok çekirdekli yapılardır. Aktin-miyozin düzeni enine çizgilenme verir. Somatik motor sinirlerle bağlantılı olmaları, bütün kasılmalarının her an bilinçli emirle başladığı anlamına gelmez; reflekslerde de iskelet kası yanıt verir. İstemli hareketle somatik örgütlenme arasındaki ilişkiyi refleks istisnasını silmeden öğren.",
          "Miyoglobin protein yapılı, demir içeren bir oksijen bağlayıcıdır; kandaki hemoglobinle aynı görev yerinde değildir. İskelet lifleri hız, mitokondri yoğunluğu ve yorulmaya dayanım yönünden farklılaşabilir. Bu nedenle bütün iskelet kaslarını yalnız hızlı ve çabuk yorulan tek tip saymak eksiktir. Uzun süre duruş sağlayan liflerle kısa süreli güçlü hareketleri destekleyen özellikler farklı ağırlıklarda bulunabilir.",
        ],
      },
      {
        title: "Düz kasta bant yokluğu kasılma proteini yokluğu değildir",
        paragraphs: [
          "Düz kas hücreleri çoğunlukla mekik biçimli ve tek çekirdeklidir. Düzenli sarkomer bantlaşması görülmemesi, aktin veya miyozinin olmadığı anlamına gelmez. Sindirim, damar, solunum ve üreme sistemlerinde farklı görevler üstlenebilirler. Sinirsel, hormonal veya gerilme gibi yerel girdilerle düzenlenmeleri dokuya göre değişir; her düz kasın tek ve aynı uyarıya ihtiyaç duyduğu söylenmez.",
          "İskelet kasındaki troponin merkezli düzenleme düz kasa aynen taşınmaz; düz kasta kalsiyumun kalmodulin ve miyozin düzenlenmesi üzerinden etkileri önemlidir. Düz kaslarda da enerji metabolizması ve mitokondri vardır. Yavaş veya uzun süreli gerilim oluşturabilmeleri, hiçbir koşulda yorulmaz veya ATP kullanmaz oldukları anlamına gelmez. Kas türü karşılaştırmasında mikroskobik görünüm, kontrol ve enerji gereksinimini ayrı alanlarda tut.",
        ],
      },
      {
        title: "Kalp kası: çizgili ama yalnız dış sinire bağlı değil",
        paragraphs: [
          "Kalp kası hücreleri dallanmış, çoğunlukla tek çekirdekli ve çizgili yapılardır; bazı hücrelerde iki çekirdek de bulunabilir. Hücreler iskelet lifindeki gibi tek dev hücreye kaynaşmak yerine bağlantılarla bir ağ oluşturur. Mekanik ve elektriksel bağlantılar, dokunun eşgüdümlü pompa işine katkı sağlar. Çizgili görünüm bu kasın iskelet kasıyla aynı istemli kontrol altında olduğunu göstermez.",
          "Kalbin ritim oluşturabilen hücreleri dış otonom sinir uyarısı olmadan da etkinlik başlatabilir; otonom sistem hızı ve işlevi düzenler. Dış sinirden bağımsız başlayabilme bütün kalp hücrelerinin aynı görevde olduğu anlamına gelmez. Uyarılabilirlik ve uzun refrakter dönem, iskelet kasındaki tetanik kuvvet örneğinin kalbe aynen taşınmasını sınırlar. Kalp yüksek enerji gereksinimiyle ilişkilidir; enerji ve oksijen koşulları önemsiz değildir.",
        ],
      },
      {
        title: "Sarkomer haritası: Z, A, I ve H",
        paragraphs: [
          "İki Z çizgisi arasındaki birim sarkomerdir. İnce aktin filamentleri Z çizgilerine bağlanıp merkeze uzanır; kalın miyozin filamentleri ortadadır. A bandı kalın filamentin bütün boyunu kapsar; yalnız aktin-miyozin örtüşmesinin adı değildir. A bandının ortasındaki yalnız kalın filament bulunan bölüm H bölgesidir. Böylece H, A’nın dışında başka bir toplam uzunluk değil, onun içindeki alt bölgedir.",
          "I bandı yalnız ince filamentin bulunduğu alanı anlatır. Bir Z çizgisi etrafındaki I bandını komşu sarkomerlerle birlikte görmek ile tek sarkomerin iki ucundaki toplam yalnız ince filament alanı saymak farklı ölçüm sınırlarıdır. Etkileşimde bu yüzden tek sarkomer içindeki iki yarım I’nın toplamı ayrıca yazılır. Ölçüyü karşılaştırmadan önce hangi iki işaret arasında ve hangi alt alanın sayıldığını belirle.",
        ],
      },
      {
        title: "Kayan filamentte ne değişir, ne sabit kalır?",
        paragraphs: [
          "Kısalma sırasında ince filamentler kalın filamentlere göre merkeze kayar; Z çizgileri yaklaşır. Aktin ve miyozin filamentlerinin kendi boyları aynı kalır, dolayısıyla A bandı değişmez. I ve H alanları daralır; uygun örtüşmede H kaybolabilir. Sarkomerin boyunun kısalması protein ipliklerinin küçülmesi veya kas hücresinin içeriğinin yok olması değildir. Örtüşme miktarı değişen geometrik özelliktir.",
          "Modelde kalın filament 1,6 µm, her ince filament 1,0 µm olarak sabit verilir; sarkomer 2,0–3,2 µm aralığında seçilir. I toplamı L−1,6 ve H=max(0, L−2,0) olur. Bu aralık gerçek kuvvet-uzunluk eğrisinin tamamı veya her hücrenin zorunlu ölçüsü değildir. Yaklaşık hacim korunumu anlatıldığında boyun kısalmasıyla kesitin değişebileceği de düşünülür; bütün boyutların aynı anda küçülmesi sonucu çıkarılmaz.",
        ],
      },
      {
        title: "Sinir-kas kavşağında mesaj hangi taraftan çıkar?",
        paragraphs: [
          "Motor akson ucuna gelen aksiyon potansiyeli presinaptik kalsiyum girişini ve asetilkolin salımını destekler. Asetilkolin kas zarındaki reseptörlere bağlanır; uygun yerel elektriksel değişim kas aksiyon potansiyelini başlatabilir. Sinir ucundaki kalsiyum ile kasın SR deposundan çıkan kalsiyum aynı konumdaki tek havuz değildir. Önce haberci salan sinir ucunu, sonra postsinaptik kas uç plağını işaretle.",
          "Kas zarındaki uyarı sarkolemma ve T tübül bağlantıları üzerinden SR kalsiyum salımına bağlanır. SR’den sarkoplazmaya çıkan kalsiyum, filamentlerin etkileşime uygun hale gelmesini destekler. Bir motor nöron birçok kas lifini uyarabilir; nöron ve onun uyardığı lifler motor birimdir. Kavşağın tümünü tek bir serbest uç gibi çizmek veya ACh’yi kasın kendi uç plağından salınmış göstermek kaynak-hedef ayrımını bozar.",
        ],
      },
      {
        title: "Kalsiyum kilidi ve çapraz köprü döngüsü",
        paragraphs: [
          "İskelet kasında kalsiyum troponine bağlanarak tropomiyozin düzeninin değişmesine, aktin üzerindeki bağlanma bölgelerinin açılmasına katkı verir. Enerji yüklenmiş miyozin başı aktine bağlanabilir; fosfatın ayrılması kuvvet vuruşuyla ilişkilidir. ADP ayrıldıktan sonra yeni ATP’nin başa bağlanması aktinden ayrılmayı sağlar. Her basamağı yalnız ATP parçalanır cümlesiyle geçmek ayrılma ile vuruşu karıştırır.",
          "ATP hidrolizi miyozin başını yeni bir çevrime uygun konuma hazırlar; kalsiyum ve uygun bağlanma koşulları sürdükçe çevrim yinelenebilir. Bütün başların aynı anda aynı evrede olması gerekmez. ATP’nin bağlanmasıyla ATP’nin hidrolizi farklı olaydır; ATP yokluğunda bağlı köprülerin ayrılması bozulabilir. Bu yüzden enerji azlığı kesin gevşeme yapar biçiminde bir anahtar doğru değildir; hangi basamağın engellendiğini sor.",
        ],
      },
      {
        title: "Gevşeme de enerji ve sinyal sonlandırma ister",
        paragraphs: [
          "Sinaptik asetilkolinin etkisinin sonlanması ve kas uyarısının değişmesiyle SR’den salım azalabilir. Kalsiyumun SR’ye geri taşınması ATP kullanan taşıma düzenekleriyle desteklenir. Sarkoplazmadaki kalsiyum azalınca troponin-tropomiyozin düzeni bağlanma bölgelerini yeniden kapatır. Bu, kalsiyumun yok edilmesi değil hücre içindeki bir bölmeye geri taşınmasıdır; miktar ve konum ayrı tutulmalıdır.",
          "Kasın eski uzunluğuna dönmesi ayrıca yük, karşıt kaslar ve elastik özelliklerle ilişkilidir. Gevşemenin bütünüyle enerjisiz olduğu veya ATP bittiğinde her başın otomatik ayrılacağı düşüncesi yanlıştır. Etkileşimde kalsiyum kapısı ve ATP koşulunu ayrı seçmek, bağlanma-gevşeme ayrımını görünür kılar. Gösterilen evreler öğretim amaçlıdır; gerçek bir lifin bütün iyon akımlarını veya kişideki kas hastalığını hesaplayan araç değildir.",
        ],
      },
      {
        title: "ATP ve kreatin fosfatta atomları değil fosfat aktarımını izle",
        paragraphs: [
          "Kasın doğrudan kullandığı enerji taşıyıcısı ATP’dir; hazır ATP havuzu sınırlıdır ve sürekli yeniden sentez gerekir. Kreatin fosfat, ADP’ye fosfat vererek ATP yenilenmesini hızlı destekleyebilir. Basitleştirilmiş denklem kreatin fosfat+ADP⇌kreatin+ATP biçimindedir. Kreatin, keratin proteiniyle aynı madde değildir. Denklemden ATP ürününü silip yalnız enerji yazmak madde ve fosfat hesabını eksik bırakır.",
          "Dinlenme ve toparlanma koşullarında ATP kullanılarak kreatin fosfat havuzu yenilenebilir. Kaynaktaki yaklaşık saniye değerleri efor şiddeti, depo ve başka koşullara bağlı öğretim örnekleridir; herkes için tam 15 saniyede biten zorunlu bir saat değildir. ATP havuzunun kararlı kalması ATP kullanılmadığı anlamına da gelmez: yeniden sentez tüketimi karşılayabilir. Kapalı bir deney miktarıyla kan akışı olan canlı kasın net bilançosunu eşitleme.",
        ],
      },
      {
        title: "Enerji yolları sırayla açılan üç kapı değildir",
        paragraphs: [
          "Fosfajen sistemi, glikoliz ve oksidatif metabolizma etkinliğe farklı oranlarda birlikte katkı verebilir. Kısa ve yoğun işte hızlı ATP yenilenmesi, uzun süreli etkinlikte oksidatif katkı önemli olabilir; kesin oranlar verilen deney olmadan hesaplanmaz. Kas glikojeni kasın kendi yakıtına katkı verir; fosfatlı glikozun doğrudan kana aynı biçimde aktarılmasıyla karaciğerin kan glikozu desteği karıştırılmaz.",
          "Laktat yalnız işe yaramayan bir atık değildir; başka dokularda kullanılabilir ve karaciğer yollarına katılabilir. Yorulma tek başına laktat miktarından veya sonraki gün ağrısının tamamı laktattan açıklanmaz; iyon, fosfat, enerji ve uyarı-kasılma süreçleri birlikte etkili olabilir. Her kasılmada ATP, oksijen ve glikojenin kesin azalıp bütün ürünlerin kesin arttığı listesi, açık sistemde yeniden sentez ve taşınma verilmeden net miktar yasası değildir.",
        ],
      },
      {
        title: "Tek seğirme, frekans ve motor birim katılımı",
        paragraphs: [
          "Bir uyarının ardından mekanik seğirmede gizli evre, kasılma evresi ve gevşeme evresi ayrılır. Aksiyon potansiyelinin elektriksel grafiğiyle oluşan kuvvet grafiğinin yüksekliği ve süresi aynı nicelikler değildir. Uyarılar lif tam gevşemeden yinelenirse mekanik yanıtlar toplanabilir; yüksek frekansta tetanik kuvvet görülebilir. Bu, tetanoz enfeksiyonuyla veya her klinik kramp mekanizmasıyla özdeş değildir.",
          "Bütün kasın kuvveti, etkin motor birim sayısı ve uyarı sıklığı gibi etkenlerle derecelenebilir. Tek lifte uygun sabit koşullarda aksiyon potansiyelinin ya hep ya hiç niteliği, bütün kasın yalnız tek kuvvet üretebildiği anlamına gelmez. Daha güçlü uyaranla daha çok lifin katılması ile tek lifin elektriksel genliğinin artması ayrıdır. Verilen oyuncak modelde birim kuvvetler toplanabilir; gerçek mekanik katkıların her durumda aynı sabit katsayıyla toplandığı iddia edilmez.",
        ],
      },
      {
        title: "Tonus ve EMG bilinç ya da kuvvetin aynası değildir",
        paragraphs: [
          "Kas tonusu dinlenmede belirli gerilimin ve duruş desteğinin sürdürülmesiyle ilişkilidir. Refleks ağlar ve motor birim etkinliği bu düzenlemeye katkı verir. Bilincin kapalı olduğu bütün durumlarda tonusun tamamen yok olduğu genellemesi doğru değildir; uyku evresi, anestezi ve nörolojik koşullar farklılaşır. Hafif kas etkinliğiyle büyük istemli hareketin farkını yalnız bilincin açık-kapalı düğmesine indirgeme.",
          "EMG kasın elektriksel etkinliğinin kaydıyla ilişkilidir; mekanik kuvveti veya kas uzunluğunu doğrudan aynı birimde ölçmez. Bir grafikteki artışı yorumlamadan önce ölçülen niceliği ve ölçeği oku. Elektriksel etkinlik, sinir iletimi ve mekanik yanıt birbirine bağlı olsa da tek veri bütün basamakların sağlamlığını veya belirli bir hastalığı kesin göstermez. Bu derste kayıt örnekleri mekanizma ve kanıt ayrımını öğretir.",
        ],
      },
      {
        title: "Tendon, karşıt görev ve birlikte stabilite",
        paragraphs: [
          "Tendon kasın ürettiği kuvveti kemiğe ileten bağ dokudur; ligament ise eklemde kemik-kemik bağlantısıyla ilişkilidir. Tendon kas gibi aktif kasılmaz fakat fiziksel gerilmede elastik biçimde uzayabilir. Bu nedenle asla uzamaz ifadesiyle canlı dokunun bütün mekanik özelliklerini silme. Kas bir kemiği çekerek etki eder; ileri-geri hareket ve eklem dengesi çoğunlukla farklı kasların eşgüdümüyle kurulur.",
          "Bir görevde zıt etki yapan kaslar antagonist, aynı hareketi destekleyenler sinerjist olarak adlandırılabilir. Bu roller eklem ve göreve bağlıdır; bir çiftin biri her an tamamen kasılı diğeri tamamen gevşek olmak zorunda değildir. Eş kasılma eklemi sabitlemeye katkı sağlayabilir. Hareket şekillerini incelerken kemiğin, tendonun ve kasın temas noktalarını koru; sarkomerin iç kaymasını bütün uzvun çizimde kendiliğinden sürüklenmesiyle karıştırma.",
        ],
      },
    ],
    examples: [
      {
        title: "A sabitken I ve H değişir",
        prompt:
          "Tek sarkomerde kalın filament 1,6 µm, her ince filament 1,0 µm. L uzunluğu 2,6’dan 2,2 µm’ye iniyor. Tek sarkomer içindeki toplam I ve H değişimleri nedir?",
        strategy: "Ölçüm sınırını ve sabit filamentleri önce yaz.",
        steps: [
          {
            label: "Başlangıç",
            explanation:
              "I toplamı L−A, H ise iki ince filamentin uçları arasındaki boşluktur.",
            expression: "I=1,0; H=0,6 µm",
          },
          {
            label: "Son durum",
            explanation: "Sabit filamentler aynı kalırken L=2,2 kullanılır.",
            expression: "I=0,6; H=0,2 µm",
          },
          {
            label: "Değişmezler",
            explanation: "A ve her filamentin kendi boyu değişmemiştir.",
            expression: "A=1,6 µm",
          },
        ],
        answer: "I 1,0→0,6; H 0,6→0,2 µm; A sabit.",
        check:
          "Her uçtaki yarım I sırasıyla 0,5 ve 0,3 µm; toplamla karıştırılmadı.",
        pitfall: "Örtüşme artışını aktin veya miyozinin kısalması sayma.",
      },
      {
        title: "Seri birimlerin uzunluğu",
        prompt:
          "İdeal olarak seri bağlanan 1.000 sarkomerin her biri 2,6 µm’den 2,2 µm’ye kısalıyor. Toplam boy ve farkı mm cinsinden hesapla.",
        strategy: "Seri uzunlukları topla, sonra birimi çevir.",
        steps: [
          {
            label: "İlk boy",
            explanation: "Bin birim seri olduğundan uzunluklar eklenir.",
            expression: "1.000×2,6=2.600 µm=2,6 mm",
          },
          {
            label: "Son boy",
            explanation: "Aynı sayıda birimin yeni uzunluğu toplanır.",
            expression: "1.000×2,2=2.200 µm=2,2 mm",
          },
          {
            label: "Fark",
            explanation: "Aynı birimde ilk boydan son boyu çıkar.",
            expression: "2,6−2,2=0,4 mm",
          },
        ],
        answer: "2,6 mm’den 2,2 mm’ye; kısalma 0,4 mm.",
        check:
          "Bu yalnız verilen seri modeldir; paralel lifler uzunlukça aynı şekilde eklenmez.",
        pitfall: "µm ile mm arasında bin katsayısını unutma.",
      },
      {
        title: "Köprü ve iyon pompasını ayrı say",
        prompt:
          "Bir oyuncak maliyet hesabında 4 miyozin başının her biri 5 tam çevrim yapıyor; her çevrim 1 ATP kullanıyor. Ayrıca verilen Ca geri taşıması için 3 ATP harcanıyor. Toplam maliyet?",
        strategy: "Köprü çevrimlerini say, verilen ek işi ayrıca ekle.",
        steps: [
          {
            label: "Çevrim",
            explanation: "Baş sayısıyla çevrim sayısını çarp.",
            expression: "4×5=20",
          },
          {
            label: "Köprü ATP’si",
            explanation: "Her çevrim bir ATP koşulu açıkça verilmiştir.",
            expression: "20×1=20 ATP",
          },
          {
            label: "Ek iş",
            explanation: "Ca taşıması için verilen üç ATP eklenir.",
            expression: "20+3=23 ATP",
          },
        ],
        answer: "23 ATP.",
        check:
          "Bu maliyet gerçek bütün kas için evrensel katsayı değildir; ayrılma ve pompalama işleri ayrıdır.",
        pitfall: "Gevşemeyi sıfır enerji sayıp üç ATP’yi atlama.",
      },
      {
        title: "Katılım artışı genlik artışı değildir",
        prompt:
          "Aynı deney koşulunda her motor birimin 2 N katkı verdiği doğrusal oyuncak modelde önce 3, sonra 5 birim etkin. Kuvvetleri ve farkı bul.",
        strategy: "Etkin birim sayısıyla verilen katkıyı çarp.",
        steps: [
          {
            label: "İlk katılım",
            explanation: "Üç birim toplam katkı verir.",
            expression: "3×2=6 N",
          },
          {
            label: "Son katılım",
            explanation: "Beş birim aynı koşuldadır.",
            expression: "5×2=10 N",
          },
          {
            label: "Yorum",
            explanation: "Fark katılan birim sayısından doğar.",
            expression: "10−6=4 N",
          },
        ],
        answer: "6 N ve 10 N; artış 4 N.",
        check:
          "Tek lif aksiyon potansiyelinin genliğinin büyüdüğü sonucu çıkarılmaz.",
        pitfall:
          "Bütün kasın kuvvet derecelenmesini ya hep ya hiç kuralıyla reddetme.",
      },
    ],
    recall: [
      {
        prompt: "A bandı ile örtüşme aynı uzunluk mudur?",
        answer: "Hayır; A kalın filamentin tüm boyudur, H bölgesini de içerir.",
      },
      {
        prompt: "ATP bağlanması ile hidrolizi hangi iki işi ayırır?",
        answer:
          "Bağlanma miyozinin ayrılmasına; hidroliz yeni çevrime hazırlanmasına katkıdır.",
      },
      {
        prompt: "Gevşeme neden bütünüyle enerjisiz değildir?",
        answer:
          "Ca’nın SR’ye geri taşınması ATP gerektiren düzeneklerle desteklenir.",
      },
      {
        prompt: "Bütün kas kuvveti neden tek lif AP’siyle aynı değildir?",
        answer:
          "Motor birim katılımı ve uyarı frekansı mekanik kuvveti derecelendirebilir.",
      },
    ],
    items: [
      [
        "İskelet kasında kas lifi, miyofibril ve filament ilişkisini doğru veren seçenek hangisidir?",
        "Bir kas lifi tek hücredir; içinde miyofibriller ve onların filament düzenleri bulunur",
        [
          "Bir kas lifi tek aktin molekülüdür",
          "Miyofibril hücrenin çekirdeğinin diğer adıdır",
          "Her filament bağımsız tam kas organıdır",
          "Kas lifi tüm kolun kemik ve eklemlerini kapsar",
        ],
        "Organ, hücre ve molekül ölçeklerini ayır.",
        "İskelet kasındaki lif tek kas hücresidir; hücre içinde miyofibriller, bunlar boyunca sarkomer ve protein filamentleri bulunur. Bir çizgiyle gösterilmeleri bu yapıların aynı ölçek veya kimlikte olduğu anlamına gelmez.",
      ],
      [
        "Düz kasın enine çizgilenme göstermemesi hangi sonucu verir?",
        "Aktin ve miyozin yokluğu değil, düzenli sarkomer bantlaşmasının bulunmamasını gösterir",
        [
          "Düz kasta hiç ATP kullanılmaz",
          "Düz kasta hiçbir mitokondri bulunmaz",
          "Düz kas hücresinin zarı yoktur",
          "Düz kaslar yalnız istemli somatik emirle çalışır",
        ],
        "Mikroskobik düzen ile protein varlığını ayır.",
        "Düz kas aktin-miyozin kullanır fakat iskelet kasındaki düzenli sarkomer bantlaşmasına sahip değildir. Sinir, hormon veya yerel girdilerle düzenlenebilir; çizgi yokluğundan enerji veya organel yokluğu çıkmaz.",
      ],
      [
        "Kalp kasının dış otonom sinirden uyarı almadan da ritmik etkinlik başlatabilmesi neyi gösterir?",
        "İç ritim mekanizması ile otonom düzenleme ayrı ilişkilerdir",
        [
          "Kalp kasının hiç enerjiye ihtiyaç duymadığını",
          "Bütün kalp hücrelerinin tek dev hücreye kaynaştığını",
          "Kalp kasının istemli iskelet kasıyla aynı olduğunu",
          "Otonom sistemin kalp hızını hiçbir koşulda etkilemediğini",
        ],
        "Başlatma yeteneğini düzenleme etkisinin yokluğu sayma.",
        "Kalbin ritim oluşturucu hücreleri iç etkinlik başlatabilir; otonom sistem bu ritmi ve işlevi düzenler. Dış uyarı olmadan başlayabilme, enerji gereksinimini veya sinirsel düzenlemeyi ortadan kaldırmaz.",
      ],
      [
        "Tek sarkomerde kalın filament 1,6 µm, her ince filament 1,0 µm. L=2,2 µm için toplam I=L−1,6 ve H=max(0, L−2,0) veriliyor. I ve H sırasıyla kaç µm?",
        "0,6 ve 0,2",
        ["1,6 ve 1,0", "0,3 ve 0,6", "2,2 ve 1,6", "0,2 ve 0,6"],
        "İki farklı formülde aynı L değerini kullan.",
        "Toplam I=2,2−1,6=0,6 µm; H=max(0; 2,2−2,0)=0,2 µm olur. A bandı 1,6 µm kalır; tek uçtaki yarım I ile iki uç toplamı aynı ölçüm değildir.",
      ],
      [
        "Kayan filament modelinde sarkomer kısalırken hangisi sabit kalır?",
        "Aktin ve miyozinin kendi boyları; dolayısıyla A bandı",
        [
          "Z çizgileri arasındaki mesafe",
          "Her koşulda H bölgesinin boyu",
          "Her koşulda I alanlarının toplamı",
          "Örtüşme miktarının kesin sıfır olması",
        ],
        "Kayan parçanın boyuyla parçalar arası konumu ayır.",
        "Filamentler birbirine göre kayar; kendi uzunlukları küçülmez. Z çizgileri yaklaşırken I ve H daralabilir, örtüşme artar. A kalın filament boyunu temsil ettiği için bu modelde değişmez.",
      ],
      [
        "Sinir-kas kavşağında asetilkolin salım yeri ile kasılmaya katılan SR kalsiyumunun kaynağını doğru ayıran seçenek hangisidir?",
        "ACh motor akson ucundan; kas içi Ca salımı sarkoplazmik retikulumdan",
        [
          "ACh kemikten; kas içi Ca yalnız mide lümeninden",
          "ACh postsinaptik kas uç plağından; Ca yalnız çekirdekten",
          "ACh aktin ipliğinden; Ca yalnız safra kesesinden",
          "ACh miyoglobinden; Ca yalnız Z çizgisinin yıkımından",
        ],
        "Presinaptik sinir ucu ile kasın iç deposu farklıdır.",
        "Motor akson ucu ACh nörotransmitterini sinaptik aralığa verir; kas zarındaki yanıt uyarı-kasılma bağıyla SR’den Ca salımına bağlanır. Sinir ucundaki Ca girişi de vardır, fakat bu kasın SR havuzuyla aynı konum değildir.",
      ],
      [
        "Aktine bağlı miyozin başına yeni ATP’nin bağlanmasının döngüdeki temel sonucu hangisidir?",
        "Miyozin başının aktinden ayrılmasının sağlanması",
        [
          "ATP bağlanmasının her zaman aktini kalıcı kısaltması",
          "ATP yokluğunda bütün köprülerin otomatik ayrılması",
          "Kalsiyumun hiçbir taşıma olmadan yok olması",
          "Miyozinin farklı bir hücreye dönüşmesi",
        ],
        "Bağlanma, hidroliz ve kuvvet vuruşu ayrı basamaklardır.",
        "Yeni ATP’nin bağlanması miyozinin aktinden ayrılmasına katkı verir; hidroliz başı yeni çevrime hazırlar. ATP yokluğu kesin gevşeme değildir ve Ca’nın SR’ye geri taşınması da enerji gerektirebilir.",
      ],
      [
        "Basitleştirilmiş kreatin fosfat aktarımını madde hesabıyla doğru gösteren denklem hangisidir?",
        "Kreatin fosfat+ADP ⇌ kreatin+ATP",
        [
          "Keratin+ADP → aktin+ısı",
          "Kreatin fosfat+ADP → yalnız enerji",
          "ATP → yeni fosfor atomları",
          "ADP+su → her koşulda sınırsız ATP",
        ],
        "Bir fosfatın ADP’ye aktarılması ATP’yi yeniler.",
        "Kreatin fosfat ADP’ye fosfat vererek ATP yenilenmesini destekler; basitleştirilmiş denklemde kreatin ve ATP ürünleri korunur. Keratin farklı bir proteindir; enerji korunumu atomların veya ATP ürününün silinmesi değildir.",
      ],
      [
        "Verilen oyuncak hesapta 4 miyozin başı 5’er çevrimde birer ATP, ayrıca Ca geri taşıması 3 ATP kullanıyor. Toplam kaç ATP harcanır?",
        "23",
        ["8", "12", "20", "60"],
        "Önce baş×çevrim, sonra verilen ek maliyet.",
        "Köprü çevrim sayısı 4×5=20’dir; her çevrim 1 ATP koşuluyla 20 ATP eder. Verilen pompalama maliyeti 3 ATP eklenince 23 bulunur. Bu birim maliyetleri yalnız bu sorunun açık varsayımıdır.",
      ],
      [
        "Aynı koşullarda daha çok motor birim etkinleşince bütün kas kuvveti artıyor. Hangisi zorunlu sonuç değildir?",
        "Tek lifin aksiyon potansiyeli genliğinin büyüdüğü",
        [
          "Katılan lif sayısının artabildiği",
          "Bütün kas kuvvetinin derecelenebildiği",
          "Tek lif yanıtıyla bütün kas yanıtının farklı ölçütler olduğu",
          "Motor birim kavramının nöron ve uyardığı lifleri kapsadığı",
        ],
        "Katılım sayısını tek lifin elektriksel genliğiyle eşitleme.",
        "Motor birim katılımı bütün kasın kuvvetini değiştirebilir. Bu, tek lifteki aksiyon potansiyelinin genliğinin zorunlu büyüdüğünü göstermez; elektriksel olay ve toplam mekanik kuvvet farklı niceliklerdir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1, PDF 54–61; OGM Dersler Cepte Destek ve Hareket, PDF 20–22; OGM Kas Sistemi sunusu seçili metin ve şekilleri. Kaynaklarla karşılaştırılmış özgün anlatım, vektör şemaları ve öğretim soruları; resmî sınav sorusu değildir.",
  },
  {
    id: "sindirim-agiz-yutak-yemek-borusu",
    topic: "detail-305",
    title: "Ağızdan mideye: sindirim ve güvenli taşıma yolu",
    minutes: 48,
    objectives: [
      "Mekanik parçalama, kimyasal sindirim ve emilimi ayır.",
      "Diş, dil ve tükürüğün lokma oluşumuna katkılarını açıkla.",
      "Yutma evrelerinde burun, hava ve yemek yollarının koordinasyonunu izle.",
      "Özofagusun duvarı, sfinkterleri ve peristaltik taşımasını ilişkilendir.",
    ],
    sections: [
      {
        title: "Dört iş, dört farklı soru",
        paragraphs: [
          "Besinin alınması, sindirim, emilim ve sindirilmeyen artıkların uzaklaştırılması birbirine bağlı ama farklı olaylardır. Yemek ağza girdiğinde bütün moleküller hücreye girmiş sayılmaz; sindirim kanalının lümeni hücre dışı bir bölmedir. Sindirim büyük besinlerin işlenmesini, emilim ise uygun ürünlerin epitel bariyerini aşmasını anlatır. Emilimle besinin hücrede enerji için kullanılması da aynı basamak değildir.",
          "Su, iyon, vitamin ve bazı küçük besinler büyük polimerler gibi önce yapı taşlarına hidroliz edilmek zorunda değildir. Ancak küçük olmak her molekülün her zardan serbestçe geçeceğini garanti etmez; taşıyıcı, çözünürlük ve hücrenin seçiciliği önemlidir. Sindirilmeyen artığın anüsten çıkışı ile hücresel metabolizma atıklarının böbrek gibi yollarla uzaklaştırılması aynı işlev olarak adlandırılmamalıdır. Önce maddeyi ve geçtiği bölmeyi belirle.",
        ],
      },
      {
        title: "Mekanik parçalama molekül bağını koparmak değildir",
        paragraphs: [
          "Dişlerle çiğneme ve kaslarla karıştırma besini fiziksel parçalara ayırabilir; kimyasal sindirimde ise enzimlerle bağ hidrolizi vardır. Daha çok küçük parçanın toplam yüzey alanı artabilir ve enzimlerin ulaşabildiği alan genişleyebilir. Bir ekmeği bölmek, nişasta moleküllerinin tamamını aynı anda glikoza çevirmek değildir. Yiyecek parçası ve molekül ölçeklerini ayrı göstermek temel bir görsel ayrımdır.",
          "Modelde aynı hacimli bir küpün eş küçük küplere ayrılması yüzey alanını açıklayan oyuncak geometridir. Gerçek yiyeceklerin biçimi, gözenekleri ve enzime erişimi değiştiğinden yüzey iki kat olduysa sindirim hızı kesin iki kat olur sonucu verilmez. Safranın yağ damlalarını küçültmesi de mekanik örnektir; hidroliz yapan lipazla aynı iş değildir. Safra ayrıntısı sonraki bağırsak- yardımcı organ ünitesine bağlı bir karşılaştırmadır.",
        ],
      },
      {
        title: "İnsan yalnız hücre dışı sindirim yapan hücrelerden oluşmaz",
        paragraphs: [
          "İnsanın beslenmesinde büyük moleküllerin sindirim kanalı lümeninde enzimlerle parçalanması hücre dışı sindirim örneğidir. Buna karşılık hücreye alınmış bazı maddelerin lizozomal yollarla yıkılması hücre içi süreçtir. Savunma hücresinin aldığı mikroorganizmayı işlemesi, besinin ağızdan ilerleyişiyle aynı konumda değildir. Hücre dışı sözü vücut dışında anlamına gelmez; kanal lümeni bunun iyi bir karşı örneğidir.",
          "Besin kanalının sırası ağız, yutak, özofagus, mide, ince bağırsak, kalın bağırsak ve anüstür. Tükürük bezleri, pankreas ve karaciğer yardımcı salgılarıyla bu yola katılır; yenilen lokma pankreasın veya karaciğerin içinden kanalın devamıymış gibi geçmez. Şemada organın bir kanalla salgı göndermesi ile lokmanın geçtiği ana lümen farklı çizgilerle gösterilmelidir. Rota bilgisi sonraki salgı ve emilim anlatımlarının önkoşuludur.",
        ],
      },
      {
        title: "Ağız boşluğu bir işleme ve hazırlama alanıdır",
        paragraphs: [
          "Ağız dudak, yanak, damak, dil ve yutakla ilişkili bir boşluktur; iç yüzeyinin mukozası koruyucu epitel örgütlenmesi taşır. Dişler fiziksel parçalamaya, dil ve yanak hareketleri yiyeceği dişlere yöneltmeye ve tükürükle karıştırmaya katkı verir. Sonuçta yutulabilir lokma, yani bolus hazırlanır. Dilin tadın alınması ve konuşmaya katkısı da vardır; organın tek işi besini aşağı itmek değildir.",
          "Çiğneme besinin sert dış bölümlerini kırarak enzim erişimini kolaylaştırabilir ve geçişe uygun kıvam oluşturur. Mukozanın bulunması bütün besinlerin aynı hızda emildiği veya ağızdan bütün besinlerin kana geçtiği anlamına gelmez. Ağızda mekanik ve kimyasal olaylar birlikte başlayabilir; bu iki olayın aynı anda olması aynı moleküler iş olduklarını göstermez. Her yapının yaptığı işi kaynak, hedef ve madde ölçeğiyle açıkla.",
        ],
      },
      {
        title: "Dişin görünen tacı ile canlı pulpasını ayır",
        paragraphs: [
          "Bir dişin dışta kalan kısmı taç, diş eti düzeyindeki bölümü boyun, çene içindeki bölümü köktür. Taçtaki mine mineralce zengin sert örtüdür; altındaki dentin köke doğru da uzanan ayrı dokudur. Diş özünde, yani pulpada damarlar, sinirler ve ilgili hücreler bulunur. Mineyi sinir taşıyan pulpayla veya dentini kemiğin tamamen aynı adıyla eşitlemek doğru değildir.",
          "Diş çeşitleri göreve göre kesme, parçalama ve ezmeye katkı verir. Tam erişkin modelde bir yarım çenede iki kesici, bir köpek, iki küçük azı ve üç büyük azı toplam sekiz diş eder; dört yarım çene otuz iki yapar. Üçüncü azıların bulunmaması veya diş kayıpları nedeniyle gerçek herkeste sayı aynı olmayabilir. Süt dişi dizisi de farklıdır; erişkin formülünü her yaşa koşulsuz yayma.",
        ],
      },
      {
        title: "Tükürükte kayganlaştırıcı, iyon ve enzim farklı işler yapar",
        paragraphs: [
          "Tükürük su, mukus, sodyum-kalsiyum-klor gibi iyonlar ve amilaz gibi bileşenler içerir. Islatma ve kayganlık lokma oluşumuna yardımcı olur; amilazın katalitik etkisi ise belirli bağların kimyasal yıkımıdır. Bir salgının akışkan olması onun bütün bileşenlerinin sindirim enzimi olduğu anlamına gelmez. Tükürük bezinin kanalla ağız boşluğuna salgı vermesi ekzokrin işlev örneğidir.",
          "Amilaz için pityalin adı da kullanılır. Uygun koşullarda nişasta ve glikojenin belirli bağlarının parçalanmasını başlatır; küçük zincirler, maltoz ve dekstrin gibi ürünler oluşabilir. Ağızda bütün karbonhidratların tamamen serbest glikoza çevrildiği söylenmez. Selülozun farklı bağ yapısı, sırf glikoz birimlerinden oluşuyor diye aynı amilaz etkisini zorunlu kılmaz. Enzim özgüllüğünü organın görevine bu somut karşı örnekle bağla.",
        ],
      },
      {
        title: "Hidroliz, zincir sayısı ve ürünün kimliği",
        paragraphs: [
          "Bir doğrusal zincirde bir bağın hidrolizi parçaların sayısını bir artırabilir; fakat parça sayısı ile bütün ürünlerin monomer olması aynı şey değildir. Yirmi glikoz birimli tek model zincirin üç yerden kesilip dört parça olması, yirmi serbest glikoz oluştuğunu göstermez. Dallanma, halka veya birden çok başlangıç zinciri varsa basit tek çizgi sayımı yeniden koşullandırılmalıdır. Soru kartı bu koşulları kendi içinde verir.",
          "Tükürük amilazının etkisi lokmanın uygun ortamında kısa süre taşınabilir; bu, yutak veya özofagusun kendi sindirim enzimi üreten başlıca merkezler olduğu anlamına gelmez. Organın salgıladığı enzimle lokmayla gelen enzimin olası etkisi ayrıdır. Mide asitliği de lokmanın her noktasında aynı anda ve aynı düzeyde oluşmaz. Bölge adını görür görmez bütün moleküllerin bir anda aynı davranışı yaptığını varsayma.",
        ],
      },
      {
        title: "Yutma: istemli başlangıç, koordineli refleks devamı",
        paragraphs: [
          "Lokmanın ağızdan yutağa ilerletilmesi istemli başlayabilir; sonraki faringeal ve özofageal evreler eşgüdümlü refleks yollarla yürür. Yutak besin ve hava yollarıyla bağlantılı bir bölgedir; bu nedenle geçişin zamanlaması önemlidir. Yalnız bir kapak açılır ve yer çekimi işi bitirir anlatımı çok sayıda kas ve sfinkterin koordinasyonunu gizler. Etkileşimde her evre ayrı seçilerek ilgili geçitler görünür yapılır.",
          "Yumuşak damak yükselerek nazofarinks yolunun korunmasına katkı verir; küçük dil bununla ilişkili bir parça olsa da bütün yumuşak damağın eş adı değildir. Larengeal yükselme, hava yolunun kapanma düzeni ve epiglottis hareketi lokmanın solunum yoluna kaçmasını önleyen koordinasyonun parçalarıdır. Üst özofagus sfinkterinin uygun zamanda gevşemesi ise lokmaya başka yönde geçiş sağlar. Bir geçidin kapalı olması bütün yolların kapalı olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Hava yolu ile lokma yolunu aynı oku kullanarak çizme",
        paragraphs: [
          "Normal solunum evresinde hava yolu açıkken üst özofagus girişindeki sfinkter farklı bir görev taşır. Yutmanın koruyucu evresinde solunum kısa süre duraklar ve lokma özofagusa yönelir; daha sonra hava yolu yeniden açılır. Bu sıralama hava ve yiyeceğin aynı anda aynı tüpten akciğer ve mideye gittiği bir şema değildir. Ön-arka yerleşimi ve okların hedeflerini açık etiketlemek gerekir.",
          "Öğretim modelindeki koruma engeli seçimi bir klinik test değildir; hatalı eşgüdüm durumunda başarılı geçiş gösterilmez ve neden açıklanır. Kullanıcıdan yutarken nefes denemesi veya ters durma gibi gerçek davranış istenmez. Amaç, kaynak şeklinin iki-üç karesinde değişen geçitlerin hangi işlevi yaptığını kavramaktır. Bir çizimde bolusun yerini değiştirmek gerçek bir tanı veya güvenli yutma değerlendirmesi oluşturmaz.",
        ],
      },
      {
        title: "Özofagus duvarında koruma ve hareket ayrı katmanlardır",
        paragraphs: [
          "Özofagus yutak ile mide arasında lokma taşır. Çok katlı yassı epitel iç yüzeyi mekanik etkilere karşı korurken mukus kayganlığı destekler; dıştaki kas ve bağ doku örgütlenmesi farklı görevler taşır. Katmanları tek bir iç içe renk halkası olarak görmek yerine hangi tabakanın salgı, hangi tabakanın kuvvet ve hangi tabakanın destek oluşturduğunu açıkla.",
          "Üst bölümde çizgili, orta bölümde karışık, alt bölümde düz kas özellikleri görülür. Üst ve alt özofagus sfinkterleri de farklı geçiş sınırlarını düzenler. Alt geçidin uygun gevşemesi mideye girişi desteklerken geri kaçışın sınırlanması başka koşullar gerektirir. Tüm özofagusu tek tip yalnız istemli veya yalnız düz kaslı bir boru saymak bölgesel farkı siler. Yutma, kas tipi ve sinirsel düzenleme ilişkisini basamaklarıyla kur.",
        ],
      },
      {
        title: "Peristaltik dalgada arka daralır, ön açılır",
        paragraphs: [
          "Peristaltik taşıma, lümen duvarındaki eşgüdümlü kasılma ve gevşemenin lokmayı ilerletmesiyle ilişkilidir. Lokmanın arkasındaki daralma ve önündeki uygun gevşeme birlikte düşünülür. Yer çekimi katkı sağlayabilir ama tek zorunlu motor değildir; hareketin kas kaynaklı olması bunun için önemlidir. Özofagustaki bolusu yalnız serbest düşen bir nokta gibi hızlandırmak bu fizyolojiyi yanlış temsil eder.",
          "Verilen oyuncak dalga hızı ve yol uzunluğundan süre hesaplanabilir; bu değerlerin her insan ve lokma için sabit olduğu ileri sürülmez. Kusma da sfinkterler, solunumla ilgili kaslar ve merkezi koordinasyon içeren karmaşık bir yanıttır; yalnız tek bir peristaltik okun yönünü ters çevirerek tüm olay açıklanmaz. Model yalnız belirtilen taşıma aşamasını gösterir; başka organların veya bütün kusma refleksinin tamamı sayılmaz.",
        ],
      },
      {
        title: "Yeni bir soruda kaynak, işlem ve hedefi sırala",
        paragraphs: [
          "Besin kanalındaki bir durumu çözerken önce yerini, sonra işlemi yaz: çiğneme, enzim hidrolizi, lokma hazırlığı veya taşıma mı? Ardından maddesel sonucu belirt: yiyecek parçasının yüzeyi mi, kimyasal bağ sayısı mı, bolusun konumu mu değişti? Son olarak hedefi denetle: özofagus mideye, soluk borusu akciğere bağlanır. Aynı resimde birkaç değişim bulunması bunların aynı olay olduğunu göstermez.",
          "Büyük molekülün küçük parçalara ayrılması, bağırsakta emilim ve hücrede kullanımı ayrı konularla tamamlanır. Bu ünite ağızdan mideye hazırlık ve taşıma yolunu ayrıntılandırır; bütün sindirim-emilim sisteminin tamamını tek sayfada bitirmiş sayılmaz. Kendi tahminini şekil ve normal metinle karşılaştırmak, organ adını ezberlemekten daha aktarılabilir bir beceridir. Keşif seçimleri doğru soru veya konu tamamlama yerine geçmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı hacim, daha büyük yüzey",
        prompt:
          "Kenar uzunluğu 2 cm olan tek küp, sekiz eş 1 cm küpe ayrılıyor. Toplam hacim ve yüzey alanı nasıl değişir?",
        strategy: "Her parçayı say, sonra toplamı bul.",
        steps: [
          {
            label: "Başlangıç",
            explanation: "Tek küpün hacmi ve yüzeyi hesaplanır.",
            expression: "V=2³=8 cm³; A=6×2²=24 cm²",
          },
          {
            label: "Parçalar",
            explanation: "Sekiz küçük küp vardır.",
            expression: "V=8×1=8 cm³; A=8×6=48 cm²",
          },
          {
            label: "Yorum",
            explanation: "Hacim korunur, yüzey iki kat olur.",
            expression: "48/24=2",
          },
        ],
        answer: "Hacim 8 cm³ kalır; yüzey 24’ten 48 cm²’ye çıkar.",
        check:
          "Bu geometri moleküler hidroliz veya kesin iki kat enzim hızı demek değildir.",
        pitfall: "Yiyecek parçası ile besin molekülünü aynı ölçek sayma.",
      },
      {
        title: "Bir yarım çeneden tam modele",
        prompt:
          "Verilen tam erişkin diş modelinde her yarım çenede 2 kesici, 1 köpek, 2 küçük azı, 3 büyük azı vardır. Toplam kaç diş? Dört üçüncü azı bulunmazsa?",
        strategy: "Önce bir yarım çeneyi, sonra dört bölümü say.",
        steps: [
          {
            label: "Bir bölüm",
            explanation: "Verilen türler toplanır.",
            expression: "2+1+2+3=8",
          },
          {
            label: "Dört bölüm",
            explanation: "Alt-üst ve sağ-sol dört yarım çene eder.",
            expression: "4×8=32",
          },
          {
            label: "Verilen eksik grup",
            explanation: "Dört üçüncü azı çıkarılır.",
            expression: "32−4=28",
          },
        ],
        answer: "Tam model 32; verilen eksik durumda 28 diş.",
        check:
          "Bütün gerçek erişkinlerin zorunlu 32 dişi bulunduğu iddia edilmez.",
        pitfall: "Süt dişi dizisini aynı erişkin formülüyle hesaplama.",
      },
      {
        title: "Dört parça, yirmi monomer değildir",
        prompt:
          "Doğrusal 20 glikoz birimli tek zincir üç bağdan hidroliz edilip dört zincir parçasına ayrılıyor. Başlangıç bağı, kalan bağ ve kullanılan su sayısı nedir?",
        strategy: "Tek doğrusal zincir varsayımını koru.",
        steps: [
          {
            label: "İlk bağ",
            explanation: "Yirmi birimi tek çizgide bağlamak 19 bağ gerektirir.",
            expression: "20−1=19",
          },
          {
            label: "Kesilen bağ",
            explanation: "Her hidroliz bir su kullanır; üç kesim verilmiştir.",
            expression: "3 bağ; 3 su",
          },
          {
            label: "Kalan bağ",
            explanation: "İlk bağdan kesileni çıkar.",
            expression: "19−3=16",
          },
        ],
        answer: "19 başlangıç bağı, 16 kalan bağ, 3 su.",
        check:
          "Dört ürünün her birinin uzunluğu verilmedi; hepsi monomer sayılamaz.",
        pitfall:
          "Dallı veya çok başlangıç zincirli duruma koşulsuz aynı formülü taşıma.",
      },
      {
        title: "Kasla taşınan bir dalganın süresi",
        prompt:
          "Yalnız oyuncak modelde peristaltik dalga 16 cm yolu sabit 4 cm/s hızla ilerliyor. Süre nedir?",
        strategy: "Yolu verilen dalga hızına böl.",
        steps: [
          {
            label: "Nicelik",
            explanation:
              "Hız bolusun gerçek tüm fizyolojik hızını değil verilen dalgayı tanımlar.",
            expression: "yol 16 cm",
          },
          {
            label: "Hesap",
            explanation: "Sabit hız varsayımı soruda açıktır.",
            expression: "t=16/4=4 s",
          },
          {
            label: "Sınır",
            explanation:
              "Bu kas kaynaklı taşıma örneğidir, serbest düşme değil.",
            expression: "4 s yalnız verilen model",
          },
        ],
        answer: "4 saniye.",
        check: "Gerçek bütün yutma için evrensel sabit süre bulunmuş sayılmaz.",
        pitfall: "Yer çekimini dalganın tek zorunlu motoru yapma.",
      },
    ],
    recall: [
      {
        prompt: "Çiğneme ile hidrolizde hangi ölçek değişir?",
        answer:
          "Çiğnemede yiyecek parçası/yüzey; hidrolizde besin molekülündeki bağlar.",
      },
      {
        prompt: "Amilaz nişastayı ağızda zorunlu tamamen glikoza mı çevirir?",
        answer:
          "Hayır; küçük zincirler, maltoz/dekstrin oluşabilir; özgüllük ve koşullar vardır.",
      },
      {
        prompt: "Küçük dil ve epiglottis aynı geçidi mi korur?",
        answer:
          "Hayır; yumuşak damakla nazofarinks ve larengeal hava yolu koordinasyonu farklıdır.",
      },
      {
        prompt: "Peristaltizm için yer çekimi zorunlu tek motor mudur?",
        answer: "Hayır; eşgüdümlü kasılma-gevşeme lokmayı taşıyabilir.",
      },
    ],
    items: [
      [
        "Bir yiyecek dişlerle küçük parçalara ayrılıyor fakat besin molekülündeki bağların hidrolizi gösterilmiyor. Hangi olay doğrudan verilmiştir?",
        "Mekanik parçalama",
        [
          "Bütün nişastanın glikoza dönüşmesi",
          "Bütün proteinlerin aminoaside ayrılması",
          "Emilimin tamamlanması",
          "Her molekülün kana geçmiş olması",
        ],
        "Yiyecek parçasının boyutuyla molekül bağını ayır.",
        "Fiziksel parçalama mekanik sindirim örneğidir; yüzey alanını artırabilir. Enzimle bağ hidrolizi veya epitelden emilim ayrıca gösterilmeden bütün besinlerin monomere ve kana geçtiği söylenemez.",
      ],
      [
        "Kenar 2 cm tek küp sekiz eş 1 cm küpe ayrılıyor. Başlangıç 24 cm² yüzey için yeni toplam yüzey kaç cm²?",
        "48",
        ["8", "12", "24", "96"],
        "Sekiz parçanın her birinde altı 1 cm² yüz vardır.",
        "Her 1 cm kenarlı küpün yüzeyi 6 cm², sekizinin toplamı 48 cm² olur. Toplam hacim 8 cm³ olarak korunur; bu yüzey hesabı kimyasal bağ kopması veya enzim hızının aynı oranda değişmesi değildir.",
      ],
      [
        "Tükürük amilazının temel etkisini doğru anlatan seçenek hangisidir?",
        "Uygun koşulda nişasta ve glikojenin sindirimini başlatıp küçük zincir ürünler oluşturabilir",
        [
          "Bütün selülozu ağızda kesin glikoza dönüştürür",
          "Yalnız suyun sindirimini yapar",
          "Bütün proteinleri eksiksiz aminoaside ayırır",
          "Mekanik çiğnemenin başka adıdır",
        ],
        "Enzimin substratını ve son ürün kesinliğini birlikte denetle.",
        "Amilaz/pityalin nişasta-glikojenin belirli bağlarına etkilidir; maltoz ve dekstrin gibi ürünler oluşabilir. Bütün karbonhidratlara aynı etki veya ağızda bütün monomerlerin tamamlanması sonucu çıkarılmaz.",
      ],
      [
        "Tam erişkin modelde her yarım çenede 2 kesici, 1 köpek, 2 küçük azı ve 3 büyük azı var. Dört yarım çenedeki toplam kaçtır?",
        "32",
        ["8", "16", "20", "28"],
        "Bir bölümü topla ve dörtle çarp.",
        "Bir yarım çene 2+1+2+3=8 diş; dört bölüm 32 diş eder. Bu açık tam model hesabıdır; gerçek her erişkinde üçüncü azıların veya bütün dişlerin bulunması zorunlu değildir.",
      ],
      [
        "Dişin damar ve sinirler içeren iç bölgesi hangisidir?",
        "Pulpa; diş özü",
        [
          "Mine tabakasının bütünü",
          "Yalnız tükürük lümeni",
          "Yalnız çenenin dış epidermisi",
          "Amilaz molekülü",
        ],
        "Sert dış örtüyle iç canlı bölgeyi ayır.",
        "Pulpa diş özüdür ve damar-sinirleri içerir; mine tacın sert mineral örtüsüdür. Yapıların yakın bulunması aynı doku veya aynı işlev olduklarını göstermez; dentin de ayrı bir tabakadır.",
      ],
      [
        "Yutma sırasında nazofarinks yolunun korunması ile larengeal hava yolunun korunmasını hangi yaklaşım doğru ayırır?",
        "Yumuşak damak yükselmesi ve larengeal-epiglottik koordinasyon farklı geçitlere katkı verir",
        [
          "Küçük dil ve epiglottis aynı tek yapının iki adıdır",
          "Her iki yol özofagusun alt sfinkteridir",
          "Yutma yalnız yer çekimiyle olur",
          "Hava ve lokma her aşamada zorunlu aynı tüpten akar",
        ],
        "İki anatomik geçidi aynı kapak sayma.",
        "Yumuşak damak nazofarinksle, larengeal koordinasyon ve epiglottis ise hava yolu korunmasıyla ilişkilidir. Üst özofagus sfinkteri başka bir geçiştir; yutma bu yapıların eşgüdümünü gerektirir.",
      ],
      [
        "Özofagusun taşıma işlevi için hangi ifade uygundur?",
        "Peristaltik kasılma-gevşeme lokmayı taşır; yer çekimi tek zorunlu motor değildir",
        [
          "Bütün iş serbest düşmedir, kaslar görev yapmaz",
          "Özofagus karaciğerin içinden geçer",
          "Özofagus lokmayı yalnız akciğere taşır",
          "Özofagusun bütün hücreleri sindirim enzimidir",
        ],
        "Kas kaynaklı dalgayı düşmeyle karıştırma.",
        "Peristaltizm lümen duvarının eşgüdümlü kasılma ve gevşemesidir; özofagus lokmayı mideye iletir. Yer çekimi katkı sağlayabilir fakat bu kas mekanizmasının tek zorunlu kaynağı değildir.",
      ],
      [
        "Doğrusal 20 birimli tek zincirin 3 bağı hidroliz edilerek 4 parça oluşuyor. Başlangıç bağı 19 ise kalan bağ ve kullanılan su sırasıyla kaçtır?",
        "16 ve 3",
        ["19 ve 0", "4 ve 20", "3 ve 16", "20 ve 4"],
        "Her kesilen bağ için bir su kullanıldığı modelini koru.",
        "Kalan bağ 19−3=16; hidroliz edilen 3 bağ için 3 su kullanılır. Dört zincir parçası oluşması bütün yirmi birimin serbest monomer olduğu anlamına gelmez; tek doğrusal zincir varsayımı açıktır.",
      ],
      [
        "Özofagus kas örgütlenmesini doğru açıklayan seçenek hangisidir?",
        "Üstte çizgili, ortada karışık, altta düz kas özellikleri görülür",
        [
          "Bütün uzunluğu tek tip yalnız istemli kemiktir",
          "İç yüzeyin tamamı yalnız mide asididir",
          "Hiç kas tabakası yoktur",
          "Bütün kas tabakası yalnız kalp kasıdır",
        ],
        "Bölgesel farkları tek boru sözcüğüyle silme.",
        "Özofagus boyunca kas yapısı üst çizgili, orta karışık, alt düz kas özellikleriyle değişir. Mukus ve koruyucu epitel de ayrı işlev taşır; taşıma ve iç yüzey korunması aynı tabaka değildir.",
      ],
      [
        "Yalnız verilen oyuncak modelde peristaltik dalga 16 cm yolu sabit 4 cm/s hızla ilerliyor. Süre kaç saniyedir?",
        "4",
        ["2", "8", "12", "64"],
        "Sabit hız için süre=yol/hız.",
        "Verilen dalga için 16/4=4 saniye bulunur. Bu sonuç gerçek bütün insan yutmasının sabit süresi değildir; kasla taşınma modelini serbest düşme olarak yorumlamak veya başka fizyolojik katsayı eklemek gerekmez.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1, PDF 64–68; OGM Dersler Cepte Sindirim, PDF 10–11/14; OGM Sindirim Sistemi I seçili metinleri ve MEBİ gerçek anatomi şekilleri. Kaynaklarla karşılaştırılmış özgün anlatım, vektör şemaları ve öğretim soruları; resmî sınav sorusu değildir.",
  },
  {
    id: "sindirim-mide",
    topic: "detail-306",
    title: "Mide: karıştırma, salgı ve kontrollü sindirim",
    minutes: 48,
    objectives: [
      "Mide duvarındaki yapı, salgı ve hareket görevlerini ayır.",
      "HCl, pepsinojen, pepsin ve mukusun farklı işlerini açıkla.",
      "Vagus, gastrin ve bağırsaktan gelen geri denetimi ilişkilendir.",
      "Protein parçalanması ve sıvı miktarı hesaplarını açık varsayımlarla kur.",
    ],
    sections: [
      {
        title: "İki geçit arasında değişen bir depo",
        paragraphs: [
          "Mide diyaframın altında, karın boşluğunun sol üst bölümünde özofagus ile duodenum arasında bulunur. J benzeri biçim, torba olarak genişleyebilmesini ve besini geçici tutmasını anlatmaya yardımcı olur. Özofagus bağlantısındaki kardia bölgesi ile çıkıştaki pilor aynı kapı değildir. Girişte geri kaçışın sınırlanması ve çıkışta kontrollü iletim farklı düzenlemeler gerektirir.",
          "Mideye gelen besinlerin hepsi aynı anda ince bağırsağa boşaltılmaz. Karıştırma, içerik türü, miktar ve duodenumdan gelen girdiler boşalma örüntüsünü etkileyebilir. Kaynaktaki saat aralıkları her öğün ve kişiye değişmez sayaç oluşturmaz. Bir modelde pilor açılması seçildiğinde yalnız verilen geçiş koşulu gösterilir; bütün gerçek mide işlevi tek aç-kapa düğmesi değildir.",
        ],
      },
      {
        title: "Duvarın her katmanı aynı işi yapmaz",
        paragraphs: [
          "İç mukoza kıvrımları ve bezleri salgı ile yüzey korunmasına katılır. Düz kas tabakasındaki farklı yönlü lifler içeriğin karıştırılmasını destekler; bağ doku ve dış serozal örtü ise farklı yapısal ilişkiler taşır. Mukozayı kasla, kası sindirim enzimiyle eşitlemek doğru değildir. Kesitte hangi yapı hücreden lümene madde veriyor, hangisi kuvvet üretiyor sorularını ayrı yanıtla.",
          "Mide duvarı ve iç yüzey kıvrımları dolulukla görünüm değiştirebilir; bunları bağırsak villuslarının aynısı veya ana emilim yüzeyi diye çizme. Peritonla ilişkili kaygan dış yüzey organların hareketinde sürtünmeyi azaltmaya katkı verir. Dış yüzeyi kaplayan doku ile lümen mukusu aynı salgı bölmesi değildir. Organın iç ve dış tarafını açık etiketlemek katman bilgisini anlaşılır kılar.",
        ],
      },
      {
        title: "Bir bez resmi, farklı hücre görevleri",
        paragraphs: [
          "Mide bezlerinde pepsinojen üreten baş veya şef hücreler ile asit salgısıyla ilişkili pariyetal hücreler farklıdır. Yüzey ve boyun mukus hücreleri koruyucu salgıya katkı verir. Gastrin üreten endokrin hücrelerin kana verdiği haber ise lümene verilen sindirim sıvısıyla aynı rota değildir. Aynı organın hem ekzokrin hem endokrin özellik göstermesi bu görev ayrımından anlaşılır.",
          "Normal mide mukozasını bütün yüzeyinde bağırsak tipindeki Goblet hücreleri varmış gibi etiketlemek doğru değildir. Kaynak resminde bir hücreye verilen kısa adın anatomik bağlamını doğrulamak gerekir. Bu derste öğrenci hücre görevini seçtiğinde lümen veya kan yolu ve temel etki birlikte gösterilir. Seçilen şekil gerçek doku kesitinin ölçekli fotoğrafı değildir; işlevler özgün ve sade bir vektör şemayla ayrılır.",
        ],
      },
      {
        title: "HCl enzim değildir: ortamı ve başlangıç koşulunu değiştirir",
        paragraphs: [
          "Hidroklorik asit mide içeriğinin asidik olmasına katkı sağlar; proteinlerin denatürasyonu ve pepsinojen aktivasyonu bu ortamla ilişkilidir. Asidin yapısı pepsin proteazıyla aynı değildir ve HCl’yi besini katalizleyen enzim diye adlandırmak yanlıştır. Asit birçok mikroorganizma için engelleyici bir bariyer olabilir; bütün mikroorganizmaları her koşulda kesin yok ettiği söylenmez.",
          "Mide pH’sı öğün, tamponlama, salgı ve zamana göre değişebilir; yaklaşık 2 ifadesi her noktada ve her an aynı sayı değildir. pH ölçeği de doğrusal derişim ölçeği değildir: açık [H⁺]=10^(−pH) bağıntısında iki birim fark yüz kat oran verebilir. Bu kimyasal karşılaştırma gerçek kişinin asit üretimini, hastalığını veya ilaç gereksinimini hesaplama aracı değildir.",
        ],
      },
      {
        title: "Zimojenin aktifleşmesiyle proteinin parçalanması ayrı oklar",
        paragraphs: [
          "Pepsinojen inaktif öncül, yani zimojendir; uygun asidik koşullarda aktif pepsine dönüşmesi sindirim tepkimesinin kendisiyle aynı olay değildir. Aktif pepsin daha fazla pepsinojenin aktivasyonuna da katkı verebilir. Şemada öncül→enzim oku ve protein→peptitler oku ayrı gösterilmelidir. Aynı iki oku tek dönüşüm gibi birleştirmek hangi molekülün katalizör, hangisinin besin olduğunu gizler.",
          "Pepsin protein zincirindeki bazı peptit bağlarını hidroliz ederek daha küçük peptitler oluşturur. Mideye protein girdiği için bütün aminoasitlerin burada tamamen serbestleştiği sonucu çıkarılmaz. Sonraki bağırsak ve pankreas enzimlerinin görevleri ayrı konularla sürer. Enzim ürünü parçaları sayarken zincirin doğrusal veya çok parçalı başlangıcı, kesim sayısı ve verilen ürün bilgisi açık tutulmalıdır.",
        ],
      },
      {
        title: "Mukus ve epitel bariyeri neden gereklidir?",
        paragraphs: [
          "Mide lümeninde asit ve proteaz bulunurken kendi hücrelerinin korunması gerekir. Mukusla birlikte yüzeye yakın bikarbonat etkisi, epitel bağlantıları ve yüzeyin yenilenmesi bariyerin parçalarıdır. Koruma yalnız mide hiçbir zaman kendini etkilemez şeklinde mutlak bir kural değildir; bariyer bozulursa asit-pepsin etkileri dokuyla ilişkili sorunlara katkı verebilir. Yüzey hücresiyle lümenin pH’sını aynı ölçüm sanma.",
          "Bir koruma düğmesini kapatmak gerçek bir kişide kesin ülser tanısı koymak değildir. Bariyer, kan akımı, enfeksiyon ve başka etkenler birlikte değerlendirilir. Bu ayrım kimyasal ve anatomik bilgiyi birleştirir: asit işlevsel bir salgı olabilir ama nerede bulunduğu ve hangi yüzeye ne koşulda ulaştığı önemlidir. Mukoza, dış serozal kayganlık ve besinin çevresindeki mukus farklı işlev konumlarıyla öğrenilmelidir.",
        ],
      },
      {
        title: "Kasılma kimusu hazırlar; molekülü kaslar hidroliz etmez",
        paragraphs: [
          "Mide düz kasları içeriği mide sıvılarıyla karıştırır ve fiziksel olarak işler. Kısmen sindirilmiş besin ile asidik sıvının oluşturduğu karışıma kimus denir. Karıştırmanın mekanik işiyle pepsinin bağ yıkımı aynı olay değildir; ikisi aynı organda birlikte gerçekleşebilir. Kas tabakasını hareket ettiren oklar ile bezlerden lümene salgı okları farklı hedeflere yöneltilmelidir.",
          "Kimusun pilordan duodenuma kontrollü geçişi, gelen besinin bağırsakta işlenmesiyle eşgüdümlüdür. Besin yağca zengin veya içerik asidik olduğunda geri düzenleyici yanıtlar önem taşıyabilir. Her kasılmanın aynı hacmi ve aynı hızda boşalttığı varsayılmaz. Miktar sürgülerinde bir hacim veriliyorsa bu ayrı oyuncak deneyin girdisidir; mide kasılmasının evrensel mililitre katsayısı değildir.",
        ],
      },
      {
        title: "Sinirsel önceleme ve gastrinin kan yolu",
        paragraphs: [
          "Besinin görünmesi, kokusu, tadı ve düşüncesi sinirsel düzenleme üzerinden mide salgı ve hareketini etkileyebilir. Vagus bağlantısı yalnız lokmanın midenin içine değmesinden sonra başlayan tek mekanizma değildir. Mideye besin gelişi ve gerilme de yerel ve hormonal yanıtları destekleyebilir. Duyusal önceleme, doku gerilmesi ve kana çıkan hormon üç farklı başlangıç veya taşıma biçimidir.",
          "Gastrin mide kaynaklı endokrin sinyaldir; kana verilip hedeflere ulaşarak asit salgısını ve ilgili işlevleri destekler. Pepsin gibi lümende protein parçalayan enzim değildir. Salgıyı desteklemek, midedeki besin varlığında hormonun her koşulda sınırsız yükseldiği anlamına gelmez; asitlik ve geri etkiler de denetimin parçasıdır. Modelde sinirsel rota ile kan rotası birbirine karışmadan işaretlenir.",
        ],
      },
      {
        title: "Bağırsaktan gelen haber boşalmayı geri düzenler",
        paragraphs: [
          "Mide çıkışı bağırsakla iletişim içindedir. Duodenuma gelen asit, sekretin ve pankreas bikarbonat yanıtı bağlamında; yağ ve aminoasit gibi besin girdileri CCK ilişkileriyle düşünülür. CCK’nin pankreas enzimleri ve safra kesesiyle bağlantısı, mide boşalmasının yavaşlamasına katılan bütünleşik yanıtın parçasıdır. Sekretinin temel girdisini her durumda yalnız yağ olarak öğretmek iki hormonal yolun ayrımını siler.",
          "Burada sonraki karaciğer-pankreas-bağırsak ünitelerinin bütün ayrıntıları tamamlanmış sayılmaz; odak mideye geri denetimdir. Pankreas salgısı kendi kanalıyla, safra koledok yoluyla gelir; bazı bağlantı noktalarını paylaşmaları iki kanal adını eşitlemez. Kaynakta bir ok yanlış yere çizilmişse onu aynen taşımak yerine organ, salgı ve kanalın gerçek ilişkisi korunmalıdır. Geri etkiler sadece bir rozet değil, doğru hedefe dönen hatlarla gösterilmelidir.",
        ],
      },
      {
        title: "Mideyi ana emilim merkezi sayma",
        paragraphs: [
          "Mide belirli bazı maddelerin geçişine izin verebilse de besin emiliminin büyük bölümü için ince bağırsak başlıca alandır. Protein sindiriminin midede başlaması bütün aminoasitlerin burada kana geçtiği anlamına gelmez. Sindirim ürünü, epitel bariyeri ve dolaşıma geçiş ayrı aşamalardır. Bir organın hem salgı hem hareket hem sınırlı geçiş işlevi bulunması bunların tek süreç olduğunu göstermez.",
          "Bir sıvı havuzunda giriş, salgı ve boşalma miktarı verilirse yalnız o koşullarda miktar bilançosu kurulabilir. Örneğin 200 mL içeriğe 20 mL salgı eklenip 40 mL geçiş olursa 180 mL kalır. Bu hacim hesabı besinin kimyasal olarak ne kadar sindirildiğini veya kana ne kadar emildiğini tek başına vermez. Ayrıca hacim değiştiğinde derişim için maddenin miktarı da bilinmelidir.",
        ],
      },
      {
        title: "Reflü, gastrit ve ülser eş anlamlı değildir",
        paragraphs: [
          "Reflü mide içeriğinin özofagusa geri kaçışıyla, gastrit mide mukozasındaki inflamasyonla, ülser ise doku bariyerinde daha belirgin kayıp ve lezyon bağlamıyla ilişkilidir. Aynı bölgede yakın şikâyetler oluşturabilmeleri aynı mekanizma veya tek tanı olduklarını göstermez. Bir çizimde asit bulunması normal işlev olabilir; asidin uygunsuz yere ulaşması veya bariyerin bozulması başka bir koşuldur.",
          "H. pylori enfeksiyonu ülser için önemli bir etkendir; fakat bütün ülserlerin tek nedeni olduğu veya asit-bariyer ilişkisinin artık önemsiz olduğu söylenmez. Kaynakların bir sayfasındaki tarihsel kısa anlatım başka sayfadaki çok etkenli anlatımla birlikte düzeltilir. Bu bölüm kişiye belirtilerden tanı veya ilaç seçmez; anatomik konum, salgı ve kanıt sınırının neden birlikte gerektiğini öğretir.",
        ],
      },
      {
        title: "Bir mide sorusunda beş ayrı oku denetle",
        paragraphs: [
          "Yeni durumda önce hangi hücreden hangi maddenin çıktığını bul. Sonra lümene mi kana mı gittiğini göster; üçüncü adımda asit ortamı ile enzim tepkimesini ayır. Dördüncü adımda karıştırma ve pilor geçişini ekle; son adımda sinirsel ve hormonal geri etkiyi denetle. Bu sıra mideyi yalnız protein sindiren bir torba cümlesinden işleyen bir sisteme dönüştürür.",
          "Soru kartında gereken pH, zincir uzunluğu, kesim sayısı veya miktar bilgileri kendisi verilmelidir; önceki keşfin konumuna dayanılmaz. Etkileşimde varsayımsal kesim sayısı doğrudan verilirse gerçek enzim hızından türetilmiş gibi sunulmaz. Kendi tahminini kanıtla karşılaştırmak açıklayıcı bir öğrenme adımıdır; düğmeye basmak, zaman geçirmek veya bir şekli açmak soru doğruluğu ve ustalık kaydı oluşturmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "İki kesim, üç zincir parçası",
        prompt:
          "Doğrusal 12 aminoasitli tek zincirde 11 peptit bağı vardır. Yalnız 2 bağ hidroliz ediliyor. Parça, kalan bağ ve kullanılan su sayılarını bul.",
        strategy: "Her kesimin zincir sayısına ve bağa etkisini ayrı say.",
        steps: [
          {
            label: "Parça",
            explanation: "Tek zincire iki kesim üç parça verir.",
            expression: "1+2=3",
          },
          {
            label: "Bağ",
            explanation: "İlk bağdan koparılan çıkarılır.",
            expression: "11−2=9",
          },
          {
            label: "Su",
            explanation: "Verilen hidroliz modelinde bağ başına bir su vardır.",
            expression: "2 su",
          },
        ],
        answer: "3 parça, 9 kalan bağ, 2 su.",
        check:
          "Her peptidin uzunluğu verilmedi; bütün ürünler serbest aminoasit sayılamaz.",
        pitfall:
          "Mide protein hidrolizini bütün sindirimin tamamlanması sayma.",
      },
      {
        title: "pH farkını derişim oranına çevir",
        prompt:
          "Yalnız verilen [H⁺]=10^(−pH) bağıntısına göre pH 2 ve pH 4 ortamlarının hidrojen iyonu derişim oranı nedir?",
        strategy: "Üsleri çıkararak oranı bul.",
        steps: [
          {
            label: "İlk ortam",
            explanation: "pH 2 için ifade yazılır.",
            expression: "[H⁺]=10⁻²",
          },
          {
            label: "İkinci ortam",
            explanation: "pH 4 için ifade yazılır.",
            expression: "[H⁺]=10⁻⁴",
          },
          {
            label: "Oran",
            explanation: "İlk derişimi ikinciye böl.",
            expression: "10⁻²/10⁻⁴=10²=100",
          },
        ],
        answer: "pH 2 ortamında verilen modele göre 100 kat derişim.",
        check:
          "Bu yalnız derişim karşılaştırmasıdır; gerçek mide asit üretim hızı veya doz değildir.",
        pitfall: "pH iki kat diye derişimi iki kat sayma.",
      },
      {
        title: "Sıvı bilançosunu kapat",
        prompt:
          "Varsayımsal mide sıvısı 200 mL. Bir dönemde 20 mL salgı eklenip 40 mL duodenuma geçiyor; başka akış yok. Son hacim?",
        strategy: "Başlangıç+giriş−çıkış kullan.",
        steps: [
          {
            label: "Başlangıç",
            explanation: "İlk sıvı hacmi iki yüzdür.",
            expression: "200 mL",
          },
          {
            label: "Net akış",
            explanation: "Giriş yirmi, çıkış kırktır.",
            expression: "20−40=−20 mL",
          },
          {
            label: "Son hacim",
            explanation: "Net değişim başlangıca eklenir.",
            expression: "200−20=180 mL",
          },
        ],
        answer: "180 mL.",
        check:
          "Bu sonuç sindirim yüzdesi, emilim miktarı veya gerçek boşalma süresi vermez.",
        pitfall: "Hacim ile besin molekülü miktarını aynı değişken sayma.",
      },
      {
        title: "Lümene ürün, kana haber",
        prompt:
          "A hücresi pepsinojeni mide lümenine, B hücresi gastrini kana veriyor. İki işlevi ve hedef işini ayır.",
        strategy: "Taşıma rotasından sonra molekül görevini yaz.",
        steps: [
          {
            label: "A yolu",
            explanation: "Lümene salgı ekzokrin işlev örneğidir.",
            expression: "pepsinojen → lümen",
          },
          {
            label: "B yolu",
            explanation: "Kana verilen gastrin endokrin habercidir.",
            expression: "gastrin → kan",
          },
          {
            label: "Etki",
            explanation:
              "Pepsin protein hidrolizine, gastrin salgı düzenlemesine katılır.",
            expression: "enzim ≠ haberci",
          },
        ],
        answer: "A ekzokrin öncül; B endokrin haberci.",
        check:
          "Asit aktivasyonu ile besin zincirinin hidrolizi iki farklı oktur.",
        pitfall: "Gastrini protein parçalayan mide enzimi sayma.",
      },
    ],
    recall: [
      {
        prompt: "HCl, pepsinojen ve pepsin aynı işi mi yapar?",
        answer:
          "Hayır; asit ortamı, inaktif öncül ve aktif proteaz farklı roller taşır.",
      },
      {
        prompt: "Mukoza koruması neden yalnız pH sayısı değildir?",
        answer:
          "Mukus-bikarbonat, epitel ve doku koşulları bariyere birlikte katkı verir.",
      },
      {
        prompt: "Gastrin hangi yolla, pepsinojen hangi yolla verilir?",
        answer:
          "Gastrin kana; pepsinojen lümene. Endokrin ve ekzokrin rotalar ayrıdır.",
      },
      {
        prompt: "Mide boşalma kontrolünde duodenum neden önemlidir?",
        answer:
          "Asit ve besin girdileri sinirsel-hormonal geri yanıtlarla geçişi düzenleyebilir.",
      },
    ],
    items: [
      [
        "Midenin giriş ve çıkış bağlantılarını doğru ayıran seçenek hangisidir?",
        "Özofagusla kardia bölgesi; duodenumla pilor bölgesi",
        [
          "Özofagusla pilor; akciğerle kardia",
          "Karaciğerle kardia; kalple pilor",
          "Burunla pilor; soluk borusuyla kardia",
          "Her iki geçit doğrudan mesaneye açılır",
        ],
        "Ana sindirim kanalının yönünü izle.",
        "Mide özofagus ile duodenum arasındadır; girişte kardia, çıkışta pilor bölgesi bulunur. Geri kaçışı sınırlamak ve bağırsak yönüne kontrollü boşalmayı sağlamak aynı kapının tek işi değildir.",
      ],
      [
        "Mide salgılarında HCl’nin rolünü doğru anlatan seçenek hangisidir?",
        "Asidik ortama ve pepsinojen aktivasyonuna katkı verir; enzim değildir",
        [
          "Pepsinle aynı protein enziminin tam adıdır",
          "Bütün proteinleri her koşulda tamamen aminoaside çevirir",
          "Bütün mikroorganizmaları kesin sıfırlar",
          "Midenin kas tabakasının adıdır",
        ],
        "Ortamı düzenleyen maddeyle proteazı ayır.",
        "HCl asittir; uygun ortam, denatürasyon ve pepsinojen aktivasyonuyla ilişkilidir. Pepsin aktif proteazdır. Asit bariyeri önemli olsa da bütün mikroorganizmaların her koşulda yokluğu veya tam protein sindirimi sonucu verilmez.",
      ],
      [
        "Pepsinojen ve pepsin için doğru ilişki hangisidir?",
        "Pepsinojen inaktif öncül; pepsin protein bağlarını hidroliz eden aktif enzimdir",
        [
          "Pepsinojen ve gastrin aynı hormonun eş adlarıdır",
          "Pepsin yalnız bir kas lifi çeşididir",
          "Pepsinojen doğrudan safra tuzu olup yalnız yağ damlası küçültür",
          "Pepsin proteinin bütün aminoasitlerini her koşulda midede tamamlar",
        ],
        "Öncül aktivasyonu ile besin hidrolizini farklı oklarla düşün.",
        "Pepsinojen zimojendir; uygun asidik ortamda pepsine aktivasyonuyla protein-peptit hidrolizi arasında iki farklı dönüşüm vardır. Pepsin küçük peptitler oluşturabilir; bu, midedeki bütün proteinlerin tamamen aminoasite ayrılması değildir.",
      ],
      [
        "Doğrusal 12 aminoasitli tek zincirin 11 peptit bağından 2’si hidroliz ediliyor. Parça ve kalan bağ sayıları sırasıyla kaçtır?",
        "3 ve 9",
        ["2 ve 11", "12 ve 0", "1 ve 13", "9 ve 3"],
        "Kesim sayısını başlangıç zincirine ekle, kopan bağı çıkar.",
        "Tek zincire 2 kesim 3 parça verir; kalan bağ 11−2=9’dur. Her ürünün boyu ayrıca verilmediğinden hepsini monomer sayamayız. Bu açık doğrusal modeldir ve hidroliz için 2 su kullanılır.",
      ],
      [
        "Verilen [H⁺]=10^(−pH) bağıntısında pH 2/pH 4 derişim oranı kaçtır?",
        "100",
        ["2", "4", "10", "0,01"],
        "İlk derişimi ikinciye böl ve üsleri çıkar.",
        "10⁻²/10⁻⁴=10²=100 bulunur. pH logaritmik gösterimdir; iki sayının iki kat olması derişimin iki katı değildir. Bu karşılaştırma asit üretim hızı veya kişiye ilaç dozu hesabı değildir.",
      ],
      [
        "Bir mide hücresi pepsinojeni lümene, başka bir hücre gastrini kana veriyor. Hangi sınıflama doğrudur?",
        "Pepsinojen yolu ekzokrin; gastrin yolu endokrin",
        [
          "İki yol da yalnız sinir aksonudur",
          "Pepsinojen yolu endokrin; gastrin yalnız sindirim kanalına enzimdir",
          "Her iki molekül de safra pigmentidir",
          "Lümenle kan aynı bölmedir",
        ],
        "Salgının gittiği ortamı molekülün işinden ayrı oku.",
        "Lümene salgı veren yol ekzokrin, gastrinin dolaşıma verilmesi endokrin örnektir. Gastrin salgı düzenleyen habercidir; pepsinin protein hidrolizi göreviyle aynı enzim rolüne sahip değildir.",
      ],
      [
        "Mide düz kaslarının içeriği salgılarla karıştırmasının doğrudan görevi hangisidir?",
        "Mekanik işleme ve kimus oluşumuna katkı",
        [
          "Pepsin enziminin yerine bütün peptit bağlarını kasla hidroliz etmek",
          "Bütün aminoasitleri anında kana taşımak",
          "HCl’yi bir kas hücresine dönüştürmek",
          "Mideyi sindirim kanalından çıkarmak",
        ],
        "Karıştırma hareketiyle moleküler katalizi ayır.",
        "Kasların mekanik işi içeriği mide sıvısıyla karıştırır; kimus kısmen işlenmiş besin ve sıvı karışımıdır. Peptit bağı hidrolizi pepsin gibi enzimlerle ilişkilidir; aynı organda birlikte olmak aynı olay demek değildir.",
      ],
      [
        "Varsayımsal mide sıvısı 200 mL. Yalnız 20 mL salgı girişi ve 40 mL çıkış var. Son hacim kaç mL?",
        "180",
        ["140", "200", "220", "260"],
        "İlk hacme girişi ekle, çıkışı çıkar.",
        "Son hacim 200+20−40=180 mL’dir. Bu sıvı bilançosu gerçek bir öğünün boşalma süresini, sindirilmiş protein miktarını veya emilim yüzdesini tek başına belirlemez; başka akışlar soruda kapalı tutulmuştur.",
      ],
      [
        "Duodenumdan gelen geri denetim için hangi temel eşleştirme uygundur?",
        "Asit-sekretin/bikarbonat; yağ-aminoasit gibi girdiler-CCK ilişkileri",
        [
          "Her iki hormon yalnız gözün pigmentini yapar",
          "Sekretinin her koşuldaki tek girdisi yalnız yağdır",
          "Pankreas enzimleri zorunlu yalnız koledok adlı kanalda üretilir",
          "Mide boşalması bağırsaktan hiçbir biçimde etkilenmez",
        ],
        "Asit yanıtını besin içeriği yanıtından ayır.",
        "Duodenal asit sekretin-bikarbonat, bazı besin girdileri CCK-pankreas enzimleri/safra ve boşalma kontrolüyle ilişkilidir. Pankreas kanalı ve koledok aynı ad değildir; bir kaynak şemasındaki yanlış ok bu ayrımı değiştirmez.",
      ],
      [
        "H. pylori ile ülser ilişkisini doğru sınırlayan ifade hangisidir?",
        "Önemli bir etken olabilir; fakat tüm ülserlerin tek nedeni değildir ve asit-bariyer ilişkisi sürer",
        [
          "Her ülser yalnız bu tek bakteriden oluşur",
          "Asit ve mukus bariyeri artık hiçbir rol oynamaz",
          "Bakteri varsa kişide kesin aynı belirti ve aynı tedavi seçilir",
          "Ülser, reflü ve gastrit her koşulda aynı olaydır",
        ],
        "Önemli bir nedeni bütün nedenlerin yerine koyma.",
        "H. pylori ülserle ilişkili önemli etkendir; ülser çok etkenli olabilir ve asit-pepsin ile bariyer bütünlüğü önemini korur. Reflü, gastrit ve ülser farklı mekanizma terimleridir; tek belirti veya bu bilgi kişisel tanı ve tedavi seçtirmez.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1, PDF 69; OGM Dersler Cepte Sindirim, PDF 11/14–15; OGM Sindirim Sistemi I PDF 13–15 ve II PDF 9/20–22 gerçek seçili öğretim ve şekilleri. Kaynaklarla karşılaştırılmış özgün anlatım, vektör şemaları ve öğretim soruları; resmî sınav sorusu değildir.",
  },
];
export const forge017BiologyTopics: Record<string, string> = Object.fromEntries(
  data.map((d) => [d.id, d.topic]),
);
export const forge017BiologyGuides: LessonGuide[] = data.map(
  ({ items: _items, topic: _topic, title: _title, ...d }) => d,
);
function question017(
  d: Unit017,
  item: Unit017["items"][number],
  i: number,
): Question {
  const [prompt, correct, wrong, hint, explanation] = item;
  if (wrong.length !== 4) throw Error("Five choices required: " + d.id);
  const answer = i % 5,
    options = [...wrong];
  options.splice(answer, 0, correct);
  return {
    id: `f017-bio-${d.id}-${i + 1}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(explanation),
    skill: `f017-bio-${d.id}-${i + 1}`,
  };
}
export const forge017BiologyLessons: Lesson[] = data.map((d) => ({
  id: d.id,
  subjectId: "ayt-biyoloji",
  title: txt(d.title),
  minutes: d.minutes,
  objectives: d.objectives.map(txt),
  body: d.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join(" ")),
  })),
  questions: d.items.map((q, i) => question017(d, q, i)),
  source: txt(d.source),
  tags: ["kaynakli", "etkilesimli", "forge017"],
}));
