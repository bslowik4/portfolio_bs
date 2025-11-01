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
      orderBy: { createdAt: 'desc' },
    });

    const transformedProjects = projects.map((project) => {
      const images = getProjectImages(project.name, project.imagesPath);

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        tags: project.tags,
        images: images.length > 0 ? images : null,
        technologies: project.technologies.map((pt) => ({
          name: pt.technology.name,
          iconPath: pt.technology.iconPath,
        })),
      };
    });

    return (
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent pb-2 leading-tight">
              My projects
            </span>
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl font-light tracking-wide">
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
