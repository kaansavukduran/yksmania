import { poly, txt, v, type El, type FigureDef, type FigureFrame, type Tone } from "./figureKit";
import { CW, LH, LHB, fitH, frame, rect, tw, wrap } from "./turkishFigures060Kit";
import {
  classifyCumle226, ekFiilForms226, ekFiilRows226, ekFiilSection226, fiilimsiRows226, fiilimsiSection226, fourWay226, kalipRows226,
  kalipSection226, kalipType226, ogeRows226, ogeSection226, questionOf226, roleOf226, turRows226, turSection226, type Realized226,
  type Role226,
} from "../depth226";

/*
 * 0.226 TYT Türkçe tablo bölümlerinin çizimleri. Her adım tablonun bir
 * satırıdır; kutu yazıları ve açıklamalar tabloyu üreten aynı depth226
 * verilerinden ve kurallarından gelir. Ayrık yazılmış ekler çözümleme
 * gösterimidir, yazım önerisi değildir. Adım değiştirmek öğrenme kaydı
 * üretmez.
 */

const cap226 = (s: string) => s[0].toLocaleUpperCase("tr-TR") + s.slice(1);
const check226 = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depthFigures226: ${claim}`);
};

interface Card226 {
  box: string;
  head: string;
  text?: string;
  tone: Tone;
  /** Kalın çerçeve (merkez parça: yüklem, kök, kalıp). */
  strong?: boolean;
  /** Kesik çerçeve, dolgusuz. */
  dash?: boolean;
}
interface Frame226 {
  label: string;
  context: string;
  cards: Card226[];
  readout: string[];
  word?: FigureFrame["word"];
}

/**
 * Düşey kart yığını: solda kutu (kalın yazı), sağda başlık ve açıklama.
 * Bütün yazılar kart genişliğine göre önceden kaydırılır; yükseklik en uzun
 * adıma göre sabitlenir, böylece adım değişince pano zıplamaz.
 */
function stackFig226(o: { caption: string; alt: string; frames: Frame226[]; bx: number; legend?: FigureFrame["legend"] }): FigureDef {
  // Kutu genişliği: en uzun tek sözcüğe göre, en az o.bx, en çok 4,6 birim.
  const longest = Math.max(...o.frames.flatMap((f) => f.cards.flatMap((c) => c.box.split(" ").map((s) => tw(s, false, true)))));
  const bx = Math.min(4.6, Math.max(o.bx, longest + 0.45));
  const rw = CW - bx - 0.6;
  const build = (f: Frame226) => {
    const els: El[] = [];
    let y = 0;
    for (const s of wrap(f.context, CW - 0.4)) {
      els.push(txt(v(0, y), s, "e", { small: true, tone: "muted" }));
      y -= LH;
    }
    y -= 0.12;
    for (const c of f.cards) {
      const boxLines = wrap(c.box, bx - 0.4, false, true);
      for (const s of boxLines) check226(tw(s, false, true) <= bx - 0.25, `${s} kutuya sığmalı`);
      const right = [
        ...wrap(c.head, rw, true, true).map((s) => ({ s, bold: true })),
        ...(c.text ? wrap(c.text, rw).map((s) => ({ s, bold: false })) : []),
      ];
      for (const l of right) check226(tw(l.s, true, l.bold) <= rw + 0.05, `${l.s} sağ sütuna sığmalı`);
      const hh = Math.max(boxLines.length * LHB, right.length * LH) / 2 + 0.28;
      const top = y;
      const bottom = y - 2 * hh;
      const cy = y - hh;
      els.push(
        c.strong
          ? poly([v(0, top), v(bx, top), v(bx, bottom), v(0, bottom)], { tone: c.tone, bold: true })
          : rect(0, top, bx, bottom, c.tone, !c.dash, c.dash),
      );
      boxLines.forEach((s, k) => els.push(txt(v(bx / 2, cy + ((boxLines.length - 1) * LHB) / 2 - k * LHB), s, "c", { bold: true, tone: "ink" })));
      right.forEach((l, k) =>
        els.push(txt(v(bx + 0.2, cy + ((right.length - 1) * LH) / 2 - k * LH), l.s, "e", { small: true, bold: l.bold, tone: l.bold && c.tone !== "muted" ? c.tone : "ink" })),
      );
      y = bottom - 0.2;
    }
    return { els, h: -y - 0.2 };
  };
  const h = Math.max(...o.frames.map((f) => build(f).h));
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    steps: o.frames.map((f) => f.label),
    draw: (_value, step) => {
      const f = o.frames[Math.min(Math.max(step, 0), o.frames.length - 1)];
      const { els } = build(f);
      els.push(...frame(h));
      return { els, readout: f.readout, word: f.word, legend: o.legend };
    },
  };
}

/* ---------- Ek fiil: bir taban, beş biçim ---------- */

const vowelClass = (base: string) => ({ ı: "kalın düz", i: "ince düz", u: "kalın yuvarlak", ü: "ince yuvarlak" })[fourWay226(base) as "ı" | "i" | "u" | "ü"];
const ruleText = (f: Realized226) => {
  const parts: string[] = [];
  if (f.rules.includes("kaynaştırma")) parts.push("i düşer, y girer");
  if (f.rules.includes("benzeşme")) parts.push("sert ünsüzden sonra d → t");
  if (f.rules.includes("yumuşama")) parts.push("ünlüyle başlayan ek önünde k → ğ");
  return parts.length ? parts.join("; ") : "yalnız ünlü uyumu";
};
const segText = (f: Realized226) => [f.stem, f.buffer, f.suffix].filter(Boolean).join("-");
const ekFiilFigure = stackFig226({
  caption: "Her adım tablodaki bir tabandır. Solda kurulan biçim, sağda biçimin adı, çözümlemesi ve işleyen ses kuralı yazar. Dolu kutu uyumdan başka bir ses kuralının işlediğini, kesik çerçeve yalnız ünlü uyumunu gösterir.",
  alt: `Sekiz adımlı kart yığını. ${ekFiilRows226.map((r) => `${r.base}: ${r.forms.map((f) => f.word).join(", ")}`).join("; ")}.`,
  bx: 3.1,
  frames: ekFiilRows226.map((r) => ({
    label: r.base,
    context: `Taban ${r.base}: son ünlü ${r.vowel} (${vowelClass(r.base)}), ${r.ending === "ünlü" ? "ünlüyle biter" : `son ses ${r.base.at(-1)} (${r.ending})`}.`,
    cards: r.forms.map((f, i) => {
      const extra = f.rules.some((x) => x !== "uyum");
      return { box: f.word, head: `${ekFiilForms226[i].name} ${ekFiilForms226[i].label}`, text: `${segText(f)}: ${ruleText(f)}`, tone: extra ? "c" : "b", dash: !extra } satisfies Card226;
    }),
    readout: [`${r.base}: ${r.forms.map((f) => f.word).join(", ")}.`, "Ekin ünlüsü tabanın son ünlüsüne uyar; ünlüyle biten tabanda y, sert ünsüzle biten tabanda t görülür."],
  })),
  legend: [
    { code: "■", label: "uyumdan başka kural işledi", tone: "c" },
    { code: "▭", label: "yalnız ünlü uyumu", tone: "b" },
  ],
});

/* ---------- Fiilimsiler: kök, ek, kalan, bağlandığı söz ---------- */

const fiilimsiFigure = stackFig226({
  caption: "Her adım tablodaki bir cümledir. Kalın çerçeve fiil kökü ya da gövdesi, dolu kutu ek listesinde bulunan fiilimsi eki, kesik çerçeve ekten sonra kalan çekim ekidir. En alttaki kart fiilimsinin bağlandığı sözü gösterir.",
  alt: `Sekiz adımlı kart yığını. ${fiilimsiRows226.map((r) => `${r.word}: ${r.tag.stem}, ${r.tag.surface}, ${r.tag.type}, ${r.bound}`).join("; ")}.`,
  bx: 3.1,
  frames: fiilimsiRows226.map((r) => {
    const t = r.tag;
    const lo = (s: string) => s.toLocaleLowerCase("tr-TR");
    const cards: Card226[] = [{ box: `${lo(t.stem)}-`, head: "fiil kökü / gövdesi", text: "eylem anlamı korunur", tone: "ink", strong: true }];
    if (t.buffer) cards.push({ box: `-${t.buffer}-`, head: "kaynaştırma ünsüzü", text: "ünlüyle biten kökten sonra", tone: "muted" });
    cards.push({ box: `-${t.surface}`, head: `${t.label}: ${t.type}`, text: t.softened ? "ünlü önünde k → ğ" : "ek listesinde bulundu", tone: "c" });
    if (t.rest) cards.push({ box: `-${t.rest}`, head: "isim çekim eki", text: "ekten sonra kalan parça", tone: "b", dash: true });
    cards.push({ box: r.bound, head: "bağlandığı söz", text: r.role, tone: "a" });
    return {
      label: lo(r.word),
      context: `“${r.sentence}”`,
      cards,
      readout: [`${lo(r.word)}: ${t.type} (${t.label}) → ${r.bound}.`, "Tür ekin listesinden, görev cümledeki bağdan okunur."],
      word: [
        { s: lo(t.stem), tone: "ink" as Tone, label: "kök" },
        ...(t.buffer ? [{ s: t.buffer, tone: "muted" as Tone, label: "kaynaştırma" }] : []),
        { s: t.surface, tone: "c" as Tone, label: "fiilimsi eki" },
        ...(t.rest ? [{ s: t.rest, tone: "b" as Tone, label: "çekim eki" }] : []),
      ],
    };
  }),
});

/* ---------- Cümlenin ögeleri: öbek, öge, soru ---------- */

const roleTone: Record<Role226, { tone: Tone; dash?: boolean; strong?: boolean }> = {
  yüklem: { tone: "a", strong: true },
  özne: { tone: "b" },
  "belirtili nesne": { tone: "c" },
  "belirtisiz nesne": { tone: "c", dash: true },
  "yer tamlayıcısı": { tone: "b", dash: true },
  "zarf tümleci": { tone: "muted" },
};
const ogeFigure = stackFig226({
  caption: "Her adım tablodaki bir cümledir. Öbekler cümledeki sırasıyla yukarıdan aşağı dizilir; sağda öge adı ve o ögeyi bulduran soru yazar. Kalın çerçeve yüklemdir; gizli özne kesik ve soluk karttadır ve sayıya katılmaz.",
  alt: `Yedi adımlı kart yığını. ${ogeRows226.map((r) => r.parts.map((p) => `${p.t} ${roleOf226(p)}`).join(", ")).join("; ")}.`,
  bx: 3.7,
  frames: ogeRows226.map((r) => ({
    label: r.parts.map((p) => p.t).slice(0, 2).join(" "),
    context: `“${r.sentence}”`,
    cards: [
      ...r.parts.map((p) => {
        const role = roleOf226(p);
        return { box: p.t, head: role, text: questionOf226(p, r), ...roleTone[role] } satisfies Card226;
      }),
      ...(r.hidden ? [{ box: `(${r.hidden})`, head: "gizli özne", text: "yüklemdeki -m gösterir; sayıya katılmaz", tone: "muted" as Tone, dash: true }] : []),
    ],
    readout: [cap226(r.parts.map((p) => roleOf226(p)).join(" · ")), `Görünür öge: ${r.parts.length}${r.hidden ? ` (gizli ${r.hidden} sayılmaz)` : ""}.`],
  })),
  legend: [
    { code: "▣", label: "yüklem", tone: "a" },
    { code: "▭", label: "kesik: belirtisiz nesne, yer tamlayıcısı", tone: "b" },
  ],
});

/* ---------- Cümle türleri: yüklem ve dört ölçüt ---------- */

const turFigure = stackFig226({
  caption: "Her adım tablodaki bir cümledir. İlk kart yüklemi ve sırasını, sonraki dört kart dört ölçütün kararını ve kanıtını gösterir. Soluk kesik kart, yüklem olmadığı için belirlenemeyen ölçüttür.",
  alt: `Sekiz adımlı kart yığını. ${turRows226.map((r) => { const x = classifyCumle226(r); return `${r.sentence}: ${x.tur}, ${x.yer}, ${x.anlam}, ${x.yapi}`; }).join("; ")}.`,
  bx: 3.7,
  frames: turRows226.map((r) => {
    const x = classifyCumle226(r);
    const preds = r.clauses.filter((c) => c.y >= 0).map((c) => c.obek[c.y]);
    const axis = (head: string, value: string, why: string): Card226 => (value === "belirlenmez" ? { box: value, head, text: why, tone: "muted", dash: true } : { box: value, head, text: why, tone: "b" });
    return {
      label: r.sentence.split(" ").slice(0, 2).join(" "),
      context: `“${r.sentence}”`,
      cards: [
        preds.length
          ? { box: preds.join(" / "), head: "yüklem", text: r.clauses.map((c) => `${c.obek.length} öbekten ${c.y + 1}. sırada`).join("; "), tone: "a", strong: true }
          : { box: "yok", head: "yüklem", text: "söylenmemiş, bağlamdan tamamlanır", tone: "muted", dash: true },
        axis("yüklemin türü", x.tur, x.turWhy),
        { box: x.yer, head: "yerine göre", text: x.yerWhy, tone: "c" },
        axis("anlamına göre", x.anlam, x.anlamWhy),
        axis("yapısına göre", x.yapi, x.yapiWhy),
      ],
      readout: [cap226(`${x.tur}; ${x.yer}; ${x.anlam}; ${x.yapi}.`), "Her ölçüt ayrı kanıta dayanır; biri ötekini belirlemez."],
    };
  }),
});

/* ---------- Deyimler ve atasözleri: kalıp, kullanım, yargı ---------- */

const kalipFigure = stackFig226({
  caption: "Her adım tablodaki bir kalıptır. Üst kart kalıbı ve türünü, ikinci kart özgün kullanımdaki biçimi, üçüncü kart genel yargı ölçütünün sonucunu ve yerleşik anlamı gösterir.",
  alt: `Sekiz adımlı kart yığını. ${kalipRows226.map((k) => `${k.kalip}: ${kalipType226(k)}, ${k.meaning}`).join("; ")}.`,
  bx: 3.9,
  frames: kalipRows226.map((k) => {
    const type = kalipType226(k);
    return {
      label: k.kalip.replace(/[.,]/g, ""),
      context: k.usage,
      cards: [
        { box: k.kalip, head: type, text: k.general ? "toplumda yerleşmiş genel yargı" : "belirli durumu adlandıran kalıp", tone: type === "deyim" ? "b" : "c", strong: true },
        { box: k.used, head: "kullanımdaki biçim", text: k.general ? "sözcüğü sözcüğüne aktarıldı" : `çekimlendi; kalıp sözcükleri: ${k.fixed.join(", ")}`, tone: "muted" },
        { box: k.general ? "evet" : "hayır", head: k.general ? `genel yargı${k.imperative ? ", emirle öğüt" : ", gözlem"}` : "genel yargı yok", text: k.meaning, tone: k.general ? "c" : "b", dash: !k.general },
      ],
      readout: [`${k.kalip} → ${type}: ${k.meaning}`, "Ölçüt genel yargıdır; cümle ya da emir biçimi tek başına türü belirlemez."],
    };
  }),
});

check226(ekFiilRows226.every((r) => r.forms.length === ekFiilForms226.length), "her tabanda beş biçim");

export const depthFigures226: Record<string, Record<string, FigureDef>> = {
  "ek-fiil": { [ekFiilSection226.title]: ekFiilFigure },
  fiilimsiler: { [fiilimsiSection226.title]: fiilimsiFigure },
  "cumlenin-ogeleri": { [ogeSection226.title]: ogeFigure },
  "cumle-turleri": { [turSection226.title]: turFigure },
  "deyimler-ve-atasozleri": { [kalipSection226.title]: kalipFigure },
};
