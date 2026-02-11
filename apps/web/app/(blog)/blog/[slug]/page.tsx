import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getPostBySlug, getAllPostSlugs } from '@/lib/mdx/mdx.service';
import { mdxComponents } from '@/app/_components/mdx';
import { ViewCounter } from '@/app/_components/ui/view-counter';
import { ViewTracker } from './view-tracker';
import { formatDate, formatReadTime } from '@/lib/utils/format';
import { siteConfig } from '@/lib/config/site.config';

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, mdxComponents);

  if (!post) return { title: 'Post Not Found' };

  const { frontmatter: fm } = post;

  return {
    title: fm.title,
    description: fm.description,
    openGraph: {
      title: fm.title,
      description: fm.description,
      type: 'article',
      publishedTime: fm.date,
      authors: [siteConfig.author.name],
      images: [{ url: fm.coverImage, width: 1200, height: 630, alt: fm.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fm.title,
      description: fm.description,
      images: [fm.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, mdxComponents);

  if (!post) notFound();

  const { content, frontmatter: fm } = post;

  return (
    <article className="pb-20 pt-24">
      <ViewTracker slug={slug} />

      <header className="mx-auto max-w-3xl px-6">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-[var(--color-text-muted)] transition-colors hover:text-brand-orange"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          {fm.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="inline-flex items-center gap-1 rounded-full bg-[var(--color-elevated)] px-2.5 py-0.5 font-body text-xs text-[var(--color-text-muted)] transition-colors hover:text-brand-orange"
            >
              <Tag size={10} />
              {tag}
            </Link>
          ))}
        </div>

        <h1 className="font-display text-fluid-3xl font-bold leading-tight">{fm.title}</h1>

        <p className="mt-3 font-body text-fluid-base text-[var(--color-text-secondary)]">
          {fm.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-[var(--color-text-muted)]">
          <span className="inline-flex items-center gap-1.5 font-body text-sm">
            <Calendar size={14} />
            {formatDate(fm.date)}
          </span>
          <span className="inline-flex items-center gap-1.5 font-body text-sm">
            <Clock size={14} />
            {formatReadTime(fm.estimatedReadTime)}
          </span>
          <ViewCounter postId={slug} />
        </div>
      </header>

      {fm.coverImage && (
        <div className="mx-auto mt-8 max-w-4xl px-6">
          <div className="relative aspect-video overflow-hidden rounded-cozy-lg border border-[var(--color-border)]">
            <Image
              src={fm.coverImage}
              alt={fm.title}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="prose-custom mx-auto mt-10 max-w-3xl px-6">{content}</div>
    </article>
  );
}
