import { createHash } from "node:crypto";
import { Children, createElement, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance029History.json";
import { lessonById } from "../src/domain/content";
import { forge093HistoryLessons } from "../src/learning/forge093History";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";
import { clarifiedQuestionView } from "../src/domain/questionPresentation";

// Test-local catalogue staging only. The production resolver, identity guard,
// presentation and renderer stay real; Root owns later runtime registration.
vi.mock("../src/learning/questionHelpCatalogue.json", async (original) => {
  const actual = await original<{ default: unknown[] }>();
  const authored = await import("../src/learning/guidance029History.json");
  return {
    default: [
      ...actual.default,
      ...authored.default.map((row) => ({ ...row, legacyPanelCount: 1 })),
    ],
  };
});
const ids = [
  "sultan-osmanli-merkez-teskilati",
  "klasik-cag-osmanli-toplum-duzeni",
  "degisen-dunya-dengeleri-osmanli",
];
const originals = ids.flatMap((id) => lessonById(id)!.questions);
const flat = originals.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((x) => x.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const views = flat.map(clarifiedQuestionView);
const byId = (id: string) => flat.find((q) => q.id === id)!;
const chosen = (id: string) => {
  const q = byId(id);
  return q.options[q.answer];
};
const stable = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(stable)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.keys(value)
            .sort()
            .map((key) => [
              key,
              stable((value as Record<string, unknown>)[key]),
            ]),
        )
      : value;
const fold = (value: string) => value.replace(/\s+/g, " ").trim();
const text = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replaceAll("&amp;", "&")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const button = (
  tree: ReactNode,
): { onClick: () => void; disabled?: boolean } | undefined => {
  let result: { onClick: () => void; disabled?: boolean } | undefined;
  Children.forEach(tree, (child) => {
    if (
      !isValidElement<{
        children?: ReactNode;
        onClick?: () => void;
        disabled?: boolean;
      }>(child)
    )
      return;
    if (child.type === "button" && child.props.onClick)
      result = { onClick: child.props.onClick, disabled: child.props.disabled };
    else result ??= button(child.props.children);
  });
  return result;
};

describe("029 özgün 30 Tarih kartının ayrı ve kademeli yardımı", () => {
  it("üç eski setteki 30 tam ham kartı, beşer şıkkı ve kimliği aynen korur", () => {
    expect(originals).toEqual(
      forge093HistoryLessons.flatMap((lesson) => lesson.questions),
    );
    expect(originals).toHaveLength(30);
    expect(
      createHash("sha256")
        .update(JSON.stringify(stable(originals)))
        .digest("hex"),
    ).toBe("5f4a50f839d8fb4e9dacb4276170d9ad632fe8e1cf5e5144495491a23b436815");
    expect(rows.map((r) => r.id)).toEqual(flat.map((q) => q.id));
    for (const [i, row] of rows.entries()) {
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      expect(row.identity).toBe(questionIdentity(views[i]));
      expect(flat[i].options).toHaveLength(5);
      expect(originals[i].guidance).toBeUndefined();
    }
  });
  it("1700 XVII ve1711 XVIII yüzyıldır; B7 yalnızC görünümüyle tek yanıtı korur, hamı yeniden yazmaz", () => {
    const century = (year: number) => Math.ceil(year / 100);
    expect(century(1700)).toBe(17);
    expect(century(1711)).toBe(18);
    expect(century(1700)).not.toBe(century(1711));
    const raw = byId("f93h-b7");
    const rawBytes = JSON.stringify(raw);
    const view = clarifiedQuestionView(raw);
    expect(raw.options[2]).toBe(
      "Aynı yüzyılda farklı yönlü sonuçlar yaşanabilir.",
    );
    expect(view.options).toEqual(
      raw.options.map((option, i) =>
        i === 2
          ? "Farklı tarihlerde farklı yönlü sonuçlar yaşanabilir."
          : option,
      ),
    );
    expect({ ...view, options: raw.options }).toEqual(raw);
    expect(view.answer).toBe(3);
    expect(JSON.stringify(raw)).toBe(rawBytes);
    for (const other of flat.filter((q) => q.id !== raw.id))
      expect(clarifiedQuestionView(other)).toEqual(other);
    const g = rows.find((r) => r.id === raw.id)!.guidance;
    expect(g.optionReasons[2]).toContain("1700 XVII., 1711 XVIII.");
    expect(g.optionReasons[2]).not.toContain("XVIII. yüzyılda 1700");
    const withoutHint = { ...raw, hint: undefined };
    expect(clarifiedQuestionView(withoutHint).options).toEqual(view.options);
    expect(resolvedGuidance(withoutHint)).toEqual(g);
  });
  it("30 bilgi/yöntem, 90 ilerleyen adım ve 150 şık nedenini ayrı tutar", () => {
    expect(
      new Set(rows.map((r) => fold(r.guidance.knowledge.join(" ")))).size,
    ).toBe(30);
    expect(new Set(rows.map((r) => fold(r.guidance.strategy))).size).toBe(30);
    expect(new Set(rows.flatMap((r) => r.guidance.steps.map(fold))).size).toBe(
      90,
    );
    expect(
      new Set(rows.flatMap((r) => r.guidance.optionReasons.map(fold))).size,
    ).toBe(150);
    for (const [i, row] of rows.entries()) {
      const g = questionGuidanceSchema.parse(row.guidance);
      expect(g.knowledge).toHaveLength(1);
      expect(g.steps).toHaveLength(3);
      expect(g.optionReasons).toHaveLength(5);
      const panels = [...g.knowledge, g.strategy, ...g.steps].map(fold);
      expect(new Set(panels).size).toBe(5);
      expect(panels).not.toContain(fold(flat[i].hint));
      expect(g.steps).not.toContain(flat[i].explanation);
      expect(g.strategy).not.toMatch(/Doğru\.|[ABCDE] (?:şıkkı|seçeneği)/);
      for (const [j, reason] of g.optionReasons.entries()) {
        expect(reason.startsWith("Doğru."), `${row.id}/${j}`).toBe(
          j === flat[i].answer,
        );
        expect(reason.length).toBeGreaterThan(60);
      }
      expect(g.commonError).not.toBe(g.check);
    }
  });
  it("bilgi ve yöntem panellerinde sorgulanan unvanı, üçlü sırayı veya sonucu erken söylemez", () => {
    const guards: [string, RegExp][] = [
      ["f93h-c1", /nişancı/iu],
      ["f93h-c2", /defterdar|kalemiye/iu],
      ["f93h-c4", /Enderun|Birun|Harem/u],
      ["f93h-c5", /kazasker|şeyhülislam/iu],
      ["f93h-c7", /uygulamalı yönetim deneyimi/iu],
      ["f93h-c10", /Divan kurul|Enderun eğitim|sadrazam görevlidir/iu],
      ["f93h-s3", /Devlet–köylü–sipahi/u],
      ["f93h-s5", /lonca/iu],
      ["f93h-s6", /tüketiciyi koruma amacı/iu],
      ["f93h-s7", /vakfiye|mütevelli/iu],
      ["f93h-s10", /toplumsal bir buluşma yerini resmî hanedan/iu],
      ["f93h-s9", /süreklileştiril|kurucudan sonra/iu],
      ["f93h-b1", /diplomatik statü ve karşılıklılık ilişkisindeki değişim/iu],
      ["f93h-b3", /Osmanlı–Safevi|Kasr-ı Şirin/u],
      ["f93h-b6", /kalyonun önemi art/iu],
      ["f93h-b8", /bütün antlaşmalar.*kayıp/iu],
      ["f93h-b9", /bağımsızlık ile.*ilhak|ilhak.*bağımsızlık/iu],
    ];
    for (const [id, forbidden] of guards) {
      const g = rows.find((r) => r.id === id)!.guidance;
      expect(g.knowledge.join(" ") + " " + g.strategy, id).not.toMatch(
        forbidden,
      );
    }
  });
  it("kaynakta ayrı görevler olan unvanları unvan çağrışımı yerine işlevlerinden eşleştirir", () => {
    const facts = {
      tuğra: "Nişancı",
      tahrir: "Nişancı",
      hazine: "Defterdar",
      kadroAtama: "Kazasker",
      fetva: "Şeyhülislam",
      donanma: "Kaptan-ı derya",
      kâtipler: "Reisülküttap",
      hükümdarVekili: "Sadrazam",
    };
    expect(facts.tuğra).toBe(facts.tahrir);
    expect(chosen("f93h-c1")).toBe(facts.tuğra);
    expect(chosen("f93h-c2")).toBe(facts.hazine + "–kalemiye");
    expect(chosen("f93h-c5")).toBe(
      facts.kadroAtama + "–" + facts.fetva.toLocaleLowerCase("tr-TR"),
    );
    expect(chosen("f93h-c4")).toBe("Enderun–Birun–Harem");
    expect(chosen("f93h-c8")).toContain("tahta çıkış sırasını tek başına");
    expect(rows.find((r) => r.id === "f93h-c8")!.guidance.steps[2]).toContain(
      "olumsuz kökün yanıtı",
    );
  });
  it("toplumsal aidiyet ve üç arazi hakkını bağımsız ilişkiler olarak doğrular", () => {
    const people = [
      { religion: "Müslüman", job: "terzi", produces: true, official: false },
      {
        religion: "gayrimüslim",
        job: "terzi",
        produces: true,
        official: false,
      },
    ];
    expect(people[0].religion).not.toBe(people[1].religion);
    expect(new Set(people.map((p) => p.job)).size).toBe(1);
    expect(people.every((p) => p.produces && !p.official)).toBe(true);
    expect(chosen("f93h-s1")).toContain("aynı reaya statüsünde");
    // Roles are source facts, independent of the newly written help strings.
    const rights = {
      ownership: "Devlet",
      use: "köylü",
      serviceRevenue: "sipahi",
    };
    const q = byId("f93h-s3");
    const expected = [rights.ownership, rights.use, rights.serviceRevenue].join(
      "–",
    );
    expect(
      q.options.flatMap((option, i) => (option === expected ? [i] : [])),
    ).toEqual([q.answer]);
    expect(chosen("f93h-s7")).toBe("Vakfiye–mütevelli");
    expect(chosen("f93h-s9")).toContain(
      "hukuki düzen ve gelir kaynağıyla süreklileştirilmesini",
    );
  });
  it("koalisyonun üyeliğini barış taraflığına, tek kazanımı bütün kayıplara dönüştürmez", () => {
    const coalition = new Set(["Avusturya", "Lehistan", "Venedik", "Rusya"]);
    const peace = [
      {
        year: 1699,
        name: "Karlofça",
        counterparties: new Set(["Avusturya", "Lehistan", "Venedik"]),
      },
      { year: 1700, name: "İstanbul", counterparties: new Set(["Rusya"]) },
    ];
    expect(coalition.has("Rusya")).toBe(true);
    expect(peace[0].counterparties.has("Rusya")).toBe(false);
    expect(peace[1].counterparties.has("Rusya")).toBe(true);
    expect(peace[1].year - peace[0].year).toBe(1);
    expect(chosen("f93h-b5")).toBe(
      "Savaşta aynı koalisyonda yer almakla aynı antlaşmayı imzalamak farklıdır.",
    );
    const recovered = new Set(["Azak"]);
    const differentLosses = ["Mora", "Podolya", "Macaristan"];
    expect(differentLosses.every((place) => recovered.has(place))).toBe(false);
    expect(chosen("f93h-b7")).toContain("bütün bölgeler geri alınmıştır");
    const eighteenthCentury = (year: number) => year >= 1701 && year <= 1800;
    expect(eighteenthCentury(1739)).toBe(true);
    const outcomes = [{ year: 1739, favorable: true }];
    expect(outcomes.every((event) => !event.favorable)).toBe(false);
    expect(chosen("f93h-b8")).toBe(
      "XVIII. yüzyıldaki bütün antlaşmalar aynı yönde kayıptır.",
    );
  });
  it("statü, yorum sınırı ve olumsuz kökte seçilen iddianın yönünü korur", () => {
    expect(chosen("f93h-b1")).toContain("Diplomatik statü");
    expect(chosen("f93h-b3")).toBe(
      "Osmanlı–Safevi ilişkilerinde doğu sınırının ana çerçevesi",
    );
    expect(chosen("f93h-b4")).toContain("Otuz Yıl Savaşları’nı bitiren");
    expect(chosen("f93h-b9")).toBe(
      "Bağımsızlık ile başka devlete ilhak farklı statü değişiklikleridir.",
    );
    for (const id of [
      "f93h-c8",
      "f93h-c9",
      "f93h-s8",
      "f93h-s10",
      "f93h-b2",
      "f93h-b7",
    ]) {
      const q = byId(id),
        g = rows.find((r) => r.id === id)!.guidance;
      expect(g.optionReasons[q.answer]).toMatch(
        /yanlış|ulaşılamayan|çıkarılamayan/iu,
      );
    }
    const record = rows.find((r) => r.id === "f93h-b2")!.guidance;
    expect(record.check).toContain(
      "kesinlikle hiç yaşanmadığını değil bu metinden çıkarılamadığını",
    );
    expect(rows.find((r) => r.id === "f93h-b10")!.guidance.steps[2]).toContain(
      "tek nedene veya zorunlu sonuca bağlamaz",
    );
  });
  it("gerçek resolver kimliğin altı alanı değiştiğinde bu yardımı bağlamaz", () => {
    for (const [i, q] of flat.entries()) {
      expect(resolvedGuidance(q)).toEqual(rows[i].guidance);
      const variants: HelpQuestion[] = [
        { ...q, id: q.id + "-yeni" },
        { ...q, prompt: q.prompt + " Yeni bilgi." },
        { ...q, passage: "Yeni ve bağımsız pasaj." },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % 5 },
        { ...q, explanation: q.explanation + " Başka yargı." },
      ];
      for (const variant of variants) {
        expect(questionIdentity(variant)).not.toBe(rows[i].identity);
        expect(resolvedGuidance(variant)).toBeUndefined();
        const html = text(
          renderToStaticMarkup(
            createElement(QuestionHelp, {
              question: variant,
              level: 6,
              onLevel: () => {},
            }),
          ),
        );
        for (const reason of rows[i].guidance.optionReasons)
          expect(html).not.toContain(reason);
      }
      expect(questionIdentity({ ...q, hint: "Kişisel farklı ipucu." })).toBe(
        questionIdentity(q),
      );
      expect(
        questionIdentity(
          clarifiedQuestionView({ ...q, hint: "Kişisel farklı ipucu." }),
        ),
      ).toBe(rows[i].identity);
    }
  });
  it("gerçek QuestionHelp bilgi, yöntem, üç adım ve tam beş neden için ayrı kapılar uygular", () => {
    const warnings = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      for (const [i, q] of flat.entries()) {
        const g = rows[i].guidance,
          panels = helpPanels(q);
        expect(panels).toHaveLength(5);
        expect(panels[0].paragraphs).toContain(q.hint);
        expect(panels[1].paragraphs).toEqual([g.strategy]);
        for (let level = 0; level <= 6; level++) {
          const raw = renderToStaticMarkup(
            createElement(QuestionHelp, {
              question: q,
              level,
              onLevel: () => {},
            }),
          );
          const html = text(raw);
          if (level === 0) expect(html).not.toContain("Çözüm rehberi");
          if (level >= 1) expect(html).toContain(g.knowledge[0]);
          if (level < 2) expect(html).not.toContain(g.strategy);
          else expect(html).toContain(g.strategy);
          for (const [step, paragraph] of g.steps.entries()) {
            if (level >= step + 3) expect(html).toContain(paragraph);
            else expect(html).not.toContain(paragraph);
          }
          if (level < 6) {
            expect(html).not.toContain("Doğru yanıt:");
            for (const reason of g.optionReasons)
              expect(html).not.toContain(reason);
          } else {
            expect(html).toContain(
              "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
            );
            expect(html).toContain(q.explanation);
            expect(
              (
                raw
                  .match(/<ol type="A">([\s\S]*?)<\/ol>/)?.[1]
                  .match(/<li>/g) ?? []
              ).length,
            ).toBe(5);
            for (const reason of g.optionReasons)
              expect(html).toContain(reason);
            expect(html).toContain(g.commonError);
            expect(html).toContain(g.check);
          }
        }
      }
      expect(warnings).not.toHaveBeenCalled();
    } finally {
      warnings.mockRestore();
    }
  });
  it("180 gerçek yardım eylemi artan kademeyi ister; tam çözüm ve disabled sınırları korunur", () => {
    for (const q of flat) {
      for (let level = 0; level < 6; level++) {
        const onLevel = vi.fn();
        const action = button(QuestionHelp({ question: q, level, onLevel }));
        expect(action).toBeDefined();
        action!.onClick();
        expect(onLevel).toHaveBeenCalledExactlyOnceWith(level + 1);
      }
      expect(
        button(QuestionHelp({ question: q, level: 6, onLevel: () => {} })),
      ).toBeUndefined();
      const disabled = QuestionHelp({
        question: q,
        level: 2,
        disabled: true,
        onLevel: () => {},
      });
      expect(button(disabled)?.disabled).toBe(true);
      expect(renderToStaticMarkup(disabled)).toMatch(/<button[^>]*disabled=""/);
    }
  });
  it("yanlış sayıda neden taşıyan inline rehberi tam yeni yardım diye göstermez", () => {
    for (const [i, q] of flat.entries()) {
      const changed = {
        ...q,
        guidance: {
          ...rows[i].guidance,
          optionReasons: rows[i].guidance.optionReasons.slice(1),
        },
      };
      expect(resolvedGuidance(changed)).toBeUndefined();
      expect(helpPanels(changed)).toEqual([
        { title: "İlk ipucu", paragraphs: [q.hint] },
      ]);
      const html = text(
        renderToStaticMarkup(
          createElement(QuestionHelp, {
            question: changed,
            level: 6,
            onLevel: () => {},
          }),
        ),
      );
      for (const reason of rows[i].guidance.optionReasons)
        expect(html).not.toContain(reason);
    }
  });
});
