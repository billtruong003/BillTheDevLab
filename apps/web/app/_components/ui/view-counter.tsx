'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { api } from '@/lib/utils/api-client';
import { formatNumber } from '@/lib/utils/format';

interface ViewCounterProps {
  postId: string;
  initialViews?: number;
}

export function ViewCounter({ postId, initialViews = 0 }: ViewCounterProps) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await api.get<{ views: number }>(`/analytics/views/${postId}`);
        setViews(response.data.views);
      } catch {
        /* keep initial */
      }
    };

    fetchViews();
  }, [postId]);

  return (
    <span className="inline-flex items-center gap-1.5 font-body text-sm text-[var(--color-text-muted)]">
      <Eye size={14} />
      {formatNumber(views)} views
    </span>
  );
}
