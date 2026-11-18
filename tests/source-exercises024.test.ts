import { describe, expect, it } from "vitest";
import { lessonById, lessons } from "../src/domain/content";
import { lessonTopic, studyTopics } from "../src/domain/studyPlan";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  originalAbsoluteExercises024,
  originalPowersExercises024,
  originalOgmExercises024,
  originalSourceExercises024,
  originalOgmLesson024Id,
  originalExercisesForLesson,
  sourceQuestionPresentation,
  isSourceQuestionLesson,
} from "../src/learning/sourceExercises024";

describe("asıl kaynak soruları ile özgün pekiştirme ayrı kalır", () => {
  it("korunan sekiz açık uçlu mutlak değer sorusuna yeni kaynak şıkkı uydurmaz", () => {
    expect(originalAbsoluteExercises024.map((q) => q.prompt)).toEqual([
      "|3x-4|=8 denklemini çöz.",
      "|x+2|≤5 eşitsizliğini aralıkla göster.",
      "|2x-3|>7 eşitsizliğini çöz.",
      "||x|-2|=3 denklemini çöz.",
      "|x-4|+|x+1| ifadesinin en küçük değeri ve x aralığı nedir?",
      "|7-a|=3 ise a kaç olabilir?",
      "y=|x+1|-2 grafiğinin tepe noktası ve kökleri nedir?",
      "|x-5|<0 eşitsizliğinin çözümü var mı?",
    ]);
    for (const q of originalAbsoluteExercises024) {
      expect(q.options).toEqual([]);
      expect(q.source.pageLabel).toContain("11");
      expect(q.steps.length).toBeGreaterThanOrEqual(3);
      expect(q.figure).toBeDefined();
      expect(q.explanationFigure).toBeDefined();
      expect(q.scoredLessonId).toBeUndefined();
    }
  });
  it("üslü sayıların on alıştırmasını, asıl dört seçeneği ve koşul erratasını korur", () => {
    expect(originalPowersExercises024.map((q) => q.prompt)).toEqual([
      "(2^5·4^3)/8^2 işlemini hesapla.",
      "9^(x-1)=27 denklemini çöz.",
      "3^n+3^(n+1) ifadesini ortak çarpanla yaz.",
      "0,0000072 sayısını bilimsel gösterimle yaz.",
      "(1/2)^9 ile (1/2)^6'yı karşılaştır.",
      "4^-2·8 işlemini hesapla.",
      "Başlangıçta 50 olan bir miktar her adımda 3 katına çıkıyor. 4 adım sonra kaç olur?",
      "Aşağıdakilerden hangisi her uygun a, m, n için doğrudur?",
      "27^(2/3) değerini kök ilişkisiyle bul.",
      "6×10^5 ile 4×10^6'nın toplamını bilimsel gösterimle yaz.",
    ]);
    const caution = originalPowersExercises024[7];
    expect(caution.options).toEqual([
      "a^m+a^n=a^(m+n)",
      "(a^m)^n=a^(mn)",
      "a^-n=-a^n",
      "(a+b)^n=a^n+b^n",
    ]);
    expect(caution.erratum).toContain("puanlı sınava alınmaz");
    expect(caution.steps.join(" ")).toContain("a=−1,m=2,n=1/2");
    for (const q of originalPowersExercises024) {
      expect(q.scoredLessonId).toBeUndefined();
      expect(q.figure).toBeDefined();
      expect(q.explanationFigure).toBeDefined();
    }
  });
  it("OGM altı gerçek MCQ ve E,D,E,A,B,C anahtarını özgün soru setine dönüştürmeden kaydeder", () => {
    const lesson = lessonById(originalOgmLesson024Id)!;
    expect(lesson.tags).toEqual(["soru-seti", "kaynak-sorulari"]);
    expect(lesson.questions.map((q) => q.answer)).toEqual([4, 3, 4, 0, 1, 2]);
    expect(lesson.questions).toHaveLength(6);
    expect(originalOgmExercises024).toHaveLength(6);
    for (const [i, q] of lesson.questions.entries()) {
      expect(questionContentIssues(q), q.id).toEqual([]);
      expect(questionGuidanceSchema.safeParse(q.guidance).success, q.id).toBe(
        true,
      );
      expect(q.guidance?.optionReasons).toHaveLength(5);
      const original = originalOgmExercises024[i];
      expect(q.prompt.tr).toBe(original.prompt);
      expect(q.options.map((v) => v.tr)).toEqual(original.options);
      expect(original.source.publicUrl).toMatch(
        /^https:\/\/ogmmateryal\.eba\.gov\.tr\//,
      );
      expect(original.figure?.kind).toBe("image");
      expect(original.hintFigure?.kind).toBe("math");
      expect(original.explanationFigure?.kind).toBe("math");
    }
    expect(lessonTopic[lesson.id]).toBe(
      "topic-tyt-mat-uslu-sayilar-kaynak-039",
    );
    expect(
      studyTopics.filter(
        (q) => q.id === "topic-tyt-mat-uslu-sayilar-kaynak-039",
      ),
    ).toHaveLength(1);
    for (const id of [
      "tyt-mat-mutlak-deger-kaynak-038",
      "tyt-mat-uslu-sayilar-kaynak-039",
    ]) {
      const own = lessonById(id)!;
      expect(own.questions).toHaveLength(55);
      expect(isSourceQuestionLesson(id)).toBe(false);
      expect(own.questions.every((q) => !q.id.startsWith("source-ogm"))).toBe(
        true,
      );
    }
    expect(isSourceQuestionLesson(lesson.id)).toBe(true);
    expect(
      new Set(lessons.flatMap((l) => l.questions.map((q) => q.id))).size,
    ).toBe(lessons.flatMap((l) => l.questions).length);
    expect(originalSourceExercises024).toHaveLength(24);
    expect(
      originalExercisesForLesson("tyt-mat-mutlak-deger-kaynak-038"),
    ).toHaveLength(8);
    expect(
      originalExercisesForLesson("tyt-mat-uslu-sayilar-kaynak-039"),
    ).toHaveLength(16);
  });
  it("kimlik aynı kalsa bile farklı metin, şık, anahtar veya pasajlı eski denemeye yanlış şekil bağlamaz", () => {
    for (const q of lessonById(originalOgmLesson024Id)!.questions) {
      const exact = {
        id: q.id,
        prompt: q.prompt.tr,
        options: q.options.map((v) => v.tr),
        answer: q.answer,
      };
      expect(sourceQuestionPresentation(exact)?.originalExerciseId).toBe(q.id);
      expect(
        sourceQuestionPresentation({ ...exact, prompt: exact.prompt + " " }),
      ).toBeUndefined();
      expect(
        sourceQuestionPresentation({
          ...exact,
          options: [...exact.options].reverse(),
        }),
      ).toBeUndefined();
      expect(
        sourceQuestionPresentation({ ...exact, answer: (q.answer + 1) % 5 }),
      ).toBeUndefined();
      expect(
        sourceQuestionPresentation({
          ...exact,
          passage: "Başka sürümdeki farklı veri",
        }),
      ).toBeUndefined();
      expect(
        sourceQuestionPresentation({ ...exact, passage: "" }),
      ).toBeUndefined();
      expect(
        sourceQuestionPresentation({ ...exact, id: "unmatched" }),
      ).toBeUndefined();
      const withHelp = {
        ...exact,
        explanation: q.explanation.tr,
        hint: q.hint.tr,
      };
      expect(sourceQuestionPresentation(withHelp)?.hintFigure).toBeDefined();
      expect(
        sourceQuestionPresentation(withHelp)?.explanationFigure,
      ).toBeDefined();
      for (const historical of [
        { ...withHelp, explanation: "Tarihsel kişisel çözüm" },
        { ...withHelp, hint: "Tarihsel kişisel ipucu" },
        { ...withHelp, hint: undefined },
      ]) {
        expect(sourceQuestionPresentation(historical)?.figure).toBeDefined();
        expect(
          sourceQuestionPresentation(historical)?.hintFigure,
        ).toBeUndefined();
        expect(
          sourceQuestionPresentation(historical)?.explanationFigure,
        ).toBeUndefined();
      }
    }
  });
});
