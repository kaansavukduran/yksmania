import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { appendFileSync } from "node:fs";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

/*
 * Card padding / edge gate (Forge052). On every main route, at 320, 375 and
 * 1280 px, it measures in screen pixels:
 *  - "iç boşluk": every visible text line inside a card or panel stays at
 *    least 10 px from the card's left/right border edge and 8 px from its
 *    top/bottom edge. A card is `.panel`, `.card`, `.zero-start`,
 *    `.foundation-card` or any element with a class ending in `-card`, and
 *    only counts when it shows a visible border or a background that differs
 *    from the surface behind it. Text is measured line by line with
 *    Range.getClientRects(); hidden text (display none, visibility hidden,
 *    opacity 0, sr-only clip) is skipped. Text inside a nested card belongs to
 *    the nested card only;
 *  - "taşma": edge-to-edge visuals (svg, img, canvas, progress, hr) are not
 *    held to the text inset but must stay inside their card's border box;
 *  - "kenar boşluğu": at ≤ 640 px the main content area and its cards keep at
 *    least 14 px from the viewport's left and right edges;
 *  - "kart arası": sibling cards keep at least 12 px between them, stacked or
 *    side by side;
 *  - "yatay kaydırma": documentElement.scrollWidth ≤ clientWidth;
 *  - axe: no serious or critical violation.
 * Today and Temel İnşa are measured again in all six themes (a theme only
 * changes colours, so the layout must not change).
 * Each violation reads `rota · genişlik · seçici · metin · ölçülen px`.
 * With LAYOUT_GATE_OUT set, the violations are also appended (JSON lines).
 */
const ROUTES = [
  { name: "Bugün", hash: "#/today" },
  { name: "Temel İnşa", hash: "#/foundations" },
  { name: "Dersler", hash: "#/courses" },
  { name: "Özetler", hash: "#/cheatsheets" },
  { name: "Sorular", hash: "#/questions" },
  { name: "Sınavlar", hash: "#/exams" },
  { name: "Takvim", hash: "#/calendar" },
  { name: "Yanlışlarım", hash: "#/mistakes" },
  { name: "Dünya", hash: "#/world" },
  { name: "Ayarlar", hash: "#/settings" },
  { name: "Konu: küresel aynalar", hash: "#/lesson?id=kuresel-aynalar" },
] as const;
const WIDTHS = [320, 375, 1280] as const;
const THEMES = ["dark", "light", "contrast", "matrix", "axolotl", "trans"] as const;

type Violation = { kind: string; selector: string; text: string; px: number };

/** Runs in the page: plain DOM code, serialised by page.evaluate. */
const measureLayout = (): Violation[] => {
  const SIDE = 10;
  const END = 8;
  const MAIN_GUTTER = 14;
  const CARD_GAP = 12;
  const out: Violation[] = [];
  const main = document.querySelector("main");
  if (!main) return [{ kind: "ana alan yok", selector: "main", text: "", px: 0 }];
  const round = (n: number) => Math.round(n * 10) / 10;
  const hidden = (el: Element | null, stop: Element | null = null) => {
    for (let e = el; e && e !== stop && e !== document.documentElement; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === "none" || cs.visibility === "hidden" || cs.visibility === "collapse" || +cs.opacity === 0)
        return true;
      // sr-only / visually hidden: clipped to nothing or squeezed to 1 px.
      const r = e.getBoundingClientRect();
      if (cs.position === "absolute" && (cs.clip.startsWith("rect(0") || cs.clipPath.startsWith("inset(50%")) )
        return true;
      if (cs.overflow === "hidden" && r.width <= 1 && r.height <= 1) return true;
    }
    return false;
  };
  const selectorOf = (el: Element) => {
    const parts: string[] = [];
    for (let e: Element | null = el; e && e !== main && parts.length < 3; e = e.parentElement) {
      const cls = [...e.classList].slice(0, 2).map((c) => `.${c}`).join("");
      parts.unshift(`${e.tagName.toLowerCase()}${e.id ? `#${e.id}` : ""}${cls}`);
    }
    return parts.join(" > ");
  };
  const transparent = (c: string) => c === "transparent" || /rgba\([^)]*,\s*0\)$/.test(c);
  const surfaceBehind = (el: Element) => {
    for (let e = el.parentElement; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (!transparent(cs.backgroundColor) || cs.backgroundImage !== "none")
        return `${cs.backgroundColor}|${cs.backgroundImage}`;
    }
    return "rgb(255, 255, 255)|none";
  };
  const isCardName = (el: Element) =>
    el.matches(".panel, .card, .zero-start, .foundation-card") || [...el.classList].some((c) => c.endsWith("-card"));
  const looksLikeCard = (el: Element) => {
    const cs = getComputedStyle(el);
    const border = (["Top", "Right", "Bottom", "Left"] as const).some(
      (s) =>
        parseFloat(cs.getPropertyValue(`border-${s.toLowerCase()}-width`)) > 0 &&
        cs.getPropertyValue(`border-${s.toLowerCase()}-style`) !== "none" &&
        !transparent(cs.getPropertyValue(`border-${s.toLowerCase()}-color`)),
    );
    const bg =
      (!transparent(cs.backgroundColor) || cs.backgroundImage !== "none") &&
      `${cs.backgroundColor}|${cs.backgroundImage}` !== surfaceBehind(el);
    return border || bg;
  };
  const cards = [...main.querySelectorAll("*")].filter((el) => {
    if (!isCardName(el) || el.closest("svg")) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && !hidden(el) && looksLikeCard(el);
  });
  const cardSet = new Set(cards);
  const ownerCard = (node: Node) => {
    for (let e = node.parentElement; e; e = e.parentElement) if (cardSet.has(e)) return e;
    return null;
  };
  const MEDIA = "svg, img, canvas, video, progress, meter, hr, [role='progressbar'], [role='separator']";
  for (const card of cards) {
    const box = card.getBoundingClientRect();
    const name = selectorOf(card);
    // Text lines.
    const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
    const seen = new Set<string>();
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const text = (n.textContent ?? "").replace(/\s+/g, " ").trim();
      if (!text) continue;
      const parent = n.parentElement;
      if (!parent || ownerCard(n) !== card || parent.closest(MEDIA) || hidden(parent, card.parentElement)) continue;
      if (parent.closest("select, option, textarea, script, style, template")) continue;
      // Text scrolled or clipped out of an overflow container is not shown.
      let clip: DOMRect | null = null;
      for (let e: Element | null = parent; e && e !== card; e = e.parentElement) {
        const cs = getComputedStyle(e);
        if (cs.overflowX !== "visible" || cs.overflowY !== "visible") {
          clip = e.getBoundingClientRect();
          break;
        }
      }
      const range = document.createRange();
      range.selectNodeContents(n);
      let worst: { side: string; px: number } | null = null;
      for (const r of range.getClientRects()) {
        if (r.width < 0.5 || r.height < 0.5) continue;
        if (clip && (r.right <= clip.left || r.left >= clip.right || r.bottom <= clip.top || r.top >= clip.bottom)) continue;
        const gaps = [
          { side: "sol", px: r.left - box.left, need: SIDE },
          { side: "sağ", px: box.right - r.right, need: SIDE },
          { side: "üst", px: r.top - box.top, need: END },
          { side: "alt", px: box.bottom - r.bottom, need: END },
        ];
        for (const g of gaps)
          if (g.px < g.need - 0.5 && (!worst || g.px - g.need < worst.px - (g.side === "sol" || g.side === "sağ" ? SIDE : END)))
            worst = { side: g.side, px: g.px };
      }
      if (worst) {
        const key = `${worst.side}|${text}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ kind: `iç boşluk ${worst.side}`, selector: name, text: text.slice(0, 60), px: round(worst.px) });
      }
    }
    // Edge-to-edge visuals stay inside the card.
    for (const m of card.querySelectorAll(MEDIA)) {
      if (m.parentElement?.closest("svg") || ownerCard(m) !== card || hidden(m, card.parentElement)) continue;
      const r = m.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      const over = Math.max(box.left - r.left, r.right - box.right, box.top - r.top, r.bottom - box.bottom);
      if (over > 1)
        out.push({ kind: "taşma", selector: `${name} ${m.tagName.toLowerCase()}`, text: m.getAttribute("aria-label") ?? "", px: round(-over) });
    }
  }
  // Main gutter on phones.
  const vw = document.documentElement.clientWidth;
  if (window.innerWidth <= 640) {
    const mr = main.getBoundingClientRect();
    const ms = getComputedStyle(main);
    const left = mr.left + parseFloat(ms.borderLeftWidth) + parseFloat(ms.paddingLeft);
    const right = vw - (mr.right - parseFloat(ms.borderRightWidth) - parseFloat(ms.paddingRight));
    if (left < MAIN_GUTTER - 0.5) out.push({ kind: "kenar boşluğu sol", selector: "main", text: "", px: round(left) });
    if (right < MAIN_GUTTER - 0.5) out.push({ kind: "kenar boşluğu sağ", selector: "main", text: "", px: round(right) });
    for (const card of cards) {
      const r = card.getBoundingClientRect();
      // Cards inside a horizontal scroller are allowed to run off-screen.
      let scroller = false;
      for (let e = card.parentElement; e && e !== main; e = e.parentElement)
        if (/(auto|scroll)/.test(getComputedStyle(e).overflowX)) scroller = true;
      if (scroller) continue;
      const g = Math.min(r.left, vw - r.right);
      if (g < MAIN_GUTTER - 0.5)
        out.push({ kind: "kenar boşluğu kart", selector: selectorOf(card), text: (card.textContent ?? "").trim().slice(0, 40), px: round(g) });
    }
  }
  // Sibling cards.
  const byParent = new Map<Element, Element[]>();
  for (const c of cards) {
    const p = c.parentElement;
    if (!p) continue;
    const list = byParent.get(p) ?? [];
    list.push(c);
    byParent.set(p, list);
  }
  for (const list of byParent.values())
    for (let i = 0; i < list.length; i++)
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i].getBoundingClientRect();
        const b = list[j].getBoundingClientRect();
        const gx = Math.max(b.left - a.right, a.left - b.right);
        const gy = Math.max(b.top - a.bottom, a.top - b.bottom);
        const g = Math.max(gx, gy);
        if (g < CARD_GAP - 0.5)
          out.push({
            kind: "kart arası",
            selector: `${selectorOf(list[i])} | ${selectorOf(list[j])}`,
            text: (list[j].textContent ?? "").trim().slice(0, 40),
            px: round(g),
          });
      }
  const doc = document.documentElement;
  if (doc.scrollWidth > doc.clientWidth)
    out.push({ kind: "yatay kaydırma", selector: "html", text: "", px: doc.scrollWidth - doc.clientWidth });
  return out;
};

async function settle(page: Page, hash: string) {
  await page.goto(`/${hash}`);
  await expect(page.locator("main h1:visible, main h2:visible").first()).toBeVisible({ timeout: 15_000 });
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  await page.waitForFunction(() => document.fonts.check('16px "Inter Variable"'), undefined, { timeout: 15_000 });
  // Wait until two consecutive measurements agree (lazy chunks, late fonts).
  let last = "";
  for (let i = 0; i < 8; i++) {
    await page.waitForTimeout(250);
    const now = JSON.stringify(await page.evaluate(measureLayout));
    if (now === last) return JSON.parse(now) as Violation[];
    last = now;
  }
  return JSON.parse(last) as Violation[];
}

async function seriousAxe(page: Page) {
  const axe = await new AxeBuilder({ page }).include("main").analyze();
  return axe.violations
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map((v) => `${v.id}: ${v.nodes.length}`);
}

function report(route: string, width: number, list: Violation[], theme?: string) {
  const lines = list.map(
    (v) => `${route}${theme ? ` [${theme}]` : ""} · ${width} · ${v.selector} · ${v.text} · ${v.kind} ${v.px}px`,
  );
  if (process.env.LAYOUT_GATE_OUT && list.length)
    appendFileSync(
      process.env.LAYOUT_GATE_OUT,
      list.map((v) => JSON.stringify({ route, width, theme: theme ?? "varsayılan", ...v })).join("\n") + "\n",
    );
  return lines;
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

for (const width of WIDTHS)
  test(`052 kart iç boşluğu ve kenar kapısı ${width}px`, async ({ page }) => {
    test.setTimeout(240_000);
    await page.setViewportSize({ width, height: 900 });
    const lines: string[] = [];
    const axeFail: string[] = [];
    for (const r of ROUTES) {
      const first = await settle(page, r.hash);
      // The gate must be stable: the same page measured again gives the same list.
      expect(await page.evaluate(measureLayout), `${r.name} ${width} kararlı ölçüm`).toEqual(first);
      lines.push(...report(r.name, width, first));
      const axe = await seriousAxe(page);
      if (axe.length) axeFail.push(`${r.name} · ${width} · ${axe.join(", ")}`);
    }
    const all = [...axeFail.map((a) => `axe · ${a}`), ...lines];
    expect(all, all.join("\n")).toEqual([]);
  });

for (const width of WIDTHS)
  test(`052 kart iç boşluğu altı temada ${width}px`, async ({ page }) => {
    test.setTimeout(240_000);
    await page.setViewportSize({ width, height: 900 });
    const lines: string[] = [];
    const axeFail: string[] = [];
    for (const r of ROUTES.slice(0, 2)) {
      await settle(page, r.hash);
      for (const theme of THEMES) {
        await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
        await page.waitForTimeout(100);
        lines.push(...report(r.name, width, await page.evaluate(measureLayout), theme));
        const axe = await seriousAxe(page);
        if (axe.length) axeFail.push(`${r.name} [${theme}] · ${width} · ${axe.join(", ")}`);
      }
    }
    const all = [...axeFail.map((a) => `axe · ${a}`), ...lines];
    expect(all, all.join("\n")).toEqual([]);
  });
