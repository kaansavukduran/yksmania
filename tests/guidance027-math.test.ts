import { createHash } from "node:crypto";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import rows from "../src/learning/guidance027Math.json";
import { foundation013QuestionsByLesson } from "../src/learning/forge013FoundationQuestions";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { helpPanels } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

const ids = ["sayi-basamaklari", "bolme-bolunebilme", "ebob-ekok"];
const original = ids.flatMap((id) => foundation013QuestionsByLesson[id]);
const flat = original.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  explanation: q.explanation.tr,
  hint: q.hint.tr,
}));
const stable = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(stable)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.keys(x)
            .sort()
            .map((k) => [k, stable((x as Record<string, unknown>)[k])]),
        )
      : x;
const fold = (s: string) => s.replace(/\s+/g, " ").trim();
const gcd = (a: number, b: number): number => {
  while (b) [a, b] = [b, a % b];
  return a;
};
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;
const range = (lo: number, hi: number) =>
  Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
const digits = (n: number) => String(n).split("").map(Number);
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const plain = (s: string) =>
  s
    .replace(/<[^>]*>/g, "")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");

describe("027 eski30 matematik kartına özgü yardım", () => {
  it("eski30 sorunun bütün metadata, metin, şık, anahtar, ipucu ve açıklama baytlarını korur", () => {
    expect(original).toHaveLength(30);
    expect(
      createHash("sha256")
        .update(JSON.stringify(stable(original)))
        .digest("hex"),
    ).toBe("eb540e708a4606240e91da957a2e7df44537dae6b3d6ca244405f7b4668c7c54");
    expect(rows.map((r) => r.id)).toEqual(flat.map((q) => q.id));
    expect(new Set(rows.map((r) => r.id)).size).toBe(30);
    for (const [i, row] of rows.entries()) {
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      expect(row.identity, row.id).toBe(questionIdentity(flat[i]));
      expect(original[i].guidance).toBeUndefined();
      expect(original[i].options).toHaveLength(5);
    }
  });
  it("bilgi, yöntem ve90 ilerleyen adımı ayırır;150 şık gerekçesini gerçek eski sırasına bağlar", () => {
    expect(rows.reduce((n, r) => n + r.guidance.steps.length, 0)).toBe(90);
    expect(rows.reduce((n, r) => n + r.guidance.optionReasons.length, 0)).toBe(
      150,
    );
    expect(new Set(rows.map((r) => fold(r.guidance.strategy))).size).toBe(30);
    for (const [i, row] of rows.entries()) {
      const g = questionGuidanceSchema.parse(row.guidance),
        q = flat[i];
      expect(g.steps).toHaveLength(3);
      expect(new Set(g.steps.map(fold)).size).toBe(3);
      expect(g.knowledge.length).toBeGreaterThanOrEqual(1);
      expect(g.strategy.length).toBeGreaterThan(50);
      expect([...g.knowledge, g.strategy].map(fold)).not.toContain(
        fold(q.hint),
      );
      for (const text of [...g.knowledge, g.strategy])
        expect(g.steps.map(fold)).not.toContain(fold(text));
      expect(g.steps.map(fold)).not.toContain(fold(q.hint));
      expect(g.steps).not.toContain(q.explanation);
      expect(g.optionReasons).toHaveLength(q.options.length);
      expect(new Set(g.optionReasons.map(fold)).size).toBe(q.options.length);
      for (const [option, reason] of g.optionReasons.entries()) {
        expect(reason.length).toBeGreaterThan(40);
        expect(reason.startsWith("Doğru."), row.id + "/" + option).toBe(
          option === q.answer,
        );
      }
      expect(g.commonError.length).toBeGreaterThan(40);
      expect(g.check.length).toBeGreaterThan(40);
    }
  });
  it("kimlik önizlemi değişen kök, pasaj, şık sırası, anahtar veya açıklamayı aynı kart sanmaz", () => {
    for (const [i, q] of flat.entries()) {
      const variants: HelpQuestion[] = [
        { ...q, id: q.id + "-changed" },
        { ...q, prompt: q.prompt + " ek" },
        { ...q, passage: "Başka pasaj" },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % q.options.length },
        { ...q, explanation: q.explanation + " ek" },
      ];
      for (const changed of variants)
        expect(questionIdentity(changed)).not.toBe(rows[i].identity);
      // Existing identity intentionally omits hint. The complete old-payload hash above protects it separately.
      expect(questionIdentity({ ...q, hint: "Başka ipucu" })).toBe(
        rows[i].identity,
      );
    }
  });
  it("30 gerçek yardım bileşeninde bilgi, yöntem, ilk adım ve açık tam çözüm sırasını korur", () => {
    for (const [i, row] of rows.entries()) {
      const q = { ...flat[i], guidance: row.guidance },
        panels = helpPanels(q);
      expect(panels).toHaveLength(5);
      expect(panels[0].paragraphs).toContain(q.hint);
      expect(panels[0].paragraphs).toContain(row.guidance.knowledge[0]);
      expect(panels[1].paragraphs).toEqual([row.guidance.strategy]);
      for (const level of [0, 1, 2, 3, 6]) {
        const h = plain(
          renderToStaticMarkup(
            createElement(QuestionHelp, {
              question: q,
              level,
              onLevel: () => {},
            }),
          ),
        );
        if (level === 0) expect(h).not.toContain("Bilmen gerekenler");
        if (level === 1) {
          expect(h).toContain(row.guidance.knowledge[0]);
          expect(h).not.toContain(row.guidance.strategy);
        }
        if (level === 2) {
          expect(h).toContain(row.guidance.strategy);
          expect(h).not.toContain(row.guidance.steps[0]);
        }
        if (level === 3) {
          expect(h).toContain(row.guidance.steps[0]);
          expect(h).not.toContain(row.guidance.steps[1]);
        }
        if (level < 6) expect(h).not.toContain("Doğru yanıt:");
        else {
          expect(h).toContain(
            "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
          );
          expect(h).toContain(q.explanation);
          for (const reason of row.guidance.optionReasons)
            expect(h).toContain(reason);
          expect(h).toContain(row.guidance.commonError);
          expect(h).toContain(row.guidance.check);
        }
      }
    }
  });
  it("ilk10 anahtarı bağımsız basamak çözümlemesi ve sonlu yazım taramasıyla denetler", () => {
    const reversePair = range(1, 9).flatMap((a) =>
      range(1, 9)
        .filter((b) => a + b === 13 && 10 * a + b - (10 * b + a) === 27)
        .map((b) => 10 * a + b),
    );
    const evens = range(100, 999).filter(
      (n) =>
        n % 2 === 0 &&
        new Set(digits(n)).size === 3 &&
        digits(n).every((d) => [0, 3, 7, 8].includes(d)),
    );
    const appended = range(10, 99).filter(
      (n) => Number(String(n) + "4") - n === 454,
    );
    const inserted = range(1, 9).filter(
      (a) => 1000 * a + 27 - (100 * a + 27) === 4500,
    );
    const outer = range(1, 9).flatMap((a) =>
      range(1, 9)
        .filter((c) => a + c === 10 && 100 * a + c - (100 * c + a) === 396)
        .map((c) => a * c),
    );
    const carries = range(1, 9).flatMap((a) =>
      range(0, 9)
        .filter((b) => 10 * a + 8 + 40 + b === 105)
        .map((b) => a + b),
    );
    const permutations = range(1000, 9999).filter(
      (n) => [...String(n)].sort().join("") === "0269",
    );
    const blocks = range(10, 99)
      .filter((cd) => cd * 3 <= 99 && cd * 4 === 96)
      .map((cd) => 100 * 3 * cd + cd);
    expect(reversePair).toHaveLength(1);
    expect(appended).toHaveLength(1);
    expect(inserted).toHaveLength(1);
    expect(outer).toHaveLength(1);
    expect(carries).toHaveLength(1);
    expect(blocks).toHaveLength(1);
    const expected = [
      Number(String(64027)[1]) * 10 ** 3,
      reversePair[0],
      evens.length,
      appended[0],
      inserted[0],
      outer[0],
      carries[0],
      Math.max(...permutations) - Math.min(...permutations),
      range(1, 135).map(String).join("").length,
      blocks[0],
    ];
    for (const [i, n] of expected.entries())
      expect(String(n)).toBe(flat[i].options[flat[i].answer]);
  });
  it("ikinci10 anahtarı gerçek bölme, bütün rakam adayları ve ortak-kat karşı örnekleriyle doğrular", () => {
    const div = flat.slice(10, 20),
      aValues = new Set(
        range(0, 9).flatMap((a) =>
          range(0, 9)
            .filter(
              (b) =>
                (4060 + 100 * a + b) % 5 === 0 &&
                (4060 + 100 * a + b) % 9 === 0,
            )
            .map(() => a),
        ),
      );
    const by4 = range(0, 9).filter((a) => (702 + 10 * a) % 4 === 0),
      by8 = range(0, 9).filter((a) => (520 + a) % 8 === 0),
      by11 = range(0, 9).filter((a) => (1204 + 10 * a) % 11 === 0);
    const necessary = div[7].options
      .map(Number)
      .filter((d) => range(1, 30).every((k) => (30 * k) % d === 0));
    const divisors = range(4, 87).filter((b) => 7 * b + 3 === 87);
    expect([...aValues]).toEqual([3, 8]);
    expect(by11).toHaveLength(1);
    expect(necessary).toEqual([30]);
    expect(divisors).toHaveLength(1);
    const expected = [
      Math.floor(157 / 12) + " ve " + (157 % 12),
      String(13 * 6 + 11),
      String((3 * 4 + 5) % 7),
      String(sum([...aValues])),
      String(by4.length),
      String(sum(by8)),
      String(by11[0]),
      String(necessary[0]),
      String((5 ** 2 + 5 * 6 - 6) % 7),
      String(divisors[0]),
    ];
    for (const [i, s] of expected.entries())
      expect(s).toBe(div[i].options[div[i].answer]);
    for (const a of [5, 12, 19])
      for (const b of [6, 13, 20]) expect((a ** 2 + a * b - b) % 7).toBe(0);
  });
  it("son10 anahtarı bölen taraması, saat çizelgesi, alan ve hacim korunumu üzerinden doğrular", () => {
    const q = flat.slice(20),
      common = gcd(96, 144),
      missing = range(1, 400).filter(
        (b) => gcd(36, b) === 12 && lcm(36, b) === 180,
      );
    const rope = Math.max(
      ...range(1, 48).filter((d) => 48 % d === 0 && 60 % d === 0),
    );
    const events = range(0, 200).filter(
        (minute) => minute % 8 === 0 && minute % 12 === 0,
      ),
      fourth = events[3];
    const hour = 9 + Math.floor(fourth / 60),
      minute = fourth % 60;
    const squareSide = Math.max(
      ...range(1, 120).filter((d) => 120 % d === 0 && 168 % d === 0),
    );
    const residue = range(151, 300).filter((n) => n % 8 === 5 && n % 12 === 5);
    const cubeSide = Math.max(
      ...range(1, 36).filter((d) => [36, 48, 60].every((x) => x % d === 0)),
    );
    const expected = [
      String(common),
      String(lcm(20, 28)),
      String(missing[0]),
      String(48 / rope + 60 / rope),
      String(hour).padStart(2, "0") + "." + String(minute).padStart(2, "0"),
      String((120 / squareSide) * (168 / squareSide)),
      String(residue[0]),
      String(211 - 1),
      String((36 / cubeSide) * (48 / cubeSide) * (60 / cubeSide)),
      String(gcd(gcd(2, 4), 8) * lcm(lcm(2, 4), 8)),
    ];
    expect(missing).toHaveLength(1);
    for (const [i, s] of expected.entries())
      expect(s).toBe(q[i].options[q[i].answer]);
    expect(35 * squareSide ** 2).toBe(120 * 168);
    expect(60 * cubeSide ** 3).toBe(36 * 48 * 60);
    expect(gcd(14, 15)).toBe(1);
    expect(1 + 14 * 15).toBe(211);
    expect(2 * 4 * 8).not.toBe(gcd(gcd(2, 4), 8) * lcm(lcm(2, 4), 8));
  });
});
