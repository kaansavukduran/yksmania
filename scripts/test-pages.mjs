import { counting040SmokeCases } from "./counting040-smoke-cases.mjs";
import { probabilityStatistics041SmokeCases } from "./probability-statistics041-smoke-cases.mjs";
import { runSource024OriginalSmoke } from "./source024-original-smoke.mjs";
import { forge038039SmokeCases, runForge038039SmokeCase } from "./forge038039-smoke-cases.mjs";
import { forge036037SmokeCases, runForge036037SmokeCase } from "./forge036037-smoke-cases.mjs";
import {
  forge034035SmokeCases,
  runForge034035SmokeCase,
} from "./forge034035-smoke-cases.mjs";
import {
  forge033SmokeCases,
  runForge033SmokeCase,
} from "./forge033-smoke-cases.mjs";
import {
  forge032SmokeCases,
  runForge032SmokeCase,
} from "./forge032-smoke-cases.mjs";
import {
  forge031SmokeCases,
  runForge031SmokeCase,
} from "./forge031-smoke-cases.mjs";
import {
  forge026SmokeCases,
  runForge026SmokeCase,
} from "./forge026-smoke-cases.mjs";
import {
  forge025SmokeCases,
  runForge025SmokeCase,
} from "./forge025-smoke-cases.mjs";
import {
  forge024SmokeCases,
  runForge024SmokeCase,
} from "./forge024-smoke-cases.mjs";
import {
  forge023SmokeCases,
  runForge023SmokeCase,
} from "./forge023-smoke-cases.mjs";
import {
  forge022SmokeCases,
  runForge022SmokeCase,
} from "./forge022-smoke-cases.mjs";
import {
  forge021SmokeCases,
  runForge021SmokeCase,
} from "./forge021-smoke-cases.mjs";
import {
  forge020SmokeCases,
  runForge020SmokeCase,
} from "./forge020-smoke-cases.mjs";
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
import { writeFileSync, appendFileSync } from "node:fs";
import { withinDeadline } from "./pages-deadline.mjs";
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
let lastStage = "initialization";
let acceptanceClosed = false;
const completedCases = [];
let result = { status: "INCOMPLETE" };
const progress = (stage, details = {}) => {
  lastStage = stage;
  const entry = {
    type: "pages-stage",
    at: new Date().toISOString(),
    stage,
    ...details,
  };
  appendFileSync(
    path.join(evidence, "pages-progress.ndjson"),
    JSON.stringify(entry) + "\n",
  );
  console.log(JSON.stringify(entry));
};
// Soft acceptance deadline leaves a full minute for bounded failure evidence/cleanup.
// This is the last fail-closed backstop, including pre-test setup and cleanup.
const hardStop = setTimeout(() => {
  result = {
    ...result,
    status: "FAIL",
    error: "PAGES_HARD_DEADLINE: 720000 ms",
    lastStage,
    cases: completedCases,
  };
  try {
    writeFileSync(
      path.join(evidence, "pages-result.json"),
      JSON.stringify(result, null, 2),
    );
  } catch (error) {
    console.error(String(error));
  }
  console.error(JSON.stringify(result));
  process.exit(1);
}, 12 * 60_000);
progress("server-setup");
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
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
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
progress("browser-launch");
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
});
progress("browser-context");
const context = await browser.newContext({
  locale: "tr-TR",
  hasTouch: true,
  viewport: { width: 1440, height: 1000 },
});
progress("browser-page");
const page = await context.newPage(),
  errors = [],
  cases = completedCases;
page.on("pageerror", (e) => errors.push(String(e)));
const pageDiagnostics = [];
const recordDiagnostic = (kind, data) => {
  pageDiagnostics.push({ kind, at: Date.now(), ...data });
  appendFileSync(
    path.join(evidence, "pages-diagnostics.ndjson"),
    JSON.stringify({ kind, at: Date.now(), stage: lastStage, ...data }) + "\n",
  );
  if (pageDiagnostics.length > 150) pageDiagnostics.shift();
};
context.on("response", (response) => {
  if (response.status() >= 400)
    recordDiagnostic("http-error", {
      path: new URL(response.url()).pathname,
      status: response.status(),
    });
});
context.on("requestfailed", (request) => {
  if (request.serviceWorker())
    recordDiagnostic("service-worker-request-failed", {
      path: new URL(request.url()).pathname,
      error: request.failure()?.errorText,
    });
});
page.on("requestfailed", (request) =>
  recordDiagnostic("request-failed", {
    path: new URL(request.url()).pathname,
    error: request.failure()?.errorText,
  }),
);
page.on("console", (message) => {
  if (message.type() === "error")
    recordDiagnostic("console-error", { text: message.text().slice(0, 1500) });
});
page.on("framenavigated", (frame) => {
  if (frame === page.mainFrame())
    recordDiagnostic("navigation", {
      path: new URL(frame.url()).pathname,
      hash: new URL(frame.url()).hash,
    });
});

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
        .getByRole("group", { name: "İncelenecek olay", exact: true })
        .getByRole("button")
        .nth(1)
        .click();
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
        .getByRole("group", { name: "İncelenecek olay", exact: true })
        .getByRole("button")
        .nth(1)
        .click();
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

const storedExploration = (key) => {
  progress("persistence:stored-exploration", { key });
  return withinDeadline("read stored exploration", 15_000, () =>
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
    ),
  );
};

result = { status: "INCOMPLETE", url: origin };
try {
  await withinDeadline("full Pages acceptance", 11 * 60_000, async () => {
    progress("normal-entry");
    expect(additionalFamilies).toHaveLength(6);
    await page.goto(origin);
    await expect(page.locator(".sidebar-version")).toContainText(
      expectedVersion,
    );
    progress("manifest-and-version");
    const manifestLink = await page
      .locator('link[rel="manifest"]')
      .getAttribute("href");
    const manifestUrl = new URL(manifestLink, origin);
    const manifest = await (await context.request.get(manifestUrl.href)).json();
    expect(new URL(manifest.start_url, manifestUrl).pathname).toBe(prefix);
    expect(new URL(manifest.scope, manifestUrl).pathname).toBe(prefix);
    for (const icon of manifest.icons)
      expect(
        (
          await context.request.get(new URL(icon.src, manifestUrl).href)
        ).status(),
      ).toBe(200);
    const versionResponse = await context.request.get(
      new URL("version.json", origin).href,
    );
    expect(versionResponse.status()).toBe(200);
    expect((await versionResponse.json()).version).toBe(expectedVersion);
    progress("service-worker:ready-and-control");
    const worker = await withinDeadline(
      "service-worker ready/control",
      125_000,
      () =>
        page.evaluate(async () => {
          const container = navigator.serviceWorker;
          if (!container) throw new Error("Service worker API unavailable");
          let registration;
          let observedRegistrations = [];
          let registrationReadError = null;
          let readPending = false;
          let finished = false;
          let cacheNames = "PENDING";
          let cacheReadError = null;
          // Observation only: do not open, populate, delete or replace any cache.
          if ("caches" in window)
            void caches.keys().then(
              (names) => {
                cacheNames = names;
              },
              (error) => {
                cacheReadError = String(error);
              },
            );
          const observedWorkers = new Map();
          const snapshot = () => ({
            controller: container.controller
              ? {
                  scriptURL: container.controller.scriptURL,
                  state: container.controller.state,
                }
              : null,
            registrations: observedRegistrations.map((reg) => ({
              scope: reg.scope,
              installing: reg.installing
                ? {
                    scriptURL: reg.installing.scriptURL,
                    state: reg.installing.state,
                  }
                : null,
              waiting: reg.waiting
                ? { scriptURL: reg.waiting.scriptURL, state: reg.waiting.state }
                : null,
              active: reg.active
                ? { scriptURL: reg.active.scriptURL, state: reg.active.state }
                : null,
            })),
            registrationReadError,
            cacheNames,
            cacheReadError,
            observedWorkers: [...observedWorkers].map(([worker, entry]) => ({
              scriptURL: worker.scriptURL,
              state: worker.state,
              states: entry.states,
            })),
          });
          let timer, poll, controllerListener;
          const observe = async () => {
            if (readPending) return;
            readPending = true;
            try {
              const registrations = await container.getRegistrations();
              if (finished) return;
              observedRegistrations = registrations;
              for (const reg of registrations)
                for (const worker of [
                  reg.installing,
                  reg.waiting,
                  reg.active,
                ]) {
                  if (!worker || observedWorkers.has(worker)) continue;
                  // Retain installing/redundant workers even if registration slots clear.
                  const entry = {
                    states: [{ at: Date.now(), state: worker.state }],
                  };
                  entry.listener = () =>
                    entry.states.push({ at: Date.now(), state: worker.state });
                  observedWorkers.set(worker, entry);
                  worker.addEventListener("statechange", entry.listener);
                }
            } catch (error) {
              registrationReadError = String(error);
            } finally {
              readPending = false;
            }
          };
          try {
            return await new Promise((resolve, reject) => {
              const check = () => {
                if (registration && container.controller)
                  resolve({
                    scope: registration.scope,
                    script: registration.active?.scriptURL,
                    controllerScript: container.controller.scriptURL,
                    diagnostics: snapshot(),
                  });
              };
              controllerListener = check;
              // Subscribe before checking to avoid a lost controllerchange transition.
              container.addEventListener("controllerchange", check);
              timer = setTimeout(
                () =>
                  reject(
                    new Error(
                      "SW_READY_CONTROL_TIMEOUT: " + JSON.stringify(snapshot()),
                    ),
                  ),
                120_000,
              );
              poll = setInterval(() => {
                void observe();
              }, 1000);
              void observe();
              container.ready.then((reg) => {
                registration = reg;
                check();
              }, reject);
              check();
            });
          } finally {
            finished = true;
            clearTimeout(timer);
            clearInterval(poll);
            for (const [worker, entry] of observedWorkers)
              worker.removeEventListener("statechange", entry.listener);
            container.removeEventListener(
              "controllerchange",
              controllerListener,
            );
          }
        }),
    );
    expect(new URL(worker.scope).pathname).toBe(prefix);
    expect(new URL(worker.script).pathname).toBe(prefix + "sw.js");
    progress("offline-entry");
    await context.setOffline(true);
    for (const unit of [...units, ...additionalFamilies]) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      await nav("Konu Anlatımı");
      await page
        .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
        .fill(unit.title);
      await page.locator(`.ready-topic[data-lesson-id="${unit.id}"]`).click();
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
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    // Existing model actions above establish a real durable state. New families
    // still open for the first time offline; never invent an empty IDB baseline.
    expect(forge014SmokeCases).toHaveLength(6);
    const forge014Snapshots = [];
    for (const unit of forge014SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge014Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge014SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }

    expect(forge015SmokeCases).toHaveLength(6);
    const forge015Snapshots = [];
    for (const unit of forge015SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge015Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge015SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(forge016SmokeCases).toHaveLength(6);
    const forge016Snapshots = [];
    for (const unit of forge016SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge016Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge016SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(forge017SmokeCases).toHaveLength(6);
    const forge017Snapshots = [];
    for (const unit of forge017SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge017Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge017SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(forge018SmokeCases).toHaveLength(6);
    const forge018Snapshots = [];
    for (const unit of forge018SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge018Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge018SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(forge019SmokeCases).toHaveLength(6);
    const forge019Snapshots = [];
    for (const unit of forge019SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge019Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge019SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(forge020SmokeCases).toHaveLength(5);
    const forge020Snapshots = [];
    for (const unit of forge020SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge020Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge020SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(forge021SmokeCases).toHaveLength(7);
    const forge021Snapshots = [];
    for (const unit of forge021SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge021Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge021SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(forge022SmokeCases).toHaveLength(6);
    const forge022Snapshots = [];
    for (const unit of forge022SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge022Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge022SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(forge023SmokeCases).toHaveLength(7);
    const forge023Snapshots = [];
    for (const unit of forge023SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge023Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge023SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }

    expect(forge024SmokeCases).toHaveLength(7);
    const forge024Snapshots = [];
    for (const unit of forge024SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge024Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge024SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }

    expect(forge025SmokeCases).toHaveLength(4);
    const forge025Snapshots = [];
    for (const unit of forge025SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge025Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge025SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(forge031SmokeCases).toHaveLength(6);
    const forge031Snapshots = [];
    for (const unit of forge031SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge031Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge031SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    // Append the eight032 flows while preserving the previous99 and final026 route.
    expect(forge032SmokeCases).toHaveLength(8);
    const forge032Snapshots = [];
    for (const unit of forge032SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge032Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge032SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }

    expect(forge033SmokeCases).toHaveLength(1);
    const forge033Snapshots = [];
    for (const unit of forge033SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge033Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge033SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }

    expect(forge026SmokeCases).toHaveLength(8);
    const forge026Snapshots = [];
    for (const unit of forge026SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge026Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge026SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    progress("all-model-cases:assert-108");
    expect(cases).toHaveLength(108);
    expect(new Set(cases).size).toBe(108);
    progress("question-feedback-and-persistence");
    await page
      .getByRole("button", { name: "Sorulara geç", exact: true })
      .click();
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
    const foundationState = () => {
      progress("persistence:foundation-state");
      return withinDeadline("read foundation state", 15_000, () =>
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
        ),
      );
    };
    const foundationLearning = (state) => ({
      sessions: state.sessions,
      reviews: state.reviews,
      topicProgress: state.topicProgress,
      theoryReviewCompletions: state.theoryReviewCompletions,
      unlocked: state.unlocked,
    });
    const learningBeforeFoundation = foundationLearning(
      await foundationState(),
    );
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
      const entry = page.locator(`.ready-topic[data-lesson-id="${item.id}"]`);
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
        await expect(page.locator(".question-passage")).toHaveText(
          item.passage,
        );
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
      await expect(page.locator(".feedback.correct strong")).toHaveText(
        "Doğru",
      );
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
      expect(foundationLearning(beforeReload)).toEqual(
        learningBeforeFoundation,
      );
      await page.reload();
      await expect(page.locator(".feedback.correct strong")).toHaveText(
        "Doğru",
      );
      await expect(page.locator(".feedback p")).toHaveText(feedback);
      await expect(page.locator(".answer").nth(item.answer)).toBeDisabled();
      const afterReload = await foundationState();
      expect(afterReload.draft).toEqual(beforeReload.draft);
      expect(foundationLearning(afterReload)).toEqual(learningBeforeFoundation);
      foundationRouteCases.push(item.id);
    }

    // Keep all earlier108 model flows and their original question-feedback path.
    // Source companions run only after that baseline has already passed unchanged.
    expect(forge034035SmokeCases).toHaveLength(2);
    const forge034035Snapshots = [];
    for (const unit of forge034035SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge034035Snapshots.push(
        await withinDeadline(`case ${unit.id}`, 120_000, () =>
          runForge034035SmokeCase(page, nav, unit),
        ),
      );
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(cases).toHaveLength(110);
    expect(new Set(cases).size).toBe(110);

    expect(forge036037SmokeCases).toHaveLength(2);
    const forge036037Snapshots = [];
    for (const unit of forge036037SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge036037Snapshots.push(await withinDeadline(`case ${unit.id}`, 120_000, () => runForge036037SmokeCase(page, nav, unit)));
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(cases).toHaveLength(112);
    expect(new Set(cases).size).toBe(112);

    expect(forge038039SmokeCases).toHaveLength(2);
    const forge038039Snapshots = [];
    for (const unit of forge038039SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      forge038039Snapshots.push(await withinDeadline(`case ${unit.id}`, 120_000, () => runForge038039SmokeCase(page, nav, unit)));
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(cases).toHaveLength(114);
    expect(new Set(cases).size).toBe(114);
    expect(counting040SmokeCases).toHaveLength(2);
    const counting040Snapshots = [];
    for (const unit of counting040SmokeCases) {
      progress("case:begin", { id: unit.id, completed: cases.length });
      counting040Snapshots.push(await withinDeadline(`case ${unit.id}`, 120_000, () =>
        runForge034035SmokeCase(page, nav, unit),
      ));
      cases.push(unit.id);
      progress("case:passed", { id: unit.id, completed: cases.length });
    }
    expect(cases).toHaveLength(116);
    expect(new Set(cases).size).toBe(116);
    expect(probabilityStatistics041SmokeCases).toHaveLength(2);
    const probabilityStatistics041Snapshots = [];
    for (const unit of probabilityStatistics041SmokeCases) {
      progress("case:begin", { id: unit.storedKey, completed: cases.length });
      probabilityStatistics041Snapshots.push(await withinDeadline(
        `case ${unit.storedKey}`, 120_000, () =>
          runForge034035SmokeCase(page, nav, unit),
      ));
      cases.push(unit.storedKey);
      progress("case:passed", { id: unit.storedKey, completed: cases.length });
    }
    expect(cases).toHaveLength(118);
    expect(new Set(cases).size).toBe(118);
    progress("original-source-questions:begin");
    const source024Original = await withinDeadline("six original OGM question images", 120_000, () => runSource024OriginalSmoke(page, nav));
    progress("original-source-questions:passed", { questions: source024Original.questionIds.length });
    progress("final-navigation-and-mobile");
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
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const sidebar = document.querySelector(".sidebar");
            const title = document.querySelector("main h1");
            if (!sidebar || !title) return false;
            const side = sidebar.getBoundingClientRect();
            const heading = title.getBoundingClientRect();
            return (
              sidebar.inert &&
              side.right <= 0.5 &&
              !document.querySelector(".menu-backdrop") &&
              heading.left >= 0 &&
              heading.right <= innerWidth &&
              document.documentElement.scrollWidth <= innerWidth
            );
          }),
        { timeout: 1500, intervals: [16, 32, 50] },
      )
      .toBe(true);
    await page.screenshot({
      path: path.join(evidence, "pages-mobile-offline.png"),
      fullPage: false,
    });
    expect(errors).toEqual([]);
    expect(missing.filter((p) => !p.endsWith("favicon.ico"))).toEqual([]);
    if (acceptanceClosed)
      throw new Error("Late completion after acceptance deadline");
    result = {
      status: "PASS",
      source024OriginalQuestionsOffline: source024Original,
      forge038039FamiliesOfflineHtmlStateAndReload: forge038039Snapshots.map((item) => item.id),
      counting040FamiliesOfflineHtmlStateAndReload: counting040Snapshots.map(({ id }) => id),
      probabilityStatistics041OfflineHtmlStateAndReload:
        probabilityStatistics041Snapshots.map(({ id }) => id),
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
      forge021FamiliesOfflineHtmlStateAndReload: forge021Snapshots.map(
        (item) => item.id,
      ),
      forge021ExplorationWithoutLearningCredit: "PASS",
      forge022FamiliesOfflineHtmlStateAndReload: forge022Snapshots.map(
        (item) => item.id,
      ),
      forge022ExplorationWithoutLearningCredit: "PASS",
      forge023FamiliesOfflineHtmlStateAndReload: forge023Snapshots.map(
        (item) => item.id,
      ),
      forge023ExplorationWithoutLearningCredit: "PASS",
      forge024FamiliesOfflineHtmlStateAndReload: forge024Snapshots.map(
        (item) => item.id,
      ),
      forge024ExplorationWithoutLearningCredit: "PASS",
      forge025FamiliesOfflineHtmlStateAndReload: forge025Snapshots.map(
        (item) => item.id,
      ),
      forge025ExplorationWithoutLearningCredit: "PASS",
      forge026FamiliesOfflineHtmlStateAndReload: forge026Snapshots.map(
        (item) => item.id,
      ),
      forge026ExplorationWithoutLearningCredit: "PASS",
      forge031FamiliesOfflineHtmlStateAndReload: forge031Snapshots.map(
        (item) => item.id,
      ),
      forge031ExplorationWithoutLearningCredit: "PASS",
      forge020FamiliesOfflineHtmlStateAndReload: forge020Snapshots.map(
        (item) => item.id,
      ),
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
      forge032FamiliesOfflineHtmlStateAndReload: forge032Snapshots.map(
        (item) => item.id,
      ),
      forge032ExplorationWithoutLearningCredit: "PASS",
      forge032NotesOfflineReload: "PASS",
      forge033FamiliesOfflineHtmlStateAndReload: forge033Snapshots.map(
        (item) => item.id,
      ),
      forge033ExplorationWithoutLearningCredit: "PASS",
      forge033NotesOfflineReload: "PASS",
      forge034035FamiliesOfflineHtmlStateAndReload: forge034035Snapshots.map(
        (item) => item.id,
      ),
      forge034035ExplorationWithoutLearningCredit: "PASS",
      forge034035NotesOfflineReload: "PASS",
      forge036037FamiliesOfflineHtmlStateAndReload: forge036037Snapshots.map((item) => item.id),
      forge036037ExplorationWithoutLearningCredit: "PASS",
      forge036037NotesOfflineReload: "PASS",
      questionFeedbackReload: "PASS",
      foundationQuestionRoutesOfflineReload: foundationRouteCases,
      navigation: "theory/cheatsheets/questions/exams/settings",
      rendererErrors: errors,
      missing,
    };
  });
  acceptanceClosed = true;
} catch (error) {
  acceptanceClosed = true;
  const failedStage = lastStage;
  progress("failure-evidence");
  result = {
    status: "FAIL",
    url: origin,
    error: String(error.stack || error),
    failedStage,
    rendererErrors: errors,
    cases,
    missing,
    diagnostics: pageDiagnostics,
    document: await withinDeadline("failure document snapshot", 3000, () =>
      page.evaluate(() => ({
        readyState: document.readyState,
        bodyHtml: document.body.innerHTML.slice(0, 5000),
        controlled: Boolean(navigator.serviceWorker.controller),
        scripts: [...document.scripts].map((s) => ({
          type: s.type,
          path: s.src ? new URL(s.src).pathname : "inline",
        })),
        resources: performance
          .getEntriesByType("resource")
          .slice(-20)
          .map((e) => ({
            path: new URL(e.name).pathname,
            duration: e.duration,
          })),
      })),
    ).catch((error) => ({ unavailable: String(error) })),
  };
  await withinDeadline("failure screenshot", 3000, () =>
    page.screenshot({
      path: path.join(evidence, "failure.png"),
      fullPage: false,
      timeout: 2500,
    }),
  ).catch(() => {});
  await fs.writeFile(
    path.join(evidence, "failure-dom.txt"),
    await withinDeadline("failure text", 3000, () =>
      page.locator("body").innerText({ timeout: 2500 }),
    ).catch((error) => `UNAVAILABLE: ${error}`),
  );
  console.error(JSON.stringify(result, null, 2));
  process.exitCode = 1;
} finally {
  let cleanupFailed = false;
  try {
    progress("cleanup:browser");
    await withinDeadline("browser cleanup", 10_000, () => browser.close());
  } catch (error) {
    cleanupFailed = true;
    result = {
      ...result,
      status: "FAIL",
      cleanupError: String(error),
      lastStage,
    };
    process.exitCode = 1;
  }
  try {
    if (server) {
      progress("cleanup:server");
      server.closeAllConnections?.();
      await withinDeadline(
        "server cleanup",
        3000,
        () =>
          new Promise((resolve, reject) =>
            server.close((error) => (error ? reject(error) : resolve())),
          ),
      );
    }
  } catch (error) {
    cleanupFailed = true;
    result = {
      ...result,
      status: "FAIL",
      serverCleanupError: String(error),
      lastStage,
    };
    process.exitCode = 1;
  }
  progress("final-result");
  // A cleanup failure also invalidates acceptance. Emit PASS only after cleanup.
  await withinDeadline("write final result", 3000, () =>
    fs.writeFile(
      path.join(evidence, "pages-result.json"),
      JSON.stringify(result, null, 2),
    ),
  );
  clearTimeout(hardStop);
  if (result.status === "PASS") console.log(JSON.stringify(result, null, 2));
  else {
    process.exitCode = 1;
    console.error(JSON.stringify(result, null, 2));
  }
  // Protocol cleanup failure cannot leave this node process waiting indefinitely.
  if (cleanupFailed) process.exit(1);
}
