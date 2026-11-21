import { typeset } from "../../src/domain/typeset";
import release from "../../package.json" with { type: "json" };
import flow from "../fixtures/source038-question-flow.json" with { type: "json" };
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AppState } from "../../src/domain/model";
import { setThemePreference } from "./helpers/theme";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
// @ts-expect-error The shared executable model acceptance is plain JavaScript.
import { forge038SmokeCases } from "../../scripts/forge038-smoke-cases.mjs";
registerOfflineBootDiagnostics();
const unit = forge038SmokeCases[0];
const stored = (page: Page): Promise<AppState> => page.evaluate(() => new Promise((resolve,reject) => {
  const request=indexedDB.open("yksmania",2);
  request.onerror=()=>reject(request.error);
  request.onupgradeneeded=()=>{request.transaction!.abort();reject(Error("Existing application database required"));};
  request.onsuccess=()=>{const db=request.result,tx=db.transaction("state","readonly"),read=tx.objectStore("state").get("current");read.onerror=()=>{db.close();reject(read.error);};read.onsuccess=()=>{db.close();resolve(read.result);};};
}));
const learning = (s:AppState) => ({sessions:s.sessions,reviews:s.reviews,theoryReviewCompletions:s.theoryReviewCompletions,topicProgress:s.topicProgress,settings:s.settings,notes:s.notes,draft:s.draft,examDraft:s.examDraft,examSessions:s.examSessions,unlocked:s.unlocked,focusTimer:s.focusTimer});
async function nav(page:Page,name:string) {
  await expect(page.locator(".topbar")).toBeVisible();
  const menu=page.getByRole("button",{name:"Menüyü aç",exact:true});if(await menu.isVisible())await menu.click();
  await page.locator(".sidebar").getByRole("button",{name,exact:true}).click();
}
async function enter(page:Page) {
  await nav(page,"Konu Anlatımı");
  await page.getByRole("button",{name:"TYT",exact:true}).click();
  await page.getByRole("textbox",{name:"Ders veya konu ara",exact:true}).fill(unit.title);
  const entry=page.locator(`.ready-topic[data-lesson-id="${unit.id}"]`);
  if(!(await entry.isVisible()))await page.locator(".subject-panel").filter({has:page.getByRole("heading",{name:"Matematik",exact:true})}).locator(".subject-header").click();
  await entry.click();const lab=page.locator(unit.selector);await expect(lab).toBeVisible();return lab;
}
async function ready(page:Page) {
  await expect(page.locator(".save-status")).toContainText("Bu cihazda kaydedildi");
  await page.waitForFunction(()=>navigator.serviceWorker.controller?.state==="activated",undefined,{timeout:30000});
}

test("038 normal entry saves55 unassisted cards, draft, Today and original3/7/21 dates offline",async({page,context},info)=>{
  test.setTimeout(180000);
  const cards=flow.unit.cards;expect(cards).toHaveLength(55);
  const errors:string[]=[];page.on("pageerror",error=>errors.push(error.message));
  await page.setViewportSize({width:1440,height:1000});
  await page.clock.setFixedTime(new Date("2026-11-17T12:00:00Z"));
  await page.goto("/#/settings");await setThemePreference(page,"dark");await ready(page);
  await context.setOffline(true);await enter(page);
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await page.getByRole("textbox",{name:"Notun",exact:true}).fill(unit.note);
  await expect.poll(async()=>(await stored(page)).notes[`lesson:${unit.id}`]).toBe(unit.note);
  const before=await stored(page);
  await page.getByRole("button",{name:"Sorulara geç",exact:true}).click();
  for(const [index,card] of cards.entries()) {
    await expect(page.locator(".question-meta")).toContainText(`${index+1} / 55`);
    await expect(page.locator(".question-panel h2")).toHaveText(typeset(card.prompt));
    const answers=page.locator(".answer-options .answer");await expect(answers).toHaveCount(5);
    expect((await answers.locator("span:last-child").allTextContents()).map(text=>text.trim()).sort()).toEqual([...card.options].sort());
    await answers.filter({has:page.getByText(card.correct,{exact:true})}).click();
    await page.getByRole("button",{name:"Cevabı kontrol et",exact:true}).click();
    await expect(page.locator(".feedback.correct")).toBeVisible();
    if(index===0||index===53) {
      await expect.poll(async()=>(await stored(page)).draft?.responses.length).toBe(index+1);
      const partial=await stored(page);await page.reload();await expect(page.locator(".feedback.correct")).toBeVisible();
      expect((await stored(page)).draft).toEqual(partial.draft);expect((await stored(page)).sessions).toEqual(before.sessions);expect((await stored(page)).reviews).toEqual(before.reviews);
    }
    if(index<54)await page.getByRole("button",{name:"Sonraki soru",exact:true}).click();
  }
  const checked=await stored(page);expect(checked.draft?.responses).toHaveLength(55);
  expect(checked.draft?.responses.every(response=>response.correct&&!response.assisted)).toBe(true);expect(checked.sessions).toEqual(before.sessions);
  await page.getByRole("button",{name:"Çalışmayı kaydet",exact:true}).click();
  await expect(page.locator(".result-stats > div strong")).toHaveText(["55/55","55/55","0"]);
  const saved=await stored(page),session=saved.sessions.at(-1)!;
  expect(session.lessonId).toBe(unit.id);expect(session.responses).toHaveLength(55);
  expect(session.responses.every(response=>response.correct&&!response.assisted)).toBe(true);
  expect(saved.sessions).toHaveLength(before.sessions.length+1);expect(saved.settings).toEqual(before.settings);expect(saved.notes).toEqual(before.notes);
  expect(saved.topicProgress[`topic-${unit.id}`]?.theory).toBeUndefined();
  const reviews=saved.reviews.filter(review=>review.originSessionId===session.id);
  expect(reviews.map(review=>[review.stage,review.targetDate])).toEqual([[3,"2026-11-19"],[7,"2026-11-23"],[21,"2026-12-07"]]);
  await page.reload();await expect(page.locator(".result-stats > div strong")).toHaveText(["55/55","55/55","0"]);
  expect((await stored(page)).sessions).toEqual(saved.sessions);expect((await stored(page)).reviews).toEqual(saved.reviews);
  await nav(page,"Bugün");
  const theory=page.getByRole("region",{name:"Konu planı",exact:true}).locator(".planned-topic").filter({hasText:unit.title});
  const questions=page.getByRole("region",{name:"Soru planı",exact:true}).locator(".planned-topic").filter({hasText:unit.title});
  await expect(questions.locator(".topic-score")).toHaveText("Son sonuç: 55 soruda 55 doğru · 0 yanlış");
  await expect(theory.locator(".topic-state")).toHaveText("Konu henüz işaretlenmedi");
  await theory.getByRole("button",{name:"Konuyu çalıştım",exact:true}).click();
  await expect(theory.locator(".topic-state")).toHaveText("Konu tamamlandı");const manual=await stored(page);
  expect(manual.sessions).toEqual(saved.sessions);expect(manual.reviews).toEqual(saved.reviews);expect(manual.topicProgress[`topic-${unit.id}`]?.theory).toBe("2026-11-17");
  await page.reload();await expect(questions.locator(".topic-score")).toHaveText("Son sonuç: 55 soruda 55 doğru · 0 yanlış");expect((await stored(page)).sessions).toEqual(saved.sessions);
  await page.screenshot({path:info.outputPath("actual55of55-today.png")});expect(errors).toEqual([]);
  await info.attach("actual-complete038-practice-flow",{body:JSON.stringify({version:release.version,lessonId:unit.id,count:55,correct:55,assisted:0,session,reviews,manualTheorySeparate:true,offlineReload:true,rendererErrors:errors}),contentType:"application/json"});
});

for(const profile of [{name:"desktop-dark",width:1440,theme:"dark",large:false},{name:"mobile-Matrix-Lexend45px",width:320,theme:"matrix",large:true},{name:"legacy-light",width:400,theme:"light",large:false},{name:"legacy-system-light",width:400,theme:"system",large:false}]as const) {
  test(`038 eight real models and notes stay unscored offline: ${profile.name}`,async({page,context},info)=>{
    test.setTimeout(180000);const errors:string[]=[],observations:unknown[]=[];page.on("pageerror",error=>errors.push(error.message));
    await page.setViewportSize({width:profile.width,height:1000});await page.emulateMedia({colorScheme:profile.theme==="light"||profile.theme==="system"?"light":"dark",reducedMotion:"reduce"});
    await page.goto("/#/settings");await setThemePreference(page,profile.theme);
    if(profile.large) {
      await page.getByLabel("Yazı tipi",{exact:true}).selectOption("lexend");
      await page.getByLabel("Arayüz ölçeği %",{exact:true}).fill("200");await page.getByLabel("Yalnızca yazı boyutu %",{exact:true}).fill("150");
      await page.evaluate(async()=>{await document.fonts.load("400 45px Lexend");await document.fonts.load("600 45px Lexend");});
    }
    await ready(page);const before=learning(await stored(page));await context.setOffline(true);const lab=await enter(page);
    await unit.act(lab,async(mode:string)=>{
      await expect(lab.locator("svg text")).toHaveCount(0);
      const metrics=await lab.evaluate((root:HTMLElement)=>({width:document.documentElement.scrollWidth,viewport:innerWidth,font:parseFloat(getComputedStyle(document.body).fontSize),captionFont:parseFloat(getComputedStyle(root.querySelector("figcaption")!).fontSize),blue:getComputedStyle(root).getPropertyValue("--f038-b").trim(),mint:getComputedStyle(root).getPropertyValue("--f038-c").trim(),axisOpacity:getComputedStyle(root.querySelector(".f038-axis")!).opacity,bad:[...root.querySelectorAll("button,input,select,summary")].filter(node=>node.getClientRects().length).map(node=>({label:node.getAttribute("aria-label")||node.textContent,x:node.getBoundingClientRect().x,right:node.getBoundingClientRect().right,height:node.getBoundingClientRect().height})).filter(box=>box.x<0||box.right>innerWidth||box.height<43.5)}));
      expect(metrics.width).toBeLessThanOrEqual(metrics.viewport);expect(metrics.bad).toEqual([]);expect(metrics.captionFont).toBeGreaterThanOrEqual(metrics.font);
      if(mode==="equation-and-inequality") {
        const disclosure=lab.locator("summary");
        await expect(disclosure).toBeFocused();
        expect(await disclosure.evaluate(node=>({visible:node.matches(":focus-visible"),width:getComputedStyle(node).outlineWidth,style:getComputedStyle(node).outlineStyle}))).toEqual({visible:true,width:"3px",style:"solid"});
      }
      if(profile.large)expect(metrics.captionFont).toBe(45);
      if(profile.theme==="light"||profile.theme==="system") {expect(metrics.blue).toBe("#21658a");expect(metrics.mint).toBe("#356945");expect(metrics.axisOpacity).toBe("1");}
      if(mode==="exact-fractional-vertex")await lab.screenshot({path:info.outputPath(`${profile.name}-fractional-vertex.png`)});
      observations.push({mode,...metrics});
    });
    expect(observations).toHaveLength(8);await unit.assertModel(lab);
    await expect.poll(async()=>(await stored(page)).explorations[unit.storedKey]).toMatchObject(unit.persisted);expect(learning(await stored(page))).toEqual(before);
    await page.getByRole("textbox",{name:"Notun",exact:true}).fill(unit.note);await expect.poll(async()=>(await stored(page)).notes[`lesson:${unit.id}`]).toBe(unit.note);
    const saved=await stored(page);await page.reload();await unit.assertModel(await enter(page));await expect(page.getByRole("textbox",{name:"Notun",exact:true})).toHaveValue(unit.note);
    expect((await stored(page)).explorations[unit.storedKey]).toEqual(saved.explorations[unit.storedKey]);expect(learning(await stored(page))).toEqual(learning(saved));
    const accessibility=await new AxeBuilder({page}).include(unit.selector).analyze();expect(accessibility.violations.filter(value=>["serious","critical"].includes(value.impact??""))).toEqual([]);expect(errors).toEqual([]);
    await info.attach("actual-normal038-models-offline",{body:JSON.stringify({version:release.version,lessonId:unit.id,profile,observations,unchangedLearning:true,offlineReload:true,exploration:saved.explorations[unit.storedKey],rendererErrors:errors}),contentType:"application/json"});
  });
}
