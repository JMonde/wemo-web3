// src/components/dashboard/StatCard.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { StatCardProps } from '@/types';

const gradientVariants = {
  blue: 'from-blue-500 to-cyan-500',
  purple: 'from-web3-violet to-web3-indigo',
  green: 'from-green-500 to-emerald-500',
};

export function StatCard({
  title,
  value,
  suffix,
  gradient = 'purple',
  icon,
  trend,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = React.useState(0);

  // Animate number on mount
  React.useEffect(() => {
    const numericValue = typeof value === 'number' ? value : parseFloat(value as string) || 0;
    const duration = 1000;
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (numericValue - startValue) * eased;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(numericValue);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const formatValue = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(2) + 'M';
    if (val >= 1000) return (val / 1000).toFixed(2) + 'K';
    return val.toFixed(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={cn(
        'relative overflow-hidden rounded-2xl p-4 sm:p-6',
        'bg-white dark:bg-gray-900 shadow-lg',
        'border border-gray-100 dark:border-gray-800'
      )}
    >
      {/* Gradient Background Accent */}
      <div
        className={cn(
          'absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full opacity-10',
          'bg-gradient-to-br',
          gradientVariants[gradient]
        )}
        style={{ transform: 'translate(30%, -30%)' }}
      />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
          <div className="flex items-baseline gap-1 mt-1 flex-wrap">
            <motion.span
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {typeof value === 'number' ? formatValue(displayValue) : value}
            </motion.span>
            {suffix && (
              <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                {suffix}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div
            className={cn(
              'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ml-3',
              'bg-gradient-to-br',
              gradientVariants[gradient],
              'text-white shadow-lg'
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Trend Indicator */}
      {trend !== undefined && (
        <div className="relative flex items-center gap-1 sm:gap-2 flex-wrap">
          <span
            className={cn(
              'flex items-center text-xs sm:text-sm font-semibold',
              trend >= 0 ? 'text-green-500' : 'text-red-500'
            )}
          >
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">vs last epoch</span>
        </div>
      )}

      {/* Gradient Border on Hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl opacity-0 transition-opacity',
          'group-hover:opacity-100 pointer-events-none',
          'border-2 border-transparent',
          'bg-gradient-to-r from-web3-violet to-web3-indigo'
        )}
        style={{ padding: '2px' }}
      />
    </motion.div>
  );
}

export default StatCard;
