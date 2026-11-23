import { expect, test, type Locator, type Page } from "@playwright/test";
import { typeset } from "../../src/domain/typeset";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import {
  learning,
  openCourse,
  prepare,
  storage,
} from "./helpers/revisedCourse";

registerOfflineBootDiagnostics();
test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

const triangle = {
  lesson: "tyt-geo-ucgende-acilar-031",
  search: "Üçgende açılar",
};
const sides = {
  lesson: "tyt-geo-ucgen-esitsizligi-031",
  search: "Üçgen eşitsizliği",
};

async function checkFrame(page: Page, figure: Locator, width: number) {
  await page.setViewportSize({ width, height: 844 });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(width + 1);
  expect(
    await figure.evaluate((svg) => {
      const frame = svg.getBoundingClientRect();
      return [...svg.querySelectorAll("text")].every((text) => {
        const label = text.getBoundingClientRect();
        return (
          label.left >= frame.left &&
          label.right <= frame.right &&
          label.top >= frame.top &&
          label.bottom <= frame.bottom
        );
      });
    }),
  ).toBe(true);
}

test("İç ve dış açıortay seçimi aynı üçgeni ve kaydı çevrimdışı günceller", async ({
  page,
  context,
}, info) => {
  test.setTimeout(65_000);
  await prepare(page, true);
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, triangle);
  const model = page.locator('[data-model="bisectors"]');
  const summary = model.locator(":scope > summary");
  await summary.press("Enter");
  const result = model.getByRole("status");
  const figure = model.getByRole("img");
  await expect(result).toContainText("∠BIC = 90° + A/2 = 119°.");
  const initial = await figure.innerHTML();
  const choices = model.getByRole("group", { name: "Açıortay seçimi" });
  const mixed = choices.getByRole("radio", { name: "B iç, C dış", exact: true });
  await mixed.check();
  await expect(result).toContainText("∠BXC = A/2 = 29°.");
  expect(await figure.innerHTML()).not.toBe(initial);
  await mixed.press("ArrowDown");
  await expect(choices.getByRole("radio", { name: "B ve C dış", exact: true })).toBeChecked();
  await expect(result).toContainText("∠BXC = 90° − A/2 = 61°.");
  await model
    .getByRole("slider", { name: "A açısı (°)", exact: true })
    .press("ArrowLeft");
  await expect(result).toContainText("∠BXC = 90° − A/2 = 61,5°.");
  for (const width of [320, 375, 1280]) {
    await checkFrame(page, figure, width);
    await model.screenshot({ path: info.outputPath(`aciortay-${width}.png`) });
  }
  const note = page
    .locator(".study-notes")
    .getByRole("textbox", { name: "Notun", exact: true });
  await note.fill("Yayı takip edip açıortay seçimine göre bölgeyi okudum.");
  await expect
    .poll(async () => (await storage(page)).notes[`lesson:${triangle.lesson}`])
    .toBe("Yayı takip edip açıortay seçimine göre bölgeyi okudum.");
  await page.reload();
  await summary.press("Enter");
  await expect(result).toContainText("61,5°.");
  expect(
    (await storage(page)).explorations["geometry-angles-source-002"],
  ).toMatchObject({ a: 57, mode: "external" });
  expect(learning(await storage(page))).toEqual(before);
  await page.goto(`/#/cheatsheets?topic=topic-${triangle.lesson}`);
  await expect(
    page.getByRole("heading", {
      name: "Üç açıortay kesişimini ayır",
      exact: true,
    }),
  ).toBeVisible();
});

test("Ortak kenar açık sınıra ulaşınca geçersiz üçgen çizilmez", async ({
  page,
  context,
}, info) => {
  test.setTimeout(65_000);
  await prepare(page, true);
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, sides);
  const model = page.locator('[data-model="shared-side"]');
  const summary = model.locator(":scope > summary");
  await summary.press("Enter");
  const result = model.getByRole("status");
  const figure = model.getByRole("img");
  await expect(result).toContainText("Ortak aralık 5 < x < 13. 7 tam sayı.");
  await expect(figure.locator("polygon")).toHaveCount(2);
  const shared = model.getByRole("slider", {
    name: "Ortak kenar x",
    exact: true,
  });
  for (let i = 0; i < 4; i++) await shared.press("ArrowRight");
  await expect(result).toContainText(
    "x = 13 ile iki üçgen birlikte kurulamaz.",
  );
  await expect(figure.locator("polygon")).toHaveCount(1);
  await model
    .getByRole("slider", { name: "Alt soldaki kenar", exact: true })
    .press("Home");
  const lowerRight = model.getByRole("slider", {
    name: "Alt sağdaki kenar",
    exact: true,
  });
  await lowerRight.press("End");
  for (let i = 0; i < 3; i++) await lowerRight.press("ArrowLeft");
  await expect(result).toContainText("Ortak açık aralık yok.");
  await expect(figure.locator("polygon")).toHaveCount(0);
  for (const width of [320, 375, 1280]) {
    await checkFrame(page, figure, width);
    await model.screenshot({ path: info.outputPath(`ortak-${width}.png`) });
  }
  await expect
    .poll(
      async () =>
        (await storage(page)).explorations["geometry-shared-side-source-003"],
    )
    .toMatchObject({ d: 1, e: 14, x: 13 });
  await page.reload();
  await summary.press("Enter");
  await expect(result).toContainText("Ortak açık aralık yok.");
  expect(learning(await storage(page))).toEqual(before);
  await page.goto(`/#/cheatsheets?topic=topic-${sides.lesson}`);
  await expect(
    page.getByRole("heading", {
      name: "Açık sınırı koru, sonra ek koşulu uygula",
      exact: true,
    }),
  ).toBeVisible();
});

const courses = [
  {
    ...triangle,
    answers: [
      "65",
      "75",
      "71",
      "52",
      "118",
      "90",
      "126",
      "25",
      "12",
      "70",
      "62°",
      "38°",
      "66°",
      "75°, 60°, 45°",
      "95°",
    ],
    reference: "2024 TYT · Temel Matematik · Soru 32",
    letter: "E",
    questionPage: 34,
    keyPage: 43,
    example: "51°.",
  },
  {
    ...sides,
    answers: [
      "5<x<13",
      "11",
      "4,6,9",
      "9",
      "AB<AC<BC",
      "C<B<A",
      "Dik açılıdır.",
      "Dar açılı",
      "Geniş açılı",
      "7",
      "3",
      "Hayır.",
      "10",
      "12 birim",
      "BD>BC>AB",
    ],
    reference: "2021 TYT · Temel Matematik · Soru 32",
    letter: "B",
    questionPage: 35,
    keyPage: 45,
    example: "Yalnız 2, 3 ve 4.",
  },
];

for (const course of courses) {
  test(`${course.search}: eski ve yeni kartlar, tekrar günleri ve resmî bağlantı`, async ({
    page,
    context,
  }) => {
    test.setTimeout(125_000);
    await prepare(page);
    const before = await storage(page);
    await context.setOffline(true);
    await openCourse(page, course);
    await page
      .getByRole("button", { name: "Sorulara geç", exact: true })
      .click();
    for (const [index, answer] of course.answers.entries()) {
      await expect(page.locator(".question-meta > span").first()).toHaveText(
        `Soru ${index + 1} / 15`,
      );
      const options = page.locator(".answer-options .answer");
      await expect(options).toHaveCount(5);
      await options
        .filter({ has: page.getByText(typeset(answer), { exact: true }) })
        .click();
      await page
        .getByRole("button", { name: "Cevabı kontrol et", exact: true })
        .click();
      await expect(page.locator(".feedback.correct")).toBeVisible();
      if (index === 9) {
        await expect
          .poll(async () => (await storage(page)).draft?.responses.length)
          .toBe(10);
        await page.reload();
        await expect(page.locator(".feedback.correct")).toBeVisible();
        expect((await storage(page)).sessions).toEqual(before.sessions);
      }
      if (index < course.answers.length - 1)
        await page
          .getByRole("button", { name: "Sonraki soru", exact: true })
          .click();
    }
    await page
      .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
      .click();
    await expect(page.locator(".result-stats > div strong")).toHaveText([
      "15/15",
      "15/15",
      "0",
    ]);
    const after = await storage(page);
    const session = after.sessions.at(-1)!;
    expect(session.lessonId).toBe(course.lesson);
    expect(session.responses).toHaveLength(15);
    expect(
      after.reviews
        .filter((r) => r.originSessionId === session.id)
        .map((r) => [r.stage, r.targetDate]),
    ).toEqual([
      [3, "2026-11-25"],
      [7, "2026-11-29"],
      [21, "2026-12-13"],
    ]);
    await page.reload();
    const source = page
      .locator(".past-exam-reference")
      .filter({ hasText: course.reference });
    await source
      .getByRole("button", { name: "Çözümü adım adım aç", exact: true })
      .click();
    for (let i = 0; i < 2; i++)
      await source
        .getByRole("button", { name: "Sonraki çözüm adımı", exact: true })
        .click();
    await expect(source.locator(".worked-conclusion")).toContainText(
      course.example,
    );
    await source.locator("summary").click();
    await expect(source).toContainText(`Resmî cevap: ${course.letter}`);
    await expect(
      source.getByRole("link", { name: /Resmî kaynak kaydı/ }),
    ).toHaveAttribute(
      "href",
      new RegExp(
        `^https://dokuman\\.osym\\.gov\\.tr/.+\\.pdf#page=${course.questionPage}$`,
      ),
    );
    await expect(
      source.getByRole("link", { name: "Resmî cevap anahtarı (internet)" }),
    ).toHaveAttribute(
      "href",
      new RegExp(
        `^https://dokuman\\.osym\\.gov\\.tr/.+\\.pdf#page=${course.keyPage}$`,
      ),
    );
    expect(learning(await storage(page))).toEqual(learning(after));
  });
}
