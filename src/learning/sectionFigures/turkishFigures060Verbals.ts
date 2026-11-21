import type { FigureDef } from "./figureKit";
import { ladderFig, splitFig, tableFig } from "./turkishFigures060Kit";

/*
 * Forge060 TYT Türkçe · fiilimsiler. Örnekler bölüm metninden alınır; tür
 * kararı bölümün izlediği OGM okul sınıflamasıdır. Kavram şemaları ölçekli
 * değildir.
 */

const threeRoles = tableFig({
  caption:
    "Aynı “okumak” eylemi üç cümlede üç görev üstlenir: ad, niteleme ve zarf. Bir türe tıkla: fiilimsinin hangi söze bağlandığı açılır. Üçünde de okuma eylemi anlamca korunur. Kavram şeması, ölçekli değildir.",
  alt: "Üç satırlı tablo. İsim-fiil: Okumayı seviyorum, etkinliğin adı. Sıfat-fiil: Okuyan çocuk bekliyor, çocuğu niteler. Zarf-fiil: Okuyarak öğrendi, nasıl öğrendiğini gösterir.",
  cols: [
    { name: "Tür", w: 2.6 },
    { name: "Bölümdeki cümle", w: 4.0 },
    { name: "Görev", w: 3.4 },
  ],
  rows: [
    { cells: ["İsim-fiil", "Okumayı seviyorum.", "etkinliğin adı"], tones: [undefined, "ink", "c"], detail: ["“okuma” bir etkinliğin adıdır; ad görevindedir.", "Ekler: -ma/-me, -mak/-mek, -ış/-iş/-uş/-üş."] },
    { cells: ["Sıfat-fiil", "Okuyan çocuk bekliyor.", "“çocuk” adını niteler"], tones: [undefined, "ink", "b"], detail: ["“okuyan” çocuğu niteler; önce nitelenen adı bul.", "Ekler: -an, -ası, -maz, -ar, -dık, -acak, -mış (ünlü uyumlu biçimleriyle)."] },
    { cells: ["Zarf-fiil", "Okuyarak öğrendi.", "öğrenmenin nasıl yapıldığı"], tones: [undefined, "ink", "a"], detail: ["“okuyarak” temel eylem “öğrendi”yi tamamlar.", "Ekler: -ıp, -arak, -ınca, -madan, -dıkça, -alı, -ken ve diğerleri."] },
  ],
  foot: "Fiilimsi kip ve kişiyle bağımsız temel yargı kurmaz; kökü, eki ve bağlı olduğu sözü ayrı göster.",
});

const nounVerbSplit = splitFig({
  caption:
    "Kök–ek ayrıştırması: kök kalın çerçeve, yapım eki (fiilimsi eki) dolu yeşil kutu, çekim eki kesik çerçeve, ara parçalar soluk kutu. İleri ile bölümdeki üç biçimi aç: aynı “-ma” bir sözcükte olumsuzluk, öbüründe isim-fiil ekidir.",
  alt: "Satır satır sözcük parçaları. yürü-me-y-i: fiil kökü, isim-fiil eki, kaynaştırma, belirtme durumu. konuş-ma-ma-y-ı: kök, olumsuzluk, isim-fiil eki, kaynaştırma, belirtme durumu. Burada konuşma: kök ve olumsuz emir.",
  parses: [
    {
      step: "yürümeyi",
      word: "yürümeyi",
      context: "“Yürümeyi seviyorum.” (belirtili nesne)",
      parts: [
        { s: "yürü-", kind: "kök", label: "fiil kökü" },
        { s: "-me", kind: "yapım", label: "isim-fiil eki" },
        { s: "-y-", kind: "ara", label: "kaynaştırma sesi" },
        { s: "-i", kind: "çekim", label: "belirtme durumu" },
      ],
      note: "fiilimsi ekinin ardından gelen belirtme durumunu ayır. Sözcüğün öge olması (nesne) isim-fiil türüyle aynı sınıflandırma değildir.",
    },
    {
      step: "konuşmamayı",
      word: "konuşmamayı",
      context: "“Konuşmamayı seçti.”",
      parts: [
        { s: "konuş-", kind: "kök", label: "fiil kökü" },
        { s: "-ma", kind: "ara", label: "olumsuzluk" },
        { s: "-ma", kind: "yapım", label: "isim-fiil eki" },
        { s: "-y-", kind: "ara", label: "kaynaştırma sesi" },
        { s: "-ı", kind: "çekim", label: "belirtme durumu" },
      ],
      note: "ilk -ma olumsuzluk, ikincisi isim-fiildir.",
    },
    {
      step: "Burada konuşma!",
      word: "konuşma (emir)",
      context: "“Burada konuşma!” (muhataba verilen emir)",
      parts: [
        { s: "konuş-", kind: "kök", label: "fiil kökü" },
        { s: "-ma", kind: "ara", label: "olumsuzluk; olumsuz emir çekimi" },
      ],
      note: "olumsuz emir çekimidir, isim-fiil değildir. Eki ezberleme; tam cümlede eylem adı mı, emir mi diye denetle.",
    },
  ],
  foot: "Fiilimsi eki okul dil bilgisinde yapım eki sayılır; ardından isim çekim eki gelebilir.",
});

const sameEnding = tableFig({
  caption:
    "Aynı ek görünümü aynı sözcük türünü garanti etmez. Bir cümleye tıkla: sözcüğün bir adı mı nitelediği, yoksa yüklem mi olduğu açılır. Örnekler bölüm metnindendir.",
  alt: "Dört satırlı tablo: Bitecek işi paylaştık, bitecek iş adını niteler, sıfat-fiil. İş yarın bitecek, bitecek yüklem, çekimli fiil. Okuduğum kitabı getirdim, okuduğum kitabı niteler. Görülmemiş bir olay, sıfat-fiil.",
  cols: [
    { name: "Cümle", w: 4.3 },
    { name: "Bağ", w: 3.1 },
    { name: "Tür", w: 2.6 },
  ],
  rows: [
    { cells: ["Bitecek işi paylaştık.", "bitecek → iş", "sıfat-fiil"], tones: [undefined, "muted", "c"], detail: ["“bitecek” iş adını niteler.", "Önce nitelenen adı bul, sonra fiilimsi ile ad arasındaki bağı göster."] },
    { cells: ["İş yarın bitecek.", "yüklem", "çekimli fiil"], tones: [undefined, "muted", "warn"], detail: ["“bitecek” gelecek zamanlı yüklemdir.", "Aynı -ecek görünümü, aynı sözcük türünü garanti etmez."] },
    { cells: ["Okuduğum kitabı getirdim.", "okuduğum → kitap", "sıfat-fiil"], tones: [undefined, "muted", "c"], detail: ["“okuduğum” kitabın hangi kitap olduğunu belirtir.", "-um iyelik ilişkisi kurar; kişi çağrışımı onu çekimli fiil yapmaz."] },
    { cells: ["Görülmemiş bir olay", "görülmemiş → olay", "sıfat-fiil"], tones: [undefined, "muted", "c"], detail: ["Olumsuzluk ya da edilgenlik sıfat-fiil olmayı engellemez.", "Tüm cümlenin zamanıyla sıfat-fiilin çağrıştırdığı zamanı karıştırma."] },
  ],
  foot: "Sıfat-fiil kararı: sözcük bir adı niteliyor mu ve temel yargıyı kurmuyor mu?",
});

const lookAlike = ladderFig({
  caption:
    "Benzer sonlu sözcükler için karar merdiveni: önce tabanın gerçekten eylem kökü olup olmadığına, sonra cümledeki göreve bak. İleri ile bölümdeki örnekleri yürüt. Ad soylu tabandaki -ken ya da -cesine bu sınıflamada fiilimsi sayılmaz.",
  alt: "Dört soru kartı alt alta. Taban ad soylu mu: fiilimsi değil. Temel yargıyı kip ve kişiyle mi kuruyor: çekimli fiil. Bir adı mı niteliyor: sıfat-fiil. Temel eylemi mi tamamlıyor: zarf-fiil. Hiçbiri: eylem adı, isim-fiil.",
  rungs: [
    { q: "Taban ad soylu mu (hasta-, deli-)?", yes: "fiilimsi değil", tone: "warn" },
    { q: "Temel yargıyı kip ve kişiyle mi kuruyor?", yes: "çekimli fiil", tone: "warn" },
    { q: "Bir adı mı niteliyor?", yes: "sıfat-fiil", tone: "b" },
    { q: "Temel eylemi zaman ya da durumca mı tamamlıyor?", yes: "zarf-fiil", tone: "a" },
  ],
  last: "Eylemin adı: isim-fiil",
  lastTone: "c",
  walks: [
    { step: "hastayken", example: "Hastayken dinlendi.", stop: 0, why: "Ad soylu tabana ek fiilin -ken biçimi gelmiş; bu sınıflamada fiilimsi sayılmaz." },
    { step: "delicesine", example: "Delicesine sevindi.", stop: 0, why: "Ad soylu tabandan kurulmuş; yalnız -cesine sonuna bakılarak zarf-fiil yapılmaz." },
    { step: "bitecek (yüklem)", example: "İş yarın bitecek.", stop: 1, why: "Gelecek zamanlı yüklem; temel yargıyı kurar." },
    { step: "bitecek (niteleme)", example: "Bitecek işi paylaştık.", stop: 2, why: "“iş” adını niteler: sıfat-fiil." },
    { step: "yürürken", example: "Yürürken durdu.", stop: 3, why: "Fiil kökünden kurulmuş; “durdu” eylemine bağlanır: zarf-fiil." },
    { step: "alıp", example: "Kitabı alıp çıktı.", stop: 3, why: "“alıp” ikinci yüklem değildir; çıkma eylemine bağlanan zarf-fiildir." },
    { step: "yürümek", example: "Yürümek iyi gelir.", stop: 4, why: "Eylemin adı, cümlede özne: isim-fiil." },
  ],
  foot: "Zarf görevi yapmak ile zarf-fiil olmak farklıdır; tabanı ve görevi birlikte kanıtla.",
});

export const turkishFigures060Verbals: Record<string, Record<string, FigureDef>> = {
  fiilimsiler: {
    "Fiilden doğan üç görev": threeRoles,
    "İsim-fiil: eylemi ad olarak kullan": nounVerbSplit,
    "Sıfat-fiil: hangi adı niteliyor?": sameEnding,
    "Benzer sonlar: kök ve bağlam denetimi": lookAlike,
  },
};
