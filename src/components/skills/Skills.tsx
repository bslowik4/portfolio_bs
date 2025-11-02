import { prisma } from '@/lib/prisma';
import { SkillsGrid } from './SkillsGrid';

const techTypeLabels: Record<string, string> = {
  CoreWeb: 'Core Web',
  Backend: 'Backend',
  Database: 'Database',
  ToolsInfra: 'Tools & Infrastructure',
  UIDesign: 'UI & Design',
  MachineLearning: 'Machine Learning',
  GameDev: 'Game Development',
  Cloud: 'Cloud',
  AI: 'AI',
  Language: 'Programming Languages',
  SoftSkills: 'Soft Skills',
  Testing: 'Testing',
  Others: 'Other Technologies',
};

export default async function Skills() {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: [{ type: 'asc' }, { skillLevel: 'desc' }, { name: 'asc' }],
    });

    const groupedSkills = technologies.reduce(
      (acc, tech) => {
        if (!acc[tech.type]) {
          acc[tech.type] = [];
        }
        acc[tech.type].push(tech);
        return acc;
      },
      {} as Record<string, typeof technologies>
    );

    return (
      <div className="max-w-7xl mx-auto px-4 py-12 bg-white">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-slate-900 mb-6 leading-none tracking-tight [text-shadow:_1px_1px_0_rgba(0,0,0,0.06)]">
            My Skills Deck
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore my deck of technologies and tools — a collection of the skills I&apos;ve
            mastered along the way. Each card reflects my level of experience and proficiency.
          </p>
        </div>

        <SkillsGrid groupedSkills={groupedSkills} techTypeLabels={techTypeLabels} />
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch technologies:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-red-600">Failed to load skills. Please try again later.</p>
      </div>
    );
  }
}
