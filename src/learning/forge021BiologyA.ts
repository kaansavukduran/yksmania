import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";
const finiteA021 = (n: number, low: number, high: number) =>
  Number.isFinite(n) && n >= low && n <= high;
const integerA021 = (n: number, low: number, high: number) =>
  Number.isInteger(n) && finiteA021(n, low, high);
/** Standard code, RNA codons written 5′→3′; stop has no charged tRNA in this model. */
export const codeA021: Record<string, string | null> = {
  UUU: "Phe",
  UUC: "Phe",
  UUA: "Leu",
  UUG: "Leu",
  UCU: "Ser",
  UCC: "Ser",
  UCA: "Ser",
  UCG: "Ser",
  UAU: "Tyr",
  UAC: "Tyr",
  UAA: null,
  UAG: null,
  UGU: "Cys",
  UGC: "Cys",
  UGA: null,
  UGG: "Trp",
  CUU: "Leu",
  CUC: "Leu",
  CUA: "Leu",
  CUG: "Leu",
  CCU: "Pro",
  CCC: "Pro",
  CCA: "Pro",
  CCG: "Pro",
  CAU: "His",
  CAC: "His",
  CAA: "Gln",
  CAG: "Gln",
  CGU: "Arg",
  CGC: "Arg",
  CGA: "Arg",
  CGG: "Arg",
  AUU: "Ile",
  AUC: "Ile",
  AUA: "Ile",
  AUG: "Met",
  ACU: "Thr",
  ACC: "Thr",
  ACA: "Thr",
  ACG: "Thr",
  AAU: "Asn",
  AAC: "Asn",
  AAA: "Lys",
  AAG: "Lys",
  AGU: "Ser",
  AGC: "Ser",
  AGA: "Arg",
  AGG: "Arg",
  GUU: "Val",
  GUC: "Val",
  GUA: "Val",
  GUG: "Val",
  GCU: "Ala",
  GCC: "Ala",
  GCA: "Ala",
  GCG: "Ala",
  GAU: "Asp",
  GAC: "Asp",
  GAA: "Glu",
  GAG: "Glu",
  GGU: "Gly",
  GGC: "Gly",
  GGA: "Gly",
  GGG: "Gly",
};
export const aminoNamesA021: Record<string, string> = {
  Phe: "Fenilalanin",
  Leu: "Lösin",
  Ser: "Serin",
  Tyr: "Tirozin",
  Cys: "Sistein",
  Trp: "Triptofan",
  Pro: "Prolin",
  His: "Histidin",
  Gln: "Glutamin",
  Arg: "Arjinin",
  Ile: "İzolösin",
  Met: "Metiyonin",
  Thr: "Treonin",
  Asn: "Asparajin",
  Lys: "Lizin",
  Val: "Valin",
  Ala: "Alanin",
  Asp: "Aspartik asit",
  Glu: "Glutamik asit",
  Gly: "Glisin",
};
const rnaComplementA021: Record<string, string> = {
  A: "U",
  U: "A",
  G: "C",
  C: "G",
};
export function codonA021(codon: string) {
  if (!/^[ACGU]{3}$/.test(codon)) throw new RangeError("CODON_A021");
  const amino = codeA021[codon],
    stop = amino === null,
    aligned = [...codon].map((b) => rnaComplementA021[b]).join("");
  return {
    codon,
    amino,
    aminoName: stop ? "Duruş" : aminoNamesA021[amino!],
    stop,
    codingDNA: codon.replaceAll("U", "T"),
    templateDNA: aligned.replaceAll("U", "T"),
    anticodonAligned: stop ? null : aligned,
    anticodon5: stop ? null : [...aligned].reverse().join(""),
    pairBonds: stop
      ? null
      : [...codon].reduce((n, b) => n + (b === "G" || b === "C" ? 3 : 2), 0),
  };
}
export const sequencesA021 = {
  original: { label: "İlk dizi", codons: ["AUG", "UUU", "GGC", "UAA"] },
  synonymous: { label: "Sessiz değişim", codons: ["AUG", "UUC", "GGC", "UAA"] },
  early: { label: "Erken duruş", codons: ["AUG", "UAG", "GGC", "UAA"] },
  longer: { label: "Uzun dizi", codons: ["AUG", "CCU", "CCU", "GAA", "UGA"] },
} as const;
/** No UTR/intron/alternative start; first AUG is specified start, first in-frame stop ends this one product. */
export function translationA021(
  sequence: keyof typeof sequencesA021,
  readCodons: number,
) {
  if (!Object.hasOwn(sequencesA021, sequence) || !integerA021(readCodons, 0, 6))
    throw new RangeError("TRANSLATION_A021");
  const codons = [...sequencesA021[sequence].codons],
    stopIndex = codons.findIndex((c) => codeA021[c] === null);
  const read = Math.min(readCodons, stopIndex + 1),
    residues = codons
      .slice(0, Math.min(read, stopIndex))
      .map((c) => codeA021[c]!),
    terminated = read > stopIndex;
  return {
    sequence,
    codons,
    stopIndex,
    read,
    residues,
    aminoCount: residues.length,
    peptideBonds: Math.max(0, residues.length - 1),
    deliveryEvents: residues.length,
    terminated,
    currentCodon: terminated ? codons[stopIndex] : codons[read],
    codingNucleotides: 3 * (stopIndex + 1),
    translatedNucleotides: 3 * stopIndex,
    distinctAmino: new Set(residues).size,
  };
}
/** Ideal conceptual target amplification. Initial templates already have both defined target ends; 100% per-cycle yield, no loss/saturation. */
export function pcrA021(
  initial: number,
  cycles: number,
  primersMatch: boolean,
  polymeraseWorks: boolean,
  contamination: number,
) {
  if (
    !integerA021(initial, 0, 4) ||
    !integerA021(cycles, 0, 8) ||
    typeof primersMatch !== "boolean" ||
    typeof polymeraseWorks !== "boolean" ||
    !integerA021(contamination, 0, 2)
  )
    throw new RangeError("PCR_A021");
  const targetInitial = initial + contamination,
    amplifies = primersMatch && polymeraseWorks,
    multiplier = amplifies ? 2 ** cycles : 1,
    targetFinal = targetInitial * multiplier;
  return {
    initial,
    cycles,
    primersMatch,
    polymeraseWorks,
    contamination,
    targetInitial,
    targetFinal,
    newCopies: targetFinal - targetInitial,
    multiplier,
    amplifies: amplifies && targetInitial > 0 && cycles > 0,
    signal: targetFinal > 0,
    controlContaminated: initial === 0 && contamination > 0,
  };
}
/** Gross oxygenic-photoautotrophy school summary in hexose equivalents, not one elementary reaction. Isotope exchange omitted. */
export function photosynthesisA021(
  hexose: number,
  label: "none" | "waterO" | "carbonC",
) {
  if (
    !integerA021(hexose, 0, 4) ||
    !["none", "waterO", "carbonC"].includes(label)
  )
    throw new RangeError("PHOTOSYNTHESIS_A021");
  return {
    hexose,
    label,
    co2: 6 * hexose,
    waterIn: 12 * hexose,
    waterOut: 6 * hexose,
    waterNet: 6 * hexose,
    oxygen: 6 * hexose,
    carbonIn: 6 * hexose,
    carbonOut: 6 * hexose,
    hydrogenIn: 24 * hexose,
    hydrogenOut: 24 * hexose,
    oxygenAtomsIn: 24 * hexose,
    oxygenAtomsOut: 24 * hexose,
    labeledGasOAtoms: label === "waterO" ? 12 * hexose : 0,
    labeledOrganicC: label === "carbonC" ? 6 * hexose : 0,
  };
}
/** Complete 3CO2 Calvin packets with given usable ATP/NADPH pools, no regeneration costs omitted, no photorespiration. Not a rate model. */
export function calvinA021(co2Packets: number, atp: number, nadph: number) {
  if (
    !integerA021(co2Packets, 0, 4) ||
    !integerA021(atp, 0, 36) ||
    !integerA021(nadph, 0, 24)
  )
    throw new RangeError("CALVIN_A021");
  const completed = Math.min(
    co2Packets,
    Math.floor(atp / 9),
    Math.floor(nadph / 6),
  );
  return {
    co2Packets,
    atp,
    nadph,
    completed,
    co2Used: 3 * completed,
    co2Left: 3 * (co2Packets - completed),
    atpUsed: 9 * completed,
    atpLeft: atp - 9 * completed,
    nadphUsed: 6 * completed,
    nadphLeft: nadph - 6 * completed,
    netTriose: completed,
    trioseGross: 6 * completed,
    trioseRegenerated: 5 * completed,
    rubpInitial: 3 * co2Packets,
    rubpFinal: 3 * co2Packets,
    carbonIn: 15 * co2Packets + 3 * completed,
    carbonOut: 15 * co2Packets + 3 * completed,
    hexoseEquivalent: completed / 2,
  };
}

interface UnitA021 {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: [string, string, string[], string, string][];
  source: string;
}
const unitsA021: UnitA021[] = [
  {
    id: "ayt-kodon-antikodon",
    topic: "detail-331",
    title: "Kodon ve antikodon: bilgiyi yönüyle oku",
    minutes: 65,
    objectives: [
      "Temel kavramı mekanizması ve somut örneğiyle açıkla.",
      "Verilen yön, sayı ve koşullarla adım adım çözüm kur.",
      "Modelin gösterdiği sonucu kanıtıyla ve sınırıyla yorumla.",
    ],
    sections: [
      {
        title: "Bir dizi nasıl amino asit bilgisi taşır?",
        paragraphs: [
          "Bir proteinin başlangıçtaki amino asit sırası, ilgili genin ifade edilen bilgisinden üretilir. DNA'daki dört bazın dizilişi RNA'ya aktarılabilir; ribozom bu RNA üzerindeki belirli üçlüleri okuyarak amino asitlerin sırasını kurar. Bazların harfleri amino asit atomlarına dönüşmez; sıra bilgisini taşır.",
          "Genetik kod bu eşleme düzenidir. Dört harfle tek konumda 4, iki konumda 4²=16, üç konumda 4³=64 farklı dizi yazılabilir. Standart kodun üçlü yapısı 20 temel amino asit çeşidi için yeterli sayıda işaret sağlar; bu sayım her proteinin 20 çeşidi birden taşıdığı anlamına gelmez.",
        ],
      },
      {
        title: "Kodon hangi molekülde okunur?",
        paragraphs: [
          "Burada kodon sözcüğünü mRNA üzerindeki üç nükleotit için kullanıyoruz. Bazı okul kaynaklarında DNA üçlüsüne kod veya DNA kodonu da denir; hangi molekülün verildiği mutlaka belirtilmelidir. RNA tablosu okunurken T değil U kullanılır.",
          "Kodonlar mRNA'nın belirtilen okuma çerçevesinde 5′→3′ yönünde okunur. AUG bir kodon örneğidir; aynı harfleri ters sırada yazmak GUA gibi başka bir kodon verir. Yön, sıranın parçasıdır; üç bazın yalnız tür toplamını bilmek yeterli olmaz.",
        ],
      },
      {
        title: "DNA'nın iki ipliğini ayır",
        paragraphs: [
          "RNA polimeraz kalıp DNA ipliğini 3′→5′ izlerken yeni RNA'yı 5′→3′ sentezler. DNA kalıbındaki A karşısına RNA U, T karşısına A, G karşısına C, C karşısına G gelir. Bu eşleme antiparalel iki yönü birlikte gerektirir.",
          "Kodlayan DNA ipliği aynı 5′→3′ yönünde mRNA ile aynı baz sırasını taşır; yalnız DNA'da T olan konum RNA'da U olur. Örneğin kodlayan 5′ATG3′, kalıp 3′TAC5′ ve RNA 5′AUG3′ birbiriyle tutarlıdır. Kalıp ipliğe yalnız T→U yapmak doğru RNA'yı vermez.",
        ],
      },
      {
        title: "Antikodon karşılıklı ve antiparaleldir",
        paragraphs: [
          "Taşıyıcı RNA'nın antikodonu, uygun mRNA kodonuyla geçici baz eşleşmesi kuran üçlü bölgedir. Katı Watson–Crick örneğinde 5′AUG3′ karşısına 3′UAC5′ yerleşir. Üç konumun hem tamamlayıcılığı hem zıt yönü çizimde görünmelidir.",
          "Aynı antikodonu her dizi gibi 5′→3′ yazmak istersek sırayı ters çevirir, 5′CAU3′ elde ederiz. UAC ile CAU arasında iki farklı tRNA iddiası yoktur; aynı üçlü farklı yönle yazılmıştır. Soruda yön verilmediyse cevap biçiminin hangi yönde istendiğini açıklamak gerekir.",
        ],
      },
      {
        title: "Kodon tablosunu üç konumla kullan",
        paragraphs: [
          "Standart tablo mRNA'nın birinci, ikinci ve üçüncü bazını ayrı adımlarda izler. Örneğin UUU ve UUC fenilalanini; GGU, GGC, GGA ve GGG glisini belirtir. AUG metiyonin, UGG triptofan kodonudur.",
          "Bir kodonun anlamını antikodon harfleriyle tabloya girerek bulmayız. Önce mRNA kodonunu 5′→3′ belirler, sonra tabloyu okuruz. Etkileşimde üç konumdan baz seçerek bütün 64 standart kodonu araştırabilir, eşleşen antikodonun iki yazım yönünü görebilirsin.",
        ],
        table: {
          headers: ["Amino asit / kısa ad", "mRNA kodonları (5′ → 3′)"],
          rows: [
            ["Fenilalanin (Phe)", "UUU UUC"],
            ["Lösin (Leu)", "UUA UUG CUU CUC CUA CUG"],
            ["Serin (Ser)", "UCU UCC UCA UCG AGU AGC"],
            ["Tirozin (Tyr)", "UAU UAC"],
            ["Sistein (Cys)", "UGU UGC"],
            ["Triptofan (Trp)", "UGG"],
            ["Prolin (Pro)", "CCU CCC CCA CCG"],
            ["Histidin (His)", "CAU CAC"],
            ["Glutamin (Gln)", "CAA CAG"],
            ["Arjinin (Arg)", "CGU CGC CGA CGG AGA AGG"],
            ["İzolösin (Ile)", "AUU AUC AUA"],
            ["Metiyonin (Met)", "AUG"],
            ["Treonin (Thr)", "ACU ACC ACA ACG"],
            ["Asparajin (Asn)", "AAU AAC"],
            ["Lizin (Lys)", "AAA AAG"],
            ["Valin (Val)", "GUU GUC GUA GUG"],
            ["Alanin (Ala)", "GCU GCC GCA GCG"],
            ["Aspartik asit (Asp)", "GAU GAC"],
            ["Glutamik asit (Glu)", "GAA GAG"],
            ["Glisin (Gly)", "GGU GGC GGA GGG"],
            ["Duruş", "UAA UAG UGA"],
          ],
        },
      },
      {
        title: "64, 61 ve 3 neyi sayar?",
        paragraphs: [
          "Standart genetik kodda 64 üçlüden 61'i amino asit anlamı taşır. UAA, UAG ve UGA ise normal çeviri bağlamında duruş sinyalleridir. Bunlar yeni bir amino asit ekletmek yerine uygun salım faktörünün görev yapmasına yol açar.",
          "61 anlamlı kodon, 61 farklı amino asit çeşidi değildir; bir amino asidin birden çok kodonu olabilir. Ayrıca gerçek hücrede zorunlu olarak 61 farklı tRNA bulunur sonucu da çıkmaz. Bazı tRNA'lar birden çok kodonu tanıyabilir; bu yüzden kodon çeşidi, tRNA çeşidi ve amino asit çeşidi ayrı sayılardır.",
        ],
      },
      {
        title: "Başlama ve duruşun bağlamı",
        paragraphs: [
          "Temel modelimizde belirtilmiş AUG başlangıcından çeviri başlar; metiyonin taşıyan başlatıcı tRNA kullanılır. mRNA içinde daha ileride yer alan AUG da aynı amino asidi belirtir ama her AUG yeni bir ürünün başlangıcı olarak seçilmez. Başlama için hücresel bağlam ve ribozomun yerleşimi önemlidir.",
          "Bakterilerde farklı başlangıç kodonları, bazı organellerde kod farklılıkları ve özel yeniden kodlama olayları bulunabilir. Bu ünitenin hesabı açıkça standart kod ve AUG başlangıcıyla sınırlıdır. Yeni sentezlenen ilk metiyonin daha sonra uzaklaştırılabileceği için her olgun proteinin ilk kalıntısı metiyonindir diye genellenmez.",
        ],
      },
      {
        title: "Eş anlamlı kodonlar ve sessiz değişim",
        paragraphs: [
          "Bir amino asidin birden çok kodonla belirtilmesine kodun eş anlamlılığı denir. Örneğin UUU→UUC değişimi standart tabloda fenilalanin anlamını korur. Böyle bir değişim incelenen polipeptit dizisini değiştirmeyebilir.",
          "Bu durum her baz değişiminin etkisiz olduğunu göstermez. UAU→UAA değişimi amino asit kodonunu duruşa çevirebilir; başka değişimler farklı amino asit veya çerçeve etkisi yaratabilir. Ayrıca amino asit sırası aynı kalsa bile RNA işlenmesi, kararlılığı veya ifade düzeyi gibi etkiler başka veriler gerektirir.",
        ],
      },
      {
        title: "Okuma çerçevesi üçlüleri belirler",
        paragraphs: [
          "Bir RNA dizisinde üçlüleri nereden ayırdığın, çıkan kodonları belirler. Belirlenmiş başlangıçtan AUG–AAA–GGC diye okunan dizi, bir bazlık kaymada başka üçlülere ayrılabilir. Bu yüzden sadece toplam nükleotit sayısına bakarak amino asit sırası kurulmaz.",
          "Üçün katı olmayan ekleme veya silmeler, etkilenen kodlama bölgesinde okuma çerçevesini kaydırabilir. Üç bazlık ekleme çerçeveyi koruyabilir ama yeni amino asit ve işlev etkisi yaratabilir. Yalnız çerçeve korunuyor diye mutasyonun kesin zararsız olduğu söylenmez.",
        ],
      },
      {
        title: "tRNA'ya doğru yük nasıl verilir?",
        paragraphs: [
          "Kodon tanıma ile amino asit yükleme iki ayrı seçicilik basamağıdır. Aminoasil-tRNA sentetazlar uygun amino asidi uygun tRNA'ya bağlar; bu süreç ATP enerjisi kullanır. Ribozom daha sonra antikodonun mRNA ile eşleşmesini değerlendirir.",
          "Antikodon doğrudan DNA'dan koparılmış bir kodon değildir; tRNA'nın RNA dizisinin bir bölgesidir. Aynı amino asit farklı tRNA'larla taşınabilir. tRNA yükünü bıraktıktan sonra uygun enzimlerle yeniden yüklenebilir; bir çeviri olayı onu zorunlu olarak parçalamaz.",
        ],
      },
      {
        title: "Wobble ve basit eşleme modelinin sınırı",
        paragraphs: [
          "Gerçek kodon–antikodon tanınmasında kodonun üçüncü konumu ile antikodonun ilk konumunda esneklik ve değişmiş bazlar bulunabilir; buna wobble denir. Bu, bir tRNA'nın birden fazla eş anlamlı kodonu okuyabilmesine katkı verir. Her gerçek eşleşme yalnız üç katı Watson–Crick çiftine indirgenmez.",
          "Öğrenme modelinde ise açıkça yalnız A–U ve G–C eşleşmesi seçilmiştir. Gösterilen hidrojen bağı sayısı yalnız bu üç model çiftinin toplamıdır; tRNA'nın bütün katlanmış yapısındaki bağları saymaz. Duruş kodonunda standart amino asit taşıyan bir tRNA çizilmez.",
        ],
      },
      {
        title: "Saymadan önce hangi sayıyı istediğini sor",
        paragraphs: [
          "Bir kodlama bölgesinin 30 amino asitlik tek açık zincir oluşturduğu belirtilirse, anlamlı kodon sayısı 30'dur; duruş üçlüsü ayrıca bulunabilir. Aynı kodon veya amino asit tekrar ettiği için çeşit sayısı bundan daha küçük olabilir. Sayı ile çeşit aynı kavram değildir.",
          "Tam mRNA'nın çevrilmeyen uçları, ökaryot öncül RNA'nın intronları veya olgun proteinin işlenmesi ayrıca verilmedikçe ek toplamlar çıkarılmaz. Çözümde molekülü, yönü, başlangıcı, ilk duruşu ve istenen niceliği sırayla işaretlemek, bütün bu ayrımları yönetmenin ortak yoludur.",
        ],
      },
    ],
    examples: [
      {
        title: "Antikodonu iki yönde yaz",
        prompt:
          "Standart RNA kodonu 5′AUG3′. Yalnız A–U ve G–C eşleşmesi kullanılıyor; değişmiş baz yok. Karşılıklı antikodon ve onun 5′→3′ yazımı?",
        strategy: "Önce hizala, sonra yönü değiştir.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Kodon A–U–G için karşı bazlar U–A–C olur.",
          },
          {
            label: "Adım 2",
            explanation:
              "mRNA 5′→3′ olduğundan hizalı antikodon 3′UAC5′ yazılır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Aynı antikodon 5′→3′ yönünde ters sırayla 5′CAU3′ olur.",
          },
        ],
        answer: "3′UAC5′; aynı dizinin diğer yazımı 5′CAU3′.",
        check: "Her karşılıklı çift A–U veya G–C; yönler zıttır.",
        pitfall: "Kodon ve antikodonu aynı soldan sağa 5′ yönünde hizalamak.",
      },
      {
        title: "Kalıptan kodona",
        prompt:
          "Verilen DNA kalıbı 3′TAC–AAA–CCG5′. Oluşan RNA 5′→3′; standart tabloda AUG=Met, UUU=Phe, GGC=Gly verilmiştir. Üç kodonun anlamı?",
        strategy: "Kalıbın her bazına RNA karşılığını koy.",
        steps: [
          {
            label: "Adım 1",
            explanation: "TAC→AUG, AAA→UUU, CCG→GGC; RNA 5′AUG–UUU–GGC3′.",
          },
          {
            label: "Adım 2",
            explanation:
              "Verilen tabloda bu üçlüler Met, Phe ve Gly anlamına gelir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Kodlayan DNA aynı yönde 5′ATG–TTT–GGC3′ olur; T/U karşılaştırması yalnız bu iplik içindir.",
          },
        ],
        answer: "Met–Phe–Gly bilgisi taşır.",
        check: "9 DNA kalıp bazı, 9 RNA bazı verir; ekleme veya kayıp yok.",
        pitfall:
          "Kalıp DNA'daki T'leri yalnız U yapıp kodlayan iplikle karıştırmak.",
      },
      {
        title: "Aynı anlam mı, erken duruş mu?",
        prompt:
          "Standart tabloda UUU ve UUC=Phe; UAU=Tyr, UAA=duruş. İki ayrı değişim UUU→UUC ve UAU→UAA. Kodon anlamları nasıl değişir?",
        strategy: "Her değişimi verilen tabloyla ayrı kıyasla.",
        steps: [
          {
            label: "Adım 1",
            explanation: "UUU ile UUC aynı Phe anlamını taşır.",
          },
          {
            label: "Adım 2",
            explanation:
              "UAU tirozin ekletirken UAA normal çeviride duruş sinyalidir.",
          },
          {
            label: "Adım 3",
            explanation:
              "İlk değişim bu kalıntıda eş anlamlı; ikinci değişim kodlama bölgesinde erken duruşa yol açabilir.",
          },
        ],
        answer: "İlk amino asit anlamını korur, ikinci duruş oluşturabilir.",
        check:
          "Etkilerin kesin protein işlevi sonucu ayrıca bağlam gerektirir.",
        pitfall: "Her üçüncü baz değişimini otomatik etkisiz saymak.",
      },
      {
        title: "Sayı ve çeşit",
        prompt:
          "Bir mRNA kodlama bölgesi 5′AUG–UUU–UUU–GGC–UAA3′; AUG başlangıç, UAA ilk duruş, standart kod: Met,Phe,Phe,Gly. Başka okuma yok. Amino asit sayısı ve çeşidi?",
        strategy: "Duruşu ayır, tekrarları koru.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Dört anlamlı kodon vardır; UAA amino asit ekletmez.",
          },
          {
            label: "Adım 2",
            explanation:
              "Dizi Met–Phe–Phe–Gly; dört kalıntı ama üç farklı amino asit.",
          },
          {
            label: "Adım 3",
            explanation:
              "Toplam beş kodon 15 nükleotit içerir; bunların 12'si amino asit belirten kodonlardadır.",
          },
        ],
        answer: "4 amino asit, 3 çeşit; duruş dahil 5 kodon.",
        check: "Tek açık zincirde dört kalıntı üç peptit bağıyla bağlanır.",
        pitfall: "Duruş kodonuna beşinci amino asit eklemek.",
      },
    ],
    recall: [
      {
        prompt: "AUG karşısındaki antikodon yönü?",
        answer: "Katı eşlemede 3′UAC5′; 5′→3′ yeniden yazımı CAU.",
      },
      {
        prompt: "61 neyi sayar?",
        answer:
          "Standart kodun amino asit anlamı taşıyan kodonlarını; zorunlu tRNA çeşidini veya amino asit çeşidini değil.",
      },
      {
        prompt: "Kalıp ile kodlayan DNA farkı?",
        answer:
          "Kalıp RNA'ya tamamlayıcı ve antiparalel; kodlayan iplik aynı yönde T/U farkıyla RNA sırasına karşılık gelir.",
      },
      {
        prompt: "Duruş kodonu ne bağlar?",
        answer:
          "Standart sonlanmada uygun salım faktörü görev yapar; amino asit taşıyan normal bir tRNA eklenmez.",
      },
    ],
    items: [
      [
        "mRNA kodonu 5′AUG3′. Katı A–U/G–C eşlemesinde karşılıklı yerleşen antikodon?",
        "3′UAC5′",
        ["5′UAC3′", "3′AUG5′", "5′ATG3′", "3′TAC5′"],
        "Antiparalel yön ile RNA bazlarını birlikte kullan.",
        "AUG karşısına UAC bazları gelir; mRNA 5′→3′ olduğundan karşı sıra 3′→5′ yazılır. 5′→3′ yeniden yazım CAU olur; yönsüz üçlüyle yetinmeyiz.",
      ],
      [
        "Antikodon 3′UAC5′ olarak hizalı verilmiş. Aynı antikodonun 5′→3′ yazımı?",
        "5′CAU3′",
        ["5′UAC3′", "5′AUG3′", "5′GUA3′", "5′TAC3′"],
        "Aynı diziyi ters yönden yaz; yeniden tamamlayıcı üretme.",
        "Aynı RNA'nın diğer yönde yazımı sırayı ters çevirir: CAU. Tamamlayıcısını almak başka molekülün dizisini verir; burada yalnız yazım yönü değişmektedir.",
      ],
      [
        "Kodlayan DNA 5′ATG–GGT3′. Aynı bölgenin mRNA'sı, başka işleme yokken?",
        "5′AUG–GGU3′",
        ["5′UAC–CCA3′", "3′AUG–GGU5′", "5′ATG–GGT3′", "5′CAU–ACC3′"],
        "Kodlayan iplik ile RNA aynı yönde T/U farkı taşır.",
        "Kodlayan DNA sırası korunur, T yerine U gelir. Kalıp DNA ise 3′TAC–CCA5′ olurdu; kodlayan ipliğe yeniden tamamlayıcı almak yanlıştır.",
      ],
      [
        "Standart genetik kodda 64 kodondan UAA, UAG ve UGA duruştur. Amino asit anlamı taşıyan kodon çeşidi sayısı?",
        "61",
        ["20", "64", "3", "4"],
        "Üç duruşu toplamdan ayır.",
        "64−3=61 anlamlı kodon vardır. Bu 61 farklı amino asit veya zorunlu 61 tRNA anlamına gelmez; kod eş anlamlılık içerir.",
      ],
      [
        "Standart tabloda UUU ve UUC ikisi de fenilalanin kodonu. Kodlama bölgesinde UUU→UUC değişimi hakkında verilen tablodan kesin çıkan?",
        "Bu konumdaki amino asit anlamı korunur",
        [
          "Her protein işlevi kesin değişmez",
          "RNA'nın bütün özellikleri kesin aynı kalır",
          "Duruş kodonu oluşur",
          "Bir nükleotit silinir",
        ],
        "Tablo hangi niceliği eşliyor?",
        "İki kodonun Phe anlamı aynıdır; kalıntı anlamı değişmez. Fakat ifade, RNA kararlılığı veya başka hücresel etkilerin tamamını bu tek tabloyla kesin belirleyemeyiz.",
      ],
      [
        "RNA 5′AUG–GGC–UAA3′; başlangıç AUG, ilk duruş UAA, standart tabloda AUG=Met, GGC=Gly. Bu ürün kaç amino asit içerir?",
        "2",
        ["3", "9", "1", "0"],
        "Duruş bir kalıntı ekletmez.",
        "İlk iki anlamlı kodon Met ve Gly ekletir; UAA salım basamağıdır. Dokuz nükleotit, üç kodon ve iki amino asit farklı sayımlardır.",
      ],
      [
        "Standart çeviride UAA duruş kodonuna gelindiğinde doğru süreç?",
        "Salım faktörüyle zincirin tRNA'dan ayrılması",
        [
          "UAA'nın yeni amino asit olarak eklenmesi",
          "DNA polimerazın transkripsiyonu bitirmesi",
          "Her RNA'nın parçalanması",
          "Kromozom sayısının ikiye katlanması",
        ],
        "Çeviri sonlanmasını RNA sentezinden ayır.",
        "Duruş kodonu ribozomdaki translasyonun sonlanmasıyla ilişkilidir. Normal amino asit taşıyan tRNA karşılığı kullanılmaz; RNA polimerazın sonlanma sinyali ayrı bir mekanizmadır.",
      ],
      [
        "Dört baz çeşidinden, her konum serbestçe seçilebilen üçlü diziler kuruluyor. Farklı üçlü sayısı?",
        "64",
        ["12", "16", "20", "81"],
        "Her konumun dört seçeneği vardır.",
        "4×4×4=4³=64. Bu kombinasyon sayımıdır; gerçek bir proteinde bütün bu kodonların bulunması gerektiğini göstermez.",
      ],
      [
        "Bir tRNA uygun amino asidini ribozoma bıraktı. Hücresel süreç açısından hangisi doğrudur?",
        "Uygun enzimlerle yeniden yüklenip kullanılabilir",
        [
          "Her kullanımda zorunlu tamamen parçalanır",
          "Antikodonu DNA'ya dönüşür",
          "Her amino asit için yeni kromozom gerekir",
          "Yük bıraktığı için ribozom artık stop kodonunu amino aside çevirir",
        ],
        "tRNA bir taşıyıcıdır; taşıma olayı ile molekül sayısını ayır.",
        "Aminoasil-tRNA sentetazlar boş tRNA'yı yeniden uygun amino asitle yükleyebilir. Bu nedenle taşıma olayı sayısı kullanılan farklı veya eşsiz tRNA molekül sayısına otomatik eşit değildir.",
      ],
      [
        "Bir mRNA'nın verilen okuma çerçevesindeki kodlama bölgesine tek nükleotit ekleniyor; başka değişim yok. Genel olarak hangi risk vardır?",
        "Sonraki üçlülerin okuma çerçevesinin kayması",
        [
          "Her durumda yalnız tek amino asidin kesin eklenmesi",
          "Kodun bütün 64 anlamının yeniden tanımlanması",
          "DNA'nın zorunlu iki zincirden üçe çıkması",
          "Her durumda protein işlevinin kesin korunması",
        ],
        "Üçlü ayırmanın başlangıçtan sonraki konumunu izle.",
        "Tek bazlık ekleme üçün katı değildir; sonraki kodon sınırlarını değiştirebilir ve erken duruş gibi sonuçlar doğurabilir. Kesin ürün için yeni dizinin ve başlangıcın bilinmesi gerekir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 PDF 41–44; OGM Dersler Cepte Genetik Şifre ve Protein Sentezi I PDF 16–18; OGM Protein Sentezi sunusu PDF 4–9 gerçek şekilleri; Aurelia DNA ve RNA kopya kâğıdı PDF 3–4. Standart kod ve belirtilmiş yön koşullarında özgün öğretim ve sorular.",
  },
  {
    id: "ayt-protein-sentezi",
    topic: "detail-332",
    title: "Protein sentezini adım adım izle",
    minutes: 65,
    objectives: [
      "Temel kavramı mekanizması ve somut örneğiyle açıkla.",
      "Verilen yön, sayı ve koşullarla adım adım çözüm kur.",
      "Modelin gösterdiği sonucu kanıtıyla ve sınırıyla yorumla.",
    ],
    sections: [
      {
        title: "Bilgi akışı ile madde akışını ayır",
        paragraphs: [
          "Protein sentezinde DNA'daki ifade edilen bilgi önce RNA'ya, sonra amino asit sırasına aktarılır. DNA kalıp bilgiyi taşır; amino asitler ayrı ham maddelerdir. Bir DNA bazını harf gibi okumak, o bazın proteinin amino asidine kimyasal olarak dönüştüğü anlamına gelmez.",
          "İki ana basamak transkripsiyon ve translasyondur. Transkripsiyonda RNA polimeraz DNA kalıbına göre RNA sentezler. Translasyonda ribozom mRNA bilgisini okuyarak polipeptit kurar; tRNA ve rRNA bu işin araçlarıdır, kendileri protein zincirine çevrilmez.",
        ],
      },
      {
        title: "RNA polimerazın yönlü çalışması",
        paragraphs: [
          "RNA sentezinde ilgili DNA bölgesi yerel olarak açılır. RNA polimeraz kalıp ipliği 3′→5′ izler ve yeni RNA zincirinin 3′ ucuna uygun ribonükleotit ekler; yeni RNA 5′→3′ büyür. DNA'nın bütün kromozomu açılmaz ve RNA oluşumu DNA miktarını iki katına çıkarmaz.",
          "RNA zinciri kalıba tamamlayıcıdır. Kalıp ve kodlayan iplik adları belirli genin transkripsiyon yönüne göre kullanılır; aynı kromozomdaki başka gen farklı ipliği kalıp seçebilir. DNA'nın karşı ipliği gereksiz veya genetik bilgisiz bir zincir değildir.",
        ],
      },
      {
        title: "Hücrede nerede gerçekleşir?",
        paragraphs: [
          "Bakteride zarla çevrili çekirdek olmadığından transkripsiyon ve translasyon sitoplazmik ortamda birbirine yakın, bazı durumlarda eş zamanlı ilerleyebilir. Ökaryot çekirdek geninde öncül RNA çekirdekte oluşur; olgun mRNA sitozole çıkar ve ribozomlarda çevrilir.",
          "Mitokondri ve kloroplastın kendi genlerinin bir bölümü organel içinde ifade edilir. Bununla birlikte bu organellerin birçok proteini çekirdek tarafından kodlanıp sitozolde sentezlenerek içeri taşınır. Her ökaryot proteininin yalnız organel ribozomunda üretildiği veya bütün özel hücrelerin sürekli sentez yaptığı genellenmez.",
        ],
      },
      {
        title: "Öncül RNA ile olgun mRNA",
        paragraphs: [
          "Ökaryot protein kodlayan birçok gende ilk transkript işlenir: uygun bağlamda uç koruyucu yapılar eklenir, intronlar çıkarılır ve ekzonlar birleştirilir. Olgun mRNA'nın her nükleotidi amino asit belirlemez; 5′ ve 3′ çevrilmeyen bölgeler bulunabilir.",
          "Bu nedenle olgun proteinin amino asit sayısından bütün genin veya bütün öncül RNA'nın nükleotit sayısı koşulsuz bulunmaz. Alternatif birleştirme bazı genlerden farklı olgun RNA ve ürün biçimleri oluşturabilir. Dersin sayısal dizilerinde intron ve çevrilmeyen uçlar açıkça dışarıda bırakılır veya ayrıca verilir.",
        ],
      },
      {
        title: "Üç RNA'nın görev paylaşımı",
        paragraphs: [
          "mRNA, ribozomun okuduğu kodon sırasını taşır. tRNA, uygun amino asidi bağlayıp antikodonuyla kodonu tanır. rRNA ise proteinlerle birlikte ribozom yapısına ve katalitik işlevine katılır; büyük alt birimde peptit bağı oluşumunun merkezinde RNA bulunur.",
          "Bu görevler birbiri yerine geçmez. mRNA'da amino asitleri uç uca bağlayan peptit bağı kurulmaz; peptit bağı büyüyen ürün zincirindedir. Kodon–antikodon arasındaki geçici baz eşleşmesi de peptit bağından kimyasal olarak farklıdır.",
        ],
      },
      {
        title: "Amino asidin tRNA'ya yüklenmesi",
        paragraphs: [
          "Aminoasil-tRNA sentetazlar uygun amino asidi ve ona ait tRNA'yı tanıyarak yüklü tRNA oluşturur. Bu etkinleştirmede ATP kullanılır; klasik biyokimyasal gösterimde ATP'den AMP ve pirofosfat oluşumu söz konusudur. Böylece taşıyıcının amino asit yükü doğru hazırlanır.",
          "Yükleme ile ribozomda kodon tanıma birbirini tamamlayan iki seçicilik basamağıdır. Protein sentezinin bütün enerji hesabını yalnız her bağa bir ATP diyerek kapatmayız; başlama ve uzama faktörlerinde GTP kullanımı da vardır. Basitleştirilmiş ders sorusu özel bir enerji kuralı verirse o kuralın kapsamı ayrıca belirtilir.",
        ],
      },
      {
        title: "Başlamada ilk tRNA'nın yeri",
        paragraphs: [
          "Belirtilmiş başlangıç kodonuna uygun başlatıcı tRNA, küçük alt birim ve gerekli faktörlerle başlama kompleksi oluşturur. Temel AUG modelinde ilk amino asit metiyonindir. Büyük alt birim katıldıktan sonra işlevsel ribozom, sonraki kodonları okuyabilecek düzene gelir.",
          "Başlatıcı tRNA P bölgesine yerleşir; uzama sırasında yeni yüklü tRNA'nın geldiği A bölgesi farklıdır. Başlama dizinin rastgele bir üçlüsünden yapılmaz. Modelin her örneği başlangıcı açıkça AUG olarak verdiği için seçim belirsizliği yoktur.",
        ],
      },
      {
        title: "A, P ve E bölgeleri",
        paragraphs: [
          "Uzamada A bölgesine yeni amino asidi taşıyan tRNA gelir ve uygun kodonla eşleşir. P bölgesindeki büyüyen zincir yeni amino asit üzerine aktarılır; peptit bağı oluşur. Yeni uzun zincir bu aşamada A bölgesindeki tRNA'ya bağlıdır.",
          "Ardından ribozomun üç bazlık ilerlemesiyle yüklü zincir P konumuna, boşalan tRNA E çıkış bölgesine geçer. Bu düzen tekrarlandıkça mRNA 5′→3′ okunur, polipeptit N ucundan C ucuna doğru büyür. P bölgesinde bütün bağların tek başına oluştuğunu söylemek mekanizmayı eksiltir.",
        ],
      },
      {
        title: "Sonlanma ve ürünün serbest kalması",
        paragraphs: [
          "Okuma çerçevesindeki UAA, UAG veya UGA duruşuna ulaşıldığında uygun salım faktörü görev yapar. Büyüyen polipeptit ile son tRNA arasındaki bağ hidrolizle ayrılır ve ürün serbest kalır. Ribozom bileşenleri sonraki sentezlerde yeniden kullanılabilir.",
          "Duruş kodonu amino asit eklemez ve transkripsiyonun sonlanma sinyaliyle aynı değildir. mRNA'nın ilk çevrilen ürünü, belirlenen ilk çerçeve içi duruşta biter; bundan sonraki üçlüler aynı ürünün otomatik parçası olmaz. Özel yeniden kodlama durumları temel modelin dışındadır.",
        ],
      },
      {
        title: "Bir mRNA'da birden çok ribozom",
        paragraphs: [
          "Aynı mRNA üzerinde farklı konumlarda ilerleyen birden çok ribozom, polizom oluşturabilir. Her ribozom ayrı bir ürün zinciri taşır; tek zinciri hep birlikte uçlarından çekmezler. Aynı belirtilmiş okuma çerçevesi çevriliyorsa ürünlerin başlangıç dizisi aynıdır.",
          "Bu düzen kısa sürede daha çok ürün üretilmesine katkı sağlar. Ancak mRNA çeşidi, ribozom sayısı ve toplam üretilmiş protein sayısı bire bir eşitlenmez. Aynı RNA zaman içinde tekrar çevrilebilir; bazı mRNA'lar birden çok farklı kodlama bölgesi taşıyabilir ve bu durum ayrıca belirtilmelidir.",
        ],
      },
      {
        title: "Kalıntı, bağ ve taşıma olayı",
        paragraphs: [
          "n amino asit kalıntılı tek doğrusal açık polipeptitte n−1 peptit bağı vardır. c ayrı açık zincirde toplam N kalıntı varsa bağ sayısı N−c olur. Katlanma veya başka yan grup bağları bu açık zincir peptit sayımını değiştirmez.",
          "Bir zincirin sentezinde n amino asit teslim olayı vardır; aynı fiziksel tRNA tekrar kullanılabileceğinden n farklı tRNA molekülü zorunlu değildir. Duruş dahil kodlama dizisi n+1 üçlü içeriyorsa uzunluğu 3(n+1) olur; bu özel model bütün olgun mRNA'nın uzunluğu değildir. Serbest amino asitten basit dehidrasyon su hesabı, ribozomun bütün biyokimyasal mekanizmasıyla özdeş tutulmaz.",
        ],
      },
      {
        title: "Polipeptitten işlevsel proteine",
        paragraphs: [
          "Yeni zincir uygun biçimde katlanır; bazı ürünler kesilme, kimyasal değişim veya başka zincirlerle birleşme gibi işlemler geçirir. Birincil sıra, katlanma ve ortam birlikte işlevi etkiler. Her proteinin çok alt birimli olması veya her ilk metiyoninin kalması zorunlu değildir.",
          "Denatürasyon, katlanmış düzenin bozulmasını; peptit hidrolizi ise zincir bağlarının kopmasını anlatır. Yeni sentez eksikliği, yanlış yükleme, dizide değişim ve katlanma bozukluğu farklı nedenlerdir. Bir ürünün görevi azaldı gözleminden hangisinin olduğunu kanıtsız seçmeyiz.",
        ],
      },
    ],
    examples: [
      {
        title: "İlk duruşa kadar oku",
        prompt:
          "Olgun mRNA'nın gösterilen kodlama dizisi 5′AUG–UUU–GGC–UAA–GAA3′. AUG başlangıç, UAA ilk duruş; standart tablo AUG=Met, UUU=Phe, GGC=Gly, GAA=Glu. Başka başlangıç yok. Ürün ve bağ sayısı?",
        strategy: "Duruşun gerisindeki üçlüyü ilk üründen ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "İlk üç anlamlı kodon Met–Phe–Gly dizisini verir.",
          },
          {
            label: "Adım 2",
            explanation:
              "UAA salım sinyalidir; sonraki GAA bu belirtilen ilk ürünün parçası olmaz.",
          },
          {
            label: "Adım 3",
            explanation:
              "Ürün üç kalıntılı tek açık zincir: 3−1=2 peptit bağı.",
          },
        ],
        answer: "Met–Phe–Gly; 2 peptit bağı.",
        check: "Üç teslim olayı vardır; stop için dördüncü amino asit yoktur.",
        pitfall:
          "Gösterilen tüm üçlüleri duruştan sonra da aynı zincire eklemek.",
      },
      {
        title: "Kodlama uzunluğu ile tam RNA",
        prompt:
          "Bir ürün 50 amino asit içeriyor; tek açık zincir, başlangıçtan ilk duruşa kadar kesintisiz kodlama var. Duruş üçlüsü ayrıca var; son işleme yok. Bu bölge uzunluğu ve peptit bağları?",
        strategy: "İstenen bölgenin sınırını koru.",
        steps: [
          {
            label: "Adım 1",
            explanation: "50 anlamlı kodon 150 nükleotit taşır.",
          },
          {
            label: "Adım 2",
            explanation: "Bir duruş üçlüsü eklenince bölge 153 nükleotit olur.",
          },
          {
            label: "Adım 3",
            explanation: "50 kalıntılı açık zincirde 49 peptit bağı vardır.",
          },
        ],
        answer: "153 nükleotitlik belirtilen bölge; 49 peptit bağı.",
        check:
          "Çevrilmeyen uçlar verilmediğinden tam mRNA uzunluğu çıkarılamaz.",
        pitfall:
          "Duruşun üç bazını amino asit gibi saymak veya tam gen uzunluğuna intron eklemek.",
      },
      {
        title: "Polizomun üç ayrı ürünü",
        prompt:
          "Aynı tek kodlama bölgesini okuyan üç ribozomun her biri, son işleme olmadan 80 kalıntılı aynı açık polipeptidi birer kez tamamlıyor. Toplam kalıntı, peptit bağı ve amino asit teslim olayı?",
        strategy: "Önce bir ürün, sonra üç bağımsız ürün.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Her üründe 80 kalıntı ve 79 peptit bağı vardır.",
          },
          {
            label: "Adım 2",
            explanation: "Üç üründe N=240, c=3; bağ=240−3=237.",
          },
          {
            label: "Adım 3",
            explanation:
              "Her kalıntı için bir teslim olayı: toplam 240. Bu, zorunlu 240 farklı tRNA molekülü demek değildir.",
          },
        ],
        answer: "240 kalıntı, 237 peptit bağı, 240 teslim olayı.",
        check:
          "Üç ayrı ürün tek 240 kalıntılı zincir değildir; bu nedenle 239 bağ çıkmaz.",
        pitfall: "Ribozomları tek ortak zincir üretiyormuş gibi toplamak.",
      },
      {
        title: "Başlama ile uzama yerleri",
        prompt:
          "Bir ribozomda başlatıcı Met tRNA P bölgesinde. Sonraki kodon GGC ve standart tabloda Gly anlamı taşıyor; uygun yüklü tRNA geliyor. Yeni peptit bağı ve yer değişimi sırası?",
        strategy: "Yükü taşıyan zincirin hangi tRNA'da olduğunu izle.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Yeni Gly taşıyan tRNA A bölgesinde kodonu tanır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Met, P tRNA'sından A tRNA'sındaki Gly üzerine aktarılır; Met–Gly bağı kurulur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Üç bazlık ilerlemede zincirli tRNA P konumuna, boş taşıyıcı E çıkışına geçer.",
          },
        ],
        answer: "A'ya giriş → peptit aktarımı → ilerleme.",
        check:
          "İki kalıntı arasında tek peptit bağı oluşur; kodon–antikodon eşleşmesi peptit bağı değildir.",
        pitfall: "Başlatıcı tRNA'yı her zaman önce A'ya koymak.",
      },
    ],
    recall: [
      {
        prompt: "Transkripsiyon hangi yönde sentez yapar?",
        answer: "RNA polimeraz RNA'yı 5′→3′ büyütür, kalıp DNA'yı 3′→5′ izler.",
      },
      {
        prompt: "Başlatıcı tRNA nereye yerleşir?",
        answer:
          "Temel başlama kompleksinde P bölgesine; yeni uzama tRNA'ları A bölgesine gelir.",
      },
      {
        prompt: "Duruş kodonu RNA sentezini mi bitirir?",
        answer:
          "Hayır; standart translasyonun salım basamağını belirtir, transkripsiyonun kendi sonlanması ayrıdır.",
      },
      {
        prompt: "n kalıntı neden n farklı tRNA değildir?",
        answer:
          "n teslim olayı vardır; taşıyıcılar yük bırakıp yeniden yüklenerek kullanılabilir.",
      },
    ],
    items: [
      [
        "DNA kalıbına göre RNA sentezleyen temel enzim?",
        "RNA polimeraz",
        ["DNA ligaz", "Pepsin", "ATP sentaz", "Hemoglobin"],
        "Yazılma basamağı ile peptit kurmayı ayır.",
        "Transkripsiyonda RNA polimeraz uygun RNA nükleotitlerini 5′→3′ ekler. DNA ligaz DNA omurgası bağlantısında görev alır; diğer seçenekler bu RNA sentez enzimi değildir.",
      ],
      [
        "Ökaryot çekirdek geninden sentezlenen birçok öncül RNA işleniyor. Doğru yorum?",
        "Olgun mRNA'nın çevrilmeyen bölgeleri olabilir",
        [
          "Her öncül RNA bazı bir amino asit belirler",
          "İntronlar zorunlu bütün proteinlerde kalır",
          "DNA'nın tamamı proteine dönüşür",
          "Transkripsiyon zorunlu ribozomun A bölgesinde olur",
        ],
        "RNA uzunluğu ile kodlama uzunluğunu ayır.",
        "Olgun mRNA bile çevrilmeyen uçlar taşıyabilir; öncül RNA intronları ayrıca işlenebilir. Amino asit sayısından bütün genin veya bütün RNA'nın uzunluğu koşulsuz çıkmaz.",
      ],
      [
        "Temel AUG başlangıç kompleksinde başlatıcı tRNA'nın yeri?",
        "P bölgesi",
        [
          "Yalnız E çıkış bölgesi",
          "DNA replikasyon çatalı",
          "Çekirdek zarı lipidi",
          "Her durumda önce A bölgesi",
        ],
        "Başlatıcı ile uzama taşıyıcısını ayır.",
        "Başlatıcı tRNA P bölgesine yerleşir. Uzama sırasında sıradaki yüklü tRNA A bölgesine gelir; bu iki basamak aynı giriş kuralıyla anlatılmaz.",
      ],
      [
        "Peptit bağının kurulmasında ribozomun büyük alt birimindeki katalitik merkezde hangi RNA görev alır?",
        "rRNA",
        [
          "Yalnız mRNA",
          "Yalnız tRNA antikodonu",
          "DNA kalıp ipliği",
          "Hiçbir RNA görev yapmaz",
        ],
        "Ribozom yalnız proteinlerden oluşmaz.",
        "Büyük alt birimin rRNA'sı peptidil transferaz merkezinin katalitik işlevinde temel rol oynar. mRNA bilgi şablonu, tRNA taşıyıcıdır; görevler birbirinin aynısı değildir.",
      ],
      [
        "5′AUG–CCU–UAG–GGC3′ dizisi, AUG başlangıç ve UAG ilk duruş olacak biçimde çevriliyor. Standart tablo AUG=Met, CCU=Pro, GGC=Gly. İlk ürün?",
        "Met–Pro",
        [
          "Met–Pro–Gly",
          "Met–Pro–duruş amino asidi–Gly",
          "Yalnız Gly",
          "Dört amino asitli zincir",
        ],
        "İlk çerçeve içi duruşa gelince ürün biter.",
        "AUG ve CCU iki kalıntı ekletir. UAG salım basamağıdır; sonrasındaki GGC bu belirtilen ilk ürünün parçası olmaz. Tek iki kalıntılı zincirde bir peptit bağı vardır.",
      ],
      [
        "40 kalıntılı tek doğrusal açık polipeptitte, halka veya yan grup çapraz bağı sayılmıyor. Peptit bağı sayısı?",
        "39",
        ["40", "41", "120", "20"],
        "Birim sayısı ile aralık sayısını ayır.",
        "Açık zincirde ilk kalıntıdan önce peptit bağı yoktur, her sonraki kalıntı bir bağ ekler:40−1=39. Katlanma bu doğrusal sıra sayımını değiştirmez.",
      ],
      [
        "Aynı mRNA'nın aynı tek kodlama bölgesinde üç ribozom ayrı ayrı ilerliyor. Doğru polizom yorumu?",
        "Her ribozom ayrı bir polipeptit zinciri oluşturur",
        [
          "Üçü zorunlu tek ortak zinciri taşır",
          "mRNA üç farklı DNA'ya dönüşür",
          "Ribozom sayısı amino asit çeşididir",
          "Her ribozom stop kodonunu yeni amino aside çevirir",
        ],
        "Şablon paylaşılır, büyüyen ürünler ayrı taşınır.",
        "Polizom aynı mRNA'dan çok sayıda ürün yapımına katkı verir. Her ribozom kendi zincirini uzatır; aynı belirtilen kodlama bölgesinden başlangıç dizileri aynı olabilir.",
      ],
      [
        "Bir kodlama bölgesi 30 amino asit belirten kodon ve ayrıca bir duruş üçlüsü içeriyor; intron ve çevrilmeyen uçlar bu soruda sayılmıyor. Bölge kaç nükleotit?",
        "93",
        ["90", "30", "31", "186"],
        "Toplam kodon sayısını üçle çarp.",
        "30 anlamlı+1 duruş=31 üçlü; 31×3=93 nükleotit. Bu sayı yalnız açıkça sınırlandırılan bölgeye aittir; tam gen veya tüm mRNA diye genellenmez.",
      ],
      [
        "Amino asidin tRNA'ya doğru yüklenmesini temel olarak hangi protein grubu sağlar?",
        "Aminoasil-tRNA sentetazlar",
        [
          "Yalnız mRNA kodonları",
          "Yalnız ribozomdan çıkan boş tRNA'lar",
          "DNA helikazın peptit uzatması",
          "ATP'nin kendiliğinden baz eşlemesi",
        ],
        "Doğru yükleme ile kodon tanıma iki basamaktır.",
        "Sentetazlar uygun amino asit ve tRNA'yı tanıyarak ATP kullanan yükleme yapar. Ribozomdaki antikodon tanınması sonraki seçicilik basamağıdır; kodon tek başına kimyasal yüklemeyi gerçekleştirmez.",
      ],
      [
        "Bir polipeptit işlev kaybetmiş; deney yalnız katlanmış şeklin değiştiğini ve peptit bağlarının korunduğunu gösteriyor. En uygun yorum?",
        "Denatürasyonla uyumludur; tam amino asit hidrolizi kanıtı yoktur",
        [
          "Bütün amino asitler kesin serbestleşmiştir",
          "DNA zorunlu yok olmuştur",
          "Zincirdeki kalıntı sayısı kesin ikiye katlanmıştır",
          "Bu durum yeni protein sentezlendiğini kesin kanıtlar",
        ],
        "Şekil değişimi ile bağ kopmasını ayır.",
        "Korunan peptit bağları, tüm zincirin amino asitlere ayrıldığı iddiasını desteklemez. Katlanmanın bozulması işlevi azaltabilir; burada yalnız bu gözlemin izin verdiği yorum yapılır.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 PDF 42–44; OGM Dersler Cepte Protein Sentezi I PDF 17–18; OGM037 gerçek transkripsiyon ve ribozom şekilleri; Aurelia Proteinler PDF 2–4,6–7,10 ile DNA/RNA PDF 3. Özgün anlatım; amino asit teslim olayı ve tRNA molekülü, kodlama bölgesi ve bütün RNA ayrı tutulur.",
  },
  {
    id: "ayt-biyoteknoloji",
    topic: "detail-333",
    title: "Biyoteknoloji: araç, ürün ve kanıt",
    minutes: 65,
    objectives: [
      "Temel kavramı mekanizması ve somut örneğiyle açıkla.",
      "Verilen yön, sayı ve koşullarla adım adım çözüm kur.",
      "Modelin gösterdiği sonucu kanıtıyla ve sınırıyla yorumla.",
    ],
    sections: [
      {
        title: "Canlı sistemden yararlanmak",
        paragraphs: [
          "Biyoteknoloji, canlıları veya onların hücre, enzim ve benzeri bileşenlerini kullanarak ürün ya da süreç geliştirmektir. Yoğurt mayalanması, endüstriyel enzim üretimi ve belirli DNA bölgesinin çoğaltılması bu geniş alanın farklı örnekleridir. Biyoteknolojinin var olması için her örnekte gen aktarımı yapılması gerekmez.",
          "Genetik mühendisliği ise genetik materyalin incelenmesi, ayrılması, değiştirilmesi ve uygun sistemlere aktarılması gibi araç ve yaklaşımlara odaklanır. Bu araçların kullanıldığı ürün süreçleri modern biyoteknolojinin önemli bir parçasıdır. Bir tekniği adıyla değil hangi girdiyi hangi amaçla değiştirdiğiyle tanımak daha açıklayıcıdır.",
        ],
      },
      {
        title: "Klasik uygulama ve kontrollü seçim",
        paragraphs: [
          "Mayalarla hamur veya bakterilerle yoğurt üretiminde canlıların mevcut metabolik işlevlerinden yararlanılır. Yapay seçilimde istenen özelliği taşıyan bireylerin çoğalması tercih edilir; melezlemede farklı genotipli ebeveynlerin genleri yavrularda birleşir. Bunlar laboratuvarda kesilmiş bir genin vektöre eklenmesiyle aynı işlem değildir.",
          "Yapay döllenme uygun gametlerin birleşmesini sağlar; tek başına belirli yeni gen eklemek demek değildir. Poliploidi, hücrede ikiden fazla tam kromozom takımının bulunmasıdır; özellikle bazı bitki ıslahlarında önemlidir. Her poliploit daha verimli veya çekirdeksiz olur diye genellenmez; özellikler tür, takım sayısı ve koşula bağlıdır.",
        ],
      },
      {
        title: "Model organizmayı neden seçeriz?",
        paragraphs: [
          "Araştırmacılar, karmaşık bir soruyu çalışmak için deneylere uygun model organizmalar kullanır. Maya, meyve sineği, Arabidopsis ve bazı bakteriler farklı sorular için yararlı modellerdir. Kısa nesil süresi, yetiştirme kolaylığı, bilinen genetik bilgi ve uygun biyolojik benzerlik seçimde rol oynayabilir.",
          "En küçük genom veya en hızlı çoğalma her araştırma için tek ölçüt değildir. Sorunun gerektirdiği doku, gelişim evresi ve mekanizma önemlidir; bir modelde bulunan sonuç doğrudan bütün insanlara aktarılmaz. Deney tasarımında uygun kontrol ve etik hayvan refahı ilkeleri de bilimsel değerlendirmeye katılır.",
        ],
      },
      {
        title: "Genom projesi neyi haritalar?",
        paragraphs: [
          "Genom, bir organizmanın genetik materyalinin genleri ve kodlamayan bölgeleriyle bütününü kapsar. İnsan Genom Projesi DNA dizisinin ve haritasının anlaşılmasında temel bir kaynak oluşturmuştur. Dizi verisi genlerin konumları ve olası işlevleriyle ilişkilendirilebilir.",
          "Bir genetik varyantın bilinmesi tek başına kişinin geleceğini veya hastalık tanısını kesinleştirmez. Gen ifadesi, başka varyantlar ve çevresel koşullar etkili olabilir. Kodlamayan DNA'yı sırf protein belirtmiyor diye işlevsiz saymak da yanlıştır; düzenleyici veya yapısal işlevler bulunabilir.",
        ],
      },
      {
        title: "PCR hedef DNA'yı çoğaltır",
        paragraphs: [
          "Polimeraz zincir reaksiyonu, uygun primerlerle sınırlandırılan belirli DNA bölgesini çoğaltmaya yarar. Kavramsal döngüde çift zincir ayrılır, uygun primerler kalıba bağlanır ve DNA polimeraz yeni tamamlayıcı zincirleri uzatır. Tek başına DNA miktarını artırmak protein üretmek değildir.",
          "Bütün koşulların ideal olduğu ve başlangıç moleküllerinin iki ucu belirli tam hedef çift DNA olduğu modelde her döngü iki kat artış verebilir: N=N₀·2ᵏ. Gerçek örnekte verim, ilk uzun kalıplar, enzim ve madde sınırlılığı bu ideal büyümeyi değiştirebilir. Model bu yüzden deney sonucu tahmini değil açık varsayımlı sayım alıştırmasıdır.",
        ],
      },
      {
        title: "Kontroller sonuçtan önce gelir",
        paragraphs: [
          "Negatif kontrol hedef eklenmemiş koşuldur; burada hedef ürün gözlenmesi bulaşma veya başka bir sorun olabileceğini düşündürür. Pozitif kontrol bilinen hedef ve uygun sistemin çalıştığını sınar. Hedefin çoğalmaması, tek başına örnekte hedef yoktur demek için her zaman yeterli değildir; sistemin çalışması da kontrol edilmelidir.",
          "Primerin hedefe uygunluğu ve polimerazın çalışması gibi basamaklar ayrı önem taşır. Modelde bunlardan biri kapatılırsa yeni hedef kopyası eklenmez; başlangıç DNA kendiliğinden yok olmaz. Küçük miktarda dış hedef eklenmesi, hedef eklenmemiş kapta bile çoğalma yaratabilir; sonuç kesin tanı veya kimlik hükmü değildir.",
        ],
      },
      {
        title: "Elektroforez ve DNA profili",
        paragraphs: [
          "DNA parçaları uygun jel ve elektrik alanında boy ve yapı gibi özelliklerine göre ayrılabilir. Aynı jel koşullarında, benzer doğrusal çift DNA parçaları için küçük olan genellikle daha uzağa ilerler. Referans boy işaretleri bantların yorumlanmasına yardım eder; tek başına bir bant bütün baz dizisini vermez.",
          "DNA profillemede çeşitlilik gösteren belirteçler, örneğin kısa tekrar bölgeleri incelenebilir. Profil uyumu istatistiksel ve örnek kalitesi bağlamında değerlendirilir; tek başına suçluluk veya her hastalık için kesin tanı değildir. Tek yumurta ikizleri, karışım örnekleri ve bulaşma gibi sınırlar da düşünülür.",
        ],
      },
      {
        title: "Rekombinant DNA'nın parçaları",
        paragraphs: [
          "Bir DNA parçasının başka uygun DNA yapısına birleştirilmesiyle rekombinant DNA elde edilebilir. Plazmit gibi bir vektör, taşınacak diziyi konakta çoğaltmaya yardımcı olur. DNA parçasının hangi amaçla taşındığı, yalnız çoğaltma mı yoksa ürün ifadesi mi istendiği baştan belirlenir.",
          "Restriksiyon enzimleri belirli tanıma bölgelerinde kesim yapabilir; DNA ligaz uygun omurga uçlarını birleştirir. Uyumlu uçlar, doğru yön ve sağlam bağlar önemlidir. Aynı enzimle kesim yaygın bir okul örneğidir; bütün gerçek teknikler yalnız tek yapışkan uç biçimiyle sınırlı değildir.",
        ],
      },
      {
        title: "Konak, seçme ve gen ifadesi",
        paragraphs: [
          "Rekombinant vektörün uygun konak hücreye aktarılması tek başına her hücrenin doğru ürünü yaptığı anlamına gelmez. Vektörü alanların seçilmesi ve hedef dizinin doğrulanması gerekir. Sonrasında ürün ifadesi için uygun düzenleyici diziler ve konakla uyumlu çalışma sistemi gerekir.",
          "Bir ökaryot geninin intronlu genom parçası bakteriye verildiğinde bütün işlenme sorunlarının kendiliğinden çözüldüğü varsayılmaz. Uygun kodlama dizisi veya cDNA, düzenleme ve protein işleme gereksinimleri seçilebilir. Genin kopyalanması, RNA'ya yazılması ve işlevsel protein oluşması ayrı başarı basamaklarıdır.",
        ],
      },
      {
        title: "Gen klonu ile canlı klonu",
        paragraphs: [
          "Gen klonlamada hedef DNA'nın çok sayıda kopyası elde edilir. Hücre klonu ortak bir hücreden çoğalan topluluğu; organizma klonlaması ise çok hücreli bir bireyin yeniden oluşturulmasını ifade edebilir. Bu terimler aynı ölçeği anlatmaz.",
          "Kopya terimi kullanılsa da süreçte yeni mutasyonlar veya ifade farkları oluşabilir. Bir dizinin aynı olması bütün çevresel ve gelişimsel özelliklerin aynı olmasını garanti etmez. Gen klonlama sonucu yalnız DNA elde edilmiş olması, bütün bir hayvan klonlandığı anlamına gelmez.",
        ],
      },
      {
        title: "Dolly örneğinde çekirdek ve sitoplazma",
        paragraphs: [
          "Somatik hücre çekirdek transferinde bir vücut hücresinin çekirdeği, çekirdeği çıkarılmış yumurtaya aktarılabilir; gelişen yapı uygun taşıyıcıda ilerletilir. Dolly bu yaklaşımın bilinen örneğidir: doğumu 1996, geniş duyurusu 1997 yılıdır. Hücre döngüsü düzenlemesi, bütün genlerin aynı anda açılması demek değildir.",
          "Çekirdek DNA'sı esas olarak çekirdek vericisinden, mitokondri DNA'sı büyük ölçüde yumurta sitoplazması vericisinden gelir. Taşıyıcı anne gelişim ortamına katkı sağlar ama yalnız taşıdığı için çekirdek DNA'nın kaynağı olmaz. Nükleer benzerlik, bütün genetik ayrıntı ve fenotipin mutlak özdeşliği diye sunulmaz.",
        ],
      },
      {
        title: "Kök hücrenin potansiyeli",
        paragraphs: [
          "Kök hücreler kendini yenileyebilme ve uygun koşullarda belirli hücre soylarına farklılaşabilme özellikleriyle tanınır. Embriyonik kök hücreler geniş, yetişkin dokuların birçok kök hücresi daha sınırlı farklılaşma potansiyeline sahiptir. Kordon kanı da belirli kan yapıcı hücreler için bir kaynak olabilir.",
          "Pluripotent bir hücre birçok vücut hücresi tipine yönlenebilir; bu tek başına bütün bir organizmayı oluşturma yetkisi veya her dokuda kesin tedavi demek değildir. Sinyaller, kültür koşulları ve hücrenin potansiyeli önemlidir. Temas ettiği her hücreye dönüşür veya sınırsız ve koşulsuz çoğalır genellemeleri kullanılmaz.",
        ],
      },
      {
        title: "Protein ürünü ve metabolik ürün",
        paragraphs: [
          "Rekombinant insülin üretiminde uygun insan kodlama bilgisi bir konakta ifade edilerek protein kökenli ürün elde edilir; saflaştırma ve uygun işleme de gerekir. Bazı interferonlar ve antijen proteinleri de biyoteknolojik üretim örnekleridir. Üretim mekanizması, klinikte nasıl kullanılacağı sorusundan ayrıdır.",
          "Antibiyotiklerin birçoğu doğrudan bir genin çevrilmiş protein ürünü değil, enzim yollarıyla üretilen küçük moleküllerdir. Aşılar da tek bir üretim biçiminden oluşmaz; bağışıklığa antijen bilgisi sunan farklı platformlar vardır. Bir hastalık listesi bütün ürünler için kesin başarı veya kullanım önerisi değildir.",
        ],
      },
      {
        title: "Gen tedavisinde hangi hücre değişir?",
        paragraphs: [
          "Gen tedavisi işlevsel bir dizinin eklenmesi, belirli gen ifadesinin düzenlenmesi veya başka uygun genetik müdahalelerle hücresel işlevi değiştirmeyi amaçlayabilir. Uygulamanın hedefi, taşıyıcısı ve güvenliği değerlendirilir. Her yöntemde kusurlu gen fiziksel olarak çıkarılıp yerine yenisi konmak zorunda değildir.",
          "Somatik hücredeki değişiklik otomatik olarak gametlere ve gelecek kuşaklara aktarılmaz. Araştırma amacıyla gösterilen bir yaklaşım, her hastalıkta doğrulanmış kesin tedavi olarak sunulmaz. Genetik danışmanlık ise genetik bilgi, risk ve seçeneklerin uygun uzmanlıkla anlaşılmasına yardım eden iletişim sürecidir.",
        ],
      },
      {
        title: "Tarım ve besin içeriği",
        paragraphs: [
          "Bitki ıslahı ve genetik yaklaşımlar zararlılara dayanıklılık, besin içeriği veya verim gibi hedeflere yönelebilir. Altın pirinç örneğinde artırılan bileşen, insan vücudunda A vitaminine dönüşebilen β-karoten öncülüdür. Doğrudan bütün vitamin gereksiniminin tek ürünle kesin karşılandığı sonucu çıkmaz.",
          "Gen aktarımı ile aynı tür içi seçilim farklı süreçlerdir; genetiği değiştirilmiş her organizmaya başka tür geni eklenmiş olması da zorunlu değildir. Bir ürünün yararı ve riski, hedef değişiklik ve kullanım ortamıyla değerlendirilir. Her genetik değişimin aynı sonuçları verdiği söylenmez.",
        ],
      },
      {
        title: "Çevre ve endüstri uygulamaları",
        paragraphs: [
          "Enzim üretimi gıda, tekstil, kâğıt ve temizlik gibi alanlarda süreçleri destekleyebilir. Biyolojik arıtma ve bazı mikroorganizmalar, organik kirleticilerin dönüşümüne veya metalin bağlanıp ortamdan ayrılmasına katkı sağlayabilir. Ancak kurşun atomunu biyolojik tepkimeyle bakır atomuna çevirmek söz konusu değildir; element korunur.",
          "Biyogaz, biyoplastik ve benzeri biyoürünlerin çevresel etkisi üretim, kullanım ve bozunma koşullarıyla değerlendirilir. Biyolojik kaynaklı olmak her zaman zararsız veya her ortamda hızla bozunur demek değildir. Hedeflenen yarar kadar madde, enerji ve atık bütçesi de sorgulanır.",
        ],
      },
      {
        title: "Sentetik biyoloji ve tasarım",
        paragraphs: [
          "Sentetik biyoloji, mevcut biyolojik sistemleri yeniden düzenleme veya yeni işlevsel bileşen ve devreler tasarlama yaklaşımıdır. Biyosensörler, belirli molekül üretim yolları ve gen düzenekleri örnek araştırma alanlarıdır. Tasarımın çalışması, uygun parçaların bir araya gelmesi ve ölçümle sınanmasına bağlıdır.",
          "Tasarlanmış bir sistemde DNA dizisi, gen ifadesi ve ürün çıktısı arasında birçok ara basamak bulunur. Sonuç önceden niyet edilmiş olduğu için gerçekleşmiş sayılmaz. Kontrollü karşılaştırma, tekrar, ölçüm ve bağımsız doğrulama biyoteknolojide de temel bilimsel araçlardır.",
        ],
      },
      {
        title: "Biyogüvenlik ve biyoetik",
        paragraphs: [
          "Biyogüvenlik olası sağlık ve çevre etkilerini değerlendirme, maruziyet ve yayılımı kontrol etme gibi önlemleri kapsar. Biyoetik ise rıza, hayvan refahı, adalet, embriyo araştırmaları ve genetik bilgi gizliliği gibi değer sorularını tartışır. Bilimsel sonuç, risk değerlendirmesi ve etik karar aynı türden iddialar değildir.",
          "Kişisel DNA verisi, izinsiz paylaşım veya ayrımcılık riski doğurabilir; bilgilendirilmiş rıza ve uygun veri koruma gerekir. Her yeni teknik mutlak iyi veya kötü diye etiketlenmez; amaç, kanıt, olası zarar ve toplumsal bağlam birlikte değerlendirilir. Bu öğrenme bölümü kişiye klinik veya hukuki karar vermez.",
        ],
      },
    ],
    examples: [
      {
        title: "İdeal PCR sayımı",
        prompt:
          "Başlangıçta iki ucu belirlenmiş tam hedef bölgeyi taşıyan 2 çift zincirli DNA var. Her döngü %100 verimle iki katına çıkarıyor, kayıp ve doygunluk yok. 4 tam döngü sonunda hedef çift DNA sayısı?",
        strategy: "Verilen ideal modeli başlangıç stoğuyla ölçekle.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Her döngünün çarpanı 2; dört döngü 2⁴=16.",
          },
          {
            label: "Adım 2",
            explanation: "N=2×16=32 hedef çift DNA.",
          },
          {
            label: "Adım 3",
            explanation:
              "Yeni kopya sayısı 32−2=30; başlangıç molekülleri toplamdan ayrı tutulur.",
          },
        ],
        answer: "32 toplam; 30 yeni hedef çift DNA.",
        check: "2→4→8→16→32 dizisi dört adım içerir.",
        pitfall: "Dört döngüyü dört yeni molekül diye toplamak.",
      },
      {
        title: "Negatif kontrolün anlamı",
        prompt:
          "Hedef DNA eklenmemiş negatif kontrol kabına 1 tam hedef çift DNA bulaşıyor. Uygun primer/polimeraz, %100 verimli 3 döngü ve kayıp yok varsayılıyor. Hedef sayısı ve yorum?",
        strategy: "Bulaşan hedefi başlangıç stoğu say.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Planlanan başlangıç 0, gerçek hedef başlangıcı bulaşma nedeniyle 1 olur.",
          },
          {
            label: "Adım 2",
            explanation: "Üç ideal döngüde 1×2³=8 hedef çift DNA oluşur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Negatif kontrolde hedef görülmesi temiz kontrol koşulunu bozmuştur; örneğin gerçek biyolojik durumu hakkında kesin hüküm kurulmaz.",
          },
        ],
        answer: "8 hedef; kontrol temiz değildir.",
        check:
          "Hedef eklenmemesi, dışarıdan hiç hedef gelmediğini tek başına garanti etmez.",
        pitfall: "Kontrol sinyalini doğrudan kesin hastalık tanısı saymak.",
      },
      {
        title: "Jelde boy sırası",
        prompt:
          "Aynı agaroz jelde, aynı yapıda doğrusal çift DNA parçaları A=500 baz çifti, B=1500 baz çifti. Koşullar küçük parçanın daha uzağa gitmesini sağlıyor. Hangisi daha uzağa ilerler; bu bütün diziyi verir mi?",
        strategy: "Yalnız verilen ayrım ölçütünü kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "A, B'den daha kısa parçadır:500<1500.",
          },
          {
            label: "Adım 2",
            explanation: "Verilen aynı jel koşulunda A daha uzağa ilerler.",
          },
          {
            label: "Adım 3",
            explanation:
              "Boy sırası bütün baz sırasını belirtmez; aynı boyda farklı diziler olabilir.",
          },
        ],
        answer: "A daha uzağa gider; bütün dizi çıkarılamaz.",
        check:
          "Kıyaslananlar aynı biçimde doğrusal DNA; farklı yapı etkisi eklenmemiştir.",
        pitfall: "Daha uzak bant kesin aynı gen veya kesin aynı kişi demek.",
      },
      {
        title: "Üç vericiyi ayır",
        prompt:
          "Somatik çekirdek vericisi A, çekirdeği çıkarılmış yumurta vericisi B, taşıyıcı C. Çekirdek transferi modelinde mutasyon ve başka karışım ihmal. Çekirdek DNA ve mitokondri DNA için temel kaynak?",
        strategy: "Çekirdek ve sitoplazmanın hangi vericiden geldiğini izle.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Yeni hücreye A'nın çekirdeği aktarılmıştır; çekirdek DNA'sının temel kaynağı A.",
          },
          {
            label: "Adım 2",
            explanation:
              "Yumurta sitoplazması B'den kalır; mitokondri DNA'sı büyük ölçüde B'den gelir.",
          },
          {
            label: "Adım 3",
            explanation:
              "C gelişim ortamı sağlar; yalnız taşıyıcı olduğu için çekirdek veya yumurta mitokondrilerinin kaynağı sayılmaz.",
          },
        ],
        answer: "Çekirdek DNA: A; mtDNA: büyük ölçüde B.",
        check:
          "Nükleer kopya ifadesi bütün genetik ayrıntının koşulsuz özdeşliği değildir.",
        pitfall: "Taşıyıcı C'yi bütün DNA'nın kaynağı saymak.",
      },
    ],
    recall: [
      {
        prompt: "PCR neyi çoğaltır?",
        answer:
          "Uygun primerlerle hedeflenen DNA bölgesini; doğrudan protein, hücre veya kesin tanı üretmez.",
      },
      {
        prompt: "Gen klonlaması neden her durumda protein üretimi değildir?",
        answer:
          "Kopyalanan dizinin ayrıca uygun ifade ve işlenme koşulları gerekir.",
      },
      {
        prompt: "SCNT'de mtDNA nereden gelir?",
        answer:
          "Büyük ölçüde yumurta sitoplazması vericisinden; çekirdek DNA'sının temel kaynağı somatik çekirdek vericisidir.",
      },
      {
        prompt: "Biyogüvenlik ile biyoetik farkı?",
        answer:
          "Biyogüvenlik riskin denetimini; biyoetik rıza, adalet, refah ve veri gizliliği gibi değer sorularını ele alır.",
      },
    ],
    items: [
      [
        "Sütten yoğurt üretiminde bakterilerin mevcut işlevlerinden yararlanılıyor, hedef gen aktarımı yapılmıyor. Doğru yorum?",
        "Gen aktarımı olmasa da biyoteknoloji örneğidir",
        [
          "Her biyoteknoloji zorunlu transgeniktir",
          "Bu işlem canlı sistem kullanmaz",
          "Bakteriler çekirdeksiz olduğu için ürün oluşturamaz",
          "Yoğurt üretimi bütün bir hayvan klonlamasıdır",
        ],
        "Biyoteknoloji gen aktarımından daha geniştir.",
        "Klasik biyoteknoloji canlı veya bileşenlerini ürün için kullanır. Genetik mühendisliği araçları modern alanın önemli parçasıdır fakat her biyoteknolojik süreçte zorunlu değildir.",
      ],
      [
        "İdeal PCR'de başlangıç 3 tam hedef çift DNA; her döngü %100 iki kat artış, kayıp yok. 4 döngü sonunda toplam?",
        "48",
        ["12", "24", "7", "96"],
        "N=N₀·2ᵏ.",
        "3×2⁴=3×16=48 hedef çift DNA. Başlangıç tam hedef molekülleri ve ideal verim açıkça verilmiştir; gerçek örneklerde bu model koşulsuz deney tahmini değildir.",
      ],
      [
        "Uygun primer ve çalışan polimerazla hazırlanan negatif kontrol kabında dışarıdan hedef DNA bulaşmış. Hedef çoğalması gözlenirse en uygun yorum?",
        "Kontrolün temizliği bozulmuş olabilir; kesin örnek hükmü verilmez",
        [
          "Bütün örnekler kesin hastadır",
          "Primerler her hedefe daima özgüdür",
          "PCR otomatik bütün baz dizisini okur",
          "Bulaşan DNA çoğalamaz",
        ],
        "Kontrol neyi sınamak içindir?",
        "Negatif kontrol, hedef eklenmeyen koşulda dış hedef veya başka sorunları yakalamaya yardım eder. Sinyal tek başına asıl örneğin durumunu veya klinik tanıyı kesinleştirmez.",
      ],
      [
        "Rekombinant DNA oluşturma örneğinde uygun DNA omurga uçlarını birleştiren temel enzim?",
        "DNA ligaz",
        ["Pepsin", "Hemoglobin", "Klorofil", "RNA ribozomunun kendisi"],
        "Kesme ve birleştirme farklı görevlerdir.",
        "Restriksiyon enzimi belirli kesimlere, DNA ligaz uygun omurga bağlantısının kurulmasına yardım eder. Uyumlu uçlar ve sağlam düzenek ayrıca gerekir.",
      ],
      [
        "A'dan somatik çekirdek, B'den çekirdeği çıkarılmış yumurta, C'den taşıyıcılık sağlanan klonlama modeli; mutasyon ve başka karışım ihmal. Nükleer DNA'nın temel kaynağı?",
        "A",
        [
          "B",
          "C",
          "A ve C'nin gametlerinin döllenmesi",
          "Yalnız dış besin ortamı",
        ],
        "Çekirdeğin fiziksel kaynağını izle.",
        "Aktarılan çekirdek A'dandır; temel nükleer genom A ile ilişkilidir. Yumurta B mitokondri DNA katkısı sağlayabilir; taşıyıcı C ise yalnız bu rolü nedeniyle çekirdek kaynağı olmaz.",
      ],
      [
        "Ökaryotik intronlu genom parçası bakteriye aktarılmış; başka ifade bilgisi verilmemiş. Hangisi kesin söylenemez?",
        "İşlevsel insan proteininin mutlaka doğru üretildiği",
        [
          "DNA aktarımının gen ifadesinden ayrı bir basamak olduğu",
          "Uygun kodlama ve düzenleyici dizilerin önemli olabileceği",
          "Ürünün ayrıca doğrulanması gerektiği",
          "Bakterinin ökaryot RNA işlemesini koşulsuz üstlenemeyeceği",
        ],
        "DNA bulunması bütün ara basamakların başarısı değildir.",
        "Genin aktarılması, uygun transkripsiyon, RNA işleme ve protein işlemesini otomatik sağlamaz. Uygun cDNA/kodlama ve konak düzeni gibi koşullar gerektiğinden kesin ürün iddiası çıkarılamaz.",
      ],
      [
        "Aynı jel koşulunda benzer doğrusal çift DNA için küçük parça daha uzağa gidiyor. X=400 baz çifti, Y=1200 baz çifti. Doğru sonuç?",
        "X daha uzağa gider; boy bilgisi bütün diziyi vermez",
        [
          "Y mutlaka daha uzağa gider",
          "X ve Y kesin aynı baz dizisidir",
          "Bir bant kesin suçluluğu kanıtlar",
          "Baz çifti sayısı protein amino asit sayısına aynen eşittir",
        ],
        "Boy ayrımı ile kimlik yorumunu ayır.",
        "Verilen ilişkiye göre 400<1200 olduğundan X daha uzağa gider. Aynı veya farklı boy tek başına bütün dizi, gen işlevi ya da hukuki sonuç hakkında kesin bilgi değildir.",
      ],
      [
        "Altın pirinç örneğinde artırılan β-karoten, insan vücudunda A vitaminine dönüşebilen öncü olarak verilmiş. Doğru yorum?",
        "Besin içeriği hedeflenir; doğrudan her gereksinimin kesin karşılandığı çıkmaz",
        [
          "Bitki her insan için doz hesaplar",
          "β-karoten bütün proteinlerin tek amino asididir",
          "Gen aktarımı mineral atomlarını başka elemente çevirir",
          "Ürün kesin bütün hastalıkları önler",
        ],
        "Öncü madde ile klinik sonuç farklıdır.",
        "β-karoten/provitamin A içeriği bir biyoteknolojik hedef örneğidir. Alım, dönüşüm ve gereksinim gibi koşullar verilmeden herkes için kesin sağlık veya doz sonucu çıkarılamaz.",
      ],
      [
        "Biyolojik arıtmada kurşun içeren iyonlar hücreye bağlanıp ortamdan ayrılabiliyor. Hangisi doğrudur?",
        "Kurşun elementi korunur; dağılımı veya kimyasal biçimi değişebilir",
        [
          "Kurşun atomları biyolojik tepkimeyle kesin bakır atomuna dönüşür",
          "Bütün metal kütlesi yok olur",
          "Her biyoürün her ortamda zararsızdır",
          "Bağlanan metalin proton sayısı zorunlu sıfır olur",
        ],
        "Kimyasal süreçte element korunur.",
        "Biyobirikim veya bağlama metalin bulunduğu bölmeyi ve kullanılabilirliğini değiştirebilir. Kimyasal dönüşüm, kurşun çekirdeğini başka elemente dönüştüren nükleer süreç değildir.",
      ],
      [
        "Bir kişinin genetik verisi araştırmada kullanılacak. Bilimsel yarar yanında hangi ilke doğrudan önemlidir?",
        "Bilgilendirilmiş rıza ve veri gizliliği",
        [
          "Veriyi her koşulda izinsiz herkese açmak",
          "Bütün varyantları kesin hastalık saymak",
          "Kontrol gruplarını gereksiz görmek",
          "Her yeni tekniği kanıtsız kesin başarılı ilan etmek",
        ],
        "Biyoetik yalnız teknik verim sorusu değildir.",
        "Kişisel genetik bilgi ayrımcılık veya izinsiz paylaşım riski taşıyabilir. Rıza, gizlilik ve adil yararlanma teknik etkinliğin yanında değerlendirilir; kişi hakkında kesin klinik ya da hukuki hüküm kurulmaz.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 PDF 45–51; OGM Dersler Cepte Protein Sentezi II PDF 10–17; OGM Biyoteknoloji sunuları 038–041 seçili gerçek sayfalar. Özgün öğretim ve sorular; kaynaklardaki sınırsız kök hücre, bütün genler aktif, doğrudan protein antibiyotik ve element dönüşümü genellemeleri koşullu bilimsel açıklamayla düzeltilmiştir.",
  },
  {
    id: "ayt-fotosentez-genel",
    topic: "detail-334",
    title: "Fotosentezin genel yapısı ve madde akışı",
    minutes: 65,
    objectives: [
      "Temel kavramı mekanizması ve somut örneğiyle açıkla.",
      "Verilen yön, sayı ve koşullarla adım adım çözüm kur.",
      "Modelin gösterdiği sonucu kanıtıyla ve sınırıyla yorumla.",
    ],
    sections: [
      {
        title: "Işıktan kimyasal enerjiye",
        paragraphs: [
          "Fotosentez, ışık enerjisinin biyolojik düzeneklerle kimyasal enerjiye dönüştürülmesidir. Bitkilerde ve oksijenli fotoototroflarda bu enerji, CO₂'den organik karbon bileşikleri yapılmasını destekler. Işık maddeye dönüşmez; atomlar girdilerden gelir, enerji ise dönüşümü olanaklı kılar.",
          "Fotoototrof sözcüğü enerji kaynağının ışık, temel karbon kaynağının inorganik karbon olduğunu birlikte söyler. Fototrofların tümü aynı karbon beslenme biçimine sahip olmak zorunda değildir; bazı bakteriler organik karbon da kullanabilir. Bu ünitenin temel madde hesabı açıkça oksijenli fotoototrofiye aittir.",
        ],
      },
      {
        title: "Canlılar ve ekosistem bağlantısı",
        paragraphs: [
          "Bitkilerin fotosentetik dokuları, algler, bazı protistler ve siyanobakteriler ışıkla organik madde üretimine katkı verir. Kloroplast ökaryot fotosentetik hücrelere aittir; siyanobakteri aynı organeli taşımaz. Her bitki hücresinde kloroplast veya aynı fotosentez etkinliği bulunması gerekmez.",
          "Üretilen organik karbon besin ağlarına ve canlı yapısına katılabilir; oksijenli fotosentez atmosfere O₂ sağlayabilir. Fotosentezle karbonun bağlanması ve solunumla geri dönüşü karbon döngüsünün parçalarıdır. Karbon döngü yaparken enerji ışıkla girer ve kullanım sırasında ısıya dağılır; enerji madde gibi aynı döngüde yeniden yaratılmaz.",
        ],
      },
      {
        title: "Her fotosentez oksijen vermez",
        paragraphs: [
          "Oksijenli fotosentezde elektron kaynağı sudur ve suyun yükseltgenmesi O₂ oluşumuna yol açar. Bitkiler ve siyanobakteriler bu temel mekanizmayı kullanır. Bazı fotosentetik bakteriler ise H₂S gibi başka elektron vericilerden yararlanabilir ve O₂ üretmeyebilir.",
          "Dolayısıyla pigment taşımak veya ışıkla enerji elde etmek tek başına oksijen çıkışı garantisi değildir. Dersin bitki örneğinde O₂ ve su yolu açıkça verilir; oksijensiz bakteriyel yollar ayrı karşılaştırma olarak anlatılır. Bir organizma grubunun adı, bütün üyelerinde aynı pigment veya madde bütçesini zorunlu kılmaz.",
        ],
      },
      {
        title: "Brüt ve net denklemi oku",
        paragraphs: [
          "Oksijenli fotosentezin okul düzeyindeki toplam özeti 6CO₂+12H₂O→C₆H₁₂O₆+6O₂+6H₂O biçiminde yazılabilir; ışık ve uygun biyolojik düzenek gereklidir. Her iki taraftaki 6 su sadeleşirse net denklem 6CO₂+6H₂O→C₆H₁₂O₆+6O₂ olur.",
          "Bu denklem çok basamaklı süreci heksoz eşdeğeriyle özetler; tek enzim basamağında doğrudan glikoz üretildiği anlamına gelmez. Önce trioz fosfat gibi ürünler oluşur ve başka yollarda işlenir. Brüt 12 su girdisi ile net 6 su tüketimi farklı soruların yanıtıdır; toplam atomlar iki yazımda da korunur.",
        ],
      },
      {
        title: "Açığa çıkan oksijenin kaynağı",
        paragraphs: [
          "Denklemi sadeleştirmek tek başına atomların mekanistik yolunu kanıtlamaz. Oksijenli fotosentezde çıkan O₂'nin oksijen atomlarının su kaynaklı olduğu izotop işaretleme ve elektron aktarım çalışmalarıyla anlaşılmıştır. H₂¹⁸O kullanılan uygun deneyde çıkan O₂ içinde ağır oksijen izlenebilir.",
          "Bir izotop deneyi yorumlanırken hangi atomun hangi girdide işaretlendiği ve örnekler arasındaki değişim koşulları açık olmalıdır. Kısa, basit öğrenme modelinde su ile CO₂ arasında ek oksijen değişimi dışarıda bırakılır. Karbonun CO₂'den organik iskelete geçişi ile gaz O₂'nin su kökeni birbirinden ayrı izlenir.",
        ],
      },
      {
        title: "Deneyler nasıl bilgi biriktirdi?",
        paragraphs: [
          "Van Helmont'un bitki büyümesiyle ilgili gözlemleri, yalnız toprak kütlesiyle açıklamanın yetmediğini düşündürdü; tek başına bütün karbonun sudan geldiğini kanıtlamadı. De Saussure'nin madde alışverişi çalışmaları, CO₂ ve suyun katkısının anlaşılmasına yardım etti. Priestley'in bitkilerin hava bileşimine etkisini araştırması da bu tarihsel birikimin parçasıdır.",
          "Van Niel'in farklı elektron kaynakları üzerinden kurduğu yaklaşım ve Ruben ile çalışma arkadaşlarının izotop deneyleri O₂ kaynağını aydınlattı. Hill'in uygun ışık, su ve elektron alıcısı içeren kloroplast düzeneği CO₂ bağlanmasından ayrı O₂ çıkışını incelemeye olanak verdi. Deneyin gözlediği sonuç, kendi öncülleriyle değerlendirilir; tek bir tarih bütün mekanizmanın bir anda bulunduğu anlamına gelmez.",
        ],
      },
      {
        title: "Kloroplastın zarfı ve iç bölmeleri",
        paragraphs: [
          "Kloroplast iki zarla çevrili bir organeldir. İçteki stroma sıvısında DNA, RNA, ribozomlar ve birçok enzim bulunur. Ayrı tilakoit zar sistemi, yassı keseciklerin ve onları bağlayan lamellerin oluşturduğu ağı içerir; kesecik içindeki hacim lümendir.",
          "Tilakoit yığınlarından birine granum, çoğuluna grana denir. Stroma ile yapraktaki gaz alışveriş açıklığı olan stoma farklı sözcüklerdir. Işık tepkimelerinin zar düzenekleri tilakoitte, Calvin karbon tepkimelerinin temel enzimleri stromada yer alır; bu yer ayrımı madde akışını anlamayı kolaylaştırır.",
        ],
      },
      {
        title: "Kısmi genetik bağımsızlık",
        paragraphs: [
          "Kloroplastın kendi DNA ve ribozomları vardır; bazı proteinlerini içeride sentezleyebilir ve hücrenin düzenlemesi altında çoğalabilir. Bu özellik organelin genetik katkısını gösterir. Buna rağmen kendi başına eksiksiz ve bağımsız bir hücre değildir.",
          "Kloroplast işlevlerinde kullanılan birçok protein çekirdek genleri tarafından kodlanır, sitozolde sentezlenir ve organelin içine taşınır. Bu yüzden bütün fotosentez enzimlerini yalnız kloroplast ribozomları yapar demek doğru değildir. Aynı organelde hem kendi hem çekirdek kökenli ürünlerin iş birliği bulunur.",
        ],
      },
      {
        title: "Işığın dalga boyu ve fotonu",
        paragraphs: [
          "Işık elektromanyetik enerjidir; aynı dalganın ardışık iki tepe noktası arası dalga boyudur. Görünür ışık yaklaşık 380–750 nm aralığıyla ifade edilebilir; sınırlar algı ve tanıma göre yaklaşık değerlerdir. Bir fotonun enerjisi E=hc/λ olduğundan aynı ortam yaklaşımında kısa dalga boyu daha yüksek foton enerjisi taşır.",
          "Dalga boyu, ışık şiddeti ve toplam foton sayısı aynı nicelik değildir. Kısa dalga boylu bir foton daha enerjik olsa da bütün bitkide en yüksek fotosentez hızının tek ölçütü bu değildir. Pigmentin soğurması ve enerjinin biyolojik kullanımı ayrıca önemlidir; ayrıntılı hız faktörleri sonraki başlıktadır.",
        ],
      },
      {
        title: "Klorofil neden yeşil görünür?",
        paragraphs: [
          "Pigmentler bazı dalga boylarını soğurur, bazılarını yansıtır veya geçirir. Bitki klorofilleri özellikle mavi ve kırmızı bölgeleri güçlü soğurur; yeşil ışığın daha büyük bölümü yansıyıp geçebilir. Yeşil görünüm, pigmentin yeşil fotonları en iyi kullandığının kanıtı değildir.",
          "Klorofilin yapısında C, H, O, N ve merkezde Mg bulunur. Fe, klorofilin yapısal merkez atomu değildir; klorofil yapımı ve fotosentetik işlevle ilişkili proteinlerde rol alabilir. Bir mineralin yapıya katılması ile o yapının sentezine yardımcı olması ayrı ilişkilerdir.",
        ],
      },
      {
        title: "Yardımcı pigment ve spektrum",
        paragraphs: [
          "Karoten, ksantofil ve likopen gibi karotenoitler bitkilerde farklı renklerle ilişkili pigment örnekleridir. Bazıları ışık yakalama aralığını genişletmeye ve fazla ışık etkilerine karşı korumaya katkı verir. Enerji aktarımı pigmentler arasında gerçekleşebilir; her pigment aynı dalga boyunu aynı verimle soğurmaz.",
          "Soğurma spektrumu pigmentin ışık almasını, eylem spektrumu ise belirli koşulda fotosentetik etkinliğin dalga boyuyla ilişkisini anlatır. Bu eğriler ilgili fakat özdeş değildir. Engelmann'ın ipliksi alg ve O₂'ye yönelen bakterilerle yaptığı karşılaştırmada bakteri kümelenmesi, algin yerel O₂ çıkışı için dolaylı göstergedir.",
        ],
      },
      {
        title: "Ürün ve kaynakları doğru izle",
        paragraphs: [
          "CO₂ karbonu, trioz fosfat ve ondan türeyen şekerlerin karbon iskeletine katılabilir. Ürünler nişasta olarak depolanabilir, sakkaroz gibi biçimlerde taşınabilir veya başka metabolik yapılara dönüştürülebilir. Protein ya da azotlu baz üretimi için karbonun yanında uygun azot kaynakları da gerekir. Çok sayıda serbest küçük şeker yerine daha büyük nişasta yapılarında depolama, aynı glikoz birimi sayısı için çözünmüş parçacık sayısını ve osmotik yükü azaltır. Nişasta uygun enzimlerle yeniden kullanılabilir; bu, bütün koşullarda hiç osmotik etkisi yoktur demek değildir.",
          "Fotosentez yapan bitki aynı zamanda hücresel solunum yapar; gözlenen net O₂ çıkışı brüt üretim ile eş zamanlı tüketimin farkını yansıtabilir. Bu nedenle dışarıda gaz çıkışı görülmemesi tek başına fotosentezin hiç olmadığı kanıtı değildir. Buradaki madde modeli solunumu ayrıca hesaplamaz; yalnız belirtilmiş brüt fotosentez bütçesidir.",
        ],
      },
    ],
    examples: [
      {
        title: "İki heksoz eşdeğerini ölçekle",
        prompt:
          "Oksijenli fotosentez için verilen brüt özet 6CO₂+12H₂O→1 heksoz eşdeğeri+6O₂+6H₂O. Başka süreç yok. 2 mol heksoz eşdeğeri için CO₂, brüt su girdisi, su çıktısı ve net su tüketimi?",
        strategy: "Her katsayıyı aynı çarpanla büyüt.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "2 mol eşdeğer için CO₂=12 mol ve brüt su girdisi=24 mol.",
          },
          {
            label: "Adım 2",
            explanation: "Su çıktısı=12 mol; O₂ çıktısı=12 mol.",
          },
          {
            label: "Adım 3",
            explanation:
              "Net su tüketimi=24−12=12 mol. Bu brüt mekanizma özeti tek basamak glikoz oluşumu değildir.",
          },
        ],
        answer: "12 CO₂, 24 su girdisi, 12 su çıktısı, 12 net su molü.",
        check:
          "Karbon giriş/çıkışı 12 mol atom, toplam H 48 mol atom ve O48 mol atom olarak dengelenir.",
        pitfall: "Brüt su girdisini net tüketim diye yazmak.",
      },
      {
        title: "İşaretli su",
        prompt:
          "Kısa bir oksijenli fotosentez izotop modelinde suyun bütün oksijenleri ¹⁸O ile işaretli, CO₂ normal. Su–CO₂ arasında ek oksijen değişimi yok; çıkan O₂ yalnız su oksijeninden geliyor. 3 mol O₂ içindeki işaretli O atom molü?",
        strategy: "Molekül ile atom sayısını ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Her O₂ iki O atomu taşır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Verilen kaynak koşulunda iki atom da işaretli sudan gelir.",
          },
          {
            label: "Adım 3",
            explanation: "3 mol O₂×2=6 mol işaretli O atomu.",
          },
        ],
        answer: "6 mol işaretli O atomu.",
        check:
          "Bu sayı işaretli su molekül molüyle aynı olmak zorunda değil; sorulan gaz atomlarıdır.",
        pitfall:
          "CO₂ de oksijen içeriyor diye gazın kaynağını otomatik CO₂ saymak.",
      },
      {
        title: "Foton enerjisi kıyası",
        prompt:
          "Foton için E=hc/λ veriliyor; h ve c iki ışıkta aynı. Biri 450 nm, diğeri 675 nm. 450 nm fotonunun enerjisi 675 nm fotonunun kaç katı?",
        strategy: "Ters orantıda payları dikkatle kur.",
        steps: [
          {
            label: "Adım 1",
            explanation: "E450/E675=(hc/450)/(hc/675).",
          },
          {
            label: "Adım 2",
            explanation: "Ortak hc sadeleşir; oran 675/450=1,5.",
          },
          {
            label: "Adım 3",
            explanation:
              "Bu tek foton enerjisi oranıdır; toplam ışık gücü veya bitkinin fotosentez hızı oranı verilmez.",
          },
        ],
        answer: "1,5 kat.",
        check: "Kısa dalga boyu daha yüksek foton enerjisi verir.",
        pitfall:
          "Foton enerjisi oranını her koşulda fotosentez hızı oranı saymak.",
      },
      {
        title: "Brüt ile net O₂",
        prompt:
          "Bir yaprağın aynı zaman aralığında fotosentezle brüt 12 birim O₂ oluşturduğu, solunum ve ilgili tüketimle 4 birim O₂ kullandığı açık veriliyor. Başka gaz alışverişi yok. Dışarı net O₂ ve yorum?",
        strategy: "Giriş ve çıkışı aynı zaman aralığında ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Brüt üretim 12 birimdir; bu biyolojik üretimin toplamıdır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Tüketim 4 birim çıkarılır; dışarı net 12−4=8 birim O₂ kalır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Net 8, brüt üretimin 8 olduğu veya solunumun durduğu anlamına gelmez.",
          },
        ],
        answer: "8 birim net O₂.",
        check: "Net+ tüketim=8+4=12 brüt üretim.",
        pitfall: "Fotosentetik canlı solunum yapmaz varsayımını eklemek.",
      },
    ],
    recall: [
      {
        prompt: "Gaz O₂'nin temel kaynağı?",
        answer:
          "Oksijenli fotosentezde suyun yükseltgenmesi; bunu yalnız net denklem değil mekanizma ve izotop kanıtı destekler.",
      },
      {
        prompt: "Stroma ile stoma farkı?",
        answer:
          "Stroma kloroplastın sıvı bölmesi; stoma yaprakta gaz alışveriş açıklığıdır.",
      },
      {
        prompt: "Kloroplast bütün proteinlerini kendi mi yapar?",
        answer:
          "Hayır; bazıları içeride, birçok çekirdek kodlu protein sitozolde sentezlenip içeri alınır.",
      },
      {
        prompt: "Kısa dalga boyu neyi artırır?",
        answer:
          "E=hc/λ ilişkisiyle tek foton enerjisini; bütün koşullarda fotosentez hızını tek başına belirlemez.",
      },
    ],
    items: [
      [
        "Oksijenli bitki fotosentezinde açığa çıkan O₂'nin oksijen atomlarının temel kaynağı?",
        "Su",
        [
          "Yalnız CO₂",
          "Klorofilin Mg atomu",
          "Toprağın hazır glikozu",
          "Yalnız ATP'nin karbonu",
        ],
        "Elektron vericisinin yükseltgenmesini düşün.",
        "Oksijenli akışta su elektron kaynağıdır ve oksijen oluşur. İzotop çalışmaları bu kaynağı destekler; net denklemdeki atom sayımı tek başına mekanistik köken kanıtı değildir.",
      ],
      [
        "6CO₂+12H₂O→C₆H₁₂O₆+6O₂+6H₂O brüt özetinde bir heksoz eşdeğeri için net su tüketimi kaç mol?",
        "6",
        ["12", "18", "0", "24"],
        "Giren sudan çıkan suyu çıkar.",
        "Brüt 12 mol su girer, 6 mol su ürün tarafında bulunur. Net tüketim 12−6=6 mol olur; brüt girdi ile net değişim farklıdır.",
      ],
      [
        "Siyanobakteri oksijenli fotosentez yapabiliyor. Doğru yorum?",
        "Kloroplast olmadan uygun fotosentetik zar sistemi kullanılabilir",
        [
          "Fotosentez için her hücre mutlaka kloroplast taşır",
          "Bakteride mutlaka zarla çevrili çekirdek vardır",
          "O₂ üretimi hiçbir zaman suyla ilişkili değildir",
          "Bütün bakteriler aynı şekilde fotosentez yapar",
        ],
        "Organel ile süreç aynı kavram değildir.",
        "Siyanobakteri prokaryottur; ökaryot kloroplastını taşımaz fakat fotosentetik zar düzenekleri vardır. Tek örnek bütün bakterilerin aynı beslenme biçiminde olduğu sonucunu vermez.",
      ],
      [
        "Bir bitki kloroplastında Calvin döngüsünün temel enzimlerinin bulunduğu sıvı bölme?",
        "Stroma",
        [
          "Yaprak stomasının hava açıklığı",
          "Mitokondri kristası",
          "Hücre dışı kütikula",
          "Yalnız granumlar arası hava",
        ],
        "Benzer adları farklı ölçeklerde düşün.",
        "Stroma kloroplastın tilakoitler dışındaki sıvı bölmesidir. Stoma yaprak gaz açıklığıdır; iki sözcük farklı yapıları belirtir.",
      ],
      [
        "Klorofilin merkez yapısal minerali Mg olarak verilmiş; Fe sentezle ilişkili proteinlerde görev alabiliyor. Doğru ayrım?",
        "Yapıya katılmak ile senteze katkı vermek aynı ilişki değildir",
        [
          "Fe mutlaka klorofilin merkezindeki Mg'dir",
          "Mg ışığın yerine geçerek atom yaratır",
          "Bir mineral yardımcıysa tüm yapı ondan oluşur",
          "Klorofil bir DNA kodonudur",
        ],
        "Merkez atomu ve enzim katkısını ayrı say.",
        "Mg klorofilin yapısındadır; Fe başka protein ve süreçlerle sentezi/işlevi etkileyebilir. Bir maddeyi üretime yardımcı olması nedeniyle ürünün her yapısal parçası saymayız.",
      ],
      [
        "E=hc/λ; h ve c sabit. 400 nm fotonu ile 800 nm fotonunun enerjileri oranı E400/E800?",
        "2",
        ["0,5", "1", "4", "800"],
        "Enerji dalga boyuyla ters orantılı.",
        "(hc/400)/(hc/800)=800/400=2. Bu foton enerjisi kıyasıdır; 800 nm'nin görünür olup olmadığı veya biyolojik hız başka sorudur.",
      ],
      [
        "Bir pigment mavi ve kırmızıyı güçlü soğurup yeşilin çoğunu yansıtıyor. Yeşil görünmesi neyi gösterir?",
        "Göze ulaşan yeşil ışık payı yüksek olabilir",
        [
          "Yeşil fotonları kesin en iyi soğurur",
          "Fotosentez yalnız yeşil ışıkta olur",
          "Pigmentin atomları yeşile dönüşür",
          "Bütün dalga boylarında aynı soğurma vardır",
        ],
        "Görünen renk ile soğurulan rengi ayır.",
        "Yansıtılan veya geçirilen yeşil ışık göze ulaşabilir; görünüm güçlü yeşil soğurmanın kanıtı değildir. Pigmentin soğurduğu enerji ayrı bir ölçüttür.",
      ],
      [
        "Kloroplastın DNA, ribozom ve protein sentezi işleyişi için hangisi doğru değildir?",
        "Bütün fotosentez enzimlerinin yalnız organel içinde sentezlendiği",
        [
          "Bazı genlerini organel içinde ifade edebildiği",
          "Hücresel düzenlemeyle organelin çoğalabildiği",
          "Çekirdek kodlu proteinlerin de katkı verebildiği",
          "Organelin genetik katkısının bulunduğu",
        ],
        "Kısmi bağımsızlık tam hücresel bağımsızlık değildir.",
        "Birçok kloroplast proteini çekirdek tarafından kodlanıp sitozolde üretilerek içeri taşınır. Kendi DNA/ribozomu bütün proteinleri yalnız başına yapma sonucu vermez.",
      ],
      [
        "Bir yaprak aynı sürede brüt 10 birim O₂ üretiyor ve 4 birim tüketiyor; başka gaz süreci yok. Net dış O₂?",
        "6",
        ["10", "14", "4", "0"],
        "Üretimden tüketimi çıkar.",
        "Net 10−4=6 birimdir. Bu yaprağın solunumu durduğu veya brüt üretimin 6 olduğu anlamına gelmez; iki akış ayrı tutulur.",
      ],
      [
        "Oksijen üretmeyen bazı fotosentetik bakteriler için elektron vericisi H₂S olarak verilmiş. Doğru çıkarım?",
        "Her fotosentezde su vericisi ve O₂ yan ürünü zorunlu değildir",
        [
          "Bütün fotosentez kesin O₂ çıkarır",
          "Bu bakteriler ışık enerjisinden hiç yararlanamaz",
          "H₂S elektron vericiyse karbon atomları yok olur",
          "Bu örnek bitkilerin de kesin H₂S kullandığını kanıtlar",
        ],
        "Örneğin kapsamını koru.",
        "Farklı elektron vericisi farklı yan ürünle ilişkili olabilir. Oksijenli bitki bütçesi bütün fotosentetik organizmalara koşulsuz genellenmez; verilen bakteri örneği bu sınırı gösterir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 PDF 55–58; OGM Dersler Cepte Canlılık ve Enerji PDF 12–13,15; OGM Fotosentezin Önemi sunusu PDF 3–25 seçili metin/gerçek denklem şekilleri. İzotop ve brüt/net bütçe modelleri açık koşullarla özgündür.",
  },
  {
    id: "ayt-fotosentez-tepkimeler",
    topic: "detail-335",
    title: "Fotosentez tepkimeleri: ışık ve Calvin bütçesi",
    minutes: 65,
    objectives: [
      "Temel kavramı mekanizması ve somut örneğiyle açıkla.",
      "Verilen yön, sayı ve koşullarla adım adım çözüm kur.",
      "Modelin gösterdiği sonucu kanıtıyla ve sınırıyla yorumla.",
    ],
    sections: [
      {
        title: "İki evre birbiriyle bağlantılıdır",
        paragraphs: [
          "Oksijenli fotosentezde ışığa bağlı tepkimeler, ışık enerjisini ATP ve NADPH gibi geçici taşıyıcılara aktarır. Calvin döngüsü ise bu taşıyıcılarla CO₂'nin organik karbon bileşiklerine dönüştürülmesini destekler. Bir evrenin ürünü diğerinin girdisidir; birbirinden kopuk iki süreç olarak düşünülmez.",
          "Bitki kloroplastında ışık akışının temel düzenekleri tilakoit zarında, Calvin enzimleri stromada bulunur. ATP enerji aktarımında, NADPH indirgeme gücü sağlamada farklı rol taşır. Bu iki taşıyıcı birbirinin yerine aynı mol sayısıyla kullanılmaz.",
        ],
      },
      {
        title: "Fotosistem ve uyarılma",
        paragraphs: [
          "Fotosistem, ışık yakalayan pigmentler ile özel tepkime merkezi ve ilişkili proteinlerin düzenidir. Pigmentlerin soğurduğu enerji merkeze aktarılabilir; merkezin elektronu daha yüksek enerji düzeyine uyarılır ve uygun alıcıya geçer. Elektron verilince merkez yükseltgenmiş, elektron alan yapı indirgenmiş olur.",
          "Doğrusal oksijenli akışta iki fotosistem birlikte görev yapar: işleyiş sırası fotosistem II, ara taşıyıcılar ve fotosistem I biçimindedir. II ve I adları elektron yolundaki sıra numarası gibi okunmaz. Işık iki noktada enerji katkısı verir; basit tek basamak çizim bütün mekanizmayı göstermez.",
        ],
      },
      {
        title: "Suyun yükseltgenmesi",
        paragraphs: [
          "Fotosistem II ile ilişkili su ayrıştırma düzeneğinde 2H₂O→O₂+4H⁺+4e⁻ net basamağı yazılabilir. Elektronlar, ışıkla elektron vermiş fotosistem II merkezini tamamlar. Açığa çıkan protonlar tilakoit lümeni tarafındaki bütçeye katkı verir; O₂ yan üründür.",
          "O₂'nin oluşması için burada su elektron vericisidir; karbon sabitleme basamağı doğrudan O₂ üretmez. Fotoliz sözcüğü bu ışıkla bağlantılı su yükseltgenmesini özetler. Her bir O₂ için dört elektronluk kaynak hesabı, foton sayısı veya ATP verimiyle ayrıca koşulsuz eşitlenmez.",
        ],
      },
      {
        title: "Elektron taşıma sistemi",
        paragraphs: [
          "Elektronlar uygun taşıyıcılar üzerinden ilerlerken bazı basamakların enerjisi proton gradyanının kurulmasına bağlanır. Tilakoit zarında bulunan taşıma düzenekleri, lümen ile stroma arasında protonların farklı dağılımını destekler. Zarın bölmeleri ayırması bu enerji eşleşmesinde temel önemdedir.",
          "Elektron kendiliğinden ATP molekülüne dönüşmez. Elektron aktarımı, proton taşınması ve ATP sentezi bağlantılı fakat ayrı olaylardır. Bir taşıyıcının elektron alması indirgenme, vermesi yükseltgenmedir; akış boyunca bu roller sırayla yinelenebilir.",
        ],
      },
      {
        title: "ATP sentaz ve proton dönüşü",
        paragraphs: [
          "Oluşan proton gradyanından yararlanan ATP sentaz, protonların uygun yönde lümenden stromaya dönüşünü ATP üretimine bağlar. ADP ve inorganik fosfattan ATP sentezlenir; enerji girişi ışık akışıyla desteklendiği için bu üretim fotofosforilasyon olarak adlandırılır.",
          "Gradyanın varlığı, zar bütünlüğü ve işleyen enzim düzeni birlikte gerekir. Protonları iki tarafta eşitleyen bir etki, diğer koşullar sabitken bu enerji bağlantısını zayıflatabilir. Elektron başına kesin ATP sayısı vermek için ek mekanistik oranlar gerekir; bu ünitenin bütçe modeli hazır kullanılabilir ATP stoğunu açık veri olarak alır.",
        ],
      },
      {
        title: "NADPH nasıl oluşur?",
        paragraphs: [
          "Fotosistem I'den çıkan yüksek enerjili elektronlar uygun taşıyıcılar ve enzim üzerinden NADP⁺'nin indirgenmesine katılır. Temel yarı denklem NADP⁺+2e⁻+H⁺→NADPH biçiminde ifade edilir. Bu ürün Calvin tepkimelerinde indirgeme gücü sağlar.",
          "Yalnız proton tutmak indirgenme için yeterli değildir; elektron katkısı gerekir. NADPH işlevini yerine getirdikten sonra NADP⁺ biçimi geri kazanılabilir. Taşıyıcının dönüşmesi, nikotinamid yapısının her çevrimde baştan yaratıldığı anlamına gelmez; bir havuz içinde yükseltgenme–indirgenme dönüşümü vardır.",
        ],
      },
      {
        title: "Döngüsel akışı ayrı tut",
        paragraphs: [
          "Bazı koşullarda fotosistem I çevresindeki döngüsel elektron akışı, proton gradyanına ve ATP üretimine katkı verebilir. Bu yolun kendisi doğrusal akıştaki gibi net NADPH veya su kaynaklı O₂ üretimi sağlamaz. Böylece enerji taşıyıcılarının gereksinimleri farklı yollarla dengelenebilir.",
          "Bu karşılaştırma bütün hücrenin aynı anda hiçbir O₂ üretmediği anlamına gelmez; başka bölgede doğrusal akış da sürebilir. Bir yolun net çıktısı ile bütün kloroplastın birleşik çıktısı ayrı sorulardır. Temel modelde ölçülmüş veya verilmiş taşıyıcı stokları kullanılır, sabit bir ATP/NADPH üretim oranı uydurulmaz.",
        ],
      },
      {
        title: "Calvin döngüsünde karbon bağlama",
        paragraphs: [
          "Calvin döngüsünde Rubisco, CO₂'nin beş karbonlu RuBP ile birleşmesini katalizler. Oluşan kararsız altı karbonlu ara yapı iki üç karbonlu PGA ürününe ayrılır. Üç CO₂ için üç RuBP'nin toplam 15 karbonuna 3 yeni karbon eklenir ve altı PGA'da 18 karbon bulunur.",
          "Bu ilk bağlama, bütün karbonun doğrudan serbest glikoz olduğu anlamına gelmez. Sonraki indirgenme ve alıcı yenileme basamakları gereklidir. Rubisco'nun oksijenle ilgili başka etkinliği ve fotorespirasyon bu basit net bütçenin dışında tutulmuştur; gereken koşul modelde açıktır.",
        ],
      },
      {
        title: "PGA'dan trioz fosfata",
        paragraphs: [
          "Üç CO₂'lik standart net hesapta altı PGA'nın indirgenmeye hazırlanması ve indirgenmesi 6 ATP ile 6 NADPH kullanır. Üç karbonlu trioz fosfat türleri, ders düzeyinde PGAL/G3P adıyla temsil edilebilir. Altı trioz fosfat toplam 18 karbonu taşır.",
          "NADPH elektron ve indirgeme gücü aktarır, ATP ise enerji aktarımı sağlar. İki türün görevleri ve tüketim katsayıları farklı olduğundan birini ötekinin yerine koymayız. Bu aşamada oluşan bütün triozlar döngüden net ürün diye ayrılamaz; karbon alıcısı RuBP'nin yeniden kurulması gerekir.",
        ],
      },
      {
        title: "Bir çıkış, beş yenileme",
        paragraphs: [
          "Altı üç karbonlu ürünün birinin net çıkışa ayrılması 3 karbon kazandırır. Kalan beşinin 15 karbonu yeniden üç adet beş karbonlu RuBP oluşturur; bu yenilemede 3 ATP daha kullanılır. Böylece başlangıç alıcısı korunur ve yeni CO₂ bağlamak için düzenek yeniden hazırlanır.",
          "Üç CO₂ için net bir trioz fosfat kazanımının toplam enerji bütçesi 9 ATP ve 6 NADPH olur. Altı PGAL'ın hepsini net dışarı çıkarmak, RuBP yenilenmesini siler ve döngünün devamını açıklayamaz. Bütçe modelinde kullanılmayan başlangıç RuBP havuzu da kaybolmaz; tamamlanan paketler kendi alıcısını yeniden kurar.",
        ],
      },
      {
        title: "Heksoz ve başka ürünler",
        paragraphs: [
          "İki net üç karbonlu ürün, uygun sonraki dönüşümlerle bir altı karbonlu şeker eşdeğerine katkı sağlar. Bu yüzden 6 CO₂ için ideal standart net Calvin bütçesi 18 ATP ve 12 NADPH olarak yazılabilir. Bu hesap glikozun bir tek döngü adımında doğrudan çıktığı anlamına gelmez.",
          "Triozlar karbonhidrat yanında yağ asidi, gliserol ve başka organik yapıların karbon iskeletlerine gidebilir. Amino asit veya azotlu baz için uygun azot girdileri de gerekir; yalnız CO₂, su ve ışık azot atomu üretmez. Nişasta depolama ile taşınan şeker ve anlık enerji kullanımı farklı ürün kaderleridir.",
        ],
      },
      {
        title: "Taşıyıcıların geri dönüşü",
        paragraphs: [
          "ATP kullanılan basamaklardan ADP ve fosfat içeren ürünler, NADPH kullanılan basamaklardan NADP⁺ geri kazanılır. Bunlar ışık evresindeki yenilenmeye bağlanabilir. Belirli bir tam atom/fosfat bütçesi istenirse trioz fosfatın taşıdığı fosfat da hesaba katılır; her fosfatın anında serbest Pi olduğu varsayılmaz.",
          "Bu geri dönüş, taşıyıcıların işlevsel havuzlar olarak kullanılmasını gösterir. Enerji aynı biçimde döngü yapmaz; yeni ışık enerjisi girişi ve ısı kayıpları söz konusudur. ATP ve NADPH stoğu azaldığında sınırlı net üretim kapasitesi de azalır.",
        ],
      },
      {
        title: "Işıktan bağımsız ne demektir?",
        paragraphs: [
          "Calvin tepkimeleri doğrudan foton soğuran bir klorofil basamağı değildir; bu yüzden ışıktan bağımsız olarak adlandırılır. Ancak kullanılabilir ATP/NADPH, uygun enzim durumu ve CO₂ gerekir. Sürekli karanlıkta yenilenmeyen taşıyıcı stoklarıyla sınırsız üretim beklenmez.",
          "Işık kapandığı anda her koşulda bütün karbon tepkimeleri matematiksel olarak sıfır olur genellemesi de yapılmaz. Kısa süreli stoklar ve enzim düzenlemesi deney koşuluna bağlıdır. Model yalnız açıkça verilmiş kullanılabilir havuzlarla tamamlanabilen net paketleri sayar; gerçek zaman hızı veya kısmi ara ürün birikimini hesaplamaz.",
        ],
      },
      {
        title: "Bir bütçe sorusunu yönet",
        paragraphs: [
          "Önce hangi net ürünün istendiğini tanımla: bir CO₂ bağlanması, bir net trioz ya da bir heksoz eşdeğeri farklı ölçeklerdir. Sonra gerekli karbon, ATP ve NADPH miktarlarını aynı ölçeğe çevir. Sonlu stok varsa en küçük tam paket kapasitesi sonucu sınırlar.",
          "Kalan stokların negatif olmaması ve karbon giriş–çıkışının korunması son denetimdir. Örneğin az ATP nedeniyle tam paket kurulamaması, gerçek hücrede hiçbir ilk ara tepkime olamaz demek değildir; bu model kısmi paketleri dışarıda bırakır. Sonucu kapsamıyla birlikte okumak hem hesap hem mekanizma bilgisini geliştirir.",
        ],
      },
    ],
    examples: [
      {
        title: "Bir net triozun bütçesi",
        prompt:
          "Standart Calvin net modeli:3 CO₂ için 1 net 3 C trioz, 9 ATP ve 6 NADPH gerekir; fotorespirasyon ve başka süreç yok. 6 CO₂ ile elde edilecek net trioz ve tüketimler?",
        strategy: "Üç CO₂'lik paketi ölçekle.",
        steps: [
          {
            label: "Adım 1",
            explanation: "6 CO₂, iki adet 3 CO₂ paketidir.",
          },
          {
            label: "Adım 2",
            explanation: "Net trioz 2; ATP 2×9=18 ve NADPH 2×6=12.",
          },
          {
            label: "Adım 3",
            explanation:
              "İki trioz toplam 6 karbon taşır; uygun sonraki basamaklarda 1 heksoz eşdeğerine katkı sağlar.",
          },
        ],
        answer: "2 net trioz, 18 ATP, 12 NADPH.",
        check: "Bağlanan karbon 6; dış net triozlardaki karbon 2×3=6.",
        pitfall: "Altı ara triozun tamamını net ürün saymak.",
      },
      {
        title: "Sonlu stokta sınırlayıcı",
        prompt:
          "Tam paket modeli: her 3 CO₂, 9 ATP ve 6 NADPH ile 1 net trioz oluşturur; yalnız tamamlanan paketler sayılır. Başlangıç 9 CO₂, 20 ATP, 18 NADPH ve yeterli yenilenen RuBP var. Son net trioz ve artık stoklar?",
        strategy: "Her girdinin sağlayabileceği tam paket sayısını bul.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "CO₂ kapasitesi 9/3=3; ATP kapasitesi floor(20/9)=2; NADPH kapasitesi 18/6=3.",
          },
          {
            label: "Adım 2",
            explanation:
              "İki tam paket tamamlanır; CO₂ 6, ATP 18, NADPH 12 tüketilir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Net trioz 2; kalan CO₂ 3, ATP 2 ve NADPH 6. Kısmi ara basamaklar bu modelde sayılmaz.",
          },
        ],
        answer: "2 net trioz; 3 CO₂, 2 ATP, 6 NADPH kalır.",
        check:
          "Hiçbir stok negatif değildir; net ürün karbonu 6, tüketilen CO₂ karbonuna eşittir.",
        pitfall:
          "En büyük stok kapasitesini seçmek veya yarım paketi tam ürün saymak.",
      },
      {
        title: "Altı trioz neden bir net ürün?",
        prompt:
          "Üç CO₂ ve üç RuBP(her biri 5 C) ile başlayan standart döngüde 6 PGA, ardından 6 PGAL(her biri 3 C) oluşuyor. RuBP havuzu yenilenecek. Net çıkış ve geri dönüş karbonları?",
        strategy: "Alıcı karbonunu yeni bağlanan karbondan ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Başlangıç RuBP 15 C, yeni CO₂ 3 C; toplam 18 C.",
          },
          {
            label: "Adım 2",
            explanation: "Altı PGAL 18 C'dir. Bir PGAL 3 C net ayrılır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Beş PGAL 15 C, üç RuBP 15 C'yi yeniler; alıcı havuzu korunur.",
          },
        ],
        answer: "1 net PGAL; 5 PGAL yenilemeye gider.",
        check: "18 C=3 C net çıkış+15 C yenilenmiş alıcı.",
        pitfall:
          "Başlangıç alıcısının karbonunu her seferinde yeni kazanılmış karbon saymak.",
      },
      {
        title: "Kısa karanlık stok modeli",
        prompt:
          "Işık yeni taşıyıcı üretimi sağlamıyor. Enzimlerin kısa aralıkta etkin kaldığı, kullanılabilir 9 ATP/6 NADPH ve 3 CO₂ bulunduğu açık veriliyor. Model 3 CO₂ başına 9 ATP/6 NADPH ile 1 tam net trioz sayıyor; kısmi yollar yok. Kaç paket?",
        strategy: "Mevcut stoğu yeni üretimden ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Verilen kullanılabilir stok tam bir paketin 9 ATP ve 6 NADPH gereksinimini karşılar.",
          },
          {
            label: "Adım 2",
            explanation: "3 CO₂ ile 1 net trioz paketi tamamlanabilir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Taşıyıcılar yenilenmezse bu stokla ikinci paket sürdürülemez; gerçek süre veya genel karanlık verimi hesaplanmaz.",
          },
        ],
        answer: "Verilen kısa stok koşulunda 1 tam paket.",
        check:
          "Son ATP ve NADPH stokları bu paket sayımında 0; enerji yeniden yaratılmaz.",
        pitfall:
          "Işıktan bağımsız adından sınırsız karanlık üretimi ya da koşulsuz anlık sıfır çıkarmak.",
      },
    ],
    recall: [
      {
        prompt: "Doğrusal oksijenli akış sırası?",
        answer:
          "Su→fotosistemII→araETS→fotosistemI→NADP⁺; iki ışık uyarımı ve proton gradyanı bağlantısı vardır.",
      },
      {
        prompt: "ATP sentazda proton yönü?",
        answer:
          "Kloroplast tilakoitinde uygun gradyanla lümenden stromaya dönüş ATP sentezine bağlanır.",
      },
      {
        prompt: "3 CO₂ için net ürün ve enerji?",
        answer:
          "Standart net Calvin bütçesinde 1 üç karbonlu trioz; 9 ATP ve 6 NADPH.",
      },
      {
        prompt: "6 PGAL'ın hepsi neden net ürün değil?",
        answer:
          "Beşinin 15 karbonu 3 RuBP alıcısını yeniler; yalnız 1 PGAL 3 C net çıkar.",
      },
    ],
    items: [
      [
        "Oksijenli doğrusal fotosentetik elektron akışında verilen yapıların doğru sırası?",
        "Fotosistem II → ara ETS → fotosistem I → NADP⁺",
        [
          "Fotosistem I → DNA → fotosistem II → pepsin",
          "NADP⁺ → Calvin → suyun çekirdeği",
          "Yalnız fotosistem I her durumda bütün suyu parçalar",
          "Elektron → amino asit → kromozom",
        ],
        "I ve II adlarını keşif adı olarak düşün; yol sırasını karıştırma.",
        "Doğrusal akışta su kaynaklı elektronlar PSII üzerinden ara taşıyıcılara, PSI'a ve uygun enzimle NADP⁺'ye aktarılır. Tek ışık sıçraması bütün yolu göstermez.",
      ],
      [
        "Net su yükseltgenmesi 2H₂O→O₂+4H⁺+4e⁻ olarak verilmiş. 2 mol O₂ için sağlanan elektron molü?",
        "8",
        ["2", "4", "1", "16"],
        "Her O₂ için dört elektron.",
        "2×4=8 mol elektron kaynak hesabı bulunur. Bu sayı doğrudan aynı mol ATP veya aynı mol foton gerektiği anlamına gelmez; ek oranlar ayrı verilmelidir.",
      ],
      [
        "Kloroplastta uygun proton gradyanıyla çalışan ATP sentazda, protonların ATP sentezine bağlanan temel dönüş yönü?",
        "Tilakoit lümeninden stromaya",
        [
          "Stromadan çekirdek içine",
          "Ribozomdan DNA'ya",
          "Kloroplast dışından doğrudan kromozoma",
          "Suyun O atomundan Mg atomuna",
        ],
        "Bölmeleri zarın iki tarafı olarak düşün.",
        "Işık akışı lümen tarafında proton birikimini destekler; uygun proton dönüşü ATP sentaz üzerinden stromaya olur. Elektron aktarımı ve ATP sentezi gradyanla bağlanır, elektron ATP'ye dönüşmez.",
      ],
      [
        "NADP⁺+2e⁻+H⁺→NADPH yarı denklemi için doğru yorum?",
        "NADP⁺ elektron alarak indirgenir",
        [
          "Yalnız proton almak her zaman indirgenmeye yeter",
          "NADPH bütün karbonu CO₂'ye verir",
          "Elektronlar madde olmadan yaratılır",
          "NADP⁺ klorofilin Mg atomudur",
        ],
        "İndirgenmede elektron alımı gerekir.",
        "NADP⁺ iki elektron ve proton katkısıyla NADPH olur. NADPH Calvin basamaklarına indirgeme gücü sağlar; yalnız H⁺ tutma ifadesi elektron hesabını eksiltir.",
      ],
      [
        "Standart net Calvin modelinde 3 CO₂ için 9 ATP ve 6 NADPH ile 1 net trioz oluşuyor. 9 CO₂ için ihtiyaç?",
        "27 ATP ve 18 NADPH",
        [
          "9 ATP ve 6 NADPH",
          "18 ATP ve 27 NADPH",
          "6 ATP ve 9 NADPH",
          "3 ATP ve 3 NADPH",
        ],
        "Üç CO₂ paketinden üç tane var.",
        "Her gereksinim 3 ile çarpılır:27 ATP, 18 NADPH ve 3 net trioz. Aynı ölçekte karbon da 9 atomluk mol birimi olarak korunur.",
      ],
      [
        "Üç CO₂ döngüsünde 6 PGAL oluşmuş; her biri 3 C. Üç 5 C RuBP yeniden kurulacak. Net ayrılabilecek PGAL sayısı?",
        "1",
        ["6", "5", "3", "0"],
        "RuBP için 15 C ayrılmalıdır.",
        "Toplam 18 C'nin 15 C'si beş PGAL üzerinden alıcı yenilemeye gider. Geriye 3 C, yani 1 net PGAL kalır; altı ara ürünü net kazanç saymayız.",
      ],
      [
        "Tam paket modelinde her 3 CO₂ için 9 ATP ve 6 NADPH gerekiyor. Başlangıç 6 CO₂, 9 ATP, 12 NADPH; yalnız tam net ürün sayılıyor. Kaç net trioz?",
        "1",
        ["2", "3", "6", "0"],
        "Her stok için tam paket kapasitesini ayrı bul.",
        "CO₂ iki, ATP bir, NADPH iki paket sağlayabilir; sınır bir pakettir. Son stoklar CO₂ 3, ATP 0, NADPH 6 olur; kısmi ara ürünler bu modelin dışında tutulmuştur.",
      ],
      [
        "Doğrusal akıştan ayrı olarak yalnız fotosistem I çevresindeki döngüsel yolun kendi net katkısı için doğru ifade?",
        "ATP üretimine katkı verebilir; kendi yolunda net NADPH ve O₂ üretmez",
        [
          "Her turda zorunlu 1 glikoz oluşturur",
          "Her turda suyu parçalayarak O₂ verir",
          "Bütün kloroplasttaki diğer yolları kesin durdurur",
          "NADP⁺ yerine DNA'yı amino aside çevirir",
        ],
        "Seçilen yolun çıktısı ile bütün hücrenin çıktısını ayır.",
        "Döngüsel akış elektronları PSI çevresinde geri döndürerek proton gradyanı ve ATP'ye katkı sağlayabilir. Başka doğrusal yol aynı anda varsa bütün hücredeki O₂ farklı olabilir.",
      ],
      [
        "Işıktan bağımsız Calvin tepkimeleri için hangi ifade doğrudur?",
        "Doğrudan foton kullanmaz; uygun ATP/NADPH ve enzim koşulları gerekir",
        [
          "Yalnız gece sınırsız çalışır",
          "ATP ve NADPH'ye hiçbir zaman gerek duymaz",
          "CO₂'nin karbonunu yok eder",
          "Her koşulda ışık sönünce bütün ara tepkimeler anında matematiksel 0 olur",
        ],
        "Adı doğrudan ışık basamağına göre verilmiştir.",
        "Calvin enerji ve indirgeme gücünü taşıyıcılardan alır; bunların yenilenmesi ışık düzeneklerine bağlıdır. Kısa stok ve enzim durumu verilmeksizin mutlak anlık sonuç veya sınırsız karanlık üretimi söylenmez.",
      ],
      [
        "CO₂ ve sudan karbon iskeleti oluşuyor. Bu iskeletten azot içeren amino asitler üretmek için hangi ek gereksinim vardır?",
        "Uygun azot kaynağı ve ilgili dönüşüm yolları",
        [
          "Yalnız daha çok fotonla yeni azot atomu yaratmak",
          "Mg'yi her durumda azota çevirmek",
          "Her triozu doğrudan tüm proteinlere eşitlemek",
          "Karbon sayısını sıfırlamak",
        ],
        "Element korunumu ile metabolik yolu birlikte düşün.",
        "Karbon ve su girdileri azot atomu sağlamaz. Amino asitlerdeki azot uygun girdilerden kazanılır ve ilgili enzim yollarıyla karbon iskeletine katılır; ışık atom yaratmaz.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 PDF 59–61; OGM Dersler Cepte Canlılık ve Enerji PDF 14–15; OGM Fotosentez TepkimeleriI PDF 7–13 veII PDF 2–11; gerçekII PDF 7 ATP/NADPH karbon bütçesi. Net trioz, alıcı yenileme ve sonlu stok modeli özgündür; kısmi ara ürünler ve gerçek zaman hızı hesaplanmaz.",
  },
];

const positionsA021 = [2, 4, 1, 0, 3, 1, 3, 4, 2, 0];
export const forge021BiologyATopics: Record<string, string> =
  Object.fromEntries(unitsA021.map((u) => [u.id, u.topic]));
export const forge021BiologyAGuides: LessonGuide[] = unitsA021.map(
  ({ id, minutes, objectives, sections, examples, recall, source }) => ({
    id,
    minutes,
    objectives,
    sections,
    examples,
    recall,
    source,
  }),
);
export const forge021BiologyALessons: Lesson[] = unitsA021.map((u, j) => ({
  id: u.id,
  subjectId: "ayt-biyoloji",
  title: txt(u.title),
  minutes: u.minutes,
  objectives: u.objectives.map(txt),
  source: txt(u.source),
  tags: [u.id, "forge021", "kaynakli-anlatim"],
  body: u.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: u.items.map(
    ([prompt, correct, wrong, hint, explanation], i): Question => {
      const answer = (positionsA021[i] + j) % 5,
        options = [...wrong];
      options.splice(answer, 0, correct);
      return {
        id: `f021-bioa-${u.id}-${i + 1}`,
        prompt: txt(prompt),
        options: options.map(txt),
        answer,
        hint: txt(hint),
        explanation: txt(explanation),
        skill: u.id,
      };
    },
  ),
}));
