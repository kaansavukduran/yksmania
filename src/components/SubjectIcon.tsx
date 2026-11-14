import {
  Languages,
  Sigma,
  Triangle,
  Orbit,
  FlaskConical,
  Dna,
  Landmark,
  Globe2,
  Brain,
  BookOpen,
  type LucideProps,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  turkce: Languages,
  matematik: Sigma,
  geometri: Triangle,
  fizik: Orbit,
  kimya: FlaskConical,
  biyoloji: Dna,
  tarih: Landmark,
  cografya: Globe2,
  felsefe: Brain,
  din: BookOpen,
};

export function SubjectIcon({ id, ...props }: LucideProps & { id: string }) {
  const kind = id.replace(/^(tyt|ayt)-/, "");
  const Icon = icons[kind] ?? BookOpen;
  return <Icon size={24} strokeWidth={1.7} aria-hidden="true" {...props} />;
}
