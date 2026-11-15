import type { Question } from "./model";
const passageReference =
  /(?:^|[^\p{L}])(?:metnin|metni|metne|metinde|metinden|(?:bu|verilen|yukarıdaki|aşağıdaki) parça(?:nın|da|dan|ya))(?:[^\p{L}]|$)/u;
const absentMediaReference =
  /(?:^|[^\p{L}])(?:şekildeki|grafikteki|tablodaki|yukarıdaki şekil|aşağıdaki şekil|yukarıdaki grafik|aşağıdaki grafik|yukarıdaki tablo|aşağıdaki tablo)(?:[^\p{L}]|$)/u;
const suppliedEquationReference = /verilen (?:toplam )?denkleme göre/u;
const equationRelation = /[^\s]+\s*(?:→|⇌|⟶|->|=)\s*[^\s]+/u;
// Current question cards support a passage and a self-contained stem/options.
// New figure/table questions must first gain an explicit media payload + renderer.
export function questionContentIssues(question: Question): string[] {
  const references =
    `${question.prompt.tr} ${question.hint.tr}`.toLocaleLowerCase("tr-TR");
  const issues: string[] = [];
  if (question.passage && !question.passage.tr.trim())
    issues.push("Boş soru metni");
  if (passageReference.test(references) && !question.passage?.tr.trim())
    issues.push("Atıf yapılan metin soruda yok");
  if (
    suppliedEquationReference.test(references) &&
    !equationRelation.test(
      `${question.passage?.tr ?? ""} ${question.prompt.tr}`,
    )
  )
    issues.push("Atıf yapılan denklem soruda yok");
  if (absentMediaReference.test(references))
    issues.push(
      "Atıf yapılan şekil/grafik/tablo için soru ortamı tanımlı değil",
    );
  return issues;
}
