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

const book =
  "https://dokuman.osym.gov.tr/pdfdokuman/2022/YKS/TSK/yks_2022_ayt.pdf";
const courses = [
  {
    lesson: "tyt-mat-kombinasyon-kaynak-034",
    search: "Kombinasyon",
    model: "source034-point-choices",
    key: "point-choices-source-034",
    sheet: "Üçgen, doğru ve köşegen",
    reference: "2022 AYT · Matematik · Soru 14",
    official: "A",
    example: "6 çift.",
    cards: [
      ["ekip-rolsuz", "56"],
      ["disarida-kalanlar", "36"],
      ["zorunlu-yasak", "70"],
      ["tam-iki", "60"],
      ["en-az-bir", "31"],
      ["lazim-olan-alan", "6"],
      ["ayni-dogru", "31 üçgen, 16 doğru"],
      ["dokuzgen-kosegen", "27"],
    ],
  },
  {
    lesson: "tyt-mat-binom-kaynak-035",
    search: "Binom açılımı",
    model: "source035-signed-binomial",
    key: "signed-binomial-source-035",
    sheet: "Pascal ve işaret",
    reference: "2022 AYT · Matematik · Soru 13",
    official: "C",
    example: "a=5.",
    cards: [
      ["pascal-komsular", "20"],
      ["iki-secim", "216"],
      ["eksi-tek", "−80"],
      ["paydali-sabit", "1.215"],
      ["birlesen-derece", "1 terim, 1"],
      ["tek-cift-toplam", "−62 ve 63"],
      ["simetrik-oran", "7"],
      ["gecersiz-us", "x⁰"],
    ],
  },
] as const;

for (const course of courses) {
  test(`${course.search}: 320 pikselde model, çevrimdışı not ve Kopya Kağıdı`, async ({
    page,
    context,
  }, info) => {
    await prepare(page, true);
    await page.setViewportSize({ width: 320, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const before = learning(await storage(page));
    await context.setOffline(true);
    await openCourse(page, course);
    const model = page.locator(`[data-model="${course.model}"]`);
    const disclosure = model.locator(":scope > summary");
    await disclosure.press("Enter");
    const drawing = model.getByRole("img");
    const result = model.getByRole("status");
    await expect(drawing).toBeVisible();
    const initial = await drawing.innerHTML();
    if (course.model === "source034-point-choices") {
      await expect(result).toContainText("56 üçlüden 52 üçgen. 23 ayrı doğru.");
      await expect(model.getByText("A (0, 0)", { exact: true })).toBeVisible();
      await model
        .getByRole("button", { name: "Doğrusal üçlü", exact: true })
        .click();
      await expect(drawing.locator("polyline")).toHaveCount(1);
      for (const letter of ["E", "F", "G", "H"]) {
        await model
          .getByRole("checkbox", {
            name: `${letter} noktasını seç`,
            exact: true,
          })
          .press("Space");
      }
      await expect(result).toContainText("4 üçlüden 0 üçgen. 1 ayrı doğru.");
      await expect(model.locator("figcaption")).toContainText("alan sıfır");
    } else {
      await expect(result).toContainText(
        "Çift dereceli toplam -121. Tek dereceli toplam 122.",
      );
      await model
        .getByRole("slider", { name: "Parantezin üssü", exact: true })
        .press("ArrowLeft");
      const r = model.getByRole("slider", {
        name: "İkinci terim kaç kez seçilsin?",
        exact: true,
      });
      await r.press("End");
      await r.press("ArrowLeft");
      await r.press("ArrowLeft");
      await expect(result).toContainText("Satır toplamı 16.");
      await expect(result).toContainText(
        "r=2 için C(4,2)=6. Değişken üssü 2, katsayı 24.",
      );
      await model
        .getByText("Parantezin içini değiştir", { exact: true })
        .click();
      const q = model.getByRole("slider", {
        name: "İkinci değişken üssü",
        exact: true,
      });
      await q.press("ArrowLeft");
      await expect(result).toContainText("Özgün ifade için x≠0.");
      await q.press("ArrowRight");
      await q.press("ArrowRight");
      await expect(result).toContainText(
        "5 seçim satırından 1 farklı, sıfır dışı terim kalır.",
      );
      await expect(drawing.locator("rect")).toHaveCount(1);
    }
    expect(await drawing.innerHTML()).not.toBe(initial);
    const notes = page
      .locator(".study-notes")
      .getByRole("textbox", { name: "Notun", exact: true });
    await notes.fill("Sayımı örnekle kontrol ettim.");
    await expect
      .poll(async () => (await storage(page)).notes[`lesson:${course.lesson}`])
      .toBe("Sayımı örnekle kontrol ettim.");
    const saved = await storage(page);
    expect(saved.explorations[course.key]).toBeDefined();
    expect(learning(saved)).toEqual(before);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(321);
    await page.reload();
    if ((await model.getAttribute("open")) === null)
      await disclosure.press("Enter");
    await expect(drawing).toBeVisible();
    await expect(notes).toHaveValue("Sayımı örnekle kontrol ettim.");
    expect((await storage(page)).explorations[course.key]).toEqual(
      saved.explorations[course.key],
    );
    await model.screenshot({ path: info.outputPath("model.png") });
    for (const width of [320, 375, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      const labelsFit = await drawing.evaluate((element) => {
        const svg = element as SVGSVGElement;
        const box = svg.viewBox.baseVal;
        return Array.from(svg.querySelectorAll("text")).every((label) => {
          const { x, y, width, height } = label.getBBox();
          return (
            x >= box.x &&
            y >= box.y &&
            x + width <= box.x + box.width &&
            y + height <= box.y + box.height
          );
        });
      });
      expect(labelsFit).toBe(true);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
    }
    await page.goto(`/#/cheatsheets?topic=topic-${course.lesson}`);
    await expect(
      page.getByRole("heading", { name: course.sheet, exact: true }),
    ).toBeVisible();
    expect(learning(await storage(page))).toEqual(before);
  });

  test(`${course.search}: sekiz kart, tamamlanmamış kayıt, 3/7/21 ve resmî kaynak`, async ({
    page,
    context,
  }) => {
    test.setTimeout(85_000);
    await prepare(page);
    const before = await storage(page);
    await context.setOffline(true);
    await openCourse(page, course);
    await page
      .getByRole("button", { name: "Sorulara geç", exact: true })
      .click();
    for (const [i, [, answer]] of course.cards.entries()) {
      await expect(page.locator(".question-meta > span").first()).toHaveText(
        `Soru ${i + 1} / 8`,
      );
      await expect(page.locator(".question-meta")).toContainText(
        "Özgün öğretim soruları",
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
      if (i === 3) {
        await expect
          .poll(async () => (await storage(page)).draft?.responses.length)
          .toBe(4);
        await page.reload();
        await expect(page.locator(".feedback.correct")).toBeVisible();
        expect((await storage(page)).sessions).toEqual(before.sessions);
      }
      if (i < 7)
        await page
          .getByRole("button", { name: "Sonraki soru", exact: true })
          .click();
    }
    await page
      .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
      .click();
    await expect(page.locator(".result-stats > div strong")).toHaveText([
      "8/8",
      "8/8",
      "0",
    ]);
    const saved = await storage(page);
    const session = saved.sessions.at(-1)!;
    expect(saved.sessions).toHaveLength(before.sessions.length + 1);
    expect(session.lessonId).toBe(course.lesson);
    expect(session.responses.map(({ questionId }) => questionId)).toEqual(
      course.cards.map(([id]) => `${course.lesson}-${id}`),
    );
    expect(
      session.responses.every(({ correct, assisted }) => correct && !assisted),
    ).toBe(true);
    expect(
      saved.reviews
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
    for (let i = 0; i < 2; i += 1)
      await source
        .getByRole("button", { name: "Sonraki çözüm adımı", exact: true })
        .click();
    await expect(source.locator(".worked-conclusion")).toContainText(
      course.example,
    );
    await source.locator("summary").click();
    await expect(source).toContainText(`Resmî cevap: ${course.official}`);
    await expect(
      source.getByRole("link", { name: /Resmî kaynak kaydı/ }),
    ).toHaveAttribute("href", `${book}#page=29`);
    await expect(
      source.getByRole("link", { name: "Resmî cevap anahtarı (internet)" }),
    ).toHaveAttribute("href", `${book}#page=50`);
    expect(learning(await storage(page))).toEqual(learning(saved));
  });
}

test("Faiz’in toplam artışı ve Karışım’ın buharlaşma sınırı çevrimdışı açılır", async ({
  page,
  context,
}) => {
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, {
    lesson: "faiz-problemleri",
    search: "Faiz problemleri",
  });
  await expect(
    page.getByRole("heading", { name: "Çözümlü örnekler", exact: true }),
  ).toBeVisible();
  const growth = page
    .locator(".worked-example")
    .filter({ hasText: "İki yıllık faizle toplam yüzde artışını bul" });
  await growth.locator("summary").click();
  await growth
    .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
    .click();
  await expect(growth.locator(".worked-conclusion")).toContainText(
    "Basit artış %16, bileşik artış %16,64.",
  );
  await page.goto("/#/cheatsheets?topic=detail-215");
  await expect(page.getByText(/tüm dönemin yüzde artışı/)).toBeVisible();
  await openCourse(page, {
    lesson: "karisim-problemleri",
    search: "Karışım problemleri",
  });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page
    .getByRole("button", {
      name: "Yalnız su buharlaşıyorsa çözünen korunur",
      exact: true,
    })
    .click();
  await expect(page.getByText(/son toplam pozitif olmalı/)).toBeVisible();
  await page.reload();
  await expect(page.getByText(/son toplam pozitif olmalı/)).toBeVisible();
  expect(learning(await storage(page))).toEqual(before);
});
