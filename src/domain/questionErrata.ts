// A scientific correction for new attempts. Stored exam snapshots stay intact.
export const newtonMassQuestionErratum = {
  id: "n4",
  before: "Net kuvvet sabitken kütle iki katına çıkarsa ivme…",
  after:
    "Sıfırdan farklı net kuvvet aynı kalırken kütle iki katına çıkarsa ivme…",
  reason:
    "F=0 durumunda iki ivme de sıfırdır; azalma yargısı için F≠0 koşulu gerekir.",
} as const;
