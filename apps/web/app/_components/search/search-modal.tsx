'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Search, Clock, Tag } from 'lucide-react';
import { useUIStore } from '@/lib/store';
import { useSearch } from '@/lib/hooks/use-search';
import { formatRelativeDate, formatReadTime } from '@/lib/utils/format';
import type { PostMeta } from '@billthedevlab/shared-types';

interface SearchModalProps {
  posts: PostMeta[];
}

export function SearchModal({ posts }: SearchModalProps) {
  const { searchOpen, setSearchOpen } = useUIStore();
  const { query, results, search, clearSearch } = useSearch(posts);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    } else {
      clearSearch();
    }
  }, [searchOpen, clearSearch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setSearchOpen(false)}
      />

      <div className="relative w-full max-w-xl rounded-cozy-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
          <Search size={18} className="text-[var(--color-text-muted)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder="Search posts..."
            className="flex-1 bg-transparent font-body text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
          />
          <kbd className="hidden rounded bg-[var(--color-elevated)] px-1.5 py-0.5 font-mono text-xs text-[var(--color-text-muted)] sm:inline-block">
            ESC
          </kbd>
          <button
            onClick={() => setSearchOpen(false)}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto scrollbar-hide">
          {query.trim() && results.length === 0 && (
            <div className="px-4 py-8 text-center font-body text-sm text-[var(--color-text-muted)]">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {results.map((result) => (
            <Link
              key={result.slug}
              href={`/blog/${result.slug}`}
              onClick={() => setSearchOpen(false)}
              className="block border-b border-[var(--color-border)] px-4 py-3 transition-colors last:border-0 hover:bg-[var(--color-elevated)]"
            >
              <h4 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                {result.title}
              </h4>
              <p className="mt-1 line-clamp-1 font-body text-xs text-[var(--color-text-muted)]">
                {result.description}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                  <Clock size={12} />
                  {formatRelativeDate(result.date)}
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                  <Tag size={12} />
                  {result.tags.slice(0, 2).join(', ')}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {formatReadTime(result.estimatedReadTime)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {!query.trim() && (
          <div className="px-4 py-6 text-center font-body text-xs text-[var(--color-text-muted)]">
            Type to search posts by title, description, or tags
          </div>
        )}
      </div>
    </div>
  );
}
