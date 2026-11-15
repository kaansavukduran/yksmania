import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide, WorkedExample, GuideSection } from "./guides/types";

export function sexualSnapshot(diploid: number, stage: number, rounds = 2) {
  if (
    !Number.isInteger(diploid) ||
    diploid < 2 ||
    diploid % 2 ||
    !Number.isInteger(stage) ||
    stage < 0 ||
    stage > 3 ||
    !Number.isInteger(rounds) ||
    rounds < 0 ||
    rounds > 4
  )
    throw new RangeError("SEXUAL_MODEL");
  const haploid = diploid / 2;
  return {
    haploid,
    chromosomes: stage === 1 ? haploid : diploid,
    cells: stage === 1 ? 2 : stage === 3 ? 2 ** rounds : 1,
    label: [
      "Diploit öncül",
      "Birleşmeden önce iki gamet",
      "Döllenmeyle zigot",
      "Mitozla erken gelişme",
    ][stage],
  };
}
export function independentGametes(genotype: string): string[] {
  if (!/^[A-Za-z]{2,8}$/.test(genotype) || genotype.length % 2 !== 0)
    throw new RangeError("GENOTYPE");
  let results = [""];
  for (let i = 0; i < genotype.length; i += 2) {
    const a = genotype[i],
      b = genotype[i + 1];
    if (a.toLowerCase() !== b.toLowerCase()) throw new RangeError("LOCUS");
    results = results.flatMap((g) => [...new Set([a, b])].map((x) => g + x));
  }
  return results;
}
export function monoCross(first: string, second: string) {
  if (
    !["AA", "Aa", "aa"].includes(first) ||
    !["AA", "Aa", "aa"].includes(second)
  )
    throw new RangeError("CROSS");
  const cells = [...first].flatMap((a) =>
    [...second].map((b) => [a, b].sort().join("")),
  );
  const counts = { AA: 0, Aa: 0, aa: 0 };
  cells.forEach((c) => counts[c as keyof typeof counts]++);
  return {
    cells,
    counts,
    recessive: counts.aa / 4,
    heterozygote: counts.Aa / 4,
    dominant: (counts.AA + counts.Aa) / 4,
  };
}
export function linkedGametes(
  recombination: number,
  phase: "cis" | "trans" = "cis",
) {
  if (
    !Number.isFinite(recombination) ||
    recombination < 0 ||
    recombination > 50 ||
    !["cis", "trans"].includes(phase)
  )
    throw new RangeError("RECOMBINATION");
  const r = recombination / 100,
    parental = (1 - r) / 2,
    recombinant = r / 2;
  return phase === "cis"
    ? { AB: parental, Ab: recombinant, aB: recombinant, ab: parental }
    : { AB: recombinant, Ab: parental, aB: parental, ab: recombinant };
}
export const aboGenotypes = ["AA", "AO", "BB", "BO", "AB", "OO"] as const;
export function aboPhenotype(genotype: string) {
  const a = [...genotype].sort().join("");
  if (a === "AA" || a === "AO") return "A";
  if (a === "BB" || a === "BO") return "B";
  if (a === "AB") return "AB";
  if (a === "OO") return "O";
  throw new RangeError("ABO");
}
export function aboCross(first: string, second: string) {
  if (
    !(aboGenotypes as readonly string[]).includes(first) ||
    !(aboGenotypes as readonly string[]).includes(second)
  )
    throw new RangeError("ABO_CROSS");
  const cells = [...first].flatMap((a) =>
    [...second].map((b) => [a, b].sort().join("")),
  );
  const probabilities = { A: 0, B: 0, AB: 0, O: 0 };
  cells.forEach((c) => (probabilities[aboPhenotype(c)] += 0.25));
  return { cells, probabilities };
}
export function xLinkedCross(mother: string, father: string) {
  if (!["AA", "Aa", "aa"].includes(mother) || !["AY", "aY"].includes(father))
    throw new RangeError("X_LINKED");
  const cells = [...mother].flatMap((a) =>
    [...father].map((b) => ({
      genotype: b === "Y" ? `X${a}Y` : `X${[a, b].sort().join("X")}`,
      sex: b === "Y" ? "XY" : "XX",
      affected: b === "Y" ? a === "a" : a === "a" && b === "a",
      carrier: b !== "Y" && a !== b,
    })),
  );
  return {
    cells,
    affected: cells.filter((c) => c.affected).length / 4,
    sonsAffected: cells.filter((c) => c.sex === "XY" && c.affected).length / 2,
    daughtersAffected:
      cells.filter((c) => c.sex === "XX" && c.affected).length / 2,
  };
}
export type PedigreeObservation = {
  father: boolean;
  mother: boolean;
  child: boolean;
  daughter: boolean;
};
export function pedigreeCandidates(o: PedigreeObservation) {
  const candidates: { id: string; name: string; witness: string }[] = [];
  for (const mode of ["AR", "AD"] as const) {
    const matches = [];
    const phenotype = (g: string) =>
      mode === "AR" ? g === "aa" : g.includes("A");
    for (const f of ["AA", "Aa", "aa"])
      for (const m of ["AA", "Aa", "aa"]) {
        if (phenotype(f) !== o.father || phenotype(m) !== o.mother) continue;
        const child = monoCross(f, m).cells.find(
          (c) => phenotype(c) === o.child,
        );
        if (child) matches.push(`${f} × ${m} → ${child}`);
      }
    if (matches.length)
      candidates.push({
        id: mode,
        name: mode === "AR" ? "Otozomal çekinik" : "Otozomal baskın",
        witness: matches[0],
      });
  }
  for (const mode of ["XR", "XD"] as const) {
    const matches = [];
    const affected = (g: string) =>
      mode === "XR" ? !g.includes("A") : g.includes("A");
    for (const f of ["AY", "aY"])
      for (const m of ["AA", "Aa", "aa"]) {
        if (affected(f) !== o.father || affected(m) !== o.mother) continue;
        for (const a of m) {
          const child = o.daughter ? [a, f[0]].sort().join("") : a + "Y";
          if (affected(child) === o.child)
            matches.push(
              `X${f[0]}Y × X${m[0]}X${m[1]} → ${o.daughter ? "X" + child[0] + "X" + child[1] : "X" + a + "Y"}`,
            );
        }
      }
    if (matches.length)
      candidates.push({
        id: mode,
        name: mode === "XR" ? "X’e bağlı çekinik" : "X’e bağlı baskın",
        witness: matches[0],
      });
  }
  if (!o.mother && (o.daughter ? !o.child : o.child === o.father))
    candidates.push({
      id: "Y",
      name: "Y’ye bağlı",
      witness: o.daughter
        ? "Kız çocuk Y almaz; bu modelde özelliği göstermez."
        : "Oğul Y kromozomunu babadan alır; tam ifade varsayımında durumları aynıdır.",
    });
  return candidates;
}

function section(title: string, a: string, b: string): GuideSection {
  return { title, paragraphs: [a, b] };
}
function example(
  title: string,
  prompt: string,
  strategy: string,
  steps: [string, string, string][],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample {
  return {
    title,
    prompt,
    strategy,
    steps: steps.map(([label, explanation, expression]) => ({
      label,
      explanation,
      expression,
    })),
    answer,
    check,
    pitfall,
  };
}
function question(
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
  skill: string,
): Question {
  return {
    id,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(explanation),
    skill,
  };
}
const source =
  "MEBİ TYT Biyoloji Konu Özetleri: eşeyli üreme ve kalıtım, basılı s.121–142 (PDF 123–144). İlgili Aurelia öğretim kağıtlarıyla karşılaştırılmış özgün anlatım/model/sorular; resmî soru aktarımı değildir.";
const data: {
  id: string;
  topic: string;
  title: string;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: [string, string][];
  questions: Question[];
}[] = [];

// Separate units deliberately keep their biological assumptions next to the rule.
data.push({
  id: "eseyli-ureme",
  topic: "detail-24",
  title: "Eşeyli üreme: gametten zigota, zigottan gelişmeye",
  objectives: [
    "Mayoz, döllenme ve mitozu doğru sırada ilişkilendir.",
    "Takım, kromozom ve hücre sayılarını ayrı hesapla.",
    "Erselik ve bitki yaşam döngülerinde geçerli koşulu seç.",
  ],
  sections: [
    section(
      "Birleşen iki gamet, oluşan bir zigot",
      "Eşeyli üremenin ayırıcı olayı gametlerin kalıtsal içeriklerinin birleşmesidir. Olağan diploit hayvan modelinde mayozla haploit gametler oluşur; döllenmede iki haploit takım bir araya gelerek diploit zigotu kurar. İki hücrenin yalnız yan yana bulunması döllenme değildir.",
      "Gamet üreten birey, gamet ve yavru üç farklı düzeydir. Eşeyli üremeyi her koşulda iki ayrı birey diye tanımlamak kendini dölleyebilen erselik türleri dışlar. Ölçütün iki ayrı ata sayısı mı yoksa gamet birleşmesi mi olduğunu sorgula.",
    ),
    section(
      "n bir hücre sayısı değildir",
      "n bir kromozom takımını, 2n iki takımı gösterir. T ürün 2n=18 olduğu verilirse olağan gamette n=9, döllenmeyle oluşan zigotta 18 kromozom vardır. Buradaki dokuz, gamet adedi veya DNA kütlesi değildir.",
      "Aynı sayı birçok hücrede bulunabilir: döllenmeden sonraki normal mitozlarda her yavru hücre 18 kromozomlu kalırken hücre adedi artar. Cevabına kromozom/hücre, hücre veya DNA birimi yazarak farklı nicelikleri karıştırmayı önle.",
    ),
    section(
      "İki ana olay kromozom takımını dengeler",
      "Mayoz diploit öncüldeki homolog çiftleri ayırır ve takım sayısını yarıya indirir. Döllenme iki takımı birleştirir. Bu iki olay art arda gelen nesillerde türün olağan kromozom sayısının korunmasına hizmet eder.",
      "Mayoz önce bir DNA eşlenmesi, sonra iki bölünme içerir; döllenme yeni DNA eşlenmesi demek değildir. Kromozom sayısının 2n→n değişimini, DNA miktarının 2 C→4 C→2 C→C değişiminden ayrı izle.",
    ),
    section(
      "Zigot büyürken mayoz yapmaz",
      "Normal erken embriyo gelişiminde zigotun mitozları hücre sayısını artırır. İdeal eşzamanlı k turda bir zigottan 2ᵏ hücre oluşur; her hücre başlangıçtaki normal kromozom takımını korur. Gerçek dokularda tüm hücreler aynı anda bölünmeyebilir.",
      "Daha ileri gelişimde hücrelerin işlevleri farklılaşır; farklı hücre tipi oluşması her hücrede farklı kromozom sayısı gerektirmez. Bir dokunun şekli ve göreviyle hücredeki kromozom takımı aynı değişken değildir.",
    ),
    section(
      "Çeşitliliğin üç ayrı kaynağı",
      "Homolog kromozom çiftlerinin bağımsız yönelmesi farklı kökenleri birleştirebilir. Profaz I’de homologların kardeş olmayan kromatitleri arasındaki parça değişimi yeni alel birliktelikleri kurabilir. Hangi gametin hangisiyle birleşeceği de rastlantısal bir bileşim kaynağıdır.",
      "Bu süreçler mutlaka yeni alel üretmez; mevcut alelleri yeniden birleştirir. Yeni alel kaynağı mutasyonla ayrılır. Çeşitlilik her yavrunun farklı veya her koşulda daha başarılı olacağının garantisi değildir.",
    ),
    section(
      "Erselik ve kendini dölleme",
      "Erselik, aynı bireyin iki gamet tipinin üretimine uygun sistemlere sahip olmasıdır. Bazı türler kendini dölleyebilir; bazılarında farklı olgunlaşma zamanları veya uyumsuzluk mekanizmaları çapraz döllenmeyi destekler.",
      "Erselik olmak otomatik kendini döllemek, kendini döllemek ise eşeysiz olmak değildir. Döllenme gerçekleşiyorsa iki gametin alelleri birleşir. Buna karşılık bir bitki dalının köklendirilmesi vejetatif eşeysiz çoğalmadır.",
    ),
    section(
      "Bitkide polen ile gameti ayır",
      "Tohumlu bitkinin polen tanesi erkek gametofit yapısıdır; tek bir sperm hücresiyle özdeş değildir. Bitki yaşam döngüsünde mayoz sporlar oluşturabilir; haploit evrede gametler mitozla üretilebilir. Hayvanın doğrudan gamet mayozunu bütün canlılara yayma.",
      "Çiçek, polen taşınması, döllenme, tohum ve çimlenme farklı basamaklardır. Olağan döllenmeli tohum örneği eşeyli geçmiş taşır; genel biyolojide apomiksis gibi istisnalar bulunduğundan yalnız tohum sözcüğüyle koşulsuz evrensel hüküm kurma.",
    ),
    section(
      "Grafikte önce ekseni ve olayı adlandır",
      "DNA miktarı iki katına çıkınca kromozom sayısı hemen ikiye katlanmaz; kardeş kromatitler oluşmuş olabilir. DNA grafiği başlangıç kromozom adedi verilmeden mutlak kromozom sayısını tek başına söylemez.",
      "Soruyu çözerken önce hücreyi öncül, gamet veya zigot diye etiketle; sonra hücre başına ölçülen niceliği yaz. Son kontrolünde mayozun yarılama, döllenmenin birleştirme, mitozun normal takımı koruma işlevini kullan.",
    ),
  ],
  examples: [
    example(
      "Gamet ile zigotu aynı tabloda tut",
      "Bir hayvan türünde 2n=20. Olağan gametin ve döllenmeyle oluşan zigotun kromozom sayıları nedir?",
      "Önce her hücreyi takım sayısıyla etiketle.",
      [
        ["Gameti belirle", "Mayoz ürünü bir takımdır.", "20÷2=10"],
        ["Birleştir", "İki olağan haploit gamet birleşir.", "10+10=20"],
        [
          "Birim denetle",
          "Bunlar hücre sayısı değil hücre başına kromozomdur.",
          "",
        ],
      ],
      "Gamet 10; zigot 20 kromozom.",
      "Zigot türün diploit sayısına döner.",
      "2n=20 ifadesinden 20 gamet çıkarma.",
    ),
    example(
      "Büyüme sayımı",
      "2n=12 zigotun tüm hücreleri üç eşzamanlı normal mitoz turu geçiriyor; kayıp yok.",
      "Hücre adedini ve kromozom/hücreyi ayrı hesapla.",
      [
        ["Hücre sayısı", "Her tam turda sayı iki katlanır.", "1×2³=8"],
        ["Takım", "Normal mitoz takım sayısını korur.", "12 kromozom/hücre"],
        [
          "Toplam",
          "İstenirse bütün hücrelerdeki kromozom sayıları toplanır.",
          "8×12=96",
        ],
      ],
      "8 hücre; her birinde 12 kromozom.",
      "96 toplamı hücre başına 12 ile aynı cevap değildir.",
      "Mitoz sayısını kromozoma bölme.",
    ),
    example(
      "Tek birey, iki gamet",
      "Bir erselik bitkinin aynı bireyde üretilmiş iki tip gameti birleşerek zigot oluşturuyor. Bu eşeysiz midir?",
      "Gamet birleşmesini tanımın merkezine koy.",
      [
        ["Olay", "İki gametin kalıtsal içeriği birleşmiştir.", "Döllenme"],
        ["Birey", "Gamet kaynağı tek birey olabilir.", "Kendini dölleme"],
        ["Sonuç", "Birleşme olayı eşeyli üremeyle uyumludur.", ""],
      ],
      "Hayır; kendini döllemeyle eşeyli üremedir.",
      "Tek bireyden dal çeliğiyle çoğalma farklı bir mekanizmadır.",
      "Ata sayısını tek başına belirleyici sayma.",
    ),
    example(
      "Grafiğin söylemediği",
      "Bir çekirdeğin DNA miktarı 6→12 birim oluyor; hücrenin türü ve kromozom sayısı verilmemiş. Kromozom sayısı 12 midir?",
      "Ölçülen büyüklüğün birimini koru.",
      [
        ["Eksen", "Düşey değişken DNA miktarıdır.", "6→12 DNA birimi"],
        ["Olay", "Eşlenme ile uyumlu artış vardır.", "×2"],
        ["Sınır", "DNA kütlesinden mutlak kromozom adedi çıkmaz.", ""],
      ],
      "Kromozom sayısı belirlenemez.",
      "Aynı kromozom adedi farklı DNA miktarlarıyla bulunabilir.",
      "Birimleri sessizce değiştirme.",
    ),
  ],
  recall: [
    [
      "Eşeyli üreme için iki ayrı birey her zaman gerekli mi?",
      "Hayır; uygun erselik türde aynı bireyin gametleri döllenebilir.",
    ],
    [
      "Mayoz–döllenme–mitozun takım etkileri?",
      "Olağan modelde 2n→n; n+n→2n; normal mitozda 2n→2n.",
    ],
    [
      "n=8 neyi sayar?",
      "Bir haploit takımdaki 8 kromozomu; gamet sayısını değil.",
    ],
    [
      "Polen neden spermle eş anlamlı değil?",
      "Polen erkek gametofit yapısıdır; erkek gametleri üretme/taşıma işlevi görür.",
    ],
  ],
  questions: [],
});

data.push({
  id: "kalitima-giris",
  topic: "detail-25",
  title: "Kalıtıma giriş: alelden fenotipe, gametten olasılığa",
  objectives: [
    "Gen, alel ve lokusu örnek üzerinde ayır.",
    "Genotip–fenotip ve homozigot–heterozigot ilişkisini kur.",
    "Bağımsız gametleri koşulunu belirterek listele.",
  ],
  sections: [
    section(
      "DNA, gen ve kromozom aynı şey değildir",
      "DNA kalıtsal bilgiyi taşıyan moleküldür. Gen, işlevsel bir ürünün oluşumuna katkı sağlayan DNA bölgesidir; genlerin ve düzenleyici bölgelerin etkileri birlikte özelliklere yansır. Kromozom DNA ile proteinlerin örgütlenmiş yapısıdır.",
      "Bir kromozom çok sayıda gen lokusu taşır; bir gen bütün kromozom değildir. Gen–özellik ilişkisi her zaman bire bir değildir: çok genli özellikler ve bir genin birden çok etkisi olabilir. Başlangıç çaprazlamalarında tek gen modeli özellikle varsayılır.",
    ),
    section(
      "Lokus yer, alel sürümdür",
      "Lokus genin kromozom üzerindeki konumudur. Aleller aynı genin farklı sürümleridir. Otozomal diploit modelde homologların karşılıklı lokuslarında A ve a bulunabilir: biri anneden, biri babadan gelir.",
      "Homologlar aynı gen lokuslarını taşır fakat alelleri aynı olmak zorunda değildir. Kardeş kromatit ise eşlenme sonucu oluşan kopyadır. Homolog ile kardeşi karıştırırsan mayozda ayrılan yapıyı ve gametleri yanlış kurarsın.",
    ),
    section(
      "AA, Aa ve aa üç ayrı genotiptir",
      "Aynı lokusta iki aynı alel homozigot; farklı iki alel heterozigot durumu gösterir. AA ve aa homozigot, Aa heterozigottur. Bir gamette bu otozomal lokustan tek alel vardır: A veya a; Aa gamet yazmak iki aleli aynı haploit lokusa koyar.",
      "Birden çok lokusta her çifti ayrı oku: AaBBcc’de bir heterozigot, iki homozigot lokus vardır. Harf sayısını heterozigot lokus sayısı sanma; kromozom adedi de bu sembollerden doğrudan bulunamaz.",
    ),
    section(
      "Fenotip görünenden fazlasını kapsar",
      "Genotip ilgili alel bileşimidir; fenotip gözlenebilen veya ölçülebilen sonuçtur. Boy, enzim etkinliği veya pigment miktarı fenotip olabilir. Genlerin ifadesi ve çevre birçok fenotipe birlikte katkı sağlar.",
      "Aynı genotip farklı çevrelerde farklı boy verebilir; farklı fenotip tek başına farklı alel kanıtı değildir. Çevreyle oluşan değişimi her koşulda DNA dizisi mutasyonu sayma. Bir deneyde hangi değişkenin gerçekten ölçüldüğünü belirle.",
    ),
    section(
      "Baskınlık bir üstünlük sırası değildir",
      "Tam baskınlık modelinde AA ve Aa aynı baskın fenotipi, aa çekinik fenotipi gösterir. Baskın fenotipin genotipi yalnız AA değildir; Aa da olasıdır. Çekinik alel heterozigotta yok olmaz, gametlere aktarılabilir.",
      "Baskın alel daha iyi, daha sık, daha sağlıklı veya yeni olmak zorunda değildir. Eş baskınlık ve eksik baskınlıkta heterozigotun fenotipi farklı kurulur. Harfin büyüklüğü belirtilen modele ait gösterimdir; doğadaki tüm özellikleri iki sınıfa ayırmaz.",
    ),
    section(
      "Bağımsız gametleri tek tek kur",
      "AaBb gibi iki bağımsız heterozigot lokusta her gamet A/a ve B/b seçeneklerinden birer alel alır. Olası gametler AB, Ab, aB, ab; olağan eş ayrılma ve bağımsızlıkla her biri 1/4’tür.",
      "Genotipteki bağımsız heterozigot lokus sayısı h ise çeşit sayısı 2ʰ olur. AaBBcc için h=1 ve iki çeşit ABc, aBc vardır. 2ʰ bir gamet çeşidi hesabıdır; tek mayozda kaç farklı hücre çıkacağını zorunlu söylemez.",
    ),
    section(
      "Bağlı gen koşulunu görmezden gelme",
      "Aynı kromozom üzerindeki genler bağlıdır. AB/ab düzeninde parça değişimi yoksa AB ve ab ebeveyn tipleri birlikte taşınır. İki heterozigot lokus var diye dört eş olasılıklı gamet varsayılamaz.",
      "Bağlılık düzeni ve rekombinasyon oranı verilirse gamet payları hesaplanabilir. Dört türün mümkün olması dört türün eş oranda olduğu anlamına gelmez. Genlerin bağımsızlığı, her lokustaki ayrılma ve rastgele döllenme ayrı koşullardır.",
    ),
    section(
      "Çarpma, toplama ve kesinlik",
      "Bağımsız iki olayın birlikte gerçekleşme olasılıkları çarpılır. Aynı sonuca götüren birbirini dışlayan yollar toplanır: Aa×Aa’da heterozigot çocuk A+a veya a+A yollarıyla 1/4+1/4=1/2 olur. Örtüşen olaylar düz biçimde toplanmaz.",
      "Bir olasılık küçük ailede kesin oran değildir.1/4 olasılık dört çocuktan kesin birinin özelliği göstereceğini söylemez. Soruyu bitirirken olası genotipler kümesini koru; ek bilgi olmadan kesin kişi genotipi üretme.",
    ),
  ],
  examples: [
    example(
      "Baskın görünüm hangi genotip?",
      "Tam baskınlıkta uzun L, kısal aleline baskın. Uzun bireyin kesin genotipi nedir?",
      "Görünümü üretebilen bütün çiftleri listele.",
      [
        ["İhtiyaç", "En az bir L gerekir.", "L_"],
        ["Olasılıklar", "İkinci alel L veyal olabilir.", "LL veya Ll"],
        ["Eleme", "ll kısa verir.", ""],
      ],
      "LL veya Ll; tek genotip kesin değildir.",
      "Ll karşı örneği LL kesinliğini bozar.",
      "Baskın fenotipi homozigotla eşitleme.",
    ),
    example(
      "Üç lokus, iki seçim",
      "AABbCc bireyinde üç lokus bağımsız. Kaç gamet türü mümkündür?",
      "Homozigot lokusu seçimsiz bırak.",
      [
        ["A lokusu", "Yalnız A aktarılır.", "1"],
        ["B, C", "Her biri iki farklı alel verir.", "2×2"],
        [
          "Liste",
          "Her gamette üç lokustan birer alel vardır.",
          "ABC, ABc, AbC, Abc",
        ],
      ],
      "4 çeşit; her biri 1/4.",
      "1×2×2=4 ve paylar toplamı 1.",
      "Üç lokusu görüp 2³ yapma.",
    ),
    example(
      "Çevre kanıtı",
      "Aynı genotipli iki fide farklı ışıkta farklı boy veriyor. Boy farkı kesin genetik fark mıdır?",
      "Verilen genotip eşitliğini değiştirme.",
      [
        ["Gözlem", "Boy fenotiptir.", ""],
        ["Etken", "Çevre genlerin işleyişini ve büyümeyi etkileyebilir.", ""],
        ["Sınır", "Farklı alel sonucu zorunlu değildir.", ""],
      ],
      "Hayır; verilenlerle genetik fark kanıtlanmaz.",
      "Genotip aynı bilgisiyle çelişen sonuç kurma.",
      "Fenotip değişimini doğrudan mutasyon sayma.",
    ),
    example(
      "Tek lokusun iki yolu",
      "Aa×Aa için yavrunun Aa olma olasılığını iki farklı döllenme yoluyla hesapla.",
      "Anne-baba kökeni ayrı olan yolları listele.",
      [
        ["Birinci yol", "A gameti ilea gameti birleşir.", "1/2×1/2=1/4"],
        ["İkinci yol", "a gameti ile A gameti birleşir.", "1/2×1/2=1/4"],
        ["Topla", "İki yol aynı yavruda birlikte gerçekleşmez.", "1/4+1/4=1/2"],
      ],
      "1/2.",
      "AA ve aa payları da 1/4; toplam 1.",
      "Aa birleşmesini tek yol sayıp 1/4 bulma.",
    ),
  ],
  recall: [
    [
      "Homolog ile kardeş kromatit farkı?",
      "Homologlar anne-baba kökenli aynı lokusları taşır; kardeşler eşlenmiş kromozom kopyalarıdır.",
    ],
    [
      "AaBBcc’de bağımsız gamet türü?",
      "ABc ve aBc; yalnız Aa heterozigot olduğundan 2.",
    ],
    [
      "Baskın alel daha yaygın olmak zorunda mı?",
      "Hayır; baskınlık heterozigottaki fenotiple ilgili ilişkidir.",
    ],
    [
      "2n ve 2ʰ neden farklı?",
      "2n kromozom takımlarını,2ʰ bağımsız heterozigot lokuslardan gamet çeşidini gösterir.",
    ],
  ],
  questions: [],
});
data.push({
  id: "mendel-genetigi",
  topic: "detail-26",
  title: "Mendel genetiği: olası yavruyu gerekçesiyle hesapla",
  objectives: [
    "Ayrılma ve bağımsız dağılımı koşullarıyla uygula.",
    "Punnett karesi ve test çaprazlaması kur.",
    "Koşullu ve çoklu doğum olasılıklarını ayır.",
  ],
  sections: [
    section(
      "Bezelyeden deney tasarımına",
      "Mendel’in bezelyelerde farklı görülen karakterleri izlemesi, kontrollü döllenme ve çok yavruyu sayması nesiller arasındaki örüntüleri görünür kıldı. Bezelyenin kısa nesil süresi ve kendini dölleyebilmesi arı döllerin elde edilmesini kolaylaştırdı.",
      "Bir karakterin iki alternatifini incelemek deneysel bir sadeleştirmedir; her insan özelliği tek gen ve iki alelle açıklanmaz. P ata kuşağı, F1 ilk yavru, F2 sonraki çaprazlama kuşağıdır. Kuşak etiketini genotiple karıştırma.",
    ),
    section(
      "Ayrılma ilkesi gamette görünür",
      "Diploit bir lokusun iki aleli normal mayozda farklı gametlere ayrılır. Aa bireyi olağan eş ayrılmada A veya a gameti verir; her biri 1/2’dir. Homozigot AA yalnız A, aa yalnız a aktarır.",
      "Ayrılma alellerin yok olması veya baskın alelin ötekini ezmesi değildir. Çekinik görünüm F1’de gizli kalıp F2’de yeniden ortaya çıkabilir. Döllenme gametlerin birleşmesidir; büyük harf taşımak döllenme avantajı vermez.",
    ),
    section(
      "İlk çaprazlama ile kendileştirme farklıdır",
      "AA×aa çaprazlamasında tüm yavrular Aa’dır. Tam baskınlıkta hepsi baskın fenotip gösterir. F1 bireyleri Aa×Aa çaprazlanınca AA, Aa, Aa, aa dört eş olasılıklı birleşme oluşur.",
      "Genotip oranı 1:2:1; tam baskınlıkta fenotip oranı 3:1 olur. Bu dört kutu dört gerçek çocuk değil, eş olasılıklı birleşme yollarıdır. Eksik veya eş baskınlıkta aynı genotip oranı farklı fenotip oranına karşılık gelebilir.",
    ),
    section(
      "Punnett karesini ebeveynlerden kur",
      "Satıra bir ebeveynin, sütuna diğerinin gametlerini yerleştir. Her kutuda aynı lokustan iki aleli birleştir; Aa ve a A aynı genotiptir. Eş gametlerin yinelenmiş kutularının her biri olasılık ağırlığını korur.",
      "Aa×aa için sonuç Aa ve aa, her biri 1/2’dir; 3:1 kalıbı bu eşleşmeye ait değildir. Önce verilen genotipleri doğrula, sonra tabloyu kur. Hedef bir genotipse önce ilgili kutuları say, sonra fenotipe dönüştür.",
    ),
    section(
      "Bağımsız iki karakteri ayrı çöz",
      "AaBb×AaBb için genler bağımsız, her lokusta tam baskınlık ve olağan eş gametler varsayıldığında dört fenotipin payları 9/16,3/16,3/16,1/16’dır. Her iki çekinik için aa ve bb olayları 1/4×1/4=1/16 verir.",
      "Aynı çaprazlamada aaBb istenirse 1/4×1/2=1/8 bulunur. Baskın fenotip A_ demek AA veya Aa demektir. İki genin bağımsızlığı gösterilmediyse dört eş gamet ve 9:3:3:1 oranını otomatik kullanma.",
    ),
    section(
      "Test çaprazlamasında kanıtın yönü",
      "Baskın fenotipli A_ birey, aa ile çaprazlanabilir. Çekinik yavru aa oluşursa A_ ebeveynin a verebildiği ve baskın göründüğü birlikte değerlendirilir; ebeveyn Aa olmalıdır.",
      "Az sayıda yavrunun hepsinin baskın olması AA’yı kesin kanıtlamaz. Aa×aa eşleşmesinde dört bağımsız yavrunun hepsi Aa olma olasılığı (1/2)⁴=1/16’dır. Kanıt yokluğu ile kesin yokluğu ayır.",
    ),
    section(
      "Koşullu olasılık örnek uzayı değiştirir",
      "Aa×Aa yavrusunun Aa olma olasılığı 1/2’dir. Ama yavrunun baskın fenotipli olduğu biliniyorsa geriye AA, Aa, Aa yolları kalır; bunların ikisi Aa olduğundan koşullu olasılık 2/3’tür.",
      "Çekinik olmayanı seçmek doğumdaki genetik süreci değiştirmez; değerlendirilen grubu daraltır. Soruda tüm çocuklardan mı, yalnız özelliği göstermeyenlerden mi örnek seçildiğini belirtmeden 1/2 ile 2/3 arasında karar verme.",
    ),
    section(
      "En az biri, tam biri ve beklenti",
      "Aynı Aa×Aa çiftinin bağımsız üç doğumunda en az bir aa olasılığı 1−(3/4)³=37/64’tür. Tam bir aa için yer seçimi de gerekir: 3×(1/4)×(3/4)²=27/64. İki soru aynı olay değildir.",
      "Yüz yavruda beklenen aa sayısı 25’tir; gerçek gözlem tam 25 olmak zorunda değildir. Her yeni doğumun koşulları aynıysa önceki yavrunun sonucu sonraki olasılığı değiştirmez. Oranı zorunlu aile dağılımı diye sunma.",
    ),
  ],
  examples: [
    example(
      "Tek kare",
      "Aa×Aa için heterozigot ve çekinik yavru olasılıkları nedir?",
      "Her iki ebeveynin iki gametini yaz.",
      [
        ["Kare", "A, a ile A, a birleşir.", "AA, Aa, Aa, aa"],
        ["Heterozigot", "Dört yolun ikisi Aa.", "2/4=1/2"],
        ["Çekinik", "Dört yolun biri aa.", "1/4"],
      ],
      "Aa 1/2; aa 1/4.",
      "Tam baskınlıkta baskın fenotip 3/4.",
      "Genotip oranını fenotip oranıyla eşitleme.",
    ),
    example(
      "İki lokus",
      "Bağımsız AaBb×aaBb eşleşmesinde aabb olasılığı?",
      "Her lokusu verilen ebeveynlerle ayrı çöz.",
      [
        ["A lokusu", "Aa×aa için aa.", "1/2"],
        ["B lokusu", "Bb×Bb için bb.", "1/4"],
        ["Birlikte", "Bağımsız olayları çarp.", "1/2×1/4=1/8"],
      ],
      "1/8.",
      "A lokusunu Aa×Aa sanmak 1/16 yanlışını doğurur.",
      "Yalnız fenotip kalıbını ezberleme.",
    ),
    example(
      "Yalnız baskın çocuklar",
      "Aa×Aa yavrusunun baskın fenotipli olduğu biliniyor. Taşıyıcı Aa olasılığı?",
      "Çekinik yolu örnek uzayından çıkar.",
      [
        ["Uzay", "AA, Aa, Aa kalır.", "3 eş yol"],
        ["Hedef", "İki yol Aa’dır.", "2"],
        ["Koşul", "Hedefi yeni uzaya böl.", "2/3"],
      ],
      "2/3.",
      "Koşulsuz Aa olasılığı 1/2 idi; farklı soru.",
      "Paydayı eski 4 olarak bırakma.",
    ),
    example(
      "En az bir çekinik",
      "Üç bağımsız Aa×Aa doğumunda en az bir aa olasılığı?",
      "Hiç aa olmamasını çıkar.",
      [
        ["Tek doğum", "aa olmama 3/4.", ""],
        ["Üçü de değil", "Bağımsızlıkla çarp.", "(3/4)³=27/64"],
        [
          "Tümleyen",
          "En az bir, hiç yok olayının tümleyenidir.",
          "1−27/64=37/64",
        ],
      ],
      "37/64.",
      "Tam bir aa 27/64 olurdu.",
      "En az ile tamı karıştırma.",
    ),
  ],
  recall: [
    ["Aa×aa’da 3:1 olur mu?", "Hayır; Aa ve aa 1:1 olasılıklıdır."],
    [
      "Test çaprazlamasında çekinik yavru neyi kanıtlar?",
      "Baskın görünümlü ebeveynin Aa olduğunu, model koşullarında.",
    ],
    ["Aa×Aa baskın fenotipliler içinde Aa?", "2/3; koşulsuz 1/2 ileaynıdeğil."],
    [
      "9:3:3:1 için temel koşullar?",
      "İki bağımsız lokus, her ikisinde tam baskınlık ve eş olasılıklı olağan gametler.",
    ],
  ],
  questions: [],
});

data.push({
  id: "mendelden-sapmalar",
  topic: "detail-27",
  title: "Mendel’den sapmalar: baskınlık biçimi ve bağlılık",
  objectives: [
    "Eksik ve eş baskınlıkta heterozigot fenotipi ayır.",
    "Çok alellilik ile bir bireyin alel sayısını karıştırma.",
    "Bağlı genlerde ebeveyn ve rekombinant gametleri hesapla.",
  ],
  sections: [
    section(
      "Hangi varsayım değişti?",
      "Ayrılma, tam baskınlık ve bağımsız dağılım farklı ilişkilerdir. Bir heterozigotun fenotipi ara olduğunda aleller yine gametlere ayrılabilir; ancak 3:1 fenotip beklemek yanlıştır. Aynı kromozomdaki iki lokus için de bağımsızlık koşulu değişir.",
      "Mendel’den sapma etiketi bütün kalıtımın kuralsız olduğu anlamına gelmez. Soruyu önce hangi değişkenin etkilendiğine göre sınıflandır: heterozigot görünümü mü, popülasyondaki alel sayısı mı, iki lokusun birlikte taşınması mı?",
    ),
    section(
      "Eksik baskınlıkta ara fenotip",
      "Özgün çiçek modelimizde RR kırmızı, rr beyaz, Rr pembedir. Heterozigotun görünümü iki homozigottan ayrılır. Rr×Rr için genotip 1 RR:2 Rr:1 rr; fenotip de 1 kırmızı:2 pembe:1 beyazdır.",
      "Ara görünüm alellerin kalıcı olarak karışıp yeni bir alele dönüştüğünü göstermez. Pembe birey R ve r gameti verir; yalnız pembe adlı gamet üretmez. Rr×rr’de yarı pembe yarı beyaz beklenir.",
    ),
    section(
      "Eş baskınlıkta iki etkinin birlikte görünmesi",
      "Eş baskınlıkta heterozigot iki alelin belirlenmiş ürününü birlikte gösterir. MN kan grubunda M ve N antijenlerinin ikisi de bulunur; biri ötekini gizlemez ve tek bir ara antijene karışmaz.",
      "MM×NN tamamı MN; MN×MN sonuçları MM, MN, MN, NN şeklindedir. Genotip ve ayırt edilen fenotip sınıfı oranı 1:2:1 olur. Eksik baskınlıkla aynı sayısal oran, aynı biyolojik mekanizma demek değildir.",
    ),
    section(
      "Çok alel popülasyona, iki alel bireye aittir",
      "Bir lokusun popülasyonda ikiden fazla alel çeşidi bulunabilir. AB0 sisteminde A, B, O olmak üzere üç alel vardır; olağan diploit bir birey bu lokusta bunlardan en fazla ikisini taşır. Üç alel olduğu için bir bireye ABO genotipi yazılmaz.",
      "k alelin bütün homozigot ve heterozigot çiftleri mümkünse genotip çeşidi k (k+1)/2’dir. Üç alelde 3 homozigot+3 heterozigot=6 çeşit bulunur. Fenotip sayısı alellerin baskınlık ilişkilerine bağlıdır; yalnız formülden çıkmaz.",
    ),
    section(
      "Bağlılıkta kromozom düzenini yaz",
      "AaBb genotipi tek başına hangi alellerin aynı homolog üzerinde olduğunu söylemez. AB/ab aynı homologda A ile B; Ab/aB ise A ile b taşır. Bunlara sırasıyla cis ve trans düzen denebilir.",
      "Parça değişimi model dışında tutulursa AB/ab bireyi AB ve ab tiplerini; Ab/aB bireyi Ab ve aB tiplerini verir. Her ikisinin toplam genotipi AaBb olsa da ebeveyn gametleri farklıdır. Eğik çizgiyi homolog ayıracı olarak oku.",
    ),
    section(
      "Rekombinasyon yüzdesini dağıt",
      "İki lokus için rekombinant gamet oranı r verilmiş olsun. Simetrik okul modelinde iki rekombinant sınıfın her biri r/2, iki ebeveyn sınıfının her biri (1−r)/2 payındadır. AB/ab ve r=0,20 ise AB ve ab 0,40; Ab ve aB 0,10’dur.",
      "Rekombinasyon oranı iki lokus için 0 ile 0,50 arasındadır. Uzaklıkla kısa aralıklarda harita ilişkisi kurulabilir; çoklu parça değişimleri nedeniyle %50 üstü rekombinasyon kullanarak sınırsız doğrusal gen haritası çıkarılmaz. r=%50 bağımsız oranla uyumludur ama farklı kromozomda olmayı tek başına kanıtlamaz.",
    ),
    section(
      "Birden çok gen, birden çok etki",
      "Bir özellik birden fazla genin katkısıyla oluşabilir; boy gibi nicel özelliklere çevre de etki eder. Bir genin birden çok fenotipik etkisi de olabilir. Dolayısıyla her gözlenen farklılık için tek bir A/a çifti aramak yeterli değildir.",
      "Epistaz gibi genler arası etkileşimler de basit dihibrit fenotip sınıflarını değiştirebilir. Belirli bir oranı görüp mekanizmayı koşulsuz kesinleştirme; sorunun tanımladığı ürün, baskınlık ve lokus ilişkisini kullan.",
    ),
    section(
      "Değişen fenotip alel ayrılmasını bozmaz",
      "Eksik ve eş baskınlıkta heterozigotun görünümü farklı olsa bile normal mayozda her gamet ilgili lokustan bir alel alır. Bu nedenle aynı 1:2:1 genotip dağılımı, tam baskınlıkta 3:1 ve diğer iki modelde 1:2:1 fenotipe dönüşebilir.",
      "Çözümü bitirirken ayrı satırlara genotip, fenotip ve gamet paylarını yaz. Dört çeşit gamet bulduysan eş pay varsayımını yeniden kontrol et. Bağlılık ile eş baskınlık aynı soruda bulunsa bile iki ayrı ilişkiyi değiştirdiklerini unutma.",
    ),
  ],
  examples: [
    example(
      "Pembe çiçek",
      "RR kırmızı, rr beyaz, Rr pembe. Rr×Rr fenotip oranı?",
      "Önce değişmeyen genotip karesini kur.",
      [
        ["Kare", "R, r×R, r.", "RR, Rr, Rr, rr"],
        [
          "Fenotip",
          "Her genotipi verilen görünüme çevir.",
          "1 kırmızı, 2 pembe, 1 beyaz",
        ],
        ["Kontrol", "Rr iki aleli birlikte taşır.", ""],
      ],
      "1:2:1.",
      "Ara görünüm yeni bir gamet aleli değildir.",
      "Tam baskınlık 3:1 kalıbını kullanma.",
    ),
    example(
      "İki antijen",
      "MN eş baskın sisteminde MN×NN çaprazlaması.",
      "Gametleri ayır.",
      [
        ["Gamete geç", "MN → M, N; NN → N.", ""],
        ["Birleştir", "M+N ve N+N.", "MN, NN"],
        ["Pay", "İki yol eş olasılıklı.", "1/2,1/2"],
      ],
      "Yarı MN, yarı N fenotipi.",
      "MN iki antijen taşır; ara antijen oluşmaz.",
      "Eş baskınlığı eksik baskınlık sayma.",
    ),
    example(
      "Bağlı gametler",
      "AB/ab bireyinde rekombinasyon %20. Gamet payları?",
      "Toplamı ebeveyn ve rekombinant olarak ayır.",
      [
        ["Rekombinant", "Ab ve aB toplam 0,20.", "Her biri 0,10"],
        ["Ebeveyn", "AB ve ab toplam 0,80.", "Her biri 0,40"],
        ["Toplam", "Dört sınıfı kontrol et.", "0,4+0,1+0,1+0,4=1"],
      ],
      "AB %40, ab %40, Ab %10, aB %10.",
      "Bağımsız %25 kalıbına uymaz.",
      "%20’yi her rekombinanta ayrı yazma.",
    ),
    example(
      "Alel sayısı",
      "Popülasyonda bir otozomal lokusun dört aleli var. Bütün diploit çiftler mümkün. Genotip çeşidi?",
      "Aynı ve farklı çiftleri ayrı say.",
      [
        ["Homozigot", "Her alelin kendi çifti.", "4"],
        ["Heterozigot", "Dört alelden iki farklı alel seçilir.", "4×3/2=6"],
        ["Topla", "Tüm çiftler.", "4+6=10"],
      ],
      "10 genotip.",
      "4×5/2 aynı sonucu verir.",
      "Tek bireye 4 alel yerleştirme.",
    ),
  ],
  recall: [
    [
      "Eksik baskınlık alellerin kaynaşması mı?",
      "Hayır; heterozigotun fenotipi ara, gametleri ayrı alellidir.",
    ],
    [
      "MN heterozigotunun ayırıcı kanıtı?",
      "M ve N ürünlerinin birlikte bulunması.",
    ],
    ["AB/ab ve r=%10 ise AB payı?", "(1−0,10)/2=0,45."],
    [
      "Üç alel diploit bireyde kaç alel demek?",
      "Otozomal tek lokusta olağan birey en fazla ikisini taşır.",
    ],
  ],
  questions: [],
});
data.push({
  id: "kan-gruplari",
  topic: "detail-28",
  title: "Kan grupları: alel, antijen ve olasılığı ayır",
  objectives: [
    "AB0 genotiplerini antijen ve fenotiple eşleştir.",
    "AB0 ve Rh çaprazlamalarını koşullarıyla hesapla.",
    "Kalıtım modelini klinik kan uygunluğuyla karıştırma.",
  ],
  sections: [
    section(
      "AB0 bir lokus, üç yaygın alel",
      "Okul modelinde A, B, O olmak üzere üç alel gösterilir. Bilimsel gösterimde Iᴬ, Iᴮ ve i de kullanılır. A ve B birbirine eş baskın; O’ya karşı baskındır. AA ve AO, A grubunu; BB ve BO, B grubunu; AB, AB grubunu; OO ise O grubunu verir.",
      "AB0 lokusu otozomaldir. Olağan diploit birey bu lokusta iki alel taşır; üç alelin toplumda bulunması bir kişinin üçüne de sahip olması demek değildir. Nadir alt gruplar ve farklı antijen sistemleri bu temel modelin dışındadır.",
    ),
    section(
      "Antijen alyuvar, antikor plazmada",
      "A antijeni taşıyan alyuvar A, B antijeni taşıyan B; ikisini taşıyan AB, ikisini taşımayan O olarak sınıflanır. O alyuvarında hiçbir molekül yok denmez; yalnız A/B antijeni bulunmaz.",
      "Standart yetişkin AB0 tablosunda A grubunun plazmasında anti-B, B grubunda anti-A, O grubunda ikisi; AB grubunda bu iki antikor bulunmaz. Antijen ve antikorun yerini değiştirirsen kan hücresi ile plazma mantığını ters kurarsın.",
    ),
    section(
      "Fenotip genotipi her zaman belirlemez",
      "A fenotipli kişi AA veya AO; B fenotipli BB veya BO olabilir. AB ve O temel modelde sırasıyla AB ve OO ile gösterilir. Ebeveynin yalnız fenotipi verilmişse olası genotiplerin hepsini değerlendir.",
      "O çocuk iki ebeveynden de O aleli almıştır. A fenotipli ebeveynin O çocuğu varsa AO kesindir. Buna karşılık bir A çocuğu olması ebeveynin AA olduğunu kanıtlamaz. Sonucu verilen aileyle sınırlı tut.",
    ),
    section(
      "Çaprazlamada antikoru gamete koyma",
      "AO×BO eşleşmesinde gametler A/O ve B/O’dur. Birleşmeler AB, AO, BO, OO; her biri 1/4’tür. Dört kan grubu olasıdır. AB×OO eşleşmesinde AO ve BO, her biri 1/2 olur.",
      "Gametin taşıdığı aleldir; anti-A ve anti-B antikorları genotip harfi gibi gamet karesine konmaz. Alyuvarda görülen antijen ise gen ürününün fenotipik sonucudur. Bu üç düzeyi ayrı başlıklarla yaz.",
    ),
    section(
      "Rh modeli AB0’dan ayrıdır",
      "Temel RhD modelinde D antijeninin varlığı Rh+, yokluğu Rh− ile gösterilir. DD ve Dd pozitif, dd negatiftir. Rh gerçekte çoklu bileşenler içerir; tek lokuslu D/d modeli okul sorusunun sadeleştirmesidir.",
      "Rh− bireyde anti-D antikorunun doğuştan mutlaka bulunduğu söylenmez; uygun karşılaşma sonrası bağışıklık yanıtı gelişebilir. AB0’daki tipik antikor tablosunu Rh’ye aynen taşıma. Soru D/d modelini veriyorsa o sınırda hesap yap.",
    ),
    section(
      "İki sistemi birlikte hesaplarken",
      "AB0 ve RhD lokusları bağımsız kabul edilmişse her sistemi ayrı çöz ve istenen ortak fenotip olasılıklarını çarp. AO, Dd×BO, dd için AB0 grupları 1/4; Rh− olasılığı 1/2 olduğundan O, Rh− ortak payı 1/8’dir.",
      "Aynı tablodaki fenotipleri birleştirirken önce genotipleri doğru kur. Rh+ fenotipi tek başına DD demek değildir; bir Rh− çocuk, Rh+ ebeveynin Dd genotipli olduğunu gösterebilir. Üst üste A/B ve D/d baskınlık ilişkilerini birbirine karıştırma.",
    ),
    section(
      "Rh uyuşmazlığında risk ile kesin hastalık",
      "Rh− annenin Rh+ fetüsünün alyuvarlarına karşı önceden duyarlanmış bağışıklık yanıtı, plasentadan geçen antikorlarla sorun oluşturabilir. Bu okul anlatımı kalıtım ile bağışıklık süreçlerinin farklı basamaklarını bağlar.",
      "Rh− anne ve Rh+ baba bilgisi tek başına her fetüsün Rh+ veya mutlaka hasta olduğunu göstermez. İlk gebeliğin koşulsuz zararsız olduğu da söylenmez; önceki duyarlanma mümkündür. Koruma ve tedavi klinik izlemin konusudur; burada kesin tıbbi karar üretilmez.",
    ),
    section(
      "Kalıtım karesi klinik uygunluk testi değildir",
      "Basit AB0 alyuvar uyumluluğu öğretiminde alıcının antikoru ile vericinin A/B antijeni karşılaştırılır. Plazma verilmesi farklı yönde düşünülür; bütün kan, bileşenler, Rh ve başka antijen sistemleri ayrı değerlendirilir.",
      "O evrensel verici, AB evrensel alıcı gibi kısa ifadeler koşulsuz klinik talimat değildir. Uygunluk laboratuvar testleri ve sağlık ekibi kararı gerektirir. Ailede olası kan gruplarını bulmak da tek başına akrabalık kimliği kanıtlamaz.",
    ),
  ],
  examples: [
    example(
      "Dört fenotipli olasılık",
      "AO×BO için bir çocuğun AB0 gruplarını hesapla.",
      "İki gamet çiftini satır/sütuna koy.",
      [
        ["Gamet", "A/O ve B/O.", ""],
        ["Birleşmeler", "AB, AO, BO, OO.", "4 eş yol"],
        ["Fenotip", "AB, A, B, O.", "Her biri 1/4"],
      ],
      "Dört grubun her biri %25.",
      "Toplam olasılık 1 ve her çocuk aynı koşula tabidir.",
      "A fenotipini AA ile sınırlama.",
    ),
    example(
      "O çocuk genotipi açıklar",
      "A fenotipli ebeveyn ile O gruplu ebeveynin O çocuğu var. A ebeveynin genotipi?",
      "O çocuğun iki O alelinin kaynağını izle.",
      [
        ["Çocuk", "O grubu OO’dur.", "OO"],
        ["A ebeveyn", "O aktarmış olmalıdır.", "AO"],
        ["Denetle", "AO×OO ile AO ve OO mümkündür.", ""],
      ],
      "AO.",
      "AA×OO asla OO üretmez.",
      "A fenotipli her kişi AA değildir.",
    ),
    example(
      "AB0 ve Rh birlikte",
      "Bağımsız modelde AO, Dd×BO, dd. O, Rh− çocuk olasılığı?",
      "Her sistemi ayrı çöz.",
      [
        ["AB0", "AO×BO için OO.", "1/4"],
        ["Rh", "Dd×dd için dd.", "1/2"],
        ["Birlikte", "Bağımsızlıkla çarp.", "1/4×1/2=1/8"],
      ],
      "1/8.",
      "Diğer AB0 gruplarının Rh− payları da 1/8.",
      "Rh+ ebeveyni otomatik DD alma.",
    ),
    example(
      "İki başlık, iki bilgi",
      "Bir kişi AB grubunda. A/B antijenleri ve standart AB0 anti-A/anti-B antikorları nasıl?",
      "Hücre zarı ile plazmayı ayrı yaz.",
      [
        [
          "Alyuvar",
          "İki alelin ürünleri birlikte vardır.",
          "A ve B antijenleri",
        ],
        [
          "Plazma",
          "Temel yetişkin AB0 tablosunda ikisi bulunmaz.",
          "Anti-A/anti-Byok",
        ],
        ["Sınır", "Bu sonuç tüm klinik uygunluğu belirlemez.", ""],
      ],
      "İki antijen birlikte; bu iki AB0 antikoruyok.",
      "AB eş baskınlık örneğidir.",
      "AB’dehiçbir antikor yok gibi evrensel hüküm kurma.",
    ),
  ],
  recall: [
    ["A fenotipinin genotipleri?", "AA ve AO."],
    [
      "AB0’da antijen/antikorun yeri?",
      "Antijen alyuvar zarında; antikor plazmada.",
    ],
    ["AB×OO ile O çocuk mümkün mü?", "Temel modelde hayır; AO ve BO oluşur."],
    [
      "Rh− anne, Rh+ baba kesin hasta çocuk mu?",
      "Hayır; fetüs genotipi, duyarlanma ve klinik etkenler gerekir.",
    ],
  ],
  questions: [],
});

data.push({
  id: "eseyin-belirlenmesi",
  topic: "detail-29",
  title: "Eşey kromozomları: XX/XY modeli ve alelin yolu",
  objectives: [
    "Otozom ve eşey kromozomlarını say.",
    "X’e ve Y’ye bağlı aktarımı ayır.",
    "Koşullu oğul olasılığını tüm çocuk olasılığından ayır.",
  ],
  sections: [
    section(
      "Temel XX/XY modelinin sınırı",
      "İnsanın olağan diploit modelinde 22 çift otozom ve bir çift eşey kromozomu bulunur; toplam 46’dır. XX ve XY kromozom düzenleri standart okul modelinde karşılaştırılır. Kromozomlar, genler ve gelişim süreçleri birlikte biyolojik eşey özelliklerine katkı sağlar.",
      "Bu sade model gerçek gelişimin bütün çeşitliliğini, kromozom varyasyonlarını veya bireyin kimliğini tanımlamaz. Bir fenotipten kişinin kromozomlarını veya kimliğini kesin çıkarmak için kullanılmaz. Buradaki görev verilen kalıtım koşulunda alelin aktarımını izlemektir.",
    ),
    section(
      "Yumurta ile sperm kromozomları",
      "Olağan XX bireyin gameti 22 otozom+X; olağan XY bireyinki 22 otozom+X veya 22 otozom+Y taşır. Eş olasılıklı gamet ve rastgele birleşme modelinde XX ve XY zigot olasılıkları 1/2’dir.",
      "Toplam 23 kromozomlu spermde 23 otozom değil 22 otozom+bir eşey kromozomu vardır. Önceki doğumların sonucu sonraki birleşmede X/Y olasılığını değiştirmez; küçük ailede eşit sayıda XX ve XY çocuk garanti değildir.",
    ),
    section(
      "X ve Y bütünüyle homolog değildir",
      "X ve Y’nin eşleşmeye katkı sağlayan sınırlı homolog bölgeleri, ayrıca homolog olmayan bölgeleri vardır. X üzerindeki Y’de karşılığı olmayan bir lokusta XY birey tek alel taşır; bu duruma hemizigotluk denir.",
      "Eşey kromozomları yalnız eşey gelişimi genlerini taşımaz. X’e bağlı bir özellik her iki kromozom düzeninde de görülebilir; yalnız kızlarda bulunur sonucu yanlıştır. Bölgenin homolog olup olmadığını soru koşulundan oku.",
    ),
    section(
      "X’e bağlı çekinik özelliği yaz",
      "Basit modelde Xᴬ normal işlevli, Xᵃ çekinik özellik aleli olsun. XᴬXᴬ özelliği göstermez; XᴬXᵃ taşıyıcıdır; XᵃXᵃ gösterir. XᴬY göstermez, XᵃY gösterir. Y bu lokusta karşı alel değildir.",
      "Hemofili A/B ve bazı kırmızı-yeşil renk görme bozuklukları okul örnekleridir; her renk görme bozukluğu veya her kanama hastalığı aynı kalıtımı izlemez. Basitleştirilmiş tam ifade ve mutasyonsuz modelin dışına tanı genellemesi yapma.",
    ),
    section(
      "X’in anne-baba yolu",
      "Standart XX/XY döllenmede oğul X’i anneden, Y’yi babadan; kız bir X’i anneden, bir X’i babadan alır. Böylece babanın X’e bağlı aleli oğluna doğrudan aktarılmaz, bütün kızları babanın X’ini alır.",
      "Özelliği gösteren XᵃY baba ile XᴬXᴬ annenin kızları XᴬXᵃ taşıyıcı; oğulları XᴬY olur. Baba özelliği gösteriyor diye bütün çocukların veya bütün oğulların özelliği göstermesi beklenmez.",
    ),
    section(
      "Koşullu olasılığı ayrı hesapla",
      "XᴬXᵃ anne ve XᴬY babanın dört eş yolu XᴬXᴬ, XᴬY, XᴬXᵃ, XᵃY’dir. Özelliği gösteren çocuk olasılığı 1/4; oğul olduğu bilinen çocuğun özelliği gösterme olasılığı 1/2’dir.",
      "Hem erkek hem özelliği gösteren çocuk ile erkekler arasında özelliği gösteren çocuk farklı sorulardır. İlki tüm doğumları payda yapar, ikincisi yalnız XY sonuçlarını seçer. Kızlar arasında taşıyıcı olasılığı da 1/2, bütün çocuklar içinde taşıyıcı kız 1/4’tür.",
    ),
    section(
      "X’e bağlı baskın ile Y’ye bağlı farklıdır",
      "X’e bağlı baskın bir aleli taşıyan baba, standart tam ifade modelinde tüm kızlarına aktarır; oğullarına kendi X’ini vermez. Heterozigot XX ebeveyn ise her iki tür çocuğa 1/2 payla aktarabilir.",
      "Y’ye bağlı homolog olmayan bir lokusta aktarım standart modelde babadan oğula olur, kızlara olmaz. Hemizigot bölgede aleller için klasik iki alelli baskın/çekinik karşılaştırması kurulmaz. SRY gelişim yolunda önemlidir; tüm eşey özelliklerini tek başına kesinleştiren basit etiket değildir.",
    ),
    section(
      "Akrabalık, risk ve kesinlik",
      "Ortak atalı kişiler belirli çekinik alelleri birlikte taşıma bakımından daha yüksek olasılık paylaşabilir. Otozomal çekinik bir hastalık için iki taşıyıcının aynı lokusta Aa×Aa oluşturması her doğumda 1/4 aa olasılığı verir.",
      "Akrabalık yeni bir hastalık aleli üretmek veya her çocukta hastalık garantilemek değildir. Akraba olmayan kişiler de aynı çekinik alelin taşıyıcısı olabilir. Sağlık değerlendirmesi kişisel/ailevi verilere ve uzman danışmanlığına dayanır; okul karesi tek başına klinik karar değildir.",
    ),
  ],
  examples: [
    example(
      "23’ün bileşimi",
      "Olağan insan spermindeki kromozom bileşimini yaz.",
      "Otozomları eşey kromozomundan ayır.",
      [
        ["Otozom", "Diploit 44 otozom yarıya iner.", "22"],
        ["Eşey kromozomu", "Normal sperm X veya Y alır.", "1"],
        ["Toplam", "İki türün her birinde aynı toplam bulunur.", "22+1=23"],
      ],
      "22+X veya 22+Y.",
      "23 otozom yazmak 24 toplamına yol açar.",
      "n=23’ü 23 otozom sayma.",
    ),
    example(
      "Taşıyıcı anne",
      "XᴬXᵃ×XᴬY çekinik modelde tüm çocuklar ve oğullar arasında etkilenen payı?",
      "Dört birleşmeyi yaz.",
      [
        ["Kare", "XᴬXᴬ, XᴬXᵃ, XᴬY, XᵃY.", ""],
        ["Tüm çocuklar", "Tek etkilenen yol XᵃY.", "1/4"],
        ["Oğullar", "İki XY yolundan biri.", "1/2"],
      ],
      "Tümünde 1/4; oğullarda 1/2.",
      "İki farklı payda kullanıldı.",
      "Erkek çocuk koşulunu iki kez çarpma.",
    ),
    example(
      "Babanın X’i",
      "XᵃY baba ve XᴬXᴬ anne. Kız ve oğulların çekinik özellik durumu?",
      "Babanın X’inin hangi çocuklara geçtiğini izle.",
      [
        ["Kız", "Babadan Xᵃ, anneden Xᴬ.", "XᴬXᵃ"],
        ["Oğul", "Babadan Y, anneden Xᴬ.", "XᴬY"],
        ["Yorum", "Temel modelde kızlar taşıyıcı, oğullar göstermez.", ""],
      ],
      "Kızların tamamı taşıyıcı; oğullar özelliği göstermez.",
      "Babadan oğula Xaktarılmadı.",
      "Y’yi Xᴬgibi ikinci alel sayma.",
    ),
    example(
      "İki ardışık sonuç",
      "XX ve XY zigot olasılığı 1/2 ve doğumlar bağımsız. Üç XY doğumundan sonra sonraki XX olasılığı?",
      "Önceki sonuçla gamet modelini değiştirme.",
      [
        ["Koşul", "Yeni doğum aynı eş gamet olasılıklarını kullanır.", ""],
        ["Hesap", "X taşıyan sperm olasılığı.", "1/2"],
        ["Kontrol", "Geçmiş seri zorunlu denge borcu yaratmaz.", ""],
      ],
      "1/2.",
      "Üç geçmiş XY, sonrakini XX kesin yapmaz.",
      "Küçük ailede oran eşitlenmek zorunda değil.",
    ),
  ],
  recall: [
    [
      "Oğulun X’i nereden gelir?",
      "Standart XX/XY modelinde anneden; Y babadan.",
    ],
    [
      "XᵃY neden hemizigot?",
      "Y’nin ilgili homolog olmayan lokusunda ikinci alel yok.",
    ],
    [
      "Taşıyıcı anne/normal babada etkilenen oğul?",
      "Tüm çocuklar içinde 1/4; oğullar arasında 1/2.",
    ],
    [
      "Y’ye bağlı özellik kime geçer?",
      "Standart modelde babadan oğullara; kızlara değil.",
    ],
  ],
  questions: [],
});

data.push({
  id: "soy-agaclari",
  topic: "detail-30",
  title: "Soy ağaçları: kanıttan olası genotiplere",
  objectives: [
    "Sembol, kuşak ve akrabalık bağlantılarını doğru oku.",
    "Kalıtım modelini bütün kişilerde sınayarak ele.",
    "Kesin genotip ile olası genotip kümesini ayır.",
  ],
  sections: [
    section(
      "Önce şeklin dilini oku",
      "Standart okul soy ağacında kare XY erkek, daire XX dişi modelini; dolu simge incelenen özelliğin fenotipte görüldüğünü belirtir. Dolu kişi bütün sorularda aa değildir: bu anlam kalıtım modeline bağlıdır.",
      "Yatay eşleşme çizgisi ve aşağıya inen çocuk çizgisini takip et. Kuşaklar I, II, III; bireyler her kuşakta soldan sağa numaralanabilir. Şema gerçek kişilerin kimlikleri veya aile değerleri hakkında hüküm üretmez; özellik aktarımının temsili kaydıdır.",
    ),
    section(
      "Varsayımları şemanın üstüne yaz",
      "Temel sorularda tek lokus, tam baskınlık, tam penetrans, yeni mutasyon yokluğu ve olağan kromozom ayrılması varsayılabilir. Soru farklı bir koşul verirse o bilgi önceliklidir. Eksik bilgi her zaman birden fazla modele izin verebilir.",
      "Tek bir ailede benzer bir dağılım görmek kalıtım tipini kesin kanıtlamaz. Modelin mümkün olmasıyla tek mümkün model olması farklıdır. Uyuşmazlığı hemen mutasyon diye çözmek yerine sembol ve varsayımları yeniden kontrol et.",
    ),
    section(
      "Otozomal çekinikte dolu aa",
      "Özelliği göstermeyen ebeveynlerdenaaçocuk doğmuşsa her ebeveyn a vermiştir. İkisi de özelliği göstermediğinden AA değil Aa olmalıdır. Özelliği göstermeyen kardeşler ise AA veya Aa olabilir.",
      "aa ebeveyn her çocuğuna a verir. Bu ebeveynden doğmuş, özelliği göstermeyen çocuğun Aa olduğu kesindir. Başka aile bağlantısı olmayan özelliği göstermeyen kişiye yalnız bu nedenle kesin AA veya Aa etiketi verme.",
    ),
    section(
      "Otozomal baskında boş aa",
      "Tam baskınlık ve tam ifadede özelliği göstermeyenaa’dır; dolu kişi AA veya Aa olabilir. Dolu ebeveynin boşaaçocuğu varsa dolu ebeveynin a taşıdığı anlaşılır, yani Aa’dır.",
      "İki boşaa ebeveynin dolu çocuğu standart mutasyonsuz tek lokuslu otozomal baskın modelle uyuşmaz. Buna karşılık iki dolu Aa ebeveynin boşaaçocuğu mümkündür. Kuşak atlama sözü tek başına güvenilir model kanıtı değildir.",
    ),
    section(
      "X’e bağlı çekinikte baba-kız bağlantısı",
      "Çekinik özelliği gösteren XᵃXᵃ kız babadan Xᵃalmış olmalıdır; temel modelde babanın XᵃY olması gerekir. Özelliği göstermeyen babanın etkilenen kızı bu basit modeli eler.",
      "Etkilenen oğul Xᵃ’yı anneden alır; anne XᴬXᵃ veya XᵃXᵃ olabilir. Baba ile oğulda aynı fenotip görülmesi babadan oğula Xaktarımı kanıtı değildir. Anne üzerinden aynı alel gelmiş olabilir.",
    ),
    section(
      "X’e bağlı baskın ve Y’ye bağlı sınamalar",
      "Tam ifadeli X’e bağlı baskın modelde etkilenen babanın bütün kızları baba alelini alır ve etkilenir; oğullarına baba X’igeçmez. Etkilenmeyen bir kız varsa bu yalın model sorgulanır.",
      "Y’ye bağlı modelde etkilenen baba bütün oğullarına ilgili Y’yi aktarır, kızlarına aktarmaz. Etkilenen kız bu modeli eler. Yalnız erkeklerde birkaç etkilenmiş kişi görmek Ykalıtımını kanıtlamaz; X’e bağlı veya otozomal model de uyabilir.",
    ),
    section(
      "Aynı kişide bütün bağlantıları birleştir",
      "Bir kişinin genotipini anne-baba, kendi fenotipi, kardeş ve çocuk kanıtları birlikte sınırlar. Çocuğu Aa olabilen bir kişiye mutlaka AA denmez; bütün uyumlu olasılıkları sakla ve yalnız yeni kanıtla ele.",
      "Olasılık sorulursa önce kesin ebeveyn genotipini bul; bilinmiyorsa koşul veya öncül dağılımı olmadan tahmin etme. Aa×Aa ailesinde yalnız özelliği göstermeyen çocuk seçilmişse taşıyıcı olasılığı 2/3; bütün çocuklarda 1/2’dir.",
    ),
    section(
      "Çözümü karşı örnekle denetle",
      "Kesin bir önerme bütün uyumlu genotip atamalarında doğru olmalıdır. Bir kişinin AA veya Aa olması mümkünse her ikisini de dene. Tek bir geçerli karşı örnek, bütün çocuklar aynı olacak iddiasını çürütür.",
      "Soy ağacı etkileşimimiz küçük bir ailede beş basit modeli olasılık önceliği vermeden dener. Uyumlu model sayısı bir istatistiksel hastalık riski değildir. Gerçek aile genetiği ve klinik değerlendirme bu örnek çizimden daha kapsamlı veri gerektirir.",
    ),
  ],
  examples: [
    example(
      "İki boş ebeveyn, dolu kız",
      "Tek otozomal çekinik modelde özelliği göstermeyen iki ebeveynin etkilenen kızı var. Ebeveynler?",
      "Dolu çocuğun iki alelinin kaynağını izle.",
      [
        ["Çocuk", "Etkilenenaa.", ""],
        ["Katkı", "Her ebeveyn a vermiştir.", "a+a"],
        ["Fenotip", "Ebeveynleraaolmadığından Aa olmalıdır.", "Aa×Aa"],
      ],
      "İki ebeveyn de Aa.",
      "AA ebeveyn a veremeyeceği için elenir.",
      "Etkilenmeyen kişi kesin AA değildir.",
    ),
    example(
      "Baskın özelliğin boş çocuğu",
      "Otozomal baskın tam ifadeli modelde etkilenen ebeveyn ile aaeşinin boşaaçocuğu var. Etkilenen ebeveyn?",
      "Çocuğa aktarılan çekinik aleli kullan.",
      [
        ["Boş çocuk", "aa olmalıdır.", ""],
        ["Etkilenen ebeveyn", "a aktarmış ama fenotipi baskın.", "Aa"],
        ["Test", "Aa×aa ile aa oluşur.", "1/2"],
      ],
      "Aa.",
      "AA×aa ilebütün çocuklar Aa olurdu.",
      "Dolu ebeveyni AA yaotomatik yerleştirme.",
    ),
    example(
      "Bir modelin elenmesi",
      "Tam ifade ve mutasyon yok. Özelliği göstermeyen babanın özelliği gösteren kızı var. X’e bağlı çekinik model mümkün mü?",
      "Kızın babadan alması gereken X’i izle.",
      [
        ["Kız", "Gösteren kız XᵃXᵃ olmalı.", ""],
        ["Baba katkısı", "Baba Xᵃvermeliydi.", "XᵃY"],
        ["Çelişki", "Bu baba özelliği gösterirdi; verilenle uyuşmaz.", ""],
      ],
      "Bu temel model elenir.",
      "Otozomal çekinik gibi başka modeller ayrıca sınanabilir.",
      "Elenen tek modeli bütün genetik açıklamaların yokluğu sayma.",
    ),
    example(
      "Kardeşin koşullu payı",
      "Aa×Aa ailesinde özelliği göstermeyen bir çocuk seçiliyor. Aa olma olasılığı?",
      "Çocuktaaaolamayacağı koşulunu uygula.",
      [
        ["Başlangıç", "AA, Aa, Aa, aa eş yollar.", ""],
        ["Koşul", "aa çıkar; üç yol kalır.", "AA, Aa, Aa"],
        ["Pay", "İki taşıyıcı yol vardır.", "2/3"],
      ],
      "2/3.",
      "Kardeşin fenotipi biliniyorsa payda değişir.",
      "Tüm çocuklar içindeki 1/2’yi koşullu soruya taşıma.",
    ),
  ],
  recall: [
    [
      "Dolu simge her modelde aa mı?",
      "Hayır; kalıtım modeline göre genotip değişir.",
    ],
    [
      "Çekinik aa ebeveynin etkilenmeyen çocuğu?",
      "Temel modelde Aa; aebeveynden kesin gelmiştir.",
    ],
    [
      "Tek uyumlu karşı örnek neyi bozar?",
      "Kesin veya bütün şeklindeki evrensel çıkarımı.",
    ],
    [
      "Uyumlu model sayısı hastalık riski midir?",
      "Hayır; öncül olasılıklar ve aile verileri olmadan risk yüzdesi değildir.",
    ],
  ],
  questions: [],
});
type Item = [string, string, [string, string, string, string], string, string];
const banks: Item[][] = [
  [
    [
      "Bir hayvan türünde olağan vücut hücresi 2n=22. Haploit gamette kaç kromozom bulunur?",
      "11",
      ["22", "44", "2", "Gamet adedi verilmeden hesaplanamaz"],
      "Diploit iki takım 22 ise tek takım 11’dir. Burada istenen gamet başına kromozomdur; kaç gamet oluştuğu ayrı değişkendir.",
      "Önce hücreyi n veya 2n olarak etiketle.",
    ],
    [
      "n=9 yumurta ile aynı türünn=9 spermi normal dölleniyor. Zigotun kromozom sayısı nedir?",
      "18",
      ["9", "4", "36", "81"],
      "Döllenme iki haploit takımı birleştirir:9+9=18. Kromozom sayıları çarpılmaz ve yeni zigot haploit kalmaz.",
      "Birleşen iki takımın sayılarını topla.",
    ],
    [
      "2n=14 zigotun bütün hücreleri iki eşzamanlı normal mitoz turu geçiriyor. Kayıp yok. Sonuç hangisidir?",
      "4 hücre; her hücre 14 kromozom",
      [
        "2 hücre; her hücre 7 kromozom",
        "4 hücre; her hücre 7 kromozom",
        "14 hücre; her hücre 4 kromozom",
        "4 hücre; her hücre 56 kromozom",
      ],
      "İki tam tur 1→2→4 hücre yapar. Normal mitoz takım sayısını korur; 56 ancak dört hücredeki kromozomların toplamıdır.",
      "Hücre sayısı ile kromozom/hücreyi ayır.",
    ],
    [
      "Aynı erselik bireyin oluşturduğu iki tip gamet birleşerek zigot yapıyor. Bu olay için hangi değerlendirme doğrudur?",
      "Kendini döllenmeyle eşeyli üreme mümkündür",
      [
        "Tek birey olduğu için zorunlu eşeysizdir",
        "Gamet birleşmesi mitozdur",
        "Zigot oluşmamıştır",
        "Her iki gamet diploit olmalıdır",
      ],
      "Ölçüt gametlerin birleşmesidir; farklı birey sayısı zorunlu tanım değildir. Erselik bazı türlerde kendini döllemeye olanak verir, her erseliğin bunu yaptığı söylenmez.",
      "Birey adedi yerine olayın tanımını kullan.",
    ],
    [
      "DNA miktarı 4→8 birim artan bir çekirdeğin başlangıç kromozom sayısı verilmemiş. Hangi çıkarım güvenlidir?",
      "DNA miktarı iki katlanmıştır; mutlak kromozom sayısı belirlenemez",
      [
        "Kromozom sayısı kesin 8 olmuştur",
        "İki gamet döllenmiştir",
        "Kromozom sayısı kesin yarıya inmiştir",
        "Sekiz hücre oluşmuştur",
      ],
      "Ölçülen değişken DNA miktarıdır. Eşlenme kardeş kromatit oluşturabilir; DNA birimleri doğrudan kromozom veya hücre adedine çevrilemez.",
      "Eksenin birimini koru.",
    ],
    [
      "Olağan diploit hayvan modelinde gamet oluşumu, gamet birleşmesi ve zigotun hücre sayısının artışı sırasıyla hangileriyle ilişkilidir?",
      "Mayoz, döllenme, mitoz",
      [
        "Mitoz, mayoz, döllenme",
        "Döllenme, mitoz, mayoz",
        "Mayoz, mitoz, mayoz",
        "Döllenme, döllenme, mayoz",
      ],
      "Mayoz gamet takımını azaltır; döllenme iki gameti birleştirir; normal mitoz zigottan çok hücreli gelişimde hücre sayısını artırır. Bu sıra verilen hayvan modeline aittir.",
      "Üç olayın işlevini ayrı yaz.",
    ],
    [
      "Tohumlu bir bitkide polen ile sperm hücresi ilişkisi için hangisi doğrudur?",
      "Polen erkek gametofit yapısıdır; tek bir sperm hücresiyle özdeş değildir",
      [
        "Polen mutlaka tek bir sperm hücresidir",
        "Polen bir dişi gamettir",
        "Polen oluşumu döllenmenin kendisidir",
        "Polen hiçbir hücresel yapı taşımaz",
      ],
      "Polen erkek gametleri oluşturma/taşıma işlevi gören yapıdır. Polen taşınması ile sperm-yumurta birleşmesi farklı basamaklardır; adlar birbirinin yerine geçmez.",
      "Taşıyan yapı ile gameti ayır.",
    ],
    [
      "Mayoz ve rastgele döllenmenin çeşitliliğe katkısı hakkında hangi ifade uygundur?",
      "Farklı alel bileşimlerinin oluşabilmesine katkı sağlar",
      [
        "Her yavru kesin tüm çevrelerde daha başarılıdır",
        "Her kardeş kesin farklı genotiplidir",
        "Mevcut alellerin hepsi yok olur",
        "Her gamet zorunlu yeni alel üretir",
      ],
      "Bu mekanizmalar mevcut alel bileşimlerini yeniden düzenleyebilir. Genetik benzersizlik veya yaşama başarısı garantisi vermez; yeni alel oluşumu mutasyonla ayrıca değerlendirilir.",
      "Olasılık ile kesinliği ayır.",
    ],
    [
      "Olağan diploit türün zigotu 16 kromozomludur. İki normal haploit gametin her birinin kromozom sayısı nedir?",
      "8",
      ["16", "32", "4", "Zigot sayısı belirtilmeden bilinemez"],
      "Zigot iki haploit takımdır; her gamet 16/2=8 taşır. Bu sonuç normal diploit zigot ve haploit gamet koşullarıyla sınırlıdır.",
      "Zigottan her takıma geri git.",
    ],
    [
      "Bir bitkinin dalı köklendirilip yeni birey yapılıyor; başka bir olayda iki gamet dölleniyor. Hangisi doğrudur?",
      "İlki vejetatif eşeysiz, ikincisi eşeyli yoldur",
      [
        "İkisi de döllenmedir",
        "İlki mutlaka mayozla zigot üretir",
        "Gamet birleşmesi eşeysizdir",
        "Yeni birey oluşması her zaman eşeyliyi gösterir",
      ],
      "Dal çeliği somatik dokudan yeni birey başlatır; ikinci olayın ayırıcı basamağı gamet birleşmesidir. Her ikisinde yeni birey olması mekanizmaları aynı yapmaz.",
      "Yeni bireyin hangi başlangıçtan geliştiğini izle.",
    ],
  ],
  [
    [
      "A ve a aynı genin farklı sürümleridir. Bu iki simgenin ilişkisi nasıl adlandırılır?",
      "Alel",
      [
        "İki farklı kromozom takımı",
        "İki ayrı canlı türü",
        "İki farklı hücre organeli",
        "İki gamet adedi",
      ],
      "Alel aynı genin varyantıdır. Lokus bunun kromozomdaki yeri, kromozom ise birçok gen bölgesi taşıyan DNA-protein yapısıdır.",
      "Yer ile sürümü ayır.",
    ],
    [
      "Tam baskınlıkta A uzun, a kısa fenotip veriyor. Uzun bir bireyin olası genotipleri nelerdir?",
      "AA ve Aa",
      ["Yalnız AA", "Yalnızaa", "Aa ve aa", "AA ve aa"],
      "AA ve Aa en az bir A aleliyle baskın fenotip verir. aa çekinik görünür; yalnız uzunluk bilgisi ikinci aleli kesinleştirmez.",
      "Heterozigot karşı örneğini dene.",
    ],
    [
      "AaBBcc genotipinde kaç heterozigot lokus vardır?",
      "1",
      ["2", "3", "4", "6"],
      "Yalnız Aa iki farklı alel taşır; BB veccaynı alelli homozigottur. Büyük harfli olmak heterozigot olmak demek değildir.",
      "Her harf çiftini ayrı karşılaştır.",
    ],
    [
      "Bağımsız AaBBcc bireyinin olası gametleri hangi kümedir?",
      "ABc, aBc",
      ["Aa, BB, cc", "ABC, AbC, aBC, abC", "AaBBcc", "ABc, Abc, aBc, ab c"],
      "A/aiki seçenek, B yalnız B, cyalnızcverir; 1 heterozigot lokus 2 gamet türü üretir. Gamet her lokustan tek alel taşır.",
      "Sab it lokusları çoğaltma.",
    ],
    [
      "Genlerin bağımsız olduğu AABbCc bireyinin gamet çeşidi kaçtır?",
      "4",
      ["2", "3", "6", "8"],
      "Bb ve Cc heterozigot iki bağımsız lokustur; 1×2×2=4 çeşit vardır. Üç lokusun tamamınıheterozigot saymak 8 yanlışını doğurur.",
      "Üs yalnız farklı alelli bağımsız lokus sayısıdır.",
    ],
    [
      "Aynı genotipli fideler farklı ışıkta farklı boylara ulaşıyor. Hangi çıkarım güvenlidir?",
      "Fenotip çevreden etkilenebilir; fark tek başına farklı alel kanıtı değildir",
      [
        "Her boy farkı kesin DNA mutasyonudur",
        "Genotip ile fenotip aynı kavramdır",
        "Işık alelleri zorunlu değiştirir",
        "Farklı boy farklı türü kesin kanıtlar",
      ],
      "Boy ölçülen fenotiptir. Verilen genotip eşitliğini koruyarak çevrenin etkisini değerlendirmek gerekir; DNA dizisi değişimi veya tür farkı verilmiyor.",
      "Verilen genotip eşitliğini silme.",
    ],
    [
      "Tam baskınlıkta Aa bireyinin oluşturduğu normal gametler için hangisi doğrudur?",
      "A veya a taşır; çekinik alel yok olmaz",
      [
        "Yalnız A taşır",
        "Aa taşır",
        "Yalnıza taşır",
        "Her gamette iki A vardır",
      ],
      "Normal ayrılmada bir lokusun iki aleli farklı gametlere gider. Baskın fenotip a alelinin genotipten silindiği anlamına gelmez.",
      "Haploit lokusta tek alel bulunur.",
    ],
    [
      "AB/ab düzeninde iki lokus bağlı ve parça değişimi yok. Hangi gamet tipleri beklenir?",
      "AB ve ab",
      ["AB, Ab, aB, ab zorunlu eşit", "Yalnız AaBb", "Aa ve Bb", "AA vebb"],
      "A ile B bir homologda, a ile b diğerindedir. Parça değişimi dışlandığında ebeveyn birliktelikleri korunur; dört eş gamet bağımsızlık varsayımı ekler.",
      "Eğik çizgiyi homolog sınırı olarak oku.",
    ],
    [
      "Bağımsız Aa×Aa çiftinde Aa yavru iki ayrık yolla oluşur. Toplam Aa olasılığı kaçtır?",
      "1/2",
      ["1/4", "3/4", "1", "0"],
      "A+a ve a+A yollarının her biri 1/4’tür; birbirini dışlayan yollar toplanır ve 1/2 bulunur. Aynı genotip için iki köken yolu olduğu unutulmamalıdır.",
      "Aynı sonuca giden yolları ayrı yaz.",
    ],
    [
      "Bir alelin baskın olması hangi anlama gelir?",
      "Verilen tam baskınlık modelinde heterozigot fenotipte etkisinin görülmesi",
      [
        "Daima toplumda en sık alel olması",
        "Her koşulda yararlı olması",
        "Çekinik aleli DNA’dan silmesi",
        "Mutlaka daha yeni mutasyon olması",
      ],
      "Baskınlık alellerin heterozigottaki fenotip ilişkisidir. Yaygınlık, yararlılık ve evrimsel yaş hakkında tek başına bilgi vermez.",
      "Genetik gösterimi üstünlük sırasına çevirme.",
    ],
  ],
  [
    [
      "Tam baskınlıkta Aa×Aa yavrusununaaolma olasılığı nedir?",
      "1/4",
      ["1/2", "3/4", "1", "0"],
      "A, a×A, akarede AA, Aa, Aa, aa oluşturur. Dört eş yoldan yalnız biri aa’dır; bu her dört doğumda kesin bir aa garantisi değildir.",
      "Her iki ebeveynin gametlerini yaz.",
    ],
    [
      "Tam baskınlıkta Aa×aa yavrusunun baskın fenotipli olma olasılığı?",
      "1/2",
      ["1/4", "3/4", "1", "0"],
      "Aa ebeveyni A/averir, aa ebeveyni yalnıza. Aa baskın ve aa çekinik eş olasılıklıdır; Aa×Aa’nın 3:1 oranı burada kullanılmaz.",
      "İkinci ebeveyni yanlışlıkla Aa yapma.",
    ],
    [
      "AA×aa çaprazlamasında normal yavruların genotipi nedir?",
      "Tamamı Aa",
      ["Tamamı AA", "Tamamıaa", "Yarı AA yarıaa", "AA:Aa:aa=1:2:1"],
      "AA yalnız A, aa yalnızaaktarır; bütün birleşmeler Aa olur.1:2:1 dağılımı Aa×Aa’ya aittir.",
      "Tek tip gametleri birleştir.",
    ],
    [
      "İki lokus bağımsız. AaBb×AaBb için aabb olasılığı kaçtır?",
      "1/16",
      ["1/4", "1/8", "3/16", "9/16"],
      "aa olasılığı 1/4 ve bb olasılığı 1/4’tür. Bağımsızlıkla çarpılır:1/16.9/16 iki baskın fenotipe aittir.",
      "İstenen iki çekinik koşulu ayrı hesapla.",
    ],
    [
      "Bağımsız AaBb×aaBb eşleşmesinde aabb olasılığı?",
      "1/8",
      ["1/16", "1/4", "1/2", "3/8"],
      "Aa×aa için aa 1/2; Bb×Bb için bb 1/4. İki bağımsız koşulun çarpımı 1/8’dir; ilk lokusu Aa×Aa sayma.",
      "Her lokusta gerçek ebeveynleri kullan.",
    ],
    [
      "Baskın A_ birey aa ile çaprazlanınca bir aa yavru oluşuyor. Tam baskınlık ve mutasyon yoksa A_ nedir?",
      "Aa",
      ["AA", "aa", "A", "Kesinlikle belirlenemez"],
      "aa çocuk A_ ebeveynden a almıştır. Ebeveyn baskın göründüğü için A da taşır; sonuç Aa’dır. AA ebeveyn a veremez.",
      "Çocuğun çekinik alelinin kaynağını izle.",
    ],
    [
      "Aa×aa test çaprazlamasında dört bağımsız yavrunun hepsinin Aa olma olasılığı?",
      "1/16",
      ["0", "1/4", "1/2", "1"],
      "Her doğumda Aa olasılığı 1/2’dir; dört bağımsız doğumda (1/2)⁴=1/16. Bu olay mümkün olduğu için dört baskın yavru AA ebeveyni kesinleştirmez.",
      "Aynı olasılığı dört kez çarp.",
    ],
    [
      "Aa×Aa yavrusunun baskın fenotipli olduğu biliniyor. Aa olma olasılığı nedir?",
      "2/3",
      ["1/2", "1/4", "3/4", "1/3"],
      "AA, Aa, Aa yolları koşulu sağlar; üç eş yolun ikisi Aa’dır. Koşulsuz 1/2 payını kullanmak örnek uzayını daraltmayı unutur.",
      "aa yolunu çıkarıp yeniden oranla.",
    ],
    [
      "Üç bağımsız Aa×Aa doğumunda en az bir aa olasılığı?",
      "37/64",
      ["27/64", "1/4", "3/4", "1/64"],
      "Hiçaa olmaması (3/4)³=27/64’tür; tümleyeni 37/64.27/64 burada aynı zamanda tam bir aa olayının payıdır, en az biri değildir.",
      "Önce hiçbirindeolmama olayını bul.",
    ],
    [
      "Bağımsız ve tam baskın iki lokusta AaBb×AaBb için 9:3:3:1 hangi dağılımdır?",
      "Dört fenotip sınıfının beklenen oranı",
      [
        "Dört genotipin zorunlu aile sayısı",
        "Gametlerin kesin oranı",
        "Tek mayozdaki kromozom sayısı",
        "Her koşulda bütün iki lokusların oranı",
      ],
      "9:3:3:1 fenotip sınıflarını bağımsızlık/tam baskınlık altında verir. Genotip çeşidi dokuzdur; dört gamet ise 1:1:1:1 oranındadır.",
      "Fenotip, genotip ve gameti ayrı tut.",
    ],
  ],
  [
    [
      "RR kırmızı, rr beyaz, Rr pembe eksik baskınlık modelinde Rr×Rr fenotip oranı?",
      "1 kırmızı:2 pembe:1 beyaz",
      ["3 kırmızı:1 beyaz", "Tümüpembe", "1 kırmızı:1 beyaz", "9:3:3:1"],
      "RR, Rr, Rr, rr genotipleri üç ayrı fenotip verir.3:1 aynı iki genotipin fenotipçe birleştiği tam baskınlığa aittir.",
      "Her genotipi verilen görünüşe çevir.",
    ],
    [
      "Eksik baskınlıkta Rr pembe birey normal gametlerinde hangi alelleri taşır?",
      "R veya r",
      [
        "Yalnız pembe adlı yeni alel",
        "Her gamette Rr",
        "Yalnız RR",
        "Hiç alel taşımaz",
      ],
      "Ara fenotip alellerin kalıcı kaynaşması değildir; normal mayozda R ve rayrılır. Gamet diploit genotip taşımaz.",
      "Fenotip adını alel sanma.",
    ],
    [
      "M ve N antijenlerinin ikisini de taşıyan MN heterozigotu hangi ilişkiyi örnekler?",
      "Eş baskınlık",
      [
        "Eksik baskınlık",
        "Yalnız çekiniklik",
        "Alel kaybı",
        "İki ayrı tür oluşumu",
      ],
      "İki alelin belirlenmiş ürünleri birlikte görülür; tek bir ara ürün oluştuğu söylenmez. Bu eş baskınlıktır.",
      "Birlikte ürün ile ara görünümü ayır.",
    ],
    [
      "Eş baskın MN×NN modelinde yavru fenotiplerinin olasılıkları?",
      "MN 1/2, N1/2",
      ["M1/2, N1/2", "Tümü MN", "M1/4, MN 1/2, N1/4", "Tümü N"],
      "M/N gametleri ile yalnız N gameti birleşir; MN ve NN yarı yarıyadır. MM oluşması için iki M gameti gerekir, burada mümkün değildir.",
      "NN ebeveyninden M ekleme.",
    ],
    [
      "Bir otozomal lokusun popülasyonda üç aleli var. Olağan diploit birey aynı lokusta en fazla kaçını taşır?",
      "2",
      ["1", "3", "4", "6"],
      "Popülasyonun alel çeşitliliği ile bir bireyin lokustaki alel sayısı farklıdır. Diploit birey iki homologda en fazla iki alel taşır.",
      "Toplum ile birey düzeyini ayır.",
    ],
    [
      "Dört alelli otozomal lokusta bütün diploit çiftler mümkün. Kaç farklı genotip vardır?",
      "10",
      ["4", "6", "8", "16"],
      "Dört homozigot ve dört alelden seçilen altı farklı heterozigot çift vardır; toplam 10. Sıra farkını ayrı genotip saymak 16 yanlışını oluşturur.",
      "AA ile AB ve BA farkını düşün.",
    ],
    [
      "AB/ab bağlı düzende rekombinasyon %20. AB gameti olasılığı?",
      "%40",
      ["%10", "%20", "%25", "%80"],
      "Rekombinant toplam %20 ise ebeveyn toplamı %80’dir; simetrik iki ebeveyn tipinin her biri %40. AB ebeveyn tipidir.",
      "Önce AB’nin ebeveyn mi rekombinant mı olduğunu bul.",
    ],
    [
      "Ab/aB bağlı düzende rekombinasyon %10. AB gameti olasılığı?",
      "%5",
      ["%45", "%10", "%25", "%90"],
      "Bu düzende AB rekombinanttır. İki rekombinant sınıf toplam %10’u eş paylaşır; her biri %5’tir. AB/ab düzeninin %45 ebeveyn payı burada taşınamaz.",
      "Homolog yerleşimini mutlaka oku.",
    ],
    [
      "İki lokusta dört gametin her biri %25 gözlenmesi hangi çıkarımı zorunlu kılar?",
      "Bu oran tek başına lokusların farklı kromozomlarda olduğunu kanıtlamaz",
      [
        "Mutlaka aynı lokusturlar",
        "Kesinlikle hiç rekombinasyon yoktur",
        "Her tek mayoz dört farklı gamet yapar",
        "Popülasyondaki bütün genler bağımsızdır",
      ],
      "%50 rekombinant toplamı bağımsız oranla uyumludur; uzak bağlı lokuslar da aynı görünümü verebilir. Orandan kromozom konumu kesinleştirilemez.",
      "Uyumlu olmak ile kanıtlamayı ayır.",
    ],
    [
      "Aynı 1:2:1 genotip oranı tam baskınlıkta 3:1, eksik baskınlıkta 1:2:1 fenotip veriyor. Neden?",
      "Heterozigotun hangi fenotip sınıfına katıldığı değişir",
      [
        "Gametler iki alel taşımaya başlar",
        "Mayoz mutlaka durur",
        "Çekinik alel DNA’dan silinir",
        "Kromozom sayısı iki katına çıkar",
      ],
      "Genotip olasılıkları değişmeden fenotipe eşleme değişebilir. Tam baskınlık AA ile Aa’yıaynı grupta toplar; eksik baskınlıkta Aa ayrı görünür.",
      "Genotip tablosu ile fenotip tablosunu ayır.",
    ],
  ],
  [
    [
      "Temel AB0 modelinde A fenotipinin olası genotipleri nelerdir?",
      "AA ve AO",
      ["Yalnız AA", "AB ve AO", "AA ve OO", "AO ve BO"],
      "A aleli O’ya baskındır; AA ve AO aynı A fenotipini verir. AB iki antijenli AB fenotipidir, OO ise O’dur.",
      "O alelinin heterozigotta görünmediğini kullan.",
    ],
    [
      "Temel AB0 modelinde AB bireyin alyuvar zarında hangi antijenler bulunur?",
      "A ve B birlikte",
      ["Yalnız A", "Yalnız B", "A ve B antijeni yok", "Anti-A ve anti-B"],
      "AB eş baskınlıkla iki antijeni birlikte gösterir. Anti-A ve anti-B antikor adlarıdır; alyuvar antijeni gibi yerleştirilmez.",
      "Antijenin yerini düşün.",
    ],
    [
      "Temel AB0 modelinde AO×BO için O çocuk olasılığı?",
      "1/4",
      ["0", "1/2", "3/4", "1"],
      "O çocuk OO olmalı; iki ebeveynden O gelmesi 1/2×1/2=1/4’tür. Dört birleşme AB, AO, BO, OO’dur.",
      "İki O gametinin ortak yolunu bul.",
    ],
    [
      "AB×OO eşleşmesinde olası AB0 fenotipleri hangileridir?",
      "A ve B",
      ["AB ve O", "Yalnız AB", "Yalnız O", "A, B, AB, O dördü"],
      "AB ebeveyni A/B, OO ebeveyni O gameti verir; AO ve BO oluşur. OO ve AB çocuk için gereken gametler bu eşleşmede birlikte sağlanmaz.",
      "Gameti olmayan aleli ekleme.",
    ],
    [
      "A fenotipli ebeveyn ile OO ebeveynin OO çocuğu var. A ebeveynin genotipi?",
      "AO",
      ["AA", "AB", "OO", "BO"],
      "OO çocuk A fenotipli ebeveynden O almıştır. A fenotipi de A aleli gerektirir; bu iki kanıt AO’yu zorunlu kılar.",
      "Çocuğa aktarılan O’yu izle.",
    ],
    [
      "Standart yetişkin AB0 tablosunda A grubunun plazmasında tipik hangi antikor vardır?",
      "Anti-B",
      ["A antijeni", "B antijeni", "Anti-A", "RhD antijeni"],
      "Alyuvar A antijenini taşır, plazma tipik anti-B içerir. Antijenleri antikorla ve zarın yerini plazmayla karıştırma.",
      "Alyuvar zarı ve plazmayı ayrı yaz.",
    ],
    [
      "Basit RhD modelinde Dd×dd için Rh− çocuk olasılığı nedir?",
      "1/2",
      ["0", "1/4", "3/4", "1"],
      "Dd D/d gametleri verir, dd yalnız d; Dd ve dd eş paylıdır. Rh− fenotip bu modelde dd’dir.",
      "Rh+ fenotipi DD ile sınırlama.",
    ],
    [
      "AB0 ve RhD bağımsız. AO, Dd×BO, dd için O, Rh− çocuk olasılığı?",
      "1/8",
      ["1/4", "1/2", "3/8", "1/16"],
      "AB0’da OO 1/4, RhD’de dd 1/2’dir; bağımsızlığın verdiği çarpım 1/8. Genotipler belirtilmeden yalnız A/B ve pozitif etiketlerinden bu sayı çıkarılamaz.",
      "Sistemleri ayrı hesaplayıp birleştir.",
    ],
    [
      "Rh− anne ve Rh+ baba için hangi ifade güvenlidir?",
      "Bu iki fenotip tek başına her fetüsün hasta olacağını göstermez",
      [
        "Bütün fetüsler kesin Rh+olur",
        "İlk gebelik her koşulda zararsızdır",
        "Rh− annenin her zaman doğuştananti-D’si vardır",
        "Bütün fetüsler kesin Rh−olur",
      ],
      "Babanın Dd veya DD olması, fetüsün RhD durumu ve annenin duyarlanması gibi ek koşullar gerekir. İlk gebelik için de önceden duyarlanmayı yok sayan kesin hüküm kurulmaz.",
      "Kalıtım olasılığı ile bağışıklık sürecini ayır.",
    ],
    [
      "AB0 çaprazlama karesi tek başına hangi işleve sahiptir?",
      "Verilen temel kalıtım modelinde olası yavru AB0 gruplarını hesaplamak",
      [
        "Klinik kan naklini testsiz onaylamak",
        "Kişinin kimliğini kesin kanıtlamak",
        "Bütün antijen sistemlerini belirlemek",
        "Her ailede kesin çocuk sayılarını vermek",
      ],
      "Kare alellerin aktarımını modeller. Klinik uygunluk başka antijenler, bileşenlerve laboratuvar testlerini; kimlik ise daha geniş kanıtı gerektirir.",
      "Modelin hangi soruyu cevapladığını sınırla.",
    ],
  ],
  [
    [
      "Olağan XX/XY insan modelinde bir sperm kromozom bileşimi hangisi olabilir?",
      "22 otozom+Y",
      ["23 otozom+Y", "44 otozom+XY", "22 otozom+XY", "23 otozom+XX"],
      "Normal sperm 23 kromozom taşır: 22 otozom ve X veya Y. XY ikilisini aynı normal gamete koymak diploit çifti ayırmamaktır.",
      "Toplamı 23 olarak denetle.",
    ],
    [
      "Standart XX/XY modelinde XY oğlun Xkromozomu hangi ebeveynden gelir?",
      "Anneden",
      [
        "Babadan",
        "Her iki ebeveynden iki Xolarak",
        "Hiçbirinden, yeniden oluşur",
        "Ykromozomundan dönüşür",
      ],
      "XY oğul babadan Y, anneden X alır. Baba X’ini standart modelde XX kızlarına aktarır.",
      "Y’nin kaynağıyla X’in kaynağını ayır.",
    ],
    [
      "X’in Y’de karşılığı olmayan bir lokusunda XY bireyin tek alel taşımasına ne denir?",
      "Hemizigotluk",
      ["Homozigotluk", "Heterozigotluk", "Eş baskınlık", "Çok alellilik"],
      "Homolog olmayan X lokusunda ikinci karşı alel yoktur. Bu durum iki aynı veya farklı alel taşımak olan homozigot/heterozigottan ayrıdır.",
      "İlgili lokusta kaç alel var?",
    ],
    [
      "X’e bağlı çekinik model:XᴬXᵃ anne×XᴬY baba. Tüm çocuklar içinde özelliği gösteren çocuk olasılığı?",
      "1/4",
      ["0", "1/2", "3/4", "1"],
      "Dört eş birleşmeden yalnız XᵃY özelliği gösterir. Oğullar arasındaki 1/2 olasılığı bütün doğumların payıyla karıştırılmaz.",
      "Önce paydanın bütün doğumlar olduğunu yaz.",
    ],
    [
      "XᴬXᵃ anne×XᴬY baba. Çocuğun XY olduğu biliniyor. Çekinik özelliği gösterme olasılığı?",
      "1/2",
      ["1/4", "0", "3/4", "1"],
      "Koşul yalnız XᴬY ve XᵃY yollarını bırakır; ikisinin biri etkilenmiştir.1/4 tüm çocuklar içindeki ortak paydır.",
      "XY sonuçları arasında oranla.",
    ],
    [
      "XᵃY baba ve XᴬXᴬ anne için kızların genotipi nedir?",
      "Tamamı XᴬXᵃ",
      ["Tamamı XᵃXᵃ", "Tamamı XᴬXᴬ", "Yarı XᴬY yarı XᵃY", "Tamamı XᵃY"],
      "Baba bütün kızlarına Xᵃ, anne Xᴬverir; her kız heterozigot taşıyıcıdır. Oğullara ise babanın Y’si geçer.",
      "Kızın iki X’ini ayrı kaynaklardan yaz.",
    ],
    [
      "Standart tam ifadeli Y’ye bağlı bir özellik hangi yönde aktarılır?",
      "Babadan oğullara",
      [
        "Babadan bütün kızlara",
        "Anneden bütün çocuklara",
        "Anneden yalnız kızlara",
        "Yalnız kızlardan erkeklere",
      ],
      "Homolog olmayan Y lokusunun aleli babanın Y’siyle XY oğullara gider; XX kızlar Yalmaz. Bu sade modelin dışında kromozom çeşitliliği ayrıca incelenir.",
      "Ykromozomunun aktarım yolunu izle.",
    ],
    [
      "Eş olasılıklı XX/XY modelinde bağımsız üç XY doğumundan sonra sonraki XX olasılığı nedir?",
      "1/2",
      ["1", "0", "3/4", "1/4"],
      "Aynı koşullarda yeni döllenme önceki sonuçlardan bağımsızdır. Oranı dengelemek zorunda kalan bir sonraki doğum yoktur.",
      "Geçmiş seri yeni gamet payını değiştirmez.",
    ],
    [
      "Akraba kişiler arasında ortak otozomal çekinik alelle ilgili hangi ifade uygundur?",
      "Ortak aleli birlikte taşıma olasılığı artabilir; her çocukta hastalık garanti değildir",
      [
        "Akrabalık mutlaka yeni hastalık aleli üretir",
        "Akraba olmayan iki kişi aynı aleli taşıyamaz",
        "Bütün genetik hastalıklar çekiniktir",
        "Her akraba çiftte bütün çocuklar etkilenir",
      ],
      "Ortak atalar ortak alel taşıma olasılığını etkileyebilir. Kalıtım riski belirli genotipe bağlıdır; yeni mutasyon üretmek veya kesin hastalık sonucu değildir.",
      "Risk ile kesin sonucu ayır.",
    ],
    [
      "Bir kişinin görünüşünden XX/XY düzeni ve kimliği hakkında hangi çıkarım yapılabilir?",
      "Bu basit okul modeliyle kişisel kromozom düzeni veya kimlik kesinleştirilemez",
      [
        "Görünüş her zaman kromozom sayısını kanıtlar",
        "XY düzeni tek bir görüntüden sayılır",
        "Kimlik bir Punnettkaresiyle kesin belirlenir",
        "Kromozomların gelişimde hiçbir rolü yoktur",
      ],
      "Model belirtilmiş kalıtım koşullarında alel yolunu öğretir; gerçek gelişim çeşitliliği ve kişisel kimlik bir görüntüden çıkarılmaz. Bu, kromozomların biyolojik rolünü yok saymak da değildir.",
      "Modelin sorusu ile bireyin kimliğini birbirine karıştırma.",
    ],
  ],
  [
    [
      "Bir soy ağacında dolu simge her soruda kesinaaanlamına gelir mi?",
      "Hayır; doluluk fenotipi gösterir, genotip kalıtım modeline bağlıdır",
      [
        "Evet, bütün modellerdeaa",
        "Evet, her zaman AA",
        "Hayır, dolu simge daima gamet demektir",
        "Hayır, dolu simge yalnız erkek demektir",
      ],
      "Dolu işaret incelenen özelliğin görüldüğünü belirtir. Otozomal çekinikteaa, baskında AA veya Aa olabilir; önce model okunur.",
      "Lejand ile genotip varsayımını ayır.",
    ],
    [
      "Tam ifadeli otozomal çekinik özellikte iki etkilenmeyen ebeveynin aa çocuğu var. Ebeveynler?",
      "Aa×Aa",
      ["AA×AA", "AA×Aa", "aa×aa", "AA×aa"],
      "Çocuk her ebeveynden a almıştır; ebeveynler etkilenmediğinden aa değildir. Her ikisi zorunlu Aa’dır.",
      "a alelinin iki kaynağını izle.",
    ],
    [
      "Otozomal çekinikaaebeveynin özelliği göstermeyen çocuğunun genotipi nedir?",
      "Aa",
      ["AA", "aa", "A", "Kesin AA veya Aa"],
      "aa ebeveyn yalnızaaktarır. Çocuk etkilenmiyorsa diğer alel Aolmalıdır; AA olamazçünküaa ebeveynden Aa lamaz.",
      "Kesin gelen aleli önce yaz.",
    ],
    [
      "Tam ifadeli otozomal baskın modelde etkilenen bir ebeveynin aa çocuğu varsa ebeveynin genotipi?",
      "Aa",
      ["AA", "aa", "A", "Mutlaka belirlenemez"],
      "Etkilenen ebeveyn A taşır; aa çocuğa a aktarmıştır. Bu iki kanıt Aa’yı zorunlu kılar; AA a veremez.",
      "Fenotip ve çocuk kanıtını birleştir.",
    ],
    [
      "Mutasyon yok, tam ifade. İki etkilenmeyen ebeveynin etkilenen kızı var. Hangi temel model bununla uyumludur?",
      "Otozomal çekinik",
      [
        "Otozomal baskın",
        "X’e bağlı baskın",
        "Y’ye bağlı",
        "X’e bağlı çekinik",
      ],
      "Otozomal çekinikte Aa×Aa ile aa çocuk mümkündür. Baskın modellerde iki etkilenmeyenden etkilenen çıkmaz; X çekinikte etkilenen kız etkilenen baba gerektirir; Y kızda bulunmaz.",
      "Her modeli bütün üç kişi üzerinde sına.",
    ],
    [
      "X’e bağlı çekinik ve tam ifadeli modelde XᵃXᵃ kızın babası için ne zorunludur?",
      "Babanın XᵃY olması",
      [
        "Babanın XᴬY olması",
        "Babanın iki Xᵃtaşıması",
        "Babanın genotipinden bağımsız olması",
        "Babanın kızına Y vermesi",
      ],
      "Kız babadan bir X alır; iki çekinik X’ten biri babadan gelmelidir. Bu yüzden standart modelde baba XᵃY veözelliği gösterir.",
      "Kızın ikinci X’inin kaynağını izle.",
    ],
    [
      "Standart Y’ye bağlı ve tam ifadeli modelde etkilenen babanın etkilenmeyen oğlunun bulunması ne gösterir?",
      "Bu yalın model verilen aileyle uyuşmaz",
      [
        "Ymodelini kesin kanıtlar",
        "Oğul babadan Xalmıştır",
        "Kızlar mutlaka etkilenir",
        "Anne mutlaka Y taşır",
      ],
      "Y’ye bağlı alel babadan tüm normal XY oğullara geçer ve tam ifade varsayılmıştır. Aykırı oğul bu temel modeli eler; genelbir biyolojik imkânsızlık hükmü değildir.",
      "Varsayımlar altında aktarımın zorunlu yönünü denetle.",
    ],
    [
      "Aa×Aa ailesinde özelliği göstermeyen çocuk seçiliyor. Otozomal çekinik özellik için taşıyıcı olasılığı nedir?",
      "2/3",
      ["1/2", "1/4", "3/4", "1"],
      "AA, Aa, Aa eş yolları etkilenmeyen koşulunu sağlar; iki taşıyıcı yol üçe bölünür. Koşulsuz 1/2 değeri farklı örnek uzayına aittir.",
      "Özelliği gösterenaa yolunu çıkar.",
    ],
    [
      "Bir soy sorusunda etkilenmeyen kişinin AA veya Aa olması mümkün. Bütün çocukları Aa olur iddiası nasıl denetlenir?",
      "Her iki olası genotipi eşin genotipiyle ayrı dene; tek karşı örnek kesinliği bozar",
      [
        "Kişiyiotomatik AA kabul et",
        "Yalnız AA seçeneğini dene",
        "Olasılığa bakmadan kesindoğru de",
        "Önceki çocuğa göre bütün sonraki çocukları belirle",
      ],
      "Kesin önerme bütün uyumlu atamalarda doğru olmalıdır. Aa ile farklı çocuk sonucu mümkünse AA örneğinin uygunluğu tek başına bütün iddiasını kanıtlamaz.",
      "Mümkün genotip kümesini koru.",
    ],
    [
      "Küçük bir soy ağacına üç farklı kalıtım modeli uyuyor. Bu ne anlama gelir?",
      "Verilen veri tek modeli kesinleştirmiyor",
      [
        "Her modelin hastalık riski kesin 1/3",
        "Üç modelaynıbiyolojikmekanizmadır",
        "Ailedekesinüçfarklıgenvardır",
        "Modellerden birirastgelekesin seçilmelidir",
      ],
      "Uyumluluk sayısı öncül olasılık veya hastalık riski değildir. Daha fazla aile/genetik bilgisi gerekebilir; tek ailede desen benzerliği kesinlik oluşturmaz.",
      "Modeli eleyememek ile kanıtlamak farklıdır.",
    ],
  ],
];
for (let i = 0; i < data.length; i++)
  data[i].questions = banks[i].map(
    ([prompt, correct, wrong, explanation, hint], j) => {
      const answer = j % 5,
        options = [...wrong];
      options.splice(answer, 0, correct);
      return question(
        `f012-bio-${data[i].id}-${j + 1}`,
        prompt,
        options,
        answer,
        hint,
        explanation,
        `f012-${data[i].id}-${j + 1}`,
      );
    },
  );
export const forge012BiologyGuides: LessonGuide[] = data.map((d) => ({
  id: d.id,
  minutes: 32,
  objectives: d.objectives,
  sections: d.sections,
  examples: d.examples,
  recall: d.recall.map(([prompt, answer]) => ({ prompt, answer })),
  source,
}));
export const forge012BiologyTopics: Record<string, string> = Object.fromEntries(
  data.map((d) => [d.id, d.topic]),
);
export const forge012BiologyLessons: Lesson[] = data.map((d) => ({
  id: d.id,
  subjectId: "tyt-biyoloji",
  title: txt(d.title),
  minutes: 32,
  objectives: d.objectives.map(txt),
  body: d.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join(" ")),
  })),
  questions: d.questions,
  source: txt(source),
  tags: ["kaynakli", "etkilesimli", "forge012"],
}));
