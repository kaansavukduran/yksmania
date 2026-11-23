import { txt, type Lesson } from "../../src/domain/model";
import type { CheatSheet } from "../../src/learning/cheatsheetContent";
import type { LessonGuide } from "../../src/learning/guides/types";
import { beforeScientificRevision } from "./before-scientific-revision";

const lessonId = "tyt-mat-asal-kaynak-032";
const topicId = `topic-${lessonId}`;
const oldSource = "Aurelia TYT Asal Sayılar kopya kağıdı,05.11.2026 / içerik 1.1:14 PDF sayfasının öğretim uyarlaması.";
const newSource = "Aurelia TYT Asal Sayılar kopya kağıdı, 19.11.2026, içerik 1.2. PDF’nin 14 sayfasından öğretim uyarlaması.";
const methodTitle = "Yöntem seç: karar ile kontrolü birlikte yaz";
const oldMethod = "Çarpanları 2,3,3 diye etiketlersen iki etiket türü fakat üç etiket vardır.";
const newMethod = "Üç kartın üzerine sırasıyla 2, 3 ve 3 yaz. İki farklı etiket görürsün ama üç kart sayarsın. Asal çarpan türü ile tekrar adedi arasında da aynı fark vardır.";
const reducedTitle = "Destek azalt: eksik adımı ve kaybolan koşulu bul";
const oldReduced = "n pozitif tam sayı ve 3(n+1) asal olsun. 3 zaten 1’den büyük asal olduğundan öteki pozitif tam çarpan n+1=1 olmalıdır. Buradan n=0 çıkar ama pozitif koşuluna uymaz; çözüm yoktur. 0 dahil doğal sayı koşulunda n=0 ve çıktı 3 geçerli olurdu. Aynı cebirsel aday iki farklı tanım kümesinde farklı sonuca götürür.";
const newReduced = "n pozitif tam sayı ve 3(n+1) asal olsun. n+1’in alması gereken değeri ve gerekçeni yaz. Ardından bulduğun n’nin pozitif tam sayı koşuluna uyup uymadığını denetle. Çözümlü örnekler bölümündeki “Eksik adımı tamamla, sonra koşula dön” kartında adımları açabilirsin.";
const newCardTransfer = "18=2·3² için üç kartın etiketleri 2, 3 ve 3 olsun. İki farklı etiket ve üç kart vardır. Pozitif bölen sayısı üs seçimlerinden (1+1)(2+1)=6 çıkar.";
const repairPrompt = {
  title: "Önce üç onarım sorusunu çöz",
  text: [
    "121’i asal saymadan önce, karekök sınırında hangi asal adayı denemelisin?",
    "14 ile 25 aralarında asal mı? Her birinin asal olup olmadığını da söyle.",
    "n pozitif tam sayı ve n²−1 asal. Uygun n’yi ve elde edilen asal sayıyı bul.",
    "Üçünü de denedikten sonra aşağıdaki Onarım çözümleri bölümünü aç.",
  ],
};
const repairSolution = {
  title: "Onarım çözümleri",
  prompt: "Her cevabın hangi koşula dayandığını kendi çözümünle karşılaştır.",
  steps: [
    "11²=121. 11 adayı sınırda olduğu için atlanmamalıdır. 121=11·11 bileşik.",
    "14 bileşik,25 bileşik. Asal türleri 2,7 ve 5 ayrıdır. EBOB 1, aralarında asal.",
    "n>1 gerekir. n−1=1 eşitliği n=2 adayını verir. 2²−1=3 asal.",
  ],
  answer: "Son aday 11’dir. 14 ile 25 aralarında asaldır ve ikisi de bileşiktir. Tek uygun n=2, elde edilen asal 3’tür.",
};

function priorSource(source: string): string {
  return source.startsWith(newSource) ? oldSource + source.slice(newSource.length) : source;
}

function priorSectionText(title: string, text: string): string {
  if (title === methodTitle) return text.replace(newMethod, oldMethod);
  if (title === reducedTitle) return text.replace(newReduced, oldReduced);
  return text;
}

export function beforeSource004Revision(
  surface: "lessons" | "questions" | "guides" | "sheets",
  id: string,
  value: unknown,
): unknown {
  if (surface === "lessons" && id === lessonId) {
    const lesson = value as Lesson;
    return {
      ...lesson,
      source: txt(priorSource(lesson.source.tr)),
      body: lesson.body.map((section) => ({
        ...section,
        text: txt(priorSectionText(section.title.tr, section.text.tr)),
      })),
    };
  }
  if (surface === "guides" && id === lessonId) {
    const guide = value as LessonGuide;
    return {
      ...guide,
      source: priorSource(guide.source),
      sections: guide.sections.map((section) => ({
        ...section,
        paragraphs: section.paragraphs.map((text) => priorSectionText(section.title, text)),
      })),
    };
  }
  if (surface === "sheets" && id === topicId) {
    const sheet = value as CheatSheet;
    return {
      ...sheet,
      source: priorSource(sheet.source),
      sections: sheet.sections
        .filter((section, i) => i !== 5 || JSON.stringify(section) !== JSON.stringify(repairPrompt))
        .map((section) => {
          if (section.title === "Bölen sınırı ve elek") {
            return {
              ...section,
              text: section.text.map((text) => text.replace(
                "Eşitlik dahildir. 49 için 7’yi de dene.",
                "Eşitlik dahil: 49’da 7, 121’de 11 gerekir.",
              )),
            };
          }
          if (section.title === "Aralarında asal ve üç sayaç") {
            return { ...section, text: section.text.filter((text, i) => i !== 1 || text !== newCardTransfer) };
          }
          return section;
        }),
      examples: sheet.examples.filter((example, i) => i !== 2 || JSON.stringify(example) !== JSON.stringify(repairSolution)),
    };
  }
  return value;
}

export function beforeLaterSourceRevisions(
  surface: "lessons" | "questions" | "guides" | "sheets",
  id: string,
  value: unknown,
): unknown {
  return beforeSource004Revision(surface, id, beforeScientificRevision(surface, id, value));
}
