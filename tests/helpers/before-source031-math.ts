import { txt, type Lesson } from "../../src/domain/model";
import type { CheatSheet } from "../../src/learning/cheatsheetContent";
import type { LessonGuide } from "../../src/learning/guides/types";

const revisions = [
  {
    lesson: "koklu-sayilar", topic: "detail-208", sections: 10, examples: 5, recall: 5,
    appendedQuestions: [
      "benzer-kok", "tek-koklu-payda", "pozitif-siralama", "koklu-denklem", "alan-cevre",
      "kenarin-gosterimi", "isareti-degisen-denklem", "sahte-adayi-onar", "sifir-eslenigi-onar",
    ].map((id) => `koklu-sayilar-015-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özeti, basılı s. 42–44 (PDF 44–46); Aurelia 015 Köklü Sayılar, PDF s. 1–3. Esas kök/denklem kökü ve negatif taban koşulları ayrılarak yazılmış özgün anlatım, model ve sorular; resmî soru aktarımı değildir.",
  },
  {
    lesson: "oran-oranti", topic: "detail-209", sections: 9, examples: 5, recall: 5,
    appendedQuestions: ["karisim-butunu", "esit-gecisler", "iki-kat-is", "fark-ve-oran-onar", "kisi-saat-ve-gun"].map((id) => `oran-oranti-016-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özeti, basılı s. 45–46 (PDF 47–48); Aurelia 016 Oran Orantı, PDF s. 1–3. Verim, iş, ücret ve birim koşulları açık tutulan özgün anlatım ve sorular; resmî soru aktarımı değildir.",
  },
  {
    lesson: "sayi-problemleri", topic: "detail-210", sections: 8, examples: 4, recall: 4,
    appendedQuestions: ["kismi-ve-bos-sira", "kalan-ve-baslangic", "iki-sayimla-kullanilmayan", "celisen-kullanim-onar"].map((id) => `sayi-problemleri-017-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri, basılı s.47 (PDF 49); Aurelia 017 Sayı Problemleri, öğretim s.1–3 ve 5–6. Kaynak kapsamına göre yazılmış özgün anlatım, modeller ve alıştırmalar; resmî ÖSYM sorusu değildir.",
  },
  {
    lesson: "kesir-problemleri", topic: "detail-211", sections: 8, examples: 4, recall: 4,
    appendedQuestions: ["sifir-kalan-siniri", "ardisik-ekok-tam-adet", "bire-yakin-kesirler", "yeni-butun-sabit-pay", "kesirli-sonuc-birim"].map((id) => `kesir-problemleri-018-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri, basılı s.48 (PDF 50); Aurelia 018 Kesir Problemleri, öğretim s.1–3 ve 5–6. Özgün açıklama, çubuk modeller ve alıştırmalar; kaynakların resmî arşiv atıfları yeni resmî soru sayılmaz.",
  },
  {
    lesson: "yas-problemleri", topic: "detail-212", sections: 8, examples: 4, recall: 4,
    appendedQuestions: ["tamamlanan-ve-girilen-yas", "yeni-uye-yetersiz-veri", "iki-tarih-tek-kisi-kosulu", "iki-kesin-yas-siniri", "iki-dogum-yonu", "hizmet-yili-parantez-onar"].map((id) => `yas-problemleri-019-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri, basılı s.49 (PDF 51); Aurelia 019 Yaş Problemleri, öğretim s.1–6. Kişi-zaman tabloları ve özgün çözümler esas alındı; resmî kitapçık soruları bu bankaya aktarılmadı.",
  },
  {
    lesson: "yuzde-problemleri", topic: "detail-213", sections: 8, examples: 4, recall: 4,
    appendedQuestions: ["farkli-kapasite", "grup-buyuklugu", "tutar-olcegi", "kenar-kosulu", "yuzde-ve-litre-onar", "ortak-katilan"].map((id) => `yuzde-problemleri-020-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri, basılı s.51 (PDF 53); Aurelia 020 Yüzde Problemleri, öğretim s.1–8. Özgün örneklerle taban, çarpan ve ağırlık kapsamı işlendi. Resmî sınav arşivinin bütünü tarandı iddiası yoktur.",
  },
  {
    lesson: "kar-zarar-problemleri", topic: "detail-214", sections: 8, examples: 5, recall: 4,
    appendedQuestions: ["korunan-kar-indirim", "gider-adet-ayri", "fireli-gelir", "grupta-eksik-fiyat", "esit-satis-farkli-oran", "iki-satis-siniri"].map((id) => `kar-zarar-problemleri-021-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri, basılı s.52 (PDF 54); Aurelia 021 Kâr Zarar Problemleri, öğretim s.1–8. Kapsama dayalı özgün anlatım, fiyat ve başabaş modelleri; sorular resmî ÖSYM maddesi olarak sunulmaz.",
  },
  {
    lesson: "faiz-problemleri", topic: "detail-215", sections: 8, examples: 4, recall: 4,
    appendedQuestions: [
      "iki-gun-kurali", "farkli-sure-iki-kol", "esit-katsayi-iki-rapor", "sifir-getiriyi-bolme",
      "degisen-sure-karsilastirma", "donem-degisen-yeniden-yatirma",
    ].map((id) => `faiz-problemleri-022-${id}`),
    oldSource: "Aurelia 022 Faiz Problemleri, öğretim ve özgün örnekler s. 1–6. Kaynak kapsamına dayalı özgün öğretim ve zaman-faiz modeli; bağlantılı OGM/ÖSYM belgeleri bu ünitede bağımsız doğrulanmış sayılmaz.",
  },
  {
    lesson: "karisim-problemleri", topic: "detail-216", sections: 8, examples: 4, recall: 4,
    appendedQuestions: [
      "hedeften-iki-kutle", "bilinmeyen-yuzde-sinir", "ayni-miktar-uc-islem",
      "iki-kez-farkli-yerine-koy", "toplam-bedelden-birim-fiyat", "su-hedefinde-saf-tuz",
    ].map((id) => `karisim-problemleri-023-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri, basılı s. 53/PDF 55; Aurelia 023 Karışım Problemleri, öğretim s. 1–6. Kütle korunumuna dayalı özgün anlatım ve sorular; resmî soru aktarımı değildir.",
  },
  {
    lesson: "isci-problemleri", topic: "detail-217", sections: 8, examples: 4, recall: 4,
    appendedQuestions: [
      "ortak-dosya-birimi", "iki-grubu-kisiye-indir", "vardiyada-bitis-saati",
      "birlikte-daha-yavas", "bitmis-urun-kapasitesi", "ara-verip-ekip-olma",
    ].map((id) => `isci-problemleri-024-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri basılı s. 50/PDF 52; Aurelia 024 İşçi Problemleri öğretim s. 1–9. Bağımsız sabit hız ve evre koşullarıyla özgün öğretim; resmî soru aktarımı yoktur.",
  },
  {
    lesson: "havuz-problemleri", topic: "detail-218", sections: 8, examples: 4, recall: 4,
    appendedQuestions: [
      "bosalma-sonrasi-gercek-cikis", "yan-kacak-sinirinda-dur", "gecikmeli-giris-eszamanli-kapanis",
      "iki-kesitli-kapta-yukseklik", "iki-grafik-ayni-baslangic", "tasmanin-sonraki-evreye-etkisi",
    ].map((id) => `havuz-problemleri-025-${id}`),
    oldSource: "Aurelia 025 İşçi-Havuz Problemleri öğretim s. 1–8; MEBİ TYT Matematik PDF 52’deki ortak iş hızı önbilgisi. Sabit debi, başlangıç ve kapasite sınırlarıyla özgün model/sorular; bağlı resmî arşiv bağımsız incelenmiş sayılmaz.",
  },
  {
    lesson: "hiz-problemleri", topic: "detail-219", sections: 8, examples: 4, recall: 4,
    appendedQuestions: [
      "ara-durak-iki-farkli-bekleme", "hareket-ve-yolculuk-ortalamasi", "iki-trenin-tam-gecisi",
      "akinti-esiginde-kiyiya-gore", "yonlu-yay-ucuncu-karsilasma", "iki-gun-acik-surat-araligi",
    ].map((id) => `hiz-problemleri-026-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri basılı s. 54/PDF 56; Aurelia 026 Hız Problemleri öğretim s. 1–8. İşaretli konum ve ortalama sürat ayrımıyla özgün anlatım; resmî soru/anahtar doğrulaması bu yeni sette yapılmış sayılmaz.",
  },
  {
    lesson: "grafik-problemleri", topic: "detail-220", sections: 8, examples: 4, recall: 4,
    appendedQuestions: [
      "es-olmayan-grafik-araliklari", "iki-daire-yeni-butun", "histogram-esik-sinifin-icinde",
      "ortak-uyelerin-kosullu-payi", "ayrik-olcum-ve-bilinmeyen-ara-deger", "siki-ve-dahil-uc-kesisimi",
    ].map((id) => `grafik-problemleri-027-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri PDF s. 109–112 (basılı s. 107–110); Aurelia 027 Grafik Problemleri ve 037 Veri Analizi (İstatistik), öğretim PDF s. 1–3,5–7. Özgün veri ve çözümler; eksen, ara değer, iki seri, frekans ve ağırlıklı ortalama koşulları korunur. Resmî sınav sorusu değildir.",
  },
  {
    lesson: "carpanlara-ayirma", topic: "detail-221", sections: 13, examples: 10, recall: 5,
    appendedQuestions: ["gecici-negatif-koku-ele", "iki-cift-koku-tani", "toplam-carpim-iki-us", "paydada-iki-yasak-deger", "dogrusal-gecici-degisken", "iki-kose-kare-alani", "kup-toplaminin-ara-terimleri"].map((id) => `carpanlara-ayirma-028-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri PDF s.98–102 (ortak çarpan, gruplama, kare/küp özdeşlikleri, üç terim, değişken değiştirme), s.103 rasyonel ifadeler ve s.105 çarpanlarla denklem çözümü; OGM 10. Sınıf Çarpanlara Ayırma Yöntemleri sunusu PDF s.2–9 ve OGM Video Ders Notu Çarpanlara Ayırma–Polinomlar dosyasının ortak çarpan, gruplama, özdeşlik, ikinci derece ve değişken değiştirme metinleriyle karşılaştırılan özgün anlatım. Model ve bütün çözümlü örnekler uygulama için yazılmıştır; resmî sınav sorusu değildir.",
    oldLessonSource: "OGM matematik kavramlarıyla uyumlu özgün örnek ve sorular.",
  },
  {
    lesson: "kumeler", topic: "detail-222", sections: 8, examples: 4, recall: 4,
    appendedQuestions: ["uc-grupta-yalniz-ikili", "yalniz-ikililer-verildiginde", "yalniz-ve-hicbiri", "uc-sabit-karar", "kesisimin-tumleyeni", "kisi-ve-kayit-sayisi", "iki-kosul-ve-ayri-filtre"].map((id) => `kumeler-029-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri PDF s. 66–70 (basılı s. 64–68); Aurelia 029 Kümeler, öğretim PDF s. 1–3,5–7. İki kümeli sayma, alt küme koşulları ve evrene bağlı tümleyenle özgün anlatım. Resmî soru değildir.",
  },
  {
    lesson: "kartezyen-carpim", topic: "detail-223", sections: 8, examples: 4, recall: 4,
    appendedQuestions: ["urun-farkinda-tek-kosul", "kosullu-ikili-ve-kosegen", "toplamla-uygun-yuvayi-bul", "ortak-urun-dort-kume", "bos-urun-kaynagi", "dagilmada-cifti-tek-say", "eksende-farkli-degeri-say"].map((id) => `kartezyen-carpim-030-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri PDF s. 71 (basılı s. 69); Aurelia 030 Kümeler: Kartezyen Çarpım, öğretim PDF s. 1–3,5–7. Boş kaynak istisnası, konuma göre kesişim ve doğrudan tanımdan türetilen özgün örnekler. Resmî soru değildir.",
  },
  {
    lesson: "mantik-onerme", topic: "detail-224", sections: 10, examples: 4, recall: 4,
    appendedQuestions: ["dis-kosuldan-iceri", "karsit-ve-tersin-satiri", "tek-sayilarin-toplami", "evren-icinde-karsi-ornek", "degillemede-iki-kosul", "niceleyicinin-sirasi", "hipotez-hukum-yer-degisimi", "tanim-ve-hipotez"].map((id) => `mantik-onerme-031-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri PDF s. 58–65 (basılı s. 56–63); Aurelia 031 Mantık ve Önermeler, öğretim PDF s. 1–3,5–7. Özgün tablolar, dıştan içe koşul çözümü ve sonlu alan kanıtı. Mantıksal koşul nedensellik değildir; resmî sınav sorusu sunulmaz.",
  },
  {
    lesson: "veri-analizi", topic: "detail-225", sections: 12, examples: 6, recall: 6,
    appendedQuestions: ["eksik-frekans", "ham-histogram", "uc-seri", "aralikta-esik"].map((id) => `veri-analizi-037-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri, PDF s. 109–112 / basılı s. 107–110; Aurelia 037 Veri Analizi (İstatistik), öğretim s. 1–3 ve 5–7; OGM 9. sınıf Merkezî Eğilim ve Yayılım Ölçüleri sunusu ile Verileri Değerlendiriyorum etkinliği temelinde özgün öğretim. Soru ve örnekler özgündür; resmî ÖSYM sorusu değildir. Örneklem sapmasında n−1 ile bütün anakütle sapmasında n ayrılır; küçük sapmadan kişi hakkında güvenlik veya başarı garantisi çıkarılmaz.",
  },
  {
    lesson: "tyt-geo-acilar-kaynak-pekitirme-032", topic: "topic-tyt-geo-acilar-kaynak-pekitirme-032",
    sections: 10, examples: 9, recall: 10, oldSheet: { sections: 5, examples: 2, recall: 3 },
    appendedQuestions: ["bisectors", "parallel-complement", "no-parallel", "adjacent-sum"]
      .map((id) => `tyt-geo-acilar-kaynak-pekitirme-032-source-001-${id}`),
    oldSource: "Aurelia, Geometrinin Dili ve Doğruda Açılar kopya kağıdı: 14 Kasım 2026 tarihli yedi sayfalık sürüm ve önceki dört sayfalık sürüm. Kavram ve sayısal örnekler yeniden açıklanmış, özgün öğretim soruları geliştirilmiştir. Alıştırmalar resmî sınav sorusu değildir; kaynakta atıf yapılan MEB arşivinin tamamını temsil etmez.",
  },
  {
    lesson: "tyt-geo-ucgende-acilar-031", topic: "topic-tyt-geo-ucgende-acilar-031",
    sections: 7, examples: 3, recall: 4, oldSheet: { sections: 5, examples: 2, recall: 3 },
    appendedQuestions: ["two-exterior", "mixed", "reverse", "ratio", "compound"]
      .map((id) => `tyt-geo-ucgende-acilar-031-source-002-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri, PDF 116–117 (basılı114–115); Aurelia TYT Geometri Tüm Konular ve Formüller, PDF 2. Kaynak koşulları korunarak yazılmış özgün öğretim içeriği ve özgün sorular.",
  },
  {
    lesson: "tyt-geo-ucgen-esitsizligi-031", topic: "topic-tyt-geo-ucgen-esitsizligi-031",
    sections: 7, examples: 3, recall: 4, oldSheet: { sections: 5, examples: 2, recall: 3 },
    appendedQuestions: ["common-integers", "touching-bounds", "perimeter", "obtuse", "order-chain"]
      .map((id) => `tyt-geo-ucgen-esitsizligi-031-source-003-${id}`),
    oldSource: "MEBİ TYT Matematik Konu Özetleri, PDF 118–119 (basılı116–117); Aurelia TYT Geometri Tüm Konular ve Formüller, PDF 2. Üçgen varlığı ve açık aralık koşulları denetlenerek yazılmış özgün anlatım ve özgün öğretim soruları.",
  },
  {
    lesson: "newton", topic: "detail-117",
    sections: 8, examples: 4, recall: 3, oldSheet: { sections: 8, examples: 2, recall: 3 },
    appendedQuestions: ["newton-kuvvet-ivme-grafik", "newton-sabit-kuvvet-hiz-zaman-gorselli"],
    oldLessonSource: "MEB/OGM fizik kavramlarına dayalı özgün alıştırmalar.",
    oldSource: "MEBİ AYT Fizik Konu Özetleri PDF s.23–24 ve31 (basılı21–22 ve29) ile Aurelia TYT Fizik Newton Hareket Yasaları kopya kağıdı PDF s.1–16 doğrudan okundu. Aurelia dosyasındaki diğer MEB Fizik9/11 atıfları ve ÖSYM örneği ayrıca yeni kaynak/soru doğrulaması sayılmadı. Bu kapsamlı anlatım ve örnekler uygulama için özgün yazıldı; klasik sabit kütle ve belirtilen basit temas/sürtünme koşullarıyla sınırlıdır.",
  },
];

const additions = new Set(revisions.flatMap(({ appendedQuestions }) => appendedQuestions));
additions.add("sivilarin-kaldirma-kuvveti-havada-balon");
additions.add("yay-dalgalari-atma-uretme-suresi");
additions.add("dalgalara-giris-titresim-yonu-cizimleri");
additions.add("yay-dalgalari-esit-kutle-yogunluk-cizimi");

export function beforeSource031Questions<T extends { id: string }>(questions: readonly T[]) {
  return questions.filter(({ id }) => !additions.has(id));
}

export function beforeSource032Registration(source: string) {
  const additions = [
    { prefix: "fractionProblemsSource018", pack: "fractions", source: revisions[3].oldSource },
    { prefix: "ageProblemsSource019", pack: "ages", source: revisions[4].oldSource },
    { prefix: "percentProblemsSource020", pack: "percentages", source: revisions[5].oldSource },
    { prefix: "profitProblemsSource021", pack: "profit", source: revisions[6].oldSource },
  ];
  for (const addition of additions) {
    const { prefix, pack } = addition;
    const names = ["Examples", "Practice", "Recall", "Sections", "Summary"];
    const imports = names.map((name) => `  ${prefix}${name},\n`).join("");
    source = source
      .replace(`import {\n${imports}} from "./${prefix}Revision";\n`, "")
      .replace(`    ...${prefix}Sections,\n`, "")
      .replace(`    ...${prefix}Examples,\n`, "")
      .replace(`    ...${prefix}Recall,\n`, "")
      .replace(`  source: ${prefix}Summary,\n`, `  source:\n    ${JSON.stringify(addition.source)},\n`)
      .replace(`    ...(p === ${pack} ? ${prefix}Practice : []),\n`, "");
  }
  return source;
}

export function beforeSource017Registration(source: string) {
  return source.replace(
    'import {\n  numberProblemsSource017Examples,\n  numberProblemsSource017Practice,\n  numberProblemsSource017Recall,\n  numberProblemsSource017Sections,\n  numberProblemsSource017Summary,\n} from "./numberProblemsSource017Revision";\n',
    "",
  )
    .replace("    ...numberProblemsSource017Sections,\n", "")
    .replace("    ...numberProblemsSource017Examples,\n", "")
    .replace("    ...numberProblemsSource017Recall,\n", "")
    .replace("  source: numberProblemsSource017Summary,\n", `  source:\n    ${JSON.stringify(revisions[2].oldSource)},\n`)
    .replace(
      /  questions: \[\n    \.\.\.p\.questions\.map\(\(q, i\) => \{\n([\s\S]*?)    \}\),\n    \.\.\.\(p === numbers \? numberProblemsSource017Practice : \[\]\),\n  \],/,
      (_, body: string) => `  questions: p.questions.map((q, i) => {\n${body.replace(/^ {2}/gm, "")}  }),`,
    );
}

const oldConditionalTitle = "Karşıt ters denktir; karşıt ve ters genellikle değildir";
const expandedConditionalTitle = "Karşıt ters ilk koşula, karşıt ve ters birbirine denktir";
const oldConditionalSentence =
  "Buna karşılık karşıt ve ters bazı satırlarda farklı sonuç verir; ikisini koşulsuz başlangıç teoremi gibi kullanma.";
const expandedConditionalSentence =
  "Karşıt ve ters birbirine denktir. Bu ikisi, başlangıç koşulundan bazı satırlarda farklı sonuç verir.";

function historicalConditionalText(text: string) {
  return text.replace(expandedConditionalTitle, oldConditionalTitle)
    .replace(expandedConditionalSentence, oldConditionalSentence);
}

function historicalProblemText(lesson: string, text: string) {
  if (lesson === "faiz-problemleri") {
    return text.replace(
      "İki senaryoda aynı anapara ve aynı süre kullanılmışsa ve F₂≠0 ise F₁/F₂=r₁/r₂ olur.",
      "İki senaryoda aynı anapara ve aynı süre kullanılmışsa F₁/F₂=r₁/r₂ olur.",
    );
  }
  if (lesson === "karisim-problemleri") {
    return text.replace(
      "Tuz miktarı S>0 ve hedef yüzde p>0 ise son toplam Tson=100 S/p olur. Kaybolan su T−Tson, 0 ile başlangıç suyu T−S arasında kalmalı ve son toplam pozitif olmalı. Modelde p=0, pozitif miktarda tuz korunurken elde edilemez.",
      "Yeni hedef yüzde p için son toplam Tson=100 S/p bulunur. Başlangıç toplamından bunu çıkarınca kaybolan su miktarı elde edilir.",
    );
  }
  return text;
}

export function beforeSource031Teaching(
  surface: "lessons" | "questions" | "guides" | "sheets",
  id: string,
  value: unknown,
): unknown {
  if (surface === "lessons" && (id === "sivilarin-kaldirma-kuvveti" || id === "yay-dalgalari" || id === "dalgalara-giris") && value) {
    const lesson = value as Lesson;
    return { ...lesson, questions: beforeSource031Questions(lesson.questions) };
  }
  const prior = revisions.find((revision) => (surface === "sheets" ? revision.topic : revision.lesson) === id);
  if (!prior || !value) return value;
  const repairedProblem = prior.lesson === "faiz-problemleri" || prior.lesson === "karisim-problemleri";
  if (surface === "lessons") {
    const lesson = value as Lesson;
    const body = lesson.body.slice(0, prior.sections).map((section) => (
      prior.lesson === "mantik-onerme" && section.title.tr === expandedConditionalTitle
        ? { title: txt(oldConditionalTitle), text: txt(historicalConditionalText(section.text.tr)) }
        : repairedProblem ? { ...section, text: txt(historicalProblemText(prior.lesson, section.text.tr)) } : section
    ));
    return { ...lesson, body, questions: beforeSource031Questions(lesson.questions), source: txt(prior.oldLessonSource ?? prior.oldSource) };
  }
  if (surface === "guides") {
    const guide = value as LessonGuide;
    return {
      ...guide,
      sections: guide.sections.slice(0, prior.sections).map((section) => (
        prior.lesson === "mantik-onerme" && section.title === expandedConditionalTitle
          ? { title: oldConditionalTitle, paragraphs: section.paragraphs.map(historicalConditionalText) }
          : repairedProblem ? { ...section, paragraphs: section.paragraphs.map((text) => historicalProblemText(prior.lesson, text)) } : section
      )),
      examples: guide.examples.slice(0, prior.examples),
      recall: guide.recall.slice(0, prior.recall),
      source: prior.oldSource,
    };
  }
  if (surface === "sheets") {
    const sheet = value as CheatSheet;
    const sizes = prior.oldSheet ?? prior;
    return {
      ...sheet,
      sections: sheet.sections.slice(0, sizes.sections).map((section) => (
        prior.lesson === "mantik-onerme" && section.title === expandedConditionalTitle
          ? { ...section, title: oldConditionalTitle, text: section.text.map(historicalConditionalText) }
          : repairedProblem ? { ...section, text: section.text.map((text) => historicalProblemText(prior.lesson, text)) } : section
      )),
      examples: sheet.examples.slice(0, sizes.examples),
      cautions: prior.lesson === "newton"
        ? sheet.cautions.filter((caution) => ![
            "Son hız × süre, hızın tüm süre boyunca son değerinde kaldığını varsayar. Burada hız sıfırdan arttığı için grafik alanı üçgendir.",
            "Kayma başladıktan sonra 25 N statik üst sınırını düşersen 0,2 m/s² bulursun. Bu aşamada sürtünen yüzeyler kaydığı için kullanılan değer 20 N’dur.",
          ].includes(caution))
        : prior.oldSheet ? sheet.cautions : sheet.cautions.slice(0, prior.examples),
      recall: sheet.recall.slice(0, sizes.recall),
      source: prior.oldSource,
    };
  }
  return value;
}
