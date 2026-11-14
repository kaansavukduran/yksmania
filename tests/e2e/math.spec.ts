import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.use({ locale: "tr-TR" });
const titles = [
  "Temel kavramlar: sayı, değer ve tanım koşulu",
  "Tek–çift ve işaret: iki ayrı özellik",
  "Ardışık sayılar: adım, terim ve toplam",
  "Asal sayılar: bölen, kanıt ve çarpan",
  "Faktöriyel: azalan seçimler ve ortak çarpım",
];
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function openMath(page: Page, i: number) {
  await nav(page, "Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page.getByRole("button", { name: /Matematik.*31 konu/ }).click();
  await page.getByRole("button", { name: new RegExp(titles[i]) }).click();
  await expect(
    page.getByRole("heading", { name: titles[i], exact: true }),
  ).toBeVisible();
  await expect(page.locator(".math-foundation-lab")).toBeVisible();
}
async function stored(page: Page) {
  return page.evaluate(
    () =>
      new Promise<any>((resolve, reject) => {
        const r = indexedDB.open("yksmania");
        r.onsuccess = () => {
          const db = r.result,
            q = db.transaction("state").objectStore("state").get("current");
          q.onsuccess = () => {
            resolve(q.result);
            db.close();
          };
          q.onerror = () => reject(q.error);
        };
        r.onerror = () => reject(r.error);
      }),
  );
}
async function finish(page: Page, answers: number[]) {
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  const before = await stored(page);
  expect(before.sessions).toEqual([]);
  expect(before.reviews).toEqual([]);
  expect(before.topicProgress).toEqual({});
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await expect(page.locator(".question-panel")).toBeVisible();
  for (const [i, index] of answers.entries()) {
    await page.locator(".answer").nth(index).click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await page
      .getByRole("button", {
        name: i === 4 ? "Çalışmayı kaydet" : "Sonraki soru",
        exact: true,
      })
      .click();
  }
  await expect(page.locator(".result-stats")).toContainText("5/5");
  await page.reload();
  await expect(page.locator(".result-stats")).toContainText("5/5");
  const after = await stored(page);
  expect(after.sessions).toHaveLength(1);
  expect(after.sessions[0].includesTheory).toBe(false);
  expect(after.reviews).toHaveLength(3);
}
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
});
test("number sets require all memberships, explain square roots and preserve a checked attempt offline", async ({
  page,
  context,
}) => {
  await openMath(page, 0);
  await page.getByRole("button", { name: "√9", exact: true }).click();
  await page.getByRole("checkbox", { name: "ℝ · Gerçek", exact: true }).check();
  await page
    .getByRole("button", { name: "Kümeleri kontrol et", exact: true })
    .click();
  await expect(page.locator(".set-result")).toContainText(
    "Seçimlerini şu değerle karşılaştır",
  );
  for (const name of ["ℕ · Doğal", "ℤ · Tam", "ℚ · Rasyonel"])
    await page.getByRole("checkbox", { name, exact: true }).check();
  await page
    .getByRole("button", { name: "Kümeleri kontrol et", exact: true })
    .click();
  await expect(page.locator(".set-result")).toContainText(
    "Kümeler doğru eşleşti",
  );
  await expect(page.locator(".set-result")).toContainText("√9 = 3");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("checkbox", { name: "ℕ · Doğal", exact: true }),
  ).toBeChecked();
  await expect(page.locator(".set-result")).toContainText(
    "Kümeler doğru eşleşti",
  );
  await finish(page, [1, 2, 0, 2, 1]);
});
test("parity keeps negative and zero signs separate, rejects zero division and fractional parity", async ({
  page,
}) => {
  await openMath(page, 1);
  await page
    .getByRole("combobox", { name: "İşlem", exact: true })
    .selectOption("division");
  await page.getByRole("slider", { name: "A sayısı", exact: true }).fill("-1");
  await page.getByRole("slider", { name: "B sayısı", exact: true }).fill("2");
  await expect(page.locator(".parity-result")).toContainText("Negatif");
  await expect(page.locator(".parity-result")).toContainText(
    "Tam sayı değil; tek/çift değil",
  );
  await page.getByRole("slider", { name: "B sayısı", exact: true }).fill("0");
  await expect(page.locator(".parity-result")).toContainText("tanımsız");
  await page
    .getByRole("combobox", { name: "İşlem", exact: true })
    .selectOption("product");
  await expect(page.locator(".parity-result")).toContainText(
    "Ne pozitif ne negatif. Tek–çift: Çift",
  );
  await finish(page, [0, 1, 2, 2, 1]);
});
test("consecutive terms count endpoints and pair two equal sums without inventing a middle term", async ({
  page,
}) => {
  await openMath(page, 2);
  await page.getByRole("slider", { name: "İlk terim", exact: true }).fill("-3");
  await page
    .getByRole("slider", { name: "Terim sayısı", exact: true })
    .fill("4");
  await page
    .getByRole("combobox", { name: "Artış", exact: true })
    .selectOption("2");
  await page
    .getByRole("button", { name: "Eşleyerek topla", exact: true })
    .click();
  await expect(page.locator(".sequence-terms")).toHaveText(
    "-3 + -1 + 1 + 3 = 0",
  );
  await expect(page.locator(".sequence-result")).toContainText(
    "2S = 4 × (-3 + 3) = 0",
  );
  await expect(page.locator(".sequence-result")).toContainText(
    "ortalama bir terim olmak zorunda değil",
  );
  await finish(page, [1, 2, 0, 2, 1]);
});
test("prime trials include the square-root boundary, retain evidence and treat one as neither class", async ({
  page,
}) => {
  await openMath(page, 3);
  await page
    .getByRole("button", { name: "2 ile bölmeyi dene", exact: true })
    .click();
  await expect(page.locator(".prime-result")).toContainText(
    "Henüz asallık kararı verilmedi",
  );
  await page
    .getByRole("button", { name: "7 ile bölmeyi dene", exact: true })
    .click();
  await expect(page.locator(".prime-result")).toContainText("49 bileşik");
  await expect(page.locator(".prime-result")).toContainText("49 = 7 × 7 + 0");
  const groups = await page.locator(".math-foundation-lab svg").boundingBox();
  expect(groups!.height).toBeLessThan(groups!.width / 5);
  await page
    .getByRole("slider", { name: "İncelenen tam sayı", exact: true })
    .fill("47");
  for (const n of [2, 3, 5])
    await page
      .getByRole("button", { name: `${n} ile bölmeyi dene`, exact: true })
      .click();
  await expect(page.locator(".prime-result")).toContainText("47 asal");
  await page
    .getByRole("slider", { name: "İncelenen tam sayı", exact: true })
    .fill("1");
  await expect(page.locator(".prime-result")).toContainText(
    "1 ne asal ne bileşik",
  );
  await page
    .getByRole("button", { name: "Asal çarpanlarını göster", exact: true })
    .click();
  await expect(page.locator(".prime-factorization")).toContainText(
    "1’in asal çarpanı yoktur",
  );
  await finish(page, [1, 0, 2, 1, 2]);
});
test("factorial shelf choices decrease, compare a single order to all orders and preserve the empty product", async ({
  page,
}) => {
  await openMath(page, 4);
  await expect(page.locator(".factorial-result")).toContainText(
    "4! = 4 × 3 × 2 × 1 = 24",
  );
  await page.getByRole("button", { name: "Kitap A", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Kitap A", exact: true }),
  ).toBeDisabled();
  await expect(page.locator(".factorial-result")).toContainText(
    "2. raf için 3 kitap seçeneği kaldı",
  );
  for (const letter of ["C", "B", "D"])
    await page
      .getByRole("button", { name: `Kitap ${letter}`, exact: true })
      .click();
  await expect(page.locator(".factorial-result")).toContainText("A–C–B–D");
  await expect(page.locator(".factorial-result")).toContainText(
    "yalnız birini gördün",
  );
  await page
    .getByRole("slider", { name: "Ortak çarpım m", exact: true })
    .fill("3");
  await expect(page.locator(".factorial-ratio")).toContainText("4! / 3! = 4");
  await page
    .getByRole("slider", { name: "Farklı kitap sayısı", exact: true })
    .fill("0");
  await expect(page.locator(".factorial-result")).toContainText("0! = 1");
  await expect(page.locator(".factorial-ratio")).toContainText("0! / 0! = 1");
  await expect(page.locator(".math-foundation-lab svg")).toHaveCount(0);
  await finish(page, [1, 2, 0, 2, 1]);
});
test("all five math models first open offline at 320px, keep large controls and notes below the article", async ({
  page,
  context,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 320, height: 900 });
  await nav(page, "Ayarlar");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByLabel("Tema", { exact: true }).selectOption("light");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  for (let i = 0; i < titles.length; i++) {
    await openMath(page, i);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    const article = await page.locator(".lesson-article").boundingBox(),
      notes = await page.locator(".study-notes").boundingBox();
    expect(notes!.y).toBeGreaterThanOrEqual(article!.y + article!.height);
    const result = await new AxeBuilder({ page })
      .include(".main-content")
      .analyze();
    expect(
      result.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact!),
      ),
    ).toEqual([]);
  }
  await page
    .getByRole("slider", { name: "Farklı kitap sayısı", exact: true })
    .fill("3");
  await page.getByRole("button", { name: "Kitap B", exact: true }).click();
  await expect(page.locator(".factorial-result")).toContainText(
    "2. raf için 2 kitap seçeneği kaldı",
  );
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.setViewportSize({ width: 900, height: 320 });
  await page.setViewportSize({ width: 320, height: 900 });
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Kitap B", exact: true }),
  ).toBeDisabled();
});
