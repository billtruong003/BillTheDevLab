'use client';

import { useState } from 'react';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { api, ApiClientError } from '@/lib/utils/api-client';
import { formatCurrency, classNames } from '@/lib/utils/format';
import type { CheckoutResponse } from '@billthedevlab/shared-types';

interface BuyButtonProps {
  productId: string;
  label?: string;
  price?: number;
  currency?: string;
}

export function BuyButton({
  productId,
  label = 'Buy Now',
  price,
  currency = 'USD',
}: BuyButtonProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async () => {
    setState('loading');
    setErrorMessage('');

    try {
      const response = await api.post<CheckoutResponse>('/purchases/checkout', { productId });
      window.location.href = response.data.url;
    } catch (error) {
      setState('error');
      if (error instanceof ApiClientError) {
        setErrorMessage(
          error.statusCode === 401
            ? 'Please sign in to purchase'
            : error.message,
        );
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="my-4 inline-flex flex-col">
      <button
        onClick={handleClick}
        disabled={state === 'loading'}
        className={classNames(
          'cozy-button-primary',
          state === 'loading' ? 'cursor-wait opacity-70' : '',
        )}
      >
        {state === 'loading' ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <ShoppingCart size={16} />
        )}
        {label}
        {price !== undefined && (
          <span className="ml-1 opacity-80">
            — {formatCurrency(price, currency)}
          </span>
        )}
      </button>
      {state === 'error' && (
        <span className="mt-1 font-body text-xs text-brand-red">{errorMessage}</span>
      )}
    </div>
  );
}
