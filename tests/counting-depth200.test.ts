import { describe, expect, it } from "vitest";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import {
  binomialExamples200, choose, combinationExamples200, combinationRows200, diceSumRows200, multisetCases200,
  multisetCount200, pascalRows200, permutationExamples200, permutationRows200, probabilityExamples200, repeatedExamples200,
} from "../src/learning/countingDepth200";

const permutations = <T,>(items: T[]): T[][] =>
  items.length <= 1 ? [items] : items.flatMap((item, i) => permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [item, ...rest]));
const subsets = <T,>(items: T[], size: number): T[][] =>
  size === 0 ? [[]] : items.length < size ? [] : [
    ...subsets(items.slice(1), size - 1).map((rest) => [items[0], ...rest]),
    ...subsets(items.slice(1), size),
  ];
const distinct = (words: string[][]) => new Set(words.map((w) => w.join(""))).size;

describe("counting depth 0.201.0", () => {
  it("adds one data table section and two worked examples to every counting lesson", () => {
    const lessons = [
      ["tyt-mat-permutasyon-kaynak-032", permutationExamples200],
      ["tyt-mat-tekrarli-permutasyon-kaynak-033", repeatedExamples200],
      ["tyt-mat-kombinasyon-kaynak-034", combinationExamples200],
      ["tyt-mat-binom-kaynak-035", binomialExamples200],
      ["tyt-mat-olasilik-kaynak-036", probabilityExamples200],
    ] as const;
    for (const [id, added] of lessons) {
      const guide = lessonGuides.get(id)!;
      const sheet = builtInCheatSheets.get(lessonTopic[id])!;
      expect(guide.examples.slice(-2)).toEqual(added);
      const tableSection = guide.sections.at(-1)!;
      expect(tableSection.table?.layout).toBe("table");
      expect(sheet.sections.at(-1)!.table).toBe(tableSection.table);
      expect(sheet.examples.map(({ answer }) => answer)).toEqual(guide.examples.map(({ answer }) => answer));
      for (const row of tableSection.table!.rows) expect(row).toHaveLength(tableSection.table!.headers.length);
    }
  });

  it("derives table rows from brute-force counts", () => {
    const people = ["A", "B", "C", "D", "E", "F"];
    for (const { r, ordered, chosen, inner } of permutationRows200()) {
      const teams = subsets(people, r);
      expect(teams.length).toBe(chosen);
      expect(teams.flatMap((team) => permutations(team)).length).toBe(ordered);
      expect(ordered).toBe(chosen * inner);
    }
    for (const { label, counts } of multisetCases200) {
      const cards = label.includes(",") ? label.split(", ") : label.split("");
      expect(distinct(permutations(cards))).toBe(multisetCount200(counts));
    }
    const seven = combinationRows200();
    expect(seven.map(({ chosen }) => chosen)).toEqual([1, 7, 21, 35, 35, 21, 7, 1]);
    expect(seven.every(({ chosen, outside }) => chosen === outside)).toBe(true);
    expect(seven[0].atLeast).toBe(128);
    for (const { n, row, sum, alternating } of pascalRows200()) {
      expect(sum).toBe(2 ** n);
      expect(alternating).toBe(n === 0 ? 1 : 0);
      row.forEach((value, r) => r > 0 && r < n && expect(value).toBe(choose(n - 1, r - 1) + choose(n - 1, r)));
    }
    const dice = diceSumRows200();
    const pairs = Array.from({ length: 36 }, (_, i) => Math.floor(i / 6) + 1 + (i % 6) + 1);
    for (const { sum, ways } of dice) expect(pairs.filter((s) => s === sum).length).toBe(ways);
    expect(dice.map(({ probability }) => probability).slice(4, 7)).toEqual(["5/36", "1/6", "5/36"]);
    expect(dice.at(-1)!.atMost).toBe("1");
  });

  it("verifies every new worked example answer by enumeration", () => {
    const digits = [0, 1, 2, 3, 4, 5];
    let divisibleByFive = 0;
    for (const a of digits) for (const b of digits) for (const c of digits) {
      if (a !== 0 && new Set([a, b, c]).size === 3 && c % 5 === 0) divisibleByFive += 1;
    }
    expect(divisibleByFive).toBe(36);
    const rows = permutations(people6());
    const adjacent = rows.filter((row) => Math.abs(row.indexOf("A") - row.indexOf("B")) === 1);
    expect(adjacent.length).toBe(240);
    expect(adjacent.filter((row) => row[0] !== "C").length).toBe(192);

    const ankara = [...new Set(permutations("ANKARA".split("")).map((w) => w.join("")))];
    expect(ankara.length).toBe(120);
    expect(ankara.filter((w) => w.includes("AAA")).length).toBe(24);
    const odd = new Set(permutations(["1", "1", "2", "2", "3"]).map((w) => w.join("")).filter((w) => Number(w) % 2 === 1));
    expect(odd.size).toBe(18);

    const students = [..."KKKKKK", ..."EEEE"].map((g, i) => g + i);
    const teams = subsets(students, 4);
    expect(teams.filter((team) => team.filter((s) => s[0] === "K").length >= 2).length).toBe(185);
    expect([2, 3, 4].map((k) => choose(8, k))).toEqual([28, 56, 70]);

    const expand = (terms: [number, number][], n: number) => {
      let poly = new Map<number, number>([[0, 1]]);
      for (let i = 0; i < n; i += 1) {
        const next = new Map<number, number>();
        for (const [e, c] of poly) for (const [te, tc] of terms) next.set(e + te, (next.get(e + te) ?? 0) + c * tc);
        poly = next;
      }
      return poly;
    };
    expect(expand([[1, 1], [0, 2]], 5).get(3)).toBe(40);
    const nine = expand([[1, 1], [0, 1]], 8);
    expect(nine.size).toBe(9);
    expect(nine.get(5)).toBe(56);

    const bag = [..."KKKK", ..."MMM"].map((c, i) => c + i);
    let different = 0;
    let total = 0;
    for (const first of bag) for (const second of bag) {
      if (first === second) continue;
      total += 1;
      if (first[0] !== second[0]) different += 1;
    }
    expect(different / total).toBeCloseTo(4 / 7, 12);
    const klass = [...Array(12).fill("K"), ...Array(8).fill("E")].map((g, i) => g + i);
    const triples = subsets(klass, 3);
    const withBoy = triples.filter((t) => t.some((s) => s[0] === "E")).length;
    expect([withBoy, triples.length]).toEqual([920, 1140]);
    expect(withBoy / triples.length).toBeCloseTo(46 / 57, 12);
  });
});

function people6() {
  return ["A", "B", "C", "D", "E", "F"];
}
