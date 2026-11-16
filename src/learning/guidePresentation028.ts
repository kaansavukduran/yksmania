import type { LessonGuide, WorkedExample } from "./guides/types";

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
  {
    id: "dalgalara-giris",
    kind: "paragraph",
    outer: 3,
    inner: 0,
    before:
      "Periyodik dalgada ardışık iki tepe veya iki çukur arası dalga boyu λ’dır. Denge çizgisinden geçen iki noktanın her çifti bir λ değildir; aynı titreşim evresinde olup olmadıklarına bakılır. İdeal sinüs için tepe ile hemen sonraki çukur arası λ/2’dir. Dört ardışık tepe arasındaki toplam mesafe üç λ’dır; nokta sayısı ile aralık sayısını karıştırma.",
    after:
      "Sinüzoidal (harmonik) dalgada ardışık iki tepe veya iki çukur arası dalga boyu λ’dır. Denge çizgisinden geçen iki noktanın her çifti bir λ değildir; aynı titreşim evresinde olup olmadıklarına bakılır. İdeal sinüs için tepe ile hemen sonraki çukur arası λ/2’dir. Dört ardışık tepe arasındaki toplam mesafe üç λ’dır; nokta sayısı ile aralık sayısını karıştırma.",
  },
  {
    id: "dalgalara-giris",
    kind: "paragraph",
    outer: 4,
    inner: 1,
    before:
      "Aynı noktadaki y–t grafiğinde art arda iki maksimum arasındaki süre T’dir. Bu grafikte yatay tepe aralığı λ olamaz çünkü eksen zaman birimindedir. İlk ve son gözlem tepelerini sayarken aradaki tam dönemleri say; t=0’daki ilk tepe ile t=2 s’deki beşinci tepe arası dört T içerir. Hesaptan sonra fT=1 kontrolü birim ve sayma hatasını yakalar.",
    after:
      "Sinüzoidal (harmonik) bir dalganın aynı noktadaki y–t grafiğinde art arda iki maksimum arasındaki süre T’dir. Bu grafikte yatay tepe aralığı λ olamaz çünkü eksen zaman birimindedir. İlk ve son gözlem tepelerini sayarken aradaki tam dönemleri say; t=0’daki ilk tepe ile t=2 s’deki beşinci tepe arası dört T içerir. Hesaptan sonra fT=1 kontrolü birim ve sayma hatasını yakalar.",
  },
];

// The complete original worked example gates these six linked corrections.
// A partially changed example must not receive a mixture of old and new units.
const membraneWorkedBefore: WorkedExample = {
  title: "İki bölmede maddeyi koru",
  prompt:
    "Eşit ve sabit hacimli iki bölmede O₂ derişimleri dışta 8, içte 2 model birimidir. Elektriksel etki yok, uygun yol açık. Bir model adımı dıştan içe 1 birim aktarırsa yeni derişimler ve toplam ne olur?",
  strategy: "Önce net yönü belirle; verenden çıkarıp alana aynı miktarı ekle.",
  steps: [
    {
      label: "Yön",
      explanation:
        "O₂ küçük apolar örnektir; uygun yolda pasif net geçiş 8’den 2’ye olur.",
      expression: "8 > 2",
    },
    {
      label: "İki tarafı güncelle",
      explanation:
        "Dış bölme 1 birim kaybeder; eşit hacimli iç bölme aynı 1 birimi kazanır.",
      expression: "Dış:8−1=7; iç:2+1=3",
    },
    {
      label: "Korunumu denetle",
      explanation:
        "Toplam başlangıçta ve sonda 10’dur. Model gerçek süre veya hücrenin oksijen tüketimini içermez.",
      expression: "8+2=7+3=10",
    },
  ],
  answer: "Dış7, iç3; toplam10.",
  check: "Dengeye yaklaşılmıştır; fark 6’dan 4’e indi.",
  pitfall:
    "Yalnız içi artırıp dışı sabit bırakmak kapalı iki bölmede madde yaratır.",
};
const membraneWorkedAfter: Pick<WorkedExample, "prompt" | "answer"> & {
  steps: {
    index: number;
    explanation: string;
    expression: string;
  }[];
} = {
  prompt:
    "Her biri 1 model hacim birimi olan eşit ve sabit hacimli iki bölmede O₂ derişimleri dışta 8, içte 2 model miktar birimi / model hacim birimidir. Derişim, madde miktarının hacme oranıdır. Elektriksel etki yok, uygun yol açık; üretim ve tüketim yoktur. Bir model adımı dıştan içe 1 model miktar birimi aktarırsa yeni derişimler ve toplam madde miktarı ne olur?",
  steps: [
    {
      index: 1,
      explanation:
        "Aktarılan miktar 1 model miktar birimidir. Her bölmenin hacmi 1’dir. Bu yüzden her derişim için değişim büyüklüğü Δc = Δn / V = 1 / 1 = 1 olur; dışarıdan çıkar, içeriye ekle.",
      expression: "Dış: (8 − 1) / 1 = 7; iç: (2 + 1) / 1 = 3",
    },
    {
      index: 2,
      explanation:
        "Başlangıç miktarları dışta 8 × 1 = 8, içte 2 × 1 = 2 model miktar birimidir. Son miktarlar 7 ve 3 olup toplam 10 korunur. Her hacim 1’dir; bu ölçekte derişim ve miktarın sayısal değerleri aynıdır. Korunum madde miktarı için kurulur. Model gerçek süre veya hücrenin oksijen tüketimini içermez.",
      expression: "n toplam = 8 × 1 + 2 × 1 = 7 × 1 + 3 × 1 = 10",
    },
  ],
  answer:
    "Dış derişim 7, iç derişim 3 model miktar birimi / model hacim birimi; toplam madde miktarı 10 model miktar birimi.",
};

function originalMembraneWorked(example: WorkedExample | undefined) {
  const before = membraneWorkedBefore;
  return (
    example?.title === before.title &&
    example.prompt === before.prompt &&
    example.strategy === before.strategy &&
    example.answer === before.answer &&
    example.check === before.check &&
    example.pitfall === before.pitfall &&
    Array.isArray(example.steps) &&
    example.steps.length === before.steps.length &&
    before.steps.every((original, i) => {
      const step = example.steps[i];
      return (
        step?.label === original.label &&
        step.explanation === original.explanation &&
        step.expression === original.expression
      );
    })
  );
}

// This complete worked-example guard also excludes pre-existing capsid stocks.
// Original guide bytes and partially edited personal snapshots stay intact.
const virusWorkedBefore: WorkedExample = {
  title: "Genom var, kapsid yok",
  prompt:
    "Uygun hücrede viral genom kopyalanıyor. Viral protein sentezi seçici olarak engelleniyor. Dışarıdan hazır kapsid verilmediği bu deneyde tam yeni virion üretimi beklenir mi?",
  strategy: "Tam parçacığı kuran iki bileşeni listele.",
  steps: [
    {
      label: "Genom",
      explanation:
        "Genom kopyaları oluşur; bu sadece kalıtsal bileşeni sağlar.",
      expression: "Genom +",
    },
    {
      label: "Kapsid",
      explanation:
        "Protein üretimi engellendiğinden yeni kapsid bileşeni sağlanmaz.",
      expression: "Kapsid −",
    },
    {
      label: "Birleştirme",
      explanation: "Genomun kapsidle birleşmesi için iki bileşen de gerekir.",
      expression: "Tam virion −",
    },
  ],
  answer: "Beklenmez; genom artışı tam virion artışı değildir.",
  check: "Başlangıç parçacıklarının ortamda kalması yeni üretim diye sayılmaz.",
  pitfall:
    "Ölçülen genom sayısını bulaştırıcı parçacık sayısıyla özdeşleştirme.",
};
const virusWorkedAfter: WorkedExample = {
  title: "Genom var, kapsid yok",
  prompt:
    "Uygun hücrede viral genom kopyalanıyor. Başlangıçta kullanılabilir kapsid proteini veya hazır kapsid stoku bulunmuyor. Viral protein sentezi seçici olarak ve tamamen engelleniyor; dışarıdan da kapsid proteini veya hazır kapsid sağlanmıyor. Bu deneyde tam yeni virion üretimi beklenir mi?",
  strategy: "Tam parçacığı kuran iki bileşeni listele.",
  steps: [
    {
      label: "Genom",
      explanation:
        "Genom kopyaları oluşur; bu sadece kalıtsal bileşeni sağlar.",
      expression: "Genom +",
    },
    {
      label: "Kapsid",
      explanation:
        "Başlangıçta kullanılabilir kapsid proteini veya hazır kapsid yoktur; yeni sentez ve dışarıdan sağlama da yoktur. Böylece yeni virion için kapsid bileşeni sağlanamaz.",
      expression: "Kapsid −",
    },
    {
      label: "Birleştirme",
      explanation: "Genomun kapsidle birleşmesi için iki bileşen de gerekir.",
      expression: "Tam virion −",
    },
  ],
  answer: "Beklenmez; genom artışı tam virion artışı değildir.",
  check: "Başlangıç parçacıklarının ortamda kalması yeni üretim diye sayılmaz.",
  pitfall:
    "Ölçülen genom sayısını bulaştırıcı parçacık sayısıyla özdeşleştirme.",
};
function originalWorked(
  example: WorkedExample | undefined,
  before: WorkedExample,
) {
  return (
    example?.title === before.title &&
    example.prompt === before.prompt &&
    example.strategy === before.strategy &&
    example.answer === before.answer &&
    example.check === before.check &&
    example.pitfall === before.pitfall &&
    Array.isArray(example.steps) &&
    example.steps.length === before.steps.length &&
    before.steps.every((original, i) => {
      const step = example.steps[i];
      return (
        step?.label === original.label &&
        step.explanation === original.explanation &&
        step.expression === original.expression
      );
    })
  );
}

const plantWorkedRevisions: {
  index: number;
  before: WorkedExample;
  prompt: string;
}[] = [
  {
    index: 0,
    before: {
      title: "İki kanıtı kesiştir",
      prompt:
        "X bitkisinde iletim demeti var, tohum yok. Dört aday kara yosunu, eğrelti, çam ve elma. Hangi aday kalır?",
      strategy: "Damar ve tohum kanıtlarını sırayla uygula.",
      steps: [
        {
          label: "Damar",
          explanation: "Kara yosunu elenir; diğer üç örnek damarlıdır.",
          expression: "3 aday",
        },
        {
          label: "Tohum",
          explanation: "Çam ve elma tohumlu olduğundan elenir.",
          expression: "1 aday",
        },
        {
          label: "Denetim",
          explanation: "Eğrelti damarlı ve tohumsuzdur; her iki veriyi sağlar.",
          expression: "Eğrelti",
        },
      ],
      answer: "Eğrelti; damarlı tohumsuz örnek.",
      check: "Sporla üreme damarsızlık için yeterli ölçüt değildir.",
      pitfall: "Tohum yokluğunu damar yokluğu diye okuma.",
    },
    prompt:
      "Kara yosunu, eğrelti, çam ve elma gruplarının yaşam döngüsü özellikleri karşılaştırılıyor; bireylerin o andaki görünümü sorulmuyor. X’in grubunda iletim demeti vardır ve tohum oluşmaz. Hangi öğretici aday kalır?",
  },
  {
    index: 3,
    before: {
      title: "Bir bilinmeyen üç aday bırakır",
      prompt:
        "Kara yosunu, eğrelti, çam ve elma arasında yalnız ‘meyve yok’ gözlemi verilmiştir. Türü kesin belirlemek mümkün mü?",
      strategy: "Olumsuz kanıtın kaç aday bıraktığını say.",
      steps: [
        {
          label: "Eleme",
          explanation: "Elma meyveli örnek olduğundan elenir.",
          expression: "4 − 1",
        },
        {
          label: "Kalanlar",
          explanation: "Diğer üçünde meyve yoktur.",
          expression: "3 aday",
        },
        {
          label: "Ek veri",
          explanation: "Tohum ve damar bilgileri kalanları ayırabilir.",
          expression: "Belirsizlik sürer",
        },
      ],
      answer: "Hayır; üç aday kalır.",
      check: "Tek kanıtın sonucu her zaman tek aday olmak zorunda değildir.",
      pitfall: "Eksik bilgiyi tahminle doldurup kesin sonuç kurma.",
    },
    prompt:
      "Kara yosunu, eğrelti, çam ve elma grupları arasında yalnız “yaşam döngüsünde meyve oluşturmaz” bilgisi verilmiştir; bir bireyin o andaki meyvesiz görünümü sorulmuyor. Grubu kesin belirlemek mümkün mü?",
  },
];

const waveWorkedRevision: {
  index: number;
  before: WorkedExample;
  prompt: string;
} = {
  index: 1,
  before: {
    title: "Dört tepe, üç aralık",
    prompt:
      "Bir anlık grafikte dört ardışık tepenin ilki x=0,2 m, sonuncusu x=2,0 m. f=5 Hz. λ ve v?",
    strategy:
      "Uçlar arasındaki mesafeyi tepe sayısına değil aralık sayısına böl.",
    steps: [
      {
        label: "Aralık",
        explanation: "Dört tepe üç tam dalga boyu oluşturur.",
        expression: "3λ=2,0−0,2=1,8 m",
      },
      {
        label: "Dalga boyu",
        explanation: "Aralık sayısını kullan.",
        expression: "λ=1,8/3=0,6 m",
      },
      {
        label: "Sürat",
        explanation: "Frekansla çarp.",
        expression: "v=0,6·5=3 m/s",
      },
    ],
    answer: "0,6 m ve 3 m/s",
    check: "T=0,2 s’de desen 0,6 m ilerler.",
    pitfall: "Dört tepeyi dört dalga boyu saymak eksik bir aralık üretir.",
  },
  prompt:
    "Sinüzoidal (harmonik) bir dalganın anlık y–x grafiğinde dört ardışık tepenin ilki x=0,2 m, sonuncusu x=2,0 m. f=5 Hz. λ ve v?",
};
const waveRecallRevision = {
  index: 1,
  before: {
    prompt: "y–t grafiğinde tepe aralığı?",
    answer:
      "Periyot; y–x grafiğinde aynı evreli ardışık tepe aralığı dalga boyudur.",
  },
  prompt:
    "Sinüzoidal (harmonik) dalgada y–t ve y–x grafiklerinde ardışık tepe aralıkları hangi niceliklerdir?",
};

export function clarifiedGuideView<T extends LessonGuide | undefined>(
  raw: T,
): T {
  if (!raw) return raw;
  let sections = raw.sections;
  let examples = raw.examples;
  let recall = raw.recall;
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
  if (
    raw.id === "hucre-zarinda-madde-alisverisleri" &&
    originalMembraneWorked(examples[0])
  ) {
    const example = examples[0];
    const steps = [...example.steps];
    for (const change of membraneWorkedAfter.steps) {
      steps[change.index] = {
        ...steps[change.index],
        explanation: change.explanation,
        expression: change.expression,
      };
    }
    examples = [...examples];
    examples[0] = {
      ...example,
      prompt: membraneWorkedAfter.prompt,
      steps,
      answer: membraneWorkedAfter.answer,
    };
  }
  if (raw.id === "virusler" && originalWorked(examples[1], virusWorkedBefore)) {
    examples = [...examples];
    examples[1] = {
      ...examples[1],
      prompt: virusWorkedAfter.prompt,
      steps: examples[1].steps.map((step, i) =>
        i === 1
          ? { ...step, explanation: virusWorkedAfter.steps[i].explanation }
          : step,
      ),
    };
  }
  if (raw.id === "bitkiler") {
    for (const revision of plantWorkedRevisions) {
      const example = examples[revision.index];
      if (!originalWorked(example, revision.before)) continue;
      if (examples === raw.examples) examples = [...examples];
      examples[revision.index] = { ...example, prompt: revision.prompt };
    }
  }
  if (raw.id === "dalgalara-giris") {
    const revision = waveWorkedRevision;
    const example = examples[revision.index];
    if (originalWorked(example, revision.before)) {
      if (examples === raw.examples) examples = [...examples];
      examples[revision.index] = { ...example, prompt: revision.prompt };
    }
    const item = recall[waveRecallRevision.index];
    if (
      item?.prompt === waveRecallRevision.before.prompt &&
      item.answer === waveRecallRevision.before.answer
    ) {
      recall = [...recall];
      recall[waveRecallRevision.index] = {
        ...item,
        prompt: waveRecallRevision.prompt,
      };
    }
  }
  return sections === raw.sections &&
    examples === raw.examples &&
    recall === raw.recall
    ? raw
    : ({ ...raw, sections, examples, recall } as T);
}
