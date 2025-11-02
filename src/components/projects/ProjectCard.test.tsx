import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import '@testing-library/jest-dom';

// Mock animejs
jest.mock('animejs', () => ({
  animate: jest.fn(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => {
    return <img src={src} alt={alt} />;
  },
}));

describe('ProjectCard', () => {
  const mockProject = {
    name: 'Test Project',
    description: 'This is a test project description',
    tags: ['Web', 'Mobile'],
    images: ['/test-image.png', '/test-image-2.png'],
    technologies: [
      { name: 'React', iconPath: '/icons/React.svg' },
      { name: 'TypeScript', iconPath: '/icons/TypeScript.svg' },
      { name: 'Node.js', iconPath: '/icons/Nodejs.svg' },
    ],
    slug: 'test-project',
  };

  it('renders project name', () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
  });

  it('renders project image when images are provided', () => {
    render(<ProjectCard {...mockProject} />);
    const image = screen.getByAltText('Test Project preview');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.png');
  });

  it('renders shield.svg when images is null', () => {
    render(<ProjectCard {...mockProject} images={null} />);
    const image = screen.getByAltText('Test Project preview');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/projects/shield.svg');
  });

  it('shows project type badge when no images', () => {
    const { container } = render(<ProjectCard {...mockProject} images={null} />);
    const typeBadge = container.querySelector('.from-indigo-500');
    expect(typeBadge).toBeInTheDocument();
    expect(typeBadge).toHaveTextContent('Mobile');
  });

  it('shows project type badge when only one image', () => {
    const { container } = render(<ProjectCard {...mockProject} images={['/single-image.png']} />);
    const typeBadge = container.querySelector('.from-indigo-500');
    expect(typeBadge).toBeInTheDocument();
    expect(typeBadge).toHaveTextContent('Mobile');
  });

  it('renders all technologies', () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders technology icons', () => {
    render(<ProjectCard {...mockProject} />);
    const reactIcon = screen.getByAltText('React');
    expect(reactIcon).toBeInTheDocument();
    expect(reactIcon).toHaveAttribute('src', '/icons/React.svg');
  });

  it('renders all tags', () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByText('Web')).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
  });

  it('shows Tech Stack label', () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByText('Tech Stack')).toBeInTheDocument();
  });

  it('shows navigation arrows when multiple images', () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();
  });

  it('does not show navigation arrows with single image but shows type tag', () => {
    const { container } = render(<ProjectCard {...mockProject} images={['/single-image.png']} />);
    expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument();

    const typeBadge = container.querySelector('.from-indigo-500');
    expect(typeBadge).toBeInTheDocument();
  });

  it('limits technologies to 6 when not expanded', () => {
    const manyTechs = Array.from({ length: 10 }, (_, i) => ({
      name: `Tech ${i + 1}`,
      iconPath: `/icons/tech${i + 1}.svg`,
    }));

    render(<ProjectCard {...mockProject} technologies={manyTechs} />);

    expect(screen.getByText('Tech 1')).toBeInTheDocument();
    expect(screen.getByText('Tech 6')).toBeInTheDocument();

    expect(screen.getByText('+4')).toBeInTheDocument();
  });

  it('handles empty tags array', () => {
    render(<ProjectCard {...mockProject} tags={[]} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('handles null description', () => {
    render(<ProjectCard {...mockProject} description={null} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.queryByText('This is a test project description')).not.toBeInTheDocument();
  });

  it('renders with minimal props', () => {
    const minimalProps = {
      name: 'Minimal Project',
      description: null,
      tags: [],
      images: null,
      technologies: [],
      slug: 'minimal-project',
    };

    render(<ProjectCard {...minimalProps} />);
    expect(screen.getByText('Minimal Project')).toBeInTheDocument();
  });

  it('renders shield.svg for empty images array', () => {
    render(<ProjectCard {...mockProject} images={[]} />);
    const image = screen.getByAltText('Test Project preview');
    expect(image).toHaveAttribute('src', '/images/projects/shield.svg');
  });
});
