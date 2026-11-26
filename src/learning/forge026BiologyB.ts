import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
function integer026(value: unknown, min: number, max: number) {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < min ||
    value > max
  )
    throw new RangeError("Değer bu deneyin tam sayı sınırları dışında.");
  return value;
}
function countGroups026(
  size: number,
  links: readonly { a: number; b: number; cut: boolean }[],
) {
  const neighbours = Array.from({ length: size }, () => [] as number[]);
  for (const e of links)
    if (!e.cut) {
      neighbours[e.a].push(e.b);
      neighbours[e.b].push(e.a);
    }
  const seen = new Set<number>(),
    groups: number[][] = [];
  for (let start = 0; start < size; start++)
    if (!seen.has(start)) {
      const group: number[] = [],
        pending = [start];
      while (pending.length) {
        const at = pending.pop()!;
        if (seen.has(at)) continue;
        seen.add(at);
        group.push(at);
        for (const next of neighbours[at])
          if (!seen.has(next)) pending.push(next);
      }
      groups.push(group.sort((a, b) => a - b));
    }
  return { groups, freeUnits: neighbours.filter((n) => n.length === 0).length };
}

/** A classroom forest: initial bonds already exist; joining and cutting are distinct steps. */
export function carbohydrateForest026(
  units: number,
  pieces: number,
  joins: number,
  cuts: number,
) {
  integer026(units, 3, 9);
  integer026(pieces, 1, 3);
  integer026(joins, 0, pieces - 1);
  const initialBonds = units - pieces,
    beforeCuts = initialBonds + joins;
  integer026(cuts, 0, beforeCuts);
  const lengths = Array.from(
    { length: pieces },
    (_, i) => Math.floor(units / pieces) + (i < units % pieces ? 1 : 0),
  );
  const originalGroups: number[][] = [];
  let index = 0;
  for (const length of lengths)
    originalGroups.push(Array.from({ length }, () => index++));
  const initial = originalGroups.flatMap((group) =>
    group.slice(1).map((b, i) => ({ a: group[i], b, added: false })),
  );
  const added = Array.from({ length: joins }, (_, i) => ({
    a: originalGroups[i].at(-1)!,
    b: originalGroups[i + 1][0],
    added: true,
  }));
  const links = [...initial, ...added].map((e, i) => ({ ...e, cut: i < cuts }));
  const { groups, freeUnits } = countGroups026(units, links);
  return {
    units,
    pieces,
    joins,
    cuts,
    originalGroups,
    links,
    groups,
    freeUnits,
    initialBonds,
    beforeCuts,
    bonds: beforeCuts - cuts,
    finalPieces: groups.length,
    synthesisWater: joins,
    hydrolysisWater: cuts,
    scope:
      "Başta bağlı, açık ve halkasız şeker zincirleri vardır. Ek bağlar ilk parçaları sırayla birleştirir; sonra çizimde soldan sayılan ilk bağlar kopar. Her yeni bağ için bir su çıkar, her kopan bağ için bir su kullanılır. Daire bir şeker birimidir; atom halkası değildir.",
  };
}

/** Free precursors, net esterification, then explicitly ordered hydrolysis. */
export function lipidAssembly026(
  glycerol: number,
  acids: number,
  built: number,
  cuts: number,
) {
  integer026(glycerol, 0, 4);
  integer026(acids, 0, 12);
  const capacity = Math.min(glycerol, Math.floor(acids / 3));
  integer026(built, 0, capacity);
  integer026(cuts, 0, 3 * built);
  const molecules = Array.from({ length: built }, (_, i) => {
    const broken = Math.max(0, Math.min(3, cuts - 3 * i));
    return { id: i, broken, remaining: 3 - broken, freeGlycerol: broken === 3 };
  });
  return {
    glycerol,
    acids,
    built,
    cuts,
    capacity,
    molecules,
    initialUnusedGlycerol: glycerol - built,
    initialUnusedAcids: acids - 3 * built,
    freeGlycerol:
      glycerol - built + molecules.filter((m) => m.freeGlycerol).length,
    freeAcids: acids - 3 * built + cuts,
    esterBonds: 3 * built - cuts,
    synthesisWater: 3 * built,
    hydrolysisWater: cuts,
    intact: molecules.filter((m) => m.broken === 0).length,
    scope:
      "Bir trigliserit için bir gliserol ve üç yağ asidi gerekir. Sayılar molekül adedidir; model tam sayı üretim üst sınırını bulur. Önce serbest bileşenlerden net esterleşme, sonra ilk molekülden başlayarak üçer ester bağının kopması gösterilir. Hücresel sentezin bütün ara basamakları veya insan sindiriminin bütün ürünleri temsil edilmez.",
  };
}

export const biologyBDefaults026 = {
  units: 6,
  pieces: 2,
  joins: 1,
  carbCuts: 2,
  glycerol: 3,
  acids: 8,
  built: 2,
  lipidCuts: 2,
  guess: "",
  reason: "",
  checked: false,
  show: false,
};

export function biologyBId026(id: string) {
  const canonical = id.replace(/-ileri$/, "");
  if (canonical !== "karbohidratlar" && canonical !== "lipitler")
    throw new RangeError("BIO026B_LESSON");
  return canonical;
}

/** Read the raw record before the shared hook's primitive-type fallback. */
export function normalizeBiologyB026(id: string, input: unknown) {
  const canonical = biologyBId026(id);
  const object =
    input !== null && typeof input === "object" && !Array.isArray(input);
  const raw = object ? (input as Record<string, unknown>) : {};
  const d = biologyBDefaults026;
  const num = (key: keyof typeof d, min: number, max: number): number => {
    const value = raw[key];
    const candidate =
      typeof value === "number" && Number.isFinite(value)
        ? Math.round(value)
        : (d[key] as number);
    return Math.min(max, Math.max(min, candidate));
  };
  const units = num("units", 3, 9),
    pieces = num("pieces", 1, 3);
  const joins = num("joins", 0, pieces - 1);
  const glycerol = num("glycerol", 0, 4),
    acids = num("acids", 0, 12);
  const built = num("built", 0, Math.min(glycerol, Math.floor(acids / 3)));
  const choices =
    canonical === "karbohidratlar"
      ? ["", ...Array.from({ length: 9 }, (_, i) => String(i + 1))]
      : ["", "0", "1", "2", "3", "4"];
  const values = {
    units,
    pieces,
    joins,
    carbCuts: num("carbCuts", 0, units - pieces + joins),
    glycerol,
    acids,
    built,
    lipidCuts: num("lipidCuts", 0, 3 * built),
    guess:
      typeof raw.guess === "string" && choices.includes(raw.guess)
        ? raw.guess
        : "",
    reason: typeof raw.reason === "string" ? raw.reason.slice(0, 120) : "",
    checked: raw.checked === true,
    show: raw.show === true,
  };
  const active =
    canonical === "karbohidratlar"
      ? (["units", "pieces", "joins", "carbCuts"] as const)
      : (["glycerol", "acids", "built", "lipidCuts"] as const);
  const validScience =
    (input === undefined || object) &&
    active.every((key) => !Object.hasOwn(raw, key) || raw[key] === values[key]);
  const validSelection =
    validScience &&
    (["guess", "reason", "checked"] as const).every(
      (key) => !Object.hasOwn(raw, key) || raw[key] === values[key],
    );
  return {
    active,
    validScience,
    validSelection,
    values: {
      ...values,
      reason: validScience ? values.reason : "",
      checked: values.checked && validSelection,
      show: values.show && validScience,
    },
  };
}

const guidePayloadB026 = [
  {
    id: "karbohidratlar",
    topic: "detail-5",
    title: "Karbohidratlar: birimden bağ ve görev yorumuna",
    sections: [
      {
        title: "Şekerin adı kadar birim sayısını da oku",
        paragraphs: [
          "Karbohidratları tanırken önce molekülün kaç şeker biriminden oluştuğunu, sonra bu birimlerin türünü sor. Monosakkarit tek basit şeker birimidir; şekerler arasındaki bağların sindirimiyle daha küçük bir şekere ayrılamaz. Glikoz, fruktoz ve galaktoz altı karbonlu; riboz ile deoksiriboz beş karbonlu örneklerdir. Üç karbonlu basit şekerler trioz olarak adlandırılır; gliseraldehit bir örnektir. PGAL, üç karbonlu gliseraldehitin fosfatlı biçimi olarak karbon metabolizması bağlamında görülür.",
          "Bir şeker yalnız enerji yakıtı olmak zorunda değildir. RNA ve ATP gibi nükleotit içeren yapılarda riboz; DNA’da deoksiriboz bulunur. Karbon sayısı, birim sayısı ve görev ayrı sorulardır: beş karbonlu olmak, beş monosakkaritin birleştiği anlamına gelmez.",
        ],
      },
      {
        title: "İki birim birleşince ne oluşur?",
        paragraphs: [
          "İki monosakkaritin uygun grupları arasında glikozit bağı kurulduğunda bir disakkarit oluşabilir. TYT’nin net dehidrasyon sayımında kurulan bir glikozit bağına karşılık bir su açığa çıkışı izlenir. Maltozun iki birimi glikozdur; sakkaroz glikoz ile fruktozdan, laktoz glikoz ile galaktozdan oluşur.",
          "Hidrolizde su kullanılarak bu bağ ayrılır. İki serbest şekerin aynı kapta bulunması, aralarında glikozit bağı kurulmuş bir disakkaritle aynı durum değildir. Önce bağın varlığını belirle; yalnız toplam şeker birimi sayısına bakarak molekül sayısını veya sindirim gereksinimini eşitleme.",
        ],
      },
      {
        title: "Polisakkaritlerde görev ve bağlanma biçimi",
        paragraphs: [
          "Çok sayıda şeker türevinin bağlanmasıyla polisakkaritler oluşur. Nişasta bitkilerde, glikojen hayvan ve mantarlarda önemli depo örnekleridir; bazı prokaryotlar da glikojen depolar. Selüloz bitki hücre duvarının yapısına katılır. Depo ile duvar görevini ayrı düşün: aynı glikoz birimi farklı bağ düzenleriyle farklı özellikler üretir.",
          "Kitin mantar hücre duvarında ve eklem bacaklıların dış iskeletinde bulunur. Birimi azot içeren, değişmiş bir şeker olan N-asetilglukozamindir; kitini yalnız değişmemiş glikozlardan yapılmış saymak doğru değildir. Dallanma, bağın yönü ve birimin kimyasal yapısı, büyük molekülün özelliklerinin parçalarıdır.",
        ],
      },
      {
        title: "Bağ sayısında zincir sayısını unutma",
        paragraphs: [
          "Açık ve halkasız tek bir bağlı şeker yapısında n birimi birbirine bağlayan glikozit bağı sayısı n−1’dir. Dallanma tek başına bu sayımı bozmaz: yapı bir bütün olarak bağlı kalıp halka içermiyorsa her yeni birim bir yeni bağla eklenebilir. Birkaç bağımsız parça varsa her parçanın hesabını ayrı kur.",
          "Toplam N birim, k bağımsız halkasız parçaya dağılmışsa toplam bağ N−k olur. Baştan var olan bağ ile işlemde yeni kurulan bağ aynı kayıt değildir. Sentez suyu yalnız yeni kurulan bağlar için; hidroliz suyu yalnız o aşamada koparılan bağlar için sayılır. Başlangıçtaki bütün bağları yeniden sentezlenmiş kabul etme.",
        ],
      },
      {
        title: "Bir soruda önce yapı mı görev mi soruluyor?",
        paragraphs: [
          "Bir molekülün glikoz içermesi tek başına nişasta, glikojen ve selülozu ayırmaz. Hangi canlıda bulunduğu, depo mu duvar mı olduğu, bağ düzeni ve hangi enzimlerle parçalandığı gibi ikinci kanıtları birlikte kullan. Aynı görevin de her canlıda aynı molekülle yürütülmesi gerekmez.",
          "Karbohidratın görevini enerji, yapı ve nükleotit bileşeni olarak ayrı örneklerle kur. Bir hücrede bu görevler birlikte bulunabilir. “Enerji sağlayabilir” demek, yalnız enerji için kullanıldığı veya her dokuda aynı hızla tüketildiği anlamına gelmez. Miktar, yer ve metabolik koşul sorunun verisine bağlıdır. Karbohidratlar zar proteinlerine veya lipitlerine bağlı kısa zincirler olarak da bulunabilir; bu birleşimler glikoprotein ve glikolipit diye adlandırılır. Hücre yüzeyindeki şeker bölümleri hücrelerin tanınması ve etkileşmesine katkı verir; zarın yalnız enerji deposu olduğu düşünülmez.",
        ],
      },
      {
        title: "Kapalı formül yapının tamamını vermez",
        paragraphs: [
          "Glikoz, fruktoz ve galaktozun ortak kapalı formülü C₆H₁₂O₆’dır. Atom türleri ve toplamları aynı olsa da atomların bağlanma veya uzaydaki düzeni aynı değildir. Bu tür örnekler izomerliğin neden yalnız atom sayımıyla çözülemeyeceğini gösterir; aynı formül aynı enzimle aynı biçimde işlenmeyi garanti etmez.",
          "Birçok basit şeker için kullanılan (CH₂O)n yazımı yararlı bir örüntüdür, bütün karbohidrat türevlerini kapsayan koşulsuz bir tanım değildir. Deoksiribozun C₅H₁₀O₄ formülü bu basit oranı sağlamaz. Bir molekülün karbohidratla ilişkisini yalnız hidrojen/oksijen oranına bakıp kesinleştirme.",
        ],
      },
      {
        title: "Riboz ve deoksiribozu yer bilgisiyle eşleştir",
        paragraphs: [
          "Riboz ve deoksiriboz beş karbonlu şekerlerdir. Bu pentozlar nükleotitlerin yapısına katılır; görevlerini yalnız enerji başlığıyla sınırlama. RNA nükleotitlerinde riboz, DNA nükleotitlerinde deoksiriboz bulunur. ATP’nin adenozin bölümünde de riboz yer alır.",
          "“DNA’nın şekeri” bilgisi, o molekülün tamamının yalnız şekerden oluştuğunu söylemez. Nükleotitte şekerin yanında azotlu organik baz ve fosfat da vardır. Bir şekerin tek başına özellikleri ile katıldığı nükleotidin bütün özelliklerini birbirine aktarma; sorunun hangi yapı düzeyini adlandırdığını belirt.",
        ],
      },
      {
        title: "Disakkaritleri parçalarından yeniden tanı",
        paragraphs: [
          "Maltoz tamamen hidroliz edildiğinde iki glikoz; sakkarozda bir glikoz ve bir fruktoz; laktozda bir glikoz ve bir galaktoz elde edilir. Birkaç disakkarit birlikte verilirse her molekülün iki birimini ayrı satırda say. Ortak glikoz katkısı, öteki şekerlerin de aynı olduğunu göstermez.",
          "Hidroliz ürünleriyle geriye giderken karışımın başlangıçta hangi molekülleri içerebileceğini denetle. Tek bir ürünün varlığı her zaman tek bir başlangıç molekülünü belirlemez. Örneğin glikoz görülmesi birçok kaynaktan gelebilir; fruktoz veya galaktoz gibi ayırt edici ürün ve molekül adedi ayrıca gerekir.",
        ],
      },
      {
        title: "Nişastayı bitkide depo bağlamında düşün",
        paragraphs: [
          "Nişasta, bitkinin fotosentezle elde ettiği karbonu depolamasında görev alan glikoz temelli bir polisakkarittir. Tohum, yumru ve başka depo dokularında bulunabilir. Nişastanın bulunması o dokunun her an fotosentez yaptığı anlamına gelmez; üretilen maddeler bitki içinde taşınabilir.",
          "Nişastada doğrusal amiloz ve dallanmış amilopektin bileşenleri vardır. Bu adlandırma bütün nişasta moleküllerinin tek uzunlukta veya aynı dallanma sayısında olduğu anlamına gelmez. TYT’de ortak glikoz birimini, depo görevini ve selülozdan farklı bağlanma düzenini kavramak, yalnız adını ezberlemekten daha açıklayıcıdır. D-glikozun yaygın halka çiziminde birinci karbondaki hidroksil (OH) grubu, CH₂OH grubuna göre karşı taraftaysa alfa, aynı taraftaysa beta biçimi adlandırılır. Nişastanın ana zincirindeki alfa(1→4) bağı, bir glikozun 1. karbonuyla diğerinin 4. karbonunu oksijen üzerinden bağlar. Dallanmış amilopektindeki alfa(1→6) bağlantısı ise 1. karbonu diğer birimin 6. karbonuna bağlayarak dal noktasına katılır; glikojende de bu iki bağlantı türü bulunur.",
        ],
      },
      {
        title: "Glikojenin depoladığı şeyi doğru adlandır",
        paragraphs: [
          "Glikojen çok dallı, glikoz birimlerinden oluşan bir depo polisakkaritidir. Hayvanlarda karaciğer ve kas bağlamında sık karşılaşılır; mantarlarda ve bazı bakterilerde de bulunur. “Hayvansal depo” kısa etiketi başka canlılarda bulunamayacağı biçiminde okunmamalıdır.",
          "Bir glikojen molekülünün parçalanmasıyla birimlerin kullanılabilir hâle gelmesi, bu basamağın tek başına ATP üreten hücresel solunumla aynı işlem olduğunu göstermez. Depoyu parçalama, birimlerin metabolik işlenmesi ve enerji aktarımı farklı basamaklardır. Soruda hangisinin ölçüldüğünü açıkça ayır.",
        ],
      },
      {
        title: "Selülozda bağ düzeni işlevi değiştirir",
        paragraphs: [
          "Selüloz glikoz içeren, bitki hücre duvarına dayanıklılık sağlayan bir polisakkarittir. Nişastayla ortak birime sahip olması, aynı büyük yapının farklı adı olduğu anlamına gelmez. Birimler arasındaki bağ düzeni, zincirlerin düzenlenmesi ve birbirleriyle etkileşmesi farklı özellikler oluşturur. Selülozdaki beta(1→4) bağlantısı aynı glikoz birimlerini nişastanın alfa bağlantısından farklı bir düzenle birleştirir. Sayıların aynı karbonları göstermesi alfa/beta yön farkını ortadan kaldırmaz; enzimin uygun bağlantıyı tanıması bu farkla ilişkilidir.",
          "İnsanın kendi sindirim enzimleri selülozun glikozit bağlarını sindirim kanalında nişastadaki gibi parçalayamaz. Bu nedenle selülozdan doğrudan glikoz elde etme kapasitesiyle lif olarak sindirim sistemine katkısını ayır. Bazı hayvanlarda mikroorganizmalar selülozun kullanımına yardım eder; “hiçbir canlı sindiremez” sonucu çıkmaz.",
        ],
      },
      {
        title: "Kitinde azotun kaynağını gör",
        paragraphs: [
          "Kitinin yapı birimi N-asetilglukozamin, glikoza göre değişmiş ve azot içeren bir şeker türevidir. Bu bilgi karbohidrat sınıfını yalnız karbon, hidrojen ve oksijen içerme kuralına hapsetmemeyi sağlar. Kitin hem mantar duvarı hem eklem bacaklı dış iskeleti için önemli bir yapısal örnektir.",
          "Aynı dış yapıda başka bileşenler de bulunabilir; bir yapının kitin içermesi bütünüyle saf kitinden oluştuğunu kanıtlamaz. Azot ölçümü de tek başına proteini kesinleştirmez: azot içeren başka biyomoleküller vardır. Yapı birimi, bağ ve canlıdaki yer kanıtlarını birlikte kullan.",
        ],
      },
      {
        title: "Dehidrasyon ve hidrolizde iki su kaydı tut",
        paragraphs: [
          "TYT net sayımında yeni bir glikozit bağı kurulurken bir su çıkar; bağ hidrolizle koparken bir su kullanılır. Arka arkaya sentez ve hidroliz yapılırsa iki aşamanın su miktarını ayrı yaz. İkisi aynı sayıda olursa net su değişimi sıfır olabilir, fakat her iki olayın da gerçekleştiği bilgisi kaybolmaz.",
          "Bu çizim gerçek hücredeki bütün enzimleri, etkinleştirilmiş şeker taşıyıcılarını ve ara ürünleri göstermez. Sorudaki okul sayımı varsayımı açıkça verilmiş olmalıdır. Bir bağın kopmasını susuz, kendiliğinden gerçekleşmiş bir olay gibi yorumlama; hidrolizde su da tepkimenin girdisidir.",
        ],
      },
      {
        title: "Kısmi hidrolizde parça ile serbest birimi ayır",
        paragraphs: [
          "Bir halkasız bağlı yapının tek bağının kopması bağımsız parça sayısını bir artırır. Ancak yeni iki parçanın her biri tek monosakkarit olmak zorunda değildir. Ortadan koparılan uzun bir zincir iki daha kısa zincir verebilir; serbest monosakkarit sayısı koparılan bağ sayısına her koşulda eşit değildir.",
          "Serbest birim sayısı için hangi bağların koparıldığını gösteren şema veya eşdeğer açık liste gerekir. Sırf toplam bağ azalmasını bilmek, kesim yerleri bilinmiyorsa tek bir serbest birim sayısı sağlamayabilir. Önce parçaların uzunluklarını say, sonra uzunluğu bir olan parçaları seç.",
        ],
      },
      {
        title: "Dallanma ile halka oluşumunu ayır",
        paragraphs: [
          "Dallanmış fakat halkasız bir şeker yapısı da N birimden oluşan bağlantılı tek parçaysa N−1 bağ taşır. Bu sonuç zincirin düz çizilmiş olmasına değil, her birimin aynı yapıya bağlı bulunmasına ve kapanan bir halka bulunmamasına dayanır. Çizimde bükülme ya da dal görülmesi yeni bir atom bağı icat etmez.",
          "Baş ile son arasında ek bir bağla halka kapanırsa aynı birim sayısında bağ sayısı artabilir. Böyle bir yapı soruda verilmedikçe standart açık yapı hesabına halka ekleme. Buradaki şeker birimi halkasız bağlantı modeli, bir monosakkaritin atomlarının halka biçiminde düzenlenmesiyle farklı düzeydedir.",
        ],
      },
      {
        title: "Zardan geçişi yalnız şeker adından çıkarma",
        paragraphs: [
          "Monosakkaritlerin boyutu polisakkaritlerden küçüktür; fakat bu, her monosakkaritin her zardan serbestçe ve aynı hızla geçtiği anlamına gelmez. Zarın yapısı, taşıyıcı proteinler, yoğunluk farkı ve enerji kullanımı taşıma biçimini etkiler. İnce bağırsakta sindirim ve emilim aynı basamak değildir.",
          "Bir deneyde dış ortamda glikoz azalması tek başına hücrede yeni glikojen üretildiğini göstermez. Glikoz alınmış, solunumda kullanılmış veya başka bir yapıya katılmış olabilir. Yeni büyük molekül oluşumu için ona özgü bir ölçüm veya ek koşul gerekir; verilen gözlemi olası açıklamayla karıştırma.",
        ],
      },
      {
        title: "Tanı deneyinde sonucu ölçümün kapsamıyla sınırla",
        paragraphs: [
          "Bir şeker çözeltisini veya besin örneğini tanıtırken deneyin hangi özelliğe duyarlı olduğu belirtilmelidir. Örneğin bir uygulamada nişastaya özgü bir gösterge verildiyse gösterge sonucu nişastayla ilgili kanıttır; bütün karbohidratların miktarını tek başına ölçmüş olmaz. Karşılaştırma için başlangıç ve uygun kontrol önemlidir.",
          "Enzimle parçalama sonrası belirli ürünlerin artması bağın ve yapı biriminin incelenmesine yardım eder. Sonucun yokluğu ise deney koşulları, enzim etkinliği ve ölçüm duyarlılığı bilinmeden “molekül kesin yok” anlamına gelmez. Bu rehberin soruları gereken deney koşulunu ve ölçülen niceliği kartın içinde belirtir.",
        ],
      },
      {
        title: "Üç denetimle yeni bir soruya geç",
        paragraphs: [
          "Önce birimlerin türünü ve toplamını, sonra hangi birimlerin birbirine bağlı olduğunu, son olarak sorulan görev veya değişimi yaz. Su hesabında başlangıçtaki bağları yeni kurulanlardan; kısmi hidrolizde bütün parçaları serbest monosakkaritlerden ayır. Birlikte sayılan moleküllerin kapsamını her adımda koru. Sayımda tek tek molekül adedi tam sayıdır. Mol ise çok sayıda taneciği ifade eden madde miktarı birimidir: 1 mol yaklaşık 6,02×10²³ tanecik içerir; 0,5 mol gibi miktarlar kesirli olabilir. Molekül adedinin tam sayı olması mol miktarının da tam sayı olmasını gerektirmez.",
          "Etkileşimli şemada noktalar şeker birimleridir, atom çizimleri değildir. Bağların listesi ve parça uzunlukları HTML metninde de verilir. Tahminin sayısal modelle kıyaslanır; yazılı gerekçenin doğruluğu veya konuyu öğrenmiş olman otomatik olarak puanlanmaz. Farklı bir veriyle aynı ilişkiyi yeniden kurabilmen hedeflenir.",
        ],
      },
    ],
    minutes: 40,
    objectives: [
      "Şeker birimi, bağlantı ve canlıdaki görevi birlikte açıkla.",
      "Başlangıç parçaları, yeni bağlar ve kısmi hidroliz için ayrı sayım kur.",
      "Şemada verilmemiş bağ veya deney sonucunu varsayma.",
    ],
    source:
      "OGM Dersler Cepte 9. Sınıf Biyoloji, canlıların yapısındaki temel bileşikler I; OpenStax Biology 2e, 3.2 Karbohidratlar. Anlatım, bağlantı sayım modelleri, çözümlü örnekler ve ileri sorular özgündür. Çizimler atom ölçekli yapı veya kişisel sağlık ölçümü değildir.",
    examples: [
      {
        title: "Son bağ sayısından başlangıç parçalarını geri bul",
        prompt:
          "Bir örnekte 28 şeker birimi vardır. Başlangıç parçaları bağlı, açık ve halkasızdır; kaç parça olduğu bilinmiyor. Farklı parçalar arasına 3 yeni bağ kurulup daha sonra 5 bağ hidroliz edildiğinde 19 bağ kalıyor. Başlangıç parça sayısı ile son parça sayısını bulunuz.",
        strategy:
          "Bağların başlangıçtan sona değişimini ters yönde izle; başlangıç bağını bulunca N−k ilişkisini kullan.",
        steps: [
          {
            label: "Başlangıç bağını geri kur",
            expression: "Bilk+3−5=19 → Bilk=21",
            explanation:
              "Son 19 bağın oluşması için başlangıçta 21 bağ bulunmalıdır; yeni bağlarla kesimler farklı aşamalardır.",
          },
          {
            label: "Başlangıç parçalarını bul",
            expression: "kilk=28−21=7",
            explanation:
              "Halkasız parçalar için toplam birim−bağ bağımsız parça sayısıdır.",
          },
          {
            label: "Son parçaları iki yoldan denetle",
            expression: "kson=7−3+5=9; 28−19=9",
            explanation:
              "Üç köprü parçaları üç azaltır, beş kesim beş artırır; son bağdan yapılan geri kontrol aynı sonucu verir.",
          },
        ],
        answer: "Başlangıç 7 parça; son 9 parça.",
        check: "21+3−5=19 bağ ve 19+9=28 birim ilişkileri birlikte sağlanır.",
        pitfall:
          "Verilen 19’u başlangıç bağ sayısı sanmak bütün ters hesabı atlar.",
      },
      {
        title: "Ortadaki tek birimi en az suyla ayır",
        prompt:
          "A–B–C–D–E–F–G–H–I açık zincirinde yalnız E birimini serbest bırakmak, sol ve sağda kalan parçaları bağlı tutmak isteniyor. Her hidroliz kesimi bir su kullanır. Hangi bağlar en az kaç suyla koparılmalıdır; son parçalar nedir?",
        strategy:
          "Hedef birimin iki komşusuna bak; gereksiz uç kesimleri yapmadan iki bağlantısını ayır.",
        steps: [
          {
            label: "E’nin bağlantılarını seç",
            expression: "D–E ve E–F",
            explanation:
              "E zincirin ortasındadır; serbest olması için her iki bağlantısı da ayrılmalıdır.",
          },
          {
            label: "En az kesim sayısını gerekçelendir",
            expression: "2 bağ → 2 su",
            explanation:
              "Tek kesim E’yi komşularından en az birine bağlı bırakır; iki kesim hem gerekli hem yeterlidir.",
          },
          {
            label: "Son parçaları yaz",
            expression: "ABCD | E | FGHI",
            explanation:
              "Diğer bağlar korununca uzunluklar 4,1,4 olur. Yalnız E tek birimli parçadır.",
          },
        ],
        answer:
          "D–E ile E–F koparılır; en az 2 su kullanılır. Parçalar ABCD, E ve FGHI’dır.",
        check:
          "Başta 8 bağ, sonda 6 bağ vardır;9 birim ve 3 parça için 9−3=6 bulunur.",
        pitfall:
          "Bir serbest birim için her durumda tek kesim yeter sanmak, hedefin zincirdeki yerini yok sayar.",
      },
      {
        title: "İki seçici deneyden karışımın molekül sayısını kur",
        prompt:
          "Bir karışımda yalnız 4 birimli P zincirleri ile 7 birimli Q zincirleri vardır; başlangıçta serbest glikoz yoktur. E yalnız P’yi tamamen hidroliz edip 20 glikoz oluşturuyor. Ardından Q’ya özgü F de eklenince serbest glikoz toplamı 41 oluyor. Her zincir açık ve halkasızdır. P ve Q adetleriyle bütün hidrolizde kullanılan suyu bulunuz.",
        strategy:
          "İkinci ölçümün toplam olduğunu koru; yeni Q ürününü iki ölçümün farkından ayır.",
        steps: [
          {
            label: "İlk seçici ürün",
            expression: "P=20/4=5 molekül",
            explanation:
              "E’nin yalnız P’ye etki ettiği ve P’nin dört birimli olduğu verildiğinden ilk 20 glikoz bu gruptandır.",
          },
          {
            label: "İkinci aşamanın ek ürünü",
            expression: "Q ürünü=41−20=21; Q=21/7=3",
            explanation:
              "41’i yalnız Q katkısı sayma; önce oluşmuş 20 glikoz da toplamın içindedir.",
          },
          {
            label: "Bağları ve suyu topla",
            expression: "5×(4−1)+3×(7−1)=15+18=33 su",
            explanation:
              "Sekiz başlangıç zincirinin toplam 41 birimi vardır;41−8=33 kontrolü aynı hidroliz bağ sayısını verir.",
          },
        ],
        answer: "5 P ve 3 Q molekülü; tam hidrolizde 33 su kullanılır.",
        check: "Ürün toplamı 5×4+3×7=41; başlangıç molekül sayısı 8’dir.",
        pitfall:
          "İkinci toplam 41’i ilk ürün üzerine yeniden eklersen aynı glikozları iki kez sayarsın.",
      },
      {
        title: "Kütle kaydıyla parça kaydını birlikte denetle",
        prompt:
          "Net modelde 18 özdeş serbest şeker biriminin her biri 180 u, ayrılan her su 18 u kabul ediliyor. Bu birimlerin tümüyle yapılan halkasız parçaların toplam kütlesi 3096 u ölçülüyor. Bir kayıtta parça sayısı 9 yazıyor. Model kütlelerini kesin verilen kabul ederek bağ sayısını bulunuz ve parça kaydını denetleyiniz.",
        strategy:
          "Serbest başlangıç ile bağlı ürün kütlesinin farkından ayrılan suyu; ondan bağları çıkar.",
        steps: [
          {
            label: "Kütle farkını bul",
            expression: "18×180−3096=3240−3096=144 u",
            explanation:
              "Net modelde bu fark yalnız ayrılan suya aittir; başka kayıp olmadığı verilmiştir.",
          },
          {
            label: "Yeni bağ sayısı",
            expression: "144/18=8 su → 8 bağ",
            explanation:
              "Bir su/bir yeni glikozit bağı oranı toplam 8 bağlantı verir.",
          },
          {
            label: "Parça kaydını düzelt",
            expression: "k=18−8=10; 9 parça olsaydı 9 bağ gerekirdi",
            explanation:
              "Ölçülen kütleye göre 10 parça vardır. Dokuz parça varsayımı 162 u su ayrılışı ve 3078 u ürün kütlesi verirdi.",
          },
        ],
        answer:
          "8 bağ ve 10 parça bulunur;9 parça kaydı verilen kütleyle tutarsızdır.",
        check:
          "3096+8×18=3240 u;8 bağ+10 parça=18 birim. Bunlar soruya özgü yaklaşık kütle modelidir.",
        pitfall:
          "Moleküler model kütlelerini bütün canlıların hassas izotop kütleleri gibi koşulsuz genelleme.",
      },
      {
        title: "Enzimi doğru bölmeye yerleştir",
        prompt:
          "Bir torbada 8 laktoz, dışında saf su vardır. Torba zarı glikozu geçirir; laktozu, galaktozu ve laktaz enzimini geçirmez. Laktaz laktozu bir glikoz+bir galaktoza tam hidroliz eder. Dışarıya laktaz eklenince dışta glikoz görülmüyor. Laktoz varken bu sonuç neden mümkündür; dışta glikoz oluşmasını sağlayacak tek yer değişimi ve son şeker dağılımı nedir? Glikozun tamamının dışarı çıktığını kabul ediniz.",
        strategy:
          "Substratla enzimin aynı bölmede bulunup bulunmadığını izle; negatif dış ölçümü torba içinin yokluğu sayma.",
        steps: [
          {
            label: "Başlangıçta temas yok",
            expression:
              "Laktoz içeride; laktaz dışarıda; ikisi de zarı geçmiyor",
            explanation:
              "Enzim ile substrat buluşmadığı için dış glikozun görülmemesi, içeride laktozun bulunmadığını göstermez.",
          },
          {
            label: "Laktazı içeri yerleştir",
            expression: "8 laktoz → 8 glikoz+8 galaktoz",
            explanation:
              "Aynı torba içindeki laktaz substrata erişebilir; verilmiş tam hidroliz 8 su kullanır.",
          },
          {
            label: "Zarın seçiciliğini uygula",
            expression: "Dışta 8 glikoz; içte 8 galaktoz",
            explanation:
              "Glikozun tamamı dışarı çıkabilir, galaktoz geçmez. Laktoz birimleri üründe toplam 16 şeker olarak korunur.",
          },
        ],
        answer:
          "Dıştaki enzim substrata erişememiştir. Laktazı torba içine koyunca dışta 8 glikoz, içte 8 galaktoz bulunur.",
        check:
          "Başlangıç 8×2=16 şeker birimi, sonda 8+8=16; taşıma bağın hidrolizinden ayrı basamaktır.",
        pitfall:
          "Geçiş engelini yok sayıp dışarıdaki laktazın torba içindeki laktozu doğrudan parçaladığını varsayma.",
      },
      {
        title: "Parçalardan geriye doğru kesim yerlerini bul",
        prompt:
          "A–B–C–D–E–F–G–H–I zincirinde yalnız hidroliz gerçekleşiyor. Son parçaların soldan sağa uzunlukları 3,3,3 ölçülüyor; birimlerin sırası ve tamamı korunuyor. Kesim bağlarını, kullanılan suyu ve yalnız uçtan birim ayıran bir işlemle bu sonucun uyumunu bulunuz.",
        strategy:
          "Ölçülen parça uzunluklarını özgün dizi üzerinde ardışık yerleştir; sonra sınırları işaretle.",
        steps: [
          {
            label: "Ölçülen parçaları yerleştir",
            expression: "ABC | DEF | GHI",
            explanation:
              "Sıra korunduğu için soldan üçerli gruplar bu sınırlarla oluşur.",
          },
          {
            label: "Kesim ve suyu bul",
            expression: "C–D ve F–G; 2 kesim → 2 su",
            explanation:
              "Üç son parça için başlangıç tek parçaya iki kesim eklenmiştir.",
          },
          {
            label: "İşlem hipotezini denetle",
            expression: "Serbest birim yok; iki kesim de iç bağlantıdadır",
            explanation:
              "Yalnız uçtan tek birimler ayıran iki kesim en az iki tek birim bırakırdı; ölçülen 3,3,3 dağılımını vermez.",
          },
        ],
        answer:
          "C–D ve F–G kopmuştur;2 su kullanılır. Sonuç yalnız uçtan birim ayırma hipoteziyle uyumlu değildir.",
        check:
          "3+3+3=9; her parçada 2 olmak üzere 6 bağ kalır,8−2=6 kontrolü sağlanır.",
        pitfall:
          "Yalnız toplam suyu bilmekle kesim yeri bulunduğunu sanma; burada ek kanıt sıralı parça uzunluklarıdır.",
      },
    ],
    recall: [
      {
        prompt:
          "Birçok monosakkaritte görülen (CH₂O)n oranı bütün şeker türevleri için zorunlu mudur?",
        answer:
          "Hayır; örneğin deoksiriboz C₅H₁₀O₄’tür. Kapalı oran tek başına bütün karbohidrat sınıfının tanımı değildir.",
      },
      {
        prompt: "Kitindeki azot, yapı birimini nasıl adlandırmayı gerektirir?",
        answer:
          "Birim azot içeren değiştirilmiş şeker N-asetilglukozamindir; kitini yalnız değişmemiş glikoz birimli saymamak gerekir.",
      },
      {
        prompt: "N birim k halkasız parçadaysa kaç glikozit bağı vardır?",
        answer:
          "B=N−k. Birimler arasında halka kapanması veya başka bağ verildiyse bu koşul yeniden denetlenir.",
      },
      {
        prompt:
          "Tek bir hidroliz kesimi neden her zaman serbest glikoz vermez?",
        answer:
          "Kesim iki daha büyük parçayı ayırabilir. Serbest birim için parça uzunluğunun bir olması gerekir; kesim yerleri önemlidir.",
      },
      {
        prompt:
          "Glikoz biriminin ortak olması nişasta ile selülozu tek molekül yapar mı?",
        answer:
          "Hayır. Bağlanma ve düzen farklılıkları özellikleri ve enzimle etkileşimi değiştirebilir.",
      },
      {
        prompt:
          "Önceden bağlı parçaları birleştirirken suyu hangi bağlarla sayarsın?",
        answer:
          "Yalnız o aşamada yeni kurulan glikozit bağlarıyla. Mevcut bütün bağları tekrar sentez suyu saymam.",
      },
    ],
  },
  {
    id: "lipitler",
    topic: "detail-6",
    title: "Lipitler: bileşen, ester bağı ve hücrede görev",
    sections: [
      {
        title: "Lipit bir tek molekül adı değildir",
        paragraphs: [
          "Lipit sözcüğü aynı yapıyı taşıyan tek bir molekülün adı değildir. Suda genellikle az çözünen, farklı yapılı organik bileşik gruplarını kapsar. Trigliseritler önemli enerji deposu; fosfolipitler zar düzeninin başlıca bileşenleri; steroidler ise halkalı iskeletleriyle farklı bir grup olarak ele alınır.",
          "Her lipidi gliserol ve üç yağ asidi biçiminde çizmeye çalışma. Bir grubun yapı bileşenleri, başka grubun tanımı yerine geçmez. Önce hangi lipit türünden söz edildiğini belirle; ardından yapısını, suyla etkileşmesini ve canlıdaki görevini o türün koşullarıyla açıkla. Mumlar da lipit grubundadır: uzun zincirli bir alkol ile bir yağ asidinin ester bağlantısı taşıyan örnekleri, yüzeylerde su itici koruyucu tabaka oluşturabilir. Bu yapı bir gliserole üç yağ asidi bağlanan trigliseritten ayrıdır.",
        ],
      },
      {
        title: "Bir trigliseritin parçalarını birleştir",
        paragraphs: [
          "Trigliserit, bir gliserolün üç yağ asidiyle ester bağları üzerinden birleştiği yapıdır. TYT’nin net esterleşme hesabında tam bir trigliserit için üç ester bağı kurulur ve üç su açığa çıkışı izlenir. Gliserol sayısı ile yağ asidi sayısını ayrı sütunlarda tutmak oranı görünür yapar.",
          "Üç yağ asidinin de aynı türde olması gerekmez. Trigliserit, tek bir monomerin uzun bir zincir boyunca tekrarlandığı klasik bir polimer değildir. Buradaki bir gliserol–üç yağ asidi çizimi net bileşimi gösterir; hücrede yağ sentezinin bütün etkinleştirme ve ara ürün basamaklarını temsil etmez.",
        ],
      },
      {
        title: "Yağ asidi zincirindeki bağa bak",
        paragraphs: [
          "Doymuş yağ asidinin karbon zincirinde karbon–karbon çift bağı yoktur. Doymamış yağ asidinde bir veya daha çok karbon–karbon çift bağı bulunur. Yağ asidinin karboksil grubundaki karbon–oksijen çift bağı bu sınıflandırmanın ölçütü değildir; zincirdeki karbon–karbon bağları incelenir.",
          "Çift bağ sayısı yanında zincirin uzunluğu ve çift bağın geometrisi de moleküllerin birlikte yerleşmesini etkiler. Bazı doğal doymamış zincirlerdeki cis çift bağlar bükülme oluşturur. “Bir çift bağ gördüm, bu yağ her koşulda sıvıdır” sonucu yerine hangi yapıların ve hangi sıcaklık koşulunun karşılaştırıldığını belirt.",
        ],
      },
      {
        title: "Fosfolipitte iki farklı uç",
        paragraphs: [
          "Birçok zar fosfolipidinin suyla etkileşen kutuplu başı ve suyla etkileşmekten kaçınan hidrofobik kuyruk bölgesi vardır. Bu iki farklı özellik aynı molekülde bulunduğundan suyla çevrili ortamda düzenli topluluklar oluşabilir. TYT’de iki kuyruklu fosfolipit çizimi bu ilişkiyi öğretmek için kullanılır. Başın fosfat içermesi ve kuyrukların hidrofobik oluşu bu moleküle amfipatik, yani iki farklı etkileşim bölgesi taşıyan nitelik verir.",
          "Hücre zarının iki tarafında da sulu ortam bulunduğunda başlar her iki sulu yüze, kuyruklar içte birbirine yönelir. Bu, tek zarın çift katlı fosfolipit düzenidir; iki ayrı organel zarı demek değildir. Fosfolipidi yağ damlasındaki trigliseritle aynı işlevli veya aynı parça oranlı kabul etme.",
        ],
      },
      {
        title: "Enerji deposu olmak tek görev değildir",
        paragraphs: [
          "Yağlar birim kütlede karbonhidratlara göre daha yüksek enerji sağlayabilen depolardır. Vücuttaki yağ dokusu enerji depolamanın yanında ısı yalıtımına ve mekanik korumaya da katkı verebilir. Bu görevler enerji üretme hızı, çözünürlük veya bütün yağların yapısı için tek bir kural oluşturmaz.",
          "Kolesterol hayvan hücre zarının özelliklerinin düzenlenmesinde yer alır ve bazı steroid ürünlerin öncüsüdür. Yağda çözünen vitaminlerle lipitlerin ilişkisi, bütün vitaminlerin lipit veya steroid yapıda olduğu anlamına gelmez. Bir görevi değerlendirirken molekülün adı ile bulunduğu yapının işlevini birlikte kullan.",
        ],
      },
      {
        title: "Gliserol ile yağ asidini işlevsel gruplarından tanı",
        paragraphs: [
          "Gliserol üç hidroksil grubu taşıyan küçük bir alkoldür. Yağ asitlerinin ise karboksil başı ve çoğunlukla uzun hidrokarbon bölümü vardır. Esterleşmede gliserolün hidroksil gruplarıyla yağ asitlerinin karboksil grupları arasındaki bağlantılar izlenir; modelde her yağ asidi ayrı bir kol olarak çizilebilir.",
          "Bir trigliseritte üç yağ asidi bulunması gliserolün de üç molekül olduğu anlamına gelmez. Molekül sayısı, atom sayısı ve işlevsel grup sayısı farklı niceliklerdir. Parçaların birleşmesinden önceki serbest bileşen toplamını, birleşme sonrası oluşan lipit molekülü sayısıyla karıştırma. Mol kütlesi M, bir mol maddenin gram cinsinden kütlesidir ve g/mol ile yazılır. m=n×M bağıntısında n mol miktarıdır; bir molekülün parçalarını sayarken kullanılan tam sayı oranlarıyla ölçülen mol miktarını karıştırma. Net sentez kütlesinde ayrılan suyun kütlesi bileşenler toplamından çıkarılır.",
        ],
      },
      {
        title: "Sınırlayıcı bileşeni tam molekül oranıyla bul",
        paragraphs: [
          "Bir trigliserit için bir gliserol ve üç yağ asidi gerekir. Serbest bileşenler verildiğinde üretilebilecek tam trigliserit sayısı hem gliserol sayısını hem yağ asidi sayısının üçte birini aşamaz. Bölme kesirli sonuç verirse kalan yağ asitleri yeni bir tam trigliserit oluşturamayabilir.",
          "Bu hesap, verilen bileşenlerle kuramsal tam molekül üst sınırıdır. Gerçek bir hücrenin aynı sayıda ürünü mutlaka yapacağını söylemez; enzimler, ara ürünler ve başka koşullar ayrıca gerekir. Sorudaki “en çok” ile “oluşturulduğu ölçüldü” ifadelerini ayır; üretilen sayı üst sınırdan düşük verilebilir.",
        ],
      },
      {
        title: "Üretimden sonra kalan serbest bileşenleri izle",
        paragraphs: [
          "b adet trigliserit kurulduğunda b gliserol ve 3b yağ asidi yapıya katılır. Başlangıç serbest miktarlarından bu katkıları çıkararak kullanılmadan kalanları bul. Ester bağı ve net sentez suyu miktarı bu aşamada 3b olarak sayılır; bütün başlangıç yağ asitlerinin kullanılması zorunlu değildir.",
          "Birkaç farklı yağ asidi türü verilmişse yalnız toplam sayı, hangi türün hangi trigliseritte birleştiğini belirlemez. Toplam molekül hesabı yapılabilirken ayrıntılı molekül çeşidi hesabı ek bilgi isteyebilir. Bir miktar verisinden bilinmeyen tür dağılımını kendiliğinden üretme.",
        ],
      },
      {
        title: "Kısmi hidrolizde bir bağ, bir yağ asidi ayırır",
        paragraphs: [
          "Trigliseritin bir ester bağı hidrolizle koparıldığında bir yağ asidi ayrılır; geride iki yağ asidi bağlı bir gliserol türevi kalır. İkinci bağın ayrılmasıyla bir başka yağ asidi serbestleşir. Gliserolün tamamen serbest kalması ise o moleküldeki üçüncü ester bağının da ayrılmasını gerektirir.",
          "Bu nedenle koparılan ester bağı sayısından doğrudan aynı sayıda serbest gliserol çıkarılamaz. Kesimlerin hangi moleküllerde toplandığı ayrıca önemlidir. Farklı trigliseritlerde birer bağın kopmasıyla tek bir trigliseritte üç bağın kopması, aynı toplam kesime rağmen farklı serbest gliserol sayıları verebilir.",
        ],
      },
      {
        title: "Tam hidrolizde baştaki yapıyı geri say",
        paragraphs: [
          "TYT’nin tam hidroliz modelinde her trigliseritten bir gliserol ve üç yağ asidi elde edilir; üç ester bağının ayrılması için üç su kullanılır. Birkaç trigliseritte bu katkılar molekül adediyle çarpılır. Başlangıçta serbest bileşenler de varsa son serbest miktara onlar ayrıca eklenir.",
          "Model net ester bağlarını sayar. İnsan sindiriminde geçici monoasilgliseroller, kısmi ürünler ve yeniden sentez gibi basamaklar da bulunabilir; tek çizim bütün fizyolojik süreci bitirmiş sayılmaz. Bir sorunun tam hidroliz varsayımı ile kısmi hidroliz gözlemini aynı sonuçla yanıtlamama nedeni budur.",
        ],
      },
      {
        title: "Doymuşluk ile hidrojen sayısını koşullu karşılaştır",
        paragraphs: [
          "Aynı karbon uzunluğundaki uygun iki yağ asidi karşılaştırıldığında karbon–karbon çift bağlarının artması hidrojen sayısını azaltır. Hidrojenle doyurma işlemi çift bağları tek bağa çevirdiğinde uygun sayıda hidrojen eklenir. Bu ilişki yalnız karşılaştırılan iskelet ve işlevsel grup koşulları korunursa kullanılmalıdır.",
          "Karbon uzunlukları farklı iki yağ asidinin toplam hidrojen sayısını yalnız “doymuş/doymamış” adına bakarak sıralama. Molekül formülü veya zincir uzunluğu da gerekir. Doymuşluk, yağın kaç ester bağı kurduğu sorusundan da ayrıdır; ester bağları yağ asidinin gliserolle bağlantısına aittir.",
        ],
      },
      {
        title: "Cis, trans ve karışım etkisini sınırla",
        paragraphs: [
          "Birçok cis çift bağ zincirin doğrultusunu büker; zincirlerin düzenli paketlenmesini zorlaştırabilir. Aynı uzunlukta ve uygun diğer koşullarda bu durum erime davranışını etkiler. Trans çift bağın yerleşimi cis örnekten farklıdır; bütün doymamış yağ asitlerini aynı şekle indirgeyemeyiz.",
          "Besinlerdeki yağlar çoğu zaman birçok molekülün karışımıdır. Oda sıcaklığında katı veya sıvı görülmesi tek başına bütün zincirlerin doymuşluk durumunu kesinleştirmez. Bitkisel yağlar ve hayvansal yağlar için verilen genel eğilimler, her canlı ve her molekül için istisnasız bir kimyasal yasa değildir.",
        ],
      },
      {
        title: "Esansiyel yağ asidi insanın sentez sınırını anlatır",
        paragraphs: [
          "Esansiyel yağ asitleri insanın gereksinimini yeterli düzeyde karşılayacak biçimde sentezleyemediği ve besinlerden edinmesi gereken yağ asitleridir. Linoleik asit ile alfa-linolenik asit temel örneklerdir. Bu gereksinim, insanın hiçbir yağ asidi veya hiçbir lipit üretemediğini göstermez.",
          "Omega adlandırmasında karbonlar yağ asidinin metil (CH₃) ucundan sayılır; ilk karbon–karbon çift bağının bu uçtan konumu omega numarasını verir. Bu sayı tek başına molekülün bütün görevlerini veya insan için kesin bir dozunu vermez. Uzun zincirli bazı ürünlere sınırlı dönüşümler olabilir. Buradaki amaç yapı ve sentez yeterliliği kavramıdır; kişiye reçete üretilmez.",
        ],
      },
      {
        title: "Steroidin iskeleti trigliseritten farklıdır",
        paragraphs: [
          "Steroidler ortak, birbiriyle kaynaşmış dört halkalı karbon iskeletiyle tanınan bir gruptur. Kolesterol, bazı hormonların ve başka steroid ürünlerin öncüsü olarak örneklenir. Bu grubun yapısını bir gliserol ve üç yağ asidinin esterleşmesiyle tanımlamak doğru değildir; lipit sınıfında farklı iskeletler bulunur.",
          "D vitamininin oluşumu kolesterol kökenli bir öncüyle ilişkilidir; bundan A, E ve K vitaminlerinin de steroid olduğu sonucu çıkmaz. Birbiriyle metabolik ilişkisi olan maddelerin hepsini aynı yapısal gruba atama. Yapı sınıfı, çözünürlük grubu ve işlev üç ayrı ölçüttür. Kolesterol, safra asitlerinin de öncüsüdür. Bu maddelerin tuzları sulu ortamda yağların dağılması ve emilim bağlamında görev alabilir; böylece aynı öncülün zar bileşeni olmanın dışında farklı ürünlerle ilişkisi görülür.",
        ],
      },
      {
        title: "Zarda kolesterolün görevini bağlamla açıkla",
        paragraphs: [
          "Hayvan hücre zarındaki kolesterol, fosfolipitlerle birlikte zarın fiziksel özelliklerinin düzenlenmesine katkı verir. “Kolesterol” adı yalnız hastalık bağlamındaki bir sözcük değildir; normal biyolojik yapı ve sentez süreçlerinde de rol alır. Bir molekülün görevi olması, her miktarının her koşulda yararlı olduğu iddiasını taşımaz.",
          "Bu düzeyde zarın tek bir saf lipit türünden oluştuğunu varsayma. Fosfolipitler, kolesterol ve zar proteinleri farklı katkılar sağlar. Bir grafikte akışkanlık değişimi görülürse sıcaklık ve karışımın hangi bileşeninin değiştirildiği verilmeden tek bir moleküle kesin neden atama.",
        ],
      },
      {
        title: "Enerji verimi ile ilk kullanım sırasını ayır",
        paragraphs: [
          "Birim kütlede yüksek enerji içermek, bir besinin her koşulda önce kullanıldığını veya daha hızlı enerji sağladığını göstermez. Enerjinin açığa çıkarılması, molekülün metabolik yollarda işlenmesini gerektirir. Kullanım biçimi dokuya, süreye ve koşullara bağlıdır; depolanan enerji ile anlık hız ayrı niceliklerdir.",
          "Yağ dokusunun az suyla birlikte önemli enerji saklaması depolama açısından yararlıdır. Yalıtım ve koruma ise bu enerjinin yakılmasından farklı işlevlerdir. Bir tabloyu okurken birim kütle, toplam kütle ve toplam enerji verilerini ayır; yalnız gram başına değerden bütün örneğin toplamını çıkarma. Yağların oksijenli yıkımında metabolik su oluşmasına da katkı sağlanabilir; bu, ester hidrolizinde su tüketilmesinden farklı bir tepkime yönüdür. Metabolik su oluşması bir canlının bütün koşullarda dış suya gereksinimi olmadığı anlamına gelmez.",
        ],
      },
      {
        title: "Suda davranışı türüne göre yorumla",
        paragraphs: [
          "Trigliseritlerin suyla zayıf etkileşmesi yağ damlalarıyla, fosfolipidin iki farklı bölgesi ise uygun koşullarda çift katlı düzenle ilişkilendirilebilir. Karıştırmak moleküllerin kimyasal bağlarını zorunlu olarak hidrolizle ayırmaz. Büyük damlaların küçük damlalara dağılması, ester bağlarının kopmasından farklı bir değişimdir.",
          "Bir deneyde yüzey alanının artması, enzimin yağ yüzeyine erişmesini değiştirebilir; fakat enzimin türü, miktarı ve diğer koşullar korunmalıdır. Yağın fiziksel olarak dağılmasıyla kimyasal sindirim ürünlerinin oluşmasını aynı ölçüm sanma. Ürün oluşumu için ürüne özgü veri gerekir. Sindirim bağlamında lipaz ester bağlarının hidrolizini katalizleyen enzimdir. Safra enzim değildir; yağın küçük damlalara dağılmasına ve uygun temas yüzeyine katkı verir. Safranın dağıtıcı etkisi ester kesimi, lipazın kimyasal etkisi de yalnız mekanik parçalama sayılmaz.",
        ],
      },
      {
        title: "Lipit sorusunu bileşen, bağ ve görevle denetle",
        paragraphs: [
          "Önce trigliserit, fosfolipit veya steroid grubunu belirle. Trigliserit sayımında gliserol ile yağ asidini ayrı tut; yeni ester bağlarıyla sentez suyunu, kopan bağlarla hidroliz suyunu eşleştir. Kısmi hidrolizde hangi gliserolün tamamen serbest kaldığını molekül molekül incele.",
          "Etkileşimde kalan bağlı kollar ve serbest bileşenler hem SVG’de hem HTML listesinde gösterilir. Çizim gerçek atom ölçeği veya tam sindirim deneyi değildir. Sayısal tahmin kıyası bir öğrenme puanı oluşturmaz; farklı bileşen ve kesim dağılımında aynı yöntemi gerekçelendirmek amaçlanır.",
        ],
      },
    ],
    minutes: 40,
    objectives: [
      "Trigliserit, fosfolipit ve steroidin yapı–görev ilişkisini ayır.",
      "Sınırlayıcı bileşenle ester bağı ve serbest ürünleri hesapla.",
      "Kısmi hidrolizde hangi gliserolün tamamen serbest kaldığını izle.",
    ],
    source:
      "OGM Dersler Cepte 9. Sınıf Biyoloji, canlıların yapısındaki temel bileşikler I; OpenStax Biology 2e, 3.3 Lipitler. Anlatım, bağlantı sayım modelleri, çözümlü örnekler ve ileri sorular özgündür. Çizimler atom ölçekli yapı veya kişisel sağlık ölçümü değildir.",
    examples: [
      {
        title: "Son serbest ürünlerden başlangıç stoklarını geri bul",
        prompt:
          "Serbest gliserol ve yağ asitlerinden 5 trigliserit kuruluyor. Sonra ilk iki trigliseritin üçer ester bağı tamamen kopuyor; diğer üçü değişmiyor. En sonda serbest 4 gliserol ve 9 yağ asidi sayılıyor. Başka kaynak veya kayıp yok. Başlangıç gliserol ve yağ asidi sayılarını bulunuz.",
        strategy:
          "Son serbest miktarda hem kullanılmadan kalanı hem hidrolizle geri geleni ayır.",
        steps: [
          {
            label: "Hidroliz katkısı",
            expression: "2 tam hidroliz → 2 gliserol+6 yağ asidi",
            explanation:
              "Son serbestlerin bu bölümü başlangıçtan artan değil, sonradan ayrılan miktardır.",
          },
          {
            label: "Başlangıçtan kullanılmadan kalan",
            expression: "Gliserol:4−2=2; yağ asidi:9−6=3",
            explanation:
              "Son serbestlerden hidroliz katkısını çıkarınca üretimde kullanılmayan bileşenler bulunur.",
          },
          {
            label: "Başlangıç stoklarını kur",
            expression: "Gilk=2+5=7; YAilk=3+3×5=18",
            explanation:
              "Beş ürünün yapıya kattığı 5 gliserol ve 15 yağ asidini artanlara ekle.",
          },
        ],
        answer: "Başlangıç 7 gliserol ve 18 yağ asidi.",
        check:
          "7−5+2=4 serbest gliserol;18−15+6=9 serbest yağ asidi. Üretilen 5 sayısı kuramsal üst sınırla karıştırılmaz.",
        pitfall:
          "Son serbest ürünlerin tamamını başlangıçta hiç kullanılmamış kabul etme.",
      },
      {
        title: "Aynı kesim bütçesiyle alt ve üst sınır kur",
        prompt:
          "Altı trigliseritte toplam 8 ester bağı hidroliz edilecek. Bir gliserol ancak kendi üç bağlantısı da kopunca serbesttir. Başlangıçta serbest gliserol yoktur. Serbest gliserolün mümkün en az ve en çok sayılarını, her iki uç için bir kesim dağılımı göstererek bulunuz.",
        strategy:
          "En çok için üçlü kesimleri tamamla; en az için her molekülü üçüncü kesimden koruyarak dağıt.",
        steps: [
          {
            label: "Üst sınır",
            expression: "en çok⌊8/3⌋=2 gliserol",
            explanation:
              "Üçüncü serbest gliserol 9 kesim gerektirir. 3,3,2,0,0,0 dağılımı 8 kesimle 2 gliserol sağlar.",
          },
          {
            label: "Alt sınır",
            expression: "2,2,1,1,1,1 → 8 kesim; 0 tam ayrılmış gliserol",
            explanation:
              "Her molekülde en çok 2 bağ koparılarak 8 kesim altı moleküle dağıtılabilir; sıfır mümkündür.",
          },
          {
            label: "Ortak yağ asidini ayır",
            expression: "Her dağılımda 8 serbest yağ asidi; gliserol 0..2",
            explanation:
              "Bir yağ asidi/kesim toplamı sabittir. Farklı olan kesimlerin molekül başına tamamlanma durumudur.",
          },
        ],
        answer:
          "Serbest gliserol en az 0, en çok 2 olabilir; iki sınır da gösterilen dağılımlarla gerçekleşir.",
        check:
          "Dağılımlardaki bütün terimler 0..3 aralığında, toplamları 8’dir; başlangıç 18 ester bağından 10 kalır.",
        pitfall:
          "Toplam 8’i3’e bölüp sonucu zorunlu gliserol sayısı sanma; bu yalnız üst sınırı verir.",
      },
      {
        title: "İki seçici ölçümle üç lipit grubunu ayır",
        prompt:
          "Karışım yalnız trigliserit, fosfolipit ve steroid içeriyor; toplam 15 molekül var. Bu modelde her fosfolipit 1 P atomu taşır, öteki türler P içermez. Ölçülen P sayısı 5. Ayrı aynı bileşimli örnekte yalnız trigliseritleri tam hidroliz eden seçici enzim 21 yağ asidi açığa çıkarıyor; başlangıç serbest yağ asidi yok. Üç türün sayılarını bulunuz.",
        strategy:
          "Fosfor ile fosfolipidi; seçici enzim ürünüyle trigliseriti ayrı belirle, toplamdan üçüncü türü çıkar.",
        steps: [
          {
            label: "Fosfolipit sayısı",
            expression: "P=5 → 5 fosfolipit",
            explanation:
              "Verilen tek kaynak ve bir P/molekül oranı bu grubu doğrudan belirler.",
          },
          {
            label: "Trigliserit sayısı",
            expression: "21/3=7 trigliserit",
            explanation:
              "Seçici enzim yalnız trigliseritten üçer yağ asidi çıkarmaktadır; diğer lipitler bu ölçüme katılmaz.",
          },
          {
            label: "Steroid sayısı",
            expression: "15−5−7=3 steroid",
            explanation:
              "Bağımsız iki ölçüm toplam 15’in iki grubunu belirlediği için üçüncü grup da bulunur.",
          },
        ],
        answer: "5 fosfolipit,7 trigliserit,3 steroid.",
        check: "5+7+3=15; fosfor 5; trigliserit yağ asidi ürünü 7×3=21.",
        pitfall:
          "Fosforun tek başına P içermeyen iki türü ayıramadığını unutma; ikinci seçici ölçüm bunun için gereklidir.",
      },
      {
        title: "Çift katmanda erişilen yüzü ölçümle bul",
        prompt:
          "Basitleştirilmiş zar şemasında 26 fosfolipidin her kutuplu başı bir boya işareti taşır. Suda bulunan söndürücü yalnız eriştiği işareti söndürür, sağlam zarı geçemez; lipitleri hidroliz etmez. Dıştan söndürücü eklenince 11 işaret ışımaya devam ediyor. Zar açılıp aynı söndürücü iç yüze de ulaştırılınca ışımayan işaretlerin sayısı 26 oluyor. İlk işlemde dışa erişilen ve içte korunan baş sayılarını bulunuz.",
        strategy:
          "Boya işaretinin kaybolmasını molekülün veya ester bağının kaybolması saymadan, erişim bölmelerini izle.",
        steps: [
          {
            label: "Korunan iç yüz",
            expression: "İlk işlem sonrası kalan 11 işaret → içte 11 baş",
            explanation:
              "Söndürücü sağlam zarı geçmediği için ilk aşamada içerideki işaretlere ulaşamaz.",
          },
          {
            label: "Dışa erişilen yüz",
            expression: "26−11=15 baş",
            explanation:
              "İlk aşamada sönen 15 işaret dıştan erişilen başlara aittir; bu, fosfolipitlerin parçalandığı anlamına gelmez.",
          },
          {
            label: "İkinci aşamayla kontrol",
            expression: "15 dış+11 iç=26 toplam işaret",
            explanation:
              "Zar açılınca kalan 11’in de sönmesi, erişim engeli açıklamasıyla uyumludur; hidroliz ürününe ilişkin kanıt yoktur.",
          },
        ],
        answer: "İlk aşamada 15 baş dıştan erişilir,11 baş içte korunur.",
        check:
          "Boya işaretleri için 15+11=26; işlemde lipit sayısı veya bağ kesimi değişimi verilmemiştir.",
        pitfall:
          "Işımanın sönmesini ester hidrolizi gibi yorumlamak ölçümün hangi özelliğe duyarlı olduğunu atlar.",
      },
      {
        title: "Depolanan enerjiyle taşınan toplam kütleyi ayır",
        prompt:
          "Yalnız bu karşılaştırma modelinde kuru yağ 9, kuru karbohidrat 4 enerji birimi/g verir. Her 1 g kuru yağ yanında 0,2 g su; her 1 g kuru karbohidrat yanında 2 g su taşınıyor. A:8 g yağ; B:18 g karbohidrat; C:4 g yağ+9 g karbohidrat paketleridir. En az 72 enerji ve en çok 18 g toplam paket kütlesi koşulunu hangileri sağlar?",
        strategy:
          "Önce kuru bileşenlerden enerjiyi, sonra onlara eşlik eden suyla toplam kütleyi hesapla.",
        steps: [
          {
            label: "Enerjileri karşılaştır",
            expression: "A:8×9=72; B:18×4=72; C:4×9+9×4=72",
            explanation:
              "Üç paket aynı enerji sağlar; bu eşitlik toplam taşınan kütleyi henüz vermez.",
          },
          {
            label: "Su dahil kütle",
            expression: "A:8×1,2=9,6 g; B:18×3=54 g; C:4×1,2+9×3=31,8 g",
            explanation:
              "Kuru kütle başına verilen su eşlikleri her bileşene ayrı uygulanır; sayılar bu modele özgüdür.",
          },
          {
            label: "İki koşulu birlikte seç",
            expression: "Enerji≥72 ve kütle≤18 → yalnız A",
            explanation:
              "B ve C enerji koşulunu sağlasa da su dahil kütle üst sınırını aşar.",
          },
        ],
        answer:
          "Yalnız A iki koşulu birlikte sağlar; enerji 72 ve toplam kütle 9,6 g’dır.",
        check: "A’da kuru 8+su 1,6=9,6; C’de kuru 13+su 18,8=31,8 g.",
        pitfall:
          "Aynı enerjiye sahip paketleri aynı kuru veya su dahil kütlede kabul etme; verilen su oranları evrensel fizyolojik sabit değildir.",
      },
      {
        title: "Trigliseritin kütlesinden yağ asidi bileşimini çıkar",
        prompt:
          "Bir trigliserit 1 gliserol ve toplam 3 yağ asidinden oluşuyor. Yağ asitleri yalnız X veya Y olabilir. Net modelde mol kütleleri gliserol 92, X260, Y284, su 18 g/mol ve ürün 866 g/mol veriliyor;3 su ayrılmıştır. X/Y sayılarını bulunuz. Yalnız toplam kütleden hangi kolun X olduğunu belirleyebilir misiniz?",
        strategy:
          "Üç kolun hepsi X olsaydı oluşacak temel kütleyi kur; her X→Y değişiminin farkını kullan.",
        steps: [
          {
            label: "Temel ürün kütlesi",
            expression: "92+3×260−3×18=818 g/mol",
            explanation:
              "Bu, üç yağ asidi de X olduğundaki net model kütlesidir.",
          },
          {
            label: "Y sayısını bul",
            expression: "866−818=48; bir değişim 284−260=24 → 2 Y",
            explanation:
              "Kütle farkı iki kolun Y olmasını gerektirir; toplam üç koldan biri X kalır.",
          },
          {
            label: "Konum bilgisini sınırla",
            expression:
              "1 X+2 Y; X’in 1.,2. veya 3. kola yerleşmesi toplamı değiştirmez",
            explanation:
              "Kütle yalnız bileşimi verir; kol sırasını ayıran ek bir ölçüm verilmemiştir.",
          },
        ],
        answer:
          "1 X ve 2 Y vardır. Yalnız toplam mol kütlesinden X’in hangi kolda olduğu belirlenemez.",
        check: "92+260+2×284−54=866 g/mol; bileşen sayısı 1+2=3’tür.",
        pitfall:
          "Bileşim bulunduğunda bağlanma konumlarının da tekleştiğini varsayma.",
      },
    ],
    recall: [
      {
        prompt: "Trigliseritin 1:3 bileşen oranı bütün lipitlere uygulanır mı?",
        answer:
          "Hayır. Bir gliserol–üç yağ asidi trigliserit net bileşimidir; fosfolipit ve steroid iskeletleri farklıdır.",
      },
      {
        prompt:
          "Bir trigliseritte iki ester kesilince neden serbest gliserol sayısı sıfır olabilir?",
        answer:
          "Üçüncü yağ asidi hâlâ bağlıdır. Gliserolün tamamen serbest kalması için aynı moleküldeki üç bağın da ayrılması gerekir.",
      },
      {
        prompt: "Doymuşlukta karboksil grubunun C=O bağı sayılır mı?",
        answer:
          "Hayır. Ölçüt yağ asidinin karbon zincirindeki C=C bağlarıdır; ester veya C=O bağı ayrı türdür.",
      },
      {
        prompt:
          "Çift tabakada baş ve kuyrukların yönü hangi etkileşimle açıklanır?",
        answer:
          "Kutuplu başlar iki sulu yüze, hidrofobik kuyruklar içte birbirine yönelir; aynı molekül iki farklı bölge taşır.",
      },
      {
        prompt:
          "Esansiyel yağ asidi, insanın hiç lipit üretemediğini gösterir mi?",
        answer:
          "Hayır. Belirli yağ asitlerini gereksinimi karşılayacak miktarda sentezleyememeyi anlatır; bütün lipit sentezinin yokluğu değildir.",
      },
      {
        prompt:
          "Damlaları küçültmekle ester hidrolizi arasında nasıl ayrım yaparsın?",
        answer:
          "Damla dağılımı fiziksel yüzeyi değiştirebilir. Hidroliz için ester bağlarının ayrılması ve uygun ürünler gibi kimyasal kanıt gerekir.",
      },
    ],
  },
];
const cardPayloadB026 = {
  karbohidratlar: [
    {
      prompt:
        "A kabında iki serbest glikoz, B kabında bir maltoz vardır. Maltoz iki glikozun bir glikozit bağıyla birleşmiş hâlidir. Bir taşıyıcı yalnız serbest glikozu taşır; ortamda bağ koparan enzim yoktur. Hangi sonuç verilenlerle uyumludur?",
      options: [
        "Taşıyıcı A’daki glikozu alabilir; B’de önce bağın ayrılması gerekir.",
        "İki kapta da birer maltoz vardır.",
        "B’deki iki glikoz birimi zaten iki serbest moleküldür.",
        "Taşıyıcı her polisakkariti de doğrudan geçirir.",
        "İki glikozit bağı kopmadan A’daki glikoz taşınamaz.",
      ],
      reasons: [
        "A’da iki serbest molekül bulunur; B’de bir maltozun içindeki birimler taşıyıcının serbest glikoz koşulunu henüz sağlamaz.",
        "A’daki glikozlar arasında bağ verilmemiştir; iki serbest birim maltoz değildir.",
        "Bir moleküldeki iki bağlı birim, iki serbest glikoz molekülüyle aynı durumda değildir.",
        "Taşıyıcının yalnız serbest glikozu taşıdığı açıkça verilmiştir; daha büyük yapılar için yetki verilmez.",
        "A zaten serbest glikoz içerir; hidroliz edilecek bir glikozit bağı belirtilmemiştir.",
      ],
      steps: [
        "A’yı iki bağımsız glikoz, B’yi iki birimli tek molekül olarak ayır.",
        "Taşıyıcının kabul ettiği biçimin serbest glikoz olduğunu kullan.",
        "B’deki bağı koparan enzim bulunmadığından bağlı birimleri serbest sayma.",
      ],
      knowledge:
        "Birim adedi ile bağımsız molekül adedi ve taşıyıcının seçtiği biçim ayrı bilgilerdir.",
      error:
        "Aynı toplam glikoz birimini görmekten aynı bağlanma ve taşıma sonucunu çıkarma.",
      check: "Başlangıçta A iki, B bir bağımsız şeker molekülüdür.",
      strategy:
        "Taşıyıcının kabul ettiği serbest biçimi, aynı birimleri bağlı taşıyan molekülden ayır.",
    },
    {
      prompt:
        "Toplam 17 şeker birimi başlangıçta dört ayrı, açık ve halkasız bağlı parçadadır. Farklı parçalar arasında iki yeni glikozit bağı kuruluyor; ardından üç bağ hidrolizle koparılıyor. TYT net sayımında her yeni bağ bir su çıkarır, her kopan bağ bir su kullanır. İki aşamanın su miktarları sırasıyla nedir?",
      options: [
        "2 su çıkar; 3 su kullanılır.",
        "13 su çıkar; 3 su kullanılır.",
        "2 su çıkar; 2 su kullanılır.",
        "15 su çıkar; 15 su kullanılır.",
        "3 su çıkar; 2 su kullanılır.",
      ],
      reasons: [
        "Yalnız iki yeni bağ kurulduğu için sentez suyu 2; üç hidroliz kesimi için kullanılan su 3’tür.",
        "13, başlangıçtaki 17−4 bağı sayar; onların bu aşamada yeniden kurulduğu verilmemiştir.",
        "Üç kesim açıkça verilmiştir; hidrolizde kullanılan suyu yeni bağ sayısına eşitleyemezsin.",
        "15, ilk birleştirme sonrası toplam bağdır; yeni kurulan ve sonra kopan bağ adetleri değildir.",
        "Kurulma ve kopma aşamalarının sırası ters çevrilmiştir.",
      ],
      steps: [
        "Başlangıçta mevcut bağların 17−4=13 olduğunu not et; yeni senteze ekleme.",
        "İki yeni bağı iki su çıkışıyla eşleştir.",
        "Üç hidroliz kesimini üç su kullanımıyla ayrı kaydet.",
      ],
      knowledge:
        "Mevcut bağ, yeni bağ ve kopan bağ için ayrı muhasebe tutulur.",
      error: "Başlangıçtaki bütün bağları yeni sentezlenmiş sanma.",
      check: "Net su değişimi 2−3=−1 olabilir; brüt iki kayıt yine 2 ve 3’tür.",
      strategy:
        "Mevcut bağlara yeni su yazmadan kurma ve kesme aşamalarını iki ayrı kayıtla çöz.",
    },
    {
      prompt:
        "A–B–C–D–E–F–G tek, açık bir şeker zinciridir; her harf bir monosakkarit birimidir. Yalnız B–C ve E–F bağları hidroliz ediliyor. Son bağımsız parça sayısı ve serbest monosakkarit sayısı sırasıyla nedir?",
      options: [
        "3 parça; 0 serbest monosakkarit",
        "2 parça; 2 serbest monosakkarit",
        "3 parça; 2 serbest monosakkarit",
        "5 parça; 4 serbest monosakkarit",
        "7 parça; 7 serbest monosakkarit",
      ],
      reasons: [
        "Parçalar AB, CDE ve FG’dir; üçü de birden fazla birimli olduğundan serbest monosakkarit yoktur.",
        "İki kesim tek başlangıç parçasını üçe ayırır; kesimler uçtaki tek birimi ayırmamıştır.",
        "Parça sayısı 3 doğru, fakat AB/CDE/FG içinde uzunluğu bir olan parça yoktur.",
        "Yalnız iki bağ koptuğu için başlangıçtaki bir parça en çok üç parçaya ayrılır.",
        "Tam hidroliz için altı bağın tümü kopmalıydı; burada yalnız ikisi kopmuştur.",
      ],
      steps: [
        "İlk kesimden sonra AB ile CDEFG parçalarını yaz.",
        "İkinci kesim kalan uzun parçayı CDE ile FG olarak ayırır.",
        "Parça uzunlukları 2,3,2’dir; yalnız uzunluğu 1 olanlar serbest monosakkarit sayılır.",
      ],
      knowledge:
        "Kesim sayısı parça artışını, kesim yerleri serbest birim sayısını belirler.",
      error:
        "Her kesimin mutlaka bir serbest monosakkarit oluşturduğunu sanma.",
      check: "2+3+2=7 birim korunur; 6−2=4 bağ kalır.",
      strategy:
        "Kesilen iki sınırı zincirde işaretleyip önce parçaları, sonra tek birimli olanları say.",
    },
    {
      prompt:
        "Yalnız maltoz, sakkaroz ve laktoz içeren bir karışım tamamen hidroliz edildiğinde 9 glikoz, 3 fruktoz ve 2 galaktoz elde ediliyor. Maltoz G+G, sakkaroz G+F, laktoz G+Gal birimlidir. Başlangıç maltoz sayısı kaçtır?",
      options: ["2", "3", "4", "5", "7"],
      reasons: [
        "3 fruktoz üç sakkarozu, 2 galaktoz iki laktozu verir; bunların glikozu 5’tir. Kalan 4 glikoz iki maltozdan gelir.",
        "3, fruktozdan bulunan sakkaroz sayısıdır; maltozun iki glikoz katkısını kullanmaz.",
        "4, maltoza ait glikoz adedidir; her maltoz iki glikoz verdiğinden ikiye bölünmelidir.",
        "5, sakkaroz ve laktoz sayılarının toplamıdır; maltoz değildir.",
        "7, bütün başlangıç disakkaritlerinin toplamıdır; yalnız maltoz istenmiştir.",
      ],
      steps: [
        "Fruktozu yalnız sakkaroz, galaktozu yalnız laktoz verdiği için bunları 3 ve 2 bul.",
        "Bu beş disakkarit toplam 5 glikoz da verir; 9−5=4 glikoz kalır.",
        "Maltoz başına iki glikozdan 4/2=2 maltoz hesapla.",
      ],
      knowledge:
        "Ürün bileşimi, farklı disakkaritlerin katkıları ayrı yazılarak tersine çözülebilir.",
      error: "Toplam glikozun tamamını maltozdan gelmiş sayma.",
      check:
        "2 maltoz+3 sakkaroz+2 laktoz toplam 14 monosakkarit verir; 9+3+2=14.",
      strategy:
        "Ayırt edici fruktoz ve galaktoz katkılarını çıkarıp kalan glikozdan maltoza geri git.",
    },
    {
      prompt:
        "Halka içermeyen bir şeker bağlantı şemasında 9 birim ve 6 glikozit bağı vardır. Ayrı iki parça arasında bir bağ daha kuruluyor; birim eklenmiyor veya çıkarılmıyor. Bağ ve bağımsız parça sayısındaki değişim hangisidir?",
      options: [
        "Bağ +1; parça −1",
        "Bağ +1; parça +1",
        "Bağ −1; parça +1",
        "Bağ 0; parça −1",
        "Bağ +2; parça −2",
      ],
      reasons: [
        "Farklı iki parçayı bir köprü bağı birleştirir; bağ 6→7, parça 3→2 olur.",
        "Birleştirme parça sayısını artırmaz; yeni tek bağ iki parçayı tek parça yapar.",
        "Bu, hidroliz kesiminin yönüdür; soruda bağ kurulmaktadır.",
        "Parçaları birleştiren bağ hesaba katılmadan bağ sayısı korunamaz.",
        "Tek yeni bağ verildiği için iki bağlık değişim yoktur.",
      ],
      steps: [
        "Başta parça sayısını N−B=9−6=3 bul.",
        "Farklı parçalar arasındaki yeni bağ B’yi 7 yapar.",
        "Halkasızlık korunur; yeni parça sayısı 9−7=2 olur.",
      ],
      knowledge:
        "Halkasız bir bağlantı modelinde farklı parçaları birleştiren tek bağ parçayı bir azaltır.",
      error: "Birimin korunmasını bağların da korunması sanma.",
      check: "B+k=9 eşitliği hem 6+3 hem 7+2 için sağlanır.",
      strategy:
        "Birim sayısı korunurken köprü bağının parça sayısına etkisini bağlantı bağıntısıyla izle.",
    },
    {
      prompt:
        "Glikoz ve fruktoz için C₆H₁₂O₆ formülü verilmiştir. Saf örnekler eşit koşulda K enzimiyle deneniyor; K yalnız glikozla ürün oluşturuyor. Her iki örneğin de bozunmadan bulunduğu ölçülüyor. Bu veri hangi sonucu destekler?",
      options: [
        "Aynı kapalı formül, K ile aynı etkileşimi zorunlu kılmaz.",
        "İki şekerin karbon sayısı farklıdır.",
        "Fruktoz örneğinde hiç organik molekül yoktur.",
        "K glikozu fruktoza ait atomlar ekleyerek oluşturmuştur.",
        "Aynı formüllü bütün moleküller aynı substrattır.",
      ],
      reasons: [
        "Atom sayıları aynı verilmesine rağmen K ile ürün oluşumu farklıdır; yapı ve enzim etkileşimi için kapalı formül tek başına yeterli değildir.",
        "İki formülde de altı karbon vardır; deney bu sayıyı değiştirmemiştir.",
        "Saf fruktozun bulunduğu ayrıca ölçülmüştür; ürün yokluğu madde yokluğu değildir.",
        "Başlangıçta saf glikoz vardır; K’nin fruktoz atomlarından glikoz kurduğu bilgisi verilmemiştir.",
        "K deneyinin iki farklı sonucu bu genellemeye karşı örnektir.",
      ],
      steps: [
        "İki formülün atom adetlerinin aynı olduğunu doğrula.",
        "Ürün oluşan ve oluşmayan örneklerde şekerin varlığının kontrol edildiğini kullan.",
        "Farklı K yanıtından, formül eşitliğinin etkileşim eşitliğini zorunlu kılmadığını çıkar.",
      ],
      knowledge:
        "Kapalı formül atomları sayar; bütün bağ düzenini ve enzim seçiciliğini tekilleştirmez.",
      error:
        "Ürün oluşmamasını substratın örnekte bulunmamasıyla özdeşleştirme.",
      check:
        "Karbon sayısı iki örnekte de 6; ölçülen fark K ile ürün yanıtıdır.",
      strategy:
        "Formül eşitliğiyle deneydeki enzim yanıtını ayrı kanıtlar olarak karşılaştır.",
    },
    {
      prompt:
        "Ribozun C₅H₁₀O₅, deoksiribozun C₅H₁₀O₄ formülü veriliyor. Hangisi bu formüllerle ve pentoz tanımıyla uyumludur?",
      options: [
        "İkisi de beş karbonludur; deoksiriboz bir oksijen daha az taşır.",
        "Deoksiriboz dört karbonludur.",
        "Riboz beş ayrı monosakkaritten oluşmak zorundadır.",
        "İkisinin de oksijen sayısı aynıdır.",
        "Deoksiribozun hidrojen sayısı bir eksiktir.",
      ],
      reasons: [
        "C sayısı iki formülde de 5, O sayısı 5 ve 4’tür; pentoz beş karbonlu şekeri adlandırır.",
        "Dört olan oksijen sayısıdır; karbon sayısı 5’tir.",
        "Beş karbon, beş bağımsız şeker birimi demek değildir; riboz tek pentoz birimidir.",
        "O₅ ile O₄ eşit değildir.",
        "İki formülde de H₁₀ vardır; verilen fark oksijendedir.",
      ],
      steps: [
        "Formüllerde C alt indislerini okuyarak iki pentozu belirle.",
        "O alt indislerini 5 ve 4 olarak karşılaştır.",
        "H alt indislerinin ikisinde de 10 olduğunu kontrol et.",
      ],
      knowledge:
        "Karbon sayısı, moleküldeki şeker birimi sayısı ve oksijen farkı farklı niceliklerdir.",
      error: "Formüldeki oksijen sayısını karbon sayısı yerine kullanma.",
      check: "Ribozdan deoksiriboza verilen atom farkı yalnız bir O’dur.",
      strategy:
        "Pentoz adını karbon sayısıyla, deoksi farkını oksijen alt indisiyle denetle.",
    },
    {
      prompt:
        "Saf kitin örneğinin birimlerinin azot içeren değiştirilmiş şeker olan N-asetilglukozamin olduğu verilmiştir. Örnekte azot ölçülüyor. “Azot var; örnek kesin proteindir.” yargısı nasıl değerlendirilir?",
      options: [
        "Geçersizdir; verilen kitin birimi azotun protein dışında da bulunabildiğini gösterir.",
        "Doğrudur; azot içeren bütün organik yapılar proteindir.",
        "Kitin azot ölçülünce trigliserite dönüşmüştür.",
        "Protein kanıtı için yalnız daha çok azot ölçmek yeterlidir.",
        "Azotlu şeker birimi tanım gereği amino asittir.",
      ],
      reasons: [
        "Kitinin azotlu şeker birimi, azotun tek başına protein tanısı koymadığı açık karşı örnektir.",
        "Kartta protein olmayan azotlu bir şeker yapısı verilerek bu genelleme çürütülmüştür.",
        "Azot ölçümü kimyasal dönüşüm verisi değildir; trigliserit oluştuğu söylenemez.",
        "Azot miktarını artırmak onun hangi yapıda bulunduğunu tek başına belirlemez.",
        "Değiştirilmiş şeker ile amino asit farklı yapı birimleridir; ortak azot ikisini eşitlemez.",
      ],
      steps: [
        "Verilen kitin biriminin azot taşıyan şeker türevi olduğunu oku.",
        "Yargının bütün azotlu yapıları protein saydığını belirle.",
        "Bu örneği kullanarak tek azot gözleminden protein sonucunun çıkmadığını göster.",
      ],
      knowledge:
        "Bir elementin bulunması tek başına bütün biyomolekül sınıfını belirlemez.",
      error: "Azotun yalnız proteinlerde bulunabileceğini varsayma.",
      check:
        "Kitinin verilen birimi şeker türevidir; azot varlığı bu veriyi değiştirmez.",
      strategy:
        "Verilen azotlu şeker birimini, azottan kesin protein çıkarımına karşı örnek kullan.",
    },
    {
      prompt:
        "A ve B saf polisakkaritlerinin glikoz birimli olduğu biliniyor. Doğrulanmış uygun deney koşullarında E enzimi A’yı parçalayabiliyor; B’yi parçalamıyor. Hangi genelleme bu veriyle çürür?",
      options: [
        "Glikoz birimli her polisakkarit E ile aynı biçimde parçalanır.",
        "A ve B’nin yapı birimi ortak olabilir.",
        "Enzimlerin etki ettiği bağ düzeni önem taşıyabilir.",
        "A’nın parçalanması deneyde gözlenmiştir.",
        "B’de aynı enzimle ürün görülmemesi ayrı bir sonuçtur.",
      ],
      reasons: [
        "A ve B aynı birimli olmasına rağmen E yanıtları farklıdır; “her biri aynı” genellemesi karşı örnekle bozulur.",
        "Ortak glikoz birimi kartta açıkça verilmiştir; bu bilgi çürütülmez.",
        "Bağ düzeninin önem taşıyabileceği yorumu farklı yanıtla uyumludur.",
        "E’nin A’yı parçaladığı doğrudan gözlemdir.",
        "E’nin B’yi parçalamadığı da verilen ayrı sonuçtur; genelleme değil gözlem kaydıdır.",
      ],
      steps: [
        "Ortak olan bilginin glikoz birimi olduğunu yaz.",
        "A ve B’nin E ile farklı sonuç verdiğini birlikte kullan.",
        "“Her glikoz polimeri aynı yanıtı verir” ifadesinin bu çiftte bozulduğunu göster.",
      ],
      knowledge:
        "Bir karşı örnek koşulsuz “her” yargısını çürütür; ortak birim bütün bağ yapısını eşitlemez.",
      error: "Olumsuz kökte gözlemle uyumlu bir yargıyı yanlış diye seçme.",
      check: "Seçilen genelleme A için çalışırken B için çalışmaz.",
      strategy:
        "İki farklı enzim yanıtını aynı birimden zorunlu aynı davranış çıkaran genellemeyle karşılaştır.",
    },
    {
      prompt:
        "Bir hücre kültürünün dış ortamında glikoz miktarı aynı birimde 60’tan 20’ye iniyor. Hücre içindeki depo polisakkaritine veya başka ürüne ilişkin ölçüm yapılmıyor. Hangi sonuç gerekçelidir?",
      options: [
        "Dış glikozda 40 birim azalma ölçülmüştür; bunun tamamının belirli depoya dönüştüğü ayrıca kanıtlanmalıdır.",
        "Kesin 40 birim yeni glikojen sentezlenmiştir.",
        "Dışarıda azalan her glikoz değişmeden DNA’ya katılmıştır.",
        "Hücrede kesin nişasta deposu oluşmuştur.",
        "Glikozun azalışı hiçbir başka metabolik yolla ilişkili olamaz.",
      ],
      reasons: [
        "60−20=40 ölçülen dış ortam farkıdır; hangi hücre içi ürüne gittiği için ayrı veri gerekir.",
        "Depo polisakkariti ölçülmediği için bütün farkı glikojene atamak ek varsayımdır.",
        "DNA’ya katılma ve bütün miktarın oraya gitmesi verilmemiştir; ayrıca glikoz ile DNA şekeri aynı ad değildir.",
        "Nişasta sentezi ve kültürün canlı türü belirlenmemiştir.",
        "Veri tek bir kullanım yolunu kesinleştirmediği için diğer yollar dışlanamaz.",
      ],
      steps: [
        "Aynı birimdeki dış ortam farkını 60−20=40 hesapla.",
        "Ölçümün hücre içi ürün dağılımını kapsamadığını belirle.",
        "Gözlenen azalmayı, ölçülmeyen belirli bir sentez hedefinden ayır.",
      ],
      knowledge:
        "Bir kaynaktaki miktar azalması, belirli son üründe aynı artışı tek başına kanıtlamaz.",
      error: "Ölçülmemiş depoyu gözlenmiş sonuç gibi yazma.",
      check: "Kesin sayı dış glikozdaki 40 birim farktır; ürün adı değildir.",
      strategy:
        "Ölçülen dış ortam farkını hesaplayıp ürün adı için gereken ek ölçümü ayır.",
    },
    {
      prompt:
        "Bir tohum karanlıkta çimlenirken depo nişastası azalıyor, serbest şekerler artıyor. Bu aralıkta fotosentez gerçekleşmediği ayrıca verilmiştir. En uygun yorum hangisidir?",
      options: [
        "Önceden depolanmış nişasta parçalanması, fotosentez olmadan da şeker sağlayabilir.",
        "Nişasta yalnız ışıkta var olabilir.",
        "Serbest şeker artışı mutlaka yeni fotosentez kanıtıdır.",
        "Tohumdaki bütün glikozun karbonları yoktan oluşmuştur.",
        "Bitki depo karbohidratı içeremez.",
      ],
      reasons: [
        "Tohum önceki depoyu kullanabilir; nişasta azalması ve şeker artışı bu yönle uyumludur.",
        "Nişastanın varlığı ile o andaki fotosentez koşulu aynı bilgi değildir.",
        "Kart fotosentezin olmadığını açıkça verir; depo parçalanması ayrı kaynaktır.",
        "Depolanmış birimlerin serbestleşmesi yeni karbonun yoktan oluşması değildir.",
        "Nişasta bitkilerde depo örneğidir; verilen gözlem de bu depoyu içerir.",
      ],
      steps: [
        "Fotosentezin bu zaman aralığında gerçekleşmediğini koşul olarak al.",
        "Nişasta azalması ile serbest şeker artışını aynı depodan yararlanma yönünde ilişkilendir.",
        "Önceden depolama ile o anda yeni üretimi ayır.",
      ],
      knowledge:
        "Bir depo, daha önce üretilen birimleri sonraki koşullarda kullanılabilir kılar.",
      error: "Karanlıkta şeker görülmesini zorunlu fotosentez sayma.",
      check: "Karbon kaynağı olarak başlangıç nişastası kartta zaten vardır.",
      strategy:
        "O andaki fotosentez koşuluyla önceden birikmiş depodan kullanımın zamanlarını ayır.",
    },
    {
      prompt:
        "Başlangıçta 9 ve 13 birimli iki ayrı açık şeker zinciri vardır. Aralarına tek bağ kurulup tek parça yapılıyor; daha sonra dört bağ hidroliz ediliyor. Bağımsız parça ve kalan glikozit bağı sayıları nedir?",
      options: [
        "5 parça; 17 bağ",
        "4 parça; 18 bağ",
        "5 parça; 21 bağ",
        "2 parça; 20 bağ",
        "22 parça; 0 bağ",
      ],
      reasons: [
        "Başlangıç bağları 8+12=20, ek bağla 21; dört kesim sonrası 17 bağ ve 1+4=5 parça kalır.",
        "Dört kesimden önce tek parça vardır; kesim sayısına başlangıç parçasını da eklemelisin.",
        "21 birleştirme sonrası kesilmeden önceki bağ sayısıdır; dört kesimi uygulamaz.",
        "Başlangıç iki parçayı ve bağları koruyarak verilen iki aşamayı dışlar.",
        "Yirmi iki serbest birim için toplam 21 bağın hepsi kopmalıydı.",
      ],
      steps: [
        "İki başlangıç zincirinde (9−1)+(13−1)=20 bağ say.",
        "Aradaki yeni bağ toplamı 21 ve parça sayısını 1 yapar.",
        "Dört kesim bağları 17’ye, parçaları 5’e getirir.",
      ],
      knowledge:
        "Başlangıç parçaları, birleştirme ve sonraki kesimler sırayla uygulanır.",
      error: "Kesimden önceki parça sayısını sıfır kabul etme.",
      check: "Toplam 22 birim için son 17 bağ+5 parça=22 bağıntısı korunur.",
      strategy:
        "İki zinciri birleştirme ve sonraki kesimi sırayla uygulayıp son bağı parçalarla kontrol et.",
    },
    {
      prompt:
        "X ve Y’nin her biri 8 şeker birimli, birbirine bağlı ve halka içermeyen tek parça yapılardır. X düz zincir, Y dallanmış çizilmiştir. Başka bağ verilmemiştir. Hangi sonuç kesindir?",
      options: [
        "İkisinde de 7 glikozit bağı vardır.",
        "Y dallandığı için kesin 8 bağ taşır.",
        "X’te hiç bağ yoktur.",
        "Dallanmış yapının bütün birimleri serbesttir.",
        "Y’de zorunlu kapalı bağlantı halkası vardır.",
      ],
      reasons: [
        "Bağlantılı ve halkasız tek parçada N−1=7; dallanma bu koşulları değiştirmemiştir.",
        "Dallanma, halka kapanması veya ek bağımsız bağ demek değildir.",
        "Tek bağlı sekiz birimlik X için yedi bağlantı gerekir.",
        "Bağlı olduğu verilen yapının bütün birimleri serbest sayılamaz.",
        "Kart halka içermediğini açıkça söyler; dal bir halka kanıtı değildir.",
      ],
      steps: [
        "İki yapıda da birim sayısının 8 olduğunu belirle.",
        "Bağlantılı tek parça olma ve halkasızlık koşullarını birlikte kullan.",
        "Her ikisine N−1=7 bağ hesabını uygula; çizim yönünü yeni bağ sayma.",
      ],
      knowledge: "Halkasız bağlantı sayımı düz çizilmiş olmayı gerektirmez.",
      error: "Dallanmayı otomatik bir ek halka bağı gibi yorumlama.",
      check: "Her iki şemada bağ+parça sayısı 7+1=8’dir.",
      strategy:
        "Dallanmayı ek halka bağı saymadan bağlantılı tek parça koşulunu uygula.",
    },
    {
      prompt:
        "Bir tabloda R: RNA nükleotitindeki riboz, S: bitki hücre duvarındaki selüloz, T: mantardaki glikojen olarak veriliyor. Bu üç örneğin karbohidrat rollerini sırasıyla hangisi doğru ayırır?",
      options: [
        "Nükleotit bileşeni; yapısal bileşen; depo",
        "Üçü de yalnız enerji yakıtı",
        "Depo; nükleotit bileşeni; yapı",
        "Protein monomeri; steroid; mineral",
        "Yapı; depo; yalnız DNA şekeri",
      ],
      reasons: [
        "R ribozlu nükleotit parçası, S duvarın yapısı, T mantar deposudur; üç farklı rol verilmiştir.",
        "Tabloda nükleotit ve duvar rolleri açıkça bulunduğu için “yalnız yakıt” daraltması yanlıştır.",
        "R ve S’nin rolleri ters atanmıştır; mantardaki T depo olarak verilmiştir.",
        "Üç örnek bu farklı sınıflara değil karbohidratla ilişkili yapılara aittir.",
        "R’nin duvar ve T’nin DNA şekeri olması tabloda yoktur.",
      ],
      steps: [
        "Her örnekte molekül adıyla verilen bulunduğu yeri eşleştir.",
        "RNA nükleotidini, hücre duvarını ve depo glikojenini ayrı görev düzeylerine yerleştir.",
        "Ortak karbohidrat adının tek bir görev gerektirmediğini belirt.",
      ],
      knowledge:
        "Karbohidratlar enerji dışında yapı ve nükleotit bileşeni rollerine de katılır.",
      error: "Ortak sınıf adını tek bir işlev zorunluluğu sayma.",
      check: "Doğru sıra karttaki R/S/T sırasını korumalıdır.",
      strategy:
        "Molekülün bulunduğu yapıyı işlev kanıtı olarak kullanıp üç farklı rolü eşleştir.",
    },
    {
      prompt:
        "E enzimi uygun koşulda nişastayı daha küçük şekerlere ayırır. Bilinen nişastalı kontrol, taze E ile ürün verirken önceden etkisizleştirilmiş E ile ürün vermiyor. İçeriği bilinmeyen örnek yalnız bu etkisiz E ile deneniyor ve ürün görülmüyor. Hangi yorum doğrudur?",
      options: [
        "Bu negatif deney tek başına örnekte nişasta bulunmadığını kanıtlamaz.",
        "Örnekte kesin hiç karbohidrat yoktur.",
        "E etkisizken de bütün nişastaları zorunlu parçalar.",
        "Kontrolde nişasta olmadığı kanıtlanmıştır.",
        "Ürün yokluğu bütün örneklerde aynı tek nedene sahiptir.",
      ],
      reasons: [
        "Kontrol etkisiz E’nin nişasta varken de negatif sonuç verebildiğini gösterir; bilinmeyen örnek için yokluk sonucu zorunlu değildir.",
        "Yöntemin etkisiz olduğu koşulda tek ürün yokluğu bütün karbohidrat sınıfını dışlamaz.",
        "Bilinen nişastalı etkisiz E kontrolü bu iddiayı doğrudan çürütür.",
        "Bilinen kontrolün nişasta içerdiği ve taze E ile ürün verdiği belirtilmiştir.",
        "Negatif sonucun enzim etkinliği gibi farklı nedenleri olabilir; kart bunlardan birini kontrolle gösterir.",
      ],
      steps: [
        "Bilinen nişastanın etkisiz E ile de ürün vermediğini kullan.",
        "Bilinmeyen örneğin aynı etkisiz enzim koşulunda test edildiğini belirle.",
        "Yöntemin çalışmadığı bir negatif sonucu nişasta yokluğuyla eşitleme.",
      ],
      knowledge:
        "Negatif deneyin yokluk kanıtı olabilmesi için yöntemin o koşulda çalıştığı denetlenmelidir.",
      error: "Kontrolün enzim etkinliği uyarısını görmezden gelme.",
      check:
        "Nişasta var+etkisiz E de negatif verdiği için negatif sonuç tek nedeni belirlemez.",
      strategy:
        "Bilinen hedefte çalışmayan enzim kontrolünü kullanarak negatif testin sınırını kur.",
    },
    {
      prompt:
        "Bir otçulun sindirim sistemi örneğinde selüloz parçalanması yalnız canlı mikroorganizmalar korununca görülüyor. Mikroorganizmalar uzaklaştırılınca duruyor; aynı mikroorganizmalar geri eklenince yeniden başlıyor. Diğer koşullar aynı ve selüloz her grupta var. Hangi sonuç desteklenir?",
      options: [
        "Bu deneyde mikroorganizmalar selülozun kullanılmasına katkı vermektedir.",
        "Hayvanın kendi enzimi her koşulda selülozu tek başına parçalar.",
        "Selüloz hayvanın DNA’sına dönüşmüştür.",
        "Mikroorganizma eklemek selülozun glikoz birimini amino aside çevirir.",
        "Hiçbir canlı selülozu parçalayamaz.",
      ],
      reasons: [
        "Uzaklaştırma ve geri eklemeyle aynı koşulda kaybolup dönen yanıt mikroorganizma katkısını destekler.",
        "Mikroorganizmalar yokken yanıtın durması kendi başına yeterlilik iddiasını desteklemez.",
        "DNA oluşumu ölçülmemiştir; verilen yanıt sindirimle ilgilidir.",
        "Geri ekleme, yapı biriminin amino aside değiştiği verisini vermez.",
        "Korunmuş ve geri eklenmiş gruplarda parçalanma görülmesi bu mutlak yargıyı çürütür.",
      ],
      steps: [
        "Başlangıç substratının ve diğer koşulların eşit olduğunu not et.",
        "Mikroorganizmaların uzaklaştırılmasıyla yanıtın durmasını, geri eklemeyle dönmesini birlikte oku.",
        "Sonucu bu deneydeki katkıyla sınırla; bütün canlıların kendi enzimlerine genelleme.",
      ],
      knowledge:
        "Selüloz kullanımında bazı canlıların mikroorganizmalarla ilişkisi önemlidir.",
      error: "İnsan için verilen kendi enzim sınırını bütün canlılara taşıma.",
      check:
        "Aynı selülozla katkı varken/ yokken/geri geldiğinde üç koşul karşılaştırılmıştır.",
      strategy:
        "Uzaklaştırma ile geri ekleme sonuçlarını birlikte okuyup mikroorganizma katkısını sına.",
    },
    {
      prompt:
        "Bir kapta 6 birimli bir açık zincir, 4 birimli başka bir açık zincir ve bir serbest monosakkarit var. Bütün glikozit bağları tamamen hidroliz ediliyor. Bağımsız şeker molekülü sayısındaki artış kaçtır?",
      options: ["8", "11", "10", "3", "2"],
      reasons: [
        "Başta 3 molekül, sonda 6+4+1=11 serbest molekül vardır; artış 8’dir.",
        "11 son toplamdır; sorulan başlangıca göre artıştır.",
        "10 yalnız zincirlerdeki birimleri sayar; serbest başlangıç birimi ve fark hesabı ayrılmamıştır.",
        "3 başlangıç molekül sayısıdır; artış değildir.",
        "2 başlangıç polimer sayısıdır; kopan bağ sayısını vermez.",
      ],
      steps: [
        "Başlangıçta iki zincir ve bir serbest birimden 3 bağımsız molekül say.",
        "Tam hidroliz sonrası bütün 11 birim serbest olur.",
        "Son toplamdan başlangıcı çıkar:11−3=8.",
      ],
      knowledge:
        "Tam hidrolizde toplam birim korunur, bağımsız molekül sayısı bağların ayrılmasıyla artar.",
      error: "Son toplamı değişim miktarı sanma.",
      check: "Kopan bağlar(6−1)+(4−1)=8 olup molekül artışıyla eşleşir.",
      strategy:
        "Başlangıç molekül toplamıyla tam hidroliz sonu toplamı ayrı sayıp değişimi çıkar.",
    },
    {
      prompt:
        "Altı şeker birimi A,B,C,D,E,F arasındaki glikozit bağları AB, BC, CD, DE, EF ve FA olarak verilmiştir. Başka bağ yoktur. Bu yapı için neden açık zincirin n−1 kuralı doğrudan kullanılamaz?",
      options: [
        "FA bağlantısı kapalı bir halka oluşturur; yapı açık ve halkasız değildir.",
        "Altı birim olunca bağ sayısı daima sıfırdır.",
        "Her harf bir proton olduğu için bağ sayımı yapılamaz.",
        "Her bağlantı mutlaka iki farklı molekül arasındadır.",
        "Dallanma her durumda aynı halka demektir.",
      ],
      reasons: [
        "A’dan başlayıp B,C,D,E,F üzerinden yeniden A’ya dönülür; altıncı bağ kapanma bağıdır.",
        "Bağlar açıkça altı bağlantı olarak verilmiştir; sıfır olamaz.",
        "Harflerin şeker birimi olduğu belirtilmiştir; proton yorumu ek varsayımdır.",
        "FA bağından önce A ve F zaten diğer yol üzerinden aynı bağlı yapıdadır.",
        "Sorudaki sorun dallanma değil verilen kapalı yolun varlığıdır.",
      ],
      steps: [
        "Bağ listesini A→B→C→D→E→F→A sırasıyla izle.",
        "Başlangıç birimine kapanan bir yol bulunduğunu belirle.",
        "N−1’in halkasız yapı koşulu sağlanmadığı için altıncı bağı dışlama.",
      ],
      knowledge:
        "Bağ sayımı kuralı, bağlantının açık ve halkasız olma koşuluyla kullanılır.",
      error:
        "Bir monosakkaritin atom halkasıyla birimler arasında verilen bağlantı halkasını karıştırma.",
      check:
        "Verilen altı bağlantı tek kapalı yol oluşturur; n−1=5 başka varsayımın sonucudur.",
      strategy:
        "Bağ listesindeki kapalı yolu izleyip n−1 kuralının hangi koşulunu bozduğunu seç.",
    },
    {
      prompt:
        "4 ve 6 birimli iki açık şeker zincirinden toplam dört glikozit bağı hidroliz ediliyor. Kesim yerleri verilmemiştir; bütün birimler korunur ve halka yoktur. Hangi sonuç kesindir?",
      options: [
        "Son parça sayısı 6’dır; serbest monosakkarit sayısı için kesim yerleri gerekir.",
        "Kesin 4 serbest monosakkarit oluşur.",
        "Sonra hâlâ yalnız 2 parça vardır.",
        "On birimden kesin 10 parça oluşur.",
        "Kalan glikozit bağı sayısı bilinemez.",
      ],
      reasons: [
        "Her kesim parçayı bir artırır:2+4=6. Ancak parçaların tek birimli olup olmadığı kesim yerlerine bağlıdır.",
        "Dört kesim dört serbest birim zorunluluğu vermez; iç kesimler daha büyük parçalar bırakabilir.",
        "Dört hidroliz kesimi bağımsız parça sayısını artırır.",
        "Tam serbestleşme için başlangıçtaki 8 bağın tamamı kopmalıydı; yalnız 4’ü kopmuştur.",
        "Başlangıç bağları 3+5=8, kalan 8−4=4 olduğundan bu sayı belirlenebilir.",
      ],
      steps: [
        "İki başlangıç parçasının her kesimde bir arttığını kullan:2+4.",
        "Başlangıç bağı(4−1)+(6−1)=8 ve kalan 4 olarak denetle.",
        "Serbest birim için kesim yerleri verilmediğinden tek değer üretme.",
      ],
      knowledge:
        "Toplam kesim parça sayısını belirler; parça uzunluklarının ayrıntısını her zaman belirlemez.",
      error:
        "Kesim yerleri bilinmeden her kopuşu bir serbest monosakkarit sayma.",
      check: "10 birim=6 parça+4 bağ bağıntısı korunur.",
      strategy:
        "Kesim toplamından kesin parça sayısını bul; kesim yeri gerektiren serbest birim sayısını ayır.",
    },
    {
      prompt:
        "C₆H₁₂O₆ formüllü üç serbest şeker birimi, tek açık zincirde iki glikozit bağı kuruyor. Bu net modelde her yeni bağ için bir H₂O ayrılır. Oluşan şeker yapısının formülü nedir?",
      options: ["C₁₈H₃₂O₁₆", "C₁₈H₃₆O₁₈", "C₁₈H₃₄O₁₇", "C₁₈H₃₀O₁₅", "C₆H₁₂O₆"],
      reasons: [
        "Başlangıç 3×formül=C18H36O18; iki sudakiH 4O2 çıkarılınca C18H32O16 kalır.",
        "Bu, üç serbest birimin toplamıdır; iki su ayrılışı uygulanmamıştır.",
        "Yalnız bir su çıkarılmıştır; üç birimi tek zincir yapan iki bağ vardır.",
        "Üç su çıkarılmıştır; açık üç birimli yapıda iki yeni bağ kurulmuştur.",
        "Bu tek başlangıç biriminin formülüdür; üç birim ve su hesabı yoktur.",
      ],
      steps: [
        "Üç serbest birimin atomlarını C18H36O18 olarak topla.",
        "İki yeni bağdan ayrılan toplam suyu 2H₂O=H4O2 yaz.",
        "Karbonu koruyup H ve O’yu çıkar: C18H32O16.",
      ],
      knowledge:
        "Net dehidrasyon sayımında ayrılan suyun atomları ürün formülünden çıkarılır.",
      error:
        "Birim sayısı kadar su çıkacağını varsayma; açık yapıda yeni bağ sayısını kullan.",
      check:
        "Ürüne iki su eklenince başlangıç C18H36O18 atom toplamı geri gelir.",
      strategy:
        "Önce bütün atom katkısını topla, ardından yeni bağların ayırdığı su atomlarını çıkar.",
    },
  ],
  lipitler: [
    {
      prompt:
        "İki serbest gliserol ve yedi serbest yağ asidinden yalnız tam trigliseritler kurulacaktır. Bir trigliserit bir gliserol ve üç yağ asidi gerektirir. Başka kaynak yok; bileşenler üst sınıra kadar kullanılıyor. En çok ürün ve artan yağ asidi sayısı nedir?",
      options: [
        "2 trigliserit; 1 yağ asidi",
        "2 trigliserit; 5 yağ asidi",
        "3 trigliserit; 0 yağ asidi",
        "7 trigliserit; 0 yağ asidi",
        "1 trigliserit; 4 yağ asidi",
      ],
      reasons: [
        "Gliserol en çok 2, yağ asitleri en çok 2 tam ürün sağlar;2 ürün 6 yağ asidi kullanıp 1 bırakır.",
        "2 ürün için 6 yağ asidi kullanılır;7−6=1 kalır,5 değil.",
        "3 ürün 3 gliserol ve 9 yağ asidi gerektirir; iki kaynak da yetmez.",
        "Her yağ asidi bir trigliserit değildir; üçlü oran ve gliserol koşulu bozulur.",
        "Bir ürün yapılabilir fakat en çok değildir; ikinci ürün için de bileşen vardır.",
      ],
      steps: [
        "Gliserolün ürün sınırını 2 olarak belirle.",
        "Yağ asidi sınırını 7/3 içindeki 2 tam ürün olarak bul.",
        "2 ürünün kullandığı 6 yağ asidini 7’den çıkar.",
      ],
      knowledge:
        "Tam ürün üst sınırı bütün gerekli bileşenlerin oranlarını birlikte sağlamalıdır.",
      error: "Kesirli trigliserit sayısını tam bir ürün gibi yuvarlama.",
      check: "2 gliserol ve 6 yağ asidi yapıya katılır;1 yağ asidi artar.",
      strategy:
        "İki zorunlu bileşenin ayrı tam ürün kapasitelerini karşılaştırıp kullanılan yağ asidini düş.",
    },
    {
      prompt:
        "A,B,C adlı üç trigliseritte başlangıçta üçer ester bağı vardır ve serbest bileşen yoktur. Hidrolizle A’nın üç bağı, B’nin bir bağı koparılıyor; C’nin bağı kopmuyor. Her bağ kesimi bir yağ asidi ayırır; gliserol ancak kendi üç bağı da kopunca serbesttir. Son serbest gliserol ve yağ asidi sayıları nedir?",
      options: [
        "1 gliserol; 4 yağ asidi",
        "4 gliserol; 4 yağ asidi",
        "2 gliserol; 4 yağ asidi",
        "1 gliserol; 9 yağ asidi",
        "3 gliserol; 3 yağ asidi",
      ],
      reasons: [
        "A tamamen ayrıldığı için 1 gliserol; toplam 3+1=4 kesimden 4 yağ asidi serbestleşir.",
        "Dört kesim dört gliserol yapmaz; yalnız A’nın üç bağlantısı da ayrılmıştır.",
        "B’de iki bağ kaldığından B gliserolü tamamen serbest değildir.",
        "Dokuz yağ asidi ancak üç trigliseritin bütün bağları ayrılırsa elde edilirdi.",
        "C hiç, B yalnız kısmen hidroliz edildiği için üç serbest gliserol oluşmaz.",
      ],
      steps: [
        "Molekül başına kesimleri A3,B1,C0 olarak yaz.",
        "Serbest gliserol için 3 kesim tamamlanan molekülü seç: yalnız A.",
        "Yağ asitlerini bütün kesimlerin toplamı 3+1=4 olarak say.",
      ],
      knowledge:
        "Kısmi hidrolizde bağların moleküllere dağılımı serbest gliserol sayısını belirler.",
      error: "Bir moleküldeki ilk kesimi serbest gliserol sayma.",
      check: "Toplam 9 ester bağından 4’ü ayrılmış,5’i kalmıştır.",
      strategy:
        "Molekül başına kesimleri izleyerek tüm bağlantısı ayrılan gliserolleri toplam kesimden ayır.",
    },
    {
      prompt:
        "İki ayrı deneyde üçer trigliserit ve başlangıçta serbest bileşen yoktur. I’de yalnız ilk trigliseritin üç ester bağı; II’de her trigliseritin birer ester bağı hidroliz ediliyor. Bir kesim bir yağ asidi ayırır; gliserolün serbest kalması üç bağın da ayrılmasını gerektirir. Hangi karşılaştırma doğrudur?",
      options: [
        "Yağ asidi iki deneyde 3’tür; serbest gliserol I’de 1, II’de 0’dır.",
        "İki deneyde de kesin 3 gliserol serbesttir.",
        "Yağ asidi I’de 1, II’de 3’tür.",
        "II’de 3 serbest gliserol, I’de 0 vardır.",
        "Aynı toplam kesim bütün son molekül dağılımını zorunlu eşitler.",
      ],
      reasons: [
        "Her ikisinde 3 kesim 3 yağ asidi verir; üç kesimin tek molekülde tamamlanması yalnız I’de gliserolü serbest bırakır.",
        "II’de her gliserolün iki bağlı kolu kalır; üç serbest gliserol oluşmaz.",
        "Yağ asidi sayısı molekül değil kesim adedidir; I’de de 3’tür.",
        "Gliserolün serbestleşme koşulu ters uygulanmıştır; tamamlanan tek molekül I’dedir.",
        "Toplam kesim eşit olsa da molekül başına dağılım farklıdır; gliserol sonucu bunu gösterir.",
      ],
      steps: [
        "I ve II’de toplam kesimlerin ikisinde de 3 olduğunu belirle.",
        "I’de bir molekülün bütün bağlantılarının ayrıldığını, II’de hiçbirinin tamamlanmadığını göster.",
        "Yağ asidi toplamını ortak; gliserol sayılarını ayrı sonuç olarak yaz.",
      ],
      knowledge:
        "Aynı toplam bağ kesimi, aynı serbest gliserol dağılımını zorunlu kılmaz.",
      error: "Kesim toplamıyla kesim dağılımını aynı veri sayma.",
      check:
        "Her deneyde 6 ester bağı kalır; bunun hangi moleküllerde kaldığı farklıdır.",
      strategy:
        "Aynı kesim bütçesini iki farklı molekül dağılımında uygulayıp ortak ve farklı ürünleri karşılaştır.",
    },
    {
      prompt:
        "Bir trigliseritteki üç yağ asidinin karbon zincirlerinde sırasıyla 0,1 ve 2 karbon–karbon çift bağı vardır. Gliserole üç ester bağlantısı kurulmuştur. Ester bağı ve karbon zincirlerindeki toplam C=C sayısı sırasıyla nedir?",
      options: [
        "3 ester; 3 C=C",
        "6 ester; 3 C=C",
        "3 ester; 0 C=C",
        "1 ester; 3 C=C",
        "0 ester; 3 C=C",
      ],
      reasons: [
        "Gliserole üç yağ asidi üç ester bağlantısı verir; zincirlerde 0+1+2=3 C=C vardır.",
        "Karbon zincirindeki çift bağları ester bağlantılarına eklemek ester türünü yanlış sayar.",
        "Bir zincirin doymuş olması öteki iki zincirin üç C=C bağını yok etmez.",
        "Bir trigliserit molekülü üç ester bağlantısı taşır; molekül adedi bağ adedi değildir.",
        "Üç ester bağlantısının kurulduğu açıkça verilmiştir.",
      ],
      steps: [
        "Gliserol–yağ asidi bağlantılarını 3 ester olarak ayrı kaydet.",
        "Karbon zincirlerindeki çift bağları 0+1+2 şeklinde topla.",
        "İki farklı bağ türünü birbirinin sayısına ekleme.",
      ],
      knowledge:
        "Ester bağı gliserole bağlantıyı, C=C yağ asidi zincirinin doymamışlığını anlatır.",
      error: "Aynı çizimdeki bütün bağları aynı tür sayma.",
      check:
        "İki ayrı toplam da 3 çıkabilir; bu, bağ türlerinin aynı olduğunu göstermez.",
      strategy:
        "Gliserole ester bağlantılarını yağ asidi zincirindeki C=C bağlarından ayrı sınıflarda say.",
    },
    {
      prompt:
        "Bir çift tabaka şemasında M ve N fosfolipitlerinin başları sulu yüzlere, P ve Q’nun başları kuyrukların bulunduğu iç bölgeye dönüktür. Şema düzeltmesinde her yanlış molekül tek kez ters çevrilecek; doğru olanlar korunacaktır. Başlar suya, kuyruklar içe bakacak düzen için en az kaç molekül çevrilir?",
      options: ["2", "0", "1", "3", "4"],
      reasons: [
        "P ve Q yanlış, M ve N doğru yönelmiştir; iki yanlış molekülün çevrilmesi yeterlidir.",
        "Başları içte bulunan P ve Q düzeltilmeden istenen düzen oluşmaz.",
        "Tek dönüş yanlış iki molekülden yalnız birini düzeltir.",
        "Üçüncü dönüş doğru olan M veya N’yi bozacaktır; en az değildir.",
        "Dört molekülü çevirmek M ve N’nin doğru yönünü de ters yapar.",
      ],
      steps: [
        "Verilen ölçütü başlar suda, kuyruklar içte olarak sabitle.",
        "M,N’nin bu ölçütü sağladığını; P,Q’nun sağlamadığını ayır.",
        "Yalnız iki yanlış molekülü say.",
      ],
      knowledge:
        "Çift tabaka düzeni fosfolipidin kutuplu başı ile hidrofobik kuyruklarının farklı etkileşimlerine dayanır.",
      error:
        "Düzeltme yaparken doğru molekülleri de gereksiz yere ters çevirme.",
      check:
        "İki dönüşten sonra dört baş da ilgili sulu yüzlere bakar; bu bir şema işlemidir.",
      strategy:
        "Verilen yön ölçütüyle doğru ve yanlış başları ayırıp yalnız gereken ters çevirmeleri seç.",
    },
    {
      prompt:
        "Bir yağ örneği mekanik olarak daha küçük damlalara dağıtılıyor. Toplam yağ miktarı ve ester bağı sayısı değişmiyor; yeni serbest yağ asidi de ölçülmüyor. Hangi sonuç en uygundur?",
      options: [
        "Temas yüzeyi değişmiş olabilir; ester hidrolizi gerçekleştiği bu veriden çıkmaz.",
        "Bütün trigliseritler tamamen hidroliz olmuştur.",
        "Mekanik dağıtma zorunlu olarak üç su çıkarır.",
        "Yağ miktarı korunursa damla sayısı değişemez.",
        "Daha küçük damla doğrudan amino asit oluştuğunu gösterir.",
      ],
      reasons: [
        "Damla boyutu fiziksel dağılımla değişebilir; ester sayısının ve serbest yağ asidinin değişmemesi hidroliz kanıtı vermez.",
        "Tam hidroliz ester bağlarını azaltıp serbest yağ asidi oluştururdu; bu ölçümler yoktur.",
        "Su çıkışı net esterleşme koşuluyla ilgilidir; mekanik dağıtmada yeni ester kurulması verilmemiştir.",
        "Aynı toplam miktar daha çok sayıda küçük damlaya bölünebilir.",
        "Damlacık boyutu protein birimi olan amino asit oluşumuna kanıt değildir.",
      ],
      steps: [
        "Boyut değişimini miktar ve bağ sayısı ölçümlerinden ayır.",
        "Hidroliz olsaydı ester kesimi ve serbest yağ asidi için ne bekleneceğini verilenlerle karşılaştır.",
        "Sonucu fiziksel temas yüzeyi olanağıyla sınırla.",
      ],
      knowledge:
        "Fiziksel parçalanma ile kimyasal bağların hidrolizi farklı olaylardır.",
      error: "Küçük damlayı küçük kimyasal molekülle aynı şey sanma.",
      check: "Toplam ester sayısı korunurken yüzey alanı değişebilir.",
      strategy:
        "Damla boyutuyla ester ve serbest ürün ölçümlerini karşılaştırarak fiziksel ve kimyasal değişimi ayır.",
    },
    {
      prompt:
        "Bir model karışımda yalnız trigliserit, steroid ve her molekülünde bir fosfor atomu bulunan fosfolipit vardır. Diğer iki türde fosfor yoktur. Toplam 10 lipit molekülünde 4 fosfor atomu ölçülüyor. Hangi sonuç kesindir?",
      options: [
        "4 fosfolipit vardır; kalan 6 molekülün trigliserit–steroid dağılımı tekilleşmez.",
        "Kesin 6 trigliserit ve hiç steroid yoktur.",
        "10 molekülün tamamı fosfolipittir.",
        "Fosfor bulunması bütün moleküllerin protein olduğunu kanıtlar.",
        "4 steroid vardır; kalan 6 fosfolipittir.",
      ],
      reasons: [
        "Her fosfolipit 1 P ve tek P kaynağı olduğundan 4 fosfolipit bulunur; diğer 6’nın iki tür arasındaki paylaşımı verilmemiştir.",
        "Kalan 6 molekülün tamamının trigliserit olması olasıdır fakat steroid olmaması zorunlu değildir.",
        "On fosfolipit 10 P verirdi; ölçüm 4’tür.",
        "Modelde P fosfolipit kaynağı olarak verilmiştir; protein yoktur.",
        "Steroid P taşımıyor;4 P’den steroid sayısı bu biçimde çıkarılamaz.",
      ],
      steps: [
        "Modeldeki tek fosfor kaynağının fosfolipit olduğunu belirle.",
        "Bir P/bir molekül oranından 4 fosfolipit bul.",
        "10−4=6’nın trigliserit ve steroid arasında paylaşıldığı için ayrı sayılarının bilinmediğini koru.",
      ],
      knowledge:
        "Ayırt edici bir atom sayısı ancak verilen molekül başına oran ve tek kaynak koşuluyla kullanılır.",
      error:
        "Belirlenen alt grup dışındaki molekülleri tek türe zorunlu atama.",
      check: "4 fosfolipit+6 diğer lipit=10; P katkısı 4 olarak korunur.",
      strategy:
        "Tek fosfor kaynağı koşuluyla alt grubu bul, fosforsuz iki grubun ayrımını belirsiz bırak.",
    },
    {
      prompt:
        "T enziminin yalnız trigliseritteki ester bağlantılarını hidroliz ettiği verilmiştir. Bilinen trigliseritli kontrolde T ile yağ asidi oluşuyor; bilinmeyen saf X örneğinde aynı etkin T ile oluşmuyor. X’in steroid gibi başka bir lipit olabileceği dışlanmamıştır. Hangi çıkarım geçerlidir?",
      options: [
        "T ile yanıt vermemesi X’in bütün lipit sınıfı dışında olduğunu kanıtlamaz.",
        "X kesinlikle hiç organik madde içermez.",
        "T bütün lipit türlerinin halkalarını zorunlu parçalar.",
        "Kontrolde T’nin etkin olmadığı kanıtlanmıştır.",
        "Steroidler tanım gereği bir gliserol ve üç yağ asididir.",
      ],
      reasons: [
        "T yalnız belirli ester yapısını sınar; başka lipit iskeletleri için negatif yanıt lipit yokluğu değildir.",
        "Yanıt yokluğu organik molekül yokluğu kanıtı değildir; örneğin saf X olduğu verilmiştir.",
        "T’nin yalnız trigliserit esterlerine etkisi verilmiştir; steroid halkası için yetki yoktur.",
        "Kontrol yağ asidi oluşturduğu için T’nin bu koşulda etkin olduğunu destekler.",
        "Steroid halkalı farklı bir gruptur; trigliserit bileşimiyle tanımlanmaz.",
      ],
      steps: [
        "T’nin sınırlı etki alanını yalnız trigliserit esteri olarak oku.",
        "Kontrolün T etkinliğini doğruladığını, X yanıtının negatif olduğunu ayrı kaydet.",
        "X’i tüm lipitlerden dışlamak için yöntem kapsamının yetmediğini göster.",
      ],
      knowledge:
        "Bir alt yapıya duyarlı test, bütün lipit türleri için zorunlu ortak test değildir.",
      error: "Özel testin negatif sonucunu bütün üst sınıfın yokluğu sayma.",
      check:
        "Steroid olasılığı kartta açık kaldığından lipit dışı sonucu zorunlu değildir.",
      strategy:
        "Seçici enzimin doğrulanmış etki alanını koruyup negatif sonucu bütün lipitlere yayma.",
    },
    {
      prompt:
        "Tek bir trigliseritin yalnız iki ester bağı hidroliz ediliyor. Başlangıçta serbest bileşen yoktur; her kesim bir yağ asidi ayırır. Gliserol ancak üç bağı da ayrılınca serbestleşir. Hangi son durum doğrudur?",
      options: [
        "2 serbest yağ asidi; 0 serbest gliserol; 1 ester bağı kalır.",
        "2 serbest yağ asidi; 2 serbest gliserol; 1 bağ kalır.",
        "3 serbest yağ asidi; 1 serbest gliserol; 0 bağ kalır.",
        "0 serbest yağ asidi; 0 ester bağı kalır.",
        "1 serbest yağ asidi; 1 serbest gliserol; 2 bağ kalır.",
      ],
      reasons: [
        "İki kesim 2 yağ asidi verir; bir kol bağlı kaldığı için gliserol serbest değildir.",
        "Bir gliserol iskeleti iki gliserole çoğalmaz; ayrıca bir bağlantısı hâlâ vardır.",
        "Bu tam hidroliz sonucudur; üçüncü bağın da kesilmesi gerekirdi.",
        "İki kesim yağ asidi ayırır ve başlangıç 3 bağdan 1 bırakır.",
        "Verilen iki kesim yerine bir kesim uygulanmış ve gliserol koşulu bozulmuştur.",
      ],
      steps: [
        "Başlangıçtaki 3 ester bağından 2’yi çıkar.",
        "Her kesime bir serbest yağ asidi eşleştir.",
        "Kalan 1 bağlantı nedeniyle gliserolün tamamen serbest olmadığını belirt.",
      ],
      knowledge:
        "Bağlı gliserol türeviyle serbest gliserol aynı son ürün değildir.",
      error: "Her yağ asidi ayrılışını gliserol ayrılışı sanma.",
      check: "2 kopan+1 kalan ester=3 başlangıç bağlantısıdır.",
      strategy:
        "Kopan esterlerin yağ asidi katkısını sayarken gliserolün tam ayrılma koşulunu ayrıca denetle.",
    },
    {
      prompt:
        "Yalnız yağ ve karbohidrat içeren 10 g örneğin toplam enerjisi 54 birimdir. Bu modelde yağ 9 birim/g, karbohidrat 4 birim/g enerji verir. Başka katkı yoktur. Yağ kütlesi kaç gramdır?",
      options: ["2,8 g", "4,0 g", "5,4 g", "6,0 g", "8,0 g"],
      reasons: [
        "x yağ ve 10−x karbohidrat için 9x+4(10−x)=54;5x=14,x=2,8 bulunur.",
        "4 g yağ ve 6 g karbohidrat 36+24=60 birim verir;54 değildir.",
        "54/10=5,4 ortalama enerji/g değeridir; yağ gramı değildir.",
        "54/9=6, tüm enerji yalnız yağdan gelmiş gibi karbohidrat katkısını siler.",
        "8 g yağ ve 2 g karbohidrat 72+8=80 birim verir.",
      ],
      steps: [
        "Yağ kütlesine x, karbohidrata 10−x de.",
        "Toplam enerji denklemini 9x+4(10−x)=54 kur.",
        "40+5x=54’ten x=14/5=2,8 hesapla.",
      ],
      knowledge:
        "Bir karışımın enerji toplamı her bileşenin kütlesi ile birim kütle katkısının toplamıdır.",
      error: "Ortalama enerji/g değerini doğrudan bileşen gramı sanma.",
      check: "2,8×9+7,2×4=25,2+28,8=54 ve kütleler 10 g eder.",
      strategy:
        "Toplam kütle ve toplam enerji için iki bileşeni aynı denklemde bağlayıp yağ payını çöz.",
    },
    {
      prompt:
        "Bir hücre kültürü incelenen yağ asidinden aynı sürede 5 birim kullanıyor; kendi sentezi 1 birim sağlıyor. Bu modelde yalnız sentez ve dış ortamdan alım kaynaktır; depo yok ve miktar korunuyor. Eksilme olmadan kullanımı sürdürmek için dışarıdan en az kaç birim gerekir?",
      options: ["4", "0", "1", "5", "6"],
      reasons: [
        "Kullanım 5, sentez 1 olduğundan fark 4 dış alımla karşılanır.",
        "Sentez kullanımın yalnız 1 birimini sağlıyor; sıfır alım 4 birim eksilme bırakır.",
        "1, sentez miktarıdır; kalan gereksinimi karşılamaz.",
        "5, kendi sentezinin 1 birim katkısını yok sayar; en az alım değildir.",
        "6, kullanım ile sentezi toplar; sentez kaynağı dış ihtiyacı azaltır.",
      ],
      steps: [
        "Verilen zaman aralığı için kullanımın 5 birim olduğunu al.",
        "İç sentezin 1 birim katkısını kaynak olarak çıkar.",
        "Depo ve başka kaynak bulunmadığından kalan 4’ü dış alım olarak bul.",
      ],
      knowledge:
        "Yetersiz iç sentez, gereken bütün miktarın dışarıdan alınması demek değildir; katkılar birlikte hesaplanır.",
      error: "İç sentez ve dış alımı aynı tarafta tüketim gibi toplama.",
      check:
        "1 sentez+4 alım=5 kullanım; bu varsayımsal kültür hesabı kişisel doz değildir.",
      strategy:
        "Kullanımdan iç sentez katkısını çıkararak yalnız modelde kalan dış kaynak açığını hesapla.",
    },
    {
      prompt:
        "Dört gliserol ve on iki yağ asidinden üç trigliserit kuruluyor. Ardından yalnız ilk trigliseritte iki ester bağı hidroliz ediliyor; ötekiler değişmiyor. Başlangıçta başka lipit yoktur. Sonunda hiç ester bağı kopmamış tam trigliserit sayısı kaçtır?",
      options: ["2", "3", "1", "4", "0"],
      reasons: [
        "Üretilen 3 molekülden yalnız ilkinde kesim vardır; diğer 2’si tam kalır.",
        "İlk molekülün iki ester bağı ayrıldığı için artık kesimsiz tam trigliserit değildir.",
        "İki kesimi iki ayrı trigliseritte olmuş sayar; kart ikisini ilk moleküle yerleştirir.",
        "Dört başlangıç gliserolünün hepsi kullanılmamıştır; yalnız 3 ürün kurulduğu verilmiştir.",
        "Diğer iki molekülün bağlarının değişmediği belirtilmiştir; sıfır olamaz.",
      ],
      steps: [
        "Oluşturulan ürün sayısını 3 olarak al; kuramsal üst sınırla değiştirme.",
        "İki kesimin aynı ilk trigliseritte olduğunu işaretle.",
        "Kesim görmeyen ikinci ve üçüncü molekülü say.",
      ],
      knowledge:
        "Gerçekleşen üretim sayısı ile kuramsal kapasite; kesim sayısıyla etkilenen molekül sayısı ayrıdır.",
      error: "İki kesimi otomatik iki moleküle dağıtma.",
      check:
        "Tam kalan 2 molekül ile kısmen ayrılan 1 molekülün gliserol iskeletleri 3 ürünü açıklar.",
      strategy:
        "Gerçekleşen üretim adedini kullanıp aynı moleküldeki iki kesimi tek etkilenen ürün olarak izle.",
    },
    {
      prompt:
        "Üç gliserol ve on bir yağ asidi içeren serbest başlangıca, en az eklemeyle dört tam trigliserit kuracak kadar bileşen sağlanacaktır. Bir ürün 1 gliserol ve 3 yağ asidi gerektirir; eklenenler yalnız bu iki bileşen olabilir. Hangi ekleme yeterli ve iki tür için de en azdır?",
      options: [
        "1 gliserol ve 1 yağ asidi",
        "1 gliserol ve 0 yağ asidi",
        "0 gliserol ve 1 yağ asidi",
        "2 gliserol ve 0 yağ asidi",
        "0 gliserol ve 3 yağ asidi",
      ],
      reasons: [
        "Dört ürün 4 gliserol ve 12 yağ asidi ister; başlangıç 3 ve 11 olduğundan her türden 1 eksiktir.",
        "Gliserol tamamlanır fakat yağ asidi 11’de kalıp 12 gereksinimini karşılamaz.",
        "Yağ asidi tamamlanır fakat gliserol 3’te kalır.",
        "Gliserol fazlası yağ asidi açığını kapatmaz; yalnız 11 yağ asidi vardır.",
        "Yağ asidi fazlası eksik gliserolün yerine geçmez.",
      ],
      steps: [
        "Dört ürünün gereksinimini 4 gliserol ve 12 yağ asidi olarak yaz.",
        "Başlangıçtan ayrı ayrı eksikleri 4−3 ve 12−11 bul.",
        "Bir bileşenin fazlasını diğer eksikliğin yerine saymadan 1+1 eklemeyi seç.",
      ],
      knowledge: "Stok tamamlamada her zorunlu bileşenin açığı ayrı kapatılır.",
      error: "Yağ asidi fazlasının eksik gliserolü telafi edeceğini sanma.",
      check: "Ekleme sonrası 4 ve 12 tam olarak 4 ürünün bileşimidir.",
      strategy:
        "Hedef ürünün iki bileşen gereksinimini ayrı tamamlayarak en küçük stok eklemesini bul.",
    },
    {
      prompt:
        "Bir trigliseritte yağ asidi zincirlerinin toplam 3 C=C bağı ve gliserole 3 ester bağlantısı vardır. Yalnız C=C bağlarının her birine bir H₂ eklenerek doyurma yapılıyor; esterler kesilmiyor. Son durumda ne olur?",
      options: [
        "3 H₂ kullanılır; C=C sayısı 0, ester sayısı 3 kalır.",
        "3 su kullanılır; bütün gliserol serbestleşir.",
        "1 H₂ kullanılır; ester sayısı 0 olur.",
        "C=C sayısı 6’ya çıkar.",
        "Yeni peptit bağları kurulur.",
      ],
      reasons: [
        "Üç çift bağın her biri bir H₂ kullanır; bu işlem ester hidrolizi olmadığı için üç ester korunur.",
        "Su kullanımı ve gliserol serbestleşmesi ester hidrolizine ait başka işlemdir.",
        "Üç C=C için bir H₂ yetmez ve ester kesilmediği belirtilmiştir.",
        "Doyurma çift bağ sayısını artırmaz; verilen üç bağ tek bağa dönüşür.",
        "Yağ asidi doyurma işlemi amino asitlerin peptit bağlantısı değildir.",
      ],
      steps: [
        "Hedef bağların yalnız karbon zincirlerindeki 3 C=C olduğunu belirle.",
        "Bir H₂/çift bağ oranından 3 H₂ say.",
        "Esterlerin kesilmediği koşulunu koruyarak ester sayısını 3 bırak.",
      ],
      knowledge:
        "Hidrojenle doyurma ile ester hidrolizi farklı bağ ve farklı girdilere ilişkindir.",
      error: "Karbon çift bağındaki değişimi gliserolün ayrılması sayma.",
      check: "Başlangıç 3 C=C, son 0 C=C; ester iki durumda da 3’tür.",
      strategy:
        "Hidrojen eklenen C=C bağlarını değiştirip kesilmediği belirtilen esterleri koru.",
    },
    {
      prompt:
        "A ve B yağ asitleri aynı karbon sayısına ve birer C=C bağına sahiptir. A’daki çift bağ cis, B’deki trans olarak verilmiştir. Diğer erime ölçümleri yoktur. Hangi yorum kesindir?",
      options: [
        "İkisi de doymamıştır; çift bağ geometrileri farklıdır.",
        "B’nin zincirinde C=C bulunmadığından doymuştur.",
        "A kesin her sıcaklıkta sıvıdır.",
        "A ile B’nin tüm fiziksel özellikleri zorunlu aynıdır.",
        "İkisi de birer trigliserit molekülüdür.",
      ],
      reasons: [
        "Birer C=C ikisini de doymamış yapar; cis/trans verilen geometrik farktır.",
        "Trans çift bağ da C=C’dir; doymamışlık koşulunu ortadan kaldırmaz.",
        "Hiçbir sıcaklık sınırı veya erime ölçümü verilmeden her sıcaklıkta sıvılık çıkarılamaz.",
        "Geometri farklılığı özelliklerin koşulsuz eşitliğini garanti etmez.",
        "Yağ asidi ile gliserole üç yağ asidi bağlanmış trigliserit aynı yapı değildir.",
      ],
      steps: [
        "Doymamışlık için zincirde C=C olup olmadığını incele: ikisinde de var.",
        "Cis ve trans ifadelerinin aynı bağ türünün farklı yerleşimlerini anlattığını kullan.",
        "Verilmeyen erime davranışına kesin hüküm ekleme.",
      ],
      knowledge: "Doymamışlık ile çift bağ geometrisi ayrı yapı bilgileridir.",
      error: "Transı doymuşla eş anlamlı kullanma.",
      check:
        "C=C adedi her birinde 1’dir; bu sayı geometrinin aynı olmasını gerektirmez.",
      strategy:
        "Ortak çift bağ sayısıyla doymamışlığı, cis/trans bilgisiyle geometriyi ayrı adlandır.",
    },
    {
      prompt:
        "Örnek bir analizde bitki kaynaklı P yağının yağ asitlerinin %65’i doymuş; balık kaynaklı H yağının %75’i doymamış bulunuyor. Hangi yargı bu verilerle bağdaşmaz?",
      options: [
        "Bitki yağlarının hepsi doymamış, hayvan yağlarının hepsi doymuştur.",
        "P’de doymuş yağ asitleri bulunur.",
        "H’de doymamış yağ asitleri bulunur.",
        "Kaynağa ilişkin genel eğilimler mutlak kural değildir.",
        "Bir örnekte birden çok yağ asidi türü bulunabilir.",
      ],
      reasons: [
        "P’de doymuş ve hayvan kökenli H’de doymamış oranlar verilerek iki mutlak genellemeye de karşı örnek sağlanmıştır.",
        "P için%65 doymuş ölçümü bunu doğrudan destekler.",
        "H için%75 doymamış ölçümü bunu doğrudan destekler.",
        "Verilen iki örnek, kaynak etiketinin mutlak doymuşluk kuralı olmadığını gösterir.",
        "Yüzde bileşimler karışımda farklı türlerin bulunmasıyla uyumludur.",
      ],
      steps: [
        "P’nin bitki kökeniyle doymuş%65 bilgisini birlikte oku.",
        "H’nin hayvan kökeniyle doymamış%75 bilgisini birlikte oku.",
        "Her iki “hepsi” iddiasını kendi karşı örneğiyle denetle.",
      ],
      knowledge:
        "Canlı kaynağına ilişkin genel eğilim, moleküllerin doymuşluk ölçütünün yerine geçmez.",
      error: "Olumsuz kökte ölçümle uyumlu bir yargıyı yanlış seçme.",
      check:
        "Yapısal ölçüt karbon zincirindeki C=C’dir; bitki/hayvan etiketi değildir.",
      strategy:
        "Her mutlak kaynak genellemesini verilen bitki ve hayvan örnekleriyle ayrı ayrı sına.",
    },
    {
      prompt:
        "Üç saf lipit için yapı bilgileri şöyle verilmiştir: X bir gliserole üç yağ asidi bağlı taşır; Y kutuplu fosfat başı ve iki hidrofobik kuyruk taşır; Z steroidlere özgü halkalı iskelet taşır. Doğru eşleştirme hangisidir?",
      options: [
        "X trigliserit; Y fosfolipit; Z steroid",
        "X fosfolipit; Y trigliserit; Z protein",
        "Üçü de glikozit bağlı polisakkarittir.",
        "X steroid; Y nükleotit; Z trigliserit",
        "Üçü de aynı tek lipit molekülünün adıdır.",
      ],
      reasons: [
        "Üç yağ asitli gliserol trigliserit, kutuplu fosfatlı baş-kuyruk düzeni fosfolipit, verilmiş halkalı iskelet steroidi tanımlar.",
        "X ve Y’nin yapı ölçütleri ters atanmış; Z için protein birimi verilmemiştir.",
        "Şeker birimi veya glikozit bağlantısı bu üç açıklamada yoktur.",
        "Gliserol-üç yağ asidi steroid değildir; Y için nükleotit bazı/şekeri de verilmemiştir.",
        "Verilen üç farklı yapı, lipitlerin tek moleküle indirgenemeyeceğini gösterir.",
      ],
      steps: [
        "X’in 1 gliserol–3 yağ asidi oranını trigliseritle eşleştir.",
        "Y’nin fosfat başı ve hidrofobik kuyruklarını fosfolipitle ilişkilendir.",
        "Z’nin açıkça verilen steroid iskeletini ayrı üçüncü grup olarak koru.",
      ],
      knowledge:
        "Lipit sınıfı içinde farklı moleküler iskeletler bulunur; bütün gruplar trigliserit değildir.",
      error: "Ortak lipit adından ortak parça oranı çıkarma.",
      check: "Her isim kendi verilen yapı kanıtıyla eşleşmelidir.",
      strategy:
        "Her lipit grubunu yalnız ona verilen parça ve iskelet kanıtıyla eşleştir.",
    },
    {
      prompt:
        "Bir zar şeması iki sırada toplam 10 fosfolipit gösteriyor: üstte 4, altta 6. Şemadaki her molekülde bir kutuplu baş ve iki kuyruk vardır. Başların ve kuyrukların toplamı sırasıyla kaçtır?",
      options: [
        "10 baş; 20 kuyruk",
        "20 baş; 10 kuyruk",
        "4 baş; 6 kuyruk",
        "10 baş; 30 kuyruk",
        "2 baş; 10 kuyruk",
      ],
      reasons: [
        "On molekülün her biri 1 baş ve 2 kuyruk taşır;10 ve 20 bulunur.",
        "Molekül başına baş ve kuyruk oranı ters çevrilmiştir.",
        "4 ve 6 iki sıradaki molekül adetleridir; toplam baş/kuyruk sayısı değildir.",
        "Üç kuyruk trigliseritle karıştırılmıştır; bu şemada iki kuyruk açıkça verilmiştir.",
        "İki sıra iki baş demek değildir; her molekülün ayrı başı vardır.",
      ],
      steps: [
        "İki sıradaki molekülleri 4+6=10 olarak topla.",
        "Bir baş/molekül oranından 10 baş say.",
        "İki kuyruk/molekül oranından 20 kuyruk say.",
      ],
      knowledge:
        "Çift tabakanın sıra sayısı ile molekül başına parça sayıları farklı ölçeklerdir.",
      error:
        "Fosfolipidin verilen iki kuyruğunu trigliseritin üç yağ asidiyle değiştirme.",
      check: "10×(1 baş+2 kuyruk) şemanın bütün moleküllerini kapsar.",
      strategy:
        "Önce iki sıranın molekül toplamını, sonra molekül başına baş ve kuyruk çarpanlarını kullan.",
    },
    {
      prompt:
        "Bilinmeyen bir organik yapının tam hidrolizinde 3 su kullanılıyor. Ek bilgi yok. Karşı örnek olarak 4 amino asitli açık bir peptidin 3 peptit bağıyla aynı su sayısını verebildiği de belirtiliyor. “Üç su kullanıldı; yapı kesin trigliserittir.” yargısı için ne söylenebilir?",
      options: [
        "Kesin değildir; aynı su sayısını farklı bağ türleri de sağlayabilir.",
        "Kesindir; yalnız ester bağlarının hidrolizi su kullanır.",
        "Peptit bağları hidrolizle hiçbir zaman ayrılmaz.",
        "Su kullanımı molekülün bütün atomlarını ve görevini belirler.",
        "Üç su kullanılırsa üç gliserol zorunlu oluşur.",
      ],
      reasons: [
        "Kartta aynı 3 suyu veren peptit karşı örneği vardır; su sayısı tek başına bağ türü ve sınıfı tekilleştirmez.",
        "Peptit hidrolizi de verilen karşı örnekte su kullanır.",
        "Peptidin tam hidrolizi ve 3 su kullanımı kartta açıkça verilmiştir.",
        "Bir bağ sayısı molekülün bütün kimliğini ve işlevini vermez.",
        "Trigliserit olsa bile tam hidrolizde bir gliserol olur; üç gliserol sonucu ayrıca yanlıştır.",
      ],
      steps: [
        "Verilen 3 suyun yalnız hidroliz kesim toplamını belirttiğini ayır.",
        "Dört amino asitli peptidin 3 bağı için aynı suyu kullandığı karşı örneğini kullan.",
        "Tek su sayısından kesin trigliserit adının çıkmadığını göster.",
      ],
      knowledge:
        "Aynı net su miktarı farklı biyomolekül bağlarının sayımında görülebilir.",
      error: "Bağ miktarını tek başına bağ türü ve molekül kimliği sayma.",
      check:
        "Üç ester veya üç peptit kesimi aynı su adedini verebilir; yapı birimleri ek kanıttır.",
      strategy:
        "Aynı su sayısını sağlayan açık karşı örnekle tek molekül sınıfı sonucunu sınırla.",
    },
    {
      prompt:
        "Net esterleşme modelinde 1 gliserol ve 3 özdeş yağ asidi bir trigliserit oluştururken 3 su ayrılıyor. Bu kartta mol kütleleri gliserol 92, yağ asidi 280, su 18 g/mol verilmiştir. Oluşan trigliseritin mol kütlesi kaç g/mol olur?",
      options: ["878", "932", "896", "840", "372"],
      reasons: [
        "92+3×280−3×18=932−54=878 g/mol; ayrılan suyun kütlesi üründe kalmaz.",
        "932 başlangıç bileşenleri toplamıdır; ayrılan üç su çıkarılmamıştır.",
        "896 yalnız iki suyu çıkarmaya karşılık gelir; üç ester bağlantısı için üç su verilmiştir.",
        "840 yalnız üç yağ asidinin toplamıdır; gliserol ve ayrılan su birlikte hesaba katılmamıştır.",
        "372 bir gliserol+tek yağ asididir; üç yağ asidi şartını kullanmaz.",
      ],
      steps: [
        "Başlangıç mol kütlelerini 92+3×280=932 olarak topla.",
        "Ayrılan suyu 3×18=54 olarak ayrı hesapla.",
        "Üründe kalan kütleyi 932−54=878 bul.",
      ],
      knowledge:
        "Net bileşen–ürün kütle hesabında ayrılan su toplamı başlangıçtan çıkarılır.",
      error:
        "Suyu yok sayarak bileşenlerin basit toplamını ürünün kütlesi sanma.",
      check: "878+54=932, başlangıç toplamını geri verir.",
      strategy:
        "Bileşen kütlelerini toplayıp esterleşmede ayrılan suyu ürün kütlesinden çıkar.",
    },
  ],
} as const;

function shuffleB026<T>(input: readonly T[], seed: number): T[] {
  const result = [...input];
  let state = seed >>> 0;
  for (let i = result.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const at = state % (i + 1);
    [result[i], result[at]] = [result[at], result[i]];
  }
  return result;
}
export const forge026BiologyBLegacyIds = guidePayloadB026.map((g) => g.id);
export const forge026BiologyBGuides: LessonGuide[] = guidePayloadB026.map(
  (g) => ({
    id: g.id,
    minutes: g.minutes,
    objectives: g.objectives,
    sections: g.sections,
    examples: g.examples,
    recall: g.recall,
    source: g.source,
  }),
);
export const forge026BiologyBTopics: Record<string, string> =
  Object.fromEntries(
    guidePayloadB026.flatMap((g) => [
      [g.id, g.topic],
      [g.id + "-ileri", g.topic],
    ]),
  );
export const forge026BiologyBLessons: Lesson[] = guidePayloadB026.map(
  (g, group) => {
    const cards = cardPayloadB026[g.id as keyof typeof cardPayloadB026];
    const targets = shuffleB026(
      Array.from({ length: cards.length }, (_, i) => i % 5),
      33231 + group * 1999,
    );
    return {
      id: g.id + "-ileri",
      subjectId: "tyt-biyoloji",
      title: txt(g.title + " — ileri"),
      minutes: 25,
      objectives: g.objectives.map(txt),
      body: [
        {
          title: txt("Özgün ileri soru seti"),
          text: txt(
            "Bu set temel anlatımdan sonra farklı koşullarda bağımsız uygulama içindir. Her soru gereken tanımı, veriyi ve model koşulunu kendi kartında verir; etkinliğin o anki ayarlarına veya önceki sorunun yanıtına dayanmaz.",
          ),
        },
      ],
      source: txt(g.source),
      tags: [g.topic, "Özgün öğretim soruları", "ileri-soru-seti"],
      questions: cards.map((c, i): Question => {
        const wrong = shuffleB026([1, 2, 3, 4], 671 + group * 713 + i * 97),
          order = Array.from({ length: 5 }, (_, j) =>
            j === targets[i] ? 0 : wrong.shift()!,
          );
        return {
          id: `f026b-${g.id}-${i + 1}`,
          prompt: txt(c.prompt),
          options: order.map((j) => txt(c.options[j])),
          answer: targets[i],
          hint: txt(c.steps[0]),
          explanation: txt(c.steps.join(" ") + " " + c.reasons[0]),
          skill: g.id,
          guidance: {
            knowledge: [c.knowledge],
            strategy: c.strategy,
            steps: [...c.steps],
            optionReasons: order.map((j) => c.reasons[j]),
            commonError: c.error,
            check: c.check,
          },
        };
      }),
    };
  },
);
