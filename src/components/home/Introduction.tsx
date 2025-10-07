import React from 'react';
import Face from './Face';

export default function Introduction() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-3xl">
          <p className="text-sm text-muted-foreground mb-4 tracking-wide uppercase">
            Full Stack Developer
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-6 leading-tight text-balance">
            Hello Im Bartłomiej!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
            Im a fullstack developer ready for new expirences and challenges. I encourage you to
            learn more about my experience and previous work.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <Face />
        </div>
      </div>
    </section>
  );
}
