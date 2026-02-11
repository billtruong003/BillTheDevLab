'use client';

import { useState, useMemo, useCallback } from 'react';
import Fuse, { IFuseOptions } from 'fuse.js';
import type { PostMeta, SearchResult } from '@billthedevlab/shared-types';

const FUSE_OPTIONS: IFuseOptions<PostMeta> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.3 },
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2,
};

export function useSearch(posts: PostMeta[]) {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => new Fuse(posts, FUSE_OPTIONS), [posts]);

  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) return [];

    return fuse.search(query).map((result) => ({
      slug: result.item.slug,
      title: result.item.title,
      description: result.item.description,
      tags: result.item.tags,
      date: result.item.date,
      coverImage: result.item.coverImage,
      estimatedReadTime: result.item.estimatedReadTime,
      score: 1 - (result.score || 0),
    }));
  }, [query, fuse]);

  const search = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  return { query, results, search, clearSearch, hasResults: results.length > 0 };
}
