import { seg, txt, v, vec, type El, type FigureDef } from "./figureKit";
import { flowFig, tableFig } from "./turkishFigures060Kit";
import { chains, drawFig, unitDot } from "./biologyFigures062Kit";

/*
 * Forge062 TYT Biyoloji · Omurgasızlar ve mantarlar. Grup adları, örnek
 * canlılar ve yapı adları yalnız ilgili bölüm metninden alınır. Tablolar ve
 * ağaçlar kavram şemasıdır, ölçekli değildir; dış sindirim çizimindeki
 * noktalar atom değil yapı birimidir.
 */

/* ---------------- Omurgasızlar ---------------- */

// 0 · Hayvan → omurgasız → alt grup katmanları.
const layers = flowFig({
  caption:
    "Karşılaştırmada üç katmanı ayrı oku: hayvan ortak planı, omurgasız etiketi ve tek bir alt grup. İleri ile katmanları aç; geniş ortaklığı dar tanı yerine kullanma. Kavram şeması, ölçekli değil.",
  alt: "Üç kart alt alta: hayvan ortak planı ökaryot, çok hücreli, hücre duvarsız, heterotrof; omurgasız, omurga yok ama iskelet yokluğu değil; alt grup örneği, eklembacaklıda kitin dış iskelet, derisidikenlide kireçli iç iskelet.",
  nodes: [
    { head: "Hayvan ortak planı", text: "ökaryot hücre, çok hücreli düzen, hücre duvarı yok, heterotrof", tone: "b", note: "Mantardan ayırırken yalnız heterotrofluğa bakmak yetmez; mantarda hücre duvarı vardır." },
    { head: "Omurgasız", text: "omurga bulunmaz; tek bir akrabalık dalının adı değildir", tone: "c", note: "Omurga yokluğu iskelet yokluğu demek değildir; yer değiştirme, tek simetri ya da açık dolaşım da bütün örneklerin ortak özelliği değildir." },
    { head: "Alt grup", text: "eklembacaklıda kitin dış iskelet, derisidikenlide kireçli iç iskelet", tone: "a", note: "Sünger gibi erginleri zemine bağlı hayvanlar da bulunur; bir alt grubun özelliğini bütün omurgasızlara yayma." },
  ],
  steps: ["Hayvan", "Omurgasız", "Alt grup"],
  reveal: true,
  foot: "Soruda hangi katmanın istendiğini önce yaz.",
});

// 3 · Solucanların üç vücut planı.
const worms = tableFig({
  caption:
    "Yassı, yuvarlak ve halkalı solucanlar farklı vücut planlarıdır. Bir örneğe tıkla: sindirim düzeni ve ayırıcı özellik açılır. Gövde benzerliği tek başına aynı plana koymaz.",
  alt: "Beş satırlı tablo. Planarya: yassı, tek açıklıklı sindirim boşluğu. Tenya: yassı, parazit, sindirim sistemi yok. Bağırsak solucanı: yuvarlak, ağız ve anüs ayrı. Toprak solucanı: halkalı, segmentli gövde, kapalı dolaşım. Sülük: halkalı.",
  cols: [
    { name: "Örnek", w: 3.3 },
    { name: "Plan", w: 2.2 },
    { name: "Sindirim", w: 4.5 },
  ],
  rows: [
    { cells: ["Planarya", "yassı", "tek açıklıklı sindirim boşluğu"], tones: [undefined, "b", "muted"], detail: ["Planaryada tek açıklıklı sindirim boşluğu bulunur."] },
    { cells: ["Tenya", "yassı", "parazit; sindirim sistemi yok"], tones: [undefined, "b", "muted"], detail: ["Tenya gibi parazitlerde sindirim sistemi yoktur."] },
    { cells: ["Bağırsak solucanı", "yuvarlak", "ağız ve anüs ayrı kanal"], tones: [undefined, "c", "muted"], detail: ["Yuvarlak solucanlarda ağız ve anüsün ayrı olduğu bir sindirim kanalı bulunur."] },
    { cells: ["Toprak solucanı", "halkalı", "ağız ve anüs ayrı; segmentli gövde"], tones: [undefined, "a", "muted"], detail: ["Halkalı solucanların segmentli gövdesi ve kapalı dolaşımı önemlidir."] },
    { cells: ["Sülük", "halkalı", "ağız ve anüs ayrı kanal"], tones: [undefined, "a", "muted"], detail: ["Serbest yaşayan ve parazit türler aynı beslenme ya da boşaltım kalıbına zorlanmaz."] },
  ],
  foot: "Hermafroditlik kendini döllemeyi ya da eşeysizliği zorunlu kılmaz.",
});

// 4 · Yumuşakça örnekleri.
const molluscs = tableFig({
  caption:
    "Yumuşakçaların ortak planı manto, iç organ kitlesi ve kaslı ayaktır; örnekler beslenme, dolaşım ve gaz alışverişinde ayrışır. Bir örneğe tıkla. Sınıflama sırf kabuk görünüşüne indirgenmez.",
  alt: "Üç satırlı tablo. Midye: süzerek beslenme, açık dolaşım, suda solungaç. Salyangoz: karasal salyangozda özelleşmiş manto boşluğu gaz alışverişine katılabilir, açık dolaşım. Ahtapot ve kalamar: avcı, kafadanbacaklı, kapalı dolaşım, ayak kollar yönünde özelleşmiş.",
  cols: [
    { name: "Örnek", w: 2.8 },
    { name: "Beslenme ya da ayak", w: 3.6 },
    { name: "Dolaşım", w: 3.6 },
  ],
  rows: [
    { cells: ["Midye", "süzerek beslenme", "çoğu yumuşakça gibi açık"], tones: [undefined, "c", "b"], detail: ["Midyenin süzerek beslenmesi ile ahtapotun avcılığı aynı beslenme biçimi değildir.", "Suda solungaç gaz alışverişine katılabilir."] },
    { cells: ["Salyangoz", "karasal türde özelleşmiş manto boşluğu", "çoğu yumuşakça gibi açık"], tones: [undefined, "c", "b"], detail: ["Karasal salyangozda özelleşmiş manto boşluğu gaz alışverişine katılabilir."] },
    { cells: ["Ahtapot, kalamar", "avcı; ayak kollar yönünde özelleşmiş", "kafadanbacaklıda kapalı"], tones: [undefined, "c", "a"], detail: ["Çoğu yumuşakçada açık dolaşım görülürken kafadanbacaklı ahtapot ve kalamarda kapalı dolaşım bulunur."] },
  ],
  foot: "Manto kabuk oluşturabilen dokudur; her yumuşakçanın belirgin dış kabuğu olması gerekmez.",
});

// 6 · Böcek ve öteki eklembacaklılar.
const insects = tableFig({
  caption:
    "Üst grup ve alt grup kanıtını ayır: kitin dış iskelet eklembacaklıyı, göğüste üç çift bacak böceği ayırır. Bir gruba tıkla. Trake gördüm, kesin böcektir kısa yolu geçersizdir.",
  alt: "Dört satırlı tablo. Böcek: baş, göğüs, karın; göğüste üç çift bacak; bir çift anten. Örümceğimsi: genellikle dört çift yürüme bacağı; anten yok. Kabuklu: iki çift anten. Çok ayaklı: çok segmentli gövde.",
  cols: [
    { name: "Grup", w: 3.0 },
    { name: "Ayırıcı kanıt", w: 7.0 },
  ],
  rows: [
    { cells: ["Böcek", "baş, göğüs, karın; göğüste üç çift bacak; bir çift anten tipik"], tones: [undefined, "a"], detail: ["Bir çift anten tipiktir fakat anten yalnız böceğe özgü değildir; trake de yalnız böcekte bulunmaz."] },
    { cells: ["Örümceğimsi", "genellikle dört çift yürüme bacağı; anten yok"], tones: [undefined, "b"], detail: ["Örümceğimsilerde kitapsı akciğer ve/veya trake görülebilir; trake tek başına böcek kanıtı değildir."] },
    { cells: ["Kabuklu", "iki çift anten"], tones: [undefined, "c"], detail: ["Kabuklularda solungaç görülebilir; iki çift anten ayırmada yararlıdır."] },
    { cells: ["Çok ayaklı", "çok segmentli gövde"], tones: [undefined, "c"], detail: ["Bazı çok ayaklılar da trake taşıyabilir; çok segmentli gövde ayırmada yararlıdır."] },
  ],
  foot: "İki bağımsız kanıtı birleştir; tipik olmak yalnız o grupta bulunmak demek değildir.",
});

// 8 · Dolaşım: sistem yok, açık, kapalı.
const circulation = tableFig({
  caption:
    "Özel dolaşım sistemi olmayan sünger ve sölenteri açık ya da kapalı kutusuna zorlama. Bir gruba tıkla: dolaşım düzeni ve bölümdeki solunum örneği açılır. Tümünde ortak sorusunu en farklı örnekle sına.",
  alt: "Beş satırlı tablo. Sünger ve sölenter: özel dolaşım sistemi yok. Halkalı solucan: kapalı. Kafadanbacaklı yumuşakça: kapalı. Çoğu yumuşakça: açık. Eklembacaklı: açık; trake, kitapsı akciğer ya da solungaç.",
  cols: [
    { name: "Grup", w: 3.4 },
    { name: "Dolaşım", w: 2.8 },
    { name: "Bölümdeki not", w: 3.8 },
  ],
  rows: [
    { cells: ["Sünger, sölenter", "özel sistem yok", "iki kutuya da yerleşmez"], tones: [undefined, "muted", "muted"], detail: ["Özel dolaşım sistemi olmayan sünger ve sölenteri bu iki sistemden birine zorla yerleştirme."] },
    { cells: ["Halkalı solucan", "kapalı", "sıvı damar içinde kalır"], tones: [undefined, "a", "muted"], detail: ["Kapalı dolaşımda dolaşım sıvısı damarlar içinde kalır."] },
    { cells: ["Kafadanbacaklı", "kapalı", "ahtapot ve kalamar"], tones: [undefined, "a", "muted"], detail: ["Çoğu yumuşakçanın açık oluşu bütün gruba yayılmaz."] },
    { cells: ["Çoğu yumuşakça", "açık", "sıvı boşluklara çıkabilir"], tones: [undefined, "b", "muted"], detail: ["Açık dolaşımda dolaşım sıvısı damar dışı boşluklara çıkabilir."] },
    { cells: ["Eklembacaklı", "açık", "trake, kitapsı akciğer, solungaç"], tones: [undefined, "b", "muted"], detail: ["Solunumda vücut yüzeyi, solungaç, trake ve kitapsı akciğer farklı örneklerdir."] },
  ],
  foot: "Sistem farkı bir canlıyı değer bakımından üstün ya da aşağı yapmaz.",
});

/* ---------------- Mantarlar ---------------- */

// 1 · Dış sindirim ve emilim: iki üçlü zincir, altı birim.
const MEM = 6.85;
const outside: FigureDef = drawFig({
  caption:
    "Bölümdeki model: iki üçlü zincir, toplam altı birim. İleri ile dış enzimin bağları hücre dışında koparmasını, sonra küçük ürünlerin zardan alınmasını izle. Molekül sayısı değişir, birim sayısı korunur. Noktalar yapı birimidir; ölçekli değil.",
  alt: "Solda hücre dışı, sağda mantar hücresi; arada düşey zar çizgisi. Başlangıçta solda üç noktalı iki zincir. İkinci adımda solda altı ayrı nokta. Üçüncü adımda altı nokta zarın sağında, hücre içinde.",
  h: 3.3,
  steps: ["Büyük molekül", "Dış enzim", "Emilim"],
  draw: (_v, step) => {
    const els: El[] = [];
    els.push(txt(v(0, 0), "hücre dışı", "e", { small: true, bold: true, tone: "muted" }));
    els.push(txt(v(MEM + 0.15, 0), "hücre içi", "e", { small: true, bold: true, tone: "muted" }));
    els.push(seg(v(MEM, -0.4), v(MEM, -2.55), { tone: "c", bold: true }));
    els.push(txt(v(MEM, -2.75), "zar", "s", { small: true, tone: "c" }));
    if (step === 0) {
      chains(els, -1.0, [3], { x0: 1.0 });
      chains(els, -1.9, [3], { x0: 1.0 });
    } else if (step === 1) {
      [0.7, 1.7, 2.7, 3.7, 4.7, 5.7].forEach((x, i) => els.push(unitDot(x, i % 2 ? -1.8 : -1.1, "a", true)));
    } else {
      [7.6, 8.4, 9.2].forEach((x) => els.push(unitDot(x, -1.1, "a", true), unitDot(x, -1.8, "a", true)));
      els.push(vec(v(4.8, -2.3), v(7.4, -2.3), { tone: "a", thin: true }));
    }
    const read = [
      "Başlangıç: 2 büyük molekül, toplam 6 birim; bu büyüklükte zardan aynı biçimde geçmez.",
      "Dış enzim bağları hücre dışında koparır: 6 küçük molekül, toplam yine 6 birim.",
      "Küçük ürünler zar üzerinden alınır: hücre içinde 6 birim. Dış sindirim ile emilim ayrı basamaktır.",
    ];
    return { els, readout: [read[step], "Modelde gerçek sindirim hızı ya da ATP bilançosu ölçülmez; enzimin dışarıda çalışması orada kendiliğinden oluştuğu anlamına gelmez."] };
  },
});

// 2 · Hif, miselyum, üreme gövdesi, maya.
const hyphae = tableFig({
  caption:
    "Mantarın görünen kısmı ile yüzey altındaki ağını ayır. Bir yapıya tıkla: bölümdeki tanım ve yaygın yanlış açılır. Kavram tablosu, ölçekli değil.",
  alt: "Dört satırlı tablo. Hif: ipliksi mantar yapısı. Miselyum: dallanan hiflerin kurduğu ağ; substrata yayılma ve yüzey alanı. Şapka: çoğu zaman spor üretimine katılan üreme gövdesi. Maya: tek hücreli; tipik geniş hif ağı zorunlu değil.",
  cols: [
    { name: "Yapı", w: 2.7 },
    { name: "Bölümdeki tanım", w: 7.3 },
  ],
  rows: [
    { cells: ["Hif", "ipliksi mantar yapısı; bazılarında bölme, bazılarında çok çekirdekli sürekli sitoplazma"], tones: [undefined, "b"], detail: ["Hifler gerçek bitki kökü değildir; işlev benzerliği aynı organ kökenini göstermez."] },
    { cells: ["Miselyum", "dallanan hiflerin kurduğu ağ; substrata yayılma, yüzey alanı, besine erişim"], tones: [undefined, "b"], detail: ["Yüzey altındaki miselyumu yok sayarsan organizmanın yayılımını yanlış yorumlarsın."] },
    { cells: ["Şapka", "çoğu zaman spor üretimine katılan üreme gövdesi"], tones: [undefined, "a"], detail: ["Mantarın tümünü yalnız şapka oluşturmaz."] },
    { cells: ["Maya", "tek hücreli örnek; tipik geniş hif ağı zorunlu değil"], tones: [undefined, "c"], detail: ["Bazı mayalar belirli koşullarda uzamış ya da ipliksi düzen kurabilir; istisnayı yeni bir mutlak kurala çevirme."] },
  ],
  foot: "Çok hücrelilik, şapka ya da toprakta yaşama bütün mantarlara ortak değildir.",
});

// 4 · Mikoriza: iki yönlü madde akışı.
const mycorrhiza = flowFig({
  caption:
    "Mikorizada iki tarafın kazancını ayrı oklarla izle: mantardan bitkiye su ve mineral, bitkiden mantara organik karbon. İleri ile her yönü aç. Su ve organik karbonu iki yöne aynı madde diye yazma. Şema, ölçekli değil.",
  alt: "Üç kart alt alta: mantarın geniş hif ağı; mantardan bitkiye su ve mineral alımına katkı; bitkiden mantara organik karbon. Her iki taraf için yarar gösterilirse karşılıklı yarar.",
  nodes: [
    { head: "Mantar hif ağı ve bitki kökü", text: "bazı mantarlar bitki kökleriyle ilişki kurar", tone: "muted", note: "Kök çevresinde mantar bulunması tek başına mikoriza ya da yarar kanıtı değildir." },
    { head: "Mantar → bitki", text: "su ve mineral alımına katkı", tone: "b", note: "Mantarın geniş hif ağı bitkinin su ve mineral alımına katkı sağlayabilir." },
    { head: "Bitki → mantar", text: "organik karbon", tone: "c", note: "Bitki mantara organik karbon verir; mantar organik besin, bitki mineral alır." },
    { head: "Sonuç", text: "iki taraf için yarar gösterilmişse karşılıklı yarar", tone: "a", note: "Mantarlı ve mantarsız bitkiler aynı toprak ve ışıkta karşılaştırılır; bitki zarar görüyorsa sonuç yeniden değerlendirilir." },
  ],
  steps: ["Taraflar", "Mantardan", "Bitkiden", "Sonuç"],
  reveal: true,
  foot: "Karşılıklı yarar her iki yön ayrı ölçülünce kurulur.",
});

// 5 · Liken ve mikoriza karşılaştırması.
const lichen = tableFig({
  caption:
    "Liken bir yaşam birliğidir: mantar ile fotosentetik ortak birlikte yaşar. Mikorizada bitki kökü, likende fotosentetik ortak farkını kullan. Bir ortaklığa tıkla.",
  alt: "İki satırlı tablo. Liken: ortaklar mantar ile alg ya da siyanobakteri; fotosentetik ortak organik madde, mantar su, mineral ve korunma koşulları. Mikoriza: ortaklar mantar ile bitki kökü; mantar su ve mineral, bitki organik karbon.",
  cols: [
    { name: "Birlik", w: 2.4 },
    { name: "Ortaklar", w: 3.6 },
    { name: "Karşılıklı katkı", w: 4.0 },
  ],
  rows: [
    { cells: ["Liken", "mantar + alg ya da siyanobakteri", "ortak organik madde; mantar su, mineral, korunma"], tones: [undefined, "b", "c"], detail: ["Birliğin fotosentez yapması mantar hücresinin kloroplast kazandığını göstermez; aynı yapıda farklı hücresel taraflar bulunur."] },
    { cells: ["Mikoriza", "mantar + bitki kökü", "mantar su ve mineral; bitki organik karbon"], tones: [undefined, "b", "c"], detail: ["Mikorizada ortak taraf bitki köküdür; likende fotosentetik ortaktır."] },
  ],
  foot: "Gerçek ilişkilerin çevreye göre değişen maliyetleri tek bir sonsuz yarar yasası değildir.",
});

// 6 · Spor, endospor, tohum, tomurcuk.
const spores = tableFig({
  caption:
    "Spor sözcüğünü görünce önce hangi canlı grubu ve hangi süreç soruluyor diye bak. Bir terime tıkla: bölümdeki sonuç açılır. Dayanıklılık kazanmak ile yeni birey oluşturmak ayrı sonuçlardır.",
  alt: "Dört satırlı tablo. Mantar sporu: uygun ortamda gelişip yeni mantar düzenine katılabilir. Bakteriyel endospor: bir hücreyi dayanıklılık amacıyla korur. Tohum: embriyo ve besin yapısı taşır; spor tohum değildir. Maya tomurcuğu: eşeysiz çoğalma.",
  cols: [
    { name: "Terim", w: 3.2 },
    { name: "Bölümdeki sonuç", w: 6.8 },
  ],
  rows: [
    { cells: ["Mantar sporu", "eşeysiz ya da eşeyli döngüde oluşur; gelişip yeni mantar düzenine katılabilir"], tones: [undefined, "a"], detail: ["Her mantarın aynı sırada aynı çekirdek evrelerini gösterdiği söylenmez."] },
    { cells: ["Endospor", "bakteride bir hücrenin dayanıklılık amacıyla korunması"], tones: [undefined, "b"], detail: ["Endosporun sayı sonucu mantar sporuyla aynı değildir: yeni birey değil dayanıklılık öne çıkar."] },
    { cells: ["Tohum", "embriyo ve besin yapısı"], tones: [undefined, "c"], detail: ["Spor tohum değildir; tohumdaki embriyo ve besin yapısını taşıdığı varsayılmaz."] },
    { cells: ["Maya tomurcuğu", "eşeysiz çoğalma örneği"], tones: [undefined, "a"], detail: ["Mayalarda tomurcuklanma ya da bazı türlerde bölünme eşeysiz çoğalmaya örnek olabilir."] },
  ],
  foot: "Önce canlı grubunu, sonra süreci yaz.",
});

// 7 · Ürün ve organizma eşleştirmesi.
const products = tableFig({
  caption:
    "Ürün ile organizmayı açık kanıtla eşleştir. Bir örneğe tıkla. Fermantasyon kelimesi tek başına mantar kanıtı değildir; görünüşle yabani mantarın yenilebilirliğine karar verilmez.",
  alt: "Dört satırlı tablo. Ekmek hamuru: seçilmiş maya mantarları, fermantasyonla CO₂, kabarma. Yoğurt: temel etken laktik asit bakterileri. Antibiyotik: bazı küflerden elde edilen örnekler. Yabani mantar: görünüşle yenilebilirliğe karar verilmez.",
  cols: [
    { name: "Örnek", w: 2.8 },
    { name: "Organizma", w: 3.4 },
    { name: "Kanıt", w: 3.8 },
  ],
  rows: [
    { cells: ["Ekmek hamuru", "seçilmiş maya mantarları", "fermantasyonla CO₂, kabarma"], tones: [undefined, "a", "muted"], detail: ["Bazı ürünlerde alkol de oluşur."] },
    { cells: ["Yoğurt", "laktik asit bakterileri", "temel etken bakteridir"], tones: [undefined, "b", "muted"], detail: ["Yoğurt üretiminin temel etkenleri laktik asit bakterileridir; fermantasyon mantar kanıtı değildir."] },
    { cells: ["Antibiyotik", "bazı küfler", "bütün türler aynı maddeyi üretmez"], tones: [undefined, "a", "muted"], detail: ["Bazı küflerden elde edilen antibiyotik örnekleri bütün mantarların aynı maddeyi ürettiği anlamına gelmez."] },
    { cells: ["Yabani mantar", "tür belirtilmeli", "görünüşle karar verilmez"], tones: [undefined, "warn", "muted"], detail: ["Bazı mantarlar bozulma, toksin ya da hastalık nedeniyle zararlı olabilir; tek bir şapka rengi teşhise yetmez."] },
  ],
  foot: "Tek bir ortak ad ya da ürün bütün âlemi teşhis etmeye yetmez.",
});

export const biologyFigures062Animals: Record<string, Record<string, FigureDef>> = {
  omurgasizlar: {
    "Omurgasızlık bir yokluk özelliğidir": layers,
    "Solucanları gövde benzerliğinde birleştirme": worms,
    "Yumuşakça: manto ve değişen ayak": molluscs,
    "Böcek mi, başka eklembacaklı mı?": insects,
    "Sistemleri yok, açık ve kapalı diye ayır": circulation,
  },
  mantarlar: {
    "Önce dışarıda parçala, sonra küçük ürünü al": outside,
    "Hif, miselyum ve görünen şapka": hyphae,
    "Mikorizada iki tarafın kazancını izle": mycorrhiza,
    "Liken bir yaşam birliğidir": lichen,
    "Üreme sporu, endospor ve maya tomurcuğu": spores,
    "Gıda ve ilaç örneklerini doğru gruba bağla": products,
  },
};
