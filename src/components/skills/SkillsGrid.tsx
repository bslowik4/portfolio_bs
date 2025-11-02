'use client';

import { SkillCard } from './SkillCard';
import { GroupedSkills, TechTypeLabels } from '@/types/skill';

interface SkillsGridProps {
  groupedSkills: GroupedSkills;
  techTypeLabels: TechTypeLabels;
}

export function SkillsGrid({ groupedSkills, techTypeLabels }: SkillsGridProps) {
  const hasSkills = Object.keys(groupedSkills).length > 0;

  if (!hasSkills) {
    return <p className="text-slate-600">No skills available.</p>;
  }

  return (
    <>
      {Object.entries(groupedSkills).map(([type, skills]) => (
        <section key={type} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 pb-2 border-b border-slate-300 leading-tight tracking-tight select-none">
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
