// src/components/dashboard/NodeStatus.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface NodeStatusProps {
  className?: string;
  stats?: {
    totalNodes: number;
    liveNodes: number;
    workerNodes: number;
    sentryNodes: number;
  };
}

export function NodeStatus({ className, stats }: NodeStatusProps) {
  const defaultStats = {
    totalNodes: 19,
    liveNodes: 17,
    workerNodes: 12,
    sentryNodes: 5,
  };

  const nodeStats = stats || defaultStats;
  const uptimePercentage = (nodeStats.liveNodes / nodeStats.totalNodes) * 100;

  const nodeTypes = [
    {
      label: 'Live Nodes',
      value: nodeStats.liveNodes,
      color: 'bg-green-500',
      textColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Worker Nodes',
      value: nodeStats.workerNodes,
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Sentry Nodes',
      value: nodeStats.sentryNodes,
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      label: 'Offline',
      value: nodeStats.totalNodes - nodeStats.liveNodes,
      color: 'bg-red-500',
      textColor: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg',
        'border border-gray-100 dark:border-gray-800',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Node Status
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real-time network health
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
            {uptimePercentage.toFixed(1)}% Uptime
          </span>
        </div>
      </div>

      {/* Total Nodes Display */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-web3-violet/10 to-web3-indigo/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Nodes</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {nodeStats.totalNodes}
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-web3-violet to-web3-indigo flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          </div>
        </div>
      </div>

      {/* Node Type Breakdown */}
      <div className="space-y-3">
        {nodeTypes.map((type, index) => (
          <motion.div
            key={type.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'flex items-center justify-between p-3 rounded-xl',
              type.bgColor
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn('w-3 h-3 rounded-full', type.color)} />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {type.label}
              </span>
            </div>
            <span className={cn('text-lg font-bold', type.textColor)}>
              {type.value}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Network Status Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Network Status</span>
          <span className="flex items-center gap-2 font-medium text-green-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            All Systems Operational
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default NodeStatus;
