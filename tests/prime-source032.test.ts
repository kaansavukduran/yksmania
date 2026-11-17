import { describe, it, expect } from "vitest";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  primeSource032Guides as guides,
  primeSource032Lessons as lessons,
  primeSource032Sheets as sheets,
} from "../src/learning/primeSource032";
const lesson = lessons[0],
  guide = guides[0];
const q = (n: number) => lesson.questions[n - 1];
const answer = (n: number) => q(n).options[q(n).answer].tr.replace(/\s/g, "");
const prime = (n: number) =>
  Number.isInteger(n) &&
  n > 1 &&
  Array.from({ length: Math.max(0, n - 2) }, (_, i) => i + 2).every(
    (d) => n % d !== 0,
  );
const values = (a: number, b: number) =>
  Array.from({ length: b - a + 1 }, (_, i) => a + i);
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
describe("032 Asal kaynağının koşul ve aktarım kontrolleri", () => {
  it("kendi ilerleme kimliğiyle kapsamlı içerik ve ayrı kısa özet sunar", () => {
    expect(lesson.id).toBe("tyt-mat-asal-kaynak-032");
    expect(lesson.subjectId).toBe("tyt-matematik");
    expect(guide.sections).toHaveLength(20);
    expect(guide.examples).toHaveLength(12);
    expect(guide.recall).toHaveLength(8);
    expect(lesson.questions).toHaveLength(40);
    expect(sheets[0].topicId).toBe(`topic-${lesson.id}`);
    expect(sheets[0].sections).toHaveLength(5);
    expect(sheets[0].examples).toHaveLength(2);
    expect(sheets[0].recall).toHaveLength(3);
    expect(new Set(lesson.questions.map((v) => v.id)).size).toBe(40);
    expect(new Set(lesson.questions.map((v) => v.answer)).size).toBe(5);
    for (const item of lesson.questions) {
      expect(item.options).toHaveLength(5);
      expect(new Set(item.options.map((o) => o.tr)).size).toBe(5);
      const g = questionGuidanceSchema.parse(item.guidance);
      expect(g.steps.length).toBeGreaterThanOrEqual(3);
      expect(g.optionReasons).toHaveLength(5);
      expect(item.prompt.tr).not.toMatch(
        /yukarıdaki|önceki şekil|hangi metin/i,
      );
    }
  });
  it("kare farklarında bütün pozitif adayları bağımsız tarar ve negatifi ayrı kabul eder", () => {
    const matches = (k: number, lower = 1) =>
      values(lower, 100).filter((n) => prime(n * n - k));
    expect(matches(9)).toEqual([4]);
    expect(answer(6)).toBe("Yalnız4");
    expect(matches(16)).toEqual([]);
    expect(answer(7)).toBe("Boşküme");
    expect(matches(25)).toEqual([6]);
    expect(answer(16)).toBe("{6}");
    expect(values(-100, 100).filter((n) => prime(n * n - 25))).toEqual([-6, 6]);
    expect(answer(29)).toBe("{−6,6}");
    expect(matches(1)).toEqual([2]);
    expect(answer(26)).toBe("2ve3");
    expect(matches(4, 3)).toEqual([3]);
    expect(answer(33)).toBe("3ve5");
  });
  it("toplam ve farkın aynı anda asallığında tek çifti doğrular", () => {
    const ps = values(2, 200).filter(prime);
    const pairs = ps.flatMap((p) =>
      ps
        .filter((r) => r > p && prime(p + r) && prime(r - p))
        .map((r) => [p, r]),
    );
    expect(pairs).toEqual([[2, 5]]);
    expect(answer(9)).toBe("(2,5)");
    expect(
      ps.flatMap((p) =>
        ps.filter((r) => r > p && p + r === 25).map((r) => p * r),
      ),
    ).toEqual([46]);
    expect(answer(8)).toBe("46");
    expect(
      ps.flatMap((p) =>
        ps.filter((r) => r > p && p + r === 31).map((r) => p * r),
      ),
    ).toEqual([58]);
    expect(answer(14)).toBe("58");
    expect(prime(7) && prime(23) && prime(11) && prime(19)).toBe(true);
    expect(7 + 23).toBe(30);
    expect(11 + 19).toBe(30);
    expect(7 * 23).not.toBe(11 * 19);
    expect(answer(27)).toContain("Tekdeğerbelirlenmez");
  });
  it("asallık adaylarını tanımdan üretir ve yeterlilikle tam listeyi karıştırmaz", () => {
    const candidates = (n: number) =>
      values(2, n).filter((p) => prime(p) && p * p <= n);
    expect(candidates(97)).toEqual([2, 3, 5, 7]);
    expect(q(3).prompt.tr).toContain("TAM listesi");
    expect(answer(3)).toBe("2,3,5,7");
    expect(candidates(157)).toEqual([2, 3, 5, 7, 11]);
    expect(answer(21)).toBe("2,3,5,7,11");
    expect(prime(47)).toBe(true);
    expect(prime(113)).toBe(true);
    expect(prime(119)).toBe(false);
    expect(prime(143)).toBe(false);
    expect(prime(157)).toBe(true);
    expect(answer(2)).toBe("7");
    expect(answer(24)).toBe("11");
    expect(q(24).guidance!.strategy).toContain("karekökünü");
    expect(q(24).guidance!.strategy).not.toContain("karesinin");
  });
  it("asal çarpan sayaçlarını ve en küçük altı bölenli sayıyı ayrı hesaplar", () => {
    const divisors = (n: number) => values(1, n).filter((d) => n % d === 0);
    const distinctPrimes = (n: number) => divisors(n).filter(prime);
    expect(distinctPrimes(84)).toEqual([2, 3, 7]);
    expect(answer(4)).toBe(String(2 + 3 + 7));
    expect(divisors(84)).toHaveLength(12);
    const badIndex = q(4).options.findIndex((o) => o.tr === "16");
    expect(q(4).guidance!.optionReasons[badIndex]).toContain("3·2·2=12");
    expect(
      values(1, 100).find(
        (n) => divisors(n).length === 6 && distinctPrimes(n).length === 2,
      ),
    ).toBe(12);
    expect(answer(11)).toBe("12");
    expect(distinctPrimes(180)).toHaveLength(3);
    expect(divisors(180)).toHaveLength(18);
    expect(answer(17)).toBe("3ve18");
    expect(answer(37)).toBe("2,3,6");
    expect(answer(40)).toBe("3");
    expect(q(40).guidance!.steps[0]).not.toMatch(/p²=p(?:\s|$)/);
  });
  it("kayıp pozitiflik ve farklılık koşullarını bağımsız sınar", () => {
    expect(values(1, 30).filter((n) => prime(3 * (n + 1)))).toEqual([]);
    expect(answer(12)).toContain("Çözümyoktur");
    expect(
      values(1, 3).filter((n) => prime(2 * n + 1) && prime(n + 4)),
    ).toEqual([1, 3]);
    expect(answer(23)).toBe("1ve3");
    expect(gcd(4, 9)).toBe(1);
    expect(gcd(14, 25)).toBe(1);
    expect(prime(14) || prime(25)).toBe(false);
    expect(gcd(gcd(6, 10), 15)).toBe(1);
    expect(gcd(6, 10)).toBe(2);
    expect(answer(38)).toContain("herikiliaralarındaasaldeğildir");
    expect(
      values(2, 4)
        .filter(prime)
        .flatMap((p) =>
          values(2, 4).filter((r) => prime(r) && p !== r && p + r === 4),
        ),
    ).toEqual([]);
    expect(answer(39)).toContain("Çözümyoktur");
  });
  it("2022 kaynak örneğini doğru koşullarla çözer;pratik kartları resmi soru diye etiketlemez", () => {
    const pairs = values(1, 9).flatMap((a) =>
      values(1, 9)
        .filter((b) => ((10 * a + b) * (10 * b + a)) % 30 === 0)
        .map((b) => [a, b]),
    );
    expect(pairs).toEqual([
      [4, 5],
      [5, 4],
    ]);
    expect(pairs.map(([a, b]) => a + b)).toEqual([9, 9]);
    const official = guide.examples.find((e) => e.title.includes("2022 TYT"))!;
    expect(official.answer).toBe("9.");
    expect(guide.source).toContain("PDF 28");
    expect(guide.source).toContain(
      "https://dokuman.osym.gov.tr/pdfdokuman/2022/YKS/TSK/yks_2022_tyt.pdf#page=45",
    );
    expect(
      lesson.questions.every((v) => !v.prompt.tr.includes("2022 TYT")),
    ).toBe(true);
  });
  it("Türkçe biçimi ve PDF dışı öğrenci işi sınırını korur", () => {
    const text = JSON.stringify([guides, lessons, sheets]);
    expect(text).not.toMatch(
      /bileşik ken|ns ağla|bk aç|Bileşikliği çin|denen meden|3’tür sayısı|p²≤nolan|nn>1|m\/ne ns ad eve|PDF.{0,10}yükle|Todoist|drive\.google\.com/,
    );
    expect(text).toContain("1–50");
    expect(guide.examples[3].steps[2].explanation).toContain("n>3");
    expect(guide.sections[8].paragraphs[1]).toContain("12 için 5+7");
  });
});
