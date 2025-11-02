'use client';

import { Project } from '@/types/project';
import { Project3DCarousel } from './Project3DCarousel';
import { AnimatedTechStack } from './AnimatedTechStack';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useMemo } from 'react';
import { animate } from 'animejs';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const carouselImages = useMemo(
    () =>
      (project.images || []).map((imageSrc, index) => ({
        id: `${project.slug}-${index}`,
        src: imageSrc,
        alt: `${project.name} screenshot ${index + 1}`,
      })),
    [project.images, project.slug, project.name]
  );

  const hasImages = carouselImages.length > 0;

  useEffect(() => {
    if (headerRef.current) {
      animate(headerRef.current, {
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 800,
        easing: 'easeOutExpo',
      });
    }

    if (contentRef.current) {
      animate(contentRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 200,
        easing: 'easeOutExpo',
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
        >
          <svg
            className="w-5 h-5 text-slate-700 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-slate-700 font-semibold">Back to Projects</span>
        </Link>
      </div>

      <div ref={headerRef} className="max-w-7xl mx-auto px-4 py-12 opacity-0">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-serif font-black mb-10 text-slate-800 tracking-tight relative">
            <span className="absolute inset-0 text-slate-400 blur-lg opacity-40">
              {project.name}
            </span>
            <span className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">{project.name}</span>
          </h1>
          {project.description && (
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {project.tags.map((tag, i) => (
              <div
                key={`${tag}-${i}`}
                className="group relative px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-110 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-white font-bold text-lg uppercase tracking-wider">
                  {tag}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 pb-12 opacity-0">
        {hasImages ? (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-700 text-center mb-8">Project Gallery</h2>
            <Project3DCarousel
              images={carouselImages}
              autoRotate={carouselImages.length > 1}
              autoRotateInterval={6000}
            />
          </div>
        ) : (
          <div className="mb-16 bg-white rounded-3xl p-12 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-[3px] border-slate-200 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-32 h-32 mb-6 relative opacity-30">
              <Image
                src="/images/projects/shield.svg"
                alt="No images available"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-2xl font-bold text-slate-700 text-center">
              No images available for this project
            </p>
          </div>
        )}
        <AnimatedTechStack technologies={project.technologies} />
      </div>
    </div>
  );
}
