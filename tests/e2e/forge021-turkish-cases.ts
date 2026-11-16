import { expect, type Locator } from "@playwright/test";
import { forge021TurkishLessons } from "../../src/learning/forge021Turkish";
import { forge021Case } from "./forge021-case-helper";
async function compare021(lab: Locator, guess: string, reason: string) {
 await lab.getByRole("combobox", { name: "Tahminin", exact: true }).selectOption(guess);
 const input = lab.getByRole("textbox", { name: "Gerekçen", exact: true });
 await expect(input).toHaveAttribute("maxlength", "120"); await input.fill(reason);
 await lab.getByRole("button", { name: "Tahminimi karşılaştır", exact: true }).tap();
}
async function readable021(lab: Locator) {
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
export const turkish021Cases = [
 forge021Case(forge021TurkishLessons, "paragrafta-siralama", "forge021-turkish:paragrafta-siralama", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Örnek", exact: true }).selectOption("arsiv");
  for (const [target, id] of [..."ABCDE"].entries()) {
   const row = lab.locator(`[data-sentence="${id}"]`);
   let position = Number(await row.getAttribute("data-position"));
   while (position > target) {
    await lab.getByRole("button", { name: `Cümle ${id} yukarı taşınsın`, exact: true }).tap();
    await expect(row).toHaveAttribute("data-position", String(position - 1)); position--;
   }
  }
  await lab.getByRole("button", { name: "Cümle D şemada vurgulansın", exact: true }).tap();
  await compare021(lab, "Bağlar tam", "Plan, yıl grubu, klasör ve liste kendi göndermelerinden önce geliyor; bütün zincir kuruldu.");
 }, async (_page, lab) => {
  await expect(lab).toHaveAttribute("data-current-order", "ABCDE");
  await expect(lab.locator('[data-sentence="C"]')).toContainText("bu gruplar ayrı klasörlere");
  await expect(lab.locator('svg [data-relation="B-C"]')).toHaveAttribute("data-source", "1");
  await expect(lab.locator('svg [data-relation="B-C"]')).toHaveAttribute("data-target", "2");
  await expect(lab.locator('svg [data-relation="B-C"]')).toHaveAttribute("data-valid", "true");
  await expect(lab.locator('svg [data-svg-node="D"]')).toHaveAttribute("data-selected", "true");
  await expect(lab.locator("[data-model-result]")).toContainText("Kurulan bağ: 4 / 4."); await readable021(lab);
 }),
 forge021Case(forge021TurkishLessons, "paragrafta-cumle-ekleme", "forge021-turkish:paragrafta-cumle-ekleme", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Örnek", exact: true }).selectOption("olcum");
  await lab.getByRole("combobox", { name: "Ekleme yeri", exact: true }).selectOption("2");
  await compare021(lab, "Bağlar tam", "Önce ayar, sonra ölçüm var; bu değer sözü de 18 birim sonucunu kullanıyor.");
 }, async (_page, lab) => {
  await expect(lab).toHaveAttribute("data-current-order", "ABXCD");
  await expect(lab.locator('[data-sentence="X"]')).toHaveAttribute("data-position", "2");
  await expect(lab.locator('svg [data-relation="B-X"]')).toHaveAttribute("data-valid", "true");
  await expect(lab.locator('svg [data-relation="X-C"]')).toHaveAttribute("data-source", "2");
  await expect(lab.locator('svg [data-relation="X-C"]')).toHaveAttribute("data-target", "3");
  await expect(lab.locator("[data-model-result]")).toContainText("Seçili yer: II. cümleden sonra.");
  await expect(lab.locator(".turkish021-complete")).toContainText("18 birim"); await readable021(lab);
 }),
 forge021Case(forge021TurkishLessons, "paragrafta-bosluk-doldurma", "forge021-turkish:paragrafta-bosluk-doldurma", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Örnek", exact: true }).selectOption("engel");
  await lab.locator('[data-candidate="1"]').tap();
  await compare021(lab, "Bağ eksik", "Solda olumlu bilgiye ek var; fakat sağdaki bu güçlük sözüne hiçbir engel öncül olmuyor.");
 }, async (_page, lab) => {
  await expect(lab).toHaveAttribute("data-current-order", "AXB");
  await expect(lab.locator('[data-sentence="X"]')).toContainText("bütün dosyalar her bağlantıda sorunsuz");
  await expect(lab.locator('svg [data-relation="A-X"]')).toHaveAttribute("data-valid", "true");
  await expect(lab.locator('svg [data-relation="X-B"]')).toHaveAttribute("data-valid", "false");
  await expect(lab.locator("[data-model-result]")).toContainText("Kurulan bağ: 1 / 2.");
  await expect(lab.getByRole("status")).toContainText("Seçimin bu bağlamla uyumlu."); await readable021(lab);
 }),
];
