'use client';

import { useViewTracker } from '@/lib/hooks/use-view-tracker';

export function ViewTracker({ slug }: { slug: string }) {
  useViewTracker(slug);
  return null;
}
