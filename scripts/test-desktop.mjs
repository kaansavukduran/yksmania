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
  await navigate("Konu Anlatımı");
  await page.getByRole("button", { name: /Biyoloji.*18/ }).click();
  await page
    .getByRole("button", { name: /Hücre organelleri: yapı ve görev/ })
    .click();
  await page
    .getByRole("button", { name: "Kopya Kağıdını Görüntüle", exact: true })
    .click();
  await expect(page.locator(".topic-cheatsheet")).toContainText(
    "Bu konuya ait PDF henüz bu cihazda yok",
  );
  await expect(
    page
      .locator(".sidebar nav")
      .getByRole("button", { name: "Kopya Kağıtları", exact: true }),
  ).toHaveCount(0);
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
  await page.getByRole("button", { name: "Durdur", exact: true }).click();
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
  expect(errors).toEqual([]);
  console.log(
    JSON.stringify({
      desktop: "PASS",
      hourglassProcessRestartAndPause: "PASS",
      resetProgressOffline: "PASS",
      aytVisuals: "PASS",
      cheatsheets: "PASS",
      detailedGuidesAndOfficialReferences: "PASS",
      sourceNarrativeModelOfflineReload: "PASS",
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
      rendererErrors: errors.length,
    }),
  );
} finally {
  await app?.close();
}
