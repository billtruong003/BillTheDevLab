'use client';

import { useEffect, useRef } from 'react';
import { generateFingerprint } from '@/lib/utils/fingerprint';
import { api } from '@/lib/utils/api-client';

export function useViewTracker(postId: string | undefined): void {
  const tracked = useRef(false);

  useEffect(() => {
    if (!postId || tracked.current) return;
    tracked.current = true;

    const track = async () => {
      try {
        const fingerprint = await generateFingerprint();
        await api.post(`/analytics/view/${postId}`, {
          fingerprint,
          referrer: document.referrer || undefined,
        });
      } catch {
        /* silently fail - analytics should never block UX */
      }
    };

    track();
  }, [postId]);
}
