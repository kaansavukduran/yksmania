import type { FigureDef } from "./figureKit";
import { flowFig, tableFig, treeFig } from "./turkishFigures060Kit";

/*
 * Forge060 TYT Felsefe · varlık felsefesi ve siyaset felsefesi. Ad ve
 * görüşler yalnız bölüm metninden alınır; sınıflama şemaları bir görüşü
 * temsil eder, doğruluğunu ölçmez ve taraf tutmaz. Ölçekli değildir.
 */

// varlik-felsefesi · 1 · Nicelik ve nitelik sınıflaması.
const beingTree = treeFig({
  caption:
    "Varlık sınıflamasının iki ayrı ekseni: kaç temel ilke (nicelik) ve temel olan ne (nitelik). Bir türe tıkla: bölümdeki düşünür örneği ve sık yapılan karıştırma açılır. Monizm tek başına materyalizm demek değildir; iki eksen birlikte kullanılır. Kavram şeması, ölçekli değildir.",
  alt: "Ağaç şema. Kökte varlık sınıflaması. Sol dal nicelik, kaç temel: monizm, düalizm, plüralizm. Sağ dal nitelik, temel ne: maddi temel, düşünsel temel, oluş ve süreç.",
  root: "Varlık: iki ayrı soru",
  branches: [
    {
      label: "Nicelik: kaç temel?",
      title: "Nicelik sorusu",
      detail: ["Sorulan, ağaç ya da taş sayısı değil, açıklamadaki bağımsız temellerin sayısıdır.", "Bir metnin iki örnek vermesi onu düalist yapmaz."],
      tone: "c",
      leaves: [
        { label: "monizm", title: "Monizm", detail: ["Varlığı tek temel ilke ya da türle açıklar: Thales çeşitli varlıkların temelini suyla açıklar.", "Dünyada yalnız tek nesne bulunduğu demek değildir."] },
        { label: "düalizm", title: "Düalizm", detail: ["İki temel türü kabul eder: Descartes’ta madde (yer kaplama) ve zihin (düşünme) birbirine indirgenemez.", "“Bedenim zihnimi etkiler” bir etkileşim bildirir; iki ayrı töz iddiası değildir."] },
        { label: "plüralizm", title: "Plüralizm (çokçuluk)", detail: ["İkiden fazla temel unsuru kabul eder: Empedokles su, toprak, hava ve ateşi birlikte temel alır.", "Düğüm sayısını değil, hangi düğümün bağımsız temel sayıldığını izle."] },
      ],
    },
    {
      label: "Nitelik: temel ne?",
      title: "Nitelik sorusu",
      detail: ["Temelin ne tür olduğunu sorar: maddi mi, düşünsel mi?", "Yalnız madde ya da zihin sözcüğünün geçmesine değil, kabul edilen ilişkiye bak."],
      tone: "b",
      leaves: [
        { label: "maddi temel", title: "Materyalizm", detail: ["Maddi gerçekliği temel alır: Demokritos atomlar, Hobbes cisim ve hareket.", "Marx’ın diyalektik materyalizminde madde değişim ve karşıtlıkla ele alınır."] },
        { label: "düşünsel temel", title: "Düşünsel temel", detail: ["Hegel’de varlık mutlak akıl ya da tin kavramıyla, gelişme ve diyalektik ilişki içinde ele alınır.", "Fârâbî’de zorunlu ve mümkün varlık ayrımı; ortak vurgu ayrıntıları silmez."] },
        { label: "oluş, süreç", title: "Oluş ve süreç", detail: ["Herakleitos’ta sürekli değişim ve düzeni; Whitehead’de süreç ve yaratıcılık.", "Ortak oluş vurgusu bütün görüşlerinin aynı olduğu anlamına gelmez."] },
      ],
    },
  ],
  foot: "Önce açıklamanın sonunda hangi unsurun temel kaldığını bul.",
});

// varlik-felsefesi · 2 · Gorgias'ın üç savı.
const gorgias = flowFig({
  caption:
    "Gorgias’a atfedilen üç sav üç ayrı aşamayı görünür kılar: varlığın imkânı, bilginin imkânı ve aktarım. İleri ile savları sırayla aç. Üçünü tek bir soruya indirgemek tartışmanın kapsamını kaybettirir. Kavram şeması, ölçekli değildir.",
  alt: "Üç kart alt alta, oklarla bağlı: hiçbir şey yoktur, varlığın imkânı; olsa da bilinemez, bilginin imkânı; bilinse de aktarılamaz, aktarım.",
  nodes: [
    { head: "Hiçbir şey yoktur", text: "varlığın imkânı: gerçekten bir şey var mı?", tone: "c", note: "“Gerçekten bir şey var mı?” varlığın imkânına yönelir." },
    { head: "Olsa da bilinemez", text: "bilginin imkânı: var olanı bilebilir miyiz?", tone: "b", note: "“Var olanı bilebilir miyiz?” bilginin imkânına yönelir." },
    { head: "Bilinse de aktarılamaz", text: "aktarım: bilgi başkasına iletilebilir mi?", tone: "a", note: "Üçüncü sav aktarım aşamasını ayırır." },
  ],
  steps: ["Varlık", "Bilgi", "Aktarım"],
  reveal: true,
  foot: "Görünüşlerin nihai gerçek olmadığını söylemek, her şeyin hiçliğini ileri sürmekle aynı değildir.",
});

// varlik-felsefesi · 3 · Reel ve ideal varlık.
const realIdeal = tableFig({
  caption:
    "Giriş sınıflamasında reel ve ideal varlık. Bir satıra tıkla: örneği ve sınıflamanın sınırı açılır. Platon’un ideaları, ideal varlığın yalnız insan zihnine bağlı olmadığını savunan önemli bir karşı örnektir.",
  alt: "Üç satırlı tablo. Reel varlık: zaman ve mekânda karşılaşılan nesneler. İdeal varlık: düşünsel olarak kavranan nesneler, sayılar ya da tümeller. Platon'un ideaları: zihinden bağımsız ideal varlık, karşı örnek.",
  cols: [
    { name: "Tür", w: 3.0 },
    { name: "Nerede karşılaşılır?", w: 4.0 },
    { name: "Not", w: 3.0 },
  ],
  rows: [
    { cells: ["reel varlık", "zaman ve mekânda", "duyulur nesneler"], tones: [undefined, "c", "muted"], detail: ["Reel varlıklar zaman ve mekânda karşılaşılan nesnelerle örneklenir.", "Duyulur nesneleri gerçek kabul etmek ayrıntılı bir görüşün yalnız bir parçasıdır."] },
    { cells: ["ideal varlık", "düşünsel olarak kavranır", "sayılar, tümeller"], tones: [undefined, "b", "muted"], detail: ["İdeal varlıklar düşünsel olarak kavranan nesnelerle örneklenir.", "Sayılar ya da tümellerin bağımsız gerçekliğini kabul etmek ayrı bir savdır."] },
    { cells: ["Platon’un ideaları", "zihinden bağımsız", "karşı örnek"], tones: [undefined, "a", "warn"], detail: ["İdealar ideal varlığın yalnız insan zihnine bağlı olmadığını savunur.", "Hangi çerçevede sınıflandığını ve hangi düşünürün savını okuduğunu belirt."] },
  ],
  foot: "Gerçekçilik zihinden bağımsız gerçekliği savunur; hangi varlıkların bağımsız olduğunda görüşler ayrılır.",
});

// varlik-felsefesi · 4 · Materyalist açıklamalar.
const materialism = tableFig({
  caption:
    "Materyalist açıklamaların ortak yönü maddi yapıyı temel almaktır; nasıl ele aldıkları ise farklıdır. Bir düşünüre tıkla: temel ve ayırt edici yön açılır. Zihinsel olayın bedenden etkilenmesi tek başına bütün varlığın maddeye indirgendiğini göstermez.",
  alt: "Üç satırlı tablo. Demokritos: atomlar, birleşme ve ayrılma hareketleri. Hobbes: cisim ve hareket. Marx: diyalektik materyalizm, değişim ve karşıtlık.",
  cols: [
    { name: "Düşünür", w: 2.8 },
    { name: "Temel", w: 3.6 },
    { name: "Ayırt edici", w: 3.6 },
  ],
  rows: [
    { cells: ["Demokritos", "atomlar ve boşluk", "birleşme-ayrılma"], tones: [undefined, "c", "muted"], detail: ["Varlığı atomlar ve onların birleşme-ayrılma hareketleriyle açıklar.", "Bu atom modern deneysel kuram değildir."] },
    { cells: ["Hobbes", "cisim", "hareket"], tones: [undefined, "c", "muted"], detail: ["Cisim ve hareketle açıklamaya yönelir.", "Doğaüstü ya da bağımsız düşünsel bir ilke yerine maddi yapı öne çıkar."] },
    { cells: ["Marx", "maddi gerçeklik", "değişim ve karşıtlık (diyalektik)"], tones: [undefined, "c", "b"], detail: ["Diyalektik materyalizmde madde değişim ve karşıtlık ilişkileriyle ele alınır.", "Bütün materyalist görüşler maddeyi durağan ya da mekanik saymaz."] },
  ],
  foot: "Sınıflama için pasajın temel kabulünü ve kapsamını açık bul.",
});

// siyaset-felsefesi · 1 · Toplum sözleşmesi.
const contract = tableFig({
  caption:
    "Toplum sözleşmesi bir gerekçe modelidir; Hobbes, Locke ve Rousseau aynı başlıkta anılır ama aynı şeyi savunmaz. Bir düşünüre tıkla: sözleşmeye niçin gerek duyulduğu ve neyin korunduğu açılır. Ders sınıflamasıdır, taraf tutmaz.",
  alt: "Üç satırlı tablo. Hobbes: ortak güvence yokluğu, güvensizlik; güvenlik için güçlü ortak yetki. Locke: doğal hakların korunması; rıza ve sınırlı yönetim. Rousseau: ortak yarar; genel irade, ortak yasa ve özgürlük.",
  cols: [
    { name: "Düşünür", w: 2.6 },
    { name: "Neden sözleşme?", w: 3.8 },
    { name: "Öne çıkan", w: 3.6 },
  ],
  rows: [
    { cells: ["Hobbes", "ortak güvence yok: çatışma, güvensizlik", "güvenlik için güçlü ortak yetki"], tones: [undefined, "muted", "c"], detail: ["Ortak siyasal güç, güvensizlikten çıkma amacıyla açıklanır.", "Doğa durumu tarihsel rapor değil, düşünce deneyidir; kendini koruma da tartışılır."] },
    { cells: ["Locke", "yaşam, özgürlük, mülkiyet korunmalı", "rıza ve sınırlı yönetim"], tones: [undefined, "muted", "b"], detail: ["Siyasal yetki doğal hakları koruma amacıyla ilişkilendirilir.", "Locke’u Hobbes’un bütün vurgularıyla özdeşleştirme."] },
    { cells: ["Rousseau", "topluluğun ortak yararı", "genel irade, ortak yasa"], tones: [undefined, "muted", "a"], detail: ["Genel irade, özel isteklerin sayısal toplamı değildir.", "Çoğunluk oyu her koşulda genel yararı gerçekleştirmez."] },
  ],
  foot: "Niçin sözleşme, hangi yetki kime, hangi amaç korunuyor: üçünü ayrı oku.",
});

// siyaset-felsefesi · 2 · Yasallık, meşruiyet, kabul.
const legitimacy = tableFig({
  caption:
    "Üç ayrı soru: yasallık, normatif meşruiyet ve fiilî kabul. Bir soruya tıkla: neyi sorduğu ve öbürleriyle neden karıştırılmaması gerektiği açılır. Tek bir “evet” üç soruyu birden çözmez.",
  alt: "Üç satırlı tablo. Yasallık: işlem yürürlükteki hukuka uygun mu? Meşruiyet: yönetme yetkisi hangi gerekçeyle haklı? Kabul: insanlar yetkiyi fiilen kabul ediyor mu?",
  cols: [
    { name: "Kavram", w: 3.0 },
    { name: "Sorduğu", w: 4.6 },
    { name: "İnceleme türü", w: 2.4 },
  ],
  rows: [
    { cells: ["yasallık", "işlem yürürlükteki hukuka uygun mu?", "hukuki"], tones: [undefined, "ink", "c"], detail: ["Yürürlükteki hukuki kurallara uygunluğu sorar.", "Yürürlükteki bir kural adalet bakımından eleştirilebilir."] },
    { cells: ["meşruiyet", "yönetme yetkisi hangi gerekçeyle haklı?", "normatif"], tones: [undefined, "ink", "b"], detail: ["Yetkinin hangi gerekçeyle haklı sayılacağını tartışır.", "Bir yönetim güçlü olup hakkı tartışmalı olabilir."] },
    { cells: ["kabul", "insanlar yetkiyi fiilen kabul ediyor mu?", "sosyolojik"], tones: [undefined, "ink", "a"], detail: ["İnsanların yetkiyi fiilen kabul edip etmediğine bakar.", "Çok kişinin kabulü normatif itirazları otomatik ortadan kaldırmaz."] },
  ],
  foot: "Kişinin gerçek kabulüyle filozofun haklılık gerekçesini karıştırma.",
});

// siyaset-felsefesi · 3 · İktidar, yönetim, egemenlik.
const power = tableFig({
  caption:
    "Aynı “güç” sözcüğü üç ayrı soruya tek cevap olmaz. Bir kavrama tıkla: neyi konu edindiği açılır. Bir yasağın fiilen uygulanması güç hakkında bilgi verir; haklılık sorusunu kendiliğinden cevaplamaz.",
  alt: "Üç satırlı tablo. İktidar: karar alma ve uygulama gücü. Yönetim: bu gücün hangi kurum ve işlemlerle kullanıldığı. Egemenlik: en yüksek yetkinin kaynağı ve sınırları.",
  cols: [
    { name: "Kavram", w: 3.0 },
    { name: "Konu edindiği", w: 7.0 },
  ],
  rows: [
    { cells: ["iktidar", "karar alabilme ve uygulayabilme gücü"], tones: [undefined, "c"], detail: ["Karar alabilme ve bunları uygulayabilme gücüyle ilişkilidir.", "Fiilî uygulama, haklılık sorusunu yanıtlamaz."] },
    { cells: ["yönetim", "gücün hangi kurum ve işlemlerle kullanıldığı"], tones: [undefined, "b"], detail: ["Gücün kullanıldığı kurum ve işlemleri konu edinir.", "Kullanımın nasıl düzenlendiğini sor."] },
    { cells: ["egemenlik", "en yüksek yetkinin kaynağı ve sınırları"], tones: [undefined, "a"], detail: ["En yüksek yetkinin kaynağını ve sınırlarını konu edinir.", "Egemenlik sınırsız olmak zorunda değildir; anayasa, hukuk, insan hakları ve denetimle tartışılır."] },
  ],
  foot: "Soruda kaynak kimde, kullanım nasıl düzenleniyor, sınır ne: üçünü ayır.",
});

// siyaset-felsefesi · 4 · Weber'in otorite tipleri.
const weber = tableFig({
  caption:
    "Weber’in ideal tipleri: itaat hangi dayanağa bağlanıyor? Bir tipe tıkla: dayanağı ve sık yapılan daraltma açılır. İncelenen, insanların itaati nasıl anlamlandırdığıdır; örneklerin adil ilan edilmesi değildir. Gerçek düzenler bu özellikleri karışık taşıyabilir.",
  alt: "Üç satırlı tablo. Geleneksel otorite: yerleşik gelenek. Karizmatik otorite: kişiye atfedilen olağanüstü nitelik. Rasyonel-yasal otorite: kişiden bağımsız kural ve makam düzeni.",
  cols: [
    { name: "Otorite", w: 3.4 },
    { name: "Dayanak", w: 6.6 },
  ],
  rows: [
    { cells: ["geleneksel", "yerleşik geleneğin kabulü"], tones: [undefined, "c"], detail: ["Yerleşik geleneğin kabulüne dayanır.", "Yalnız tek bir miras örneğiyle sınırlama."] },
    { cells: ["karizmatik", "kişiye atfedilen olağanüstü nitelik"], tones: [undefined, "b"], detail: ["Kişiye atfedilen olağanüstü niteliğin kabulüne dayanır.", "Dayanak kişidir."] },
    { cells: ["rasyonel-yasal", "kişiden bağımsız kural ve makam düzeni"], tones: [undefined, "a"], detail: ["Kişiden bağımsız kural ve makam düzeninin kabulüne dayanır.", "Tanım gereği demokrasi değildir; demokratik olmayan düzende de bulunabilir."] },
  ],
  foot: "Soruda kişinin mi, geleneğin mi, makam ve kuralların mı dayanak yapıldığını göster.",
});

export const philosophyFigures060Being: Record<string, Record<string, FigureDef>> = {
  "varlik-felsefesi": {
    "Nitelik sorusu: temel olan nedir?": beingTree,
    "Varlığın imkânı ile bilgisi farklıdır": gorgias,
    "Gerçekçilik ve varlık türleri": realIdeal,
    "Materyalist açıklamaların ortak ve farklı yanları": materialism,
  },
  "siyaset-felsefesi": {
    "Toplum sözleşmesi bir gerekçe modelidir": contract,
    "Meşruiyet, yasallık ve kabulü farklı oku": legitimacy,
    "İktidar, yönetim ve egemenliği ayır": power,
    "Weber: itaat hangi dayanağa bağlanıyor?": weber,
  },
};
