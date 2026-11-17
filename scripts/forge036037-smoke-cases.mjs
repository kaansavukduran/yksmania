import { expect } from "@playwright/test";
import { readForge014SmokeState as readState } from "./forge014-smoke-cases.mjs";
import { runForge034035SmokeCase } from "./forge034035-smoke-cases.mjs";

// Literal arithmetic examples exercise the real UI; no production model or keys are imported.
const click = (lab, name) =>
  lab.getByRole("button", { name, exact: true }).click();
const result = (lab) => lab.locator("[data-model-result]");
const learning = (s) => ({
  sessions: s.sessions,
  reviews: s.reviews,
  theoryReviewCompletions: s.theoryReviewCompletions,
  topicProgress: s.topicProgress,
  unlocked: s.unlocked,
  notes: s.notes,
  settings: s.settings,
  draft: s.draft,
  examDraft: s.examDraft,
  examSessions: s.examSessions,
  focusTimer: s.focusTimer,
});

export const forge036037SmokeCases = [
  {
    id: "tyt-mat-dogrusal-denklemler-kaynak-036",
    title: "Birinci dereceden denklemler: eşitliği koru, modeli kur",
    selector: ".f036-lab",
    storedKey: "linear-equations-source-036",
    note: "036: eşitliğin bütün tarafını korurum; yasak değeri ve adedin tam sayı koşulunu geri denetlerim. ÇĞİÖŞÜ.",
    persisted: {
      mode: 6,
      priceMode: true,
      adults: 2,
      students: 3,
      priceDifference: 45,
      priceTotal: 390,
    },
    async act(lab, onMode = async () => {}) {
      await click(lab, "İki tarafı keşfet");
      await click(lab, "3x+6=24 örneği");
      await expect(result(lab)).toContainText("Tek kök x=6");
      await expect(lab.getByRole("img")).toHaveAccessibleName(
        "x=6 için sol 24, sağ 24; eşit",
      );
      await expect(lab.locator(".f036-bar-a")).toHaveAttribute("width", "232");
      await expect(lab.locator(".f036-bar-b")).toHaveAttribute("width", "232");
      const numerator = lab.getByRole("slider", {
        name: "Deneme x payı",
        exact: true,
      });
      const denominator = lab.getByRole("slider", {
        name: "Deneme x paydası",
        exact: true,
      });
      await denominator.press("ArrowRight");
      await expect(denominator).toHaveValue("2");
      await expect(numerator).toHaveValue("6");
      await expect(lab.getByRole("img")).toHaveAccessibleName(
        "x=3 için sol 15, sağ 24; eşit değil",
      );
      await click(lab, "Özdeşlik kur");
      await expect(result(lab)).toContainText("Bütün izinli değerler çözüm");
      await click(lab, "Çelişki kur");
      await expect(result(lab)).toContainText("Çözüm yok");

      await onMode("balance");
      await click(lab, "Dağıt ve karşılaştır");
      await click(lab, "4(x−3) örneği");
      await expect(result(lab)).toContainText(
        "Doğru açılım: (4)x+(-12); Tek kök x=11.",
      );
      await expect(lab).toContainText("Tek kök x=13/2");
      await expect(lab.getByRole("img")).toHaveAccessibleName(
        "4, x ve -3 ile ayrı çarpılır; doğru sabit -12",
      );
      await click(lab, "Negatif dış katsayı");
      await expect(result(lab)).toContainText(
        "Doğru açılım: (-2)x+(6); Tek kök x=-2.",
      );

      await onMode("distribution");
      await click(lab, "Sabit paydalar");
      await click(lab, "Paydalar 3 ve 2");
      await expect(result(lab)).toContainText("Tek kök x=32/5.");
      await expect(result(lab)).toContainText(
        "İlk kesirli sol taraf 6, sağ taraf 6.",
      );
      await expect(lab.getByRole("img").first()).toHaveAccessibleName(
        "Ortak kat 6; ilk pay 2, ikinci pay 3, sağ taraf da 6 ile çarpılır",
      );
      await click(lab, "Çıkarma örneği");
      await expect(result(lab)).toContainText("Tek kök x=-2.");

      await onMode("fractions");
      await click(lab, "Yasak değeri koru");
      await click(lab, "Yasak aday");
      await expect(result(lab)).toContainText("Çözüm yok.");
      await expect(result(lab)).toContainText(
        "Cebirsel aday 1 başlangıç paydasını 0 yapar ve elenir.",
      );
      await expect(lab.locator(".f036-forbidden")).toHaveCount(1);
      await click(lab, "Bir değeri eksik özdeşlik");
      await expect(result(lab)).toContainText(
        "Bütün gerçek sayılar, yalnız 1 hariç.",
      );
      await click(lab, "İzinli kök");
      await expect(result(lab)).toContainText("İzinli kök x=3.");

      await onMode("excluded");
      await click(lab, "Sözden paranteze");
      await click(lab, "Çarp, sonra ekle");
      await expect(result(lab)).toContainText("Tek kök x=25/3");
      await click(lab, "Ekle, sonra çarp");
      await expect(result(lab)).toContainText("Tek kök x=5");
      await expect(lab.getByRole("img")).toHaveAccessibleName(
        "İşlem sırası: önce 5 ekle sonra 3 ile çarp",
      );

      await onMode("words");
      await click(lab, "Örüntüde geçişler");
      await click(lab, "İlk 1, artış 3, hedef 241");
      await expect(result(lab)).toContainText("Hedef için n=81.");
      await expect(lab.locator(".f036-step")).toHaveCount(80);
      await expect(lab.getByRole("img")).toHaveAccessibleName(
        "81 adımın tamamı işaretlendi; 80 geçiş; ilk değer 1, son 241",
      );
      await click(lab, "İlk terimi 2 yap");
      await expect(result(lab)).toContainText(
        "Hedefe ulaşılan pozitif tam sayı adımı yok.",
      );
      await expect(result(lab)).toContainText("Cebirsel aday n=242/3.");
      await click(lab, "İlk 5, artış 4, hedef 69");
      await expect(result(lab)).toContainText("Hedef için n=17.");
      await expect(lab.locator(".f036-step")).toHaveCount(16);

      await onMode("pattern");
      await click(lab, "Biletleri modelle");
      await click(lab, "Adedi bul");
      await expect(result(lab)).toContainText("6 yetişkin, 6 öğrenci.");
      await expect(lab.getByRole("img")).toHaveAccessibleName(
        "6 yetişkin ve 6 öğrenci; toplam 12 kişi",
      );
      await expect(lab.locator("svg rect")).toHaveCount(12);
      await click(lab, "Fiyatı bul");
      await expect(result(lab)).toContainText(
        "Öğrenci 60 TL; yetişkin 105 TL.",
      );
      await expect(lab.locator("svg rect")).toHaveCount(5);
      await onMode("tickets");
    },
    async assertModel(lab) {
      await expect(lab.locator('[data-mode="tickets"]')).toBeVisible();
      await expect(result(lab)).toContainText(
        "Öğrenci 60 TL; yetişkin 105 TL.",
      );
      await expect(result(lab)).toContainText(
        "Sayısal toplam kontrolü 390 TL; beklenen 390 TL.",
      );
      await expect(lab.locator("svg rect")).toHaveCount(5);
    },
  },
  {
    id: "tyt-mat-basit-esitsizlikler-kaynak-037",
    title: "Basit eşitsizlikler: sırayı koru, bütün çözümü gör",
    selector: ".f037-lab",
    storedKey: "basic-inequalities-source-037",
    note: "037: negatif bölmede yönü değiştiririm; TL ile bin TL ayrı değişkendir ve bütün çözüm bölgesini denetlerim. ÇĞİÖŞÜ.",
    persisted: { mode: 6, parameter: -2, px: 0, pxd: 1, factorMode: true },
    async act(lab, onMode = async () => {}) {
      await click(lab, "Bütün çözümler");
      await click(lab, "5x−7≤18");
      await expect(result(lab)).toContainText("ÇK=(−∞, 5].");
      await expect(lab.locator(".f037-closed")).toHaveCount(1);
      expect(
        Number(await lab.locator(".f037-closed").getAttribute("cx")),
      ).toBeCloseTo(305.8064516129, 7);
      await click(lab, "Negatif katsayı");
      await expect(result(lab)).toContainText("ÇK=(−∞, -3).");
      await expect(result(lab)).toContainText("ilişkisi yanlış");
      await expect(lab.locator(".f037-open")).toHaveCount(1);
      await click(lab, "Bütün gerçekler");
      await expect(result(lab)).toContainText("ÇK=ℝ.");
      await click(lab, "Boş küme");
      await expect(result(lab)).toContainText("ÇK=∅.");
      await expect(lab.locator(".f037-solution")).toHaveCount(0);

      await onMode("general");
      await click(lab, "Yön neden değişir?");
      await click(lab, "−1 ile yansıt");
      await expect(result(lab)).toContainText("Sonuç: 3 > -2; doğru.");
      await expect(lab.locator(".f037-reflection circle")).toHaveCount(4);
      await click(lab, "−5 ekle, yönü koru");
      await expect(result(lab)).toContainText("Sonuç: -8 < -3; doğru.");
      await click(lab, "Sıfırla çarpma kaybı");
      await expect(result(lab)).toContainText(
        "Sıfırla çarpma aynı çözüm bilgisini koruyan tersinir bir dönüşüm değildir.",
      );
      await click(lab, "Aynı sayıya böl");
      await expect(
        lab
          .getByRole("group", { name: "İşlem", exact: true })
          .getByRole("button", { name: "Aynı sayıya böl", exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(result(lab)).toContainText("Sıfıra bölme tanımsızdır.");
      await expect(lab.locator("svg")).toHaveCount(0);

      await click(lab, "−1 ile yansıt");
      await onMode("operations");
      await click(lab, "İki sınır birlikte");
      await click(lab, "−2<3x+1≤10");
      await expect(result(lab)).toContainText("ÇK=(-1, 3].");
      await expect(lab.locator(".f037-lines dd").last()).toHaveText("(-1, 3]");
      await click(lab, "Sabit payda");
      await expect(result(lab)).toContainText("ÇK=[7, 16).");
      await click(lab, "Sıfır katsayıyı incele");
      await expect(result(lab)).toContainText("ÇK=∅.");

      await click(lab, "Ek negatif katsayı denemesi");
      await expect(result(lab)).toContainText("ÇK=[-4, 3).");
      await onMode("compound");
      await click(lab, "Ve / veya");
      await click(lab, "İki ayrı ışın");
      await expect(result(lab)).toContainText("ÇK=(−∞, -2] ∪ (3, ∞).");
      await click(lab, "Aynı ışınlarda boş kesişim");
      await expect(result(lab)).toContainText("ÇK=∅.");
      await click(lab, "Ek tek nokta denemesi");
      await expect(result(lab)).toContainText("ÇK={2}.");
      await click(lab, "Ek eksik nokta denemesi");
      await expect(result(lab)).toContainText("ÇK=(−∞, 2) ∪ (2, ∞).");
      await click(lab, "Ek bütün gerçekler denemesi");
      await expect(result(lab)).toContainText("ÇK=ℝ.");

      await onMode("logic");
      await click(lab, "Bütçede tam sayılar");
      await click(lab, "8 ders sınırı");
      await expect(result(lab)).toContainText("En fazla 8 adet.");
      await expect(result(lab)).toContainText(
        "hemen sonraki 9 adedin 960 TL gideri bütçeye uymaz.",
      );
      await expect(lab.locator(".f037-counts circle")).toHaveCount(9);
      await click(lab, "Sabit gideri bile karşılamayan bütçe");
      await expect(result(lab)).toContainText("Uygun adet yok.");
      await expect(lab.locator(".f037-counts circle")).toHaveCount(0);

      await click(lab, "8 ders sınırı");
      await onMode("budget");
      await click(lab, "Kâr, zarar ve birim");
      await click(lab, "İki satış, bin TL ölçeği");
      await expect(result(lab)).toContainText(
        "u∈(10, 30); b∈(10000, 30000) TL.",
      );
      await expect(result(lab)).toContainText("Deneme u=20 → b=20000 TL");
      await expect(lab).toContainText("|b−20000| < 10000");
      await click(lab, "80+b maliyete aktar (TL)");
      await expect(result(lab)).toContainText("b∈[60, ∞) TL.");
      await expect(result(lab)).toContainText("Deneme b=60 → b=60 TL");

      await onMode("profit");
      await click(lab, "Parametrenin işareti");
      await click(lab, "a·x<6 parametresi");
      await click(lab, "a=2");
      await expect(result(lab)).toContainText("ÇK=(−∞, 3).");
      await click(lab, "a=0");
      await expect(result(lab)).toContainText("ÇK=ℝ.");
      await click(lab, "a=−2");
      await expect(result(lab)).toContainText("ÇK=(-3, ∞).");
      await onMode("parameter");
      await click(lab, "x−1’e bölmenin koşulu");
      await click(lab, "x=1: bölme yasak");
      await expect(result(lab)).toContainText(
        "x=1 için x−1=0; bu ifadeye bölme tanımsızdır.",
      );
      await click(lab, "x=0: negatif");
      await expect(result(lab)).toContainText(
        "Bölen negatif, yön döner: -2 > -5.",
      );
    },
    async assertModel(lab) {
      await expect(lab.locator('[data-mode="parameter"]')).toBeVisible();
      await expect(result(lab)).toContainText("x=0, x−1=-1.");
      await expect(result(lab)).toContainText(
        "Bölen negatif, yön döner: -2 > -5.",
      );
    },
  },
];

// The existing generic runner verifies navigation, note/state equality and offline reload.
export const runForge036037SmokeCase = runForge034035SmokeCase;

export async function assertForge036037ProcessRestart(
  page,
  navigate,
  snapshots,
) {
  expect(snapshots).toHaveLength(2);
  const before = learning(await readState(page));
  for (const snapshot of snapshots) {
    const unit = forge036037SmokeCases.find(
      (candidate) => candidate.id === snapshot.id,
    );
    expect(unit).toBeTruthy();
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
    expect((await readState(page)).notes[`lesson:${unit.id}`]).toBe(
      snapshot.note,
    );
    await navigate("Konu Anlatımı");
    await page.getByRole("button", { name: "TYT", exact: true }).click();
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(unit.title);
    const subject = page.locator(".subject-panel").filter({
      has: page.getByRole("heading", { name: "Matematik", exact: true }),
    });
    const entry = subject.locator(`.ready-topic[data-lesson-id="${unit.id}"]`);
    if (!(await entry.isVisible()))
      await subject.locator(".subject-header").click();
    await entry.click();
    await unit.assertModel(page.locator(unit.selector));
    await expect(
      page.getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(snapshot.note);
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
  }
  expect(learning(await readState(page))).toEqual(before);
}
