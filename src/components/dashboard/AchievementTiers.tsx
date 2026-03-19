// src/components/dashboard/AchievementTiers.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { getTierInfo, calculateTierProgress } from '@/lib/utils';

interface AchievementTiersProps {
  className?: string;
  currentTier?: number;
  currentPoints?: number;
}

const tierColors = [
  'from-amber-600 to-amber-400',
  'from-gray-400 to-gray-200',
  'from-yellow-400 to-yellow-200',
  'from-slate-400 to-slate-200',
  'from-cyan-400 to-blue-400',
];

const tierBgColors = [
  'bg-amber-50 dark:bg-amber-900/20',
  'bg-gray-50 dark:bg-gray-900/20',
  'bg-yellow-50 dark:bg-yellow-900/20',
  'bg-slate-50 dark:bg-slate-900/20',
  'bg-cyan-50 dark:bg-cyan-900/20',
];

export function AchievementTiers({
  className,
  currentTier = 3,
  currentPoints = 6500,
}: AchievementTiersProps) {
  const tierInfo = getTierInfo(currentTier);
  const progress = calculateTierProgress(currentTier, currentPoints);
  const nextTier = getTierInfo(currentTier + 1);
  const pointsToNextTier = nextTier ? nextTier.requiredPoints - currentPoints : 0;

  const tiers = [
    { level: 1, name: 'Bronze', icon: '🥉' },
    { level: 2, name: 'Silver', icon: '🥈' },
    { level: 3, name: 'Gold', icon: '🥇' },
    { level: 4, name: 'Platinum', icon: '💎' },
    { level: 5, name: 'Diamond', icon: '⭐' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-lg',
        'border border-gray-100 dark:border-gray-800',
        className
      )}
    >
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
          Achievement Tiers
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Track your progress and unlock rewards
        </p>
      </div>

      {/* Current Tier Display */}
      <div className={cn(
        'mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl',
        tierBgColors[currentTier - 1]
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={cn(
              'w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0',
              'bg-gradient-to-br',
              tierColors[currentTier - 1]
            )}>
              {tiers[currentTier - 1].icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Current Tier</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                {tierInfo.name}
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Points</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {currentPoints.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
            Progress to {nextTier?.name || 'Max Tier'}
          </span>
          <span className="text-xs sm:text-sm font-bold text-web3-violet">
            {progress.toFixed(0)}%
          </span>
        </div>
        <div className="relative h-2 sm:h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={cn(
              'absolute inset-y-0 left-0 rounded-full',
              'bg-gradient-to-r from-web3-violet to-web3-indigo'
            )}
          />
        </div>
        {nextTier && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {pointsToNextTier.toLocaleString()} pts to {nextTier.name}
          </p>
        )}
      </div>

      {/* Tier Path - Scrollable on mobile */}
      <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin pr-2">
        {tiers.map((tier, index) => {
          const isUnlocked = index + 1 <= currentTier;
          const isCurrent = index + 1 === currentTier;

          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl transition-all',
                isCurrent ? tierBgColors[index] : '',
                !isUnlocked && 'opacity-50'
              )}
            >
              <div className={cn(
                'w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0',
                isUnlocked
                  ? `bg-gradient-to-br ${tierColors[index]}`
                  : 'bg-gray-200 dark:bg-gray-700'
              )}>
                {tier.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'text-sm sm:text-base font-semibold truncate',
                  isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                )}>
                  {tier.name}
                </p>
                {isCurrent && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate hidden sm:block">
                    {tierInfo.benefits.slice(0, 2).join(' • ')}
                  </p>
                )}
              </div>
              {isUnlocked && (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default AchievementTiers;
