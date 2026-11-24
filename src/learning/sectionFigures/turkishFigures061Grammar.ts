import type { FigureDef } from "./figureKit";
import { groupFig, ladderFig, splitFig, tableFig } from "./turkishFigures060Kit";

/*
 * Forge061 TYT Türkçe · ek fiil, zarflar ve zamirler. Örnekler bölüm
 * metninden alınır; çözümlemeler bölümlerin izlediği OGM/MEBİ okul
 * konvansiyonudur. Ayrık yazılmış ekler çözümleme gösterimidir, yazım
 * önerisi değildir.
 */

// ek-fiil · 0 · Taban ad mı, fiil mi?
const base = ladderFig({
  caption:
    "Yüklemin sonundaki ekten önce tabanı bul: ad soylu mu, fiil mi? İleri ile bölümdeki yüklemleri merdivende yürüt. İki yüklemin geçmiş anlamı taşıması yapılarını aynı yapmaz.",
  alt: "İki basamaklı karar merdiveni. Yüklemin tabanı ad soylu mu, evet ise ek fiil yargıyı kurar. Fiil kökü ve ilk kipten sonra idi, imiş ya da ise mi geliyor, evet ise birleşik çekim. Hayır ise fiilin doğrudan çekimi, ek fiil yok.",
  rungs: [
    { q: "Yüklemin tabanı ad soylu mu (yorgun, sessiz, hazır)?", yes: "ek fiil yargıyı kurar", tone: "c" },
    { q: "Fiil + ilk kipten sonra idi, imiş ya da ise katmanı var mı?", yes: "birleşik çekim", tone: "b" },
  ],
  last: "Fiilin doğrudan çekimi: ek fiil yok",
  walks: [
    { step: "yorgundu", example: "“Görevli yorgundu.”", stop: 0, why: "Taban yorgun sıfatıdır: yorgun + idi; yeni bir sözlük fiili türetilmez." },
    { step: "sessizdi", example: "“Sınıf sessizdi.”", stop: 0, why: "Ad soylu yüklem ve ek fiil." },
    { step: "okuyordu", example: "“okuyordu”", stop: 1, why: "oku-yor-idi: şimdiki zamanın hikâyesi." },
    { step: "yoruldu", example: "“Görevli yoruldu.”", stop: 2, why: "yorul- fiilinin görülen geçmiş çekimi." },
    { step: "sessizleşti", example: "“Sınıf sessizleşti.”", stop: 2, why: "-leş yapım ekiyle oluşan fiil; ek fiil değil." },
  ],
  foot: "Tabanı bul, ad mı fiil mi olduğunu söyle, sonra çekim katmanlarını ayır.",
});

// ek-fiil · 2 · Biçim adı ve bağlam.
const forms = tableFig({
  caption:
    "Biçim adı ile bağlamdaki anlam ayrı satırlarda değerlendirilir. Bir cümleye tıkla: ekin biçimsel adı ve bağlamın kattığı anlam açılır.",
  alt: "Üç satırlı tablo. Geçen hafta nöbetçi bendim: idi, geçmiş durum. Anlatılanlara göre eski bina kütüphaneymiş: imiş, dolaylı aktarım. Anahtar cebimdeymiş: imiş, yeni fark etme.",
  cols: [
    { name: "Cümle", w: 5.0 },
    { name: "Biçim", w: 1.6 },
    { name: "Bağlam", w: 3.4 },
  ],
  rows: [
    { cells: ["Geçen hafta nöbetçi bendim.", "idi", "ad soylu sözde geçmiş durum"], tones: [undefined, "b", "c"], detail: ["İdi ad soylu sözde geçmiş bir durumu kurar."] },
    { cells: ["Anlatılanlara göre eski bina kütüphaneymiş.", "imiş", "dolaylı aktarım"], tones: [undefined, "b", "c"], detail: ["Eski bina hakkındaki bilgi dolaylıdır."] },
    { cells: ["Anahtar cebimdeymiş!", "imiş", "yeni fark etme"], tones: [undefined, "b", "a"], detail: ["Konuşanın yeni fark ettiği durum; bir haberci zorunlu değildir.", "Biçim adı her bağlamda aynı bilgi edinme yolu değildir."] },
  ],
  foot: "“Duydum, fark ettim, dün, şimdi” gibi bağlamı biçimsel sınıflandırmadan ayrı oku.",
});

// ek-fiil · 3 · -sa/-se nereden geliyor?
const conditionals = tableFig({
  caption:
    "Görülen her -sa/-se ek fiil değildir: öncesinde ad soylu taban mı, ilk kip mi, doğrudan fiil kökü mü var? Bir biçime tıkla: çözümlemesi açılır.",
  alt: "Dört satırlı tablo. Açıksa: açık ad soylu, açık + ise, koşul; ana yüklem çıkabiliriz. Geliyorsan: gel-iyor-sa-n, şimdiki zamanın şartı. Gelirsen: geniş zamanın şartı. Gelsen: fiilin dilek-şart çekimi olabilir.",
  cols: [
    { name: "Biçim", w: 2.4 },
    { name: "Çözümleme", w: 3.4 },
    { name: "Ad", w: 4.2 },
  ],
  rows: [
    { cells: ["açıksa", "açık + ise", "ad soylu tabanda ek fiil şartı"], tones: [undefined, "muted", "c"], detail: ["“Hava açıksa yürüyüşe çıkabiliriz.”: ana yüklem çıkabilirizdir; açıksa koşulu belirtir."] },
    { cells: ["geliyorsan", "gel-iyor-sa-n", "şimdiki zamanın şartı"], tones: [undefined, "muted", "b"], detail: ["“Sen geliyorsan ben bekleyeyim.”: ilk kipten sonra ise katmanı."] },
    { cells: ["gelirsen", "gel-ir-se-n", "geniş zamanın şartı"], tones: [undefined, "muted", "b"], detail: ["“Sen gelirsen beklerim.”"] },
    { cells: ["gelsen", "gel-se-n", "fiilin dilek-şart çekimi olabilir"], tones: [undefined, "muted", "a"], detail: ["Doğrudan fiil köküne gelen -se otomatik ek fiil değildir."] },
  ],
  foot: "Şart cümlesinde hedef sözü ve bütün cümlenin ana yüklemini ayrı işaretle.",
});

// ek-fiil · 4 · İlk kip ve ikinci katman.
const layers = splitFig({
  caption:
    "Birleşik çekimde ilk kipten sonra ek fiilin hikâye, rivayet ya da şart katmanı gelir. İleri ile bölümdeki biçimleri aç: kök kalın çerçeve, ilk kip ve ek fiil kesik çerçeve, ses ve yardımcı parçalar soluk kutu.",
  alt: "Satır satır sözcük parçaları. okuyordu: oku kök, yor şimdiki zaman, du ek fiil hikâye. okuyacakmış: oku, yacak gelecek, mış ek fiil rivayet. okuyacaksa: oku, yacak, sa ek fiil şart. beklemişti: bekle, miş ilk kip, ti ek fiil hikâye. hastayken: hasta ad soylu, y kaynaştırma, ken ek fiil ile zarf görevli yapı.",
  parses: [
    { step: "okuyordu", word: "okuyordu", context: "Şimdiki zamanın hikâyesi: oku-yor-idi.", parts: [{ s: "oku-", kind: "kök", label: "fiil kökü" }, { s: "-yor", kind: "çekim", label: "ilk kip: şimdiki zaman" }, { s: "-du", kind: "çekim", label: "ek fiil: hikâye (idi)" }], note: "ilk kip + hikâye katmanı: birleşik çekim." },
    { step: "okuyacakmış", word: "okuyacakmış", context: "Gelecek zamanın rivayeti: oku-yacak-imiş.", parts: [{ s: "oku-", kind: "kök", label: "fiil kökü" }, { s: "-yacak", kind: "çekim", label: "ilk kip: gelecek zaman" }, { s: "-mış", kind: "çekim", label: "ek fiil: rivayet (imiş)" }], note: "ilk kip + rivayet katmanı." },
    { step: "okuyacaksa", word: "okuyacaksa", context: "Gelecek zamanın şartı: oku-yacak-ise.", parts: [{ s: "oku-", kind: "kök", label: "fiil kökü" }, { s: "-yacak", kind: "çekim", label: "ilk kip: gelecek zaman" }, { s: "-sa", kind: "çekim", label: "ek fiil: şart (ise)" }], note: "ilk kip + şart katmanı." },
    { step: "beklemişti", word: "beklemişti", context: "-miş ilk kip, -ti idi ek fiilinin hikâye biçimi.", parts: [{ s: "bekle-", kind: "kök", label: "fiil kökü" }, { s: "-miş", kind: "çekim", label: "ilk kip: öğrenilen geçmiş" }, { s: "-ti", kind: "çekim", label: "ek fiil: hikâye (idi)" }], note: "iki katmana ayrı görev ver." },
    { step: "hastayken", word: "hastayken", context: "“Hasta iken dinlendi.” → “Hastayken dinlendi.”", parts: [{ s: "hasta", kind: "kök", label: "ad soylu taban" }, { s: "-y-", kind: "ara", label: "i düşer, y görülür" }, { s: "-ken", kind: "çekim", label: "ek fiil -ken: zarf görevli yapı" }], note: "bağımsız ana yargı ya da yeni fiil kökü kurmaz; “Yürürken” ise fiil tabanlı zarf-fiildir." },
  ],
  foot: "Ünlü düşmesi ve uyum yüzünden idi, imiş, ise her zaman ayrı sözcük gibi görünmez.",
});

// ek-fiil · 6 · Olumsuzluk, soru ve ses.
const sounds = tableFig({
  caption:
    "Çözümleme gösterimi ile gerçek yazım. Bir satıra tıkla: hangi kuralın işlediği açılır. Ayırma işaretleri yazım önerisi değildir.",
  alt: "Beş satırlı tablo. iyi idi, iyiydi: i düşer, iki ünlü arasında y. hasta idi, hastaydı. dürüst idi, dürüsttü: ekler uyuma uyar. hazırdı, hazır değildi: ad soylu yüklem değil ile olumsuz. geliyordu, gelmiyordu: fiil kendi olumsuzluk ekini alır.",
  cols: [
    { name: "Gösterim", w: 3.0 },
    { name: "Yazım", w: 2.8 },
    { name: "Kural", w: 4.2 },
  ],
  rows: [
    { cells: ["iyi idi", "iyiydi", "i düşer; ünlüden sonra y"], tones: [undefined, "c", "muted"], detail: ["Bitişmede i düşer; iki ünlü arasında y görülebilir."] },
    { cells: ["hasta idi", "hastaydı", "i düşer; ünlüden sonra y"], tones: [undefined, "c", "muted"], detail: ["İdi ayrı da yazılabilir."] },
    { cells: ["dürüst idi", "dürüsttü", "ekler ünlü ve ünsüz uyumuna uyar"], tones: [undefined, "c", "muted"], detail: ["Sert ünsüzden sonra -tü."] },
    { cells: ["hazırdı", "hazır değildi", "ad soylu: değil ile olumsuz"], tones: [undefined, "b", "muted"], detail: ["Geçmiş katmanı değil üzerinde görünür; bütün yüklem ad soylu olumsuz yargıdır."] },
    { cells: ["geliyordu", "gelmiyordu", "fiil: kendi olumsuzluk eki"], tones: [undefined, "a", "muted"], detail: ["“Her -ma isim yükleminin olumsuzudur” demek yanlıştır; önce tabanın türünü belirle."] },
  ],
  foot: "Soru edatı ayrı yazılır, ardından gelen ekler ona bağlanır: “Hazır mıydın?”",
});

// zarflar · 0 · Bağlandığı yer.
const adverbLadder = ladderFig({
  caption:
    "Sözcüğün türü sözlükteki biçiminden değil, bağlandığı yerden çıkar. İleri ile bölümdeki hedef sözcükleri merdivende yürüt.",
  alt: "Üç basamaklı karar merdiveni. Sözcük bir adı mı belirtiyor, evet ise sıfat. Fiil ya da fiilimsinin gerçekleşmesini mi belirtiyor, evet ise zarf. Bir sıfatın ya da zarfın derecesini mi belirtiyor, evet ise miktar zarfı. Hayır ise başka tür, eki ve kökü ayır.",
  rungs: [
    { q: "Hedef sözcük bir adı mı belirtiyor?", yes: "sıfat", tone: "b" },
    { q: "Fiil ya da fiilimsinin gerçekleşmesini mi belirtiyor?", yes: "zarf: durum, zaman, yer-yön, miktar", tone: "c" },
    { q: "Bir sıfatın ya da zarfın derecesini mi belirtiyor?", yes: "miktar (derece) zarfı", tone: "a" },
  ],
  last: "Başka tür: eki ve kökü ayır",
  walks: [
    { step: "sakin çocuk", example: "“Sakin çocuk konuştu.” (sakin)", stop: 0, why: "Sakin, çocuk adını niteler." },
    { step: "sakin konuştu", example: "“Çocuk sakin konuştu.” (sakin)", stop: 1, why: "Konuşmanın biçimini belirtir: durum zarfı." },
    { step: "az su", example: "“Az su içti.” (az)", stop: 0, why: "Az, su adının miktarını belirtir: belgisiz sıfat." },
    { step: "çok sessiz", example: "“Duru çok sessiz konuştu.” (çok)", stop: 2, why: "Çok → sessiz: derece; konuşan kişinin adına bağlanmaz." },
    { step: "aşağıya", example: "“Aşağıya süzüldü.” (aşağıya)", stop: 3, why: "aşağı-y-a: yönelme eki almış isim; yalın yön zarfı değil." },
  ],
  foot: "Önce yakın anlam ilişkisini kur, sonra tür adını söyle.",
});

// zarflar · 4 · Katman katman bağlantılar.
const chains = groupFig({
  caption:
    "Bağlantıları katman katman çöz: her köşeli çizgi bir sözcüğün bağlandığı öbeği gösterir, alttaki çizgi bir üst katmandır. Örnekler bölümlerden alınmıştır. Aynı öbekte iki farklı görev birlikte bulunabilir.",
  alt: "Üç örnek. Duru çok sessiz konuştu: çok → sessiz derece, sessiz → konuştu durum. Çok az su: çok → az derece, az → su belgisiz sıfat. Çok düzenli çalışan öğrenci: çok → düzenli, düzenli → çalışan, çalışan → öğrenci.",
  variants: [
    {
      tokens: ["Duru", "çok", "sessiz", "konuştu."],
      groups: [
        { from: 1, to: 2, label: "çok → sessiz: derece", tone: "a", level: 0 },
        { from: 1, to: 3, label: "sessiz → konuştu: durum", tone: "c", level: 1 },
      ],
      note: "Çok, sessiz sözcüğünün derecesini; sessiz, konuşmanın biçimini bildirir.",
    },
    {
      tokens: ["çok", "az", "su"],
      groups: [
        { from: 0, to: 1, label: "çok → az: derece", tone: "a", level: 0 },
        { from: 0, to: 2, label: "az → su: belgisiz sıfat", tone: "b", level: 1 },
      ],
      note: "“Az uyudu.” cümlesinde ise az, uyuma eyleminin miktarıdır.",
    },
    {
      tokens: ["Çok", "düzenli", "çalışan", "öğrenci"],
      groups: [
        { from: 0, to: 1, label: "çok → düzenli", tone: "a", level: 0 },
        { from: 0, to: 2, label: "düzenli → çalışan: fiilimsiye bağlı", tone: "c", level: 1 },
        { from: 0, to: 3, label: "çalışan → öğrenci: sıfat-fiil", tone: "b", level: 2 },
      ],
      note: "Zarflar yalnız çekimli yükleme bağlanmak zorunda değildir.",
    },
  ],
  foot: "Zincirdeki her bağı ayrı ayrı oku.",
});

// zarflar · 3 · Yer-yön.
const direction = tableFig({
  caption:
    "Yön anlamı tek başına sözcük türünü sabitlemez. Bir cümleye tıkla: hedef sözcüğün bağlandığı yer ve eki açılır.",
  alt: "Dört satırlı tablo. Dalgıç aşağı süzüldü: aşağı, yalın, fiile bağlı, yer-yön zarfı. Aşağı kat boş: aşağı, kat adını belirtir, sıfat. Aşağıya süzüldü: aşağıya, yönelme ekli isim. Dışarı çıkmak: dışarı, eylemsiye bağlı, yer-yön zarfı.",
  cols: [
    { name: "Cümle", w: 3.8 },
    { name: "Hedef", w: 2.0 },
    { name: "Tür", w: 4.2 },
  ],
  rows: [
    { cells: ["Dalgıç aşağı süzüldü.", "aşağı", "yer-yön zarfı: yalın, fiile bağlı"], tones: [undefined, "ink", "c"], detail: ["Süzülmenin yönünü belirtir."] },
    { cells: ["Aşağı kat boş.", "aşağı", "sıfat: kat adını belirtir"], tones: [undefined, "ink", "b"], detail: ["Aynı sözcük bir adı belirttiği için sıfattır."] },
    { cells: ["Aşağıya süzüldü.", "aşağıya", "isim: aşağı-y-a, yönelme eki"], tones: [undefined, "ink", "a"], detail: ["“Nereye?” yanıtı yön bilgisini gösterir; zarf türünü kanıtlamaz."] },
    { cells: ["dışarı çıkmak", "dışarı", "yer-yön zarfı: eylemsiye bağlı"], tones: [undefined, "ink", "c"], detail: ["Çıkmak eylemsisinin yönünü belirtir."] },
  ],
  foot: "Önce eki ve kökü ayır, sonra bağlandığı yeri bul.",
});

// zarflar · 6 · Soru sözcükleri.
const questions = tableFig({
  caption:
    "Soru işaretinin varlığı ayrımı çözmez; cevabın türünü dene. Bir cümleye tıkla: beklenen cevap ve sözcüğün görevi açılır.",
  alt: "Beş satırlı tablo. Kutuyu nasıl taşıdın: soru zarfı, cevap dikkatlice. Nasıl bir kutu taşıdın: soru sıfatı, kutunun niteliği. Ne taşıdın: soru zamiri. Ne bağırıyorsun, niçin anlamıyla: soru zarfı. Geldin mi: mi soru parçacığı.",
  cols: [
    { name: "Cümle", w: 3.8 },
    { name: "Görev", w: 2.6 },
    { name: "Cevap türü", w: 3.6 },
  ],
  rows: [
    { cells: ["Kutuyu nasıl taşıdın?", "soru zarfı", "biçim: dikkatlice"], tones: [undefined, "c", "muted"], detail: ["Nasıl, taşıma eyleminin biçimini sorar."] },
    { cells: ["Nasıl bir kutu taşıdın?", "soru sıfatı", "kutunun niteliği"], tones: [undefined, "b", "muted"], detail: ["Kutunun niteliği aranır."] },
    { cells: ["Ne taşıdın?", "soru zamiri", "taşınan varlığın adı"], tones: [undefined, "a", "muted"], detail: ["Ne, taşınan varlığın adını karşılar."] },
    { cells: ["Ne bağırıyorsun?", "soru zarfı", "neden (niçin anlamıyla)"], tones: [undefined, "c", "muted"], detail: ["Bu okuma niçin anlamı koşuluna bağlıdır."] },
    { cells: ["Geldin mi?", "soru parçacığı", "cümleyi soru yapar"], tones: [undefined, "muted", "muted"], detail: ["Mi soru parçacığıdır."] },
  ],
  foot: "Tek soru sözcüğü bulunur gibi evrensel bir kural çıkarma.",
});

// zamirler · 0 · Gönderim.
const reference = tableFig({
  caption:
    "Zamiri bulmak yetmez; hangi adı ya da yargıyı karşıladığını göster. Bir zamire tıkla: gönderdiği yer açılır. Bağlam yetmiyorsa belirsizlik dürüstçe söylenir.",
  alt: "Dört satırlı tablo. Ece dosyayı aldı. O, onu okudu: O Ece’ye, onu dosyaya gönderir. Çalışırken ara vermek yararlıdır; bunu unutma: bunu önceki yargıyı karşılar. Merve, Selin’e onun notunu verdi: onun Merve’ye de Selin’e de gönderilebilir, belirsiz.",
  cols: [
    { name: "Bağlam", w: 4.6 },
    { name: "Zamir", w: 1.6 },
    { name: "Gönderim", w: 3.8 },
  ],
  rows: [
    { cells: ["Ece dosyayı aldı. O, onu okudu.", "O", "Ece (kişi)"], tones: [undefined, "a", "c"], detail: ["O kişiye gönderir."] },
    { cells: ["Ece dosyayı aldı. O, onu okudu.", "onu", "dosya"], tones: [undefined, "a", "c"], detail: ["Onu dosyaya gönderir."] },
    { cells: ["Çalışırken ara vermek yararlıdır; bunu unutma.", "bunu", "önceki yargı"], tones: [undefined, "a", "c"], detail: ["Zamir tek bir sözcüğe değil bir yargıya dönebilir."] },
    { cells: ["Merve, Selin’e onun notunu verdi.", "onun", "belirsiz: Merve ya da Selin"], tones: [undefined, "a", "warn"], detail: ["Dış bağlam yoksa kesin sahibi seçmek doğru olmaz; açıklık için ad tekrarlanır."] },
  ],
  foot: "Bağlam özel adı vermiyorsa ad uydurma.",
});

// zamirler · 3 · Açık ad testi.
const openNoun = ladderFig({
  caption:
    "Açık ad testi: sözcük yanındaki adı mı belirtiyor, yoksa adın yerini mi tutuyor? İleri ile bölümdeki çiftleri merdivende yürüt.",
  alt: "İki basamaklı karar merdiveni. Sözcüğün hemen belirttiği açık bir ad var mı, evet ise sıfat: işaret, belgisiz ya da soru sıfatı. Bir adın yerini tutuyor mu, evet ise zamir. Hayır ise başka görev: zarf ya da bağlaç.",
  rungs: [
    { q: "Sözcüğün belirttiği açık bir ad var mı?", yes: "sıfat (işaret, belgisiz, soru)", tone: "b" },
    { q: "Bir adın ya da yargının yerini tutuyor mu?", yes: "zamir", tone: "c" },
  ],
  last: "Başka görev: zarf ya da bağlaç",
  walks: [
    { step: "Bu kalemi", example: "“Bu kalemi aldım.” (bu)", stop: 0, why: "Bu, kalem adını belirtir: işaret sıfatı." },
    { step: "Bunu", example: "“Bunu aldım.” (bunu)", stop: 1, why: "Kalem adının yerine geçer: işaret zamiri." },
    { step: "Bazı", example: "“Bazı öğrenciler kaldı.” (bazı)", stop: 0, why: "Açık öğrenci adını belirtir: belgisiz sıfat." },
    { step: "Bazıları", example: "“Bazıları kaldı.” (bazıları)", stop: 1, why: "Adın yerini tutar: belgisiz zamir." },
    { step: "Nasıl", example: "“Nasıl okudun?” (nasıl)", stop: 2, why: "Eylemi soran zarf." },
    { step: "ki", example: "“Biliyorum ki geleceksin.” (ki)", stop: 2, why: "Ayrı yazılan ki yargıları bağlayan bağlaçtır." },
  ],
  foot: "Gösterilenin insan olmasına bakarak bu/şu sözcüklerini kişi zamiri sayma.",
});

// zamirler · 6 · Kimi.
const kimi = tableFig({
  caption:
    "Aynı biçim, üç görev: “kimi” bağlama göre sıfat, belgisiz zamir ya da soru zamiridir. Bir cümleye tıkla: kanıt açılır.",
  alt: "Üç satırlı tablo. Kimi insanlar erken gelir: belgisiz sıfat. Bazıları çıktı, kimi kaldı: belgisiz zamir. Kimi aradın: soru zamiri.",
  cols: [
    { name: "Cümle", w: 4.6 },
    { name: "Görev", w: 2.6 },
    { name: "Kanıt", w: 2.8 },
  ],
  rows: [
    { cells: ["Kimi insanlar erken gelir.", "belgisiz sıfat", "açık ad: insanlar"], tones: [undefined, "b", "muted"], detail: ["Açık adı belirtir."] },
    { cells: ["Bazıları çıktı, kimi kaldı.", "belgisiz zamir", "adın yerini tutar"], tones: [undefined, "c", "muted"], detail: ["Ad söylenmeden belirsiz biçimde karşılanır."] },
    { cells: ["Kimi aradın?", "soru zamiri", "cevap bir kişi adı"], tones: [undefined, "a", "muted"], detail: ["Soru yoluyla bir ad alanı açar; durum eki soru görevini yok etmez."] },
  ],
  foot: "Sözcük biçimi aynı diye görevleri tek bir listede dondurma.",
});

// zamirler · 7 · Üç ki.
const threeKi = tableFig({
  caption:
    "Üç ayrı ki: yer tutma, niteleme, bağlama. Bitişik/ayrı yazım yetmez; sıfat yapan ve ilgi zamiri -ki ikisi de bitişiktir. Bir örneğe tıkla: görev testi açılır.",
  alt: "Dört satırlı tablo. Seninki kareli: ilgi zamiri, senin defterin, bitişik. Masadaki defter: sıfat yapan ki, bitişik. Masadakini aldım: adlaşmış sıfat yapan ki. Biliyorum ki geleceksin: bağlaç, ayrı.",
  cols: [
    { name: "Örnek", w: 3.6 },
    { name: "Görev", w: 3.4 },
    { name: "Test", w: 3.0 },
  ],
  rows: [
    { cells: ["seninki kareli", "ilgi zamiri", "senin defterin diye açılır"], tones: [undefined, "c", "muted"], detail: ["“Benim defterim çizgili, seninki kareli.”: tamlanan söylenmediği için ek adın yerini tutar."] },
    { cells: ["masadaki defter", "sıfat yapan -ki", "yer grubunu ada bağlar"], tones: [undefined, "b", "muted"], detail: ["İlgi zamiri değildir; bitişik yazılır."] },
    { cells: ["Masadakini aldım.", "adlaşmış -ki’li grup", "oluşumu sıfat yapan -ki"], tones: [undefined, "b", "muted"], detail: ["Adlaşmış kullanımda oluşum unutulmaz."] },
    { cells: ["Biliyorum ki geleceksin.", "bağlaç", "yargıları bağlar, ayrı"], tones: [undefined, "a", "muted"], detail: ["Ayrı yazılan ki bağlaçtır."] },
  ],
  foot: "Benimki, onlarınki gibi biçimlerde tamlayanla ilişkiyi açarak kanıtla.",
});

// zamirler · 8 · İyelik ve benzer ekler.
const possessive = splitFig({
  caption:
    "Ek hâlindeki iyelik ve benzer görünen ekler. İleri ile bölümdeki sözcükleri aç: kök kalın çerçeve, çekim ekleri kesik çerçeve, zamir n’si ve kaynaştırma soluk kutu.",
  alt: "Satır satır sözcük parçaları. çantasını: çanta, sı iyelik, n zamir n’si, ı belirtme. çantanı: çanta, n ikinci tekil iyelik, ı belirtme. evim: ev, im birinci tekil iyelik. evdeyim: ev, de bulunma, y kaynaştırma, im kişi.",
  parses: [
    { step: "çantasını", word: "çantasını", context: "“Onun çantasını taşıdım.”", parts: [{ s: "çanta", kind: "kök", label: "ad" }, { s: "-sı", kind: "çekim", label: "iyelik: üçüncü tekil" }, { s: "-n-", kind: "ara", label: "zamir n’si" }, { s: "-ı", kind: "çekim", label: "belirtme durumu" }], note: "iyelik, zamir n’si, belirtme sırası." },
    { step: "çantanı", word: "çantanı", context: "“Senin çantanı taşıdım.”", parts: [{ s: "çanta", kind: "kök", label: "ad" }, { s: "-n", kind: "çekim", label: "iyelik: ikinci tekil" }, { s: "-ı", kind: "çekim", label: "belirtme durumu" }], note: "yüzey biçiminden sahibi kesinleştirme; açık tamlayan anlamı belirler." },
    { step: "evim", word: "evim", context: "“Evim” benim evim diye açılır.", parts: [{ s: "ev", kind: "kök", label: "ad" }, { s: "-im", kind: "çekim", label: "iyelik: birinci tekil" }], note: "aitlik bildirir; kişi zamiriyle aynı sözcük değildir." },
    { step: "evdeyim", word: "evdeyim", context: "Bulunma eki ve yüklemde kişi bildirimi.", parts: [{ s: "ev", kind: "kök", label: "ad" }, { s: "-de", kind: "çekim", label: "bulunma durumu" }, { s: "-y-", kind: "ara", label: "kaynaştırma" }, { s: "-im", kind: "çekim", label: "kişi: birinci tekil" }], note: "iyelikli “evim”den farklı bir yapı." },
  ],
  foot: "Bağlam verilmeyen belirsizliği fark etmek de bir sonuçtur.",
});

export const turkishFigures061Grammar: Record<string, Record<string, FigureDef>> = {
  "ek-fiil": {
    "Önce yargıyı ve tabanı bul": base,
    "İdi ve imiş: biçimi bağlamdan ayır": forms,
    "İse bir koşul kurar; ana yargıyı da gör": conditionals,
    "İlk kip ile ikinci katmanı sıraya koy": layers,
    "Olumsuzluk, soru ve ses değişimini birlikte çöz": sounds,
  },
  zarflar: {
    "İlk iş: sözcüğün bağlandığı yeri bul": adverbLadder,
    "Miktar: fiil, sıfat ve zarfın ölçüsü": chains,
    "Yer-yön: yalın yön ve ekli ad": direction,
    "Soru zarfları: cevabın türünü dene": questions,
  },
  zamirler: {
    "Adı tekrarlama, gönderimi koru": reference,
    "İşaret zamirleri: gösterme ve açık adı düşürme": openNoun,
    "Soru zamiri ve kimi sözcüğünün farklı işleri": kimi,
    "Üç ayrı ki: yer tutma, niteleme, bağlama": threeKi,
    "Ek hâlindeki iyelik ve benzer görünen ekler": possessive,
  },
};
