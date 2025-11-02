'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';

const CAROUSEL_CONFIG = {
  RADIUS: 500,
  ACTIVE_SCALE: 1,
  INACTIVE_SCALE: 0.75,
  DEPTH_OFFSET: -400,
  MIN_SWIPE_DISTANCE: 50,
  IMAGE_WIDTH: 800,
  IMAGE_HEIGHT: 500,
};

interface CarouselImage {
  src: string;
  alt: string;
  id: string;
}

interface Project3DCarouselProps {
  images: CarouselImage[];
  autoRotate?: boolean;
  autoRotateInterval?: number;
  className?: string;
}

const extractImageName = (src: string): string => {
  const filename = src.split('/').pop() || '';
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  const nameWithoutPrefix = nameWithoutExt.replace(/^\d+-/, '');
  return nameWithoutPrefix
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function Project3DCarousel({
  images,
  autoRotate = false,
  autoRotateInterval = 5000,
  className = '',
}: Project3DCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const rotation = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const getPosition = useCallback(
    (index: number, rotation: number) => {
      const angleIncrement = (2 * Math.PI) / images.length;
      const angle = index * angleIncrement + rotation;

      const x = Math.sin(angle) * CAROUSEL_CONFIG.RADIUS;
      const z = Math.cos(angle) * CAROUSEL_CONFIG.RADIUS + CAROUSEL_CONFIG.DEPTH_OFFSET;

      const normalizedZ = (z - CAROUSEL_CONFIG.DEPTH_OFFSET) / CAROUSEL_CONFIG.RADIUS;
      const scale =
        CAROUSEL_CONFIG.INACTIVE_SCALE +
        ((CAROUSEL_CONFIG.ACTIVE_SCALE - CAROUSEL_CONFIG.INACTIVE_SCALE) * (normalizedZ + 1)) / 2;
      const opacity = Math.max(0.3, 0.5 + normalizedZ * 0.5);

      return { x, y: 0, z, scale, opacity };
    },
    [images.length]
  );

  const animateCarousel = useCallback(
    (targetRotation: number) => {
      if (isAnimating) return;
      setIsAnimating(true);

      const startRotation = rotation.current;
      const rotationDiff = targetRotation - startRotation;

      let progress = 0;
      const step = () => {
        progress += 1 / 60;
        if (progress >= 1) progress = 1;

        // easeOutExpo easing
        const easedProgress = 1 - Math.pow(2, -10 * progress);
        const currentRotation = startRotation + rotationDiff * easedProgress;
        rotation.current = currentRotation;

        imageRefs.current.forEach((element, index) => {
          if (!element) return;
          const pos = getPosition(index, currentRotation);
          element.style.transform = `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) scale(${pos.scale})`;
          element.style.opacity = pos.opacity.toString();
        });

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          rotation.current = targetRotation;
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(step);
    },
    [getPosition, isAnimating]
  );

  const next = useCallback(() => {
    if (isAnimating || images.length <= 1) return;
    const newIndex = (currentIndex + 1) % images.length;
    const angleIncrement = (2 * Math.PI) / images.length;
    const targetRotation = rotation.current - angleIncrement;
    setCurrentIndex(newIndex);
    animateCarousel(targetRotation);
  }, [isAnimating, images.length, currentIndex, animateCarousel]);

  const previous = useCallback(() => {
    if (isAnimating || images.length <= 1) return;
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    const angleIncrement = (2 * Math.PI) / images.length;
    const targetRotation = rotation.current + angleIncrement;
    setCurrentIndex(newIndex);
    animateCarousel(targetRotation);
  }, [isAnimating, images.length, currentIndex, animateCarousel]);

  const goToIndex = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      const angleIncrement = (2 * Math.PI) / images.length;
      const diff = index - currentIndex;
      const targetRotation = rotation.current - diff * angleIncrement;
      setCurrentIndex(index);
      animateCarousel(targetRotation);
    },
    [isAnimating, currentIndex, images.length, animateCarousel]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previous();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
    },
    [next, previous]
  );

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!touchStart.current) return;

    const deltaX = event.changedTouches[0].clientX - touchStart.current.x;
    const deltaY = Math.abs(event.changedTouches[0].clientY - touchStart.current.y);

    if (Math.abs(deltaX) > CAROUSEL_CONFIG.MIN_SWIPE_DISTANCE && Math.abs(deltaX) > deltaY) {
      deltaX > 0 ? previous() : next();
    }

    touchStart.current = null;
  };

  const handleMouseEnter = () => {
    if (autoRotate) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (autoRotate) setIsPaused(false);
  };

  // Initial positioning
  useEffect(() => {
    imageRefs.current.forEach((element, index) => {
      if (!element) return;
      const pos = getPosition(index, rotation.current);
      element.style.transform = `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) scale(${pos.scale})`;
      element.style.opacity = pos.opacity.toString();
    });
  }, [getPosition]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!autoRotate || images.length <= 1 || isPaused) {
      if (autoRotateTimer.current) {
        clearInterval(autoRotateTimer.current);
      }
      return;
    }

    autoRotateTimer.current = setInterval(next, autoRotateInterval);

    return () => {
      if (autoRotateTimer.current) {
        clearInterval(autoRotateTimer.current);
      }
    };
  }, [autoRotate, autoRotateInterval, images.length, isPaused, next]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[700px] overflow-hidden rounded-2xl bg-white ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="3D Image Carousel"
      aria-live="polite"
    >
      <div
        className="relative w-full h-full"
        style={{
          perspective: '1500px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="absolute rounded-xl overflow-hidden cursor-pointer bg-white border border-slate-200"
              style={{
                width: `${CAROUSEL_CONFIG.IMAGE_WIDTH}px`,
                height: `${CAROUSEL_CONFIG.IMAGE_HEIGHT}px`,
                transformStyle: 'preserve-3d',
                boxShadow:
                  index === currentIndex
                    ? '0 15px 40px rgba(0,0,0,0.15)'
                    : '0 8px 20px rgba(0,0,0,0.1)',
              }}
              onClick={() => goToIndex(index)}
              role="button"
              tabIndex={index === currentIndex ? 0 : -1}
              aria-label={`${image.alt}, image ${index + 1} of ${images.length}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="800px"
                  className="object-contain"
                  priority={index === 0}
                  quality={95}
                />
                {/* Image caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent py-4 px-6">
                  <p className="text-white font-semibold text-lg text-center drop-shadow-lg">
                    {extractImageName(image.src)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={previous}
            disabled={isAnimating}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition-all hover:scale-105 disabled:opacity-50 border border-slate-200"
            aria-label="Previous image"
          >
            <svg
              className="w-5 h-5 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={next}
            disabled={isAnimating}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition-all hover:scale-105 disabled:opacity-50 border border-slate-200"
            aria-label="Next image"
          >
            <svg
              className="w-5 h-5 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-white/90 px-4 py-2 rounded-full shadow-md border border-slate-200">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToIndex(index)}
                disabled={isAnimating || index === currentIndex}
                className={`transition-all duration-500 ease-out rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2.5 bg-blue-500 scale-110'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400 hover:scale-125'
                }`}
                style={{
                  transitionProperty: 'width, height, background-color, transform',
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-6 right-6 z-10 bg-white/90 px-3 py-1.5 rounded-full shadow-md border border-slate-200">
            <span className="text-slate-600 font-medium text-xs">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
