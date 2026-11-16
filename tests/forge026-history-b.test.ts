import { createHash } from "node:crypto";
import {
  Children,
  createElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  authorityNetwork026B,
  steppeSource026B,
  islamTimeline026B,
  conversionEvidence026B,
  seljukServices026B,
  historyBIds026,
  historyBDefaults026,
  normalizeHistoryB026,
  historyBActive026,
  forge026HistoryBGuides,
  forge026HistoryBLessons,
  forge026HistoryBTopics,
} from "../src/learning/forge026HistoryB";
import { historyNarratives } from "../src/learning/narratives/history";
import { islamNarratives } from "../src/learning/narratives/historyIslam";
import { seljukNarrative } from "../src/learning/narratives/seljuk";
import { narrativeLesson } from "../src/learning/narratives/types";
import { foundation013QuestionsByLesson } from "../src/learning/forge013FoundationQuestions";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
const fixture = vi.hoisted(() => ({
  explorations: {} as Record<string, Record<string, unknown>>,
  writes: 0,
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: fixture.explorations },
    update: async (
      fn: (s: { explorations: typeof fixture.explorations }) => {
        explorations: typeof fixture.explorations;
      },
    ) => {
      fixture.explorations = fn({
        explorations: fixture.explorations,
      }).explorations;
      fixture.writes++;
    },
  }),
}));
import Lab from "../src/learning/Forge026HistoryBLab";

const stable = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(stable)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.entries(x)
            .sort(([a], [b]) => a.localeCompare(b, "en"))
            .map(([k, v]) => [k, stable(v)]),
        )
      : x;
const packs = historyBIds026.map((id) =>
  [...historyNarratives, ...islamNarratives, seljukNarrative].find(
    (p) => p.id === id,
  )!,
);
const legacy = packs.map((p) => ({
  ...narrativeLesson(p),
  questions: foundation013QuestionsByLesson[p.id],
}));

describe("026 Tarih B: eski dersler ve ayrı ileri içerik", () => {
  it("beş eski dersin bütün body/soru/metadata içeriğini korur ve ilk kavram sırasını sürdürür", () => {
    expect(
      createHash("sha256")
        .update(JSON.stringify(stable(legacy)))
        .digest("hex"),
    ).toBe("5e96085008a702b44732edb342b6a56858fd95237fd273247efe15c6644485c2");
    expect(legacy.map((l) => l.questions.length)).toEqual([10, 10, 10, 10, 10]);
    expect(legacy.map((l) => l.minutes)).toEqual([30, 35, 40, 30, 45]);
    for (const [i, p] of packs.entries()) {
      expect(forge026HistoryBGuides[i].id).toBe(p.id);
      expect(
        forge026HistoryBGuides[i].sections
          .slice(0, p.body.length)
          .map((s) => s.title),
      ).toEqual(p.body.map((s) => s.title));
    }
    expect(forge026HistoryBLessons.map((l) => l.id)).toEqual(
      historyBIds026.map((id) => id + "-ileri"),
    );
    expect(Object.values(forge026HistoryBTopics)).toEqual([
      "detail-228",
      "detail-229",
      "detail-230",
      "detail-231",
      "detail-232",
    ]);
    expect(
      forge026HistoryBLessons.every(
        (l) => l.body.length === 0 && l.subjectId === "tyt-tarih",
      ),
    ).toBe(true);
  });
  it("102 bölüm,30 ayrı çözümlü örnek ve30 hatırlama ile100 özgün kartın tam yardımını sunar", () => {
    expect(forge026HistoryBGuides.map((g) => g.sections.length)).toEqual([
      22, 20, 20, 20, 20,
    ]);
    const qs = forge026HistoryBLessons.flatMap((l) => l.questions),
      oldIds = new Set(legacy.flatMap((l) => l.questions.map((q) => q.id))),
      bankPrompts = [...legacy, ...forge026HistoryBLessons].flatMap((l) =>
        l.questions.map((q) => q.prompt.tr),
      );
    expect(qs).toHaveLength(100);
    expect(new Set(qs.map((q) => q.id)).size).toBe(100);
    for (const g of forge026HistoryBGuides) {
      expect(g.examples).toHaveLength(6);
      expect(g.recall).toHaveLength(6);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 100)).toBe(true);
      }
      for (const e of g.examples) {
        expect(bankPrompts).not.toContain(e.prompt);
        expect(e.steps).toHaveLength(3);
        expect(e.strategy.length).toBeGreaterThan(20);
        expect(e.answer.length).toBeGreaterThan(20);
        expect(e.pitfall.length).toBeGreaterThan(20);
      }
    }
    for (const q of qs) {
      expect(oldIds.has(q.id)).toBe(false);
      expect(questionContentIssues(q), q.id).toEqual([]);
      expect(questionGuidanceSchema.safeParse(q.guidance).success, q.id).toBe(
        true,
      );
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.guidance!.steps).toHaveLength(3);
      expect(new Set(q.guidance!.steps).size).toBe(3);
      expect(q.guidance!.strategy.length).toBeGreaterThan(50);
      expect(q.guidance!.steps).not.toContain(q.guidance!.strategy);
      expect(q.guidance!.knowledge).not.toContain(q.guidance!.strategy);
      expect(q.guidance!.strategy).not.toBe(q.hint.tr);
      const foldedSteps = q.guidance!.steps.map((s) =>
        s.replace(/\s+/g, " ").trim(),
      );
      for (const item of [...q.guidance!.knowledge, q.guidance!.strategy])
        expect(foldedSteps).not.toContain(item.replace(/\s+/g, " ").trim());
      expect(q.guidance!.optionReasons).toHaveLength(5);
      for (const [i, r] of q.guidance!.optionReasons.entries()) {
        expect(r.length).toBeGreaterThan(25);
        expect(r.startsWith("Doğru."), q.id + "/" + i).toBe(i === q.answer);
      }
    }
    expect(qs.reduce((n, q) => n + q.guidance!.steps.length, 0)).toBe(300);
    expect(new Set(qs.map((q) => q.guidance!.strategy)).size).toBe(100);
    expect(qs.reduce((n, q) => n + q.guidance!.optionReasons.length, 0)).toBe(
      500,
    );
  });
  it("şık ve neden bağını koruyan dengeli, periyotsuz anahtar dizisi kullanır", () => {
    for (const l of forge026HistoryBLessons) {
      expect(l.questions).toHaveLength(20);
      expect(
        [0, 1, 2, 3, 4].map(
          (p) => l.questions.filter((q) => q.answer === p).length,
        ),
      ).toEqual([4, 4, 4, 4, 4]);
      const sequence = l.questions.map((q) => q.answer);
      for (let period = 1; period <= 5; period++)
        expect(sequence.slice(period).every((v, i) => v === sequence[i])).toBe(
          false,
        );
    }
    const all = forge026HistoryBLessons.flatMap((l) =>
      l.questions.map((q) => q.answer),
    );
    for (let period = 1; period <= 20; period++)
      expect(all.slice(period).every((v, i) => v === all[i])).toBe(false);
    const lookup = (lesson: number, question: number) => {
      const q = forge026HistoryBLessons[lesson].questions[question - 1];
      return q.options[q.answer].tr;
    };
    expect(lookup(0, 1)).toBe("A’ya göre vassal, C’ye göre senyör.");
    expect(lookup(3, 8)).toContain("209");
    expect(lookup(3, 14)).toContain("üst idari görev");
    expect(lookup(4, 19)).toContain("mekanik");
  });
});

describe("026 Tarih B: gerçek hook, native JSX ve ham kayıt sınırı", () => {
  type Props = {
    children?: ReactNode;
    label?: string;
    disabled?: boolean;
    change?: (value: string | boolean | number) => void;
    onClick?: () => void;
    onChange?: (event: { target: { value: string } }) => void;
  };
  let captured: ReactNode;
  const key = (id: string) => "forge026-history-b:" + id;
  function Capture({ id }: { id: string }) {
    const shell = Lab({ lessonId: id });
    if (!shell) {
      captured = null;
      return null;
    }
    // Invoke the real explorer while the React server dispatcher is active.
    // Its production useExploration reads the mocked provider's RAW record.
    const explorerProps = shell.props;
    const render = shell.type as (props: typeof explorerProps) => ReactNode;
    captured = render(explorerProps);
    return captured;
  }
  const markup = (id: string) =>
    renderToStaticMarkup(createElement(Capture, { id }));
  const render = (id: string, raw: Record<string, unknown>) => {
    fixture.explorations = { [key(id)]: raw };
    return markup(id);
  };
  const nodes = (tree: ReactNode): ReactElement<Props>[] => {
    const all: ReactElement<Props>[] = [];
    Children.forEach(tree, (c) => {
      if (isValidElement<Props>(c)) all.push(c, ...nodes(c.props.children));
    });
    return all;
  };
  const reason = (value: string) =>
    nodes(captured).find((n) => n.type === "textarea")!.props.onChange!({
      target: { value },
    });
  const button = () => nodes(captured).find((n) => n.type === "button")!;
  const families = [
    [historyBIds026[0], {}, "yerel", ["tax", "command", "revocable"], "bundle"],
    [historyBIds026[1], {}, "destek", ["bundle", "mask", "claim"], "tax"],
    [historyBIds026[2], {}, "2", ["from", "to", "showIberia"], "mask"],
    [historyBIds026[3], {}, "destek", ["scopeClaim", "royal"], "official"],
    [
      historyBIds026[4],
      {},
      "destek",
      ["serviceMask", "serviceClaim", "funded"],
      "royal",
    ],
  ] as const;
  it("beş SVG ve HTML sonucu aynı literal model durumunu gösterir; salt render kayıt yazmaz", () => {
    const before = fixture.writes,
      errors = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      let h = render(historyBIds026[0], {
        tax: "central",
        command: "local",
        revocable: true,
      });
      expect(h).toContain('data-authority-result="karma"');
      expect(h).toContain('data-authority-edge="denetim"');
      expect(h).toContain('data-to="merkez"');
      expect(h).toContain("Yetkiler farklı ellerde");
      h = render(historyBIds026[1], { bundle: "uretim", mask: 3, claim: 0 });
      expect(h).toContain('data-source-count="2"');
      expect(h).toContain('data-supported="true"');
      expect(h).toContain('data-source="2" data-selected="false"');
      h = render(historyBIds026[2], { from: 750, to: 1031, showIberia: true });
      expect(h).toContain('data-history-count="4"');
      expect(h.match(/data-history-event=/g)).toHaveLength(4);
      expect(h.match(/data-history-period=/g)).toHaveLength(3);
      expect(h).toContain('data-period-endpoint="750"');
      h = render(historyBIds026[3], {
        royal: true,
        official: true,
        community: true,
        scopeClaim: "herkes",
      });
      expect(h).toContain('data-conversion-supported="false"');
      expect(h).toContain('data-conversion-count="3"');
      h = render(historyBIds026[4], {
        serviceMask: 4,
        serviceClaim: "saglik",
        funded: true,
      });
      expect(h).toContain('data-service-count="1"');
      expect(h).toContain('data-income-link-count="1"');
      expect(h).toContain('data-income-link="saglik"');
      expect(fixture.writes).toBe(before);
      expect(errors).not.toHaveBeenCalled();
      expect(render("unrelated", {})).toBe("");
    } finally {
      errors.mockRestore();
      fixture.explorations = {};
    }
  });
  it("gerçek hook’un defaults’a çevirdiği etkin yanlış tür eski feedback’i açmaz; ilk gerekçe tam kaydı onarır", () => {
    for (const [id, seed, guess, fields, inactive] of families) {
      for (const field of fields) {
        const original = historyBDefaults026[field],
          bad = typeof original === "string" ? 1 : "1";
        const h = render(id, {
          ...seed,
          [field]: bad,
          guess,
          reason: "eski",
          checked: true,
        });
        expect(h, id + "/" + field).not.toContain('role="status"');
        expect(button().props.disabled).toBe(true);
        reason("x");
        const saved = fixture.explorations[key(id)];
        expect(saved[field]).toBe(original);
        expect(saved.checked).toBe(false);
        markup(id);
        expect(button().props.disabled).toBe(false);
        button().props.onClick!();
        expect(markup(id)).toContain('role="status"');
        expect(fixture.explorations[key(id)].reason).toBe("x");
      }
      expect(
        render(id, { [inactive]: [], guess, reason: "x", checked: true }),
      ).toContain('role="status"');
    }
    fixture.explorations = {};
  });
  it("aynı tür bozuk enum/aralıklar güvenli çizilir; görünür kanonik kayıt ilk yeni eylemde saklanır", () => {
    const rows = [
      [historyBIds026[0], "tax", "constructor", "local", "yerel"],
      [historyBIds026[1], "bundle", "gone", "yonetim", "destek"],
      [historyBIds026[1], "mask", 99, 7, "destek"],
      [historyBIds026[1], "claim", -1, 0, "destek"],
      [historyBIds026[2], "from", 1600, 1300, "0"],
      [historyBIds026[2], "to", 600, 750, "1"],
      [historyBIds026[3], "scopeClaim", "constructor", "yonetici", "destek"],
      [historyBIds026[4], "serviceMask", -1, 0, "yetersiz"],
      [historyBIds026[4], "serviceClaim", "gone", "egitim", "destek"],
    ] as const;
    for (const [id, field, bad, canonical, guess] of rows) {
      const h = render(id, { [field]: bad, guess, reason: "x", checked: true });
      expect(h).not.toMatch(/NaN|Infinity/);
      expect(h).not.toContain('role="status"');
      expect(button().props.disabled).toBe(true);
      reason("x");
      expect(fixture.explorations[key(id)][field]).toBe(canonical);
      markup(id);
      expect(button().props.disabled).toBe(false);
      button().props.onClick!();
      expect(markup(id)).toContain('role="status"');
    }
    fixture.explorations = {};
  });
  it("ilgisiz koşullu alanlar kıyası kapatmaz; boşu reddeder, tek karakteri kabul eder,120 sınırını yazar", () => {
    for (const [id, guess, seed] of [
      [
        historyBIds026[0],
        "dogrudan",
        { tax: "central", command: "central", revocable: "false" },
      ],
      [
        historyBIds026[3],
        "destek",
        {
          scopeClaim: "kurum",
          official: true,
          royal: "false",
          community: "false",
        },
      ],
      [
        historyBIds026[4],
        "yetersiz",
        { serviceClaim: "tum-nufus", funded: "false" },
      ],
    ] as const)
      expect(
        render(id, { ...seed, guess, reason: "x", checked: true }),
      ).toContain('role="status"');
    for (const [id, seed, guess] of families) {
      for (const empty of ["", "   "]) {
        expect(
          render(id, { ...seed, guess, reason: empty, checked: true }),
        ).not.toContain('role="status"');
        expect(button().props.disabled).toBe(true);
      }
      expect(
        render(id, { ...seed, guess, reason: "x", checked: true }),
      ).toContain('role="status"');
      reason("x".repeat(250));
      expect(fixture.explorations[key(id)].reason).toBe("x".repeat(120));
      expect(fixture.explorations[key(id)].checked).toBe(false);
      markup(id);
      const scientific = nodes(captured).find(
        (n) => n.props.change && n.props.label !== "Sonuç tahminin",
      )!;
      scientific.props.change!(
        id === historyBIds026[0]
          ? "central"
          : id === historyBIds026[1]
            ? "uretim"
            : id === historyBIds026[2]
              ? 700
              : id === historyBIds026[3]
                ? "herkes"
                : "saglik",
      );
      expect(fixture.explorations[key(id)]).toMatchObject({
        guess: "",
        reason: "",
        checked: false,
      });
    }
    fixture.explorations = {};
  });
  it("208 bilimsel sınır durumunda sonlu, başlıklı SVG ve eşdeğer HTML üretir; inceleme kayıt yazmaz", () => {
    const states: [string, Record<string, unknown>][] = [];
    for (const tax of ["central", "local"])
      for (const command of ["central", "local"])
        for (const revocable of [false, true])
          states.push([historyBIds026[0], { tax, command, revocable }]);
    for (const bundle of ["yonetim", "uretim", "inanc"])
      for (let mask = 0; mask < 8; mask++)
        for (let claim = 0; claim < 4; claim++)
          states.push([historyBIds026[1], { bundle, mask, claim }]);
    for (const [from, to] of [
      [600, 600],
      [600, 1300],
      [750, 750],
      [1300, 1300],
    ])
      for (const showIberia of [false, true])
        states.push([historyBIds026[2], { from, to, showIberia }]);
    for (let mask = 0; mask < 8; mask++)
      for (const scopeClaim of ["yonetici", "kurum", "yerel", "herkes"])
        states.push([
          historyBIds026[3],
          {
            royal: !!(mask & 1),
            official: !!(mask & 2),
            community: !!(mask & 4),
            scopeClaim,
          },
        ]);
    for (let serviceMask = 0; serviceMask < 8; serviceMask++)
      for (const serviceClaim of ["ticaret", "egitim", "saglik", "tum-nufus"])
        for (const funded of [false, true])
          states.push([
            historyBIds026[4],
            { serviceMask, serviceClaim, funded },
          ]);
    const before = fixture.writes,
      errors = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      for (const [id, s] of states) {
        const h = render(id, s);
        expect(h).toContain("<svg");
        expect(h).toContain("data-model-result");
        expect(h).toContain("<title");
        expect(h).not.toMatch(/NaN|Infinity|>undefined</);
        const ids = [...h.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
        expect(new Set(ids).size).toBe(ids.length);
      }
      expect(errors).not.toHaveBeenCalled();
      expect(fixture.writes).toBe(before);
    } finally {
      errors.mockRestore();
      fixture.explorations = {};
    }
    expect(states).toHaveLength(208);
  });
});

describe("026 Tarih B: beş bağımsız kanıt modeli", () => {
  it("yetkiyi üç ayrı bağla sınıflar; merkezde iki yetkide görevden alma etkisizdir", () => {
    const rows = [
      ["central", false, "central", "dogrudan", 2],
      ["central", true, "central", "dogrudan", 2],
      ["central", false, "local", "karma", 3],
      ["central", true, "local", "karma", 3],
      ["local", false, "central", "karma", 3],
      ["local", true, "central", "karma", 3],
      ["local", false, "local", "yerel", 3],
      ["local", true, "local", "yetki-devri", 3],
    ] as const;
    for (const [tax, revocable, command, code, count] of rows) {
      const r = authorityNetwork026B(tax, revocable, command);
      expect(r.code).toBe(code);
      expect(r.edges).toHaveLength(count);
      expect(r.edges[0]).toMatchObject({
        from: "toplum",
        to: tax === "central" ? "merkez" : "yerel",
        kind: "vergi",
      });
      expect(r.edges[1]).toMatchObject({
        from: command === "central" ? "merkez" : "yerel",
        to: "toplum",
        kind: "emir",
      });
      if (count === 3)
        expect(r.edges[2].kind).toBe(revocable ? "denetim" : "sinir");
    }
  });
  it("üç kaynak paketinin96 kombinasyonunu bağımsız yeterli-paket tablosuyla karşılaştırır", () => {
    const allowed = {
      yonetim: [[5, 7], [2, 3, 6, 7], [1, 3, 5, 7], []],
      uretim: [[3, 7], [4, 5, 6, 7], [3, 5, 6, 7], []],
      inanc: [[3, 7], [2, 3, 6, 7], [4, 5, 6, 7], []],
    };
    for (const bundle of ["yonetim", "uretim", "inanc"] as const)
      for (let mask = 0; mask < 8; mask++)
        for (let claim = 0; claim < 4; claim++) {
          const r = steppeSource026B(bundle, mask, claim),
            expected = allowed[bundle][claim].includes(mask);
          expect(r.supported).toBe(expected);
          expect(r.expected).toBe(expected ? "destek" : "yetersiz");
          expect(r.selectedCount).toBe(
            mask.toString(2).replaceAll("0", "").length,
          );
          expect(r.records.map((x) => x.selected)).toEqual(
            [1, 2, 4].map((bit) => (mask & bit) !== 0),
          );
        }
    expect(steppeSource026B("uretim", 7, 3).supported).toBe(false);
    expect(steppeSource026B("uretim", 3, 2).supported).toBe(true);
  });
  it("zaman penceresini kaynaklı literal yıllar, kapalı sınırlar ve paralel siyasi dönemlerle denetler", () => {
    const years = [
        610, 622, 624, 625, 627, 628, 630, 632, 634, 644, 656, 661, 680, 711,
        750, 756, 929, 1031, 1258,
      ],
      iberia = [711, 756, 929, 1031],
      periods = [
        ["dort-halife", 632, 661],
        ["sam-emevi", 661, 750],
        ["abbasi", 750, 1258],
        ["endulus", 756, 1031],
      ] as const;
    const boundaries = [
      ...new Set([600, 1300, ...years.flatMap((y) => [y - 1, y, y + 1])]),
    ].sort((a, b) => a - b);
    for (const from of boundaries)
      for (const to of boundaries.filter((y) => y >= from))
        for (const show of [false, true]) {
          const r = islamTimeline026B(from, to, show),
            expected = years.filter(
              (y) => y >= from && y <= to && (show || !iberia.includes(y)),
            );
          expect(r.events.map((e) => e.year)).toEqual(expected);
          expect(r.eventCount).toBe(expected.length);
          expect(r.yearDifference).toBe(to - from);
          const rows = periods.filter(
            ([id, lo, hi]) =>
              hi >= from && lo <= to && (show || id !== "endulus"),
          );
          expect(r.periods.map((p) => p.id)).toEqual(rows.map(([id]) => id));
          r.periods.forEach((p, i) => {
            expect(p.clippedFrom).toBe(Math.max(from, rows[i][1]));
            expect(p.clippedTo).toBe(Math.min(to, rows[i][2]));
          });
        }
    expect(islamTimeline026B(750, 750, true).periods.map((p) => p.id)).toEqual([
      "sam-emevi",
      "abbasi",
    ]);
    expect(
      islamTimeline026B(750, 1031, true).events.map((e) => e.year),
    ).toEqual([750, 756, 929, 1031]);
    expect(islamTimeline026B(750, 800, false).eventCount).toBe(1);
  });
  it("hükümdar, resmî karar ve yerel uygulama kayıtlarını32 ayrı kapsamda karıştırmaz", () => {
    for (let mask = 0; mask < 8; mask++)
      for (const [i, query] of [
        "yonetici",
        "kurum",
        "yerel",
        "herkes",
      ].entries()) {
        const selected = [0, 1, 2].map((bit) => !!(mask & (1 << bit))),
          r = conversionEvidence026B(
            selected[0],
            selected[1],
            selected[2],
            query as "yonetici" | "kurum" | "yerel" | "herkes",
          ),
          expected = i < 3 && selected[i];
        expect(r.supported).toBe(expected);
        expect(r.expected).toBe(expected ? "destek" : "yetersiz");
        expect(r.selectedCount).toBe(selected.filter(Boolean).length);
        expect(r.records.map((x) => x.selected)).toEqual(selected);
      }
    expect(conversionEvidence026B(true, true, true, "herkes").supported).toBe(
      false,
    );
    expect(conversionEvidence026B(true, false, false, "kurum").supported).toBe(
      false,
    );
  });
  it("kurumun hizmeti ve gelir bağını64 durumda ayrı tutar; gelir belgesi yokluğu hizmet yokluğu değildir", () => {
    for (let mask = 0; mask < 8; mask++)
      for (const funded of [false, true])
        for (const [i, claim] of [
          "ticaret",
          "egitim",
          "saglik",
          "tum-nufus",
        ].entries()) {
          const r = seljukServices026B(
              mask,
              claim as "ticaret" | "egitim" | "saglik" | "tum-nufus",
              funded,
            ),
            count = mask.toString(2).replaceAll("0", "").length;
          expect(r.supported).toBe(i < 3 && funded && (mask & (1 << i)) !== 0);
          expect(r.selectedCount).toBe(count);
          expect(r.incomeLinkCount).toBe(funded ? count : 0);
          expect(r.services.map((s) => s.selected)).toEqual(
            [1, 2, 4].map((bit) => (mask & bit) !== 0),
          );
        }
    expect(seljukServices026B(4, "saglik", false).explanation).toContain(
      "hizmetin hiç gerçekleşmediği demek değildir",
    );
  });
  it("model çıktısı başka çağrının kaynak satırlarını değiştiremez", () => {
    const s = steppeSource026B("yonetim", 5, 0);
    s.records[0].title = "bozuk";
    expect(steppeSource026B("yonetim", 5, 0).records[0].title).toBe(
      "Yönetici anlatısı",
    );
    const t = islamTimeline026B(750, 800, true);
    (t.events[0] as { label: string }).label = "bozuk";
    expect(islamTimeline026B(750, 800, true).events[0].label).toBe(
      "Abbasi iktidarının başlangıcı",
    );
    const c = conversionEvidence026B(true, false, false, "yonetici");
    c.records[0].title = "bozuk";
    expect(
      conversionEvidence026B(true, false, false, "yonetici").records[0].title,
    ).toBe("Hükümdar kaydı");
  });
  it("kamu API’leri sessiz tür dönüşümü, NaN, taşan aralık ve bilinmeyen seçenek kabul etmez", () => {
    const invalid: (() => unknown)[] = [
      () => authorityNetwork026B("constructor" as never, false, "local"),
      () => authorityNetwork026B("local", "false" as never, "local"),
      () => authorityNetwork026B("central", true, null as never),
      () => steppeSource026B("constructor" as never, 1, 0),
      () => steppeSource026B("inanc", "3" as never, 0),
      () => steppeSource026B("uretim", 1.5, 0),
      () => steppeSource026B("uretim", 8, 0),
      () => steppeSource026B("inanc", 1, 4),
      () => islamTimeline026B(599, 700, true),
      () => islamTimeline026B(750, 749, true),
      () => islamTimeline026B(750, 1301, true),
      () => islamTimeline026B(NaN, 800, true),
      () => islamTimeline026B(750, 800, 1 as never),
      () => conversionEvidence026B(true, "false" as never, false, "yonetici"),
      () => conversionEvidence026B(true, false, false, "constructor" as never),
      () => seljukServices026B(-1, "saglik", true),
      () => seljukServices026B(Infinity, "ticaret", true),
      () => seljukServices026B(1, "constructor" as never, true),
      () => seljukServices026B(1, "ticaret", null as never),
    ];
    for (const call of invalid) expect(call).toThrow(RangeError);
  });
  it("normalizer bağımlı yıl sınırını fallback’te de korur ve kanonik durumda idempotenttir", () => {
    for (const raw of [null, [], undefined, true, "x"])
      expect(normalizeHistoryB026(raw)).toEqual(historyBDefaults026);
    for (const raw of [undefined, "800", NaN, true, -1]) {
      const s = normalizeHistoryB026({ from: 1200, to: raw });
      expect(s.from).toBe(1200);
      expect(s.to).toBe(1200);
      expect(() => islamTimeline026B(s.from, s.to, s.showIberia)).not.toThrow();
      expect(normalizeHistoryB026(s)).toEqual(s);
    }
    expect(
      normalizeHistoryB026({
        from: 9999,
        to: 0,
        mask: 8,
        claim: -3,
        serviceMask: 2.7,
        tax: "constructor",
        reason: "x".repeat(150),
        checked: "true",
      }),
    ).toMatchObject({
      from: 1300,
      to: 1300,
      mask: 7,
      claim: 0,
      serviceMask: 3,
      tax: "local",
      checked: false,
      reason: "x".repeat(120),
    });
    expect(normalizeHistoryB026(historyBDefaults026)).toEqual(
      historyBDefaults026,
    );
  });
  it("yalnız etkin çıkarımın kullandığı ham alanlar restore kapısına katılır", () => {
    const s = historyBDefaults026;
    expect(
      historyBActive026(historyBIds026[0], {
        ...s,
        tax: "central",
        command: "central",
      }),
    ).toEqual(["tax", "command"]);
    expect(historyBActive026(historyBIds026[0], s)).toContain("revocable");
    expect(historyBActive026(historyBIds026[3], s)).toEqual([
      "scopeClaim",
      "royal",
    ]);
    expect(
      historyBActive026(historyBIds026[3], { ...s, scopeClaim: "kurum" }),
    ).toEqual(["scopeClaim", "official"]);
    expect(
      historyBActive026(historyBIds026[3], { ...s, scopeClaim: "herkes" }),
    ).toEqual(["scopeClaim", "royal", "official", "community"]);
    expect(
      historyBActive026(historyBIds026[4], { ...s, serviceClaim: "tum-nufus" }),
    ).toEqual(["serviceMask", "serviceClaim"]);
    for (const id of historyBIds026)
      expect(historyBActive026(id + "-ileri", s)).toEqual(
        historyBActive026(id, s),
      );
    expect(historyBActive026("unrelated", s)).toEqual([]);
  });
});
