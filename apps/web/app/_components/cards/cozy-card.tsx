import Link from 'next/link';
import Image from 'next/image';
import { Eye, Clock } from 'lucide-react';
import type { PostMeta } from '@billthedevlab/shared-types';
import { formatRelativeDate, formatReadTime, formatNumber, classNames } from '@/lib/utils/format';

interface CozyCardProps {
  post: PostMeta;
  featured?: boolean;
}

export function CozyCard({ post, featured = false }: CozyCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={classNames(
        'cozy-card group block overflow-hidden',
        featured ? 'md:grid md:grid-cols-2' : '',
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes={featured ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {post.featured && !featured && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-sunset px-2.5 py-0.5 font-display text-xs font-semibold text-white">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between p-5">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--color-elevated)] px-2.5 py-0.5 font-body text-xs text-[var(--color-text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3
            className={classNames(
              'font-display font-bold leading-tight text-[var(--color-text-primary)] transition-colors group-hover:text-brand-orange',
              featured ? 'text-fluid-2xl' : 'text-fluid-lg',
            )}
          >
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 font-body text-fluid-sm text-[var(--color-text-secondary)]">
            {post.description}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-4 text-[var(--color-text-muted)]">
          <span className="font-body text-xs">{formatRelativeDate(post.date)}</span>
          <span className="flex items-center gap-1 font-body text-xs">
            <Clock size={12} />
            {formatReadTime(post.estimatedReadTime)}
          </span>
          {post.views !== undefined && (
            <span className="flex items-center gap-1 font-body text-xs">
              <Eye size={12} />
              {formatNumber(post.views)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
