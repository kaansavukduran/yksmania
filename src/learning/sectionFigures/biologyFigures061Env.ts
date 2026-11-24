import { type El, type FigureDef } from "./figureKit";
import { L, mk, tableFig, T } from "./biologyFigures060Kit";
import { bars, graph, tr } from "./biologyFigures061Kit";

/*
 * AYT Biyoloji · Canlılar ve çevre (Forge061). Tepki normu çizgileri nitel
 * öğretim şemasıdır, ölçekli değildir; katsayıları kuramsaldır ve gerçek bir
 * türü temsil etmez. Sayılar bölüm metnindeki örnekten gelir: dirençli 100 →
 * 80, duyarlı 900 → 90, pay %10 → 80/170. Tedavi önerisi değildir.
 */

const STAGE = [
  { name: "Önce", r: 100, s: 900 },
  { name: "Sonra", r: 80, s: 90 },
];
const freq = mk({
  caption:
    "Sayı ile sıklığı ayrı tut (bölümdeki örnek): dirençliler 100'den 80'e, duyarlılar 900'den 90'a düşer. Dirençlilerin sayısı azalmıştır ama payları %10'dan 80/170 ≈ %47,1'e yükselmiştir. Oran artışı tek başına çoğalmanın kanıtı değildir.",
  alt: "İki yatay çubuk: dirençli ve duyarlı birey sayısı; üçüncü çubuk dirençli payı yüzde olarak. İki adım: önce ve sonra.",
  h: 180,
  steps: STAGE.map((s) => s.name),
  draw: (_v, step) => {
    const s = STAGE[step];
    const p = (100 * s.r) / (s.r + s.s);
    const b = bars(
      [
        { label: "Dirençli", value: s.r, tone: "a" },
        { label: "Duyarlı", value: s.s, tone: "muted" },
        { label: "Dirençli payı", value: p * 9, text: `%${tr(p)}`, tone: "b" },
      ],
      { max: 900 },
    );
    return { els: b.els, readout: [`Pay = ${s.r} / (${s.r} + ${s.s}) = ${s.r}/${s.r + s.s} ≈ %${tr(p)}.`, step === 1 ? "Dirençli sayısı 100 → 80 azaldı; payı arttı." : "Başlangıç: 1000 bireyin 100'ü dirençli."] };
  },
});

const norm = mk({
  caption:
    "Genotip ile çevre etkileşimi (nitel tepki normu, ölçekli değil; katsayılar kuramsal): iki genotip sıcaklığa aynı eğimle yanıt vermek zorunda değildir. A ve B çizgilerinin kesişmesi, bir ortamda önde olan hattın başka ortamda geride kalabileceğini gösterir.",
  alt: "Yatay eksen çevre (sıcaklık), düşey eksen fenotip. A çizgisi yavaş, B çizgisi hızlı yükseliyor ve ortada kesişiyorlar; soldaki ortamda A önde, sağdakinde B önde.",
  h: 280,
  draw: () => {
    const g = graph({ x0: 100, yb: 230, w: 380, h: 190, xmax: 10, ymax: 10, xl: "sıcaklık", yl: "fenotip" });
    const a = (x: number) => 4 + 0.2 * x;
    const b = (x: number) => 1.5 + 0.7 * x;
    const els: El[] = [...g.els, L(g.X(0), g.Y(a(0)), g.X(10), g.Y(a(10)), { tone: "a", bold: true }), L(g.X(0), g.Y(b(0)), g.X(10), g.Y(b(10)), { tone: "b", bold: true })];
    els.push(T(g.X(10) - 4, g.Y(a(10)) + 22, "A", "w", { tone: "a", bold: true }), T(g.X(10) - 4, g.Y(b(10)) - 4, "B", "w", { tone: "b", bold: true }));
    els.push(T(g.X(1.2), 256, "ortam 1: A önde", "c", { tone: "a" }), T(g.X(8.6), 256, "ortam 2: B önde", "c", { tone: "b" }));
    return { els, readout: ["Bir hattın her koşulda en iyi olduğu sonucu tek ortamdan çıkmaz.", "Aynı genotipin farklı çevrelerdeki fenotip aralığı tepki normudur."] };
  },
});

const sources = tableFig({
  caption:
    "Yeni alel ile yeni birleşim (bölüm metninden): mutasyon yeni alellerin temel kaynağıdır; krossing over ve kromozomların dağılımı mevcut alellerin yeni birleşimlerini, döllenme iki gametin katkısını bir araya getirir. Üç süreç aynı işi yapmaz.",
  alt: "Dört satırlı tablo: mutasyon yeni alel; krossing over mevcut alellerin yeni birleşimi; kromozom dağılımı yeni birleşim; döllenme iki gametin katkısını birleştirir.",
  headers: ["Süreç", "Ne oluşturur?"],
  rows: [
    ["Mutasyon", "yeni alel"],
    ["Krossing over", "mevcut alellerin\nyeni birleşimi"],
    ["Kromozom dağılımı", "yeni birleşim"],
    ["Döllenme", "iki gametin\nkatkısını birleştirir"],
  ],
  readout: ["Krossing overın varlığı tek başına yeni DNA aleli oluştuğunu kanıtlamaz.", "Hangi ölçekte değişiklik olduğunu soruda belirle."],
});

const lineage = tableFig({
  caption:
    "Hangi hücre soyu aktarır? (bölüm metninden): insan deri hücresindeki mutasyon o hücrenin mitoz soyuna geçer ama eşeyli üremede yavruya geçmez; gametteki mutasyon döllenmeye katılırsa yavruya geçebilir; bitki sürgünündeki mutant soy çelikle yeni bireye katılabilir.",
  alt: "Üç satırlı tablo: insan deri hücresi mitoz soyuna geçer, eşeyli üremede yavruya geçmez; gamet döllenmeye katılırsa yavruya geçer; bitki sürgünü çelikle yeni bireye geçebilir.",
  headers: ["Mutant hücre", "Nereye geçebilir?"],
  rows: [
    ["İnsan deri\nhücresi", "mitoz soyuna;\nyavruya geçmez"],
    ["Gamet", "döllenmeyle\nyavruya"],
    ["Bitki sürgünü", "çelikle\nyeni bireye"],
  ],
  readout: ["Somatik mutasyonun hiçbir üreme yoluyla aktarılamayacağı genellemesi yanlıştır.", "Hücre tipi kadar üreme yolu da belirtilmelidir."],
});

const mechanisms = tableFig({
  caption:
    "Gen aktarımı seçilimden farklıdır (bölüm metninden): mutasyon yeni dizi değişimi, aktarım mevcut genin başka hücreye geçmesi, seçilim farklı üreme katkısıdır. Gerçek popülasyonlarda birlikte bulunabilirler; modelde hangisinin açık olduğu ayrıca söylenir.",
  alt: "Üç satırlı tablo: mutasyon yeni dizi değişimi; gen aktarımı, örneğin plazmitle, mevcut genin başka hücreye geçmesi; seçilim direnç taşıyanların daha çok üremesi.",
  headers: ["Mekanizma", "Ne değişir?"],
  rows: [
    ["Mutasyon", "yeni dizi değişimi"],
    ["Gen aktarımı\n(plazmit)", "mevcut gen başka\nhücreye geçer"],
    ["Seçilim", "taşıyanlar daha\nçok ürer"],
  ],
  readout: ["Aktarım bir direnç genini yayabilir; seçilim taşıyanların payını değiştirir.", "Sınıf modelindeki maruziyet değeri tedavi önerisi değildir."],
});

const scale = tableFig({
  caption:
    "Kanıtı doğru ölçekte kur (bölüm metninden): aynı genotipin farklı ortamları çevre yanıtını, aynı ortamın farklı genotipleri kalıtsal farkı, kuşaklar arası üreme katkıları seçilimi araştırır. Yeterli tekrar ve rastgele örnekleme sonucu güçlendirir.",
  alt: "Üç satırlı tablo: aynı genotip, farklı çevre çevre yanıtını; aynı çevre, farklı genotip kalıtsal farkı; kuşaklar arası üreme katkısı seçilimi araştırır.",
  headers: ["Düzen", "Araştırdığı"],
  rows: [
    ["Aynı genotip,\nfarklı çevre", "çevre yanıtı"],
    ["Aynı çevre,\nfarklı genotip", "kalıtsal fark"],
    ["Kuşaklar arası\nüreme katkısı", "seçilim"],
  ],
  readout: ["Bir fenotip değişimi tek başına mutasyon ya da adaptasyon kanıtı değildir.", "Kaynak, zaman, hücre soyu, sayı ve payda bilgisini birlikte kullan."],
});

export const biologyFigures061Env: Record<string, Record<string, FigureDef>> = {
  "canlilar-ve-cevre": {
    "Genotip ile çevre etkileşimi": norm,
    "Yeni alel ile yeni birleşim": sources,
    "Hangi hücre soyu aktarır?": lineage,
    "Sayı ile sıklığı ayrı tutmak": freq,
    "Gen aktarımı seçilimden farklıdır": mechanisms,
    "Kanıtı doğru ölçekte kurmak": scale,
  },
};
