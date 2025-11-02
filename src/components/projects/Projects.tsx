import { prisma } from '@/lib/prisma';
import { ProjectsGrid } from './ProjectsGrid';
import fs from 'fs';
import path from 'path';

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.gif', '.svg'];

function getProjectImages(projectName: string, imagesPath: string | null): string[] {
  if (!imagesPath) return [];

  const relativePath = imagesPath.startsWith('/') ? imagesPath.slice(1) : imagesPath;
  const absolutePath = path.join(process.cwd(), 'public', relativePath);

  if (!fs.existsSync(absolutePath)) return [];

  const files = fs.readdirSync(absolutePath);

  return files
    .filter((file) => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .map((file) => `${imagesPath}/${file}`);
}

export default async function Projects() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        technologies: {
          include: {
            technology: {
              select: { name: true, iconPath: true },
            },
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    const transformedProjects = projects.map((project) => {
      const images = getProjectImages(project.name, project.imagesPath);

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        tags: project.tags,
        images: images.length > 0 ? images : null,
        slug: project.slug,
        technologies: project.technologies.map((pt) => ({
          name: pt.technology.name,
          iconPath: pt.technology.iconPath,
        })),
      };
    });

    return (
      <section id="projects" className="max-w-7xl mx-auto px-4 py-16 md:py-24 bg-white">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl mb-8 text-center">
            <span className="inline-block font-serif text-5xl md:text-6xl font-extrabold text-slate-900 leading-none tracking-tight pb-2 [text-shadow:_1px_1px_0_rgba(0,0,0,0.06)]">
              My Projects
            </span>
          </h2>
          <p className="text-slate-600 text-xl md:text-2xl font-light tracking-wide">
            Explore deck of my creations
          </p>
        </div>

        <ProjectsGrid projects={transformedProjects} />
      </section>
    );
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return (
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-red-600">Failed to load projects. Please try again later.</p>
      </section>
    );
  }
}
