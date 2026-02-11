import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gamepad2, Cpu } from 'lucide-react';
import { projectsConfig } from '@/lib/config/projects.config';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Game projects, prototypes, and creative experiments.',
};

export default function ProjectsPage() {
  const projects = Object.values(projectsConfig);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-28">
      <header className="mb-10">
        <h1 className="font-display text-fluid-3xl font-bold">Projects</h1>
        <p className="mt-2 font-body text-fluid-base text-[var(--color-text-secondary)]">
          Game projects, prototypes, and creative experiments.
        </p>
      </header>

      {projects.length > 0 ? (
        <div className="grid gap-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="cozy-card group grid overflow-hidden md:grid-cols-2"
            >
              <div className="relative aspect-video overflow-hidden md:aspect-auto md:min-h-[280px]">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                <span
                  className="absolute left-4 top-4 rounded-full px-3 py-1 font-display text-xs font-semibold text-white"
                  style={{ backgroundColor: project.accentColor }}
                >
                  {project.status}
                </span>
              </div>

              <div className="flex flex-col justify-center p-6 md:p-8">
                <h2 className="font-display text-fluid-2xl font-bold text-[var(--color-text-primary)] transition-colors group-hover:text-brand-orange">
                  {project.title}
                </h2>
                <p className="mt-2 font-body text-fluid-base text-[var(--color-text-secondary)]">
                  {project.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-elevated)] px-3 py-1 font-body text-xs text-[var(--color-text-muted)]">
                    <Gamepad2 size={12} />
                    {project.genre}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-elevated)] px-3 py-1 font-body text-xs text-[var(--color-text-muted)]">
                    <Cpu size={12} />
                    {project.engine}
                  </span>
                </div>

                <span className="mt-6 inline-flex items-center gap-1 font-body text-sm font-medium text-brand-orange">
                  View Project <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-cozy-lg border border-dashed border-[var(--color-border)] p-12 text-center">
          <p className="font-body text-[var(--color-text-muted)]">
            No projects yet. Add projects to <code className="font-mono text-brand-violet">projects.config.ts</code>.
          </p>
        </div>
      )}
    </div>
  );
}
