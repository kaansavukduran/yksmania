import { txt, type Question } from "../domain/model";

type Option = readonly [value: string, reason: string];
type PracticeExercise = {
  id: string;
  prompt: string;
  options: readonly [Option, Option, Option, Option, Option];
  answer: number;
  knowledge: string;
  strategy: string;
  steps: string[];
  commonError: string;
  check: string;
};

export function guidedMathPractice(
  skill: string,
  items: PracticeExercise[],
): Question[] {
  return items.map(
    ({
      id,
      prompt,
      options,
      answer,
      knowledge,
      strategy,
      steps,
      commonError,
      check,
    }) => ({
      id: `${skill}-${id}`,
      skill,
      prompt: txt(prompt),
      options: options.map(([value]) => txt(value)),
      answer,
      hint: txt(strategy),
      explanation: txt([...steps, check].join(" ")),
      guidance: {
        knowledge: [knowledge],
        strategy,
        steps,
        optionReasons: options.map(([, reason]) => reason),
        commonError,
        check,
      },
    }),
  );
}
