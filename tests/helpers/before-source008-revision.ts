import type { Lesson } from "../../src/domain/model";
import type { CheatSheet } from "../../src/learning/cheatsheetContent";
import type { LessonGuide } from "../../src/learning/guides/types";

const lessonId = "tyt-mat-ebob-ekok-kaynak-034";
const topicId = `topic-${lessonId}`;
const revisions = {
  "m4Guide": {
    "previous": "Aynı yapı, 6’lı ve 8’li gruplandırmada bir nesne artan toplamda da kullanılır.",
    "proposed": "49 nesneyi altışarlı kutulara ayırınca 8 kutu dolar ve bir nesne artar. Aynı 49 nesneyi bu kez sekizerli kutulara ayırınca 6 kutu dolar ve yine bir nesne artar. 49=6×8+1=8×6+1. Bu iki ayrı düzen aynı toplamı gösterir."
  },
  "m5Guide": {
    "previous": "en büyük 12 ve 12>5 olduğundan geçerlidir. Aynı sayılarda kalan 12 olsaydı",
    "proposed": "en büyük 12 ve 12>5 olduğundan geçerlidir. İki şeritten de 5 cm artık bırakınca kullanılabilir uzunluklar 60 ve 84 cm olur. Kesim kaybı yoksa 12 cm boyunda, ilk şeritten 60÷12=5 ve ikinciden 84÷12=7 parça çıkar. Toplam 12 parça elde edilir. Aynı sayılarda kalan 12 olsaydı"
  },
  "impossibleRemaindersGuide": {
    "previous": "8’e bölmede 5, 12’ye bölmede 7 kalan verildiğinde de N−5, ikisinin ortak katı diye yazılmaz. N−5, 8’in katı; N−7, 12’nin katı olmalıdır. Aynı sayıyı farklı kalanlarla düzeltirken her bölüm eşitliğini ayrı korursun; tek ortak r varsayımı burada geçerli değildir.",
    "proposed": "N’nin 8’e bölümünde kalan 5 olsaydı N−5, 8’in katı olurdu. 12’ye bölümünde kalan 7 olsaydı N−7, 12’nin katı olurdu. 8 ve 12’nin ikisi de 4’ün katı. İlk koşul N’nin 4’e bölümünde 1, ikinci koşul 3 kalmasını gerektirir. Aynı sayı 4’e bölündüğünde tek bir kalan verir. Bu iki koşula uyan N yoktur."
  },
  "f1Prompt": {
    "previous": "a<b pozitif tam sayılar; EBOB(a, b)=6, EKOK(a, b)=180. En küçük a+b kaçtır?",
    "proposed": "a<b pozitif tam sayılar ve EBOB(a, b)=6, EKOK(a, b)=180. En küçük a+b kaçtır? Çözümü açmadan a=6x, b=6y ve xy=30 ile başla. x<y ve EBOB(x,y)=1 koşullarını sağlayan çiftleri yaz. Geçerli toplamları 6 ile çarp ve bulduğun adayın EBOB ile EKOK’unu kontrol et."
  },
  "m4Sheet": {
    "previous": "Farklı kalanlarda tek çıkarma geçmez.",
    "proposed": "Farklı kalanlarda tek çıkarma geçmez. Aynı 49 nesne altışarlı kutularda 8, sekizerli kutularda 6 kutu doldurur. 49=6×8+1=8×6+1. Her düzende bir nesne artar."
  },
  "m5Sheet": {
    "previous": "65 ve 89’da kalan 5 için 12 uygun; kalan 12 için EBOB(53,77)=1 ve d>12 çelişir.",
    "proposed": "65 ve 89 cm’lik iki şeritte 5’er cm artık bırakılırsa EBOB(60,84)=12 cm. Kesim kaybı olmadan 60÷12=5 ve 84÷12=7 parça çıkar. Boy 12 cm, toplam 12 parçadır. Kalan 12 olsaydı EBOB(53,77)=1 ve d>12 koşulu çelişirdi."
  },
  "f1Sheet": {
    "previous": "d=6, m=180 için en küçük toplam 66; d=5, m=150 için 55; d=2, m=72 için 26.",
    "proposed": "d=5, m=150 için en küçük toplam 55; d=2, m=72 için 26."
  },
  "f1SheetCue": {
    "previous": "Model/koşul/birim/son kontrol ayrı tutulur.",
    "proposed": "Model/koşul/birim/son kontrol ayrı tutulur. 6 ve 180 ile yeni bir deneme yapmak için aşağıdaki Destek azaltılan toplamı tamamla örneğini çözümü açmadan dene."
  },
  "source": {
    "previous": "Aurelia TYT EBOB EKOK kopya kağıdı, 06.11.2026/içerik 1.0: 22 sayfalık kaynağın öğretim uyarlaması. Güncel kaynak sürümü 17.11.2026’da yeniden okunup karşılaştırıldı.",
    "proposed": "Aurelia TYT EBOB EKOK kopya kağıdı, 19.11.2026, içerik 1.1. PDF’nin 22 sayfasından öğretim uyarlaması. Kaynağın 9. sayfasındaki 8’e göre 5 ve 12’ye göre 7 kalanlarını birlikte sağlayan sayı yoktur."
  }
};

const theoryRevisions: Readonly<Record<string, readonly Revision[]>> = {
  "Aynı kalanlı sayıda aralığın en iyi adayını bul": [revisions.m4Guide],
  "Aynı fark modeli yeni kalan koşulunda bozulabilir": [revisions.m5Guide, revisions.impossibleRemaindersGuide],
};
const sheetRevisions: Readonly<Record<string, readonly Revision[]>> = {
  "Aynı N, aynı kalan": [revisions.m4Sheet],
  "Bilinmeyen bölen ve kalan sınırı": [revisions.m5Sheet],
  "Karma prova ve koşul onarımı": [revisions.f1Sheet, revisions.f1SheetCue],
};
const addedExample = {
  title: "Destek azaltılan toplamı tamamla",
  prompt: revisions.f1Prompt.proposed,
  steps: [
    "a=6 x, b=6 y; xy=30, EBOB(x, y)=1 ve x<y.",
    "Çiftler(1, 30),(2, 15),(3, 10),(5, 6); hepsi aralarında asal.",
    "En küçük x+y=11; 6×11=66.",
  ],
  answer: "66",
};

type Revision = { previous: string; proposed: string };
function priorText(text: string, changes: readonly Revision[] = []): string {
  return changes.reduce((value, { previous, proposed }) => value.replace(proposed, previous), text);
}

export function beforeSource008Revision(
  surface: "lessons" | "questions" | "guides" | "sheets",
  id: string,
  value: unknown,
): unknown {
  if (surface === "lessons" && id === lessonId) {
    const lesson = value as Lesson;
    return {
      ...lesson,
      source: { ...lesson.source, tr: priorText(lesson.source.tr, [revisions.source]) },
      body: lesson.body.map((section) => ({
        ...section,
        text: { ...section.text, tr: priorText(section.text.tr, theoryRevisions[section.title.tr]) },
      })),
    };
  }
  if (surface === "guides" && id === lessonId) {
    const guide = value as LessonGuide;
    return {
      ...guide,
      source: priorText(guide.source, [revisions.source]),
      sections: guide.sections.map((section) => ({
        ...section,
        paragraphs: section.paragraphs.map((text) => priorText(text, theoryRevisions[section.title])),
      })),
      examples: guide.examples.map((example, i) =>
        i === 16 && example.title === addedExample.title
          ? { ...example, prompt: priorText(example.prompt, [revisions.f1Prompt]) }
          : example,
      ),
    };
  }
  if (surface === "sheets" && id === topicId) {
    const sheet = value as CheatSheet;
    return {
      ...sheet,
      source: priorText(sheet.source, [revisions.source]),
      sections: sheet.sections.map((section) => ({
        ...section,
        text: section.text.map((text) => priorText(text, sheetRevisions[section.title])),
      })),
      examples: sheet.examples.filter((example, i) =>
        i !== 2 || JSON.stringify(example) !== JSON.stringify(addedExample),
      ),
    };
  }
  return value;
}
