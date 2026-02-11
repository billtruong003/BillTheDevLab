import Link from 'next/link';
import { classNames } from '@/lib/utils/format';

interface TagListProps {
  tags: { tag: string; count: number }[];
  activeTag?: string;
}

export function TagList({ tags, activeTag }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={classNames(
          'rounded-full px-3 py-1 font-body text-xs font-medium transition-colors',
          !activeTag
            ? 'bg-brand-orange text-white'
            : 'bg-[var(--color-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
        )}
      >
        All
      </Link>
      {tags.map(({ tag, count }) => (
        <Link
          key={tag}
          href={`/blog?tag=${encodeURIComponent(tag)}`}
          className={classNames(
            'rounded-full px-3 py-1 font-body text-xs font-medium transition-colors',
            activeTag === tag
              ? 'bg-brand-orange text-white'
              : 'bg-[var(--color-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
          )}
        >
          {tag}
          <span className="ml-1 opacity-60">{count}</span>
        </Link>
      ))}
    </div>
  );
}
