import type { Metadata } from 'next';
import { CozyCard } from '@/app/_components/cards/cozy-card';
import { TagList } from '@/app/_components/ui/tag-list';
import { getAllPostsMeta, getAllTags, getPostsByTag } from '@/lib/mdx/mdx.service';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tutorials, devlogs, and deep dives into game development.',
};

export const revalidate = 3600;

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const activeTag = params.tag;
  const allTags = getAllTags();
  const posts = activeTag ? getPostsByTag(activeTag) : getAllPostsMeta();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-28">
      <header className="mb-10">
        <h1 className="font-display text-fluid-3xl font-bold">Blog</h1>
        <p className="mt-2 font-body text-fluid-base text-[var(--color-text-secondary)]">
          Tutorials, devlogs, and deep dives into game development.
        </p>
      </header>

      {allTags.length > 0 && (
        <div className="mb-8">
          <TagList tags={allTags} activeTag={activeTag} />
        </div>
      )}

      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <CozyCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-cozy-lg border border-dashed border-[var(--color-border)] p-12 text-center">
          <p className="font-body text-[var(--color-text-muted)]">
            {activeTag
              ? `No posts found with tag "${activeTag}".`
              : 'No posts yet. Create your first .mdx file in content/posts/.'}
          </p>
        </div>
      )}
    </div>
  );
}
