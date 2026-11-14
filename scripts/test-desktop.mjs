import { _electron, expect } from "@playwright/test";
import path from "node:path";
const profile =
  process.env.YKSMANIA_TEST_PROFILE ||
  path.resolve("../work", `desktop-test-${Date.now()}`);
const binary = process.env.YKSMANIA_BINARY
  ? path.resolve(process.env.YKSMANIA_BINARY)
  : undefined;
const launch = () =>
  _electron.launch({
    ...(binary ? { executablePath: binary } : {}),
    args: [
      ...(binary ? [] : ["desktop/main.cjs"]),
      ...(process.platform === "linux"
        ? ["--no-sandbox", "--ozone-platform=headless"]
        : []),
      "--disable-gpu",
      `--user-data-dir=${profile}`,
    ],
    timeout: 20000,
  });
let app;
try {
  app = await launch();
  let page = await app.firstWindow();
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.waitForSelector(".hero");
  await page.context().setOffline(true);
  const navigate = async (name) => {
    const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
    if (await menu.isVisible()) await menu.click();
    await page
      .locator(".sidebar")
      .getByRole("button", { name, exact: true })
      .click();
  };
  const openAyt = async (subject, title) => {
    await navigate("Konu Anlatımı");
    await page.getByRole("button", { name: "AYT", exact: true }).click();
    await page.getByRole("button", { name: new RegExp(subject) }).click();
    await page.getByRole("button", { name: new RegExp(title) }).click();
    await page.locator(".visual-lab").waitFor();
  };
  await navigate("Ayarlar");
  await expect(
    page.getByRole("textbox", { name: "Hedef sınav tarihi", exact: true }),
  ).toHaveValue("18/06/2027");
  await navigate("Bugün");
  await expect(
    page.getByRole("region", { name: "Konu planı", exact: true }),
  ).toContainText("28/02/2027");
  const chemistry = [
    /Simyadan kimyaya: amaç/,
    /Kimya disiplinleri:/,
    /Kimyanın sembolik dili:/,
    /Kimyada güvenlik:/,
    /Atom modelleri:/,
  ];
  for (const [i, title] of chemistry.entries()) {
    await navigate("Konu Anlatımı");
    await page.getByRole("button", { name: "TYT", exact: true }).click();
    await page.getByRole("button", { name: /Kimya.*17 konu/ }).click();
    await page.getByRole("button", { name: title }).click();
    await expect(page.locator(".chemistry-lab")).toBeVisible();
    if (!i) {
      await page
        .getByRole("button", { name: "Konuyu çalıştım", exact: true })
        .click();
      await expect(
        page.getByRole("button", {
          name: "Çalışma kaydını geri al",
          exact: true,
        }),
      ).toBeVisible();
    }
  }
  const mathematics = [
    /Temel kavramlar: sayı, değer/,
    /Tek–çift ve işaret:/,
    /Ardışık sayılar: adım/,
    /Asal sayılar: bölen/,
    /Faktöriyel: azalan/,
  ];
  for (const [i, title] of mathematics.entries()) {
    await navigate("Konu Anlatımı");
    await page.getByRole("button", { name: "TYT", exact: true }).click();
    await page.getByRole("button", { name: /Matematik.*31 konu/ }).click();
    await page.getByRole("button", { name: title }).click();
    await expect(page.locator(".math-foundation-lab")).toBeVisible();
    if (i === 3) {
      await page
        .getByRole("button", { name: "7 ile bölmeyi dene", exact: true })
        .click();
      await expect(page.locator(".prime-result")).toContainText("49 bileşik");
    }
  }
  await navigate("Kopya Kağıtları");
  await expect(
    page.getByRole("heading", { name: "Kopya Kağıtları", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Biyoloji.*konu başlığı/ }).click();
  await page
    .getByRole("button", { name: "Hücre Organelleri", exact: true })
    .click();
  await expect(page.locator(".source-browser")).toContainText(
    "Eşleşmiş PDF bulunamadı",
  );
  await openAyt("Matematik", "Türev: kirişten teğete");
  await page
    .getByRole("button", { name: "Teğeti kontrol et", exact: true })
    .click();
  await expect(page.locator(".tangent-result")).toContainText("= 2");
  await openAyt("Fizik", "Elektrik alan ve test yükü");
  await page.getByRole("button", { name: "−1 µC", exact: true }).click();
  await expect(page.locator(".force-result")).toContainText("yön: sola");
  await openAyt("Kimya", "Denge: derişim ve tepkime hızı");
  await page
    .getByRole("button", { name: "1 saniye ilerlet", exact: true })
    .click();
  await expect(page.getByLabel("Geçen süre", { exact: true })).toHaveValue("1");
  await openAyt("Biyoloji", "DNA eşlenmesi: eski ve yeni zincirler");
  await page.locator(".dna-lab .primary").click();
  await page.locator(".dna-lab .primary").click();
  await expect(page.locator(".dna-count strong")).toHaveText("2");
  await navigate("Bugün");
  await expect(page.locator(".stat-number").first()).toHaveText("0");
  await navigate("Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page.getByRole("button", { name: /Matematik.*31/ }).click();
  await page.getByRole("button", { name: /Rasyonel sayılar.*18/ }).click();
  await page.waitForSelector(".visual-lab");
  await page.locator(".lesson-article > .primary").click();
  for (const index of [1, 2, 0, 1, 1]) {
    await page.locator(".answer").nth(index).click();
    await page.locator(".question-actions .primary").click();
    await page.locator(".question-actions .primary").click();
  }
  await expect(page.locator(".result-stats")).toContainText("5/5");
  await page.screenshot({ path: path.resolve("../work/desktop-result.png") });
  await page.reload();
  await expect(page.locator(".result-stats")).toContainText("5/5");
  await app.close();
  app = await launch();
  page = await app.firstWindow();
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.waitForSelector(".hero");
  await expect(page.locator(".stat-number").first()).toHaveText("1");
  await page.context().setOffline(true);
  await navigate("Dünyam");
  await expect(
    page.getByRole("img", { name: /Genel konu çalışma ilerlemesi/ }),
  ).toHaveAttribute("aria-label", /1\/479 konu/);
  await expect(
    page.getByRole("region", { name: "TYT konu ağacı", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "AYT konu ağacı", exact: true }),
  ).toBeVisible();
  await openAyt("Biyoloji", "DNA eşlenmesi: eski ve yeni zincirler");
  await expect(page.locator(".dna-count strong")).toHaveText("2");
  await navigate("Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page.getByRole("button", { name: /Matematik.*31 konu/ }).click();
  await page.getByRole("button", { name: /Asal sayılar: bölen/ }).click();
  await expect(page.locator(".prime-result")).toContainText("49 bileşik");
  expect(errors).toEqual([]);
  console.log(
    JSON.stringify({
      desktop: "PASS",
      aytVisuals: "PASS",
      cheatsheets: "PASS",
      orderedPlanAndRestart: "PASS",
      ogmChemistryVisuals: "PASS",
      mathematicsVisualsAndRestart: "PASS",
      profile,
      offlineLesson: "PASS",
      reload: "PASS",
      processRestart: "PASS",
      rendererErrors: errors.length,
    }),
  );
} finally {
  await app?.close();
}
