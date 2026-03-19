// src/components/3d/FloatingIcons.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FloatingIcon {
  id: number;
  icon: React.ReactNode;
  color: string;
  size: 'sm' | 'md' | 'lg';
  initialX: number;
  initialY: number;
  delay: number;
  duration: number;
}

const cryptoIcons = [
  {
    name: 'ETH',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 32 32" fill="currentColor">
        <path d="M15.925 23.96l-9.818-5.797L15.925 32l9.83-13.837-9.83 5.797zM16.075 0L6.255 16.32l9.82 5.813 9.815-5.813L16.075 0zm0 20.297l-6.96-4.115L16.075 32l6.975-15.818-6.975 4.115z" />
      </svg>
    ),
    color: '#627EEA',
  },
  {
    name: 'BTC',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 32 32" fill="currentColor">
        <path d="M23.644 14.4c.32-2.133-.978-3.289-2.667-3.867l.534-2.133-1.289-.32-.533 2.133c-.338-.089-.685-.169-1.031-.249l.533-2.133-1.289-.32-.533 2.133c-.285-.071-.569-.142-.845-.213l.009-.036-1.778-.444-.338 1.36s.96.222.942.231c.525.133.622.489.605.764l-.605 2.418c.036.009.08.018.133.036-.044-.009-.089-.018-.142-.027l-.844 3.378c-.062.16-.222.4-.578.311.018.027-.942-.231-.942-.231l-.64 1.476 1.68.418c.311.08.613.16.915.24l-.533 2.151 1.289.32.533-2.133c.356.098.702.187 1.04.276l-.533 2.133 1.289.32.542-2.151c2.187.409 3.831.249 4.524-1.716.56-1.6.027-2.533-1.182-3.164.844-.196 1.484-.756 1.653-1.911zm-2.96 4.16c-.4 1.6-3.093.738-3.973.52l.711-2.844c.88.222 3.689.658 3.262 2.324zm.4-4.178c-.364 1.458-2.613.72-3.342.538l.64-2.56c.729.182 3.076.524 2.702 2.022z" />
      </svg>
    ),
    color: '#F7931A',
  },
  {
    name: 'USDT',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 23.467c-4.125 0-7.467-3.342-7.467-7.467 0-4.125 3.342-7.467 7.467-7.467 4.125 0 7.467 3.342 7.467 7.467 0 4.125-3.342 7.467-7.467 7.467zm5.333-10.667h-3.2v-3.2h-2.667v3.2h-3.2v2.667h3.2v3.2h2.667v-3.2h3.2v-2.667z" />
      </svg>
    ),
    color: '#26A17B',
  },
  {
    name: 'SOL',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 32 32" fill="currentColor">
        <path d="M4.733 20.267l2.133 2.133h18.667l2.133-2.133c.587-.587.587-1.547 0-2.133l-2.133-2.133H6.867l-2.133 2.133c-.587.587-.587 1.547 0 2.133zm0-8.533l2.133 2.133h18.667l2.133-2.133c.587-.587.587-1.547 0-2.133l-2.133-2.133H6.867l-2.133 2.133c-.587.587-.587 1.547 0 2.133zm20.8 6.4l-2.133 2.133c-.587.587-.587 1.547 0 2.133l2.133 2.133h-18.667l-2.133-2.133c-.587-.587-.587-1.547 0-2.133l2.133-2.133h18.667z" />
      </svg>
    ),
    color: '#00FFA3',
  },
];

export function FloatingIcons({ className }: { className?: string }) {
  const [icons, setIcons] = React.useState<FloatingIcon[]>([]);

  React.useEffect(() => {
    // Generate random positions and animations
    const generatedIcons: FloatingIcon[] = cryptoIcons.map((crypto, index) => ({
      id: index,
      icon: crypto.icon,
      color: crypto.color,
      size: index % 3 === 0 ? 'lg' : index % 3 === 1 ? 'md' : 'sm',
      initialX: (index - 1.5) * 100,
      initialY: (Math.random() - 0.5) * 200,
      delay: index * 0.2,
      duration: 3 + Math.random() * 2,
    }));
    setIcons(generatedIcons);
  }, []);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className={cn(
            'absolute rounded-2xl flex items-center justify-center',
            sizeClasses[icon.size]
          )}
          style={{
            left: `calc(50% + ${icon.initialX}px)`,
            top: `calc(50% + ${icon.initialY}px)`,
            color: icon.color,
            backgroundColor: `${icon.color}15`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(icon.id) * 20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: icon.delay,
            ease: 'easeInOut',
          }}
        >
          <div className="w-3/4 h-3/4">{icon.icon}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default FloatingIcons;
