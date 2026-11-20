import { geometryFoundations } from "./geometryFoundations";
import { mathFoundations } from "./mathFoundations";
import { physicsFoundations } from "./physicsFoundations";
import { scienceFoundations } from "./scienceFoundations";
import { verbalFoundations } from "./verbalFoundations";
import type { FoundationLesson } from "./types";

/** Temel İnşa ön dersleri, ders sırasıyla. Çalışma planından bağımsızdır. */
export const foundationLessons: FoundationLesson[] = [...mathFoundations, ...geometryFoundations, ...physicsFoundations, ...scienceFoundations, ...verbalFoundations];

export const foundationById = (id: string) => foundationLessons.find((l) => l.id === id);

/** Ön derslerin gösterildiği TYT dersleri (sıra: kenar çubuğundaki ders sırası). */
export const foundationSubjects = [
  "tyt-turkce",
  "tyt-matematik",
  "tyt-geometri",
  "tyt-fizik",
  "tyt-kimya",
  "tyt-biyoloji",
  "tyt-tarih",
  "tyt-cografya",
  "tyt-felsefe",
  "tyt-din",
] as const;

export type { FoundationLesson } from "./types";
