import { expect, test, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import type { AppState, Lesson } from "../../src/domain/model";
import type { QuestionGuidance } from "../../src/domain/questionHelpModel";

const cases = [
  ["Matematik", "oran-oranti", "Math"],
  ["Fizik", "miknatislar-ve-manyetik-alan", "Physics"],
  ["Kimya", "molekullerde-polarlik-apolarlik", "Chemistry"],
  ["Biyoloji", "canlilarin-siniflandirilmasi", "Biology"],
  ["Türkçe", "zamirler", "Turkish"],
  ["Tarih", "degisen-dunya-dengeleri-osmanli", "History"],
] as const;
let lessons: Lesson[];
let membraneMetadata: {
  guideMinutes: number;
  guideSections: number;
  guideExamples: number;
  guideRecall: number;
  sheetTopicId: string;
  sheetTitle: string;
  sheetSections: number;
  sheetExamples: number;
  sheetRecall: number;
  sheetCount: number;
};
const guidance = new Map<string, QuestionGuidance>();
test.use({ locale: "tr-TR" });

test.beforeAll(async ({}, info) => {
  const root = fileURLToPath(new URL("../..", import.meta.url));
  const source = await createServer({
    root,
    configFile: false,
    cacheDir: info.outputPath("guidance029-source-cache"),
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });
  try {
    lessons = (await source.ssrLoadModule("/src/domain/content.ts")).lessons;
    for (const [, , family] of cases) {
      const rows: {
        id: string;
        guidance: QuestionGuidance;
      }[] = JSON.parse(
        await readFile(
          `${root}/src/learning/guidance029${family}.json`,
          "utf8",
        ),
      );
      for (const row of rows) guidance.set(row.id, row.guidance);
    }
    expect(guidance.size).toBe(200);
    const guideModule = await source.ssrLoadModule(
      "/src/learning/guides/index.ts",
    );
    const sheetModule = await source.ssrLoadModule(
      "/src/learning/cheatsheetContent.ts",
    );
    const guide = guideModule.lessonGuides.get(
      "hucre-zarinda-madde-alisverisleri",
    );
    const sheet = [...sheetModule.builtInCheatSheets.values()].find(
      (item: unknown) => (item as { lessonId?: string }).lessonId === guide.id,
    ) as {
      topicId: string;
      title: string;
      sections: unknown[];
      examples: unknown[];
      recall: unknown[];
    };
    expect(sheet).toBeDefined();
    membraneMetadata = {
      guideMinutes: guide.minutes,
      guideSections: guide.sections.length,
      guideExamples: guide.examples.length,
      guideRecall: guide.recall.length,
      sheetTopicId: sheet.topicId,
      sheetTitle: sheet.title,
      sheetSections: sheet.sections.length,
      sheetExamples: sheet.examples.length,
      sheetRecall: sheet.recall.length,
      sheetCount: sheetModule.builtInCheatSheets.size,
    };
  } finally {
    await source.close();
  }
});

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const state = window as unknown as {
      __guidance029Writes: number;
      __guidance029AllWrites: { store: string; operation: string }[];
    };
    state.__guidance029Writes = 0;
    state.__guidance029AllWrites = [];
    for (const operation of ["put", "add", "delete", "clear"] as const) {
      const original = IDBObjectStore.prototype[operation];
      (
        IDBObjectStore.prototype as unknown as Record<
          string,
          (...args: unknown[]) => unknown
        >
      )[operation] = function (this: IDBObjectStore, ...args: unknown[]) {
        state.__guidance029AllWrites.push({ store: this.name, operation });
        if (
          operation === "put" &&
          this.name === "state" &&
          args[1] === "current"
        )
          state.__guidance029Writes++;
        return Reflect.apply(original, this, args);
      };
    }
  });
});

async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise<AppState>((resolve, reject) => {
        const request = indexedDB.open("yksmania");
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const item = db
            .transaction("state")
            .objectStore("state")
            .get("current");
          item.onerror = () => {
            db.close();
            reject(item.error);
          };
          item.onsuccess = () => {
            db.close();
            item.result
              ? resolve(item.result)
              : reject(Error("No saved state"));
          };
        };
      }),
  );
}

async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}

async function offlineReady(page: Page) {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise<void>((resolve) =>
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          () => resolve(),
          {
            once: true,
          },
        ),
      );
  });
}

for (const [subject, lessonId] of cases) {
  test(`${subject}: new guidance stages, real saved session and offline mistakes`, async ({
    page,
    context,
  }, info) => {
    test.setTimeout(90_000);
    const lesson = lessons.find((item) => item.id === lessonId)!;
    expect(lesson).toBeDefined();
    const question = lesson.questions[0];
    const help = guidance.get(question.id)!;
    expect(help).toBeDefined();
    const rawBytes = JSON.stringify(lesson.questions);
    const note = `029 ${subject} · öğrenme notu ÇĞİÖŞÜ +2 −1.`;
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Bugün", exact: true }),
    ).toBeVisible();
    await nav(page, "Sorular");
    await page.getByRole("button", { name: "TYT", exact: true }).click();
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(lesson.title.tr);
    await page.locator(`.ready-topic[data-lesson-id="${lesson.id}"]`).click();
    await expect(page.locator(".question-panel h2")).toHaveText(
      question.prompt.tr,
    );
    await expect(page.locator(".answer > span:nth-child(2)")).toHaveText(
      question.options.map((o) => o.tr),
    );
    await expect(
      page.getByRole("region", { name: "Tam çözüm", exact: true }),
    ).toHaveCount(0);
    await page.getByRole("textbox", { name: "Notun", exact: true }).fill(note);
    await expect.poll(async () => (await stored(page)).draft?.note).toBe(note);
    const before = await stored(page);
    const startedAt = before.draft!.startedAt;
    const expectedPanels = [
      ["Bilmen gerekenler", help.knowledge],
      ["Çözüm yolu", [help.strategy]],
      ...help.steps.map((step, i) => [`${i + 1}. adım`, [step]]),
    ] as [string, string[]][];
    for (let i = 0; i < expectedPanels.length; i++) {
      await page.locator(".help-next").click();
      const visible = page.locator(".help-content > section");
      await expect(visible).toHaveCount(i + 1);
      await expect(visible.nth(i).locator("h3")).toHaveText(
        expectedPanels[i][0],
      );
      for (const paragraph of expectedPanels[i][1])
        await expect(visible.nth(i)).toContainText(paragraph);
      await expect(page.locator(".help-full-solution")).toHaveCount(0);
      await expect
        .poll(async () => (await stored(page)).draft?.helpLevel)
        .toBe(i + 1);
    }
    await page.locator(".help-next").click();
    const full = page.locator(".help-full-solution");
    await expect(full).toBeVisible();
    await expect(full.locator("li")).toHaveText(help.optionReasons);
    await expect(full).toContainText(help.commonError);
    await expect(full).toContainText(help.check);
    await expect(full).toContainText(question.explanation.tr);
    await expect(page.locator(".help-next")).toHaveCount(0);
    await expect
      .poll(async () => (await stored(page)).draft?.helpLevel)
      .toBe(6);
    const helped = await stored(page);
    // XP is derived from saved learning evidence; opening help changes only
    // this unfinished draft, without adding a session, review or completion.
    expect({ ...helped, draft: before.draft }).toEqual(before);
    expect(helped.draft).toMatchObject({
      lessonId,
      note,
      startedAt,
      checked: false,
      helpLevel: 6,
      helpPanelCount: 5,
    });
    await offlineReady(page);
    await context.setOffline(true);
    await page.reload();
    await expect(page.locator(".help-full-solution li")).toHaveText(
      help.optionReasons,
    );
    await expect(
      page.getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(note);
    expect(await stored(page)).toEqual(helped);
    expect(
      await page.evaluate(
        () =>
          (window as unknown as { __guidance029Writes: number })
            .__guidance029Writes,
      ),
    ).toBe(0);

    const expectedResponses = lesson.questions.map((q, i) => ({
      questionId: q.id,
      selected: i === 0 ? (q.answer + 1) % q.options.length : q.answer,
      correct: i !== 0,
      assisted: i === 0,
      confidence: "medium",
      ...(i === 0 ? { helpLevel: 6, helpPanelCount: 5 } : {}),
    }));
    for (let i = 0; i < lesson.questions.length; i++) {
      const q = lesson.questions[i];
      await expect(page.locator(".question-panel h2")).toHaveText(q.prompt.tr);
      await page.locator(".answer").nth(expectedResponses[i].selected).click();
      await page
        .getByRole("button", { name: "Cevabı kontrol et", exact: true })
        .click();
      await expect(
        page.locator(i === 0 ? ".feedback.repair" : ".feedback.correct"),
      ).toBeVisible();
      await expect
        .poll(async () => (await stored(page)).draft?.responses)
        .toEqual(expectedResponses.slice(0, i + 1));
      await page
        .getByRole("button", {
          name:
            i === lesson.questions.length - 1
              ? "Çalışmayı kaydet"
              : "Sonraki soru",
          exact: true,
        })
        .click();
    }
    await expect(
      page.locator(".result-stats > div").first().locator("strong"),
    ).toHaveText(`${lesson.questions.length - 1}/${lesson.questions.length}`);
    await expect.poll(async () => (await stored(page)).sessions.length).toBe(1);
    const completed = await stored(page);
    expect(completed.draft).toBeNull();
    expect(completed.sessions[0]).toMatchObject({
      id: `session:${startedAt}:${lessonId}`,
      lessonId,
      note,
      responses: expectedResponses,
      kind: "learn",
      includesTheory: false,
    });
    await nav(page, "Yanlışlarım");
    const mistake = page.locator(".mistake-card");
    await expect(mistake).toHaveCount(1);
    await expect(mistake.locator("h2")).toHaveText(question.prompt.tr);
    await mistake.locator("details > summary").click();
    await expect(mistake.locator("details strong")).toContainText(
      question.options[question.answer].tr,
    );
    await expect(mistake.locator("details > p").last()).toHaveText(
      question.explanation.tr,
    );
    expect(await stored(page)).toEqual(completed);
    await page.reload();
    await expect(page.locator(".mistake-card h2")).toHaveText(
      question.prompt.tr,
    );
    expect(await stored(page)).toEqual(completed);
    expect(JSON.stringify(lesson.questions)).toBe(rawBytes);
    await info.attach("actual-guidance-session.json", {
      body: Buffer.from(JSON.stringify({ helped, completed }, null, 2)),
      contentType: "application/json",
    });
  });
}

// These literals are independently transcribed from the approved guarded view.
// Expected prompts/explanations never come from the production view function.
const guardedCases = [
  {
    id: "f093-membrane-4",
    lessonId: "hucre-zarinda-madde-alisverisleri",
    index: 3,
    answer: 3,
    selected: 3,
    options: ["8 ve3", "9 ve1", "7 ve2", "7 ve3", "6 ve6"],
    prompt:
      "Her biri 1 L sabit hacimli iki bölmede X maddesinin başlangıç derişimi dışta 8 mol/L, içte 2 mol/L’dir. Kapalı sistemde tek bir adımda dıştan içe 1 mol X aktarılıyor; üretim ve tüketim yoktur. Yeni dış/iç derişimleri mol/L olarak hangisidir?",
    explanation:
      "Her bölmede derişim değişiminin büyüklüğü Δn/V=1 mol/1 L=1 mol/L’dir. Dış derişim 8−1=7 mol/L, iç derişim 2+1=3 mol/L olur. Toplam X miktarı 7×1+3×1=10 mol olarak korunur. 8/3 madde yaratır; 9/1 aktarım yönünü ters okur; 7/2 madde kaybettirir. 6/6 toplam 12 mol verdiği için korunumla çelişir. Sayısal derişim değişimi, yalnız eşit hacimden değil açıkça verilen 1 L hacim ve 1 mol aktarımdan hesaplanır.",
  },
  {
    id: "f093-noun-10",
    lessonId: "isimler-isim-tamlamasi",
    index: 9,
    answer: 2,
    selected: 2,
    options: [
      "İlgi eki taşımayan okul adı",
      "İki ayrı sıfat-fiil",
      "Tamlanan olan çantası",
      "Tamlayan olan kapıda",
      "Ayrılma eki olan ve",
    ],
    prompt:
      "‘Öğretmenin ve öğrencinin çantası kapıda duruyor.’ cümlesinde öğretmenin ve öğrencinin sözcükleri ilgi eki almış iki tamlayan olarak kullanılmıştır. Bu tamlama grubunda ortak kullanılan unsur hangisidir?",
    explanation:
      "Öğretmenin ve öğrencinin iki tamlayandır; çantası ikisine bağlanan ortak tamlanandır. Ve bağlaçtır, bir durum eki değildir. Bu soru grubun dil bilgisel bağlantısını sorar; çantanın gerçek hayattaki paylaşımını ayrıca belirlemez.",
  },
  {
    id: "f93h-b7",
    lessonId: "degisen-dunya-dengeleri-osmanli",
    index: 6,
    answer: 3,
    selected: 2,
    rawOptions: [
      "Rusya’yla ilişkide bir kazanım elde edilmiştir.",
      "1700’deki Azak kaybı bakımından değişim olmuştur.",
      "Aynı yüzyılda farklı yönlü sonuçlar yaşanabilir.",
      "Karlofça’da kaybedilen bütün bölgeler geri alınmıştır.",
      "Tek bir yerin kazanımı bütün cepheleri açıklamaz.",
    ],
    options: [
      "Rusya’yla ilişkide bir kazanım elde edilmiştir.",
      "1700’deki Azak kaybı bakımından değişim olmuştur.",
      "Farklı tarihlerde farklı yönlü sonuçlar yaşanabilir.",
      "Karlofça’da kaybedilen bütün bölgeler geri alınmıştır.",
      "Tek bir yerin kazanımı bütün cepheleri açıklamaz.",
    ],
    prompt: "1711 Prut’ta Azak’ın geri alınmasından hangi sonuç çıkarılamaz?",
    explanation:
      "Azak’ın geri alınması Rusya cephesindeki somut kazanımdır. Karlofça’da başka taraflara bırakılan bütün yerlerin aynı işlemle geri alındığı söylenmez; ilk üç ve son seçenek bu sınırı korur.",
  },
] as const;

async function openQuestionLesson(page: Page, lesson: Lesson) {
  await nav(page, "Sorular");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(lesson.title.tr);
  const entry = page.locator(`.ready-topic[data-lesson-id="${lesson.id}"]`);
  await expect(entry).toContainText(`${lesson.questions.length} özgün soru`);
  await entry.click();
}

async function stateWrites(page: Page) {
  return page.evaluate(
    () =>
      (window as unknown as { __guidance029Writes: number })
        .__guidance029Writes,
  );
}

async function allWrites(page: Page) {
  return page.evaluate(
    () =>
      (
        window as unknown as {
          __guidance029AllWrites: { store: string; operation: string }[];
        }
      ).__guidance029AllWrites,
  );
}

async function settleRead(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
}

for (const target of guardedCases) {
  test(`${target.id}: ordinary question route retains guarded units/grammar, real answers and full help offline`, async ({
    page,
    context,
  }, info) => {
    test.setTimeout(120_000);
    const lesson = lessons.find((item) => item.id === target.lessonId)!;
    expect(lesson.questions).toHaveLength(10);
    const original = lesson.questions[target.index],
      help = guidance.get(target.id)!;
    expect(original.id).toBe(target.id);
    expect(original.options.map((option) => option.tr)).toEqual(
      "rawOptions" in target ? target.rawOptions : target.options,
    );
    expect(original.answer).toBe(target.answer);
    if (target.id === "f93h-b7") {
      expect(original.prompt.tr).toBe(target.prompt);
      expect(original.explanation.tr).toBe(target.explanation);
      expect(
        original.options.flatMap((option, i) =>
          option.tr === target.options[i] ? [] : [i],
        ),
      ).toEqual([2]);
    } else expect(original.prompt.tr).not.toBe(target.prompt);
    expect(help).toBeDefined();
    const rawBytes = JSON.stringify(lesson.questions);
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Bugün", exact: true }),
    ).toBeVisible();
    await expect(page.locator(".page-heading .quiet-chip")).toHaveText("0 XP");
    await openQuestionLesson(page, lesson);
    const responses = [] as NonNullable<AppState["draft"]>["responses"];
    // Reach the target by actual answer/check/next actions. No draft/IDB seed.
    for (let i = 0; i < target.index; i++) {
      const previous = lesson.questions[i];
      await expect(page.locator(".question-panel h2")).toHaveText(
        previous.prompt.tr,
      );
      await expect(page.locator(".answer > span:nth-child(2)")).toHaveText(
        previous.options.map((option) => option.tr),
      );
      await page.locator(".answer").nth(previous.answer).click();
      await page
        .getByRole("button", { name: "Cevabı kontrol et", exact: true })
        .click();
      await expect(page.locator(".feedback.correct")).toBeVisible();
      responses.push({
        questionId: previous.id,
        selected: previous.answer,
        correct: true,
        assisted: false,
        confidence: "medium",
      });
      await expect
        .poll(async () => (await stored(page)).draft?.responses)
        .toEqual(responses);
      await page
        .getByRole("button", { name: "Sonraki soru", exact: true })
        .click();
      await expect
        .poll(async () => (await stored(page)).draft?.index)
        .toBe(i + 1);
    }
    await expect(page.locator(".question-panel h2")).toHaveText(target.prompt);
    await expect(page.locator(".question-panel")).toContainText(
      `Soru ${target.index + 1} / 10`,
    );
    await expect(page.locator(".answer > span:nth-child(2)")).toHaveText(
      target.options,
    );
    const note = `029 ${target.id} · gerçek UI notu Δc ve tamlayan ÇĞİÖŞÜ.`;
    await page.getByRole("textbox", { name: "Notun", exact: true }).fill(note);
    await expect.poll(async () => (await stored(page)).draft?.note).toBe(note);
    const before = await stored(page);
    expect(before.sessions).toEqual([]);
    expect(before.reviews).toEqual([]);
    expect(before.topicProgress).toEqual({});
    const panels = [
      ["Bilmen gerekenler", help.knowledge],
      ["Çözüm yolu", [help.strategy]],
      ...help.steps.map((step, i) => [`${i + 1}. adım`, [step]]),
    ] as [string, string[]][];
    for (let level = 1; level <= 6; level++) {
      await page.locator(".help-next").click();
      await expect
        .poll(async () => (await stored(page)).draft?.helpLevel)
        .toBe(level);
      if (level <= 5) {
        const sections = page.locator(".help-content > section");
        await expect(sections).toHaveCount(level);
        await expect(sections.nth(level - 1).locator("h3")).toHaveText(
          panels[level - 1][0],
        );
        for (const paragraph of panels[level - 1][1])
          await expect(sections.nth(level - 1)).toContainText(paragraph);
        await expect(page.locator(".help-full-solution")).toHaveCount(0);
      }
    }
    const full = page.locator(".help-full-solution");
    await expect(full).toBeVisible();
    await expect(full.locator("li")).toHaveText(help.optionReasons);
    await expect(full).toContainText(target.explanation);
    await expect(full).toContainText(help.commonError);
    await expect(full).toContainText(help.check);
    await expect(page.locator(".help-next")).toHaveCount(0);
    await page.locator(".answer").nth(target.selected).click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    const targetCorrect = target.selected === target.answer;
    await expect(
      page.locator(targetCorrect ? ".feedback.correct" : ".feedback.repair"),
    ).toBeVisible();
    await expect(page.locator(".answer.answer-wrong")).toHaveCount(
      targetCorrect ? 0 : 1,
    );
    await expect(page.locator(".answer.chosen")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.locator(".answer.answer-correct")).toHaveCount(1);
    await expect(
      page.locator(".answer.answer-correct > span:nth-child(2)"),
    ).toHaveText(target.options[target.answer]);
    responses.push({
      questionId: target.id,
      selected: target.selected,
      correct: targetCorrect,
      assisted: true,
      confidence: "medium",
      helpLevel: 6,
      helpPanelCount: 5,
    });
    await expect
      .poll(async () => (await stored(page)).draft?.responses)
      .toEqual(responses);
    const helped = await stored(page);
    expect({ ...helped, draft: before.draft }).toEqual(before);
    expect(helped.draft).toMatchObject({
      lessonId: target.lessonId,
      index: target.index,
      selected: target.selected,
      checked: true,
      note,
      responses,
      helpLevel: 6,
      helpPanelCount: 5,
      hint: true,
      startedAt: before.draft!.startedAt,
    });
    await offlineReady(page);
    await context.setOffline(true);
    await page.reload();
    await expect(page.locator(".question-panel h2")).toHaveText(target.prompt);
    await expect(page.locator(".answer > span:nth-child(2)")).toHaveText(
      target.options,
    );
    await expect(
      page.locator(".answer.answer-correct > span:nth-child(2)"),
    ).toHaveText(target.options[target.answer]);
    await expect(
      page.locator(targetCorrect ? ".feedback.correct" : ".feedback.repair"),
    ).toBeVisible();
    await expect(page.locator(".answer.chosen > span:nth-child(2)")).toHaveText(
      target.options[target.selected],
    );
    await expect(page.locator(".answer.answer-wrong")).toHaveCount(
      targetCorrect ? 0 : 1,
    );
    await expect(page.locator(".help-full-solution li")).toHaveText(
      help.optionReasons,
    );
    await expect(page.locator(".help-full-solution")).toContainText(
      target.explanation,
    );
    await expect(
      page.getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(note);
    await expect(page.locator(".help-next")).toHaveCount(0);
    await settleRead(page);
    expect(await stored(page)).toEqual(helped);
    expect(await stateWrites(page)).toBe(0);
    expect(await allWrites(page)).toEqual([]);
    expect(JSON.stringify(lesson.questions)).toBe(rawBytes);
    await info.attach(`${target.id}-offline-state.json`, {
      body: Buffer.from(JSON.stringify({ before, helped }, null, 2)),
      contentType: "application/json",
    });
    await info.attach(`${target.id}-offline.png`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
    await nav(page, "Bugün");
    await expect(page.locator(".page-heading .quiet-chip")).toHaveText("0 XP");
    expect(await stored(page)).toEqual(helped);
    expect(await stateWrites(page)).toBe(0);
    expect(await allWrites(page)).toEqual([]);
  });
}

async function activate(locator: Locator, touch: boolean) {
  if (touch) await locator.tap();
  else await locator.click();
}

async function useLexend(page: Page, scale: number, textSize: number) {
  await nav(page, "Ayarlar");
  await page
    .getByRole("combobox", { name: "Yazı tipi", exact: true })
    .selectOption("lexend");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill(String(scale));
  await page
    .getByLabel("Yalnızca yazı boyutu %", { exact: true })
    .fill(String(textSize));
  await page.getByRole("switch", { name: /Aion animasyonu/ }).uncheck();
  await expect
    .poll(async () => {
      const state = await stored(page);
      return {
        font: state.settings.font,
        scale: state.settings.scale,
        textSize: state.settings.textSize,
        motion: state.settings.motion,
      };
    })
    .toEqual({ font: "lexend", scale, textSize, motion: false });
}

async function readingGeometry(page: Page, scope: Locator, phone: boolean) {
  const font = await scope
    .locator(".example-prompt")
    .evaluate(async (element) => {
      await document.fonts.ready;
      const style = getComputedStyle(element);
      const faces = await document.fonts.load(
        `${style.fontWeight} ${style.fontSize} Lexend`,
      );
      return {
        family: style.fontFamily,
        size: style.fontSize,
        loaded: faces.map((face) => face.status),
        available: document.fonts.check(
          `${style.fontWeight} ${style.fontSize} Lexend`,
        ),
        rootSize: getComputedStyle(document.documentElement).fontSize,
        textScale: getComputedStyle(document.documentElement)
          .getPropertyValue("--text-scale")
          .trim(),
      };
    });
  expect(font.family).toContain("Lexend");
  expect(font.available).toBe(true);
  expect(font.loaded.length).toBeGreaterThan(0);
  expect(font.loaded.every((status) => status === "loaded")).toBe(true);
  expect(font.size).toBe(phone ? "45px" : "15px");
  expect(font.rootSize).toBe(phone ? "32px" : "16px");
  expect(font.textScale).toBe(phone ? "1.5" : "1");
  const layout = await scope.evaluate((element) => {
    const outer = element.getBoundingClientRect(),
      outside: string[] = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      if (!node.textContent?.trim()) continue;
      const parent = node.parentElement;
      if (!parent || !parent.getClientRects().length) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const rect of range.getClientRects()) {
        if (
          rect.width &&
          (rect.left < outer.left - 2 || rect.right > outer.right + 2)
        )
          outside.push(node.textContent.trim());
      }
    }
    return {
      viewport: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      scopeWidth: outer.width,
      outside: [...new Set(outside)],
    };
  });
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewport + 1);
  expect(layout.outside).toEqual([]);
  return { font, layout };
}

// Frozen against the linked-guide owner's final e19e77a5/8e5e8f67 handoff.
// These approved display literals are not calculated by a production helper.
const membraneModelCaption =
  "Her bölmenin sabit hacmi 1 model hacim birimi seçildi. Bu ölçekte derişim = miktar / hacim; aktarılan miktar 1 ise derişim değişimi de 1’dir. Üretim ve tüketim yok. Na⁺ için elektriksel potansiyel farkı 0 kabul edilir; gerçek iyon yönünde elektrik ve derişim farkı birlikte etkilidir. Seçilen geçiş katsayısı bu model içindir; adım gerçek saniye değildir.";
const membraneWorked = {
  title: "İki bölmede maddeyi koru",
  prompt:
    "Her biri 1 model hacim birimi olan eşit ve sabit hacimli iki bölmede O₂ derişimleri dışta 8, içte 2 model miktar birimi / model hacim birimidir. Derişim, madde miktarının hacme oranıdır. Elektriksel etki yok, uygun yol açık; üretim ve tüketim yoktur. Bir model adımı dıştan içe 1 model miktar birimi aktarırsa yeni derişimler ve toplam madde miktarı ne olur?",
  steps: [
    {
      label: "Yön",
      expression: "8 > 2",
      explanation:
        "O₂ küçük apolar örnektir; uygun yolda pasif net geçiş 8’den 2’ye olur.",
    },
    {
      label: "İki tarafı güncelle",
      expression: "Dış: (8 − 1) / 1 = 7; iç: (2 + 1) / 1 = 3",
      explanation:
        "Aktarılan miktar 1 model miktar birimidir. Her bölmenin hacmi 1’dir. Bu yüzden her derişim için değişim büyüklüğü Δc = Δn / V = 1 / 1 = 1 olur; dışarıdan çıkar, içeriye ekle.",
    },
    {
      label: "Korunumu denetle",
      expression: "n toplam = 8 × 1 + 2 × 1 = 7 × 1 + 3 × 1 = 10",
      explanation:
        "Başlangıç miktarları dışta 8 × 1 = 8, içte 2 × 1 = 2 model miktar birimidir. Son miktarlar 7 ve 3 olup toplam 10 korunur. Her hacim 1’dir; bu ölçekte derişim ve miktarın sayısal değerleri aynıdır. Korunum madde miktarı için kurulur. Model gerçek süre veya hücrenin oksijen tüketimini içermez.",
    },
  ],
  answer:
    "Dış derişim 7, iç derişim 3 model miktar birimi / model hacim birimi; toplam madde miktarı 10 model miktar birimi.",
  check: "Dengeye yaklaşılmıştır; fark 6’dan 4’e indi.",
  pitfall:
    "Yalnız içi artırıp dışı sabit bırakmak kapalı iki bölmede madde yaratır.",
} as const;

async function openMembraneWorked(page: Page, touch: boolean) {
  const example = page
    .locator(".guide-examples > .worked-example")
    .filter({ has: page.getByText(membraneWorked.title, { exact: true }) });
  await expect(example).toHaveCount(1);
  await activate(example.locator(":scope > summary"), touch);
  await expect(example.locator(".example-prompt")).toHaveText(
    membraneWorked.prompt,
  );
  await expect(example.locator(".worked-steps > li")).toHaveCount(0);
  for (let i = 0; i < 3; i++) {
    await activate(
      example.getByRole("button", {
        name: i === 0 ? "İlk adımı göster" : "Sonraki adım",
        exact: true,
      }),
      touch,
    );
    const steps = example.locator(".worked-steps > li");
    await expect(steps).toHaveCount(i + 1);
    await expect(steps.nth(i).locator(":scope > strong")).toHaveText(
      membraneWorked.steps[i].label,
    );
    await expect(steps.nth(i).locator(".math-expression")).toHaveText(
      membraneWorked.steps[i].expression,
    );
    await expect(steps.nth(i).locator("p").last()).toHaveText(
      membraneWorked.steps[i].explanation,
    );
    await expect(example.locator(".worked-conclusion")).toHaveCount(
      i === 2 ? 1 : 0,
    );
  }
  await expect(example.locator(".worked-conclusion > p")).toHaveText([
    `Sonuç: ${membraneWorked.answer}`,
    `Kontrol: ${membraneWorked.check}`,
    `Dikkat: ${membraneWorked.pitfall}`,
  ]);
  return example;
}

async function openMembraneSheetWorked(page: Page, touch: boolean) {
  const example = page
    .locator(".cheat-examples > .worked-example")
    .filter({ has: page.getByText(membraneWorked.title, { exact: true }) });
  await expect(example).toHaveCount(1);
  await activate(example.locator(":scope > summary"), touch);
  await expect(example.locator(".example-prompt")).toHaveText(
    membraneWorked.prompt,
  );
  await activate(example.locator(".cheat-solution > summary"), touch);
  await expect(example.locator(".cheat-solution li")).toHaveText(
    membraneWorked.steps.map(
      (step) => `${step.label} · ${step.expression} · ${step.explanation}`,
    ),
  );
  await expect(example.locator(".cheat-solution > p")).toHaveText(
    `Sonuç ve kontrol: ${membraneWorked.answer} ${membraneWorked.check}`,
  );
  return example;
}

const readerProfiles = [
  {
    name: "normal Lexend",
    width: 1280,
    height: 900,
    scale: 100,
    text: 100,
    phone: false,
  },
  {
    name: "320px phone Lexend UI200 text150",
    width: 320,
    height: 844,
    scale: 200,
    text: 150,
    phone: true,
  },
] as const;

test.describe("linked membrane guide and built-in sheet", () => {
  test.use({ hasTouch: true });
  for (const profile of readerProfiles) {
    test(`${profile.name}: explicit unit scope, three worked steps and UI notes survive offline without learning writes`, async ({
      page,
      context,
    }, info) => {
      test.setTimeout(180_000);
      expect(membraneMetadata).toEqual({
        guideMinutes: 75,
        guideSections: 10,
        guideExamples: 4,
        guideRecall: 5,
        sheetTopicId: "detail-12",
        sheetTitle: "Hücre Zarında Madde Alışverişleri",
        sheetSections: 10,
        sheetExamples: 2,
        sheetRecall: 5,
        sheetCount: 501,
      });
      const lesson = lessons.find(
        (item) => item.id === "hucre-zarinda-madde-alisverisleri",
      )!;
      expect(lesson.questions).toHaveLength(10);
      const rawLessonBytes = JSON.stringify(lesson);
      await page.setViewportSize({
        width: profile.width,
        height: profile.height,
      });
      await page.goto("/");
      await expect(
        page.getByRole("heading", { name: "Bugün", exact: true }),
      ).toBeVisible();
      await useLexend(page, profile.scale, profile.text);
      const baseline = await stored(page);
      expect(baseline.sessions).toEqual([]);
      expect(baseline.draft).toBeNull();
      expect(baseline.topicProgress).toEqual({});
      await nav(page, "Konu Anlatımı");
      await page.getByRole("button", { name: "TYT", exact: true }).click();
      await page
        .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
        .fill(lesson.title.tr);
      const entry = page.locator(`.ready-topic[data-lesson-id="${lesson.id}"]`);
      await expect(entry).toContainText("75 dk");
      await activate(entry, profile.phone);
      await expect(page.locator(".study-title h1")).toHaveText(
        "Hücre zarında madde alışverişleri",
      );
      await expect(page.locator(".guide-section")).toHaveCount(10);
      await expect(
        page.locator(".guide-examples > .worked-example"),
      ).toHaveCount(4);
      await expect(page.locator(".guide-recall > details")).toHaveCount(5);
      await expect(page.locator(".guide-contents")).toContainText(
        "Yaklaşık 75 dk",
      );
      await expect(
        page
          .locator(".f093-membrane")
          .getByText(membraneModelCaption, { exact: true }),
      ).toBeVisible();
      await settleRead(page);
      expect(await stored(page)).toEqual(baseline);
      const theoryNote = `029 ${profile.name} · miktar = derişim × hacim; 1 / 1. ÇĞİÖŞÜ`;
      await page
        .getByRole("textbox", { name: "Notun", exact: true })
        .fill(theoryNote);
      await expect
        .poll(async () => (await stored(page)).notes[`lesson:${lesson.id}`])
        .toBe(theoryNote);
      const afterTheoryNote = await stored(page);
      expect(afterTheoryNote).toEqual({
        ...baseline,
        notes: { ...baseline.notes, [`lesson:${lesson.id}`]: theoryNote },
      });
      await openMembraneWorked(page, profile.phone);
      expect(await stored(page)).toEqual(afterTheoryNote);
      await offlineReady(page);
      await context.setOffline(true);
      await page.reload();
      await expect(page.locator(".study-title h1")).toHaveText(
        "Hücre zarında madde alışverişleri",
      );
      await expect(
        page.getByRole("textbox", { name: "Notun", exact: true }),
      ).toHaveValue(theoryNote);
      await settleRead(page);
      expect(await stored(page)).toEqual(afterTheoryNote);
      expect(await allWrites(page)).toEqual([]);
      const theoryExample = await openMembraneWorked(page, profile.phone);
      const theoryGeometry = await readingGeometry(
        page,
        theoryExample,
        profile.phone,
      );
      await info.attach(`${profile.name}-theory-worked.png`, {
        body: await theoryExample.screenshot(),
        contentType: "image/png",
      });
      const theoryAxe = await new AxeBuilder({ page }).analyze();
      await info.attach(`${profile.name}-theory-axe.json`, {
        body: Buffer.from(JSON.stringify(theoryAxe, null, 2)),
        contentType: "application/json",
      });
      expect(
        theoryAxe.violations.filter((violation) =>
          ["serious", "critical"].includes(violation.impact ?? ""),
        ),
      ).toEqual([]);
      expect(await stored(page)).toEqual(afterTheoryNote);
      expect(await allWrites(page)).toEqual([]);

      await nav(page, "Kopya Kağıtları");
      await expect(page.locator(".page-heading")).toContainText(
        "501 hazır kağıt",
      );
      await page.getByRole("button", { name: "TYT", exact: true }).click();
      await page
        .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
        .fill("Hücre Zarında Madde Alışverişleri");
      await activate(
        page.getByRole("button", {
          name: "Hücre Zarında Madde Alışverişleri",
          exact: true,
        }),
        profile.phone,
      );
      await expect(page.locator(".study-title h1")).toHaveText(
        "Hücre Zarında Madde Alışverişleri",
      );
      await expect(
        page.locator(".cheat-sections > .cheat-section"),
      ).toHaveCount(10);
      await expect(
        page.locator(".cheat-examples > .worked-example"),
      ).toHaveCount(2);
      await expect(page.locator(".cheat-recall-card")).toHaveCount(5);
      await settleRead(page);
      expect(await stored(page)).toEqual(afterTheoryNote);
      expect(await allWrites(page)).toEqual([]);
      const sheetNote = `029 ${profile.name} · kopya notu; toplam 10 miktar birimi.`;
      await page
        .getByRole("textbox", { name: "Notun", exact: true })
        .fill(sheetNote);
      await expect
        .poll(async () => (await stored(page)).notes["cheatsheet:detail-12"])
        .toBe(sheetNote);
      const afterSheetNote = await stored(page);
      expect(afterSheetNote).toEqual({
        ...afterTheoryNote,
        notes: { ...afterTheoryNote.notes, "cheatsheet:detail-12": sheetNote },
      });
      await openMembraneSheetWorked(page, profile.phone);
      expect(await stored(page)).toEqual(afterSheetNote);
      await page.reload();
      await expect(page.locator(".study-title h1")).toHaveText(
        "Hücre Zarında Madde Alışverişleri",
      );
      await expect(
        page.getByRole("textbox", { name: "Notun", exact: true }),
      ).toHaveValue(sheetNote);
      await settleRead(page);
      expect(await stored(page)).toEqual(afterSheetNote);
      expect(await allWrites(page)).toEqual([]);
      const sheetExample = await openMembraneSheetWorked(page, profile.phone);
      const sheetGeometry = await readingGeometry(
        page,
        sheetExample,
        profile.phone,
      );
      await info.attach(`${profile.name}-sheet-worked.png`, {
        body: await sheetExample.screenshot(),
        contentType: "image/png",
      });
      const sheetAxe = await new AxeBuilder({ page }).analyze();
      await info.attach(`${profile.name}-sheet-axe.json`, {
        body: Buffer.from(JSON.stringify(sheetAxe, null, 2)),
        contentType: "application/json",
      });
      expect(
        sheetAxe.violations.filter((violation) =>
          ["serious", "critical"].includes(violation.impact ?? ""),
        ),
      ).toEqual([]);
      expect(await stored(page)).toEqual(afterSheetNote);
      expect(await allWrites(page)).toEqual([]);
      expect(JSON.stringify(lesson)).toBe(rawLessonBytes);
      await info.attach(`${profile.name}-reader-state-geometry.json`, {
        body: Buffer.from(
          JSON.stringify(
            {
              baseline,
              afterTheoryNote,
              afterSheetNote,
              theoryGeometry,
              sheetGeometry,
            },
            null,
            2,
          ),
        ),
        contentType: "application/json",
      });
      await nav(page, "Bugün");
      await expect(page.locator(".page-heading .quiet-chip")).toHaveText(
        "0 XP",
      );
      expect(await stored(page)).toEqual(afterSheetNote);
      expect(await allWrites(page)).toEqual([]);
    });
  }
});
