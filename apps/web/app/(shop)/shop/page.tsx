import type { Metadata } from 'next';
import { Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Premium digital assets, shaders, and tools for game developers.',
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-28">
      <header className="mb-10">
        <h1 className="font-display text-fluid-3xl font-bold">Shop</h1>
        <p className="mt-2 font-body text-fluid-base text-[var(--color-text-secondary)]">
          Premium digital assets, shaders, and tools for game developers.
        </p>
      </header>

      <div className="rounded-cozy-lg border border-dashed border-[var(--color-border)] p-16 text-center">
        <Package size={48} className="mx-auto text-[var(--color-text-muted)]" />
        <h2 className="mt-4 font-display text-fluid-xl font-bold text-[var(--color-text-secondary)]">
          Coming Soon
        </h2>
        <p className="mt-2 font-body text-sm text-[var(--color-text-muted)]">
          Digital assets and premium resources are being prepared. Products are managed
          through the backend API and will appear here automatically when added.
        </p>
        <p className="mt-4 font-mono text-xs text-brand-violet">
          POST /api/products → create products via the admin API
        </p>
      </div>
    </div>
  );
}
