import type { LessonGuide } from "./guides/types";

type GuideCopyRevision = {
  id: string;
  kind: "paragraph" | "step";
  outer: number;
  inner: number;
  before: string;
  after: string;
};

// Exact display-only revisions. Guide identity and structural positions remain
// unchanged; a different source text is never rewritten by a broad word rule.
const revisions: readonly GuideCopyRevision[] = [
  {
    id: "periyodik-sistem",
    kind: "paragraph",
    outer: 2,
    inner: 0,
    before:
      "Nötr ve temel hâlde ilk 20 element için dolu elektron katmanı sayısı periyodu verir. Al için 2,8,3 dağılımında üç dolu katman vardır; 3. periyottadır. Ana gruplarda son katmandaki elektron sayısı grup hakkında bilgi verir: 1→1. grup, 2→2. grup; 3…8 ise genellikle 13…18. gruplara karşılık gelir. Eski A grubu adları bu son gruplar için 3A…8A biçimindedir.",
    after:
      "Nötr ve temel hâlde ilk 20 element için elektron içeren katman sayısı periyodu verir. Burada katmanın elektron içermesi sayılır; kapasitesinin tamamen dolu olması gerekmez. Al için 2,8,3 dağılımında üç katmanda elektron bulunur; 3. periyottadır. Ana gruplarda son katmandaki elektron sayısı grup hakkında bilgi verir: 1→1. grup, 2→2. grup; 3…8 ise genellikle 13…18. gruplara karşılık gelir. Eski A grubu adları bu son gruplar için 3A…8A biçimindedir.",
  },
  {
    id: "periyodik-sistem",
    kind: "paragraph",
    outer: 4,
    inner: 0,
    before:
      "Aynı grupta aşağı doğru yeni dolu katmanlar eklendiği için atom yarıçapı genel olarak büyür. Aynı periyotta soldan sağa proton sayısı artar; benzer katmanlardaki elektronlar daha güçlü çekildiğinden yarıçap genel olarak küçülür. Bu bir eğilimdir; karşılaştırılan türün atom mu iyon mu olduğu ve ölçülen yarıçap tanımı önemlidir.",
    after:
      "Aynı grupta aşağı doğru elektronların bulunduğu yeni katmanlar eklendiği için atom yarıçapı genel olarak büyür. Aynı periyotta soldan sağa proton sayısı artar; benzer katmanlardaki elektronlar daha güçlü çekildiğinden yarıçap genel olarak küçülür. Bu bir eğilimdir; karşılaştırılan türün atom mu iyon mu olduğu ve ölçülen yarıçap tanımı önemlidir.",
  },
  {
    id: "periyodik-sistem",
    kind: "step",
    outer: 0,
    inner: 1,
    before: "Üç dolu katman ve iki değerlik elektronu vardır.",
    after: "Elektron içeren üç katman ve iki değerlik elektronu vardır.",
  },
  {
    id: "katman-elektron-dizilimi",
    kind: "paragraph",
    outer: 3,
    inner: 1,
    before:
      "İyon oluştururken bu örneklerde en dış dolu katmandan elektron verilir veya dış katmana elektron eklenir. Ca²⁺’ta dıştaki iki elektron gider: 2,8,8. O²⁻’ta toplam 10 elektron olur: 2,8. Geçiş metallerinin iyonlarını bu basit yöntemle genelleme; bu dersin sınırlı örneklerini daha geniş orbital kuramının yerine koyma.",
    after:
      "İyon oluştururken bu örneklerde elektron içeren en dış katmandan elektron verilir veya dış katmana elektron eklenir. Ca²⁺’ta dıştaki iki elektron gider: 2,8,8. O²⁻’ta toplam 10 elektron olur: 2,8. Geçiş metallerinin iyonlarını bu basit yöntemle genelleme; bu dersin sınırlı örneklerini daha geniş orbital kuramının yerine koyma.",
  },
  {
    id: "katman-elektron-dizilimi",
    kind: "paragraph",
    outer: 4,
    inner: 0,
    before:
      "İlk 20 ana grup elementinde nötr temel hâlde dolu katman sayısı periyodu verir. Değerlik elektronu son dolu katmandaki elektron sayısıdır; 1 ve 2 elektron 1. ve 2. gruplarla, 3…8 elektron 13…18. gruplarla ilişkilidir. He iki elektronuna rağmen 18. gruptadır; ilk katmanı tam doludur.",
    after:
      "İlk 20 ana grup elementinde nötr temel hâlde elektron içeren katman sayısı periyodu verir. Bu sayım için katmanların tamamen dolu olması gerekmez. Değerlik elektron sayısı elektron içeren en dış katmandaki elektron sayısıdır; 1 ve 2 elektron 1. ve 2. gruplarla, 3…8 elektron 13…18. gruplarla ilişkilidir. He iki elektronuna rağmen 18. gruptadır; ilk katmanı tam doludur.",
  },
  {
    id: "katman-elektron-dizilimi",
    kind: "paragraph",
    outer: 4,
    inner: 1,
    before:
      "Mg²⁺ iki dolu katmana sahip olsa da Mg elementi 3. periyottadır; periyodu iyonun görünümünden yeniden belirleme. Aynı elektron sayısına sahip türler izoelektronik olabilir fakat proton sayıları farklı olabilir: Ne, Na⁺ ve Mg²⁺ 10’ar elektron taşır. Element kimliğini belirlemek için yük bilgisini de kullan.",
    after:
      "Mg²⁺ iyonunda elektron içeren iki katman olsa da Mg elementi 3. periyottadır; periyodu iyonun görünümünden yeniden belirleme. Aynı elektron sayısına sahip türler izoelektronik olabilir fakat proton sayıları farklı olabilir: Ne, Na⁺ ve Mg²⁺ 10’ar elektron taşır. Element kimliğini belirlemek için yük bilgisini de kullan.",
  },
  {
    id: "katman-elektron-dizilimi",
    kind: "step",
    outer: 1,
    inner: 1,
    before: "Dört dolu katman nedeniyle 4. periyottadır.",
    after:
      "Dört katmanda elektron bulunduğu için 4. periyottadır; bu sayım tam doluluk gerektirmez.",
  },
  {
    id: "ayt-periyodik-sistem-atom-capi",
    kind: "paragraph",
    outer: 1,
    inner: 1,
    before:
      "Bu çalışmanın ilk 36 nötr atom kapsamında temel hâlde dolu orbitaller arasındaki en büyük n, periyodu verir. Bütün elementlere istisnasız bir tanım diye genişletme; daha ileri Pd gibi düzenler ayrı ele alınır. Bu kuralı elektron kaybetmiş iyonda son dolu katmana uygulayıp elementin yerini değiştirme. Na⁺ iki dolu katman taşısa da Na elementi üçüncü periyotta kalır; Z değişmemiştir.",
    after:
      "Bu çalışmanın ilk 36 nötr atom kapsamında temel hâlde elektron bulunan orbitaller arasındaki en büyük n, periyodu verir. Bir orbitalde tek elektron bulunması da bu sayım için yeterlidir; orbitalin iki elektronla tam dolu olması gerekmez. Bütün elementlere istisnasız bir tanım diye genişletme; daha ileri Pd gibi düzenler ayrı ele alınır. Bu kuralı elektron kaybetmiş iyonda elektron içeren en dış katmana uygulayıp elementin yerini değiştirme. Na⁺ iyonunda elektron içeren iki katman olsa da Na elementi üçüncü periyotta kalır; Z değişmemiştir.",
  },
  {
    id: "ayt-periyodik-sistem-atom-capi",
    kind: "step",
    outer: 0,
    inner: 0,
    before: "En büyük dolu n=4 olduğundan periyot 4’tür.",
    after:
      "Elektron bulunan orbitallerde en büyük n=4 olduğundan periyot 4’tür; orbitalin tam dolu olması gerekmez.",
  },
];

export function clarifiedGuideView<T extends LessonGuide | undefined>(
  raw: T,
): T {
  if (!raw) return raw;
  let sections = raw.sections;
  let examples = raw.examples;
  for (const revision of revisions) {
    if (revision.id !== raw.id) continue;
    if (revision.kind === "paragraph") {
      const section = sections[revision.outer];
      if (section?.paragraphs[revision.inner] !== revision.before) continue;
      if (sections === raw.sections) sections = [...sections];
      const paragraphs = [...section.paragraphs];
      paragraphs[revision.inner] = revision.after;
      sections[revision.outer] = { ...section, paragraphs };
    } else {
      const example = examples[revision.outer];
      const step = example?.steps[revision.inner];
      if (step?.explanation !== revision.before) continue;
      if (examples === raw.examples) examples = [...examples];
      const steps = [...example.steps];
      steps[revision.inner] = { ...step, explanation: revision.after };
      examples[revision.outer] = { ...example, steps };
    }
  }
  return sections === raw.sections && examples === raw.examples
    ? raw
    : ({ ...raw, sections, examples } as T);
}
