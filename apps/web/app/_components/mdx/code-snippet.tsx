'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { classNames } from '@/lib/utils/format';

interface CodeSnippetProps {
  code: string;
  language?: string;
  fileName?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
}

export function CodeSnippet({
  code,
  language = 'typescript',
  fileName,
  highlightLines = [],
  showLineNumbers = true,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.trimEnd().split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 overflow-hidden rounded-cozy border border-[var(--color-border)]">
      <div className="flex items-center justify-between bg-[var(--color-elevated)] px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-brand-red/60" />
            <span className="h-3 w-3 rounded-full bg-brand-amber/60" />
            <span className="h-3 w-3 rounded-full bg-brand-emerald/60" />
          </div>
          {fileName && (
            <span className="ml-2 font-mono text-xs text-[var(--color-text-muted)]">
              {fileName}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded bg-[var(--color-border)] px-1.5 py-0.5 font-mono text-xs text-[var(--color-text-muted)]">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="rounded p-1 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
            aria-label="Copy code"
          >
            {copied ? <Check size={14} className="text-brand-emerald" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      <pre className="overflow-x-auto bg-[var(--color-surface)] p-4">
        <code className="font-mono text-sm leading-relaxed">
          {lines.map((line, index) => (
            <div
              key={index}
              className={classNames(
                'flex',
                highlightLines.includes(index + 1)
                  ? 'bg-brand-violet/10 -mx-4 px-4'
                  : '',
              )}
            >
              {showLineNumbers && (
                <span className="mr-4 inline-block w-8 select-none text-right text-[var(--color-text-muted)]">
                  {index + 1}
                </span>
              )}
              <span className="flex-1 text-[var(--color-text-secondary)]">{line || ' '}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
