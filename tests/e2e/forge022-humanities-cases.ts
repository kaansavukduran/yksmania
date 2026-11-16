import { expect, type Locator } from "@playwright/test";
import { forge022HumanitiesLessons } from "../../src/learning/forge022Humanities";
import { forge022Case } from "./forge022-case-helper";
async function compare022(lab: Locator, guess: string, reason: string) {
 await lab.getByRole("combobox", { name: "Tahminin", exact: true }).selectOption(guess);
 const input = lab.getByRole("textbox", { name: "Gerekçen", exact: true });
 await expect(input).toHaveAttribute("maxlength", "120"); await input.fill(reason);
 await lab.getByRole("button", { name: "Tahminimi karşılaştır", exact: true }).tap();
}
async function readable022(lab: Locator) {
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
  const svg = root.querySelector<SVGSVGElement>("svg[data-argument-map]")!, boundary = svg.getBoundingClientRect(), matrix = svg.getScreenCTM()!;
  const texts = [...svg.querySelectorAll("text")].map(text => {
   const b = text.getBoundingClientRect(), rect = text.parentElement!.querySelector("rect")?.getBoundingClientRect();
   return { word: text.textContent, paddingDifference: rect ? Math.abs(b.top - rect.top - (rect.bottom - b.bottom)) : Infinity, px: parseFloat(getComputedStyle(text).fontSize) * Math.hypot(matrix.a, matrix.b), left: b.left, right: b.right, top: b.top, bottom: b.bottom,
    inside: Boolean(rect && b.left >= rect.left - .1 && b.right <= rect.right + .1 && b.top >= rect.top - .1 && b.bottom <= rect.bottom + .1),
    inViewBox: b.left >= boundary.left - .1 && b.right <= boundary.right + .1 && b.top >= boundary.top - .1 && b.bottom <= boundary.bottom + .1 };
  });
  let overlaps = 0;
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) { const a = texts[i], b = texts[j]; if (a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom) overlaps++; }
  return { words, controls, texts, overlaps, overflow: document.documentElement.scrollWidth - innerWidth };
 });
 for (const word of evidence.words) expect(word.count, word.value).toBe(1);
 for (const control of evidence.controls) { expect(control.height, control.name).toBeGreaterThanOrEqual(44); expect(control.width, control.name).toBeGreaterThanOrEqual(44); }
 for (const text of evidence.texts) { expect(text.px, text.word || "SVG").toBeGreaterThanOrEqual(16.9); expect(text.paddingDifference, text.word || "SVG").toBeLessThanOrEqual(1); expect(text.inside, text.word || "SVG").toBe(true); expect(text.inViewBox, text.word || "SVG").toBe(true); }
 expect(evidence.overlaps).toBe(0); expect(evidence.overflow).toBeLessThanOrEqual(1);
}
export const humanities022Cases = [
 forge022Case(forge022HumanitiesLessons, "paragrafta-anlatim-bicimleri", "forge022-humanities:paragrafta-anlatim-bicimleri", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Metnin işi", exact: true }).selectOption("story");
  await expect(lab.locator('svg [data-relation="1-2"]')).toHaveAttribute("data-active", "false");
  await lab.getByRole("combobox", { name: "Olay aşaması", exact: true }).selectOption("2");
  await lab.getByRole("button", { name: "Kedi", exact: true }).tap();
  await compare022(lab, "Öyküleme", "Anahtar bulundu, kapı açıldı, kedi çıktı. Son durum ilkinden farklı; olay yolu ilerledi.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-full-context]')).toContainText("kediyi dışarı çıkardı");
  await expect(lab.locator('[data-cat-outside]')).toHaveAttribute("data-cat-outside", "true");
  await expect(lab.locator('svg [data-relation="1-2"]')).toHaveAttribute("data-active", "true");
  await expect(lab.locator('svg [data-svg-node="2"]')).toHaveAttribute("data-selected", "true");
  await expect(lab.locator('[data-model-result]')).toContainText("Öyküleme"); await readable022(lab);
 }, "svg[data-argument-map]"),
 forge022Case(forge022HumanitiesLessons, "ronesans-felsefesi", "forge022-humanities:ronesans-felsefesi", async (_page, lab) => {
  await expect(lab.locator('svg [data-relation="0-2"]')).toHaveAttribute("data-active", "false");
  await lab.getByRole("combobox", { name: "Okunan nüsha", exact: true }).selectOption("all");
  await lab.getByRole("checkbox", { name: "Yazarın ünü var", exact: true }).uncheck();
  await compare022(lab, "Tam kapsam eşleşir", "B nüshası bütün grubu söylüyor; seçili yorum da herkesi kapsıyor. Ün buna dayanak olmaz.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-document="B"]')).toHaveAttribute("data-selected", "true");
  await expect(lab.locator('[data-document="B"]')).toContainText("Bütün öğrenciler");
  await expect(lab.locator('svg [data-relation="1-2"]')).toHaveAttribute("data-active", "true");
  await expect(lab.locator('svg [data-relation="3-2"]')).toHaveAttribute("data-active", "false");
  await expect(lab.locator('[data-model-result]')).toContainText("Tam kapsam eşleşir"); await readable022(lab);
 }, "svg[data-argument-map]"),
 forge022Case(forge022HumanitiesLessons, "15-17-yuzyil-felsefesi", "forge022-humanities:15-17-yuzyil-felsefesi", async (_page, lab) => {
  await expect(lab.locator('[data-node="2"]')).toHaveAttribute("data-active", "false");
  await lab.getByRole("checkbox", { name: "Bağımsız ağaç kaydı var", exact: true }).check();
  await compare022(lab, "İki ayrı dayanak", "Özneye düşünme edimiyle, ağaca ayrı dış kayıtla dayanak var. Cogito nesneyi kanıtlamaz.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-node="2"]')).toHaveAttribute("data-active", "true");
  await expect(lab.locator('svg [data-relation="0-1"]')).toHaveAttribute("data-active", "true");
  await expect(lab.locator('svg [data-relation="0-2"]')).toHaveAttribute("data-active", "false");
  await expect(lab.locator('[data-model-result]')).toContainText("İki ayrı dayanak"); await readable022(lab);
 }, "svg[data-argument-map]"),
 forge022Case(forge022HumanitiesLessons, "aydinlanma-felsefesi", "forge022-humanities:aydinlanma-felsefesi", async (_page, lab) => {
  await expect(lab.locator('[data-gate="Veri"]')).toHaveAttribute("data-open", "false");
  await lab.getByRole("checkbox", { name: "Veri yolu açık", exact: true }).check();
  await lab.getByRole("checkbox", { name: "İtiraz yolu açık", exact: true }).check();
  await compare022(lab, "Üç yol da açık", "Gerekçe okunur, veri denetlenir ve itiraz sunulur. Bu üç imkân kararın doğru olmasını garanti etmez.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-gate][data-open="true"]')).toHaveCount(3);
  await expect(lab.locator('svg [data-relation="2-3"]')).toHaveAttribute("data-active", "true");
  await expect(lab.locator('[data-model-result]')).toContainText("Açık yol sayısı: 3 / 3."); await readable022(lab);
 }, "svg[data-argument-map]"),
 forge022Case(forge022HumanitiesLessons, "18-19-yuzyil-felsefesi", "forge022-humanities:18-19-yuzyil-felsefesi", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Yetkinin dağılımı", exact: true }).selectOption("single");
  await expect(lab.locator('[data-power][data-holder="Tek makam"]')).toHaveCount(3);
  await lab.getByRole("combobox", { name: "Yetkinin dağılımı", exact: true }).selectOption("separate");
  await lab.getByRole("checkbox", { name: "Karar inceleme yolu var", exact: true }).check();
  await compare022(lab, "Ayrım ve denetim var", "Üç iş üç kurumda; ayrıca karar için inceleme yolu açık. Yalnız görev adlarını saymadım.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-power="Yasa"]')).toHaveAttribute("data-holder", "Meclis");
  await expect(lab.locator('[data-power="Uygulama"]')).toHaveAttribute("data-holder", "Yönetim");
  await expect(lab.locator('[data-power="Yargı"]')).toHaveAttribute("data-holder", "Mahkeme");
  await expect(lab.locator('svg [data-relation="2-3"]')).toHaveAttribute("data-active", "true");
  await expect(lab.locator('[data-model-result]')).toContainText("Ayrım ve denetim var"); await readable022(lab);
 }, "svg[data-argument-map]"),
 forge022Case(forge022HumanitiesLessons, "cagdas-felsefe", "forge022-humanities:cagdas-felsefe", async (_page, lab) => {
  await expect(lab.locator('[data-sample="B"]')).toHaveAttribute("data-status", "unknown");
  await lab.getByRole("combobox", { name: "Gözlem kaydı", exact: true }).selectOption("counter");
  await compare022(lab, "Karşı örnek var", "Sav tümü kırmızı diyor. B için gerçek mavi kayıt var; kalan bilinmeyenleri renkli saymadım.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-sample="B"]')).toHaveAttribute("data-status", "no");
  await expect(lab.locator('[data-sample][data-status="unknown"]')).toHaveCount(3);
  await expect(lab.locator('svg [data-relation="2-0"]')).toHaveCount(1);
  await expect(lab.locator('[data-model-result]')).toContainText("Olumlu: 1; olumsuz: 1; bilinmeyen: 3."); await readable022(lab);
 }, "svg[data-argument-map]"),
 forge022Case(forge022HumanitiesLessons, "bilgi-ve-inanc", "forge022-humanities:bilgi-ve-inanc", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Bilgi yolu", exact: true }).selectOption("report");
  await expect(lab.locator('svg [data-relation="0-1"]')).toHaveAttribute("data-active", "false");
  await lab.getByRole("checkbox", { name: "Kaynak kontrolü var", exact: true }).check();
  await compare022(lab, "Denetlenen aktarım", "Ece olayı işitmedi; Ada'nın mesajını okudu. Kaynak denetimi bu aktarımın dayanağına ek bilgi sağladı.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-full-context]')).toContainText("görmedi ve işitmedi");
  await expect(lab.locator('[data-node="0"]')).toContainText("bağımsız kayıtla doğrulandı");
  await expect(lab.locator('svg [data-relation="0-1"]')).toHaveAttribute("data-active", "true");
  await expect(lab.locator('[data-model-result]')).toContainText("Denetlenen aktarım"); await readable022(lab);
 }, "svg[data-argument-map]"),
];
