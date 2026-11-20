import { describe, expect, it } from "vitest";
import { writeFileSync } from "node:fs";
import { lessons } from "../src/domain/content";
import details from "../src/data/detail-topics.json";
import curriculum from "../src/data/curriculum.json";
import { subjects } from "../src/domain/content";
import order from "../src/data/study-order.json";
import { lessonTopic, studyTopics } from "../src/domain/studyPlan";
import { localizedQuestionView, clarifiedQuestionView } from "../src/domain/questionPresentation";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import type { HelpQuestion } from "../src/domain/questionHelpModel";
// Ceilings live with the lint script so `npm run check` and this test share them.
import { CONTENT_CEILINGS } from "../scripts/lint-content.mjs";

/*
 * Content quality audit (Forge052). Four checks, each counted:
 *  1. missingReasons   – a card without a reason for every option.
 *  2. dependentText    – a card that cannot be answered from its own card.
 *  3. orphanTopics     – a topic in one of curriculum / study order but not the other.
 *  4. missingHint / missingSteps – a card without a hint, or without a
 *     step-by-step solution (helpPanels ≥ 3).
 * Known gaps are ratchets (may only fall); every other kind is zero-tolerance.
 * `CONTENT_AUDIT_OUT=<file>` writes the counts and the card ids found, which
 * scripts/lint-content.mjs reads. Content text is never changed here.
 */
const text = (v: unknown) => (typeof v === "string" ? v : ((v as { tr?: string } | undefined)?.tr ?? ""));

type Card = HelpQuestion & { lessonId: string; hasFigure: boolean };
const cards: Card[] = lessons.flatMap((lesson) =>
  lesson.questions.map((raw) => {
    const q = localizedQuestionView(raw) as unknown as Record<string, unknown> & { id: string; answer: number; options: unknown[] };
    const card: HelpQuestion = {
      id: q.id,
      prompt: text(q.prompt),
      passage: q.passage ? text(q.passage) : undefined,
      options: q.options.map(text),
      answer: q.answer,
      explanation: text(q.explanation),
      hint: text(q.hint) || undefined,
      guidance: q.guidance as HelpQuestion["guidance"],
    };
    const view = clarifiedQuestionView(card);
    const presentation = sourceQuestionPresentation(view);
    return { ...view, lessonId: lesson.id, hasFigure: Boolean((raw as { figure?: unknown }).figure || presentation?.figure) };
  }),
);

// Wording that points outside the card.
const CROSS_CARD = /(?<!\p{L})(bir )?önceki (soru|sayfa|bölüm|kart)|sonraki soru|yukarıdaki (soru|sayfa)|önceki (örnek|etkinlik)/iu;
// "Aşağıdaki cümlelerden hangisi" points at the options, which the card carries.
const NEEDS_TEXT = /(?<!\p{L})(yukarıdaki|aşağıdaki) (parça|metin|paragraf|şiir|dize)(?![cç]ık)|(?<!\p{L})(metne|parçaya|paragrafa|şiire) göre|bu (metinde|parçada|paragrafta)|(?<!\p{L})(metinde|parçada|paragrafta) (geçen|altı çizili|numaralanmış)/iu;
const NEEDS_FIGURE = /(?<!\p{L})(şekildeki|şekilde verilen|şekle göre|grafikteki|grafiğe göre|grafikte verilen|tablodaki|tabloya göre|tabloda verilen|haritadaki|haritada verilen|görseldeki|yukarıdaki (şekil|grafik|tablo|harita|görsel))/iu;

function dependentKind(c: Card): string | undefined {
  const own = `${c.prompt}`;
  if (CROSS_CARD.test(own)) return "başka karta bağlı";
  // A long stem may carry its own text (quoted sentences, numbered lines).
  if (NEEDS_TEXT.test(own) && !c.passage && own.length < 160) return "metni taşımıyor";
  // A stem that describes its own table ("Bir tabloda … verilmiş") or names
  // the periodic table carries what it needs.
  const described = /\bbir (\p{L}+ )?(tablo|şekil|grafik|harita)|periyodik tablo/iu.test(own) || /[|│]|\n/.test(own);
  if (NEEDS_FIGURE.test(own) && !c.hasFigure && !described) return "şekli/tabloyu taşımıyor";
  return undefined;
}

function audit() {
  const findings: { id: string; lessonId: string; kind: string; detail?: string }[] = [];
  let missingReasons = 0;
  let emptyReasons = 0;
  let dependent = 0;
  let missingHint = 0;
  let missingSteps = 0;
  for (const c of cards) {
    const guidance = resolvedGuidance(c);
    if (!guidance) {
      missingReasons++;
      findings.push({ id: c.id, lessonId: c.lessonId, kind: "çeldirici açıklaması eksik" });
    } else if (guidance.optionReasons.some((r) => !r.trim())) {
      emptyReasons++;
      findings.push({ id: c.id, lessonId: c.lessonId, kind: "boş şık gerekçesi" });
    }
    const dep = dependentKind(c);
    if (dep) {
      dependent++;
      findings.push({ id: c.id, lessonId: c.lessonId, kind: "bağımlı soru metni", detail: `${dep}: ${c.prompt.slice(0, 90)}` });
    }
    const panels = helpPanels(c);
    if (panels.length === 0) {
      missingHint++;
      findings.push({ id: c.id, lessonId: c.lessonId, kind: "ipucu yok" });
    }
    if (panels.length < 3) {
      missingSteps++;
      findings.push({ id: c.id, lessonId: c.lessonId, kind: "adım adım çözüm yok" });
    }
  }
  // Orphans between the curriculum (detail topics) and the study order.
  const detailIds = new Set(details.map((d) => d.id));
  const orderIds = order as string[];
  const topicIds = new Set(studyTopics.map((t) => t.id));
  const orphans: string[] = [
    ...details.filter((d) => !orderIds.includes(d.id)).map((d) => `${d.id}: çalışma sırasında yok`),
    ...orderIds.filter((id) => !detailIds.has(id)).map((id) => `${id}: müfredatta yok`),
    ...orderIds.filter((id, i) => orderIds.indexOf(id) !== i).map((id) => `${id}: çalışma sırasında iki kez`),
    ...(curriculum as { id: string; subjectId: string }[])
      .filter((row) => !subjects.some((sub) => sub.id === row.subjectId) || !lessons.some((l) => l.subjectId === row.subjectId))
      .map((row) => `${row.id}: müfredat dersi uygulamada yok`),
    ...Object.entries(lessonTopic)
      .filter(([, topic]) => !topicIds.has(topic))
      .map(([lesson, topic]) => `${lesson} → ${topic}: bağlı konu yok`),
  ];
  for (const o of orphans) findings.push({ id: o.split(":")[0], lessonId: "", kind: "yetim müfredat konusu", detail: o });
  return {
    cards: cards.length,
    counts: { missingReasons, emptyReasons, dependent, orphanTopics: orphans.length, missingHint, missingSteps },
    findings,
  };
}

describe("052 içerik kalite denetimi", () => {
  const report = audit();
  if (process.env.CONTENT_AUDIT_OUT) writeFileSync(process.env.CONTENT_AUDIT_OUT, JSON.stringify(report, null, 1));
  it("stays at or under every ceiling (known gaps may only fall; new kinds are zero)", () => {
    for (const [key, value] of Object.entries(report.counts))
      expect(value, key).toBeLessThanOrEqual(CONTENT_CEILINGS[key as keyof typeof CONTENT_CEILINGS] ?? 0);
  });
  it("the dependent-wording detector catches real cases and spares self-contained ones", () => {
    const card = (prompt: string, extra: Partial<Card> = {}): Card => ({
      id: "x", prompt, options: ["a", "b"], answer: 0, explanation: "e", lessonId: "l", hasFigure: false, ...extra,
    });
    expect(dependentKind(card("Bir önceki sorudaki sonuca göre x kaçtır?"))).toBe("başka karta bağlı");
    expect(dependentKind(card("Metne göre yazarın asıl amacı nedir?"))).toBe("metni taşımıyor");
    expect(dependentKind(card("Metne göre yazarın asıl amacı nedir?", { passage: "Metin." }))).toBeUndefined();
    expect(dependentKind(card("Şekildeki üçgenin alanı kaçtır?"))).toBe("şekli/tabloyu taşımıyor");
    expect(dependentKind(card("Şekildeki üçgenin alanı kaçtır?", { hasFigure: true }))).toBeUndefined();
    expect(dependentKind(card("Aşağıdaki cümlelerden hangisi öznel bir yargıdır?"))).toBeUndefined();
    expect(dependentKind(card("Aşağıdaki parçacıklardan hangisi temeldir?"))).toBeUndefined();
  });
  it("finds the cards, reasons and topics it counts", () => {
    expect(report.cards).toBeGreaterThan(1000);
    expect(details.length).toBe(479);
  });
});
