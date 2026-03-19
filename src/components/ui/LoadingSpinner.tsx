// src/components/ui/LoadingSpinner.tsx
'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'blockchain' | 'dots';
}

export function LoadingSpinner({
  className,
  size = 'md',
  variant = 'default',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (variant === 'blockchain') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-4 border-web3-lavender animate-pulse" />
        <div className="absolute inset-0 rounded-full border-t-4 border-web3-violet animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-web3-purple animate-ping" />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-1', sizeClasses[size], className)}>
        <div className="w-2 h-2 bg-web3-violet rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-web3-indigo rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-web3-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    );
  }

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />
      <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-web3-violet animate-spin" />
    </div>
  );
}

export default LoadingSpinner;
