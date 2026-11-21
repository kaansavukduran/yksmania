import type { FigureDef } from "./figureKit";
import { flowFig, quadFig, tableFig, treeFig } from "./turkishFigures060Kit";

/*
 * Forge061 TYT Din Kültürü · İslam ve ibadet, Din ve İslam. Terimler, örnekler
 * ve sınıflamalar yalnız bölüm metninden alınır. Şemalar ders sınıflamasıdır;
 * belirli bir kişi ya da olay için hüküm üretmez, mezhepler arasında taraf
 * tutmaz. Seçim düğmeleri öğrenme kaydı üretmez.
 */

// islam-ve-ibadet · 1 · Dar ve geniş kapsam.
const scope = treeFig({
  caption:
    "İbadet kavramının iki kapsamı: biçimi belirli ibadetler daha geniş kulluk çerçevesinin belirli bir alt alanıdır. Bir dala ya da örneğe tıkla: hangi ölçütle o tarafa yazıldığı açılır. İki örnek aynı uygulama türü değildir.",
  alt: "Sınıflama ağacı. Kök: İbadet. Sol dal dar kapsam, biçimi belirli: namaz, oruç, zekât, hac. Sağ dal geniş kapsam, salih amel: anne babaya iyi davranma, bilgiyi paylaşma, dürüst çalışma, çevreyi koruma.",
  root: "İbadet",
  branches: [
    {
      label: "Dar kapsam",
      title: "Dar kapsam: biçimi belirli ibadetler",
      tone: "b",
      detail: ["Namaz, oruç, zekât ve hac; her birinin vakit, koşul, uygulama veya miktar gibi kendine özgü kuralları vardır.", "Herhangi bir güzel davranışın adını doğrudan namazın yerine koymak doğru sınıflama değildir."],
      leaves: [
        { label: "namaz", title: "Namaz", detail: ["Vakit ve uygulama kuralları belirli bir ibadettir."] },
        { label: "oruç", title: "Oruç", detail: ["Özel bir ibadettir; niyetle yapılan yardım ise genel kulluk çerçevesinde incelenebilir."] },
        { label: "zekât", title: "Zekât", detail: ["Miktar ve koşul kuralları olan belirli bir ibadettir."] },
        { label: "hac", title: "Hac ibadeti", detail: ["Kendine özgü koşul ve uygulaması olan belirli bir ibadettir."] },
      ],
    },
    {
      label: "Geniş kapsam",
      title: "Geniş kapsam: salih amel",
      tone: "c",
      detail: ["Allah rızasına yönelik iyi ve yararlı işler salih amel olarak adlandırılır; amaç ve eylemin ahlaki niteliği birlikte önemlidir.", "Özel kapsam bu geniş anlayışın dışında ayrı bir din oluşturmaz."],
      leaves: [
        { label: "anne babaya iyilik", title: "Anne babaya iyi davranma", detail: ["Bölümde geniş kapsamda ele alınan örneklerden biridir."] },
        { label: "bilgiyi paylaşma", title: "Bilgiyi paylaşma", detail: ["Bölümde geniş kapsamda ele alınan örneklerden biridir."] },
        { label: "dürüst çalışma", title: "Dürüst çalışma", detail: ["Bölümde geniş kapsamda ele alınan örneklerden biridir."] },
        { label: "çevreyi koruma", title: "Çevreyi koruma", detail: ["Bölümde geniş kapsamda ele alınan örneklerden biridir."] },
      ],
    },
  ],
  foot: "Güzel görünen bir eylem kişinin iç niyetini dışarıdan kesin ölçmez; metin amacı bildirmiyorsa niyet bilgisini eksik bırak.",
});

// islam-ve-ibadet · 2 · Âbit, mabet, mabut.
const triad = tableFig({
  caption:
    "Ses benzerliği olan üç terim üç ayrı soruya yanıt verir: kim yapıyor, nerede yapıyor, kime yöneliyor? Bir terime tıkla: neyi adlandırdığı ve karıştırılan nokta açılır.",
  alt: "Üç satırlı tablo. Âbit: kim, ibadet eden kişi. Mabet: nerede, ibadet edilen yer, örnek cami. Mabut: kime, kendisine ibadet edilen.",
  cols: [
    { name: "Terim", w: 2.6 },
    { name: "Soru", w: 2.6 },
    { name: "Adlandırdığı öğe", w: 4.8 },
  ],
  rows: [
    { cells: ["Âbit", "Kim yapıyor?", "ibadet eden kişi"], tones: [undefined, "muted", "c"], detail: ["Âbit ibadet eden kişidir; camiyi kullanan kişi âbit olarak anlatılabilir.", "Cümlenin öznesini mekânla karıştırma."] },
    { cells: ["Mabet", "Nerede yapıyor?", "ibadet edilen yer (ör. cami)"], tones: [undefined, "muted", "b"], detail: ["Mabet ibadet edilen yerdir; cami bir mabet örneğidir.", "Harf benzerliğiyle ezber, kişi ile mekânı karıştırmaya yol açabilir."] },
    { cells: ["Mabut", "Kime yöneliyor?", "kendisine ibadet edilen"], tones: [undefined, "muted", "a"], detail: ["Mabut kendisine ibadet edilendir.", "Kişi, mekân ve yönelinen varlık farklı öğelerdir."] },
  ],
  foot: "Bir cümleyi üç soruyla çöz: kim, nerede, kime.",
});

// islam-ve-ibadet · 3 · Efâlimükellefin.
const rulings = treeFig({
  caption:
    "Efâlimükellefin, yükümlü kişinin davranışlarına ilişkin hükümleri üç tarafa ayırır. Bir dala ya da terime tıkla: bölümdeki tanımı açılır. Aynı dalda yer almak aynı derecede yükümlülük demek değildir; sınıflama insanın değerine puan vermez.",
  alt: "Sınıflama ağacı. Kök: Efâlimükellefin. Yapılması istenen: farz, vacip, sünnet, mendup. Kaçınılması istenen: haram, mekruh. Serbest bırakılan: mubah.",
  root: "Efâlimükellefin",
  branches: [
    {
      label: "İstenen",
      title: "Yapılması istenen davranışlar",
      tone: "c",
      detail: ["Farz, vacip, sünnet ve mendup yapılması istenen tarafta öğretilir.", "Listede yan yana durmaları aynı bağlayıcılıkta oldukları anlamına gelmez."],
      leaves: [
        { label: "farz", title: "Farz", detail: ["Yapılması kesin ve bağlayıcı biçimde istenen davranışlar için kullanılır."] },
        { label: "vacip", title: "Vacip", detail: ["Hanefî terminolojisinde bağlayıcılığı bulunan, delil derecesi bakımından farzdan ayrı ele alınan hükümdür; diğer ekoller aynı ayrımı yapmayabilir."] },
        { label: "sünnet", title: "Sünnet", detail: ["Hüküm sınıflamasında farz ve vacip dışındaki belirli uygulamalar için kullanılabilir; geniş kullanımda ise bir dinî kaynağı anlatır."] },
        { label: "mendup", title: "Mendup", detail: ["Yapılması kesin bağlayıcı olmaksızın istenen ve terk edilmesi kınanmayan davranışlar; müstehap ve nafile yakın bağlamlarda yer alır."] },
      ],
    },
    {
      label: "Kaçınılan",
      title: "Kaçınılması istenen davranışlar",
      tone: "warn",
      detail: ["MEB listesinde haram ve mekruh kaçınılması istenen tarafta gösterilir.", "Yasak türünün ayrıntıları fıkıh ekollerinde farklı ele alınabilir."],
      leaves: [
        { label: "haram", title: "Haram", detail: ["Kesin yasakla ilişkilendirilir."] },
        { label: "mekruh", title: "Mekruh", detail: ["Yapılması hoş karşılanmayan davranışlarla ilişkilendirilir; sırf haram değil diye önerilen eylem sayılmaz."] },
      ],
    },
    {
      label: "Serbest",
      title: "Serbest bırakılan davranışlar",
      tone: "b",
      detail: ["Mubah, kişinin yapıp yapmamakta dinen serbest bırakıldığı davranışları anlatır.", "İzin verilen bir davranışın ayrıca farz olması gerekmez."],
      leaves: [{ label: "mubah", title: "Mubah", detail: ["Yapıp yapmamakta serbest bırakılan davranış; helal ve caiz bazı bağlamlarda yakın anlamda kullanılır."] }],
    },
  ],
  foot: "Her terimin ölçütünü ve kullanıldığı mezhep bağlamını koru; özel bir olay için kişisel hüküm üretme.",
});

// islam-ve-ibadet · 4 · Farzıayn ile farzıkifaye.
const kifaye = tableFig({
  caption:
    "Farzın iki türünü sorumluluğun kime düştüğüne göre karşılaştır. Bir türe tıkla: bölümdeki örnekleri ve karıştırılan nokta açılır. Farzıkifayede belirleyici olan en hızlı kişi değil, işin gerekli biçimde yerine getirilmesidir.",
  alt: "İki satırlı tablo. Farzıayn: sorumluluk şartları oluşan her yükümlü bireyde; başkası yerine yapamaz; örnek beş vakit namaz, Ramazan orucu, zekât ve hac. Farzıkifaye: yeterli bir grup yapınca diğerlerinden düşer; hiç karşılanmazsa ortak sorumluluk sürer; örnek cenaze namazı.",
  cols: [
    { name: "Tür", w: 2.4 },
    { name: "Sorumluluk kimde?", w: 4.0 },
    { name: "Bölümdeki örnek", w: 3.6 },
  ],
  rows: [
    {
      cells: ["Farzıayn", "şartları oluşan her yükümlü bireyin kendisinde", "beş vakit namaz, Ramazan orucu; zekât ve hac (koşullarıyla)"],
      tones: [undefined, "c", "muted"],
      detail: ["Başka birinin kendi namazını kılması, koşulları bulunan başka kişinin namaz yükümlülüğünü üstlenmiş olmaz.", "Zekât ve hacda maddi ve diğer koşullar gözetilir."],
    },
    {
      cells: ["Farzıkifaye", "yeterli bir grup yerine getirince diğerlerinden kalkar", "cenaze namazı"],
      tones: [undefined, "b", "muted"],
      detail: ["Gerekli iş yeterli bir grup tarafından yapılınca diğerlerinden sorumluluk kalkar; ihtiyaç hiç karşılanmazsa ortak sorumluluk devam eder.", "Toplumsal hizmet örneğinde önce ortak ihtiyacın yeterince karşılanıp karşılanmadığını sor."],
    },
  ],
  foot: "Ayırıcı soru: Yükümlülük herkesin kendisinde mi, yoksa ihtiyacın karşılanmasında mı?",
});

// islam-ve-ibadet · 5 · Niyet, ihlas, riya.
const intent = quadFig({
  caption:
    "Görünen biçim ile iç amaç iki ayrı veridir. Satırlar eylemin çok kişi tarafından görülüp görülmediğini, sütunlar metnin gösteriş amacını açıkça verip vermediğini gösterir. Bir hücreye tıkla: o durumda hangi sonucun çıkarılabileceği açılır.",
  alt: "2×2 tablo. Sütunlar: gösteriş amacı metinde verilmiş, verilmemiş. Satırlar: çok kişi görüyor, kimse görmüyor. Riya ile eşleşme yalnız amaç açıkça verilmişse yapılabilir; görülürlük tek başına riya hükmü vermez.",
  cols: ["Amaç: gösteriş", "Amaç verilmemiş"],
  rows: ["Çok kişi görüyor", "Kimse görmüyor"],
  axis: ["Metin iç amacı açıkça bildiriyor mu?", "Satır: eylemin görülürlüğü"],
  cells: [
    { head: "Riya", text: "amaç açıkça gösteriş", tone: "warn", detail: ["Anlatıda gösteriş amacı açıkça verilmişse bunu riya kavramıyla eşleştirebilirsin."] },
    { head: "Yalnız görülür", text: "amaç verilmemiş", tone: "muted", detail: ["Sadece çok kişinin gördüğü bir yardım sahnesinden otomatik riya hükmü çıkarma; görülürlük ile gösteriş amacı aynı şey değildir."] },
    { head: "Gizli gösteriş", text: "görülmese de amaç gösteriş", tone: "warn", detail: ["Riya görülme sayısıyla değil, gösteriş amacıyla ilişkilendirilir; metindeki amaç bilgisini kullan."] },
    { head: "Bilgi eksik", text: "ne amaç ne seyirci var", tone: "muted", detail: ["İç amaç verilmediyse ihlas ya da riya diye kesin sonuç kurma; niyet bilgisini eksik bırak."] },
  ],
  foot: "Niyet eylemin amacı, ihlas bu amacın içtenlikle Allah rızasına yönelmesi, riya gösteriş için davranmadır.",
});

// din-ve-islam · 1 · Üç âlimin tanımı.
const definitions = tableFig({
  caption:
    "Bölümdeki OGM karşılaştırmasında üç âlimin din tanımı farklı noktaları öne çıkarır; ortak bağ ilahî kaynaktır. Bir âlime tıkla: tanımın odağı ve okuma uyarısı açılır.",
  alt: "Üç satırlı tablo. Tehânevî: dünya iyiliği ve ahiret kurtuluşu. Cürcânî: peygamberin bildirdiği gerçeklerin benimsenmesi. Elmalılı Hamdi Yazır: hür iradeyle iyi davranışa yönelme. Ortak bağ: ilahî kaynak.",
  cols: [
    { name: "Âlim", w: 3.4 },
    { name: "Tanımda öne çıkan", w: 6.6 },
  ],
  rows: [
    { cells: ["Tehânevî", "dünya iyiliği ve ahiret kurtuluşu"], tones: [undefined, "c"], detail: ["Tehânevî dünya iyiliği ve ahiret kurtuluşunu öne çıkarır.", "Bu tanımdaki ahiret vurgusunu öbür iki kısa alıntıda açıkça yazılmış gibi gösterme."] },
    { cells: ["Cürcânî", "peygamberin bildirdiği gerçeklerin benimsenmesi"], tones: [undefined, "b"], detail: ["Cürcânî peygamberin bildirdiği gerçeklerin benimsenmesini öne çıkarır."] },
    { cells: ["Elmalılı Hamdi Yazır", "hür iradeyle iyi davranışa yönelme"], tones: [undefined, "a"], detail: ["Elmalılı Hamdi Yazır hür iradeyle iyi davranışa yönelmeyi öne çıkarır."] },
  ],
  foot: "Soru yalnız ortak yönü istiyorsa her tanımda bulunan dayanağı ara: ilahî kaynak.",
});

// din-ve-islam · 2 · Tasdik, ikrar, amel.
const faithLevels = flowFig({
  caption:
    "Bölümdeki açıklama sırası: içten benimseme, sözle bildirme, buna uygun eylem. İleri ile her düzeyi aç. Üç terim farklı düzeyleri adlandırır; tek bir dış davranıştan kişinin iç dünyası hakkında kesin hüküm kurulmaz.",
  alt: "Üç kart alt alta, oklarla bağlı: tasdik, içten onaylama; ikrar, inandığını sözle ifade etme; amel, davranış ve eylem boyutu.",
  nodes: [
    { head: "Tasdik", text: "içten onaylama, kalben kabul", tone: "c", note: "Tasdik içten onaylama boyutudur; sözle söyleme ya da davranıştan ayrı okunur." },
    { head: "İkrar", text: "inandığını sözle ifade etme", tone: "b", note: "İkrar inandığını sözle bildirmedir; her gündelik söz otomatik dinî ikrar değildir." },
    { head: "Amel", text: "davranış ve eylem boyutu", tone: "a", note: "Amel eylem boyutudur; söz vermek ile sözü yerine getirmek arasındaki fark ikrar ile amel farkına benzer." },
  ],
  steps: ["Tasdik", "İkrar", "Amel"],
  reveal: true,
  foot: "Kavramı tanımak ile gerçek bir kişiye inanç kimliği atamak aynı işlem değildir.",
});

// din-ve-islam · 3 · Altı esas ile beş şart.
const twoLists = treeFig({
  caption:
    "Altı iman esası ile İslam’ın beş şartı iki ayrı sınıflamadır: biri inancın yöneldiği temel başlıkları, öteki temel uygulamaları düzenler. Bir öğeye tıkla: hangi listede olduğu ve neden açılır.",
  alt: "İki dallı ağaç. Altı iman esası: Allah, melekler, kitaplar, peygamberler, ahiret, kader. Beş şart: kelimeişehadet, namaz, Ramazan orucu, zekât, hac.",
  root: "İki ayrı liste",
  branches: [
    {
      label: "Altı iman esası",
      title: "Altı iman esası",
      tone: "c",
      detail: ["Allah’a, meleklere, kitaplara, peygamberlere, ahirete ve kadere inanma; liste bir ibadet takvimi veya davranış puanlama ölçeği değildir."],
      leaves: [
        { label: "Allah’a iman", title: "Allah’a iman", detail: ["İnanç esasıdır."] },
        { label: "meleklere iman", title: "Meleklere iman", detail: ["Meleklere inanma inanç esasıdır; namaz ise belirli bir ibadettir."] },
        { label: "kitaplara iman", title: "Kitaplara iman", detail: ["İnanç esasıdır."] },
        { label: "peygamberlere iman", title: "Peygamberlere iman", detail: ["İnanç esasıdır."] },
        { label: "ahirete iman", title: "Ahirete iman", detail: ["İnanç esasıdır."] },
        { label: "kadere iman", title: "Kadere iman", detail: ["İnanç esasıdır."] },
      ],
    },
    {
      label: "Beş şart",
      title: "İslam’ın beş şartı",
      tone: "b",
      detail: ["Kelimeişehadet, namaz, Ramazan orucu, zekât ve hac; şehadet inancın sözle bildirilmesiyle, diğerleri temel uygulamalarla ilişkilidir."],
      leaves: [
        { label: "kelimeişehadet", title: "Kelimeişehadet", detail: ["İnancın sözle bildirilmesiyle ilişkilidir."] },
        { label: "namaz", title: "Namaz", detail: ["Temel uygulamalardandır."] },
        { label: "Ramazan orucu", title: "Ramazan orucu", detail: ["Temel uygulamalardandır."] },
        { label: "zekât", title: "Zekât", detail: ["Kişiye ilişkin yükümlülük şartları ayrıca vardır."] },
        { label: "hac", title: "Hac ibadeti", detail: ["Kişiye ilişkin yükümlülük şartları ayrıca vardır."] },
      ],
    },
  ],
  foot: "Listede bulunmak herkesin her koşulda aynı yükümlülüğe sahip olduğu anlamına gelmez.",
});

// din-ve-islam · 4 · Cibril hadisi: iman, İslam, ihsan.
const jibril = tableFig({
  caption:
    "Cibril hadisi adıyla anılan öğretimde üç başlık birlikte açıklanır ve her biri ayrı bir odak taşır. Bir başlığa tıkla: odağı ve karıştırılan nokta açılır.",
  alt: "Üç satırlı tablo. İman: temel inançlar. İslam: temel uygulamalar. İhsan: Allah’ın gözetimi bilinciyle özenli kulluk.",
  cols: [
    { name: "Başlık", w: 2.6 },
    { name: "Odağı", w: 7.4 },
  ],
  rows: [
    { cells: ["İman", "temel inançlar"], tones: [undefined, "c"], detail: ["İman temel inançları ilişkilendirir."] },
    { cells: ["İslam", "temel uygulamalar"], tones: [undefined, "b"], detail: ["İslam temel uygulamaları ilişkilendirir."] },
    { cells: ["İhsan", "Allah’ın gözetimi bilinciyle özenli kulluk"], tones: [undefined, "a"], detail: ["İhsan eylemin bilinç ve özen boyutunu anlatır; bir ibadetin adı ya da altı iman esasına eklenen yedinci madde değildir.", "Başkasına iyilik yapmak gibi başka kullanımları da vardır; bağlam belirleyicidir."] },
  ],
  foot: "Üç başlık birbiriyle bağlantılı farklı odaklardır.",
});

export const religionFigures061Worship: Record<string, Record<string, FigureDef>> = {
  "islam-ve-ibadet": {
    "Dar kapsam: biçimi belirli ibadetler": scope,
    "Âbit, mabet ve mabut": triad,
    "Efâlimükellefin: davranışların hüküm dili": rulings,
    "Farzıkifaye: ortak sorumluluk": kifaye,
    "Niyet, ihlas ve riya": intent,
  },
  "din-ve-islam": {
    "Üç âlimin tanımını karşılaştır": definitions,
    "İkrar ve amel": faithLevels,
    "İslam’ın beş şartı": twoLists,
    "Cibril hadisi ve ihsan": jibril,
  },
};
