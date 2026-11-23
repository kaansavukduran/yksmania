import { identityHash, questionIdentity, type HelpQuestion } from "../domain/questionHelpModel";
import { signedWorkQuestionId } from "./signedWork055";
import { springWorkQuestionId } from "./springWork057";

const hints = new Map([
  [signedWorkQuestionId, {
    identity: "178ba1476e3ad8",
    before: "İtiş işi 10·5=+50 J; direnç işi−4·5=−20 J; normal işi 0.",
    after: "Yer değiştirme sağa. Her kuvvet oku için yer değiştirme doğrultusuna düşen bileşeni bul. Önce yönü belirle, sonra bu bileşeni 5 m ile çarp.",
  }],
  [springWorkQuestionId, {
    identity: "14d9d31d234405",
    before: "Fx=−100·(−0,20)=+20 N.",
    after: "Önce doğal boyun hangi tarafta kaldığını bul. Yayın kuvveti o tarafa yönelir. Enerjiyi bulurken sapmanın karesini düşün.",
  }],
]);

/** Live Study and newly built papers get the directional hint. Frozen papers keep their help. */
export function practiceQuestionView<T extends HelpQuestion>(question: T): T {
  const hint = hints.get(question.id);
  if (hint && question.hint === hint.before && identityHash(questionIdentity(question)) === hint.identity)
    return { ...question, hint: hint.after };
  return question;
}
