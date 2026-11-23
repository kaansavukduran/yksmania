import { expect, test } from "@playwright/test";
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

const probability = {
  lesson: "tyt-mat-olasilik-kaynak-036",
  search: "Olasılık",
};
const statistics = { lesson: "veri-analizi", search: "Veri analizi" };

test("Olasılık koşulu ve torba hesabı çevrimdışı dönüştürülür ve kaydedilir", async ({
  page,
  context,
}, info) => {
  await prepare(page, true);
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const original = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, probability);
  const model = page.locator('[data-model="source036-conditional-dice"]');
  const result = model.locator(".f014m-result");
  await model.locator(":scope > summary").press("Enter");
  await expect(result).toContainText("Bunun için 10 sıralı çift var.");
  await expect(result).toContainText("4/10, sade oran 2/5.");
  await expect(result).toContainText("birlikte olasılığı 4/36.");
  await expect(model.getByRole("img").locator("rect")).toHaveCount(36);
  await expect(model.getByRole("img").locator("circle")).toHaveCount(4);
  await model
    .getByRole("button", { name: "Belirli zar yüzü", exact: true })
    .click();
  await expect(result).toContainText("Koşul altında 1/11.");
  await expect(model.getByRole("img").locator("circle")).toHaveCount(1);
  const urn = model.locator("details").filter({ hasText: "Torbada iki seçim" });
  await urn.locator("summary").press("Enter");
  await expect(urn.getByRole("status")).toContainText(
    "Farklı renk olasılığı 15/28.",
  );
  await urn
    .getByRole("checkbox", { name: "İlk topu geri koy", exact: true })
    .check();
  await expect(urn.getByRole("status")).toContainText(
    "Farklı renk olasılığı 15/32.",
  );
  const notes = page
    .locator(".study-notes")
    .getByRole("textbox", { name: "Notun", exact: true });
  await notes.fill("Koşul değiştiğinde paydayı yeniden saydım.");
  await expect
    .poll(
      async () => (await storage(page)).notes[`lesson:${probability.lesson}`],
    )
    .toBe("Koşul değiştiğinde paydayı yeniden saydım.");
  const saved = await storage(page);
  expect(saved.explorations["conditional-dice-source-036"]).toMatchObject({
    mode: "one-face",
    replacement: true,
  });
  expect(learning(saved)).toEqual(original);
  for (const width of [320, 375, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width + 1);
    await model.screenshot({ path: info.outputPath(`olasılık-${width}.png`) });
    await expect(page.locator(".skip-link")).not.toBeFocused();
    await expect(page.locator(".skip-link")).toHaveCSS(
      "clip-path",
      "inset(50%)",
    );
  }
  await page.reload();
  await model.locator(":scope > summary").press("Enter");
  await expect(result).toContainText("Koşul altında 1/11.");
  await expect(notes).toHaveValue("Koşul değiştiğinde paydayı yeniden saydım.");
  await page.goto(`/#/cheatsheets?topic=topic-${probability.lesson}`);
  await expect(
    page.getByRole("heading", { name: "Ardışık seçim", exact: true }),
  ).toBeVisible();
  expect(learning(await storage(page))).toEqual(original);
});

test("Veri Analizi mevcut atölyeyi korur, ham ölçümlerle histogramı günceller", async ({
  page,
  context,
}, info) => {
  await prepare(page, true);
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const original = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, statistics);
  await expect(page.locator('[data-forge015="veri-analizi"]')).toBeVisible();
  const model = page.locator('[data-model="source037-statistics"]');
  await model.locator(":scope > summary").press("Enter");
  await expect(model.getByRole("status")).toContainText(
    "Sapma A için 2, B için 1.",
  );
  await model
    .getByRole("slider", { name: "A için çarpan", exact: true })
    .press("ArrowLeft");
  await expect(model.getByRole("status")).toContainText(
    "Sapma A için 0, B için 1.",
  );
  await model.getByRole("button", { name: "Histogram", exact: true }).click();
  await expect(model.getByRole("status")).toContainText(
    "Sınıf genişliği 4. En az 6 olan 6/10 gözlem.",
  );
  await expect(model.getByRole("img").locator("rect")).toHaveCount(3);
  await model
    .getByRole("slider", { name: "Sınıf sayısı", exact: true })
    .press("ArrowRight");
  await expect(model.getByRole("status")).toContainText(
    "Sınıf genişliği 3. En az 5 olan 7/10 gözlem.",
  );
  await expect(model.getByRole("img").locator("rect")).toHaveCount(4);
  const histogram = model.getByRole("img");
  await expect(
    histogram.locator("text").filter({ hasText: "Frekans (adet)" }),
  ).toBeVisible();
  await expect(
    model.getByText("[11, 14) aralığı, 1 gözlem.", { exact: true }),
  ).toBeVisible();
  for (const width of [320, 375, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width + 1);
    const inside = await histogram.evaluate((svg) => {
      const frame = svg.getBoundingClientRect();
      return [...svg.querySelectorAll("text")].every((label) => {
        const box = label.getBoundingClientRect();
        return (
          box.left >= frame.left &&
          box.right <= frame.right &&
          box.top >= frame.top &&
          box.bottom <= frame.bottom
        );
      });
    });
    expect(inside).toBe(true);
    await histogram.screenshot({
      path: info.outputPath(`histogram-${width}.png`),
    });
  }
  await expect
    .poll(
      async () => (await storage(page)).explorations["statistics-source-037"],
    )
    .toMatchObject({ groups: 4, mode: "histogram", multiplier: 0 });
  await page.reload();
  await model.locator(":scope > summary").press("Enter");
  await expect(model.getByRole("status")).toContainText(
    "En az 5 olan 7/10 gözlem.",
  );
  await page.goto("/#/cheatsheets?topic=detail-225");
  await expect(
    page.getByRole("heading", {
      name: "Ham ölçümleri eş genişlikli sınıflara ayır",
      exact: true,
    }),
  ).toBeVisible();
  expect(learning(await storage(page))).toEqual(original);
});

const testedTopics = [
  {
    ...probability,
    answers: [
      "2/5",
      "15/16",
      "1/3",
      "1/2",
      "1/11",
      "4/7",
      "Bağımsız ve ayrık değil.",
      "Gözlenen oran 7/20’dir.",
    ],
    reference: "2025 TYT · Temel Matematik · Soru 30",
    letter: "B",
    example: "11/21.",
    questionUrl:
      "https://dokuman.osym.gov.tr/pdfdokuman/2025/YKS/TSK/yks_tyt_2025_kitapcik_d250.pdf#page=32",
  },
  {
    ...statistics,
    answers: [
      "5,5",
      "3",
      "Bu okul tanımında mod yoktur.",
      "70",
      "Ortalama 3’ten 5’e çıkar; ortanca 3 kalır.",
      "2",
      "Ortalama −7; sapma 6.",
      "0,4; 0,4; 0,2",
      "Kesin belirlenemez; sınıf içindeki puanlar bilinmiyor.",
      "A’nın gözlenen puanları daha az yayılmıştır; gelecekteki başarı garanti edilmez.",
      "2 ve 2,5",
      "4 ve 4,3,1",
      "C ve C",
      "En az 10 olan 5/12. En az 8 olan 5/12 ile 9/12 arasında olabilir.",
    ],
    reference: "2024 TYT · Temel Matematik · Soru 16",
    letter: "A",
    example: "23.",
    questionUrl:
      "https://dokuman.osym.gov.tr/pdfdokuman/2024/YKS/TSK/yks_tyt_2024_kitapcik_T24kt.pdf#page=29",
  },
];

test("Veri Analizi önceki 10 soruluk çevrimdışı taslağın son kartını korur", async ({
  page,
  context,
}) => {
  await prepare(page);
  const before = await storage(page);
  const draft = {
    lessonId: statistics.lesson,
    phase: "practice",
    index: 9,
    responses: [1, 3, 0, 2, 4, 1, 3, 0, 2].map((selected, index) => ({
      questionId: `veri-analizi-015-${index + 1}`,
      selected,
      correct: true,
      assisted: false,
      confidence: "medium",
    })),
    selected: null,
    checked: false,
    hint: false,
    confidence: "medium",
    note: "Sapmayı karşılaştırırken veri grubunu değiştirmedim.",
    startedAt: Date.now() - 60_000,
  };
  await context.setOffline(true);
  await page.locator('input[type="file"]').setInputFiles({
    name: "previous-progress.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify({ ...before, draft })),
  });
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Yedeği geri yükle", exact: true })
    .click();
  await expect(page.locator(".toast")).toHaveText("Yedek geri yüklendi.");
  await openCourse(page, statistics);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await expect(page.locator(".question-meta")).toContainText("Soru 10 / 10");
  await expect(page.locator(".question-panel h2")).toHaveText(
    typeset(
      "A’nın üç deneme puanı 70,70,70; B’nin 60,70,80’dir. n−1 tanımıyla sapmalar sırasıyla 0 ve 10, ortalamalar ikisinde 70’tir. Yalnız bu ölçümlerden hangi çıkarım geçerlidir?",
    ),
  );
  expect((await storage(page)).draft).toEqual(draft);
  await page
    .locator(".answer-options .answer")
    .filter({
      has: page.getByText(typeset(testedTopics[1].answers[9]), { exact: true }),
    })
    .click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await expect(page.locator(".feedback.correct")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Sonraki soru", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
    .click();
  await expect(page.locator(".result-stats > div strong")).toHaveText([
    "10/10",
    "10/10",
    "0",
  ]);
  const saved = await storage(page);
  expect(saved.sessions.at(-1)?.responses.slice(0, 9)).toEqual(draft.responses);
  expect(saved.sessions.at(-1)?.responses.at(-1)?.questionId).toBe(
    "veri-analizi-015-10",
  );
  expect(saved.settings).toEqual(before.settings);
});

for (const course of testedTopics) {
  test(`${course.search}: puanlı özgün set çevrimdışı kaydedilir ve gerçek kitapçık açılır`, async ({
    page,
    context,
  }) => {
    test.setTimeout(110_000);
    await prepare(page);
    const before = await storage(page);
    await context.setOffline(true);
    await openCourse(page, course);
    await page
      .getByRole("button", { name: "Sorulara geç", exact: true })
      .click();
    for (const [index, answer] of course.answers.entries()) {
      await expect(page.locator(".question-meta > span").first()).toHaveText(
        `Soru ${index + 1} / ${course.answers.length}`,
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
      if (index === 4) {
        await expect
          .poll(async () => (await storage(page)).draft?.responses.length)
          .toBe(5);
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
    const score = `${course.answers.length}/${course.answers.length}`;
    await expect(page.locator(".result-stats > div strong")).toHaveText([
      score,
      score,
      "0",
    ]);
    const after = await storage(page);
    const session = after.sessions.at(-1)!;
    expect(session.lessonId).toBe(course.lesson);
    expect(session.responses).toHaveLength(course.answers.length);
    expect(
      after.reviews
        .filter((review) => review.originSessionId === session.id)
        .map(({ stage, targetDate }) => [stage, targetDate]),
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
    ).toHaveAttribute("href", course.questionUrl);
    await expect(
      source.getByRole("link", { name: "Resmî cevap anahtarı (internet)" }),
    ).toHaveAttribute("href", course.questionUrl.split("#")[0] + "#page=43");
    expect(learning(await storage(page))).toEqual(learning(after));
  });
}
