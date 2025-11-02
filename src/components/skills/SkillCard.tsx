'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { animate } from 'animejs';

interface SkillCardProps {
  name: string;
  description: string | null;
  iconPath: string | null;
  skillLevel: number | null;
  type: string;
}

const ROTATION_LIMIT = 15;
const TILT_DURATION = 400;
const RESET_DURATION = 600;
const EXPAND_SCALE = 1.3;
const EXPAND_DURATION = 600;
const COLLAPSE_DURATION = 500;
const BACKDROP_DELAY = 250;

const SKILL_THRESHOLDS = {
  EXPERT: 8,
  ADVANCED: 6,
  INTERMEDIATE: 4,
} as const;

export function SkillCard({ name, description, iconPath, skillLevel, type }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);

  // 3D tilt effect on mouse movement
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isExpanded) return;

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
    };

    const handleMouseLeave = () => {
      if (isExpanded) return;

      animate(card, {
        rotateX: '0deg',
        rotateY: '0deg',
        duration: RESET_DURATION,
        easing: 'easeOutElastic(1, .6)',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isExpanded]);

  const handleCardClick = useCallback(() => {
    if (isExpanded) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    const translateX = viewportCenterX - (rect.left + rect.width / 2);
    const translateY = viewportCenterY - (rect.top + rect.height / 2);

    setIsExpanded(true);

    setTimeout(() => {
      setShowBackdrop(true);
    }, BACKDROP_DELAY);

    animate(card, {
      translateX,
      translateY,
      scale: EXPAND_SCALE,
      rotateX: '0deg',
      rotateY: '0deg',
      duration: EXPAND_DURATION,
      easing: 'easeOutCubic',
    });
  }, [isExpanded]);

  const handleClose = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    setShowBackdrop(false);

    animate(card, {
      translateX: 0,
      translateY: 0,
      scale: 1,
      rotateX: '0deg',
      rotateY: '0deg',
      duration: COLLAPSE_DURATION,
      easing: 'easeInOutCubic',
      complete: () => {
        setIsExpanded(false);
      },
    });
  }, []);

  const getSkillColorClasses = (level: number) => {
    if (level >= SKILL_THRESHOLDS.EXPERT) return 'from-emerald-500 to-emerald-600';
    if (level >= SKILL_THRESHOLDS.ADVANCED) return 'from-blue-500 to-blue-600';
    if (level >= SKILL_THRESHOLDS.INTERMEDIATE) return 'from-amber-500 to-amber-600';
    return 'from-gray-500 to-gray-600';
  };

  const skillLevelDisplay = skillLevel ?? '?';
  const skillBarWidth = skillLevel ? `${(skillLevel / 10) * 100}%` : '0%';

  return (
    <>
      {showBackdrop && (
        <div
          className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
          onClick={handleClose}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClose()}
          aria-label="Close card overlay"
        />
      )}

      <div ref={containerRef} className="relative h-[500px] w-full">
        <div
          ref={cardRef}
          onClick={handleCardClick}
          className={`absolute inset-0 cursor-pointer transition-[z-index] duration-300 [perspective:1500px] ${
            isExpanded ? 'z-[999]' : 'z-10'
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && !isExpanded && handleCardClick()}
          aria-label={`View details for ${name}`}
          aria-expanded={isExpanded}
        >
          <div className="relative w-full h-full bg-white rounded-2xl border-[3px] border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)_inset] transition-all duration-300 overflow-hidden [transform-style:preserve-3d] hover:shadow-[0_20px_50px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05)_inset] group">
            <div className="absolute inset-2 border-2 border-slate-300 rounded-xl pointer-events-none" />
            <div className="relative w-full h-full p-5 flex flex-col z-[1]">
              <div className="absolute top-4 left-4 text-center z-[2]">
                <div className="text-2xl font-bold text-blue-600">{skillLevelDisplay}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Level</div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-5 mt-[50px] px-3">
                {iconPath && (
                  <div className="w-[100px] h-[100px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-full p-4 shadow-[0_4px_12px_rgba(59,130,246,0.15)]">
                    <Image
                      src={iconPath}
                      alt={`${name} icon`}
                      width={80}
                      height={80}
                      className="object-contain drop-shadow-lg"
                      priority={false}
                    />
                  </div>
                )}

                <h3 className="text-[1.75rem] font-bold text-slate-800 text-center m-0 [text-shadow:0_1px_2px_rgba(0,0,0,0.05)] leading-tight">
                  {name}
                </h3>

                {skillLevel !== null && (
                  <div className="w-full flex flex-col gap-2 items-center">
                    <div className="w-4/5 h-2 bg-slate-200 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]">
                      <div
                        className={`h-full rounded-full transition-[width] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_1px_3px_rgba(0,0,0,0.2)] bg-gradient-to-r ${getSkillColorClasses(skillLevel)}`}
                        style={{ width: skillBarWidth }}
                      />
                    </div>
                    <div className="flex gap-1 text-base" aria-hidden="true">
                      {Array.from({ length: 10 }, (_, i) => (
                        <span
                          key={i}
                          className={`transition-all duration-200 ${
                            i < skillLevel
                              ? 'text-amber-400 [text-shadow:0_1px_2px_rgba(251,191,36,0.5)] animate-[starPulse_2s_ease-in-out_infinite]'
                              : 'text-slate-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {description && (
                  <p
                    className={`text-[0.95rem] text-slate-500 text-center leading-relaxed m-0 px-5 max-w-[90%] transition-all ${isExpanded ? '' : 'line-clamp-3'}`}
                  >
                    {description}
                  </p>
                )}
              </div>

              <div className="absolute bottom-4 right-4 z-[2]">
                <span className="inline-block py-1.5 px-3 text-xs font-semibold text-blue-600 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border border-blue-300 uppercase tracking-wider shadow-[0_2px_4px_rgba(59,130,246,0.1)]">
                  {type}
                </span>
              </div>
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.4)_50%,transparent_70%)] bg-[length:200%_200%] opacity-0 transition-opacity duration-300 pointer-events-none animate-[holoShine_3s_ease-in-out_infinite] group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </>
  );
}
