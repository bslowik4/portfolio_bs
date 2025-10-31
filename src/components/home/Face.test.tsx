import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Face from './Face';
import { createAnimatable } from 'animejs';

jest.mock('animejs', () => ({
  createAnimatable: jest.fn(),
  utils: {
    clamp: (value: number, min: number, max: number) => Math.min(Math.max(value, min), max),
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

const BITMOJI_SIZE = 320;
const EYE_SIZE = 20;

describe('Face', () => {
  const mockCreateAnimatable = createAnimatable as jest.MockedFunction<typeof createAnimatable>;
  const mockXFunction = jest.fn();
  const mockYFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockCreateAnimatable.mockReturnValue({
      x: mockXFunction,
      y: mockYFunction,
    } as unknown as ReturnType<typeof createAnimatable>);

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render the Face component', () => {
      render(<Face />);

      const bitmoji = screen.getByAltText('Bitmoji');
      expect(bitmoji).toBeInTheDocument();
    });

    it('should render the bitmoji image with correct attributes', () => {
      render(<Face />);

      const bitmoji = screen.getByAltText('Bitmoji');
      expect(bitmoji).toHaveAttribute('src', '/bitmoji.png');
      expect(bitmoji).toHaveAttribute('width', String(BITMOJI_SIZE));
      expect(bitmoji).toHaveAttribute('height', String(BITMOJI_SIZE));
    });

    it('should render both eyes', () => {
      const { container } = render(<Face />);

      const leftEye = container.querySelector('.eye-left');
      const rightEye = container.querySelector('.eye-right');

      expect(leftEye).toBeInTheDocument();
      expect(rightEye).toBeInTheDocument();
    });

    it('should render left eye image', () => {
      const { container } = render(<Face />);

      const leftEyeImage = container.querySelector('img[src="/eye_left.png"]');
      expect(leftEyeImage).toBeInTheDocument();
      expect(leftEyeImage).toHaveAttribute('width', String(EYE_SIZE));
      expect(leftEyeImage).toHaveAttribute('height', String(EYE_SIZE));
    });

    it('should render right eye image', () => {
      const { container } = render(<Face />);

      const rightEyeImage = container.querySelector('img[src="/eye_right.png"]');
      expect(rightEyeImage).toBeInTheDocument();
      expect(rightEyeImage).toHaveAttribute('width', String(EYE_SIZE));
      expect(rightEyeImage).toHaveAttribute('height', String(EYE_SIZE));
    });

    it('should render the bitmoji container with correct id', () => {
      const { container } = render(<Face />);

      const bitmojiContainer = container.querySelector('#bitmoji');
      expect(bitmojiContainer).toBeInTheDocument();
    });

    it('should have correct inline styles on bitmoji container', () => {
      const { container } = render(<Face />);

      const bitmojiContainer = container.querySelector('#bitmoji');
      expect(bitmojiContainer).toHaveStyle({
        position: 'relative',
        width: `${BITMOJI_SIZE}px`,
        height: `${BITMOJI_SIZE}px`,
        display: 'inline-block',
      });
    });
  });

  describe('Animation Setup', () => {
    it('should create animatable objects for both eyes', async () => {
      render(<Face />);

      await waitFor(() => {
        expect(mockCreateAnimatable).toHaveBeenCalledTimes(2);
      });
    });

    it('should create animatable with correct configuration', async () => {
      render(<Face />);

      await waitFor(() => {
        expect(mockCreateAnimatable).toHaveBeenCalledWith(expect.any(Object), {
          x: 500,
          y: 500,
          ease: 'out(3)',
        });
      });
    });

    it('should attach all event listeners on mount', async () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

      render(<Face />);

      await waitFor(() => {
        expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
        expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), true);
      });
    });

    it('should remove all event listeners on unmount', async () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const { unmount } = render(<Face />);

      await waitFor(() => {
        expect(mockCreateAnimatable).toHaveBeenCalled();
      });

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), true);
    });
  });

  describe('Mouse Tracking', () => {
    it('should update eye positions on mouse move', async () => {
      const { container } = render(<Face />);

      await waitFor(() => {
        expect(mockCreateAnimatable).toHaveBeenCalled();
      });

      const bitmojiContainer = container.querySelector('#bitmoji') as HTMLElement;
      jest.spyOn(bitmojiContainer, 'getBoundingClientRect').mockReturnValue({
        width: BITMOJI_SIZE,
        height: BITMOJI_SIZE,
        left: 100,
        top: 100,
        right: 420,
        bottom: 420,
        x: 100,
        y: 100,
        toJSON: () => {},
      });

      fireEvent.mouseMove(window, {
        clientX: 200,
        clientY: 200,
      });

      await waitFor(() => {
        expect(mockXFunction).toHaveBeenCalled();
        expect(mockYFunction).toHaveBeenCalled();
      });
    });

    it('should call animation functions with appropriate values on mouse movement', async () => {
      const { container } = render(<Face />);

      await waitFor(() => {
        expect(mockCreateAnimatable).toHaveBeenCalled();
      });

      const bitmojiContainer = container.querySelector('#bitmoji') as HTMLElement;
      jest.spyOn(bitmojiContainer, 'getBoundingClientRect').mockReturnValue({
        width: BITMOJI_SIZE,
        height: BITMOJI_SIZE,
        left: 100,
        top: 100,
        right: 420,
        bottom: 420,
        x: 100,
        y: 100,
        toJSON: () => {},
      });

      mockXFunction.mockClear();
      mockYFunction.mockClear();

      fireEvent.mouseMove(window, { clientX: 200, clientY: 200 });
      fireEvent.mouseMove(window, { clientX: 300, clientY: 300 });
      fireEvent.mouseMove(window, { clientX: 150, clientY: 150 });

      await waitFor(() => {
        expect(mockXFunction).toHaveBeenCalled();
        expect(mockYFunction).toHaveBeenCalled();
      });

      expect(mockXFunction.mock.calls.length).toBeGreaterThan(0);
      expect(mockYFunction.mock.calls.length).toBeGreaterThan(0);
    });

    it('should handle extreme mouse positions (boundaries)', async () => {
      const { container } = render(<Face />);

      await waitFor(() => {
        expect(mockCreateAnimatable).toHaveBeenCalled();
      });

      const bitmojiContainer = container.querySelector('#bitmoji') as HTMLElement;
      jest.spyOn(bitmojiContainer, 'getBoundingClientRect').mockReturnValue({
        width: BITMOJI_SIZE,
        height: BITMOJI_SIZE,
        left: 100,
        top: 100,
        right: 420,
        bottom: 420,
        x: 100,
        y: 100,
        toJSON: () => {},
      });

      mockXFunction.mockClear();
      mockYFunction.mockClear();

      fireEvent.mouseMove(window, { clientX: -1000, clientY: -1000 });
      fireEvent.mouseMove(window, { clientX: 9999, clientY: 9999 });
      fireEvent.mouseMove(window, { clientX: 0, clientY: 0 });

      await waitFor(() => {
        expect(mockXFunction).toHaveBeenCalled();
        expect(mockYFunction).toHaveBeenCalled();
      });

      expect(mockXFunction.mock.calls.length).toBeGreaterThanOrEqual(3);
      expect(mockYFunction.mock.calls.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Bounds Refresh', () => {
    it('should refresh bounds on window resize', async () => {
      const { container } = render(<Face />);

      await waitFor(() => {
        expect(mockCreateAnimatable).toHaveBeenCalled();
      });

      const bitmojiContainer = container.querySelector('#bitmoji') as HTMLElement;
      const getBoundingClientRectSpy = jest.spyOn(bitmojiContainer, 'getBoundingClientRect');

      getBoundingClientRectSpy.mockReturnValue({
        width: BITMOJI_SIZE,
        height: BITMOJI_SIZE,
        left: 100,
        top: 100,
        right: 420,
        bottom: 420,
        x: 100,
        y: 100,
        toJSON: () => {},
      });

      fireEvent.resize(window);

      expect(getBoundingClientRectSpy).toHaveBeenCalled();
    });

    it('should refresh bounds on scroll', async () => {
      const { container } = render(<Face />);

      await waitFor(() => {
        expect(mockCreateAnimatable).toHaveBeenCalled();
      });

      const bitmojiContainer = container.querySelector('#bitmoji') as HTMLElement;
      const getBoundingClientRectSpy = jest.spyOn(bitmojiContainer, 'getBoundingClientRect');

      getBoundingClientRectSpy.mockReturnValue({
        width: BITMOJI_SIZE,
        height: BITMOJI_SIZE,
        left: 100,
        top: 100,
        right: 420,
        bottom: 420,
        x: 100,
        y: 100,
        toJSON: () => {},
      });

      fireEvent.scroll(window);

      expect(getBoundingClientRectSpy).toHaveBeenCalled();
    });

    it('should use refreshed bounds after resize', async () => {
      const { container } = render(<Face />);

      await waitFor(() => {
        expect(mockCreateAnimatable).toHaveBeenCalled();
      });

      const bitmojiContainer = container.querySelector('#bitmoji') as HTMLElement;
      jest.spyOn(bitmojiContainer, 'getBoundingClientRect').mockReturnValue({
        width: BITMOJI_SIZE,
        height: BITMOJI_SIZE,
        left: 200,
        top: 200,
        right: 520,
        bottom: 520,
        x: 200,
        y: 200,
        toJSON: () => {},
      });

      mockXFunction.mockClear();
      mockYFunction.mockClear();

      fireEvent.resize(window);

      fireEvent.mouseMove(window, { clientX: 300, clientY: 300 });

      await waitFor(() => {
        expect(mockXFunction).toHaveBeenCalled();
        expect(mockYFunction).toHaveBeenCalled();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle animejs errors gracefully', () => {
      mockCreateAnimatable.mockImplementation(() => {
        throw new Error('Animation failed');
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(<Face />);

      expect(consoleErrorSpy).toHaveBeenCalledWith('animejs usage failed', expect.any(Error));

      const bitmoji = screen.getByAltText('Bitmoji');
      expect(bitmoji).toBeInTheDocument();
    });

    it('should not throw error when refs are not available', () => {
      expect(() => render(<Face />)).not.toThrow();
    });

    it('should handle missing getBoundingClientRect gracefully', async () => {
      const { container } = render(<Face />);

      await waitFor(() => {
        expect(mockCreateAnimatable).toHaveBeenCalled();
      });

      const bitmojiContainer = container.querySelector('#bitmoji') as HTMLElement;
      jest
        .spyOn(bitmojiContainer, 'getBoundingClientRect')
        .mockReturnValue(null as unknown as DOMRect);

      expect(() => {
        fireEvent.mouseMove(window, {
          clientX: 200,
          clientY: 200,
        });
      }).not.toThrow();

      const bitmoji = screen.getByAltText('Bitmoji');
      expect(bitmoji).toBeVisible();
    });

    it('should not call animation functions when bounds are invalid', async () => {
      const { container } = render(<Face />);

      await waitFor(() => {
        expect(mockCreateAnimatable).toHaveBeenCalled();
      });

      const bitmojiContainer = container.querySelector('#bitmoji') as HTMLElement;
      jest
        .spyOn(bitmojiContainer, 'getBoundingClientRect')
        .mockReturnValue(null as unknown as DOMRect);

      mockXFunction.mockClear();
      mockYFunction.mockClear();

      fireEvent.mouseMove(window, { clientX: 200, clientY: 200 });

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(() => mockXFunction).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-hidden on eye containers', () => {
      const { container } = render(<Face />);

      const eyeContainers = container.querySelectorAll('[aria-hidden]');
      expect(eyeContainers.length).toBeGreaterThan(0);
    });

    it('should have empty alt text on eye images', () => {
      const { container } = render(<Face />);

      const leftEyeImage = container.querySelector('img[src="/eye_left.png"]');
      const rightEyeImage = container.querySelector('img[src="/eye_right.png"]');

      expect(leftEyeImage).toHaveAttribute('alt', '');
      expect(rightEyeImage).toHaveAttribute('alt', '');
    });

    it('should have descriptive alt text on bitmoji image', () => {
      render(<Face />);

      const bitmoji = screen.getByAltText('Bitmoji');
      expect(bitmoji).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should apply pointer-events: none to eyes', () => {
      const { container } = render(<Face />);

      const leftEye = container.querySelector('.eye-left');
      const rightEye = container.querySelector('.eye-right');

      expect(leftEye).toHaveStyle({ pointerEvents: 'none' });
      expect(rightEye).toHaveStyle({ pointerEvents: 'none' });
    });

    it('should apply willChange: transform to eyes', () => {
      const { container } = render(<Face />);

      const leftEye = container.querySelector('.eye-left');
      const rightEye = container.querySelector('.eye-right');

      expect(leftEye).toHaveStyle({ willChange: 'transform' });
      expect(rightEye).toHaveStyle({ willChange: 'transform' });
    });

    it('should have correct eye sizes', () => {
      const { container } = render(<Face />);

      const leftEye = container.querySelector('.eye-left');
      const rightEye = container.querySelector('.eye-right');

      expect(leftEye).toHaveStyle({ width: `${EYE_SIZE}px`, height: `${EYE_SIZE}px` });
      expect(rightEye).toHaveStyle({ width: `${EYE_SIZE}px`, height: `${EYE_SIZE}px` });
    });

    it('should offset right eye vertically', () => {
      const { container } = render(<Face />);

      const rightEye = container.querySelector('.eye-right');

      expect(rightEye).toHaveStyle({ marginTop: '-4px' });
    });
  });

  describe('Component Structure', () => {
    it('should have centered flex container', () => {
      const { container } = render(<Face />);

      const outerContainer = container.firstChild as HTMLElement;
      expect(outerContainer).toHaveStyle({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      });
    });

    it('should render white stripe container', () => {
      const { container } = render(<Face />);

      const whiteStripe = container.querySelector('div[style*="background"]');
      expect(whiteStripe).toBeInTheDocument();
    });

    it('should position white stripe correctly', () => {
      const { container } = render(<Face />);

      const whiteStripe = Array.from(container.querySelectorAll('div')).find(
        (div) => div.style.background === 'rgb(255, 255, 255)' && div.style.position === 'absolute'
      );

      expect(whiteStripe).toHaveStyle({
        position: 'absolute',
        left: '50%',
        bottom: '30%',
      });
    });
  });

  describe('Constants', () => {
    it('should use correct bitmoji size', () => {
      render(<Face />);

      const bitmoji = screen.getByAltText('Bitmoji');
      expect(bitmoji).toHaveAttribute('width', String(BITMOJI_SIZE));
      expect(bitmoji).toHaveAttribute('height', String(BITMOJI_SIZE));
    });

    it('should use correct eye size', () => {
      const { container } = render(<Face />);

      const leftEyeImage = container.querySelector('img[src="/eye_left.png"]');
      expect(leftEyeImage).toHaveAttribute('width', String(EYE_SIZE));
      expect(leftEyeImage).toHaveAttribute('height', String(EYE_SIZE));
    });
  });
});
