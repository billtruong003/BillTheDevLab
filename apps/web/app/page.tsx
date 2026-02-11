import { HeroSection } from '@/app/_components/layout/hero-section';
import { CozyCard } from '@/app/_components/cards/cozy-card';
import { getAllPostsMeta, getFeaturedPosts } from '@/lib/mdx/mdx.service';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600;

export default function HomePage() {
  const allPosts = getAllPostsMeta();
  const featuredPosts = getFeaturedPosts();
  const latestPosts = allPosts.slice(0, 6);

  return (
    <>
      <HeroSection />

      {featuredPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="mb-8 font-display text-fluid-2xl font-bold">Featured</h2>
          <div className="grid gap-6">
            {featuredPosts.slice(0, 1).map((post) => (
              <CozyCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-fluid-2xl font-bold">Latest Posts</h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 font-body text-sm text-brand-orange transition-colors hover:text-brand-violet"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <CozyCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-cozy-lg border border-dashed border-[var(--color-border)] p-12 text-center">
            <p className="font-body text-[var(--color-text-muted)]">
              No posts yet. Add <code className="font-mono text-brand-orange">.mdx</code> files
              to <code className="font-mono text-brand-violet">content/posts/</code> to get started.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
