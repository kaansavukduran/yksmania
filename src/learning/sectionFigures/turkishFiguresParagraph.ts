import { poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Türkçe · Paragrafta konu. Bütün metinler özgündür (ÖSYM metni değildir).
 * Konu "ne hakkında?", ana düşünce "ne diyor?" sorusunu yanıtlar; seçenek her
 * önemli cümleye geri uygulanarak sınanır.
 */

const band = (x0: number, x1: number, y: number, h: number, tone: Tone): El =>
  poly([v(x0, y + h), v(x1, y + h), v(x1, y - h), v(x0, y - h)], { fill: tone, thin: true, tone });

// 1 · Kapsam ızgarası: konu adayı × cümle.
const SENTENCES = [
  { short: "gölge", text: "Kent bahçeleri yaz aylarında gölge alanı oluşturur." },
  { short: "yağmur", text: "Bahçelerdeki toprak, yağmurun bir bölümünün emilmesine yardımcı olur." },
  { short: "topluluk", text: "Komşular bu alanlarda bir araya gelip ortak etkinlikler de düzenleyebilir." },
];
type Cand = { name: string; marks: ("✓" | "—" | "~")[]; verdict: string; why: string[] };
const CANDS: Cand[] = [
  { name: "Bahçelerin işlevleri", marks: ["✓", "✓", "✓"], verdict: "uygun", why: ["Tam aday: “Kent bahçelerinin işlevleri”.", "Gölge, yağmur ve topluluk cümlelerinin üçü de bahçenin bir işlevini anlatır.", "Bütün önemli cümleleri kapsar, metinde olmayan alan eklemez."] },
  { name: "Bahçede yağmur", marks: ["—", "✓", "—"], verdict: "dar", why: ["Tam aday: “Kent bahçelerinde yağmur”.", "Yalnız ikinci cümleyi kapsar; bir alt konuyu bütün metin sanar.", "Kontrol: bu adı seçersen gölge ve topluluk cümleleri neden yazıldı?"] },
  { name: "Bütün kentler", marks: ["—", "—", "~"], verdict: "geniş", why: ["Tam aday: “Bütün kentlerde sosyal yaşam”.", "Üçüncü cümleye ancak kısmen değer; “bütün kentler” metinde yoktur.", "Gereksiz genelleme: desteklenenden geniş sonuç."] },
];

const coverage: FigureDef = {
  caption:
    "Özgün üç cümlelik metin: kent bahçeleri. Her konu adayını üç cümleye ayrı ayrı uygula. Bir adaya tıkla: hangi cümleyi kapsadığı ve neden elendiği açılır. Bu tablo bir kanıt karşılaştırmasıdır, saha verisi değildir.",
  alt: "Üç satır, üç sütunlu tablo. Kent bahçelerinin işlevleri gölge, yağmur ve topluluk cümlelerinin üçünü kapsıyor. Bahçede yağmur yalnız yağmur cümlesini kapsıyor. Bütün kentlerde sosyal yaşam yalnız topluluk cümlesine kısmen uyuyor (≈ işareti).",
  picks: CANDS.map((c) => ({ label: c.name, title: `${c.name}: ${c.verdict}`, detail: c.why })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    CANDS.forEach((c, i) => {
      const y = -i * 1.5;
      const sel = pick === i;
      if (sel) els.push(band(-0.2, 7.2, y - 0.28, 0.62, "a"));
      els.push(txt(v(0, y), c.name, "e", { bold: true, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(7.0, y), c.verdict, "w", { tone: c.verdict === "uygun" ? "c" : "warn" }));
      c.marks.forEach((m, j) => {
        const x = 0.3 + j * 2.3;
        const mark = m === "✓" ? "✓" : m === "~" ? "≈" : "—";
        els.push(txt(v(x, y - 0.6), `${mark} ${SENTENCES[j].short}`, "e", { small: true, tone: m === "✓" ? "c" : m === "~" ? "b" : "muted" }));
      });
    });
    els.push(txt(v(-0.4, 0.6), " ", "c"), txt(v(7.4, -4.0), " ", "c"));
    const sel = pick >= 0 ? CANDS[pick] : undefined;
    return {
      els,
      readout: [
        sel ? sel.why[1] : `Cümleler: 1) ${SENTENCES[0].text} 2) ${SENTENCES[1].text} 3) ${SENTENCES[2].text}`,
        "Konu: bütün önemli cümlelerin ne için yazıldığını açıklayan dar ve doğru ad öbeği.",
      ],
    };
  },
};

// 2 · Genişlik ekseni: çok genel ↔ uygun ↔ çok dar.
const WIDTH = [
  { label: "Doğa", x: 0, tone: "warn" as Tone, title: "Çok genel: “Doğa”", detail: ["Metin yalnız şehir ağaçlarının serinletici etkisini anlatıyorsa “doğa” bütün canlıları, iklimi, dağları da içine alır.", "Metinde işlenmeyen alanları ekler; seçenekte doğru sözcük var diye kapsam doğru olmaz."] },
  { label: "Şehir ağaçlarının serinletici etkisi", x: 4.2, tone: "c" as Tone, title: "Uygun: “Şehir ağaçlarının serinletici etkisi”", detail: ["Her cümle bu ilişkiye döner: ağaç, gölge, sıcaklık, kent.", "Ne bir ayrıntıya sıkışır ne metin dışına taşar.", "Ad öbeğidir; “ağaç dikilmelidir” gibi bir yargı ana düşünce olur, konu değil."] },
  { label: "Çınarın gölgesi", x: 8.4, tone: "warn" as Tone, title: "Çok dar: “Çınar ağacının gölgesi”", detail: ["Çınar metinde tek bir örnek olabilir.", "Örneği kaldır: kalan cümlelerin konusu hâlâ şehir ağaçlarıdır.", "Bir örneği metnin bütünüyle karıştırma."] },
];

const width: FigureDef = {
  caption:
    "Aynı özgün metin için üç konu adayı bir genişlik ekseninde. Bir adaya tıkla: neden çok genel, uygun ya da çok dar olduğu açılır. Bu sıralama yalnız o metinde gerçekten işlenen içerik için geçerlidir.",
  alt: "Yatay eksen solda geniş, sağda dar. Solda Doğa, ortada şehir ağaçlarının serinletici etkisi, sağda çınarın gölgesi. Ortadaki aday metnin kapsam bandının içinde.",
  picks: WIDTH.map((w) => ({ label: w.label, title: w.title, detail: w.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [
      vec(v(4.2, -1.3), v(-0.6, -1.3), { thin: true, tone: "muted" }),
      vec(v(4.2, -1.3), v(9.0, -1.3), { thin: true, tone: "muted" }),
      txt(v(-0.6, -1.75), "daha geniş", "e", { small: true, tone: "muted" }),
      txt(v(9.0, -1.75), "daha dar", "w", { small: true, tone: "muted" }),
      band(2.4, 6.0, 0.75, 0.3, "c"),
      txt(v(4.2, 1.4), "metnin kapsamı", "c", { small: true, tone: "c" }),
    ];
    WIDTH.forEach((w, i) => {
      const sel = pick === i;
      els.push(seg(v(w.x, -1.15), v(w.x, -1.45), { tone: w.tone }));
      const lines = i === 1 ? ["Şehir ağaçlarının", "serinletici etkisi"] : [w.label];
      lines.forEach((l, k) =>
        els.push(txt(v(w.x, -0.05 - k * 0.72), l, "c", { bold: sel, tone: sel ? "a" : w.tone, pick: k === 0 ? i : undefined })),
      );
    });
    els.push(txt(v(-1.2, 1.8), " ", "c"), txt(v(9.6, -2.2), " ", "c"));
    return {
      els,
      readout: [
        pick >= 0 ? WIDTH[pick].title : "Bir konu adayına tıkla ya da aşağıdan seç.",
        "Kontrol: aday, önemli cümlelerin çoğunu açıklıyor mu ve metne yeni alan ekliyor mu?",
      ],
    };
  },
};

// 3 · Olumsuz kök: önce kanıt, sonra seçim yönü.
const OPTS = [
  { k: "A", s: "Esnaf gelenlerin arttığını anlattı.", ev: "2. cümle", ok: true },
  { k: "B", s: "Her etkinlik bütün esnafa kesin gelir sağladı.", ev: "yok", ok: false },
  { k: "C", s: "Resmî ziyaretçi sayısı yayımlanmadı.", ev: "3. cümle", ok: true },
];

const negative: FigureDef = {
  caption:
    "Özgün metin: kullanılmayan pazar alanı hafta sonu gösterilere açılır; esnaf gelenlerin arttığını anlatır; resmî sayı ve kazanç ölçümü yoktur. Kök: “Hangisi kesin söylenemez?” Adımlarda önce her seçeneğe kanıt satırı yazılır, sonra olumsuz kök seçimi ters çevirir.",
  alt: "Üç seçenek satırı. A ve C için metinde kanıt cümlesi var, B için yok. Son adımda olumsuz kök nedeniyle kanıtsız B seçiliyor.",
  steps: ["Kökü işaretle", "Kanıt satırı", "Kanıtsızı seç"],
  draw: (_v, step) => {
    const els: El[] = [
      txt(v(0, 0.2), "Kök: Hangisi kesin söylenemez?", "e", { bold: true, tone: step >= 0 ? "warn" : "ink" }),
    ];
    // Long options wrap onto a second line so a phone-size font stays
    // inside the drawing.
    const wrap = (t: string) => {
      const out: string[] = [];
      for (const w of t.split(" ")) {
        const last = out[out.length - 1];
        if (last && (last + " " + w).length <= 30) out[out.length - 1] = last + " " + w;
        else out.push(w);
      }
      return out;
    };
    let y = -1.3;
    OPTS.forEach((o) => {
      const chosen = step === 2 && !o.ok;
      const lines = wrap(`${o.k}) ${o.s}`);
      const h = (lines.length - 1) * 0.62;
      if (chosen) els.push(band(-0.2, 9.4, y - h - 0.25, h + 0.55, "a"));
      lines.forEach((l, k) => els.push(txt(v(k ? 0.45 : 0, y - k * 0.62), l, "e", { bold: chosen, tone: chosen ? "a" : "ink" })));
      if (step >= 1) els.push(txt(v(0.5, y - h - 0.62), `kanıt: ${o.ev}`, "e", { small: true, tone: o.ok ? "c" : "warn" }));
      y -= h + 1.55;
    });
    els.push(txt(v(-0.4, 0.7), " ", "c"), txt(v(9.6, y + 0.6), " ", "c"));
    return {
      els,
      readout: [
        step === 0
          ? "“Söylenemez / değinilmemiştir / ulaşılamaz” kökünde aranan, metinde dayanağı olmayan seçenektir."
          : step === 1
            ? "A ve C metinde açıkça yazıyor. B’deki “her”, “bütün”, “kesin” sözleri metne dışarıdan eklenmiş."
            : "Yanıt B. Sık hata: metindeki olumsuz bilgiyi (C: yayımlanmadı) görüp onu seçmek.",
        "Nicelik sözlerini işaretle: bazı, bütün, her zaman, hiç.",
      ],
    };
  },
};

// 4 · Konu, sav ve örnek katmanları.
const LAYERS = [
  { label: "Konu", line: "Yaşlı ağaçların farklı değerleri", q: "Ne hakkında?", tone: "c" as Tone, detail: ["Soru: Metin ne hakkında?", "Ad öbeğidir; ilk iki cümlenin ekolojik ve kültürel rollerini kapsar.", "“Bir çınarın kaç yaşında olduğu” tek örneğe daralır."] },
  { label: "Ana düşünce", line: "Yalnız odun ölçüsüyle değerlendirilmemeli", q: "Ne diyor?", tone: "b" as Tone, detail: ["Soru: Yazar bu konuda ne savunuyor?", "Yargı cümlesidir: “yalnız odun miktarı” ölçütüne itiraz.", "“Bütün çınarlar kesilmelidir” söylenmeyen karşıt iddiadır."] },
  { label: "Örnek", line: "Meydandaki asırlık çınar", q: "Neyle destekliyor?", tone: "muted" as Tone, detail: ["Soru: Görüş hangi somut durumla gösteriliyor?", "Örnek görüşü taşır ama konunun kendisi değildir.", "Örneği kaldır: konu ve sav aynen kalıyorsa doğru ayırmışsın."] },
];

const layers: FigureDef = {
  caption:
    "Özgün metin: bir araştırmacı yaşlı ağaçların yalnız odun miktarına göre değerlendirilmesine itiraz eder, kuş barınağı, toprak koruma ve kent belleği değerlerini sayar, bir asırlık çınarı örnek verir. Bir katmana tıkla: hangi soruyu yanıtladığı açılır.",
  alt: "Üst üste üç katman: en üstte konu, ortada ana düşünce, en altta örnek. Her katmanın yanında yanıtladığı soru yazıyor.",
  picks: LAYERS.map((l) => ({ label: l.label, title: `${l.label}: ${l.line}`, detail: l.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    LAYERS.forEach((l, i) => {
      const y = -i * 1.6;
      const sel = pick === i;
      els.push(band(-0.2, 8.6, y - 0.28, 0.62, sel ? "a" : l.tone));
      els.push(txt(v(0, y), l.label, "e", { bold: true, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(8.4, y), l.q, "w", { small: true, tone: "muted" }));
      els.push(txt(v(0.3, y - 0.6), l.line, "e", { small: true }));
    });
    els.push(txt(v(-0.4, 0.6), " ", "c"), txt(v(8.8, -4.3), " ", "c"));
    return {
      els,
      readout: [
        pick >= 0 ? LAYERS[pick].detail[1] : "Konu, ana düşünce ve örnek üç ayrı sorunun yanıtıdır.",
        "Önce konuyu adlandır, sonra yazarın bu konudaki yargısını yaz; örneği konu sanma.",
      ],
    };
  },
};

export const turkishFiguresParagraph: Record<string, Record<string, FigureDef>> = {
  paragraf: {
    "Konu ne anlatıldığını, ana düşünce ne savunulduğunu söyler": layers,
    "Kapsamı daraltma, kesinliği büyütme": width,
    "Olumsuz soru kökünde seçme görevini tersine çevir": negative,
    "Savını hem kapsam hem kanıtla denetle": coverage,
  },
};
