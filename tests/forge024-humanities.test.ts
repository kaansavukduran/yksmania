import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  forge024HumanitiesTopics as topics,
  forge024HumanitiesGuides as guides,
  forge024HumanitiesLessons as lessons,
  worldEvidence024,
  religionEvidence024,
  scienceFlow024,
  anatoliaEvidence024,
  humanitiesDefaults024,
  type HumanitiesScene024,
} from "../src/learning/forge024Humanities";
const harness = vi.hoisted(() => ({
  saved: {} as Record<string, unknown>,
  key: "",
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (key: string, defaults: Record<string, unknown>) => {
    harness.key = key;
    return [
      Object.fromEntries(
        Object.entries(defaults).map(([k, v]) => [
          k,
          typeof harness.saved[k] === typeof v ? harness.saved[k] : v,
        ]),
      ),
      () => {},
    ];
  },
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: new Proxy({}, { get: () => harness.saved }) },
  }),
}));
import Lab from "../src/learning/Forge024HumanitiesLab";
function validGraph(s: HumanitiesScene024) {
  const ids = s.nodes.map((n) => n.id);
  expect(new Set(ids).size).toBe(ids.length);
  for (const l of s.links) {
    expect(ids).toContain(l.from);
    expect(ids).toContain(l.to);
    expect(l.evidence.length).toBeGreaterThan(15);
  }
  expect(s.context.trim().length).toBeGreaterThan(15);
  expect(s.explanation.length).toBeGreaterThan(40);
}
describe("024: dört Din ünitesinde kavram, kaynak sınırı ve bağımsız gerekçe", () => {
  it("preserves the full place name while allowing one optional HTML line break", () => {
    harness.saved = { person: 8 };
    const html = renderToStaticMarkup(
      createElement(Lab, { lessonId: "anadoluda-islam" }),
    );
    expect(html).toContain('aria-label="Sulucakarahöyük"');
    expect(html).toContain("Suluca\u00adkarahöyük");
    expect(html.replaceAll("\u00ad", "")).toContain("Sulucakarahöyük");
    expect(anatoliaEvidence024(8, 0, 0).context).toContain("Sulucakarahöyük");
    expect(anatoliaEvidence024(8, 0, 0).context).not.toContain("\u00ad");
    harness.saved = {};
  });
  it("maps four exact workbook headings and keeps substantive teaching available", () => {
    expect(Object.values(topics)).toEqual([
      "detail-90",
      "detail-91",
      "detail-92",
      "detail-93",
    ]);
    expect(guides.map((g) => g.sections.length)).toEqual([20, 26, 25, 24]);
    for (const g of guides) {
      expect(g.examples).toHaveLength(6);
      expect(g.recall).toHaveLength(6);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 100)).toBe(true);
      }
    }
    expect(lessons.every((l) => l.subjectId === "tyt-din")).toBe(true);
  });
  it("has80 self-contained five-choice original questions and240 concrete steps", () => {
    const all = lessons.flatMap((l) => l.questions);
    expect(all).toHaveLength(80);
    expect(new Set(all.map((q) => q.id)).size).toBe(80);
    expect(new Set(all.map((q) => q.guidance!.commonError)).size).toBe(80);
    expect(new Set(all.map((q) => q.guidance!.check)).size).toBe(80);
    for (const q of all) {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.passage!.tr.length).toBeGreaterThan(40);
      expect(questionContentIssues(q), q.id).toEqual([]);
      const h = questionGuidanceSchema.parse(q.guidance);
      expect(h.steps).toHaveLength(3);
      expect(h.optionReasons).toHaveLength(5);
      expect(new Set(h.steps).size).toBe(3);
      for (const step of h.steps) {
        expect(h.knowledge).not.toContain(step);
        expect(step).not.toBe(h.strategy);
      }
    }
  });
  it("preserves independently readable semantic keys after option and reason rebinding", () => {
    const markers = [
      [
        "Berzah",
        "Haşir",
        "Mahşer",
        "Anlamı cümlenin",
        "Ahiret",
        "Dinî öğretinin",
        "Geçici olan",
        "Yönelişten",
        "Amel defteri",
        "Bir kişinin nihai",
        "Kavramlar açıklanabilir",
        "Vasiyet ve borç",
        "Teçhiz",
        "Tekfin",
        "Farz-ı kifaye",
        "Cenaze namazında rükû",
        "Taziye ve yakınlara",
        "Sabreden kişinin",
        "Terim geleneği",
        "Sadaka-i cariye",
      ],
      [
        "Tarihî kökler",
        "Teslisin",
        "İnsanlar arası",
        "Bütünün yerine",
        "Tora",
        "Sözlü kökenle",
        "Şabat",
        "Ortak dinî bağ",
        "Menora",
        "Bütün Yahudilerin",
        "Üç kişiyle",
        "Dört İncil, Yeni",
        "Dört İncil",
        "Vaftiz ve evharistiya",
        "Noel doğum",
        "Liste kendi",
        "Ortodoks sözcüğünün",
        "Papa unvanının",
        "Sinagogun önünden",
        "Sinagog mekân",
      ],
      [
        "Suffe",
        "Öğretim odağı",
        "Bu programda",
        "Dârülhadis",
        "Dârülkurra",
        "Beytü’l-hikme",
        "Rasathane",
        "Şifahane bağlamı",
        "Kitap varlığını",
        "Tefsir ve hadis",
        "İlki kelam",
        "Seyahatname coğrafi",
        "Somut cebir",
        "Optik",
        "Eser tıpla",
        "Sergilenen düzeneğin",
        "DNA onarımı",
        "Bilgi aktarımı",
        "Kanıta bağlı",
        "Doğayı düşünme",
      ],
      [
        "Önemli olay",
        "Farklı toplulukların",
        "Maveraünnehir",
        "Yapının işlevi",
        "Fütüvvet değerleri",
        "Dolaylı toplumsal",
        "Eserin etki",
        "Ebû Hanîfe’nin",
        "Fıkhi yöntemle",
        "Aynı şahsiyetin",
        "Fıkıh usulüne",
        "Metni önemsemesi",
        "Ahmed Yesevî",
        "Mevlânâ Celâleddîn",
        "Mesleki örgütlenme",
        "Yer, eser ilişkisi",
        "Bedeninin bütün",
        "Tarihî belge",
        "Öğrenme, şehir",
        "Ahiliğin bütün",
      ],
    ];
    for (let u = 0; u < 4; u++)
      for (let i = 0; i < 20; i++) {
        const q = lessons[u].questions[i];
        expect(q.options[q.answer].tr, q.id).toContain(markers[u][i]);
        expect(q.explanation.tr, q.id).toContain(
          q.guidance!.optionReasons[q.answer],
        );
      }
  });
  it("balances unpublished keys without repeating short answer cycles", () => {
    for (const l of lessons) {
      const a = l.questions.map((q) => q.answer);
      expect(
        [0, 1, 2, 3, 4].map((i) => a.filter((n) => n === i).length),
      ).toEqual([4, 4, 4, 4, 4]);
      for (let p = 1; p <= 10; p++)
        expect(a.every((n, i) => i + p >= a.length || n === a[i + p])).toBe(
          false,
        );
    }
    const all = lessons.flatMap((l) => l.questions.map((q) => q.answer));
    for (let p = 1; p <= 20; p++)
      expect(all.every((n, i) => i + p >= all.length || n === all[i + p])).toBe(
        false,
      );
  });
  it("checks literal worked-passage exclusions without claiming automated semantic independence", () => {
    const qs = lessons.flatMap((l) => l.questions);
    for (const g of guides)
      for (const e of g.examples) {
        expect(e.prompt).toMatch(/A\).*B\).*C\).*D\).*E\)/s);
        expect(e.steps).toHaveLength(3);
        for (const q of qs) expect(e.prompt).not.toContain(q.passage!.tr);
      }
    expect(guides[0].examples[0].prompt).toContain("mezar yeri");
    expect(guides[2].examples[0].prompt).toContain("delik çapı");
    expect(guides[2].examples[2].prompt).toContain(
      "Belge tarihleri A örneğinin",
    );
    expect(guides[3].examples[5].prompt).toContain(
      "yanlış tanıklığı reddediyor",
    );
    expect(guides[3].examples[0].prompt).toContain("Makâlâtü’l-İslâmiyyîn");
  });
  it("changes exactly the supported world evidence under added details across30 states", () => {
    for (let story = 0; story < 5; story++)
      for (let focus = 0; focus < 3; focus++)
        for (const detail of [false, true])
          validGraph(worldEvidence024(story, focus, detail));
    expect(worldEvidence024(0, 1, false).links[1].valid).toBe(false);
    expect(worldEvidence024(0, 1, true).result).toContain("Mahşer");
    expect(worldEvidence024(0, 0, false).result).toBe(
      worldEvidence024(0, 0, true).result,
    );
    expect(worldEvidence024(1, 0, false).result).toBe("Berzah");
    expect(worldEvidence024(1, 0, true).result).toBe("Berzah");
    expect(worldEvidence024(2, 2, false).result).toContain("henüz");
    expect(worldEvidence024(2, 2, true).result).toContain("ayrıca");
    expect(worldEvidence024(3, 0, true).result).toContain("Tekfin");
  });
  it("keeps tradition and category independent across378 classifications", () => {
    const traditionByItem = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2,
      ],
      categories = [0, 0, 0, 1, 2, 4, 4, 4, 5, 0, 0, 3, 3, 2, 2, 4, 1, 6];
    for (let i = 0; i < 18; i++)
      for (let t = 0; t < 3; t++)
        for (let c = 0; c < 7; c++) {
          const s = religionEvidence024(i, t, c);
          validGraph(s);
          expect(s.links.map((l) => l.valid)).toEqual([
            i === 17 || traditionByItem[i] === t,
            categories[i] === c,
          ]);
        }
    expect(religionEvidence024(17, 0, 6).explanation).toContain(
      "belirli din veya mezhep sonucu çıkmaz",
    );
    expect(religionEvidence024(6, 0, 4).context).toContain("yedi");
    expect(religionEvidence024(7, 0, 4).context).toContain("Altı");
  });
  it("distinguishes translation,observation and unsupported revision across32 histories", () => {
    for (const t of [false, true])
      for (const o of [false, true])
        for (const r of [false, true])
          for (let v = 0; v < 4; v++) {
            const s = scienceFlow024(t, o, r, v);
            validGraph(s);
            expect(s.links.map((l) => l.valid)).toEqual([o, o && r, v === 0]);
            expect(s.result.includes("kanıtı eksik")).toBe(r && !o);
          }
    expect(scienceFlow024(true, false, false).result).toContain("Çeviri var");
    expect(scienceFlow024(false, true, true).result).toContain(
      "gözleme dayalı",
    );
    expect(scienceFlow024(false, false, false).result).toContain(
      "belirtilmedi",
    );
  });
  it("separates real teaching from hypothetical new-city evidence across108 states", () => {
    for (let p = 0; p < 12; p++)
      for (let c = 0; c < 3; c++)
        for (let r = 0; r < 3; r++) {
          const s = anatoliaEvidence024(p, c, r);
          validGraph(s);
          expect(s.context).toContain("Kurmaca yeni kayıt");
          expect(s.links[1].valid).toBe(
            c === 0 || (c === 1 && r === 1) || (c === 2 && r !== 1),
          );
        }
    expect(anatoliaEvidence024(5, 1, 0).result).toContain("kanıtı yok");
    expect(anatoliaEvidence024(5, 1, 1).explanation).toContain(
      "gerçek kişinin yaşam öyküsüne yeni tarihî olay eklemez",
    );
    expect(anatoliaEvidence024(10, 1, 2).result).toContain(
      "menkıbe tek başına yetmez",
    );
    expect(anatoliaEvidence024(10, 2, 2).context).toContain(
      "Bu şahsiyetle ilgili bir menkıbenin",
    );
  });
  it("rejects invalid domains instead of producing false classifications", () => {
    for (const n of [-1, 0.5, NaN, Infinity, 999]) {
      expect(() => worldEvidence024(n)).toThrow(RangeError);
      expect(() => worldEvidence024(0, n)).toThrow(RangeError);
      expect(() => religionEvidence024(n)).toThrow(RangeError);
      expect(() => religionEvidence024(0, n)).toThrow(RangeError);
      expect(() => religionEvidence024(0, 0, n)).toThrow(RangeError);
      expect(() => scienceFlow024(true, false, false, n)).toThrow(RangeError);
      expect(() => anatoliaEvidence024(n)).toThrow(RangeError);
      expect(() => anatoliaEvidence024(0, n)).toThrow(RangeError);
      expect(() => anatoliaEvidence024(0, 0, n)).toThrow(RangeError);
    }
    expect(() => worldEvidence024(0, 0, 1 as unknown as boolean)).toThrow(
      TypeError,
    );
    expect(() => scienceFlow024("yes" as unknown as boolean)).toThrow(
      TypeError,
    );
  });
  it("returns fresh graphs rather than leaking a previous user mutation", () => {
    for (const fn of [
      () => worldEvidence024(),
      () => religionEvidence024(),
      () => scienceFlow024(),
      () => anatoliaEvidence024(),
    ]) {
      const before = JSON.stringify(fn()),
        s = fn();
      s.nodes[0].label = "changed";
      s.links[0].evidence = "changed";
      expect(JSON.stringify(fn())).toBe(before);
    }
  });
  it("renders actual JSX with scoped persistence keys and readable270-wide diagrams", () => {
    harness.saved = {};
    for (const l of lessons) {
      const h = renderToStaticMarkup(createElement(Lab, { lessonId: l.id }));
      expect(harness.key).toBe(`forge024-humanities:${l.id}`);
      expect(h).toMatch(/viewBox="0 0 270 /);
      expect(h).toContain("Önce gerekçeni");
      expect(h).toContain("disabled");
      expect(h).not.toContain("NaN");
    }
    expect(() =>
      renderToStaticMarkup(createElement(Lab, { lessonId: "invalid" })),
    ).toThrow(RangeError);
  });
  it("keeps reveal gated by a real explanation and handles stale stored values", () => {
    for (const l of lessons) {
      harness.saved = {
        reveal: true,
        reason: "   ",
        worldStory: NaN,
        worldFocus: -1,
        item: 999,
        tradition: 77,
        category: 0.5,
        institution: NaN,
        person: 999,
        claim: -2,
        record: 77,
      };
      let h = renderToStaticMarkup(createElement(Lab, { lessonId: l.id }));
      expect(h).toContain("Önce gerekçeni");
      expect(h).not.toContain("NaN");
      harness.saved = {
        reason:
          "Bu sonuç için verilen fiili ve eksik bilgiyi ayrı değerlendiriyorum.",
        reveal: true,
      };
      h = renderToStaticMarkup(createElement(Lab, { lessonId: l.id }));
      expect(h).toContain("otomatik doğru saymaz");
    }
    expect(humanitiesDefaults024.reveal).toBe(false);
  });
  it("bounds existing long explanations below the persistent state limit", () => {
    harness.saved = { reason: "a".repeat(200), reveal: true };
    const h = renderToStaticMarkup(
      createElement(Lab, { lessonId: lessons[0].id }),
    );
    expect(h).toContain('maxLength="120"');
    expect(h).toContain(`>${"a".repeat(120)}</textarea>`);
    expect(h).not.toContain("a".repeat(121));
  });
  it("clears stale reasoning when this model falls back from an invalid selection", () => {
    for (const [kind, key] of [
      "worldStory",
      "item",
      "institution",
      "person",
    ].entries()) {
      harness.saved = {
        [key]: 999,
        reason: "Eski seçimin verisine baktım.",
        reveal: true,
      };
      const h = renderToStaticMarkup(
        createElement(Lab, { lessonId: lessons[kind].id }),
      );
      expect(h).toContain("Önce gerekçeni");
      expect(h).not.toContain("Eski seçimin");
    }
    harness.saved = {
      worldStory: 999,
      reason: "Bu metni sınıflandırdım.",
      reveal: true,
    };
    const h = renderToStaticMarkup(
      createElement(Lab, { lessonId: lessons[1].id }),
    );
    expect(h).not.toContain("Önce gerekçeni");
    expect(h).toContain("Bu metni sınıflandırdım.");
  });
  it("rejects old reasoning when the shared hook hides a wrong raw selection type", () => {
    const cases = [
      [0, "worldStory", "5"],
      [0, "worldDetail", "true"],
      [1, "item", "8"],
      [2, "translation", "false"],
      [3, "person", "3"],
    ] as const;
    for (const [kind, key, value] of cases) {
      harness.saved = {
        [key]: value,
        reason: "Eski yanlış seçimin gerekçesi.",
        reveal: true,
      };
      const html = renderToStaticMarkup(
        createElement(Lab, { lessonId: lessons[kind].id }),
      );
      expect(html).toContain("Önce gerekçeni");
      expect(html).not.toContain("Eski yanlış seçimin");
    }
    harness.saved = {
      worldStory: "5",
      reason: "Bu dosyanın kaydını inceledim.",
      reveal: true,
    };
    const html = renderToStaticMarkup(
      createElement(Lab, { lessonId: lessons[1].id }),
    );
    expect(html).not.toContain("Önce gerekçeni");
    expect(html).toContain("otomatik doğru saymaz");
  });
});
