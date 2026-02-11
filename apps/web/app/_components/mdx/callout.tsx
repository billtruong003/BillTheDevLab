import { Info, AlertTriangle, Lightbulb, AlertOctagon } from 'lucide-react';
import type { CalloutVariant } from '@billthedevlab/shared-types';
import { classNames } from '@/lib/utils/format';

const VARIANT_STYLES: Record<
  CalloutVariant,
  { bg: string; border: string; icon: typeof Info; iconColor: string }
> = {
  info: { bg: 'bg-brand-violet/10', border: 'border-brand-violet/30', icon: Info, iconColor: 'text-brand-violet' },
  warning: { bg: 'bg-brand-amber/10', border: 'border-brand-amber/30', icon: AlertTriangle, iconColor: 'text-brand-amber' },
  tip: { bg: 'bg-brand-emerald/10', border: 'border-brand-emerald/30', icon: Lightbulb, iconColor: 'text-brand-emerald' },
  danger: { bg: 'bg-brand-red/10', border: 'border-brand-red/30', icon: AlertOctagon, iconColor: 'text-brand-red' },
};

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ variant = 'info', title, children }: CalloutProps) {
  const style = VARIANT_STYLES[variant];
  const Icon = style.icon;

  return (
    <div
      className={classNames(
        'my-6 rounded-cozy border-l-4 p-4',
        style.bg,
        style.border,
      )}
    >
      <div className="flex items-start gap-3">
        <Icon size={20} className={classNames('mt-0.5 flex-shrink-0', style.iconColor)} />
        <div>
          {title && (
            <h4 className="mb-1 font-display text-sm font-semibold text-[var(--color-text-primary)]">
              {title}
            </h4>
          )}
          <div className="font-body text-sm text-[var(--color-text-secondary)]">{children}</div>
        </div>
      </div>
    </div>
  );
}
