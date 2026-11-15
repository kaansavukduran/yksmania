import { createServer } from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium, expect } from "@playwright/test";

const prefix = "/yksmania/";
const evidence = path.resolve(
  process.env.YKSMANIA_EVIDENCE_DIR || "/tmp/yksmania-pages-evidence",
);
await fs.mkdir(evidence, { recursive: true });
let server;
const missing = [];
if (!process.env.YKSMANIA_PAGES_URL) {
  const root = path.resolve(process.env.YKSMANIA_WEB_DIR || "dist");
  const mime = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".json": "application/json",
    ".webmanifest": "application/manifest+json",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".woff2": "font/woff2",
  };
  server = createServer(async (req, res) => {
    const url = new URL(req.url, "http://127.0.0.1:4197");
    try {
      if (!url.pathname.startsWith(prefix)) throw Error("OUTSIDE_PROJECT");
      const relative =
        decodeURIComponent(url.pathname.slice(prefix.length)) || "index.html";
      const file = path.resolve(root, relative);
      if (!file.startsWith(root + path.sep)) throw Error("OUTSIDE_BUILD");
      const data = await fs.readFile(file);
      res
        .writeHead(200, {
          "Content-Type":
            mime[path.extname(file)] || "application/octet-stream",
          "Cache-Control": "no-store",
        })
        .end(data);
    } catch {
      missing.push(url.pathname);
      res.writeHead(404).end();
    }
  });
  await new Promise((resolve) => server.listen(4197, "127.0.0.1", resolve));
}
const origin =
  process.env.YKSMANIA_PAGES_URL || `http://127.0.0.1:4197${prefix}`;
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
});
const context = await browser.newContext({
  locale: "tr-TR",
  hasTouch: true,
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage(),
  errors = [],
  cases = [];
page.on("pageerror", (e) => errors.push(String(e)));
const nav = async (name) => {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
};
const units = [
  {
    id: "sayi-problemleri",
    title: "Sayı problemleri: cümleden modele, modelden kontrole",
    text: "ikinci düzen 1 fazla",
    act: async (l) =>
      l
        .getByRole("slider", { name: "Toplam sıra sayısı", exact: true })
        .press("ArrowRight"),
  },
  {
    id: "basinc",
    title: "Basınç: kuvvetten akışkan dengesine",
    text: "Basınç: 60.000 Pa",
    act: async (l) =>
      l
        .getByRole("spinbutton", {
          name: "Dik kuvvet (N), sayıyla",
          exact: true,
        })
        .fill("120"),
  },
  {
    id: "zayif-etkilesimler",
    title: "Zayıf etkileşimler: doğru tanecik çiftini seç",
    text: "İyon–dipol",
    act: async (l) => {
      await l
        .getByRole("combobox", { name: "Birinci tanecik", exact: true })
        .selectOption("sodium");
      await l
        .getByRole("combobox", { name: "İkinci tanecik", exact: true })
        .selectOption("water");
    },
  },
  {
    id: "virusler",
    title: "Virüsler: yapı, konak ve çoğalma",
    text: "Çıkış gerçekleşti.",
    act: async (l) =>
      l
        .getByRole("combobox", { name: "Çoğalma basamağı", exact: true })
        .selectOption("4"),
  },
  {
    id: "mitoz",
    title: "Mitoz: kopyala, ayır ve say",
    text: "8 kromozom",
    act: async (l) =>
      l
        .getByRole("combobox", { name: "İncelenen evre", exact: true })
        .selectOption("4"),
  },
  {
    id: "zarflar",
    title: "Zarflar: sözcükten sözcüğe anlam bağlantıları",
    text: "Sıfat",
    act: async (l) =>
      l.getByRole("button", { name: "Cümleyi dönüştür", exact: true }).click(),
  },
  {
    id: "devrimler-caginda-devlet-toplum",
    title: "Devrimler Çağında Değişen Devlet ve Toplum",
    text: "1839 Tanzimat: hukuk güvenliği",
    act: async (l) => {
      await l
        .getByRole("combobox", { name: "İncelenecek olay", exact: true })
        .selectOption("1");
      for (let i = 0; i < 2; i++)
        await l
          .getByRole("button", { name: "Sonraki bağlantı", exact: true })
          .click();
    },
  },
];
let result = { status: "INCOMPLETE", url: origin };
try {
  await page.goto(origin);
  await expect(page.locator(".sidebar-version")).toContainText("0.11.0");
  const manifestLink = await page
    .locator('link[rel="manifest"]')
    .getAttribute("href");
  const manifestUrl = new URL(manifestLink, origin);
  const manifest = await (await context.request.get(manifestUrl.href)).json();
  expect(new URL(manifest.start_url, manifestUrl).pathname).toBe(prefix);
  expect(new URL(manifest.scope, manifestUrl).pathname).toBe(prefix);
  for (const icon of manifest.icons)
    expect(
      (await context.request.get(new URL(icon.src, manifestUrl).href)).status(),
    ).toBe(200);
  const versionResponse = await context.request.get(
    new URL("version.json", origin).href,
  );
  expect(versionResponse.status()).toBe(200);
  expect((await versionResponse.json()).version).toBe("0.11.0");
  const worker = await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise((resolve) =>
        navigator.serviceWorker.addEventListener("controllerchange", resolve, {
          once: true,
        }),
      );
    return { scope: reg.scope, script: reg.active.scriptURL };
  });
  expect(new URL(worker.scope).pathname).toBe(prefix);
  expect(new URL(worker.script).pathname).toBe(prefix + "sw.js");
  await context.setOffline(true);
  for (const unit of units) {
    await nav("Konu Anlatımı");
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(unit.title);
    await page.locator(".ready-topic").filter({ hasText: unit.title }).click();
    const lab = page.locator(`[data-forge011="${unit.id}"]`);
    await expect(lab).toBeVisible();
    const before = await lab.locator("svg").first().innerHTML();
    await unit.act(lab);
    await expect(lab.locator("[data-model-result]")).toContainText(unit.text);
    expect(await lab.locator("svg").first().innerHTML()).not.toBe(before);
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    await page.reload();
    await expect(lab.locator("[data-model-result]")).toContainText(unit.text);
    cases.push(unit.id);
  }
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await expect(page.locator(".answer")).toHaveCount(5);
  await page.locator(".answer").first().click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await expect(page.locator(".feedback")).toBeVisible();
  await page.reload();
  await expect(page.locator(".feedback")).toBeVisible();
  await nav("Kopya Kağıtları");
  await expect(page.locator("main h1")).toBeVisible();
  await nav("Sınavlar");
  await expect(
    page.getByText("TYT karma denemesi", { exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await nav("Ayarlar");
  await expect(
    page.getByRole("button", {
      name: "Güncellemeleri kontrol et",
      exact: true,
    }),
  ).toBeVisible();
  await page.screenshot({
    path: path.join(evidence, "pages-mobile-offline.png"),
    fullPage: false,
  });
  expect(errors).toEqual([]);
  expect(missing.filter((p) => !p.endsWith("favicon.ico"))).toEqual([]);
  result = {
    status: "PASS",
    url: origin,
    worker,
    manifestStart: manifest.start_url,
    manifestScope: manifest.scope,
    firstUseOfflineFamilies: cases,
    modelChangesAndReload: "PASS",
    questionFeedbackReload: "PASS",
    navigation: "theory/cheatsheets/questions/exams/settings",
    rendererErrors: errors,
    missing,
  };
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  result = {
    status: "FAIL",
    url: origin,
    error: String(error.stack || error),
    rendererErrors: errors,
    cases,
    missing,
  };
  await page
    .screenshot({ path: path.join(evidence, "failure.png"), fullPage: false })
    .catch(() => {});
  await fs.writeFile(
    path.join(evidence, "failure-dom.txt"),
    await page
      .locator("body")
      .innerText()
      .catch(() => ""),
  );
  console.error(JSON.stringify(result, null, 2));
  process.exitCode = 1;
} finally {
  await fs.writeFile(
    path.join(evidence, "pages-result.json"),
    JSON.stringify(result, null, 2),
  );
  await browser.close();
  if (server) await new Promise((resolve) => server.close(resolve));
}
