// src/app/page.tsx
'use client';

import * as React from 'react';
import { Navbar } from '@/components/Navbar';
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

export default function Home() {
  const { isConnected } = useWallet();
  const [stats, setStats] = React.useState(DEFAULT_STATS);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render dashboard until client-side mount
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      <DashboardLayout>
        <PageTransition>
          {/* Hero Section */}
          <section className="mb-8">
            <Hero3D />
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Epoch Earning"
              value={stats.epochEarning}
              suffix="WEMO"
              gradient="purple"
              trend={12.5}
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
              trend={8.3}
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
              trend={5.2}
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </section>

          {/* Dashboard Widgets */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <EarningStatistics />
            </div>
            <NodeStatus />
          </section>

          {/* Bottom Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AchievementTiers />
            <ReferralWidget />
          </section>
        </PageTransition>
      </DashboardLayout>
    </>
  );
}
