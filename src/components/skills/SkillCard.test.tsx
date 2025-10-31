import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SkillCard } from './SkillCard';
import { animate } from 'animejs';

jest.mock('animejs', () => ({
  animate: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) => {
    return <img {...props} />;
  },
}));

describe('SkillCard', () => {
  const mockAnimate = animate as jest.MockedFunction<typeof animate>;

  const defaultProps = {
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    iconPath: '/icons/react.svg',
    skillLevel: 8,
    type: 'Frontend',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render the skill card with all props', () => {
      render(<SkillCard {...defaultProps} />);

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(
        screen.getByText('A JavaScript library for building user interfaces')
      ).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('Level')).toBeInTheDocument();
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByAltText('React icon')).toBeInTheDocument();
    });

    it('should render without description', () => {
      render(<SkillCard {...defaultProps} description={null} />);

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(
        screen.queryByText('A JavaScript library for building user interfaces')
      ).not.toBeInTheDocument();
    });

    it('should render without icon', () => {
      render(<SkillCard {...defaultProps} iconPath={null} />);

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.queryByAltText('React icon')).not.toBeInTheDocument();
    });

    it('should render "?" when skill level is null', () => {
      render(<SkillCard {...defaultProps} skillLevel={null} />);

      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('should render correct icon path', () => {
      render(<SkillCard {...defaultProps} />);

      const icon = screen.getByAltText('React icon');
      expect(icon).toHaveAttribute('src', '/icons/react.svg');
    });
  });

  describe('Skill Level Display', () => {
    it('should display skill level as number', () => {
      render(<SkillCard {...defaultProps} skillLevel={7} />);

      expect(screen.getByText('7')).toBeInTheDocument();
    });

    it('should render correct number of filled stars', () => {
      render(<SkillCard {...defaultProps} skillLevel={5} />);

      const stars = screen.getAllByText('★');
      expect(stars).toHaveLength(10);
    });

    it('should not render stars when skill level is null', () => {
      render(<SkillCard {...defaultProps} skillLevel={null} />);

      const stars = screen.queryAllByText('★');
      expect(stars).toHaveLength(0);
    });

    it('should apply correct skill bar width for skill level 8', () => {
      const { container } = render(<SkillCard {...defaultProps} skillLevel={8} />);

      const skillBar = container.querySelector('[style*="width"]');
      expect(skillBar).toHaveStyle({ width: '80%' });
    });

    it('should apply correct skill bar width for skill level 5', () => {
      const { container } = render(<SkillCard {...defaultProps} skillLevel={5} />);

      const skillBar = container.querySelector('[style*="width"]');
      expect(skillBar).toHaveStyle({ width: '50%' });
    });

    it('should not render skill bar when skill level is null', () => {
      const { container } = render(<SkillCard {...defaultProps} skillLevel={null} />);
      const skillBarContainer = container.querySelector('.bg-slate-200.rounded-full');
      expect(skillBarContainer).not.toBeInTheDocument();
    });
  });

  describe('Skill Color Classes', () => {
    it('should apply emerald color for expert level (8+)', () => {
      const { container } = render(<SkillCard {...defaultProps} skillLevel={9} />);

      const skillBar = container.querySelector('.from-emerald-500');
      expect(skillBar).toBeInTheDocument();
    });

    it('should apply blue color for advanced level (6-7)', () => {
      const { container } = render(<SkillCard {...defaultProps} skillLevel={7} />);

      const skillBar = container.querySelector('.from-blue-500');
      expect(skillBar).toBeInTheDocument();
    });

    it('should apply amber color for intermediate level (4-5)', () => {
      const { container } = render(<SkillCard {...defaultProps} skillLevel={5} />);

      const skillBar = container.querySelector('.from-amber-500');
      expect(skillBar).toBeInTheDocument();
    });

    it('should apply gray color for beginner level (1-3)', () => {
      const { container } = render(<SkillCard {...defaultProps} skillLevel={3} />);

      const skillBar = container.querySelector('.from-gray-500');
      expect(skillBar).toBeInTheDocument();
    });
  });

  describe('Card Interaction', () => {
    it('should call animate on mouse move', () => {
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });

      fireEvent.mouseMove(card, {
        clientX: 100,
        clientY: 100,
      });

      expect(mockAnimate).toHaveBeenCalled();
    });

    it('should call animate on mouse leave', () => {
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });

      fireEvent.mouseLeave(card);

      expect(mockAnimate).toHaveBeenCalled();
    });

    it('should expand card on click', async () => {
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });

      fireEvent.click(card);

      expect(mockAnimate).toHaveBeenCalled();
      expect(card).toHaveAttribute('aria-expanded', 'true');
    });

    it('should expand card on Enter key press', () => {
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });

      fireEvent.keyDown(card, { key: 'Enter' });

      expect(mockAnimate).toHaveBeenCalled();
      expect(card).toHaveAttribute('aria-expanded', 'true');
    });

    it('should not expand card if already expanded', () => {
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });

      fireEvent.click(card);
      mockAnimate.mockClear();

      fireEvent.click(card);

      expect(card).toHaveAttribute('aria-expanded', 'true');
    });

    it('should show backdrop after expansion with delay', async () => {
      jest.useFakeTimers();
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });

      fireEvent.click(card);

      expect(screen.queryByLabelText('Close card overlay')).not.toBeInTheDocument();

      jest.advanceTimersByTime(250);

      await waitFor(() => {
        expect(screen.getByLabelText('Close card overlay')).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it('should close expanded card when backdrop is clicked', async () => {
      jest.useFakeTimers();
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });

      fireEvent.click(card);
      jest.advanceTimersByTime(250);

      await waitFor(() => {
        expect(screen.getByLabelText('Close card overlay')).toBeInTheDocument();
      });

      mockAnimate.mockClear();

      const backdrop = screen.getByLabelText('Close card overlay');
      fireEvent.click(backdrop);

      expect(mockAnimate).toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('should close expanded card when backdrop receives Enter key', async () => {
      jest.useFakeTimers();
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });

      fireEvent.click(card);
      jest.advanceTimersByTime(250);

      await waitFor(() => {
        expect(screen.getByLabelText('Close card overlay')).toBeInTheDocument();
      });

      mockAnimate.mockClear();

      const backdrop = screen.getByLabelText('Close card overlay');
      fireEvent.keyDown(backdrop, { key: 'Enter' });

      expect(mockAnimate).toHaveBeenCalled();

      jest.useRealTimers();
    });
  });

  describe('Accessibility', () => {
    it('should have correct aria-label on card', () => {
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });
      expect(card).toBeInTheDocument();
    });

    it('should have correct aria-expanded attribute', () => {
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });
      expect(card).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(card);
      expect(card).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have tabIndex on interactive elements', () => {
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('should have aria-hidden on star display', () => {
      const { container } = render(<SkillCard {...defaultProps} />);

      const starContainer = container.querySelector('[aria-hidden="true"]');
      expect(starContainer).toBeInTheDocument();
    });

    it('should have accessible backdrop when expanded', async () => {
      jest.useFakeTimers();
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });
      fireEvent.click(card);
      jest.advanceTimersByTime(250);

      await waitFor(() => {
        const backdrop = screen.getByLabelText('Close card overlay');
        expect(backdrop).toHaveAttribute('role', 'button');
        expect(backdrop).toHaveAttribute('tabIndex', '0');
      });

      jest.useRealTimers();
    });
  });

  describe('Animation Behavior', () => {
    it('should not animate on mouse move when expanded', () => {
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });

      fireEvent.click(card);
      mockAnimate.mockClear();

      fireEvent.mouseMove(card, {
        clientX: 100,
        clientY: 100,
      });

      expect(mockAnimate).not.toHaveBeenCalled();
    });

    it('should not animate on mouse leave when expanded', () => {
      render(<SkillCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: `View details for ${defaultProps.name}` });

      fireEvent.click(card);
      mockAnimate.mockClear();

      fireEvent.mouseLeave(card);

      expect(mockAnimate).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle skill level of 0', () => {
      render(<SkillCard {...defaultProps} skillLevel={0} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should handle skill level of 10', () => {
      const { container } = render(<SkillCard {...defaultProps} skillLevel={10} />);

      expect(screen.getByText('10')).toBeInTheDocument();

      const skillBar = container.querySelector('[style*="width"]');
      expect(skillBar).toHaveStyle({ width: '100%' });
    });

    it('should handle very long skill names', () => {
      const longName = 'A Very Long Skill Name That Could Potentially Break The Layout';
      render(<SkillCard {...defaultProps} name={longName} />);

      expect(screen.getByText(longName)).toBeInTheDocument();
    });

    it('should handle very long descriptions', () => {
      const longDescription =
        'This is a very long description that goes on and on and on and on and on and on and on and on and on and on and should be properly truncated when not expanded';
      render(<SkillCard {...defaultProps} description={longDescription} />);

      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it('should handle special characters in name', () => {
      render(<SkillCard {...defaultProps} name="C++ & C#" />);

      expect(screen.getByText('C++ & C#')).toBeInTheDocument();
    });

    it('should handle empty string description', () => {
      render(<SkillCard {...defaultProps} description="" />);

      expect(
        screen.queryByText('A JavaScript library for building user interfaces')
      ).not.toBeInTheDocument();
    });
  });

  describe('Type Badge', () => {
    it('should display the correct skill type', () => {
      render(<SkillCard {...defaultProps} type="Backend" />);

      expect(screen.getByText('Backend')).toBeInTheDocument();
    });

    it('should handle different skill types', () => {
      const types = ['Frontend', 'Backend', 'DevOps', 'Database', 'Tool'];

      types.forEach((type) => {
        const { unmount } = render(<SkillCard {...defaultProps} type={type} />);
        expect(screen.getByText(type)).toBeInTheDocument();
        unmount();
      });
    });
  });
});
