import { circle, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * TYT Din Kültürü · Hint ve Çin dinleri. Panolar tıklanabilir; her kartta
 * ayırıcı kavramlar ve karıştırma sınırı yazar. Semboller şematiktir; bir
 * sembol tek başına kişisel dinî aidiyet kanıtı değildir.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const arc = (c: V, r: number, a0: number, a1: number, n = 24): V[] =>
  Array.from({ length: n + 1 }, (_, i) => { const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180; return v(c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)); });

// 1 · Dört gelenek.
const FOUR = [
  { s: "Hinduizm", x: 0, y: 0, line: "karma · samsara · mokşa · avatar", detail: ["Hint alt kıtası; tek tarihsel kurucu yok. Kaynak: Vedalar, Upanişadlar.", "Brahma, Vişnu, Şiva; puja, Ganj.", "Brahma (tanrısal varlık) ≠ Brahman (mutlak gerçeklik)."] },
  { s: "Budizm", x: 4.6, y: 0, line: "Buda · nirvana · Sekiz Yol · sangha", detail: ["Hint alt kıtası; Siddhartha Gautama (Buda). Kaynak: Tripitaka.", "Sangha (topluluk), vihara (manastır/mekân).", "Karma ve yeniden doğum Hinduizme özgü değil; anatta: sabit öz-benlik yok."] },
  { s: "Konfüçyanizm", x: 0, y: -2.0, line: "ren · li · xiao · yönetim", detail: ["Çin; Konfüçyüs. Kaynak: Konuşmalar (Lun Yu), Beş Klasik, Dört Kitap.", "Ren: insanlık/erdem; li: uygun ritüel; xiao: evlada düşen saygı.", "Ata saygısı tek başına yetmez; toplumsal erdem paketi belirleyici."] },
  { s: "Taoizm", x: 4.6, y: -2.0, line: "Tao · wu wei · yin–yang · Laozi", detail: ["Çin; Laozi. Kaynak: Tao Te Ching.", "Wu wei: zorlamadan, doğal akışa uygun eylem (hiç çalışmamak değil).", "Yin–yang daha geniş Çin düşüncesinde de görülür."] },
];
const four: FigureDef = {
  caption:
    "Dört geleneği köken (üst satır Hint, alt satır Çin) ve ayırıcı kavram kümesiyle ayır. Bir geleneğe tıkla: kişi/kaynak, kavramlar ve en sık karıştırılan sınır açılır.",
  alt: "İki satır iki sütunlu pano: üstte Hinduizm ve Budizm, altta Konfüçyanizm ve Taoizm; her kutuda kavramlar.",
  picks: FOUR.map((f) => ({ label: f.s, title: f.s, detail: f.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [txt(v(-0.3, 0.55), "Hint", "w", { small: true, tone: "muted" }), txt(v(-0.3, -1.45), "Çin", "w", { small: true, tone: "muted" })];
    FOUR.forEach((f, i) => {
      const sel = pick === i;
      els.push(rect(f.x - 0.1, f.x + 4.3, f.y - 1.1, f.y + 0.35, sel ? "a" : i < 2 ? "c" : "b"));
      els.push(txt(v(f.x + 0.1, f.y), f.s, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      f.line.split(" · ").forEach((w, k) => els.push(txt(v(f.x + 0.2 + (k % 2) * 2.1, f.y - 0.45 - Math.floor(k / 2) * 0.4), w, "e", { small: true, tone: "muted" })));
    });
    els.push(txt(v(-1.0, 0.8), " ", "c"), txt(v(9.1, -3.3), " ", "c"));
    return { els, readout: [pick >= 0 ? FOUR[pick].detail[0] : "Bir geleneğe tıkla ya da aşağıdan seç.", "Tek sözcük değil, iki kanıt: kişi/kaynak + ayırıcı kavram."] };
  },
};

// 2 · Ortak kavram tuzağı: Hinduizm–Budizm.
const REGIONS = [
  { label: "Yalnız Hinduizm", at: v(-1.7, 0), items: ["Vedalar", "mokşa", "avatar", "Atman", "Ganj"], detail: ["Vedalar ve Ganj birlikte Hinduizm için güçlü iki kanıttır.", "Avatar: Vişnu’nun bedenlenerek inişi.", "Atman: Hindu geleneklerinde benlik; Budist anatta ile aynı değil."] },
  { label: "Ortak", at: v(0, 0), items: ["karma", "samsara", "Hint", "alt kıtası"], detail: ["Karma ve yeniden doğum iki gelenekte de var.", "Bu ortak işaretlerden tek başına kesin sonuç çıkmaz.", "Coğrafya da ortak: “Hint alt kıtası” yetmez."] },
  { label: "Yalnız Budizm", at: v(1.7, 0), items: ["Buda", "nirvana", "Sekiz Yol", "anatta", "sangha"], detail: ["Gautama/Buda, nirvana, Sekiz Aşamalı Yol ayırıcıdır.", "Anatta: değişmez öz-benliğin reddi.", "Sangha topluluk, vihara mekân."] },
];
const venn: FigureDef = {
  caption:
    "“Karma” gördüğünde tek geleneği kesin seçemezsin: Hinduizm ile Budizmin ortak kavramıdır. Bir bölgeye tıkla: ortak işaretler ve iki geleneği ayıran ikinci kanıt açılır.",
  alt: "İki kesişen oval: solda Hinduizm, sağda Budizm. Kesişimde karma ve samsara; sol tarafta Vedalar, mokşa, avatar; sağ tarafta Buda, nirvana, Sekiz Yol.",
  picks: REGIONS.map((r) => ({ label: r.label, title: r.label, detail: r.detail })),
  draw: (_v, _s, pick = -1) => {
    const ell = (cx: number): V[] => Array.from({ length: 48 }, (_, i) => { const a = (i / 48) * Math.PI * 2; return v(cx + 2.0 * Math.cos(a), 1.6 * Math.sin(a)); });
    const els: El[] = [poly(ell(-1.0), { fill: pick === 0 ? "a" : "c", tone: "c", smooth: true }), poly(ell(1.0), { fill: pick === 2 ? "a" : "b", tone: "b", smooth: true })];
    els.push(txt(v(-1.9, 1.95), "Hinduizm", "c", { small: true, bold: true, tone: "c" }), txt(v(1.9, 1.95), "Budizm", "c", { small: true, bold: true, tone: "b" }));
    REGIONS.forEach((r, i) => {
      els.push(txt(v(r.at[0], 1.1), r.label, "c", { small: true, bold: true, tone: pick === i ? "a" : "ink", pick: i }));
      r.items.forEach((w, k) => els.push(txt(v(r.at[0], 0.55 - k * 0.42), w, "c", { small: true, tone: "muted" })));
    });
    els.push(txt(v(-3.4, 2.4), " ", "c"), txt(v(3.4, -1.9), " ", "c"));
    return { els, readout: [pick >= 0 ? REGIONS[pick].detail[0] : "Bir bölgeye tıkla ya da aşağıdan seç.", "Ortak terimi işaretle, sonra kişi/metin/amaç gibi ayırıcı ikinci kanıtı ara."] };
  },
};

// 3 · Sekiz Aşamalı Yol.
const PATH = ["doğru görüş", "doğru niyet", "doğru söz", "doğru eylem", "doğru geçim", "doğru çaba", "doğru dikkat", "doğru konsantrasyon"];
const GROUPS = [
  { label: "Bilgelik", idx: [0, 1], detail: ["Doğru görüş ve doğru niyet.", "Dört Yüce Hakikat’i kavramak ve yönelimi düzeltmek."] },
  { label: "Ahlak", idx: [2, 3, 4], detail: ["Doğru söz, doğru eylem, doğru geçim.", "Gündelik davranışın ahlaki düzeni."] },
  { label: "Zihin disiplini", idx: [5, 6, 7], detail: ["Doğru çaba, doğru dikkat, doğru konsantrasyon.", "Meditasyon ve bağlanmadan özgürleşme (nirvana) yönelimi."] },
];
const wheel: FigureDef = {
  caption:
    "Budizmde Sekiz Aşamalı Yol, sekiz kollu öğreti çarkıyla temsil edilir. Bir grup seç: bilgelik, ahlak ya da zihin disiplini adımları vurgulanır. “Zorunlu kast değiştirme” gibi öğeler yolun parçası değildir.",
  alt: "Sekiz kollu çark; her kolun ucunda bir adım adı. Seçilen gruptaki adımlar renkli.",
  picks: GROUPS.map((g) => ({ label: g.label, title: `${g.label} (${g.idx.length} adım)`, detail: g.detail })),
  draw: (_v, _s, pick = -1) => {
    const R = 1.4, on = pick >= 0 ? GROUPS[pick].idx : [];
    const els: El[] = [circle(v(0, 0), R, { tone: "warn", bold: true }), circle(v(0, 0), 0.3, { tone: "warn", fill: "warn" })];
    PATH.forEach((p, i) => {
      const a = (90 - i * 45) * Math.PI / 180, end = v(R * Math.cos(a), R * Math.sin(a));
      const hot = on.includes(i);
      els.push(seg(v(0.3 * Math.cos(a), 0.3 * Math.sin(a)), end, { tone: hot ? "a" : "warn", bold: hot }));
      const lab = v((R + 0.3) * Math.cos(a), (R + 0.3) * Math.sin(a));
      const anc = Math.abs(Math.cos(a)) < 0.2 ? "c" : Math.cos(a) > 0 ? "e" : "w";
      els.push(txt(v(lab[0], lab[1] + (Math.abs(Math.cos(a)) < 0.2 ? (Math.sin(a) > 0 ? 0.15 : -0.15) : 0)), p, anc, { small: true, bold: hot, tone: hot ? "a" : "ink" }));
    });
    GROUPS.forEach((g, i) => els.push(txt(v(-3.4 + i * 3.4, -2.6), g.label, "c", { small: true, bold: pick === i, tone: pick === i ? "a" : "muted", pick: i })));
    els.push(txt(v(-4.6, 2.1), " ", "c"), txt(v(4.6, -2.9), " ", "c"));
    return { els, readout: [pick >= 0 ? GROUPS[pick].detail.join(" ") : "Bir gruba tıkla ya da aşağıdan seç.", "Olumsuz kökte (“yolun parçası değildir”) dört doğruyu eleyip dışarıdakini seç."] };
  },
};

// 4 · Yin–yang ve iki Çin geleneği.
const CHINA = [
  { label: "Taoizm", detail: ["Tao (Yol), wu wei (zorlamadan eylem), yin–yang ile karşıtların tamamlayıcılığı, doğayla uyum.", "2026 AYT Sosyal Bilimler-2 39: yin–yang üç aday arasından Taoizmle ilişkilendirildi (A: yalnız I).", "Sembol tek başına kişinin Taoist olduğunu kanıtlamaz."] },
  { label: "Konfüçyanizm", detail: ["Ren (insanlık), li (uygun ritüel), xiao (evlada düşen saygı); aile ve erdemli yönetim.", "Konuşmalar (Lun Yu), Beş Klasik, Dört Kitap.", "“Çin kökenli” ortak; ayırıcı olan tören–eğitim–rol sorumluluğu paketi."] },
];
const yinyang: FigureDef = {
  caption:
    "Yin–yang iki karşıt ögenin birbirini içererek tamamladığını anlatır ve Taoizmle ilişkilendirilir. İki Çin geleneğinden birine tıkla: ayırıcı kavramlar açılır.",
  alt: "Yin–yang sembolü: daire içinde S eğrisiyle ayrılmış iki yarı ve her yarıda karşı renkten küçük nokta.",
  picks: CHINA.map((c) => ({ label: c.label, title: c.label, detail: c.detail })),
  draw: (_v, _s, pick = -1) => {
    const R = 1.5, h = R / 2;
    const dark: V[] = [...arc(v(0, 0), R, 90, -90, 30), ...arc(v(0, -h), h, -90, -270, 20).slice(1), ...arc(v(0, h), h, -90, 90, 20).slice(1)];
    const els: El[] = [circle(v(0, 0), R, { tone: "ink", bold: true }), poly(dark, { fill: "ink", tone: "ink" })];
    els.push(circle(v(0, h), 0.2, { fill: "ink", tone: "ink" }), circle(v(0, -h), 0.2, { tone: "ink", bold: true }));
    els.push(txt(v(2.2, 0.5), "Taoizm", "e", { small: true, bold: true, tone: pick === 0 ? "a" : "ink", pick: 0 }), txt(v(2.2, -0.5), "Konfüçyanizm", "e", { small: true, bold: true, tone: pick === 1 ? "a" : "ink", pick: 1 }));
    els.push(txt(v(-1.9, 1.9), " ", "c"), txt(v(5.4, -1.9), " ", "c"));
    return { els, readout: [pick >= 0 ? CHINA[pick].detail[0] : "Bir geleneğe tıkla ya da aşağıdan seç.", "Wu wei hiç çalışmamak değildir; doğal akışa zorlayıcı müdahale etmemektir."] };
  },
};

export const religionFiguresAsia: Record<string, Record<string, FigureDef>> = {
  "hint-ve-cin-dinleri": {
    "Dört geleneğin çerçevesi": four,
    "Karma": venn,
    "Sekiz Aşamalı Yol": wheel,
    "Yin-yang ve tamamlayıcılık": yinyang,
  },
};
