import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  changeCases,
  changeEvidence,
  covalentName,
  forge011ChemistryGuides,
  forge011ChemistryLessons,
  forge011ChemistryTopics,
  hydrogenBond,
  hydrogenPartners,
  interactionFor,
  interactionPoles,
  namingExamples,
  waterHeating,
} from "../src/learning/forge011Chemistry";

describe("kovalent sayı okuması", () => {
  it("counts every selected molecule without reducing molecular formulae", () => {
    const expected = [
      ["CO", "Karbon monoksit", 2],
      ["CO₂", "Karbon dioksit", 3],
      ["N₂O₄", "diazot tetraoksit", 6],
      ["N₂O₅", "diazot pentaoksit", 7],
      ["PCl₃", "Fosfor triklorür", 4],
      ["SF₆", "Kükürt hekzaflorür", 7],
      ["OF₂", "Oksijen diflorür", 3],
    ];
    namingExamples.forEach((sample, i) => {
      const r = covalentName(sample.first, sample.second, sample.n, sample.m);
      expect([r.formula, r.name, r.atoms]).toEqual(expected[i]);
    });
    expect(covalentName("Cl", "O", 2, 7).atoms).toBe(9);
    expect(3 * covalentName("P", "Cl", 1, 3).secondCount).toBe(9);
  });
  it("rejects unsupported atoms, identical elements and noninteger/out-of-range counts", () => {
    for (const args of [
      ["Na", "O", 2, 1],
      ["C", "C", 1, 2],
      ["C", "O", 0, 2],
      ["C", "O", 1, 11],
      ["C", "O", 1, 1.5],
    ] as const)
      expect(() => covalentName(args[0], args[1], args[2], args[3])).toThrow(
        "NAMING_SCOPE",
      );
  });
});

describe("sorulan çifti ve London katkısını ayırma", () => {
  it("fixes induced opposite pole toward either ion in both particle orders and both saved transient states", () => {
    for (const neutral of ["water", "argon", "oxygen", "hcl"]) {
      for (const [ion, facing] of [
        ["sodium", "δ−"],
        ["chloride", "δ+"],
      ] as const) {
        for (const instant of [0, 1]) {
          const right = interactionPoles(ion, neutral, 1, instant)!;
          const left = interactionPoles(neutral, ion, 0, instant)!;
          expect(right.left, `${ion}–${neutral},right,${instant}`).toBe(facing);
          expect(left.right, `${neutral}–${ion},left,${instant}`).toBe(facing);
          expect(right.left).not.toBe(right.right);
          expect(left.left).not.toBe(left.right);
          expect(interactionPoles(ion, neutral, 0, instant)).toBeNull();
        }
      }
    }
    expect(interactionPoles("argon", "oxygen", 0, 0)).not.toEqual(
      interactionPoles("argon", "oxygen", 0, 1),
    );
    for (const instant of [0, 1])
      expect(interactionPoles("argon", "oxygen", 0, instant)!.right).not.toBe(
        interactionPoles("argon", "oxygen", 1, instant)!.left,
      );
    expect(() => interactionPoles("unknown", "water", 0, 0)).toThrow(
      "INTERACTION_POLES_SCOPE",
    );
    expect(() => interactionPoles("argon", "water", 2, 0)).toThrow(
      "INTERACTION_POLES_SCOPE",
    );
  });
  it("uses the charge/polarity of both chosen partners including reverse order", () => {
    const cases: [string, string, string][] = [
      ["argon", "oxygen", "London"],
      ["hcl", "hcl", "Dipol–dipol"],
      ["water", "oxygen", "Dipol–indüklenmiş dipol"],
      ["sodium", "water", "İyon–dipol"],
      ["chloride", "water", "İyon–dipol"],
      ["sodium", "argon", "İyon–indüklenmiş dipol"],
      ["sodium", "chloride", "İyon–iyon çekimi"],
      ["sodium", "sodium", "İyon–iyon itmesi"],
      ["water", "water", "Hidrojen bağı"],
    ];
    for (const [a, b, label] of cases) {
      expect(interactionFor(a, b).label).toBe(label);
      expect(interactionFor(b, a).label).toBe(label);
    }
  });
  it("retains London in neutral polar pairs and distinguishes ionic classification", () => {
    expect(interactionFor("water", "water").london).toBe(true);
    expect(interactionFor("hcl", "hcl").london).toBe(true);
    expect(interactionFor("water", "oxygen").london).toBe(true);
    expect(interactionFor("sodium", "chloride").weak).toBe(false);
    expect(() => interactionFor("missing", "water")).toThrow(
      "INTERACTION_SCOPE",
    );
  });
});

describe("H bağı verici–alıcı ve geometri kapısı", () => {
  it("separates self pairing from a water/ether mixture and preserves role direction", () => {
    expect(hydrogenBond("ether", "ether", true).capable).toBe(false);
    const mixture = hydrogenBond("ether", "water", true);
    expect(mixture.forward).toBe(false);
    expect(mixture.reverse).toBe(true);
    expect(mixture.donor?.id).toBe("water");
    expect(mixture.acceptor?.id).toBe("ether");
    expect(mixture.formed).toBe(true);
    expect(hydrogenBond("water", "ether", true).forward).toBe(true);
  });
  it("requires actual alignment as well as a possible pair", () => {
    const open = hydrogenBond("water", "water", false);
    expect(open.capable).toBe(true);
    expect(open.formed).toBe(false);
    expect(hydrogenBond("water", "water", true).formed).toBe(true);
    expect(hydrogenBond("hcl", "hcl", true).formed).toBe(false);
    expect(hydrogenBond("methane", "water", true).formed).toBe(false);
  });
  it("does not create a donor in ether and requires a suitable acceptor too", () => {
    const neutralSelf = new Set(["water", "methanol", "ammonia", "hf"]);
    for (const p of hydrogenPartners)
      expect(hydrogenBond(p.id, p.id, true).formed, p.id).toBe(
        neutralSelf.has(p.id),
      );
    expect(hydrogenBond("hcl", "methanol", true).capable).toBe(false);
    expect(() => hydrogenBond("unknown", "water", true)).toThrow(
      "HYDROGEN_SCOPE",
    );
  });
});

describe("tanecik kimliği ve korunum", () => {
  it("keeps four H/two O atoms while molecule count and identity may change", () => {
    for (const c of changeCases) {
      for (const stage of [false, true]) {
        const r = changeEvidence(c.id, stage);
        expect([r.hydrogen, r.oxygen]).toEqual([4, 2]);
        expect(r.species).toBe(stage ? c.after : c.before);
      }
    }
    expect(changeEvidence("electrolysis", false).waterUnits).toBe(2);
    expect(changeEvidence("electrolysis", true).waterUnits).toBe(0);
    expect(changeEvidence("formation", true).waterUnits).toBe(2);
    expect(changeEvidence("evaporation", true).waterUnits).toBe(2);
    expect(changeEvidence("evaporation", true).separated).toBe(true);
    expect(() => changeEvidence("unknown", true)).toThrow("CHANGE_SCOPE");
  });
});

describe("enerji grafiği ve faz payları", () => {
  it("handles all exact transition endpoints without inventing a phase fraction", () => {
    const expected = [
      [0, 0, 1, 0, 0],
      [167, 0, 0.5, 0.5, 0],
      [334, 0, 0, 1, 0],
      [543, 50, 0, 1, 0],
      [752, 100, 0, 1, 0],
      [1880, 100, 0, 0.5, 0.5],
      [3008, 100, 0, 0, 1],
      [3208, 200, 0, 0, 1],
    ];
    for (const [q, t, s, l, g] of expected) {
      const r = waterHeating(q);
      expect(r.temperature).toBeCloseTo(t, 10);
      expect(r.solid).toBeCloseTo(s, 10);
      expect(r.liquid).toBeCloseTo(l, 10);
      expect(r.gas).toBeCloseTo(g, 10);
    }
  });
  it("conserves nonnegative phase mass over the complete slider domain and temperature monotonicity", () => {
    let previous = -Infinity;
    for (let q = 0; q <= 3208; q++) {
      const r = waterHeating(q);
      expect(r.solid + r.liquid + r.gas).toBeCloseTo(1, 12);
      expect([r.solid, r.liquid, r.gas].every((p) => p >= 0 && p <= 1)).toBe(
        true,
      );
      expect(r.temperature).toBeGreaterThanOrEqual(previous - 1e-9);
      previous = r.temperature;
    }
    for (const q of [-1, 3209, NaN, Infinity])
      expect(() => waterHeating(q)).toThrow("PHASE_SCOPE");
  });
  it("distinguishes energy-taking plateaus from single-phase heating", () => {
    expect(waterHeating(167).phase).toBe("Katı + sıvı");
    expect(waterHeating(752).phase).toBe("Sıvı");
    expect(waterHeating(1880).phase).toBe("Sıvı + gaz");
    expect(waterHeating(3008).phase).toBe("Gaz");
    expect(334 + 4.18 * 100).toBeCloseTo(752, 10);
    expect((1880 - 752) / 2256).toBe(0.5);
  });
});

it("provides fifty self-contained five-choice questions with independently reviewed answer texts", () => {
  const keys = [
    [
      "Diazot pentaoksit",
      "9",
      "Oksijen diflorür",
      "CO iki elementli bileşik formülü, Co tek element sembolüdür.",
      "Aynı en basit oranı verse de molekül başına atom sayısı değişir.",
      "9",
      "Sodyum oksit",
      "Yayılmış elektronlar",
      "Katmanlar kayarken yayılmış elektron yoğunluğu yeni düzene uyum sağlayabilir.",
      "İletkenlik tek başına metalik yapı için kesin kanıt değildir.",
    ],
    [
      "London",
      "Dipol–dipol katkısına ek olarak London da vardır.",
      "Dipol–indüklenmiş dipol",
      "İyon–dipol",
      "İyon–indüklenmiş dipol",
      "İyon–iyon",
      "H uçları",
      "Molekül apolardır; London katkısı bulunur.",
      "I₂ > Br₂ > Cl₂",
      "Enerji büyüklüğü tek başına kimyasal değişim kanıtı değildir.",
    ],
    [
      "N/O/F’ye doğrudan bağlı H vericisi bulunmaz.",
      "Su O–H verici, eter O’su alıcıdır.",
      "Etanolün O–H vericisi vardır; eterde bu verici yoktur.",
      "HCl",
      "Molekül içi kovalent bağ ve uygun komşuya hidrojen bağı",
      "12",
      "Buzun yoğunluğu 0,90 g/mL’dir ve sıvıdan küçüktür.",
      "Yapısal uygunluk, bu uzak geometride gerçekleşmiş temasın tek başına kanıtı değildir.",
      "Tek temas verisi, toplam kaynama sırasını tek başına belirlemez.",
      "H₂O kimliği ve molekül içindeki O–H bağları korunur.",
    ],
    [
      "Fiziksel süblimleşme",
      "4 H ve 2 O",
      "2 ve 3",
      "+2 ve +2",
      "A fiziksel, B kimyasaldır.",
      "Fiziksel veya kimyasal ayrımı için gaz kimliği gibi ek kanıt gerekir.",
      "Element kimliği korunan fiziksel buharlaşmadır.",
      "2",
      "Hayır; tersinir kimyasal tepkimeler de vardır.",
      "Erime fiziksel, yeni ürün veren yanma kimyasaldır.",
    ],
    [
      "%50 buz, %50 sıvı; sıcaklık 0 °C",
      "752",
      "%50",
      "İyonik kristal",
      "Eşittir.",
      "3",
      "%50",
      "Sıcak lav olmak tek başına serbest elektron–iyon plazması olmayı kanıtlamaz.",
      "100 °C sıvı kaynama başlangıcında olabilir; tamamı gaz sonucu zorunlu değildir.",
      "Tek başına daha büyük L değerini kesin vermez.",
    ],
  ];
  expect(forge011ChemistryLessons).toHaveLength(5);
  const ids = new Set<string>();
  forge011ChemistryLessons.forEach((lesson, i) => {
    expect(lesson.questions).toHaveLength(10);
    lesson.questions.forEach((q, j) => {
      expect(questionContentIssues(q), q.id).toEqual([]);
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.options[q.answer].tr, q.id).toBe(keys[i][j]);
      expect(q.explanation.tr.length).toBeGreaterThan(100);
      expect(ids.has(q.id)).toBe(false);
      ids.add(q.id);
    });
  });
  expect(ids.size).toBe(50);
});

it("links only the five assigned detailed topics and includes complete teaching scaffolds", () => {
  expect(Object.values(forge011ChemistryTopics)).toEqual([
    "detail-157",
    "detail-158",
    "detail-159",
    "detail-160",
    "detail-161",
  ]);
  for (const guide of forge011ChemistryGuides) {
    expect(guide.sections.length).toBeGreaterThanOrEqual(8);
    expect(guide.sections.every((s) => s.paragraphs.length >= 2)).toBe(true);
    expect(guide.examples.length).toBeGreaterThanOrEqual(4);
    expect(
      guide.examples.every((e) => e.steps.length >= 3 && e.check && e.pitfall),
    ).toBe(true);
    expect(guide.recall.length).toBeGreaterThanOrEqual(4);
    expect(forge011ChemistryTopics[guide.id]).toBeDefined();
  }
});
