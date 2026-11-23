import type { Lesson } from "../../src/domain/model";
import type { CheatSheet } from "../../src/learning/cheatsheetContent";
import type { LessonGuide } from "../../src/learning/guides/types";

const lessonId = "tyt-mat-rasyonel-kaynak-035";
const topicId = `topic-${lessonId}`;
const changes = {
  "guideSigns": {
    "previous": "Paydalar aynı ve pozitifse büyük pay büyük sayıyı verir: −3/8>−5/8, çünkü −3>−5. Pozitif payları aynı olan kesirlerde ise küçük pozitif payda daha büyük parça verir: 3/4>3/7. Bu ikinci kuraldaki pozitif pay koşulunu atlama: −3/4<−3/7.",
    "proposed": "Paydalar aynı ve pozitifse büyük pay büyük sayıyı verir: −3/8>−5/8, çünkü −3>−5. Paylar aynı ve pozitifse küçük pozitif payda daha büyük kesir verir: 3/4>3/7. Paylar aynı ve negatifse pozitif paydalardaki sıra tersine döner: −3/4<−3/7. −3/4’ün sıfıra uzaklığı 3/4, −3/7’ninki 3/7’dir. Sıfırın solunda daha uzaktaki −3/4 daha küçüktür."
  },
  "guideMethods": {
    "after": "M4’te önce 1/3, sonra kalanın 1/2’si kullanılırsa 1/3 kalır. İki kullanım da ilk bütüne aitse kalan 1−1/3−1/2=1/6’dır; kalan çarpımı uygulanamaz. M5’te 0,(12) için 99x=12; sonlu 0,12 için 100x=12’dir. Sembolik olarak benzemek aynı koşulu sağlamak değildir.",
    "added": [
      "Eş büyüklükte iki kap 7/8 ve 8/9 dolu olsun. Boş payları 1/8 ve 1/9’dur. 1/9<1/8 olduğu için 8/9 dolu olan kap daha doludur. Ortak paydada 7/8=63/72 ve 8/9=64/72 sonucu doğrular.",
      "90 birim stokun 1/3’ü gidince 30 birim çıkar ve 60 kalır. Kalan 60 birimin 1/6’sı 10 birimdir. İkinci kullanımın ardından 60−10=50 birim kalır. İkinci kesrin bütünü 60 birimdir.",
      "Tam ölçüm oranı 0,(36) ise 36 sonsuza dek tekrar eder. x=0,(36) için 100x=36+x olur. Buradan 99x=36 ve x=36/99=4/11 gelir. Sonlu 0,36 ise 36/100=9/25’tir. 4/11=100/275 ve 9/25=99/275 olduğundan değerler farklıdır."
    ]
  },
  "sheetSigns": {
    "previous": "Önce paydaları pozitif yaz. Ortak paydada büyük pay büyük sayıdır. Aynı pozitif pay için küçük pozitif payda büyük kesirdir; negatif payda veya negatif pay koşuluna kör taşınmaz. Çapraz karşılaştırmada pozitif paydalarla yön korunur.",
    "proposed": "Önce paydaları pozitif yaz. Aynı pozitif paydada büyük pay büyük sayıyı verir. Pozitif paydalarla ortak pay pozitifse 3/4>3/7, ortak pay negatifse −3/4<−3/7. Çapraz karşılaştırmada pozitif paydalarla yön korunur."
  },
  "sheetFill": {
    "after": "7/8<11/12: ortak paylar 21/24<22/24, eksikler 1/8>1/12, çapraz 84<88. 13/16<17/20: eksikler 3/16>3/20. Farklı paylı eksiklerde yalnız payda yetmez: 5/8>7/12.",
    "added": [
      "7/8 ve 8/9 dolulukta boş paylar 1/8 ve 1/9’dur. 1/9 daha küçük olduğu için 8/9 dolu olan kap daha doludur."
    ]
  },
  "sheetDecimal": {
    "after": "1,2(3)=37/30: 100x−10x=111. Yalnız 3 devreder. 1,(23)=122/99; 123/99=1,(24). Yuvarlanan 0,1667 ile tam 1/6 aynı sayı değildir.",
    "added": [
      "0,(36)=36/99=4/11. Sonlu 0,36=36/100=9/25. Bu iki sayının farkı 4/11−9/25=1/275’tir."
    ]
  },
  "sheetReverseExercise": {
    "previous": "1/4 sonra kalanın 1/3’ü, son 40 L → x=80 L; 80→60→40. 1/5 sonra kalanın 1/4’ü, son 18 → x=30. 1/3 sonra kalanın 1/4’ü, son 15 → x=30.",
    "proposed": "Önce 1/4, sonra kalanın 1/3’ü kullanılır ve 40 L kalırsa başlangıç 80 L’dir. Önce 1/3, sonra kalanın 1/4’ü kullanılır ve 15 kalırsa başlangıç 30’dur. “İlk satırı verilen modeli tamamla” örneğinde başlangıcı kendin bulup çözümü açabilirsin."
  },
  "sheetStock": {
    "after": "Başlangıç 24, önce 1/2 sonra kalanın 1/3’ü → 8 kalır; ikinci kullanım başlangıcın 1/3’ü olsa 4 kalır. Kalan çarpanı 0 ise son 0’dan tek başlangıç çıkarılmaz.",
    "added": [
      "90 birim stoktan önce 30 (başlangıcın 1/3’ü), sonra 10 (kalan 60’ın 1/6’sı) gider. Son kalan 50 birimdir."
    ]
  },
  "source": {
    "previous": "Aurelia TYT Rasyonel Sayılar kopya kağıdı V5 / içerik 1.0, 13 sayfalık sürümden öğretim uyarlaması.",
    "proposed": "Aurelia TYT Rasyonel Sayılar kopya kağıdı, 19.11.2026, içerik 1.1 / Format V5. PDF’nin 13 sayfasından öğretim uyarlaması."
  }
};
const addedSheetExample = {
  title: "İlk satırı verilen modeli tamamla",
  prompt: "Önce bir miktarın 1/5’i, sonra kalanın 1/4’ü kullanılıyor; 18 kalıyor. (1−1/4)(1−1/5)x=18 satırını tamamla.",
  steps: [
    "Kullanılan oran değil, her adımda kalan oran çarpılır.",
    "4 ortak çarpanı bütün çarpımda bölünür.",
    "İkinci 6, ilk miktarın değil 24’ün 1/4’üdür.",
  ],
  answer: "30",
};

type Replacement = { previous: string; proposed: string };
type Addition = { after: string; added: string[] };

function undoExact(text: string, { previous, proposed }: Replacement): string {
  return text === proposed ? previous : text;
}

function undoAppend(text: string[], { after, added }: Addition): string[] {
  const start = text.length - added.length;
  return start > 0 && text[start - 1] === after && added.every((p, i) => p === text[start + i])
    ? text.slice(0, start)
    : text;
}

function priorGuideText(title: string, text: string[]): string[] {
  if (title === "Pay ve payda kısayollarının koşullarını sor") {
    return text.map((p, i) => i === 0 ? undoExact(p, changes.guideSigns) : p);
  }
  if (title === "Soruyu görünüşünden değil işlem koşulundan tanı") {
    return undoAppend(text, changes.guideMethods);
  }
  return text;
}

function priorSheetText(title: string, text: string[]): string[] {
  if (title === "Sıralama ve eksikler") {
    return undoAppend(text, changes.sheetFill).map((p, i) => i === 0 ? undoExact(p, changes.sheetSigns) : p);
  }
  if (title === "Ondalık ve devir") return undoAppend(text, changes.sheetDecimal);
  if (title === "Değişen bütün ve tersine çözüm") {
    return undoAppend(text, changes.sheetStock).map((p, i) => i === 1 ? undoExact(p, changes.sheetReverseExercise) : p);
  }
  return text;
}

function priorSource(text: string): string {
  return text.startsWith(changes.source.proposed)
    ? changes.source.previous + text.slice(changes.source.proposed.length)
    : text;
}

export function beforeSource009Revision(
  surface: "lessons" | "questions" | "guides" | "sheets",
  id: string,
  value: unknown,
): unknown {
  if (surface === "lessons" && id === lessonId) {
    const lesson = value as Lesson;
    return {
      ...lesson,
      source: { ...lesson.source, tr: priorSource(lesson.source.tr) },
      body: lesson.body.map((section) => ({
        ...section,
        text: { ...section.text, tr: priorGuideText(section.title.tr, section.text.tr.split("\n\n")).join("\n\n") },
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
        paragraphs: priorGuideText(section.title, section.paragraphs),
      })),
    };
  }
  if (surface === "sheets" && id === topicId) {
    const sheet = value as CheatSheet;
    return {
      ...sheet,
      source: priorSource(sheet.source),
      sections: sheet.sections.map((section) => ({
        ...section,
        text: priorSheetText(section.title, section.text),
      })),
      examples: sheet.examples.filter((item, i) => i !== 2 || JSON.stringify(item) !== JSON.stringify(addedSheetExample)),
    };
  }
  return value;
}
