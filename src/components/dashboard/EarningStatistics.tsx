// src/components/dashboard/EarningStatistics.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface EarningStatisticsProps {
  className?: string;
  data?: Array<{
    date: string;
    earnings: number;
  }>;
}

const generateMockData = () => {
  const data = [];
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      earnings: Math.random() * 100 + 50 + (i % 7 === 0 ? 50 : 0),
    });
  }
  return data;
};

export function EarningStatistics({ className, data }: EarningStatisticsProps) {
  const chartData = data || generateMockData();
  const [animated, setAnimated] = React.useState(false);

  React.useEffect(() => {
    setAnimated(true);
  }, []);

  const totalEarnings = chartData.reduce((sum, d) => sum + d.earnings, 0);
  const averageEarnings = totalEarnings / chartData.length;
  const maxEarnings = Math.max(...chartData.map(d => d.earnings));

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
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
            Earning Statistics
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Last 30 days performance
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="text-right hidden xs:block">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-sm sm:text-lg font-bold text-web3-violet">
              ${totalEarnings.toFixed(2)}
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-500 dark:text-gray-400">Avg/Day</p>
            <p className="text-sm sm:text-lg font-bold text-green-500">
              ${averageEarnings.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.split(' ')[0]}
              interval={3}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
              tickCount={5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                padding: '8px 12px',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Earnings']}
              labelStyle={{ fontSize: '12px', color: '#6B7280' }}
            />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#8B5CF6"
              strokeWidth={2}
              fill="url(#earningsGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100 dark:border-gray-800">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Highest Day</p>
          <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
            ${maxEarnings.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Lowest Day</p>
          <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
            ${Math.min(...chartData.map(d => d.earnings)).toFixed(2)}
          </p>
        </div>
        <div className="hidden sm:block">
          <p className="text-xs text-gray-500 dark:text-gray-400">Trend</p>
          <p className="text-base sm:text-lg font-bold text-green-500">↑ 12.5%</p>
        </div>
      </div>
    </motion.div>
  );
}

export default EarningStatistics;
