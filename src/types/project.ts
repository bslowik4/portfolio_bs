export interface Technology {
  name: string;
  iconPath: string | null;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  tags: string[];
  images: string[] | null;
  technologies: Technology[];
  slug: string;
}
