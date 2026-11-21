import { seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { argFig, card, cardLines, CW, fitH, flowFig, frame, quadFig, tableFig, type Line } from "./turkishFigures060Kit";

/*
 * Forge060 TYT Felsefe · felsefe ile düşünme ve bilim felsefesi. Örnekler
 * bölüm metninden alınır; şemalar bir görüşü temsil eder, doğruluğunu ölçmez
 * ve taraf tutmaz. Ölçekli değildir.
 */

// felsefe-ile-dusunme · 1 · Argüman yapısı.
const argument = argFig({
  caption:
    "Argüman, sonucu desteklemek için kullanılan öncüllerle sonucun ilişkili yapısıdır. İleri ile önce öncülleri, sonra sonucu, en son iki ayrı denetimi aç. Örnek bölüm metnindendir. Kavram şeması, ölçekli değildir.",
  alt: "Yan yana iki öncül kartı: Bütün katılımcılar taslak verdi; Ece katılımcı. Oklar öyleyse işaretiyle sonuç kartında birleşir: Ece taslak verdi.",
  premises: ["Bütün katılımcılar taslak verdi.", "Ece katılımcı."],
  conclusion: "Öyleyse Ece taslak verdi.",
  marker: "öyleyse",
  steps: [
    { label: "Öncüller", note: "İlk iki yargı öncüldür; yalnız son cümleye argüman demek dayanak bölümünü görünmez kılar." },
    { label: "Sonuç", note: "“Öyleyse” sonucu işaretler; sonuç öncüllere dayanır." },
    { label: "Denetim", note: "İki ayrı denetim: öncüllerin sonuçla bağı ve öncüllerin doğruluğu. Ses, tasarım ya da ün bu ilişkinin yerini tutmaz." },
  ],
  foot: "Önce argümanı söyleyişten ayırıp açık yargılar hâlinde yaz.",
});

// felsefe-ile-dusunme · 2 · Geçerlilik × doğruluk.
const validity = quadFig({
  caption:
    "Geçerlilik ile doğruluk iki ayrı eksendir: biri öncül–sonuç bağını, öbürü öncüllerin içeriğini denetler. Bir hücreye tıkla: bölümdeki örnek ve kararın gerekçesi açılır. Sağlam tümdengelim için ikisi de gerekir.",
  alt: "İki satır iki sütunlu tablo. Satırlar geçerli ve geçersiz, sütunlar öncüller doğru ve öncül yanlış. Geçerli ve doğru öncüllü: sağlam. Geçerli ve yanlış öncüllü: penguen örneği, geçerli ama sağlam değil. Geçersiz ve doğru öncüllü: yağmur ve fıskiye örneği. Geçersiz ve yanlış öncüllü: iki denetimden de kalır.",
  cols: ["öncüller doğru", "bir öncül yanlış"],
  rows: ["geçerli", "geçersiz"],
  axis: ["öncüllerin içeriği (doğruluk)", "öncül–sonuç bağı (geçerlilik)"],
  cells: [
    { head: "sağlam", text: "zorunlu bağ ve doğru öncüller", tone: "c", detail: ["Sağlam bir tümdengelim için hem geçerli ilişki hem doğru öncüller gerekir.", "Kontrol: öncülleri doğru kabul etsem sonuç zorunlu mu, öncüller gerçekten doğru mu?"] },
    { head: "geçerli, sağlam değil", text: "penguen örneği", tone: "warn", detail: ["“Bütün kuşlar uçar. Penguen kuştur. Öyleyse penguen uçar.” geçerli biçimdedir; ilk öncül yanlıştır.", "Geçerli biçim yanlış öncülü doğruya dönüştürmez."] },
    { head: "geçersiz", text: "yağmur–fıskiye örneği", tone: "warn", detail: ["“Yağmur yağarsa zemin ıslanır. Zemin ıslaktır. Öyleyse yağmur yağmıştır.”: fıskiye karşı modeli sonucu zorunlu olmaktan çıkarır.", "Sonuç tesadüfen doğru olsa bile geçersiz yolla ulaşılmış olabilir."] },
    { head: "iki kusur", text: "ne zorunlu bağ ne doğru öncül", tone: "muted", detail: ["İki denetimden de kalır.", "Birini ötekinin yerine kullanmak ikna edici hataları gizler."] },
  ],
  foot: "Doğruluk önermenin içeriğine, geçerlilik öncül–sonuç ilişkisine yönelir.",
});

// felsefe-ile-dusunme · 3 · Karşı model.
const counterModel = tableFig({
  caption:
    "Karşı model: öncüllerin doğru, sonucun yanlış olduğu olası bir durum. Bir duruma tıkla: neden karşı model olduğu ya da olamadığı açılır. Gerçekte o gün fıskiyenin çalıştığını kanıtlamak gerekmez; öncülleri ihlal etmeyen olası durum yeterlidir.",
  alt: "Üç satırlı tablo. Öncüller: yağmur yağarsa zemin ıslanır, zemin ıslaktır; sonuç: yağmur yağmıştır. Fıskiye var, yağmur yok: öncüller doğru, sonuç yanlış, karşı model. Yağmur var, zemin kuru: ilk öncülü bozar, kullanılamaz. Yağmur var, zemin ıslak: karşı model değil.",
  cols: [
    { name: "Olası durum", w: 3.6 },
    { name: "Öncüller", w: 2.4 },
    { name: "Sonuç", w: 1.8 },
    { name: "Karar", w: 2.2 },
  ],
  rows: [
    { cells: ["fıskiye var, yağmur yok", "ikisi doğru", "yanlış", "karşı model"], tones: [undefined, "c", "warn", "c"], detail: ["Koşullu önerme ve ıslaklık doğru kalır, sonuç yanlış olur.", "Çıkarım verilen öncüllerden zorunlu değildir: geçersiz."] },
    { cells: ["yağmur var, zemin kuru", "ilki bozulur", "doğru", "kullanılamaz"], tones: [undefined, "warn", "c", "warn"], detail: ["Bu durum ilk öncülü ihlal eder.", "Karşı model hayalî olabilir ama verilen varsayımları bozmamalıdır."] },
    { cells: ["yağmur var, zemin ıslak", "ikisi doğru", "doğru", "karşı model değil"], tones: [undefined, "c", "c", "muted"], detail: ["Öncüller ve sonuç birlikte doğru: geçersizliği göstermez.", "Tek bir uyumlu durum geçerliliği de kanıtlamaz."] },
  ],
  foot: "Öncüller: “Yağmur yağarsa zemin ıslanır.” ve “Zemin ıslaktır.” Sonuç: “Yağmur yağmıştır.”",
});

// felsefe-ile-dusunme · 4 · Karşı örnek ve nicelik.
const counterExample = tableFig({
  caption:
    "İddianın niceliği karşı örneğin görevini belirler. Bir iddiaya tıkla: önerilen karşı örneğin iddiayı çürütüp çürütmediği açılır. Karşı örnek aynı sınıfa ve aynı ölçüte ait olmalıdır.",
  alt: "Üç satırlı tablo. Bütün kuşlar uçar ve uçamayan bir kuş: çürür. Bazı kuşlar uçar ve uçamayan bir kuş: çürümez. Bütün kuşlar uçar ve uçamayan bir balık: sınamaz.",
  cols: [
    { name: "İddia", w: 3.4 },
    { name: "Karşı örnek adayı", w: 3.6 },
    { name: "Sonuç", w: 3.0 },
  ],
  rows: [
    { cells: ["Bütün kuşlar uçar.", "uçamayan bir kuş", "çürür"], tones: [undefined, "ink", "c"], detail: ["“Bütün” istisna bırakmaz; tek açık karşı örnek yeterlidir.", "Sonra iddiayı daha dar ya da koşullu biçimde yeniden kur."] },
    { cells: ["Bazı kuşlar uçar.", "uçamayan bir kuş", "çürümez"], tones: [undefined, "ink", "warn"], detail: ["Bu yargı en az bir uçan kuşun varlığını söyler.", "Tek uçamayan kuş onu çürütmez."] },
    { cells: ["Bütün kuşlar uçar.", "uçamayan bir balık", "sınamaz"], tones: [undefined, "ink", "muted"], detail: ["Örnek kuş değildir; aynı sınıfa ait olmalıdır.", "“Uçmak” sözünü farklı anlamda kullanmak da konuyu değiştirir."] },
  ],
  foot: "Evrensel iddiada istisnayı ararken kapsamı sabit tut.",
});

// bilim-felsefesi · 1 · Değişkenler.
type VarBox = { lines: Line[]; tone: Tone; dash?: boolean };
const variablesDraw = (step: number) => {
  const els: El[] = [];
  const light: VarBox = { lines: cardLines(0, 4.3, "ışık süresi", "bağımsız: değiştirilen", "ink", "c"), tone: "c" };
  const water: VarBox = step >= 1
    ? { lines: cardLines(0, 4.3, "su miktarı", "o da değişti", "warn", "warn"), tone: "warn" }
    : { lines: cardLines(0, 4.3, "su miktarı", "sabit tutuldu", "muted", "muted"), tone: "muted", dash: true };
  const y1 = card(els, 0, 0, 4.3, light.lines, light.tone);
  const y2 = card(els, 0, y1 - 0.5, 4.3, water.lines, water.tone, { fill: !water.dash, dash: water.dash });
  const outLines = cardLines(5.7, CW, "fide boyu", "bağımlı: ölçülen", "ink", "b");
  const ry0 = (y1 + 0) / 2 + 0.6;
  const ry1 = card(els, 5.7, ry0, CW, outLines, "b");
  const ry = (ry0 + ry1) / 2;
  els.push(vec(v(4.36, y1 / 2), v(5.64, ry + 0.12), { tone: "ink" }));
  if (step >= 1) els.push(vec(v(4.36, (y1 - 0.5 + y2) / 2), v(5.64, ry - 0.12), { tone: "warn" }));
  const fixedText = step >= 1 ? "sabit: tür, başlangıç boyu, toprak" : "sabit: tür, başlangıç boyu, su, toprak";
  const yEnd = card(els, 0, y2 - 0.6, CW, cardLines(0, CW, undefined, fixedText, "ink", "muted"), "muted", { fill: false, dash: true });
  return { els, h: -yEnd + 0.1 };
};
const variablesH = Math.max(variablesDraw(0).h, variablesDraw(1).h);
const variables: FigureDef = {
  caption:
    "Bölümün fide deneyi: ışık süresi değiştirilir, fide boyu ölçülür, öbür etkenler sabit tutulur. İleri ile suyu da değiştir: boy farkı artık tek başına ışığa bağlanamaz. Kavram şeması, deney verisi değildir.",
  alt: "Solda ışık süresi kartı, ok sağdaki fide boyu kartına gider. Altta sabit tutulanlar: tür, başlangıç boyu, su, toprak. İkinci adımda su miktarı kartı da değişir ve ikinci bir ok fide boyuna gider.",
  maxHeight: fitH(variablesH),
  steps: ["Tek değişken", "İki değişken birden"],
  draw: (_v, step) => {
    const { els } = variablesDraw(step);
    els.push(...frame(variablesH));
    return {
      els,
      readout: [
        step === 0
          ? "Bağımsız değişken ışık süresi, bağımlı değişken fide boyu; diğer etkenleri aynı tutmak karşılaştırmayı güçlendirir."
          : "Işık ve su birlikte değişti: boy farkını tek başına ışığa bağlayamazsın. Kontrol grubu ya da çapraz karşılaştırma rakip açıklamaları ayırır.",
        "Hipotez: “Diğer koşullar aynıyken ışık süresi arttığında bu fideler daha fazla uzar.”",
      ],
    };
  },
};

// bilim-felsefesi · 2 · Birlikte değişme ve ortak koşul.
const correlationDraw = (step: number) => {
  const els: El[] = [];
  const topOn = step >= 1;
  const yTop = card(els, 2.6, 0, CW - 2.6, cardLines(2.6, CW - 2.6, "sıcaklık", topOn ? "ortak koşul" : "henüz düşünülmedi", topOn ? "ink" : "muted", topOn ? "a" : "muted"), topOn ? "a" : "muted", { fill: topOn, dash: !topOn });
  const yB = yTop - 1.4;
  const yL = card(els, 0, yB, 4.3, cardLines(0, 4.3, "dondurma satışı", "artar", "ink", "b"), "b");
  card(els, 5.7, yB, CW, cardLines(5.7, CW, "su tüketimi", "artar", "ink", "b"), "b");
  const my = (yB + yL) / 2;
  els.push(seg(v(4.36, my), v(5.64, my), { tone: "warn", dash: true }));
  els.push(txt(v(CW / 2, yL - 0.42), step >= 1 ? "birlikte değişme, neden değil" : "birlikte değişme", "c", { small: true, tone: "warn" }));
  if (topOn) {
    els.push(vec(v(3.6, yTop - 0.06), v(2.2, yB + 0.08), { tone: "a" }));
    els.push(vec(v(CW - 3.6, yTop - 0.06), v(CW - 2.2, yB + 0.08), { tone: "a" }));
  }
  return { els, h: -(yL - 0.42) + 0.5 };
};
const correlationH = correlationDraw(1).h;
const correlation: FigureDef = {
  caption:
    "Sıcak günlerde hem dondurma satışı hem su tüketimi artabilir (bölümün örneği). İleri ile ortak koşulu ekle: iki niceliği birlikte değiştiren üçüncü bir etken, birinin ötekini oluşturduğu sonucunu zayıflatır. Kavram şeması, veri değildir.",
  alt: "Altta dondurma satışı ve su tüketimi kartları, aralarında kesik çizgi: birlikte değişme. İkinci adımda üstte sıcaklık kartı belirir ve iki karta ok gönderir: ortak koşul.",
  maxHeight: fitH(correlationH),
  steps: ["Gözlem", "Ortak koşul"],
  draw: (_v, step) => {
    const { els } = correlationDraw(step);
    els.push(...frame(correlationH));
    return {
      els,
      readout: [
        step === 0
          ? "İki özellik birlikte görülüyor; ilişki tek başına nedenin yönünü ya da başka etkenlerin yokluğunu kanıtlamaz."
          : "Ortak koşul sıcaklık iki niceliği birlikte etkileyebilir; doğrudan neden sonucundan önce bunu düşün.",
        "Nedensel iddia için zaman sırası, alternatif açıklamalar ve uygun araştırma düzeni birlikte değerlendirilir.",
      ],
    };
  },
};

// bilim-felsefesi · 3 · Sınama ölçütleri.
const criteria = tableFig({
  caption:
    "Bilim felsefesinde üç ayrı odak: doğrulanabilirlik, yanlışlanabilirlik ve paradigma. Bir yaklaşıma tıkla: sorduğu soru ve sık yapılan karıştırma açılır. Bir ölçütü tanımak, onun her itirazı çözdüğünü iddia etmek değildir.",
  alt: "Üç satırlı tablo. Doğrulanabilirlik, mantıkçı pozitivizm: hangi gözlem koşulunda doğrulanır? Yanlışlanabilirlik, Popper: hangi olası bulguyla uyuşmaz? Paradigma, Kuhn: topluluğun problem çözme çerçevesi nedir?",
  cols: [
    { name: "Yaklaşım", w: 3.6 },
    { name: "İlişkili ad", w: 2.6 },
    { name: "Sorduğu", w: 3.8 },
  ],
  rows: [
    { cells: ["doğrulanabilirlik", "mantıkçı pozitivizm", "hangi gözlemle doğrulanır?"], tones: [undefined, "muted", "c"], detail: ["Anlamlı olgusal önermenin deneyimle nasıl ilişkilendirileceği öne çıkar.", "Doğrulama ilkesinin kendisi ve evrensel önermelerin sonlu gözlemle durumu tartışmalıdır."] },
    { cells: ["yanlışlanabilirlik", "Popper", "hangi bulguyla uyuşmaz?"], tones: [undefined, "muted", "b"], detail: ["Bir iddianın hangi olası bulguyla uyuşmayacağı gösterilebilmelidir.", "Yanlışlanabilir olmak savın zaten yanlış olduğu anlamına gelmez."] },
    { cells: ["paradigma", "Kuhn", "topluluğun çerçevesi ne?"], tones: [undefined, "muted", "a"], detail: ["Olağan bilimde kabul edilen çerçevede bilmeceler çözülür; aykırılık ve kriz değişim tartışması doğurur.", "Paradigma, her araştırmacının istediğine inanabileceği anlamına gelmez."] },
  ],
  foot: "Popper ve Kuhn’u birbirine indirgeme: birinde sınama ölçütü, öbüründe bilimsel pratiğin tarihi vurgulanır.",
});

// bilim-felsefesi · 4 · Kuhn: olağan bilimden değişime.
const kuhn = flowFig({
  caption:
    "Kuhn’un bilimsel değişme anlatısı: paylaşılan çerçeve, olağan bilim, aykırılık, kriz ve değişim tartışması. İleri ile aşamaları aç. Bilim tarihindeki değişimler yalnız yeni veri eklenmesi değildir. Kavram şeması, ölçekli değildir.",
  alt: "Dört kart alt alta, oklarla bağlı: paradigma, paylaşılan problem çözme çerçevesi; olağan bilim, çerçevede bilmece çözme; önemli aykırılıklar ve kriz; bilimsel değişim tartışması.",
  nodes: [
    { head: "Paradigma", text: "topluluğun paylaştığı problem çözme çerçevesi", tone: "c", note: "Topluluk, yöntem, örnek problem ve değerlendirme ölçütleri birlikte düşünülür." },
    { head: "Olağan bilim", text: "kabul edilen çerçevede bilmece çözme", tone: "b", note: "Araştırmacılar kabul edilen çerçevede bilmeceler çözer." },
    { head: "Aykırılık ve kriz", text: "çerçeveye uymayan önemli sonuçlar", tone: "warn", note: "Önemli aykırılıklar ve krizler bilimsel değişim tartışmalarına yol açabilir." },
    { head: "Bilimsel değişim", text: "yeni çerçeve tartışması", tone: "a", note: "Değişim yalnız yeni bir veri eklenmesi değildir; çerçevenin kendisi tartışılır." },
  ],
  steps: ["Paradigma", "Olağan bilim", "Aykırılık ve kriz", "Değişim"],
  reveal: true,
  foot: "Hangi metinde sınama ölçütünün, hangisinde bilimsel pratiğin tarihinin vurgulandığını oku.",
});

export const philosophyFigures060Logic: Record<string, Record<string, FigureDef>> = {
  "felsefe-ile-dusunme": {
    "Argüman öncül ve sonuç ilişkisidir": argument,
    "Geçerlilik ile doğruluğu ayır": validity,
    "Karşı model geçersizliği gösterir": counterModel,
    "Karşı örnek ve niceliğin kapsamı": counterExample,
  },
  "bilim-felsefesi": {
    "Değişkenleri bir örnekte ayır": variables,
    "Birlikte değişme ile nedeni ayır": correlation,
    "Yanlışlanabilirlik ve riskli sınama": criteria,
    "Bilimsel değişmeyi paradigma ile oku": kuhn,
  },
};
