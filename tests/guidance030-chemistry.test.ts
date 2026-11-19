import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { Children, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance030Chemistry.json";
import {
  forge011ChemistryLessons,
  forge011ChemistryGuides,
} from "../src/learning/forge011Chemistry";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import {
  clarifiedQuestionView,
  localizedQuestionView,
} from "../src/domain/questionPresentation";
import { resolvedGuidance, helpPanels } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

// Catalogue INPUT only: use the real identity resolver, stages and renderer.
// Root owns eventual global registration and the browser acceptance gates.
vi.mock(
  "../src/learning/questionHelpCatalogue.json",
  async (importOriginal) => {
    const original = await importOriginal<{
      default: { id: string; identity: string; guidance: unknown }[];
    }>();
    return {
      default: [
        ...original.default.filter((old) => !rows.some((r) => r.id === old.id)),
        ...rows,
      ],
    };
  },
);
const topicIds = [
  "kovalent-adlandirma-metalik-bag",
  "zayif-etkilesimler",
  "hidrojen-bagi",
  "fiziksel-kimyasal-degisimler",
  "maddenin-halleri",
] as const;
const id = (topic: (typeof topicIds)[number], n: number) =>
  `f011-chem-${topic}-${n}`;
const ids = topicIds.flatMap((topic) =>
  Array.from({ length: 10 }, (_, i) => id(topic, i + 1)),
);
const raw = forge011ChemistryLessons.flatMap((lesson) => lesson.questions);
const flatten = (q: (typeof raw)[number]): HelpQuestion => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
});
const originalFlat = raw.map(flatten);
const flat = originalFlat.map(clarifiedQuestionView);
const byId = new Map(flat.map((q) => [q.id, q]));
const qAt = (topic: number, n: number) => byId.get(id(topicIds[topic], n))!;
const gAt = (topic: number, n: number) =>
  rows.find((r) => r.id === id(topicIds[topic], n))!.guidance;
const stable = (v: unknown): unknown =>
  Array.isArray(v)
    ? v.map(stable)
    : v && typeof v === "object"
      ? Object.fromEntries(
          Object.keys(v)
            .sort()
            .map((k) => [k, stable((v as Record<string, unknown>)[k])]),
        )
      : v;
const sha = (v: string | Buffer) =>
  createHash("sha256").update(v).digest("hex");
const norm = (v: string) =>
  v
    .normalize("NFKC")
    .toLocaleLowerCase("tr-TR")
    .replace(/[\p{P}\p{S}\s]+/gu, "");
const plain = (v: string) =>
  v
    .replace(/<[^>]*>/g, "")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"');
const button = (
  tree: ReactNode,
): { onClick: () => void; disabled?: boolean } | undefined => {
  let found: { onClick: () => void; disabled?: boolean } | undefined;
  Children.forEach(tree, (node) => {
    if (
      !isValidElement<{
        children?: ReactNode;
        onClick?: () => void;
        disabled?: boolean;
      }>(node)
    )
      return;
    if (node.type === "button" && node.props.onClick)
      found = { onClick: node.props.onClick, disabled: node.props.disabled };
    else found ??= button(node.props.children);
  });
  return found;
};

describe("030 original chemistry50 individually staged guidance", () => {
  it("preserves the full50 raw payload, original keys/options/order and all five guides", () => {
    expect(raw.map((q) => q.id)).toEqual(ids);
    expect(rows.map((r) => r.id)).toEqual(ids);
    expect(new Set(ids).size).toBe(50);
    expect(raw.map((q) => q.answer)).toEqual(
      Array.from({ length: 50 }, (_, i) => i % 5),
    );
    expect(
      raw.every((q) => q.options.length === 5 && q.guidance === undefined),
    ).toBe(true);
    expect(sha(JSON.stringify(stable(raw)))).toBe(
      "42994e9b1bb77c72cba430dd769ba941cf70f727f90364e847e807d29bf0da7c",
    );
    expect(
      sha(
        readFileSync(
          new URL("../src/learning/forge011Chemistry.ts", import.meta.url),
        ),
      ),
    ).toBe("f420ff70b9964ef47504236977c0b85353fc6337036a5cc352332a659b9ef45d");
    expect(
      forge011ChemistryGuides.map((g) => sha(JSON.stringify(stable(g)))),
    ).toEqual([
      "50981187f6345ec704b03e1e6a17af4e278126e3fce65b290c13f0c4500374a2",
      "bd513b2e66acc5b6b2101924c9576466ad0186fca8b4e20fd478a64e01d91ec8",
      "07a0d89fcc40d9bedd16fb30439ae5bb3a1d2197b27c2f81c2a1f73b6ba3132d",
      "b60ae11fe538a1f30e977b6a926ed5aa7e5b24a35558da49f6971373ef99c28b",
      "eca80c78d46138219bd743c1bc06411829fcce4f038781e0909af2b4a87d5889",
    ]);
    expect(
      sha(
        JSON.stringify(
          stable(
            forge011ChemistryLessons.map(
              ({ questions: _questions, ...rest }) => rest,
            ),
          ),
        ),
      ),
    ).toBe("d7f7e68bd880ec6bb265353058953c4e2d4bd56020057c116696004ac3153d77");
    for (const [i, row] of rows.entries()) {
      expect(Object.keys(row)).toEqual(["id", "identity", "guidance"]);
      expect(row.identity).toBe(questionIdentity(flat[i]));
      expect(resolvedGuidance(originalFlat[i])).toEqual(row.guidance);
      expect(resolvedGuidance(flat[i])).toEqual(row.guidance);
    }
  });

  it("binds exactly two approved prompt views while preserving every other original field", () => {
    const revised = new Map([
      [
        id(topicIds[0], 7),
        "Na₂O, Na⁺ ve O²⁻ iyonlarının oluşturduğu iyonik katıdır. TYT katyon–anyon adlandırma kuralına göre bu bileşiğin uygun adı hangisidir?",
      ],
      [
        id(topicIds[4], 2),
        "1 atm basınçta, erime eşiğindeki 1 g, 0 °C saf su buzu tamamen eritilip 100 °C sıvı su yapılacak. Lₑ=334 J/g, sıvı c=4,18 J/(g·°C), ısı kaybı yok. Gerekli toplam enerji kaç J?",
      ],
    ]);
    for (const [i, original] of originalFlat.entries()) {
      const view = flat[i],
        localized = localizedQuestionView(raw[i]);
      expect(view).toEqual({
        ...original,
        prompt: revised.get(original.id) ?? original.prompt,
      });
      expect(flatten(localized)).toEqual(view);
      expect(clarifiedQuestionView(view)).toEqual(view);
      if (revised.has(original.id)) {
        expect(questionIdentity(original)).not.toBe(rows[i].identity);
        // A changed historical snapshot cannot accidentally acquire the new view.
        for (const mutation of [
          { ...original, prompt: original.prompt + " Farklı kayıt." },
          { ...original, options: [...original.options].reverse() },
          { ...original, answer: (original.answer + 1) % 5 },
          { ...original, explanation: original.explanation + " Ek." },
        ])
          expect(clarifiedQuestionView(mutation)).toBe(mutation);
      } else expect(view).toBe(original);
    }
    expect(
      flat
        .filter((q, i) => q.prompt !== originalFlat[i].prompt)
        .map((q) => q.id),
    ).toEqual([...revised.keys()]);
  });

  it("has100 positive paragraphs,50 distinct methods,150 advancing steps and250 ordered reasons", () => {
    expect(rows.reduce((s, r) => s + r.guidance.knowledge.length, 0)).toBe(100);
    expect(rows.reduce((s, r) => s + r.guidance.steps.length, 0)).toBe(150);
    expect(rows.reduce((s, r) => s + r.guidance.optionReasons.length, 0)).toBe(
      250,
    );
    expect(new Set(rows.map((r) => norm(r.guidance.strategy))).size).toBe(50);
    for (const row of rows) {
      const q = byId.get(row.id)!,
        g = questionGuidanceSchema.parse(row.guidance);
      expect(g).toEqual(row.guidance);
      expect(g.knowledge).toHaveLength(2);
      expect(g.steps).toHaveLength(3);
      expect(g.optionReasons).toHaveLength(q.options.length);
      expect(
        new Set([...g.knowledge, g.strategy, ...g.steps].map(norm)).size,
      ).toBe(6);
      expect(new Set(g.optionReasons.map(norm)).size).toBe(5);
      expect([q.hint!, q.explanation].map(norm)).not.toContain(
        norm(g.strategy),
      );
      for (const step of g.steps)
        expect([q.hint!, q.explanation].map(norm)).not.toContain(norm(step));
      expect(
        g.optionReasons.flatMap((v, i) => (v.startsWith("Doğru.") ? [i] : [])),
      ).toEqual([q.answer]);
      expect(g.commonError).not.toBe(g.check);
      if (norm(q.options[q.answer]).length > 12)
        expect(norm(g.strategy)).not.toContain(norm(q.options[q.answer]));
    }
    expect(gAt(0, 7).optionReasons[0]).toContain(
      "başka bütün adlandırma gelenekleri",
    );
    expect(gAt(1, 9).knowledge[1]).toContain("bütün farklı moleküller için");
    expect(gAt(2, 6).check).toContain("24 uç kaydına");
    expect(gAt(2, 9).strategy).not.toContain("kesin kaynama sırası kurulamaz");
    expect(gAt(4, 5).strategy).not.toContain("Eşittir");
  });

  it("keeps each actual misconception attached to its original option position", () => {
    // Human-selected scientific anchors for all250 reasons, not generated prose.
    const anchors = [
      [
        "Diazot iki N",
        "iki atomu di",
        "bir N ve iki O",
        "yalnız üç O",
        "Cl yoktur",
      ],
      ["yalnız klor", "2 + 7 = 9", "7 − 2", "yalnız oksijen", "2 × 7"],
      [
        "F’yi ilk",
        "iki iyon",
        "oksijen diflorür",
        "iki O",
        "di ön ekini içermez",
      ],
      ["büyük O", "iki oksijen değil", "alt indis", "tek kobalt", "C⁺"],
      [
        "2 N/4 O",
        "altı, NO₂ üç",
        "iyonik birim hücre",
        "atom numarasının değişmesi değildir",
        "6 ve 3 atom",
      ],
      ["3 × 3 = 9", "bir PCl₃", "1 P + 3 Cl", "iki değil üç", "3 × (1 + 3)"],
      [
        "TYT katyon–anyon",
        "sodyum oksit",
        "iki oksijen",
        "O₂²⁻",
        "saf sodyum metali",
      ],
      [
        "merkezlerinin tel boyunca",
        "su üretimi",
        "değerlik elektronları",
        "Protonların",
        "Nötron elektrikçe yüksüzdür",
      ],
      [
        "kovalent bağların tek doğrultusunu",
        "nötrona dönüşmesi",
        "ilk anda bütünüyle yok",
        "katman kaymasına uyum",
        "elektronların levhayı",
      ],
      [
        "grafit",
        "iyonik örgüyü zorunlu",
        "elektron yokluğu",
        "hidrojen bağı",
        "metal ve grafit",
      ],
      [
        "anlık kutuplanmalarından London",
        "iyon ve kalıcı dipollü",
        "mutlaka kovalent",
        "H bulunmaz",
        "iki net yüklü iyon",
      ],
      [
        "London katkısı da",
        "ek London",
        "komşusu Cl",
        "HCl⁺ değildir",
        "metalik örgü",
      ],
      [
        "net yüklü iyon",
        "iki nötr molekül",
        "H₂O’nun kalıcı dipolü",
        "kovalent O–H",
        "metalik örgü",
      ],
      [
        "net yüklü iyon",
        "Yalnız London",
        "saf sodyum metalinin",
        "iyon–dipoldür",
        "apolar kovalent",
      ],
      [
        "iki kalıcı molekül",
        "H vericisi yoktur",
        "kalıcı dipol yoktur",
        "H atomu bulunmaz",
        "iyon olan Na⁺",
      ],
      [
        "iki zıt yüklü",
        "Cl⁻ net yüklü iyon",
        "net zıt yük",
        "iki tarafta da iyon",
        "bağlı H vericisi",
      ],
      [
        "O ucu δ−",
        "δ+ H uçları",
        "δ− ve δ+",
        "Na ucu içermez",
        "Nötronlar yüksüz",
      ],
      [
        "dipolleri doğrusal geometride",
        "London katkısını",
        "molekül apolardır",
        "iyonik örgüsü verilmemiştir",
        "H atomu bulunmaz",
      ],
      [
        "tersine çevirir",
        "eşit olduğu anlamına gelmez",
        "ortadaki üyeyi",
        "I₂ > Br₂ > Cl₂",
        "H içermez",
      ],
      [
        "44 > 40",
        "H ve O atomlarına",
        "faz etiketidir",
        "Buharlaşma enerji alabilir",
        "tek başına yeni kimyasal tür",
      ],
      [
        "bütün H’ler C’ye",
        "ortaklanmamış çift",
        "toplam altı H",
        "C–H bağlarını iyonik",
        "Saf su ve uygun alkoller",
      ],
      [
        "eterin C–H",
        "O–H bağlantısı suya",
        "farklı su komşusunun",
        "kimliğini suya dönüştürmez",
        "O–H bağını tamamen koparıp",
      ],
      [
        "O–H ile C–O–C",
        "O’ya bağlı H yoktur",
        "Etanol açık O–H",
        "alıcı elektron çiftleri",
        "iyonik katı",
      ],
      [
        "H doğrudan O’ya",
        "N–H bağlantısı",
        "H doğrudan F’ye",
        "H’si Cl’ye",
        "tek maddeyi",
      ],
      [
        "İki eşdeğer net iyon",
        "elektron denizi yoktur",
        "çekirdeğin parçalanmasını",
        "atom numarası sayacı değil",
        "kovalent bağı, noktalı",
      ],
      [
        "24 / 2 = 12",
        "iki değil dört",
        "(6 − 1) × 4 / 2",
        "iki kez sayar",
        "24 uç kaydını ikiyle çarpmaktan",
      ],
      [
        "100/90 ters",
        "0,90 g/mL",
        "hacimler 100 ve 90",
        "90 g kütle",
        "büyük değil küçük",
      ],
      [
        "uzaysal uzaklığı",
        "iyonik bağa dönüşmesine",
        "çok uzak seçilmiş geometri",
        "elektron çiftinin kesin yok",
        "yeni element",
      ],
      [
        "her basınçta",
        "suyun H bağı yapamadığı",
        "farklı atom bileşimine",
        "bütün ağın ve fazın",
        "kaç temas kurulabildiği",
      ],
      [
        "H₂ ve O₂",
        "O–H bağları kovalenttir",
        "yeni proton",
        "aralıkları değişebilir",
        "O–H kovalent bağları korunur",
      ],
      [
        "katıdan doğrudan gaza",
        "Elektrolizle yeni",
        "Başka element",
        "iyonlara ayrıldığı",
        "çekirdeğin dönüşmesi",
      ],
      [
        "tek H₂O",
        "4 H ve 2 O",
        "O toplamı 2",
        "alt indisini atlar",
        "su katsayısı 3 değil 2",
      ],
      [
        "bir O₂ molekülü",
        "ters sırada",
        "3 molekül birimi",
        "H atomlarının sayısıdır",
        "toplam atom adedidir",
      ],
      [
        "iki H⁺’ın",
        "birini saymak +1",
        "Zn²⁺ toplam +2",
        "2×(+1)=+2",
        "H⁻ değildir",
      ],
      [
        "B’de Zn²⁺ ve H₂",
        "önceden mevcut iyonları",
        "A’da çekirdek dönüşümü",
        "elektron-denizli örgüsünü",
        "çözünmesi fiziksel",
      ],
      [
        "gazın türü",
        "Kaynamada aynı türün",
        "Elektroliz",
        "atomların yok olması değildir",
        "Su kaynaması",
      ],
      [
        "59’un 40’tan",
        "element kimliği korunur",
        "H veya O atomu",
        "Enerji alma yalnız kimyasal",
        "Hg(g) yazılması",
      ],
      [
        "etanol ve suyu",
        "tepkimesiz H₂",
        "2. basamak su kimliğini",
        "2. basamak dışarıda",
        "1 ve 3’te",
      ],
      [
        "Tersinir kimyasal",
        "Kırılma",
        "Fiziksel erime/buharlaşma",
        "geri yol birlikte",
        "CH₃COO⁻",
      ],
      [
        "CO₂ ve H₂O yeni",
        "Etiketler ters",
        "proton sayısını değiştirmez",
        "atom tür ve sayıları korunmalıdır",
        "erime kimliği koruyan",
      ],
      [
        "167/334 = 0,5",
        "167 J bir enerji",
        "334 J’den bile az",
        "0,5 g buz erimiştir",
        "erime tamamlanmadan",
      ],
      [
        "418 J’yi atlar",
        "334 J ile",
        "334 J eksiktir",
        "Buharlaşmaya ait",
        "752+2256",
      ],
      ["1128 J", "1316 J", "1/2, yani %50", "2444 J", "3008 J"],
      [
        "katıda da hareketli elektronlarla",
        "nötr moleküllerle",
        "elektronsuz değildir",
        "iyonları katı örgüde",
        "plazması olduğunu varsaymak gerekmez",
      ],
      [
        "kesin iki kat",
        "her zaman sıfır yapmaz",
        "sıvı kaldığı",
        "25 °C olarak sabittir",
        "denge buhar basınçları eşittir",
      ],
      [
        "450/300 = 3",
        "hacim artışıdır",
        "birimsiz oranıdır",
        "başlangıç hacmidir",
        "2,25 kat",
      ],
      [
        "0,048 kPa",
        "1,2/2,4 = %50",
        "0,48 kPa",
        "eşit olmasını gerektirir",
        "2,4/1,2",
      ],
      [
        "iyonlaşma ve kolektif",
        "Yaklaşık toplam nötrlük",
        "Lavın sıcak kayaç eriyiği",
        "yalnız elektronlardan oluşmaz",
        "akışkan davranış",
      ],
      [
        "sıvı kaynama başlangıcında",
        "1 atm koşulu",
        "gizli ısı ayrı kalemlerdir",
        "ek buharlaşma bütçesi",
        "H₂ ve O₂’ye ayırmaz",
      ],
      [
        "m iki kat ve P yarı",
        "daha büyük kütle",
        "Q=Pt",
        "Basınç faz geçişinin",
        "m ve P de farklı",
      ],
    ];
    expect(anchors).toHaveLength(50);
    for (const [i, r] of rows.entries()) {
      expect(anchors[i]).toHaveLength(r.guidance.optionReasons.length);
      r.guidance.optionReasons.forEach((reason, j) =>
        expect(norm(reason)).toContain(norm(anchors[i][j])),
      );
    }
  });

  it("counts actual molecular inventories independently of the naming/model API", () => {
    const formula = (s: string) => {
      const ascii = s.replace(/[₀-₉]/g, (c) => String("₀₁₂₃₄₅₆₇₈₉".indexOf(c)));
      const counts: Record<string, number> = {};
      for (const m of ascii.matchAll(/([A-Z][a-z]?)(\d*)/g))
        counts[m[1]] = (counts[m[1]] ?? 0) + Number(m[2] || 1);
      return counts;
    };
    expect(formula("CO")).toEqual({ C: 1, O: 1 });
    expect(formula("Co")).toEqual({ Co: 1 });
    expect(formula("OF₂")).toEqual({ O: 1, F: 2 });
    const n2o5 = formula(qAt(0, 1).prompt.match(/N₂O₅/)![0]);
    expect(n2o5).toEqual({ N: 2, O: 5 });
    expect(qAt(0, 1).options[qAt(0, 1).answer]).toBe("Diazot pentaoksit");
    const cl2o7 = Object.values(formula("Cl₂O₇")).reduce((s, v) => s + v, 0);
    expect(
      qAt(0, 2)
        .options.map(Number)
        .flatMap((v, i) => (v === cl2o7 ? [i] : [])),
    ).toEqual([qAt(0, 2).answer]);
    const p = formula(qAt(0, 6).prompt.match(/PCl₃/)![0]);
    expect(p).toEqual({ P: 1, Cl: 3 });
    expect(
      qAt(0, 6)
        .options.map(Number)
        .flatMap((v, i) => (v === 3 * p.Cl ? [i] : [])),
    ).toEqual([qAt(0, 6).answer]);
    const a = formula("N₂O₄"),
      b = formula("NO₂");
    expect(a.N * b.O).toBe(a.O * b.N);
    expect(Object.values(a).reduce((s, v) => s + v, 0)).toBe(6);
    expect(Object.values(b).reduce((s, v) => s + v, 0)).toBe(3);
    const water = formula("H₂O"),
      h2 = formula("H₂"),
      o2 = formula("O₂");
    expect([2 * water.H, 2 * water.O]).toEqual([2 * h2.H, o2.O]);
    expect([2 * water.H, 2 * water.O]).toEqual([4, 2]);
    expect(qAt(3, 2).options[qAt(3, 2).answer]).toContain("4 H");
    expect([2, 2 + 1]).toEqual([2, 3]);
    expect(qAt(3, 3).options[qAt(3, 3).answer]).toBe("2 ve 3");
    expect([0 + 2 * +1, +2 + 0]).toEqual([2, 2]);
    expect(qAt(3, 4).options[qAt(3, 4).answer]).toBe("+2 ve +2");
    // The counterexample to the gas-free reversible claim must satisfy BOTH
    // premises. Aqueous weak-acid equilibrium changes species without a gas.
    const acid = formula("CH₃COOH"),
      acetate = formula("CH₃COO"),
      hydronium = formula("H₃O");
    for (const element of ["C", "H", "O"])
      expect((acid[element] ?? 0) + (water[element] ?? 0)).toBe(
        (acetate[element] ?? 0) + (hydronium[element] ?? 0),
      );
    expect(-1 + +1).toBe(0);
    expect(gAt(3, 9).optionReasons[4]).toContain(
      "Gaz fazı içermeyen bir sulu çözeltide",
    );
    expect(gAt(3, 9).optionReasons[4]).toContain(
      "hem tersinir hem kimyasaldır",
    );
  });

  it("checks donor adjacency, shared contacts, density and sign geometry without production science functions", () => {
    const donors = (symbols: string[], bonds: [number, number][]) =>
      bonds.filter(
        ([a, b]) =>
          (symbols[a] === "H" && ["N", "O", "F"].includes(symbols[b])) ||
          (symbols[b] === "H" && ["N", "O", "F"].includes(symbols[a])),
      ).length;
    expect(
      donors(
        ["C", "O", "C", "H", "H"],
        [
          [0, 1],
          [1, 2],
          [0, 3],
          [2, 4],
        ],
      ),
    ).toBe(0);
    expect(
      donors(
        ["C", "C", "O", "H"],
        [
          [0, 1],
          [1, 2],
          [2, 3],
        ],
      ),
    ).toBe(1);
    expect(
      donors(
        ["O", "H", "H"],
        [
          [0, 1],
          [0, 2],
        ],
      ),
    ).toBe(2);
    expect(donors(["Cl", "H"], [[0, 1]])).toBe(0);
    expect(qAt(2, 4).options[qAt(2, 4).answer]).toBe("HCl");
    // A six-vertex four-regular contact graph: K6 minus a perfect matching.
    // Edge enumeration proves feasibility and independently checks double counting.
    const edges: [number, number][] = [];
    for (let a = 0; a < 6; a++)
      for (let b = a + 1; b < 6; b++)
        if (Math.floor(a / 2) !== Math.floor(b / 2)) edges.push([a, b]);
    expect(edges).toHaveLength(12);
    expect(
      Array.from(
        { length: 6 },
        (_, i) => edges.filter((e) => e.includes(i)).length,
      ),
    ).toEqual([4, 4, 4, 4, 4, 4]);
    expect(
      qAt(2, 6)
        .options.map(Number)
        .flatMap((v, i) => (v === edges.length ? [i] : [])),
    ).toEqual([qAt(2, 6).answer]);
    expect(90 / 100).toBeLessThan(90 / 90);
    expect(gAt(2, 7).optionReasons[qAt(2, 7).answer]).toContain("0,90 g/mL");
    const chlorineCharge = -1,
      hydrogenPartial = +1,
      oxygenPartial = -1;
    expect(chlorineCharge * hydrogenPartial).toBeLessThan(0);
    expect(chlorineCharge * oxygenPartial).toBeGreaterThan(0);
    expect(qAt(1, 7).options[qAt(1, 7).answer]).toContain("H");
    const rotatedPair = Array.from(
      { length: 24 },
      (_, i) => (i * Math.PI) / 12,
    );
    for (const angle of rotatedPair) {
      expect(
        Math.abs(Math.cos(angle) + Math.cos(angle + Math.PI)),
      ).toBeLessThan(1e-12);
      expect(
        Math.abs(Math.sin(angle) + Math.sin(angle + Math.PI)),
      ).toBeLessThan(1e-12);
    }
    expect(qAt(1, 8).options[qAt(1, 8).answer]).toContain("apolardır");
  });

  it("does not infer two molecules from the abbreviated O–H···O contact", () => {
    const reaches = (bonds: number[][], start: number, target: number) => {
      const visited = new Set([start]);
      const queue = [start];
      while (queue.length) {
        const atom = queue.shift()!;
        for (const [a, b] of bonds) {
          const neighbor = a === atom ? b : b === atom ? a : undefined;
          if (neighbor !== undefined && !visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
      return visited.has(target);
    };
    // Donor O0–H9 and acceptor O8: water/ether can be separate, whereas
    // an ortho-hydroxy carbonyl scaffold connects both O atoms covalently.
    const separate = [
      [0, 9],
      [0, 10],
      [7, 8],
      [8, 11],
    ];
    const same = [
      [0, 9],
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 1],
      [2, 7],
      [7, 8],
    ];
    expect(reaches(separate, 0, 8)).toBe(false);
    expect(reaches(same, 0, 8)).toBe(true);
    for (const bonds of [separate, same]) {
      expect(bonds.some(([a, b]) => a === 0 && b === 9)).toBe(true);
      expect(bonds.some(([a, b]) => a === 9 && b === 8)).toBe(false);
    }
    const q = qAt(2, 5),
      g = gAt(2, 5);
    expect(q.options[q.answer]).toBe(
      "Molekül içi kovalent bağ ve uygun komşuya hidrojen bağı",
    );
    expect(g.knowledge[0]).toContain("aynı molekülün farklı konumlarında");
    expect(g.strategy).not.toContain("iki molekül sınırı koy");
    expect(g.optionReasons[2]).toContain("aynı veya ayrı molekülde");
  });

  it("reconstructs heat, gas and humidity candidates with exact integer ratios and exposes confounding", () => {
    const heat = qAt(4, 2),
      first = qAt(4, 1),
      vap = qAt(4, 3),
      gas = qAt(4, 6),
      humidity = qAt(4, 7);
    expect(heat.prompt).toContain("1 atm basınçta, erime eşiğindeki 1 g");
    const latent = Number(heat.prompt.match(/Lₑ=(\d+)/)![1]);
    const specificHundredths = Number(
      heat.prompt
        .match(/c=(\d+),(\d+)/)!
        .slice(1)
        .join(""),
    );
    const warming = (specificHundredths * 100) / 100,
      total = latent + warming;
    expect([latent, warming, total]).toEqual([334, 418, 752]);
    expect(
      heat.options.map(Number).flatMap((v, i) => (v === total ? [i] : [])),
    ).toEqual([heat.answer]);
    const input = Number(first.prompt.match(/kayıpsız (\d+) J/)![1]);
    expect(input * 2).toBe(latent);
    expect(first.options[first.answer]).toContain("%50 buz, %50 sıvı");
    const target = Number(vap.prompt.match(/Toplam (\d+) J/)![1]);
    const fullVapor = Number(vap.prompt.match(/ek (\d+) J/)![1]);
    expect(target - total).toBe(1128);
    expect(
      vap.options.flatMap((s, i) =>
        Number(s.slice(1)) * fullVapor === (target - total) * 100 ? [i] : [],
      ),
    ).toEqual([vap.answer]);
    expect(
      vap.options.map((s) => total + (Number(s.slice(1)) * fullVapor) / 100),
    ).toEqual([752, 1316, 1880, 2444, 3008]);
    const initialT = Number(gas.prompt.match(/(\d+) K’de/)![1]);
    const initialV = Number(gas.prompt.match(/(\d+) L hacim/)![1]);
    const finalT = Number(gas.prompt.match(/(\d+) K’ye/)![1]);
    expect(
      gas.options.flatMap((s, i) =>
        Number(s.replace(",", ".")) * initialT === initialV * finalT ? [i] : [],
      ),
    ).toEqual([gas.answer]);
    const tenths = [...humidity.prompt.matchAll(/(\d+),(\d+) kPa/g)].map((m) =>
      Number(m[1] + m[2]),
    );
    expect(tenths).toEqual([12, 24]);
    expect(
      humidity.options.flatMap((s, i) =>
        Number(s.slice(1)) * tenths[1] === tenths[0] * 100 ? [i] : [],
      ),
    ).toEqual([humidity.answer]);
    const experiments = [
      { m: 1, L: 100, P: 20 },
      { m: 2, L: 100, P: 10 },
    ];
    const durations = experiments.map(({ m, L, P }) => (m * L) / P);
    expect(durations).toEqual([5, 20]);
    expect(experiments[0].L).toBe(experiments[1].L);
    expect(qAt(4, 10).options[qAt(4, 10).answer]).toContain("kesin vermez");
    expect(gAt(4, 10).steps[1]).toContain("dört katına");
  });

  it("executes all stages with the production renderer and300 native callbacks", () => {
    const warnings: string[] = [],
      oldError = console.error,
      oldWarn = console.warn;
    console.error = (...args) => warnings.push(args.map(String).join(" "));
    console.warn = (...args) => warnings.push(args.map(String).join(" "));
    let renders = 0,
      callbacks = 0;
    try {
      for (const row of rows) {
        const q = byId.get(row.id)!,
          g = row.guidance;
        expect(helpPanels(q)).toHaveLength(5);
        for (let level = 0; level <= 6; level++) {
          let next = -1;
          const tree = QuestionHelp({
            question: q,
            level,
            onLevel: (value) => {
              next = value;
            },
          });
          const html = renderToStaticMarkup(tree),
            text = plain(html);
          renders++;
          if (level === 0) expect(html).not.toContain("help-content");
          else {
            g.knowledge.forEach((v) => expect(text).toContain(v));
            expect(text.includes(g.strategy)).toBe(level >= 2);
            g.steps.forEach((v, i) =>
              expect(text.includes(v)).toBe(level >= i + 3),
            );
          }
          if (level < 6) {
            expect(html).not.toContain("help-full-solution");
            expect(text).not.toContain(q.explanation);
            g.optionReasons.forEach((v) => expect(text).not.toContain(v));
            const action = button(tree);
            expect(action?.disabled).toBe(false);
            expect(next).toBe(-1);
            action!.onClick();
            callbacks++;
            expect(next).toBe(level + 1);
          } else {
            expect(button(tree)).toBeUndefined();
            expect(text).toContain(
              "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
            );
            expect(text).toContain(q.explanation);
            [...g.optionReasons, g.commonError, g.check].forEach((v) =>
              expect(text).toContain(v),
            );
            // The question-type tactic panel adds its own list; count only answer reasons.
            const reasons = html.replace(/<div class="help-tactic">[\s\S]*?<\/div>/g, "");
            expect((reasons.match(/<li>/g) ?? []).length).toBe(5);
          }
        }
        const reviewed = plain(
          renderToStaticMarkup(
            QuestionHelp({
              question: q,
              level: 1,
              reviewed: true,
              onLevel: () => {
                throw Error("No render dispatch");
              },
            }),
          ),
        );
        renders++;
        expect(reviewed).not.toContain("bağımsız doğru olarak sayılmaz");
        const disabled = QuestionHelp({
          question: q,
          level: 0,
          disabled: true,
          onLevel: () => {
            throw Error("No disabled dispatch");
          },
        });
        expect(button(disabled)?.disabled).toBe(true);
        expect(renderToStaticMarkup(disabled)).toContain("disabled");
        renders++;
      }
    } finally {
      console.error = oldError;
      console.warn = oldWarn;
    }
    expect(renders).toBe(450);
    expect(callbacks).toBe(300);
    expect(warnings).toEqual([]);
  });

  it("rejects400 identity mutations,50 malformed inline guides and preserves50 valid inline priorities", () => {
    const warnings: string[] = [],
      oldError = console.error,
      oldWarn = console.warn;
    console.error = (...args) => warnings.push(args.map(String).join(" "));
    console.warn = (...args) => warnings.push(args.map(String).join(" "));
    let rejected = 0,
      renders = 0,
      inline = 0;
    try {
      for (const row of rows) {
        const q = byId.get(row.id)!;
        for (const changed of [
          { ...q, id: q.id + "-v2" },
          { ...q, prompt: q.prompt + " Ek koşul." },
          { ...q, passage: "Başka pasaj." },
          { ...q, options: [q.options[0] + " değişti", ...q.options.slice(1)] },
          { ...q, options: [q.options[4], ...q.options.slice(0, 4)] },
          { ...q, answer: (q.answer + 1) % 5 },
          { ...q, explanation: q.explanation + " Ek açıklama." },
          { ...q, explanation: "" },
        ]) {
          expect(questionIdentity(changed)).not.toBe(row.identity);
          expect(resolvedGuidance(changed)).toBeUndefined();
          expect(helpPanels(changed)).toEqual([
            { title: "İlk ipucu", paragraphs: [changed.hint] },
          ]);
          const text = plain(
            renderToStaticMarkup(
              QuestionHelp({ question: changed, level: 1, onLevel: () => {} }),
            ),
          );
          renders++;
          [row.guidance.strategy, ...row.guidance.knowledge].forEach((v) =>
            expect(text).not.toContain(v),
          );
          rejected++;
        }
        const personal = { ...q, hint: "Bu kaydın kişisel ipucu." };
        expect(questionIdentity(personal)).toBe(row.identity);
        expect(resolvedGuidance(personal)).toEqual(row.guidance);
        expect(helpPanels(personal)[0].paragraphs).toContain(personal.hint);
        const malformed = {
          ...q,
          guidance: {
            ...row.guidance,
            optionReasons: row.guidance.optionReasons.slice(1),
          },
        };
        expect(resolvedGuidance(malformed)).toBeUndefined();
        expect(helpPanels(malformed)).toHaveLength(1);
        expect(
          renderToStaticMarkup(
            QuestionHelp({ question: malformed, level: 1, onLevel: () => {} }),
          ),
        ).not.toContain("Şıkların mantığı");
        renders++;
        const own = {
          ...row.guidance,
          knowledge: ["Bu kayıt kendi geçerli yardımını taşır."],
          strategy: "Bu kaydın kendi yöntemini uygula.",
        };
        const snapshot = { ...q, guidance: own };
        expect(resolvedGuidance(snapshot)).toEqual(own);
        const text = plain(
          renderToStaticMarkup(
            QuestionHelp({ question: snapshot, level: 2, onLevel: () => {} }),
          ),
        );
        renders++;
        expect(text).toContain(own.knowledge[0]);
        expect(text).toContain(own.strategy);
        expect(text).not.toContain(row.guidance.strategy);
        inline++;
      }
    } finally {
      console.error = oldError;
      console.warn = oldWarn;
    }
    expect(rejected).toBe(400);
    expect(renders).toBe(500);
    expect(inline).toBe(50);
    expect(warnings).toEqual([]);
  });
});
