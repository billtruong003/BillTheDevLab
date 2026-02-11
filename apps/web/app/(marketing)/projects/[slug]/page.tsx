import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Gamepad2, Cpu, Calendar } from 'lucide-react';
import { projectsConfig } from '@/lib/config/projects.config';
import { formatDate } from '@/lib/utils/format';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(projectsConfig).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsConfig[slug];
  if (!project) return { title: 'Not Found' };

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [{ url: project.heroImage }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsConfig[slug];

  if (!project) notFound();

  return (
    <div className="pb-20">
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/projects"
              className="mb-4 inline-flex items-center gap-1.5 font-body text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft size={14} />
              All Projects
            </Link>

            <h1 className="font-display text-fluid-4xl font-bold text-white">{project.title}</h1>
            <p className="mt-2 max-w-xl font-body text-fluid-base text-white/80">
              {project.tagline}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-body text-xs text-white/80 backdrop-blur-sm">
                <Gamepad2 size={12} />
                {project.genre}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-body text-xs text-white/80 backdrop-blur-sm">
                <Cpu size={12} />
                {project.engine}
              </span>
              <span
                className="rounded-full px-3 py-1 font-display text-xs font-semibold text-white"
                style={{ backgroundColor: project.accentColor }}
              >
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-12">
        {project.sections.map((section) => (
          <section key={section.id} className="mb-16">
            <h2 className="mb-6 font-display text-fluid-2xl font-bold">{section.title}</h2>

            {section.type === 'gallery' && section.items && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item, i) => {
                  const isVideo = item.image?.endsWith('.mp4') || item.image?.endsWith('.webm');
                  return (
                    <div key={i} className="group relative aspect-video overflow-hidden rounded-cozy border border-[var(--color-border)]">
                      {item.image && (
                        isVideo ? (
                          <video
                            src={item.image}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        ) : (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <span className="font-display text-sm font-semibold text-white">{item.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {section.type === 'features' && section.items && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item, i) => (
                  <div key={i} className="cozy-card p-5">
                    <h3 className="font-display text-fluid-base font-semibold text-[var(--color-text-primary)]">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-2 font-body text-sm text-[var(--color-text-secondary)]">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.type === 'devlog' && section.items && (
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.link || '#'}
                    className="group flex items-center justify-between rounded-cozy border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-brand-orange"
                  >
                    <div>
                      <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)] transition-colors group-hover:text-brand-orange">
                        {item.title}
                      </h3>
                      {item.date && (
                        <span className="mt-1 inline-flex items-center gap-1 font-body text-xs text-[var(--color-text-muted)]">
                          <Calendar size={10} />
                          {formatDate(item.date)}
                        </span>
                      )}
                    </div>
                    <ArrowRight size={16} className="text-[var(--color-text-muted)] transition-colors group-hover:text-brand-orange" />
                  </Link>
                ))}
              </div>
            )}

            {section.type === 'custom' && section.content && (
              <div 
                className="prose-custom font-body text-[var(--color-text-secondary)]"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
