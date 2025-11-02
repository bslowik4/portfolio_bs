'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import Image from 'next/image';
import { Technology } from '@/types/project';

interface AnimatedTechStackProps {
  technologies: Technology[];
}

export function AnimatedTechStack({ technologies }: AnimatedTechStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    animate(containerRef.current, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutExpo',
    });

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      animate(card, {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1],
        duration: 600,
        delay: i * 50,
        easing: 'easeOutExpo',
      });
    });
  }, []);

  const onHover = (i: number, entering: boolean) => {
    const card = cardRefs.current[i];
    if (!card) return;

    const icon = card.querySelector('.tech-icon');

    if (entering) {
      animate(card, {
        translateY: -8,
        duration: 400,
        easing: 'easeOutExpo',
      });

      if (icon) {
        animate(icon, {
          scale: 1.15,
          rotate: [0, 8, -8, 0],
          duration: 500,
          easing: 'easeOutElastic(1, .6)',
        });
      }
    } else {
      animate(card, {
        translateY: 0,
        duration: 400,
        easing: 'easeOutExpo',
      });

      if (icon) {
        animate(icon, {
          scale: 1,
          duration: 300,
          easing: 'easeOutExpo',
        });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-slate-200 opacity-0"
    >
      <h2 className="text-4xl md:text-6xl font-black text-slate-900 text-center mb-12">
        Tech Stack
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {technologies.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="relative bg-white rounded-2xl p-6 shadow-md border border-slate-200 cursor-pointer opacity-0 hover:shadow-xl transition-shadow"
            onMouseEnter={() => onHover(i, true)}
            onMouseLeave={() => onHover(i, false)}
          >
            <div className="flex flex-col items-center gap-3">
              {tech.iconPath && (
                <div className="tech-icon w-16 h-16 relative">
                  <Image
                    src={tech.iconPath}
                    alt={tech.name}
                    width={64}
                    height={64}
                    className="object-contain drop-shadow-md"
                  />
                </div>
              )}
              <span className="text-center font-semibold text-slate-700 text-sm">{tech.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
