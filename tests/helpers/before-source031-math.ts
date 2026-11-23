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
];

const additions = new Set(revisions.flatMap(({ appendedQuestions }) => appendedQuestions));

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

export function beforeSource031Teaching(
  surface: "lessons" | "questions" | "guides" | "sheets",
  id: string,
  value: unknown,
): unknown {
  const prior = revisions.find((revision) => (surface === "sheets" ? revision.topic : revision.lesson) === id);
  if (!prior || !value) return value;
  if (surface === "lessons") {
    const lesson = value as Lesson;
    return { ...lesson, body: lesson.body.slice(0, prior.sections), questions: beforeSource031Questions(lesson.questions), source: txt(prior.oldSource) };
  }
  if (surface === "guides") {
    const guide = value as LessonGuide;
    return {
      ...guide,
      sections: guide.sections.slice(0, prior.sections),
      examples: guide.examples.slice(0, prior.examples),
      recall: guide.recall.slice(0, prior.recall),
      source: prior.oldSource,
    };
  }
  if (surface === "sheets") {
    const sheet = value as CheatSheet;
    return {
      ...sheet,
      sections: sheet.sections.slice(0, prior.sections),
      examples: sheet.examples.slice(0, prior.examples),
      cautions: sheet.cautions.slice(0, prior.examples),
      recall: sheet.recall.slice(0, prior.recall),
      source: prior.oldSource,
    };
  }
  return value;
}
