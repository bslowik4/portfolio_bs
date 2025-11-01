'use client';

import { ProjectCard } from './ProjectCard';
import { Project } from '@/types/project';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No projects to show yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          description={project.description}
          tags={project.tags}
          images={project.images}
          technologies={project.technologies}
          slug={project.slug}
        />
      ))}
    </div>
  );
}
