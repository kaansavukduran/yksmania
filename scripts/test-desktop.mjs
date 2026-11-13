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
  await page.locator(".hero .primary").click();
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
  await openAyt("Biyoloji", "DNA eşlenmesi: eski ve yeni zincirler");
  await expect(page.locator(".dna-count strong")).toHaveText("2");
  expect(errors).toEqual([]);
  console.log(
    JSON.stringify({
      desktop: "PASS",
      aytVisuals: "PASS",
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
