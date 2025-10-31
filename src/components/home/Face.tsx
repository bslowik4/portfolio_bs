'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { createAnimatable, utils } from 'animejs';

export default function Face() {
  const bitmojiSize = 320;
  const eyeSize = 20;

  const podRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let bounds: DOMRect | null = null;
    let onMoveHandler: ((e: MouseEvent) => void) | null = null;

    const refreshBounds = () => {
      if (!podRef.current) return;
      bounds = podRef.current.getBoundingClientRect();
    };

    try {
      if (!podRef.current || !leftRef.current || !rightRef.current) return;

      refreshBounds();

      const leftAnim = createAnimatable(leftRef.current, { x: 500, y: 500, ease: 'out(3)' });
      const rightAnim = createAnimatable(rightRef.current, { x: 500, y: 500, ease: 'out(3)' });

      onMoveHandler = (e: MouseEvent) => {
        if (!bounds) refreshBounds();
        if (!bounds) return;

        if (!leftAnim || !rightAnim) return;

        const { width, height, left, top } = bounds;
        const hw = width / 2;
        const hh = height / 2;

        const x = utils.clamp(e.clientX - left - hw, -hw, hw) / hw;
        const y = utils.clamp(e.clientY - top - hh, -hh, hh) / hh;

        const maxX = 8;
        const maxY = 6;

        leftAnim.x(x * maxX);
        leftAnim.y(y * maxY);

        rightAnim.x(x * maxX);
        rightAnim.y(y * maxY - 2);
      };

      window.addEventListener('mousemove', onMoveHandler);
      window.addEventListener('resize', refreshBounds);
      window.addEventListener('scroll', refreshBounds, true);

      return () => {
        if (onMoveHandler) {
          window.removeEventListener('mousemove', onMoveHandler);
        }
        window.removeEventListener('resize', refreshBounds);
        window.removeEventListener('scroll', refreshBounds, true);
      };
    } catch (err) {
      console.error('animejs usage failed', err);
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}
    >
      <div
        id="bitmoji"
        ref={podRef}
        style={{
          position: 'relative',
          width: bitmojiSize,
          height: bitmojiSize,
          display: 'inline-block',
        }}
      >
        {/* Bitmoji base */}
        <Image
          src="/bitmoji.png"
          alt="Bitmoji"
          width={bitmojiSize}
          height={bitmojiSize}
          style={{ display: 'block' }}
        />

        {/* White stripe which holds the eyes */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '30%',
            transform: 'translateX(-50%)',
            width: '75%',
            height: 36,
            background: '#ffffff',
            borderRadius: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 18%',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        >
          {/* Left eye wrapper */}
          <div
            ref={leftRef}
            className="eye-left"
            style={{
              width: eyeSize,
              height: eyeSize,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              willChange: 'transform',
              pointerEvents: 'none',
            }}
            aria-hidden
          >
            <Image
              src="/eye_left.png"
              alt=""
              width={eyeSize}
              height={eyeSize}
              style={{ display: 'block', pointerEvents: 'none' }}
            />
          </div>
          {/* Right eye wrapper */}
          <div
            ref={rightRef}
            className="eye-right"
            style={{
              width: eyeSize,
              height: eyeSize,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              willChange: 'transform',
              pointerEvents: 'none',
              marginTop: -4,
            }}
            aria-hidden
          >
            <Image
              src="/eye_right.png"
              alt=""
              width={eyeSize}
              height={eyeSize}
              style={{ display: 'block', pointerEvents: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
