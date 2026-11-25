import { expect, test, type Locator, type Page } from "@playwright/test";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

registerOfflineBootDiagnostics();
test.use({ viewport: { width: 320, height: 844 }, reducedMotion: "reduce" });

const numberTitle = "Sayı doğrusunda sırayı ve uzaklığı ayır";
const intervalTitle = "Açık ve kapalı sınırdan tam sayıları bul";
const angleTitle = "Doğrusal çiftte açıortaylar";
const exampleTitle = "Bütünler açıların iki açıortayını birleştir";

function figure(parent: Page | Locator, title: string) {
  return parent.locator(`figure[data-section-figure="${title}"]`);
}

async function checkFrame(page: Page, panel: Locator) {
  const image = panel.getByRole("img");
  await expect(image).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  expect(await image.evaluate((svg) => {
    const frame = svg.getBoundingClientRect();
    return [...svg.querySelectorAll("text")].every((text) => {
      const label = text.getBoundingClientRect();
      return label.left >= frame.left - 1 && label.right <= frame.right + 1
        && label.top >= frame.top - 1 && label.bottom <= frame.bottom + 1;
    });
  })).toBe(true);
}

test("Number-line reading, worked interval and cheat sheet stay usable offline", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "temel-kavramlar", search: "Temel Kavramlar", title: "Temel kavramlar: sayı, değer ve tanım koşulu" });
  const compare = figure(page, numberTitle);
  const slider = compare.getByRole("slider", { name: /B’nin değeri/ });
  await expect(compare).toContainText("−3 < 2");
  const original = await compare.getByRole("img").innerHTML();
  await slider.press("Home");
  await expect(compare).toContainText("−3 > −6");
  expect(await compare.getByRole("img").innerHTML()).not.toBe(original);
  await slider.fill("-3");
  await expect(compare).toContainText("−3 = −3");
  await checkFrame(page, compare);
  const example = page.locator(".worked-example").filter({ hasText: intervalTitle });
  await example.locator("summary").press("Enter");
  await expect(figure(example, intervalTitle)).toHaveCount(0);
  await example.getByRole("button", { name: "Çözümün tamamını göster" }).press("Enter");
  const bounds = figure(example, intervalTitle);
  await expect(bounds).toContainText("→ 6 tam sayı.");
  await checkFrame(page, bounds);
  await bounds.screenshot({ path: info.outputPath("tam-sayi-sinirlari.png") });
  await page.goto("/#/cheatsheets?topic=detail-194");
  await expect(figure(page, numberTitle)).toBeVisible();
  await checkFrame(page, figure(page, numberTitle));
  expect(learning(await storage(page))).toEqual(before);
});

test("Linear pair and bisector step use the same model in theory and cheat sheet", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-acilar-kaynak-pekitirme-032";
  await openCourse(page, { lesson, search: "Geometrinin dili" });
  const model = figure(page, angleTitle);
  await expect(model).toContainText("39° + 51° = 90°");
  const original = await model.getByRole("img").innerHTML();
  await model.getByRole("slider", { name: /Sağ koldan ölçülen açı/ }).press("End");
  await expect(model).toContainText("150° + 30° = 180°");
  await expect(model).toContainText("75° + 15° = 90°");
  expect(await model.getByRole("img").innerHTML()).not.toBe(original);
  await checkFrame(page, model);
  await model.screenshot({ path: info.outputPath("aciortay.png") });
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(figure(page.locator(".cheat-section"), angleTitle)).toBeVisible();
  const example = page.locator(".worked-example").filter({ hasText: exampleTitle });
  await example.locator(":scope > summary").press("Enter");
  await example.locator(".cheat-solution > summary").press("Enter");
  const explanation = figure(example, angleTitle);
  await expect(explanation).toContainText("39° + 51° = 90°");
  await checkFrame(page, explanation);
  expect(learning(await storage(page))).toEqual(before);
});

test("Division conditions are readable as a table in the lesson and cheat sheet", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, {
    lesson: "tek-cift-isaret",
    search: "iki ayrı özellik",
    title: "Tek–çift ve işaret: iki ayrı özellik",
  });
  const panel = page.getByRole("region", { name: /Bölümün paritesinden önce tam sayı oluşunu denetle/ });
  const table = panel.getByRole("table");
  await expect(table.getByRole("columnheader")).toHaveCount(3);
  await expect(table.getByRole("row")).toHaveCount(6);
  await expect(table.getByRole("row").filter({ hasText: "−18 ÷ 6" })).toContainText("Sonuç tek.");
  await expect(table.getByRole("row").filter({ hasText: "14 ÷ 6" })).toContainText("tam sayı değildir");
  await table.getByRole("row").filter({ hasText: "12 ÷ 0" }).scrollIntoViewIfNeeded();
  await expect(table.getByRole("row").filter({ hasText: "12 ÷ 0" })).toContainText("Bölüm tanımsızdır");
  await page.goto("/#/cheatsheets?topic=detail-195");
  await expect(table.getByRole("row")).toHaveCount(6);
  await panel.focus();
  await expect(panel).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  expect(learning(await storage(page))).toEqual(before);
});

test("An angle bisector and a median mark different equalities in the same triangle", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgende-acilar-031";
  await openCourse(page, { lesson, search: "Üçgende açılar" });
  const model = figure(page, "Açıortay ve orta nokta");
  await expect(model).toContainText("25° + 25° = 50°");
  await expect(model).toContainText("= 95°");
  const original = await model.getByRole("img").innerHTML();
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("AM = MC.");
  expect(await model.getByRole("img").innerHTML()).not.toBe(original);
  await checkFrame(page, model);
  await model.screenshot({ path: info.outputPath("kenarortay.png") });
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("25° + 25° = 50°");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("AM = MC.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("A removed-term candidate can fall between two sequence terms", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/lesson?id=ardisik-sayilar");
  const title = "Silinen terim adayını listede doğrula";
  const panel = figure(page, title);
  await expect(panel).toContainText("14 listede yok");
  const beforeImage = await panel.getByRole("img").innerHTML();
  await panel.getByRole("slider", { name: /Kalan toplam/ }).press("ArrowRight");
  await expect(panel).toContainText("13 listede.");
  expect(await panel.getByRole("img").innerHTML()).not.toBe(beforeImage);
  await checkFrame(page, panel);
  await page.goto("/#/cheatsheets?topic=detail-196");
  await expect(panel).toContainText("14 listede yok");
  await panel.getByRole("slider", { name: /Kalan toplam/ }).press("ArrowRight");
  await expect(panel).toContainText("13 listede.");
  expect(learning(await storage(page))).toEqual(before);
});

test("Triangle existence is checked before wide-angle classification", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgen-esitsizligi-031";
  await page.goto(`/#/lesson?id=${lesson}`);
  const table = page.getByRole("region", { name: /Açı koşulunu yalnız kurulabilen üçgenlerde dene/ }).getByRole("table");
  await expect(table.getByRole("row")).toHaveCount(6);
  await expect(table.getByRole("row").filter({ hasText: "Dar açılı" })).toContainText("64 < 74");
  await expect(table.getByRole("row").filter({ hasText: "Geniş açılı" })).toHaveCount(3);
  await expect(table.getByRole("row").filter({ hasText: "Üçgen kurulmaz" })).toContainText("12");
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  const sheet = page.getByRole("region", { name: /Önce üçgen, sonra açı sınıfı/ }).getByRole("table");
  await expect(sheet.getByRole("row").filter({ hasText: "Üçgen kurulmaz" })).toContainText("12");
  expect(learning(await storage(page))).toEqual(before);
});

test("The prime-power grid contains every positive divisor once in both reading routes", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-asal-kaynak-032";
  const verifyDivisors = async (name: RegExp) => {
    const table = page.getByRole("region", { name }).getByRole("table");
    await expect(table.getByRole("columnheader")).toHaveCount(5);
    const cells = await table.locator("tbody td:not(:first-child) .guide-table-cell-value").allTextContents();
    const numbers = cells.map(Number).sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: 72 }, (_, index) => index + 1).filter((n) => 72 % n === 0));
  };
  await page.goto(`/#/lesson?id=${lesson}`);
  await verifyDivisors(/Bütün pozitif bölenleri bağımsız seçimle say/);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await verifyDivisors(/Aralarında asal ve üç sayaç/);
  expect(learning(await storage(page))).toEqual(before);
});

test("A ramp’s horizontal distance and hypotenuse stay distinct across the slider", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-dik-ucgen-031";
  await page.goto(`/#/lesson?id=${lesson}`);
  const model = figure(page, "Dik yolda eğim ve uzunluk");
  await expect(model).toContainText("tan α = 5/12");
  await expect(model).toContainText("= 13 m");
  const original = await model.getByRole("img").innerHTML();
  await model.getByRole("slider", { name: /Dikey yükselme/ }).press("End");
  await expect(model).toContainText("tan α = 9/12");
  await expect(model).toContainText("= 15 m");
  expect(await model.getByRole("img").innerHTML()).not.toBe(original);
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("tan α = 5/12");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("A composite divisor is limited by the scarcer complete group", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-faktoriyel-kaynak-033";
  await page.goto(`/#/lesson?id=${lesson}`);
  const course = page.getByRole("region", { name: /Bileşik böleni iki bütçeyle kur/ }).getByRole("table");
  const smaller = course.getByRole("row", { name: /10!/ });
  const larger = course.getByRole("row", { name: /15!/ });
  await expect(smaller).toContainText("min(4, 4) = 4");
  await expect(larger).toContainText("11 → 5");
  await expect(larger).toContainText("6 → 6");
  await expect(larger).toContainText("min(5, 6) = 5");
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  const sheet = page.getByRole("region", { name: /Asal kuvvet bütçesi/ }).getByRole("table");
  await expect(sheet.getByRole("row", { name: /15!/ })).toContainText("min(5, 6) = 5");
  expect(learning(await storage(page))).toEqual(before);
});

test("Two perpendicular distances exchange area while their sum stays constant", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgende-acilar-031";
  await page.goto(`/#/lesson?id=${lesson}`);
  const model = figure(page, "İki dik uzaklığın toplamı").first();
  await expect(model).toContainText("d₁ = 3,2, d₂ = 1,6");
  await expect(model).toContainText("d₁ + d₂ = 4,8 birim");
  await expect(model).toContainText("8 + 4 = 12 birim²");
  const original = await model.getByRole("img").innerHTML();
  await model.getByRole("slider", { name: /P’nin yatay konumu/ }).press("Home");
  await expect(model).toContainText("d₁ = 0,8, d₂ = 4");
  await expect(model).toContainText("d₁ + d₂ = 4,8 birim");
  await expect(model).toContainText("2 + 10 = 12 birim²");
  expect(await model.getByRole("img").innerHTML()).not.toBe(original);
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("d₁ = 3,2, d₂ = 1,6");
  await expect(model).toContainText("Tepe yüksekliği 4 birim.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Changing the third addend crosses the one-to-two tens boundary", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Birlikleri onluklara grupla");
  await page.goto("/#/lesson?id=sayi-basamaklari");
  await expect(model).toContainText("27 = 2 · 10 + 7");
  const dial = model.getByRole("slider", { name: /Üçüncü toplanan/ });
  await dial.press("Home");
  await dial.press("ArrowRight");
  await expect(model).toContainText("19 = 1 · 10 + 9");
  const previous = await model.getByRole("img").innerHTML();
  await dial.press("ArrowRight");
  await expect(model).toContainText("20 = 2 · 10 + 0");
  expect(await model.getByRole("img").innerHTML()).not.toBe(previous);
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-199");
  await expect(model).toContainText("27 = 2 · 10 + 7");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Three equal heights in an equilateral triangle give unequal band areas", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-eslik-benzerlik-031";
  const model = figure(page, "Eş yükseklik, farklı alan").first();
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("36 − 9 = 27 birim²");
  const dial = model.getByRole("slider", { name: /Şerit/ });
  await dial.press("Home");
  await expect(model).toContainText("9 − 0 = 9 birim²");
  const previous = await model.getByRole("img").innerHTML();
  await dial.press("End");
  await expect(model).toContainText("81 − 36 = 45 birim²");
  expect(await model.getByRole("img").innerHTML()).not.toBe(previous);
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("36 − 9 = 27 birim²");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Joint divisibility keeps the shared prime requirement once", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const table = page.getByRole("region", { name: /Ayrı şartlar çarpılır mı/ }).getByRole("table");
  await page.goto("/#/lesson?id=bolme-bolunebilme");
  const shared = table.getByRole("row", { name: /4 ve 6/ }).getByRole("cell");
  await expect(shared.nth(1)).toHaveAccessibleName("12");
  await expect(shared.nth(2)).toHaveAccessibleName("24 gereksiz güçlü");
  await expect(table.getByRole("row", { name: /3 ve 4/ })).toContainText("12 yeterli ve gerekli");
  await page.goto("/#/cheatsheets?topic=detail-200");
  await expect(shared.nth(1)).toHaveAccessibleName("12");
  expect(learning(await storage(page))).toEqual(before);
});

test("The external bisector switches sides through the parallel case", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgen-merkezleri-031";
  const model = figure(page, "Dış açıortayda nokta uzantıda olur");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("E, B tarafındaki uzantıda.");
  await expect(model).toContainText("12/18 = 4/6");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(model).toContainText("Dış açıortay ∥ BC. Sonlu bir E noktası yok.");
  await checkFrame(page, model);
  const parallel = await model.getByRole("img").innerHTML();
  await next.press("Enter");
  await expect(model).toContainText("E, C tarafındaki uzantıda.");
  await expect(model).toContainText("24/18 = 8/6");
  expect(await model.getByRole("img").innerHTML()).not.toBe(parallel);
  await checkFrame(page, model);
  const image = model.getByRole("img");
  await image.evaluate((svg) => svg.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("dis-aciortay-c.png") });
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("E, B tarafındaki uzantıda.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("A shifted start can move or remove the first common event", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-ebob-ekok-kaynak-034";
  const model = figure(page, "Başlangıç kayarsa iki ayrı diziyi karşılaştır");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("Ortak dakikalar: 24, 60.");
  const delay = model.getByRole("slider", { name: /B’nin ilk anı/ });
  await delay.press("Home");
  await expect(model).toContainText("Ortak dakikalar: 0, 36, 72.");
  await delay.press("ArrowRight");
  await expect(model).toContainText("Ortak dakika yok.");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("Ortak dakikalar: 24, 60.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Median length follows the actual side lengths as the base moves", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgen-merkezleri-031";
  const model = figure(page, "Kenarortay uzunluğu ve dik üçgendeki özel hâl");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("AM = 7 birim");
  const base = model.getByRole("slider", { name: /BC tabanı/ });
  await base.press("End");
  await expect(model).toContainText("BM = MC = 7 birim");
  await expect(model).toContainText("AM = 4 birim");
  await base.press("Home");
  await expect(model).toContainText("AM ≈ 7,81 birim");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("AM = 7 birim");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Distance from zero stays the same when signed fractions reverse order", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-rasyonel-kaynak-035";
  const model = figure(page, "Negatif noktaları uzaklıklarıyla karıştırma");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("−3/4 < −1/2.");
  const negative = await model.getByRole("img").innerHTML();
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("3/4 > 1/2.");
  await expect(model).toContainText("Sıfıra uzaklıklar 3/4 ve 1/2 birimdir.");
  expect(await model.getByRole("img").innerHTML()).not.toBe(negative);
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("−3/4 < −1/2.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("In the same triangle the excircle touches the two side extensions", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgen-merkezleri-031";
  const model = figure(page, "İç merkez I: kenarlara eş dik uzaklık");
  await page.goto(`/#/lesson?id=${lesson}`);
  const next = model.getByRole("button", { name: "İleri", exact: true });
  for (let i = 0; i < 3; i++) await next.press("Enter");
  await expect(model).toContainText("r = S / s = 2 birim.");
  await expect(model).toContainText("I = (2; 2).");
  const inside = await model.getByRole("img").innerHTML();
  await next.press("Enter");
  await expect(model).toContainText("rₐ = S / (s − a) = 12 birim.");
  await expect(model).toContainText("BC’ye teğet noktası (2,4; 4,8).");
  await expect(model).toContainText("BC parçası ile AB ve AC uzantılarına teğet.");
  expect(await model.getByRole("img").innerHTML()).not.toBe(inside);
  await checkFrame(page, model);
  const image = model.getByRole("img");
  await image.evaluate((svg) => svg.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("dis-teget-cember.png") });
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  for (let i = 0; i < 3; i++) await next.press("Enter");
  await expect(model).toContainText("r = S / s = 2 birim.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The same linear system is graphed in the worked example and cheat sheet", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-dogrusal-denklemler-kaynak-036";
  const title = "Bir doğruyu iki noktadan çiz";
  await page.goto(`/#/lesson?id=${lesson}`);
  const table = page.getByRole("table").filter({ hasText: "İki gerçek doğrunun durumu" });
  await expect(table.getByRole("cell", { name: "Aynı doğru üzerindeki sonsuz çift", exact: true })).toBeVisible();
  const example = page.locator(".worked-example").filter({ hasText: "İki doğruyu çiz ve ortak noktayı denetle" });
  await example.locator("summary").press("Enter");
  await example.getByRole("button", { name: "Çözümün tamamını göster", exact: true }).press("Enter");
  const worked = figure(example, title);
  const next = (model: Locator) => model.getByRole("button", { name: "İleri", exact: true });
  await next(worked).press("Enter");
  await next(worked).press("Enter");
  await expect(worked).toContainText("(3, 2): 3 + 2 = 5 ve 3 − 2 = 1.");
  await checkFrame(page, worked);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  const sheet = figure(page, title);
  await next(sheet).press("Enter");
  await next(sheet).press("Enter");
  await expect(sheet).toContainText("Ortak nokta iki koşulu birden sağlar.");
  await checkFrame(page, sheet);
  expect(learning(await storage(page))).toEqual(before);
});

test("The angle between the wrong pair of sides can leave two triangles", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-eslik-benzerlik-031";
  const model = figure(page, "Arada olmayan açı iki üçgene izin verebilir");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("İki farklı üçgen kurulur.");
  await expect(model).toContainText("1,21 ve 7,45");
  await checkFrame(page, model);
  const image = model.getByRole("img");
  await image.evaluate((svg) => svg.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("iki-ucgen.png") });
  const radius = model.getByRole("slider", { name: /AC uzunluğu/ });
  await radius.press("Home");
  await expect(model).toContainText("Üçgen kurulamaz.");
  await radius.press("ArrowRight");
  await expect(model).toContainText("Tek üçgen kurulur.");
  await checkFrame(page, model);
  await radius.fill("5");
  await expect(model).toContainText("Olası BC uzunlukları: 8,66 birim.");
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("İki farklı üçgen kurulur.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Opening the slanted constraint excludes just that edge", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-basit-esitsizlikler-kaynak-037";
  const model = figure(page, "Üç yarı düzlemin ortak bölgesi");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("(1; 0), (4; 0) ve (1; 3) çözümde.");
  const closed = await model.getByRole("img").innerHTML();
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("(4; 0) ve (1; 3) dışarıda. (1; 0) çözümde kalır.");
  expect(await model.getByRole("img").innerHTML()).not.toBe(closed);
  await checkFrame(page, model);
  const image = model.getByRole("img");
  await image.evaluate((svg) => svg.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("acik-esitsizlik-siniri.png") });
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("(1; 0), (4; 0) ve (1; 3) çözümde.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Scaling all corresponding sides keeps similarity but loses congruence", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-eslik-benzerlik-031";
  const model = figure(page, "Üç kenarı eşleştir, ölçeği ayır");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("ABC ≅ DEF. Üç karşılıklı kenar eşit.");
  const congruent = await model.getByRole("img").innerHTML();
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("DE, DF, EF: 9 · 12 · 15.");
  await expect(model).toContainText("ABC ∼ DEF.");
  expect(await model.getByRole("img").innerHTML()).not.toBe(congruent);
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("ABC ≅ DEF. Üç karşılıklı kenar eşit.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The two-focus distance equation has two outside roots and a flat minimum", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-mutlak-deger-kaynak-038";
  const model = figure(page, "İki noktaya uzaklık toplamı neden arada sabit?");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("Toplam = 2 + 5 = 7");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  const x = model.getByRole("slider", { name: /^x/ });
  await x.fill("2");
  await expect(model).toContainText("Toplam = 2 + 1 = 3");
  await expect(model).toContainText("x arada: toplam iki nokta arası uzaklık, 3.");
  await x.fill("0");
  await expect(model).toContainText("Toplam = 4 + 1 = 5");
  await expect(model).toContainText("Bu x, hedef toplamı 5 yapar.");
  await x.fill("5");
  await expect(model).toContainText("Toplam = 1 + 4 = 5");
  await expect(model).toContainText("Bu x, hedef toplamı 5 yapar.");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("Toplam = 2 + 5 = 7");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Nine out of twenty-five cells leave sixteen equal cells in the strip", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-eslik-benzerlik-031";
  const model = figure(page, "Uzunluk k iken alan neden k²?");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("Uzunluk oranı 2/3 ⇒ alan oranı 4/9");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("Uzunluk oranı 3/5 ⇒ alan oranı 9/25");
  await expect(model).toContainText("Yamuk DBCE: 16/25");
  await expect(model).toContainText("üst üçgen 36 birim².");
  await expect(model.getByRole("img").locator("polygon.sf-fill-a")).toHaveCount(9);
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("64 ÷ (16/25) = 100 birim²");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});
