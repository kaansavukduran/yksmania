import { setThemePreference } from "./helpers/theme";
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { expectGuideSections, guideSectionCount, openWorkedExamples } from "./helpers/guidePages";
test.use({ hasTouch: true, locale: "tr-TR" });

async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function openMath(page: Page, name: RegExp) {
  await nav(page, "Konu Anlatımı");
  await page.getByRole("button", { name: /Matematik.*31 konu/ }).click();
  await page.getByRole("button", { name }).click();
}

async function rational(page: Page) {
  await page.goto("/");
  await page
    .locator(".sidebar")
    .getByRole("button", { name: "Konu Anlatımı", exact: true })
    .click();
  await page.getByRole("button", { name: /Matematik.*31 konu/ }).click();
  await page.getByRole("button", { name: /Rasyonel sayılar.*45/ }).click();
}

test("YKS-018 fraction approximation never claims an exact equality", async ({
  page,
}) => {
  await rational(page);
  await page.getByRole("slider", { name: /^Payda:/ }).fill("3");
  await expect(page.locator(".compact-lab .area-result")).toContainText(
    "1/3 ≈ 0,333",
  );
  await page.getByRole("slider", { name: /^Payda:/ }).fill("4");
  await expect(page.locator(".compact-lab .area-result")).toContainText(
    "1/4 = 0,25",
  );
});

test("YKS-019 contents navigation moves keyboard focus to its visible destination", async ({
  page,
}) => {
  await rational(page);
  const contents = page.locator(".guide-contents summary");
  await contents.focus();
  await contents.press("Enter");
  const target = page.getByRole("button", {
    name: "Denk kesir, sadeleştirme ve genişletme",
    exact: true,
  });
  await target.focus();
  await target.press("Enter");
  await expect(
    page.getByRole("heading", {
      name: "Denk kesir, sadeleştirme ve genişletme",
      exact: true,
    }),
  ).toBeFocused();
});

test("equations retain reversible steps and distinguish a zero coefficient offline without awarding completion", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await openMath(
    page,
    /Birinci dereceden denklemler: eşitliği koru, çözümü doğrula/,
  );
  const lab = page.locator(".algebra-lab");
  await lab
    .getByRole("button", {
      name: "Sabit terimi iki taraftan çıkar",
      exact: true,
    })
    .click();
  await lab
    .getByRole("button", { name: "İki tarafı a’ya böl", exact: true })
    .click();
  await expect(lab.locator(".algebra-result")).toContainText("Çözüm: x=3");
  await lab.getByRole("slider", { name: "Denenecek x", exact: true }).fill("3");
  await expect(lab.locator(".algebra-probe")).toContainText("koşulu sağlıyor");
  await lab.getByRole("slider", { name: "a katsayısı", exact: true }).fill("0");
  await lab.getByRole("slider", { name: "c katsayısı", exact: true }).fill("2");
  await expect(lab.locator(".algebra-result")).toContainText("Çözüm kümesi ℝ");
  await lab.getByRole("slider", { name: "c katsayısı", exact: true }).fill("3");
  await expect(lab.locator(".algebra-result")).toContainText("Çözüm kümesi ∅");
  await expect(
    lab.getByRole("button", { name: "İki tarafı a’ya böl", exact: true }),
  ).toHaveCount(0);
  await openWorkedExamples(page);
  const example = page.locator(".worked-example").filter({
    has: page.locator("summary", { hasText: "Paydadaki bilinmeyen" }),
  });
  await example.locator("summary").click();
  await example
    .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
    .click();
  await expect(example.locator(".worked-conclusion")).toContainText("5/2");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(lab.locator(".algebra-result")).toContainText("Çözüm kümesi ∅");
  await nav(page, "Bugün");
  await expect(
    page.getByRole("region", { name: "Konu planı", exact: true }),
  ).toContainText("0/510");
  await expect(page.locator(".stat-number").first()).toHaveText("0");
});

test("YKS-020 inequality remains readable while direction and endpoints survive touch, rotation and offline reload at large text", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await nav(page, "Ayarlar");
  await setThemePreference(page, "contrast");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByRole("switch", { name: /Aion animasyonu/ }).uncheck();
  await page.setViewportSize({ width: 320, height: 844 });
  await openMath(page, /Basit eşitsizlikler: yön/);
  const lab = page.locator(".algebra-lab");
  await expect(lab.locator(".algebra-result")).toContainText(
    "x > −3; aralık: (−3, ∞)",
  );
  await lab
    .getByRole("slider", { name: "Denenecek x", exact: true })
    .fill("-3");
  await expect(lab.locator(".algebra-probe")).toContainText("sağlamıyor");
  await lab.getByLabel("Eşitsizlik işareti").selectOption("≤");
  await expect(lab.locator(".algebra-result")).toContainText("[−3, ∞)");
  await expect(lab.locator(".algebra-probe")).toContainText("koşulu sağlıyor");
  await lab.getByRole("slider", { name: "a katsayısı", exact: true }).fill("2");
  await expect(lab.locator(".algebra-result")).toContainText("x ≤ 3");
  await expect(lab.locator(".algebra-result")).toContainText("yön korundu");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(lab.getByLabel("Eşitsizlik işareti")).toHaveValue("≤");
  for (const size of [
    { width: 320, height: 844 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(size);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    const box = await page.locator(".lesson-article").boundingBox();
    const note = await page.locator(".study-notes").boundingBox();
    expect(note!.y).toBeGreaterThanOrEqual(box!.y + box!.height);
    if (size.width === 320) {
      const readableWidth = await lab.evaluate((element) => {
        const style = getComputedStyle(element);
        return (
          element.clientWidth -
          parseFloat(style.paddingLeft) -
          parseFloat(style.paddingRight)
        );
      });
      expect(readableWidth).toBeGreaterThanOrEqual(220);
      expect(
        await page.evaluate(
          () => getComputedStyle(document.documentElement).fontSize,
        ),
      ).toBe("32px");
      expect(
        await page.evaluate(() =>
          getComputedStyle(document.documentElement)
            .getPropertyValue("--text-scale")
            .trim(),
        ),
      ).toBe("1.5");
    }
  }
  await lab.getByRole("slider", { name: "a katsayısı", exact: true }).fill("0");
  await expect(lab.locator(".algebra-result")).toContainText("Çözüm kümesi: ℝ");
  await openWorkedExamples(page);
  const example = page.locator(".worked-example").filter({
    has: page.locator("summary", {
      hasText: "Negatif katsayı yönü değiştirir",
    }),
  });
  await example.locator("summary").tap();
  await example
    .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
    .tap();
  await expect(example.locator(".worked-conclusion")).toContainText("[−3,∞)");
  expect(
    (await new AxeBuilder({ page }).analyze()).violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
});

test("expanded source-led guides expose interactive models and reasoned worked examples through ordinary course entry", async ({
  page,
}) => {
  await page.goto("/");
  const cases = [
    [
      /Matematik.*31 konu/,
      /Temel kavramlar: sayı/,
      "Farklı rakamlarla en büyük değer",
      "27",
    ],
    [
      /Matematik.*31 konu/,
      /Tek–çift ve işaret:/,
      "Tek çarpımdan geriye git",
      "a tek, b çift",
    ],
    [/Matematik.*31 konu/, /Ardışık sayılar: adım/, "İki uç da dahil", "297"],
    [
      /Matematik.*31 konu/,
      /Asal sayılar: bölen/,
      "Aynı çarpım, farklı sayımlar",
      "18 pozitif bölen",
    ],
    [
      /Matematik.*31 konu/,
      /Faktöriyel: azalan/,
      "25’in ikinci beşini say",
      "7 sıfır",
    ],
    [
      /Biyoloji.*18 konu/,
      /Hücre organelleri: yapı/,
      "Katalaz hangi yapıyı ayırt ettirir?",
      "Peroksizom",
    ],
    [
      /Kimya.*17 konu/,
      /Periyodik sistem ve iyonlar/,
      "İyonun elektronları adresi değiştirmez",
      "3. periyot, 2. grup",
    ],
  ] as const;
  for (const [subject, lesson, title, answer] of cases) {
    await nav(page, "Konu Anlatımı");
    await page.getByRole("button", { name: subject }).click();
    await page.getByRole("button", { name: lesson }).click();
    await expect(page.locator(".study-title h1")).toHaveText(lesson);
    expect(await guideSectionCount(page)).toBeGreaterThanOrEqual(
      6,
    );
    await expect(page.locator(".visual-lab")).toHaveCount(1);
    await openWorkedExamples(page);
    const example = page
      .locator(".worked-example")
      .filter({ has: page.locator("summary", { hasText: title }) });
    await example.locator("summary").click();
    await example
      .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
      .click();
    await expect(example.locator(".worked-conclusion")).toContainText(answer);
    await expect(
      page.locator(".cheatsheet-toggle,.topic-cheatsheet"),
    ).toHaveCount(0);
    await expect(
      page
        .locator(".sidebar nav")
        .getByRole("button", { name: "Kopya Kağıtları", exact: true }),
    ).toBeVisible();
  }
});
