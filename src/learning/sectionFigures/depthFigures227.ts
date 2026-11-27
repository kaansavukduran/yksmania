import type { El, FigureDef } from "./figureKit";
import { CW, LH, card, cardLines, fitH, frame } from "./turkishFigures060Kit";
import { stackFig, type Sent, type StackStep } from "./turkishFigures061Kit";
import {
  KIND227, LINK227, TESTS227, chainBreak227, chainSents227, cactusSents227, cactusSplit227, flowSection227, ideaRole227, ideaSection227,
  ideaSents227, mainFocus227, mainIdea227, meaningRows227, meaningSection227, orphans227, relationsWithSignal227, removalTrial227, roman227,
  splitReport227, splitReportText227, splitSection227, structRoles227, structSents227, structureSection227, type Relation227,
} from "../depth227";

/*
 * 0.227 Türkçe tablo bölümlerinin çizimleri. Her etiket, rol ve okuma
 * depth227 verisinden gelir. Cümle yığınları ölçekli değildir; adımlar
 * yalnız sınır çizer ya da cümleyi geçici olarak çıkarır, öğrenme kaydı
 * üretmez.
 */

const orphanList = (os: { i: number; phrase: string }[]) => os.map(({ i, phrase }) => `${roman227(i)}. cümledeki “${phrase}”`).join(", ");

/* ---------- 1 · Cümlede anlam: sınama soruları ---------- */

const axisOf = (clauses: number): Relation227[] => (clauses === 2 ? [...LINK227] : ["karşılaştırma", ...KIND227]);
const buildMeaning = (step: number) => {
  const r = meaningRows227[step];
  const els: El[] = [];
  let y = card(els, 0, 0, CW, cardLines(0, CW, "Örnek cümle", r.sentence, "ink", "ink"), "c") - 0.3;
  if (r.clauses.length === 2) {
    const mid = CW / 2;
    const L = cardLines(0, mid - 0.15, "1. yargı", `${r.clauses[0]} (${r.realized[0] ? "gerçekleşti" : "gerçekleştiği bildirilmez"})`);
    const R = cardLines(mid + 0.15, CW, "2. yargı", `${r.clauses[1]} (${r.realized[1] ? "gerçekleşti" : "gerçekleştiği bildirilmez"})`);
    while (L.length < R.length) L.push({ s: " " });
    while (R.length < L.length) R.push({ s: " " });
    const yb = card(els, 0, y, mid - 0.15, L, "muted", { fill: false });
    card(els, mid + 0.15, y, CW, R, "muted", { fill: false });
    y = yb - 0.3;
  } else {
    y = card(els, 0, y, CW, cardLines(0, CW, "Tek yargı", r.clauses[0]), "muted", { fill: false }) - 0.3;
  }
  for (const rel of axisOf(r.clauses.length)) {
    const yes = r.yes.includes(rel);
    y = card(els, 0, y, CW, cardLines(0, CW, `${yes ? "evet" : "hayır"} · ${rel}`, TESTS227[rel], yes ? "a" : "muted", yes ? "ink" : "muted"), yes ? "a" : "muted", { fill: yes, dash: !yes }) - 0.18;
  }
  return { els, h: -y + LH * 0.2 };
};
const meaningH = Math.max(...meaningRows227.map((_, i) => buildMeaning(i).h));
const meaningFig: FigureDef = {
  caption: "Adımla bir örnek cümle seç. Önce yargılar ayrılır, sonra o eksenin sınama soruları sorulur; renkli kart “evet” alan sorudur ve ilişkinin adını verir.",
  alt: `Üstte seçilen örnek cümle, altında bir ya da iki yargı kartı ve gerçekleşme bilgisi, en altta sınama soruları kartları. İki yargılı cümlelerde ${LINK227.length} bağ sorusu, tek yargılı cümlelerde karşılaştırma ve öznel/nesnel soruları var; “evet” alan kart renkli, diğerleri kesik çerçeveli.`,
  maxHeight: fitH(meaningH),
  steps: meaningRows227.map(({ relation }) => relation),
  draw: (_v, step) => {
    const r = meaningRows227[step];
    const { els } = buildMeaning(step);
    els.push(...frame(meaningH));
    const sig = r.signals.find((x) => relationsWithSignal227(x).some((rel) => rel !== r.relation));
    const shared = sig ? relationsWithSignal227(sig).filter((x) => x !== r.relation) : [];
    return {
      els,
      readout: [
        `${r.relation}: “evet” alan sorular ${r.yes.join(", ")}.`,
        sig ? `“${sig}” işareti ${shared.join(", ")} ilişkisinde de geçer; karar sınama sorusundan çıkar.` : `İşaret “${r.cue.text}” yalnız ipucudur; karar sınama sorusundan çıkar.`,
      ],
    };
  },
};

/* ---------- 2 · Paragrafa giriş: yapı rolleri ---------- */

const structIntro = structRoles227.indexOf("giriş");
const structClose = structRoles227.indexOf("sonuç");
const structOrphans = orphans227(structSents227, structIntro);
const structFig = stackFig({
  caption: "Kompost paragrafının cümleleri yapıdaki yerleri ve işlevleriyle alt alta. Adımla girişi çıkar ya da sonucu işaretle; çıkarılan cümle soluk çerçeveyle yerinde kalır.",
  alt: `${structSents227.length} numaralı cümle alt alta; her cümlenin altında giriş, gelişme ya da sonuç rolü ve işlevi yazar. Çıkarılan cümle kesik çerçeveli ve soluk, öncülsüz kalan gönderme turuncu notla işaretli.`,
  sents: structSents227.map((s, i): Sent => ({ n: roman227(i), s: s.text, role: `${structRoles227[i]} · ${s.func}` })),
  steps: [
    { label: "Roller", note: `Öncül gerektirmeyen tek cümle ${roman227(structIntro)}: giriş. ${structRoles227.flatMap((r, i) => (r === "gelişme" ? [roman227(i)] : [])).join(", ")}: gelişme. ${roman227(structClose)}: sonuç.` },
    {
      label: `${roman227(structIntro)} çıkarılırsa`,
      removed: [structIntro],
      flags: Object.fromEntries(structOrphans.map(({ i, phrase }) => [i, `“${phrase}” öncülsüz kalır`])),
      note: `${roman227(structIntro)}. cümle çıkarılınca ${orphanList(structOrphans)} öncülsüz kalır; kalan cümlelerden hiçbiri giriş olamaz.`,
    },
    {
      label: "Sonuç",
      flags: { [structClose]: `sonuç: “${structSents227[structClose].closer}” önceki uygulamayı bağlar` },
      note: `${roman227(structClose)}. cümle “${structSents227[structClose].closer}” ile ${roman227(structSents227[structClose].deps[0].to)}. cümledeki uygulamanın sonucunu verir.`,
    },
  ],
  foot: "Yapıdaki yeri sıra numarası değil, bağ kanıtı ve bütüne katkı belirler.",
});

/* ---------- 3 · Yardımcı düşünce: destek ağı ---------- */

const ideaMain = mainIdea227(ideaSents227);
const ideaDrop = ideaSents227.findIndex(({ func }) => func === "örnek");
const ideaDropOrphans = orphans227(ideaSents227, ideaDrop);
const ideaFig = stackFig({
  caption: "Balkon paragrafının cümleleri rolleriyle alt alta. Adımla ana düşünceyi işaretle ya da bir örneği çıkar; desteğin nereye vardığı ve kaybolan bağ görünür.",
  alt: `${ideaSents227.length} numaralı cümle alt alta; her cümlenin altında ana ya da yardımcı düşünce rolü, destek biçimi ve desteklediği cümle yazar. Çıkarılan cümle kesik çerçeveli, öncülsüz kalan gönderme turuncu notla işaretli.`,
  sents: ideaSents227.map((s, i): Sent => ({ n: roman227(i), s: s.text, role: `${ideaRole227(i)} · ${s.func}${s.supports === null ? "" : ` → ${roman227(s.supports)}`}` })),
  steps: [
    { label: "Roller", note: `Ana düşünce ${roman227(ideaMain)}; diğer ${ideaSents227.length - 1} cümle yardımcı düşüncedir ve desteği ${roman227(ideaMain)}. cümleye varır.` },
    { label: "Ana düşünce", flags: { [ideaMain]: "ana düşünce: başka cümleyi desteklemez" }, note: `${roman227(ideaMain)}. cümle hiçbir cümleyi desteklemez; örnek, gerekçe ve sınırlama ona bağlanır.` },
    {
      label: `${roman227(ideaDrop)} çıkarılırsa`,
      removed: [ideaDrop],
      flags: Object.fromEntries(ideaDropOrphans.map(({ i, phrase }) => [i, `“${phrase}” öncülsüz kalır`])),
      note: `${roman227(ideaDrop)}. cümle çıkarılınca ana düşünce yine yerinde durur ama örnek kaybolur ve ${orphanList(ideaDropOrphans)} öncülsüz kalır.`,
    },
  ],
  foot: "Yardımcı düşünce önemsiz değildir; ana düşünceyi örnekler, gerekçelendirir ya da sınırlar.",
});

/* ---------- 4 · İkiye bölme: sınırı kaydır ---------- */

const cut = cactusSplit227[0];
const splitStep = (k: number): StackStep => {
  const rep = splitReport227(cactusSents227, k);
  return {
    label: `${roman227(k)}. cümleden önce`,
    cut: k,
    flags: Object.fromEntries(rep.crossing.map(({ i, phrase }) => [i, `“${phrase}” öncülünden ayrılır`])),
    note: `${rep.ok ? "Geçerli" : "Geçersiz"} sınır: ${splitReportText227(cactusSents227, k)}.`,
  };
};
const splitFig = stackFig({
  caption: "Kaktüs paragrafının cümleleri odak etiketleriyle alt alta. Adımla sınırı bir cümle önce, doğru yere ve bir cümle sonraya koy; öncülünden ayrılan gönderme turuncu yazılır.",
  alt: `${cactusSents227.length} numaralı cümle alt alta; her cümlenin altında odak etiketi yazar. Sınır yatay çizgiyle gösterilir, ikinci paragrafın cümleleri ayrı renkte. Öncülünden ayrılan gönderme turuncu notla işaretli.`,
  sents: cactusSents227.map((s, i): Sent => ({ n: roman227(i), s: s.text, role: `odak: ${s.focus}` })),
  steps: [
    { label: "Tam metin", note: `İki odak var: “${cactusSents227[0].focus}” ve “${cactusSents227[cut].focus}”. Sınırı dene.` },
    splitStep(cut - 1),
    splitStep(cut),
    splitStep(cut + 1),
  ],
  foot: "Geçerli sınırda iki yanda tek odak kalır ve hiçbir gönderme sözü öncülünden kopmaz.",
});

/* ---------- 5 · Akışı bozan cümle: çıkarma denemeleri ---------- */

const off = chainBreak227[0];
const chainMain = mainFocus227(chainSents227);
const limit = chainSents227.findIndex(({ text }) => text.startsWith("Ancak"));
const removeStep = (k: number): StackStep => ({
  label: `${roman227(k)} çıkarılırsa`,
  removed: [k],
  flags: Object.fromEntries(orphans227(chainSents227, k).map(({ i, phrase }) => [i, `“${phrase}” öncülsüz kalır`])),
  note: `${roman227(k)}. cümle ${removalTrial227(chainSents227, k)}.`,
});
const flowFig = stackFig({
  caption: "Zincir bakımı paragrafının cümleleri ana çizgiye katkılarıyla alt alta. Adımla bir cümleyi geçici olarak çıkar: akışı bozan cümlede bağlar onarılır, gerekli cümlede bir söz öncülsüz kalır.",
  alt: `${chainSents227.length} numaralı cümle alt alta; her cümlenin altında ana çizgiye katkısı ya da odak dışı olduğu yazar. Çıkarılan cümle kesik çerçeveli ve soluk, öncülsüz kalan gönderme turuncu notla işaretli.`,
  sents: chainSents227.map((s, i): Sent => ({ n: roman227(i), s: s.text, role: s.focus === chainMain ? s.func : `odak dışı: ${s.func}` })),
  steps: [
    { label: "Roller", note: `Ana çizgi “${chainMain}”; odak dışında kalan tek cümle ${roman227(off)}.` },
    removeStep(off),
    removeStep(off - 1),
    removeStep(limit),
  ],
  foot: "Karar sözcük benzerliğinden değil, odak ve çıkarma denemesinden çıkar.",
});

export const depthFigures227: Record<string, Record<string, FigureDef>> = {
  "cumlede-anlam": { [meaningSection227.title]: meaningFig },
  "paragrafa-giris": { [structureSection227.title]: structFig },
  "yardimci-dusunce": { [ideaSection227.title]: ideaFig },
  "ikiye-bolme": { [splitSection227.title]: splitFig },
  "akisi-bozan-cumle": { [flowSection227.title]: flowFig },
};
