// src/components/3d/AnimatedBackground.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
  variant?: 'gradient' | 'mesh' | 'particles';
}

export function AnimatedBackground({
  className,
  variant = 'gradient',
}: AnimatedBackgroundProps) {
  if (variant === 'mesh') {
    return (
      <div className={cn('fixed inset-0 -z-10 overflow-hidden', className)}>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="gradient1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gradient2" cx="80%" cy="20%" r="40%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gradient3" cx="20%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
            </radialGradient>
          </defs>
          <motion.circle
            cx="50%"
            cy="50%"
            r="40%"
            fill="url(#gradient1)"
            animate={{
              cx: ['50%', '55%', '50%', '45%', '50%'],
              cy: ['50%', '45%', '50%', '55%', '50%'],
              r: ['40%', '45%', '40%', '35%', '40%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.circle
            cx="80%"
            cy="20%"
            r="30%"
            fill="url(#gradient2)"
            animate={{
              cx: ['80%', '75%', '80%', '85%', '80%'],
              cy: ['20%', '25%', '20%', '15%', '20%'],
              r: ['30%', '35%', '30%', '25%', '30%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.circle
            cx="20%"
            cy="80%"
            r="50%"
            fill="url(#gradient3)"
            animate={{
              cx: ['20%', '25%', '20%', '15%', '20%'],
              cy: ['80%', '75%', '80%', '85%', '80%'],
              r: ['50%', '55%', '50%', '45%', '50%'],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'particles') {
    return (
      <div className={cn('fixed inset-0 -z-10 overflow-hidden', className)}>
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-web3-violet rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  }

  // Default gradient variant
  return (
    <div className={cn('fixed inset-0 -z-10 overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-web3-violet-50 via-web3-indigo-50 to-web3-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-web3-violet/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-web3-indigo/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0, 100, 0],
          y: [0, -50, 0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export default AnimatedBackground;
