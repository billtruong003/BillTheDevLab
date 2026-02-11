import Link from 'next/link';
import Image from 'next/image';
import { Download, ShoppingCart } from 'lucide-react';
import type { ProductDto } from '@billthedevlab/shared-types';
import { formatCurrency, classNames } from '@/lib/utils/format';

const TYPE_COLORS: Record<string, string> = {
  asset: 'bg-brand-emerald/20 text-brand-emerald',
  course: 'bg-brand-violet/20 text-brand-violet',
  book: 'bg-brand-amber/20 text-brand-amber',
  bundle: 'bg-brand-orange/20 text-brand-orange',
};

interface ProductCardProps {
  product: ProductDto;
}

export function ProductCard({ product }: ProductCardProps) {
  const isFree = Number(product.price) === 0;

  return (
    <Link href={`/shop/${product.id}`} className="cozy-card group block overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        {product.thumbnailUrl ? (
          <Image
            src={product.thumbnailUrl}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[var(--color-elevated)]">
            <Download size={32} className="text-[var(--color-text-muted)]" />
          </div>
        )}

        <span
          className={classNames(
            'absolute right-3 top-3 rounded-full px-2.5 py-0.5 font-display text-xs font-semibold capitalize',
            TYPE_COLORS[product.type] || TYPE_COLORS.asset,
          )}
        >
          {product.type}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-fluid-base font-bold text-[var(--color-text-primary)] transition-colors group-hover:text-brand-orange">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 font-body text-fluid-sm text-[var(--color-text-secondary)]">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span
            className={classNames(
              'font-display text-lg font-bold',
              isFree ? 'text-brand-emerald' : 'text-brand-orange',
            )}
          >
            {formatCurrency(Number(product.price), product.currency)}
          </span>

          <span className="flex items-center gap-1.5 rounded-cozy bg-[var(--color-elevated)] px-3 py-1.5 font-body text-xs font-medium text-[var(--color-text-secondary)] transition-colors group-hover:bg-brand-orange group-hover:text-white">
            {isFree ? <Download size={14} /> : <ShoppingCart size={14} />}
            {isFree ? 'Download' : 'Buy'}
          </span>
        </div>
      </div>
    </Link>
  );
}
