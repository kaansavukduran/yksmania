import stageQuestionFingerprints from "./fixtures/source-stage-021-question-fingerprints.json";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import beforeQuestionFingerprints from "./fixtures/source-stage-020-question-fingerprints.json";
import beforeTeaching from "./fixtures/source-stage-020-lesson-fingerprints.json";
import beforePapers from "./fixtures/source-stage-020-mixed-exams.json";
import { lessons, lessonById } from "../src/domain/content";
import { studyTopics, topicLessons } from "../src/domain/studyPlan";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { questionContentIssues } from "../src/domain/questionContent";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import { beginExam, changeExam, examCatalogue, selectExamVariant, type ExamSpec } from "../src/domain/exams";

const canonical = (x: unknown): unknown => Array.isArray(x) ? x.map(canonical) : x && typeof x === "object" ? Object.fromEntries(Object.entries(x).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, value]) => [key, canonical(value)])) : x;

it("retains3340 accepted questions and355 teaching records while adding310 complete five-option cards", () => {
  const stageIds=new Set(Object.keys(stageQuestionFingerprints));
  const all=lessons.flatMap(l=>l.questions).filter(q=>stageIds.has(q.id)), byId=new Map(all.map(q=>[q.id,q]));
  expect(Object.keys(beforeQuestionFingerprints)).toHaveLength(3340);expect(all).toHaveLength(3650);expect(byId.size).toBe(all.length);
  for(const[id,hash]of Object.entries(beforeQuestionFingerprints)){
    expect(byId.has(id),id).toBe(true);
    expect(createHash('sha256').update(JSON.stringify(canonical(byId.get(id)))).digest('hex'),id).toBe(hash);
  }
  expect(Object.keys(beforeTeaching)).toHaveLength(355);
  for(const[id,hash]of Object.entries(beforeTeaching)){
    const{questions,...teaching}=lessonById(id)!;
    expect(createHash('sha256').update(JSON.stringify(canonical(teaching))).digest('hex'),id).toBe(hash);
  }
  const prior=new Set(Object.keys(beforeQuestionFingerprints)),fresh=all.filter(q=>!prior.has(q.id));
  expect(fresh).toHaveLength(310);
  for(const q of fresh){
    expect(q.options,q.id).toHaveLength(5);expect(new Set(q.options.map(o=>o.tr)).size,q.id).toBe(5);expect(questionContentIssues(q),q.id).toEqual([]);
    expect(q.hint.tr.trim(),q.id).not.toBe('');expect(q.explanation.tr.trim(),q.id).not.toBe(q.options[q.answer].tr.trim());
    if(q.guidance){expect(q.guidance.optionReasons,q.id).toHaveLength(5);expect(q.guidance.steps.length,q.id).toBeGreaterThanOrEqual(2);expect(q.guidance.commonError.trim(),q.id).not.toBe('');expect(q.guidance.check.trim(),q.id).not.toBe('');}
  }
  expect(fresh.filter(q=>q.guidance)).toHaveLength(50);
});

it("offers30 additional independent guides and full built-in sheets for the first378 ordered headings",()=>{
  expect(lessons.length).toBeGreaterThanOrEqual(385);expect(lessons.filter(l=>!l.tags.includes('soru-seti')).length).toBeGreaterThanOrEqual(380);expect(lessonGuides.size).toBeGreaterThanOrEqual(352);expect(builtInCheatSheets.size).toBeGreaterThanOrEqual(380);
  const ids=new Set<string>();
  for(const topic of studyTopics.slice(348,378)){
    const lesson=topicLessons(topic.id).find(l=>!l.tags.includes('soru-seti'))!;expect(lesson,topic.title).toBeDefined();ids.add(lesson.id);
    const guide=lessonGuides.get(lesson.id)!,sheet=builtInCheatSheets.get(topic.id)!;expect(guide,topic.title).toBeDefined();expect(sheet.lessonId).toBe(lesson.id);
    const text=sheet.sections.flatMap(s=>s.text).join('\n');for(const section of guide.sections)for(const p of section.paragraphs)expect(text,topic.title).toContain(p);expect(sheet.examples).toHaveLength(guide.examples.length);
  }
  expect(ids.size).toBe(30);
  for(const topic of studyTopics.slice(0,378))expect(topicLessons(topic.id).some(l=>!l.tags.includes('soru-seti')&&l.questions.length>0),topic.title).toBe(true);
});

it("uses40math14physics13chemistry13biology five-choice AYT cards in every new full mock variant",()=>{
  const ayt=examCatalogue().find(e=>e.id==='mixed-ayt')!;expect(ayt.fullLength).toBe(true);expect(ayt.missingSubjects).toEqual([]);expect(ayt.items).toHaveLength(80);expect(ayt.durationSeconds).toBe(10800);
  for(const paper of [ayt.items,...Array.from({length:8},(_,i)=>selectExamVariant(ayt,`five-option-full-paper-${i}`))]){
    expect(paper).toHaveLength(80);expect(new Set(paper.map(q=>q.id)).size).toBe(80);for(const q of paper)expect(q.options,q.id).toHaveLength(5);
    expect(paper.filter(q=>['ayt-matematik','ayt-geometri'].includes(q.subjectId))).toHaveLength(40);expect(paper.filter(q=>q.subjectId==='ayt-fizik')).toHaveLength(14);expect(paper.filter(q=>q.subjectId==='ayt-kimya')).toHaveLength(13);expect(paper.filter(q=>q.subjectId==='ayt-biyoloji')).toHaveLength(13);
  }
  const tyt=examCatalogue().find(e=>e.id==='mixed-tyt')!;expect(tyt.items).toHaveLength(120);expect(tyt.fullLength).toBe(true);expect(tyt.missingSubjects).toEqual([]);
});

it("preserves complete old115/55 question papers, selected answer, flag and deadline rather than upgrading them to the new full mock",()=>{
  expect(beforePapers.map(p=>p.items.length)).toEqual([115,55]);
  for(const old of beforePapers as ExamSpec[]){
    expect(selectExamVariant(old,'old-saved-paper')).toEqual(old.items);
    let state=beginExam(initialState(),old,1000),id=state.examDraft!.id;
    state=changeExam(state,id,{type:'answer',index:0,value:old.items[0].answer},2000);state=changeExam(state,id,{type:'flag',index:0},2100);
    const snapshot=structuredClone(state.examDraft);expect(snapshot!.items).toEqual(old.items);expect(snapshot!.durationSeconds).toBe(old.durationSeconds);expect(snapshot!.deadline).toBe(1000+old.durationSeconds*1000);expect(validateState(JSON.parse(JSON.stringify(state))).examDraft).toEqual(snapshot);
  }
});
