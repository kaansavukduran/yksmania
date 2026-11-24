import { txt, v, vec, type El, type FigureDef } from "./figureKit";
import { CW, argFig, fitH, flowFig, frame, ladderFig, quadFig, rect, tableFig } from "./turkishFigures060Kit";

/*
 * Forge069: iki TYT Felsefe (Rönesans Felsefesi, Çağdaş Felsefe) ve iki TYT
 * Din Kültürü (Anadolu’da İslam, İslam Düşüncesinde Tasavvufi Yorumlar) kopya
 * kâğıdının öğretimi, derslerin daha önce çizimi olmayan bölümlerine özgün
 * etkileşimli figür olarak. Laboratuvarlardaki nüsha kapsamı ve kapalı grup
 * karşı örnek modelleri tekrarlanmaz; onların yanına argüman adımları, iki
 * ölçütlü tutum panosu, karar merdiveni, düşünür–eser–görüş tablosu ve
 * metinde var / yok panosu konur. Düşünür ve eser eşleşmeleri yaygın ders
 * kitabı bilgisine göre denetlendi; kâğıtların cümleleri kopyalanmadı.
 * Din Kültürü figürleri geleneklerin ders anlatımındaki yönlerini betimler;
 * hiçbir inanç ya da topluluk hakkında değer hükmü vermez. Adım ve seçim
 * düğmeleri öğrenme kaydı üretmez.
 */

/* =================== ronesans-felsefesi =================== */

const humanistFaith = flowFig({
  caption:
    "Bir tümel iddianın beş adımlı çözümlemesi: iddia, gerekçe, karşı örnek, sonuç ve sınır. İleri ile her kartı aç. İnsana ve klasik yazına yönelmek bir inanç hükmü değildir; tek uygun karşı örnek “bütün” iddiasını çürütür ama ters yönde yeni bir genelleme kurmaz.",
  alt: "Alt alta beş kart oklarla bağlı. Tümel iddia: bütün Rönesans hümanistleri dinden uzaklaştı. Gerekçe: insanın değerini ve eğitimini önemsediler. Karşı örnek: Petrarca klasik yazına yönelirken dinî bağlılığını sürdürdü. Sonuç: tümel iddia çürür. Sınır: bütün hümanistler dindardı sonucu da çıkmaz.",
  nodes: [
    { head: "Tümel iddia", text: "Bütün Rönesans hümanistleri dinden uzaklaştı.", tone: "warn", note: "Önce niceleyiciyi işaretle: “bütün” her hümanist için geçerlilik ister, bu yüzden tek uygun karşı örnek sınamaya yeter." },
    { head: "Gerekçe", text: "Çünkü insanın değerini ve eğitimini önemsediler.", tone: "c", note: "İnsana önem vermek ile bir inancı bırakmak ayrı önermelerdir; birincisi ikincisini mantıken gerektirmez." },
    { head: "Karşı örnek", text: "Petrarca klasik yazına ve insana yönelirken dinî bağlılığını sürdürdü.", tone: "b", note: "Petrarca hümanizmin öncülerinden sayılır ve dindar bir düşünür olarak anılır: iddianın kapsamına girer, yüklemini taşımaz." },
    { head: "Sonuç", text: "Tümel iddia çürür.", tone: "a", note: "Kapsama giren ve yüklemi taşımayan tek kişi “bütün” ile kurulan iddiayı yanlışlar." },
    { head: "Sınır", text: "“Bütün hümanistler dindardı” sonucu da çıkmaz.", tone: "muted", note: "Karşı örnek ters yönde genelleme kurmaz. Bir kişinin inancı hakkında açık veri varsa yalnız o kişi için kullanılır." },
  ],
  steps: ["İddia", "Gerekçe", "Karşı örnek", "Sonuç", "Sınır"],
  reveal: true,
  foot: "Odak değişimini inanç hükmüne çevirme; kişiyle dönemi ayrı tut.",
});

const authority = quadFig({
  caption:
    "Kaynağı kullanmak ile gerekçeyi denetlemek iki ayrı sorudur; ikisinin birleşimi dört tutum verir. Bir hücrenin başlığına tıkla: tutumun Rönesans’taki yeniden değerlendirme eğilimine yakınlığı açılır. Düşünsel bağımsızlık kaynaksız konuşmak değildir.",
  alt: "İki satır iki sütunlu tablo. Sütunlar: kaynağı kullanır, kaynağı kullanmaz. Satırlar: gerekçe denetimi var, gerekçe denetimi yok. Hücreler: eleştirel kullanım, kaynaksız tartışma, ünle kabul, gerekçesiz ret.",
  cols: ["kaynağı kullanır", "kaynağı kullanmaz"],
  rows: ["gerekçe denetimi var", "gerekçe denetimi yok"],
  axis: ["Kaynakla ilişki", "Satırlar gerekçenin denetlenip denetlenmediğini gösterir."],
  cells: [
    { head: "Eleştirel kullanım", text: "kaynağın savını ve kanıtını yeni soruyla tartar", tone: "a", detail: ["Rönesans’taki yeniden değerlendirme eğilimine en yakın tutum: kaynak açıkça kullanılır, savı ve dayanağı ayrı ayrı yazılır."] },
    { head: "Kaynaksız tartışma", text: "gerekçe arar ama birikimi hiç okumaz", tone: "c", detail: ["Eski birikimi okumadan yapılan eleştiri neyi eleştirdiğini gösteremez; bağımsızlık kaynağı bilmeyi dışlamaz."] },
    { head: "Ünle kabul", text: "görüşü yazarı ünlü diye doğru sayar", tone: "warn", detail: ["Ün bir görüşü incelemeye değer kılabilir ama gerekçenin yerini tutmaz. Bu tutum otoriteye dayanmaktır."] },
    { head: "Gerekçesiz ret", text: "görüşü yalnız eski olduğu için atar", tone: "warn", detail: ["Eski diye reddetmek de eski diye kabul etmek kadar dayanaksızdır; eski düşünürlerin hepsi zorunlu olarak yanılmış değildir."] },
  ],
  foot: "Rönesans eğilimi gelenekten kopuş değil, kaynağı açık ve eleştirel kullanmaktır.",
});

const galileo = argFig({
  caption:
    "Galileo’nun gemi direği düşünce deneyi, öncül ve sonuç kartlarıyla. İleri ile önce sınanan itirazı, sonra sonucu, en son kapsamı aç. Bir düşünce deneyi belirli bir itirazı geçersiz kılabilir; rakip dünya görüşünü tek başına ispatlamaz.",
  alt: "İki öncül kartı yan yana: taş bırakılmadan önce gemiyle aynı yatay hızla ilerler; ideal modelde gemi düzgün hızla gider, hava direnci yok sayılır. Oklar sonuç kartında birleşir: taş direğin dibine düşer, hareketli zeminde geride kalmaz.",
  premises: ["Taş, bırakılmadan önce gemiyle aynı yatay hızla ilerler.", "İdeal model: gemi düzgün hızla gider, hava direnci yok sayılır."],
  conclusion: "Taş direğin dibine düşer; hareketli zeminde geride kalmaz.",
  marker: "öyleyse",
  steps: [
    { label: "İtiraz", note: "Sınanan eski itiraz: Dünya dönseydi yukarıdan bırakılan cisim geride kalırdı. Galileo bunu hareket eden bir geminin direğinden bırakılan taşla düşünür." },
    { label: "Sonuç", note: "Taş gemiyle ortak yatay hareketini korur ve direğin dibine düşer; düşey düşüş, yatay hareketin olmadığını göstermez." },
    { label: "Kapsam", note: "Çürüyen yalnız bu itirazdır; Dünya’nın döndüğü bu deneyle tek başına ispatlanmış olmaz. 2025 TYT Sosyal Bilimler 14 mantığı." },
  ],
  foot: "Hızlanan gemi, büyük hava direnci ya da yana fırlatılan taş ideal modelin dışındadır.",
});

const thinkers = tableFig({
  caption:
    "Rönesans düşünürlerini yalnız adla değil, eser ve görüş çiftiyle tanı. Bir ada tıkla: görüşün hümanizmle bağı ve sık karıştırma açılır. İnsanı konu alan her metin hümanist sayılmaz; insanın değeri ile eğitim ya da klasik kültür birlikte aranır.",
  alt: "Altı satırlı tablo. Petrarca: mektuplar ve şiirler; klasik yazına dönüş, dinî bağlılıkla birlikte. Pico della Mirandola: İnsanın Onuru Üzerine; insan kendi yerini seçebilen varlıktır. Erasmus: Deliliğe Övgü; eğitim ve din adamları çevresindeki bozulmanın eleştirisi. Machiavelli: Prens; siyaset olduğu gibi incelenir. Thomas More: Ütopya; ortak mülkiyetli düşsel toplum. Montaigne: Denemeler; kendini inceleme ve şüphecilik.",
  cols: [
    { name: "Düşünür", w: 3.0 },
    { name: "Eser", w: 2.9 },
    { name: "Öne çıkan görüş", w: 4.1 },
  ],
  rows: [
    { cells: ["Petrarca", "mektuplar, şiirler", "klasik yazına dönüş, dinî bağlılıkla birlikte"], tones: [undefined, "muted", "c"], detail: ["Hümanizmin öncülerinden sayılır; klasik kültüre ilgisi dinî bağlılığını ortadan kaldırmaz.", "Onu tek başına bütün dönemin inanç tutumuna örnek yapma."] },
    { cells: ["Pico della Mirandola", "İnsanın Onuru Üzerine", "insan kendi yerini seçebilen varlıktır"], tones: [undefined, "muted", "c"], detail: ["İnsanın değeri ve kendini biçimlendirme gücü hümanizmin merkezî temasıdır.", "Bu tez insanın her koşulu sınırsızca denetlediği anlamına gelmez."] },
    { cells: ["Erasmus", "Deliliğe Övgü", "eğitim; din adamları çevresindeki bozulmanın eleştirisi"], tones: [undefined, "muted", "c"], detail: ["Erasmus klasik dil eğitimini ve iç dindarlığı savunan bir hümanisttir; eleştirisi dini reddetmek değildir."] },
    { cells: ["Machiavelli", "Prens", "siyaset olduğu gibi incelenir; devletin sürekliliği"], tones: [undefined, "muted", "b"], detail: ["Konusu siyasetin işleyişidir; insanın değerine ilişkin hümanist bir tez gibi okunmaz.", "Olanı betimlemek ile olması gerekeni söylemek farklı sorulardır."] },
    { cells: ["Thomas More", "Ütopya", "ortak mülkiyetli düşsel toplum düzeni"], tones: [undefined, "muted", "b"], detail: ["Ütopya kendi çağının toplumunu eleştirmek için kurulmuş düşsel bir düzendir; gerçek bir ülkenin tarihi değildir."] },
    { cells: ["Montaigne", "Denemeler", "kendini inceleme ve şüphecilik"], tones: [undefined, "muted", "a"], detail: ["İnsan kendi deneyimini konu edinir; kesin bilgi iddialarına karşı ölçülü bir şüphe taşır.", "Şüphecilik her bilgiyi reddetmek değildir."] },
  ],
  foot: "Bir eşleştirme sorusunda eser ile görüşü iki ayrı dayanak olarak denetle.",
});

/* =================== cagdas-felsefe =================== */

const sartre = tableFig({
  caption:
    "Sartre’ın “varoluş özden önce gelir” savı, üretilen bir araçla karşılaştırılarak. Bir satıra tıkla: o örnekte neyin önce geldiği ve neyin belirlediği açılır. Sav özellikle insan içindir; masa örneği insana, insan örneği her nesneye taşınmaz.",
  alt: "Üç satırlı tablo. Masa: önce öz, yani tasarım ve amaç; üretimden önce çizilen plan belirler. İnsan: önce varoluş; seçimler ve eylemler belirler, sorumluluk birlikte gelir. Her nesne özsüzdür iddiası: Sartre’ın savı değildir.",
  cols: [
    { name: "Örnek", w: 2.8 },
    { name: "Önce gelen", w: 3.0 },
    { name: "Belirleyen", w: 4.2 },
  ],
  rows: [
    { cells: ["Masa", "öz: tasarım ve amaç", "üretimden önce çizilen plan"], tones: [undefined, "c", "muted"], detail: ["Üretilen araçta işlev ve biçim önceden tasarlanır; burada öz varoluştan önce gelir."] },
    { cells: ["İnsan", "varoluş", "seçimler ve eylemler; sorumluluk"], tones: [undefined, "a", "muted"], detail: ["İnsan önce dünyada vardır, sonra seçimleriyle nasıl biri olacağını kurar; seçimin sonuçlarını üstlenmek de bu savın parçasıdır. 2021 TYT Sosyal Bilimler 15 mantığı."] },
    { cells: ["“Her nesne özsüzdür”", "aşırı genelleme", "Sartre’ın savı değil"], tones: [undefined, "warn", "muted"], detail: ["İnsan için kurulan sav bütün nesnelere yayılmaz. Özgürlük de bedensel, tarihsel ve toplumsal durumu yok saymak değildir."] },
  ],
  foot: "Önce cümlenin insan hakkında mı, üretilen nesne hakkında mı olduğunu yaz.",
});

/** Bergson: aynı dört notalık ezgi, ölçülen zaman ve yaşanan süre olarak. */
const bergson: FigureDef = (() => {
  const N = 4;
  const X0 = 0.3;
  const X1 = CW - 0.3;
  const GAP = 0.3;
  const W = (X1 - X0 - GAP * (N - 1)) / N;
  const H = 1.6;
  const R1 = -0.75;
  const R2 = -4.35;
  const h = -(R2 - H - 0.55) + 0.3;
  const build = (step: number) => {
    const els: El[] = [];
    const onA = step !== 1;
    const onB = step >= 1;
    els.push(txt(v(0, 0), "Saat zamanı: eşit ve ayrı birimler", "e", { small: true, bold: true, tone: onA ? "a" : "muted" }));
    for (let i = 0; i < N; i++) {
      const x0 = X0 + i * (W + GAP);
      els.push(rect(x0, R1, x0 + W, R1 - H, onA ? "c" : "muted", onA, !onA));
      els.push(txt(v(x0 + W / 2, R1 - 0.55), `nota ${i + 1}`, "c", { small: true, bold: true, tone: onA ? "ink" : "muted" }));
      els.push(txt(v(x0 + W / 2, R1 - 1.1), "1 birim", "c", { small: true, tone: onA ? "ink" : "muted" }));
    }
    els.push(txt(v(0, R1 - H - 0.55), "toplam 4 birim; parçalar sayılır ve bölünür", "e", { small: true, tone: onA ? "ink" : "muted" }));
    els.push(txt(v(0, R2 + 0.8), "Yaşanan süre: bölünmeden akan bir bütün", "e", { small: true, bold: true, tone: onB ? "a" : "muted" }));
    els.push(rect(X0, R2, X1, R2 - H, onB ? "b" : "muted", onB, !onB));
    const cx = (i: number) => X0 + i * (W + GAP) + W / 2;
    for (let i = 0; i < N; i++) {
      els.push(txt(v(cx(i), R2 - 0.55), `ses ${i + 1}`, "c", { small: true, bold: true, tone: onB ? "ink" : "muted" }));
      if (i < N - 1) els.push(vec(v(cx(i) + 0.75, R2 - 0.55), v(cx(i + 1) - 0.8, R2 - 0.55), { thin: true, tone: onB ? "ink" : "muted" }));
    }
    els.push(txt(v(CW / 2, R2 - 1.1), "önceki sesin izi sonrakine karışır", "c", { small: true, tone: onB ? "ink" : "muted" }));
    els.push(txt(v(0, R2 - H - 0.55), "ezgi notaların listesi gibi değil, bir akış olarak yaşanır", "e", { small: true, tone: onB ? "ink" : "muted" }));
    els.push(...frame(h));
    return els;
  };
  const notes = [
    "Saat zamanı eşit birimlerle ölçer: dört nota, dört birim. Ölçü toplanabilir ve istenen yerden bölünebilir; zekâ maddeyi böyle çözümleyerek pratik düzen kurar.",
    "Yaşanan süre (durée) niteliksel bir akıştır: önceki ses sonrakinin içinde sürer. Bergson’a göre sezgi bu akışı içinden, aracısız kavrama girişimidir.",
    "İki anlatım aynı ezgiyi farklı amaçla ele alır. Saat yanlış ölçmez; sezgi vurgusu da her içe doğan tahminin doğru olduğunu söylemez.",
  ];
  return {
    caption:
      "Aynı dört notalık ezgi iki biçimde: üstte saatin eşit ve ayrı birimleri, altta yaşantının bölünmeyen akışı. İleri ile önce ölçülen zamanı, sonra yaşanan süreyi, en son ikisini birlikte aç. Örnek özgün bir benzetmedir, ölçüm değildir.",
    alt: "Üstte yan yana dört ayrı kutu: nota 1’den nota 4’e, her biri 1 birim; altında toplam 4 birim yazar. Altta tek uzun kutu içinde ses 1’den ses 4’e oklarla bağlı dört ad ve önceki sesin izi sonrakine karışır yazısı.",
    maxHeight: fitH(h),
    steps: ["Saat zamanı", "Yaşanan süre", "İkisi birlikte"],
    draw: (_v, step) => ({ els: build(step), readout: [notes[Math.min(step, notes.length - 1)], "Ölçülen zaman ile yaşanan süre ayrımı bilimsel ölçümü değersiz kılmaz."] }),
  };
})();

const turkey = tableFig({
  caption:
    "Türkiye’de çağdaş felsefe çalışmalarında anılan on düşünür ve bu derste ayırt edilen çalışma alanları. Bir ada tıkla: alanın ipucu ve karıştırma uyarısı açılır. Eşleştirme kişinin bütün eserlerinin özeti değildir; soruda verilen görüşü kanıt olarak kullan.",
  alt: "On satırlı tablo. Hasan Âli Yücel: çeviri, eğitim, hümanizm. Macit Gökberk: felsefe tarihi, Türkçe felsefe dili, aydınlanma. Nusret Hızır: mantık, bilim felsefesi. Aydın Sayılı: bilim tarihi. Hilmi Ziya Ülken: Türk-İslam düşüncesi, varlık ve toplum. Takiyettin Mengüşoğlu: felsefi antropoloji. Nurettin Topçu: hareket ve isyan ahlakı. Mübahat Türker Küyel: düşünce tarihi, kültürler arası etkileşim. İoanna Kuçuradi: değer, etik, insan hakları. Uluğ Nutku: insan felsefesi, felsefenin toplumsal işlevi.",
  cols: [
    { name: "Düşünür", w: 3.9 },
    { name: "Bu derste ayırt edilen alan", w: 6.1 },
  ],
  rows: [
    { cells: ["Hasan Âli Yücel", "çeviri, eğitim ve hümanizm"], tones: [undefined, "c"], detail: ["Çeviri çalışmaları farklı birikimleri Türkçeye kazandırarak kültürel erişimi genişletir; yalnız sözcük değiştirmek değildir."] },
    { cells: ["Macit Gökberk", "felsefe tarihi, Türkçe felsefe dili, aydınlanma"], tones: [undefined, "c"], detail: ["Felsefenin anlaşılır Türkçeyle ifadesine ve yaşamla ilişkisine önem verir.", "Yücel ile aynı ülkede çalışması iki ismi özdeş yapmaz."] },
    { cells: ["Nusret Hızır", "mantık, bilim felsefesi, analitik yaklaşım"], tones: [undefined, "b"], detail: ["Bir savın yapısını incelemek ve bilimin yöntemini açıklaştırmak onunla ilişkilendirilir."] },
    { cells: ["Aydın Sayılı", "bilim tarihi"], tones: [undefined, "b"], detail: ["Bilimsel düşüncenin farklı dönem ve kültürlerde gelişimini araştırır; bilimi bugünkü sonuç listesine indirgemez."] },
    { cells: ["Hilmi Ziya Ülken", "Türk-İslam düşüncesi, varlık ve toplum"], tones: [undefined, "ink"], detail: ["Düşünce tarihi, varlık, toplum ve kültür üzerine geniş çalışmalar yapmıştır."] },
    { cells: ["Takiyettin Mengüşoğlu", "felsefi antropoloji: insan bütün yapıp etmeleriyle"], tones: [undefined, "ink"], detail: ["İnsanı bilen, eyleyen ve değer duyan bütün olarak ele alır; yalnız biyolojik yapıya indirgemez."] },
    { cells: ["Nurettin Topçu", "hareket ve isyan ahlakı"], tones: [undefined, "a"], detail: ["İsyan, ahlaki yönelişi engelleyen bencillik ve miskinliğe karşı direnmektir; her kurala nedensiz karşı çıkmak değildir."] },
    { cells: ["Mübahat Türker Küyel", "düşünce tarihi, kültürler arası etkileşim"], tones: [undefined, "ink"], detail: ["Felsefe tarihini tek uygarlığın yalıtılmış ürünü sayan anlatıları sorgular."] },
    { cells: ["İoanna Kuçuradi", "değer, etik ve insan hakları"], tones: [undefined, "a"], detail: ["Somut bir durumun değerini doğru değerlendirmeyi hazır değer yargısıyla etiketlemekten ayırır."] },
    { cells: ["Uluğ Nutku", "insan felsefesi, felsefenin toplumsal işlevi"], tones: [undefined, "a"], detail: ["Gelenekleri geliştirici ve engelleyici yönleriyle ayırma ihtiyacını eleştirel düşünceyle ilişkilendirir."] },
  ],
  foot: "Ad ezberi yerine her ismin hangi problemle anıldığını öğren.",
});

const methods = ladderFig({
  caption:
    "Beş soruluk karar merdiveni: bir cümlenin problemi hangi yönteme götürüyor? Her adım özgün bir örnek cümleyi merdivende yürütür; “evet” sağdaki yönteme, “hayır” alttaki soruya gider. Aynı çağdaş başlık altındaki yöntemler birbirinin yerine kullanılmaz.",
  alt: "Alt alta beş soru kartı. Tarihsel anlam aranıyorsa hermeneutik, Dilthey ve Gadamer. Varlık hükmü askıya alınıp deneyim betimleniyorsa fenomenoloji, Husserl. Hangi gözlemin çürüteceği soruluyorsa yanlışlanabilirlik, Popper. Toplumsal değişim üretim ilişkileriyle açıklanıyorsa tarihsel materyalizm, Marx. İnsanın seçimle kendini kurması tartışılıyorsa varoluşçuluk, Sartre. Hiçbiri değilse problemi yeniden yaz.",
  rungs: [
    { q: "Bir metnin ya da eylemin tarihsel anlamı mı aranıyor?", yes: "Hermeneutik: Dilthey, Gadamer", tone: "c" },
    { q: "Varlık hükmü askıya alınıp deneyimin verilişi mi betimleniyor?", yes: "Fenomenoloji: Husserl", tone: "b" },
    { q: "Hangi olası gözlemin savı çürüteceği mi belirleniyor?", yes: "Yanlışlanabilirlik: Popper", tone: "b" },
    { q: "Toplumsal değişim üretim ilişkileriyle mi açıklanıyor?", yes: "Tarihsel materyalizm: Marx", tone: "c" },
    { q: "İnsanın seçimleriyle kendini kurması mı tartışılıyor?", yes: "Varoluşçuluk: Sartre", tone: "a" },
  ],
  last: "Hiçbiri: problemi yeniden yaz, adı ezberden seçme",
  walks: [
    { step: "Belge", example: "Eski bir vakıf belgesindeki “hizmet” sözcüğünün o dönemdeki anlamı araştırılıyor.", stop: 0, why: "Sözlük karşılığı yalnız ilk ipucudur; dönemin kullanımı, yazarın amacı ve metnin bütünü birlikte okunur." },
    { step: "Anımsama", example: "Bir çeşmenin gerçekten orada olup olmadığına karar verilmeden, onu anımsamanın görmekten farkı betimleniyor.", stop: 1, why: "Varlık hükmü ne veriliyor ne reddediliyor; deneyimin nasıl kurulduğu inceleniyor." },
    { step: "Sınama", example: "“Bu alaşımdan bütün teller ısıtılınca uzar” savı için uzamayan bir telin neyi göstereceği önceden yazılıyor.", stop: 2, why: "Çürütme koşulu belirleniyor; savın çürütüldüğü söylenmiyor. Yanlışlanabilir olmak yanlış olmak değildir." },
    { step: "Üretim", example: "Dokumanın atölyeden fabrikaya taşınmasının aile düzenini ve hukuku nasıl değiştirdiği soruluyor.", stop: 3, why: "Açıklama maddi üretim ilişkisinden hukuk ve kültüre gidiyor; tek bir ekonomik değişim her düşünceyi mekanik olarak belirlemez." },
    { step: "Seçim", example: "Bir kişi kendisine biçilmiş hazır rolü bırakıyor ve seçtiği yaşamın sonuçlarını üstleniyor.", stop: 4, why: "Önceden tamamlanmış bir öz verilmiyor; seçim ve sorumluluk birlikte geliyor." },
    { step: "Katman", example: "Bir şiirin kâğıdı ile kültürel anlamı ayrı varlık katmanlarında inceleniyor.", stop: 5, why: "Bu Hartmann’ın katman ayrımıdır; beş sorudan hiçbiri tutmadığı için ada değil probleme dönülür." },
  ],
  foot: "Bir metin birkaç yöntemi birlikte anıyorsa her cümleyi ayrı soruya sok.",
});

/* =================== anadoluda-islam =================== */

const fields = ladderFig({
  caption:
    "Dört soruluk karar merdiveni: soru hangi alanı istiyor? Her adım özgün bir örnek cümleyi merdivende yürütür; “evet” sağdaki alana ve anılan adlara, “hayır” alttaki soruya gider. Aynı şahsiyet birden çok alanda eser verebilir; alanı sorudaki kanıt belirler.",
  alt: "Alt alta dört soru kartı. Hüküm ya da hüküm çıkarma yöntemi soruluyorsa fıkıh: Ebû Hanîfe, Şâfiî, Caferî gelenek. İnanç esaslarının temellendirilmesi soruluyorsa kelam: Mâtürîdî, Eş’arî. Manevi eğitim ya da ahlaki öğüt soruluyorsa tasavvuf: Yesevî, Mevlânâ, Yunus Emre. Meslek eğitimi ve esnaf dayanışması soruluyorsa kurum: Ahilik, Ahi Evran. Hiçbiri değilse tarihsel süreç sorusu.",
  rungs: [
    { q: "İbadet ve davranışların hükmü ya da hüküm çıkarma yöntemi mi soruluyor?", yes: "Fıkıh: Ebû Hanîfe, Şâfiî, Caferî gelenek", tone: "c" },
    { q: "İnanç esaslarının açıklanması ve temellendirilmesi mi?", yes: "Kelam: Mâtürîdî, Eş’arî", tone: "b" },
    { q: "Manevi eğitim, ahlaki öğüt ya da irfan mı?", yes: "Tasavvuf: Yesevî, Mevlânâ, Yunus Emre", tone: "a" },
    { q: "Meslek eğitimi ve esnaf dayanışması mı?", yes: "Kurum: Ahilik, Ahi Evran", tone: "c" },
  ],
  last: "Hiçbiri: tarih ve süreç sorusu olabilir, kronolojiye dön",
  walks: [
    { step: "Usul", example: "Bir eser hüküm çıkarırken delillerin hangi sırayla kullanılacağını düzenliyor.", stop: 0, why: "Hüküm çıkarma yöntemi fıkıh usulüdür; bu alanda er-Risâle ile Şâfiî anılır." },
    { step: "İnanç", example: "Bir eser inanç esaslarını akıl ve nakil delilleriyle temellendiriyor.", stop: 1, why: "İnanç esasları kelamın konusudur; Kitâbü’t-Tevhîd Mâtürîdî’nin eseridir. Akla yer vermek vahyi dışlamak değildir." },
    { step: "Öğüt", example: "Sade Türkçe manzumelerle dinî ve ahlaki öğüt veriliyor.", stop: 2, why: "Manevi öğüt tasavvufi kültüre aittir; hikmet adı ve Divân-ı Hikmet Ahmed Yesevî’yi gösterir." },
    { step: "Çırak", example: "Bir iş yerinde çırak, kalfanın yanında hem zanaat hem dürüst alışveriş öğreniyor.", stop: 3, why: "Meslek eğitimi ve iş ahlakı Ahiliğin çekirdek işlevidir." },
    { step: "751", example: "751’deki savaşın Türk toplulukları ile Abbasiler arasındaki teması artırdığı anlatılıyor.", stop: 4, why: "Bu bir ilim alanı değil, tarihsel süreç sorusudur; tek olaydan İslamlaşmanın bir anda tamamlandığı sonucu çıkmaz." },
  ],
  foot: "Önce alanı, sonra kişi ve eseri iki ayrı kanıtla eşle.",
});

const ribat = flowFig({
  caption:
    "Ribat adını taşıyan yapıların işlevi zaman ve yere göre değişmiştir. İleri ile işlevleri ve okuma kuralını sırayla aç. Bir dönemdeki hizmet, bütün ribatların her çağdaki tek kuruluş amacı değildir.",
  alt: "Alt alta dört kart oklarla bağlı. Kuruluş amacı: sınır ve stratejik yerlerde askerî amaçlı sağlam yapı. Eğitim ve tasavvuf: bazı dönem ve bölgelerde öğretim ve manevi eğitim yeri. Yol ve konaklama: yolcuyu barındırma ve yol güvenliği. Okuma kuralı: dönemi ve faaliyeti ayrı yaz.",
  nodes: [
    { head: "Kuruluş amacı", text: "sınır ve stratejik yerlerde askerî amaçlı sağlam yapı", tone: "muted", note: "Ribat önce sınır boylarında ve stratejik noktalarda askerî amaçla kullanılan sağlam yapıların adıdır." },
    { head: "Eğitim ve tasavvuf", text: "bazı dönem ve bölgelerde öğretim ve manevi eğitim yeri", tone: "b", note: "Bazı dönem ve bölgelerde ribatlar öğretim ve tasavvufi faaliyetlerin de yürütüldüğü yerlere dönüşmüştür." },
    { head: "Yol ve konaklama", text: "yolcuyu barındırma ve yol güvenliği", tone: "c", note: "Konaklama ve yol güvenliği de ribatların kazandığı işlevler arasındadır." },
    { head: "Okuma kuralı", text: "dönemi ve faaliyeti ayrı yaz", tone: "a", note: "Soruda hangi dönem ve hangi faaliyet verildiyse ona göre oku; aynı yapı zamanla farklı işler taşıyabilir." },
  ],
  steps: ["Kuruluş", "Eğitim", "Yol", "Okuma kuralı"],
  reveal: true,
  foot: "İşlev değişimi bir kurumun tarihidir; tek bir tanıma sıkıştırma.",
});

const ahiServices = tableFig({
  caption:
    "Kaynaklarda Ahi birlikleriyle anılan hizmetler ve temel hizmetlerden ayrılan seçenek. Bir faaliyete tıkla: kaynaklardaki yeri ve okuma uyarısı açılır. Olumsuz kökte kurumun çekirdek hizmetlerini önce listele, toplumsal etkiyi ana görev sayma.",
  alt: "Beş satırlı tablo. Yolcu ağırlama: anlatılan hizmet. İhtiyaç sahibine destek: anlatılan hizmet. Meslek kazandırma: çekirdek işlev. Göçmenlerin yerleşik hayata uyumu: anlatılan hizmet. Devlet adamı yetiştirme: temel hizmet değil.",
  cols: [
    { name: "Faaliyet", w: 3.9 },
    { name: "Kaynaklardaki yeri", w: 2.9 },
    { name: "Okuma", w: 3.2 },
  ],
  rows: [
    { cells: ["Yolcu ağırlama", "anlatılan hizmet", "konukseverlik"], tones: [undefined, "c", "muted"], detail: ["İbn Battûta’nın gözlemleri bu toplumsal yönü anlatır; bir seyyahın övgüsü değerli tanıklıktır ama her şehir için ölçüm değildir."] },
    { cells: ["İhtiyaç sahibine destek", "anlatılan hizmet", "dayanışma"], tones: [undefined, "c", "muted"], detail: ["Yardımlaşma Ahilikte fütüvvet değerleriyle birlikte anılır."] },
    { cells: ["Meslek kazandırma", "çekirdek işlev", "usta, kalfa, çırak"], tones: [undefined, "a", "muted"], detail: ["Gençlerin bir meslek ve meslek ahlakı edinmesi kurumun merkezindedir."] },
    { cells: ["Göçmenlerin yerleşik hayata uyumu", "anlatılan hizmet", "yerleşme ve üretim"], tones: [undefined, "c", "muted"], detail: ["Göçle gelenlerin şehir ve üretim hayatına katılması kaynaklarda anılan katkılardandır."] },
    { cells: ["Devlet adamı yetiştirme", "temel hizmet değil", "etki ana görev değildir"], tones: [undefined, "warn", "muted"], detail: ["Bazı ahilerin yerel yönetimle teması kurumun temel amacını değiştirmez; “hiçbir zaman ilişkisi olmadı” gibi daha güçlü bir iddia da çıkmaz. 2023 AYT Sosyal Bilimler-2 40 mantığı."] },
  ],
  foot: "Tarihî kurumu bugünkü bir kurumla birebir aynı örgüt sayma.",
});

const nisa = tableFig({
  caption:
    "Nisâ suresi 69. ayette (4:69) Allah’a ve elçisine itaat edenlerin birlikte anıldığı dört grup ile ayette bulunmayan iki ekleme. Bir satıra tıkla: terimin ders anlatımındaki karşılığı ya da neden eklenemeyeceği açılır. Yorum ayrı, ayetin açık içeriği ayrı yazılır.",
  alt: "Altı satırlı tablo. Peygamberler, sıddıklar, şehitler ve salihler ayette anılır. Meslek ya da kurum sıralaması ve Anadolu’daki şahsiyetlerin adları ayette anılmaz.",
  cols: [
    { name: "Öğe", w: 3.6 },
    { name: "Ayette", w: 2.1 },
    { name: "Ders anlatımındaki karşılığı", w: 4.3 },
  ],
  rows: [
    { cells: ["Peygamberler", "anılır", "Allah’ın mesajını insanlara ileten elçiler"], tones: [undefined, "c", "muted"], detail: ["Ayette anılan ilk gruptur; elçi, mesajı insanlara ulaştıran kişidir."] },
    { cells: ["Sıddıklar", "anılır", "doğrulukta ve sadakatte samimi olanlar"], tones: [undefined, "c", "muted"], detail: ["Sıddık, sözü ve özüyle doğruluğu benimseyen kişi için kullanılır."] },
    { cells: ["Şehitler", "anılır", "Allah yolunda hayatını kaybedenler"], tones: [undefined, "c", "muted"], detail: ["Dinî gelenekte Allah yolunda hayatını kaybedenler için kullanılan terimdir."] },
    { cells: ["Salihler", "anılır", "iyi ve doğru davranan kişiler"], tones: [undefined, "c", "muted"], detail: ["Salih, inancını iyi ve doğru davranışla gösteren kişidir."] },
    { cells: ["Meslek ya da kurum sıralaması", "anılmaz", "ayetin içeriğine eklenemez"], tones: [undefined, "warn", "muted"], detail: ["Bir kurumun ahlaki değerleriyle ilişki kurulabilir; ama metinde bulunmayan bir meslek üstünlüğü ayetin açık içeriği gibi sunulmaz."] },
    { cells: ["Anadolu’daki şahsiyetlerin adları", "anılmaz", "isim isim sayılmaz"], tones: [undefined, "warn", "muted"], detail: ["Ayet örneklik ve iyi kimselerle beraberlik mesajı verir; tarihî şahsiyetleri tek tek saymaz."] },
  ],
  foot: "Önce ayette gerçekten anılanı bul, sonra yorumun sınırını çiz.",
});

/* =================== islam-dusuncesinde-tasavvufi-yorumlar =================== */

const semaSemah = tableFig({
  caption:
    "Sema ile semah ad bakımından benzer, gelenek ve erkân bakımından ayrıdır. Bir satıra tıkla: hangi ipuçlarının birlikte okunacağı açılır. Yalnız “dönmek” fiili iki ritüeli ayırmaya yetmez.",
  alt: "Üç satırlı tablo. Sema: Mevlevilik; semazen, mukabele, Mesnevî, dergâh. Semah: Alevilik-Bektaşilik; cem, dede, deyiş, bağlama. Yalnız dönmek: belirlenemez; gelenek adı ya da kurum ipucu gerekir.",
  cols: [
    { name: "Ad", w: 2.4 },
    { name: "Gelenek", w: 3.9 },
    { name: "Birlikte okunacak ipuçları", w: 3.7 },
  ],
  rows: [
    { cells: ["Sema", "Mevlevilik", "semazen, mukabele, Mesnevî, dergâh"], tones: [undefined, "b", "muted"], detail: ["Mevlevi seması musiki ve zikirle ilişkili, düzenlenmiş sembolik bir törendir; katılanlara semazen denir."] },
    { cells: ["Semah", "Alevilik-Bektaşilik", "cem, dede, deyiş, bağlama"], tones: [undefined, "c", "muted"], detail: ["Semah cem erkânında müzik, deyiş ve manevi yönelişle ilişkili ritüeldir; birlik, sevgi ve Allah’ı anma öne çıkar."] },
    { cells: ["Yalnız “dönmek”", "belirlenemez", "gelenek adı ya da kurum ipucu gerekir"], tones: [undefined, "warn", "muted"], detail: ["Dönme ya da yönelme sözcüğü tek başına güvenilir ayrım değildir. Bir halk dansına da kanıtsız semah denmez."] },
  ],
  foot: "İki ritüeli tanımak onları birbirinin yerine kullanmak değildir.",
});

const semaSymbols = tableFig({
  caption:
    "Mevlevi sema anlatımında açıklanan semboller ve açıklanmayan iki ayrıntı. Bir öğeye tıkla: yorumun metne dayanıp dayanmadığı açılır. Metin bir anlam veriyorsa ondan çıkarım yapılır; süre, sayı ya da niyet kendiliğinden eklenmez.",
  alt: "Altı satırlı tablo. Sikke mezar taşıyla, hırka mezarla, tennure kefenle ilişkilendirilir; mukabele karşılıklı saygıyla baş eğme bağlamında açıklanır. Törenin süresi ve katılımcı sayısı için anlam verilmemiştir; eklenmez.",
  cols: [
    { name: "Öğe", w: 3.0 },
    { name: "Anlatımdaki karşılığı", w: 3.6 },
    { name: "Çıkarım", w: 3.4 },
  ],
  rows: [
    { cells: ["Sikke", "mezar taşı", "metne dayanır"], tones: [undefined, "muted", "c"], detail: ["Semazenin başlığı olan sikke kaynaklarda mezar taşıyla ilişkilendirilir."] },
    { cells: ["Hırka", "mezar", "metne dayanır"], tones: [undefined, "muted", "c"], detail: ["Hırka mezarla ilişkilendirilen giysidir; anlam metinde verildiği için yorum yapılabilir."] },
    { cells: ["Tennure", "kefen", "metne dayanır"], tones: [undefined, "muted", "c"], detail: ["Tennure kaynaklarda kefenle ilişkilendirilir."] },
    { cells: ["Mukabele", "karşılıklı saygıyla baş eğme", "metne dayanır"], tones: [undefined, "muted", "c"], detail: ["Mukabele bu anlatımda karşılıklı saygıyla baş eğme bağlamında açıklanır."] },
    { cells: ["Törenin süresi", "anlam verilmemiş", "eklenmez"], tones: [undefined, "muted", "warn"], detail: ["Metinde süreyi insan ömrüne bağlayan bir cümle yoksa bu bağ kesin sonuç sayılmaz. 2025 TYT Sosyal Bilimler 20 mantığı."] },
    { cells: ["Katılımcı sayısı", "verilmemiş", "eklenmez"], tones: [undefined, "muted", "warn"], detail: ["Başka bir gelenekteki on iki hizmet kavramı semada on iki kişi bulunduğunu göstermez."] },
  ],
  foot: "Sembol içeren bir anlatım, açıklanmayan her ayrıntının da sembol olduğunu göstermez.",
});

const zuhd = quadFig({
  caption:
    "Zühd bir mülkiyet ölçümü değil, gönlün mala ve hazlara bağlılığıyla ilgili bir tutumdur. İki ölçüt dört durum verir. Bir hücrenin başlığına tıkla: ders anlatımındaki değerlendirme açılır. Örnekler özgün öğretim durumlarıdır, gerçek kişiler hakkında hüküm değildir.",
  alt: "İki satır iki sütunlu tablo. Sütunlar: gönül mala bağlı değil, gönül mala aşırı bağlı. Satırlar: mal var, mal az ya da yok. Hücreler: zühdle uyumlu, aşırı bağlılık, kanaat, yokluk tek başına zühd değildir.",
  cols: ["gönül bağlı değil", "gönül aşırı bağlı"],
  rows: ["mal var", "mal az ya da yok"],
  axis: ["Gönlün mala bağlılığı", "Satırlar elde bulunan malı gösterir."],
  cells: [
    { head: "Zühdle uyumlu", text: "dürüst kazanır, ölçülü harcar, fazlasını paylaşır", tone: "a", detail: ["Malın elde bulunması zühdle çelişmez; ölçüt gönlün mala bağlanmamasıdır. Helal emek, kanaat ve paylaşma birlikte düşünülür."] },
    { head: "Aşırı bağlılık", text: "kazancı amaç edinir, paylaşmaz", tone: "warn", detail: ["Ders anlatımında zühdün karşısındaki tutum, dünya malına ve hazlara aşırı bağlanmaktır."] },
    { head: "Kanaat", text: "azla yetinir, emeğini sürdürür", tone: "c", detail: ["Azla yetinmek kanaatle ilişkilidir; üretimi ve toplumsal sorumluluğu bırakmak zühdün tanımına girmez."] },
    { head: "Yokluk tek başına değil", text: "malı az ama gönlü mala bağlı", tone: "muted", detail: ["Malı az olan biri de mala aşırı bağlı olabilir. Soruda fiilden çok bağlılık ve amaç açıklamasına bak."] },
  ],
  foot: "Zühd çalışmayı bırakmak değil, dünyaya aşırı bağlanmamaktır.",
});

const ikrar = flowFig({
  caption:
    "Cem anlatılarında ikrar, razılık ve kul hakkıyla ilgili öğeler adım adım. İleri ile her kartı aç. Sıra ve ayrıntı ocak ve bölgeye göre değişebilir; bu model gerçek bir kişinin manevi durumuna hüküm vermez.",
  alt: "Alt alta beş kart oklarla bağlı. İkrar: yola bağlılık sözü verilir. Razılık sorulur: topluluktakiler arasındaki hak ve kırgınlık ele alınır. Barıştırma: dargınlar barıştırılır. Hakkın iadesi: hak sahibine verilir, helallik alınır. Sınır: bir kişinin razılığı başkasının alacağını silmez.",
  nodes: [
    { head: "İkrar", text: "yola bağlılık sözü verilir", tone: "c", note: "İkrar bağlılık sözüdür; söz vermek ile somut bir hakkı yerine getirmek birlikte değerlendirilir." },
    { head: "Razılık sorulur", text: "topluluktakiler arasındaki hak ve kırgınlık ele alınır", tone: "b", note: "Razılık, topluluk üyelerinin aralarındaki hak ve kırgınlıkları açıkça ele alma yönüdür." },
    { head: "Barıştırma", text: "dargınlar barıştırılır", tone: "b", note: "Dargınların barıştırılması cem anlatılarında öne çıkan uygulamalardandır." },
    { head: "Hakkın iadesi", text: "hak sahibine verilir, helallik alınır", tone: "a", note: "Hakkın sahibi, konusu ve iade bilgisi ayrı verilerdir; her biri metinde ayrıca aranır." },
    { head: "Sınır", text: "bir kişinin razılığı başkasının alacağını silmez", tone: "warn", note: "Bir kişinin razı olduğunu söylemesi, başka birinin açıklanmış alacağını kendiliğinden ortadan kaldırmaz." },
  ],
  steps: ["İkrar", "Razılık", "Barıştırma", "İade", "Sınır"],
  reveal: true,
  foot: "Kul hakkı insanlar arasındaki haklardır; söz, barışma ve iade ayrı adımlardır.",
});

export const humanitiesFigures069Sheets: Record<string, Record<string, FigureDef>> = {
  "ronesans-felsefesi": {
    "Hümanizm ve dinî düşünce": humanistFaith,
    "Otoriteyi değerlendirmek": authority,
    "Doğaya yöneliş ve yeni sorular": galileo,
    "Hümanizm ve insanın değeri": thinkers,
  },
  "cagdas-felsefe": {
    "Sartre: varoluş ve öz": sartre,
    "Bergson: süre ve sezgi": bergson,
    "Türkiye’de kurumsal ve düşünsel çalışmalar": turkey,
    "Aynı sözcük farklı yöntem": methods,
  },
  "anadoluda-islam": {
    "Âlim, fakih, mutasavvıf ve veli": fields,
    "Ribatların değişen işlevi": ribat,
    "Ahilikte konukseverlik ve yerleşme": ahiServices,
    "Nisâ 69: örneklik ve birlikte olma": nisa,
  },
  "islam-dusuncesinde-tasavvufi-yorumlar": {
    "Semahın bağlamı": semaSemah,
    "Sema ve sembolik anlatım": semaSymbols,
    "Zühd ve dünyayla ilişki": zuhd,
    "İkrar, razılık ve kul hakkı": ikrar,
  },
};
