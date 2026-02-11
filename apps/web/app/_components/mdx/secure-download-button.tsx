'use client';

import { useState } from 'react';
import { Download, Loader2, Check, AlertCircle, Lock } from 'lucide-react';
import { api, ApiClientError } from '@/lib/utils/api-client';
import { classNames } from '@/lib/utils/format';
import type { DownloadResponse } from '@billthedevlab/shared-types';

type DownloadState = 'idle' | 'loading' | 'success' | 'error' | 'unauthorized';

const STATE_CONFIG: Record<DownloadState, { icon: typeof Download; text: string; className: string }> = {
  idle: { icon: Download, text: 'Download', className: 'cozy-button-secondary' },
  loading: { icon: Loader2, text: 'Preparing...', className: 'cozy-button-secondary cursor-wait opacity-70' },
  success: { icon: Check, text: 'Downloaded!', className: 'cozy-button-secondary !border-brand-emerald !text-brand-emerald' },
  error: { icon: AlertCircle, text: 'Try Again', className: 'cozy-button-secondary !border-brand-red !text-brand-red' },
  unauthorized: { icon: Lock, text: 'Sign in to Download', className: 'cozy-button-secondary !border-brand-amber !text-brand-amber' },
};

interface SecureDownloadButtonProps {
  fileKey: string;
  label?: string;
  requireAuth?: boolean;
}

export function SecureDownloadButton({
  fileKey,
  label,
  requireAuth = false,
}: SecureDownloadButtonProps) {
  const [state, setState] = useState<DownloadState>('idle');

  const handleDownload = async () => {
    setState('loading');

    try {
      const response = await api.get<DownloadResponse>(`/assets/download/${fileKey}`);
      window.open(response.data.url, '_blank');
      setState('success');
      setTimeout(() => setState('idle'), 3000);
    } catch (error) {
      if (error instanceof ApiClientError) {
        if (error.statusCode === 401) {
          setState('unauthorized');
        } else {
          setState('error');
        }
      } else {
        setState('error');
      }
      setTimeout(() => setState('idle'), 4000);
    }
  };

  const config = STATE_CONFIG[state];
  const Icon = config.icon;

  return (
    <button
      onClick={handleDownload}
      disabled={state === 'loading'}
      className={classNames('my-2', config.className)}
    >
      <Icon size={16} className={state === 'loading' ? 'animate-spin' : ''} />
      {label || config.text}
    </button>
  );
}
