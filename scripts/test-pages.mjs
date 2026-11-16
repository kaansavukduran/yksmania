import { forge021SmokeCases, runForge021SmokeCase } from "./forge021-smoke-cases.mjs";
import {forge020SmokeCases,runForge020SmokeCase} from "./forge020-smoke-cases.mjs";
import {
  forge019SmokeCases,
  runForge019SmokeCase,
} from "./forge019-smoke-cases.mjs";
import {
  forge018SmokeCases,
  runForge018SmokeCase,
} from "./forge018-smoke-cases.mjs";
import {
  forge017SmokeCases,
  runForge017SmokeCase,
} from "./forge017-smoke-cases.mjs";
import {
  forge016SmokeCases,
  runForge016SmokeCase,
} from "./forge016-smoke-cases.mjs";
import { createServer } from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium, expect } from "@playwright/test";
import {
  forge014SmokeCases,
  runForge014SmokeCase,
} from "./forge014-smoke-cases.mjs";

import {
  forge015SmokeCases,
  runForge015SmokeCase,
} from "./forge015-smoke-cases.mjs";

const expectedVersion = JSON.parse(
  await fs.readFile(new URL("../package.json", import.meta.url), "utf8"),
).version;
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
const additionalFamilies = [
  {
    id: "faiz-problemleri",
    selector: '[data-forge012="faiz-problemleri"]',
    title: "Faiz problemleri: parayı, oranı ve zamanı ayır",
    expected: "son tutar 6.050 TL",
    model: "svg",
    storedKey: "forge012-math-interest",
    persisted: { compound: true },
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "Faiz kuralı", exact: true })
        .selectOption("compound");
      await expect(lab.locator("[data-interest-point]")).toHaveCount(1);
    },
  },
  {
    id: "su-dalgalari",
    selector: '[data-forge012="su-dalgalari"]',
    title: "Su dalgaları: dalga cephesinden kırılmaya",
    expected: "Birinci λ: 10 cm · İkinci λ: 15 cm",
    model: "svg",
    storedKey: "forge012-physics-su-dalgalari",
    persisted: { speed2: 45 },
    async act(lab) {
      const speed = lab.getByRole("slider", {
        name: "İkinci bölge sürati (cm/s)",
        exact: true,
      });
      await speed.press("End");
      for (let i = 0; i < 15; i++) await speed.press("ArrowLeft");
      await expect(speed).toHaveValue("45");
      await expect(
        lab.locator('[data-water-ray="transmitted"]'),
      ).toHaveAttribute("d", /^M300 170L393\.75 /);
    },
  },
  {
    id: "katilar-viskozite",
    selector: '[data-forge012="katilar-viskozite"]',
    title: "Katılar ve viskozite: yapıdan akışa",
    expected: "20 mL aktı",
    model: "svg",
    storedKey: "forge012:chemistry:katilar-viskozite",
    persisted: { solid: "graphite", temperature: 40, elapsed: 45 },
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "Katı örneği", exact: true })
        .selectOption("graphite");
      await lab
        .getByRole("combobox", { name: "Deney sıcaklığı", exact: true })
        .selectOption("40");
      const time = lab.getByRole("slider", {
        name: "Geçen süre (s)",
        exact: true,
      });
      await time.press("Home");
      for (let i = 0; i < 9; i++) await time.press("ArrowRight");
      await expect(time).toHaveValue("45");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Grafit · Kovalent ağ",
      );
      await expect(lab.locator("[data-flow-volume]")).toHaveAttribute(
        "height",
        "85",
      );
    },
  },
  {
    id: "eseyli-ureme",
    selector: '[data-forge012="eseyli-ureme"]',
    title: "Eşeyli üreme: gametten zigota, zigottan gelişmeye",
    expected: "1 hücre; her hücrede 12 kromozom",
    model: "svg",
    storedKey: "forge012-bio-eseyli-ureme",
    persisted: { diploid: 12, stage: 2 },
    async act(lab) {
      const chromosomes = lab.getByRole("slider", {
        name: "Başlangıç kromozom sayısı (2n)",
        exact: true,
      });
      await chromosomes.press("Home");
      for (let i = 0; i < 4; i++) await chromosomes.press("ArrowRight");
      await expect(chromosomes).toHaveValue("12");
      await lab
        .getByRole("combobox", { name: "İzlenen olay", exact: true })
        .selectOption("2");
      await expect(lab.locator("[data-sexual-cell]")).toHaveCount(1);
      await expect(lab.locator("[data-chromosome]")).toHaveCount(12);
    },
  },
  {
    id: "edat-baglac-unlem",
    selector: '[data-forge012="edat-baglac-unlem"]',
    title: "Edat, bağlaç ve ünlem: cümlede görev ve anlam",
    expected: "Edat",
    model: ".grammar012-model",
    storedKey: "forge012-turkish:edat-baglac-unlem",
    persisted: { altered: true, show: true },
    async act(lab) {
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .click();
      await lab
        .getByRole("button", { name: "Kanıtı göster", exact: true })
        .click();
      await expect(lab.locator(".grammar012-sentence")).toHaveText(
        "Ada pense ile kabloyu kesti.",
      );
      await expect(lab.locator(".grammar012-evidence")).toContainText(
        "Neyle kesti? Pense ile.",
      );
    },
  },
  {
    id: "milli-mucadele",
    selector: '[data-forge012="milli-mucadele"]',
    title: "Millî Mücadele: yerel direnişten bağımsız devlete",
    expected: "Ortak yönetim millî hareketin bütününe yayılır.",
    model: "svg",
    storedKey: "forge012-history:milli-mucadele",
    persisted: { event: 1, step: 2 },
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "İncelenecek olay", exact: true })
        .selectOption("1");
      for (let i = 0; i < 2; i++)
        await lab
          .getByRole("button", { name: "Sonraki kanıt", exact: true })
          .click();
      await expect(
        lab.locator('[data-history012-selected="Sivas Kongresi"]'),
      ).toHaveCount(1);
      await expect(lab.locator("[data-history012-stage]")).toHaveCount(3);
      await expect(lab.locator("[data-history012-link]")).toHaveCount(2);
    },
  },
];

const storedExploration = (key) =>
  page.evaluate(
    (key) =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open("yksmania");
        request.onsuccess = () => {
          const db = request.result;
          const read = db
            .transaction("state")
            .objectStore("state")
            .get("current");
          read.onsuccess = () => {
            resolve(read.result?.explorations?.[key] ?? null);
            db.close();
          };
          read.onerror = () => {
            db.close();
            reject(read.error);
          };
        };
        request.onerror = () => reject(request.error);
      }),
    key,
  );

let result = { status: "INCOMPLETE", url: origin };
try {
  expect(additionalFamilies).toHaveLength(6);
  await page.goto(origin);
  await expect(page.locator(".sidebar-version")).toContainText(expectedVersion);
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
  expect((await versionResponse.json()).version).toBe(expectedVersion);
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
  for (const unit of [...units, ...additionalFamilies]) {
    await nav("Konu Anlatımı");
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(unit.title);
    await page.locator(".ready-topic").filter({ hasText: unit.title }).click();
    const lab = page.locator(unit.selector || `[data-forge011="${unit.id}"]`);
    await expect(lab).toBeVisible();
    const model = lab.locator(unit.model || "svg").first();
    const before = await model.innerHTML();
    await unit.act(lab);
    await expect(lab.locator("[data-model-result]")).toContainText(
      unit.text || unit.expected,
    );
    expect(await model.innerHTML()).not.toBe(before);
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    if (unit.storedKey)
      await expect
        .poll(() => storedExploration(unit.storedKey))
        .toMatchObject(unit.persisted);
    await page.reload();
    await expect(lab.locator("[data-model-result]")).toContainText(
      unit.text || unit.expected,
    );
    if (unit.storedKey)
      expect(await storedExploration(unit.storedKey)).toMatchObject(
        unit.persisted,
      );
    cases.push(unit.id);
  }
  // Existing model actions above establish a real durable state. New families
  // still open for the first time offline; never invent an empty IDB baseline.
  expect(forge014SmokeCases).toHaveLength(6);
  const forge014Snapshots = [];
  for (const unit of forge014SmokeCases) {
    forge014Snapshots.push(await runForge014SmokeCase(page, nav, unit));
    cases.push(unit.id);
  }

  expect(forge015SmokeCases).toHaveLength(6);
  const forge015Snapshots = [];
  for (const unit of forge015SmokeCases) {
    forge015Snapshots.push(await runForge015SmokeCase(page, nav, unit));
    cases.push(unit.id);
  }
  expect(forge016SmokeCases).toHaveLength(6);
  const forge016Snapshots = [];
  for (const unit of forge016SmokeCases) {
    forge016Snapshots.push(await runForge016SmokeCase(page, nav, unit));
    cases.push(unit.id);
  }
  expect(forge017SmokeCases).toHaveLength(6);
  const forge017Snapshots = [];
  for (const unit of forge017SmokeCases) {
    forge017Snapshots.push(await runForge017SmokeCase(page, nav, unit));
    cases.push(unit.id);
  }
  expect(forge018SmokeCases).toHaveLength(6);
  const forge018Snapshots = [];
  for (const unit of forge018SmokeCases) {
    forge018Snapshots.push(await runForge018SmokeCase(page, nav, unit));
    cases.push(unit.id);
  }
  expect(forge019SmokeCases).toHaveLength(6);
  const forge019Snapshots = [];
  for (const unit of forge019SmokeCases) {
    forge019Snapshots.push(await runForge019SmokeCase(page, nav, unit));
    cases.push(unit.id);
  }
  expect(forge020SmokeCases).toHaveLength(5);
  const forge020Snapshots=[];
  for(const unit of forge020SmokeCases){forge020Snapshots.push(await runForge020SmokeCase(page,nav,unit));cases.push(unit.id);}
  expect(forge021SmokeCases).toHaveLength(7);
  const forge021Snapshots=[];
  for(const unit of forge021SmokeCases){forge021Snapshots.push(await runForge021SmokeCase(page,nav,unit));cases.push(unit.id);}

  expect(cases).toHaveLength(61);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await expect(page.locator(".answer")).toHaveCount(5);
  await page.locator(".answer").first().click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await expect(page.locator(".feedback")).toBeVisible();
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          new Promise((resolve, reject) => {
            const request = indexedDB.open("yksmania");
            request.onsuccess = () => {
              const db = request.result;
              const record = db
                .transaction("state")
                .objectStore("state")
                .get("current");
              record.onsuccess = () => {
                db.close();
                resolve(record.result?.draft?.checked);
              };
              record.onerror = () => {
                db.close();
                reject(record.error);
              };
            };
            request.onerror = () => reject(request.error);
          }),
      ),
    )
    .toBe(true);
  await page.reload();
  await expect(page.locator(".feedback")).toBeVisible();

  // These two existing narratives now have built-in independent question sets.
  // Start them through the ordinary Questions search while already offline.
  const foundationRouteCases = [];
  const foundationState = () =>
    page.evaluate(
      () =>
        new Promise((resolve, reject) => {
          const request = indexedDB.open("yksmania");
          request.onsuccess = () => {
            const db = request.result;
            const read = db
              .transaction("state")
              .objectStore("state")
              .get("current");
            read.onsuccess = () => {
              const value = read.result;
              db.close();
              resolve(value);
            };
            read.onerror = () => {
              const error = read.error;
              db.close();
              reject(error);
            };
          };
          request.onerror = () => reject(request.error);
        }),
    );
  const foundationLearning = (state) => ({
    sessions: state.sessions,
    reviews: state.reviews,
    topicProgress: state.topicProgress,
    theoryReviewCompletions: state.theoryReviewCompletions,
    unlocked: state.unlocked,
  });
  const learningBeforeFoundation = foundationLearning(await foundationState());
  for (const item of [
    {
      id: "sayi-basamaklari",
      title: "Sayı basamakları: rakamdan koşullu denkleme",
      prompt:
        "Onluk sayı sisteminde 64027 sayısındaki 4 rakamının basamak değeri kaçtır?",
      correct: "4000",
      answer: 0,
    },
    {
      id: "tarih-zaman",
      title: "Tarih ve zaman: kanıtı sıraya koy",
      prompt:
        "İkinci ekibin çalışmasını doğrudan tarih araştırması yapan özellik hangisidir?",
      correct:
        "Doğa olayının insan toplulukları üzerindeki etkisini kaynaklarla incelemesi.",
      answer: 0,
      passage:
        "Bir araştırma ekibi bir depremin dalga hızını ölçüyor. Başka bir ekip aynı depremden sonra kasabanın boşalmasını, vergi kayıtlarını ve yeniden yerleşme kararlarını inceliyor.",
    },
  ]) {
    await nav("Sorular");
    await page.getByRole("button", { name: "TYT", exact: true }).click();
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(item.title);
    const entry = page.locator(".ready-topic").filter({ hasText: item.title });
    await expect(entry).toHaveCount(1);
    // Use the same in-app confirmation as learners on every platform. Opening
    // it must not alter the durable partial draft before explicit approval.
    const beforeReplacement = await foundationState();
    await entry.click();
    if (beforeReplacement.draft) {
      const confirmation = page.getByRole("dialog", {
        name: "Yarım kalan çalışmayı değiştirelim mi?",
        exact: true,
      });
      await expect(confirmation).toBeVisible();
      expect(await foundationState()).toEqual(beforeReplacement);
      await confirmation
        .getByRole("button", { name: "Yeni çalışmayı aç", exact: true })
        .click();
    }
    await expect(page.locator(".question-panel")).toBeVisible();
    await expect(page.locator(".question-panel h2")).toHaveText(item.prompt);
    await expect(page.locator(".question-meta")).toContainText("Soru 1 / 10");
    await expect
      .poll(async () => (await foundationState()).draft?.lessonId)
      .toBe(item.id);
    const { draft: previousDraft, ...beforeRest } = beforeReplacement;
    const { draft: replacementDraft, ...afterRest } = await foundationState();
    expect(afterRest).toEqual(beforeRest);
    await expect(page.locator(".answer")).toHaveCount(5);
    await expect(page.locator(".answer").nth(item.answer)).toContainText(
      item.correct,
    );
    if (item.passage) {
      await expect(page.locator(".question-passage")).toHaveText(item.passage);
      expect(
        await page.locator(".question-panel").evaluate((element) => {
          const passage = element.querySelector(".question-passage");
          const stem = element.querySelector("h2");
          return !!(
            passage.compareDocumentPosition(stem) &
            Node.DOCUMENT_POSITION_FOLLOWING
          );
        }),
      ).toBe(true);
    }
    await page.locator(".answer").nth(item.answer).click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await expect(page.locator(".feedback.correct strong")).toHaveText("Doğru");
    const feedback = await page.locator(".feedback p").innerText();
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    await expect
      .poll(async () => (await foundationState()).draft?.checked)
      .toBe(true);
    const beforeReload = await foundationState();
    expect(beforeReload.draft.lessonId).toBe(item.id);
    expect(beforeReload.draft.responses).toHaveLength(1);
    expect(beforeReload.draft.responses[0].questionId).toMatch(/^f013-/);
    expect(beforeReload.draft.responses[0].correct).toBe(true);
    expect(foundationLearning(beforeReload)).toEqual(learningBeforeFoundation);
    await page.reload();
    await expect(page.locator(".feedback.correct strong")).toHaveText("Doğru");
    await expect(page.locator(".feedback p")).toHaveText(feedback);
    await expect(page.locator(".answer").nth(item.answer)).toBeDisabled();
    const afterReload = await foundationState();
    expect(afterReload.draft).toEqual(beforeReload.draft);
    expect(foundationLearning(afterReload)).toEqual(learningBeforeFoundation);
    foundationRouteCases.push(item.id);
  }

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
    forge014FamiliesOfflineHtmlStateAndReload: forge014Snapshots.map(
      (item) => item.id,
    ),
    forge015FamiliesOfflineHtmlStateAndReload: forge015Snapshots.map(
      (item) => item.id,
    ),
    forge016FamiliesOfflineHtmlStateAndReload: forge016Snapshots.map(
      (item) => item.id,
    ),
    forge017FamiliesOfflineHtmlStateAndReload: forge017Snapshots.map(
      (item) => item.id,
    ),
    forge018FamiliesOfflineHtmlStateAndReload: forge018Snapshots.map(
      (item) => item.id,
    ),
    forge021FamiliesOfflineHtmlStateAndReload: forge021Snapshots.map(item=>item.id),
    forge021ExplorationWithoutLearningCredit: "PASS",
    forge020FamiliesOfflineHtmlStateAndReload: forge020Snapshots.map(item=>item.id),
    forge020ExplorationWithoutLearningCredit: "PASS",
    forge019FamiliesOfflineHtmlStateAndReload: forge019Snapshots.map(
      (item) => item.id,
    ),
    forge019ExplorationWithoutLearningCredit: "PASS",
    forge018ExplorationWithoutLearningCredit: "PASS",
    forge017ExplorationWithoutLearningCredit: "PASS",
    forge016ExplorationWithoutLearningCredit: "PASS",
    forge015ExplorationWithoutLearningCredit: "PASS",
    forge014ExplorationWithoutLearningCredit: "PASS",
    questionFeedbackReload: "PASS",
    foundationQuestionRoutesOfflineReload: foundationRouteCases,
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
