import { txt, v, type El, type FigureDef, type Tone } from "./figureKit";
import { card, cardLines, CW, down, fitH, frame, LH, rect, wrap } from "./turkishFigures060Kit";
import {
  bakeryRows229, bakerySection229, bikeChecks229, bikeIns229, bikeSection229, constraintText229, dominant229,
  lampBlank229, lampChecks229, lampSection229, MODE_OF_FN229, pointName229, tankOrder229, tankSection229, tankSents229,
  tankSteps229, tankTotal229, type Fn229, type Need229, type Sent229,
} from "../depth229";

/*
 * 0.229.0 paragraf tablo bölümlerinin çizimleri. Her kart, etiket ve okuma
 * depth229 verisinden gelir: cümlenin görevi, istediği (needs) ve verdiği
 * (intro) bilgi. Kartlar kavram şemasıdır, ölçekli değildir; adımlar öğrenme
 * kaydı üretmez.
 */

const X0 = 0.3;
const X1 = CW - 0.3;
const q = (s: string) => `“${s}”`;
/** Romen rakamıyla ayrılma eki (bir-den, iki-den, üç-ten, dört-ten, beş-ten). */
const ABL: Record<string, string> = { I: "I’den", II: "II’den", III: "III’ten", IV: "IV’ten", V: "V’ten" };
const cap = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
const asks = (s: Sent229) => (s.needs.length ? `ister: ${s.needs.map((n) => q(n.clue)).join(", ")}` : "öncül istemez");
const gives = (s: Sent229) => (s.intro.length ? `verir: ${s.intro.join(", ")}` : "");
const brief = (s: Sent229) => [asks(s), gives(s)].filter(Boolean).join(" · ");
const broken = (need: Need229) => `${q(need.clue)} ${need.why ? `→ ${need.why}` : "öncülsüz"}`;

interface Box { head: string; text: string; tone: Tone; fill?: boolean; dash?: boolean; headTone?: Tone }
/** Kartları alt alta dizer; aralarına ince ok koyar. Alt kenarın y değerini döndürür. */
function stack(els: El[], y: number, boxes: Box[], arrows = true): number {
  boxes.forEach((b, i) => {
    const lines = cardLines(X0, X1, b.head, b.text, b.headTone ?? (b.tone === "muted" ? "muted" : "ink"), b.tone === "muted" ? "muted" : "ink");
    const y1 = card(els, X0, y, X1, lines, b.tone, { fill: b.fill ?? true, dash: b.dash });
    if (arrows && i < boxes.length - 1) els.push(down(CW / 2, y1 - 0.04, y1 - 0.4, "muted"));
    y = y1 - (arrows ? 0.46 : 0.22);
  });
  return y;
}
/** Sola yaslı serbest satırlar. */
function lines(els: El[], y: number, rows: { s: string; tone?: Tone; bold?: boolean }[]): number {
  for (const r of rows)
    for (const s of wrap(r.s, CW - 0.6, !r.bold, r.bold)) {
      els.push(txt(v(X0, y), s, "e", { small: !r.bold, bold: r.bold, tone: r.tone ?? "ink" }));
      y -= r.bold ? 0.66 : LH;
    }
  return y;
}
/** Adımlar arasında yükseklik sabit: en uzun adım ölçülür. */
function stepped(o: { caption: string; alt: string; steps: string[]; build: (step: number) => { els: El[]; y: number; readout: string[] } }): FigureDef {
  const h = Math.max(...o.steps.map((_, i) => -o.build(i).y)) + 0.2;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    steps: o.steps,
    draw: (_v, step) => {
      const { els, readout } = o.build(Math.min(step, o.steps.length - 1));
      els.push(...frame(h));
      return { els, readout };
    },
  };
}

/* ---------- 1 · Sıralama: kısıt ekledikçe kalan diziliş ---------- */

const orderFig = stepped({
  caption: `Adımla bir cümlenin bağını kısıt olarak ekle. Çubuk, ${tankTotal229} dizilişten bütün eklenen bağları karşılayanların payıdır; sayılar bütün dizilişler tek tek denenerek bulunur.`,
  alt: `Üstte kalan diziliş sayısını gösteren yatay çubuk. Altında çözüm sırasıyla ${tankOrder229.length} kart: her kartta cümle harfi, görevi, bağlayan sözü ve kısıtı. Eklenmiş kartlar renkli, henüz eklenmeyenler kesik çerçeveli.`,
  steps: tankSteps229.map(({ sentence }) => `${sentence.id} eklenir`),
  build: (step) => {
    const els: El[] = [];
    const { sentence, count, remaining } = tankSteps229[step];
    let y = lines(els, 0, [{ s: `Kalan sıra: ${count} / ${tankTotal229}`, bold: true, tone: "a" }]);
    const barY = y + 0.1;
    els.push(rect(X0, barY, X1, barY - 0.36, "muted", false));
    els.push(rect(X0, barY, X0 + Math.max(0.12, ((X1 - X0) * count) / tankTotal229), barY - 0.36, "a", true));
    y = barY - 0.8;
    y = stack(els, y, tankOrder229.map((s, i) => ({
      head: `${s.id} · ${s.role}`,
      text: s.needs.length ? `${s.needs.map((n) => q(n.clue)).join(", ")} → ${s.needs.map((n) => constraintText229(tankSents229, n)).join("; ")}` : "öncül istemez → giriş adayı",
      tone: i === step ? "a" : i < step ? "c" : "muted",
      fill: i <= step,
      dash: i > step,
    })));
    const shown = remaining.length <= 4 ? remaining.map((seq) => seq.map(({ id }) => id).join("–")) : [];
    if (shown.length) y = lines(els, y - 0.1, [{ s: `Kalan dizilişler: ${shown.join(", ")}` }]);
    return {
      els,
      y,
      readout: [
        sentence.needs.length ? `${sentence.id}: ${sentence.needs.map((n) => `${q(n.clue)} → ${constraintText229(tankSents229, n)}`).join("; ")}.` : `${sentence.id} öncül istemez: giriş adayı, kısıt eklenmez.`,
        `Kalan sıra: ${count}${shown.length ? ` (${shown.join(", ")})` : ""}.`,
      ],
    };
  },
});

/* ---------- 2 · Cümle ekleme: beş konum ---------- */

const insertFig = stepped({
  caption: `Adımla yeni cümleyi ${bikeChecks229.length} konumdan birine koy. Turuncu kart, bağı kopan cümledir: yeni cümlenin sol bağı ya da sonraki cümlenin göndermesi.`,
  alt: `Alt alta parça cümlelerinin kartları; her kartta numara, görev, istediği ve verdiği bilgi. Yeni cümle X seçilen konumda; bağları tutuyorsa renkli, kopuyorsa turuncu. Göndermesi karşılanmayan cümle de turuncu.`,
  steps: bikeChecks229.map(({ k }) => (k === 0 ? "Başa" : `${ABL[bikeIns229.base[k - 1].id]} sonra`)),
  build: (step) => {
    const els: El[] = [];
    const c = bikeChecks229[step];
    const boxes: Box[] = c.seq.map((s, i) => {
      if (i === c.k) {
        return {
          head: `X · ${s.role}${c.fits ? " · uyar" : " · uymaz"}`,
          text: `${brief(s)}${c.left.length ? ` · kopan: ${c.left.map((n) => q(n.clue)).join(", ")}` : ""}`,
          tone: c.fits ? "a" : "warn",
          headTone: c.fits ? "a" : "warn",
        };
      }
      const bad = c.rest.filter((r) => r.sentence === s);
      return { head: `${s.id} · ${s.role}`, text: bad.length ? `${bad.map((r) => broken(r.need)).join("; ")}` : brief(s), tone: bad.length ? "warn" : "c", headTone: bad.length ? "warn" : "ink" };
    });
    const y = stack(els, 0, boxes);
    return {
      els,
      y,
      readout: [
        `${cap(pointName229(bikeIns229.base, c.k))}: ${c.left.length ? `sol bağ kopar (${c.left.map((n) => q(n.clue)).join(", ")})` : "sol bağ karşılanır"}; ${c.rest.length ? `sağ bağ kopar (${c.rest.map(({ sentence, need }) => `${sentence.id}: ${q(need.clue)}`).join(", ")})` : "sağ bağ karşılanır"}.`,
        c.fits ? "İki bağ da tutar: cümle buraya eklenir." : "En az bir bağ koptuğu için bu konum uymaz.",
      ],
    };
  },
});

/* ---------- 3 · Boşluk doldurma: beş seçenek ---------- */

const blankFig = stepped({
  caption: "Adımla bir seçeneği boşluğa koy. Kartlar önceki cümleleri, boşluktaki seçeneği ve sonraki cümleyi gösterir; turuncu, bağı kopan karttır.",
  alt: `Alt alta dört kart: iki önceki cümle, boşluktaki seçenek ve sonraki cümle. Her kartta istenen ve verilen bilgi. Seçenek bağları tutuyorsa renkli, kopuyorsa turuncu; sonraki cümlenin göndermesi karşılanmazsa o da turuncu.`,
  steps: lampChecks229.map(({ option }) => `${option.id} seçeneği`),
  build: (step) => {
    const els: El[] = [];
    const c = lampChecks229[step];
    const o = c.option;
    const boxes: Box[] = [
      ...lampBlank229.before.map((s): Box => ({ head: `${s.id} · ${s.role}`, text: brief(s), tone: "c" })),
      {
        head: `( … ) = ${o.id} · ${o.role}${c.fits ? " · uyar" : " · uymaz"}`,
        text: `${o.text}${c.left.length ? ` · ${c.left.map(broken).join("; ")}` : ""}`,
        tone: c.fits ? "a" : "warn",
        headTone: c.fits ? "a" : "warn",
      },
      ...lampBlank229.after.map((s): Box => {
        const bad = c.right.filter((r) => r.sentence === s);
        return { head: `${s.id} · ${s.role}`, text: bad.length ? bad.map((r) => broken(r.need)).join("; ") : brief(s), tone: bad.length ? "warn" : "c", headTone: bad.length ? "warn" : "ink" };
      }),
    ];
    const y = stack(els, 0, boxes);
    return {
      els,
      y,
      readout: [
        `${o.id}: sol bağ ${c.left.length ? `kopar (${c.left.map(broken).join("; ")})` : "karşılanır"}; sağ bağ ${c.right.length ? `kopar (${c.right.map(({ need }) => q(need.clue)).join(", ")})` : "karşılanır"}.`,
        c.fits ? `${o.id} boşluğa uyar.` : `${o.id} boşluğa uymaz.`,
      ],
    };
  },
});

/* ---------- 4 · Anlatım biçimleri: aynı konu, dört biçim ---------- */

const fnTone: Record<Fn229, Tone> = { olay: "a", nitelik: "b", bilgi: "c", sav: "warn", gerekçe: "warn", "karşı görüş": "muted" };
const modeFig = stepped({
  caption: "Adımla dört fırın parçasından birini aç. Her birim işleviyle etiketli; alttaki kart iki kanıtı ve tek başına yetmeyen ipucunu verir. Biçim, birimlerden kuralla bulunur.",
  alt: `Üstte biçim adı. Altında parçanın işlev birimleri ayrı kartlarda: olay, nitelik, bilgi, sav ya da gerekçe etiketiyle. En altta iki kanıt ve yanıltıcı tek ipucu kartı.`,
  steps: bakeryRows229.map(({ mode }) => cap(mode.split(" ")[0])),
  build: (step) => {
    const els: El[] = [];
    const row = bakeryRows229[step];
    const got = dominant229(row.units);
    let y = lines(els, 0, [{ s: `Kural: ${cap(got)}`, bold: true, tone: "a" }]);
    y = stack(els, y - 0.1, row.units.map((u) => ({ head: u.fn, text: u.text, tone: fnTone[u.fn], headTone: fnTone[u.fn] === "muted" ? "ink" : fnTone[u.fn] })), false);
    y = stack(els, y - 0.2, [{ head: "İki kanıt", text: `1) ${row.first} · 2) ${row.second}`, tone: "c" }, { head: "Tek başına yetmez", text: row.weak, tone: "muted", fill: false, dash: true }], false);
    return {
      els,
      y,
      readout: [
        `${cap(row.mode)}: ${row.units.map((u) => u.fn).join(" + ")} → kural ${got} verir.`,
        `Birim işlevi → biçim: ${[...new Set(row.units.map((u) => u.fn))].map((f) => `${f} → ${MODE_OF_FN229[f]}`).join("; ")}.`,
      ],
    };
  },
});

export const depthFigures229: Record<string, Record<string, FigureDef>> = {
  "paragrafta-siralama": { [tankSection229.title]: orderFig },
  "paragrafta-cumle-ekleme": { [bikeSection229.title]: insertFig },
  "paragrafta-bosluk-doldurma": { [lampSection229.title]: blankFig },
  "paragrafta-anlatim-bicimleri": { [bakerySection229.title]: modeFig },
};
