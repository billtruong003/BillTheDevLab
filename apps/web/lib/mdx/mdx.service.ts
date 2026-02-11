import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';
import type { PostMeta, PostLayout } from '@billthedevlab/shared-types';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function ensurePostsDir(): void {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

function parseFrontmatter(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: (data.title as string) || 'Untitled',
    description: (data.description as string) || '',
    date: (data.date as string) || new Date().toISOString(),
    tags: (data.tags as string[]) || [],
    coverImage: (data.coverImage as string) || '/images/default-cover.jpg',
    layout: (data.layout as PostLayout) || 'full-width',
    featured: (data.featured as boolean) || false,
    estimatedReadTime: (data.estimatedReadTime as number) || 5,
    projectSlug: data.projectSlug as string | undefined,
    productId: data.productId as string | undefined,
  };
}

export async function getPostBySlug(
  slug: string,
  lang: 'en' | 'vi' = 'en',
  components: Record<string, React.ComponentType<any>> = {},
) {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
  
  let filename = `${slug}.mdx`;
  // If Vietnamese requested, check if specific file exists
  if (lang === 'vi') {
    const viPath = path.join(POSTS_DIR, `${slug}.vi.mdx`);
    if (fs.existsSync(viPath)) {
      filename = `${slug}.vi.mdx`;
    }
  }

  const filePath = path.join(POSTS_DIR, filename);

  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, 'utf-8');
  const { data, content: rawContent } = matter(source);

  const { content } = await compileMDX({
    source: rawContent,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrismPlus, { showLineNumbers: true }],
        ],
      },
    },
  });

  return {
    content,
    frontmatter: parseFrontmatter(slug, data),
  };
}

export function getAllPostSlugs(): string[] {
  ensurePostsDir();

  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.mdx') && !file.endsWith('.vi.mdx')) // Only count base English files as unique slugs
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getAllPostsMeta(): PostMeta[] {
  ensurePostsDir();
  const slugs = getAllPostSlugs();

  return slugs
    .map((slug) => {
      const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
      const source = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(source);
      return parseFrontmatter(slug, data);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostsMeta().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
  );
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPostsMeta().filter((post) => post.featured);
}

export function getAllTags(): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();

  getAllPostsMeta().forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAvailableLanguages(slug: string): ('en' | 'vi')[] {
  ensurePostsDir();
  const languages: ('en' | 'vi')[] = ['en'];
  
  if (fs.existsSync(path.join(POSTS_DIR, `${slug}.vi.mdx`))) {
    languages.push('vi');
  }
  
  return languages;
}
