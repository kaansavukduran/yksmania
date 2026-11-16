import { expect, type Locator } from "@playwright/test";
import { forge021HumanitiesLessons } from "../../src/learning/forge021Humanities";
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
  const controls = [...root.querySelectorAll("button, select, textarea, input")].map(e => { const target = e.matches('input[type="checkbox"],input[type="radio"]') ? e.closest("label") ?? e : e; const r = target.getBoundingClientRect(); return { height: r.height, width: r.width, name: e.getAttribute("aria-label") || e.tagName }; });
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
export const humanities021Cases = [
 forge021Case(forge021HumanitiesLessons, "din-felsefesi", "forge021-humanities:din-felsefesi", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Argümanın başlangıcı", exact: true }).selectOption("cause");
  await lab.getByRole("combobox", { name: "Sonucun kapsamı", exact: true }).selectOption("rich");
  await expect(lab.locator('svg [data-relation="3-4"]')).toHaveAttribute("data-active", "false");
  await lab.getByRole("checkbox", { name: "Ek nitelik için öncül var", exact: true }).check();
  await compare021(lab, "Geçiş açık", "Kişisel ve mutlak iyi nitelikleri için ek öncül artık açık; doğruluğu ayrıca tartışılır.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-node="3"]')).toContainText("kişisel ve mutlak iyi");
  await expect(lab.locator('svg [data-relation="3-4"]')).toHaveAttribute("data-active", "true");
  await expect(lab.locator('[data-model-result]')).toContainText("Başlangıç türü: Kozmolojik."); await readable021(lab);
 }),
 forge021Case(forge021HumanitiesLessons, "siyaset-felsefesi", "forge021-humanities:siyaset-felsefesi", async (_page, lab) => {
  await lab.getByRole("checkbox", { name: "Uygulama aracı var", exact: true }).uncheck();
  await lab.getByRole("checkbox", { name: "Hak gerekçesi açık", exact: true }).check();
  await lab.getByRole("combobox", { name: "Sorunun odağı", exact: true }).selectOption("justify");
  await compare021(lab, "Hak gerekçesi", "Uygulama gücü yok; fakat eşit dinlenme ve itiraz yolu haklılık için ayrıca gerekçe sunuyor.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-node="0"]')).toHaveAttribute("data-active", "false");
  await expect(lab.locator('[data-node="2"]')).toContainText("bağımsız itiraz yolu");
  await expect(lab.locator('svg [data-relation="2-3"]')).toHaveAttribute("data-focused", "true");
  await expect(lab.locator('[data-model-result]')).toContainText("Hak gerekçesi"); await readable021(lab);
 }),
 forge021Case(forge021HumanitiesLessons, "sanat-felsefesi", "forge021-humanities:sanat-felsefesi", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "İnceleme odağı", exact: true }).selectOption("viewer");
  await lab.getByRole("combobox", { name: "Çizgi düzeni", exact: true }).selectOption("tense");
  await compare021(lab, "Alımlama", "Seçili ok eserden izleyiciye gidiyor; bu bakış deneyimi inceler, güzellik notu üretmez.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-art-form]')).toHaveAttribute("data-art-form", "tense");
  await expect(lab.locator('[data-art-canopy]')).toHaveAttribute("d", "M190 145 L232 75 L260 98 L302 30 L332 83 L370 44 L408 137 L353 155 L310 132 L247 167 Z");
  await expect(lab.locator('svg [data-relation="4-3"]')).toHaveCount(1);
  await expect(lab.locator('[data-model-result]')).toContainText("Alımlama"); await readable021(lab);
 }),
 forge021Case(forge021HumanitiesLessons, "felsefi-okuma-ve-yazma", "forge021-humanities:felsefi-okuma-ve-yazma", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Savın kapsamı", exact: true }).selectOption("all");
  await expect(lab.locator('svg [data-relation]')).toHaveCount(1);
  await lab.getByRole("combobox", { name: "Verilen kayıt", exact: true }).selectOption("all");
  await compare021(lab, "Kapsamı destekler", "Grup yalnız bu beş kişi; her birine ait erişememe kaydı verildi, beşi hakkındaki sav destekli.");
 }, async (_page, lab) => {
  await expect(lab.locator('svg [data-relation]')).toHaveCount(5);
  await expect(lab.locator('[data-node="4"]')).toContainText("Oya için mevcut saatte erişememe kaydı");
  await expect(lab.locator('[data-model-result]')).toContainText("Bilinen kayıt: 5 / 5. Seçili sav için gereken: 5."); await readable021(lab);
 }),
 forge021Case(forge021HumanitiesLessons, "ilk-cag-felsefesi", "forge021-humanities:ilk-cag-felsefesi", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Bakış yönü", exact: true }).selectOption("outside");
  await compare021(lab, "Daha geniş bakış", "Bakış alışılmış gölgenin ötesine gidiyor; benzetme kavrayışın değişimini anlatıyor.");
 }, async (_page, lab) => {
  await expect(lab.locator('[data-cave-stage]')).toHaveAttribute("data-cave-stage", "outside");
  await expect(lab.locator('[data-cave-gaze]')).toHaveAttribute("d", "M175 157 L542 110");
  await expect(lab.locator('svg [data-relation="0-3"]')).toHaveCount(1);
  await expect(lab.locator('[data-model-result]')).toContainText("Daha geniş bakış"); await readable021(lab);
 }),
 forge021Case(forge021HumanitiesLessons, "orta-cag-felsefesi", "forge021-humanities:orta-cag-felsefesi", async (_page, lab) => {
  await lab.getByRole("combobox", { name: "Tümelin statüsü", exact: true }).selectOption("mind");
  await lab.getByRole("button", { name: "Zihin", exact: true }).tap();
  await compare021(lab, "Zihinsel kavram", "İki tekil ağaç sabit; değişen genel olanın zihindeki kavram olarak ele alınması.");
 }, async (_page, lab) => {
  await expect(lab.locator('svg [data-relation="0-2"]')).toHaveCount(1);
  await expect(lab.locator('svg [data-svg-node="2"]')).toHaveAttribute("data-selected", "true");
  await expect(lab.locator('[data-node="2"]')).toContainText("zihinsel kavram");
  await expect(lab.locator('[data-model-result]')).toContainText("Zihinsel kavram"); await readable021(lab);
 }),
];
