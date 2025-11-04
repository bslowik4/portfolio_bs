'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { animate } from 'animejs';
import { Technology } from '@/types/project';

interface ProjectCardProps {
  name: string;
  description: string | null;
  tags: string[];
  images: string[] | null;
  technologies: Technology[];
  slug: string;
}

const ROTATION_LIMIT = 15;
const TILT_DURATION = 400;
const RESET_DURATION = 600;

export function ProjectCard({
  name,
  description,
  tags,
  images,
  technologies,
  slug,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasImages = useMemo(() => images && images.length > 0, [images]);
  const displayImage = useMemo(
    () => (hasImages ? images![currentImageIndex] : '/images/projects/shield.svg'),
    [hasImages, images, currentImageIndex]
  );
  const shouldShowTypeTag = useMemo(() => !hasImages || images?.length === 1, [hasImages, images]);
  const projectType = useMemo(
    () => (shouldShowTypeTag && tags.length > 0 ? tags.at(-1) : null),
    [shouldShowTypeTag, tags]
  );

  // 3D tilt effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      try {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -ROTATION_LIMIT;
        const rotateY = ((x - centerX) / centerX) * ROTATION_LIMIT;

        animate(card, {
          rotateX: `${rotateX}deg`,
          rotateY: `${rotateY}deg`,
          duration: TILT_DURATION,
          easing: 'easeOutQuad',
        });
      } catch (error) {
        console.error('Tilt animation error:', error);
      }
    };

    const handleMouseLeave = () => {
      try {
        animate(card, {
          rotateX: '0deg',
          rotateY: '0deg',
          duration: RESET_DURATION,
          easing: 'easeOutElastic(1, .6)',
        });
      } catch (error) {
        console.error('Reset animation error:', error);
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Image transition animation
  useEffect(() => {
    const imageContainer = imageRef.current;
    if (!imageContainer || isTransitioning) return;

    setIsTransitioning(true);

    try {
      animate(imageContainer, {
        opacity: [0, 1],
        scale: [0.9, 1.05, 1],
        rotateY: ['-15deg', '0deg'],
        duration: 600,
        easing: 'easeOutElastic(1, .8)',
        complete: () => setIsTransitioning(false),
      });
    } catch (error) {
      console.error('Image transition error:', error);
      setIsTransitioning(false);
    }
  }, [currentImageIndex, isTransitioning]);

  const handlePrevImage = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isTransitioning || !images) return;
      setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [isTransitioning, images]
  );

  const handleNextImage = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isTransitioning || !images) return;
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [isTransitioning, images]
  );

  const goToImage = useCallback(
    (e: React.MouseEvent, i: number) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isTransitioning) setCurrentImageIndex(i);
    },
    [isTransitioning]
  );

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <Link
      href={`/projects/${slug}`}
      className={`relative block h-[550px] w-full transition-opacity duration-300 ${
      isLoading ? "opacity-60 pointer-events-none" : ""
      }`}
      onClick={() => setIsLoading(true)}
    >
      <div ref={cardRef} className="absolute inset-0 [perspective:1500px]">
        <div className="relative w-full h-full bg-gradient-to-br from-white to-slate-50 rounded-2xl border-[3px] border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)_inset] transition-all duration-300 overflow-hidden [transform-style:preserve-3d] hover:shadow-[0_20px_50px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05)_inset] group cursor-pointer">
          <div className="absolute inset-2 border-2 border-slate-300 rounded-xl pointer-events-none" />

          <div className="relative w-full h-full p-5 flex flex-col z-[1]">
            <div
              className="relative w-full h-[220px] mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 shadow-[0_4px_12px_rgba(59,130,246,0.15)] flex-shrink-0"
              onClick={handleImageClick}
            >
              <div ref={imageRef} className="w-full h-full">
                <Image
                  src={displayImage}
                  alt={`${name} preview`}
                  width={400}
                  height={220}
                  className={`${hasImages ? 'object-cover' : 'object-contain p-8'} w-full h-full`}
                  priority={false}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
                />
              </div>

              {shouldShowTypeTag && projectType && (
                <div className="absolute top-4 right-4 z-[3]">
                  <span className="inline-block py-2 px-4 text-sm font-bold text-white bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg border-2 border-white uppercase tracking-wider shadow-[0_4px_12px_rgba(79,70,229,0.4)]">
                    {projectType}
                  </span>
                </div>
              )}

              {hasImages && images && images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-[3] bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 disabled:opacity-50"
                    aria-label="Previous image"
                    disabled={isTransitioning}
                  >
                    <svg
                      className="w-4 h-4 text-slate-800"
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
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-[3] bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 disabled:opacity-50"
                    aria-label="Next image"
                    disabled={isTransitioning}
                  >
                    <svg
                      className="w-4 h-4 text-slate-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[3] flex gap-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => goToImage(e, i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          i === currentImageIndex
                            ? 'bg-white w-7 shadow-lg'
                            : 'bg-white/60 hover:bg-white/90'
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                        disabled={isTransitioning}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="h-[65px] flex items-center justify-center mb-2">
              <h3 className="text-[1.5rem] font-bold text-slate-800 text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.05)] leading-tight line-clamp-2">
                {name}
              </h3>
            </div>

            <div className="h-[55px] flex items-center justify-center mb-3">
              <p className="text-[0.9rem] text-slate-600 text-center leading-relaxed px-2 line-clamp-2">
                {description || '\u00A0'}
              </p>
            </div>

            <div className="flex-1 flex flex-col justify-end">
              <div className="mb-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center mb-2">
                  Tech Stack
                </p>
                <div className="max-h-[70px] sm:max-h-[84px] overflow-hidden flex flex-wrap gap-1.5 sm:gap-2 justify-center content-start">
                  {technologies.slice(0, 6).map((tech, i) => (
                    <div
                      key={`${tech.name}-${i}`}
                      className="group/tech relative flex items-center gap-1 px-2 py-1 bg-white border-2 border-slate-200 rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:border-blue-300 transition-all duration-200"
                      title={tech.name}
                    >
                      {tech.iconPath && (
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 relative flex-shrink-0">
                          <Image
                            src={tech.iconPath}
                            alt={tech.name}
                            width={14}
                            height={14}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="text-[0.65rem] sm:text-[0.65rem] font-medium text-slate-700 group-hover/tech:text-blue-600 transition-colors truncate max-w-[40px] sm:max-w-[56px]">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                  {technologies.length > 6 && (
                    <div className="px-2 py-1 bg-slate-100 border-2 border-slate-200 rounded-lg">
                      <span className="text-[0.65rem] sm:text-[0.65rem] font-medium text-slate-500">
                        +{technologies.length - 6}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-[35px] flex items-center justify-center pt-2 border-t border-slate-200 overflow-hidden">
                {tags.length > 0 ? (
                  <div className="flex gap-1.5 justify-center">
                    {tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={`${tag}-${i}`}
                        className="inline-block py-0.5 px-2 text-[0.65rem] font-semibold text-purple-600 bg-purple-100 rounded-full border border-purple-300 uppercase"
                      >
                        {tag.length > 8 ? tag.slice(0, 8) + '.' : tag}
                      </span>
                    ))}
                    {tags.length > 2 && (
                      <span className="inline-block py-0.5 px-2 text-[0.65rem] font-semibold text-slate-500 bg-slate-100 rounded-full">
                        +{tags.length - 3}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-[0.65rem] text-transparent">&nbsp;</span>
                )}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.4)_50%,transparent_70%)] bg-[length:200%_200%] opacity-0 transition-opacity duration-300 pointer-events-none animate-[holoShine_3s_ease-in-out_infinite] group-hover:opacity-100" />
        </div>
      </div>
        {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <span className="animate-spin rounded-full border-2 border-t-transparent border-black w-6 h-6" />
        </div>
      )}
    </Link>
  );
}
