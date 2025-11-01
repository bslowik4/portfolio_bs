export interface Skill {
  id: number;
  name: string;
  description: string | null;
  iconPath: string | null;
  skillLevel: number | null;
  type: string;
}

export type GroupedSkills = Record<string, Skill[]>;

export type TechTypeLabels = Record<string, string>;
