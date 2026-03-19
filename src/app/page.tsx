// src/app/page.tsx
'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { EarningStatistics } from '@/components/dashboard/EarningStatistics';
import { NodeStatus } from '@/components/dashboard/NodeStatus';
import { AchievementTiers } from '@/components/dashboard/AchievementTiers';
import { ReferralWidget } from '@/components/dashboard/ReferralWidget';
import { Hero3D } from '@/components/3d/Hero3D';
import { PageTransition } from '@/components/animations/PageTransition';
import { useWallet } from '@/lib/hooks/useWallet';

// Default mock stats (matching the seeded data)
const DEFAULT_STATS = {
  epochEarning: 2250.75,
  totalEarning: 250843.20,
  totalNodes: 19,
  liveNodes: 17,
};

// Demo mode stats with fictional data
const DEMO_STATS = {
  epochEarning: 3456.89,
  totalEarning: 487562.45,
  totalNodes: 25,
  liveNodes: 24,
};

// Demo mode chart data
const DEMO_CHART_DATA = [
  { date: 'Jan 1', earnings: 120 },
  { date: 'Jan 5', earnings: 185 },
  { date: 'Jan 10', earnings: 245 },
  { date: 'Jan 15', earnings: 198 },
  { date: 'Jan 20', earnings: 312 },
  { date: 'Jan 25', earnings: 278 },
  { date: 'Jan 30', earnings: 356 },
];

// Demo mode node stats
const DEMO_NODE_STATS = {
  totalNodes: 25,
  liveNodes: 24,
  workerNodes: 18,
  sentryNodes: 6,
};

// Demo mode referral data
const DEMO_REFERRAL_DATA = {
  referrals: 47,
  earnings: 5842.50,
};

// Demo mode achievement data
const DEMO_ACHIEVEMENT_DATA = {
  currentTier: 4,
  currentPoints: 8750,
};

export default function Home() {
  const { isConnected, isDemoMode } = useWallet();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render dashboard until client-side mount
  if (!isMounted) {
    return null;
  }

  // Use demo data if in demo mode, otherwise use default stats
  const stats = isDemoMode ? DEMO_STATS : DEFAULT_STATS;
  const chartData = isDemoMode ? DEMO_CHART_DATA : undefined;
  const nodeStats = isDemoMode ? DEMO_NODE_STATS : undefined;
  const referralData = isDemoMode ? DEMO_REFERRAL_DATA : undefined;
  const achievementData = isDemoMode ? DEMO_ACHIEVEMENT_DATA : undefined;

  return (
    <DashboardLayout>
      <PageTransition>
        {/* Demo Mode Banner */}
        {isDemoMode && (
          <div className="mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-web3-violet to-web3-indigo text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm sm:text-base font-bold">Demo Mode Active</p>
                    <p className="text-xs sm:text-sm opacity-90">You&apos;re viewing fictional data for demonstration purposes</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                  Demo Wallet
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="mb-6 sm:mb-8">
          <Hero3D />
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Epoch Earning"
            value={stats.epochEarning}
            suffix="WEMO"
            gradient="purple"
            trend={isDemoMode ? 18.7 : 12.5}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Total Earnings"
            value={stats.totalEarning}
            suffix="WEMO"
            gradient="blue"
            trend={isDemoMode ? 15.2 : 8.3}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <StatCard
            title="Total Nodes"
            value={stats.totalNodes}
            gradient="green"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            }
          />
          <StatCard
            title="Live Nodes"
            value={stats.liveNodes}
            gradient="purple"
            trend={isDemoMode ? 8.5 : 5.2}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </section>

        {/* Dashboard Widgets */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="lg:col-span-2">
            <EarningStatistics data={chartData} />
          </div>
          <NodeStatus stats={nodeStats} />
        </section>

        {/* Bottom Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <AchievementTiers 
            currentTier={achievementData?.currentTier} 
            currentPoints={achievementData?.currentPoints} 
          />
          <ReferralWidget 
            referrals={referralData?.referrals} 
            earnings={referralData?.earnings} 
          />
        </section>
      </PageTransition>
    </DashboardLayout>
  );
}
