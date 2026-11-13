import "fake-indexeddb/auto";
import { describe, expect, it } from "vitest";
import { initialState } from "../src/domain/model";
import {
  getDocuments,
  loadState,
  parseBackup,
  putDocument,
  saveState,
  validateState,
} from "../src/domain/storage";
describe("durable local state and untrusted backups", () => {
  it("persists independent settings without resetting the others", async () => {
    const s = initialState();
    s.settings.scale = 135;
    s.settings.textSize = 150;
    s.settings.font = "lexend";
    s.settings.motion = false;
    await saveState(s);
    expect((await loadState()).settings).toEqual(s.settings);
  });
  it("normalizes legacy English preferences and backups without changing user records", async () => {
    const s = initialState();
    s.settings.scale = 135;
    s.settings.textSize = 150;
    s.settings.font = "lexend";
    s.notes = { personal: "Keep my own English note: ÇĞİÖŞÜ." };
    s.draft = {
      lessonId: "rasyonel-sayilar",
      phase: "practice",
      index: 0,
      responses: [],
      selected: 1,
      checked: false,
      hint: true,
      confidence: "low",
      note: "My original note",
      startedAt: 123,
    };
    const legacy = { ...s, settings: { ...s.settings, locale: "en" } };
    expect(validateState(legacy)).toEqual(s);
    expect(await parseBackup(JSON.stringify(legacy))).toEqual(s);
    await saveState(validateState(legacy));
    expect(await loadState()).toEqual(s);
    expect(() =>
      validateState({ ...s, settings: { ...s.settings, locale: "xx" } }),
    ).toThrow();
  });
  it("keeps an unfinished answer and note after reopening", async () => {
    const s = initialState();
    s.draft = {
      lessonId: "rasyonel-sayilar",
      phase: "practice",
      index: 0,
      responses: [],
      selected: 1,
      checked: false,
      hint: true,
      confidence: "low",
      note: "Çalışmam korunuyor.",
      startedAt: 123,
    };
    await saveState(s);
    expect((await loadState()).draft).toEqual(s.draft);
  });
  it("rejects corrupt/unsupported backups and out of range percentages", async () => {
    await expect(parseBackup("{broken")).rejects.toThrow();
    await expect(
      parseBackup(JSON.stringify({ ...initialState(), version: 2 })),
    ).rejects.toThrow();
    const s = initialState();
    s.settings.scale = 137;
    expect(() => validateState(s)).toThrow();
  });
  it("rejects invalid dates, unknown lessons and invalid option references", () => {
    const s = initialState();
    s.settings.blockedDates = ["2026-02-31"];
    expect(() => validateState(s)).toThrow();
    s.settings.blockedDates = [];
    s.draft = {
      lessonId: "not-a-lesson",
      phase: "practice",
      index: 0,
      responses: [],
      selected: 0,
      checked: false,
      hint: false,
      confidence: "high",
      note: "",
      startedAt: 1,
    };
    expect(() => validateState(s)).toThrow();
    s.draft.lessonId = "rasyonel-sayilar";
    s.draft.selected = 8;
    expect(() => validateState(s)).toThrow();
  });
  it("stores PDF bytes locally without modifying learning history", async () => {
    const before = await loadState();
    await putDocument({
      id: "abc",
      name: "My PDF.pdf",
      subjectId: "tyt-matematik",
      size: 8,
      type: "application/pdf",
      addedAt: "2026-11-13",
      blob: new Blob(["%PDF-1.4"]),
    });
    const docs = await getDocuments();
    expect(await docs[0].blob.text()).toBe("%PDF-1.4");
    expect(await loadState()).toEqual(before);
  });
});
