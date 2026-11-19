import release from "../../package.json" with { type: "json" };
import { test, expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AppState } from "../../src/domain/model";
import { setThemePreference } from "./helpers/theme";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
registerOfflineBootDiagnostics();
const id = "tyt-mat-rasyonel-kaynak-035",
  topicId = `topic-${id}`;
const title = "Rasyonel sayılar: aynı bütün, doğru işlem ve görsel kanıt";
async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open("yksmania", 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result,
            transaction = db.transaction("state"),
            read = transaction.objectStore("state").get("current");
          read.onerror = () => {
            db.close();
            reject(read.error);
          };
          read.onsuccess = () => {
            const state = read.result;
            db.close();
            resolve(state);
          };
        };
      }),
  );
}
const learning = (s: AppState) => ({
  sessions: s.sessions,
  reviews: s.reviews,
  theoryReviewCompletions: s.theoryReviewCompletions,
  topicProgress: s.topicProgress,
  notes: s.notes,
  draft: s.draft,
  unlocked: s.unlocked,
  examSessions: s.examSessions,
  examDraft: s.examDraft,
});
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function enter(page: Page) {
  await nav(page, "Konu Anlatımı");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(title);
  await page.locator(`.ready-topic[data-lesson-id="${id}"]`).click();
  await expect(
    page.locator(".guide-section").first().locator(".r035-lab"),
  ).toBeVisible();
}
async function offlineReady(page: Page) {
  await page.waitForFunction(
    () => navigator.serviceWorker.controller?.state === "activated",
    undefined,
    { timeout: 30_000 },
  );
}
async function range(lab: Locator, name: string, target: number) {
  const control = lab.getByRole("slider", { name, exact: true });
  const min = Number(await control.getAttribute("min")),
    max = Number(await control.getAttribute("max")),
    step = Number((await control.getAttribute("step")) || 1),
    current = Number(await control.inputValue());
  const from = [
    { n: current, key: "" },
    { n: min, key: "Home" },
    { n: max, key: "End" },
  ].sort((a, b) => Math.abs(a.n - target) - Math.abs(b.n - target))[0];
  if (from.key) await control.press(from.key);
  for (let i = 0; i < Math.round(Math.abs(target - from.n) / step); i++)
    await control.press(target > from.n ? "ArrowRight" : "ArrowLeft");
  await expect(control).toHaveValue(String(target));
}
async function saveReady(page: Page) {
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
}
async function mode(lab: Locator, name: string) {
  await lab
    .getByRole("group", { name: "Rasyonel sayı keşif görünümü", exact: true })
    .getByRole("button", { name, exact: true })
    .click();
}
async function boundedDiagramText(lab: Locator) {
  for (const item of await lab.locator("svg text").evaluateAll((nodes) =>
    nodes.map((node) => {
      const text = node as SVGGraphicsElement,
        box = text.getBBox(),
        view = text.ownerSVGElement!.viewBox.baseVal;
      return {
        label: node.textContent,
        x: box.x,
        y: box.y,
        right: box.x + box.width,
        bottom: box.y + box.height,
        minX: view.x,
        minY: view.y,
        maxX: view.x + view.width,
        maxY: view.y + view.height,
      };
    }),
  )) {
    expect(item.x, item.label ?? "").toBeGreaterThanOrEqual(item.minX);
    expect(item.y, item.label ?? "").toBeGreaterThanOrEqual(item.minY);
    expect(item.right, item.label ?? "").toBeLessThanOrEqual(item.maxX);
    expect(item.bottom, item.label ?? "").toBeLessThanOrEqual(item.maxY);
  }
}
for (const profile of [
  { name: "desktopdark", width: 1440, large: false },
  { name: "320MatrixLexendUI200Text150", width: 320, large: true },
]) {
  test.describe(profile.name, () => {
    test.use({
      viewport: { width: profile.width, height: 1000 },
      hasTouch: true,
      locale: "tr-TR",
      reducedMotion: "reduce",
    });
    test("all rational visual models open first offline and persist without learning credit", async ({
      page,
      context,
    }, info) => {
      test.setTimeout(180_000);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("/#/settings");
      await expect(page.locator(".sidebar-version")).toContainText(
        release.version,
      );
      await setThemePreference(page, profile.large ? "matrix" : "dark");
      if (profile.large) {
        await page
          .getByLabel("Yazı tipi", { exact: true })
          .selectOption("lexend");
        await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
        await page
          .getByLabel("Yalnızca yazı boyutu %", { exact: true })
          .fill("150");
        await page.evaluate(async () => {
          await document.fonts.load("400 45px Lexend");
          await document.fonts.load("600 45px Lexend");
        });
      }
      await saveReady(page);
      await offlineReady(page);
      const before = learning(await stored(page));
      await context.setOffline(true);
      await enter(page);
      const lab = page.locator(".r035-lab"),
        result = lab.locator(".r035-result");
      await expect(page.locator("input[type=file]")).toHaveCount(0);
      await expect(result).toHaveText("3/4 = 6/8 = 3/4");
      const firstWidths = await lab
        .locator("svg .r035-fill")
        .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("width")));
      expect(firstWidths).toEqual(["390", "390"]);
      await range(lab, "Pay a", -3);
      await expect(lab).toContainText(
        "eksi işareti sayı doğrusunda sola yönü belirtir",
      );
      await range(lab, "Payda b", 0);
      await expect(lab.locator(".r035-caution")).toContainText(
        "Payda sıfır olamaz",
      );
      await expect(lab.locator("svg")).toHaveCount(0);
      await range(lab, "Payda b", 4);
      await range(lab, "Pay a", 3);
      await mode(lab, "Sayı doğrusu");
      await lab
        .getByRole("button", { name: "Araya ortalama koy", exact: true })
        .click();
      await lab
        .getByRole("button", { name: "Sıfıra uzaklıkları göster", exact: true })
        .click();
      await expect(result).toContainText("-5/8");
      await expect(lab.locator(".r035-point-mid")).toHaveAttribute(
        "cx",
        "118.75",
      );
      await lab
        .getByRole("button", { name: "−2/3 ve −3/5", exact: true })
        .click();
      await expect(result).toContainText("-19/30");
      expect(
        Number(await lab.locator(".r035-point-a").getAttribute("cx")),
      ).toBeCloseTo(108.6666666667, 6);
      expect(
        Number(await lab.locator(".r035-point-b").getAttribute("cx")),
      ).toBeCloseTo(124.8, 6);
      expect(
        Number(await lab.locator(".r035-point-mid").getAttribute("cx")),
      ).toBeCloseTo(116.7333333333, 6);
      await boundedDiagramText(lab);
      await lab
        .locator(".r035-panel")
        .screenshot({ path: info.outputPath(`line-${profile.width}.png`) });
      const skipBounds = await page.locator(".skip-link").evaluate((node) => ({
        focused: document.activeElement === node,
        top: node.getBoundingClientRect().top,
        bottom: node.getBoundingClientRect().bottom,
      }));
      expect(skipBounds.focused).toBe(false);
      expect(skipBounds.bottom).toBeLessThanOrEqual(0);
      await lab.locator("svg").scrollIntoViewIfNeeded();
      await page.screenshot({
        path: info.outputPath(`line-viewport-${profile.width}.png`),
        fullPage: false,
      });
      await mode(lab, "Üç karşılaştırma");
      await expect(result).toHaveText("7/8 < 11/12");
      await lab
        .getByRole("button", { name: "5/8 ve 7/12", exact: true })
        .click();
      await expect(result).toHaveText("5/8 > 7/12");
      await expect(lab.locator(".r035-comparisons")).toContainText(
        "15/24 > 14/24",
      );
      await expect(lab.locator(".r035-comparisons")).toContainText(
        "5 × 12 = 60; 7 × 8 = 56",
      );
      await mode(lab, "Dört işlem");
      await expect(result).toHaveText("(1/2) + (1/3) = 5/6");
      await lab.getByRole("button", { name: "Çıkar", exact: true }).click();
      await expect(result).toContainText("= 1/6");
      await lab.getByRole("button", { name: "Çarp", exact: true }).click();
      await expect(result).toContainText("= 1/6");
      await lab.getByRole("button", { name: "Böl", exact: true }).click();
      await expect(result).toContainText("= 3/2");
      await range(lab, "İkinci kesrin payı", 0);
      await expect(lab.locator(".r035-caution")).toContainText(
        "Bölen kesir sıfır olamaz",
      );
      await expect(lab.locator("svg")).toHaveCount(0);
      await range(lab, "İkinci kesrin payı", 1);
      await mode(lab, "Ondalık ve devir");
      await lab.getByRole("button", { name: "1,(23)", exact: true }).click();
      await expect(result).toHaveText("Tam kesir: 122/99");
      await lab.getByRole("button", { name: "1,(24)", exact: true }).click();
      await expect(result).toHaveText("Tam kesir: 41/33");
      await expect(lab.locator(".r035-panel")).toContainText("1,(24)");
      await lab.getByRole("button", { name: "0,375", exact: true }).click();
      await expect(result).toHaveText("Tam kesir: 3/8");
      await lab
        .locator(".r035-panel")
        .screenshot({ path: info.outputPath(`decimal-${profile.width}.png`) });
      await mode(lab, "Değişen bütün");
      await expect(lab.locator(".r035-facts dd")).toHaveText([
        "20 birim",
        "60 birim",
        "20 birim",
        "40 birim",
      ]);
      await lab
        .getByRole("button", { name: "24: kalanın 1/3’ü", exact: true })
        .click();
      await expect(lab.locator(".r035-facts dd")).toHaveText([
        "12 birim",
        "12 birim",
        "4 birim",
        "8 birim",
      ]);
      await lab
        .getByRole("button", { name: "Başlangıcın kesri", exact: true })
        .click();
      await expect(lab.locator(".r035-facts dd")).toHaveText([
        "12 birim",
        "12 birim",
        "8 birim",
        "4 birim",
      ]);
      expect(
        await lab
          .locator("svg .r035-fill")
          .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("width"))),
      ).toEqual(["516", "258", "86"]);
      await mode(lab, "Miktar ve birim");
      await expect(result).toContainText("= 5/8");
      await lab
        .getByRole("button", { name: "Bileşeni değiştir", exact: true })
        .click();
      await expect(result).toHaveText("Son A=700 mL ise toplam V=3500/3 mL.");
      expect(
        await lab
          .locator("svg .r035-fill")
          .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("width"))),
      ).toEqual(["208", "312"]);
      await lab
        .getByRole("button", { name: "İpi parçalara ayır", exact: true })
        .click();
      await expect(result).toContainText("= 6 birim parça");
      await expect(lab).toContainText(
        "6 tam parça; iki ucu açık tek ipte ayrı kesimlerle 5 kesim",
      );
      await expect(lab.locator("svg rect")).toHaveCount(6);
      await range(lab, "İp uzunluğu payı; m", 12);
      await range(lab, "İp uzunluğu paydası", 1);
      await range(lab, "Parça uzunluğu paydası", 12);
      await expect(result).toContainText("= 144 birim parça");
      await expect(lab).toContainText("143 kesim");
      await expect(lab.locator("svg rect")).toHaveCount(144);
      await range(lab, "İp uzunluğu payı; m", 3);
      await range(lab, "İp uzunluğu paydası", 4);
      await range(lab, "Parça uzunluğu paydası", 8);
      await saveReady(page);
      expect(learning(await stored(page))).toEqual(before);
      const sizes = await lab.locator("button,input").evaluateAll((nodes) =>
        nodes.map((node) => ({
          height: node.getBoundingClientRect().height,
          tag: node.tagName,
        })),
      );
      expect(sizes.every((size) => size.height >= 44)).toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
      ).toBeLessThanOrEqual(1);
      const actualFont = await lab
        .locator(".r035-panel p")
        .first()
        .evaluate((node) => ({
          family: getComputedStyle(node).fontFamily,
          size: parseFloat(getComputedStyle(node).fontSize),
        }));
      expect(actualFont.size).toBeGreaterThanOrEqual(14.5);
      if (profile.large) {
        expect(actualFont.family).toContain("Lexend");
        expect(actualFont.size).toBe(45);
      }
      const audit = await new AxeBuilder({ page })
        .include(".r035-lab")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(audit.violations).toEqual([]);
      await lab
        .locator(".r035-panel")
        .screenshot({ path: info.outputPath(`rope-${profile.width}.png`) });
      const note = "Aynı bütünü seçerim; 123/99=1,(24), 122/99=1,(23).";
      await page
        .getByRole("textbox", { name: "Notun", exact: true })
        .fill(note);
      await saveReady(page);
      await expect
        .poll(async () => (await stored(page)).notes[`lesson:${id}`])
        .toBe(note);
      const saved = await stored(page),
        choices = saved.explorations["r035:rational"];
      await page.reload();
      await expect(lab.locator(".r035-panel")).toContainText("6 tam parça");
      expect((await stored(page)).explorations["r035:rational"]).toEqual(
        choices,
      );
      expect(learning(await stored(page))).toEqual(learning(saved));
      await expect(
        page.getByRole("textbox", { name: "Notun", exact: true }),
      ).toHaveValue(note);
      await nav(page, "Kopya Kağıtları");
      await page
        .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
        .fill("Rasyonel sayılar: bütün, işlem ve kaynak problemleri");
      await page
        .getByRole("button", {
          name: /Rasyonel sayılar: bütün, işlem ve kaynak problemleri/,
        })
        .click();
      await expect(page.locator("main h1")).toHaveText(title);
      await expect(page.locator(".cheat-reader")).toBeVisible();
      expect(learning(await stored(page))).toEqual(learning(saved));
      await info.attach("actual-rational-models", {
        body: JSON.stringify({
          version: release.version,
          profile,
          allSevenModes: true,
          allThreeQuantitySubmodels: true,
          all144RopePieces: true,
          choices,
          actualFont,
          skipLinkUnfocusedBounds: skipBounds,
          settings: (await stored(page)).settings,
          offlineFirstOpen: true,
          offlineReload: true,
          noLearningCredit: true,
          consoleErrors: errors,
        }),
        contentType: "application/json",
      });
      expect(errors).toEqual([]);
    });
  });
}
// Frozen C2 prompts and mathematical expectations were independently audited.
// Literal QA values: no runtime import of production questions, answer keys or models.
const expectedQuestions = [
  {
    prompt: "Rasyonel sayı tanımında hangi koşul doğrudur?",
    answer: "a, b tam sayı ve b≠0 iken a/b biçiminde yazılabilme",
  },
  {
    prompt: "Aşağıdaki ifadelerden hangisi tanımlı bir rasyonel sayıdır?",
    answer: "0/7",
  },
  {
    prompt:
      "−(2 tam 1/3) ifadesinin değeri nedir? Burada tam sayılı gösterim, 2+1/3 toplamını belirtir.",
    answer: "−7/3",
  },
  {
    prompt: "(−6)/(−8) kesrinin sade ve pozitif paydalı eşdeğeri nedir?",
    answer: "3/4",
  },
  {
    prompt: "6/8’i değerini koruyarak sadeleştiren seçenek hangisidir?",
    answer: "3/4",
  },
  {
    prompt: "1/2+1/3 işlemi kaçtır?",
    answer: "5/6",
  },
  {
    prompt: "1/2−(−1/3) işlemi kaçtır?",
    answer: "5/6",
  },
  {
    prompt: "3/4−5/6+1/3 işlemi kaçtır?",
    answer: "1/4",
  },
  {
    prompt: "(14/15)×(25/21) işlemi kaçtır?",
    answer: "10/9",
  },
  {
    prompt: "(6/7)×(14/15) işlemi kaçtır?",
    answer: "4/5",
  },
  {
    prompt: "(3/5)/(9/10) işlemi kaçtır?",
    answer: "2/3",
  },
  {
    prompt: "(1−1/3)/(1+1/2) işlemi kaçtır?",
    answer: "4/9",
  },
  {
    prompt: "Parantezleri verildiği gibi koru: (1/2)/(1/4)×2 işlemi kaçtır?",
    answer: "4",
  },
  {
    prompt:
      "7/8 ile 11/12 için hangi karşılaştırma ve eksik gerekçesi doğrudur?",
    answer: "11/12 daha büyük; 1/12 eksiği, 1/8’den küçüktür.",
  },
  {
    prompt: "13/16 ile 17/20 arasında büyük olan hangisidir ve neden?",
    answer: "17/20; 3/20 eksiği, 3/16’dan küçüktür.",
  },
  {
    prompt: "5/8 ve 7/12 için hangi karşılaştırma doğrudur?",
    answer: "5/8>7/12",
  },
  {
    prompt:
      "−3/4 ve −1/2 sayılarını aynı sayı doğrusuna yerleştirdiğinde hangisi doğrudur?",
    answer: "−1/2 daha sağda ve daha büyüktür.",
  },
  {
    prompt:
      "−2/3 ile −3/5 arasına, uçlara eşit olmadan yerleşen sayı hangisidir?",
    answer: "−19/30",
  },
  {
    prompt: "0,375 sayısının sade kesir karşılığı nedir?",
    answer: "3/8",
  },
  {
    prompt: "Hangisi sonlu ondalık gösterim ölçütünü doğru anlatır?",
    answer:
      "Önce kesir sadeleştirilir; pozitif paydada yalnız 2 ve 5 asal çarpanları kalır.",
  },
  {
    prompt:
      "x=0,272727… gösteriminde 27 bloğu sonsuza dek yineleniyor. x kaçtır?",
    answer: "3/11",
  },
  {
    prompt:
      "x=1,233333… gösteriminde yalnız 3 devrediyor. x’in sade kesri nedir?",
    answer: "37/30",
  },
  {
    prompt:
      "Bir tanktaki suyun önce 1/4’ü, sonra kalanın 1/3’ü kullanılıyor; 40 L su kalıyor. Başlangıçta kaç L su vardır?",
    answer: "80",
  },
  {
    prompt:
      "Hacmi V olan bir karışımın 2/5’i A, 3/5’i B bileşenidir. Yalnız B’nin 1/3’ü çıkarılıp yerine eşit hacimde A ekleniyor; toplam hacim V korunuyor. Son A miktarı 700 mL ise V kaç mL’dir?",
    answer: "3500/3",
  },
  {
    prompt:
      "a ve b pozitif tam sayılardır; a/b=3/5 ve a+b=40’tır. Sıralı (a, b) ikilisi nedir?",
    answer: "(15,25)",
  },
  {
    prompt:
      "a ve b pozitif tam sayılardır ve aralarında asaldır. a/b=3/5 ve a+b=40 koşulları için hangisi doğrudur?",
    answer: "Bu koşulları birlikte sağlayan ikili yoktur.",
  },
  {
    prompt:
      "Bir miktarın önce 1/5’i, sonra kalanın 1/4’ü kullanılıyor; 18 kalıyor. Başlangıç miktarı nedir?",
    answer: "30",
  },
  {
    prompt: "5/6−3/4+1/2 işlemi kaçtır?",
    answer: "7/12",
  },
  {
    prompt: "(9/14)/(3/7) işlemi kaçtır?",
    answer: "3/2",
  },
  {
    prompt: "19/20 ve 23/24 için doğru karşılaştırma hangisidir?",
    answer: "23/24>19/20",
  },
  {
    prompt:
      "−7/10 ile −2/3 arasına, uçlara eşit olmadan yerleşen sayı hangisidir?",
    answer: "−41/60",
  },
  {
    prompt:
      "Bir miktarın önce 1/3’ü, sonra kalanın 1/4’ü kullanılıyor; 15 kalıyor. Başlangıç miktarı nedir?",
    answer: "30",
  },
  {
    prompt:
      "0,454545… gösteriminde 45 bloğu sonsuza dek tekrar ediyor. Bu sayıdan sonlu 0,45 çıkarıldığında fark nedir?",
    answer: "1/220",
  },
  {
    prompt:
      "a ve b pozitif tam sayılardır; a/b=4/7 ve a+b=55’tir. Sıralı (a, b) ikilisi nedir?",
    answer: "(20,35)",
  },
  {
    prompt:
      "Aynı kap, boşken 120 g, tamamen sıvıyla doluyken 360 g ve kısmen doluyken 270 g geliyor. Her tartımda aynı sıvı kullanılıyor ve yoğunluk değişmiyor. Doluluk oranı nedir?",
    answer: "5/8",
  },
  {
    prompt:
      "Doluluk oranları 18/25 ve 29/40 olan aynı büyüklükteki iki kaptan hangisi daha doludur?",
    answer: "29/40 dolu olan kap",
  },
  {
    prompt:
      "İki ucu açık ve birbirine bağlı olmayan tek parça ip 3/4 m uzunluğunda. Üst üste konmadan ayrı kesimlerle tam 1/8 m parçalara ayrılıyor. Kaç parça ve kaç kesim gerekir?",
    answer: "6 parça; 5 kesim",
  },
  {
    prompt:
      "“2/3+1/6=3/9” çözümünün ilk hatası ve yeni 3/5+1/10 işleminin doğru sonucu hangi seçenektedir?",
    answer: "Paydalar toplanmış; yeni sonuç 7/10.",
  },
  {
    prompt:
      "“(1/2)/(3/4)=3/8” satırındaki hatayı onardıktan sonra (2/5)/(4/3) işleminin sonucu nedir?",
    answer: "3/10",
  },
  {
    prompt: "−5/6 ve −7/8 için doğru karşılaştırma hangisidir?",
    answer: "−5/6>−7/8",
  },
  {
    prompt:
      "Başlangıç miktarı 24 birimdir. Önce 1/2’si, sonra kalanın 1/3’ü kullanılıyor. Kalan miktar nedir?",
    answer: "8",
  },
  {
    prompt:
      "Başlangıç miktarı 24 birimdir. İlk kullanım başlangıcın 1/2’si, ikinci kullanım da başlangıcın 1/3’üdür. İki kullanım da başlangıç miktarına göre tanımlanıyor. Ne kadar kalır?",
    answer: "4",
  },
  {
    prompt:
      "Bir şişedeki 1/2 L suya 1/4 L su ekleniyor. Toplam ne kadar su olur?",
    answer: "3/4 L",
  },
  {
    prompt: "(2+4)/2 işleminin değeri nedir?",
    answer: "3",
  },
  {
    prompt:
      "2/3 L miktarını, büyüklüğü 4/5 L olan bir ölçü birimiyle ölçüyorsun. Bu miktar ölçü biriminin kaç katıdır?",
    answer: "5/6",
  },
  {
    prompt:
      "9/10 ile 14/15 arasında büyük olan sayı ve doğru eksik gerekçesi hangisidir?",
    answer: "14/15; 1/15 eksiği, 1/10’dan küçüktür.",
  },
  {
    prompt:
      "Bir stokun önce 1/3’ü, sonra kalanın 1/2’si kullanılıyor. Başlangıç miktarının hangi kesri kalır?",
    answer: "1/3",
  },
  {
    prompt:
      "0,121212… gösteriminde 12 bloğu sonsuza dek yineleniyor. Bu sayı ile sonlu 0,12 için sırasıyla hangi kesir çifti doğrudur?",
    answer: "(4/33,3/25)",
  },
];
test("all 48 rational cards finish independently and Today keeps the actual saved score and original review dates", async ({
  page,
  context,
}, info) => {
  test.setTimeout(180_000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/#/settings");
  await setThemePreference(page, "dark");
  await offlineReady(page);
  await context.setOffline(true);
  await enter(page);
  await page
    .getByRole("navigation", { name: "Anlatım içeriği", exact: true })
    .locator("summary")
    .click();
  await page.getByRole("button", { name: "Çözümlü örnekler", exact: true }).click();
  const example = page.locator("details.worked-example").filter({
    has: page
      .locator("summary")
      .filter({ hasText: "Kullanılan ikinci payı son kalan sanma" }),
  });
  await example.locator("summary").click();
  await example
    .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
    .click();
  await expect(example.locator(".worked-conclusion")).toContainText(
    "Kalanın 1/3’ü koşulunda 8",
  );
  await example.screenshot({
    path: info.outputPath("different-wholes-worked-example.png"),
  });
  const before = await stored(page);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (const [index, expected] of expectedQuestions.entries()) {
    await expect(page.locator(".question-meta")).toContainText(
      `${index + 1} / 48`,
    );
    await expect(page.locator(".question-panel h2")).toHaveText(
      expected.prompt,
    );
    await page
      .locator(".answer-options .answer")
      .filter({ has: page.getByText(expected.answer, { exact: true }) })
      .click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await expect(page.locator(".feedback.correct")).toBeVisible();
    if (index === 34 || index === 36)
      await page.locator(".question-panel").screenshot({
        path: info.outputPath(`actual-question-${index + 1}.png`),
      });
    if (index < 47)
      await page
        .getByRole("button", { name: "Sonraki soru", exact: true })
        .click();
  }
  const checked = await stored(page);
  expect(checked.draft?.responses).toHaveLength(48);
  expect(
    checked.draft?.responses.every(
      (response) => response.correct && !response.assisted,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
    .click();
  await expect(page.locator(".result-stats > div strong")).toHaveText([
    "48/48",
    "48/48",
    "0",
  ]);
  const saved = await stored(page),
    session = saved.sessions.at(-1)!;
  expect(saved.sessions).toHaveLength(before.sessions.length + 1);
  expect(session.lessonId).toBe(id);
  expect(
    session.responses.every(
      (response) => response.correct && !response.assisted,
    ),
  ).toBe(true);
  expect(saved.topicProgress[topicId]?.theory).toBeUndefined();
  const targets = saved.reviews
    .filter((review) => review.originSessionId === session.id)
    .map((review) => ({
      stage: review.stage,
      targetDate: review.targetDate,
      anchorDate: review.anchorDate,
    }));
  const plus = (n: number) => {
    const d = new Date(session.date + "T12:00:00Z");
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  };
  expect(targets).toEqual([
    { stage: 3, targetDate: plus(2), anchorDate: session.date },
    { stage: 7, targetDate: plus(6), anchorDate: session.date },
    { stage: 21, targetDate: plus(20), anchorDate: session.date },
  ]);
  await page
    .locator(".result-page")
    .screenshot({ path: info.outputPath("all48-independent-result.png") });
  const past = page.getByRole("region", {
    name: "Bu konunun geçmiş ÖSYM soruları",
    exact: true,
  });
  await expect(past).toContainText("1 doğrulanmış konu bağlantısı");
  const official = past.locator(".past-exam-reference");
  await expect(official).toHaveCount(1);
  await official.locator("summary").click();
  await expect(official).toContainText(
    "Resmî cevap: E. Soru sayfası 26, cevap kaynağı sayfa 45",
  );
  await expect(
    official.getByRole("link", { name: /Resmî kaynak kaydı \(internet\)/ }),
  ).toHaveAttribute(
    "href",
    "https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf#page=26",
  );
  await page.reload();
  await expect(page.locator(".result-stats > div strong")).toHaveText([
    "48/48",
    "48/48",
    "0",
  ]);
  expect((await stored(page)).sessions).toEqual(saved.sessions);
  expect((await stored(page)).reviews).toEqual(saved.reviews);
  await nav(page, "Bugün");
  const panels = page.locator(".daily-plan");
  const questions = panels.filter({
    has: page.getByRole("heading", { name: "Sorular", exact: true }),
  });
  const row = questions
    .getByRole("list", { name: "Bugünün konuları", exact: true })
    .locator(".planned-topic")
    .filter({
      has: page.getByText(
        "Rasyonel sayılar: bütün, işlem ve kaynak problemleri",
        { exact: true },
      ),
    });
  await expect(row).toContainText("48 soruda 48 doğru · 0 yanlış");
  await expect(row).toContainText("Sorular tamamlandı");
  await row.screenshot({ path: info.outputPath("today-actual48-score.png") });
  const theoryRow = page
    .getByRole("region", { name: "Konu planı", exact: true })
    .getByRole("list", { name: "Bugünün konuları", exact: true })
    .locator(".planned-topic")
    .filter({
      has: page.getByText(
        "Rasyonel sayılar: bütün, işlem ve kaynak problemleri",
        { exact: true },
      ),
    });
  await expect(theoryRow).toContainText("48 soruda 48 doğru · 0 yanlış");
  await expect(theoryRow).toContainText("Konu henüz işaretlenmedi");
  await expect(theoryRow).not.toContainText("Konu tamamlandı");
  await theoryRow.screenshot({
    path: info.outputPath("today-theory-score-not-manual-completed.png"),
  });
  expect((await stored(page)).sessions).toEqual(saved.sessions);
  expect((await stored(page)).reviews).toEqual(saved.reviews);
  await info.attach("actual-full-rational-session", {
    body: JSON.stringify({
      version: release.version,
      lessonId: id,
      correct: 48,
      wrong: 0,
      assisted: 0,
      allOwnPromptsMatched: true,
      session,
      reviews: targets,
      offlineFirstEntry: true,
      offlineReload: true,
      theoryNotManuallyCompleted: true,
      todayActualScoreVisible: true,
      todayTheoryRemainsUnmarked: true,
    }),
    contentType: "application/json",
  });
});

test.describe("rational corrected feedback at 320 Matrix large text", () => {
  test.use({
    viewport: { width: 320, height: 1000 },
    hasTouch: true,
    locale: "tr-TR",
    reducedMotion: "reduce",
  });
  test("TOC opens the repeating-tail explanation and Q12 wrong option explains both groups after offline reload", async ({
    page,
    context,
  }, info) => {
    test.setTimeout(180_000);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/#/settings");
    await expect(page.locator(".sidebar-version")).toContainText(
      release.version,
    );
    await setThemePreference(page, "matrix");
    await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
    await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
    await page
      .getByLabel("Yalnızca yazı boyutu %", { exact: true })
      .fill("150");
    await page.evaluate(async () => {
      await document.fonts.load("400 45px Lexend");
      await document.fonts.load("600 45px Lexend");
    });
    await saveReady(page);
    await offlineReady(page);
    const before = await stored(page);
    await context.setOffline(true);
    await enter(page);
    const contents = page.getByRole("navigation", {
      name: "Anlatım içeriği",
      exact: true,
    });
    await contents.locator("summary").click();
    await contents
      .getByRole("button", {
        name: "Önce tekrarlayan kuyrukları hizala",
        exact: true,
      })
      .tap();
    const section = page.locator(".guide-section").filter({
      has: page.getByRole("heading", {
        name: "Önce tekrarlayan kuyrukları hizala",
        exact: true,
      }),
    });
    await expect(section.getByRole("heading")).toBeFocused();
    await expect(section).toContainText(
      "x=0,1(6) olsun; bu, yalnız 6’nın tekrar ettiği 0,16666… sayısıdır.",
    );
    await expect(section).toContainText("x=0,1(6) olsun");
    await expect(section).toContainText("10x=1,(6), 100x=16,(6)");
    await expect(section).toContainText("90x=15 verir, x=1/6");
    await expect(section).toContainText(
      "0,1667 bunun yuvarlanmış farklı bir sayısıdır.",
    );
    await page.screenshot({
      path: info.outputPath("toc-repeating-tail-320.png"),
      fullPage: false,
    });
    await contents
      .getByRole("button", {
        name: "İşaretleri ve sayıları aynı dilde buluştur",
        exact: true,
      })
      .click();
    const lab = page.locator(".r035-lab");
    await mode(lab, "Ondalık ve devir");
    await lab.getByRole("button", { name: "0,1(6)", exact: true }).click();
    await expect(lab.locator(".r035-result")).toHaveText("Tam kesir: 1/6");
    expect(learning(await stored(page))).toEqual(learning(before));
    await page
      .getByRole("button", { name: "Sorulara geç", exact: true })
      .click();
    for (let index = 0; index < 12; index++) {
      await expect(page.locator(".question-meta")).toContainText(
        `${index + 1} / 48`,
      );
      await expect(page.locator(".question-panel h2")).toHaveText(
        expectedQuestions[index].prompt,
      );
      const answer = index === 11 ? "1/3" : expectedQuestions[index].answer;
      await page
        .locator(".answer-options .answer")
        .filter({ has: page.getByText(answer, { exact: true }) })
        .click();
      await page
        .getByRole("button", { name: "Cevabı kontrol et", exact: true })
        .click();
      if (index < 11) {
        await expect(page.locator(".feedback.correct")).toBeVisible();
        await page
          .getByRole("button", { name: "Sonraki soru", exact: true })
          .click();
      }
    }
    await expect(page.locator(".feedback.repair")).toBeVisible();
    await expect(page.locator(".answer-wrong .answer-letter")).toHaveText("A");
    await expect(page.locator(".answer-wrong")).toContainText("1/3");
    await expect(page.locator(".answer-correct")).toContainText("4/9");
    const next = page.locator(".question-help .help-next");
    for (let stage = 0; stage < 10 && (await next.isVisible()); stage++) {
      const previous = await page.locator(".help-content > section").count();
      await next.click();
      await expect(page.locator(".help-content > section")).toHaveCount(
        previous + 1,
      );
    }
    const reasons = page.locator(".help-full-solution ol li");
    await expect(reasons).toHaveCount(5);
    const selectedReason = reasons.nth(0);
    const corrected =
      "Üstteki grup 1−1/3=2/3, alttaki grup 1+1/2=3/2’dir; bölüm 4/9 olur. 1/3=3/9, bu iki grubun doğru bölümünü vermez.";
    await expect(selectedReason).toHaveText(corrected);
    await expect(selectedReason).toContainText("1−1/3=2/3");
    await expect(selectedReason).toContainText("1+1/2=3/2");
    await expect(selectedReason).toContainText("bölüm 4/9");
    const wrap = await selectedReason.evaluate((node) => {
      const bounds = node.getBoundingClientRect(),
        range = document.createRange();
      range.selectNodeContents(node);
      return {
        fontFamily: getComputedStyle(node).fontFamily,
        fontSize: parseFloat(getComputedStyle(node).fontSize),
        questionBodyFontSize: parseFloat(
          getComputedStyle(node.closest(".question-panel")!).fontSize,
        ),
        width: bounds.width,
        scrollWidth: node.scrollWidth,
        clientWidth: node.clientWidth,
        lineRects: [...range.getClientRects()]
          .filter((r) => r.width > 0)
          .map((r) => ({
            left: r.left - bounds.left,
            right: r.right - bounds.left,
            width: r.width,
          })),
      };
    });
    expect(wrap.questionBodyFontSize).toBe(45);
    // The established hint-box hierarchy is 0.85em of the chosen body size.
    expect(wrap.fontSize).toBe(38.25);
    expect(wrap.fontSize / wrap.questionBodyFontSize).toBe(0.85);
    expect(wrap.fontFamily).toContain("Lexend");
    expect(wrap.scrollWidth).toBeLessThanOrEqual(wrap.clientWidth + 1);
    expect(wrap.lineRects.length).toBeGreaterThan(1);
    for (const line of wrap.lineRects) {
      expect(line.left).toBeGreaterThanOrEqual(-1);
      expect(line.right).toBeLessThanOrEqual(wrap.width + 1);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBeLessThanOrEqual(1);
    await selectedReason.screenshot({
      path: info.outputPath("q12-selected-wrong-option-reason-320.png"),
    });
    const checked = await stored(page);
    expect(checked.draft?.responses).toHaveLength(12);
    expect(
      checked.draft?.responses.filter((response) => response.correct),
    ).toHaveLength(11);
    expect(checked.draft?.responses[11].correct).toBe(false);
    expect(checked.sessions).toEqual(before.sessions);
    expect(checked.reviews).toEqual(before.reviews);
    expect(checked.topicProgress).toEqual(before.topicProgress);
    expect(checked.theoryReviewCompletions).toEqual(
      before.theoryReviewCompletions,
    );
    const feedback = await page.locator(".feedback.repair").innerText();
    await page.reload();
    await expect(page.locator(".feedback.repair")).toHaveText(feedback, {
      useInnerText: true,
    });
    await expect(page.locator(".question-meta")).toContainText("12 / 48");
    await expect(page.locator(".help-full-solution ol li").nth(0)).toHaveText(
      corrected,
    );
    expect((await stored(page)).draft).toEqual(checked.draft);
    expect((await stored(page)).sessions).toEqual(before.sessions);
    expect((await stored(page)).reviews).toEqual(before.reviews);
    expect((await stored(page)).topicProgress).toEqual(before.topicProgress);
    expect(errors).toEqual([]);
    await info.attach("actual-rational-corrected-feedback", {
      body: JSON.stringify({
        version: release.version,
        viewport: 320,
        uiScalePercent: 200,
        textPercent: 150,
        sourceSection: "S18",
        normalTOCActivation: true,
        tocInput: "ordinary touchscreen tap",
        repeatingTailResult: "0,1(6)=1/6",
        question12Chosen: "1/3",
        chosenLetter: "A",
        correctOption: "4/9",
        correctedReason: corrected,
        actualWrap: wrap,
        actualDraft: checked.draft,
        partialAttemptCount: 12,
        correct: 11,
        wrong: 1,
        completedSession: false,
        offlineFirstEntry: true,
        offlineReload: true,
        noAutomaticTheoryCredit: true,
        rendererErrors: errors,
      }),
      contentType: "application/json",
    });
  });
});
