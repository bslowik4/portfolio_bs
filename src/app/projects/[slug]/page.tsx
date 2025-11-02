import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/projects/detail/ProjectDetail';
import fs from 'fs';
import path from 'path';

const VALID_IMAGE_TYPES = ['.png', '.jpg', '.gif', '.svg'];

function getProjectImages(imagesPath: string | null): string[] {
  if (!imagesPath) return [];

  const relativePath = imagesPath.startsWith('/') ? imagesPath.slice(1) : imagesPath;
  const absolutePath = path.join(process.cwd(), 'public', relativePath);

  if (!fs.existsSync(absolutePath)) return [];

  const fileList = fs.readdirSync(absolutePath);

  return fileList
    .filter((filename) => VALID_IMAGE_TYPES.includes(path.extname(filename).toLowerCase()))
    .map((filename) => `${imagesPath}/${filename}`);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const projectData = await prisma.project.findUnique({
    where: { slug },
    include: {
      technologies: {
        include: {
          technology: {
            select: { name: true, iconPath: true },
          },
        },
      },
    },
  });

  if (!projectData) {
    notFound();
  }

  const projectImages = getProjectImages(projectData.imagesPath);

  const projectInfo = {
    id: projectData.id,
    name: projectData.name,
    description: projectData.description,
    tags: projectData.tags,
    images: projectImages.length > 0 ? projectImages : null,
    slug: projectData.slug,
    technologies: projectData.technologies.map((tech) => ({
      name: tech.technology.name,
      iconPath: tech.technology.iconPath,
    })),
  };

  return <ProjectDetail project={projectInfo} />;
}
