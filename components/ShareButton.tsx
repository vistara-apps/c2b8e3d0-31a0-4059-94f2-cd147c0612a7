'use client';

import { cn } from '@/lib/utils';
import { ShareButtonProps } from '@/lib/types';
import { Share2 } from 'lucide-react';

export function ShareButton({
  variant = 'default',
  onShare,
  disabled = false,
  className
}: ShareButtonProps) {
  return (
    <button
      onClick={onShare}
      disabled={disabled}
      className={cn(
        'glass-button flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      <Share2 className="w-4 h-4" />
      <span>Share</span>
    </button>
  );
}
