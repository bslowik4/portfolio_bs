'use client';

import { SkillCard } from './SkillCard';

interface Technology {
  id: number;
  name: string;
  description: string | null;
  iconPath: string | null;
  skillLevel: number | null;
  type: string;
}

interface SkillsGridProps {
  groupedSkills: Record<string, Technology[]>;
  techTypeLabels: Record<string, string>;
}

export function SkillsGrid({ groupedSkills, techTypeLabels }: SkillsGridProps) {
  const hasSkills = Object.keys(groupedSkills).length > 0;

  if (!hasSkills) {
    return <p className="text-gray-600">No skills available.</p>;
  }

  return (
    <>
      {Object.entries(groupedSkills).map(([type, skills]) => (
        <section key={type} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
            {techTypeLabels[type] || type}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard
                key={skill.id}
                name={skill.name}
                description={skill.description}
                iconPath={skill.iconPath}
                skillLevel={skill.skillLevel}
                type={techTypeLabels[skill.type] || skill.type}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
