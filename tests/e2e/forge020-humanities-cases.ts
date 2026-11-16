import { expect, type Locator } from "@playwright/test";
import { forge020HumanitiesLessons } from "../../src/learning/forge020Humanities";
import { forge020Case } from "./forge020-case-helper";
async function compare020(lab: Locator, guess: string, reason: string) {
 await lab.getByRole("combobox", { name: "Tahminin", exact: true }).selectOption(guess);
 const input = lab.getByRole("textbox", { name: "Gerekçen", exact: true });
 await expect(input).toHaveAttribute("maxlength", "120"); await input.fill(reason);
 await lab.getByRole("button", { name: "Tahminimi karşılaştır", exact: true }).tap();
}
async function readable020(lab: Locator) {
 const evidence = await lab.evaluate(root => {
  const words: { value: string; count: number }[] = [];
  for (const e of root.querySelectorAll("button, p, label, legend, li, h3")) {
   const walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT); let node: Node | null;
   while ((node = walker.nextNode())) for (const match of (node.textContent || "").matchAll(/\S+/g)) {
    const range = document.createRange(); range.setStart(node, match.index!); range.setEnd(node, match.index! + match[0].length);
    words.push({ value: match[0], count: [...range.getClientRects()].filter(r => r.width > 0).length });
   }
  }
  const controls = [...root.querySelectorAll("button, select, textarea, input")].map(e => ({ height: e.getBoundingClientRect().height, width: e.getBoundingClientRect().width, name: e.getAttribute("aria-label") || e.tagName }));
  const svg = root.querySelector("svg")!, boundary = svg.getBoundingClientRect(), matrix = svg.getScreenCTM()!;
  const texts = [...svg.querySelectorAll("text")].map(text => {
   const b = text.getBoundingClientRect(), rect = text.parentElement!.querySelector("rect")?.getBoundingClientRect();
   return { word: text.textContent, px: parseFloat(getComputedStyle(text).fontSize) * Math.hypot(matrix.a, matrix.b), left: b.left, right: b.right, top: b.top, bottom: b.bottom,
    inside: Boolean(rect && b.left >= rect.left - .1 && b.right <= rect.right + .1 && b.top >= rect.top - .1 && b.bottom <= rect.bottom + .1),
    inViewBox: b.left >= boundary.left - .1 && b.right <= boundary.right + .1 && b.top >= boundary.top - .1 && b.bottom <= boundary.bottom + .1 };
  });
  let overlaps = 0;
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) { const a = texts[i], b = texts[j]; if (a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom) overlaps++; }
  return { words, controls, texts, overlaps, overflow: document.documentElement.scrollWidth - innerWidth };
 });
 for (const word of evidence.words) expect(word.count, word.value).toBe(1);
 for (const control of evidence.controls) { expect(control.height, control.name).toBeGreaterThanOrEqual(44); expect(control.width, control.name).toBeGreaterThanOrEqual(44); }
 for (const text of evidence.texts) { expect(text.px, text.word || "SVG").toBeGreaterThanOrEqual(16.9); expect(text.inside, text.word || "SVG").toBe(true); expect(text.inViewBox, text.word || "SVG").toBe(true); }
 expect(evidence.overlaps).toBe(0); expect(evidence.overflow).toBeLessThanOrEqual(1);
}
export const humanities020Cases = [
 forge020Case(forge020HumanitiesLessons, "felsefeyi-tanima", "forge020-humanities:felsefeyi-tanima", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Adalet ölçütü", exact: true }).selectOption("need");
  await lab.getByRole("combobox", { name: "Sorunun odağı", exact: true }).selectOption("grounds");
  await compare020(lab, "Ölçüte geri dönüş", "Adalet ölçütünü niçin seçtiğimi soruyorum; yalnız payı hesaplamıyorum.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-allocation="a"]')).toHaveAttribute("data-given", "8");
  await expect(lab.locator('[data-allocation="a"] [data-filled="true"]')).toHaveCount(8);
  await expect(lab.locator('[data-allocation="b"] [data-filled="true"]')).toHaveCount(4);
  await expect(lab.locator("[data-model-result]")).toContainText("Bu, refleksif bir sorudur."); await readable020(lab);
 }),
 forge020Case(forge020HumanitiesLessons, "felsefe-ile-dusunme", "forge020-humanities:felsefe-ile-dusunme", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Çıkarım yönü", exact: true }).selectOption("reverse");
  await lab.getByRole("checkbox", { name: "Yağmur var", exact: true }).uncheck();
  await lab.getByRole("checkbox", { name: "Fıskiye açık", exact: true }).check();
  await compare020(lab, "Geçersiz", "Yağmur yokken fıskiye zemini ıslatır; öncüller doğru, yağmur sonucu yanlıştır.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-truth-row="1"]')).toHaveAttribute("data-counter", "true");
  await expect(lab.locator('[data-truth-row="1"]')).toHaveAttribute("data-current", "true");
  await expect(lab.locator('svg [data-svg-node="0"]')).toHaveAttribute("data-active", "false");
  await expect(lab.locator('svg [data-svg-node="2"]')).toHaveAttribute("data-active", "true");
  await expect(lab.locator("[data-model-result]")).toContainText("Karşı model sayısı: 1."); await readable020(lab);
 }),
 forge020Case(forge020HumanitiesLessons, "varlik-felsefesi", "forge020-humanities:varlik-felsefesi", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Kabul edilen temel", exact: true }).selectOption("dual");
  await lab.locator('[data-node-button="1"]').tap();
  await compare020(lab, "İki temel", "Madde ve zihin ayrı kökler; nesne sayısını değil bağımsız temelleri sayıyorum.");
 }, async (_page, lab) => {
  await expect(lab.locator('svg [data-foundation="true"]')).toHaveCount(2);
  await expect(lab.locator('svg [data-relation="0-2"]')).toHaveCount(1);
  await expect(lab.locator('svg [data-relation="1-3"]')).toHaveCount(1);
  await expect(lab.locator('svg [data-svg-node="1"]')).toHaveAttribute("data-selected", "true");
  await expect(lab.locator("[data-model-result]")).toContainText("Nicelik: düalizm."); await readable020(lab);
 }),
 forge020Case(forge020HumanitiesLessons, "bilgi-felsefesi", "forge020-humanities:bilgi-felsefesi", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Soru", exact: true }).selectOption("criterion");
  await lab.getByRole("combobox", { name: "Denetim", exact: true }).selectOption("consensus");
  await lab.locator('[data-node-button="1"]').tap();
  await compare020(lab, "Doğruluk ölçütü", "Kişi yargıyı ortak kabule göre doğru sayıyor; burada edinme yolu sorulmuyor.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-node="0"]')).toContainText("Yargı");
  await expect(lab.locator('[data-node="1"]')).toContainText("herkesin bu yargıyı ortak kabul etmesini");
  await expect(lab.locator('svg [data-relation="0-1"]')).toHaveCount(1);
  await expect(lab.locator("[data-model-result]")).toContainText("Metindeki ölçüt: Ortak kabul."); await readable020(lab);
 }),
 forge020Case(forge020HumanitiesLessons, "bilim-felsefesi", "forge020-humanities:bilim-felsefesi", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Veri düzeni", exact: true }).selectOption("crossed");
  await lab.getByRole("combobox", { name: "Varsayım", exact: true }).selectOption("heat");
  await compare020(lab, "Veriye uymuyor", "Nem aynıyken sıcaklık farkında sonuç aynı; sıcaklık savının iki öngörüsü uyuşmuyor.");
 }, async (_page, lab) => {
  await expect(lab.locator('svg [data-science-row="1"]')).toHaveAttribute("data-observed", "10");
  await expect(lab.locator('svg [data-science-row="1"]')).toHaveAttribute("data-prediction", "4");
  await expect(lab.locator('svg [data-science-row="2"]')).toHaveAttribute("data-observed", "4");
  await expect(lab.locator('svg [data-science-row="2"]')).toHaveAttribute("data-prediction", "10");
  await expect(lab.locator("[data-model-result]")).toContainText("Uyum: 2 / 4."); await readable020(lab);
 }),
 forge020Case(forge020HumanitiesLessons, "ahlak-felsefesi", "forge020-humanities:ahlak-felsefesi", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Gerekçe", exact: true }).selectOption("virtue");
  await lab.getByRole("combobox", { name: "Bilgi ve seçim", exact: true }).selectOption("threat");
  await lab.locator('[data-node-button="2"]').tap();
  await compare020(lab, "Erdem odağı", "Gerekçede karakter var; baskı ise ayrıca denetim ve seçenek koşulunu değiştiriyor.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-node="1"]')).toContainText("ciddi tehditle");
  await expect(lab.locator('[data-node="2"]')).toContainText("dürüst ve adaletli bir karakter");
  await expect(lab.locator('svg [data-relation="2-3"]')).toHaveCount(1);
  await expect(lab.locator("[data-model-result]")).toContainText("Dış eylem aynı kalabilir; gerekçenin rolü değişir."); await readable020(lab);
 }),
];
