'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Gamepad2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pt-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-brand-orange/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-brand-violet/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5">
          <Sparkles size={14} className="text-brand-amber" />
          <span className="font-body text-xs text-[var(--color-text-secondary)]">
            Tutorials, Assets & Devlogs for Indie Game Devs
          </span>
        </div>

        <h1 className="font-display text-fluid-4xl font-bold leading-[1.1] tracking-tight">
          Craft Games.{' '}
          <span className="gradient-text">Ship Art.</span>
          <br />
          Share the Journey.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl font-body text-fluid-base text-[var(--color-text-secondary)]">
          Deep dives into shaders, procedural generation, game architecture,
          and the creative chaos of indie game development — plus premium
          assets to accelerate your projects.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/blog" className="cozy-button-primary">
            <Gamepad2 size={18} />
            Read the Blog
            <ArrowRight size={16} />
          </Link>
          <Link href="/shop" className="cozy-button-secondary">
            Browse Assets
          </Link>
        </div>
      </div>
    </section>
  );
}
