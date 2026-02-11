'use client';

import { useState } from 'react';
import { Box, Loader2 } from 'lucide-react';

interface SketchfabProps {
  id: string;
  title?: string;
  height?: number;
}

export function Sketchfab({ id, title = '3D Model', height = 480 }: SketchfabProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="my-6 overflow-hidden rounded-cozy border border-[var(--color-border)]">
      {title && (
        <div className="flex items-center gap-2 bg-[var(--color-elevated)] px-4 py-2">
          <Box size={14} className="text-brand-violet" />
          <span className="font-display text-xs font-semibold text-[var(--color-text-secondary)]">
            {title}
          </span>
        </div>
      )}
      <div className="relative" style={{ height }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface)]">
            <Loader2 size={24} className="animate-spin text-brand-violet" />
          </div>
        )}
        <iframe
          title={title}
          src={`https://sketchfab.com/models/${id}/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_controls=1`}
          width="100%"
          height="100%"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          style={{ border: 'none' }}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
