import { expect } from "@playwright/test";
import { readForge014SmokeState as readState } from "./forge014-smoke-cases.mjs";

// Plain JavaScript acceptance cases shared by Pages and the real Electron app.
// Expected values below are authored literals, independent of the app's models.
async function setRange(lab, label, value) {
  const input = lab.getByRole("slider", { name: label, exact: true });
  const min = Number(await input.getAttribute("min"));
  const max = Number(await input.getAttribute("max"));
  const step = Number((await input.getAttribute("step")) || 1);
  const current = Number(await input.inputValue());
  const start = [
    { at: current, key: "" },
    { at: min, key: "Home" },
    { at: max, key: "End" },
  ].sort((a, b) => Math.abs(a.at - value) - Math.abs(b.at - value))[0];
  if (start.key) await input.press(start.key);
  for (let i = 0; i < Math.round(Math.abs(value - start.at) / step); i++)
    await input.press(value > start.at ? "ArrowRight" : "ArrowLeft");
  await expect(input).toHaveValue(String(value));
}

export const forge020SmokeCases = [
 {id:"ureme-kadin-organlar",exam:"AYT",title:"Kadın üreme organları: yapı, yol ve görev",storedKey:"forge020-bio-female",persisted:{site:"uterus",open:false,step:4},expected:["Hücre: Kanal girişi.","Seçili yapı: Rahim."],
 async act(lab){await setRange(lab,"Yol adımı",4);await lab.getByLabel("Şemanın solundaki tüp açık",{exact:true}).uncheck();await lab.getByLabel("Yapı",{exact:true}).selectOption("uterus");},
 async assertModel(lab){await expect(lab.locator("[data-route-step]")).toHaveAttribute("data-route-step","1");await expect(lab.locator("[data-tube-stop]")).toHaveAttribute("d","M116 58l18 22");}},
 {id:"ayt-denge-basinc-hacim",exam:"AYT",title:"Dengeye basınç ve hacim etkisi",storedKey:"forge020:chemistry:ayt-denge-basinc-hacim",persisted:{mode:"inertP",inert:2},expected:["42,526 L","1,186141 mol"],
 async act(lab){await lab.getByRole("button",{name:"İnert, P sabit",exact:true}).click();await setRange(lab,"İnert gaz (mol)",2);},
 async assertModel(lab){expect(Number(await lab.locator('[data-pressure-kind="AB"][data-stage="2"]').getAttribute("data-pressure"))).toBeCloseTo(.4707890075482393,10);}},
 {id:"manyetik-kuvvet",exam:"AYT",title:"Manyetik kuvvet: yön, yörünge ve enerji",storedKey:"forge020-physics-manyetik-kuvvet",persisted:{micro:-2},expected:["konum (3,3659; 1,8388) m","K = 8 μJ"],
 async act(lab){await setRange(lab,"Yük (μC)",-2);},
 async assertModel(lab){expect(Number(await lab.locator('[data-vector="velocity"]').getAttribute("data-x"))).toBeCloseTo(2.161209223472559,8);expect(Number(await lab.locator('[data-vector="velocity"]').getAttribute("data-y"))).toBeCloseTo(3.365883939231586,8);}},
 {id:"dunya-sekli-hareket",exam:"TYT",title:"Dünya’nın şekli ve hareketleri: ışın, gün ve mevsim",storedKey:"forge020-geo-earth",persisted:{latitude:70,season:"december"},expected:["Gündüz 0 saat","24 saat","-3,5°","Ufuk üstü Güneş yok"],
 async act(lab){await lab.getByLabel("Yılın dönemi",{exact:true}).selectOption("december");const input=lab.getByRole("spinbutton",{name:"Enlem (°), sayıyla",exact:true});await input.fill("70");await input.press("Enter");},
 async assertModel(lab){await expect(lab.locator("svg").first()).toHaveAttribute("role","img");}},
 {id:"felsefeyi-tanima",exam:"TYT",title:"Felsefeyi tanıma: sorudan gerekçeye",storedKey:"forge020-humanities:felsefeyi-tanima",persisted:{criterion:"need",angle:"grounds",show:true},expected:["Bu, refleksif bir sorudur."],
 async act(lab){await lab.getByRole("combobox",{name:"Adalet ölçütü",exact:true}).selectOption("need");await lab.getByRole("combobox",{name:"Sorunun odağı",exact:true}).selectOption("grounds");await lab.getByRole("button",{name:"Kanıtı göster",exact:true}).click();},
 async assertModel(lab){await expect(lab.locator('[data-allocation="a"] [data-filled="true"]')).toHaveCount(8);await expect(lab.locator('[data-allocation="b"] [data-filled="true"]')).toHaveCount(4);}},
];
const learning = (state) => ({
  sessions: state.sessions,
  reviews: state.reviews,
  theoryReviewCompletions: state.theoryReviewCompletions,
  topicProgress: state.topicProgress,
  unlocked: state.unlocked,
});
async function open(page, navigate, unit) {
  await navigate("Konu Anlatımı");
  await page.getByRole("button", { name: unit.exam, exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(unit.title);
  await page.locator(".ready-topic").filter({ hasText: unit.title }).click();
  const lab = page.locator(`[data-forge020="${unit.id}"]`);
  await expect(lab).toBeVisible();
  await expect(lab.locator("svg").first()).toBeVisible();
  return lab;
}
async function assertOutcome(lab, unit) {
  const result = lab.locator("[data-model-result]").first();
  await expect(result).toBeVisible();
  expect(await result.evaluate((e) => e.namespaceURI)).toBe(
    "http://www.w3.org/1999/xhtml",
  );
  for (const text of unit.expected) await expect(result).toContainText(text);
  await unit.assertModel(lab);
}
export async function runForge020SmokeCase(page, navigate, unit) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const beforeLearning = learning(await readState(page));
  const lab = await open(page, navigate, unit);
  const model = lab.locator("svg").first();
  const before = await model.innerHTML();
  await unit.act(lab);
  await assertOutcome(lab, unit);
  expect(await model.innerHTML()).not.toBe(before);
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await expect
    .poll(async () => (await readState(page)).explorations[unit.storedKey])
    .toMatchObject(unit.persisted);
  const saved = (await readState(page)).explorations[unit.storedKey];
  expect(learning(await readState(page))).toEqual(beforeLearning);
  await page.reload();
  await assertOutcome(page.locator(`[data-forge020="${unit.id}"]`), unit);
  const after = await readState(page);
  expect(after.explorations[unit.storedKey]).toEqual(saved);
  expect(learning(after)).toEqual(beforeLearning);
  return { id: unit.id, storedKey: unit.storedKey, saved };
}
export async function assertForge020ProcessRestart(page, navigate, snapshots) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const beforeLearning = learning(await readState(page));
  expect(snapshots).toHaveLength(5);
  for (const snapshot of snapshots) {
    const unit = forge020SmokeCases.find((entry) => entry.id === snapshot.id);
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
    const lab = await open(page, navigate, unit);
    await assertOutcome(lab, unit);
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
  }
  expect(learning(await readState(page))).toEqual(beforeLearning);
}
