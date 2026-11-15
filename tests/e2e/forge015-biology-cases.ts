import { expect, type Locator } from "@playwright/test";
import { forge015Case, setRange } from "./forge015-case-helper";
import { forge015BiologyLessons } from "../../src/learning/forge015Biology";
async function predict(lab: Locator, value: string) {
  const combo = lab.getByRole("combobox", {
    name: "Sonuç tahminin",
    exact: true,
  });
  await combo.selectOption(value);
  const text = await combo.locator("option:checked").textContent();
  await expect(lab.locator("[data-selected-prediction]")).toHaveText(
    `Seçili tahmin: ${text}`,
  );
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(
      "Seçilen yolun konumunu, koşulunu ve gösterilen kanıtın sınırını ayrı okuyorum.",
    );
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .tap();
  await expect(lab.locator(".bio015-feedback")).toContainText(
    "Seçimin bu modeldeki kanıtla uyumlu.",
  );
}
export const biology015Cases = [
  forge015Case(
    forge015BiologyLessons,
    "genetik-cesitlilik",
    "forge015-bio-genetik-cesitlilik",
    async (_p, lab) => {
      await lab
        .getByRole("combobox", { name: "Genetik olay kartı", exact: true })
        .selectOption("mutation");
      await lab
        .getByRole("combobox", {
          name: "Değişimin izlendiği hücre soyu",
          exact: true,
        })
        .selectOption("germline");
      await lab
        .getByRole("checkbox", {
          name: "Varyantı taşıyan gamet bu seçili döllenmede kullanılıyor",
          exact: true,
        })
        .check();
      await predict(lab, "variant");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "seçili zigot varyantı taşır.",
      );
      await expect(lab.locator("[data-after-dna]")).toHaveText("ATAC");
      await expect(lab.locator("[data-new-variant]")).toHaveAttribute(
        "data-new-variant",
        "true",
      );
      await expect(lab.locator("[data-selected-zygote]")).toHaveAttribute(
        "data-selected-zygote",
        "true",
      );
    },
  ),
  forge015Case(
    forge015BiologyLessons,
    "sinir-sistemi-noron-ve-glialar",
    "forge015-bio-sinir-sistemi-noron-ve-glialar",
    async (_p, lab) => {
      await lab
        .getByRole("combobox", { name: "Sinir dokusunun bölgesi", exact: true })
        .selectOption("peripheral");
      await lab
        .getByRole("button", { name: "Ranvier boğumu", exact: true })
        .tap();
      await predict(lab, "schwann");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Schwann hücresi",
      );
      await expect(lab.locator("[data-ranvier-node]")).toHaveCount(3);
      await expect(lab.locator("[data-ranvier-node]").first()).toHaveAttribute(
        "r",
        "7",
      );
      await expect(lab.locator("[data-myelin-segment]")).toHaveCount(4);
      const gaps = await lab.locator("svg").evaluate((svg) => {
        const segments = [...svg.querySelectorAll("[data-myelin-segment]")];
        return [...svg.querySelectorAll("[data-ranvier-node]")].map(
          (node, i) => {
            const x = Number(node.getAttribute("cx"));
            const left =
              Number(segments[i].getAttribute("x")) +
              Number(segments[i].getAttribute("width"));
            const right = Number(segments[i + 1].getAttribute("x"));
            return x > left && x < right;
          },
        );
      });
      expect(gaps).toEqual([true, true, true]);
      const clearances = await lab.locator("svg").evaluate((svg) => {
        const line = svg.querySelector(
          "[data-axon-direction] > g > path",
        ) as SVGPathElement;
        const marker = svg.querySelector("[data-axon-direction] marker")!;
        const label = svg.querySelector(
          "[data-axon-direction-label]",
        ) as SVGTextElement;
        const leader = svg.querySelector(
          "[data-node-leader]",
        ) as SVGPathElement;
        const halfHead =
          (Number(marker.getAttribute("markerHeight")) *
            Number(getComputedStyle(line).strokeWidth.replace("px", ""))) /
          2;
        const arrowY = line.getBBox().y;
        return [
          label.getBBox().y - (arrowY + halfHead),
          arrowY - halfHead - (leader.getBBox().y + leader.getBBox().height),
        ];
      });
      for (const clearance of clearances)
        expect(clearance).toBeGreaterThanOrEqual(8);
    },
  ),
  forge015Case(
    forge015BiologyLessons,
    "sinir-sistemi-aksiyon-potansiyeli",
    "forge015-bio-sinir-sistemi-aksiyon-potansiyeli",
    async (_p, lab) => {
      await setRange(lab, "İlk örneğin zamanı (ms)", 2.5);
      await setRange(lab, "İkinci uyarının ulaştırdığı potansiyel (mV)", -50);
      await predict(lab, "yes");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Zar potansiyeli: -20 mV.",
      );
      await expect(lab.locator("[data-second-response]")).toHaveText(
        "İkinci aksiyon potansiyeli başlayabilir.",
      );
      await expect(lab.locator("[data-potential-marker]")).toHaveAttribute(
        "data-time",
        "2,5",
      );
      await expect(lab.locator("[data-potential-marker]")).toHaveAttribute(
        "data-voltage",
        "-20",
      );
      await expect(lab.locator("[data-potential-marker]")).toHaveAttribute(
        "cx",
        "230",
      );
    },
  ),
  forge015Case(
    forge015BiologyLessons,
    "sinir-sistemi-on-beyin",
    "forge015-bio-sinir-sistemi-on-beyin",
    async (_p, lab) => {
      await lab
        .getByRole("combobox", { name: "Ön beyinde görev kartı", exact: true })
        .selectOption("temperature");
      await setRange(lab, "Modelde ölçülen sıcaklık (°C)", 38);
      await lab.getByRole("button", { name: "Hipotalamus", exact: true }).tap();
      await predict(lab, "hypothalamus");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "38 − 37 = 1 °C.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Isı kaybını destekleyen yanıtlar",
      );
      await expect(
        lab.locator('[data-brain-region="hypothalamus"]'),
      ).toHaveAttribute("data-task-target", "true");
      await expect(
        lab.locator('[data-brain-region="hypothalamus"] .bio015-target-ring'),
      ).toHaveCount(1);
    },
  ),
  forge015Case(
    forge015BiologyLessons,
    "sinir-sistemi-orta-arka-beyin",
    "forge015-bio-sinir-sistemi-orta-arka-beyin",
    async (_p, lab) => {
      await lab
        .getByRole("combobox", {
          name: "Orta ve arka beyinde görev",
          exact: true,
        })
        .selectOption("coordination");
      await lab.getByRole("button", { name: "Beyincik", exact: true }).tap();
      await predict(lab, "cerebellum");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Vurgulanan bölge beyin sapında: hayır. Arka beyinde: evet.",
      );
      await expect(
        lab.locator('[data-hind-region="cerebellum"]'),
      ).toHaveAttribute("data-task-target", "true");
      await expect(
        lab.locator('[data-hind-region="cerebellum"] .bio015-target-ring'),
      ).toHaveAttribute("rx", "68");
    },
  ),
  forge015Case(
    forge015BiologyLessons,
    "sinir-sistemi-omurilik",
    "forge015-bio-sinir-sistemi-omurilik",
    async (_p, lab) => {
      await lab
        .getByRole("checkbox", {
          name: "Seçili yayda bir ara nöron olsun",
          exact: true,
        })
        .check();
      await lab
        .getByRole("combobox", {
          name: "Düşünce deneyinde kesilen yol",
          exact: true,
        })
        .selectOption("ascending");
      await predict(lab, "yes");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "3 nöron, 2 merkezî kimyasal sinaps.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("21 ms.");
      await expect(lab.locator("[data-reflex-response]")).toHaveAttribute(
        "data-reflex-response",
        "true",
      );
      await expect(lab.locator("[data-ascending-response]")).toHaveAttribute(
        "data-ascending-response",
        "false",
      );
      await expect(lab.locator("[data-cut-path]")).toHaveAttribute(
        "data-cut-path",
        "ascending",
      );
    },
  ),
  forge015Case(
    forge015BiologyLessons,
    "sinir-sistemi-css-hastaliklar",
    "forge015-bio-sinir-sistemi-css-hastaliklar",
    async (_p, lab) => {
      await lab
        .getByRole("combobox", { name: "Motor yolun hedefi", exact: true })
        .selectOption("smooth");
      await lab
        .getByRole("combobox", {
          name: "Hastalık değil mekanizma kanıt kartı",
          exact: true,
        })
        .selectOption("myelin");
      await predict(lab, "two");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Motor nöron sayısı: 2.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "ÇSS’de gösterilen motor gövde: 1.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Multipl skleroz bağlamında merkezî miyelin",
      );
      await expect(lab.locator("[data-motor-neurons]")).toHaveAttribute(
        "data-motor-neurons",
        "2",
      );
      await expect(lab.locator("[data-peripheral-ganglion]")).toHaveCount(1);
    },
  ),
];
