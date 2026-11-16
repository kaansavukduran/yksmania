import {
  forge023SmokeCases,
  runForge023SmokeCase,
  assertForge023ProcessRestart,
} from "./forge023-smoke-cases.mjs";
import {
  forge022SmokeCases,
  runForge022SmokeCase,
  assertForge022ProcessRestart,
} from "./forge022-smoke-cases.mjs";
import {
  forge021SmokeCases,
  runForge021SmokeCase,
  assertForge021ProcessRestart,
} from "./forge021-smoke-cases.mjs";
import {
  forge020SmokeCases,
  runForge020SmokeCase,
  assertForge020ProcessRestart,
} from "./forge020-smoke-cases.mjs";
import {
  forge019SmokeCases,
  runForge019SmokeCase,
  assertForge019ProcessRestart,
} from "./forge019-smoke-cases.mjs";
import {
  forge018SmokeCases,
  runForge018SmokeCase,
  assertForge018ProcessRestart,
} from "./forge018-smoke-cases.mjs";
import {
  forge017SmokeCases,
  runForge017SmokeCase,
  assertForge017ProcessRestart,
} from "./forge017-smoke-cases.mjs";
import {
  forge016SmokeCases,
  runForge016SmokeCase,
  assertForge016ProcessRestart,
} from "./forge016-smoke-cases.mjs";
import { _electron, expect } from "@playwright/test";
import path from "node:path";
import {
  forge014SmokeCases,
  runForge014SmokeCase,
  assertForge014ProcessRestart,
} from "./forge014-smoke-cases.mjs";
import {
  forge015SmokeCases,
  runForge015SmokeCase,
  assertForge015ProcessRestart,
} from "./forge015-smoke-cases.mjs";
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
  const storedTimer = () =>
    page.evaluate(
      () =>
        new Promise((resolve, reject) => {
          const request = indexedDB.open("yksmania");
          request.onsuccess = () => {
            const db = request.result,
              read = db
                .transaction("state")
                .objectStore("state")
                .get("current");
            read.onsuccess = () => {
              resolve(read.result.focusTimer);
              db.close();
            };
            read.onerror = () => reject(read.error);
          };
          request.onerror = () => reject(request.error);
        }),
    );
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.waitForSelector(".hero");
  await page.context().setOffline(true);
  const navigate = async (name) => {
    await expect(page.locator(".sidebar")).toBeAttached();
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
  const newSourceUnits = [
    {
      id: "uslu-sayilar",
      title: "Üslü sayılar: işaret",
      expected: "= -1",
      async act(lab) {
        const exponent = lab.getByRole("slider", {
          name: "Tam sayı üs",
          exact: true,
        });
        await exponent.press("Home");
        for (let i = 0; i < 3; i++) await exponent.press("ArrowRight");
        await lab
          .getByRole("checkbox", {
            name: "Eksi işaretini tabanın parantezine al",
            exact: true,
          })
          .uncheck();
        await expect(
          lab.locator("svg text").filter({ hasText: /^-1$/ }),
        ).toHaveCount(1);
      },
    },
    {
      id: "elektrik-akimi",
      title: "Elektrik akımı",
      expected: "12 A",
      async act(lab) {
        await lab
          .getByRole("combobox", {
            name: "Dirençlerin bağlantısı",
            exact: true,
          })
          .selectOption("parallel");
        await lab
          .getByRole("spinbutton", {
            name: "Kaynak gerilimi (V), sayıyla",
            exact: true,
          })
          .fill("24");
        await expect(lab.locator("[data-model-result]")).toContainText(
          "Kaynak gücü = 288 W",
        );
      },
    },
    {
      id: "kovalent-bag-polar-apolar",
      title: "Kovalent bağ: ortaklaşma",
      expected: "Apolar",
      async act(lab) {
        await lab.getByLabel("Bağ örneği", { exact: true }).selectOption("n2");
        await lab
          .getByRole("button", { name: "Sonraki bağ adımı", exact: true })
          .click();
        await lab
          .getByRole("button", { name: "Sonraki bağ adımı", exact: true })
          .click();
      },
    },
    {
      id: "hucre-zarinda-madde-alisverisleri",
      title: "Hücre zarında madde alışverişleri",
      expected: "Net geçiş yok",
      async act(lab) {
        await lab
          .getByRole("combobox", { name: "İzlenen madde", exact: true })
          .selectOption("sodium");
        await lab
          .getByRole("combobox", { name: "Taşıma düzeni", exact: true })
          .selectOption("active");
        await expect(lab.locator(".f093-bio-channel")).toHaveCount(0);
        await lab
          .getByRole("checkbox", {
            name: "Uygun taşıma proteini mevcut",
            exact: true,
          })
          .check();
        await lab
          .getByRole("checkbox", { name: "ATP kaynağı açık", exact: true })
          .uncheck();
      },
    },
    {
      id: "isimler-isim-tamlamasi",
      title: "İsimler ve isim tamlaması",
      expected: "Zincirleme isim tamlaması",
      async act(lab) {
        await lab
          .getByRole("checkbox", { name: "İlgi ekini ekle", exact: true })
          .check();
        await lab
          .getByRole("checkbox", { name: "İç tamlama kur", exact: true })
          .check();
        await lab
          .getByRole("radio", { name: "Zincirleme", exact: true })
          .check();
        await lab
          .getByRole("textbox", { name: "Cümleden kanıtın", exact: true })
          .fill("Bahçe kapısı iç tamlaması okulun sözcüğüne bağlanır.");
        await lab
          .getByRole("button", { name: "Yanıtı denetle", exact: true })
          .click();
      },
    },
    {
      id: "sultan-osmanli-merkez-teskilati",
      title: "Sultan ve Osmanlı Merkez Teşkilatı",
      expected: "Gelir–gider → defterdar → kalemiye",
      async act(lab) {
        await lab
          .getByRole("combobox", { name: "İncelenecek durum", exact: true })
          .selectOption("1");
        await lab
          .getByRole("radio", { name: "Defterdar", exact: true })
          .check();
        await lab
          .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
          .click();
      },
    },
  ];
  for (const unit of newSourceUnits) {
    await navigate("Konu Anlatımı");
    await page.getByRole("button", { name: "TYT", exact: true }).click();
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(unit.title);
    await page.locator(".ready-topic").filter({ hasText: unit.title }).click();
    const lab = page.locator(`[data-forge093="${unit.id}"]`);
    await expect(lab).toBeVisible();
    await unit.act(lab);
    await expect(lab.locator("[data-model-result]")).toContainText(
      unit.expected,
    );
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    await page.reload();
    await expect(lab.locator("[data-model-result]")).toContainText(
      unit.expected,
    );
  }

  const continuationFamilies = [
    {
      id: "sayi-problemleri",
      title: "Sayı problemleri: cümleden modele",
      expected: "ikinci düzen 1 fazla",
      model: "svg.f011m-diagram",
      async act(lab) {
        const rows = lab.getByRole("slider", {
          name: "Toplam sıra sayısı",
          exact: true,
        });
        await rows.press("ArrowRight");
        await expect(rows).toHaveValue("9");
      },
    },
    {
      id: "basinc",
      title: "Basınç: kuvvetten akışkan dengesine",
      expected: "Basınç: 60.000 Pa",
      model: "svg",
      async act(lab) {
        await lab
          .getByRole("spinbutton", {
            name: "Dik kuvvet (N), sayıyla",
            exact: true,
          })
          .fill("120");
      },
    },
    {
      id: "zayif-etkilesimler",
      title: "Zayıf etkileşimler",
      expected: "İyon–dipol",
      model: "svg",
      async act(lab) {
        await lab
          .getByRole("combobox", { name: "Birinci tanecik", exact: true })
          .selectOption("sodium");
        await lab
          .getByRole("combobox", { name: "İkinci tanecik", exact: true })
          .selectOption("water");
      },
    },
    {
      id: "virusler",
      title: "Virüsler: yapı, konak ve çoğalma",
      expected: "Çıkış gerçekleşti.",
      model: "svg",
      async act(lab) {
        await lab
          .getByRole("combobox", { name: "Çoğalma basamağı", exact: true })
          .selectOption("4");
        await expect(lab.locator("svg [data-new-virion]")).toHaveCount(3);
      },
    },
    {
      id: "mitoz",
      title: "Mitoz: kopyala, ayır ve say",
      expected: "Sitokinez tamamlandı · 2 ayrı hücre",
      model: "svg",
      async act(lab) {
        await lab
          .getByRole("combobox", { name: "İncelenen evre", exact: true })
          .selectOption("6");
        await expect(lab.locator("[data-model-result]")).toContainText(
          "4 kromozom, 4 çekirdek DNA molekülü ve 2C DNA miktarı",
        );
      },
    },
    {
      id: "zarflar",
      title: "Zarflar: sözcükten sözcüğe anlam bağlantıları",
      expected: "Sıfat",
      model: ".adverb011-diagram",
      async act(lab) {
        await lab
          .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
          .click();
        await lab
          .getByRole("button", { name: "Bağlantıyı göster", exact: true })
          .click();
        await expect(lab.locator(".adverb011-sentence")).toContainText("Sakin");
      },
    },
    {
      id: "devrimler-caginda-devlet-toplum",
      title: "Devrimler Çağında Değişen Devlet ve Toplum",
      expected:
        "1839 Tanzimat: hukuk güvenliği ve düzen ilkeleri; henüz seçimli meclis değildir.",
      model: "svg[data-history-diagram]",
      async act(lab) {
        await lab
          .getByRole("combobox", { name: "İncelenecek olay", exact: true })
          .selectOption("1");
        await lab
          .getByRole("button", { name: "Sonraki bağlantı", exact: true })
          .click();
        await lab
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
  expect(continuationFamilies).toHaveLength(7);
  expect(additionalFamilies).toHaveLength(6);
  for (const unit of [...continuationFamilies, ...additionalFamilies]) {
    // The context is already offline: this is the first visit to every new lazy family.
    await navigate("Konu Anlatımı");
    await page.getByRole("button", { name: "TYT", exact: true }).click();
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(unit.title);
    await page.locator(".ready-topic").filter({ hasText: unit.title }).click();
    const lab = page.locator(unit.selector || `[data-forge011="${unit.id}"]`);
    await expect(lab).toBeVisible();
    await expect(lab.locator(unit.model).first()).toBeVisible();
    const modelBefore = await lab
      .locator(unit.model)
      .evaluateAll((elements) =>
        elements.map((element) => element.outerHTML).join(""),
      );
    await unit.act(lab);
    await expect(lab.locator("[data-model-result]")).toContainText(
      unit.expected,
    );
    await expect
      .poll(() =>
        lab
          .locator(unit.model)
          .evaluateAll((elements) =>
            elements.map((element) => element.outerHTML).join(""),
          ),
      )
      .not.toBe(modelBefore);
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    if (unit.storedKey)
      await expect
        .poll(() => storedExploration(unit.storedKey))
        .toMatchObject(unit.persisted);
    await page.reload();
    await expect(lab.locator("[data-model-result]")).toContainText(
      unit.expected,
    );
    await expect(lab.locator(unit.model).first()).toBeVisible();
    if (unit.storedKey)
      expect(await storedExploration(unit.storedKey)).toMatchObject(
        unit.persisted,
      );
  }

  // Keep every earlier offline family flow above intact; add the six 0.14 families.
  expect(forge014SmokeCases).toHaveLength(6);
  const forge014Snapshots = [];
  for (const unit of forge014SmokeCases)
    forge014Snapshots.push(await runForge014SmokeCase(page, navigate, unit));

  expect(forge015SmokeCases).toHaveLength(6);
  const forge015Snapshots = [];
  for (const unit of forge015SmokeCases)
    forge015Snapshots.push(await runForge015SmokeCase(page, navigate, unit));

  expect(forge016SmokeCases).toHaveLength(6);
  const forge016Snapshots = [];
  for (const unit of forge016SmokeCases)
    forge016Snapshots.push(await runForge016SmokeCase(page, navigate, unit));

  expect(forge017SmokeCases).toHaveLength(6);
  const forge017Snapshots = [];
  for (const unit of forge017SmokeCases)
    forge017Snapshots.push(await runForge017SmokeCase(page, navigate, unit));

  expect(forge018SmokeCases).toHaveLength(6);
  const forge018Snapshots = [];
  for (const unit of forge018SmokeCases) {
    forge018Snapshots.push(await runForge018SmokeCase(page, navigate, unit));
  }
  expect(forge019SmokeCases).toHaveLength(6);
  const forge019Snapshots = [];
  for (const unit of forge019SmokeCases) {
    forge019Snapshots.push(await runForge019SmokeCase(page, navigate, unit));
  }
  expect(forge020SmokeCases).toHaveLength(5);
  const forge020Snapshots = [];
  for (const unit of forge020SmokeCases)
    forge020Snapshots.push(await runForge020SmokeCase(page, navigate, unit));
  expect(forge021SmokeCases).toHaveLength(7);
  const forge021Snapshots = [];
  for (const unit of forge021SmokeCases)
    forge021Snapshots.push(await runForge021SmokeCase(page, navigate, unit));
  expect(forge022SmokeCases).toHaveLength(6);
  const forge022Snapshots = [];
  for (const unit of forge022SmokeCases)
    forge022Snapshots.push(await runForge022SmokeCase(page, navigate, unit));
  expect(forge023SmokeCases).toHaveLength(7);
  const forge023Snapshots = [];
  for (const unit of forge023SmokeCases)
    forge023Snapshots.push(await runForge023SmokeCase(page, navigate, unit));

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
  await navigate("Konu Anlatımı");
  await page.getByRole("button", { name: /Biyoloji.*18/ }).click();
  await page
    .getByRole("button", { name: /Hücre organelleri: yapı ve görev/ })
    .click();
  await expect(
    page.locator(".topic-cheatsheet,.cheatsheet-toggle"),
  ).toHaveCount(0);
  const openSheet = async (title) => {
    await navigate("Kopya Kağıtları");
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(title);
    await page
      .locator(".cheatsheet-topic")
      .filter({ hasText: title })
      .first()
      .click();
    await expect(page.locator(".cheat-reader")).toBeVisible();
  };
  await openSheet("Hücre Organelleri");
  await expect(page.locator(".cheat-reader")).toContainText(/ribozom/i);
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Masaüstü kağıt notum korunmalı.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.reload();
  await openSheet("Hücre Organelleri");
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Masaüstü kağıt notum korunmalı.");
  await expect(page.locator('input[accept*="pdf"]')).toHaveCount(0);
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
  await page.getByRole("button", { name: /Rasyonel sayılar.*45/ }).click();
  await page.waitForSelector(".visual-lab");
  const example = page.locator(".worked-example").first();
  await example.locator("summary").click();
  await example
    .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
    .click();
  await expect(example.locator(".worked-conclusion")).toContainText("1/4");
  await page.getByRole("slider", { name: /^Payda:/ }).fill("3");
  await expect(page.locator(".compact-lab .area-result")).toContainText(
    "1/3 ≈ 0,333",
  );
  await page.locator(".lesson-article > .primary").click();
  for (const index of [1, 2, 0, 1, 1]) {
    await page.locator(".answer").nth(index).click();
    await page.locator(".question-actions .primary").click();
    await page.locator(".question-actions .primary").click();
  }
  await expect(page.locator(".result-stats")).toContainText("5/5");
  const past = page.getByRole("region", {
    name: "Bu konunun geçmiş ÖSYM soruları",
    exact: true,
  });
  await expect(past).toContainText("2021 TYT · Temel Matematik · Soru 1");
  await past.getByLabel("Sınav", { exact: true }).selectOption("DGS");
  await expect(past).toContainText("2026 DGS · Sayısal · Soru 1");
  await past.getByLabel("Sınav", { exact: true }).selectOption("all");
  await page.screenshot({ path: path.resolve("../work/desktop-result.png") });
  await page.reload();
  await expect(page.locator(".result-stats")).toContainText("5/5");
  await app.close();
  app = await launch();
  page = await app.firstWindow();
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.waitForSelector(".hero");
  // Reopen saved 0.14 models in this same real profile after the native restart.
  await page.context().setOffline(true);
  await assertForge014ProcessRestart(page, navigate, forge014Snapshots);
  await assertForge015ProcessRestart(page, navigate, forge015Snapshots);
  await assertForge016ProcessRestart(page, navigate, forge016Snapshots);
  await assertForge017ProcessRestart(page, navigate, forge017Snapshots);
  await assertForge018ProcessRestart(page, navigate, forge018Snapshots);
  await assertForge019ProcessRestart(page, navigate, forge019Snapshots);
  await assertForge020ProcessRestart(page, navigate, forge020Snapshots);
  await assertForge021ProcessRestart(page, navigate, forge021Snapshots);
  await assertForge022ProcessRestart(page, navigate, forge022Snapshots);
  await assertForge023ProcessRestart(page, navigate, forge023Snapshots);
  await navigate("Bugün");
  await expect(page.locator(".stat-number").first()).toHaveText("1");
  const dailyTheory = page
    .getByRole("region", { name: "Konu planı", exact: true })
    .getByRole("list", { name: "Bugünün konuları", exact: true });
  await expect(
    dailyTheory.locator("li").filter({ hasText: "Simyadan kimyaya" }),
  ).toContainText("Konu tamamlandı");
  const rationalRow = dailyTheory
    .locator("li")
    .filter({ hasText: "Rasyonel Sayılar" });
  await expect(rationalRow).toContainText("5 soruda 5 doğru · 0 yanlış");
  await rationalRow
    .getByRole("button", { name: "Sonucu gör", exact: true })
    .click();
  await expect(page.locator(".result-stats")).toContainText("5/5");

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
  await navigate("Konu Anlatımı");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("Bölme ve bölünebilme:");
  await page
    .getByRole("button", { name: /Bölme ve bölünebilme: gruplar/ })
    .click();
  await page
    .getByRole("spinbutton", {
      name: "Bölünen nesne sayısı, sayıyla",
      exact: true,
    })
    .fill("29");
  await page
    .getByRole("spinbutton", {
      name: "Bir gruptaki nesne sayısı, sayıyla",
      exact: true,
    })
    .fill("6");
  await expect(page.locator(".model-result")).toContainText("29 = 6 × 4 + 5");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.reload();
  await expect(page.locator(".model-result")).toContainText("29 = 6 × 4 + 5");
  for (const [title, expected] of [
    [/Birinci dereceden denklemler: eşitliği koru/, "Çözüm: x=3"],
    [/Basit eşitsizlikler: yön/, "x > −3"],
  ]) {
    await navigate("Konu Anlatımı");
    await page.getByRole("button", { name: /Matematik.*31 konu/ }).click();
    await page.getByRole("button", { name: title }).click();
    const lab = page.locator(".algebra-lab");
    if (expected === "Çözüm: x=3") {
      await lab
        .getByRole("button", {
          name: "Sabit terimi iki taraftan çıkar",
          exact: true,
        })
        .click();
      await lab
        .getByRole("button", { name: "İki tarafı a’ya böl", exact: true })
        .click();
    }
    await expect(lab.locator(".algebra-result")).toContainText(expected);
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    await page.reload();
    await expect(lab.locator(".algebra-result")).toContainText(expected);
  }
  await navigate("Sorular");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page.getByRole("button", { name: /Türkçe.*22 konu/ }).click();
  await page
    .getByRole("button", { name: /Paragrafta ana düşünce.*5 özgün soru/ })
    .click();
  const passage =
    "Bir kitabı bitirmek, onu anlamakla aynı şey değildir. Okur bazen bir sayfada durup kendi sorularını kurduğunda metinle daha güçlü bir ilişki kurar. Okumanın değeri, yalnız çevrilen sayfalarda değil, kurulan düşüncelerde de aranmalıdır.";
  const paragraphText = () =>
    page.getByRole("region", { name: "Sorunun metni", exact: true });
  await expect(paragraphText()).toHaveText(passage);
  await page.locator(".answer").first().click();
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Paragraf taslağı korunmalı.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page
    .getByRole("button", { name: "Kum saati süre ayarları", exact: true })
    .click();
  await page.getByRole("button", { name: "20 dakika", exact: true }).click();
  await page
    .getByRole("button", {
      name: "Kum saatini ters çevir ve başlat",
      exact: true,
    })
    .click();
  await expect(page.locator(".hourglass-state")).toHaveText("Kum akıyor");
  await expect(page.locator(".hourglass-time")).not.toHaveText("20:00");
  const runningTimerBeforeRestart = await storedTimer();
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await app.close();
  app = await launch();
  page = await app.firstWindow();
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.context().setOffline(true);
  await page.waitForSelector(".hero");
  await page
    .getByRole("button", { name: "Kaldığın yerden devam et", exact: true })
    .click();
  await expect(paragraphText()).toHaveText(passage);
  await expect(page.locator(".answer").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Paragraf taslağı korunmalı.");
  await expect(page.locator(".hourglass-state")).toHaveText("Kum akıyor");
  expect(await storedTimer()).toEqual(runningTimerBeforeRestart);
  await page.getByRole("button", { name: "Durdur", exact: true }).click();
  await expect(page.locator(".hourglass-state")).toHaveText("Duraklatıldı");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  const timerRemaining = await page.locator(".hourglass-time").innerText();
  expect(timerRemaining).toMatch(/^19:/);
  await page.reload();
  await expect(page.locator(".hourglass-time")).toHaveText(timerRemaining);
  await expect(page.locator(".hourglass-state")).toHaveText("Duraklatıldı");
  for (const [i, index] of [0, 2, 0, 1, 0].entries()) {
    await expect(paragraphText()).toHaveText(passage);
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
  await navigate("Sınavlar");
  await page
    .getByRole("button", { name: "Başlat: TYT karma denemesi", exact: true })
    .click();
  await expect(page.locator(".exam-runner")).toBeVisible();
  await page.locator(".exam-answer").first().click();
  await expect(page.locator(".exam-answer").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const savedExam = await page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const r = indexedDB.open("yksmania");
        r.onsuccess = () => {
          const db = r.result,
            q = db.transaction("state").objectStore("state").get("current");
          q.onsuccess = () => {
            resolve(q.result.examDraft);
            db.close();
          };
          q.onerror = () => reject(q.error);
        };
        r.onerror = () => reject(r.error);
      }),
  );
  await app.close();
  app = await launch();
  page = await app.firstWindow();
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.waitForSelector(".hero");
  await page.context().setOffline(true);
  await navigate("Sınavlar");
  await expect(page.locator(".exam-answer").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const resumedExam = await page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const r = indexedDB.open("yksmania");
        r.onsuccess = () => {
          const db = r.result,
            q = db.transaction("state").objectStore("state").get("current");
          q.onsuccess = () => {
            resolve(q.result.examDraft);
            db.close();
          };
          q.onerror = () => reject(q.error);
        };
        r.onerror = () => reject(r.error);
      }),
  );
  expect(resumedExam).toEqual(savedExam);
  await page
    .getByRole("button", { name: "Denemeyi bitir", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Bitir ve sonucu gör", exact: true })
    .click();
  await expect(page.locator(".exam-results")).toBeVisible();
  await expect(page.locator(".exam-score-summary")).toContainText("Boş");
  await navigate("Ayarlar");
  await page
    .getByRole("button", { name: "İlerlemeyi sıfırla", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Vazgeç", exact: true })
    .click();
  await page
    .getByRole("button", { name: "İlerlemeyi sıfırla", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Evet, ilerlemeyi sıfırla", exact: true })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.reload();
  await navigate("Bugün");
  await expect(page.locator(".stat-number").first()).toHaveText("0");
  await expect(
    page.getByRole("region", { name: "Konu planı", exact: true }),
  ).toContainText("0/479");
  await openSheet("Hücre Organelleri");
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Masaüstü kağıt notum korunmalı.");
  await navigate("Sınavlar");
  await expect(page.locator(".exam-runner")).toHaveCount(0);
  await expect(page.locator(".exam-history")).toContainText(
    "İlk denemeni bitirdiğinde",
  );

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
  const beforeFoundation = await foundationState();
  expect(beforeFoundation.draft).toBeNull();
  const learningBeforeFoundation = foundationLearning(beforeFoundation);
  const openFoundation = async (title) => {
    await navigate("Sorular");
    await page.getByRole("button", { name: "TYT", exact: true }).click();
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(title);
    const entry = page.locator(".ready-topic").filter({ hasText: title });
    await expect(entry).toHaveCount(1);
    await entry.click();
  };
  // Keep the same real Electron process/profile for both new banks and all old
  // flows. Cancellation and confirmation use the application dialog, without a
  // native dialog stub or an IDB seed.
  await openFoundation("Sayı basamakları: rakamdan koşullu denkleme");
  await expect(page.locator(".question-panel h2")).toHaveText(
    "Onluk sayı sisteminde 64027 sayısındaki 4 rakamının basamak değeri kaçtır?",
  );
  await expect(page.locator(".answer")).toHaveCount(5);
  await expect(page.locator(".answer").first()).toContainText("4000");
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Masaüstü notum: rakamın sayı değeri ile basamak değerini ayırırım.");
  await page.locator(".answer").nth(1).click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await expect(page.locator(".feedback.repair")).toBeVisible();
  const mathFeedback = await page.locator(".feedback p").innerText();
  await expect
    .poll(async () => (await foundationState()).draft?.checked)
    .toBe(true);
  const beforeMathReload = await foundationState();
  expect(beforeMathReload.draft.lessonId).toBe("sayi-basamaklari");
  expect(beforeMathReload.draft.responses).toHaveLength(1);
  expect(beforeMathReload.draft.responses[0].correct).toBe(false);
  expect(foundationLearning(beforeMathReload)).toEqual(
    learningBeforeFoundation,
  );
  await page.reload();
  await expect(page.locator(".feedback p")).toHaveText(mathFeedback);
  await expect(page.locator(".answer").nth(1)).toBeDisabled();
  expect(await foundationState()).toEqual(beforeMathReload);
  foundationRouteCases.push("sayi-basamaklari");
  const historyTitle = "Tarih ve zaman: kanıtı sıraya koy";
  await openFoundation(historyTitle);
  const replacement = page.getByRole("dialog", {
    name: "Yarım kalan çalışmayı değiştirelim mi?",
    exact: true,
  });
  await expect(replacement).toBeVisible();
  await expect(
    replacement.getByRole("button", { name: "Vazgeç", exact: true }),
  ).toBeFocused();
  expect(await foundationState()).toEqual(beforeMathReload);
  await page.screenshot({
    path: path.join(profile, "foundation-draft-cancel-dialog.png"),
  });
  await replacement
    .getByRole("button", { name: "Vazgeç", exact: true })
    .click();
  await expect(replacement).not.toBeVisible();
  expect(await foundationState()).toEqual(beforeMathReload);
  await navigate("Bugün");
  await page
    .getByRole("button", { name: "Kaldığın yerden devam et", exact: true })
    .click();
  await expect(page.locator(".feedback p")).toHaveText(mathFeedback);
  await expect(page.locator(".answer").nth(1)).toBeDisabled();
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue(beforeMathReload.draft.note);
  await openFoundation(historyTitle);
  await expect(replacement).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(replacement).not.toBeVisible();
  expect(await foundationState()).toEqual(beforeMathReload);
  await openFoundation(historyTitle);
  await expect(replacement).toBeVisible();
  await replacement
    .getByRole("button", { name: "Yeni çalışmayı aç", exact: true })
    .click();
  await expect(page.locator(".question-panel h2")).toHaveText(
    "İkinci ekibin çalışmasını doğrudan tarih araştırması yapan özellik hangisidir?",
  );
  const foundationPassage =
    "Bir araştırma ekibi bir depremin dalga hızını ölçüyor. Başka bir ekip aynı depremden sonra kasabanın boşalmasını, vergi kayıtlarını ve yeniden yerleşme kararlarını inceliyor.";
  await expect(page.locator(".question-passage")).toHaveText(foundationPassage);
  expect(
    await page.locator(".question-panel").evaluate((element) => {
      const text = element.querySelector(".question-passage");
      return !!(
        text.compareDocumentPosition(element.querySelector("h2")) &
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    }),
  ).toBe(true);
  await expect
    .poll(async () => (await foundationState()).draft?.lessonId)
    .toBe("tarih-zaman");
  const replaced = await foundationState();
  const { draft: oldDraft, ...oldRest } = beforeMathReload;
  const { draft: newDraft, ...newRest } = replaced;
  expect(newRest).toEqual(oldRest);
  expect(newDraft).toMatchObject({
    lessonId: "tarih-zaman",
    index: 0,
    selected: null,
    checked: false,
    responses: [],
  });
  await page.locator(".answer").first().click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await expect(page.locator(".feedback.correct strong")).toHaveText("Doğru");
  await expect
    .poll(async () => (await foundationState()).draft?.checked)
    .toBe(true);
  const savedHistory = await foundationState();
  expect(savedHistory.draft.responses[0].questionId).toMatch(/^f013-/);
  expect(foundationLearning(savedHistory)).toEqual(learningBeforeFoundation);
  const historyFeedback = await page.locator(".feedback p").innerText();
  await page.reload();
  await expect(page.locator(".question-passage")).toHaveText(foundationPassage);
  await expect(page.locator(".feedback p")).toHaveText(historyFeedback);
  await expect(page.locator(".answer").first()).toBeDisabled();
  expect(await foundationState()).toEqual(savedHistory);
  await page.screenshot({
    path: path.join(profile, "foundation-draft-replaced-offline.png"),
  });
  foundationRouteCases.push("tarih-zaman");

  expect(errors).toEqual([]);
  console.log(
    JSON.stringify({
      desktop: "PASS",
      examOfflineProcessRestartAndResult: "PASS",
      hourglassProcessRestartAndPause: "PASS",
      resetProgressOffline: "PASS",
      aytVisuals: "PASS",
      cheatsheets: "PASS",
      detailedGuidesAndOfficialReferences: "PASS",
      sourceNarrativeModelOfflineReload: "PASS",
      sixNewSourceFamiliesOfflineReload: "PASS",
      sevenContinuationFamiliesOfflineReload: "PASS",
      sixAdditionalSourceFamiliesOfflineReload: "PASS",
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
      forge017SameProfileProcessRestart: "PASS",
      forge018FamiliesOfflineHtmlStateAndReload: forge018Snapshots.map(
        (item) => item.id,
      ),
      forge018SameProfileProcessRestart: "PASS",
      forge021FamiliesOfflineHtmlStateAndReload: forge021Snapshots.map(
        (item) => item.id,
      ),
      forge021SameProfileProcessRestart: "PASS",
      forge022FamiliesOfflineHtmlStateAndReload: forge022Snapshots.map(
        (item) => item.id,
      ),
      forge022SameProfileProcessRestart: "PASS",
      forge023FamiliesOfflineHtmlStateAndReload: forge023Snapshots.map(
        (item) => item.id,
      ),
      forge023SameProfileProcessRestart: "PASS",
      forge023ExplorationWithoutLearningCredit: "PASS",
      forge022ExplorationWithoutLearningCredit: "PASS",
      forge021ExplorationWithoutLearningCredit: "PASS",
      forge020FamiliesOfflineHtmlStateAndReload: forge020Snapshots.map(
        (item) => item.id,
      ),
      forge020ExplorationWithoutLearningCredit: "PASS",
      forge019FamiliesOfflineHtmlStateAndReload: forge019Snapshots.map(
        (item) => item.id,
      ),
      forge020SameProfileProcessRestart: "PASS",
      forge019SameProfileProcessRestart: "PASS",
      forge019ExplorationWithoutLearningCredit: "PASS",
      forge018ExplorationWithoutLearningCredit: "PASS",
      forge017ExplorationWithoutLearningCredit: "PASS",
      forge016SameProfileProcessRestart: "PASS",
      forge016ExplorationWithoutLearningCredit: "PASS",
      forge015SameProfileProcessRestart: "PASS",
      forge015ExplorationWithoutLearningCredit: "PASS",
      forge014SameProfileProcessRestart: "PASS",
      forge014ExplorationWithoutLearningCredit: "PASS",
      orderedPlanAndRestart: "PASS",
      ogmChemistryVisuals: "PASS",
      mathematicsVisualsAndRestart: "PASS",
      algebraGuidesAndOfflineReload: "PASS",
      profile,
      offlineLesson: "PASS",
      reload: "PASS",
      processRestart: "PASS",
      dailyCompletionAndScore: "PASS",
      paragraphPassageOfflineAndRestart: "PASS",
      foundationQuestionRoutesOfflineReload: foundationRouteCases,
      draftReplacementCancelConfirmOffline: "PASS",
      rendererErrors: errors.length,
    }),
  );
} finally {
  await app?.close();
}
