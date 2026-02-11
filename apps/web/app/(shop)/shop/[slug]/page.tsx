import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Package } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Product ${slug}`,
    description: 'Digital asset for game developers',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-4xl px-6 pb-20 pt-28">
      <Link
        href="/shop"
        className="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-[var(--color-text-muted)] transition-colors hover:text-brand-orange"
      >
        <ArrowLeft size={14} />
        Back to Shop
      </Link>

      <div className="rounded-cozy-lg border border-dashed border-[var(--color-border)] p-16 text-center">
        <Package size={48} className="mx-auto text-[var(--color-text-muted)]" />
        <h1 className="mt-4 font-display text-fluid-2xl font-bold">Product: {slug}</h1>
        <p className="mt-2 font-body text-sm text-[var(--color-text-muted)]">
          Product details are fetched from the backend API. This page renders
          dynamically once products are created via the admin endpoints.
        </p>
      </div>
    </div>
  );
}
