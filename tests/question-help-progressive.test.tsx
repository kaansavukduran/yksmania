import { expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { QuestionHelp } from "../src/components/QuestionHelp";
import { helpPanels } from "../src/learning/questionHelp";
import { forge026MathLessons } from "../src/learning/forge026Math";
import type { HelpQuestion } from "../src/domain/questionHelpModel";

const card = forge026MathLessons[0].questions[0];
const question: HelpQuestion = {
  id: card.id,
  prompt: card.prompt.tr,
  options: card.options.map((o) => o.tr),
  answer: card.answer,
  hint: card.hint.tr,
  explanation: card.explanation.tr,
  guidance: card.guidance,
};

it("keeps the actual first digit calculation in its step instead of revealing it before the method", () => {
  expect(question.id).toBe("f026-sayi-basamaklari-ileri-1");
  const panels = helpPanels(question);
  expect(panels[0].paragraphs).toEqual([
    "Yazılan rakam adedi, farklı rakam adedi ve rakam toplamı ayrı niceliklerdir.",
  ]);
  expect(panels[1].paragraphs[0]).toContain("Üç isteneni ayrı izle");
  expect(panels[2].paragraphs).toEqual([
    "70800 yazımını 7,0,8,0,0 diye beş konuma ayır.",
  ]);
  const first = renderToStaticMarkup(
    <QuestionHelp question={question} level={1} onLevel={() => {}} />,
  );
  expect(first).toContain("Bilmen gerekenler");
  expect(first).not.toContain("7,0,8,0,0");
  expect(first).not.toContain("Doğru yanıt:");
  const step = renderToStaticMarkup(
    <QuestionHelp question={question} level={3} onLevel={() => {}} />,
  );
  expect(step).toContain("7,0,8,0,0");
  expect(step).not.toContain("2. adım</h3>");
});

it("retains an extra contextual hint while keeping partial legacy help available", () => {
  const hint = "Üç farklı ölçü isteniyor; sıralarını izle.";
  expect(helpPanels({ ...question, hint })[0].paragraphs).toContain(hint);
  expect(
    helpPanels({
      ...question,
      id: "unprepared-guidance-example",
      guidance: undefined,
    }),
  ).toEqual([{ title: "İlk ipucu", paragraphs: [question.hint!] }]);
});
