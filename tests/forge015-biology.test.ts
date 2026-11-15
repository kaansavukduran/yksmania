import { describe, expect, it } from "vitest";
import {
  variationEvents,
  variationSnapshot,
  gliaSnapshot,
  potentialSnapshot,
  secondImpulse,
  forebrainSnapshot,
  hindbrainSnapshot,
  spinalSnapshot,
  peripheralSnapshot,
  forge015BiologyGuides,
  forge015BiologyLessons,
  forge015BiologyTopics,
} from "../src/learning/forge015Biology";

describe("Source-grounded AYT variation and nervous-system evidence", () => {
  it("separates a new measured DNA variant, recombination, transfer and phenotype-only evidence", () => {
    for (const event of variationEvents) {
      const m = variationSnapshot(event, "skin", true);
      expect(m.newVariant).toBe(event === "mutation");
      expect(m.reshuffled).toBe(
        ["crossing", "assortment", "fertilization"].includes(event),
      );
      expect(m.transferred).toBe(event === "transfer");
      expect(m.phenotypeOnly).toBe(event === "environment");
      expect(m.selectedZygoteHasVariant).toBe(false);
    }
    expect(variationSnapshot("crossing", "germline", true).after).toEqual([
      "Ab",
      "aB",
    ]);
    expect(
      variationSnapshot("mutation", "germline", false).selectedZygoteHasVariant,
    ).toBe(false);
    expect(variationSnapshot("mutation", "germline", true)).toMatchObject({
      before: ["ATGC"],
      after: ["ATAC"],
      selectedZygoteHasVariant: true,
    });
    expect(variationSnapshot("environment", "skin", false).before).toEqual(
      variationSnapshot("environment", "skin", false).after,
    );
  });
  it("uses location plus function for glia and never infers a universal speed ratio", () => {
    expect(gliaSnapshot("central", "myelin", true)).toMatchObject({
      glia: "Oligodendrosit",
      nodes: 3,
    });
    expect(gliaSnapshot("peripheral", "myelin", true).glia).toBe(
      "Schwann hücresi",
    );
    expect(gliaSnapshot("central", "defence", false)).toMatchObject({
      glia: "Mikroglia",
      nodes: 0,
    });
    expect(gliaSnapshot("central", "support", true).glia).toBe("Astrosit");
    expect(gliaSnapshot("central", "fluid", true).glia).toBe("Ependim hücresi");
    expect(gliaSnapshot("peripheral", "fluid", true).glia).toContain(
      "gösterilmiyor",
    );
  });
  it("reads actual trace interpolation, ion-flow phase and exact threshold/refractory boundaries", () => {
    expect(potentialSnapshot(0)).toMatchObject({
      voltage: -70,
      sodiumIn: false,
      potassiumOut: false,
    });
    expect(potentialSnapshot(1.5)).toMatchObject({
      voltage: -55,
      sodiumIn: true,
    });
    expect(potentialSnapshot(1.75).voltage).toBeCloseTo(-12.5);
    expect(potentialSnapshot(2)).toMatchObject({
      voltage: 30,
      potassiumOut: true,
      sodiumIn: false,
    });
    expect(potentialSnapshot(2.5).voltage).toBe(-20);
    expect(potentialSnapshot(3.5).voltage).toBe(-80);
    expect(potentialSnapshot(4).voltage).toBe(-70);
    for (const recovery of ["ready", "absolute"] as const)
      for (const voltage of [-80, -60, -56, -55, -54, -40])
        expect(secondImpulse(voltage, recovery).fires).toBe(
          recovery === "ready" && voltage >= -55,
        );
    expect(() => potentialSnapshot(4.1)).toThrow();
    expect(() => secondImpulse(-39, "ready")).toThrow();
  });
  it("keeps forebrain networks, a given thermostat target and anatomy groups distinct", () => {
    expect(forebrainSnapshot("vision", 37).target).toBe("occipital");
    expect(forebrainSnapshot("touch", 37).target).toBe("parietal");
    expect(forebrainSnapshot("rhythm", 37).target).toBe("pineal");
    expect(forebrainSnapshot("temperature", 38)).toMatchObject({
      target: "hypothalamus",
      error: 1,
      regulation: "Isı kaybını destekleyen yanıtlar",
    });
    expect(forebrainSnapshot("temperature", 36).error).toBe(-1);
    expect(hindbrainSnapshot("orientation")).toMatchObject({
      target: "midbrain",
      brainstem: true,
      hindbrain: false,
    });
    expect(hindbrainSnapshot("coordination")).toMatchObject({
      target: "cerebellum",
      brainstem: false,
      hindbrain: true,
    });
    expect(hindbrainSnapshot("respiration")).toMatchObject({
      target: "medulla",
      brainstem: true,
      hindbrain: true,
    });
    expect(hindbrainSnapshot("relay")).toMatchObject({
      target: "pons",
      brainstem: true,
      hindbrain: true,
    });
  });
  it("computes two conduction legs plus central synapses and separates cut pathways", () => {
    expect(spinalSnapshot(false, "none")).toMatchObject({
      neurons: 2,
      centralSynapses: 1,
      latency: 20.5,
      sensoryInput: true,
      localResponse: true,
      ascending: true,
    });
    expect(spinalSnapshot(true, "none")).toMatchObject({
      neurons: 3,
      centralSynapses: 2,
      latency: 21,
    });
    expect(spinalSnapshot(false, "dorsal")).toMatchObject({
      sensoryInput: false,
      localResponse: false,
      ascending: false,
      latency: null,
    });
    expect(spinalSnapshot(true, "ventral")).toMatchObject({
      sensoryInput: true,
      localResponse: false,
      ascending: true,
      latency: null,
    });
    expect(spinalSnapshot(true, "ascending")).toMatchObject({
      sensoryInput: true,
      localResponse: true,
      ascending: false,
      latency: 21,
    });
  });
  it("shows a peripheral motor soma only in the basic autonomic route and never returns personal diagnosis", () => {
    for (const target of ["skeletal", "smooth", "cardiac", "gland"] as const)
      for (const evidence of [
        "symptom",
        "myelin",
        "dopamine",
        "memory",
        "network",
        "mood",
      ] as const) {
        const m = peripheralSnapshot(target, evidence);
        expect(m.motorNeurons).toBe(target === "skeletal" ? 1 : 2);
        expect(m.peripheralSomas).toBe(target === "skeletal" ? 0 : 1);
        expect(m.diagnosis).toBe(false);
      }
    expect(peripheralSnapshot("skeletal", "symptom").relation).toContain(
      "kesin tanı vermez",
    );
  });
});

describe("Seven fully built-in AYT biology units", () => {
  it("provides exact curriculum links,112 substantial paragraphs,28 worked examples,28 recalls and70 standalone five-choice cards", () => {
    expect(forge015BiologyLessons).toHaveLength(7);
    expect(Object.values(forge015BiologyTopics)).toEqual([
      "detail-284",
      "detail-285",
      "detail-286",
      "detail-287",
      "detail-288",
      "detail-289",
      "detail-290",
    ]);
    expect(
      forge015BiologyGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(56);
    const ids = new Set<string>();
    for (const guide of forge015BiologyGuides) {
      expect(guide.sections).toHaveLength(8);
      expect(
        guide.sections.every(
          (s) =>
            s.paragraphs.length === 2 &&
            s.paragraphs.every((p) => p.length > 250),
        ),
      ).toBe(true);
      expect(guide.examples).toHaveLength(4);
      expect(guide.recall).toHaveLength(4);
      expect(
        guide.examples.every(
          (e) =>
            e.steps.length === 3 &&
            e.steps.every((s) => s.explanation && s.label) &&
            e.check &&
            e.pitfall,
        ),
      ).toBe(true);
    }
    for (const lesson of forge015BiologyLessons) {
      expect(lesson.subjectId).toBe("ayt-biyoloji");
      expect(lesson.questions).toHaveLength(10);
      for (const q of lesson.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.prompt.tr).not.toMatch(
          /yukarıdaki şekil|önceki sayfa|bu metne göre/i,
        );
        expect(q.hint.tr.length).toBeGreaterThan(15);
        expect(q.explanation.tr.length).toBeGreaterThan(100);
      }
    }
    expect(ids.size).toBe(70);
  });
  it("retains independently calculated numeric answers and the limits of mutation, speed and symptom inference", () => {
    const answer = (id: string, index: number) => {
      const q = forge015BiologyLessons.find((x) => x.id === id)!.questions[
        index - 1
      ];
      return q.options[q.answer].tr;
    };
    expect(answer("genetik-cesitlilik", 2)).toBe("8");
    expect(answer("sinir-sistemi-aksiyon-potansiyeli", 4)).toBe(
      "15 Na⁺ dışarı, 10 K⁺ içeri, 5 ATP",
    );
    expect(answer("sinir-sistemi-aksiyon-potansiyeli", 8)).toBe("10");
    expect(answer("sinir-sistemi-aksiyon-potansiyeli", 9)).toBe("3");
    expect(answer("sinir-sistemi-omurilik", 7)).toBe("21");
    expect(answer("sinir-sistemi-css-hastaliklar", 1)).toBe(
      "43 çift ve 86 sinir",
    );
  });
});
