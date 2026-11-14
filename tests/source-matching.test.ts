import { expect, it } from "vitest";
import { inferSourceFile, topicDocuments } from "../src/domain/sourceMatching";
import { matchesSourceTopic, isPastExamSource } from "../src/domain/catalogue";
import type { LocalDocument } from "../src/domain/storage";

it("classifies a multi-subject folder from clear filenames instead of assigning every file to the selected subject", () => {
  expect(isPastExamSource("2026 ALES-2.pdf")).toBe(true);
  expect(isPastExamSource("Temel Orantı ve Thales.pdf")).toBe(false);
  expect(isPastExamSource("Kimyagerin Kalesi.pdf")).toBe(false);
  expect(
    inferSourceFile("001 - TYT - Kimya - Örnek - Kopya Kâğıdı.pdf"),
  ).toEqual({ subjectIds: ["tyt-kimya"], kind: "cheatsheet" });
  expect(
    inferSourceFile("AYT - Biyoloji - Örnek - Kopya Kağıdı.pdf").subjectIds,
  ).toEqual(["ayt-biyoloji"]);
  expect(inferSourceFile("Kimya.pdf").subjectIds).toBeUndefined();
  expect(
    inferSourceFile("TYT - Fizik ve Kimya - Örnek.pdf").subjectIds,
  ).toBeUndefined();
});
it("matches equivalent compound headings without broad substring guesses", () => {
  expect(
    matchesSourceTopic("Gazlar, Hâl Değişim Grafiği ve Plazma.pdf", undefined, {
      id: "detail-165",
      title: "Gazlar , hal değişim grafiği , plazma",
    }),
  ).toBe(true);
  expect(
    matchesSourceTopic("Kovalent Bağ ve Polar-Apolar Bağ.pdf", undefined, {
      id: "detail-155",
      title: "Kovalent bağ / polar apolar bağ",
    }),
  ).toBe(true);
  expect(
    matchesSourceTopic("Suyun özellikleri.pdf", undefined, {
      id: "detail-4",
      title: "Su",
    }),
  ).toBe(false);
});
it("retains explicit local topic links and finds a PDF even when its old catalogue is unavailable", () => {
  const doc: LocalDocument = {
    id: "synthetic",
    name: "My note.pdf",
    subjectId: "tyt-kimya",
    kind: "cheatsheet",
    sourceIds: ["old-catalogue-id"],
    topicIds: ["detail-141"],
    size: 10,
    type: "application/pdf",
    addedAt: "2026-11-14",
    blob: new Blob(),
  };
  expect(
    topicDocuments([doc], null, "tyt-kimya", "cheatsheets", {
      id: "detail-141",
      title: "Kimyanın sembolik dili",
    }),
  ).toEqual([doc]);
  expect(
    topicDocuments([doc], null, "tyt-kimya", "cheatsheets", {
      id: "detail-140",
      title: "Kimya disiplinleri",
    }),
  ).toEqual([]);
  expect(topicDocuments([doc], null, "tyt-kimya", "questions")).toEqual([]);
});
